from langchain_ollama import OllamaEmbeddings, OllamaLLM
from langchain.schema.runnable import RunnablePassthrough
from langchain_chroma import Chroma
from langchain_core.prompts import ChatPromptTemplate
from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_core.output_parsers import StrOutputParser
from langchain.retrievers import ContextualCompressionRetriever
from langchain.retrievers.document_compressors import LLMChainExtractor
import os
from typing import Optional, Dict, Any
import logging

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class RAGService:
    """
    RAG (Retrieval-Augmented Generation) Service
    สำหรับการตอบคำถามจากเอกสาร PDF โดยใช้ LLM และ Vector Database
    """
    
    def __init__(self, 
        llm_model: str = "llama3.2",
        embedding_model: str = "mxbai-embed-large",
        persist_directory: str = "./chroma_store",
        chunk_size: int = 1000,
        chunk_overlap: int = 50,
        temperature: float = 0.3):
        """
        Initialize RAG Service
        
        Args:
            llm_model: ชื่อโมเดล LLM ใน Ollama
            embedding_model: ชื่อโมเดล Embedding ใน Ollama  
            persist_directory: directory สำหรับเก็บ vector database
            chunk_size: ขนาด chunk ของเอกสาร
            chunk_overlap: ส่วนที่ overlap ระหว่าง chunk
            temperature: ค่า temperature ของ LLM
        """
        self.llm_model = llm_model
        self.embedding_model = embedding_model
        self.persist_directory = persist_directory
        self.chunk_size = chunk_size
        self.chunk_overlap = chunk_overlap
        self.temperature = temperature
        
        # Initialize components
        self.embedding = None
        self.llm = None
        self.vectorstore = None
        self.chain = None
        
        logger.info(f"RAG Service initialized with LLM: {llm_model}")
    
    def _initialize_components(self):
        """Initialize LangChain components"""
        try:
            # Initialize embeddings
            self.embedding = OllamaEmbeddings(model=self.embedding_model)
            logger.info(f"✅ Embedding model loaded: {self.embedding_model}")
            
            # Initialize LLM
            self.llm = OllamaLLM(model=self.llm_model, temperature=self.temperature)
            logger.info(f"✅ LLM model loaded: {self.llm_model}")
            
            # Try to load existing vectorstore
            if os.path.exists(self.persist_directory):
                self.vectorstore = Chroma(
                    embedding_function=self.embedding,
                    persist_directory=self.persist_directory
                )
                logger.info(f"✅ Loaded existing vector database from {self.persist_directory}")
            else:
                logger.warning(f"⚠️ Vector database not found at {self.persist_directory}")
                self.vectorstore = None
            
            # Create RAG chain if vectorstore exists
            if self.vectorstore:
                self._create_rag_chain()
                
        except Exception as e:
            logger.error(f"❌ Error initializing components: {str(e)}")
            raise
    
    def _create_rag_chain(self):
        """Create RAG chain for question answering"""
        try:
            # Create prompt template
            prompt = ChatPromptTemplate.from_messages([
                (
                    "system",
                    "คุณคือแชทบอทที่ตอบคำถามจากเอกสารที่ให้มา "
                    "ห้ามใช้ความรู้ภายนอก ถ้าไม่พบคำตอบให้ตอบว่า 'ไม่มีข้อมูล' แต่สามารถให้คำแนะนำทั่วไปหรือบอกขอบเขตความรู้ที่มีได้\n\n"
                    "ถ้าพบคำตอบ ให้ตอบโดยอ้างอิงตามเนื้อหาในเอกสาร "
                    "และควรบอกส่วนหัวข้อ/section ถ้ามี"
                ),
                (
                    "human",
                    "คำถาม: {question}\n\nเอกสารที่เกี่ยวข้อง:\n{context}"
                ),
            ])
            
            # Create retriever with compression
            compressor = LLMChainExtractor.from_llm(self.llm)
            
            retrievers = self.vectorstore.as_retriever(
                search_type="mmr",
                search_kwargs={"k": 5, "fetch_k": 20}
            )
            
            compression_retriever = ContextualCompressionRetriever(
                base_compressor=compressor, 
                base_retriever=retrievers
            )
            
            # Create chain
            self.chain = (
                {"context": retrievers, "question": RunnablePassthrough()}
                | prompt
                | self.llm
                | StrOutputParser()
            )
            
            logger.info("✅ RAG chain created successfully")
            
        except Exception as e:
            logger.error(f"❌ Error creating RAG chain: {str(e)}")
            raise
    
    def load_document(self, file_path: str) -> bool:
        """
        Load document and create vector database
        
        Args:
            file_path: path ของไฟล์ PDF
            
        Returns:
            bool: True if successful, False otherwise
        """
        try:
            if not os.path.exists(file_path):
                logger.error(f"❌ File not found: {file_path}")
                return False
                
            # Initialize components if not done
            if not self.embedding or not self.llm:
                self._initialize_components()
            
            # Load document
            loader = PyPDFLoader(file_path)
            documents = loader.load()
            logger.info(f"✅ Loaded document: {file_path} ({len(documents)} pages)")
            
            # Split documents
            text_splitter = RecursiveCharacterTextSplitter(
                chunk_size=self.chunk_size, 
                chunk_overlap=self.chunk_overlap
            )
            chunks = text_splitter.split_documents(documents=documents)
            logger.info(f"✅ Document split into {len(chunks)} chunks")
            
            # Create vector database
            self.vectorstore = Chroma.from_documents(
                embedding=self.embedding,
                documents=chunks,
                persist_directory=self.persist_directory
            )
            logger.info(f"✅ Vector database created at {self.persist_directory}")
            
            # Create RAG chain
            self._create_rag_chain()
            
            return True
            
        except Exception as e:
            logger.error(f"❌ Error loading document: {str(e)}")
            return False
    
    def ask_question(self, question: str) -> Dict[str, Any]:
        """
        Ask question and get answer from RAG system
        
        Args:
            question: คำถามที่ต้องการถาม
            
        Returns:
            Dict containing answer and metadata
        """
        try:
            # Initialize if not done
            if not self.chain:
                if not self.embedding or not self.llm:
                    self._initialize_components()
                if not self.chain:
                    return {
                        "success": False,
                        "answer": "ระบบยังไม่พร้อมใช้งาน กรุณาอัปโหลดเอกสารก่อน",
                        "error": "No documents loaded"
                    }
            
            # Get answer
            answer = self.chain.invoke(question)
            
            return {
                "success": True,
                "answer": answer,
                "question": question,
                "model": self.llm_model
            }
            
        except Exception as e:
            logger.error(f"❌ Error answering question: {str(e)}")
            return {
                "success": False,
                "answer": "เกิดข้อผิดพลาดในการประมวลผล กรุณาลองใหม่อีกครั้ง",
                "error": str(e)
            }
    
    def get_status(self) -> Dict[str, Any]:
        """Get RAG service status"""
        return {
            "llm_model": self.llm_model,
            "embedding_model": self.embedding_model,
            "vectorstore_ready": self.vectorstore is not None,
            "chain_ready": self.chain is not None,
            "persist_directory": self.persist_directory
        }
