'use client';

import Link from 'next/link';
import { Bot } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 pl-64">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2.5">
          <div className="p-1.5 rounded-lg bg-primary/90 text-primary-foreground">
            <Bot className="h-6 w-6" />
          </div>
          <span className="font-bold sm:inline-block text-xl">
            AuraMind
          </span>
        </Link>
      </div>
    </header>
  );
}
