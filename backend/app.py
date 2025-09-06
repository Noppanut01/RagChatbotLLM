from fastapi import FastAPI, HTTPException,UploadFile, File
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from rag_service import RAGService
import logging
from typing import Dict, Any, List
import os

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="RAG Chatbot API",
    description="API สำหรับ RAG Chatbot ตอบคำถามจากเอกสาร PDF",
    version="1.0.0"
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

# Initialize RAG Service
rag_service = RAGService()

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

@app.on_event("startup")
async def startup_event():
    """Initialize RAG service on startup"""
    logger.info("🚀 Starting RAG Chatbot API...")
    
    # Try to load test documents from data/test directory
    test_documents = [
        "./data/test/Fertilizer_001.pdf",
        "./data/test/Insect_001.pdf", 
        "./data/test/technology_rice_001.pdf"
    ]
    
    loaded_count = 0
    for doc_path in test_documents:
        try:
            result = rag_service.add_document(doc_path)
            if result["success"]:
                loaded_count += 1
                logger.info(f"✅ Loaded: {result['title']} (ID: {result['doc_id']})")
            else:
                logger.warning(f"⚠️ Failed to load {doc_path}: {result['error']}")
        except Exception as e:
            logger.warning(f"⚠️ Error loading {doc_path}: {str(e)}")
    
    if loaded_count > 0:
        logger.info(f"✅ RAG Service initialized with {loaded_count} documents")
    else:
        logger.warning("⚠️ No documents loaded. RAG service ready but no knowledge base.")

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
        logger.error(f"Health check failed: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/prompt", response_model=RAGResponse)
async def prompt(query: Query):
    """Main endpoint สำหรับถามคำถาม"""
    try:
        if not query.question or query.question.strip() == "":
            raise HTTPException(status_code=400, detail="Question cannot be empty")
        
        logger.info(f"📝 Question received: {query.question}")
        
        # Get answer from RAG service
        result = rag_service.ask_question(query.question)
        
        if result["success"]:
            logger.info(f"✅ Answer generated successfully")
            return RAGResponse(
                success=True,
                answer=result["answer"],
                question=result["question"],
                model=result["model"],
                sources=result.get("sources", []),
                total_documents_searched=result.get("total_documents_searched", 0)
            )
        else:
            logger.error(f"❌ RAG service error: {result.get('error', 'Unknown error')}")
            return RAGResponse(
                success=False,
                answer=result.get("answer", "เกิดข้อผิดพลาด"),
                error=result.get("error")
            )
            
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"❌ Unexpected error in prompt endpoint: {str(e)}")
        raise HTTPException(
            status_code=500, 
            detail="เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์ กรุณาลองใหม่อีกครั้ง"
        )


@app.post("/upload/")
async def create_upload_files(files: List[UploadFile] = File(...)):
    path = "./upload"
    uploaded_filenames = []

    if os.path.exists(path=path):
        for file in files:
            # You can access file details like filename, content_type, and the file object
            filename = file.filename
            content_type = file.content_type
            # Example: Save the file to disk (asynchronous operation)
            with open(f"{path}/{filename}", "wb") as buffer:
                buffer.write(await file.read())
            uploaded_filenames.append(filename)    
    else:
        os.makedirs(path)
        for file in files:
            # You can access file details like filename, content_type, and the file object
            filename = file.filename
            content_type = file.content_type
            # Example: Save the file to disk (asynchronous operation)
            with open(f"{path}/{filename}", "wb") as buffer:
                buffer.write(await file.read())
            uploaded_filenames.append(filename)    

    
    return {"message": f"Successfully uploaded files: {', '.join(uploaded_filenames)}"}
