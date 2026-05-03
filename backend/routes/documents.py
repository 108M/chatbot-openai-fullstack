"""
Document management and semantic search endpoints
"""
from fastapi import APIRouter, Form, Depends, HTTPException
from scipy.spatial.distance import cosine
from config import logger, supabase
from auth import get_current_user
from database import generate_embedding, convert_embedding

router = APIRouter()


@router.post("/add-document")
async def add_document(
    content: str = Form(...),
    user: dict = Depends(get_current_user)
):
    """Add a document with its embedding to the database"""
    if not supabase:
        raise HTTPException(status_code=500, detail="Database not available")
    
    try:
        # Generate embedding for the content
        embedding = generate_embedding(content)
        
        # Insert into documents table
        result = supabase.table("documents").insert({
            "user_id": user["id"],
            "content": content,
            "embedding": embedding
        }).execute()
        
        if not result.data:
            raise HTTPException(status_code=500, detail="Error adding document to database")
        
        return {
            "success": True,
            "message": "Documento agregado exitosamente",
            "document_id": result.data[0]["id"]
        }
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error adding document: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/search-documents")
async def search_documents(
    query: str = Form(...),
    limit: int = Form(10),
    user: dict = Depends(get_current_user)
):
    """Search documents using semantic similarity"""
    if not supabase:
        raise HTTPException(status_code=500, detail="Database not available")
    
    try:
        # Generate embedding for the query
        query_embedding = generate_embedding(query)
        
        # Retrieve all documents for this user
        result = supabase.table("documents").select("*").eq("user_id", user["id"]).execute()
        
        if not result.data:
            return {"results": [], "query": query}
        
        documents = result.data
        
        # Calculate cosine similarity for each document
        results = []
        for doc in documents:
            doc_embedding = doc.get("embedding")
            if doc_embedding:
                # Convert embedding to proper format
                doc_embedding_list = convert_embedding(doc_embedding)
                
                if len(doc_embedding_list) > 0 and len(query_embedding) > 0:
                    try:
                        # Verify both embeddings have the same length
                        if len(doc_embedding_list) != len(query_embedding):
                            logger.warning(f"Embedding length mismatch: query={len(query_embedding)}, doc={len(doc_embedding_list)}")
                            similarity = 0
                        else:
                            similarity = 1 - cosine(query_embedding, doc_embedding_list)
                            logger.info(f"Calculated similarity: {similarity}")
                    except Exception as e:
                        logger.warning(f"Error calculating similarity for doc {doc['id']}: {e}")
                        similarity = 0
                else:
                    similarity = 0
            else:
                similarity = 0
            
            results.append({
                "id": doc["id"],
                "content": doc["content"],
                "similarity": float(similarity),
                "created_at": doc.get("created_at")
            })
        
        # Sort by similarity in descending order
        results.sort(key=lambda x: x["similarity"], reverse=True)
        
        # Return top results
        return {
            "results": results[:limit],
            "query": query,
            "total_found": len(results)
        }
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error searching documents: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/documents")
async def get_documents(
    limit: int = 20,
    offset: int = 0,
    user: dict = Depends(get_current_user)
):
    """Get all documents for the current user"""
    if not supabase:
        raise HTTPException(status_code=500, detail="Database not available")
    
    try:
        result = supabase.table("documents").select("id,content,created_at").eq("user_id", user["id"]).range(offset, offset + limit - 1).execute()
        
        return {
            "documents": result.data,
            "limit": limit,
            "offset": offset
        }
    except Exception as e:
        logger.error(f"Error retrieving documents: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/documents-for-chat")
async def get_documents_for_chat(
    query: str = Form(...),
    user: dict = Depends(get_current_user)
):
    """Get relevant documents for chat context"""
    if not supabase:
        return {"documents": [], "query": query}
    
    try:
        # Generate embedding for the query
        query_embedding = generate_embedding(query)
        
        # Retrieve all documents for this user
        result = supabase.table("documents").select("*").eq("user_id", user["id"]).execute()
        
        if not result.data:
            return {"documents": [], "query": query}
        
        documents = result.data
        
        # Calculate similarity and filter
        relevant_docs = []
        for doc in documents:
            doc_embedding = doc.get("embedding")
            if doc_embedding:
                doc_embedding_list = convert_embedding(doc_embedding)
                
                if len(doc_embedding_list) > 0 and len(query_embedding) > 0:
                    try:
                        if len(doc_embedding_list) == len(query_embedding):
                            similarity = 1 - cosine(query_embedding, doc_embedding_list)
                            # Only include documents with similarity > 0.3 (30%)
                            if similarity > 0.3:
                                relevant_docs.append({
                                    "id": doc["id"],
                                    "content": doc["content"],
                                    "similarity": float(similarity)
                                })
                    except Exception as e:
                        logger.warning(f"Error calculating similarity: {e}")
        
        # Sort by similarity descending
        relevant_docs.sort(key=lambda x: x["similarity"], reverse=True)
        
        return {
            "documents": relevant_docs[:3],  # Return top 3
            "query": query
        }
    except Exception as e:
        logger.error(f"Error getting documents for chat: {e}")
        # Don't fail the chat if embeddings are not working
        return {"documents": [], "query": query}


@router.delete("/documents/{document_id}")
async def delete_document(
    document_id: str,
    user: dict = Depends(get_current_user)
):
    """Delete a specific document"""
    if not supabase:
        raise HTTPException(status_code=500, detail="Database not available")
    
    try:
        # Verify ownership
        result = supabase.table("documents").select("*").eq("id", document_id).eq("user_id", user["id"]).execute()
        
        if not result.data:
            raise HTTPException(status_code=404, detail="Document not found")
        
        # Delete the document
        supabase.table("documents").delete().eq("id", document_id).execute()
        
        return {"success": True, "message": "Documento eliminado exitosamente"}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error deleting document: {e}")
        raise HTTPException(status_code=500, detail=str(e))
