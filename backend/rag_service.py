from langchain_ollama import OllamaEmbeddings, OllamaLLM
from langchain_core.runnables import RunnablePassthrough
from langchain_chroma import Chroma
from langchain_core.prompts import ChatPromptTemplate
from langchain_community.document_loaders import PyPDFLoader, TextLoader, Docx2txtLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_core.output_parsers import StrOutputParser
import os
from typing import Dict, Any
import uuid
from datetime import datetime
import hashlib

from dotenv import load_dotenv

load_dotenv()

class RAGService:
    """
    RAG (Retrieval-Augmented Generation) Service
    สำหรับการตอบคำถามจากเอกสาร PDF โดยใช้ LLM และ Vector Database
    """
    
    def __init__(self, 
        llm_model: str = os.getenv("OLLAMA_LLM_MODEL"),
        embedding_model: str = os.getenv("OLLAMA_EMBEDDING_MODEL"),
        persist_directory: str = os.getenv("CHROMA_PERSIST_DIRECTORY"),
        chunk_size: int = int(os.getenv("CHUNK_SIZE", "1000")),
        chunk_overlap: int = int(os.getenv("CHUNK_OVERLAP", "200")),
        temperature: float = float(os.getenv("LLM_TEMPERATURE", "0.7"))
        ):
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
        self.file_hashes = {}   # hash -> doc_id (for duplicate detection)
        
        print(f"RAG Service initialized with LLM: {llm_model}")

    def _initialize_components(self):
        """Initialize LangChain components"""
        try:
            # Initialize embeddings
            self.embedding = OllamaEmbeddings(model=self.embedding_model)
            print(f"Embedding model loaded: {self.embedding_model}")
            
            # Initialize LLM
            self.llm = OllamaLLM(model=self.llm_model, temperature=self.temperature)
            print(f"LLM model loaded: {self.llm_model}")
            
            # Note: vectorstores will be loaded on-demand when documents are added
            print(f"Components initialized, ready for document loading")
                
        except Exception as e:
            print(f"Error initializing components: {str(e)}")
            raise
    
    def get_loader_documents(self, file_path:str) -> any:
        if file_path.endswith(".pdf"):
            return PyPDFLoader(file_path=file_path)
        elif file_path.endswith(".txt"):
            return TextLoader(file_path=file_path)
        elif file_path.endswith(".docx"):
            return Docx2txtLoader(file_path=file_path)
        else:
            raise ValueError(f"Unsupported file type: {file_path}")

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
                print(f"File not found: {file_path}")
                return False
                
            # Initialize components if not done
            if not self.embedding or not self.llm:
                self._initialize_components()
            
            # Load document
            loader = self.get_loader_documents(file_path)
            documents = loader.load()
            print(f"Loaded document: {file_path} ({len(documents)} pages)")
            
            # Split documents
            text_splitter = RecursiveCharacterTextSplitter(
                chunk_size=self.chunk_size, 
                chunk_overlap=self.chunk_overlap
            )
            chunks = text_splitter.split_documents(documents=documents)
            print(f"Document split into {len(chunks)} chunks")
            
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
            
            print(f"Document added with ID: {doc_id} ({len(chunks)} chunks)")
            print(f"Total documents: {len(self.vectorstores)}")
            
            return True
            
        except Exception as e:
            print(f"Error loading document: {str(e)}")
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
            loader = self.get_loader_documents(file_path)
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
        """ลบเอกสาร (ลบทั้งไฟล์, vectorstore, และ metadata)"""
        try:
            if doc_id not in self.vectorstores:
                return {"success": False, "error": f"Document {doc_id} not found"}

            title = self.documents[doc_id]["title"]
            file_path = self.documents[doc_id].get("file_path")

            # 1. Delete from ChromaDB
            try:
                collection_name = f"doc_{doc_id}"
                vectorstore = self.vectorstores[doc_id]
                # Delete the entire collection
                vectorstore.delete_collection()
                print(f"Deleted ChromaDB collection: {collection_name}")
            except Exception as e:
                print(f"Warning: Could not delete ChromaDB collection: {str(e)}")

            # 2. Delete physical file
            if file_path and os.path.exists(file_path):
                try:
                    os.remove(file_path)
                    print(f"Deleted physical file: {file_path}")
                except Exception as e:
                    print(f"Warning: Could not delete file {file_path}: {str(e)}")

            # 3. Remove from memory
            del self.vectorstores[doc_id]
            del self.documents[doc_id]

            print(f"Successfully removed document: {doc_id} ({title})")
            print(f"Remaining documents: {len(self.vectorstores)}")

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
            print(f"Error answering question: {str(e)}")
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
