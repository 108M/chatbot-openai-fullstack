"""
Pydantic models for the ChatBot API
"""
from pydantic import BaseModel
from typing import Optional


class ChatRequest(BaseModel):
    message: str
    session_id: Optional[str] = None


class AudioRequest(BaseModel):
    text: str
    voice_id: Optional[str] = None


class TranscriptionResponse(BaseModel):
    text: str
    language: Optional[str] = None
    duration: Optional[float] = None


class SessionCreate(BaseModel):
    title: Optional[str] = "Nueva conversación"


class SessionUpdate(BaseModel):
    title: str


class DocumentRequest(BaseModel):
    content: str


class SearchRequest(BaseModel):
    query: str


class SearchResult(BaseModel):
    id: str
    content: str
    similarity: float


class SystemPromptRequest(BaseModel):
    session_id: str
    prompt: str
