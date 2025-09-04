
'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import Script from 'next/script';

// Extend the JSX namespace to include A-Frame elements
declare global {
    namespace JSX {
        interface IntrinsicElements {
            'a-scene': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & { class?: string, embedded?: boolean, 'vr-mode-ui'?: string };
            'a-sky': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & { src: string; rotation?: string };
            'a-camera': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & { 'wasd-controls-enabled'?: string };
            'a-entity': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & { sound?: string };
        }
    }
}

const scenes = {
    forest: {
        image: 'https://cdn.glitch.com/20600112-c54b-492c-986b-342d7bf4a04d%2Fforest.jpg?v=1616524472314',
        sound: '/sounds/forest.mp3',
        label: 'Forest',
        emoji: '🌲'
    },
    beach: {
        image: 'https://cdn.glitch.com/20600112-c54b-492c-986b-342d7bf4a04d%2Fbeach.jpg?v=1616524467384',
        sound: '/sounds/beach.mp3',
        label: 'Beach',
        emoji: '🏖️'
    },
    waterfall: {
        image: 'https://cdn.glitch.global/20600112-c54b-492c-986b-342d7bf4a04d/waterfall.jpg?v=161652448 waterfall.jpg',
        sound: '/sounds/waterfall.mp3',
        label: 'Waterfall',
        emoji: '💧'
    },
};

const BreathingGuide = () => (
    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center z-50">
        <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', repeatDelay: 10 }}
            className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-full border border-white/20 shadow-lg"
        />
        <div className="absolute inset-0 flex items-center justify-center text-white font-semibold text-center pointer-events-none">
            <AnimatePresence>
                 <motion.p
                    key="inhale-text"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1, delay: 0 }}
                    style={{ animation: 'text-fade-in-out 18s infinite 0s' }}
                    className="absolute text-shadow-md"
                >
                    Inhale
                </motion.p>
                <motion.p
                    key="hold-text"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1, delay: 4.5 }}
                     style={{ animation: 'text-fade-in-out 18s infinite 4.5s' }}
                    className="absolute text-shadow-md"
                >
                    Hold
                </motion.p>
                <motion.p
                    key="exhale-text"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1, delay: 10.5 }}
                     style={{ animation: 'text-fade-in-out 18s infinite 10.5s' }}
                    className="absolute text-shadow-md"
                >
                    Exhale
                </motion.p>
            </AnimatePresence>
        </div>
         <style jsx>{`
            @keyframes text-fade-in-out {
                0% { opacity: 0; }
                5% { opacity: 1; }
                22% { opacity: 1; } /* Visible for ~4s */
                27% { opacity: 0; }
                100% { opacity: 0; }
            }
            .text-shadow-md {
                text-shadow: 0 2px 4px rgba(0,0,0,0.5);
            }
        `}</style>
    </div>
);


export default function CalmRoomPage() {
    const [currentScene, setCurrentScene] = useState<keyof typeof scenes>('forest');
    const [isAFrameReady, setIsAFrameReady] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        if (audioRef.current && isAFrameReady) {
            audioRef.current.src = scenes[currentScene].sound;
            audioRef.current.loop = true;
            audioRef.current.play().catch(error => console.log("Audio autoplay was prevented:", error));
        }
    }, [currentScene, isAFrameReady]);

    const handleSceneChange = (scene: keyof typeof scenes) => {
        setCurrentScene(scene);
    };
    
    return (
        <div className="relative w-full h-screen bg-gray-950 overflow-hidden" suppressHydrationWarning>
            {/* Animated Gradient Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-tr from-gray-900 via-gray-950 to-blue-900/40 animate-[spin_30s_linear_infinite_reverse]" />
                <div className="absolute inset-0 bg-gradient-to-bl from-gray-900 via-gray-950 to-purple-900/30 animate-[spin_40s_linear_infinite]" />
            </div>

            <Script src="https://aframe.io/releases/1.5.0/aframe.min.js" onReady={() => setIsAFrameReady(true)} />
            
            <AnimatePresence>
                {isAFrameReady && (
                    <motion.div
                        key={currentScene}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.5 }}
                        className="absolute inset-0 z-10"
                    >
                        <a-scene embedded vr-mode-ui="enabled: false" class="w-full h-full">
                            <a-sky src={scenes[currentScene].image} rotation="0 -130 0" />
                            <a-camera wasd-controls-enabled="false" />
                        </a-scene>
                    </motion.div>
                )}
            </AnimatePresence>

             {!isAFrameReady && (
                <div className="w-full h-full flex items-center justify-center text-white z-20 relative">
                    <div className="flex flex-col items-center gap-2">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                            className="w-16 h-16 border-4 border-t-transparent border-blue-400 rounded-full"
                        />
                        <p className="mt-4 text-lg font-semibold tracking-wider">Loading Serenity...</p>
                    </div>
                </div>
             )}

            <div className="absolute top-5 left-1/2 -translate-x-1/2 z-50 flex gap-4 p-2 bg-black/30 backdrop-blur-md rounded-full border border-white/10">
                {(Object.keys(scenes) as Array<keyof typeof scenes>).map((sceneKey) => (
                    <Button
                        key={sceneKey}
                        onClick={() => handleSceneChange(sceneKey)}
                        variant={currentScene === sceneKey ? 'default' : 'ghost'}
                        className={`rounded-full transition-all text-white ${currentScene === sceneKey ? 'bg-blue-600 hover:bg-blue-700' : 'hover:bg-white/10'}`}
                    >
                        {scenes[sceneKey].emoji} {scenes[sceneKey].label}
                    </Button>
                ))}
            </div>

            <BreathingGuide />
            
            <audio ref={audioRef} preload="auto" />
        </div>
    );
}
