
'use client';

import { useParams, notFound, useRouter } from 'next/navigation';
import { staticTracks } from '@/app/playlist/page';
import type { Track } from '@/app/playlist/types';
import { useEffect, useRef, useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, SkipBack, SkipForward, Repeat, Shuffle, Volume2, VolumeX, ListMusic, Calendar, User, Info, ArrowLeft, Tags, Clock } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import TextType from '@/components/ui/text-type';


export default function TrackDetailPage() {
    const params = useParams();
    const router = useRouter();
    const trackId = parseInt(params.trackId as string, 10);
    
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

    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        const track = staticTracks.find(t => t.id === trackId);
        if (track) {
            setCurrentTrack(track);
        } else {
            notFound();
        }
    }, [trackId]);

    const formatTime = (timeInSeconds: number) => {
        if (isNaN(timeInSeconds)) return '0:00';
        const seconds = Math.floor(timeInSeconds);
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const handlePlayPause = useCallback(() => {
        if (!currentTrack) return;
        if (isPlaying) {
            audioRef.current?.pause();
            setIsPlaying(false);
        } else {
            if(audioRef.current) {
                audioRef.current.src = currentTrack.url;
                audioRef.current.play().catch(e => console.error("Error playing audio:", e));
                setIsPlaying(true);
            }
        }
    }, [currentTrack, isPlaying]);

    const handleSkip = useCallback((direction: 'forward' | 'backward') => {
        if (!currentTrack) return;
        
        let playlist = staticTracks;
        if (isShuffled) {
            playlist = [...staticTracks].sort(() => Math.random() - 0.5);
        }
        
        const currentIndex = playlist.findIndex(t => t.id === currentTrack.id);
        if (currentIndex === -1) return;
        
        let newIndex = direction === 'forward'
            ? (currentIndex + 1) % playlist.length
            : (currentIndex - 1 + playlist.length) % playlist.length;
        
        const newTrack = playlist[newIndex];
        if (newTrack) {
            router.push(`/playlist/${newTrack.id}`);
        }

    }, [currentTrack, isShuffled, router]);
    
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

        if(isPlaying){
            audio.play().catch(e => console.error("Error resuming audio:", e));
        }

        return () => {
          audio.removeEventListener('timeupdate', updateProgress);
          audio.removeEventListener('loadedmetadata', setAudioData);
          audio.removeEventListener('ended', handleTrackEnded);
        };
    }, [currentTrack, handleTrackEnded, isPlaying]);
    
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

    const handleMuteToggle = () => {
        setIsMuted(prev => {
            const newMutedState = !prev;
            if (newMutedState) {
                volumeRef.current = volume;
                setVolume(0);
            } else {
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
      
    if (!currentTrack) {
        return <div className="flex h-screen items-center justify-center text-white">Loading...</div>;
    }

    return (
        <div className="relative flex flex-col min-h-screen overflow-hidden">
             <div className="absolute inset-0 z-0 opacity-30">
                 <Image src={currentTrack.src} alt="Now playing background" fill className="object-cover" data-ai-hint="blurry music" />
                 <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/80 to-transparent"></div>
             </div>
             <div className="absolute top-6 left-6 z-20">
                <Button onClick={() => router.push('/playlist')} variant="ghost" className="rounded-full text-white bg-black/30 backdrop-blur-md border border-white/10 hover:bg-white/10">
                    <ArrowLeft className="mr-2 h-5 w-5" /> Back to Playlist
                </Button>
            </div>
            <div className="relative z-10 flex flex-grow items-center justify-center p-4 md:p-8">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-6xl w-full"
                >
                    <Card className="bg-black/30 backdrop-blur-xl border-none shadow-2xl shadow-green-500/10 rounded-2xl overflow-hidden">
                       <div className="relative w-full aspect-square">
                            <Image 
                                src={currentTrack.src} 
                                alt={currentTrack.title}
                                fill
                                className="object-cover"
                                data-ai-hint="album art"
                                priority
                            />
                       </div>
                       <div className="p-6">
                            <div className="flex flex-col gap-3">
                                <div className="flex items-center justify-between">
                                    <div className="overflow-hidden">
                                        <h1 className="text-2xl font-bold text-white truncate">{currentTrack.title}</h1>
                                        <p className="text-gray-400 truncate">{currentTrack.artist}</p>
                                    </div>
                                    <div className="flex-shrink-0 flex items-center gap-2">
                                        <Button variant="ghost" size="icon" className={cn("text-gray-400 hover:text-white rounded-full", isShuffled && "text-green-500")} onClick={() => setIsShuffled(p => !p)}>
                                            <Shuffle className="h-5 w-5" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className={cn("text-gray-400 hover:text-white rounded-full", isLooping && "text-green-500")} onClick={() => setIsLooping(p => !p)}>
                                            <Repeat className="h-5 w-5" />
                                        </Button>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="text-xs text-gray-400">{currentTime}</span>
                                    <Slider 
                                        value={[progress]} 
                                        max={100} 
                                        step={1} 
                                        className="flex-grow [&>span:first-child]:h-1.5 [&>span>span]:h-1.5 [&>span>span]:bg-green-500"
                                        onValueChange={(value) => { if (audioRef.current) { audioRef.current.currentTime = (value[0] / 100) * audioRef.current.duration; }}}
                                    />
                                    <span className="text-xs text-gray-400">{duration}</span>
                               </div>
                               <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white rounded-full" onClick={handleMuteToggle}>
                                           {isMuted || volume === 0 ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                                        </Button>
                                       <Slider 
                                           value={[volume]}
                                           max={1} 
                                           step={0.01} 
                                           onValueChange={handleVolumeChange}
                                           className="w-24 [&>span:first-child]:h-1.5 [&>span>span]:h-1.5 [&>span>span]:bg-green-500"
                                       />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Button variant="ghost" size="icon" className="text-white rounded-full" onClick={() => handleSkip('backward')}>
                                            <SkipBack className="h-5 w-5" />
                                        </Button>
                                        <Button size="icon" className="bg-green-600 hover:bg-green-500 rounded-full w-14 h-14" onClick={handlePlayPause}>
                                            {isPlaying ? <Pause className="h-7 w-7"/> : <Play className="h-7 w-7"/>}
                                        </Button>
                                        <Button variant="ghost" size="icon" className="text-white rounded-full" onClick={() => handleSkip('forward')}>
                                            <SkipForward className="h-5 w-5" />
                                        </Button>
                                    </div>
                               </div>
                           </div>
                       </div>
                    </Card>

                    <div className="flex flex-col justify-center text-white">
                        <TextType as="h2" text={currentTrack.title} className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-br from-green-400 to-emerald-600" />

                        <div className="space-y-6 text-gray-300 backdrop-blur-sm bg-black/20 p-6 rounded-xl border border-white/10">
                            <div className="flex items-start gap-4">
                                <ListMusic className="h-5 w-5 mt-1 text-green-400 flex-shrink-0" />
                                <div>
                                    <h3 className="font-semibold text-white">Description</h3>
                                    <p>{currentTrack.description}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <Info className="h-5 w-5 mt-1 text-green-400 flex-shrink-0" />
                                <div>
                                    <h3 className="font-semibold text-white">Why You Should Listen</h3>
                                    <div>{currentTrack.reasonToListen}</div>
                                </div>
                            </div>
                             <div className="flex items-start gap-4">
                                <User className="h-5 w-5 mt-1 text-green-400 flex-shrink-0" />
                                <div>
                                    <h3 className="font-semibold text-white">Artist</h3>
                                    <p>{currentTrack.artist}</p>
                                </div>
                            </div>
                             <div className="flex items-start gap-4">
                                <Tags className="h-5 w-5 mt-1 text-green-400 flex-shrink-0" />
                                <div>
                                    <h3 className="font-semibold text-white">Category</h3>
                                    <p>{currentTrack.category}</p>
                                </div>
                            </div>
                             <div className="flex items-start gap-4">
                                <Clock className="h-5 w-5 mt-1 text-green-400 flex-shrink-0" />
                                <div>
                                    <h3 className="font-semibold text-white">Duration</h3>
                                    <p>{currentTrack.duration}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <Calendar className="h-5 w-5 mt-1 text-green-400 flex-shrink-0" />
                                <div>
                                    <h3 className="font-semibold text-white">Release Date</h3>
                                    <p>{currentTrack.releaseDate}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
            <audio ref={audioRef} src={currentTrack.url} />
        </div>
    );
}

