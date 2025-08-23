'use client';

import Link from 'next/link';
import { Bot, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2.5">
          <div className="p-1.5 rounded-lg bg-primary/90 text-primary-foreground">
            <Bot className="h-6 w-6" />
          </div>
          <span className="font-bold sm:inline-block text-xl">
            AuraMind
          </span>
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link
            href="/"
            className={cn(
              'transition-colors hover:text-foreground',
              pathname === '/' ? 'text-foreground' : 'text-foreground/60'
            )}
          >
            Chat
          </Link>
          <Link
            href="/resources"
            className={cn(
              'transition-colors hover:text-foreground',
              pathname === '/resources'
                ? 'text-foreground'
                : 'text-foreground/60'
            )}
          >
            Resources
          </Link>
        </nav>
      </div>
    </header>
  );
}