
'use client';

import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { scenes } from '@/app/calm/scenes';
import { motion } from 'framer-motion';

export default function CalmSelectionPage() {
  const router = useRouter();

  const handleSelectScene = (sceneId: string) => {
    router.push(`/calm/${sceneId}`);
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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-950 p-4 overflow-y-auto">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-blue-400 to-purple-500 mb-4">
          The Calm Room
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Select a scene to begin your immersive relaxation experience.
        </p>
      </motion.div>
      <motion.div 
        className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 w-full max-w-6xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {scenes.map((scene) => (
            <motion.div 
                key={scene.id} 
                variants={itemVariants}
                onClick={() => handleSelectScene(scene.id)}
            >
                <Card
                    className="flex flex-col h-full bg-gray-900/50 border border-blue-500/20 hover:border-blue-500/60 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-[0_0_35px_rgba(72,149,239,0.25)] rounded-2xl overflow-hidden group cursor-pointer"
                >
                    <div className="relative w-full h-48 overflow-hidden">
                        <img src={scene.image} alt={scene.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                         <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    </div>
                    <CardHeader className="items-start text-left p-6">
                        <div className="flex items-center gap-4">
                            <div className="text-4xl">{scene.emoji}</div>
                            <div>
                                <CardTitle className="text-2xl text-blue-300">{scene.name}</CardTitle>
                                <CardDescription className="text-gray-400 pt-2 text-base">
                                    {scene.description}
                                </CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="flex-grow"></CardContent>
                </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
