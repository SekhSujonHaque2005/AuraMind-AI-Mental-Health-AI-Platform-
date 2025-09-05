
'use client';

import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { scenes } from '@/app/calm/scenes';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Minus } from 'lucide-react';
import Image from 'next/image';
import ScrollFloat from '@/components/scroll-float';
import TextType from '@/components/ui/text-type';

const INITIAL_VISIBLE_SCENES = 6;

export default function CalmSelectionPage() {
  const router = useRouter();
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_SCENES);

  const handleSelectScene = (sceneId: string) => {
    router.push(`/calm/${sceneId}`);
  };

  const handleToggleScenes = () => {
    setVisibleCount(prevCount => 
      prevCount === scenes.length ? INITIAL_VISIBLE_SCENES : scenes.length
    );
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
  };
  
  const showToggleButton = scenes.length > INITIAL_VISIBLE_SCENES;
  const isExpanded = visibleCount === scenes.length;

  return (
    <div className="relative flex flex-col items-center min-h-screen bg-background p-4 pb-24 overflow-y-auto">
        <div className="absolute inset-0 -z-10 h-full w-full bg-background">
            <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"></div>
            <div className="absolute left-0 right-0 top-[-10%] h-[1000px] w-[1000px] rounded-full bg-[radial-gradient(circle_400px_at_50%_300px,#3b82f633,transparent)]"></div>
        </div>

      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center my-16 flex flex-col items-center"
      >
        <TextType 
          as="h1"
          text="The Calm Room"
          typingSpeed={60}
          loop={false}
          className="text-4xl md:text-6xl font-bold mb-4 tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-blue-400 to-purple-500"
        />

        <TextType
            text="Select a scene to begin your immersive relaxation experience. Each is designed to transport you to a place of peace."
            typingSpeed={20}
            initialDelay={1500}
            loop={false}
            className="text-blue-200/80 text-lg max-w-2xl mx-auto"
        />

      </motion.div>
      <motion.div 
        className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 w-full max-w-7xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <AnimatePresence>
            {scenes.slice(0, visibleCount).map((scene) => (
                <motion.div 
                    key={scene.id} 
                    variants={itemVariants}
                    layout
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                >
                    <Card
                        onClick={() => handleSelectScene(scene.id)}
                        className="flex flex-col h-full bg-black/30 backdrop-blur-md border border-blue-500/20 hover:border-blue-400/50 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-[0_0_40px_-10px_rgba(59,130,246,0.3)] rounded-2xl overflow-hidden group cursor-pointer"
                    >
                        <div className="relative w-full h-56 overflow-hidden">
                            <Image 
                                src={scene.image} 
                                alt={scene.name} 
                                fill
                                className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110" 
                                data-ai-hint="calm nature"
                            />
                             <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                             <div className="absolute bottom-4 left-4">
                                <ScrollFloat
                                    textClassName="text-2xl font-bold text-white tracking-tight"
                                    stagger={0.02}
                                    animationDuration={0.8}
                                >
                                    {scene.name}
                                </ScrollFloat>
                             </div>
                        </div>
                        <CardContent className="p-6 flex-grow">
                            <div className="flex items-start gap-4">
                                <p className="text-gray-400 text-base">
                                    {scene.description}
                                </p>
                            </div>
                        </CardContent>
                    </Card>
              </motion.div>
            ))}
        </AnimatePresence>
      </motion.div>

      {showToggleButton && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-16 text-center">
          <Button
            onClick={handleToggleScenes}
            variant="ghost"
            className="text-lg font-semibold py-6 px-8 text-blue-300 hover:bg-transparent hover:text-blue-200 transition-all group rounded-full border-2 border-blue-500/30 hover:border-blue-400/60"
          >
            {isExpanded ? (
              <Minus className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:rotate-90" />
            ) : (
              <Plus className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:rotate-90" />
            )}
            {isExpanded ? 'Show Less' : 'Show All Scenes'}
          </Button>
        </motion.div>
      )}
    </div>
  );
}
