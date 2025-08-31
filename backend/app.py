from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from rag_service import RAGService
import logging
from typing import Dict, Any

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
    error: str = None

class StatusResponse(BaseModel):
    status: str
    rag_service: Dict[str, Any]

@app.on_event("startup")
async def startup_event():
    """Initialize RAG service on startup"""
    logger.info("🚀 Starting RAG Chatbot API...")
    
    # Try to load existing document
    document_path = "./data/02_Git&Git Hub.pdf"
    if rag_service.load_document(document_path):
        logger.info("✅ RAG Service initialized with existing document")
    else:
        logger.warning("⚠️ No document loaded. RAG service ready but no knowledge base.")

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
            status="healthy" if rag_status["chain_ready"] else "initializing",
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
                model=result["model"]
            )
        else:
            logger.error(f"❌ RAG service error: {result.get('error', 'Unknown error')}")
            return RAGResponse(
                success=False,
                answer=result["answer"],
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


