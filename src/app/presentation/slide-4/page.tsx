'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const technologies = [
  {
    name: 'Next.js',
    logo: 'https://www.svgrepo.com/show/354113/nextjs-icon.svg',
    description: 'For a fast, server-rendered React frontend.',
  },
  {
    name: 'React & TypeScript',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1150px-React-icon.svg.png',
    description: 'For building a modern, type-safe user interface.',
  },
  {
    name: 'Firebase',
    logo: 'https://www.svgrepo.com/show/303670/firebase-1-logo.svg',
    description: 'For backend services including database and hosting.',
  },
  {
    name: 'Google Gemini',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/2048px-Google_%22G%22_logo.svg.png',
    description: 'The core LLM for text generation and reasoning.',
  },
  {
    name: 'Genkit',
    logo: 'https://developers-dot-devsite-v2-prod.appspot.com/solutions/learn/agentic-barista/external-assets/firebase-genkit.svg',
    description: 'The AI framework for building and managing AI flows.',
  },
  {
    name: 'Tailwind & ShadCN',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Tailwind_CSS_Logo.svg/2560px-Tailwind_CSS_Logo.svg.png',
    description: 'For a beautiful and consistent component-based design system.',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
};

export default function TechStackSlide() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-8 text-white">
      <div className="absolute inset-0 -z-10 h-full w-full">
            <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"></div>
            <div className="absolute left-0 right-0 top-[-10%] h-[1000px] w-[1000px] rounded-full bg-[radial-gradient(circle_400px_at_50%_300px,#3b82f633,transparent)]"></div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-blue-400 to-purple-500 mb-4">
          Technologies Used in AuraMind
        </h1>
      </motion.div>

      <motion.div
        className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 w-full max-w-6xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {technologies.map((tech) => (
          <motion.div
            key={tech.name}
            variants={itemVariants}
            className="flex flex-col items-center text-center p-6 bg-gray-900/50 border border-blue-500/20 rounded-2xl transition-all duration-300 transform hover:-translate-y-2 hover:shadow-[0_0_35px_rgba(72,149,239,0.25)]"
          >
            <div className="relative h-16 w-16 mb-4 flex items-center justify-center">
              <Image
                src={tech.logo}
                alt={`${'${'}tech.name} Logo`}
                width={50}
                height={50}
                className="object-contain"
                style={{ filter: tech.name === 'Next.js' || tech.name === 'Genkit' ? 'invert(1)' : '' }}
              />
            </div>
            <h3 className="text-xl font-bold text-blue-300">{tech.name}</h3>
            <p className="text-gray-400 mt-2 text-base">{tech.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
