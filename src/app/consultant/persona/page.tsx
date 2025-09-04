
'use client';

import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { personas } from '@/app/consultant/personas';
import { Video, Mic } from 'lucide-react';

export default function PersonaSelectionPage() {
  const router = useRouter();

  const handleSelectVideo = (personaId: string) => {
    router.push(`/consultant/call?persona=${personaId}`);
  };

  const handleSelectAudio = (personaId: string) => {
    router.push(`/consultant/audiocall?persona=${personaId}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-950 p-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-blue-400 to-purple-500 mb-4">
          Choose Your AI Consultant
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Select a persona that best fits the type of support you're looking for today.
        </p>
      </div>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 w-full max-w-5xl">
        {personas.map((persona) => (
          <Card
            key={persona.id}
            className="flex flex-col bg-gray-900/50 border border-blue-500/20 hover:border-blue-500/60 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-[0_0_35px_rgba(72,149,239,0.25)] rounded-lg"
          >
            <CardHeader className="items-center text-center">
              <div className="p-4 bg-gray-800/70 rounded-full mb-4 border border-blue-500/20">
                <persona.icon className="h-10 w-10 text-blue-300" />
              </div>
              <CardTitle className="text-2xl text-blue-300">{persona.name}</CardTitle>
              <CardDescription className="text-gray-400 pt-2 text-base">
                {persona.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow"></CardContent>
            <CardFooter className="flex flex-col sm:flex-row gap-2 mt-auto p-4">
              <Button
                className="w-full bg-blue-600 hover:bg-blue-700 transition-all flex items-center gap-2"
                onClick={() => handleSelectVideo(persona.id)}
              >
                <Video className="h-4 w-4" />
                Video Session
              </Button>
              <Button
                className="w-full bg-blue-800 hover:bg-blue-900 transition-all flex items-center gap-2"
                onClick={() => handleSelectAudio(persona.id)}
              >
                 <Mic className="h-4 w-4" />
                Audio Session
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
