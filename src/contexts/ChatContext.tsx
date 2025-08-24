
'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

type Message = {
  sender: 'user' | 'bot';
  text: string;
};

const initialMessage: Message = {
    sender: 'bot',
    text: "Hello! I'm Aura, your empathetic AI companion. I'm here to listen without judgment. How are you feeling today?",
};

interface ChatContextType {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  startNewChat: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState<Message[]>([initialMessage]);

  const startNewChat = () => {
    setMessages([initialMessage]);
  };

  return (
    <ChatContext.Provider value={{ messages, setMessages, startNewChat }}>
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
