
'use client';

import 'aframe';
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import Script from 'next/script';

// Extend the JSX namespace to include A-Frame elements
declare global {
    namespace JSX {
        interface IntrinsicElements {
            'a-scene': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & { class?: string };
            'a-sky': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & { src: string; rotation?: string };
            'a-camera': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & { 'wasd-controls-enabled'?: string };
            'a-entity': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & { sound?: string };
        }
    }
}

const scenes = {
    forest: {
        image: '/calm-room/forest.jpg',
        sound: '/calm-room/forest.mp3',
        label: 'Forest',
        emoji: '🌲'
    },
    beach: {
        image: '/calm-room/beach.jpg',
        sound: '/calm-room/beach.mp3',
        label: 'Beach',
        emoji: '🏖️'
    },
    waterfall: {
        image: '/calm-room/waterfall.jpg',
        sound: '/calm-room/waterfall.mp3',
        label: 'Waterfall',
        emoji: '💧'
    },
};

const BreathingGuide = () => (
    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center z-20">
        <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 19, repeat: Infinity, ease: 'easeInOut' }}
            className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-full"
        />
        <div className="absolute inset-0 flex items-center justify-center text-white font-semibold text-center">
            <AnimatePresence>
                <motion.div
                    key="inhale"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { delay: 0.5, duration: 1 } }}
                    exit={{ opacity: 0, transition: { duration: 1 } }}
                    className="absolute"
                    style={{ animation: 'fade 19s infinite' }}
                >
                    Inhale (4s)
                </motion.div>
                <motion.div
                    key="hold"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { delay: 5.5, duration: 1 } }}
                    exit={{ opacity: 0, transition: { duration: 1 } }}
                    className="absolute"
                    style={{ animation: 'fade 19s infinite', animationDelay: '5s' }}
                >
                    Hold (7s)
                </motion.div>
                <motion.div
                    key="exhale"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { delay: 13.5, duration: 1 } }}
                    exit={{ opacity: 0, transition: { duration: 1 } }}
                    className="absolute"
                    style={{ animation: 'fade 19s infinite', animationDelay: '12s' }}
                >
                    Exhale (8s)
                </motion.div>
            </AnimatePresence>
        </div>
        <style jsx>{`
            @keyframes fade {
                0% { opacity: 0; }
                10% { opacity: 1; } /* Fade in */
                21% { opacity: 1; } /* Inhale (4s) */
                31% { opacity: 0; } /* Fade out */
                32%, 100% { opacity: 0; }
            }
        `}</style>
    </div>
);


export default function CalmRoomPage() {
    const [currentScene, setCurrentScene] = useState<keyof typeof scenes>('forest');
    const [isAFrameReady, setIsAFrameReady] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.src = scenes[currentScene].sound;
            audioRef.current.loop = true;
            audioRef.current.play().catch(error => console.log("Audio autoplay was prevented:", error));
        }
    }, [currentScene]);

    const handleSceneChange = (scene: keyof typeof scenes) => {
        setCurrentScene(scene);
    };
    
    // A-Frame's components are not standard HTML, so we need to suppress hydration warnings.
    // We also use a key on the a-scene to force a re-render when the scene changes.
    return (
        <div className="relative w-full h-screen" suppressHydrationWarning>
            <Script src="https://aframe.io/releases/1.5.0/aframe.min.js" onReady={() => setIsAFrameReady(true)} />
            
            <AnimatePresence>
                {isAFrameReady ? (
                    <motion.div
                        key={currentScene}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.5 }}
                        className="absolute inset-0"
                    >
                        <a-scene embedded vr-mode-ui="enabled: false" class="w-full h-full">
                            <a-sky src={scenes[currentScene].image} rotation="0 -130 0" />
                            <a-camera wasd-controls-enabled="false" />
                        </a-scene>
                    </motion.div>
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-black text-white">Loading Scene...</div>
                )}
            </AnimatePresence>

            <div className="absolute top-5 left-1/2 -translate-x-1/2 z-10 flex gap-4 p-2 bg-black/30 backdrop-blur-md rounded-full border border-white/10">
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
            
            {/* We manage the audio with a standard HTML audio tag for better control */}
            <audio ref={audioRef} preload="auto" />
        </div>
    );
}