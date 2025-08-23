'use client';

import Link from 'next/link';
import { Bot } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-blue-500/10 bg-black/50 backdrop-blur-md pl-60">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        {/* Header content can go here if needed in the future */}
      </div>
    </header>
  );
}
