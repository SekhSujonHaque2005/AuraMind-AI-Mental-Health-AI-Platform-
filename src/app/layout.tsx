
'use client';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import Sidebar from '@/components/layout/sidebar';
import React, from 'react';
import { motion } from 'framer-motion';
import Ballpit from '@/components/ballpit';
import { ChatProvider } from '@/contexts/ChatContext';
import { usePathname } from 'next/navigation';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

function AppContent({ children }: { children: React.ReactNode }) {
    const [isSidebarExpanded, setSidebarExpanded] = React.useState(false);
    const pathname = usePathname();
    const [isMounted, setIsMounted] = React.useState(false);

    React.useEffect(() => {
        setIsMounted(true);
    }, []);

    const showBallpit = pathname !== '/resources';
  
    const mainContentVariants = {
      expanded: { paddingLeft: '240px', transition: { duration: 0.3, ease: 'easeInOut' } },
      collapsed: { paddingLeft: '80px', transition: { duration: 0.3, ease: 'easeInOut' } },
    };

    return (
        <>
            {isMounted && showBallpit && (
                <div className="absolute inset-0 z-0">
                <Ballpit
                    count={150}
                    gravity={0.7}
                    friction={0.8}
                    wallBounce={0.95}
                    followCursor={true}
                    />
                </div>
            )}
            <div className="relative z-10 flex min-h-screen flex-col">
                <div className="flex flex-1">
                    <div
                        onMouseEnter={() => setSidebarExpanded(true)}
                        onMouseLeave={() => setSidebarExpanded(false)}
                    >
                        <Sidebar isExpanded={isSidebarExpanded} />
                    </div>
                    <motion.div
                        initial={false}
                        animate={isSidebarExpanded ? 'expanded' : 'collapsed'}
                        variants={mainContentVariants}
                        className="flex flex-col flex-1"
                    >
                        <main className="flex-1">
                        {children}
                        </main>
                    </motion.div>
                </div>
            </div>
            <Toaster />
        </>
    );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  // Set document title
  React.useEffect(() => {
    document.title = 'AuraMind - Your Mental Wellness Companion';
  }, []);

  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body className={cn('min-h-screen bg-background font-sans antialiased', inter.variable)}>
        <ChatProvider>
            <AppContent>{children}</AppContent>
        </ChatProvider>
      </body>
    </html>
  );
}
