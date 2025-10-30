# Instructions for Claude Assistant

## Project Context
นี้คือโปรเจคปริญญานิพนธ์ "Web Application for Retrieval-Augmented Generation for Information Assistance"
ระบบตอบคำถามทั่วไปจากเอกสารที่ Admin อัปโหลด (ไม่จำกัดหัวข้อ)

## Current Project Status (เมื่อเริ่มใหม่ให้อ่านไฟล์นี้) - Latest Update

### ✅ สิ่งที่มีอยู่แล้ว (ทำงานได้แล้ว)
1. **Backend**: FastAPI + **Multi-Document RAG Service** ✅
2. **RAG Core**: LangChain + Ollama (llama3.2) + ChromaDB ✅
3. **Multi-Document RAG support** ✅ - รองรับหลายเอกสารพร้อมกัน
4. **Source attribution** ✅ - แสดงแหล่งที่มาของคำตอบ
5. **Document Management APIs** ✅ - GET /documents/list, DELETE /documents/{id} (ลบทั้งไฟล์+DB)
6. **File Upload System** ✅ - POST /upload/ รองรับ PDF/TXT/DOCX พร้อม auto-replace duplicate
7. **Document CRUD** ✅ - List, Upload, Delete เอกสารครบ
8. **Admin Dashboard** ✅ - Document table, Upload modal, Delete functionality
9. **ChatBot Widget** ✅ - ทำงานได้เต็มรูปแบบ พร้อม loading animation
10. **API Service Layer** ✅ - Frontend APIs สำหรับ chat/upload/delete

### ❌ สิ่งที่ยังขาด
1. **PostgreSQL database** - ยังไม่ได้ setup (ใช้ ChromaDB อย่างเดียว)
2. **Authentication system** - ยังไม่มี JWT, login/register
3. **Chat history** - ไม่มีการเก็บประวัติการสนทนา
4. **User Management** - ยังไม่มี roles, sessions
5. **Analytics Dashboard** - ยังไม่มีสถิติการใช้งาน
6. **Prompt Template Management** - ยังไม่มี

## Technology Stack ที่ตกลงใช้
- Backend: Python + FastAPI + SQLAlchemy + PostgreSQL
- RAG: LangChain + Ollama (llama3.2) + ChromaDB + mxbai-embed-large
- Frontend: React + Vite + TailwindCSS
- Auth: JWT-based authentication

## Development Priority (30 วัน) - ความคืบหน้าปัจจุบัน
1. **Week 1**: Database + Backend APIs ⚠️ (ข้าม PostgreSQL, Document APIs เสร็จแล้ว)
2. **Week 2**: Document Management System ✅ (File Upload + CRUD เสร็จแล้ว)
3. **Week 3**: Frontend Development ✅ (Admin Dashboard + ChatBot ทำงานได้แล้ว)
4. **Week 4**: Integration + Advanced Features ❌ (ยังไม่เริ่ม - Auth, Analytics, History)

## สถานะปัจจุบัน
- ✅ **Multi-Document RAG Service** - เสร็จสมบูรณ์
- ✅ **Document Management APIs** - List/Upload/Delete ครบ
- ✅ **File Upload System** - รองรับ PDF/TXT/DOCX + duplicate prevention
- ✅ **Document CRUD** - เสร็จสมบูรณ์
- ✅ **Admin Dashboard** - Document management UI ทำงานได้
- ✅ **ChatBot Widget** - Chat interface พร้อม loading animation
- ❌ **PostgreSQL Setup** - ยังไม่ได้ทำ
- ❌ **User Management** - ยังไม่ได้ทำ

## Key Requirements จาก Proposal
1. Admin สามารถอัปโหลด/จัดการเอกสารทุกประเภท (ไม่จำกัดหัวข้อ)
2. User ใช้ chatbot widget ถามคำถาม (ไม่ต้องล็อกอิน)
3. Admin dashboard แสดงสถิติการใช้งาน
4. รองรับเอกสาร text-based: PDF, TXT, DOCX
5. ระบบแสดงแหล่งที่มาของคำตอบ
6. รองรับการค้นหาข้ามหลายเอกสาร
7. เก็บข้อมูลใน PostgreSQL

## Files to Check เมื่อเริ่มงานใหม่
- `/PROJECT_ROADMAP.md` - แผนงานรายละเอียด
- `/backend/app.py` - FastAPI main app
- `/backend/rag_service.py` - RAG service
- `/rag-chatbot/src/` - Frontend source

## บทบาทของ Claude
- เป็นผู้ช่วยแนะนำ/ไกด์การพัฒนา
- ไม่เขียนโค้ดให้ แต่แนะนำวิธีทำและ resources
- ช่วยวิเคราะห์ปัญหาและหาแนวทางแก้ไข
- ให้ step-by-step instructions

## การติดตั้ง Dependencies ปัจจุบัน
### Backend
```bash
cd backend
pip install -r requirements.txt
```

### Frontend
```bash
cd frontend
npm install
```

## Commands สำคัญ
- Backend: `cd backend && uvicorn app:app --reload`
- Frontend: `cd frontend && npm run dev`
- Ollama: `ollama serve` (ต้องรันก่อนเสมอ)

## ไฟล์สำคัญที่อัพเดตแล้ว
- `backend/app.py` - Upload/Delete endpoints พร้อม duplicate prevention
- `backend/rag_service.py` - Complete delete (file + ChromaDB)
- `frontend/src/services/apis.js` - All API endpoints working
- `frontend/src/pages/admin/Dashboard.jsx` - Full document management
- `frontend/src/components/user/ChatBot.jsx` - Working chat with loading
- `frontend/src/components/admin/DocumentTable.jsx` - Simplified table
- `frontend/src/components/admin/UploadModal.jsx` - Multi-file upload

---
**คำแนะนำ**: เมื่อเริ่ม session ใหม่ ให้อ่านไฟล์นี้และ PROJECT_ROADMAP.md เพื่อทำความเข้าใจสถานะปัจจุบันของโปรเจค

**อัปเดตล่าสุด**: Admin Dashboard + ChatBot Widget เสร็จสมบูรณ์ พร้อมใช้งานได้แล้ว