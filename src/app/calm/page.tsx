
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
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', repeatDelay: 11 }}
            className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-full"
        />
        <div className="absolute inset-0 flex items-center justify-center text-white font-semibold text-center pointer-events-none">
            <AnimatePresence>
                 <motion.p
                    key="inhale-text"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1, delay: 0 }}
                    style={{ animation: 'text-fade 19s infinite 0s' }}
                    className="absolute"
                >
                    Inhale
                </motion.p>
                <motion.p
                    key="hold-text"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1, delay: 4.5 }}
                     style={{ animation: 'text-fade 19s infinite 4.5s' }}
                    className="absolute"
                >
                    Hold
                </motion.p>
                <motion.p
                    key="exhale-text"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1, delay: 11.5 }}
                     style={{ animation: 'text-fade 19s infinite 11.5s' }}
                    className="absolute"
                >
                    Exhale
                </motion.p>
            </AnimatePresence>
        </div>
         <style jsx>{`
            @keyframes text-fade {
                0% { opacity: 0; }
                5% { opacity: 1; }
                21% { opacity: 1; } /* Visible for ~4s */
                26% { opacity: 0; }
                100% { opacity: 0; }
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
    
    // A-Frame's components are not standard HTML, so we need to suppress hydration warnings.
    // We also use a key on the a-scene to force a re-render when the scene changes.
    return (
        <div className="relative w-full h-screen" suppressHydrationWarning>
            <Script src="https://aframe.io/releases/1.5.0/aframe.min.js" onReady={() => setIsAFrameReady(true)} />
            
            <AnimatePresence>
                {isAFrameReady && (
                    <motion.div
                        key={currentScene}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.5 }}
                        className="absolute inset-0 z-0"
                    >
                        <a-scene embedded vr-mode-ui="enabled: false" class="w-full h-full">
                            <a-sky src={scenes[currentScene].image} rotation="0 -130 0" />
                            <a-camera wasd-controls-enabled="false" />
                        </a-scene>
                    </motion.div>
                )}
            </AnimatePresence>

             {!isAFrameReady && (
                <div className="w-full h-full flex items-center justify-center bg-black text-white">Loading Scene...</div>
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
            
            {/* We manage the audio with a standard HTML audio tag for better control */}
            <audio ref={audioRef} preload="auto" />
        </div>
    );
}

