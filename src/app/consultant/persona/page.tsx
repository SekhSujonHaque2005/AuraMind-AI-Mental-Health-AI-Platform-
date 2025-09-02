
'use client';

import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, Zap, Heart } from 'lucide-react';

const personas = [
  {
    id: '1',
    name: 'Dr. Anya Sharma',
    description: 'A compassionate guide focusing on mindfulness and cognitive behavioral techniques.',
    icon: Heart,
  },
  {
    id: '2',
    name: 'Coach Alex',
    description: 'A motivational partner for building resilience and achieving personal goals.',
    icon: Zap,
  },
  {
    id: '3',
    name: 'Sam',
    description: 'A non-judgmental friend who is here to simply listen and provide support.',
    icon: User,
  },
];

export default function PersonaSelectionPage() {
  const router = useRouter();

  const handleSelectPersona = (personaId: string) => {
    router.push(`/consultant/call?persona=${personaId}`);
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
            className="flex flex-col bg-gray-900/50 border border-blue-500/20 hover:border-blue-500/60 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-[0_0_35px_rgba(72,149,239,0.25)] rounded-lg cursor-pointer"
            onClick={() => handleSelectPersona(persona.id)}
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
            <CardContent className="mt-auto">
              <Button
                className="w-full bg-blue-600 hover:bg-blue-700 transition-all"
              >
                Start Session
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
