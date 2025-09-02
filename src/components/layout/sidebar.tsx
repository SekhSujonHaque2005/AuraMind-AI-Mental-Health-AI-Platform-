
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MessageSquare, BookUser, PlusSquare, Video, BrainCircuit } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import React from 'react';
import { useChat } from '@/contexts/ChatContext';

const navItems = [
  { href: '/', label: 'Chat', icon: MessageSquare },
  { href: '/resources', label: 'Resources', icon: BookUser },
  { href: '/video', label: 'Video Call', icon: Video },
  { href: '/consultant', label: 'AI Consultant', icon: BrainCircuit },
];

const Sidebar = ({ isExpanded }: { isExpanded: boolean }) => {
  const pathname = usePathname();
  const { startNewChat } = useChat();

  const sidebarVariants = {
    expanded: { width: '240px', transition: { duration: 0.3, ease: 'easeInOut' } },
    collapsed: { width: '80px', transition: { duration: 0.3, ease: 'easeInOut' } },
  };

  const navItemVariants = {
    expanded: { opacity: 1, x: 0, transition: { duration: 0.2, delay: 0.1 } },
    collapsed: { opacity: 0, x: -10, transition: { duration: 0.1 } },
  };

  return (
    <motion.aside
      initial={false}
      animate={isExpanded ? 'expanded' : 'collapsed'}
      variants={sidebarVariants}
      className="fixed left-0 top-0 z-50 flex h-full flex-col border-r border-blue-500/10 bg-black"
    >
      <div className={cn("flex h-16 items-center border-b border-blue-500/10", isExpanded ? "px-6" : "px-0 justify-center")}>
        <Link href="/" className="flex items-center gap-2 font-semibold text-lg text-white">
          <MessageSquare className="h-6 w-6 shrink-0 text-blue-400" />
          <AnimatePresence>
            {isExpanded && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2 }}
              >
                AuraMind
              </motion.span>
            )}
          </AnimatePresence>
        </Link>
      </div>
      <nav className="flex-1 space-y-2 p-4">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex items-center gap-3 rounded-lg px-3 py-2 text-gray-400 transition-all hover:text-blue-300 hover:bg-blue-500/10',
              pathname === item.href && 'bg-blue-500/10 text-blue-300',
              !isExpanded && 'justify-center'
            )}
          >
            <item.icon className="h-5 w-5 shrink-0" />
            <AnimatePresence>
              {isExpanded && (
                <motion.span
                  variants={navItemVariants}
                  initial="collapsed"
                  animate="expanded"
                  exit="collapsed"
                  className="whitespace-nowrap"
                >
                  {item.label}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
        ))}
      </nav>
      <div className="mt-auto p-4">
        <button
            onClick={startNewChat}
            className={cn(
                'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-gray-400 transition-all hover:text-blue-300 hover:bg-blue-500/10',
                !isExpanded && 'justify-center'
            )}
            >
            <PlusSquare className="h-5 w-5 shrink-0" />
            <AnimatePresence>
                {isExpanded && (
                <motion.span
                    variants={navItemVariants}
                    initial="collapsed"
                    animate="expanded"
                    exit="collapsed"
                    className="whitespace-nowrap"
                >
                    New Chat
                </motion.span>
                )}
            </AnimatePresence>
        </button>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
