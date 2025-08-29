from langchain_ollama import OllamaEmbeddings
from langchain_ollama import OllamaLLM
from langchain.schema.runnable import RunnablePassthrough
from langchain_chroma import Chroma
from langchain_core.prompts import ChatPromptTemplate
# from langchain_community.document_loaders import DirectoryLoader
from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_core.output_parsers import StrOutputParser
from langchain.retrievers import ContextualCompressionRetriever
from langchain.retrievers.document_compressors import LLMChainExtractor



loader = PyPDFLoader("./data/02_Git&Git Hub.pdf")
document = loader.load()
# print(document)

text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=50)
chunks = text_splitter.split_documents(documents=document)
# print(chunks)
embedding = OllamaEmbeddings(model="mxbai-embed-large")

vectorstore = Chroma.from_documents(embedding=embedding, documents=chunks, persist_directory="./chroma_store")

prompt = ChatPromptTemplate.from_messages(
    [
        (
            "system",
            "คุณคือแชทบอทที่ตอบคำถามจากเอกสารที่ให้มา "
            "ห้ามใช้ความรู้ภายนอก ถ้าไม่พบคำตอบให้ตอบว่า 'ไม่มีข้อมูล' แต่สามารถให้คำแนะนำทั่วไปหรือบอกขอบเขตความรู้ที่มีได้\n\n"
            "ถ้าพบคำตอบ ให้ตอบโดยอ้างอิงตามเนื้อหาในเอกสาร "
            "และควรบอกส่วนหัวข้อ/section ถ้ามี"
        ),
        (
            "human",
            "คำถาม: {question}\n\nเอกสารที่เกี่ยวข้อง:\n{context}"
        ),
    ]
)

llama = OllamaLLM(model="llama3.2", temperature=0.3)
compressor = LLMChainExtractor.from_llm(llama)

retrievers = vectorstore.as_retriever(
    search_type="mmr",
    search_kwargs={"k": 5, "fetch_k": 20}
)
compression_retriever = ContextualCompressionRetriever(
    base_compressor=compressor, base_retriever=retrievers
)


    
chain = (
    {"context" : retrievers, "question" : RunnablePassthrough()} 
    | prompt
    | llama
    | StrOutputParser()
)

while True:
    question = input("Enter your question : ")
    if question.lower() in ("exit", "quit"):
        break
    result = chain.invoke(question)
    print(result)