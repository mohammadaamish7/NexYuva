import { useState, useRef, useEffect } from 'react';

interface Message {
  id: string;
  sender: 'user' | 'studio';
  text: string;
  time: string;
}

export default function DMSimulator() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'studio',
      text: "Hey! We're NexYuva. We design and build elite digital work — websites, invitation suites, fitness planners, and academic projects. Let's build something epic. What's on your mind?",
      time: 'Just now',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState('all');
  const chatEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    { label: '✨ Website Design', val: 'I need a fast, high-speed website for my business. What is your process?', topic: 'web' },
    { label: '💌 Custom Invite', val: 'I want to build a custom animated wedding invitation card. How do we start?', topic: 'invite' },
    { label: '🔥 Fitness challenge', val: 'Tell me about the 75-Day Challenge kits. What does it include?', topic: 'fitness' },
    { label: '🎓 Final-Year IEEE Project', val: 'I need end-to-end guidance and source code for my IEEE project.', topic: 'project' },
  ];

  const handleSend = async (textToSend: string, topic = 'all') => {
    if (!textToSend.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);
    setSelectedTopic(topic);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({
            sender: m.sender,
            text: m.text,
          })),
          selectedProject: topic,
        }),
      });

      const data = await response.json();
      
      const studioReply: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'studio',
        text: data.text || "That sounds fascinating! Hit us up on Instagram DM (@nexyuva) or leave your contact details so we can draft a direct quote!",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, studioReply]);
    } catch (e) {
      console.error('Error fetching chat response:', e);
      // Fallback
      const fallbackReply: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'studio',
        text: "Thanks! We'd love to help you build that. Our team responds instantly to direct messages on Instagram. Reach out at instagram.com/nexyuva and let's get started!",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackReply]);
    } finally {
      setIsTyping(false);
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <div className="w-full max-w-lg mx-auto bg-[#141021] border border-white/8 rounded-2xl overflow-hidden shadow-2xl flex flex-col h-[520px] select-none">
      {/* Instagram mock chat header */}
      <div className="bg-[#1B1530] border-b border-white/6 p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-full bg-gradient-to-tr from-[#4338CA] to-[#A855F7] p-0.5 flex items-center justify-center">
            <div className="w-full h-full bg-[#141021] rounded-full flex items-center justify-center font-display font-semibold text-xs text-[#A855F7]">
              NY
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-[#1B1530] rounded-full" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h4 className="text-sm font-display font-semibold text-white">NexYuva</h4>
              <span className="text-[10px] bg-purple-900/40 text-[#C9A8FF] px-1.5 py-0.5 rounded-md font-mono">
                STUDIO
              </span>
            </div>
            <p className="text-[10px] text-[#A29DB8]">Active now · @nexyuva</p>
          </div>
        </div>

        <a 
          href="https://www.instagram.com/nexyuva/" 
          target="_blank" 
          rel="noopener"
          className="text-xs font-mono text-[#A855F7] hover:text-white transition-colors uppercase border border-[#A855F7]/30 px-2.5 py-1 rounded-full bg-purple-950/20"
        >
          Open IG
        </a>
      </div>

      {/* Messages body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-[#141021] to-[#0B0A12] scrollbar-thin scrollbar-thumb-white/5">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col max-w-[82%] ${
              msg.sender === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'
            }`}
          >
            <div
              className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-gradient-to-r from-[#4338CA] to-[#7C3AED] text-white rounded-br-none'
                  : 'bg-[#1B1530] border border-white/5 text-[#F4F2FB] rounded-bl-none'
              }`}
            >
              {msg.text}
            </div>
            <span className="text-[9px] text-[#5B5570] font-mono mt-1 px-1">{msg.time}</span>
          </div>
        ))}

        {isTyping && (
          <div className="flex flex-col max-w-[80%] mr-auto items-start">
            <div className="rounded-2xl px-4 py-3 bg-[#1B1530] text-[#A29DB8] rounded-bl-none flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-[#A855F7] rounded-full animate-bounce delay-100" />
              <span className="w-1.5 h-1.5 bg-[#A855F7] rounded-full animate-bounce delay-200" />
              <span className="w-1.5 h-1.5 bg-[#A855F7] rounded-full animate-bounce delay-300" />
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Quick topics selectors */}
      <div className="p-2.5 bg-[#141021]/80 border-t border-white/5 flex gap-2 overflow-x-auto scrollbar-none whitespace-nowrap">
        {quickPrompts.map((p, i) => (
          <button
            key={i}
            onClick={() => handleSend(p.val, p.topic)}
            className="text-[11px] bg-[#1B1530] hover:bg-[#251D44] border border-white/8 hover:border-[#7C3AED]/40 text-[#A29DB8] hover:text-white px-3 py-1.5 rounded-full transition-all cursor-pointer inline-block"
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Message input bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (inputText.trim()) {
            handleSend(inputText);
          }
        }}
        className="p-3 bg-[#1B1530] border-t border-white/6 flex gap-2 items-center"
      >
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Message @nexyuva..."
          className="flex-1 bg-[#141021] border border-white/8 rounded-full px-4 py-2 text-sm text-white focus:outline-none focus:border-[#7C3AED] transition-all"
        />
        <button
          type="submit"
          disabled={!inputText.trim() || isTyping}
          className="text-white bg-gradient-to-r from-[#4338CA] to-[#7C3AED] disabled:from-gray-800 disabled:to-gray-800 disabled:opacity-50 p-2.5 rounded-full transition-all duration-300 transform active:scale-90"
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4" stroke="currentColor" fill="none" strokeWidth="2.5">
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </button>
      </form>
    </div>
  );
}
