
'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause, Music, Volume2, Headphones } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import TextType from '@/components/ui/text-type';
import { Slider } from '@/components/ui/slider';

interface Track {
  id: number;
  title: string;
  category: string;
  duration: string;
  url: string;
}

const staticTracks: Track[] = [
  {
    id: 1,
    title: 'Peaceful Morning',
    category: 'Ambient',
    duration: '5:01',
    url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/SoundHelix-Song-1.mp3?alt=media&token=e9e6b8a8-8e6d-4d7a-8b83-2d2b512c9b4e',
  },
  {
    id: 2,
    title: 'Forest Walk',
    category: 'Nature',
    duration: '4:49',
    url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/SoundHelix-Song-2.mp3?alt=media&token=c27f7f90-1c64-4e2b-9c2b-23218e888496',
  },
  {
    id: 3,
    title: 'Gentle Stream',
    category: 'Water Sounds',
    duration: '5:27',
    url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/SoundHelix-Song-3.mp3?alt=media&token=3b3d9d37-2a4c-4e89-8d76-880479132104',
  },
  {
    id: 4,
    title: 'Mindful Piano',
    category: 'Instrumental',
    duration: '4:21',
    url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/SoundHelix-Song-4.mp3?alt=media&token=7d0b8e9a-7a54-4c46-888e-6704b2b1a473',
  },
  {
    id: 5,
    title: 'Deep Focus',
    category: 'Binaural',
    duration: '6:12',
    url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/SoundHelix-Song-5.mp3?alt=media&token=2d1a3c6f-7c1c-4b5a-9b1a-28952044810f',
  },
  {
    id: 6,
    title: 'Rainy Night',
    category: 'Nature',
    duration: '5:55',
    url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/SoundHelix-Song-6.mp3?alt=media&token=e9d3d3a4-8b6b-4e8b-b1e9-6f9f5a7a8d5b',
  },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring' } }
};


export default function AudioPlaylistPage() {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState('0:00');
  const [duration, setDuration] = useState('0:00');

  const audioRef = useRef<HTMLAudioElement>(null);
  
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    
    const updateProgress = () => {
        setProgress((audio.currentTime / audio.duration) * 100);
        setCurrentTime(formatTime(audio.currentTime));
    };
    
    const setAudioData = () => {
        setDuration(formatTime(audio.duration));
    }
    
    const handleEnded = () => {
        setIsPlaying(false);
        setCurrentTrack(null);
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('loadedmetadata', setAudioData);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('loadedmetadata', setAudioData);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
        audioRef.current.volume = volume;
    }
  }, [volume]);
  
  const handlePlayPause = useCallback((track: Track) => {
    if (currentTrack?.id === track.id) {
        if (isPlaying) {
            audioRef.current?.pause();
            setIsPlaying(false);
        } else {
            audioRef.current?.play();
            setIsPlaying(true);
        }
    } else {
        setCurrentTrack(track);
        if(audioRef.current) {
            audioRef.current.src = track.url;
            audioRef.current.play().catch(e => console.error("Error playing audio:", e));
            setIsPlaying(true);
        }
    }
  }, [currentTrack, isPlaying]);
  
  const handleScrub = (value: number[]) => {
      if (audioRef.current) {
          const newTime = (value[0] / 100) * audioRef.current.duration;
          audioRef.current.currentTime = newTime;
      }
  }

  return (
    <>
      <div className="relative flex flex-col items-center min-h-screen p-4 md:p-8 overflow-hidden">
        <div className="absolute inset-0 -z-10 h-full w-full">
            <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"></div>
            <div className="absolute left-0 right-0 top-[-10%] h-[1000px] w-[1000px] rounded-full bg-[radial-gradient(circle_400px_at_50%_300px,#16a34a33,transparent)]"></div>
        </div>

        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center my-12 flex flex-col items-center"
        >
            <TextType
                as="h1"
                text="Audio Playlist"
                typingSpeed={60}
                loop={false}
                className="text-4xl md:text-6xl font-bold mb-4 tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-green-400 to-emerald-600"
            />
            <TextType
                text="A curated selection of sounds for focus, relaxation, and mindfulness."
                typingSpeed={20}
                initialDelay={1500}
                loop={false}
                className="text-lg max-w-2xl mx-auto text-gray-400"
            />
        </motion.div>
        
        <Card className="w-full max-w-4xl bg-black/30 backdrop-blur-md border border-green-500/20 shadow-2xl shadow-green-500/10 rounded-2xl">
            <CardHeader>
                <CardTitle className="text-3xl font-bold text-green-300 flex items-center gap-3">
                    <Headphones /> Tracks for you
                </CardTitle>
            </CardHeader>
            <CardContent>
                <motion.div className="space-y-4" variants={containerVariants} initial="hidden" animate="visible">
                    {staticTracks.map((track) => {
                        const isCurrentTrackPlaying = currentTrack?.id === track.id && isPlaying;
                        return (
                            <motion.div key={track.id} variants={itemVariants}>
                                <div className="flex items-center p-4 rounded-lg bg-gray-800/50 border border-green-500/20 hover:border-green-400/50 transition-colors duration-300">
                                    <div className="flex-shrink-0 mr-4">
                                        <div className="w-12 h-12 bg-green-900/50 rounded-lg flex items-center justify-center">
                                            <Music className="w-6 h-6 text-green-400" />
                                        </div>
                                    </div>
                                    <div className="flex-grow">
                                        <p className="text-lg font-medium text-white">{track.title}</p>
                                        <p className="text-sm text-gray-400">{track.category} • {track.duration}</p>
                                    </div>
                                    <Button size="icon" className="bg-green-600 hover:bg-green-500 rounded-full w-12 h-12" onClick={() => handlePlayPause(track)}>
                                        {isCurrentTrackPlaying ? <Pause className="h-6 w-6"/> : <Play className="h-6 w-6"/>}
                                    </Button>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </CardContent>
        </Card>
      </div>

      <audio ref={audioRef} />
      
      <AnimatePresence>
          {currentTrack && (
              <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                className="fixed bottom-4 left-4 right-4 md:bottom-8 md:left-auto md:right-8 md:w-96 z-50"
              >
                  <div className="bg-gray-900/80 backdrop-blur-xl border border-green-500/30 p-4 rounded-xl shadow-2xl flex items-center gap-4">
                      <Button size="icon" className="bg-green-600 hover:bg-green-500 rounded-full flex-shrink-0" onClick={() => handlePlayPause(currentTrack)}>
                         {isPlaying ? <Pause className="h-5 w-5"/> : <Play className="h-5 w-5"/>}
                      </Button>
                      <div className="flex-grow overflow-hidden">
                          <p className="text-white font-semibold truncate">{currentTrack.title}</p>
                          <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                               <span>{currentTime}</span>
                               <Slider 
                                  value={[progress]} 
                                  max={100} 
                                  step={1} 
                                  onValueChange={handleScrub}
                                  className="[&>span:first-child]:h-1 [&>span>span]:h-1 [&>span>span]:bg-green-500"
                                />
                               <span>{duration}</span>
                          </div>
                      </div>
                      <div className="flex items-center gap-2">
                           <Volume2 className="h-4 w-4 text-gray-400" />
                           <Slider 
                                defaultValue={[1]}
                                max={1} 
                                step={0.01} 
                                onValueChange={(value) => setVolume(value[0])}
                                className="w-20 [&>span:first-child]:h-1 [&>span>span]:h-1 [&>span>span]:bg-green-500"
                            />
                      </div>
                  </div>
              </motion.div>
          )}
      </AnimatePresence>
    </>
  );
}
