# Instructions for Claude Assistant

## Project Context
นี้คือโปรเจคปริญญานิพนธ์ "Web Application for Retrieval-Augmented Generation for Information Assistance"
ระบบตอบคำถามทั่วไปจากเอกสารที่ Admin อัปโหลด (ไม่จำกัดหัวข้อ)

## Current Project Status (เมื่อเริ่มใหม่ให้อ่านไฟล์นี้) - อัปเดต 2025-09-13

### ✅ สิ่งที่มีอยู่แล้ว
1. **Backend**: FastAPI + **Multi-Document RAG Service** ✅
2. **RAG Core**: LangChain + Ollama (llama3.2) + ChromaDB ✅
3. **Multi-Document RAG support** ✅ - รองรับหลายเอกสารพร้อมกัน
4. **Source attribution** ✅ - แสดงแหล่งที่มาของคำตอบ
5. **Document Management APIs** ✅ - GET /documents/list, DELETE /documents/{id}
6. **File Upload System** ✅ - POST /upload/ พร้อม auto-loading
7. **Document CRUD** ✅ - List และ Delete เอกสาร
8. **Frontend**: React skeleton (ยังไม่มี functionality)

### ⚠️ สิ่งที่ทำไปบางส่วน
1. **File Upload System** - มี upload พื้นฐาน แต่ยังไม่มี validation และรองรับแค่ PDF
2. **Document Management** - มี list/delete แต่ยังไม่มี search/filter/reprocessing

### ❌ สิ่งที่ยังขาด
1. **PostgreSQL database** - ยังไม่ได้ setup
2. **Authentication system** - ยังไม่มี JWT, login/register
3. **Admin dashboard** - ยังไม่มีเลย
4. **Functional chat UI** - ตอนนี้แค่ "Hello Chatbot"
5. **User Management** - ยังไม่มี roles, sessions
6. **File validation** - ยังไม่มี validation สำหรับ TXT, DOCX

## Technology Stack ที่ตกลงใช้
- Backend: Python + FastAPI + SQLAlchemy + PostgreSQL
- RAG: LangChain + Ollama (llama3.2) + ChromaDB + mxbai-embed-large
- Frontend: React + Vite + TailwindCSS
- Auth: JWT-based authentication

## Development Priority (30 วัน) - ความคืบหน้าปัจจุบัน
1. **Week 1**: Database + Backend APIs ⚠️ (บางส่วน - ข้าม PostgreSQL, ทำ Document APIs แล้ว)
2. **Week 2**: Document Management System ⚠️ (บางส่วน - File Upload + CRUD พื้นฐานเสร็จแล้ว)  
3. **Week 3**: Frontend Development ❌ (ยังไม่เริ่ม)
4. **Week 4**: Integration + Advanced Features ❌ (ยังไม่เริ่ม)

## สถานะปัจจุบัน (2025-09-13)
- ✅ **Day 3-4**: Multi-Document RAG Service เสร็จแล้ว
- ✅ **Day 5-7**: Document Management APIs เสร็จแล้ว (บางส่วน)
- ⚠️ **Day 8-9**: File Upload System เสร็จบางส่วน
- ⚠️ **Day 10-11**: Document CRUD เสร็จบางส่วน
- ❌ **Day 1-2**: PostgreSQL Setup ยังไม่ได้ทำ
- ❌ **Day 12-14**: User Management ยังไม่ได้ทำ

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
cd rag-chatbot
npm install
```

## Commands สำคัญ
- Backend: `uvicorn app:app --reload`
- Frontend: `npm run dev`
- Database: ยังไม่ได้ setup

---
**คำแนะนำ**: เมื่อเริ่ม session ใหม่ ให้อ่านไฟล์นี้และ PROJECT_ROADMAP.md เพื่อทำความเข้าใจสถานะปัจจุบันของโปรเจค

**อัปเดตล่าสุด**: 2025-09-13 - Multi-Document RAG และ Document Management APIs ทำงานได้แล้ว