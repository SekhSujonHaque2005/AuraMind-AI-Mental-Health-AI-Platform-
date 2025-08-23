'use client';

import { useState, useRef, useEffect, useTransition } from 'react';
import { Send, Bot, User, Loader2, Sparkles } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import ChatMessage from './chat-message';
import { getAIResponse } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { ChatInput, ChatInputSubmit, ChatInputTextArea } from "@/components/ui/chat-input";

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

  const handleSubmit = async () => {
    if (!input.trim() || isPending) return;

    const newUserMessage: Message = { sender: 'user', text: input };
    setMessages((prev) => [...prev, newUserMessage]);
    const currentInput = input;
    setInput('');

    startTransition(async () => {
      const conversationHistory = messages.map(msg => ({
        sender: msg.sender,
        text: msg.text,
      }));

      const result = await getAIResponse({
        message: currentInput,
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
    <div className="flex flex-col h-full w-full max-w-4xl mx-auto bg-card rounded-2xl shadow-lg border border-border">
      <ScrollArea className="flex-1 p-4 sm:p-6" ref={scrollAreaRef} viewportRef={viewportRef}>
        <div className="flex flex-col gap-6">
          {messages.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}
          {isPending && (
             <div className="flex items-center space-x-4 p-4">
                <div className="flex-shrink-0">
                    <Sparkles className="h-8 w-8 text-primary/80 animate-pulse" />
                </div>
                <div className="flex items-center space-x-2">
                    <span className="text-muted-foreground">Aura is thinking</span>
                    <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-border">
        <ChatInput
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onSubmit={handleSubmit}
            loading={isPending}
        >
            <ChatInputTextArea placeholder="Tell me what's on your mind..."/>
            <ChatInputSubmit />
        </ChatInput>
      </div>
    </div>
  );
}
