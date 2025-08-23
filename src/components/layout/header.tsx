'use client';

import Link from 'next/link';
import { Bot } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Header({ isSidebarExpanded }: { isSidebarExpanded: boolean }) {

  const headerVariants = {
    expanded: { paddingLeft: '240px', transition: { duration: 0.3, ease: 'easeInOut' } },
    collapsed: { paddingLeft: '80px', transition: { duration: 0.3, ease: 'easeInOut' } },
  };

  return (
    <motion.header
      initial={false}
      animate={isSidebarExpanded ? 'expanded' : 'collapsed'}
      variants={headerVariants}
      className="sticky top-0 z-40 w-full border-b border-blue-500/10 bg-black/50 backdrop-blur-md"
    >
      <div className="container flex h-16 max-w-screen-2xl items-center">
        {/* Header content can go here if needed in the future */}
      </div>
    </motion.header>
  );
}
