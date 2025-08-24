
'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

type MessageOption = {
  label: string;
  value: string;
};

export type Message = {
  sender: 'user' | 'bot';
  text: string;
  options?: MessageOption[];
  gifUrl?: string;
  id: number;
};

const initialMessage: Message = {
    id: 0,
    sender: 'bot',
    text: "Hello! I'm Aura, your empathetic AI companion. I'm here to listen without judgment. To start, what's on your mind today? ☀️",
    gifUrl: 'https://media.tenor.com/T4iVfC2oSCwAAAAC/hello-hey.gif',
    options: [
        { label: "I'm feeling happy! 😊", value: "I'm feeling happy today!" },
        { label: "I'm feeling sad 😔", value: "I'm feeling a bit sad" },
        { label: "I'm feeling anxious 😟", value: "I'm feeling anxious" },
        { label: "I'm having a tough day ⛈️", value: "I'm having a tough day" },
        { label: "I'm celebrating a small win! 🎉", value: "I'm celebrating a small win today!" },
        { label: "I'm feeling overwhelmed 🤯", value: "I'm feeling overwhelmed right now." },
        { label: "I feel a bit lonely 🫂", value: "I'm feeling a bit lonely." },
        { label: "I'm stressed about work/school 😫", value: "I'm feeling stressed about work/school." },
        { label: "I just need to vent 😤", value: "I just need to vent for a minute." },
    ]
};

interface ChatContextType {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  startNewChat: () => void;
  getNextMessageId: () => number;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  const [nextId, setNextId] = useState(1);

  const getNextMessageId = () => {
    const id = nextId;
    setNextId(prev => prev + 1);
    return id;
  };

  const startNewChat = () => {
    setMessages([initialMessage]);
    setNextId(1);
  };

  return (
    <ChatContext.Provider value={{ messages, setMessages, startNewChat, getNextMessageId }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
