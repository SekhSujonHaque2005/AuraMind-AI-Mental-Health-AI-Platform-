
'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mic, MicOff, Video as VideoIcon, VideoOff, PhoneOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

export default function VideoCallPage() {
  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    const getCameraPermission = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setHasCameraPermission(true);

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        setHasCameraPermission(false);
        toast({
          variant: 'destructive',
          title: 'Camera Access Denied',
          description: 'Please enable camera permissions in your browser settings to use this app.',
        });
      }
    };

    getCameraPermission();

    return () => {
        // Cleanup: stop media tracks when component unmounts
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            stream.getTracks().forEach(track => track.stop());
        }
    }
  }, [toast]);

  const toggleMute = () => {
      if(videoRef.current && videoRef.current.srcObject){
          const stream = videoRef.current.srcObject as MediaStream;
          stream.getAudioTracks().forEach(track => {
              track.enabled = !track.enabled;
              setIsMuted(!track.enabled);
          });
      }
  };

  const toggleCamera = () => {
    if(videoRef.current && videoRef.current.srcObject){
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getVideoTracks().forEach(track => {
            track.enabled = !track.enabled;
            setIsCameraOff(!track.enabled);
        });
    }
  };
  
  const endCall = () => {
    if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
        videoRef.current.srcObject = null;
        setHasCameraPermission(false);
        toast({
            title: "Call Ended",
            description: "The video call has been ended.",
        });
    }
  };


  return (
    <div className="container mx-auto max-w-4xl py-12 px-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-blue-400 to-purple-500 mb-4">
          Video Call
        </h1>
        <p className="text-gray-400 text-lg">
          Connect with others face-to-face.
        </p>
      </div>
      <Card className="bg-gray-900/50 border border-blue-500/20 shadow-[0_0_15px_rgba(72,149,239,0.15)]">
        <CardHeader>
          <CardTitle className="text-blue-300">Your Video</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="relative aspect-video bg-black rounded-md overflow-hidden">
                <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted playsInline />
                {!hasCameraPermission && (
                     <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                        <div className="text-center text-white">
                            <VideoOff className="h-16 w-16 mx-auto mb-4" />
                            <p>Camera is off or not available.</p>
                        </div>
                    </div>
                )}
            </div>
             { !(hasCameraPermission) && (
                <Alert variant="destructive" className="mt-4">
                        <AlertTitle>Camera Access Required</AlertTitle>
                        <AlertDescription>
                            Please allow camera access to use this feature.
                        </AlertDescription>
                </Alert>
            )}
            <div className="flex justify-center gap-4 mt-6">
                <Button onClick={toggleMute} variant={isMuted ? "destructive" : "outline"} size="icon" disabled={!hasCameraPermission}>
                    {isMuted ? <MicOff /> : <Mic />}
                </Button>
                <Button onClick={toggleCamera} variant={isCameraOff ? "destructive" : "outline"} size="icon" disabled={!hasCameraPermission}>
                    {isCameraOff ? <VideoOff /> : <VideoIcon />}
                </Button>
                 <Button onClick={endCall} variant="destructive" size="icon" disabled={!hasCameraPermission}>
                    <PhoneOff />
                </Button>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
