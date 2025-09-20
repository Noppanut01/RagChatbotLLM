from fastapi import FastAPI, HTTPException,UploadFile, File
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from rag_service import RAGService
from typing import Dict, Any, List
import os
from dotenv import load_dotenv
from contextlib import asynccontextmanager

load_dotenv()

# Initialize RAG Service
rag_service = RAGService()
path = os.getenv("UPLOAD_DIR")
# Pydantic Models
class Query(BaseModel):
    question: str
    
class RAGResponse(BaseModel):
    success: bool
    answer: str
    question: str = None
    model: str = None
    sources: list = None
    total_documents_searched: int = None
    error: str = None

class StatusResponse(BaseModel):
    status: str
    rag_service: Dict[str, Any]

class DocumentListResponse(BaseModel):
    success: bool
    documents: List[Dict[str, Any]] = None
    total: int = None
    error: str = None

class DocumentDeleteResponse(BaseModel):
    success: bool
    message: str = None
    remaining: int = None
    error: str = None

def loadFiles(docs):
    print(docs)
    loaded_count = 0
    for doc in docs:
        try:
            abs_path = path + "/" + doc
            result = rag_service.add_document(abs_path)
            if result["success"]:
                loaded_count += 1
                print(f"Loaded: {result['title']} (ID: {result['doc_id']})")
            else:
                print(f"Failed to load {doc}: {result['error']}")
        except Exception as e:
            print(f"Error loading {doc}: {str(e)}")
    
    if loaded_count > 0:
        return f"RAG Service initialized with {loaded_count} documents"
    else:
        return "No documents loaded. RAG service ready but no knowledge base."
    
@asynccontextmanager
async def startup_event(app:FastAPI):
    """Initialize RAG service on startup"""
    print("Starting RAG Chatbot API...")
    docs = []    
    # Try to load test documents from data/test directory
    if os.path.exists(path):
        docs = os.listdir(path)
    else:
        os.makedirs(path)
    loadFiles(docs)
    yield  # App runs here
    print("shutdown")


app = FastAPI(
    title="RAG Chatbot API",
    description="API สำหรับ RAG Chatbot ตอบคำถามจากเอกสาร PDF",
    version="1.0.0",
    lifespan=startup_event
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",  # React dev server
        "http://localhost:5173",  # Vite dev server
        "http://127.0.0.1:3000",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "RAG Chatbot API",
        "version": "1.0.0",
        "status": "running"
    }

@app.get("/health", response_model=StatusResponse)
async def health_check():
    """Health check endpoint"""
    try:
        rag_status = rag_service.get_status()
        return StatusResponse(
            status="healthy" if rag_status["components_ready"] and rag_status["total_documents"] > 0 else "initializing",
            rag_service=rag_status
        )
    except Exception as e:
        print(f"Health check failed: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/prompt", response_model=RAGResponse)
async def prompt(query: Query):
    """Main endpoint สำหรับถามคำถาม"""
    try:
        if not query.question or query.question.strip() == "":
            raise HTTPException(status_code=400, detail="Question cannot be empty")
        
        print(f"Question received: {query.question}")
        
        # Get answer from RAG service
        result = rag_service.ask_question(query.question)
        
        if result["success"]:
            print(f"Answer generated successfully")
            return RAGResponse(
                success=True,
                answer=result["answer"],
                question=result["question"],
                model=result["model"],
                sources=result.get("sources", []),
                total_documents_searched=result.get("total_documents_searched", 0)
            )
        else:
            print(f"RAG service error: {result.get('error', 'Unknown error')}")
            return RAGResponse(
                success=False,
                answer=result.get("answer", "เกิดข้อผิดพลาด"),
                error=result.get("error")
            )
            
    except HTTPException:
        raise
    except Exception as e:
        print(f"Unexpected error in prompt endpoint: {str(e)}")
        raise HTTPException(
            status_code=500, 
            detail="เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์ กรุณาลองใหม่อีกครั้ง"
        )


@app.post("/upload/")
async def create_upload_files(files: List[UploadFile] = File(...)):
    uploaded_filenames = []
    
    for file in files:
        filename = file.filename
    
        if not filename.endswith(('.pdf', '.txt', '.docx')):
            raise HTTPException(status_code=400, detail=f"Unsupported filetype: {filename}")
    
        file_path = f"{path}/{filename}"
    
        # Save file to disk
        with open(file_path, "wb") as buffer:
            buffer.write(await file.read())
        uploaded_filenames.append(filename)
        
        # Load document into RAG service immediately
        

        loadFiles(uploaded_filenames)
    
    return {
        "message": f"Successfully uploaded files: {', '.join(uploaded_filenames)}",
        "loaded_documents": uploaded_filenames
    }

@app.get("/documents/list", response_model=DocumentListResponse)
async def list_documents():
    """Get list of all loaded documents"""
    try:
        result = rag_service.list_documents()
        
        if result["success"]:
            return DocumentListResponse(
                success=True,
                documents=result["documents"],
                total=result["total"]
            )
        else:
            return DocumentListResponse(
                success=False,
                error=result.get("error", "Unknown error")
            )
            
    except Exception as e:
        print(f"Error listing documents: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="Failed to list documents"
        )

@app.delete("/documents/{doc_id}", response_model=DocumentDeleteResponse)
async def delete_document(doc_id: str):
    """Delete a specific document by ID"""
    try:
        result = rag_service.remove_document(doc_id)
        
        if result["success"]:
            return DocumentDeleteResponse(
                success=True,
                message=result["message"],
                remaining=result["remaining"]
            )
        else:
            return DocumentDeleteResponse(
                success=False,
                error=result.get("error", "Unknown error")
            )
            
    except Exception as e:
        print(f"Error deleting document {doc_id}: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Failed to delete document {doc_id}"
        )
