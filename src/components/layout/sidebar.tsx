'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MessageSquare, BookUser } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'Chat', icon: MessageSquare },
  { href: '/resources', label: 'Resources', icon: BookUser },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-50 flex h-full w-60 flex-col border-r border-blue-500/10 bg-black">
      <div className="flex h-16 items-center border-b border-blue-500/10 px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold text-lg text-white">
          <MessageSquare className="h-6 w-6 text-blue-400" />
          <span>AuraMind</span>
        </Link>
      </div>
      <nav className="flex-1 space-y-2 p-4">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex items-center gap-3 rounded-lg px-3 py-2 text-gray-400 transition-all hover:text-blue-300 hover:bg-blue-500/10',
              pathname === item.href && 'bg-blue-500/10 text-blue-300'
            )}
          >
            <item.icon className="h-5 w-5" />
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
