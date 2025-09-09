
'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  MessageSquare,
  Users,
  Sparkles,
  ShieldCheck,
  FileQuestion,
  Music,
  ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import React from 'react';
import dynamic from 'next/dynamic';
import ScrollFloat from '@/components/scroll-float';
import Link from 'next/link';
import TextType from '@/components/ui/text-type';

const AnimatedCodeBlock = () => {
    const code = `
import { getAuraResponse } from '@/ai/flows';

// Get a personalized and empathetic response
const { response, gifUrl } = await getAuraResponse({ 
  message: "I'm feeling a bit overwhelmed today.",
  conversationHistory,
  language: 'English',
});

console.log(response);
    `;

    return (
        <div className="relative w-full max-w-lg mx-auto bg-gray-900/80 backdrop-blur-sm rounded-xl border border-white/10 shadow-2xl shadow-blue-500/10">
            <div className="flex items-center gap-2 p-3 border-b border-white/10">
                <span className="h-3.5 w-3.5 rounded-full bg-red-500"></span>
                <span className="h-3.5 w-3.5 rounded-full bg-yellow-500"></span>
                <span className="h-3.5 w-3.5 rounded-full bg-green-500"></span>
                <p className="ml-4 text-sm text-gray-400">Aura AI Response</p>
            </div>
            <div className="p-4">
                 <TextType
                    as="pre"
                    text={code}
                    typingSpeed={25}
                    loop={false}
                    className="text-sm !whitespace-pre-wrap"
                    showCursor={false}
                 />
            </div>
        </div>
    );
};


const features = [
  {
    icon: MessageSquare,
    title: "Empathetic Chat",
    description: "Talk about your feelings in a safe, non-judgmental space with Aura, your AI companion.",
    href: "/chat"
  },
  {
    icon: Users,
    title: "AI Consultant",
    description: "Engage in simulated video calls with specialized AI personas for focused support.",
    href: "/consultant"
  },
  {
    icon: Sparkles,
    title: "Calm Room",
    description: "Immerse yourself in tranquil 3D scenes with calming audio to find your peace.",
    href: "/calm"
  },
   {
    icon: ShieldCheck,
    title: "Self-Care Adventures",
    description: "Embark on daily quests to build healthy habits and improve your well-being.",
    href: "/adventures"
  },
  {
    icon: FileQuestion,
    title: "Mind Quizzes",
    description: "Gain insights into your mind with quizzes on CBT, mindfulness, and more.",
    href: "/quizzes"
  },
  {
    icon: Music,
    title: "Curated Playlists",
    description: "Listen to sounds and music designed for focus, relaxation, and meditation.",
    href: "/playlist"
  },
];

export default function LandingPage() {
    const router = useRouter();

    const handleGetStarted = () => {
        router.push('/chat');
    };

    return (
        <div className="flex flex-col min-h-screen bg-black text-white overflow-x-hidden">
             {/* Header */}
            <header className="absolute top-0 left-0 right-0 z-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
                            <MessageSquare className="h-7 w-7 text-blue-400" />
                            <span>AuraMind</span>
                        </Link>
                        <nav className="hidden md:flex items-center gap-8">
                             <Link href="#features" className="text-gray-300 hover:text-white transition-colors">Features</Link>
                        </nav>
                        <div className="flex items-center gap-4">
                            <Button
                                onClick={handleGetStarted}
                                className="bg-blue-600 hover:bg-blue-500 text-white rounded-lg px-5 py-2.5 font-semibold"
                            >
                                Get Started
                            </Button>
                        </div>
                    </div>
                </div>
            </header>
            
            {/* Hero Section */}
            <section className="relative flex items-center h-[90vh] md:h-screen pt-20">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#111827] via-black to-black"></div>
                     <div className="absolute bottom-0 left-[-20%] right-0 top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,255,255,0.05),rgba(255,255,255,0))]"></div>
                    <div className="absolute bottom-[-40%] right-[-30%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(59,130,246,0.1),rgba(255,255,255,0))]"></div>
                </div>

                <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                     <div className="grid md:grid-cols-2 gap-12 items-center">
                        <motion.div 
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, ease: 'easeOut' }}
                        >
                            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-white">
                                A New Path to 
                                <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mt-2">
                                     Mental Wellness
                                </span>
                            </h1>
                            <p className="mt-6 max-w-xl text-base md:text-lg text-gray-300">
                               AuraMind is your personal AI companion for self-discovery. Explore tools designed to bring you calm, clarity, and strength on your mental wellness journey.
                            </p>
                            <div className="mt-10 flex items-center gap-4">
                                <Button 
                                    onClick={handleGetStarted}
                                    className="px-6 py-5 text-base font-semibold bg-blue-600 text-white hover:bg-blue-500 transition-transform hover:scale-105 rounded-lg"
                                >
                                    Explore Tools <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                                 <Button 
                                    variant="outline"
                                    onClick={() => router.push('/consultant')}
                                    className="px-6 py-5 text-base font-semibold bg-transparent border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg"
                                >
                                   Meet the AI Team
                                </Button>
                            </div>
                        </motion.div>
                        <motion.div
                             initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
                        >
                           <AnimatedCodeBlock />
                        </motion.div>
                     </div>
                </div>
            </section>
            
             {/* Features Section */}
            <section id="features" className="py-20 md:py-32 bg-black px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <ScrollFloat as="h2" className="text-3xl md:text-5xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-gray-200 to-gray-600">
                           All The Tools You Need
                        </ScrollFloat>
                         <ScrollFloat as="p" className="mt-4 max-w-2xl mx-auto text-lg text-gray-400">
                           From guided meditations to personalized support, AuraMind offers a comprehensive suite of features.
                        </ScrollFloat>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, i) => (
                             <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
                                onClick={() => router.push(feature.href)}
                                className="cursor-pointer group flex flex-col gap-4 p-6 rounded-2xl bg-gray-900/50 border border-white/10 hover:border-blue-500/50 transition-all hover:-translate-y-1"
                            >
                                <div className="flex items-center gap-4">
                                     <div className="p-3 rounded-lg bg-gray-800 border border-white/10 group-hover:border-blue-500/50 transition-colors">
                                         <feature.icon className="w-6 h-6 text-blue-400" />
                                     </div>
                                     <h3 className="text-xl font-semibold text-gray-100">{feature.title}</h3>
                                </div>
                                <p className="text-gray-400">
                                    {feature.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

             {/* Footer Section */}
            <footer className="py-8 bg-gray-900/50 border-t border-white/10 px-4">
                <div className="max-w-6xl mx-auto text-center text-gray-500">
                    <p>&copy; {new Date().getFullYear()} AuraMind. All Rights Reserved.</p>
                    <p className="text-xs mt-2">Your mental wellness companion.</p>
                </div>
            </footer>
        </div>
    );
}
