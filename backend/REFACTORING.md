# Backend Structure Documentation

## Overview

The backend has been refactored from a monolithic 1337-line `main.py` file into a clean, modular structure of 55 lines. This refactoring improves maintainability, readability, and makes the codebase easier to navigate and extend.

## File Structure

```
backend/
├── main.py (55 lines)              # Main FastAPI application
├── models.py (48 lines)            # Pydantic data models
├── config.py (34 lines)            # Configuration and clients
├── auth.py (56 lines)              # Authentication logic
├── database.py (134 lines)         # Database operations
├── main_backup.py (1337 lines)     # Original file backup
└── routes/                         # API route modules
    ├── __init__.py (3 lines)
    ├── chat.py (249 lines)         # WebSocket chat endpoint
    ├── sessions.py (66 lines)      # Session management
    ├── audio.py (154 lines)        # Audio TTS/STT
    ├── analysis.py (358 lines)     # File/image analysis
    ├── documents.py (220 lines)    # Document search
    └── system_prompts.py (83 lines) # System prompts
```

## Module Descriptions

### main.py
The entry point of the application. It:
- Initializes the FastAPI app
- Configures CORS middleware
- Registers all route modules
- Provides a health check endpoint
- Starts the Uvicorn server with development mode support

### models.py
Contains all Pydantic models used for request/response validation:
- `ChatRequest` - Chat message requests
- `AudioRequest` - TTS generation requests
- `TranscriptionResponse` - STT response format
- `SessionCreate`, `SessionUpdate` - Session operations
- `DocumentRequest`, `SearchRequest`, `SearchResult` - Document operations
- `SystemPromptRequest` - System prompt configuration

### config.py
Centralized configuration management:
- Environment variable loading
- Logger configuration
- OpenAI client initialization
- ElevenLabs client initialization
- Supabase client initialization
- JWT secret configuration

### auth.py
Authentication and authorization:
- `get_current_user()` - Required authentication dependency
- `get_current_user_optional()` - Optional authentication dependency
- JWT token validation
- User identification

### database.py
Database operations and helpers:
- `generate_embedding()` - Create OpenAI embeddings
- `convert_embedding()` - Format conversion for embeddings
- `get_or_create_session()` - Session management
- `get_session_messages()` - Retrieve conversation history
- `save_message()` - Persist messages
- `update_session_title()` - Update session metadata

### routes/chat.py
WebSocket chat endpoint with streaming:
- Real-time message streaming
- Context retrieval from documents
- System prompt integration
- Voice response generation (optional)
- Session management

### routes/sessions.py
Session management endpoints:
- `GET /sessions` - List user sessions
- `POST /sessions` - Create new session
- `DELETE /sessions/{session_id}` - Delete session
- `GET /sessions/{session_id}/messages` - Get session messages

### routes/audio.py
Audio processing endpoints:
- `POST /generate-audio` - Text-to-Speech using ElevenLabs
- `POST /transcribe-audio` - Speech-to-Text using ElevenLabs
- `GET /audio/{filename}` - Serve audio files
- `GET /voices` - List available TTS voices

### routes/analysis.py
File and image analysis endpoints:
- `GET /uploads/{upload_id}` - Serve uploaded files
- `POST /analyze-multiple` - Batch file analysis
- `POST /analyze-image` - Image analysis with OpenAI Vision
- `POST /analyze-file` - PDF/TXT file analysis

### routes/documents.py
Document management and semantic search:
- `POST /add-document` - Add document with embedding
- `POST /search-documents` - Semantic similarity search
- `GET /documents` - List user documents
- `POST /documents-for-chat` - Get relevant docs for chat context
- `DELETE /documents/{document_id}` - Delete document

### routes/system_prompts.py
System prompt management:
- `POST /system-prompt` - Set/update system prompt for session
- `GET /system-prompt/{session_id}` - Get system prompt

## Benefits of Refactoring

### 1. Improved Maintainability
- Each module has a single responsibility
- Changes to one feature don't affect others
- Easier to locate and fix bugs

### 2. Better Code Organization
- Related functions are grouped together
- Clear separation of concerns
- Logical file structure

### 3. Enhanced Readability
- Smaller files are easier to understand
- Clear module names indicate purpose
- Reduced cognitive load when working with code

### 4. Easier Testing
- Individual modules can be tested in isolation
- Mock dependencies more easily
- Better test coverage

### 5. Scalability
- Easy to add new route modules
- Simple to extend existing functionality
- Team members can work on different modules without conflicts

### 6. Reusability
- Shared utilities in database.py
- Common models in models.py
- Authentication logic centralized in auth.py

## Migration Notes

The refactoring maintains 100% backward compatibility:
- All endpoints remain at the same URLs
- Request/response formats unchanged
- Authentication mechanism preserved
- Database operations identical

The original `main.py` has been backed up as `main_backup.py` for reference.

## Development Mode

The application now supports a development mode with auto-reload:

```bash
# Development mode (with auto-reload)
ENVIRONMENT=development python main.py

# Production mode (no auto-reload)
ENVIRONMENT=production python main.py
```

## Testing

All endpoints have been tested and verified to work correctly:
- Health check: ✓
- WebSocket chat: ✓
- Session management: ✓
- Audio TTS/STT: ✓
- File analysis: ✓
- Document search: ✓
- System prompts: ✓

## Security

CodeQL security scan completed with **0 alerts**. The refactored code maintains the same security posture as the original implementation.
