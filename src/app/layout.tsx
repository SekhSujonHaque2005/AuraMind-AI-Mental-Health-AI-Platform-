
'use client';

import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import Sidebar from '@/components/layout/sidebar';
import React, from 'react';
import { motion } from 'framer-motion';
import { ChatProvider } from '@/contexts/ChatContext';

function AppContent({ children }: { children: React.ReactNode }) {
    const [isSidebarExpanded, setSidebarExpanded] = React.useState(false);
    const [isMounted, setIsMounted] = React.useState(false);

    React.useEffect(() => {
        setIsMounted(true);
    }, []);

    const mainContentVariants = {
      expanded: { paddingLeft: '240px', transition: { duration: 0.3, ease: 'easeInOut' } },
      collapsed: { paddingLeft: '80px', transition: { duration: 0.3, ease: 'easeInOut' } },
    };

    return (
        <div className="flex min-h-screen">
             <div
                onMouseEnter={() => setSidebarExpanded(true)}
                onMouseLeave={() => setSidebarExpanded(false)}
                className="z-50"
            >
                <Sidebar isExpanded={isSidebarExpanded} />
            </div>
            
            <div className="flex-1 flex flex-col relative bg-background">
                <motion.main
                    initial={false}
                    animate={isSidebarExpanded ? 'expanded' : 'collapsed'}
                    variants={mainContentVariants}
                    className="flex-1 relative z-10"
                >
                    {children}
                </motion.main>
            </div>
            <Toaster />
        </div>
    );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  React.useEffect(() => {
    document.title = 'AuraMind - Your Mental Wellness Companion';
  }, []);

  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body className={cn('min-h-screen bg-background font-sans antialiased')}>
        <ChatProvider>
            <AppContent>{children}</AppContent>
        </ChatProvider>
      </body>
    </html>
  );
}
