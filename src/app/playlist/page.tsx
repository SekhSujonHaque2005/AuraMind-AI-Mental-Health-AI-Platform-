
'use client';

import { useState, useRef, useEffect, useCallback, useId, useMemo, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, Music, Volume2, X, SkipForward, SkipBack, Repeat, Shuffle, VolumeX, Search, Wand2, Loader2, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Slider } from '@/components/ui/slider';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { findTrackWithAI } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import type { Track } from '@/app/playlist/types';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import TextType from '@/components/ui/text-type';

const staticTracks: Track[] = [
  // Ambient (10 tracks)
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
   { id: 101, title: 'Azure Twilight', category: 'Ambient', duration: '5:45', url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/SoundHelix-Song-1.mp3?alt=media&token=e9e6b8a8-8e6d-4d7a-8b83-2d2b512c9b4e', description: 'Sounds of the sky at dusk.', src: 'https://images.unsplash.com/photo-1487621167305-5d248087c824?q=80&w=2670&auto=format&fit=crop', content: () => <p>As the day ends, let the gentle sounds of twilight bring you peace.</p> },
  { id: 102, title: 'Crystal Caves', category: 'Ambient', duration: '6:10', url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/SoundHelix-Song-12.mp3?alt=media&token=e9e6b8a8-8e6d-4d7a-8b83-2d2b512c9b4e', description: 'Echoes in a serene cavern.', src: 'https://images.unsplash.com/photo-1521634602699-1a3c58805f15?q=80&w=2670&auto=format&fit=crop', content: () => <p>The resonant echoes of a crystal cave, perfect for deep thought.</p> },
  { id: 103, title: 'Whispering Winds', category: 'Ambient', duration: '4:30', url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/SoundHelix-Song-13.mp3?alt=media&token=e9e6b8a8-8e6d-4d7a-8b83-2d2b512c9b4e', description: 'The gentle caress of a breeze.', src: 'https://images.unsplash.com/photo-1505537172344-62950b37497d?q=80&w=2670&auto=format&fit=crop', content: () => <p>Listen to the soft whispers of the wind as it travels through the trees.</p> },
  { id: 104, title: 'Starlight Drone', category: 'Ambient', duration: '8:00', url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/SoundHelix-Song-1.mp3?alt=media&token=e9e6b8a8-8e6d-4d7a-8b83-2d2b512c9b4e', description: 'The hum of the cosmos.', src: 'https://images.unsplash.com/photo-1464802686167-b939a6910659?q=80&w=2666&auto=format&fit=crop', content: () => <p>A continuous drone that captures the essence of a starlit night.</p> },
  { id: 105, title: 'Subtle Awakening', category: 'Ambient', duration: '5:20', url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/SoundHelix-Song-12.mp3?alt=media&token=e9e6b8a8-8e6d-4d7a-8b83-2d2b512c9b4e', description: 'A soft transition into awareness.', src: 'https://images.unsplash.com/photo-1433838552652-f9a46b332c40?q=80&w=2670&auto=format&fit=crop', content: () => <p>A gentle track designed to ease you into a state of mindful awareness.</p> },
  { id: 106, title: 'Forgotten Valley', category: 'Ambient', duration: '7:30', url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/SoundHelix-Song-13.mp3?alt=media&token=e9e6b8a8-8e6d-4d7a-8b83-2d2b512c9b4e', description: 'Misty and mysterious soundscapes.', src: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?q=80&w=2670&auto=format&fit=crop', content: () => <p>Explore the sounds of a hidden, misty valley, untouched by time.</p> },
  { id: 107, title: 'Aurora\'s Veil', category: 'Ambient', duration: '6:50', url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/SoundHelix-Song-1.mp3?alt=media&token=e9e6b8a8-8e6d-4d7a-8b83-2d2b512c9b4e', description: 'The sound of celestial lights.', src: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?q=80&w=2670&auto=format&fit=crop', content: () => <p>A soundscape inspired by the dancing lights of the aurora borealis.</p> },
  
  // Nature (10 tracks)
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
   { id: 201, title: 'Babbling Brook', category: 'Nature', duration: '5:15', url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/SoundHelix-Song-2.mp3?alt=media&token=c27f7f90-1c64-4e2b-9c2b-23218e888496', description: 'The gentle flow of a small stream.', src: 'https://images.unsplash.com/photo-1517823382935-519709180a56?q=80&w=2670&auto=format&fit=crop', content: () => <p>The peaceful sound of water flowing over rocks in a mountain brook.</p> },
  { id: 202, title: 'Summer Night Crickets', category: 'Nature', duration: '6:00', url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/SoundHelix-Song-11.mp3?alt=media&token=c27f7f90-1c64-4e2b-9c2b-23218e888496', description: 'The chorus of crickets on a warm night.', src: 'https://images.unsplash.com/photo-1530484553528-364d8b8c28f1?q=80&w=2670&auto=format&fit=crop', content: () => <p>Relax to the classic, calming sound of crickets chirping on a summer evening.</p> },
  { id: 203, title: 'Jungle Life', category: 'Nature', duration: '7:20', url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/SoundHelix-Song-2.mp3?alt=media&token=c27f7f90-1c64-4e2b-9c2b-23218e888496', description: 'The vibrant sounds of the rainforest.', src: 'https://images.unsplash.com/photo-1552083375-1447ce886485?q=80&w=2670&auto=format&fit=crop', content: () => <p>An immersive soundscape filled with the calls of exotic birds and insects.</p> },
  { id: 204, title: 'Mountain Wind', category: 'Nature', duration: '5:50', url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/SoundHelix-Song-11.mp3?alt=media&token=c27f7f90-1c64-4e2b-9c2b-23218e888496', description: 'The sound of wind on a high peak.', src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2670&auto=format&fit=crop', content: () => <p>Feel the crisp, clean air with the sound of wind whipping across a mountain summit.</p> },
  { id: 205, title: 'Desert Solitude', category: 'Nature', duration: '6:30', url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/SoundHelix-Song-2.mp3?alt=media&token=c27f7f90-1c64-4e2b-9c2b-23218e888496', description: 'The quiet expanse of the desert.', src: 'https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?q=80&w=2670&auto=format&fit=crop', content: () => <p>A minimalist soundscape capturing the profound silence of the desert.</p> },
  { id: 206, title: 'Autumn Leaves', category: 'Nature', duration: '4:40', url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/SoundHelix-Song-11.mp3?alt=media&token=c27f7f90-1c64-4e2b-9c2b-23218e888496', description: 'The crunch of leaves underfoot.', src: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=2670&auto=format&fit=crop', content: () => <p>The satisfying crunch of dry autumn leaves, perfect for a virtual fall walk.</p> },
  { id: 207, title: 'Distant Thunder', category: 'Nature', duration: '8:10', url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/SoundHelix-Song-2.mp3?alt=media&token=c27f7f90-1c64-4e2b-9c2b-23218e888496', description: 'The rumble of a far-off storm.', src: 'https://images.unsplash.com/photo-1594736341297-0d32b515f189?q=80&w=2670&auto=format&fit=crop', content: () => <p>The low, comforting rumble of a distant thunderstorm, without the rain.</p> },
  { id: 208, title: 'Arctic Chill', category: 'Nature', duration: '7:00', url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/SoundHelix-Song-11.mp3?alt=media&token=c27f7f90-1c64-4e2b-9c2b-23218e888496', description: 'The sound of ice and polar winds.', src: 'https://images.unsplash.com/photo-1549643445-b48c48685413?q=80&w=2574&auto=format&fit=crop', content: () => <p>A crisp, cold soundscape featuring the sounds of cracking ice and arctic winds.</p> },

  // Water Sounds (10 tracks)
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
  { id: 301, title: 'Light Rain', category: 'Water Sounds', duration: '6:20', url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/SoundHelix-Song-3.mp3?alt=media&token=3b3d9d37-2a4c-4e89-8d76-880479132104', description: 'Soft pitter-patter of raindrops.', src: 'https://images.unsplash.com/photo-1519692933481-e162a57d6721?q=80&w=2670&auto=format&fit=crop', content: () => <p>The gentle sound of a light rain shower, perfect for cozy relaxation.</p> },
  { id: 302, title: 'Heavy Downpour', category: 'Water Sounds', duration: '7:40', url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/SoundHelix-Song-7.mp3?alt=media&token=83a0e5b3-3a7a-428a-867c-1eda7f4d2f83', description: 'The intense sound of a thunderstorm.', src: 'https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?q=80&w=2574&auto=format&fit=crop', content: () => <p>The powerful, cleansing sound of a heavy rainstorm with distant thunder.</p> },
  { id: 303, title: 'Waterfall Cascade', category: 'Water Sounds', duration: '5:00', url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/SoundHelix-Song-3.mp3?alt=media&token=3b3d9d37-2a4c-4e89-8d76-880479132104', description: 'The roar of a powerful waterfall.', src: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?q=80&w=2670&auto=format&fit=crop', content: () => <p>The majestic and constant roar of a large waterfall, full of natural power.</p> },
  { id: 304, title: 'Lakeside Peace', category: 'Water Sounds', duration: '6:50', url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/SoundHelix-Song-7.mp3?alt=media&token=83a0e5b3-3a7a-428a-867c-1eda7f4d2f83', description: 'Gentle lapping of water on a shore.', src: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2670&auto=format&fit=crop', content: () => <p>The tranquil sound of water gently lapping against a lakeshore.</p> },
  { id: 305, title: 'Underwater Calm', category: 'Water Sounds', duration: '8:30', url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/SoundHelix-Song-3.mp3?alt=media&token=3b3d9d37-2a4c-4e89-8d76-880479132104', description: 'Muffled sounds from beneath the surface.', src: 'https://images.unsplash.com/photo-1536599018102-9f803c140fc1?q=80&w=2670&auto=format&fit=crop', content: () => <p>A serene, muffled soundscape that mimics the experience of being underwater.</p> },
  { id: 306, title: 'Rain on a Tent', category: 'Water Sounds', duration: '7:10', url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/SoundHelix-Song-7.mp3?alt=media&token=83a0e5b3-3a7a-428a-867c-1eda7f4d2f83', description: 'Cozy sound of rain on canvas.', src: 'https://images.unsplash.com/photo-1504851149312-7a075b496cc7?q=80&w=2578&auto=format&fit=crop', content: () => <p>The ultimate cozy sound: gentle rain falling on a canvas tent.</p> },
  { id: 307, title: 'Dripping Cave', category: 'Water Sounds', duration: '5:40', url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/SoundHelix-Song-3.mp3?alt=media&token=3b3d9d37-2a4c-4e89-8d76-880479132104', description: 'Echoing drips in a cavern.', src: 'https://images.unsplash.com/photo-1567380993213-f853d9e36e19?q=80&w=2670&auto=format&fit=crop', content: () => <p>The rhythmic and resonant sound of water dripping inside a large cave.</p> },
  { id: 308, title: 'River Flow', category: 'Water Sounds', duration: '6:00', url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/SoundHelix-Song-7.mp3?alt=media&token=83a0e5b3-3a7a-428a-867c-1eda7f4d2f83', description: 'The steady flow of a wide river.', src: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?q=80&w=2670&auto=format&fit=crop', content: () => <p>The constant, powerful sound of a wide river flowing through a landscape.</p> },

  // Instrumental (10 tracks)
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
  { id: 401, title: 'Cello Solitude', category: 'Instrumental', duration: '6:15', url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/SoundHelix-Song-4.mp3?alt=media&token=7d0b8e9a-7a54-4c46-888e-6704b2b1a473', description: 'A deep and resonant cello piece.', src: 'https://images.unsplash.com/photo-1588254199349-835154c15b9b?q=80&w=2670&auto=format&fit=crop', content: () => <p>The rich, emotional sound of a solo cello, perfect for introspection.</p> },
  { id: 402, title: 'Flute Meditation', category: 'Instrumental', duration: '5:30', url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/SoundHelix-Song-14.mp3?alt=media&token=7d0b8e9a-7a54-4c46-888e-6704b2b1a473', description: 'A calming flute melody.', src: 'https://images.unsplash.com/photo-1512499617640-b74ae3a79d37?q=80&w=2574&auto=format&fit=crop', content: () => <p>A simple, airy flute melody to guide your meditation practice.</p> },
  { id: 403, title: 'Harp Dreams', category: 'Instrumental', duration: '7:00', url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/SoundHelix-Song-4.mp3?alt=media&token=7d0b8e9a-7a54-4c46-888e-6704b2b1a473', description: 'Ethereal and magical harp music.', src: 'https://images.unsplash.com/photo-1542695570-205b31c1a93b?q=80&w=2670&auto=format&fit=crop', content: () => <p>Let the enchanting sound of the harp carry you away to a world of dreams.</p> },
  { id: 404, title: 'Violin Contemplation', category: 'Instrumental', duration: '4:50', url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/SoundHelix-Song-14.mp3?alt=media&token=7d0b8e9a-7a54-4c46-888e-6704b2b1a473', description: 'A thoughtful and melodic violin piece.', src: 'https://images.unsplash.com/photo-1612087596184-4359cb3a514d?q=80&w=2670&auto=format&fit=crop', content: () => <p>A solo violin piece designed to evoke deep thought and contemplation.</p> },
  { id: 405, title: 'Orchestral Calm', category: 'Instrumental', duration: '8:20', url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/SoundHelix-Song-4.mp3?alt=media&token=7d0b8e9a-7a54-4c46-888e-6704b2b1a473', description: 'A gentle, sweeping orchestral score.', src: 'https://images.unsplash.com/photo-1586944692735-2d4128522336?q=80&w=2670&auto=format&fit=crop', content: () => <p>A soothing piece of orchestral music to calm your mind and lift your spirits.</p> },
  { id: 406, title: 'Kalimba Notes', category: 'Instrumental', duration: '5:00', url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/SoundHelix-Song-14.mp3?alt=media&token=7d0b8e9a-7a54-4c46-888e-6704b2b1a473', description: 'The gentle plucking of a thumb piano.', src: 'https://images.unsplash.com/photo-1601168393690-485c2b65745d?q=80&w=2670&auto=format&fit=crop', content: () => <p>The simple, pleasant sound of a kalimba, perfect for a light and happy mood.</p> },
  { id: 407, title: 'Hang Drum Harmony', category: 'Instrumental', duration: '6:45', url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/SoundHelix-Song-4.mp3?alt=media&token=7d0b8e9a-7a54-4c46-888e-6704b2b1a473', description: 'Hypnotic hang drum rhythms.', src: 'https://images.unsplash.com/photo-1582236166543-33a0b3a43628?q=80&w=2670&auto=format&fit=crop', content: () => <p>The hypnotic and meditative tones of a hang drum, ideal for focus.</p> },
  { id: 408, title: 'Synth Pad Wash', category: 'Instrumental', duration: '9:00', url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/SoundHelix-Song-14.mp3?alt=media&token=7d0b8e9a-7a54-4c46-888e-6704b2b1a473', description: 'A warm, evolving synth pad.', src: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=2574&auto=format&fit=crop', content: () => <p>A long, evolving synth pad that creates a warm and immersive sonic blanket.</p> },
  
  // Binaural (10 tracks)
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
    src: 'https://images.unsplash.com/photo-1558985250-2d41285b3421?q=80&w=2670&auto=format&fit=crop',
    content: () => <p>Gently guide your brain into an alpha state with these 8-12Hz binaural beats. This frequency is associated with relaxed, peaceful awareness, making it ideal for stress reduction and light meditation. Use headphones for the best effect.</p>,
  },
  { id: 501, title: 'Theta Wave Meditation', category: 'Binaural', duration: '8:00', url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/SoundHelix-Song-5.mp3?alt=media&token=2d1a3c6f-7c1c-4b5a-9b1a-28952044810f', description: '4-8Hz for deep meditation.', src: 'https://images.unsplash.com/photo-1506126613408-4e61f3ee836a?q=80&w=2574&auto=format&fit=crop', content: () => <p>Access deep meditative states with Theta wave frequencies (4-8Hz). Use headphones.</p> },
  { id: 502, title: 'Delta Wave Sleep', category: 'Binaural', duration: '10:00', url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/SoundHelix-Song-15.mp3?alt=media&token=2d1a3c6f-7c1c-4b5a-9b1a-28952044810f', description: '0.5-4Hz for deep sleep.', src: 'https://images.unsplash.com/photo-1444703686981-a3abbc4d42e2?q=80&w=2670&auto=format&fit=crop', content: () => <p>Promote deep, restorative sleep with Delta wave frequencies (0.5-4Hz). Use headphones.</p> },
  { id: 503, title: 'Beta Wave Concentration', category: 'Binaural', duration: '5:00', url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/SoundHelix-Song-5.mp3?alt=media&token=2d1a3c6f-7c1c-4b5a-9b1a-28952044810f', description: '12-30Hz for active thinking.', src: 'https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?q=80&w=2670&auto=format&fit=crop', content: () => <p>Enhance your focus and problem-solving skills with Beta waves (12-30Hz). Use headphones.</p> },
  { id: 504, title: 'Gamma Wave Creativity', category: 'Binaural', duration: '6:30', url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/SoundHelix-Song-15.mp3?alt=media&token=2d1a3c6f-7c1c-4b5a-9b1a-28952044810f', description: '30-100Hz for high-level processing.', src: 'https://images.unsplash.com/photo-1518773553398-650c184e0bb3?q=80&w=2670&auto=format&fit=crop', content: () => <p>Boost creativity and cognitive processing with high-frequency Gamma waves. Use headphones.</p> },
  { id: 505, title: 'Solfeggio 528Hz', category: 'Binaural', duration: '9:00', url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/SoundHelix-Song-5.mp3?alt=media&token=2d1a3c6f-7c1c-4b5a-9b1a-28952044810f', description: 'The "love frequency" for healing.', src: 'https://images.unsplash.com/photo-1544928140-65c382185a6a?q=80&w=2670&auto=format&fit=crop', content: () => <p>The famous 528Hz Solfeggio frequency, associated with love and miracles. Use headphones.</p> },
  { id: 506, title: 'Solfeggio 417Hz', category: 'Binaural', duration: '8:45', url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/SoundHelix-Song-15.mp3?alt=media&token=2d1a3c6f-7c1c-4b5a-9b1a-28952044810f', description: 'For clearing negativity.', src: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2670&auto=format&fit=crop', content: () => <p>The 417Hz Solfeggio frequency, used for clearing traumatic experiences and negativity. Use headphones.</p> },
  { id: 507, title: 'Anxiety Relief (10Hz)', category: 'Binaural', duration: '7:15', url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/SoundHelix-Song-5.mp3?alt=media&token=2d1a3c6f-7c1c-4b5a-9b1a-28952044810f', description: 'Alpha waves for anxiety reduction.', src: 'https://images.unsplash.com/photo-1588072432836-e10032774350?q=80&w=2672&auto=format&fit=crop', content: () => <p>A 10Hz Alpha wave track specifically designed for anxiety relief. Use headphones.</p> },
  { id: 508, title: 'Pain Relief (15Hz)', category: 'Binaural', duration: '6:00', url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/SoundHelix-Song-15.mp3?alt=media&token=2d1a3c6f-7c1c-4b5a-9b1a-28952044810f', description: 'Beta waves for pain management.', src: 'https://images.unsplash.com/photo-1477334232858-894c73562a04?q=80&w=2670&auto=format&fit=crop', content: () => <p>A 15Hz Beta wave track that may help with chronic pain management. Use headphones.</p> },

  // Soundscape (10 tracks)
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
  { id: 601, title: 'Busy Library', category: 'Soundscape', duration: '8:00', url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/SoundHelix-Song-6.mp3?alt=media&token=8d48a04b-3c48-4334-a151-dd2199127814', description: 'The quiet hum of a grand library.', src: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=2670&auto=format&fit=crop', content: () => <p>The gentle rustling of pages and distant whispers of a library, ideal for focus.</p> },
  { id: 602, title: 'City Park Ambience', category: 'Soundscape', duration: '7:15', url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/SoundHelix-Song-10.mp3?alt=media&token=7d0b8e9a-7a54-4c46-888e-6704b2b1a473', description: 'The sounds of a peaceful city park.', src: 'https://images.unsplash.com/photo-1545249625-27a7c7350a30?q=80&w=2670&auto=format&fit=crop', content: () => <p>The distant city hum mixed with children playing and birds chirping in a park.</p> },
  { id: 603, title: 'Cozy Cabin in a Storm', category: 'Soundscape', duration: '9:30', url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/SoundHelix-Song-6.mp3?alt=media&token=8d48a04b-3c48-4334-a151-dd2199127814', description: 'Fire, wind, and rain outside.', src: 'https://images.unsplash.com/photo-1600585152220-903636b65c8f?q=80&w=2670&auto=format&fit=crop', content: () => <p>The ultimate cozy experience: a crackling fire inside while a storm rages outside.</p> },
  { id: 604, title: 'Cat Purring', category: 'Soundscape', duration: '10:00', url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/SoundHelix-Song-10.mp3?alt=media&token=7d0b8e9a-7a54-4c46-888e-6704b2b1a473', description: 'The calming purr of a cat.', src: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?q=80&w=2670&auto=format&fit=crop', content: () => <p>The gentle, rhythmic purring of a contented cat, known to reduce stress.</p> },
  { id: 605, title: 'Old Sailing Ship', category: 'Soundscape', duration: '7:50', url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/SoundHelix-Song-6.mp3?alt=media&token=8d48a04b-3c48-4334-a151-dd2199127814', description: 'Creaking wood and ocean sounds.', src: 'https://images.unsplash.com/photo-1593454472338-9b63a6936a2d?q=80&w=2669&auto=format&fit=crop', content: () => <p>The creaking of wooden planks and the sound of the ocean from an old ship.</p> },
  { id: 606, title: 'Train Journey', category: 'Soundscape', duration: '8:40', url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/SoundHelix-Song-10.mp3?alt=media&token=7d0b8e9a-7a54-4c46-888e-6704b2b1a473', description: 'The rhythmic clatter of a train.', src: 'https://images.unsplash.com/photo-1495562569060-2eec283d3391?q=80&w=2670&auto=format&fit=crop', content: () => <p>The steady, rhythmic sound of a train on the tracks, perfect for focus or sleep.</p> },
  { id: 607, title: 'Spaceship Bridge', category: 'Soundscape', duration: '10:00', url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/SoundHelix-Song-6.mp3?alt=media&token=8d48a04b-3c48-4334-a151-dd2199127814', description: 'The gentle hum of a starship.', src: 'https://images.unsplash.com/photo-1614728263952-84ea256ec677?q=80&w=2574&auto=format&fit=crop', content: () => <p>The low hum and occasional beep from the bridge of a spaceship, for futuristic focus.</p> },
  { id: 608, title: 'Tibetan Monastery', category: 'Soundscape', duration: '9:00', url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/SoundHelix-Song-10.mp3?alt=media&token=7d0b8e9a-7a54-4c46-888e-6704b2b1a473', description: 'Chants and bowls from a monastery.', src: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=2671&auto=format&fit=crop', content: () => <p>The serene ambiance of a Tibetan monastery, with distant chants and bowls.</p> },

  // Lofi (10 tracks)
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
  { id: 801, title: 'Sunday Morning', category: 'Lofi', duration: '4:30', url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/SoundHelix-Song-8.mp3?alt=media&token=7c1f1f94-734d-4e94-817a-59b9e592750e', description: 'Relaxed beats for a lazy day.', src: 'https://images.unsplash.com/photo-1506477331477-33d5d8b3dc85?q=80&w=2534&auto=format&fit=crop', content: () => <p>The perfect soundtrack for a slow, lazy Sunday morning with a cup of coffee.</p> },
  { id: 802, title: 'Rainy Day Lofi', category: 'Lofi', duration: '5:45', url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/SoundHelix-Song-16.mp3?alt=media&token=7c1f1f94-734d-4e94-817a-59b9e592750e', description: 'Cozy beats for a rainy day.', src: 'https://images.unsplash.com/photo-1496034663057-6245f11be793?q=80&w=2670&auto=format&fit=crop', content: () => <p>A lofi track with the added ambiance of gentle rain, perfect for staying indoors.</p> },
  { id: 803, title: 'Focus Flow', category: 'Lofi', duration: '6:20', url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/SoundHelix-Song-8.mp3?alt=media&token=7c1f1f94-734d-4e94-817a-59b9e592750e', description: 'Instrumentals for deep work.', src: 'https://images.unsplash.com/photo-1522199755839-a2bacb67c546?q=80&w=2672&auto=format&fit=crop', content: () => <p>A steady, unobtrusive lofi beat designed to help you get into a state of flow.</p> },
  { id: 804, title: 'Stargazing Lofi', category: 'Lofi', duration: '5:00', url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/SoundHelix-Song-16.mp3?alt=media&token=7c1f1f94-734d-4e94-817a-59b9e592750e', description: 'Dreamy beats for looking at the stars.', src: 'https://images.unsplash.com/photo-1538370965246-fe2be6ce14352?q=80&w=2670&auto=format&fit=crop', content: () => <p>A spacey, dreamy lofi track perfect for late-night stargazing sessions.</p> },
  { id: 805, title: 'Cozy Cafe Lofi', category: 'Lofi', duration: '6:00', url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/SoundHelix-Song-8.mp3?alt=media&token=7c1f1f94-734d-4e94-817a-59b9e592750e', description: 'Lofi beats with cafe ambiance.', src: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?q=80&w=2670&auto=format&fit=crop', content: () => <p>A warm lofi track mixed with the gentle background noise of a coffee shop.</p> },
  { id: 806, title: 'Autumn Walk Lofi', category: 'Lofi', duration: '4:45', url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/SoundHelix-Song-16.mp3?alt=media&token=7c1f1f94-734d-4e94-817a-59b9e592750e', description: 'Crisp beats for a cool day.', src: 'https://images.unsplash.com/photo-1477322524744-0eece9e79640?q=80&w=2552&auto=format&fit=crop', content: () => <p>A lofi track with a crisp, clean beat, reminiscent of a cool autumn day.</p> },
  { id: 807, title: 'Late Night Coding', category: 'Lofi', duration: '7:30', url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/SoundHelix-Song-8.mp3?alt=media&token=7c1f1f94-734d-4e94-817a-59b9e592750e', description: 'Beats for programmers.', src: 'https://images.unsplash.com/photo-1550439062-609e1531270e?q=80&w=2670&auto=format&fit=crop', content: () => <p>A long, focused lofi track designed for late-night coding or study sessions.</p> },
  { id: 808, title: 'Beachside Lofi', category: 'Lofi', duration: '5:20', url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/SoundHelix-Song-16.mp3?alt=media&token=7c1f1f94-734d-4e94-817a-59b9e592750e', description: 'Relaxed beats with ocean sounds.', src: 'https://images.unsplash.com/photo-1509233725247-49e657c54213?q=80&w=2549&auto=format&fit=crop', content: () => <p>A chilled-out lofi track with the gentle sound of ocean waves in the background.</p> },

  // Meditation (10 tracks)
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
  { id: 901, title: '5-Minute Mindful Break', category: 'Meditation', duration: '5:00', url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/SoundHelix-Song-9.mp3?alt=media&token=d1d8a39a-7c9e-4e4b-9723-5e865f12e841', description: 'A short break to reset your day.', src: 'https://images.unsplash.com/photo-1597843793698-a2b6b45f6159?q=80&w=2670&auto=format&fit=crop', content: () => <p>A quick, 5-minute guided meditation to help you reset and refocus during a busy day.</p> },
  { id: 902, title: 'Body Scan Meditation', category: 'Meditation', duration: '15:00', url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/SoundHelix-Song-9.mp3?alt=media&token=d1d8a39a-7c9e-4e4b-9723-5e865f12e841', description: 'Connect with your physical self.', src: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2720&auto=format&fit=crop', content: () => <p>A guided body scan meditation to help you connect with your body and release tension.</p> },
  { id: 903, title: 'Loving-Kindness Meditation', category: 'Meditation', duration: '12:00', url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/SoundHelix-Song-9.mp3?alt=media&token=d1d8a39a-7c9e-4e4b-9723-5e865f12e841', description: 'Cultivate compassion for self and others.', src: 'https://images.unsplash.com/photo-1593181827448-9b8e8a69a3b4?q=80&w=2670&auto=format&fit=crop', content: () => <p>A guided meditation focused on developing feelings of goodwill, kindness, and warmth.</p> },
  { id: 904, title: 'Walking Meditation Guide', category: 'Meditation', duration: '10:00', url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/SoundHelix-Song-9.mp3?alt=media&token=d1d8a39a-7c9e-4e4b-9723-5e865f12e841', description: 'Mindfulness in motion.', src: 'https://images.unsplash.com/photo-1509384313239-00171a547a46?q=80&w=2670&auto=format&fit=crop', content: () => <p>A guided walking meditation to help you practice mindfulness while in motion.</p> },
  { id: 905, title: 'Zen Garden Ambience', category: 'Meditation', duration: '20:00', url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/SoundHelix-Song-9.mp3?alt=media&token=d1d8a39a-7c9e-4e4b-9723-5e865f12e841', description: 'Sounds of a peaceful Zen garden.', src: 'https://images.unsplash.com/photo-1540998145399-a5442795b3a5?q=80&w=2574&auto=format&fit=crop', content: () => <p>An unguided soundscape of a Japanese Zen garden for long meditation sessions.</p> },
  { id: 906, title: 'Gratitude Meditation', category: 'Meditation', duration: '8:00', url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/SoundHelix-Song-9.mp3?alt=media&token=d1d8a39a-7c9e-4e4b-9723-5e865f12e841', description: 'Focus on what you are thankful for.', src: 'https://images.unsplash.com/photo-1518432031354-7b6a4808a3b4?q=80&w=2670&auto=format&fit=crop', content: () => <p>A guided meditation to help you cultivate a sense of gratitude and appreciation.</p> },
  { id: 907, title: 'Silent Meditation Timer', category: 'Meditation', duration: '30:00', url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/SoundHelix-Song-9.mp3?alt=media&token=d1d8a39a-7c9e-4e4b-9723-5e865f12e841', description: 'A timer with bells for unguided practice.', src: 'https://images.unsplash.com/photo-1508213639515-e0b04c59a3b4?q=80&w=2670&auto=format&fit=crop', content: () => <p>A 30-minute timer with gentle bells at the beginning, middle, and end for your own practice.</p> },
  { id: 908, title: 'Chakra Balancing Sounds', category: 'Meditation', duration: '14:00', url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/SoundHelix-Song-9.mp3?alt=media&token=d1d8a39a-7c9e-4e4b-9723-5e865f12e841', description: 'Tones for each of the 7 chakras.', src: 'https://images.unsplash.com/photo-1558537348-4359cb3a514d?q=80&w=2670&auto=format&fit=crop', content: () => <p>A sequence of sounds and frequencies designed to help align and balance your chakras.</p> },
];

const TrackCard = ({
    track,
    onPlay,
    onMouseEnter,
    onMouseLeave,
    isPlaying,
}: {
    track: Track;
    onPlay: (track: Track) => void;
    onMouseEnter: (track: Track) => void;
    onMouseLeave: () => void;
    isPlaying: boolean;
}) => {
    return (
        <motion.div 
            layout="position" 
            className="w-full"
            onMouseEnter={() => onMouseEnter(track)}
            onMouseLeave={onMouseLeave}
        >
            <Card
                onClick={(e) => { e.stopPropagation(); onPlay(track); }}
                className={cn(
                    "flex flex-col bg-black/30 backdrop-blur-md border hover:border-green-400/50 transition-all duration-300 transform hover:-translate-y-1 rounded-2xl overflow-hidden group cursor-pointer"
                )}
            >
                <div className="relative w-full h-40 overflow-hidden">
                    <Image
                        src={track.src}
                        alt={track.title}
                        fill
                        className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                        data-ai-hint="calm nature"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                         <div className="bg-black/50 rounded-full p-3">
                             {isPlaying ? <Pause className="h-8 w-8 text-white"/> : <Play className="h-8 w-8 text-white"/>}
                         </div>
                    </div>
                     <div className="absolute bottom-4 left-4">
                        <h3 className="text-xl font-bold text-white tracking-tight">{track.title}</h3>
                    </div>
                </div>
            </Card>
        </motion.div>
    );
};

const TrackPreviewPopup = ({ track, position, onPlay, isPlaying }: { track: Track, position: { x: number, y: number }, onPlay: (track: Track) => void, isPlaying: boolean }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed z-50 w-full max-w-sm pointer-events-none"
            style={{
                left: position.x,
                top: position.y,
                transform: `translate(${position.x > window.innerWidth / 2 ? '-100%' : '0%'}, -50%)`, // Adjust position based on screen half
            }}
        >
            <Card className="bg-gray-900/80 backdrop-blur-lg border border-green-500/30 shadow-2xl shadow-green-500/10">
                <CardHeader>
                    <Image
                        src={track.src}
                        alt={track.title}
                        width={400}
                        height={200}
                        className="rounded-t-lg object-cover w-full h-40"
                    />
                </CardHeader>
                <CardContent>
                    <h3 className="text-xl font-bold text-white">{track.title}</h3>
                    <p className="text-gray-400 mt-2 text-sm">{track.description}</p>
                     <div className="text-gray-300 text-sm mt-4">{track.content()}</div>
                </CardContent>
                <CardFooter>
                    <Button onClick={(e) => { e.stopPropagation(); onPlay(track); }} className="w-full bg-green-600 hover:bg-green-500 transition-all group/button pointer-events-auto">
                        {isPlaying ? <Pause className="mr-2 h-5 w-5"/> : <Play className="mr-2 h-5 w-5"/>}
                        {isPlaying ? 'Pause' : 'Play'}
                    </Button>
                </CardFooter>
            </Card>
        </motion.div>
    )
}

export default function AudioPlaylistPage() {
    const [hoveredTrack, setHoveredTrack] = useState<Track | null>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
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
    const [searchQuery, setSearchQuery] = useState('');
    const [isAiSearching, startAiSearchTransition] = useTransition();
    const [aiRecommendedTrackId, setAiRecommendedTrackId] = useState<number | null>(null);

    const { toast } = useToast();
    const audioRef = useRef<HTMLAudioElement>(null);
    const id = useId();
    
    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            setMousePosition({ x: event.clientX + 20, y: event.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);
    
    const categories = useMemo(() => ['All', ...Array.from(new Set(staticTracks.map(t => t.category)))], []);
    
    const filteredTracks = useMemo(() => {
        let tracks = staticTracks;

        if (activeFilter !== 'All') {
            tracks = tracks.filter(t => t.category === activeFilter);
        }

        if (searchQuery) {
            const lowerCaseQuery = searchQuery.toLowerCase();
            tracks = tracks.filter(t => 
                t.title.toLowerCase().includes(lowerCaseQuery) || 
                t.description.toLowerCase().includes(lowerCaseQuery)
            );
        }
        
        return tracks;
    }, [activeFilter, searchQuery]);

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
      
    const handleAiSearch = () => {
        if (!searchQuery.trim()) {
            toast({ variant: 'destructive', title: 'Empty Search', description: 'Please enter what you want to search for.' });
            return;
        }
        startAiSearchTransition(async () => {
            const trackMetada = staticTracks.map(({ id, title, description }) => ({ id, title, description }));
            const result = await findTrackWithAI({ query: searchQuery, tracks: trackMetada });

            if (result.error) {
                toast({ variant: 'destructive', title: 'AI Search Failed', description: result.error });
                setAiRecommendedTrackId(null);
            } else if (result.trackId) {
                const recommendedTrack = staticTracks.find(t => t.id === result.trackId);
                if (recommendedTrack) {
                    setActiveFilter(recommendedTrack.category);
                    setAiRecommendedTrackId(result.trackId);
                    toast({ title: 'AI Recommendation', description: `Found "${recommendedTrack.title}" for you.` });
                }
            } else {
                 toast({ title: 'No specific match found', description: 'Try refining your search query.' });
                 setAiRecommendedTrackId(null);
            }
        });
    }

    const handleSearchKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleAiSearch();
        }
    };
    
    useEffect(() => {
        if (aiRecommendedTrackId) {
            const cardElement = document.getElementById(`card-${aiRecommendedTrackId}-${id}`);
            if (cardElement) {
                cardElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            const timer = setTimeout(() => setAiRecommendedTrackId(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [aiRecommendedTrackId, id]);

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


    return (
        <>
            <div className="flex flex-col min-h-screen p-4 md:p-8 overflow-x-hidden">
                 <div className="absolute inset-0 -z-10 h-full w-full">
                    <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"></div>
                    <div className="absolute left-0 right-0 top-[-10%] h-[1000px] w-[1000px] rounded-full bg-[radial-gradient(circle_400px_at_50%_300px,#22c55e33,transparent)]"></div>
                </div>

                <div className="text-center my-12 flex flex-col items-center">
                    <TextType
                        as="h1"
                        text="Audio Playlist"
                        typingSpeed={60}
                        loop={false}
                        className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-br from-green-400 to-emerald-600"
                    />
                    <TextType
                        text="A curated selection of sounds for focus, relaxation, and mindfulness."
                        typingSpeed={20}
                        initialDelay={1500}
                        loop={false}
                        className="text-lg max-w-2xl mx-auto text-gray-400"
                    />
                </div>
                
                <div className="w-full max-w-7xl mx-auto mb-8 sticky top-4 z-20 px-2">
                    <div className="relative flex items-center gap-2 bg-gray-900/60 backdrop-blur-xl border border-green-500/20 p-2 rounded-xl shadow-lg">
                        <Search className="h-5 w-5 text-gray-400 ml-2"/>
                        <Input 
                            placeholder="Search for sounds or ask AI (e.g., 'sound for focus')..."
                            className="bg-transparent border-none text-white focus-visible:ring-0 focus-visible:ring-offset-0"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={handleSearchKeyDown}
                        />
                        <Button
                           onClick={handleAiSearch}
                           className="bg-green-600 hover:bg-green-500 text-white rounded-lg flex-shrink-0"
                           disabled={isAiSearching}
                        >
                            {isAiSearching ? <Loader2 className="h-5 w-5 animate-spin" /> : <Wand2 className="h-5 w-5"/>}
                            <span className="ml-2 hidden md:inline">Search with AI</span>
                        </Button>
                    </div>
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
                <div className="w-full max-w-7xl mx-auto">
                    <motion.div 
                        layout 
                        className="grid gap-6 md:grid-cols-2 xl:grid-cols-3 w-full"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <AnimatePresence>
                            {filteredTracks.map((track) => (
                                <motion.div
                                    layout
                                    key={`card-motion-${track.id}-${id}`}
                                    variants={itemVariants}
                                    className={cn(
                                        "group",
                                        aiRecommendedTrackId === track.id && 'ring-2 ring-green-400/80 rounded-2xl'
                                    )}
                                    id={`card-${track.id}-${id}`}
                                >
                                    <TrackCard
                                        key={track.id}
                                        track={track}
                                        onMouseEnter={setHoveredTrack}
                                        onMouseLeave={() => setHoveredTrack(null)}
                                        onPlay={() => handlePlayPause(track)}
                                        isPlaying={isPlaying && currentTrack?.id === track.id}
                                    />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </div>
                
                 <AnimatePresence>
                    {hoveredTrack && (
                        <TrackPreviewPopup 
                            track={hoveredTrack}
                            position={mousePosition}
                            onPlay={() => handlePlayPause(hoveredTrack)}
                            isPlaying={isPlaying && currentTrack?.id === hoveredTrack.id}
                        />
                    )}
                 </AnimatePresence>


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
