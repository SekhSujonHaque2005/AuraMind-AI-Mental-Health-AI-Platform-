'use client';

import { Bot, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar } from '@/components/ui/avatar';
import { format } from 'date-fns';
import { useState, useEffect } from 'react';

type Message = {
  sender: 'user' | 'bot';
  text: string;
};

export default function ChatMessage({ message }: { message: Message }) {
  const isUser = message.sender === 'user';
  const [timestamp, setTimestamp] = useState<Date | null>(null);

  useEffect(() => {
    // This code runs only on the client, after the component has mounted.
    // This prevents a hydration mismatch between server and client.
    setTimestamp(new Date());
  }, []);


  return (
    <div
      className={cn(
        'flex items-start gap-3 w-full',
        isUser ? 'flex-row-reverse' : 'flex-row'
      )}
    >
      <Avatar className="h-9 w-9">
        <div className={cn("flex h-full w-full items-center justify-center rounded-full",
          isUser ? 'bg-blue-600' : 'bg-gray-700'
        )}>
          {isUser ? (
            <User className="h-5 w-5 text-white" />
          ) : (
            <Bot className="h-5 w-5 text-white" />
          )}
        </div>
      </Avatar>
      <div className={cn("flex flex-col gap-1", isUser ? 'items-end' : 'items-start')}>
        <div
          className={cn(
            'max-w-md rounded-xl p-3.5 text-base shadow-lg transition-all duration-300 ease-in-out animate-in fade-in',
            isUser
              ? 'bg-blue-600 text-white rounded-br-none'
              : 'bg-gray-800 text-gray-200 rounded-bl-none'
          )}
        >
          <p className="whitespace-pre-wrap">{message.text}</p>
        </div>
        {timestamp && (
           <p className={cn("text-xs text-gray-500", isUser ? "text-right" : "text-left")}>
            {format(timestamp, 'p')}
          </p>
        )}
      </div>
    </div>
  );
}
