
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


const languages = [
    { value: 'en-US', label: 'English' },
    { value: 'hi-IN', label: 'Hindi' },
    { value: 'es', label: 'Spanish' },
    { value: 'fr', label: 'French' },
    { value: 'de', label: 'German' },
    { value: 'it', label: 'Italian' },
    { value: 'ja', label: 'Japanese' },
    { value: 'ar', label: 'Arabic' },
    { value: 'bn-IN', label: 'Bengali' },
    { value: 'pt', label: 'Portuguese' },
    { value: 'ru', label: 'Russian' },
    { value: 'te-IN', label: 'Telugu' },
    { value: 'mr-IN', label: 'Marathi' },
    { value: 'ta-IN', label: 'Tamil' },
    { value: 'gu-IN', label: 'Gujarati' },
    { value: 'pa-IN', label: 'Punjabi' },
    { value: 'bho-IN', label: 'Bhojpuri' },
    { value: 'sat-IN', label: 'Santhali (Jharkhandi)' },
    { value: 'other', label: 'Other' },
];

export default function ChatInterface() {
  const { messages, setMessages, getNextMessageId, startNewChat: resetChat, initialMessage } = useChat();
  const [isPending, startTransition] = useTransition();
  const [isTranslating, setIsTranslating] = useState(false);
  const { toast } = useToast();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState('en-US');
  const [otherLanguage, setOtherLanguage] = useState('');
  const [showOtherLanguageInput, setShowOtherLanguageInput] = useState(false);

  const getLanguageLabel = useCallback((value: string) => {
    if (value === 'other') return otherLanguage;
    return languages.find(l => l.value === value)?.label || 'English';
  }, [otherLanguage]);


  const translateAndSetWelcomeMessage = useCallback(async (language: string) => {
      if (!language) return;
      setIsTranslating(true);
      const result = await getTranslatedWelcome({ language });

      if (result.error) {
          toast({
              variant: "destructive",
              title: "Translation Error",
              description: result.error,
          });
          setMessages([initialMessage]); // Fallback to default
      } else if (result.welcomeMessage && result.suggestedQuestions) {
          const translatedMessage: Message = {
              id: 0,
              sender: 'bot',
              text: result.welcomeMessage,
              gifUrl: initialMessage.gifUrl,
              options: result.suggestedQuestions,
          };
          setMessages([translatedMessage]);
      }
      setIsTranslating(false);
  }, [setMessages, initialMessage, toast]);


  const handleLanguageChange = (value: string) => {
    setSelectedLanguage(value);
    if (value === 'other') {
      setShowOtherLanguageInput(true);
    } else {
      setShowOtherLanguageInput(false);
      translateAndSetWelcomeMessage(getLanguageLabel(value));
    }
  };

  const handleConfirmLanguage = () => {
    if (otherLanguage.trim() !== '') {
        toast({
            title: "Language Set",
            description: `Your conversation will now be in ${otherLanguage}.`,
        });
        translateAndSetWelcomeMessage(otherLanguage);
    }
  };
  
  const startNewChat = () => {
    resetChat();
    const currentLang = getLanguageLabel(selectedLanguage);
    if (currentLang !== 'English') {
      translateAndSetWelcomeMessage(currentLang);
    }
  }


  const handleOtherLanguageKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        handleConfirmLanguage();
    }
  }

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

  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage && lastMessage.sender === 'user') {
      const conversationHistory = messages.slice(0, -1).map(msg => ({
        sender: msg.sender,
        text: msg.text,
      }));

      startTransition(async () => {
        const languageLabel = getLanguageLabel(selectedLanguage);

        const result = await getAIResponse({
          message: lastMessage.text,
          conversationHistory: conversationHistory,
          region: selectedLanguage.split('-')[1], // 'IN'
          language: languageLabel,
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
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);


  const handleOptionClick = (value: string) => {
    const newUserMessage: Message = { id: getNextMessageId(), sender: 'user', text: value };
    
    setMessages((prev) => {
      // Remove options from the message that was clicked
      const newHistory = prev.map(m => ({ ...m, options: undefined }));
      return [...newHistory, newUserMessage];
    });
  };

  const handleSubmit = async (message: string) => {
    if (!message || message.trim() === '' || isPending || isTranslating) return;
    if (selectedLanguage === 'other' && otherLanguage.trim() === '') {
        toast({
            variant: "destructive",
            title: "Language not specified",
            description: "Please enter the language you want to use.",
        });
        return;
    }

    const newUserMessage: Message = { id: getNextMessageId(), sender: 'user', text: message };
    setMessages((prev) => [...prev, newUserMessage]);
  };

  return (
    <div className="relative flex flex-col h-full w-full">
        <div className="absolute top-4 right-4 z-10">
            <Button variant="outline" onClick={startNewChat} className="text-gray-300 hover:text-white hover:bg-black/50 bg-black/30 backdrop-blur-md border-blue-500/20">
                <PlusSquare className="h-5 w-5 mr-2" />
                New Chat
            </Button>
        </div>
      <ScrollArea 
        className="flex-1 p-4 sm:p-6 pt-16" 
        ref={scrollAreaRef} 
        viewportRef={viewportRef}
        onScroll={handleScroll}
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
            <div className="flex flex-col gap-2">
                <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
                    <SelectTrigger className="w-auto bg-[#1F2023] border-[#444444] text-white focus:ring-0 cursor-pointer">
                        <SelectValue placeholder="Language" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1F2023] border-[#444444] text-white">
                        {languages.map(lang => (
                            <SelectItem key={lang.value} value={lang.value} className="cursor-pointer">{lang.label}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <AnimatePresence>
                {showOtherLanguageInput && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="flex items-center gap-2"
                    >
                        <Input 
                            type="text"
                            placeholder="Type language..."
                            value={otherLanguage}
                            onChange={(e) => setOtherLanguage(e.target.value)}
                            onKeyDown={handleOtherLanguageKeyDown}
                            className="bg-[#1F2023] border-[#444444] text-white focus:ring-0"
                        />
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={handleConfirmLanguage}
                            className="text-white hover:bg-white/10 rounded-full w-8 h-8"
                            aria-label="Confirm language"
                        >
                            <Check className="h-4 w-4" />
                        </Button>
                    </motion.div>
                )}
                </AnimatePresence>
            </div>

            <PromptInputBox 
              onSend={handleSubmit} 
              isLoading={isPending || isTranslating}
              placeholder="Ask Aura anything..."
              className="flex-1"
              selectedLanguage={selectedLanguage === 'other' ? otherLanguage : selectedLanguage}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

    