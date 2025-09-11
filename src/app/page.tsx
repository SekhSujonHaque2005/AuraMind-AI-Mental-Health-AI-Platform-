
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
  Play,
  Heart,
  Brain,
  Pause,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import React from 'react';
import Image from 'next/image';
import ScrollFloat from '@/components/scroll-float';
import { Navbar, NavBody, NavItems, NavbarLogo, NavbarButton, MobileNav, MobileNavHeader, MobileNavToggle, MobileNavMenu } from '@/components/ui/resizable-navbar';
import TextType from '@/components/ui/text-type';
import audioData from '@/lib/placeholder-audio.json';
import { SparklesCore } from '@/components/ui/sparkles';


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

const techLogos = [
  { alt: 'Next.js', src: 'https://www.svgrepo.com/show/354113/nextjs-icon.svg' },
  { alt: 'React', src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1150px-React-icon.svg.png' },
  { alt: 'TypeScript', src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/2048px-Typescript_logo_2020.svg.png' },
  { alt: 'Tailwind CSS', src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Tailwind_CSS_Logo.svg/2560px-Tailwind_CSS_Logo.svg.png' },
  { alt: 'Genkit', src: 'https://developers-dot-devsite-v2-prod.appspot.com/solutions/learn/agentic-barista/external-assets/firebase-genkit.svg' },
  { alt: 'Firebase', src: 'https://www.svgrepo.com/show/303670/firebase-1-logo.svg' },
  { alt: 'Google', src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/2048px-Google_%22G%22_logo.svg.png' },
  { alt: 'ShadCN UI', src: 'https://avatars.githubusercontent.com/u/139895814?v=4' },
];

export default function LandingPage() {
    const router = useRouter();
    const [isOpen, setIsOpen] = React.useState(false);
    const [playingAudio, setPlayingAudio] = React.useState<string | null>(null);
    const audioRef = React.useRef<HTMLAudioElement>(null);


    const handleGetStarted = () => {
        router.push('/chat');
    };

    const navItems = [
      {
        name: "Features",
        link: "#features",
      },
      {
        name: "Chat",
        link: "/chat",
      },
      {
        name: "Resources",
        link: "/resources",
      },
    ];

    const toggleAudio = (audioKey: string) => {
        if (playingAudio === audioKey) {
            audioRef.current?.pause();
            setPlayingAudio(null);
        } else {
            const audioInfo = audioData[audioKey as keyof typeof audioData];
            if (audioRef.current && audioInfo) {
                audioRef.current.src = audioInfo.url;
                audioRef.current.play();
                setPlayingAudio(audioKey);
            }
        }
    };


    return (
        <div className="flex flex-col min-h-screen bg-black text-white overflow-x-hidden">
             {/* Header */}
             <Navbar>
                <NavBody>
                    <NavbarLogo>
                         <div className="flex items-center gap-2 font-bold text-xl">
                            <MessageSquare className="h-7 w-7 text-blue-400" />
                            <span className='dark:text-white'>AuraMind</span>
                        </div>
                    </NavbarLogo>
                    <NavItems items={navItems} />
                    <NavbarButton onClick={handleGetStarted} className="bg-blue-600 hover:bg-blue-500 text-white rounded-lg px-5 py-2.5 font-semibold">
                         Get Started
                    </NavbarButton>
                </NavBody>
                <MobileNav>
                    <MobileNavHeader>
                        <NavbarLogo>
                            <div className="flex items-center gap-2 font-bold text-xl">
                                <MessageSquare className="h-7 w-7 text-blue-400" />
                                <span className='dark:text-white'>AuraMind</span>
                            </div>
                        </NavbarLogo>
                        <MobileNavToggle isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
                    </MobileNavHeader>
                    <MobileNavMenu isOpen={isOpen} onClose={() => setIsOpen(false)}>
                        {navItems.map((item, idx) => (
                        <a href={item.link} key={`mobile-nav-${idx}`} className='text-black dark:text-white'>
                            {item.name}
                        </a>
                        ))}
                        <NavbarButton onClick={handleGetStarted} className="bg-blue-600 hover:bg-blue-500 text-white rounded-lg px-5 py-2.5 font-semibold w-full">
                          Get Started
                        </NavbarButton>
                    </MobileNavMenu>
                </MobileNav>
            </Navbar>
            
            {/* Hero Section */}
            <section className="relative flex items-center h-[90vh] md:h-screen">
                <div className="absolute inset-0 z-0 h-full w-full">
                   <SparklesCore
                        id="tsparticles"
                        background="transparent"
                        minSize={0.6}
                        maxSize={1.4}
                        particleDensity={100}
                        className="h-full w-full"
                        particleColor="#FFFFFF"
                    />
                </div>

                <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center items-center">
                    
                    {/* Left Tilted Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -100, rotate: -25, y: 0 }}
                        animate={{ 
                            opacity: 1, 
                            x: 0, 
                            rotate: -15,
                            y: ["0rem", "-1.5rem", "0rem"],
                        }}
                        transition={{ 
                            opacity: { duration: 0.8, ease: 'easeOut', delay: 0.3 },
                            x: { duration: 0.8, ease: 'easeOut', delay: 0.3 },
                            rotate: { duration: 0.8, ease: 'easeOut', delay: 0.3 },
                            y: { duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 } 
                        }}
                        className="absolute left-0 md:left-10 lg:-left-12 w-56 h-80 md:w-64 md:h-80 hidden lg:block cursor-pointer group"
                         onClick={() => toggleAudio('mindful_moments')}
                    >
                        <div className="relative w-full h-full p-4 bg-gray-900/50 rounded-2xl shadow-2xl backdrop-blur-md border border-white/10">
                             <Image src="https://picsum.photos/seed/1/400/400" alt="card" fill className="object-cover rounded-xl" data-ai-hint="abstract art" />
                             <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-xl"></div>
                             <div className="absolute bottom-4 left-4 text-white">
                                <h4 className="font-bold">Mindful Moments</h4>
                                <p className="text-xs text-gray-300">Calm Your Mind</p>
                             </div>
                             <div className="absolute top-4 right-4 bg-black/50 p-2 rounded-full">
                                <Heart className="h-4 w-4 text-pink-400" />
                             </div>
                             <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="bg-black/50 rounded-full p-3">
                                    {playingAudio === 'mindful_moments' ? <Pause className="h-8 w-8 text-white"/> : <Play className="h-8 w-8 text-white"/>}
                                </div>
                             </div>
                        </div>
                    </motion.div>

                     <div className="text-center max-w-2xl">
                        <motion.div 
                            initial={{ opacity: 0, y: -50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: 'easeOut' }}
                            className="flex flex-col items-center"
                        >
                            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-white">
                                <span className="inline-block">
                                    <span className="inline-block bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500">A New Path to&nbsp;</span>
                                    <TextType 
                                        as="span"
                                        text={["Mental Wellness", "Clarity", "Strength", "Peace"]}
                                        className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
                                        typingSpeed={100}
                                        deletingSpeed={50}
                                        pauseDuration={1500}
                                        loop
                                    />
                                </span>
                            </h1>
                            <p className="mt-6 max-w-xl mx-auto text-base md:text-lg text-gray-300">
                               AuraMind is your personal AI companion for self-discovery. Explore tools designed to bring you calm, clarity, and strength on your mental wellness journey.
                            </p>
                            <div className="mt-10 flex items-center justify-center gap-4">
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
                     </div>

                      {/* Right Tilted Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 100, rotate: 25, y: 0 }}
                        animate={{ 
                            opacity: 1, 
                            x: 0, 
                            rotate: 15,
                            y: ["0rem", "1.5rem", "0rem"],
                        }}
                         transition={{ 
                            opacity: { duration: 0.8, ease: 'easeOut', delay: 0.3 },
                            x: { duration: 0.8, ease: 'easeOut', delay: 0.3 },
                            rotate: { duration: 0.8, ease: 'easeOut', delay: 0.3 },
                            y: { duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 } 
                        }}
                        className="absolute right-0 md:right-10 lg:-right-12 w-56 h-80 md:w-64 md:h-80 hidden lg:block cursor-pointer group"
                        onClick={() => toggleAudio('inner_journey')}
                    >
                         <div className="relative w-full h-full p-4 bg-gray-900/50 rounded-2xl shadow-2xl backdrop-blur-md border border-white/10">
                             <Image src="https://picsum.photos/seed/2/400/400" alt="card" fill className="object-cover rounded-xl" data-ai-hint="astronaut space" />
                             <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-xl"></div>
                             <div className="absolute bottom-4 left-4 text-white">
                                <h4 className="font-bold">Inner Journey</h4>
                                <p className="text-xs text-gray-300">Explore Your Thoughts</p>
                             </div>
                             <div className="absolute top-4 right-4 bg-black/50 p-2 rounded-full">
                                <Brain className="h-4 w-4 text-blue-300" />
                             </div>
                             <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="bg-black/50 rounded-full p-3">
                                    {playingAudio === 'inner_journey' ? <Pause className="h-8 w-8 text-white"/> : <Play className="h-8 w-8 text-white"/>}
                                </div>
                             </div>
                        </div>
                    </motion.div>
                </div>
                <div className="absolute bottom-10 left-0 w-full max-w-full overflow-x-hidden z-20 mt-8">
                    <div className="group relative w-full overflow-hidden bg-transparent" style={{ maskImage: 'linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)' }}>
                        <div className="flex animate-marquee-slow hover:[animation-play-state:paused]">
                            {[...techLogos, ...techLogos].map((logo, index) => (
                                <span key={index} className="inline-block px-8">
                                    <span className="flex h-16 w-32 items-center justify-center text-muted-foreground grayscale transition-all duration-300 hover:grayscale-0 hover:text-foreground">
                                        <Image alt={logo.alt} loading="lazy" width="40" height="40" decoding="async" className="object-contain" src={logo.src} style={{ color: 'transparent' }} />
                                    </span>
                                </span>
                            ))}
                        </div>
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
                                animate={{ y: ["0rem", "-0.75rem", "0rem"] }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{
                                    y: {
                                        duration: 3 + i * 0.5,
                                        repeat: Infinity,
                                        repeatType: "reverse",
                                        ease: "easeInOut",
                                        delay: 1 + i * 0.2, 
                                    },
                                    opacity: {
                                        duration: 0.6,
                                        delay: i * 0.1,
                                        ease: "easeOut"
                                    }
                                }}
                                onClick={() => router.push(feature.href)}
                                className="cursor-pointer group flex flex-col gap-4 p-6 rounded-2xl bg-gray-900/50 border border-white/10 hover:border-blue-500/50"
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
            <audio ref={audioRef} onEnded={() => setPlayingAudio(null)} />
        </div>
    );

}

    