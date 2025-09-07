
'use client';

import { useState, useRef, useEffect, useCallback, useId, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, Music, Volume2, X, SkipForward, SkipBack, Repeat, Shuffle, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOutsideClick } from '@/hooks/use-outside-click';
import { Slider } from '@/components/ui/slider';
import Image from 'next/image';
import { cn } from '@/lib/utils';


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
  // Ambient
  {
    id: 1,
    title: 'Peaceful Morning',
    description: 'A gentle start to your day.',
    category: 'Ambient',
    duration: '5:01',
    url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/SoundHelix-Song-1.mp3?alt=media&token=e9e6b8a8-8e6d-4d7a-8b83-2d2b512c9b4e',
    src: 'https://images.unsplash.com/photo-1476820865390-c52aeebb9891?q=80&w=2670&auto=format&fit=crop',
    content: () => <p>Ease into your day with this calming ambient track. Perfect for meditation, yoga, or simply enjoying a quiet cup of coffee as the sun rises. Let the gentle tones wash over you, clearing your mind for the day ahead.</p>,
  },
  {
    id: 12,
    title: 'Floating Through Space',
    description: 'Cosmic sounds for deep relaxation.',
    category: 'Ambient',
    duration: '6:30',
    url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/SoundHelix-Song-12.mp3?alt=media&token=e9e6b8a8-8e6d-4d7a-8b83-2d2b512c9b4e',
    src: 'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?q=80&w=2671&auto=format&fit=crop',
    content: () => <p>Drift away into the cosmos with this ethereal ambient track. The deep, resonant tones and subtle electronic textures create a feeling of weightlessness and serenity, ideal for deep meditation or unwinding.</p>,
  },
  {
    id: 13,
    title: 'Dreamy Vistas',
    description: 'Lush soundscapes for imagination.',
    category: 'Ambient',
    duration: '7:15',
    url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/SoundHelix-Song-13.mp3?alt=media&token=e9e6b8a8-8e6d-4d7a-8b83-2d2b512c9b4e',
    src: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2532&auto=format&fit=crop',
    content: () => <p>Let your mind wander through beautiful, imaginary landscapes with this lush and dreamy ambient track. Perfect for creative work, journaling, or simply letting your imagination soar.</p>,
  },
  // Nature
  {
    id: 2,
    title: 'Forest Walk',
    description: 'Sounds of nature and tranquility.',
    category: 'Nature',
    duration: '4:49',
    url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/SoundHelix-Song-2.mp3?alt=media&token=c27f7f90-1c64-4e2b-9c2b-23218e888496',
    src: 'https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=2670&auto=format&fit=crop',
    content: () => <p>Immerse yourself in the serene soundscape of a forest. The gentle rustling of leaves, distant bird calls, and the soft whisper of the wind create a perfect atmosphere for focus and relaxation.</p>,
  },
  {
    id: 11,
    title: 'Chirping Birds',
    description: 'A cheerful morning chorus.',
    category: 'Nature',
    duration: '3:50',
    url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/SoundHelix-Song-11.mp3?alt=media&token=c27f7f90-1c64-4e2b-9c2b-23218e888496',
    src: 'https://images.unsplash.com/photo-1528926938361-9f3a6159044a?q=80&w=2670&auto=format&fit=crop',
    content: () => <p>Wake up to the happy and uplifting sounds of birds chirping. This track is perfect for starting your day with a positive and energetic vibe, connecting you with the beauty of nature.</p>,
  },
  // Water Sounds
  {
    id: 3,
    title: 'Gentle Stream',
    description: 'The soothing flow of water.',
    category: 'Water Sounds',
    duration: '5:27',
    url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/SoundHelix-Song-3.mp3?alt=media&token=3b3d9d37-2a4c-4e89-8d76-880479132104',
    src: 'https://images.unsplash.com/photo-1536584754829-12214d404f32?q=80&w=2574&auto=format&fit=crop',
    content: () => <p>Let the continuous, gentle sound of a flowing stream wash away your stress. This track is ideal for creating a peaceful environment for studying, working, or unwinding after a long day.</p>,
  },
  {
    id: 7,
    title: 'Ocean Waves',
    description: 'The rhythmic crash of ocean waves.',
    category: 'Water Sounds',
    duration: '8:05',
    url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/SoundHelix-Song-7.mp3?alt=media&token=83a0e5b3-3a7a-428a-867c-1eda7f4d2f83',
    src: 'https://images.unsplash.com/photo-1507525428034-b723a9ce6890?q=80&w=2670&auto=format&fit=crop',
    content: () => <p>Transport yourself to a serene beach with the calming, rhythmic sounds of ocean waves. This track is perfect for falling asleep, meditating, or creating a peaceful backdrop for your day.</p>,
  },
  // Instrumental
  {
    id: 4,
    title: 'Mindful Piano',
    description: 'A soft, instrumental piece.',
    category: 'Instrumental',
    duration: '4:21',
    url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/SoundHelix-Song-4.mp3?alt=media&token=7d0b8e9a-7a54-4c46-888e-6704b2b1a473',
    src: 'https://images.unsplash.com/photo-1520444453472-ac53c516450a?q=80&w=2670&auto=format&fit=crop',
    content: () => <p>A beautiful and simple piano melody to help you find your center. The minimalist composition provides a backdrop of calm without being distracting, encouraging a state of mindfulness.</p>,
  },
  {
    id: 14,
    title: 'Acoustic Guitar Serenity',
    description: 'Warm and gentle guitar strings.',
    category: 'Instrumental',
    duration: '5:55',
    url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/SoundHelix-Song-14.mp3?alt=media&token=7d0b8e9a-7a54-4c46-888e-6704b2b1a473',
    src: 'https://images.unsplash.com/photo-1499999958309-a3b6d77a3644?q=80&w=2670&auto=format&fit=crop',
    content: () => <p>Unwind with the warm, gentle tones of an acoustic guitar. This simple, melodic piece is perfect for a quiet evening, reading, or creating a peaceful and intimate atmosphere.</p>,
  },
  // Binaural
  {
    id: 5,
    title: 'Deep Focus (50Hz)',
    description: 'Binaural beats for concentration.',
    category: 'Binaural',
    duration: '6:12',
    url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/SoundHelix-Song-5.mp3?alt=media&token=2d1a3c6f-7c1c-4b5a-9b1a-28952044810f',
    src: 'https://images.unsplash.com/photo-1517842645767-c6f9c49505b8?q=80&w=2670&auto=format&fit=crop',
    content: () => <p>Utilize the power of binaural beats to enhance your focus and concentration. This track is designed to help you enter a flow state, making it perfect for complex tasks and creative work. Use headphones for the best effect.</p>,
  },
  {
    id: 15,
    title: 'Alpha Wave Relaxation',
    description: '8-12Hz beats for calm awareness.',
    category: 'Binaural',
    duration: '7:45',
    url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/SoundHelix-Song-15.mp3?alt=media&token=2d1a3c6f-7c1c-4b5a-9b1a-28952044810f',
    src: 'https://images.unsplash.com/photo-1558985250-2d85b34210de?q=80&w=2670&auto=format&fit=crop',
    content: () => <p>Gently guide your brain into an alpha state with these 8-12Hz binaural beats. This frequency is associated with relaxed, peaceful awareness, making it ideal for stress reduction and light meditation. Use headphones for the best effect.</p>,
  },
  // Soundscape
  {
    id: 6,
    title: 'Rainy Day Cafe',
    description: 'Cozy ambiance of rain and coffee.',
    category: 'Soundscape',
    duration: '7:30',
    url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/SoundHelix-Song-6.mp3?alt=media&token=8d48a04b-3c48-4334-a151-dd2199127814',
    src: 'https://images.unsplash.com/photo-1515542706-9ab635001a47?q=80&w=2670&auto=format&fit=crop',
    content: () => <p>The comforting sound of rain tapping on a window pane, mixed with the subtle, warm ambiance of a quiet coffee shop. Ideal for reading, studying, or simply relaxing on a cozy afternoon.</p>,
  },
  {
    id: 10,
    title: 'Crackling Fireplace',
    description: 'Warm and cozy fire sounds.',
    category: 'Soundscape',
    duration: '6:40',
    url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/SoundHelix-Song-10.mp3?alt=media&token=7d0b8e9a-7a54-4c46-888e-6704b2b1a473',
    src: 'https://images.unsplash.com/photo-1542382257-80dedb7c7a84?q=80&w=2670&auto=format&fit=crop',
    content: () => <p>The warm, crackling sound of a fireplace. Create a cozy and inviting atmosphere, perfect for relaxing with a book on a cold night or finding comfort and warmth.</p>,
  },
  // Lofi
  {
    id: 8,
    title: 'Lofi Study Beats',
    description: 'Chill instrumental hip hop.',
    category: 'Lofi',
    duration: '4:55',
    url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/SoundHelix-Song-8.mp3?alt=media&token=7c1f1f94-734d-4e94-817a-59b9e592750e',
    src: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=2670&auto=format&fit=crop',
    content: () => <p>A smooth, instrumental lofi hip hop track to help you study, work, or relax. The chill beats and simple melodies create a productive and stress-free atmosphere.</p>,
  },
  {
    id: 16,
    title: 'Midnight Drive',
    description: 'Melancholic lofi for late nights.',
    category: 'Lofi',
    duration: '5:10',
    url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/SoundHelix-Song-16.mp3?alt=media&token=7c1f1f94-734d-4e94-817a-59b9e592750e',
    src: 'https://images.unsplash.com/photo-1526749837599-b428b1b51754?q=80&w=2574&auto=format&fit=crop',
    content: () => <p>Perfect for late-night drives or quiet contemplation. This lofi track features melancholic melodies and a steady beat, creating a reflective and calming mood.</p>,
  },
  // Meditation
  {
    id: 9,
    title: 'Tibetan Singing Bowls',
    description: 'Meditative and healing tones.',
    category: 'Meditation',
    duration: '9:15',
    url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/SoundHelix-Song-9.mp3?alt=media&token=d1d8a39a-7c9e-4e4b-9723-5e865f12e841',
    src: 'https://images.unsplash.com/photo-1544928140-65c382185a6a?q=80&w=2670&auto=format&fit=crop',
    content: () => <p>The resonant, healing sounds of Tibetan singing bowls. This track is designed for deep meditation, helping to balance your chakras and promote a sense of inner peace and clarity.</p>,
  },
  {
    id: 17,
    title: 'Guided Breath Meditation',
    description: 'A voice-guided breathing exercise.',
    category: 'Meditation',
    duration: '10:00',
    url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/SoundHelix-Song-9.mp3?alt=media&token=d1d8a39a-7c9e-4e4b-9723-5e865f12e841',
    src: 'https://images.unsplash.com/photo-1506126613408-4e61f3ee836a?q=80&w=2574&auto=format&fit=crop',
    content: () => <p>Follow a calm voice as it guides you through a simple but powerful breathing exercise. Perfect for beginners or anyone looking to anchor themselves in the present moment.</p>,
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
    const [isMuted, setIsMuted] = useState(false);
    const volumeRef = useRef(1);
    const [currentTime, setCurrentTime] = useState('0:00');
    const [duration, setDuration] = useState('0:00');
    const [isLooping, setIsLooping] = useState(false);
    const [isShuffled, setIsShuffled] = useState(false);
    const [shuffledTracks, setShuffledTracks] = useState<Track[]>([]);
    const [activeFilter, setActiveFilter] = useState('All');


    const audioRef = useRef<HTMLAudioElement>(null);
    const expandableCardRef = useRef<HTMLDivElement>(null);
    const id = useId();

    useOutsideClick(expandableCardRef, () => setActiveCard(null));
    
    const categories = useMemo(() => ['All', ...Array.from(new Set(staticTracks.map(t => t.category)))], []);
    
    const filteredTracks = useMemo(() => {
        if (activeFilter === 'All') return staticTracks;
        return staticTracks.filter(t => t.category === activeFilter);
    }, [activeFilter]);

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
        if (isNaN(timeInSeconds)) return '0:00';
        const seconds = Math.floor(timeInSeconds);
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

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

    const handleSkip = useCallback((direction: 'forward' | 'backward') => {
        if (!currentTrack) return;
        const playlist = isShuffled ? shuffledTracks : staticTracks;
        const currentIndex = playlist.findIndex(t => t.id === currentTrack.id);
        if (currentIndex === -1) return;
        
        let newIndex = direction === 'forward'
            ? (currentIndex + 1) % playlist.length
            : (currentIndex - 1 + playlist.length) % playlist.length;
        
        const newTrack = playlist[newIndex];
        if (newTrack) {
            handlePlayPause(newTrack);
        }

    }, [currentTrack, isShuffled, shuffledTracks, handlePlayPause]);
    
    const handleTrackEnded = useCallback(() => {
        if (!isLooping) {
            handleSkip('forward');
        }
    }, [isLooping, handleSkip]);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio || !currentTrack) return;

        const updateProgress = () => {
            setProgress((audio.currentTime / audio.duration) * 100 || 0);
            setCurrentTime(formatTime(audio.currentTime));
        };
        const setAudioData = () => {
            setDuration(formatTime(audio.duration));
        };
        
        audio.addEventListener('timeupdate', updateProgress);
        audio.addEventListener('loadedmetadata', setAudioData);
        audio.addEventListener('ended', handleTrackEnded);

        return () => {
          audio.removeEventListener('timeupdate', updateProgress);
          audio.removeEventListener('loadedmetadata', setAudioData);
          audio.removeEventListener('ended', handleTrackEnded);
        };
    }, [currentTrack, handleTrackEnded]);
    
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
            audioRef.current.muted = isMuted;
        }
    }, [volume, isMuted]);
    
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.loop = isLooping;
        }
    }, [isLooping]);

    const toggleShuffle = () => {
        setIsShuffled(prev => {
            const newShuffleState = !prev;
            if (newShuffleState) {
                const shuffled = [...staticTracks].sort(() => Math.random() - 0.5);
                setShuffledTracks(shuffled);
            }
            return newShuffleState;
        });
    };

    const handleMuteToggle = () => {
        setIsMuted(prev => {
            const newMutedState = !prev;
            if (newMutedState) {
                // Muting
                volumeRef.current = volume;
                setVolume(0);
            } else {
                // Unmuting
                setVolume(volumeRef.current > 0 ? volumeRef.current : 0.5);
            }
            return newMutedState;
        });
    };

    const handleVolumeChange = (value: number[]) => {
        const newVolume = value[0];
        setVolume(newVolume);
        volumeRef.current = newVolume;
        if (newVolume > 0 && isMuted) {
            setIsMuted(false);
        } else if (newVolume === 0 && !isMuted) {
            setIsMuted(true);
        }
    };
      
    return (
        <>
            <div className="flex flex-col items-center min-h-screen p-4 md:p-8">
                <div className="text-center my-12">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-br from-green-400 to-emerald-600">Audio Playlist</h1>
                    <p className="text-lg max-w-2xl mx-auto text-gray-400">A curated selection of sounds for focus, relaxation, and mindfulness.</p>
                </div>
                
                <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
                    {categories.map(category => (
                        <Button
                            key={category}
                            variant={activeFilter === category ? "default" : "outline"}
                            onClick={() => setActiveFilter(category)}
                            className={cn(
                                "rounded-full transition-all duration-300",
                                activeFilter === category
                                    ? 'bg-green-600 hover:bg-green-500 text-white'
                                    : 'bg-gray-800/50 border-green-500/20 text-green-300 hover:bg-gray-800 hover:text-green-200'
                            )}
                        >
                            {category}
                        </Button>
                    ))}
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
                                data-ai-hint="calm nature"
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
                
                <motion.ul layout className="w-full max-w-2xl mx-auto gap-4 flex flex-col">
                    <AnimatePresence>
                        {filteredTracks.map((track) => (
                        <motion.div
                            layout
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            key={`card-${track.title}-${id}`}
                            onClick={() => setActiveCard(track)}
                            className="p-4 flex flex-col md:flex-row justify-between items-center bg-gray-900/50 hover:bg-gray-800/70 rounded-xl cursor-pointer border border-green-500/10 hover:border-green-500/30 transition-colors"
                        >
                            <div className="flex gap-4 flex-col md:flex-row items-center w-full">
                            <motion.div layoutId={`image-${track.title}-${id}`}>
                                <Image
                                    width={56}
                                    height={56}
                                    src={track.src}
                                    alt={track.title}
                                    className="h-20 w-20 md:h-14 md:w-14 rounded-lg object-cover object-top"
                                    data-ai-hint="calm nature"
                                />
                            </motion.div>
                            <div className="flex-grow">
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
                            <motion.div
                                layoutId={`button-${track.title}-${id}`}
                                className="mt-4 md:mt-0 flex-shrink-0"
                            >
                                <Button size="icon" className="bg-green-600 hover:bg-green-500 rounded-full" onClick={(e) => { e.stopPropagation(); handlePlayPause(track); }}>
                                    {(isPlaying && currentTrack?.id === track.id) ? <Pause className="h-5 w-5"/> : <Play className="h-5 w-5"/>}
                                </Button>
                            </motion.div>
                            </div>
                        </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.ul>

                <audio ref={audioRef} />
            </div>

             <AnimatePresence>
                {currentTrack && (
                    <motion.div
                        initial={{ y: "110%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "110%" }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        className="fixed bottom-4 left-4 right-4 md:bottom-6 md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-md z-50"
                    >
                        <div className="relative bg-gray-900/60 backdrop-blur-xl border border-green-500/20 p-4 rounded-xl shadow-2xl overflow-hidden">
                           <div className="absolute inset-0 z-0 opacity-20">
                             <Image src={currentTrack.src} alt="Now playing background" fill className="object-cover" data-ai-hint="blurry music" />
                             <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent"></div>
                           </div>
                           <div className="relative z-10 flex flex-col gap-3">
                               <div className="flex items-center gap-4">
                                  <Image src={currentTrack.src} alt={currentTrack.title} width={56} height={56} className="rounded-md w-14 h-14 object-cover flex-shrink-0" data-ai-hint="music album" />
                                  <div className="flex-grow overflow-hidden">
                                       <p className="text-white font-semibold truncate">{currentTrack.title}</p>
                                       <p className="text-gray-400 text-sm truncate">{currentTrack.category}</p>
                                  </div>
                                  <button onClick={() => setCurrentTrack(null)} className="text-gray-400 hover:text-white flex-shrink-0 p-1">
                                    <X className="h-5 w-5" />
                                  </button>
                               </div>

                               <div className="flex flex-col gap-1">
                                    <Slider 
                                        value={[progress]} 
                                        max={100} 
                                        step={1} 
                                        className="[&>span:first-child]:h-1.5 [&>span>span]:h-1.5 [&>span>span]:bg-green-500"
                                        onValueChange={(value) => { if (audioRef.current) { audioRef.current.currentTime = (value[0] / 100) * audioRef.current.duration; }}}
                                    />
                                    <div className="flex justify-between text-xs text-gray-400">
                                        <span>{currentTime}</span>
                                        <span>{duration}</span>
                                    </div>
                               </div>

                               <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2 w-1/3">
                                        <Button variant="ghost" size="icon" className={cn("text-gray-400 hover:text-white rounded-full", isShuffled && "text-green-500")} onClick={toggleShuffle}>
                                           <Shuffle className="h-5 w-5" />
                                        </Button>
                                         <Button variant="ghost" size="icon" className={cn("text-gray-400 hover:text-white rounded-full", isLooping && "text-green-500")} onClick={() => setIsLooping(prev => !prev)}>
                                           <Repeat className="h-5 w-5" />
                                        </Button>
                                    </div>
                                    <div className="flex items-center gap-2 justify-center w-1/3">
                                        <Button variant="ghost" size="icon" className="text-white rounded-full" onClick={() => handleSkip('backward')}>
                                           <SkipBack className="h-5 w-5" />
                                        </Button>
                                        <Button size="icon" className="bg-green-600 hover:bg-green-500 rounded-full w-12 h-12" onClick={() => handlePlayPause(currentTrack)}>
                                            {isPlaying ? <Pause className="h-6 w-6"/> : <Play className="h-6 w-6"/>}
                                        </Button>
                                        <Button variant="ghost" size="icon" className="text-white rounded-full" onClick={() => handleSkip('forward')}>
                                           <SkipForward className="h-5 w-5" />
                                        </Button>
                                    </div>
                                    <div className="w-1/3 flex items-center justify-end gap-2">
                                         <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white rounded-full" onClick={handleMuteToggle}>
                                            {isMuted || volume === 0 ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                                         </Button>
                                        <Slider 
                                            value={[volume]}
                                            max={1} 
                                            step={0.01} 
                                            onValueChange={handleVolumeChange}
                                            className="w-20 [&>span:first-child]:h-1.5 [&>span>span]:h-1.5 [&>span>span]:bg-green-500"
                                        />
                                    </div>
                               </div>
                           </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
