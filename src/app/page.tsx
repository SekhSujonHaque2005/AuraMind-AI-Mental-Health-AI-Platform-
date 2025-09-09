
'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  MessageSquare,
  BookUser,
  Users,
  Sparkles,
  ShieldCheck,
  FileQuestion,
  Music,
  ArrowRight,
  Home as HomeIcon,
} from 'lucide-react';
import TextType from '@/components/ui/text-type';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const features = [
  {
    href: '/chat',
    label: 'Empathetic Chat',
    icon: MessageSquare,
    description: 'Talk about your feelings in a safe, non-judgmental space with Aura.',
    color: 'blue',
  },
  {
    href: '/resources',
    label: 'Helpful Resources',
    icon: BookUser,
    description: 'Find curated videos and hotlines for support and guidance.',
    color: 'blue',
  },
  {
    href: '/consultant',
    label: 'AI Consultant',
    icon: Users,
    description: 'Engage in simulated video calls with specialized AI personas for focused support.',
    color: 'blue',
  },
  {
    href: '/calm',
    label: 'Calm Room',
    icon: Sparkles,
    description: 'Immerse yourself in tranquil scenes with calming audio to find your peace.',
    color: 'purple',
  },
  {
    href: '/adventures',
    label: 'Self-Care Adventures',
    icon: ShieldCheck,
    description: 'Embark on daily quests to build healthy habits and improve your well-being.',
    color: 'amber',
  },
  {
    href: '/quizzes',
    label: 'Mind Quizzes',
    icon: FileQuestion,
    description: 'Gain insights into your mind with quizzes on CBT, mindfulness, and more.',
    color: 'violet',
  },
  {
    href: '/playlist',
    label: 'Curated Playlists',
    icon: Music,
    description: 'Listen to sounds and music designed for focus, relaxation, and meditation.',
    color: 'green',
  },
];

const colorVariants = {
    blue: {
        gradient: 'from-blue-400 to-purple-500',
        shadow: 'hover:shadow-[0_0_35px_rgba(59,130,246,0.3)]',
        border: 'border-blue-500/20 hover:border-blue-500/60',
        iconText: 'text-blue-300',
    },
    purple: {
        gradient: 'from-purple-400 to-fuchsia-500',
        shadow: 'hover:shadow-[0_0_35px_rgba(192,132,252,0.3)]',
        border: 'border-purple-500/20 hover:border-purple-500/60',
        iconText: 'text-purple-300',
    },
    amber: {
        gradient: 'from-amber-400 to-orange-500',
        shadow: 'hover:shadow-[0_0_35px_rgba(251,191,36,0.3)]',
        border: 'border-amber-500/20 hover:border-amber-500/60',
        iconText: 'text-amber-300',
    },
    violet: {
        gradient: 'from-violet-400 to-purple-600',
        shadow: 'hover:shadow-[0_0_35px_rgba(167,139,250,0.25)]',
        border: 'border-violet-500/20 hover:border-violet-500/60',
        iconText: 'text-violet-300',
    },
    green: {
        gradient: 'from-green-400 to-emerald-600',
        shadow: 'hover:shadow-[0_0_35px_rgba(74,222,128,0.25)]',
        border: 'border-green-500/20 hover:border-green-500/60',
        iconText: 'text-green-300',
    }
};

export default function Home() {
    const router = useRouter();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.1, delayChildren: 0.2 }
        }
    };
    
    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
    };

  return (
    <div className="relative flex flex-col min-h-screen p-4 md:p-8 overflow-x-hidden">
        <div className="absolute inset-0 -z-10 h-full w-full">
            <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"></div>
            <div className="absolute left-0 right-0 top-[-10%] h-[1000px] w-[1000px] rounded-full bg-[radial-gradient(circle_400px_at_50%_300px,#3b82f633,transparent)]"></div>
        </div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center my-16 flex flex-col items-center"
      >
        <TextType
          as="h1"
          text="Welcome to AuraMind"
          typingSpeed={60}
          loop={false}
          className="text-4xl md:text-6xl font-bold mb-4 tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-blue-400 to-purple-500"
        />

        <TextType
            text="Your personal companion for mental wellness and self-discovery. Explore tools designed to bring you calm, clarity, and strength."
            typingSpeed={20}
            initialDelay={1500}
            loop={false}
            className="text-lg max-w-3xl mx-auto text-gray-400"
        />
      </motion.div>

       <motion.div
        className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {features.map((feature) => {
            const colors = colorVariants[feature.color as keyof typeof colorVariants] || colorVariants.blue;
            return (
                <motion.div 
                    key={feature.href} 
                    variants={itemVariants}
                    onClick={() => router.push(feature.href)}
                >
                    <Card
                        className={cn(
                            "flex flex-col h-full bg-gray-900/50 border cursor-pointer transition-all duration-300 transform hover:-translate-y-2 rounded-2xl overflow-hidden group",
                            colors.border,
                            colors.shadow
                        )}
                    >
                        <CardHeader className="p-6 flex-grow">
                            <div className="flex items-start justify-between mb-4">
                                <div className={cn("p-3 rounded-lg bg-black/20 border", colors.border)}>
                                    <feature.icon className={cn("h-6 w-6", colors.iconText)} />
                                </div>
                                <div className="flex items-center text-xs text-gray-400 group-hover:text-white transition-colors">
                                    Explore <ArrowRight className="h-3 w-3 ml-1.5 transition-transform group-hover:translate-x-1" />
                                </div>
                            </div>
                            <CardTitle className={cn("text-xl pt-2", colors.iconText)}>{feature.label}</CardTitle>
                            <CardDescription className="text-gray-400 pt-2 text-sm">
                            {feature.description}
                            </CardDescription>
                        </CardHeader>
                    </Card>
              </motion.div>
            )
        })}
      </motion.div>

    </div>
  );
}
