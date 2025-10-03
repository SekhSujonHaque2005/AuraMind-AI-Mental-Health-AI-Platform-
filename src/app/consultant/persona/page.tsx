
'use client';

import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { personas } from '@/app/consultant/personas';
import { Video, Mic, ArrowRight, Lock } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export default function PersonaSelectionPage() {
  const router = useRouter();
  const { toast } = useToast();

  const handleComingSoon = () => {
    toast({
      title: 'Coming Soon!',
      description: 'Locked due to API issue. When the API server is fixed, it will unlock.',
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4 overflow-y-auto">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-blue-400 to-purple-500 mb-4">
          Choose Your AI Consultant
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Select a persona that best fits the type of support you're looking for today.
        </p>
      </motion.div>
      <motion.div 
        className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 w-full max-w-6xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {personas.map((persona) => (
            <motion.div key={persona.id} variants={itemVariants}>
                <Card
                    className="flex flex-col h-full bg-gray-900/50 border border-blue-500/20 hover:border-blue-500/60 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-[0_0_35px_rgba(72,149,239,0.25)] rounded-2xl overflow-hidden group"
                >
                    <CardHeader className="items-center text-center p-8 bg-black/20">
                    <motion.div 
                        whileHover={{ scale: 1.1, rotate: -5 }}
                        className="p-5 bg-gray-800/70 rounded-full mb-5 border-2 border-blue-500/20 group-hover:border-blue-400/50 transition-colors"
                    >
                        <persona.icon className="h-12 w-12 text-blue-300 group-hover:text-blue-200 transition-colors" />
                    </motion.div>
                    <CardTitle className="text-2xl text-blue-300">{persona.name}</CardTitle>
                    <CardDescription className="text-gray-400 pt-2 text-base min-h-[60px]">
                        {persona.description}
                    </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow"></CardContent>
                    <CardFooter className="flex flex-col gap-3 p-6 bg-black/20 mt-auto">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                onClick={handleComingSoon}
                                className="w-full text-base py-6 bg-gray-700/50 hover:bg-gray-700/80 text-gray-400 transition-all flex items-center justify-center gap-2 group/button cursor-pointer"
                            >
                                <Lock className="h-5 w-5" />
                                Start Video Session
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Coming Soon: Locked due to API issue. When the API server is fixed, it will unlock.</p>
                        </TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                              onClick={handleComingSoon}
                              className="w-full text-base py-6 bg-gray-700/50 border border-blue-500/10 hover:bg-gray-700/80 text-gray-400 transition-all flex items-center justify-center gap-2 group/button cursor-pointer"
                            >
                              <Lock className="h-5 w-5" />
                              Start Audio Session
                            </Button>
                        </TooltipTrigger>
                         <TooltipContent>
                          <p>Coming Soon: Locked due to API issue. When the API server is fixed, it will unlock.</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    </CardFooter>
                </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
