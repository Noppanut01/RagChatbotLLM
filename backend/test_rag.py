#!/usr/bin/env python3

# Quick test to verify llama3.2 integration
from langchain_ollama import OllamaLLM
from langchain_ollama import OllamaEmbeddings

print("Testing llama3.2 integration...")

try:
    # Test LLM
    llm = OllamaLLM(model="llama3.2", temperature=0.3)
    response = llm.invoke("ทดสอบการทำงานของ llama3.2 ตอบสั้นๆ")
    print(f"✅ LLM Test Success: {response}")
    
    # Test Embeddings
    embeddings = OllamaEmbeddings(model="mxbai-embed-large")
    test_embedding = embeddings.embed_query("ทดสอบ embedding")
    print(f"✅ Embeddings Test Success: Vector dimension = {len(test_embedding)}")
    
    print("\n🎉 All tests passed! llama3.2 is ready to use.")
    
except Exception as e:
    print(f"❌ Error: {e}")
