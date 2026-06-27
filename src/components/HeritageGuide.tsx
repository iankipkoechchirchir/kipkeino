/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { Sparkles, MessageSquare, Send, Bot, User, Trash2, ArrowDown } from 'lucide-react';

interface HeritageGuideProps {
  onSendMessage: (messages: ChatMessage[]) => Promise<string>;
}

export const HeritageGuide: React.FC<HeritageGuideProps> = ({ onSendMessage }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: "Jambo! I am your official AI Heritage Guide on the legacy of Kipchoge Keino. Ask me about my 1968 Mexico City Olympic run, the 1972 Steeplechase triumph, our schools and orphanages in Eldoret, or the progress on our Eldoret Stadium!",
      timestamp: new Date().toISOString()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [errorText, setErrorText] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedPrompts = [
    { text: "1968 Gallbladder Run", prompt: "Tell me about your legendary 1968 Mexico City 1500m Gold run and running 2 miles to the stadium." },
    { text: "Munich Steeplechase", prompt: "How did you win the 3000m Steeplechase in 1972 with almost no steeplechase experience?" },
    { text: "Eldoret Philanthropy", prompt: "Tell me about the children's home and schools you founded in Eldoret." },
    { text: "Eldoret Stadium AFCON", prompt: "What is the timeline and goal of the Kipchoge Keino Stadium upgrade in Eldoret?" }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSubmit = async (e?: React.FormEvent, customText?: string) => {
    if (e) e.preventDefault();
    const textToSend = customText || inputText;
    if (!textToSend.trim()) return;

    setErrorText(null);
    if (!customText) setInputText('');

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: textToSend,
      timestamp: new Date().toISOString()
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setIsTyping(true);

    try {
      const responseText = await onSendMessage(updatedMessages);
      
      const modelMsg: ChatMessage = {
        id: `model-${Date.now()}`,
        role: 'model',
        text: responseText,
        timestamp: new Date().toISOString()
      };
      
      setMessages((prev) => [...prev, modelMsg]);
    } catch (err: any) {
      console.error(err);
      setErrorText('I am currently running in simulated legacy mode due to rate limits. I can still answer specific historical questions! Try asking about 1968 or 1972.');
      
      // Fallback response simulation inside the client if fetch failed completely
      setTimeout(() => {
        const lowerText = textToSend.toLowerCase();
        let fallbackReply = "I am operating in emergency archives. ";
        
        if (lowerText.includes('1968') || lowerText.includes('mexico') || lowerText.includes('jog')) {
          fallbackReply += "In the 1968 Mexico City Olympics, despite suffering from severe gallbladder infection, I jogged 2 miles to the stadium on foot because of heavy traffic, arriving just in time to win Gold in the 1500m final by a record-breaking 2.98 seconds!";
        } else if (lowerText.includes('1972') || lowerText.includes('munich') || lowerText.includes('steeplechase')) {
          fallbackReply += "In the 1972 Munich Olympics, I entered the 3000m steeplechase despite having very limited steeplechase training. I leaped hurdles, cleared the water pits, and secured Gold in Olympic Record time (8:23.6)!";
        } else if (lowerText.includes('philanthr') || lowerText.includes('children') || lowerText.includes('home')) {
          fallbackReply += "Following my athletic career, my wife Phyllis and I established the Kip Keino Children's Home in Eldoret, alongside our primary and secondary schools, to provide shelter, education, and hope to hundreds of orphaned children.";
        } else if (lowerText.includes('stadium') || lowerText.includes('eldoret') || lowerText.includes('construction')) {
          fallbackReply += "The legendary Kipchoge Keino Stadium in Eldoret is undergoing massive upgrades managed by the Ministry of Defence / KDF and Sinohydro Corporation. It is currently over 82% complete and on schedule for a December 31, 2026 delivery, designed to host AFCON 2027 matches!";
        } else {
          fallbackReply += "Kipchoge Keino pioneered Kenyan athletics on the global stage. Ask me about the 1968 Mexico City Olympic miracles, the 1972 Steeplechase debut, or our children's homes and legacy initiatives in Eldoret!";
        }

        setMessages((prev) => [
          ...prev,
          {
            id: `model-fallback-${Date.now()}`,
            role: 'model',
            text: fallbackReply,
            timestamp: new Date().toISOString()
          }
        ]);
        setIsTyping(false);
      }, 800);
      return;
    } finally {
      setIsTyping(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: 'welcome',
        role: 'model',
        text: "Jambo! Chat logs cleared. How can I help you explore Kipchoge Keino's historical athletics and philanthropy journey today?",
        timestamp: new Date().toISOString()
      }
    ]);
    setErrorText(null);
  };

  return (
    <div className="bg-[#0D0D0D] border border-neutral-800 rounded-xl p-5 sm:p-6 shadow-2xl relative overflow-hidden flex flex-col h-[550px] justify-between" id="heritage-ai-container">
      {/* Visual Accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-400" />

      {/* Panel Title */}
      <div>
        <div className="flex items-center justify-between border-b border-neutral-800 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-amber-500" />
            <div>
              <h3 className="text-base font-serif font-light text-white tracking-tight flex items-center gap-1.5">
                AI Heritage Assistant
                <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              </h3>
              <p className="text-[10px] text-neutral-500 font-mono">Powered by Gemini 3.5-flash • Secure Server API</p>
            </div>
          </div>
          <button 
            onClick={clearChat}
            className="p-1.5 rounded bg-neutral-900 hover:bg-neutral-850 text-neutral-500 hover:text-rose-400 border border-neutral-800 transition duration-150"
            title="Clear Chat Logs"
            id="clear-chat-btn"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Suggested Quick Prompts */}
        <div className="flex flex-wrap gap-2 mb-4" id="ai-suggested-prompts" role="list" aria-label="Suggested questions about Kipchoge Keino">
          {suggestedPrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={(e) => handleSubmit(e, p.prompt)}
              className="px-2.5 py-1 text-[10px] font-semibold rounded bg-neutral-900 border border-neutral-850 text-neutral-400 hover:text-amber-500 hover:border-amber-500/30 font-mono transition duration-150"
              id={`quick-prompt-btn-${idx}`}
              role="listitem"
            >
              {p.text}
            </button>
          ))}
        </div>
      </div>

      {/* Messages Log Scroller */}
      <div className="flex-1 overflow-y-auto px-1 space-y-4 mb-4 select-text" id="chat-messages-log">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
            id={`chat-bubble-${msg.id}`}
          >
            {/* Avatar */}
            <div className={`w-7 h-7 rounded flex items-center justify-center shrink-0 border text-xs font-bold font-mono ${
              msg.role === 'user' 
                ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' 
                : 'bg-neutral-900 border-neutral-800 text-neutral-400'
            }`}>
              {msg.role === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
            </div>

            {/* Bubble */}
            <div className={`p-3 rounded border text-xs leading-relaxed font-sans ${
              msg.role === 'user'
                ? 'bg-amber-500 border-amber-600 text-black shadow-lg shadow-amber-500/10 font-medium'
                : 'bg-neutral-950 border-neutral-850 text-neutral-200'
            }`}>
              <p className="whitespace-pre-wrap">{msg.text}</p>
              <span className={`block text-[8px] mt-1.5 text-right font-mono ${msg.role === 'user' ? 'text-neutral-800' : 'text-neutral-500'}`}>
                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-3 max-w-[85%] mr-auto" id="typing-indicator">
            <div className="w-7 h-7 rounded flex items-center justify-center border bg-neutral-900 border-neutral-800 text-neutral-400">
              <Bot className="w-3.5 h-3.5" />
            </div>
            <div className="p-3 rounded border bg-neutral-950 border-neutral-850 text-neutral-400 text-xs flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-neutral-500 rounded-full animate-bounce" />
              <span className="w-1.5 h-1.5 bg-neutral-500 rounded-full animate-bounce [animation-delay:0.2s]" />
              <span className="w-1.5 h-1.5 bg-neutral-500 rounded-full animate-bounce [animation-delay:0.4s]" />
            </div>
          </div>
        )}

        {errorText && (
          <div className="p-2.5 rounded bg-amber-950/20 border border-amber-500/20 text-amber-400 text-[10px] text-center font-mono" id="ai-error-indicator">
            {errorText}
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input field Form */}
      <form onSubmit={(e) => handleSubmit(e)} className="flex gap-2" id="ai-input-form">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Ask a question about Kipchoge Keino..."
          className="flex-1 px-3 py-2 text-xs rounded border border-neutral-800 bg-neutral-950 text-white placeholder-neutral-600 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
          id="chat-input-field"
        />
        <button
          type="submit"
          className="p-2 bg-amber-500 hover:bg-amber-400 text-black rounded transition duration-150 flex items-center justify-center shrink-0 shadow-md shadow-amber-500/10"
          id="chat-send-btn"
          aria-label="Send message to AI assistant"
        >
          <Send className="w-4 h-4 fill-black" />
        </button>
      </form>
    </div>
  );
};
