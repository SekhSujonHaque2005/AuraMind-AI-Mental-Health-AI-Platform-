
'use client';

import { useState, useRef, useEffect, useCallback, useId } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, Music, Volume2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOutsideClick } from '@/hooks/use-outside-click';
import { Slider } from '@/components/ui/slider';
import Image from 'next/image';

interface Track {
  id: number;
  title: string;
  category: string;
  duration: string;
  url: string;
  description: string;
  src: string;
  content: () => React.ReactNode;
}

const staticTracks: Track[] = [
  {
    id: 1,
    title: 'Peaceful Morning',
    description: 'A gentle start to your day.',
    category: 'Ambient',
    duration: '5:01',
    url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/SoundHelix-Song-1.mp3?alt=media&token=e9e6b8a8-8e6d-4d7a-8b83-2d2b512c9b4e',
    src: 'https://images.unsplash.com/photo-1476820865390-c52aeebb9891?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    content: () => <p>Ease into your day with this calming ambient track. Perfect for meditation, yoga, or simply enjoying a quiet cup of coffee as the sun rises. Let the gentle tones wash over you, clearing your mind for the day ahead.</p>,
  },
  {
    id: 2,
    title: 'Forest Walk',
    description: 'Sounds of nature and tranquility.',
    category: 'Nature',
    duration: '4:49',
    url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/SoundHelix-Song-2.mp3?alt=media&token=c27f7f90-1c64-4e2b-9c2b-23218e888496',
    src: 'https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    content: () => <p>Immerse yourself in the serene soundscape of a forest. The gentle rustling of leaves, distant bird calls, and the soft whisper of the wind create a perfect atmosphere for focus and relaxation.</p>,
  },
  {
    id: 3,
    title: 'Gentle Stream',
    description: 'The soothing flow of water.',
    category: 'Water Sounds',
    duration: '5:27',
    url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/SoundHelix-Song-3.mp3?alt=media&token=3b3d9d37-2a4c-4e89-8d76-880479132104',
    src: 'https://images.unsplash.com/photo-1536584754829-12214d404f32?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    content: () => <p>Let the continuous, gentle sound of a flowing stream wash away your stress. This track is ideal for creating a peaceful environment for studying, working, or unwinding after a long day.</p>,
  },
  {
    id: 4,
    title: 'Mindful Piano',
    description: 'A soft, instrumental piece.',
    category: 'Instrumental',
    duration: '4:21',
    url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/SoundHelix-Song-4.mp3?alt=media&token=7d0b8e9a-7a54-4c46-888e-6704b2b1a473',
    src: 'https://images.unsplash.com/photo-1520444453472-ac53c516450a?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    content: () => <p>A beautiful and simple piano melody to help you find your center. The minimalist composition provides a backdrop of calm without being distracting, encouraging a state of mindfulness.</p>,
  },
  {
    id: 5,
    title: 'Deep Focus',
    description: 'Binaural beats for concentration.',
    category: 'Binaural',
    duration: '6:12',
    url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/SoundHelix-Song-5.mp3?alt=media&token=2d1a3c6f-7c1c-4b5a-9b1a-28952044810f',
    src: 'https://images.unsplash.com/photo-1517842645767-c6f9c49505b8?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    content: () => <p>Utilize the power of binaural beats to enhance your focus and concentration. This track is designed to help you enter a flow state, making it perfect for complex tasks and creative work. Use headphones for the best effect.</p>,
  },
];

const CloseIcon = () => {
    return (
      <motion.svg
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.05 } }}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4 text-black"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M18 6l-12 12" />
        <path d="M6 6l12 12" />
      </motion.svg>
    );
};

export default function AudioPlaylistPage() {
    const [activeCard, setActiveCard] = useState<Track | null>(null);
    const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [volume, setVolume] = useState(1);
    const [currentTime, setCurrentTime] = useState('0:00');
    const [duration, setDuration] = useState('0:00');

    const audioRef = useRef<HTMLAudioElement>(null);
    const expandableCardRef = useRef<HTMLDivElement>(null);
    const id = useId();

    useOutsideClick(expandableCardRef, () => setActiveCard(null));

    useEffect(() => {
        function onKeyDown(event: KeyboardEvent) {
          if (event.key === "Escape") {
            setActiveCard(null);
          }
        }
        if (activeCard) {
          document.body.style.overflow = "hidden";
        } else {
          document.body.style.overflow = "auto";
        }
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [activeCard]);

    const formatTime = (timeInSeconds: number) => {
        const seconds = Math.floor(timeInSeconds);
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
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
            if (isFinite(audio.duration)) {
                setDuration(formatTime(audio.duration));
            }
        };
        const handleEnded = () => {
            setIsPlaying(false);
            // Optional: Play next song or reset player
            // For now, just stopping
        };
    
        audio.addEventListener('timeupdate', updateProgress);
        audio.addEventListener('loadedmetadata', setAudioData);
        audio.addEventListener('ended', handleEnded);
    
        return () => {
          audio.removeEventListener('timeupdate', updateProgress);
          audio.removeEventListener('loadedmetadata', setAudioData);
          audio.removeEventListener('ended', handleEnded);
        };
    }, [currentTrack]); // Rerun when track changes

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

    return (
        <>
            <div className="flex flex-col items-center min-h-screen p-4 md:p-8">
                <div className="text-center my-12">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-br from-green-400 to-emerald-600">Audio Playlist</h1>
                    <p className="text-lg max-w-2xl mx-auto text-gray-400">A curated selection of sounds for focus, relaxation, and mindfulness.</p>
                </div>

                <AnimatePresence>
                    {activeCard && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/20 h-full w-full z-10"
                    />
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {activeCard ? (
                    <div className="fixed inset-0 grid place-items-center z-[100]">
                        <motion.button
                            key={`button-close-${activeCard.title}-${id}`}
                            className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
                            onClick={() => setActiveCard(null)}
                        >
                            <CloseIcon />
                        </motion.button>
                        <motion.div
                        layoutId={`card-${activeCard.title}-${id}`}
                        ref={expandableCardRef}
                        className="w-full max-w-[500px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-gray-900 sm:rounded-3xl overflow-hidden"
                        >
                        <motion.div layoutId={`image-${activeCard.title}-${id}`}>
                            <Image
                                width={500}
                                height={320}
                                src={activeCard.src}
                                alt={activeCard.title}
                                className="w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top"
                            />
                        </motion.div>

                        <div>
                            <div className="flex justify-between items-start p-4">
                            <div className="">
                                <motion.h3
                                layoutId={`title-${activeCard.title}-${id}`}
                                className="font-bold text-neutral-200"
                                >
                                {activeCard.title}
                                </motion.h3>
                                <motion.p
                                layoutId={`description-${activeCard.description}-${id}`}
                                className="text-neutral-400"
                                >
                                {activeCard.description}
                                </motion.p>
                            </div>

                            <motion.div layoutId={`button-${activeCard.title}-${id}`}>
                                <Button size="icon" className="bg-green-600 hover:bg-green-500 rounded-full w-12 h-12" onClick={() => handlePlayPause(activeCard)}>
                                    {(isPlaying && currentTrack?.id === activeCard.id) ? <Pause className="h-6 w-6"/> : <Play className="h-6 w-6"/>}
                                </Button>
                            </motion.div>

                            </div>
                            <div className="pt-4 relative px-4">
                                <motion.div
                                    layout
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="text-neutral-400 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                                >
                                    {activeCard.content()}
                                </motion.div>
                            </div>
                        </div>
                        </motion.div>
                    </div>
                    ) : null}
                </AnimatePresence>

                <ul className="w-full max-w-2xl mx-auto gap-4 flex flex-col">
                    {staticTracks.map((track) => (
                    <motion.div
                        layoutId={`card-${track.title}-${id}`}
                        key={`card-${track.title}-${id}`}
                        onClick={() => setActiveCard(track)}
                        className="p-4 flex flex-col md:flex-row justify-between items-center bg-gray-900/50 hover:bg-gray-800/70 rounded-xl cursor-pointer border border-green-500/10 hover:border-green-500/30 transition-colors"
                    >
                        <div className="flex gap-4 flex-col md:flex-row items-center">
                        <motion.div layoutId={`image-${track.title}-${id}`}>
                            <Image
                                width={56}
                                height={56}
                                src={track.src}
                                alt={track.title}
                                className="h-20 w-20 md:h-14 md:w-14 rounded-lg object-cover object-top"
                            />
                        </motion.div>
                        <div className="">
                            <motion.h3
                            layoutId={`title-${track.title}-${id}`}
                            className="font-medium text-neutral-200 text-center md:text-left"
                            >
                            {track.title}
                            </motion.h3>
                            <motion.p
                            layoutId={`description-${track.description}-${id}`}
                            className="text-neutral-400 text-center md:text-left text-sm"
                            >
                            {track.description}
                            </motion.p>
                        </div>
                        </div>
                        <motion.div
                        layoutId={`button-${track.title}-${id}`}
                        className="mt-4 md:mt-0"
                        >
                            <Button size="icon" className="bg-green-600 hover:bg-green-500 rounded-full" onClick={(e) => { e.stopPropagation(); handlePlayPause(track); }}>
                                {(isPlaying && currentTrack?.id === track.id) ? <Pause className="h-5 w-5"/> : <Play className="h-5 w-5"/>}
                            </Button>
                        </motion.div>
                    </motion.div>
                    ))}
                </ul>

                <audio ref={audioRef} />

            </div>

             <AnimatePresence>
                {currentTrack && (
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                        className="fixed bottom-4 left-4 right-4 md:bottom-8 md:left-auto md:w-96 z-50"
                        style={{ right: 'calc(50% - 12rem)'}}
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
                                        className="[&>span:first-child]:h-1 [&>span>span]:h-1 [&>span>span]:bg-green-500"
                                        onValueChange={(value) => { if (audioRef.current) { audioRef.current.currentTime = (value[0] / 100) * audioRef.current.duration; }}}
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
                             <button onClick={() => setCurrentTrack(null)} className="text-gray-400 hover:text-white">
                                <X className="h-4 w-4" />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
