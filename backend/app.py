from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # หรือ ["*"] ชั่วคราวถ้าทดสอบในเครื่อง
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
class Query(BaseModel):
    question: str

@app.post("/prompt")
async def prompt(query: Query):
    # ตัวอย่างตอบกลับ
    return {"answer": f"คุณถามว่า: {query.question}"}


