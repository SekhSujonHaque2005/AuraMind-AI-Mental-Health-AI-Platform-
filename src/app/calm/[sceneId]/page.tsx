
'use client';

import { useEffect, useRef, useState } from 'react';
import { notFound, useRouter } from 'next/navigation';
import { scenes, Scene } from '@/app/calm/scenes';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import Script from 'next/script';
import { Home } from 'lucide-react';

// Extend the JSX namespace to include A-Frame elements
declare global {
    namespace JSX {
        interface IntrinsicElements {
            'a-scene': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & { class?: string, embedded?: boolean, 'vr-mode-ui'?: string };
            'a-sky': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & { src: string; rotation?: string };
            'a-camera': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & { 'wasd-controls-enabled'?: string };
            'a-entity': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & { sound?: string, position?: string, geometry?: string, material?: string, text?: string, scale?: string, animation?: string, animation__scale?: string, animation__color?: string, animation__opacity?: string };
            'a-sphere': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & { position?: string, radius?: string, color?: string, shadow?: string };
            'a-text': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & { value?: string, align?: string, color?: string, width?: string, position?: string };
            'a-animation': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & { attribute: string; from: string; to: string; dur?: string; repeat?: string; direction?: string; easing?: string; delay?: string };
        }
    }
}

const BreathingGuide = () => (
    <a-entity position="0 1 -4">
        {/* Pulsating Sphere */}
        <a-sphere
            position="0 0 0"
            radius="0.5"
            color="#ADD8E6"
            shadow
        >
            <a-animation
                attribute="scale"
                dur="4000"
                from="1 1 1"
                to="1.5 1.5 1.5"
                direction="alternate"
                repeat="indefinite"
                easing="ease-in-out"
            ></a-animation>
             <a-animation
                attribute="material.color"
                dur="4000"
                from="#ADD8E6"
                to="#E6E6FA"
                direction="alternate"
                repeat="indefinite"
            ></a-animation>
        </a-sphere>

        {/* Text Labels */}
        <a-text
            value="Inhale"
            position="0 0.8 0"
            align="center"
            color="#FFFFFF"
            width="4"
        >
             <a-animation attribute="opacity" from="1" to="0" delay="3000" dur="1000" repeat="indefinite" direction="alternate"></a-animation>
        </a-text>
         <a-text
            value="Exhale"
            position="0 -0.8 0"
            align="center"
            color="#FFFFFF"
            width="4"
        >
            <a-animation attribute="opacity" from="0" to="1" delay="3000" dur="1000" repeat="indefinite" direction="alternate"></a-animation>
        </a-text>
    </a-entity>
);


export default function SceneViewerPage({ params }: { params: { sceneId: string } }) {
    const router = useRouter();
    const { sceneId } = params;
    const [scene, setScene] = useState<Scene | null>(null);
    const [isAFrameReady, setIsAFrameReady] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        const selectedScene = scenes.find(s => s.id === sceneId);
        if (selectedScene) {
            setScene(selectedScene);
        } else {
            notFound();
        }
    }, [sceneId]);

    useEffect(() => {
        if (audioRef.current && isAFrameReady && scene) {
            audioRef.current.src = scene.sound;
            audioRef.current.loop = true;
            audioRef.current.play().catch(error => console.log("Audio autoplay was prevented:", error));
        }
    }, [scene, isAFrameReady]);

    if (!scene) {
        return null; // Or a loading state
    }
    
    return (
        <div className="relative w-full h-screen bg-gray-950 overflow-hidden" suppressHydrationWarning>
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-tr from-gray-900 via-gray-950 to-blue-900/40 animate-[spin_30s_linear_infinite_reverse]" />
                <div className="absolute inset-0 bg-gradient-to-bl from-gray-900 via-gray-950 to-purple-900/30 animate-[spin_40s_linear_infinite]" />
            </div>

            <Script src="https://aframe.io/releases/1.5.0/aframe.min.js" onReady={() => setIsAFrameReady(true)} />
            
            <AnimatePresence>
                {isAFrameReady && (
                     <motion.div
                        key={scene.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.5 }}
                        className="absolute inset-0 z-10"
                    >
                        <a-scene embedded vr-mode-ui="enabled: false" class="w-full h-full">
                            <a-sky src={scene.image} rotation="0 -130 0" />
                            <a-camera wasd-controls-enabled="false" />
                            <BreathingGuide />
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

            <div className="absolute top-5 left-5 z-50">
                <Button
                    onClick={() => router.push('/calm')}
                    variant="ghost"
                    className="rounded-full text-white bg-black/30 backdrop-blur-md border border-white/10 hover:bg-white/10"
                >
                    <Home className="mr-2 h-5 w-5" /> Back to Scenes
                </Button>
            </div>
            
            <div className="absolute top-5 right-5 z-50">
                 <Button
                    onClick={() => {
                        const sceneEl = document.querySelector('a-scene');
                        if (sceneEl?.requestFullscreen) sceneEl.requestFullscreen();
                        else if (sceneEl?.mozRequestFullScreen) sceneEl.mozRequestFullScreen();
                        else if (sceneEl?.webkitRequestFullscreen) sceneEl.webkitRequestFullscreen();
                    }}
                     variant="ghost"
                    className="rounded-full text-white bg-black/30 backdrop-blur-md border border-white/10 hover:bg-white/10"
                >
                    Enter Fullscreen
                </Button>
            </div>
            
            <audio ref={audioRef} preload="auto" />
        </div>
    );
}
