import type {Metadata} from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/layout/header';
import Sidebar from '@/components/layout/sidebar';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'AuraMind - Your Mental Wellness Companion',
  description: 'A safe space to explore your thoughts and feelings.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body className={cn('min-h-screen bg-background font-sans antialiased', inter.variable)}>
        <div className="relative flex min-h-screen flex-col">
          <div className="flex flex-1">
            <Sidebar />
            <div className="flex flex-col flex-1 pl-60">
              <Header />
              <main className="flex-1">
                {children}
              </main>
            </div>
          </div>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
