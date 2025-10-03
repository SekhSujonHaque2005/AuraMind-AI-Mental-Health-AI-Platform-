
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
  BookUser,
  Send,
  Handshake,
  Headphones,
  Sun,
  Palette,
  Briefcase,
  BookOpen,
  Zap,
  LifeBuoy,
  Clapperboard,
  HeartHandshake,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import ScrollFloat from '@/components/scroll-float';
import { Navbar, NavBody, NavItems, NavbarLogo, NavbarButton, MobileNav, MobileNavHeader, MobileNavToggle, MobileNavMenu } from '@/components/ui/resizable-navbar';
import TextType from '@/components/ui/text-type';
import audioData from '@/lib/placeholder-audio.json';
import { SparklesCore } from '@/components/ui/sparkles';
import { Carousel, Card as AppleCard } from "@/components/ui/apple-cards-carousel";
import { LampContainer } from "@/components/ui/lamp";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import { TinderCards } from "@/components/ui/tinder-cards";
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';


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
    icon: Handshake,
    title: "Counselor Connect",
    description: "Connect with real, licensed counselors for professional support and guidance.",
    href: "/counselor-connect",
    src: "https://picsum.photos/seed/feature7/1000/1000",
    category: "Professional Help"
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

const AnimatedTyping = () => {
    const text = "Share what's on your mind...";
    return (
        <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] text-white p-4">
            <div className="w-full max-w-sm rounded-lg bg-black/30 p-4 font-mono text-lg text-left">
                <TextType text={text} typingSpeed={60} loop={true} />
            </div>
        </div>
    );
};

const AnimatedGrid = () => {
    const icons = [Sparkles, ShieldCheck, FileQuestion, Music, Users, Handshake, BookUser];
    return (
        <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-[linear-gradient(to_bottom_right,var(--pink-500),var(--indigo-500))] text-white">
             <div className="grid grid-cols-4 gap-4">
                {icons.map((Icon, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatType: 'loop',
                            delay: i * 0.2,
                        }}
                    >
                        <Icon className="h-10 w-10 text-white/70" />
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

const AnimatedProgress = () => {
    return (
        <div className="flex h-full w-full flex-col items-center justify-center bg-[linear-gradient(to_bottom_right,var(--orange-500),var(--yellow-500))] p-8 text-white">
            <div className="w-full space-y-6">
                <div className="flex items-center gap-3">
                    <CheckCircle className="h-6 w-6 text-green-300" />
                    <span className="font-medium">Daily Meditation</span>
                </div>
                 <div className="flex items-center gap-3">
                    <motion.div initial={{ width: 0 }} animate={{ width: '80%' }} transition={{ duration: 1.5, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }} className="h-2 rounded-full bg-green-400" />
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                    <CheckCircle className="h-6 w-6 text-green-300" />
                    <span className="font-medium">Gratitude Journal</span>
                </div>
            </div>
        </div>
    );
};

const AnimatedRipples = () => {
    return (
        <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))]">
            {[...Array(3)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute rounded-full border border-blue-300/80"
                    initial={{ scale: 0, opacity: 1 }}
                    animate={{ scale: 3, opacity: 0 }}
                    transition={{
                        duration: 3,
                        ease: "easeInOut",
                        repeat: Infinity,
                        delay: i * 1,
                    }}
                    style={{ width: 50, height: 50 }}
                />
            ))}
            <Music className="h-10 w-10 text-white" />
        </div>
    );
};


const howItWorksSteps = [
    {
        title: "Start a Conversation",
        description: "Begin by chatting with Aura. Share what's on your mind in a safe, non-judgmental space. It's the first step to understanding your feelings.",
        content: <AnimatedTyping />,
    },
    {
        title: "Explore Wellness Tools",
        description: "Discover a suite of features designed for your well-being, including the Calm Room, AI-guided Self-Care Adventures, and curated audio Playlists.",
        content: <AnimatedGrid />,
    },
    {
        title: "Track Your Progress",
        description: "Engage with daily quests and quizzes to build healthy habits, gain self-awareness, and watch your mental wellness journey unfold.",
        content: <AnimatedProgress />,
    },
     {
        title: "Find Your Calm",
        description: "Immerse yourself in our Calm Room with 3D scenes and soothing audio, or find the perfect track in our curated Playlists to relax and focus.",
        content: <AnimatedRipples />,
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

const FeedbackForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Feedback submitted:", formData);
    toast({
      title: "Feedback Sent!",
      description: "Thank you for helping us improve AuraMind.",
    });
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <h3 className="text-xl font-bold text-foreground">Tell us what you think!</h3>
      <p className="text-muted-foreground text-sm">Your feedback helps us improve AuraMind.</p>
      <div className="flex flex-col gap-3 mt-2">
        <Input
          name="name"
          type="text"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          className="bg-background/50 border-border/70"
          required
        />
        <Input
          name="email"
          type="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          className="bg-background/50 border-border/70"
          required
        />
        <Textarea
          name="message"
          placeholder="Your message..."
          value={formData.message}
          onChange={handleChange}
          className="min-h-[120px] bg-background/50 border-border/70"
          required
        />
      </div>
      <Button type="submit" className="mt-2 bg-primary text-primary-foreground w-full">
        Submit Feedback
      </Button>
    </form>
  );
};

export default function LandingPage() {
    const router = useRouter();
    const [isOpen, setIsOpen] = React.useState(false);
    const [playingAudio, setPlayingAudio] = React.useState<string | null>(null);
    const audioRef = React.useRef<HTMLAudioElement>(null);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);


    const contactCards = [
      <FeedbackForm key="feedback" />,
      <div key="feature" className="flex flex-col gap-4">
        <h3 className="text-xl font-bold text-foreground">Feature Request</h3>
        <p className="text-muted-foreground text-sm">
          Have an idea for a new feature? We&apos;d love to hear it! Please use the feedback form on the previous card to share your thoughts.
        </p>
      </div>,
      <div key="hello" className="flex flex-col gap-4">
        <h3 className="text-xl font-bold text-foreground">Say Hello</h3>
        <p className="text-muted-foreground text-sm">
          Just want to connect? We&apos;re happy to hear from you. Find us on social media or send us a message.
        </p>
      </div>,
    ];

    const handleGetStarted = () => {
        router.push('/chat');
    };

    const navItems = [
      {
        name: "Features",
        link: "#features",
        dropdownContent: (
          <div className="grid grid-cols-2 gap-x-8 gap-y-6 p-8">
            {features.map((feature) => (
              <a
                key={feature.title}
                href={feature.href}
                className="group flex items-start gap-4"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-neutral-800/80 border border-neutral-700 transition-colors duration-200 group-hover:bg-blue-500/20 group-hover:border-blue-500/50">
                   <feature.icon className="h-5 w-5 text-blue-400 transition-colors duration-200 group-hover:text-blue-300" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white">{feature.title}</h3>
                  <p className="mt-1 text-sm text-neutral-400">{feature.description}</p>
                </div>
              </a>
            ))}
          </div>
        ),
      },
       {
        name: "Resources",
        link: "/resources",
        dropdownContent: (
          <div className="w-[650px] p-8">
            <div className="grid grid-cols-3 gap-x-8">
                <div className="flex flex-col gap-y-4">
                    <h3 className="text-sm font-semibold text-neutral-400">CRISIS SUPPORT</h3>
                    <a href="/resources" className="group flex items-start gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-neutral-800/80 border border-neutral-700 transition-colors duration-200 group-hover:bg-red-500/20 group-hover:border-red-500/50">
                            <LifeBuoy className="h-4 w-4 text-red-400" />
                        </div>
                        <div>
                            <h4 className="text-sm font-semibold text-white">Emergency Hotlines</h4>
                            <p className="text-xs text-neutral-400 mt-0.5">Immediate help for crisis situations.</p>
                        </div>
                    </a>
                </div>
                <div className="flex flex-col gap-y-4">
                    <h3 className="text-sm font-semibold text-neutral-400">PSYCHOEDUCATION</h3>
                    <a href="/resources" className="group flex items-start gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-neutral-800/80 border border-neutral-700 transition-colors duration-200 group-hover:bg-blue-500/20 group-hover:border-blue-500/50">
                           <Clapperboard className="h-4 w-4 text-blue-400" />
                        </div>
                        <div>
                            <h4 className="text-sm font-semibold text-white">Educational Videos</h4>
                            <p className="text-xs text-neutral-400 mt-0.5">Learn about mental wellness topics.</p>
                        </div>
                    </a>
                    <a href="/playlist" className="group flex items-start gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-neutral-800/80 border border-neutral-700 transition-colors duration-200 group-hover:bg-green-500/20 group-hover:border-green-500/50">
                           <Music className="h-4 w-4 text-green-400" />
                        </div>
                        <div>
                            <h4 className="text-sm font-semibold text-white">Relaxation Audio</h4>
                            <p className="text-xs text-neutral-400 mt-0.5">Calming sounds and guided meditations.</p>
                        </div>
                    </a>
                </div>
                <div className="flex flex-col gap-y-4">
                    <h3 className="text-sm font-semibold text-neutral-400">COMMUNITY</h3>
                    <a href="/counselor-connect" className="group flex items-start gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-neutral-800/80 border border-neutral-700 transition-colors duration-200 group-hover:bg-purple-500/20 group-hover:border-purple-500/50">
                           <HeartHandshake className="h-4 w-4 text-purple-400" />
                        </div>
                        <div>
                            <h4 className="text-sm font-semibold text-white">Counselor Connect</h4>
                            <p className="text-xs text-neutral-400 mt-0.5">Talk to licensed professionals.</p>
                        </div>
                    </a>
                </div>
            </div>
          </div>
        )
      },
      {
        name: "Privacy",
        link: "/privacy-policy",
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
        <AppleCard
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
            
            <div className="overflow-x-hidden relative">
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
                        
                        <motion.div
                            initial={{ opacity: 0, x: 100, rotate: 25 }}
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

                        <motion.div
                            initial={{ opacity: 0, x: -100, rotate: -25 }}
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

            <div className="relative overflow-x-hidden">
                <section className="bg-black px-4">
                    <div className="max-w-7xl mx-auto">
                        <Carousel items={cards} />
                    </div>
                </section>
            </div>

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

             {isMounted && <section className="py-20 md:py-32 bg-black">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-blue-400 to-purple-500 mb-4">
                            Have Feedback?
                        </h2>
                        <p className="text-lg max-w-3xl mx-auto text-gray-400">
                           We&apos;d love to hear from you. Swipe through the cards to let us know what you think.
                        </p>
                    </div>
                    <TinderCards cards={contactCards} />
                </div>
            </section>}

            <footer className="py-8 bg-black border-t border-white/10">
                <div className="container mx-auto flex max-w-7xl flex-col items-start justify-between text-sm text-neutral-500 sm:flex-row p-6">
                    <div>
                        <div className="mr-4 mb-4 md:flex">
                        <a className="flex items-center justify-center space-x-2 text-2xl font-bold text-center text-neutral-600 dark:text-gray-100 selection:bg-emerald-500 mr-10 py-0" href="/">
                            <div className="relative h-8 w-8 md:h-6 md:w-6 bg-card border border-border text-primary flex items-center justify-center rounded-md text-sm antialiased">
                            <div className="absolute h-10 w-full bg-primary/20 -top-10 inset-x-0 rounded-full blur-xl"></div>
                            <div className="text-sm text-primary relative z-20">
                                <MessageSquare className="h-4 w-4" />
                            </div>
                            </div>
                            <div className="flex flex-col">
                            <h1 className="text-black dark:text-white font-sans text-lg">AuraMind</h1>
                            </div>
                        </a>
                        </div>
                        <div className="max-w-xs">AuraMind is your personal AI companion for self-discovery. Explore tools designed to bring you calm, clarity, and strength on your mental wellness journey.</div>
                    </div>
                    <div className="mt-10 grid grid-cols-2 md:grid-cols-3 items-start gap-10 md:mt-0">
                        <div className="mt-4 flex flex-col justify-center space-y-4">
                        <span className="font-semibold text-foreground">Features</span>
                        <a className="hover:text-foreground/80 text-foreground/60 transition-colors" href="/chat">Chatbot</a>
                        <a className="hover:text-foreground/80 text-foreground/60 transition-colors" href="/consultant">AI Consultant</a>
                        <a className="hover:text-foreground/80 text-foreground/60 transition-colors" href="/counselor-connect">Counselor Connect</a>
                        <a className="hover:text-foreground/80 text-foreground/60 transition-colors" href="/calm">Calm Room</a>
                        <a className="hover:text-foreground/80 text-foreground/60 transition-colors" href="/playlist">Playlist</a>
                        </div>
                        <div className="mt-4 flex flex-col justify-center space-y-4">
                        <span className="font-semibold text-foreground">Legal</span>
                        <a className="hover:text-foreground/80 text-foreground/60 transition-colors" href="/privacy-policy">Privacy Policy</a>
                        <a className="hover:text-foreground/80 text-foreground/60 transition-colors" href="/terms-of-service">Terms of Service</a>
                        </div>
                        <div className="mt-4 flex flex-col justify-center space-y-4">
                        <span className="font-semibold text-foreground">Social</span>
                        <a target="__blank" className="hover:text-foreground/80 text-foreground/60 transition-colors" href="https://github.com/firebase/studio-extra-sessions/tree/main/AuraMind">GitHub</a>
                        <a target="__blank" className="hover:text-foreground/80 text-foreground/60 transition-colors" href="#">LinkedIn</a>
                        </div>
                    </div>
                </div>
                <div className="container text-center text-muted-foreground text-sm border-t border-white/10 pt-4">© {new Date().getFullYear()} AuraMind. All rights reserved.</div>
            </footer>
            <audio ref={audioRef} onEnded={() => setPlayingAudio(null)} />
        </div>
    );

}

    