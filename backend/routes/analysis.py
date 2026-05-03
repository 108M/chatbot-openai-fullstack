"""
Image and file analysis endpoints
"""
import uuid
import base64
import io
from typing import List, Optional
from fastapi import APIRouter, UploadFile, File, Form, Depends, HTTPException
from fastapi.responses import StreamingResponse
import pdfplumber
from config import logger, supabase, openai_client
from auth import get_current_user, get_current_user_optional
from database import get_or_create_session, save_message

router = APIRouter()


@router.get("/uploads/{upload_id}")
async def get_upload_file(upload_id: str, user: dict = Depends(get_current_user_optional)):
    """
    Serve uploaded files (images, PDFs, TXT) by upload_id from Supabase.
    Can be accessed without authentication, but verifies ownership if user is authenticated.
    """
    if not supabase:
        raise HTTPException(status_code=404, detail="Upload not found")
    
    try:
        # Get upload record
        result = supabase.table("uploads").select("*").eq("id", upload_id).execute()
        if not result.data:
            raise HTTPException(status_code=404, detail="Upload not found")
        
        upload_record = result.data[0]
        
        # If user is authenticated, verify ownership
        if user and upload_record.get("user_id") != user["id"]:
            raise HTTPException(status_code=403, detail="Forbidden")
        
        file_data_b64 = upload_record.get("file_data")
        
        if not file_data_b64:
            raise HTTPException(status_code=404, detail="File data not found")
        
        # Decode base64 to bytes
        file_bytes = base64.b64decode(file_data_b64)
        media_type = upload_record.get("file_type", "application/octet-stream")
        
        return StreamingResponse(
            iter([file_bytes]),
            media_type=media_type,
            headers={"Content-Disposition": f"attachment; filename={upload_record.get('filename', upload_id)}"}
        )
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error retrieving file {upload_id}: {e}")
        raise HTTPException(status_code=500, detail="Error retrieving file")


@router.post("/analyze-multiple")
async def analyze_multiple(
    files: List[UploadFile] = File(...),
    prompt: Optional[str] = Form(None),
    session_id: Optional[str] = Form(None),
    user: dict = Depends(get_current_user)
):
    """
    Analyze multiple files (images, PDFs, TXT).
    Images can have an optional custom prompt.
    """
    # Crear sesión si no existe
    session_id_final = get_or_create_session(user["id"], session_id)
    results = []
    
    for file in files:
        try:
            file_bytes = await file.read()
            file_ext = file.filename.split(".")[-1].lower() if file.filename else ""
            
            if file_ext in ["png", "jpg", "jpeg", "gif", "webp"]:
                # Analyze image
                base64_image = base64.b64encode(file_bytes).decode('utf-8')
                text_prompt = prompt if prompt else "Describe esta imagen de forma detallada en español."
                
                response = openai_client.chat.completions.create(
                    model="gpt-4o-mini",
                    messages=[
                        {
                            "role": "user",
                            "content": [
                                {"type": "text", "text": text_prompt},
                                {
                                    "type": "image_url",
                                    "image_url": {
                                        "url": f"data:{file.content_type};base64,{base64_image}"
                                    }
                                }
                            ]
                        }
                    ],
                    max_tokens=1000
                )
                analysis = response.choices[0].message.content
                file_type = "image"
                
            elif file_ext == "pdf":
                # Extract text from PDF
                with pdfplumber.open(io.BytesIO(file_bytes)) as pdf:
                    text = "\n".join(
                        page.extract_text() or ""
                        for page in pdf.pages
                    )
                
                if not text.strip():
                    results.append({
                        "filename": file.filename,
                        "status": "error",
                        "error": "No se pudo extraer texto del PDF"
                    })
                    continue
                
                # Summarize
                response = openai_client.chat.completions.create(
                    model="gpt-4o-mini",
                    messages=[
                        {
                            "role": "user",
                            "content": f"Resume el siguiente texto en español:\n\n{text[:12000]}"
                        }
                    ]
                )
                analysis = response.choices[0].message.content
                file_type = "pdf"
                
            elif file_ext == "txt":
                # Analyze TXT file
                text = file_bytes.decode("utf-8")
                
                if not text.strip():
                    results.append({
                        "filename": file.filename,
                        "status": "error",
                        "error": "El archivo está vacío"
                    })
                    continue
                
                # Summarize
                response = openai_client.chat.completions.create(
                    model="gpt-4o-mini",
                    messages=[
                        {
                            "role": "user",
                            "content": f"Resume el siguiente texto en español:\n\n{text[:12000]}"
                        }
                    ]
                )
                analysis = response.choices[0].message.content
                file_type = "txt"
            else:
                results.append({
                    "filename": file.filename,
                    "status": "error",
                    "error": f"Tipo de archivo no soportado: {file_ext}"
                })
                continue
            
            # Save upload record with file data
            upload_id = None
            if supabase:
                upload_result = supabase.table("uploads").insert({
                    "user_id": user["id"],
                    "session_id": session_id_final,
                    "filename": file.filename,
                    "file_type": file.content_type,
                    "file_size": len(file_bytes),
                    "analysis_result": analysis,
                    "file_data": base64.b64encode(file_bytes).decode('utf-8')
                }).execute()
                upload_id = upload_result.data[0]["id"]
            else:
                upload_id = str(uuid.uuid4())
            
            # Save user message with file ID
            if file_type == "image":
                user_message_content = f"[IMG:{upload_id}]"
            else:
                user_message_content = f"[FILE:{upload_id}:{file_ext.upper()}]"
            
            save_message(session_id_final, user["id"], "user", user_message_content)
            
            # Save assistant response
            save_message(session_id_final, user["id"], "assistant", analysis)
            
            results.append({
                "filename": file.filename,
                "status": "success",
                "type": file_type,
                "analysis": analysis,
                "upload_id": upload_id
            })
            
        except Exception as e:
            logger.error(f"Error analyzing {file.filename}: {e}")
            results.append({
                "filename": file.filename,
                "status": "error",
                "error": str(e)
            })
    
    return {"results": results, "session_id": session_id_final}


@router.post("/analyze-image")
async def analyze_image(
    file: UploadFile = File(...),
    prompt: Optional[str] = Form(None),
    session_id: Optional[str] = Form(None),
    user: dict = Depends(get_current_user)
):
    """Analyze an image using OpenAI Vision"""
    try:
        # Crear sesión si no existe
        session_id_final = get_or_create_session(user["id"], session_id)
        image_bytes = await file.read()
        base64_image = base64.b64encode(image_bytes).decode('utf-8')
        # Use provided prompt or default
        text_prompt = prompt if prompt else "Describe esta imagen de forma detallada en español."
        response = openai_client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {
                    "role": "user",
                    "content": [
                        {"type": "text", "text": text_prompt},
                        {
                            "type": "image_url",
                            "image_url": {
                                "url": f"data:{file.content_type};base64,{base64_image}"
                            }
                        }
                    ]
                }
            ],
            max_tokens=1000
        )
        description = response.choices[0].message.content
        
        # Save upload record with file data
        if supabase:
            upload_result = supabase.table("uploads").insert({
                "user_id": user["id"],
                "session_id": session_id_final,
                "filename": file.filename,
                "file_type": file.content_type,
                "file_size": len(image_bytes),
                "analysis_result": description,
                "file_data": base64.b64encode(image_bytes).decode('utf-8')
            }).execute()
            upload_id = upload_result.data[0]["id"]
        else:
            upload_id = str(uuid.uuid4())
        
        # Save user message with file ID (no filename to avoid duplicates)
        user_message_content = f"[IMG:{upload_id}] {text_prompt}"
        save_message(session_id_final, user["id"], "user", user_message_content)
        
        # Save assistant response
        save_message(session_id_final, user["id"], "assistant", description)
        
        return {"description": description, "filename": file.filename, "session_id": session_id_final, "upload_id": upload_id}
    except Exception as e:
        logger.error(f"Image analysis error: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/analyze-file")
async def analyze_file(
    file: UploadFile = File(...),
    prompt: Optional[str] = Form(None),
    session_id: Optional[str] = Form(None),
    user: dict = Depends(get_current_user)
):
    """Analyze PDF or TXT file"""
    ext = file.filename.split(".")[-1].lower() if file.filename else ""
    try:
        # Crear sesión si no existe
        session_id_final = get_or_create_session(user["id"], session_id)
        file_bytes = await file.read()
        if ext == "pdf":
            with pdfplumber.open(io.BytesIO(file_bytes)) as pdf:
                text = "\n".join(
                    page.extract_text() or "" 
                    for page in pdf.pages
                )
        elif ext == "txt":
            text = file_bytes.decode("utf-8")
        else:
            raise HTTPException(status_code=400, detail="Solo se aceptan archivos PDF o TXT")
        if not text.strip():
            raise HTTPException(status_code=400, detail="No se pudo extraer texto del archivo")
        
        logger.info(f"Received prompt: '{prompt}'")
        # Usar prompt personalizado o resumen por defecto
        if prompt:
            content = f"{prompt}\n\nTexto del archivo:\n{text[:12000]}"
            user_prompt = prompt
        else:
            content = f"Resume el siguiente texto en español:\n\n{text[:12000]}"
            user_prompt = "Resume el siguiente texto en español"
        
        logger.info(f"Sending content to OpenAI: {content[:200]}...")
        
        summary_response = openai_client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {
                    "role": "user",
                    "content": content
                }
            ],
            max_tokens=1000
        )
        summary = summary_response.choices[0].message.content
        
        # Save upload record with file data
        if supabase:
            upload_result = supabase.table("uploads").insert({
                "user_id": user["id"],
                "session_id": session_id_final,
                "filename": file.filename,
                "file_type": ext,
                "file_size": len(file_bytes),
                "analysis_result": summary,
                "file_data": base64.b64encode(file_bytes).decode('utf-8')
            }).execute()
            upload_id = upload_result.data[0]["id"]
        else:
            upload_id = str(uuid.uuid4())
        
        # Save user message with file ID
        user_message_content = f"[FILE:{upload_id}:{ext.upper()}] {user_prompt}"
        save_message(session_id_final, user["id"], "user", user_message_content)
        
        # Save assistant response
        save_message(session_id_final, user["id"], "assistant", summary)
        
        return {
            "summary": summary,
            "word_count": len(text.split()),
            "filename": file.filename,
            "session_id": session_id_final,
            "upload_id": upload_id
        }
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"File analysis error: {e}")
        raise HTTPException(status_code=500, detail=str(e))
