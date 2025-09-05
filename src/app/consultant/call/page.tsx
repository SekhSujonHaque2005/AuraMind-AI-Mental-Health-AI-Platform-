
'use client';

import { useSearchParams } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Video, VideoOff, PhoneOff, Ear } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { textToSpeech } from '@/app/consultant/actions';
import { getAIResponse } from '@/app/actions';
import type { Message } from '@/contexts/ChatContext';
import { personas } from '@/app/consultant/personas';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

// Add SpeechRecognition types for browsers that support it
declare global {
    interface Window {
        SpeechRecognition: any;
        webkitSpeechRecognition: any;
    }
}

const StatusIndicator = ({ status }: { status: 'listening' | 'speaking' | 'greeting' | 'idle' | 'denied' }) => {
    const texts = {
        listening: 'Listening...',
        speaking: 'Consultant is speaking...',
        greeting: 'Connecting...',
        idle: 'Ready when you are',
        denied: 'Permissions needed'
    };

    const speakingVariants = {
      animate: {
        y: [0, -5, 0, 5, 0],
        transition: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' },
      },
    };

    return (
        <div className="flex items-center justify-center space-x-3 h-8">
            <AnimatePresence mode="wait">
                <motion.div
                    key={status}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center justify-center space-x-3"
                >
                    {status === 'speaking' && (
                        <div className="flex space-x-1 items-end h-6">
                            <motion.div className="w-1 bg-blue-400 rounded-full" variants={speakingVariants} animate={{...speakingVariants.animate, height: [4, 16, 4, 12, 4]}} />
                            <motion.div className="w-1 bg-blue-400 rounded-full" variants={speakingVariants} animate={{...speakingVariants.animate, height: [8, 24, 6, 18, 8]}} />
                            <motion.div className="w-1 bg-blue-400 rounded-full" variants={speakingVariants} animate={{...speakingVariants.animate, height: [4, 16, 4, 12, 4]}} />
                        </div>
                    )}
                     {status === 'listening' && <Ear className="w-6 h-6 text-blue-400 animate-pulse" />}
                    <p className="text-gray-300 text-lg">{texts[status]}</p>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}

export default function CallPage() {
  const searchParams = useSearchParams();
  const personaId = searchParams.get('persona');
  const router = useRouter();
  const { toast } = useToast();

  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isGreeting, setIsGreeting] = useState(true);

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const recognitionRef = useRef<any>(null);
  const conversationHistory = useRef<Message[]>([]);
  
  const selectedPersona = personas.find(p => p.id === personaId);

  useEffect(() => {
    const getPermissionsAndStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
        streamRef.current = stream;
        setHasPermission(true);
      } catch (error) {
        console.error('Error accessing media devices.', error);
        toast({
            variant: 'destructive',
            title: 'Permissions Denied',
            description: 'Camera and microphone access are required for the video call.',
        });
        setHasPermission(false);
      }
    };
    
    getPermissionsAndStream();

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, [toast]);
  
  useEffect(() => {
    if (!hasPermission || !selectedPersona || !isGreeting) return;

    const startGreeting = async () => {
        try {
            setIsSpeaking(true);
            const greetingText = selectedPersona.greeting;
            const voice = selectedPersona.voice;
            
            // Initialize conversation history with system prompt and greeting
            conversationHistory.current = [
                { id: Date.now() -1, sender: 'bot', text: selectedPersona.systemPrompt },
                { id: Date.now(), sender: 'bot', text: greetingText }
            ];

            const audioResult = await textToSpeech(greetingText, voice);
            if (audioResult?.media) {
              const audio = new Audio(audioResult.media);
              audio.play();
              audio.onended = () => {
                setIsSpeaking(false);
                setIsGreeting(false);
              };
            } else {
               toast({
                    variant: 'destructive',
                    title: 'Text-to-Speech Error',
                    description: 'Could not play the welcome message. The conversation can still continue.',
                });
                setIsSpeaking(false);
                setIsGreeting(false);
            }
        } catch (error) {
            console.error("Error during greeting TTS:", error);
            toast({
                variant: 'destructive',
                title: 'Text-to-Speech Error',
                description: 'Could not play the welcome message. The conversation can still continue.',
            });
            setIsSpeaking(false);
            setIsGreeting(false);
        }
    };
    
    startGreeting();
    
  }, [hasPermission, selectedPersona, isGreeting, toast]);

    // Effect for setting up Speech Recognition
  useEffect(() => {
    if (!hasPermission || recognitionRef.current) return;
    
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      toast({
          variant: 'destructive',
          title: 'Browser Not Supported',
          description: 'Your browser does not support Speech Recognition. Please try Chrome or Safari.',
      });
      return;
    }
    
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';
    recognitionRef.current = recognition;

    recognition.onresult = async (event: any) => {
        const last = event.results.length - 1;
        const transcript = event.results[last][0].transcript.trim();

        if (transcript) {
            setIsSpeaking(true);
            
            const userMessage: Message = { id: Date.now(), sender: 'user', text: transcript };
            conversationHistory.current.push(userMessage);

            try {
                const aiResult = await getAIResponse({
                    message: transcript,
                    // Send the entire history including the system prompt
                    conversationHistory: conversationHistory.current.slice(0, -1).map(m => ({sender: m.sender, text: m.text})),
                });

                if (aiResult.error) {
                    toast({ variant: 'destructive', title: 'Error', description: aiResult.error });
                    setIsSpeaking(false);
                } else if (aiResult.response) {
                    conversationHistory.current.push({ id: Date.now() + 1, sender: 'bot', text: aiResult.response });
                    const audioResult = await textToSpeech(aiResult.response, selectedPersona!.voice);
                    if (audioResult?.media) {
                        const audio = new Audio(audioResult.media);
                        audio.play();
                        audio.onended = () => {
                           setIsSpeaking(false);
                        };
                    } else {
                       toast({
                            variant: 'destructive',
                            title: 'Text-to-Speech Error',
                            description: 'Could not play AI response. Check API limits.',
                        });
                       setIsSpeaking(false);
                    }
                } else {
                     setIsSpeaking(false);
                }
            } catch (error) {
                console.error("Error getting AI response or playing audio:", error);
                toast({ variant: 'destructive', title: 'Conversation Error', description: 'Could not process the response.' });
                setIsSpeaking(false);
            }
        }
    };
    
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = (event: any) => {
        if (event.error !== 'no-speech' && event.error !== 'aborted') {
          console.error('Speech recognition error:', event.error);
        }
        setIsListening(false);
    };

  }, [hasPermission, toast, selectedPersona]);
  
  // Effect for controlling when to start/stop listening
  useEffect(() => {
    const recognitionInstance = recognitionRef.current;
    if (!recognitionInstance) return;

    if (hasPermission && !isSpeaking && !isGreeting && !isListening) {
        try {
            recognitionInstance.start();
        } catch(e) {
            if (!(e instanceof DOMException && e.name === 'InvalidStateError')) {
              console.warn('Speech recognition could not be started: ', e);
            }
        }
    } else if (isSpeaking || isListening) {
        // Use abort() to safely stop recognition if it's running
        recognitionInstance.abort();
    }
  }, [hasPermission, isSpeaking, isGreeting, isListening]);


  const toggleMute = () => {
    if (streamRef.current) {
      streamRef.current.getAudioTracks().forEach(track => { track.enabled = !track.enabled; });
      setIsMuted(prev => !prev);
    }
  };

  const toggleCamera = () => {
    if (streamRef.current) {
      streamRef.current.getVideoTracks().forEach(track => { track.enabled = !track.enabled; });
      setIsCameraOff(prev => !prev);
    }
  };

  const endCall = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
     if (recognitionRef.current) {
      recognitionRef.current.abort();
      recognitionRef.current = null;
    }
    if (localVideoRef.current) {
      localVideoRef.current.srcObject = null;
    }
    setHasPermission(false);
    toast({ title: 'Call Ended', description: 'Thank you for talking. Please provide your feedback.' });
    router.push('/consultant/feedback');
  };

  const avatarVariants = {
    speaking: {
      scale: 1.05,
      transition: { duration: 0.8, repeat: Infinity, repeatType: 'reverse' as const, ease: 'easeInOut' },
    },
    silent: { scale: 1, transition: { duration: 1.5, ease: 'easeInOut' } },
  };

  const getStatus = (): 'listening' | 'speaking' | 'greeting' | 'idle' | 'denied' => {
      if (!hasPermission) return 'denied';
      if (isGreeting) return 'greeting';
      if (isSpeaking) return 'speaking';
      if (isListening) return 'listening';
      return 'idle';
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4 text-white overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-tr from-gray-900 via-background to-blue-900/40 animate-[spin_20s_linear_infinite_reverse]" />
        </div>

        <Card className="w-full max-w-5xl h-[80vh] max-h-[900px] bg-black/30 backdrop-blur-xl border border-blue-500/20 shadow-[0_0_50px_rgba(72,149,239,0.15)] rounded-2xl flex flex-col relative overflow-hidden">
            {/* AI Video Feed */}
            <div className="absolute inset-0 flex items-center justify-center">
                {selectedPersona?.imageUrl && (
                    <motion.div
                        className="w-full h-full"
                        variants={avatarVariants}
                        animate={isSpeaking ? 'speaking' : 'silent'}
                    >
                        <Image 
                            src={selectedPersona.imageUrl}
                            alt={selectedPersona.name}
                            fill
                            className="object-cover w-full h-full opacity-40"
                            data-ai-hint="anime woman"
                            priority
                        />
                    </motion.div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
            </div>
            
            <CardContent className="flex flex-col h-full p-6 z-10">
                <div className="flex justify-between items-start">
                    <div>
                        <h2 className="text-2xl font-bold text-white">{selectedPersona?.name || 'AI Wellness Session'}</h2>
                        <p className="text-gray-400">{selectedPersona?.description}</p>
                    </div>
                     {/* Local Video (User) */}
                    <div className="relative w-48 h-28 bg-gray-900/50 rounded-lg flex items-center justify-center overflow-hidden border-2 border-blue-500/20 shadow-lg">
                         <video ref={localVideoRef} autoPlay playsInline muted className="w-full h-full object-cover scale-x-[-1]" />
                         {!hasPermission && <p className="text-gray-400 text-xs text-center p-2 absolute">Waiting for camera...</p>}
                         {isCameraOff && <div className="absolute inset-0 bg-black/60 flex items-center justify-center rounded-lg"><VideoOff className="h-8 w-8 text-white" /></div>}
                         <p className="absolute bottom-1 right-2 text-xs font-semibold bg-black/50 px-1.5 py-0.5 rounded">You</p>
                    </div>
                </div>

                <div className="flex-grow flex items-center justify-center">
                    {/* Could be a place for transcripts or visualizations in the future */}
                </div>
                
                <div className="flex flex-col items-center">
                    <StatusIndicator status={getStatus()} />

                    {/* Controls */}
                    <div className="flex justify-center items-center gap-4 mt-6 p-3 bg-black/30 backdrop-blur-md border border-white/10 rounded-full">
                        <Button onClick={toggleMute} variant="ghost" size="icon" className="text-white hover:bg-white/10 rounded-full w-14 h-14" disabled={!hasPermission}>
                            {isMuted ? <MicOff className="h-6 w-6 text-red-500" /> : <Mic className="h-6 w-6" />}
                        </Button>
                         <Button onClick={toggleCamera} variant="ghost" size="icon" className="text-white hover:bg-white/10 rounded-full w-14 h-14" disabled={!hasPermission}>
                            {isCameraOff ? <VideoOff className="h-6 w-6 text-red-500" /> : <Video className="h-6 w-6" />}
                        </Button>
                        <Button onClick={endCall} variant="destructive" size="icon" className="rounded-full w-16 h-16 shadow-lg">
                            <PhoneOff className="h-7 w-7" />
                        </Button>
                    </div>
                </div>

            </CardContent>
        </Card>
    </div>
  );
}
