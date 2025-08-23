'use client';

import { Bot, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar } from '@/components/ui/avatar';

type Message = {
  sender: 'user' | 'bot';
  text: string;
};

export default function ChatMessage({ message }: { message: Message }) {
  const isUser = message.sender === 'user';

  return (
    <div
      className={cn(
        'flex items-start gap-3 w-full',
        isUser ? 'flex-row-reverse' : 'flex-row'
      )}
    >
      <Avatar className="h-8 w-8">
        <div className={cn("flex h-full w-full items-center justify-center rounded-full", 
          isUser ? 'bg-primary' : 'bg-accent'
        )}>
          {isUser ? (
            <User className="h-5 w-5 text-primary-foreground" />
          ) : (
            <Bot className="h-5 w-5 text-accent-foreground" />
          )}
        </div>
      </Avatar>
      <div
        className={cn(
          'max-w-[75%] rounded-lg p-3 text-sm shadow-sm transition-all duration-300 ease-in-out animate-in fade-in',
          isUser
            ? 'bg-primary text-primary-foreground rounded-br-none'
            : 'bg-accent text-accent-foreground rounded-bl-none'
        )}
      >
        <p className="whitespace-pre-wrap">{message.text}</p>
      </div>
    </div>
  );
}
