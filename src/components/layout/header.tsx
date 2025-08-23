'use client';

import Link from 'next/link';
import { Bot, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-lg">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <div className="p-1 rounded-lg bg-gradient-to-br from-primary to-purple-500">
            <Bot className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="font-bold sm:inline-block font-headline text-xl">
            AuraMind
          </span>
        </Link>
        <nav className="flex items-center gap-6 text-base">
          <Link
            href="/"
            className={cn(
              'transition-colors hover:text-primary',
              pathname === '/' ? 'text-primary font-semibold' : 'text-foreground/60'
            )}
          >
            Chat
          </Link>
          <Link
            href="/resources"
            className={cn(
              'transition-colors hover:text-primary',
              pathname === '/resources'
                ? 'text-primary font-semibold'
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
