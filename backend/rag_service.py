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
from typing import Optional, Dict, Any, List
import logging
import uuid
from datetime import datetime

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
        self.vectorstores = {}  # Dict of vectorstores by doc_id
        self.documents = {}     # Document metadata by doc_id
        
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
            
            # Note: vectorstores will be loaded on-demand when documents are added
            logger.info(f"✅ Components initialized, ready for document loading")
                
        except Exception as e:
            logger.error(f"❌ Error initializing components: {str(e)}")
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
            
            # Generate doc_id and create separate vectorstore for this document
            doc_id = str(uuid.uuid4())[:8]
            title = os.path.basename(file_path)
            
            # Create separate collection for this document
            collection_name = f"doc_{doc_id}"
            vectorstore = Chroma.from_documents(
                embedding=self.embedding,
                documents=chunks,
                collection_name=collection_name,
                persist_directory=self.persist_directory
            )
            
            # Store vectorstore and metadata
            self.vectorstores[doc_id] = vectorstore
            self.documents[doc_id] = {
                "title": title,
                "file_path": file_path,
                "chunks": len(chunks),
                "created_at": datetime.now().isoformat()
            }
            
            logger.info(f"✅ Document added with ID: {doc_id} ({len(chunks)} chunks)")
            logger.info(f"✅ Total documents: {len(self.vectorstores)}")
            
            return True
            
        except Exception as e:
            logger.error(f"❌ Error loading document: {str(e)}")
            return False
    
    
    
    def add_document(self, file_path: str, title: str = None) -> Dict[str, Any]:
        """เพิ่มเอกสารใหม่"""
        try:
            # Initialize components if needed
            if not self.embedding or not self.llm:
                self._initialize_components()
            
            if not os.path.exists(file_path):
                return {"success": False, "error": f"File not found: {file_path}"}
            
            if not title:
                title = os.path.basename(file_path)

            doc_id = str(uuid.uuid4())[:8]  # short ID

            # โหลดเอกสาร (ใช้โค้ดเดิมจาก load_document)
            loader = PyPDFLoader(file_path)
            documents = loader.load()

            # แยก chunks
            text_splitter = RecursiveCharacterTextSplitter(
                chunk_size=self.chunk_size,
                chunk_overlap=self.chunk_overlap
            )
            chunks = text_splitter.split_documents(documents)

            # สร้าง collection แยก
            collection_name = f"doc_{doc_id}"
            vectorstore = Chroma.from_documents(
                embedding=self.embedding,
                documents=chunks,
                collection_name=collection_name,
                persist_directory=self.persist_directory
            )

            # เก็บข้อมูล
            self.vectorstores[doc_id] = vectorstore
            self.documents[doc_id] = {
                "title": title,
                "file_path": file_path,
                "chunks": len(chunks),
                "created_at": datetime.now().isoformat()
            }

            return {"success": True, "doc_id": doc_id, "title": title}

        except Exception as e:
            return {"success": False, "error": str(e)}
    
    def list_documents(self) -> Dict[str, Any]:
        """แสดงรายการเอกสารทั้งหมด"""
        try:
            documents_list = []
            for doc_id, metadata in self.documents.items():
                documents_list.append({
                    "doc_id": doc_id,
                    "title": metadata["title"],
                    "chunks": metadata["chunks"],
                    "created_at": metadata["created_at"]
                })
            
            return {
                "success": True,
                "documents": documents_list,
                "total": len(documents_list)
            }
        except Exception as e:
            return {"success": False, "error": str(e)}
    
    def remove_document(self, doc_id: str) -> Dict[str, Any]:
        """ลบเอกสาร"""
        try:
            if doc_id not in self.vectorstores:
                return {"success": False, "error": f"Document {doc_id} not found"}
            
            # Remove from memory
            del self.vectorstores[doc_id]
            title = self.documents[doc_id]["title"]
            del self.documents[doc_id]
            
            logger.info(f"✅ Removed document: {doc_id} ({title})")
            logger.info(f"✅ Remaining documents: {len(self.vectorstores)}")
            
            return {
                "success": True, 
                "message": f"Document '{title}' removed successfully",
                "remaining": len(self.vectorstores)
            }
        except Exception as e:
            return {"success": False, "error": str(e)}

    def ask_question(self, question: str) -> Dict[str, Any]:
        """ตอบคำถามแบบ multi-document พร้อม source attribution"""
        try:
            # Initialize components if needed
            if not self.embedding or not self.llm:
                self._initialize_components()
            
            # Check if any documents are loaded
            if not self.vectorstores:
                return {
                    "success": False,
                    "answer": "ไม่มีเอกสารในระบบ กรุณาอัปโหลดเอกสารก่อน",
                    "error": "No documents loaded"
                }

            # Search across all vectorstores with scoring
            all_results = []
            source_mapping = {}  # Map document content to source

            for doc_id, vectorstore in self.vectorstores.items():
                # Get results with scores
                results = vectorstore.similarity_search_with_score(question, k=3)
                for doc, score in results:
                    all_results.append((doc, score, doc_id))
                    # Map content to source for attribution
                    source_mapping[doc.page_content] = {
                        "doc_id": doc_id,
                        "title": self.documents[doc_id]["title"],
                        "score": score
                    }

            if not all_results:
                return {
                    "success": False,
                    "answer": "ไม่พบข้อมูลที่เกี่ยวข้องกับคำถาม"
                }

            # Sort by relevance score (lower is better for similarity)
            all_results.sort(key=lambda x: x[1])
            
            # Take top 5 most relevant chunks
            top_results = all_results[:5]
            context_parts = []
            used_sources = set()

            for doc, score, doc_id in top_results:
                context_parts.append(f"[จากเอกสาร: {self.documents[doc_id]['title']}]\n{doc.page_content}")
                used_sources.add(doc_id)

            context = "\n\n---\n\n".join(context_parts)

            # Create prompt template
            prompt = ChatPromptTemplate.from_messages([
                (
                    "system",
                    "คุณคือแชทบอทที่ตอบคำถามจากเอกสารที่ให้มา "
                    "ห้ามใช้ความรู้ภายนอก ถ้าไม่พบคำตอบให้ตอบว่า 'ไม่มีข้อมูล' "
                    "ถ้าพบคำตอบ ให้ตอบโดยอ้างอิงตามเนื้อหาในเอกสาร "
                    "และควรระบุชื่อเอกสารที่อ้างอิงด้วย"
                ),
                (
                    "human",
                    "คำถาม: {question}\n\nเอกสารที่เกี่ยวข้อง:\n{context}"
                ),
            ])

            # Generate answer
            chain = prompt | self.llm | StrOutputParser()
            answer = chain.invoke({"question": question, "context": context})

            # Prepare sources information
            sources = []
            for doc_id in used_sources:
                sources.append({
                    "doc_id": doc_id,
                    "title": self.documents[doc_id]["title"]
                })

            return {
                "success": True,
                "answer": answer,
                "question": question,
                "sources": sources,
                "model": self.llm_model,
                "total_documents_searched": len(self.vectorstores)
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
            "components_ready": self.embedding is not None and self.llm is not None,
            "total_documents": len(self.vectorstores),
            "documents": [
                {
                    "doc_id": doc_id, 
                    "title": meta["title"],
                    "chunks": meta["chunks"]
                } 
                for doc_id, meta in self.documents.items()
            ],
            "persist_directory": self.persist_directory
        }
