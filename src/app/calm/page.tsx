
'use client';

import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { scenes, Scene } from '@/app/calm/scenes';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Minus, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import TextType from '@/components/ui/text-type';

const INITIAL_VISIBLE_SCENES = 6;

const ScenePreview = ({ scene }: { scene: Scene | null }) => {
  const router = useRouter();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Clear any existing timeout when the scene changes
    if (audioTimeoutRef.current) {
      clearTimeout(audioTimeoutRef.current);
    }
    
    if (audioRef.current) {
        // Pause and reset previous audio
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
    }

    if (scene && audioRef.current) {
      audioRef.current.src = scene.sound;
      const playPromise = audioRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          // Autoplay was prevented.
          console.error("Audio preview failed:", error);
        });
      }

      // Set a timeout to stop the audio after 5 seconds
      audioTimeoutRef.current = setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        }
      }, 5000);
    }
    
    // Cleanup function
    return () => {
        if (audioTimeoutRef.current) {
            clearTimeout(audioTimeoutRef.current);
        }
    }
  }, [scene]);

  return (
    <>
      <AnimatePresence>
        {scene && (
          <motion.div
            key={scene.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="w-full h-full"
          >
            <Card className="flex flex-col h-full bg-black/30 backdrop-blur-lg border border-blue-500/20 rounded-2xl overflow-hidden shadow-2xl shadow-blue-500/10">
              <div className="relative w-full h-64">
                <Image
                  src={scene.image}
                  alt={scene.name}
                  fill
                  className="object-cover"
                  data-ai-hint="calm nature"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              </div>
              <CardContent className="p-6 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold text-blue-300 mb-2">{scene.name}</h3>
                <p className="text-gray-400 flex-grow">{scene.description}</p>
                <Button onClick={() => router.push(`/calm/${scene.id}`)} className="mt-6 w-full bg-blue-600 hover:bg-blue-500 transition-all group">
                  Enter Scene <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
      <audio ref={audioRef} preload="auto" />
    </>
  );
};


export default function CalmSelectionPage() {
  const router = useRouter();
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_SCENES);
  const [hoveredScene, setHoveredScene] = useState<Scene | null>(scenes[0] ?? null);

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
      transition: { staggerChildren: 0.05 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
  };

  const showToggleButton = scenes.length > INITIAL_VISIBLE_SCENES;
  const isExpanded = visibleCount === scenes.length;

  return (
    <div className="relative flex flex-col min-h-screen p-4 md:p-8 overflow-hidden">
        <div className="absolute inset-0 -z-10 h-full w-full">
            <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"></div>
            <div className="absolute left-0 right-0 top-[-10%] h-[1000px] w-[1000px] rounded-full bg-[radial-gradient(circle_400px_at_50%_300px,#3b82f633,transparent)]"></div>
        </div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center my-12 flex flex-col items-center"
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
            className="text-lg max-w-2xl mx-auto text-gray-400"
        />
      </motion.div>

      <div className="flex-grow grid grid-cols-1 lg:grid-cols-3 gap-8 w-full max-w-7xl mx-auto">
        <div className="lg:col-span-2">
            <motion.div
                className="grid gap-6 md:grid-cols-2 xl:grid-cols-3 w-full"
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
                            onMouseEnter={() => setHoveredScene(scene)}
                        >
                            <Card
                                onClick={() => handleSelectScene(scene.id)}
                                className="flex flex-col h-full bg-black/30 backdrop-blur-md border hover:border-blue-400/50 transition-all duration-300 transform hover:-translate-y-1 rounded-2xl overflow-hidden group cursor-pointer"
                                style={{ borderColor: hoveredScene?.id === scene.id ? 'hsl(var(--primary))' : 'hsla(var(--border))' }}
                            >
                                <div className="relative w-full h-40 overflow-hidden">
                                    <Image
                                        src={scene.image}
                                        alt={scene.name}
                                        fill
                                        className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                                        data-ai-hint="calm nature"
                                    />
                                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                                     <div className="absolute bottom-4 left-4">
                                        <h3 className="text-xl font-bold text-white tracking-tight">{scene.name}</h3>
                                     </div>
                                </div>
                            </Card>
                      </motion.div>
                    ))}
                </AnimatePresence>
             </motion.div>
            {showToggleButton && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-12 text-center">
                  <Button
                    onClick={handleToggleScenes}
                    variant="ghost"
                    className="text-lg font-semibold py-4 px-8 text-blue-300 hover:bg-transparent hover:text-blue-200 transition-all group rounded-full border-2 border-blue-500/30 hover:border-blue-400/60"
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
        <div className="hidden lg:block lg:col-span-1 sticky top-28 h-[500px]">
            <ScenePreview scene={hoveredScene} />
        </div>
      </div>
    </div>
  );
}
