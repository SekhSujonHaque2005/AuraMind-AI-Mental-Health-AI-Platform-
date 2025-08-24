
'use client';

import { useRef, useEffect, useTransition, useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2, Sparkles } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import ChatMessage from './chat-message';
import { getAIResponse } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { PromptInputBox } from '@/components/ui/ai-prompt-box';
import { useChat } from '@/contexts/ChatContext';
import type { Message } from '@/contexts/ChatContext';


export default function ChatInterface() {
  const { messages, setMessages, getNextMessageId } = useChat();
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [isAtBottom, setIsAtBottom] = useState(true);

  const scrollToBottom = () => {
    if (viewportRef.current) {
      setTimeout(() => {
        if (viewportRef.current) {
            viewportRef.current.scrollTo({
            top: viewportRef.current.scrollHeight,
            behavior: 'smooth',
            });
        }
      }, 100); 
    }
  };

  const handleScroll = () => {
    if (viewportRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = viewportRef.current;
        const atBottom = scrollHeight - scrollTop <= clientHeight + 5; // 5px tolerance
        setIsAtBottom(atBottom);
    }
  };

  useEffect(() => {
    if (isAtBottom) {
      scrollToBottom();
    }
  }, [messages, isAtBottom]);

  const fetchAIResponse = (message: string, currentHistory: Message[]) => {
    startTransition(async () => {
      const conversationHistory = currentHistory.map(msg => ({
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
        const newBotMessage: Message = { id: getNextMessageId(), sender: 'bot', text: result.response };
        setMessages((prev) => [...prev, newBotMessage]);
      }
    });
  }

  const handleOptionClick = (value: string) => {
    const newUserMessage: Message = { id: getNextMessageId(), sender: 'user', text: value };
    
    setMessages((prev) => {
      // Remove options from the message that was clicked
      const newHistory = prev.map(m => ({ ...m, options: undefined }));
      const updatedMessages = [...newHistory, newUserMessage];
      // Fetch AI response inside the callback to ensure updatedMessages is set
      fetchAIResponse(value, updatedMessages);
      return updatedMessages;
    });
  };

  const handleSubmit = async (message: string) => {
    if (!message || message.trim() === '' || isPending) return;

    const newUserMessage: Message = { id: getNextMessageId(), sender: 'user', text: message };
    const updatedMessages = [...messages, newUserMessage];
    setMessages(updatedMessages);

    fetchAIResponse(message, updatedMessages);
  };

  return (
    <div className="flex flex-col h-full w-full">
      <ScrollArea 
        className="flex-1 p-4 sm:p-6" 
        ref={scrollAreaRef} 
        viewportRef={viewportRef}
        onScroll={handleScroll}
      >
        <div className="flex flex-col gap-6 max-w-4xl mx-auto w-full">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} onOptionClick={handleOptionClick} />
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

      <div className="p-4 bg-transparent">
        <div className="relative max-w-4xl mx-auto">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <PromptInputBox 
              onSend={handleSubmit} 
              isLoading={isPending}
              placeholder="Ask Aura anything..."
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
