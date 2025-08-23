'use client';

import { Bot, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

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
      <Avatar className="h-10 w-10">
        <div className={cn("flex h-full w-full items-center justify-center rounded-full", 
          isUser ? 'bg-primary/20' : 'bg-gradient-to-br from-primary to-purple-500'
        )}>
          {isUser ? (
            <User className="h-6 w-6 text-primary-foreground" />
          ) : (
            <Bot className="h-6 w-6 text-primary-foreground" />
          )}
        </div>
      </Avatar>
      <div
        className={cn(
          'max-w-[80%] rounded-xl p-4 text-base shadow-lg transition-all duration-300 ease-in-out animate-in fade-in',
          isUser
            ? 'bg-primary/90 text-primary-foreground rounded-br-none'
            : 'bg-accent text-accent-foreground rounded-bl-none'
        )}
      >
        <p className="whitespace-pre-wrap">{message.text}</p>
      </div>
    </div>
  );
}
