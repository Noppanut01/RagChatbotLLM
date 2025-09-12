# Instructions for Claude Assistant

## Project Context
นี้คือโปรเจคปริญญานิพนธ์ "Web Application for Retrieval-Augmented Generation for Information Assistance"
ระบบตอบคำถามทั่วไปจากเอกสารที่ Admin อัปโหลด (ไม่จำกัดหัวข้อ)

## Current Project Status (เมื่อเริ่มใหม่ให้อ่านไฟล์นี้)

### ✅ สิ่งที่มีอยู่แล้ว
1. **Backend**: FastAPI + Single-Document RAG Service
2. **RAG Core**: LangChain + Ollama (llama3.2) + ChromaDB
3. **Frontend**: React skeleton (ยังไม่มี functionality)

### ❌ สิ่งที่ยังขาด
1. **Multi-Document RAG support** - ตอนนี้รองรับแค่ 1 เอกสาร
2. **PostgreSQL database** - ยังไม่มีเลย
3. **Document management system** - ยังไม่มีเลย
4. **Admin dashboard** - ยังไม่มีเลย
5. **Functional chat UI** - ตอนนี้แค่ "Hello Chatbot"
6. **Source attribution** - ไม่ระบุแหล่งที่มา

## Technology Stack ที่ตกลงใช้
- Backend: Python + FastAPI + SQLAlchemy + PostgreSQL
- RAG: LangChain + Ollama (llama3.2) + ChromaDB + mxbai-embed-large
- Frontend: React + Vite + TailwindCSS
- Auth: JWT-based authentication

## Development Priority (30 วัน)
1. **Week 1**: Database + Backend APIs
2. **Week 2**: Document Management System  
3. **Week 3**: Frontend Development
4. **Week 4**: Integration + Advanced Features

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