
'use client';

import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import Sidebar from '@/components/layout/sidebar';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatProvider } from '@/contexts/ChatContext';
import { usePathname } from 'next/navigation';
import { OrbitalLoader } from '@/components/ui/orbital-loader';

function GlobalLoader() {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <OrbitalLoader message="Loading..." />
    </div>
  );
}

function AppContent({ children }: { children: React.ReactNode }) {
    const [isSidebarExpanded, setSidebarExpanded] = React.useState(false);
    const pathname = usePathname();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const handleStart = () => setIsLoading(true);
        const handleComplete = () => {
             // Delay hiding loader slightly to avoid flickering on fast navigations
            setTimeout(() => setIsLoading(false), 500);
        };
        
        // Simulate loading on path change
        handleStart();
        handleComplete();

    }, [pathname]);


    const isSidebarHidden = pathname === '/' || pathname === '/privacy-policy' || pathname === '/terms-of-service';

    const mainContentVariants = {
      expanded: { paddingLeft: '240px', transition: { duration: 0.3, ease: 'easeInOut' } },
      collapsed: { paddingLeft: '80px', transition: { duration: 0.3, ease: 'easeInOut' } },
      full: { paddingLeft: '0px', transition: { duration: 0.3, ease: 'easeInOut' } },
    };

    const getAnimationState = () => {
        if (isSidebarHidden) return 'full';
        return isSidebarExpanded ? 'expanded' : 'collapsed';
    }

    return (
        <div className="flex min-h-screen">
             <AnimatePresence>
                {isLoading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <GlobalLoader />
                    </motion.div>
                )}
             </AnimatePresence>

             {!isSidebarHidden && (
                 <div
                    onMouseEnter={() => setSidebarExpanded(true)}
                    onMouseLeave={() => setSidebarExpanded(false)}
                    className="z-50"
                >
                    <Sidebar isExpanded={isSidebarExpanded} />
                </div>
             )}
            
            <div className="flex-1 flex flex-col relative bg-background">
                <motion.main
                    initial={false}
                    animate={getAnimationState()}
                    variants={mainContentVariants}
                    className="flex-1 relative z-10"
                >
                    <div className="overflow-x-hidden">
                        {children}
                    </div>
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
      <body className={cn('min-h-screen bg-background font-sans antialiased overflow-x-hidden')}>
        <ChatProvider>
            <AppContent>{children}</AppContent>
        </ChatProvider>
      </body>
    </html>
  );
}
