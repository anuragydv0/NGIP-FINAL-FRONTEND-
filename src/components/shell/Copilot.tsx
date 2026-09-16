import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { BotIcon, SendIcon, SparklesIcon, UserIcon } from 'lucide-react';
import { Drawer } from '../ui/Overlay';
import { cx } from '../../utils/format';
import { countries } from '../../data/countries';
import { instruments } from '../../data/instruments';

interface Message {
  id: string;
  role: 'user' | 'ai';
  text: string;
  isStreaming?: boolean;
}

export function Copilot({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { pathname } = useLocation();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  
  // Context awareness
  const [contextName, setContextName] = useState<string>('Nation Growth Investment Platform');
  const [suggestedPrompt, setSuggestedPrompt] = useState<string>('Give me a high-level overview of the global macro environment.');

  useEffect(() => {
    if (pathname.includes('/countries/')) {
      const id = pathname.split('/').pop();
      const country = countries.find(c => c.id === id);
      if (country) {
        setContextName(country.name);
        setSuggestedPrompt(`Analyze ${country.name}'s current macro outlook and supply chain risks.`);
      }
    } else if (pathname.includes('/instruments/')) {
      const id = pathname.split('/').pop();
      const instrument = instruments.find(i => i.id === id);
      if (instrument) {
        setContextName(instrument.name);
        setSuggestedPrompt(`What is the historical performance context for ${instrument.symbol}?`);
      }
    } else if (pathname.includes('/portfolio')) {
      setContextName('Global Portfolio');
      setSuggestedPrompt('Highlight the key concentration risks in my current portfolio allocation.');
    } else {
      setContextName('NGIP Command');
      setSuggestedPrompt('Give me a high-level overview of the global macro environment.');
    }
  }, [pathname]);

  // Reset chat when opened newly
  useEffect(() => {
    if (open) {
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
      
      if (messages.length === 0) {
        setMessages([
          {
            id: 'welcome',
            role: 'ai',
            text: `Hello! I'm your NGIP Copilot. I'm currently aware of **${contextName}**. How can I assist you today?`
          }
        ]);
      }
    }
  }, [open, contextName]);

  const simulateResponse = (userText: string) => {
    setIsTyping(true);
    
    setTimeout(() => {
      setIsTyping(false);
      
      const responseId = Date.now().toString();
      setMessages(prev => [...prev, { id: responseId, role: 'ai', text: '', isStreaming: true }]);
      
      const aiResponse = `Based on our proprietary knowledge graph, analyzing the query regarding *"${userText}"* within the context of **${contextName}**: \n\n1. **Macro Headwinds:** The current policy cycle remains restrictive, though early indicators suggest a shallow easing path.\n2. **Capital Flows:** We are observing sustained rotation toward yield-bearing assets.\n3. **Recommendation:** Maintain a neutral duration stance while evaluating idiosyncratic emerging market opportunities.`;
      
      let i = 0;
      const interval = setInterval(() => {
        setMessages(prev => prev.map(m => {
          if (m.id === responseId) {
            return { ...m, text: aiResponse.slice(0, i + 1) };
          }
          return m;
        }));
        i += 3;
        
        bottomRef.current?.scrollIntoView({ behavior: 'auto' });

        if (i >= aiResponse.length) {
          clearInterval(interval);
          setMessages(prev => prev.map(m => m.id === responseId ? { ...m, text: aiResponse, isStreaming: false } : m));
        }
      }, 15);
      
    }, 800);
  };

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    
    const newMsg: Message = { id: Date.now().toString(), role: 'user', text };
    setMessages(prev => [...prev, newMsg]);
    setInput('');
    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);
    
    simulateResponse(text);
  };

  return (
    <Drawer
      open={open}
      onClose={onClose}
      title={
        <div className="flex items-center gap-2">
          <SparklesIcon className="h-4 w-4 text-accent" />
          <span>NGIP Copilot</span>
        </div>
      }
      subtitle={`Context: ${contextName}`}
      width="w-full max-w-[400px]"
      side="right"
    >
      <div className="flex h-[calc(100vh-140px)] flex-col">
        <div className="flex-1 overflow-y-auto pr-2 pb-4 ngip-scroll">
          {messages.length === 0 ? null : (
            <div className="space-y-6">
              {messages.map(msg => (
                <div key={msg.id} className={cx("flex gap-3", msg.role === 'user' ? "flex-row-reverse" : "")}>
                  <div className={cx(
                    "flex h-7 w-7 shrink-0 items-center justify-center rounded-full",
                    msg.role === 'user' ? "bg-accent text-white" : "bg-surface border border-line text-accent"
                  )}>
                    {msg.role === 'user' ? <UserIcon className="h-4 w-4" /> : <BotIcon className="h-4 w-4" />}
                  </div>
                  <div className={cx(
                    "flex max-w-[85%] flex-col rounded-2xl px-4 py-2.5 text-[13px] leading-relaxed shadow-sm",
                    msg.role === 'user' 
                      ? "rounded-tr-sm bg-accent text-white" 
                      : "rounded-tl-sm border border-line bg-surface text-ink"
                  )}>
                    <div className="whitespace-pre-wrap">{msg.text}{msg.isStreaming && <span className="ml-0.5 inline-block h-3 w-1.5 animate-pulse bg-accent align-middle" />}</div>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex gap-3">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-surface border border-line text-accent">
                    <BotIcon className="h-4 w-4" />
                  </div>
                  <div className="flex max-w-[85%] items-center gap-1 rounded-2xl rounded-tl-sm border border-line bg-surface px-4 py-3.5 shadow-sm">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink-3" style={{ animationDelay: '0ms' }} />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink-3" style={{ animationDelay: '150ms' }} />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink-3" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              <div ref={bottomRef} className="h-1" />
            </div>
          )}
        </div>

        <div className="mt-auto shrink-0 pt-4">
          {!isTyping && messages.length <= 2 && (
            <button 
              onClick={() => handleSend(suggestedPrompt)}
              className="mb-3 w-full rounded-lg border border-accent/20 bg-accent/5 px-3 py-2 text-left text-xs font-medium text-accent transition-colors hover:bg-accent/10"
            >
              <div className="flex items-center gap-2">
                <SparklesIcon className="h-3.5 w-3.5" />
                <span>Suggested: {suggestedPrompt}</span>
              </div>
            </button>
          )}

          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
            className="relative flex items-center"
          >
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask Copilot..."
              className="w-full rounded-full border border-line bg-surface py-2.5 pl-4 pr-12 text-[13px] text-ink placeholder:text-ink-4 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="absolute right-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-accent text-white transition-transform hover:scale-105 disabled:scale-100 disabled:opacity-50"
            >
              <SendIcon className="h-3.5 w-3.5 -ml-0.5" />
            </button>
          </form>
        </div>
      </div>
    </Drawer>
  );
}
