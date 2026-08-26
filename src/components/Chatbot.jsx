import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Sparkles, User, ExternalLink, Download, MessageSquare, ChevronRight } from 'lucide-react';
import { PERSONAL_INFO, PROJECTS, EXPERIENCE, EDUCATION, SKILLS_CATEGORIES } from '../data/portfolioData';

export const Chatbot = ({ onOpenResume }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: "👋 Hi! I'm Rounak's AI Portfolio Assistant. Ask me anything about Rounak's Food Bridge AI platform, Arus Homes freelance project, AI/ML skills, Infosys internship, or resume!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const quickPrompts = [
    { label: '🍔 Food Bridge AI', query: 'Tell me about the Food Bridge AI project' },
    { label: '🏠 Arus Homes', query: 'Tell me about the Arus Homes freelance project' },
    { label: '🤖 AI/ML Skills', query: 'What are Rounak\'s machine learning & AI skills?' },
    { label: '🏢 Infosys Internship', query: 'Tell me about Rounak\'s Infosys Springboard internship' },
    { label: '📄 Download Resume', query: 'How can I view or download Rounak\'s resume?' }
  ];

  const handleSend = (textToSend) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg = {
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = generateBotResponse(query.toLowerCase());
      setMessages((prev) => [...prev, response]);
      setIsTyping(false);
    }, 600);
  };

  const generateBotResponse = (lower) => {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    if (lower.includes('food') || lower.includes('bridge') || lower.includes('redistribution')) {
      return {
        sender: 'bot',
        text: "Food Bridge AI is Rounak's full-stack AI platform built during his Infosys Springboard Internship 7.0. It minimizes urban food waste by connecting surplus food donors with local NGOs using FastAPI backend, React frontend, and demand forecasting algorithms.",
        link: "https://food-redistribution-ai.vercel.app/",
        linkText: "Visit Food Bridge AI Live App",
        timestamp
      };
    }

    if (lower.includes('arus') || lower.includes('homes') || lower.includes('freelance') || lower.includes('real estate')) {
      return {
        sender: 'bot',
        text: "Arus Homes is a freelance real estate platform engineered by Rounak for Arus Homes Developers. It features interactive property catalogs, virtual tour pipelines, custom price/location filters, and client lead management workflows.",
        timestamp
      };
    }

    if (lower.includes('bizz') || lower.includes('bizzapp')) {
      return {
        sender: 'bot',
        text: "BizzApp is Rounak's smart business management platform built with Django, MySQL, and JavaScript. It features automated PDF invoice generation, inventory tracking, and sales analytics.",
        link: "https://bizzapp.onrender.com",
        linkText: "Visit BizzApp Live Site",
        timestamp
      };
    }

    if (lower.includes('skill') || lower.includes('ml') || lower.includes('ai') || lower.includes('python') || lower.includes('tech')) {
      return {
        sender: 'bot',
        text: "Rounak's core skills include:\n• Machine Learning: Scikit-Learn, Random Forest, XGBoost, Deep Learning (PyTorch, TensorFlow)\n• NLP & GenAI: Prompt Engineering, OpenAI GPT Models, TF-IDF, NLTK\n• Full-Stack: FastAPI, Django, React.js, Python, SQL/MySQL, Tailwind CSS\n• Data Science: Pandas, NumPy, Power BI, Streamlit, Matplotlib",
        timestamp
      };
    }

    if (lower.includes('infosys') || lower.includes('intern') || lower.includes('experience')) {
      return {
        sender: 'bot',
        text: "Rounak is currently an AI Developer Intern at Infosys Springboard Internship 7.0 (Virtual), where he architects the Food Bridge AI platform using React, FastAPI, MySQL, and Scikit-Learn. He also freelances for client projects like Arus Homes Developers.",
        timestamp
      };
    }

    if (lower.includes('resume') || lower.includes('cv') || lower.includes('download')) {
      return {
        sender: 'bot',
        text: "You can preview and download Rounak's official 1-page PDF resume directly from the header button or right here!",
        action: 'resume',
        timestamp
      };
    }

    if (lower.includes('contact') || lower.includes('hire') || lower.includes('email') || lower.includes('phone')) {
      return {
        sender: 'bot',
        text: `You can reach Rounak directly:\n• Email: ${PERSONAL_INFO.email}\n• Phone: ${PERSONAL_INFO.phone}\n• Location: Pune, Maharashtra, India\nOr send a message using the Contact section below!`,
        timestamp
      };
    }

    if (lower.includes('education') || lower.includes('cgpa') || lower.includes('college') || lower.includes('degree')) {
      return {
        sender: 'bot',
        text: "Rounak is pursuing his B.Tech in Computer Engineering at Bharati Vidyapeeth College of Engineering, Pune (2023–2027) with a current CGPA of 8.7 / 10.",
        timestamp
      };
    }

    return {
      sender: 'bot',
      text: "I can assist you with details about Rounak's Food Bridge AI platform, Arus Homes freelance project, BizzApp, AI/ML skills, Infosys internship, CGPA, or resume!",
      timestamp
    };
  };

  return (
    <>
      {/* Floating Widget Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-600 text-white shadow-2xl shadow-cyan-500/40 hover:scale-110 active:scale-95 transition-all duration-300 flex items-center gap-2 group"
        title="Chat with Rounak's AI Portfolio Assistant"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-300 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-300"></span>
        </span>
        <Bot className="w-6 h-6" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 whitespace-nowrap text-xs font-bold font-mono pr-1">
          Rounak AI Assistant
        </span>
      </button>

      {/* Floating Chat Drawer Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-96 h-[520px] max-h-[80vh] glass-card rounded-3xl border border-slate-700 shadow-2xl flex flex-col justify-between overflow-hidden animate-in zoom-in-95 duration-200">
          
          {/* Drawer Header */}
          <div className="p-4 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative p-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white">
                <Bot className="w-5 h-5" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-slate-900"></span>
              </div>
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                  <span>Rounak AI Assistant</span>
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                </h3>
                <div className="text-[10px] font-mono text-cyan-400">Online • Portfolio Knowledge Base</div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white border border-slate-700"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 font-sans text-xs">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-2xl ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white rounded-br-none shadow-md'
                      : 'bg-slate-900/90 text-slate-200 border border-slate-800 rounded-bl-none shadow-md'
                  }`}
                >
                  <p className="whitespace-pre-line leading-relaxed">{msg.text}</p>
                  
                  {/* Action link if available */}
                  {msg.link && (
                    <a
                      href={msg.link}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 font-semibold text-[11px] border border-emerald-500/30 hover:bg-emerald-500/30 transition"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>{msg.linkText}</span>
                    </a>
                  )}

                  {/* Resume Action if available */}
                  {msg.action === 'resume' && (
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        onOpenResume();
                      }}
                      className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500/20 text-cyan-300 font-semibold text-[11px] border border-cyan-500/30 hover:bg-cyan-500/30 transition"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Open & Download Resume PDF</span>
                    </button>
                  )}
                </div>

                <span className="text-[9px] font-mono text-slate-500 mt-1 px-1">{msg.timestamp}</span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1.5 p-3 rounded-2xl bg-slate-900/90 border border-slate-800 text-slate-400 w-20">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce [animation-delay:0.4s]"></span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Bar */}
          <div className="px-3 py-2 border-t border-slate-800/80 bg-slate-950/60 overflow-x-auto no-scrollbar flex items-center gap-1.5">
            {quickPrompts.map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(item.query)}
                className="px-2.5 py-1 rounded-full bg-slate-900 text-slate-300 text-[10px] font-medium whitespace-nowrap border border-slate-800 hover:text-cyan-300 hover:border-cyan-500/40 transition shrink-0"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Input Form Footer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-slate-900 border-t border-slate-800 flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask a question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 px-3 py-2 rounded-xl glass-card text-xs text-white placeholder-slate-400 border border-slate-800 focus:outline-none focus:border-cyan-500 transition"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="p-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white disabled:opacity-50 transition"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </>
  );
};
