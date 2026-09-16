import React, { useState, useRef, useEffect } from 'react';
import { PageBody, PageHeader } from '../components/ui/PageHeader';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { AiMessage } from '../types';
import { generateResearchResponse } from '../data/aiResponses';
import { cx } from '../utils/format';
import { SparklesIcon, SendIcon, RefreshCwIcon, BotIcon, UserIcon } from 'lucide-react';
import { Badge } from '../components/ui/Badge';

const SUGGESTIONS = [
  "How is India's economy performing?",
  "What's driving Singapore's low risk rating?",
  "Compare India and Vietnam's growth outlook",
  "Which countries have the strongest FDI trends?"
];

export function AIResearch() {
  const [messages, setMessages] = useState<AiMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = (text: string) => {
    if (!text.trim() || isTyping) return;

    const userMsg: AiMessage = {
      id: `usr-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulated thinking delay
    setTimeout(() => {
      const responseText = generateResearchResponse(text);
      const aiMsg: AiMessage = {
        id: `ai-${Date.now()}`,
        role: 'ai',
        content: responseText,
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 800 + Math.random() * 700);
  };

  const handleClear = () => {
    setMessages([]);
  };

  return (
    <div className="flex h-[calc(100vh-64px)] flex-col">
      <PageHeader
        title="AI Research"
        subtitle="A financial intelligence copilot for comparative economic questions."
        actions={
          <Button variant="secondary" onClick={handleClear} disabled={messages.length === 0 || isTyping}>
            <RefreshCwIcon className="mr-2 h-4 w-4" />
            New conversation
          </Button>
        }
      />
      
      <PageBody className="flex min-h-0 flex-1 flex-col p-4 sm:p-6 lg:p-8">
        <Card className="flex min-h-0 flex-1 flex-col overflow-hidden bg-surface shadow-sm">
          {/* Chat History Area */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
            {messages.length === 0 && !isTyping ? (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <div className="mb-4 rounded-full bg-accent/10 p-3">
                  <SparklesIcon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-sm font-semibold text-ink">How can I help you today?</h3>
                <p className="mt-1 max-w-sm text-xs text-ink-3">
                  Ask questions about country economics, instrument risk bands, or market indicators.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-2 max-w-2xl">
                  {SUGGESTIONS.map((sug) => (
                    <button
                      key={sug}
                      onClick={() => handleSend(sug)}
                      className="rounded-full border border-line bg-subtle px-4 py-2 text-[13px] text-ink-2 transition-colors hover:border-line-strong hover:bg-surface hover:text-ink"
                    >
                      {sug}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <>
                {messages.map((msg) => (
                  <div key={msg.id} className={cx('flex w-full', msg.role === 'user' ? 'justify-end' : 'justify-start')}>
                    <div className={cx('flex max-w-[85%] gap-3', msg.role === 'user' ? 'flex-row-reverse' : 'flex-row')}>
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-subtle border border-line">
                        {msg.role === 'user' ? <UserIcon className="h-4 w-4 text-ink-3" /> : <BotIcon className="h-4 w-4 text-accent" />}
                      </div>
                      <div className={cx(
                        'rounded-xl px-4 py-3 text-[13px] leading-relaxed',
                        msg.role === 'user' 
                          ? 'bg-ink text-surface' 
                          : 'bg-subtle text-ink border border-line'
                      )}>
                        <span className="whitespace-pre-wrap">{msg.content}</span>
                      </div>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex w-full justify-start">
                    <div className="flex max-w-[85%] gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-subtle border border-line">
                        <BotIcon className="h-4 w-4 text-accent" />
                      </div>
                      <div className="flex items-center gap-1 rounded-xl bg-subtle border border-line px-4 py-3 h-[46px]">
                        <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink-4" style={{ animationDelay: '0ms' }} />
                        <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink-4" style={{ animationDelay: '150ms' }} />
                        <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink-4" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Input Area */}
          <div className="border-t border-line p-4 bg-surface">
            <div className="relative mx-auto max-w-4xl flex items-center">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend(input);
                  }
                }}
                placeholder="Ask about a country, indicator, or instrument..."
                className="pr-12 h-12 bg-subtle"
                disabled={isTyping}
              />
              <button
                onClick={() => handleSend(input)}
                disabled={!input.trim() || isTyping}
                className="absolute right-2 flex h-8 w-8 items-center justify-center rounded-md text-ink-3 hover:bg-ink/[0.04] hover:text-ink disabled:opacity-50 disabled:hover:bg-transparent"
              >
                <SendIcon className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-2 text-center">
              <span className="text-[10px] text-ink-4">AI-generated answers based on NGIP mock data. Not financial advice.</span>
            </div>
          </div>
        </Card>
      </PageBody>
    </div>
  );
}
