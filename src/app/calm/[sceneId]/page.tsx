
'use client';

import React, { useEffect, useRef, useState } from 'react';
import { notFound, useRouter, useParams } from 'next/navigation';
import { scenes, Scene } from '@/app/calm/scenes';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import Script from 'next/script';
import { Home, Sun, Headphones, Maximize } from 'lucide-react';

// Extend the JSX namespace to include A-Frame elements
declare global {
    namespace JSX {
        interface IntrinsicElements {
            'a-scene': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & { class?: string, embedded?: boolean, 'vr-mode-ui'?: string };
            'a-sky': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & { src: string; rotation?: string, animation?: string };
            'a-camera': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & { 'wasd-controls-enabled'?: string };
            'a-entity': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & { sound?: string, position?: string, geometry?: string, material?: string, text?: string, scale?: string, animation?: string, animation__scale?: string, animation__color?: string, animation__opacity?: string, 'phase-text'?: string };
            'a-sphere': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & { position?: string, radius?: string, color?: string, shadow?: string, animation?:string, 'animation__inhale'?:string, 'animation__hold'?:string, 'animation__exhale'?:string, 'animation__pause'?:string, 'animation__color-inhale'?:string, 'animation__color-exhale'?:string };
            'a-text': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & { value?: string, align?: string, color?: string, width?: string, position?: string, 'animation__show'?: string, font?: string };
        }
    }
}

const BreathingGuide = ({ timer, phase }: { timer: number; phase: string }) => (
    <a-entity position="0 1.2 -4">
        {/* Pulsating Sphere */}
        <a-sphere
            position="0 0 0"
            radius="0.5"
            color="#ADD8E6"
            shadow
            animation__inhale="property: scale; from: 1 1 1; to: 1.5 1.5 1.5; dur: 4000; easing: easeInOutQuad; startEvents: start-inhale"
            animation__hold="property: scale; from: 1.5 1.5 1.5; to: 1.5 1.5 1.5; dur: 2000; startEvents: start-hold"
            animation__exhale="property: scale; from: 1.5 1.5 1.5; to: 1 1 1; dur: 5000; easing: easeInOutQuad; startEvents: start-exhale"
            animation__pause="property: scale; from: 1 1 1; to: 1 1 1; dur: 1000; startEvents: start-pause"
            animation__color-inhale="property: material.color; from: #ADD8E6; to: #E6E6FA; dur: 4000; easing: easeInOutQuad; startEvents: start-inhale"
            animation__color-exhale="property: material.color; from: #E6E6FA; to: #ADD8E6; dur: 5000; easing: easeInOutQuad; startEvents: start-exhale"
        >
        </a-sphere>

        {/* Phase Text Label */}
        <a-text
            value={phase}
            position="0 1 0"
            align="center"
            color="#FFFFFF"
            width="6"
            animation__show="property: opacity; from: 0; to: 1; dur: 500; easing: easeInQuad; startEvents: phase-change"
            phase-text
        >
        </a-text>

        {/* Countdown Timer */}
        <a-text
            value={timer.toString()}
            position="0 0 0.6"
            align="center"
            color="#FFFFFF"
            width="8"
            font="kelsonsans"
        >
        </a-text>

    </a-entity>
);


export default function SceneViewerPage() {
    const router = useRouter();
    const params = useParams();
    const [scene, setScene] = useState<Scene | null>(null);
    const [isAFrameReady, setIsAFrameReady] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [phase, setPhase] = useState('Inhale');
    const [timer, setTimer] = useState(4);
    const cycleTimeoutRef = useRef<NodeJS.Timeout>();
    const countdownIntervalRef = useRef<NodeJS.Timeout>();


    useEffect(() => {
        const sceneId = params.sceneId;
        const selectedScene = scenes.find(s => s.id === sceneId);
        if (selectedScene) {
            setScene(selectedScene);
        } else {
            notFound();
        }
    }, [params]);

    useEffect(() => {
        const audioEl = audioRef.current;
        if (audioEl && scene) {
            audioEl.src = scene.sound;
            audioEl.loop = true;
            // The user navigating to this page is the interaction.
            // We'll attempt to play, and catch errors if the browser is particularly strict.
            audioEl.play().catch(error => {
                console.log("Audio autoplay was prevented. The user may need to interact with the page again.", error);
            });
        }
        
        // Cleanup function to pause audio when the component unmounts or scene changes
        return () => {
            if (audioEl) {
                audioEl.pause();
                audioEl.currentTime = 0;
            }
        };
    }, [scene]);
    
    useEffect(() => {
        if (!isAFrameReady) return;

        const phases = [
            { name: 'Inhale', duration: 4000, event: 'start-inhale' },
            { name: 'Hold', duration: 2000, event: 'start-hold' },
            { name: 'Exhale', duration: 5000, event: 'start-exhale' },
            { name: 'Pause', duration: 1000, event: 'start-pause' }
        ];

        let currentPhaseIndex = 0;

        const runCycle = () => {
            const sphere = document.querySelector('a-sphere');
            const phaseTextEl = document.querySelector('[phase-text]');
            if (!sphere || !phaseTextEl) return;

            const currentPhase = phases[currentPhaseIndex];
            setPhase(currentPhase.name);
            setTimer(currentPhase.duration / 1000);
            
            sphere.emit(currentPhase.event);
            phaseTextEl.emit('phase-change');

            let countdown = currentPhase.duration / 1000;
            if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
            countdownIntervalRef.current = setInterval(() => {
                countdown--;
                if (countdown >= 1) {
                    setTimer(countdown);
                } else {
                    clearInterval(countdownIntervalRef.current);
                }
            }, 1000);

            if (cycleTimeoutRef.current) clearTimeout(cycleTimeoutRef.current);
            cycleTimeoutRef.current = setTimeout(() => {
                currentPhaseIndex = (currentPhaseIndex + 1) % phases.length;
                runCycle();
            }, currentPhase.duration);
        };
        
        runCycle();

        return () => {
            if (cycleTimeoutRef.current) clearTimeout(cycleTimeoutRef.current);
            if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
        };
    }, [isAFrameReady]);


    if (!scene) {
        return null; // Or a loading state
    }
    
    return (
        <div className="relative w-full h-screen bg-background overflow-hidden" suppressHydrationWarning>
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-tr from-gray-900 via-background to-blue-900/40 animate-[spin_30s_linear_infinite_reverse]" />
                <div className="absolute inset-0 bg-gradient-to-bl from-gray-900 via-background to-purple-900/30 animate-[spin_40s_linear_infinite]" />
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
                            <a-sky 
                                src={scene.image} 
                                rotation="0 -130 0"
                                animation="property: rotation; to: 0 230 0; dur: 120000; easing: linear; loop: true"
                            >
                            </a-sky>
                            <a-camera wasd-controls-enabled="false" />
                            <BreathingGuide timer={timer} phase={phase} />
                        </a-scene>
                    </motion.div>
                )}
            </AnimatePresence>

             {!isAFrameReady && (
                <div className="w-full h-full flex items-center justify-center text-white z-20 relative">
                    <div className="flex flex-col items-center gap-8 text-center">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                            className="w-16 h-16 border-4 border-t-transparent border-blue-400 rounded-full"
                        />
                        <p className="text-xl font-semibold tracking-wider">Loading Serenity...</p>
                        <div className="flex flex-col gap-4 text-gray-300">
                             <motion.p 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.5 }}
                                className="flex items-center gap-3 bg-black/20 p-3 rounded-lg border border-white/10"
                             >
                                <Sun className="h-5 w-5 text-yellow-300" /> For the best experience, increase screen brightness.
                             </motion.p>
                             <motion.p 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.8 }}
                                className="flex items-center gap-3 bg-black/20 p-3 rounded-lg border border-white/10"
                            >
                                <Headphones className="h-5 w-5 text-blue-300" /> Put on headphones to immerse yourself.
                             </motion.p>
                        </div>
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
                    <Maximize className="mr-2 h-5 w-5" />
                    Enter Fullscreen
                </Button>
            </div>
            
            <audio ref={audioRef} preload="auto" />
        </div>
    );
}

    