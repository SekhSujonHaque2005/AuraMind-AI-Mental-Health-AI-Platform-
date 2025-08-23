'use client';

import { useState, useRef, useEffect, useTransition } from 'react';
import { Send, Bot, User, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import ChatMessage from './chat-message';
import { getAIResponse } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';

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

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || isPending) return;

    const newUserMessage: Message = { sender: 'user', text: input };
    setMessages((prev) => [...prev, newUserMessage]);
    setInput('');

    startTransition(async () => {
      const conversationHistory = messages.map(msg => ({
        sender: msg.sender,
        text: msg.text,
      }));

      const result = await getAIResponse({
        message: input,
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

  return (
    <div className="flex flex-col h-full w-full max-w-4xl mx-auto bg-card rounded-lg shadow-lg border">
      <ScrollArea className="flex-1 p-6" ref={scrollAreaRef}>
        <div className="flex flex-col gap-4">
          {messages.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}
          {isPending && (
             <div className="flex items-center space-x-4 p-4">
                <div className="flex-shrink-0">
                    <Bot className="h-8 w-8 text-primary" />
                </div>
                <div className="flex items-center space-x-2">
                    <span className="text-muted-foreground">Aura is typing</span>
                    <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="p-4 border-t bg-background rounded-b-lg">
        <form onSubmit={handleSubmit} className="flex items-center gap-4">
          <Input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isPending}
            className="flex-1"
            autoComplete="off"
          />
          <Button type="submit" size="icon" disabled={isPending || !input.trim()}>
            {isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </div>
    </div>
  );
}
