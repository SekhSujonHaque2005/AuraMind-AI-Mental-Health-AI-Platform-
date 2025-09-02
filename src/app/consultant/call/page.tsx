
'use client';

import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Video, VideoOff, PhoneOff } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { textToSpeech } from '@/app/consultant/actions';
import { getAIResponse } from '@/app/actions';
import type { Message } from '@/contexts/ChatContext';
import { personas } from '@/app/consultant/personas';

// Add SpeechRecognition types for browsers that support it
declare global {
    interface Window {
        SpeechRecognition: any;
        webkitSpeechRecognition: any;
    }
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
      // Cleanup on component unmount
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, [toast]);
  
  useEffect(() => {
    const startGreeting = async () => {
      if (hasPermission && isGreeting && selectedPersona) {
        try {
            setIsSpeaking(true);
            const greetingText = selectedPersona.greeting;
            const voice = selectedPersona.voice;
            
            conversationHistory.current.push({ id: Date.now(), sender: 'bot', text: greetingText });

            const audioResult = await textToSpeech(greetingText, voice);
            if (audioResult?.media) {
              const audio = new Audio(audioResult.media);
              audio.play();
              audio.onended = () => {
                setIsSpeaking(false);
                setIsGreeting(false);
              };
            } else {
              throw new Error("TTS greeting failed to generate audio.");
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
      }
    };

    // If there's no selected persona, wait a bit for it to be available
    if (!selectedPersona) {
      setTimeout(startGreeting, 100);
    } else {
      startGreeting();
    }
  }, [hasPermission, isGreeting, selectedPersona, toast]);

  useEffect(() => {
    if (!hasPermission || isSpeaking || isGreeting || !selectedPersona) {
        if(recognitionRef.current && isListening) {
            recognitionRef.current.stop();
        }
        return;
    };

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      toast({
        variant: 'destructive',
        title: 'Browser Not Supported',
        description: 'Your browser does not support Speech Recognition. Please try Chrome or Safari.',
      });
      return;
    }
    
    if (!recognitionRef.current) {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = false;
        recognition.lang = 'en-US';
        recognitionRef.current = recognition;

        recognition.onresult = async (event: any) => {
            const last = event.results.length - 1;
            const transcript = event.results[last][0].transcript.trim();

            if (transcript) {
                recognitionRef.current.stop();
                setIsSpeaking(true);
                
                conversationHistory.current.push({ id: Date.now(), sender: 'user', text: transcript });
                
                const aiResult = await getAIResponse({
                    message: transcript,
                    conversationHistory: conversationHistory.current.slice(0, -1).map(m => ({sender: m.sender, text: m.text})),
                });

                if (aiResult.error) {
                    toast({ variant: 'destructive', title: 'Error', description: aiResult.error });
                    setIsSpeaking(false); 
                } else if (aiResult.response) {
                    conversationHistory.current.push({ id: Date.now() + 1, sender: 'bot', text: aiResult.response });
                    try {
                        const audioResult = await textToSpeech(aiResult.response, selectedPersona.voice);
                        if (audioResult?.media) {
                            const audio = new Audio(audioResult.media);
                            audio.play();
                            audio.onended = () => {
                               setIsSpeaking(false);
                            };
                        } else {
                           throw new Error("TTS response failed to generate audio.");
                        }
                    } catch(error) {
                        console.error("Error during response TTS:", error);
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
            }
        };
        
        recognition.onstart = () => {
            setIsListening(true);
        };

        recognition.onend = () => {
            setIsListening(false);
        };

        recognition.onerror = (event: any) => {
            setIsListening(false);
            if (event.error !== 'no-speech' && event.error !== 'aborted') {
              console.error('Speech recognition error:', event.error);
            }
        };
    }

    if (!isListening) {
        try {
            recognitionRef.current.start();
        } catch(e) {
            if (!(e instanceof DOMException && e.name === 'InvalidStateError')) {
              console.warn('Speech recognition could not be started: ', e);
            }
        }
    }

  }, [hasPermission, isSpeaking, isGreeting, isListening, toast, selectedPersona]);

  const toggleMute = () => {
    if (streamRef.current) {
      streamRef.current.getAudioTracks().forEach(track => {
        track.enabled = !track.enabled;
      });
      setIsMuted(prev => !prev);
    }
  };

  const toggleCamera = () => {
    if (streamRef.current) {
      streamRef.current.getVideoTracks().forEach(track => {
        track.enabled = !track.enabled;
      });
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
    toast({
      title: 'Call Ended',
      description: 'Your session has ended.',
    });
    router.push('/consultant');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-950 p-4 text-white">
        <Card className="w-full max-w-4xl bg-gray-900/50 border border-blue-500/20 shadow-[0_0_25px_rgba(72,149,239,0.15)]">
            <CardHeader>
                <CardTitle className="text-center text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-blue-400 to-purple-500 mb-2">
                    {selectedPersona?.name || 'AI Wellness Session'}
                </CardTitle>
                 <div className="text-center text-gray-400 text-lg animate-pulse h-6">
                    {isListening && "Listening..."}
                    {isSpeaking && !isGreeting && "AI is speaking..."}
                    {isGreeting && "Connecting..."}
                    {!isListening && !isSpeaking && hasPermission && !isGreeting && "Ready to talk"}
                </div>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Remote Video (AI) */}
                    <div className="relative aspect-video bg-gray-800 rounded-lg flex items-center justify-center overflow-hidden">
                        <video 
                            src="https://cdn.pixabay.com/video/2024/04/11/206925_large.mp4" 
                            autoPlay 
                            loop 
                            muted 
                            playsInline
                            className="w-full h-full object-cover"
                        ></video>
                         <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                         <p className="absolute bottom-3 left-3 text-sm font-semibold bg-black/50 px-2 py-1 rounded-md">{selectedPersona?.name || 'AI Consultant'}</p>
                    </div>

                    {/* Local Video (User) */}
                    <div className="relative aspect-video bg-gray-800 rounded-lg flex items-center justify-center">
                         <video ref={localVideoRef} autoPlay playsInline muted className="w-full h-full object-cover rounded-lg" />
                         {!hasPermission && <p className="text-gray-400 absolute">Waiting for camera...</p>}
                         {isCameraOff && <div className="absolute inset-0 bg-black/60 flex items-center justify-center rounded-lg"><VideoOff className="h-12 w-12 text-white" /></div>}
                         <p className="absolute bottom-3 left-3 text-sm font-semibold bg-black/50 px-2 py-1 rounded-md">You</p>
                    </div>
                </div>

                <div className="flex justify-center gap-4 mt-8">
                    <Button onClick={toggleMute} variant="outline" size="icon" className="bg-gray-800/80 border-blue-500/20 hover:bg-blue-500/20 rounded-full w-14 h-14" disabled={!hasPermission}>
                        {isMuted ? <MicOff className="h-6 w-6 text-red-500" /> : <Mic className="h-6 w-6" />}
                    </Button>
                     <Button onClick={toggleCamera} variant="outline" size="icon" className="bg-gray-800/80 border-blue-500/20 hover:bg-blue-500/20 rounded-full w-14 h-14" disabled={!hasPermission}>
                        {isCameraOff ? <VideoOff className="h-6 w-6 text-red-500" /> : <Video className="h-6 w-6" />}
                    </Button>
                    <Button onClick={endCall} variant="destructive" size="icon" className="rounded-full w-14 h-14">
                        <PhoneOff className="h-6 w-6" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    </div>
  );
}
