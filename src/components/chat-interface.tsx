'use client';

import { useState, useRef, useEffect, useTransition } from 'react';
import { Loader2, Sparkles, Send, Paperclip } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import ChatMessage from './chat-message';
import { getAIResponse } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

type Message = {
  sender: 'user' | 'bot';
  text: string;
};

const initialMessage: Message = {
  sender: 'bot',
  text: "Hello! I'm Aura, your empathetic AI companion. I'm here to listen without judgment. How are you feeling today?",
};

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  const [input, setInput] = useState('');
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (viewportRef.current) {
      viewportRef.current.scrollTo({
        top: viewportRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async () => {
    const message = input.trim();
    if (!message || isPending) return;
    
    setInput('');
    const newUserMessage: Message = { sender: 'user', text: message };
    setMessages((prev) => [...prev, newUserMessage]);

    startTransition(async () => {
      const conversationHistory = messages.map(msg => ({
        sender: msg.sender,
        text: msg.text,
      }));

      const result = await getAIResponse({
        message: message,
        conversationHistory: conversationHistory,
      });

      if (result.error) {
        toast({
          variant: "destructive",
          title: "An error occurred",
          description: result.error,
        });
        setMessages(prev => prev.slice(0, -1)); // Remove user message on error
      } else if (result.response) {
        const newBotMessage: Message = { sender: 'bot', text: result.response };
        setMessages((prev) => [...prev, newBotMessage]);
      }
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="relative flex flex-col h-full w-full max-w-4xl mx-auto">
      {/* Lightning Effect */}
      <div className="absolute top-0 right-1/4 w-px h-full bg-blue-400/50 animate-[pulse_5s_ease-in-out_infinite] shadow-[0_0_10px_#2998ff,0_0_20px_#2998ff,0_0_40px_#2998ff,0_0_80px_#2998ff]"></div>
      
      <ScrollArea className="flex-1 p-4 sm:p-6" ref={scrollAreaRef} viewportRef={viewportRef}>
        <div className="flex flex-col gap-6">
          {messages.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}
          {isPending && (
             <div className="flex items-center space-x-4 p-4">
                <div className="flex-shrink-0">
                    <Sparkles className="h-8 w-8 text-blue-400/80 animate-pulse" />
                </div>
                <div className="flex items-center space-x-2">
                    <span className="text-gray-400">Aura is thinking</span>
                    <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
                </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="sticky bottom-0 left-0 right-0 p-4 bg-black/50 backdrop-blur-md">
        <div className="relative max-w-4xl mx-auto">
          <div className="relative flex items-center p-2 bg-gray-900/70 border border-blue-500/20 rounded-2xl shadow-[0_0_15px_rgba(72,149,239,0.2)]">
            <Button variant="ghost" size="icon" className="group h-10 w-10 shrink-0 rounded-full hover:bg-blue-500/10">
              <Paperclip className="h-5 w-5 text-gray-400 group-hover:text-blue-400" />
            </Button>
            <Textarea
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Ask Aura a question..."
              className="flex-1 bg-transparent border-none focus:ring-0 focus:outline-none resize-none text-base text-gray-200 placeholder:text-gray-500 mx-2 p-2.5 max-h-40"
              rows={1}
            />
            <Button 
              onClick={handleSubmit} 
              disabled={!input.trim() || isPending}
              className="group h-10 w-10 shrink-0 rounded-full bg-blue-500 hover:bg-blue-600 text-white disabled:bg-gray-700 disabled:text-gray-400 transition-all"
              size="icon"
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
