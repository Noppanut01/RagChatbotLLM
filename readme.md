# RAG Chatbot LLM Project
## Web Application for Retrieval-Augmented Generation for Information Assistance

> Presented by Ojang and Little

## 🚀 Quick Start

```bash
# Install Ollama models
ollama pull llama3.2
ollama pull mxbai-embed-large

# Setup project
cd RagChatbotLLM/backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Run system
ollama serve  # Terminal 1
uvicorn app:app --reload  # Terminal 2
```

## 📡 API Usage
- **Upload**: http://localhost:8000/docs → POST `/upload/`
- **Chat**: POST `/prompt` with `{"question": "your question"}`
- **Health**: GET `/health`
