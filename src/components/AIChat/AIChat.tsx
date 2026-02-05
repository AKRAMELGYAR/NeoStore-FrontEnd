import { useState, useRef, useEffect } from 'react';
import api from '../../api/axios';

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'ai';
    timestamp: Date;
}

export default function AIChat() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: 'مرحباً! أنا مساعدك الذكي. كيف يمكنني مساعدتك في العثور على المنتجات؟\n\nHello! I\'m your AI assistant. How can I help you find products?',
            sender: 'ai',
            timestamp: new Date()
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    const toggleChat = () => {
        setIsOpen(!isOpen);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!inputValue.trim() || isLoading) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            text: inputValue,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsLoading(true);

        try {
            const response = await api.post('/product/ai', {
                prompt: inputValue
            });

            const aiMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: response.data.response || response.data.message || 'عذراً، لم أتمكن من معالجة طلبك.\n\nSorry, I couldn\'t process your request.',
                sender: 'ai',
                timestamp: new Date()
            };

            setMessages(prev => [...prev, aiMessage]);
        } catch (error) {
            console.error('AI Chat Error:', error);

            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: 'عذراً، حدث خطأ في الاتصال. يرجى المحاولة مرة أخرى.\n\nSorry, there was a connection error. Please try again.',
                sender: 'ai',
                timestamp: new Date()
            };

            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const formatMessage = (text: string) => {
        // Split by newlines and render each line
        return text.split('\n').map((line, index) => (
            <span key={index}>
                {line}
                {index < text.split('\n').length - 1 && <br />}
            </span>
        ));
    };

    return (
        <>
            {/* Chat Window */}
            <div className={`
        fixed bottom-24 right-6 z-50
        w-[90vw] sm:w-96 h-[500px]
        bg-white rounded-2xl shadow-2xl
        border border-gray-200
        flex flex-col
        transform transition-all duration-300 ease-in-out
        ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'}
        origin-bottom-right
      `}>
                {/* Header */}
                <div className="
          bg-gradient-to-r from-primary-800 to-primary-600
          px-6 py-4 rounded-t-2xl
          flex items-center justify-between
        ">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                                <i className="fa-solid fa-robot text-primary-800 text-xl"></i>
                            </div>
                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
                        </div>
                        <div>
                            <h3 className="text-white font-semibold">AI Assistant</h3>
                            <p className="text-white/80 text-xs">Online</p>
                        </div>
                    </div>
                    <button
                        onClick={toggleChat}
                        className="text-white hover:bg-white/20 rounded-full w-8 h-8 flex items-center justify-center transition"
                    >
                        <i className="fa-solid fa-xmark text-xl"></i>
                    </button>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                    {messages.map((message) => (
                        <div
                            key={message.id}
                            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className={`
                max-w-[80%] px-4 py-3 rounded-2xl
                ${message.sender === 'user'
                                    ? 'bg-primary-800 text-white rounded-br-sm'
                                    : 'bg-white text-gray-800 rounded-bl-sm shadow-md border border-gray-200'
                                }
              `}>
                                <p className="text-sm whitespace-pre-wrap break-words leading-relaxed">
                                    {formatMessage(message.text)}
                                </p>
                                <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-white/70' : 'text-gray-500'}`}>
                                    {message.timestamp.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                                </p>
                            </div>
                        </div>
                    ))}

                    {isLoading && (
                        <div className="flex justify-start">
                            <div className="bg-white text-gray-800 px-4 py-3 rounded-2xl rounded-bl-sm shadow-md border border-gray-200">
                                <div className="flex gap-1">
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <form onSubmit={handleSubmit} className="p-4 bg-white border-t border-gray-200 rounded-b-2xl">
                    <div className="flex gap-2">
                        <input
                            ref={inputRef}
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="اكتب سؤالك هنا... Type your question..."
                            className="
                flex-1 px-4 py-3 rounded-full
                border border-gray-300
                focus:outline-none focus:ring-2 focus:ring-primary-800 focus:border-transparent
                text-sm
                placeholder:text-gray-400
              "
                            disabled={isLoading}
                        />
                        <button
                            type="submit"
                            disabled={isLoading || !inputValue.trim()}
                            className="
                w-12 h-12 rounded-full
                bg-primary-800 text-white
                hover:bg-primary-700
                disabled:bg-gray-300 disabled:cursor-not-allowed
                flex items-center justify-center
                transition-all duration-200
                hover:scale-105 active:scale-95
              "
                        >
                            {isLoading ? (
                                <i className="fa-solid fa-spinner fa-spin"></i>
                            ) : (
                                <i className="fa-solid fa-paper-plane"></i>
                            )}
                        </button>
                    </div>
                </form>
            </div>

            {/* Floating Button */}
            <button
                onClick={toggleChat}
                className={`
          fixed bottom-6 right-6 z-50
          w-16 h-16 rounded-full
          bg-black
          text-white
          shadow-2xl
          hover:scale-110 active:scale-95
          transition-all duration-300
          flex items-center justify-center
          group
          ${isOpen ? 'rotate-0' : 'rotate-0 hover:rotate-12'}
        `}
            >
                <i className={`fa-solid ${isOpen ? 'fa-xmark' : 'fa-robot'} text-2xl transition-transform duration-300 ${!isOpen && 'group-hover:scale-110'}`}></i>

                {/* Pulse Animation */}
                {!isOpen && (
                    <>
                        <span className="absolute inset-0 rounded-full bg-black animate-ping opacity-75"></span>
                        <span className="absolute inset-0 rounded-full bg-black animate-pulse"></span>
                    </>
                )}

                {/* Notification Badge */}
                {!isOpen && messages.length > 1 && (
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold border-2 border-white">
                        !
                    </div>
                )}
            </button>
        </>
    );
}
