
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
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import React from 'react';
import dynamic from 'next/dynamic';
import ScrollFloat from '@/components/scroll-float';

const Prism = dynamic(() => import('@/components/prism'), { ssr: false });

const features = [
  {
    icon: MessageSquare,
    title: "Empathetic Chat",
    description: "Talk about your feelings in a safe, non-judgmental space with Aura, your AI companion.",
  },
  {
    icon: Users,
    title: "AI Consultant",
    description: "Engage in simulated video calls with specialized AI personas for focused support.",
  },
  {
    icon: Sparkles,
    title: "Calm Room",
    description: "Immerse yourself in tranquil 3D scenes with calming audio to find your peace.",
  },
   {
    icon: ShieldCheck,
    title: "Self-Care Adventures",
    description: "Embark on daily quests to build healthy habits and improve your well-being.",
  },
  {
    icon: FileQuestion,
    title: "Mind Quizzes",
    description: "Gain insights into your mind with quizzes on CBT, mindfulness, and more.",
  },
  {
    icon: Music,
    title: "Curated Playlists",
    description: "Listen to sounds and music designed for focus, relaxation, and meditation.",
  },
];

export default function LandingPage() {
    const router = useRouter();

    const handleGetStarted = () => {
        router.push('/chat');
    };

    return (
        <div className="flex flex-col min-h-screen bg-black text-white overflow-x-hidden">
            {/* Hero Section */}
            <section className="relative flex flex-col items-center justify-center h-[90vh] md:h-screen p-4 text-center">
                <div className="absolute inset-0 z-0">
                    <Prism
                        height={3.5}
                        baseWidth={5.5}
                        animationType="rotate"
                        glow={1.5}
                        scale={4}
                        bloom={0.5}
                        hueShift={0}
                        timeScale={0.2}
                    />
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"></div>
                </div>

                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="z-10 flex flex-col items-center"
                >
                    <h1 className="text-4xl md:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-gray-200 via-gray-400 to-gray-600">
                        A New Path to Mental Wellness
                    </h1>
                    <p className="mt-6 max-w-xl text-base md:text-xl text-gray-300">
                        AuraMind is your personal companion for self-discovery. Explore tools designed to bring you calm, clarity, and strength.
                    </p>
                    <Button 
                        onClick={handleGetStarted}
                        className="mt-10 px-8 py-6 text-lg font-semibold bg-white text-black hover:bg-gray-200 transition-transform hover:scale-105"
                    >
                        Get Started <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                </motion.div>
            </section>
            
             {/* Features Section */}
            <section className="py-20 md:py-32 bg-black px-4">
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
                                className="flex flex-col gap-4 p-6 rounded-2xl bg-gray-900/50 border border-white/10"
                            >
                                <div className="flex items-center gap-4">
                                     <div className="p-3 rounded-lg bg-gray-800 border border-white/10">
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
