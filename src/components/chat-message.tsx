
'use client';

import { Bot, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar } from '@/components/ui/avatar';
import { format } from 'date-fns';
import { useState, useEffect } from 'react';
import TextType from '@/components/ui/text-type';
import type { Message } from '@/contexts/ChatContext';
import { Button } from './ui/button';
import Image from 'next/image';

export default function ChatMessage({ message, onOptionClick }: { message: Message, onOptionClick: (value: string) => void }) {
  const isUser = message.sender === 'user';
  const [timestamp, setTimestamp] = useState<string | null>(null);

  useEffect(() => {
    setTimestamp(format(new Date(), 'p'));
  }, []);

  const handleOptionClick = (value: string) => {
    onOptionClick(value);
  };

  return (
    <div
      className={cn(
        'flex items-start gap-3 w-full',
        isUser ? 'flex-row-reverse' : 'flex-row'
      )}
    >
      <Avatar className="h-9 w-9 shrink-0">
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
      <div className={cn("flex flex-col gap-2", isUser ? 'items-end' : 'items-start')}>
        <div
          className={cn(
            'max-w-md rounded-xl p-3.5 text-base shadow-lg transition-all duration-300 ease-in-out animate-in fade-in',
            isUser
              ? 'bg-blue-600 text-white rounded-br-none'
              : 'bg-gray-800 text-gray-200 rounded-bl-none'
          )}
        >
          {isUser ? (
            <p className="whitespace-pre-wrap">{message.text}</p>
          ) : (
            <TextType text={message.text} typingSpeed={20} loop={false} />
          )}
          {message.gifUrl && (
            <div className="mt-2">
              <Image 
                src={message.gifUrl} 
                alt="Relevant GIF" 
                className="rounded-lg max-w-full h-auto" 
                width={200} 
                height={150} 
                unoptimized
              />
            </div>
          )}
        </div>
        {!isUser && message.options && (
            <div className="flex flex-wrap gap-2">
                {message.options.map((option, index) => (
                    <Button 
                        key={index} 
                        variant="outline" 
                        size="sm"
                        className="bg-gray-800/80 border-blue-500/20 hover:bg-blue-500/10 hover:text-blue-300 text-gray-300"
                        onClick={() => handleOptionClick(option.value)}
                    >
                        {option.label}
                    </Button>
                ))}
            </div>
        )}
        {timestamp && (
           <p className="text-xs text-gray-500 mt-1">
            {timestamp}
          </p>
        )}
      </div>
    </div>
  );
}

    
