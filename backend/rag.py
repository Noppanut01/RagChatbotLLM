from langchain_ollama import OllamaEmbeddings
from langchain_ollama import OllamaLLM
from langchain.schema.runnable import RunnablePassthrough
from langchain_chroma import Chroma
from langchain_core.prompts import ChatPromptTemplate
# from langchain_community.document_loaders import DirectoryLoader
from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_core.output_parsers import StrOutputParser

loader = PyPDFLoader("./data/02_Git&Git Hub.pdf")
document = loader.load()
# print(document)

text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=50)
chunks = text_splitter.split_documents(documents=document)
# print(chunks)
embbedding = OllamaEmbeddings(model="mxbai-embed-large")

vectorstore = Chroma.from_documents(embedding=embbedding, documents=chunks)

prompt = ChatPromptTemplate.from_messages(
    [
        ("system","ใช้ข้อมูลภายในเอกสารที่เกี่ยวตอบเท่่านั้น หากคำถามไม่เกี่ยวข้่องกับข้อมูลที่มีให้ตอบกลับว่าไม่มีข้อมูล"),
        ("human","คำถาม : {question}, เอกสารที่เกี่ยวข้อง : {context}"),
    ]
)

llama = OllamaLLM(model="llama3.2", temperature=0.3)
retrievers = vectorstore.as_retriever()
chain = (
    {"context" : retrievers, "question" : RunnablePassthrough()} 
    | prompt
    | llama
    | StrOutputParser()
)

while True:
    question = input("Enter your question : ")
    result = chain.invoke(question)
    print(result)