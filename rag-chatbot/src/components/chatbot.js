import { useState } from "react";

function Chatbot() {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!question.trim()) return;

        try {
            const response = await fetch("http://127.0.0.1:8000/chat", {  // เปลี่ยน URL ตาม backend ของคุณ
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ question }),
            });
            const data = await response.json();
            setAnswer(data.answer);
        } catch (error) {
            console.error("Error fetching answer:", error);
            setAnswer("เกิดข้อผิดพลาดในการเชื่อมต่อ API");
        }
    };

    return (
        <div className="Chatbot">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="พิมพ์คำถามของคุณที่นี่..."
                />
                <input type="submit" value="ถาม" />
            </form>
            <div>
                <strong>คำตอบ:</strong> {answer}
            </div>
        </div>
    );
}

export default Chatbot;