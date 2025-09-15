
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
  List,
  Search,
  CheckCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import React from 'react';
import Image from 'next/image';
import ScrollFloat from '@/components/scroll-float';
import { Navbar, NavBody, NavItems, NavbarLogo, NavbarButton, MobileNav, MobileNavHeader, MobileNavToggle, MobileNavMenu } from '@/components/ui/resizable-navbar';
import TextType from '@/components/ui/text-type';
import audioData from '@/lib/placeholder-audio.json';
import { SparklesCore } from '@/components/ui/sparkles';
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import { LampContainer } from "@/components/ui/lamp";
import { StickyScroll } from '@/components/ui/sticky-scroll-reveal';


const features = [
  {
    icon: MessageSquare,
    title: "Empathetic Chat",
    description: "Talk about your feelings in a safe, non-judgmental space with Aura, your AI companion.",
    href: "/chat",
    src: "https://picsum.photos/seed/feature1/1000/1000",
    category: "AI Conversation"
  },
  {
    icon: Users,
    title: "AI Consultant",
    description: "Engage in simulated video calls with specialized AI personas for focused support.",
    href: "/consultant",
    src: "https://picsum.photos/seed/feature2/1000/1000",
    category: "Virtual Support"
  },
  {
    icon: Sparkles,
    title: "Calm Room",
    description: "Immerse yourself in tranquil 3D scenes with calming audio to find your peace.",
    href: "/calm",
    src: "https://picsum.photos/seed/feature3/1000/1000",
    category: "Immersive Relaxation"
  },
   {
    icon: ShieldCheck,
    title: "Self-Care Adventures",
    description: "Embark on daily quests to build healthy habits and improve your well-being.",
    href: "/adventures",
    src: "https://picsum.photos/seed/feature4/1000/1000",
    category: "Gamified Wellness"
  },
  {
    icon: FileQuestion,
    title: "Mind Quizzes",
    description: "Gain insights into your mind with quizzes on CBT, mindfulness, and more.",
    href: "/quizzes",
    src: "https://picsum.photos/seed/feature5/1000/1000",
    category: "Self-Discovery"
  },
  {
    icon: Music,
    title: "Curated Playlists",
    description: "Listen to sounds and music designed for focus, relaxation, and meditation.",
    href: "/playlist",
    src: "https://picsum.photos/seed/feature6/1000/1000",
    category: "Audio Experience"
  },
];

const howItWorksSteps = [
    {
        title: "Start a Conversation",
        description: "Begin by chatting with Aura. Share what's on your mind in a safe, non-judgmental space. It's the first step to understanding your feelings.",
        content: (
          <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] text-white">
            <Image
                src="https://i.pravatar.cc/300?img=1"
                width={300}
                height={300}
                className="h-full w-full object-cover"
                alt="Start a conversation"
                data-ai-hint="woman smiling"
            />
          </div>
        ),
    },
    {
        title: "Explore Wellness Tools",
        description: "Discover a suite of features designed for your well-being, including the Calm Room, AI-guided Self-Care Adventures, and curated audio Playlists.",
        content: (
          <div className="flex h-full w-full  items-center justify-center text-white">
            <Image
              src="https://miro.medium.com/v2/resize:fit:1400/1*87rtELiYihvrNL3Ew-DKSw.jpeg"
              width={300}
              height={300}
              className="h-full w-full object-cover"
              alt="Explore wellness tools"
              data-ai-hint="nature wellness"
            />
          </div>
        ),
    },
    {
        title: "Track Your Progress",
        description: "Engage with daily quests and quizzes to build healthy habits, gain self-awareness, and watch your mental wellness journey unfold.",
        content: (
          <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--orange-500),var(--yellow-500))] text-white">
             <Image
              src="https://burst.shopifycdn.com/photos/person-holds-a-book-over-a-cup-of-coffee.jpg?width=1000&format=pjpg&exif=0&iptc=0"
              width={300}
              height={300}
              className="h-full w-full object-cover"
              alt="Track your progress"
              data-ai-hint="journal progress"
            />
          </div>
        ),
    },
     {
        title: "Find Your Calm",
        description: "Immerse yourself in our Calm Room with 3D scenes and soothing audio, or find the perfect track in our curated Playlists to relax and focus.",
        content: (
            <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] text-white">
                 <Image
                  src="https://thumbs.dreamstime.com/b/meditation-concept-spiritual-metaphysical-meditation-woman-silhouette-lotus-pose-rays-light-chakras-spirituality-59187997.jpg"
                  width={300}
                  height={300}
                  className="h-full w-full object-cover"
                  alt="Find your calm"
                    data-ai-hint="meditation spiritual"
                />
            </div>
        ),
    }
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
        name: "Consultant",
        link: "/consultant",
      },
      {
        name: "Calm Room",
        link: "/calm",
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
    
    const cards = features.map((feature, index) => (
        <Card
            key={feature.title}
            card={{
                src: feature.src,
                title: feature.title,
                category: feature.category,
                content: (
                <div onClick={() => router.push(feature.href)} className="cursor-pointer">
                    <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg mb-4">{feature.description}</p>
                    <Button className="bg-blue-600 hover:bg-blue-500 text-white">
                        Explore {feature.title} <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </div>
                ),
            }}
            index={index}
        />
    ));


    return (
        <div className="flex flex-col min-h-screen bg-black text-white">
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
            <div className="relative overflow-x-hidden">
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
                            initial={{ opacity: 0, x: -100, rotate: -25 }}
                            animate={{ 
                                opacity: 1, 
                                x: 0, 
                                rotate: -15,
                                y: ["0rem", "-1.5rem", "0rem"],
                            }}
                            transition={{ 
                                duration: 0.8, ease: 'easeOut', delay: 0.3,
                                y: { duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 } 
                            }}
                            className="absolute left-0 md:left-10 lg:-left-12 w-56 h-80 md:w-64 md:h-80 hidden lg:block cursor-pointer group shadow-2xl shadow-blue-500/20"
                            onClick={() => toggleAudio('mindful_moments')}
                        >
                            <div className="relative w-full h-full p-4 bg-gray-900/50 rounded-2xl backdrop-blur-md border border-white/10 overflow-hidden">
                                <Image src="https://picsum.photos/seed/1/400/400" alt="card" fill className="object-cover rounded-xl blur-[2px] group-hover:blur-0 transition-all duration-500" data-ai-hint="abstract art" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-xl"></div>
                                <div className="absolute bottom-4 left-4 text-white">
                                    <h4 className="font-bold">Mindful Moments</h4>
                                    <p className="text-xs text-gray-300">Calm Your Mind</p>
                                </div>
                                <div className="absolute top-4 right-4 bg-black/50 p-2 rounded-full">
                                    <Heart className="h-4 w-4 text-pink-400" />
                                </div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="bg-black/50 rounded-full p-3">
                                        {playingAudio === 'mindful_moments' ? <Pause className="h-8 w-8 text-white"/> : <Play className="h-8 w-8 text-white"/>}
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <div className="text-center max-w-4xl">
                            <motion.div 
                                initial={{ opacity: 0, y: -50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, ease: 'easeOut' }}
                                className="flex flex-col items-center"
                            >
                                <div className="flex justify-center">
                                    <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-white">
                                        <div className="flex items-center">
                                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                                                A New Path to&nbsp;
                                                <TextType 
                                                    as="span"
                                                    text={["Mental Wellness", "Clarity", "Strength", "Peace"]}
                                                    className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
                                                    typingSpeed={100}
                                                    deletingSpeed={50}
                                                    pauseDuration={1500}
                                                    loop
                                                />
                                            </span>
                                        </div>
                                    </h1>
                                </div>
                                <p className="mt-6 max-w-xl mx-auto text-base md:text-lg text-gray-300">
                                AuraMind is your personal AI companion for self-discovery. Explore tools designed to bring you calm, clarity, and strength on your mental wellness journey.
                                </p>
                                <div className="mt-10 flex items-center justify-center gap-4">
                                    <Button 
                                        onClick={handleGetStarted}
                                        className="px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transform transition-all duration-300"
                                    >
                                        Explore Tools <ArrowRight className="ml-2 h-5 w-5" />
                                    </Button>
                                    <a href="https://github.com/firebase/studio-extra-sessions/tree/main/AuraMind" target="_blank" rel="noopener noreferrer">
                                        <Button 
                                            variant="outline"
                                            className="px-8 py-4 text-lg font-bold bg-transparent border-2 border-gray-500 text-gray-300 rounded-full hover:bg-gray-800/50 hover:border-purple-500 hover:text-white transform transition-all duration-300"
                                        >
                                        View Project on GitHub
                                        </Button>
                                    </a>
                                </div>
                            </motion.div>
                        </div>

                        {/* Right Tilted Card */}
                        <motion.div
                            initial={{ opacity: 0, x: 100, rotate: 25 }}
                            animate={{ 
                                opacity: 1, 
                                x: 0, 
                                rotate: 15,
                                y: ["0rem", "1.5rem", "0rem"],
                            }}
                            transition={{ 
                                duration: 0.8, ease: 'easeOut', delay: 0.3,
                                y: { duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 } 
                            }}
                            className="absolute right-0 md:right-10 lg:-right-12 w-56 h-80 md:w-64 md:h-80 hidden lg:block cursor-pointer group shadow-2xl shadow-purple-500/20"
                            onClick={() => toggleAudio('inner_journey')}
                        >
                            <div className="relative w-full h-full p-4 bg-gray-900/50 rounded-2xl backdrop-blur-md border border-white/10 overflow-hidden">
                                <Image src="https://picsum.photos/seed/2/400/400" alt="card" fill className="object-cover rounded-xl blur-[2px] group-hover:blur-0 transition-all duration-500" data-ai-hint="astronaut space" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-xl"></div>
                                <div className="absolute bottom-4 left-4 text-white">
                                    <h4 className="font-bold">Inner Journey</h4>
                                    <p className="text-xs text-gray-300">Explore Your Thoughts</p>
                                </div>
                                <div className="absolute top-4 right-4 bg-black/50 p-2 rounded-full">
                                    <Brain className="h-4 w-4 text-blue-300" />
                                </div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="bg-black/50 rounded-full p-3">
                                        {playingAudio === 'inner_journey' ? <Pause className="h-8 w-8 text-white"/> : <Play className="h-8 w-8 text-white"/>}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                    <div className="absolute bottom-10 left-0 w-full max-w-full z-20 mt-8">
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
            </div>
            
            {/* Lamp Section */}
            <div id="features" className="py-20 md:py-0">
              <LampContainer>
                <motion.h1
                  initial={{ opacity: 0.5, y: 100 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.3,
                    duration: 0.8,
                    ease: "easeInOut",
                  }}
                  className="mt-8 bg-gradient-to-br from-purple-400 to-blue-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
                >
                  A Toolkit for a Calmer Mind
                </motion.h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-400 font-normal">
                    A suite of tools to help you find calm, clarity, and strength.
                </p>
              </LampContainer>
            </div>

             {/* Features Section */}
             <div className="relative overflow-x-hidden">
                <section className="bg-black px-4">
                    <div className="max-w-7xl mx-auto">
                        <Carousel items={cards} />
                    </div>
                </section>
            </div>

             {/* How It Works Section */}
            <section className="py-20 md:py-32 bg-black">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-blue-400 to-purple-500 mb-4">
                            Your Journey to a Calmer Mind
                        </h2>
                        <p className="text-lg max-w-3xl mx-auto text-gray-400">
                            Getting started with AuraMind is simple. Here’s how you can begin to transform your mental wellness today.
                        </p>
                    </div>
                     <StickyScroll content={howItWorksSteps} />
                </div>
            </section>

             {/* Footer Section */}
            <footer className="py-8 bg-black border-t border-white/10 px-4">
                <div className="max-w-6xl mx-auto text-center text-gray-500">
                    <p>&copy; {new Date().getFullYear()} AuraMind. All Rights Reserved.</p>
                    <p className="text-xs mt-2">Your mental wellness companion.</p>
                </div>
            </footer>
            <audio ref={audioRef} onEnded={() => setPlayingAudio(null)} />
        </div>
    );

}

    
