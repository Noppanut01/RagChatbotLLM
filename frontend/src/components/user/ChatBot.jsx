import React, { useEffectEvent, useState } from 'react';
import { MessageCircle, X, Send, Bot } from 'lucide-react';
import { ThreeDots } from 'react-loader-spinner';
import { chatAPI } from '../../services/apis';
const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{
    id: 0,
    type: 'bot',
    message: 'สวัสดีครับ! ผมคือผู้ช่วยข้าวไทย พร้อมตอบคำถามเกี่ยวกับข้าวไทยให้คุณครับ'
  }]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      message: inputMessage
    };
    setMessages(prev => [...prev, userMessage]);

    const currentQuestion = inputMessage;
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await chatAPI.sendMessage(currentQuestion);
      const botMessage = {
        id: messages.length + 2,
        type: 'bot',
        message: response.answer || 'ขออภัย ไม่สามารถหาคำตอบได้'
      };
      setMessages(prev => [...prev, botMessage]);

    } catch (e) {
      console.error("Error:", e);

      // Add error message
      const errorMessage = {
        id: messages.length + 2,
        type: 'bot',
        message: 'ขออภัย เกิดข้อผิดพลาดในการเชื่อมต่อ'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <>
      {/* Chat Widget Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-16 h-16 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110 ${isOpen
            ? 'bg-red-500 hover:bg-red-600'
            : 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 animate-pulse'
            }`}
        >
          {isOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <MessageCircle className="w-6 h-6 text-white" />
          )}
        </button>

        {!isOpen && (
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-xs text-white font-bold">1</span>
          </div>
        )}
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 h-96 bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-4 text-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold">ผู้ช่วยข้าวไทย</h3>
                <p className="text-xs opacity-90">พร้อมช่วยเหลือคุณ</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${msg.type === 'user'
                    ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white'
                    : 'bg-white text-gray-800 shadow-sm border'
                    }`}
                >
                  <p className="text-sm whitespace-pre-line leading-relaxed">{msg.message}</p>
                </div>
              </div>
            ))}

            {/* Loading Animation */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white p-3 rounded-2xl shadow-sm border">
                  <ThreeDots
                    height="25"
                    width="40"
                    radius="7"
                    color="#f97316"
                    ariaLabel="three-dots-loading"
                    visible={true}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t bg-white">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="พิมพ์ข้อความ..."
                disabled={isLoading}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
              <button
                onClick={handleSendMessage}
                disabled={isLoading || !inputMessage.trim()}
                className="w-10 h-10 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl flex items-center justify-center hover:from-orange-600 hover:to-amber-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
