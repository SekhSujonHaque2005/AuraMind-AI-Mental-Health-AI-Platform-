
'use client';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import Sidebar from '@/components/layout/sidebar';
import React,
{ useState } from 'react';
import { motion } from 'framer-motion';
import Ballpit from '@/components/ballpit';
import { ChatProvider } from '@/contexts/ChatContext';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

// Since we're using 'use client', we can't export metadata directly.
// We'll set the title in the document head.
// export const metadata: Metadata = {
//   title: 'AuraMind - Your Mental Wellness Companion',
//   description: 'A safe space to explore your thoughts and feelings.',
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarExpanded, setSidebarExpanded] = useState(false);

  // Set document title
  if (typeof window !== 'undefined') {
    document.title = 'AuraMind - Your Mental Wellness Companion';
  }

  const mainContentVariants = {
    expanded: { paddingLeft: '240px', transition: { duration: 0.3, ease: 'easeInOut' } },
    collapsed: { paddingLeft: '80px', transition: { duration: 0.3, ease: 'easeInOut' } },
  };

  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body className={cn('min-h-screen bg-background font-sans antialiased', inter.variable)}>
        <ChatProvider>
          <div className="absolute inset-0 z-0">
            <Ballpit
                count={200}
                gravity={0.7}
                friction={0.8}
                wallBounce={0.95}
                followCursor={true}
              />
          </div>
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
        </ChatProvider>
      </body>
    </html>
  );
}

    