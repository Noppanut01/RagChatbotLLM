# Quick Start Guide สำหรับ Claude Session ใหม่

## การเริ่มต้นเซสชันใหม่
```
Hi Claude! อ่านไฟล์เหล่านี้ก่อน:
- PROJECT_ROADMAP.md 
- CLAUDE_INSTRUCTIONS.md
- QUICK_START.md

นี้คือโปรเจค "Web Application for RAG Information Assistance" ปริญญานิพนธ์
เราพร้อมเริ่ม [สัปดาห์/วันที่จะทำต่อ]
```

## Commands พื้นฐาน
```bash
# Run server
cd /home/noppanut/Projects/RagChatBotLLM/backend
uvicorn app:app --reload

# Test endpoints
curl -X GET http://localhost:8000/health
curl -X GET http://localhost:8000/documents/list
```

## Next Phase
ดู **PROJECT_ROADMAP.md** สำหรับ roadmap ที่สมบูรณ์และสิ่งที่ต้องทำต่อไป