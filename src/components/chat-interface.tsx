'use client';

import { useRef, useEffect, useTransition, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Sparkles, Languages, PlusSquare, Check } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import ChatMessage from './chat-message';
import { getAIResponse, getTranslatedWelcome } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { PromptInputBox } from '@/components/ui/ai-prompt-box';
import { useChat } from '@/contexts/ChatContext';
import type { Message } from '@/contexts/ChatContext';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function ChatInterface() {
  const { messages, setMessages, getNextMessageId, startNewChat: resetChat, initialMessage } = useChat();
  const [isPending, startTransition] = useTransition();
  const [isTranslating, setIsTranslating] = useState(false);
  const { toast } = useToast();
  const viewportRef = useRef<HTMLDivElement>(null);
  
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

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (messageText: string) => {
    if (!messageText || messageText.trim() === '' || isPending || isTranslating) return;

    const newUserMessage: Message = { id: getNextMessageId(), sender: 'user', text: messageText };
    const currentMessages = [...messages, newUserMessage];
    setMessages(currentMessages);

    startTransition(async () => {
        const result = await getAIResponse({
          message: messageText,
          conversationHistory: currentMessages, 
          region: 'en-US'.split('-')[1], // Defaulting to 'US'
          language: 'English',
        });

        if (result.error) {
          toast({
            variant: "destructive",
            title: "An error occurred",
            description: result.error,
          });
        } else if (result.response) {
          const newBotMessage: Message = { 
            id: getNextMessageId(), 
            sender: 'bot', 
            text: result.response,
            gifUrl: result.gifUrl,
          };
          setMessages((prev) => [...prev, newBotMessage]);
        }
    });
  };

  const handleOptionClick = (value: string) => {
    const currentMessagesWithoutOptions = messages.map(m => ({ ...m, options: undefined }));
    setMessages(currentMessagesWithoutOptions);
    handleSubmit(value);
  };

  return (
    <div className="relative flex flex-col h-full w-full">
        <div className="absolute top-4 right-4 z-10">
            <Button variant="outline" onClick={resetChat} className="text-gray-300 hover:text-white hover:bg-black/50 bg-black/30 backdrop-blur-md border-blue-500/20">
                <PlusSquare className="h-5 w-5 mr-2" />
                New Chat
            </Button>
        </div>
      <ScrollArea 
        className="flex-1 p-4 sm:p-6 pt-16"
        viewportRef={viewportRef}
      >
        <div className="flex flex-col gap-6 max-w-4xl mx-auto w-full">
          {isTranslating ? (
              <div className="flex items-center space-x-4 p-4">
                  <div className="flex-shrink-0">
                      <Languages className="h-8 w-8 text-blue-400/80 animate-pulse" />
                  </div>
                  <div className="flex items-center space-x-2">
                      <span className="text-gray-400">Switching language...</span>
                      <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
                  </div>
              </div>
          ) : (
            messages.map((message) => (
              <ChatMessage key={message.id} message={message} onOptionClick={handleOptionClick} />
            ))
          )}
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
             className="flex items-center gap-4"
          >
            <PromptInputBox 
              onSend={handleSubmit} 
              isLoading={isPending || isTranslating}
              placeholder="Ask Aura anything..."
              className="flex-1"
            />
          </motion.div>
          <p className="text-xs text-center text-gray-500 mt-2">
            Due to API server issues, we are currently using our local model.
          </p>
        </div>
      </div>
    </div>
  );
}
