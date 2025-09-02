
'use client';

import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Video, VideoOff, PhoneOff } from 'lucide-react';
import { useEffect } from 'react';

export default function CallPage() {
  const searchParams = useSearchParams();
  const personaId = searchParams.get('persona');

  useEffect(() => {
    // Here you would initialize the WebRTC connection,
    // using the personaId to fetch persona details if needed.
    console.log(`Starting call with persona: ${personaId}`);
  }, [personaId]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-950 p-4 text-white">
        <Card className="w-full max-w-4xl bg-gray-900/50 border border-blue-500/20 shadow-[0_0_25px_rgba(72,149,239,0.15)]">
            <CardHeader>
                <CardTitle className="text-center text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-blue-400 to-purple-500 mb-2">
                    AI Wellness Session
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Remote Video (AI) */}
                    <div className="relative aspect-video bg-gray-800 rounded-lg flex items-center justify-center">
                        <p className="text-gray-400">AI Consultant's Video</p>
                    </div>

                    {/* Local Video (User) */}
                    <div className="relative aspect-video bg-gray-800 rounded-lg flex items-center justify-center">
                         <p className="text-gray-400">Your Video</p>
                    </div>
                </div>

                <div className="flex justify-center gap-4 mt-8">
                    <Button variant="outline" size="icon" className="bg-gray-800/80 border-blue-500/20 hover:bg-blue-500/20 rounded-full w-14 h-14">
                        <Mic className="h-6 w-6" />
                    </Button>
                     <Button variant="outline" size="icon" className="bg-gray-800/80 border-blue-500/20 hover:bg-blue-500/20 rounded-full w-14 h-14">
                        <Video className="h-6 w-6" />
                    </Button>
                    <Button variant="destructive" size="icon" className="rounded-full w-14 h-14">
                        <PhoneOff className="h-6 w-6" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    </div>
  );
}
