
'use client';

import { useState, useRef, useEffect, useCallback, useMemo, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, Music, Volume2, X, SkipForward, SkipBack, Repeat, Shuffle, VolumeX, Search, Wand2, Loader2, Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Slider } from '@/components/ui/slider';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import type { Track } from '@/app/playlist/types';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import TextType from '@/components/ui/text-type';
import { useRouter } from 'next/navigation';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export const staticTracks: Track[] = [
  // Ambient (10 tracks)
  {
    id: 1,
    title: 'Peaceful Morning',
    artist: 'Ambient Dreams',
    releaseDate: '2023-01-15',
    description: 'A gentle start to your day.',
    category: 'Ambient',
    duration: '5:01',
    url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/Peaceful%20Morning.mp3?alt=media&token=96b0a75a-c321-4250-b4a7-ed1d86aad64d',
    src: 'https://images.pexels.com/photos/1486974/pexels-photo-1486974.jpeg?cs=srgb&dl=pexels-souvenirpixels-1486974.jpg&fm=jpg',
    reasonToListen: <ul className="list-disc list-inside space-y-1"><li>Ease into your day with this calming ambient track.</li><li>Perfect for meditation, yoga, or a quiet cup of coffee.</li><li>Let the gentle tones wash over you and clear your mind.</li></ul>,
  },
  {
    id: 12,
    title: 'Floating Through Space',
    artist: 'Cosmic Voyager',
    releaseDate: '2023-02-20',
    description: 'Cosmic sounds for deep relaxation.',
    category: 'Ambient',
    duration: '6:30',
    url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/Floating%20Through%20Space.mp3?alt=media&token=89609cd9-de4a-4794-be15-5c136c17475d',
    src: 'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?q=80&w=2671&auto=format&fit=crop',
    reasonToListen: <ul className="list-disc list-inside space-y-1"><li>Drift away into the cosmos with this ethereal ambient track.</li><li>Creates a feeling of weightlessness and serenity.</li><li>Ideal for deep meditation or unwinding after a stressful day.</li></ul>,
  },
  {
    id: 13,
    title: 'Dreamy Vistas',
    artist: 'Cloud Surfer',
    releaseDate: '2023-03-10',
    description: 'Lush soundscapes for imagination.',
    category: 'Ambient',
    duration: '7:15',
    url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/Dreamy%20Vistas.mp3?alt=media&token=572131f3-7827-4227-b55a-7a4493086257',
    src: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2532&auto=format&fit=crop',
    reasonToListen: <ul className="list-disc list-inside space-y-1"><li>Let your mind wander through beautiful, imaginary landscapes.</li><li>Perfect for creative work, journaling, or visualization.</li><li>The lush sounds help spark imagination and inspiration.</li></ul>,
  },
  { id: 102, title: 'Crystal Caves', artist: 'Echoes', releaseDate: '2023-04-05', category: 'Ambient', duration: '6:10', url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/Crystal%20Caves.mp3?alt=media&token=0f63f590-cc0f-4e2b-a0a7-bf400628b2c5', description: 'Echoes in a serene cavern.', src: 'https://plus.unsplash.com/premium_photo-1673491311222-0b65ed5cf0ae?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y3J5c3RhbCUyMGNhdmV8ZW58MHx8MHx8fDA%3D', reasonToListen: <ul className="list-disc list-inside space-y-1"><li>The resonant echoes of a crystal cave.</li><li>Perfect for deep thought and focused work.</li><li>Creates a serene and slightly mysterious atmosphere.</li></ul> },
  { id: 103, title: 'Whispering Winds', artist: 'Aura', releaseDate: '2023-04-12', category: 'Ambient', duration: '4:30', url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/Whispering%20Winds.mp3?alt=media&token=a98957d8-26cc-46f2-82ba-877f48490d93', description: 'The gentle caress of a breeze.', src: 'https://miro.medium.com/v2/resize:fit:1400/1*87rtELiYihvrNL3Ew-DKSw.jpeg', reasonToListen: <ul className="list-disc list-inside space-y-1"><li>Listen to the soft whispers of the wind.</li><li>Ideal for clearing your head and feeling refreshed.</li><li>Connects you with the gentle side of nature.</li></ul> },
  { id: 104, title: 'Starlight Drone', artist: 'Stellaron', releaseDate: '2023-04-20', category: 'Ambient', duration: '8:00', url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/Starlight%20Drone.mp3?alt=media&token=50744528-e183-4382-a44e-c3acf1631915', description: 'The hum of the cosmos.', src: 'https://images.unsplash.com/photo-1464802686167-b939a6910659?q=80&w=2666&auto=format&fit=crop', reasonToListen: <ul className="list-disc list-inside space-y-1"><li>A continuous drone that captures the essence of a starlit night.</li><li>Perfect for long periods of focus or meditation.</li><li>Helps in feeling vast and connected to the universe.</li></ul> },
  { id: 105, title: 'Subtle Awakening', artist: 'Dawn', releaseDate: '2023-05-01', category: 'Ambient', duration: '5:20', url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/Subtle%20Awakening.mp3?alt=media&token=95fa2259-a834-4a83-9ca3-df5a6d5eabf9', description: 'A soft transition into awareness.', src: 'https://images.unsplash.com/photo-1433838552652-f9a46b332c40?q=80&w=2670&auto=format&fit=crop', reasonToListen: <ul className="list-disc list-inside space-y-1"><li>A gentle track designed to ease you into a state of mindful awareness.</li><li>Ideal for the start of a meditation session or a slow morning.</li><li>Avoids jarring sounds for a smooth transition.</li></ul> },
  { id: 106, title: 'Forgotten Valley', artist: 'Mist', releaseDate: '2023-05-15', category: 'Ambient', duration: '7:30', url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/Forgotten%20Valley.mp3?alt=media&token=9eba8cb0-b908-4c88-88fd-f10ba4c73599', description: 'Misty and mysterious soundscapes.', src: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?q=80&w=2670&auto=format&fit=crop', reasonToListen: <ul className="list-disc list-inside space-y-1"><li>Explore the sounds of a hidden, misty valley, untouched by time.</li><li>Sparks curiosity and a sense of wonder.</li><li>Great for creative writing or deep contemplation.</li></ul> },
  { id: 107, title: 'Aurora\'s Veil', artist: 'Celeste', releaseDate: '2023-05-25', category: 'Ambient', duration: '6:50', url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/Aurora\'s%20Veil.mp3?alt=media&token=463ef1c3-b943-4e06-b456-5748eca7664e', description: 'The sound of celestial lights.', src: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?q=80&w=2670&auto=format&fit=crop', reasonToListen: <ul className="list-disc list-inside space-y-1"><li>A soundscape inspired by the dancing lights of the aurora borealis.</li><li>Fills you with a sense of awe and wonder.</li><li>Perfect for relaxation and stress relief.</li></ul> },
  
  // Nature (10 tracks)
  {
    id: 2,
    title: 'Forest Walk',
    artist: 'Nature Sounds',
    releaseDate: '2023-01-20',
    description: 'Sounds of nature and tranquility.',
    category: 'Nature',
    duration: '4:49',
    url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/Forest%20Walk.mp3?alt=media&token=7e072495-31f6-489d-aa95-968f5c7c414e',
    src: 'https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=2670&auto=format&fit=crop',
    reasonToListen: <ul className="list-disc list-inside space-y-1"><li>Immerse yourself in the serene soundscape of a forest.</li><li>The gentle rustling of leaves and distant bird calls create a perfect atmosphere for focus.</li><li>Ideal for relaxation and connecting with nature.</li></ul>,
  },
  {
    id: 11,
    title: 'Chirping Birds',
    artist: 'Nature Sounds',
    releaseDate: '2023-02-15',
    description: 'A cheerful morning chorus.',
    category: 'Nature',
    duration: '3:50',
    url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/Chirping%20Birds.mp3?alt=media&token=2d001e62-a3d4-430c-9022-299ffa4fd9f6',
    src: 'https://images.pexels.com/photos/459198/pexels-photo-459198.jpeg?cs=srgb&dl=pexels-pixabay-459198.jpg&fm=jpg',
    reasonToListen: <ul className="list-disc list-inside space-y-1"><li>Wake up to the happy and uplifting sounds of birds chirping.</li><li>Perfect for starting your day with a positive and energetic vibe.</li><li>Connects you with the beauty and liveliness of nature.</li></ul>,
  },
   { id: 201, title: 'Babbling Brook', artist: 'Nature Sounds', releaseDate: '2023-03-01', category: 'Nature', duration: '5:15', url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/Babbling%20Brook.mp3?alt=media&token=f6a7eb29-1269-44a6-85cb-6732fb6182ae', description: 'The gentle flow of a small stream.', src: 'https://burst.shopifycdn.com/photos/water-flowing-over-a-babbling-brook.jpg?exif=0&iptc=0', reasonToListen: <ul className="list-disc list-inside space-y-1"><li>The peaceful sound of water flowing over rocks.</li><li>Excellent for meditation and reducing stress.</li><li>Creates a sense of peace and natural flow.</li></ul> },
  { id: 202, title: 'Summer Night Crickets', artist: 'Nature Sounds', releaseDate: '2023-06-10', category: 'Nature', duration: '6:00', url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/Summer%20Night%20Crickets.mp3?alt=media&token=b2015119-8c53-4379-8e7b-b0ee53a3d078', description: 'The chorus of crickets on a warm night.', src: 'https://thumbs.dreamstime.com/b/cricket-perched-slender-blade-grass-set-against-clear-starry-night-sky-insect-s-wings-antennae-visible-375490035.jpg', reasonToListen: <ul className="list-disc list-inside space-y-1"><li>Relax to the classic, calming sound of crickets.</li><li>Perfect for a warm summer evening or for falling asleep.</li><li>Brings a sense of nostalgia and peace.</li></ul> },
  { id: 203, title: 'Jungle Life', artist: 'Nature Sounds', releaseDate: '2023-06-20', category: 'Nature', duration: '7:20', url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/Jungle%20Life.mp3?alt=media&token=ad813347-24f1-4456-9c95-d1b68e1c07a6', description: 'The vibrant sounds of the rainforest.', src: 'https://images.unsplash.com/photo-1552083375-1447ce886485?q=80&w=2670&auto=format&fit=crop', reasonToListen: <ul className="list-disc list-inside space-y-1"><li>An immersive soundscape filled with exotic birds and insects.</li><li>Sparks a sense of adventure and discovery.</li><li>Great for creative work or feeling energized by nature.</li></ul> },
  { id: 204, title: 'Mountain Wind', artist: 'Nature Sounds', releaseDate: '2023-07-05', category: 'Nature', duration: '5:50', url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/Mountain%20Wind.mp3?alt=media&token=fd04dfe0-0eaf-4442-bf04-d250ac7766a7', description: 'The sound of wind on a high peak.', src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2670&auto=format&fit=crop', reasonToListen: <ul className="list-disc list-inside space-y-1"><li>Feel the crisp, clean air with the sound of wind on a summit.</li><li>Promotes a feeling of freedom and expansiveness.</li><li>Ideal for clearing your mind and finding perspective.</li></ul> },
  { id: 205, title: 'Desert Solitude', artist: 'Nature Sounds', releaseDate: '2023-07-15', category: 'Nature', duration: '6:30', url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/Desert%20Solitude.mp3?alt=media&token=067ca402-86a8-4482-a7fb-46df2a6e5977', description: 'The quiet expanse of the desert.', src: 'https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?q=80&w=2670&auto=format&fit=crop', reasonToListen: <ul className="list-disc list-inside space-y-1"><li>A minimalist soundscape capturing profound silence.</li><li>Excellent for deep meditation and introspection.</li><li>Helps you find peace in simplicity.</li></ul> },
  { id: 206, title: 'Autumn Leaves', artist: 'Nature Sounds', releaseDate: '2023-10-10', category: 'Nature', duration: '4:40', url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/Autumn%20Leaves.mp3?alt=media&token=ba28ec06-ae85-467a-b5c6-748a7baa5b23', description: 'The crunch of leaves underfoot.', src: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=2670&auto=format&fit=crop', reasonToListen: <ul className="list-disc list-inside space-y-1"><li>The satisfying crunch of dry autumn leaves.</li><li>Perfect for a virtual fall walk and evoking cozy feelings.</li><li>Brings a sense of change and transition.</li></ul> },
  { id: 207, title: 'Distant Thunder', artist: 'Nature Sounds', releaseDate: '2023-08-01', category: 'Nature', duration: '8:10', url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/Distant%20Thunder.mp3?alt=media&token=888406b0-253b-4e0f-ad4d-06ee041b9572', description: 'The rumble of a far-off storm.', src: 'https://cdn.pixabay.com/photo/2025/07/14/17/07/sea-9714469_1280.jpg', reasonToListen: <ul className="list-disc list-inside space-y-1"><li>The low, comforting rumble of a distant thunderstorm.</li><li>Creates a cozy and safe feeling.</li><li>Ideal for relaxation without the sound of rain.</li></ul> },
  { id: 208, title: 'Arctic Chill', artist: 'Nature Sounds', releaseDate: '2023-12-05', category: 'Nature', duration: '7:00', url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/Arctic%20Chill.mp3?alt=media&token=921f6099-2245-484e-99e7-34f8309ac172', description: 'The sound of ice and polar winds.', src: 'https://images.unsplash.com/photo-1418985991508-e47386d96a71?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YXJjdGljJTIwbGFuZHNjYXBlfGVufDB8fDB8fHww', reasonToListen: <ul className="list-disc list-inside space-y-1"><li>A crisp, cold soundscape with cracking ice and wind.</li><li>Promotes a feeling of stillness and clarity.</li><li>Excellent for focused work in a quiet environment.</li></ul> },

  // Water Sounds (10 tracks)
  {
    id: 3,
    title: 'Gentle Stream',
    artist: 'Water Harmonics',
    releaseDate: '2023-01-25',
    description: 'The soothing flow of water.',
    category: 'Water Sounds',
    duration: '5:27',
    url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/Gentle%20Stream.mp3?alt=media&token=59313e62-2915-4d99-b231-4bd4177510c0',
    src: 'https://images.unsplash.com/photo-1536584754829-12214d404f32?q=80&w=2574&auto=format&fit=crop',
    reasonToListen: <ul className="list-disc list-inside space-y-1"><li>Let the continuous, gentle sound of a flowing stream wash away your stress.</li><li>Ideal for creating a peaceful environment for studying or working.</li><li>Helps in unwinding after a long day.</li></ul>,
  },
  {
    id: 7,
    title: 'Ocean Waves',
    artist: 'Water Harmonics',
    releaseDate: '2023-02-05',
    description: 'The rhythmic crash of ocean waves.',
    category: 'Water Sounds',
    duration: '8:05',
    url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/Ocean%20Waves.mp3?alt=media&token=0ee4affb-8078-415d-8708-afd70c652634',
    src: 'https://plus.unsplash.com/premium_photo-1667149988377-0e326e842beb?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8b2NlYW4lMjB3YXZlc3xlbnwwfHwwfHx8MA%3D%3D',
    reasonToListen: <ul className="list-disc list-inside space-y-1"><li>Transport yourself to a serene beach with rhythmic ocean sounds.</li><li>Perfect for falling asleep, meditating, or creating a peaceful backdrop.</li><li>The constant motion of the waves is deeply calming.</li></ul>,
  },
  { id: 301, title: 'Light Rain', artist: 'Water Harmonics', releaseDate: '2023-03-15', category: 'Water Sounds', duration: '6:20', url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/Light%20Rain.mp3?alt=media&token=59b40806-93f0-47f0-8f3e-39d1c5bd263a', description: 'Soft pitter-patter of raindrops.', src: 'https://images.unsplash.com/photo-1519692933481-e162a57d6721?q=80&w=2670&auto=format&fit=crop', reasonToListen: <ul className="list-disc list-inside space-y-1"><li>The gentle sound of a light rain shower.</li><li>Perfect for cozy relaxation and reading.</li><li>Creates a feeling of comfort and security.</li></ul> },
  { id: 302, title: 'Heavy Downpour', artist: 'Water Harmonics', releaseDate: '2023-03-20', category: 'Water Sounds', duration: '7:40', url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/Heavy%20Downpour.mp3?alt=media&token=7f24169e-db5a-4703-b44d-5ea3713cfaec', description: 'The intense sound of a thunderstorm.', src: 'https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?q=80&w=2574&auto=format&fit=crop', reasonToListen: <ul className="list-disc list-inside space-y-1"><li>The powerful, cleansing sound of a heavy rainstorm.</li><li>Includes distant thunder for a dramatic effect.</li><li>Great for blocking out other noises and focusing.</li></ul> },
  { id: 303, title: 'Waterfall Cascade', artist: 'Water Harmonics', releaseDate: '2023-04-01', category: 'Water Sounds', duration: '5:00', url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/Waterfall%20Cascade.mp3?alt=media&token=e9aa401b-c619-4615-823f-18c8f748ec99', description: 'The roar of a powerful waterfall.', src: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?q=80&w=2670&auto=format&fit=crop', reasonToListen: <ul className="list-disc list-inside space-y-1"><li>The majestic and constant roar of a large waterfall.</li><li>Full of natural power and energy.</li><li>Can help mask tinnitus and other background noises.</li></ul> },
  { id: 304, title: 'Lakeside Peace', artist: 'Water Harmonics', releaseDate: '2023-04-10', category: 'Water Sounds', duration: '6:50', url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/Lakeside%20Peace.mp3?alt=media&token=3b8fe820-b02c-4b98-bf02-d559d56d6c54', description: 'Gentle lapping of water on a shore.', src: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2670&auto=format&fit=crop', reasonToListen: <ul className="list-disc list-inside space-y-1"><li>The tranquil sound of water gently lapping against a lakeshore.</li><li>Promotes a sense of calm and stillness.</li><li>Ideal for quiet contemplation and relaxation.</li></ul> },
  { id: 305, title: 'Underwater Calm', artist: 'Water Harmonics', releaseDate: '2023-05-05', category: 'Water Sounds', duration: '8:30', url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/Underwater%20Calm.mp3?alt=media&token=8cc94ecf-a617-4ad6-9624-44b0346a9046', description: 'Muffled sounds from beneath the surface.', src: 'https://images.unsplash.com/photo-1536599018102-9f803c140fc1?q=80&w=2670&auto=format&fit=crop', reasonToListen: <ul className="list-disc list-inside space-y-1"><li>A serene, muffled soundscape that mimics being underwater.</li><li>Creates a feeling of being in a safe, quiet cocoon.</li><li>Perfect for escaping a noisy environment.</li></ul> },
  { id: 306, title: 'Rain on a Tent', artist: 'Water Harmonics', releaseDate: '2023-05-20', category: 'Water Sounds', duration: '7:10', url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/Rain%20on%20a%20Tent%20.mp3?alt=media&token=fe4ae88b-55ca-43d1-b89b-bbd1f356e923', description: 'Cozy sound of rain on canvas.', src: 'https://images.unsplash.com/photo-1504851149312-7a075b496cc7?q=80&w=2578&auto=format&fit=crop', reasonToListen: <ul className="list-disc list-inside space-y-1"><li>The ultimate cozy sound: gentle rain falling on a canvas tent.</li><li>Promotes feelings of safety, warmth, and comfort.</li><li>Excellent for falling asleep or relaxing on a lazy day.</li></ul> },
  { id: 307, title: 'Dripping Cave', artist: 'Water Harmonics', releaseDate: '2023-06-01', category: 'Water Sounds', duration: '5:40', url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/Dripping%20Cave.mp3?alt=media&token=8eb635f2-0e47-4cf4-8d5e-471553147085', description: 'Echoing drips in a cavern.', src: 'https://i0.wp.com/www.hcn.org/wp-content/uploads/2023/08/caves-feature-splash.jpg?fit=2000%2C1334&quality=100&ssl=1', reasonToListen: <ul className="list-disc list-inside space-y-1"><li>The rhythmic and resonant sound of water dripping in a large cave.</li><li>A great tool for meditation and focus.</li><li>The echoes create a deep and immersive soundscape.</li></ul> },
  { id: 308, title: 'River Flow', artist: 'Water Harmonics', releaseDate: '2023-06-15', category: 'Water Sounds', duration: '6:00', url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/River%20Flow%20.mp3?alt=media&token=c90fd784-8524-4452-8cb3-eb00844f7d2b', description: 'The steady flow of a wide river.', src: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?q=80&w=2670&auto=format&fit=crop', reasonToListen: <ul className="list-disc list-inside space-y-1"><li>The constant, powerful sound of a wide river.</li><li>Represents steady progress and constant change.</li><li>A great background for productive work.</li></ul> },

  // Instrumental (10 tracks)
  {
    id: 4,
    title: 'Mindful Piano',
    artist: 'Pianissimo',
    releaseDate: '2023-01-30',
    description: 'A soft, instrumental piece.',
    category: 'Instrumental',
    duration: '4:21',
    url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/Mindful%20Piano.mp3?alt=media&token=3868361c-84bc-4e4f-bb48-474d7c479662',
    src: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGlhbm98ZW58MHx8MHx8fDA%3D',
    reasonToListen: <ul className="list-disc list-inside space-y-1"><li>A beautiful and simple piano melody to help you find your center.</li><li>The minimalist composition provides a backdrop of calm without being distracting.</li><li>Encourages a state of mindfulness and peace.</li></ul>,
  },
  {
    id: 14,
    title: 'Acoustic Guitar Serenity',
    artist: 'String Theory',
    releaseDate: '2023-02-25',
    description: 'Warm and gentle guitar strings.',
    category: 'Instrumental',
    duration: '5:55',
    url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/Acoustic%20Guitar%20Serenity%20.mp3?alt=media&token=c333b9b3-7401-4947-825a-e060d2c5c35b',
    src: 'https://plus.unsplash.com/premium_photo-1671934973818-8529ac9c4d2d?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YWNvdXN0aWMlMjBndWl0YXJ8ZW58MHx8MHx8fDA%3D',
    reasonToListen: <ul className="list-disc list-inside space-y-1"><li>Unwind with the warm, gentle tones of an acoustic guitar.</li><li>This simple, melodic piece is perfect for a quiet evening.</li><li>Creates a peaceful and intimate atmosphere for reading or relaxing.</li></ul>,
  },
  { id: 401, title: 'Cello Solitude', artist: 'Sonata', releaseDate: '2023-03-05', category: 'Instrumental', duration: '6:15', url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/Cello%20Solitude.mp3?alt=media&token=e0fafcf6-8f99-43d0-8096-7560db7d9de0', description: 'A deep and resonant cello piece.', src: 'https://img.freepik.com/free-photo/full-shot-woman-with-double-bass_23-2149154271.jpg?semt=ais_hybrid&w=740&q=80', reasonToListen: <ul className="list-disc list-inside space-y-1"><li>The rich, emotional sound of a solo cello.</li><li>Perfect for introspection and feeling your emotions.</li><li>Creates a deep and contemplative mood.</li></ul> },
  { id: 402, title: 'Flute Meditation', artist: 'Aria', releaseDate: '2023-03-25', category: 'Instrumental', duration: '5:30', url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/Flute%20Meditation%20.mp3?alt=media&token=c8ae4b26-1df7-4450-aec2-058089897fe2', description: 'A calming flute melody.', src: 'https://thumbs.dreamstime.com/b/bansuri-flute-peacock-feather-lotus-flowers-aroma-candles-creating-relaxing-atmosphere-pink-lying-dark-textured-398594296.jpg', reasonToListen: <ul className="list-disc list-inside space-y-1"><li>A simple, airy flute melody to guide your meditation.</li><li>Helps to quiet the mind and focus on your breath.</li><li>Light and uplifting, perfect for finding calm.</li></ul> },
  { id: 403, title: 'Harp Dreams', artist: 'Lyra', releaseDate: '2023-04-15', category: 'Instrumental', duration: '7:00', url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/Harp%20Dreams.mp3?alt=media&token=af38d8d9-0454-45df-90a9-045dfe22200b', description: 'Ethereal and magical harp music.', src: 'https://burst.shopifycdn.com/photos/harp-musical-instrument-in-shadows.jpg?exif=0&iptc=0', reasonToListen: <ul className="list-disc list-inside space-y-1"><li>Let the enchanting sound of the harp carry you away.</li><li>Creates a magical and dreamlike atmosphere.</li><li>Ideal for relaxation, sleep, or creative visualization.</li></ul> },
  { id: 404, title: 'Violin Contemplation', artist: 'Adagio', releaseDate: '2023-04-28', category: 'Instrumental', duration: '4:50', url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/Violin%20Contemplation.mp3?alt=media&token=8ab4b66f-6539-4492-a16c-aff3a764bf68', description: 'A thoughtful and melodic violin piece.', src: 'https://images.pexels.com/photos/111287/pexels-photo-111287.jpeg?cs=srgb&dl=pexels-conojeghuo-111287.jpg&fm=jpg', reasonToListen: <ul className="list-disc list-inside space-y-1"><li>A solo violin piece designed to evoke deep thought.</li><li>Its melodic nature is both beautiful and calming.</li><li>Perfect for journaling or quiet reflection.</li></ul> },
  { id: 405, title: 'Orchestral Calm', artist: 'Symphonia', releaseDate: '2023-05-10', category: 'Instrumental', duration: '8:20', url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/Orchestral%20Calm.mp3?alt=media&token=6f1b3c8a-5b05-4c2b-b8b5-ac8a8ae79fe8', description: 'A gentle, sweeping orchestral score.', src: 'https://plus.unsplash.com/premium_photo-1664303098722-7e5287a4693b?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8b3JjaGVzdHJhfGVufDB8fDB8fHww', reasonToListen: <ul className="list-disc list-inside space-y-1"><li>A soothing piece of orchestral music to calm your mind.</li><li>Lifts your spirits with its gentle, sweeping score.</li><li>Creates a cinematic and inspiring atmosphere.</li></ul> },
  { id: 406, title: 'Kalimba Notes', artist: 'Pluck', releaseDate: '2023-05-22', category: 'Instrumental', duration: '5:00', url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/Kalimba%20Notes.mp3?alt=media&token=0937c7f4-3795-42a2-87e0-a5ac451839d6', description: 'The gentle plucking of a thumb piano.', src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDOK2wFChMvLF9TU2171RZN54ZWNYg8nEmRg&s', reasonToListen: <ul className="list-disc list-inside space-y-1"><li>The simple, pleasant sound of a kalimba (thumb piano).</li><li>Perfect for a light, happy, and carefree mood.</li><li>Its gentle plucking is both playful and relaxing.</li></ul> },
  { id: 407, title: 'Hang Drum Harmony', artist: 'Resonance', releaseDate: '2023-06-05', category: 'Instrumental', duration: '6:45', url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/Hang%20Drum%20Harmony.mp3?alt=media&token=bfaa17b2-c283-4ff3-a8d3-dc5a62a70dde', description: 'Hypnotic hang drum rhythms.', src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1Pg5ok0EbDAZzSUEA_N-NkqUFFbGQvO2BfE-kIhailrcbEKJHogomUO9gBYQoMG_0Y2U&usqp=CAU', reasonToListen: <ul className="list-disc list-inside space-y-1"><li>The hypnotic and meditative tones of a hang drum.</li><li>Ideal for focus, trance-like states, and deep work.</li><li>Its unique sound is both grounding and ethereal.</li></ul> },
  { id: 408, title: 'Synth Pad Wash', artist: 'Atmos', releaseDate: '2023-06-25', category: 'Instrumental', duration: '9:00', url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/Synth%20Pad%20Wash%20.mp3?alt=media&token=40ebb091-3b36-4252-849b-1bbeb971e8f2', description: 'A warm, evolving synth pad.', src: 'https://unison.audio/wp-content/uploads/What-are-Synth-Pads.png.webp', reasonToListen: <ul className="list-disc list-inside space-y-1"><li>A long, evolving synth pad that creates a warm sonic blanket.</li><li>Perfect for immersive relaxation and blocking out distractions.</li><li>Helps to create a continuous, stable sound environment.</li></ul> },
  
  // Binaural (10 tracks)
  {
    id: 5,
    title: 'Deep Focus (50Hz)',
    artist: 'Mind Waves',
    releaseDate: '2023-02-01',
    description: 'Binaural beats for concentration.',
    category: 'Binaural',
    duration: '6:12',
    url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/Deep%20Focus%20(50Hz).mp3?alt=media&token=2d06c5bc-595d-49e8-9feb-ffa8dd530a6e',
    src: 'https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Zm9jdXN8ZW58MHx8MHx8fDA%3D',
    reasonToListen: <ul className="list-disc list-inside space-y-1"><li>Utilize the power of binaural beats to enhance your focus.</li><li>This track is designed to help you enter a flow state.</li><li>Perfect for complex tasks and creative work. (Use headphones)</li></ul>,
  },
  {
    id: 15,
    title: 'Alpha Wave Relaxation',
    artist: 'Mind Waves',
    releaseDate: '2023-02-28',
    description: '8-12Hz beats for calm awareness.',
    category: 'Binaural',
    duration: '7:45',
    url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/Alpha%20Wave%20Relaxation.mp3?alt=media&token=9f1481c5-41cc-4f83-a866-500b0a96f7ac',
    src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-Lj85ki4xCnNDp_Cm60-IEWER81xGnpAuYg&s',
    reasonToListen: <ul className="list-disc list-inside space-y-1"><li>Gently guide your brain into a relaxed, peaceful alpha state.</li><li>The 8-12Hz frequency is associated with calm awareness.</li><li>Ideal for stress reduction and light meditation. (Use headphones)</li></ul>,
  },
  { id: 501, title: 'Theta Wave Meditation', artist: 'Mind Waves', releaseDate: '2023-03-08', category: 'Binaural', duration: '8:00', url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/Theta%20Wave%20Meditation.mp3?alt=media&token=a9ec022e-8e25-43db-bb81-f54da398d435', description: '4-8Hz for deep meditation.', src: 'https://t4.ftcdn.net/jpg/09/03/00/45/360_F_903004536_K4XH81MqlPya3nLAATbWYaVvcdDWIZqW.jpg', reasonToListen: <ul className="list-disc list-inside space-y-1"><li>Access deep meditative states with Theta wave frequencies (4-8Hz).</li><li>Can enhance creativity and intuition.</li><li>Best used during meditation. (Use headphones)</li></ul> },
  { id: 502, title: 'Delta Wave Sleep', artist: 'Mind Waves', releaseDate: '2023-03-18', category: 'Binaural', duration: '10:00', url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/Delta%20Wave%20Sleep.mp3?alt=media&token=b58953ba-0d39-4956-9b4a-32fb09fb463e', description: '0.5-4Hz for deep sleep.', src: 'https://i1.sndcdn.com/artworks-000219785886-lwbdm2-t500x500.jpg', reasonToListen: <ul className="list-disc list-inside space-y-1"><li>Promote deep, restorative sleep with Delta wave frequencies.</li><li>Helps to quiet the conscious mind.</li><li>Listen as you're getting ready to sleep. (Use headphones)</li></ul> },
  { id: 503, title: 'Beta Wave Concentration', artist: 'Mind Waves', releaseDate: '2023-04-02', category: 'Binaural', duration: '5:00', url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/Beta%20Wave%20Concentration.mp3?alt=media&token=288b2d5f-6cc7-4f97-8b51-44288cedcebc', description: '12-30Hz for active thinking.', src: 'https://thumbs.dreamstime.com/b/vibrant-wave-like-lines-dynamic-graphic-represent-different-states-consciousness-such-as-beta-alpha-theta-waves-visual-366092452.jpg', reasonToListen: <ul className="list-disc list-inside space-y-1"><li>Enhance focus and problem-solving skills with Beta waves.</li><li>Associated with active, alert concentration.</li><li>Great for studying or complex work. (Use headphones)</li></ul> },
  { id: 504, title: 'Gamma Wave Creativity', artist: 'Mind Waves', releaseDate: '2023-04-18', category: 'Binaural', duration: '6:30', url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/Gamma%20Wave%20Creativity.mp3?alt=media&token=169995eb-58a6-4a09-9403-ca705068c81d', description: '30-100Hz for high-level processing.', src: 'https://t3.ftcdn.net/jpg/08/58/14/84/360_F_858148449_YbtO2T6RM0zKv6V3o2rVx6HuTfH9AQpf.jpg', reasonToListen: <ul className="list-disc list-inside space-y-1"><li>Boost creativity and cognitive processing with Gamma waves.</li><li>Associated with "Aha!" moments and insight.</li><li>Use during brainstorming sessions. (Use headphones)</li></ul> },
  { id: 505, title: 'Solfeggio 528Hz', artist: 'Frequency Heals', releaseDate: '2023-05-03', category: 'Binaural', duration: '9:00', url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/Solfeggio%20528Hz.mp3?alt=media&token=f048e83e-f5b8-4083-a3dd-89b1deab9d06', description: 'The "love frequency" for healing.', src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPT5OsBZwk3nvaIYKrulacQgEt16Yao0mU0oR0jFyLm6v27Fa1M2Ag1FhY_NH4KxkLbUM&usqp=CAU', reasonToListen: <ul className="list-disc list-inside space-y-1"><li>Listen to the famous 528Hz Solfeggio "love frequency".</li><li>Associated with positive transformation and DNA repair.</li><li>Ideal for general well-being and meditation. (Use headphones)</li></ul> },
  { id: 506, title: 'Solfeggio 417Hz', artist: 'Frequency Heals', releaseDate: '2023-05-18', category: 'Binaural', duration: '8:45', url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/Solfeggio%20417Hz.mp3?alt=media&token=04c88dd0-e9fb-47c1-9721-f593727d3652', description: 'For clearing negativity.', src: 'https://libraryitems.insighttimer.com/r8r2z0z2a6z7d8n2n2j8b8y7n5q1v5y3d9n8v1v5/pictures/tiny_rectangle_large.jpeg', reasonToListen: <ul className="list-disc list-inside space-y-1"><li>The 417Hz Solfeggio frequency is used for clearing negativity.</li><li>Helps to release traumatic experiences and facilitate change.</li><li>Use when you need to let go of the past. (Use headphones)</li></ul> },
  { id: 507, title: 'Anxiety Relief (10Hz)', artist: 'Mind Waves', releaseDate: '2023-06-03', category: 'Binaural', duration: '7:15', url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/Anxiety%20Relief%20(10Hz).mp3?alt=media&token=fa430af7-1c73-40e8-aa79-f2612e9121f4', description: 'Alpha waves for anxiety reduction.', src: 'https://plus.unsplash.com/premium_photo-1689177356594-b988a1cc45ff?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YW54aWV0eXxlbnwwfHwwfHx8MA%3D%3D', reasonToListen: <ul className="list-disc list-inside space-y-1"><li>A 10Hz Alpha wave track specifically designed for anxiety relief.</li><li>Helps to calm the nervous system and promote relaxation.</li><li>Use whenever you feel anxious or stressed. (Use headphones)</li></ul> },
  { id: 508, title: 'Pain Relief (15Hz)', artist: 'Mind Waves', releaseDate: '2023-06-18', category: 'Binaural', duration: '6:00', url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/Pain%20Relief%20(15Hz).mp3?alt=media&token=cfc20d53-e735-462c-99dd-fce149ed725f', description: 'Beta waves for pain management.', src: 'https://t3.ftcdn.net/jpg/07/52/67/60/360_F_752676047_NCuh8gETDzOMy752uNxuR5RCIZnZt7Nq.jpg', reasonToListen: <ul className="list-disc list-inside space-y-1"><li>A 15Hz Beta wave track that may help with chronic pain management.</li><li>Can act as a distraction and alter pain perception.</li><li>Consult a doctor for medical advice. (Use headphones)</li></ul> },

  // Soundscape (10 tracks)
  {
    id: 6,
    title: 'Rainy Day Cafe',
    artist: 'Ambiance Creator',
    releaseDate: '2023-02-10',
    description: 'Cozy ambiance of rain and coffee.',
    category: 'Soundscape',
    duration: '7:30',
    url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/light-rain-109591.mp3?alt=media&token=8d42f9af-62b8-438e-b67a-eb88a42669d5',
    src: 'https://images.unsplash.com/photo-1445116572660-236099ec97a0?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y29mZmVlJTIwcmFpbnxlbnwwfHwwfHx8MA%3D%3D',
    reasonToListen: <ul className="list-disc list-inside space-y-1"><li>The comforting sound of rain tapping on a window pane.</li><li>Mixed with the subtle, warm ambiance of a quiet coffee shop.</li><li>Ideal for reading, studying, or simply relaxing on a cozy afternoon.</li></ul>,
  },
  {
    id: 10,
    title: 'Crackling Fireplace',
    artist: 'Ambiance Creator',
    releaseDate: '2023-11-01',
    description: 'Warm and cozy fire sounds.',
    category: 'Soundscape',
    duration: '6:40',
    url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/fireplace-loop-original-noise-178209.mp3?alt=media&token=a2505f7e-04b5-4076-8507-0029a3c2dea7',
    src: 'https://cdn.pixabay.com/video/2024/11/02/239515_tiny.jpg',
    reasonToListen: <ul className="list-disc list-inside space-y-1"><li>The warm, crackling sound of a fireplace.</li><li>Creates a cozy and inviting atmosphere.</li><li>Perfect for relaxing with a book on a cold night.</li></ul>,
  },
  { id: 601, title: 'Busy Library', artist: 'Ambiance Creator', releaseDate: '2023-09-05', category: 'Soundscape', duration: '8:00', url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/Busy%20Library.mp3?alt=media&token=85acef9c-dab9-406a-8bec-e6ff7f8f0e63', description: 'The quiet hum of a grand library.', src: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=2670&auto=format&fit=crop', reasonToListen: <ul className="list-disc list-inside space-y-1"><li>The gentle rustling of pages and distant whispers of a library.</li><li>Provides a background hum that aids focus.</li><li>Ideal for studying or working on a big project.</li></ul> },
  { id: 602, title: 'City Park Ambience', artist: 'Ambiance Creator', releaseDate: '2023-09-15', category: 'Soundscape', duration: '7:15', url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/City%20Park%20Ambience.mp3?alt=media&token=861f94bc-ba8f-4c33-8d3b-67e0fff3aafd', description: 'The sounds of a peaceful city park.', src: 'https://images.pexels.com/photos/1209978/pexels-photo-1209978.jpeg?cs=srgb&dl=pexels-galerieb-1209978.jpg&fm=jpg', reasonToListen: <ul className="list-disc list-inside space-y-1"><li>The distant city hum mixed with children playing and birds chirping.</li><li>Creates a feeling of being part of a community.</li><li>A pleasant background for daily tasks.</li></ul> },
  { id: 603, title: 'Cozy Cabin in a Storm', artist: 'Ambiance Creator', releaseDate: '2023-10-05', category: 'Soundscape', duration: '9:30', url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/Cozy%20Cabin%20in%20a%20Storm.mp3?alt=media&token=8a5ff9cc-83a0-40ab-8e2c-5f3c8c1d52cb', description: 'Fire, wind, and rain outside.', src: 'https://i.ytimg.com/vi/fyzQBNiQ4kU/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AH-CYAC0AWKAgwIABABGEUgSChlMA8=&rs=AOn4CLB78ZcYy5WWjPgH3s0sjzqf6cTZzQ', reasonToListen: <ul className="list-disc list-inside space-y-1"><li>The ultimate cozy experience: a crackling fire inside while a storm rages.</li><li>Perfect for feeling safe and secure.</li><li>Excellent for reading, writing, or sleeping.</li></ul> },
  { id: 604, title: 'Cat Purring', artist: 'Ambiance Creator', releaseDate: '2023-10-20', category: 'Soundscape', duration: '10:00', url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/Cat%20Purring.mp3?alt=media&token=7f1ddc24-8567-4492-a5e0-90c802e4b375', description: 'The calming purr of a cat.', src: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?q=80&w=2670&auto=format&fit=crop', reasonToListen: <ul className="list-disc list-inside space-y-1"><li>The gentle, rhythmic purring of a contented cat.</li><li>Known to reduce stress and anxiety.</li><li>Creates a warm and loving atmosphere.</li></ul> },
  { id: 605, title: 'Old Sailing Ship', artist: 'Ambiance Creator', releaseDate: '2023-11-10', category: 'Soundscape', duration: '7:50', url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/Old%20Sailing%20Ship.mp3?alt=media&token=b51b0e55-9317-4c36-9fe4-d6e4ba4adea2', description: 'Creaking wood and ocean sounds.', src: 'https://img.freepik.com/free-photo/view-ship-water_23-2150785186.jpg?semt=ais_incoming&w=740&q=80', reasonToListen: <ul className="list-disc list-inside space-y-1"><li>The creaking of wooden planks and the sound of the ocean.</li><li>Transports you to a bygone era of adventure.</li><li>A unique background for reading or creative work.</li></ul> },
  { id: 606, title: 'Train Journey', artist: 'Ambiance Creator', releaseDate: '2023-11-20', category: 'Soundscape', duration: '8:40', url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/Train%20Journey.mp3?alt=media&token=eef6121e-2622-4863-8c02-296e44a10b7e', description: 'The rhythmic clatter of a train.', src: 'https://images.unsplash.com/photo-1442570468985-f63ed5de9086?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dHJhaW4lMjB0cmF2ZWx8ZW58MHx8MHx8fDA%3D', reasonToListen: <ul className="list-disc list-inside space-y-1"><li>The steady, rhythmic sound of a train on the tracks.</li><li>Perfect for focus, work, or lulling you to sleep.</li><li>Creates a sense of journey and progress.</li></ul> },
  { id: 607, title: 'Spaceship Bridge', artist: 'Ambiance Creator', releaseDate: '2023-12-01', category: 'Soundscape', duration: '10:00', url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/Spaceship%20Bridge.mp3?alt=media&token=30227542-204f-43af-81cc-aa79f5f1ef8a', description: 'The gentle hum of a starship.', src: 'https://images5.alphacoders.com/138/1381260.png', reasonToListen: <ul className="list-disc list-inside space-y-1"><li>The low hum and occasional beep from the bridge of a starship.</li><li>Ideal for futuristic focus and creative thinking.</li><li>A great escape for sci-fi fans.</li></ul> },
  { id: 608, title: 'Tibetan Monastery', artist: 'Ambiance Creator', releaseDate: '2023-12-15', category: 'Soundscape', duration: '9:00', url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/Tibetan%20Monastery.mp3?alt=media&token=59e5157b-7ca6-4a76-9974-fb4d8afa1740', description: 'Chants and bowls from a monastery.', src: 'https://images.pexels.com/photos/19861527/pexels-photo-19861527/free-photo-of-view-of-a-monastery-and-mountains-in-tibet.jpeg', reasonToListen: <ul className="list-disc list-inside space-y-1"><li>The serene ambiance of a Tibetan monastery.</li><li>Features distant chants and singing bowls.</li><li>Perfect for deep meditation and spiritual connection.</li></ul> },

  // Lofi (10 tracks)
  {
    id: 8,
    title: 'Lofi Study Beats',
    artist: 'Lofi Girl',
    releaseDate: '2023-01-05',
    description: 'Chill instrumental hip hop.',
    category: 'Lofi',
    duration: '4:55',
    url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/Lofi%20Study%20Beats.mp3?alt=media&token=3e609dd6-1f89-46e8-bff1-0125a0fc7263',
    src: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=2670&auto=format&fit=crop',
    reasonToListen: <ul className="list-disc list-inside space-y-1"><li>A smooth, instrumental lofi hip hop track.</li><li>Helps you to study, work, or relax without distraction.</li><li>The chill beats create a productive and stress-free atmosphere.</li></ul>,
  },
  {
    id: 16,
    title: 'Midnight Drive',
    artist: 'Lofi Ghost',
    releaseDate: '2023-02-18',
    description: 'Melancholic lofi for late nights.',
    category: 'Lofi',
    duration: '5:10',
    url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/Midnight%20Drive.mp3?alt=media&token=ab92d772-8885-4df7-a0a7-7331564cee27',
    src: 'https://img.freepik.com/free-photo/man-sitting-car-back-view_23-2149668079.jpg?semt=ais_hybrid&w=740&q=80',
    reasonToListen: <ul className="list-disc list-inside space-y-1"><li>Perfect for late-night drives or quiet contemplation.</li><li>Features melancholic melodies and a steady beat.</li><li>Creates a reflective and calming mood.</li></ul>,
  },
  { id: 801, title: 'Sunday Morning', artist: 'Chillhop Music', releaseDate: '2023-03-12', category: 'Lofi', duration: '4:30', url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/Sunday%20Morning.mp3?alt=media&token=a147aee5-db90-4df6-8c06-d0401c34cb5d', description: 'Relaxed beats for a lazy day.', src: 'https://images.unsplash.com/photo-1506477331477-33d5d8b3dc85?q=80&w=2534&auto=format&fit=crop', reasonToListen: <ul className="list-disc list-inside space-y-1"><li>The perfect soundtrack for a slow, lazy Sunday morning.</li><li>Pairs perfectly with a cup of coffee or tea.</li><li>Sets a relaxed and happy tone for the day.</li></ul> },
  { id: 802, title: 'Rainy Day Lofi', artist: 'Lofi Girl', releaseDate: '2023-03-22', category: 'Lofi', duration: '5:45', url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/Rainy%20Day%20Lofi.mp3?alt=media&token=84160f1e-27f3-4abc-adb7-09aa5de45a19', description: 'Cozy beats for a rainy day.', src: 'https://images.unsplash.com/photo-1496034663057-6245f11be793?q=80&w=2670&auto=format&fit=crop', reasonToListen: <ul className="list-disc list-inside space-y-1"><li>A lofi track with the added ambiance of gentle rain.</li><li>Perfect for staying indoors and being productive.</li><li>Creates a cozy and focused atmosphere.</li></ul> },
  { id: 803, title: 'Focus Flow', artist: 'The Jazz Hop Cafe', releaseDate: '2023-04-08', category: 'Lofi', duration: '6:20', url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/Focus%20Flow.mp3?alt=media&token=73678c20-6588-4cc5-ae18-0543abd170f2', description: 'Instrumentals for deep work.', src: 'https://images.unsplash.com/photo-1522199755839-a2bacb67c546?q=80&w=2672&auto=format&fit=crop', reasonToListen: <ul className="list-disc list-inside space-y-1"><li>A steady, unobtrusive lofi beat designed to help you get into a state of flow.</li><li>Ideal for long study sessions or deep work.</li><li>Keeps you engaged without being distracting.</li></ul> },
  { id: 804, title: 'Stargazing Lofi', artist: 'Lofi Ghost', releaseDate: '2023-04-22', category: 'Lofi', duration: '5:00', url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/Stargazing%20Lofi.mp3?alt=media&token=c1520cb5-1ba4-4bca-be7d-81efdf3faabe', description: 'Dreamy beats for looking at the stars.', src: 'https://images.hdqwalls.com/download/stargazing-midnight-lofi-girl-headphones-illustration-xs-2048x1152.jpg', reasonToListen: <ul className="list-disc list-inside space-y-1"><li>A spacey, dreamy lofi track perfect for late-night stargazing.</li><li>Creates a sense of wonder and cosmic scale.</li><li>Relaxing and thought-provoking.</li></ul> },
  { id: 805, title: 'Cozy Cafe Lofi', artist: 'Chillhop Music', releaseDate: '2023-05-12', category: 'Lofi', duration: '6:00', url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/Cozy%20Cafe%20Lofi.mp3?alt=media&token=03f1dfd0-b31b-442d-a630-3cf07f3bc98c', description: 'Lofi beats with cafe ambiance.', src: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?q=80&w=2670&auto=format&fit=crop', reasonToListen: <ul className="list-disc list-inside space-y-1"><li>A warm lofi track mixed with the gentle background noise of a coffee shop.</li><li>Combines focus-enhancing beats with a social, cozy vibe.</li><li>Perfect for working remotely or studying.</li></ul> },
  { id: 806, title: 'Autumn Walk Lofi', artist: 'Lofi Girl', releaseDate: '2023-10-15', category: 'Lofi', duration: '4:45', url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/Autumn%20Walk%20Lofi.mp3?alt=media&token=a76f9a7f-e5de-4f94-9195-399ce1a89a8d', description: 'Crisp beats for a cool day.', src: 'https://images.unsplash.com/photo-1477322524744-0eece9e79640?q=80&w=2552&auto=format&fit=crop', reasonToListen: <ul className="list-disc list-inside space-y-1"><li>A lofi track with a crisp, clean beat, reminiscent of a cool autumn day.</li><li>Great for a walk in the park or a scenic drive.</li><li>Evokes feelings of nostalgia and comfort.</li></ul> },
  { id: 807, title: 'Late Night Coding', artist: 'The Jazz Hop Cafe', releaseDate: '2023-11-05', category: 'Lofi', duration: '7:30', url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/Late%20Night%20Coding.mp3?alt=media&token=dd8cff8b-6caf-4da7-8024-7a54794706c1', description: 'Beats for programmers.', src: 'https://images.unsplash.com/photo-1550439062-609e1531270e?q=80&w=2670&auto=format&fit=crop', reasonToListen: <ul className="list-disc list-inside space-y-1"><li>A long, focused lofi track designed for late-night coding or study sessions.</li><li>Helps you stay in the zone without being boring.</li><li>The perfect companion for nocturnal productivity.</li></ul> },
  { id: 808, title: 'Beachside Lofi', artist: 'Chillhop Music', releaseDate: '2023-07-20', category: 'Lofi', duration: '5:20', url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/Beachside%20Lofi.mp3?alt=media&token=710840a1-94ec-4e8a-a0a8-032e31a64ea5', description: 'Relaxed beats with ocean sounds.', src: 'https://images.unsplash.com/photo-1509233725247-49e657c54213?q=80&w=2549&auto=format&fit=crop', reasonToListen: <ul className="list-disc list-inside space-y-1"><li>A chilled-out lofi track with the gentle sound of ocean waves in the background.</li><li>Combines the best of lofi and nature sounds.</li><li>Perfect for summer relaxation and good vibes.</li></ul> },

  // Meditation (10 tracks)
  {
    id: 9,
    title: 'Tibetan Singing Bowls',
    artist: 'Meditation Masters',
    releaseDate: '2023-01-10',
    description: 'Meditative and healing tones.',
    category: 'Meditation',
    duration: '9:15',
    url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/Tibetan%20Singing%20Bowls.mp3?alt=media&token=5cc1d9e0-781b-46af-be7f-a5f351cc9d1c',
    src: 'https://assets.vogue.in/photos/60810dc4da52bd7b04e7bdd9/1:1/w_3858,h_3858,c_limit/Tibetan%20sound%20bowl%20therapy%20taught%20me%20how%20to%20step%20back%20from%20stressful%20situations.jpg',
    reasonToListen: <ul className="list-disc list-inside space-y-1"><li>The resonant, healing sounds of Tibetan singing bowls.</li><li>Designed for deep meditation and balancing your chakras.</li><li>Promotes a sense of inner peace and clarity.</li></ul>,
  },
  {
    id: 17,
    title: 'Guided Breath Meditation',
    artist: 'The Mindfulness Guide',
    releaseDate: '2023-02-22',
    description: 'A voice-guided breathing exercise.',
    category: 'Meditation',
    duration: '10:00',
    url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/Guided%20Breath%20Meditation.mp3?alt=media&token=058194c7-e0f3-4253-96b0-a0b610c87f6f',
    src: 'https://highcountryoxygen.com/wp-content/uploads/2024/01/breathing-in-the-mountains-blog-header-1.webp',
    reasonToListen: <ul className="list-disc list-inside space-y-1"><li>Follow a calm voice as it guides you through a simple but powerful breathing exercise.</li><li>Perfect for beginners or anyone looking to anchor themselves in the present moment.</li><li>Helps to reduce stress and anxiety quickly.</li></ul>,
  },
  { id: 901, title: '5-Minute Mindful Break', artist: 'The Mindfulness Guide', releaseDate: '2023-03-14', category: 'Meditation', duration: '5:00', url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/5-Minute%20Mindful%20Break.mp3?alt=media&token=52dcf3a5-3b65-4d82-bda9-6a897dd2dbc2', description: 'A short break to reset your day.', src: 'https://www.firstforwomen.com/wp-content/uploads/sites/2/2020/12/shutterstock_640975615.jpg?quality=86&strip=all', reasonToListen: <ul className="list-disc list-inside space-y-1"><li>A quick, 5-minute guided meditation to help you reset.</li><li>Perfect for a busy day when you need a moment of calm.</li><li>Helps to refocus your mind and release tension.</li></ul> },
  { id: 902, title: 'Body Scan Meditation', artist: 'The Mindfulness Guide', releaseDate: '2023-03-28', category: 'Meditation', duration: '15:00', url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/Body%20Scan%20Meditation.mp3?alt=media&token=634a1def-9215-46fc-9c57-a7524df55eaf', description: 'Connect with your physical self.', src: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2720&auto=format&fit=crop', reasonToListen: <ul className="list-disc list-inside space-y-1"><li>A guided body scan meditation to connect with your body.</li><li>Helps you to notice and release physical tension.</li><li>Promotes a greater sense of embodiment.</li></ul> },
  { id: 903, title: 'Loving-Kindness Meditation', artist: 'The Mindfulness Guide', releaseDate: '2023-04-11', category: 'Meditation', duration: '12:00', url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/Loving-Kindness%20Meditation.mp3?alt=media&token=09e12918-b1a7-4d64-a7b9-fbb4781340a4', description: 'Cultivate compassion for self and others.', src: 'https://www.heart.org/en/-/media/AHA/H4GM/Article-Images/loving-kindness.jpg?sc_lang=en', reasonToListen: <ul className="list-disc list-inside space-y-1"><li>A guided meditation focused on developing goodwill and kindness.</li><li>Helps to cultivate compassion for yourself and others.</li><li>Promotes feelings of connection and warmth.</li></ul> },
  { id: 904, title: 'Walking Meditation Guide', artist: 'The Mindfulness Guide', releaseDate: '2023-04-25', category: 'Meditation', duration: '10:00', url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/Walking%20Meditation%20Guide.mp3?alt=media&token=51f011f4-3db1-4482-ba40-5c71af670f88', description: 'Mindfulness in motion.', src: 'https://anmolmehta.s3.amazonaws.com/wp-content/uploads/20180202181051/A-Beginners-Guide-To-Walking-Meditation.jpg', reasonToListen: <ul className="list-disc list-inside space-y-1"><li>A guided walking meditation to practice mindfulness in motion.</li><li>Helps you connect with your body and surroundings.</li><li>A great way to integrate meditation into daily life.</li></ul> },
  { id: 905, title: 'Zen Garden Ambience', artist: 'Meditation Masters', releaseDate: '2023-05-09', category: 'Meditation', duration: '20:00', url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/Zen%20Garden%20Ambience.mp3?alt=media&token=db5fdf63-171c-4dc2-bb9a-e8ecd5af74a8', description: 'Sounds of a peaceful Zen garden.', src: 'https://plus.unsplash.com/premium_photo-1661954483883-edd65eac3577?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8emVuJTIwZ2FyZGVufGVufDB8fDB8fHww', reasonToListen: <ul className="list-disc list-inside space-y-1"><li>An unguided soundscape of a Japanese Zen garden.</li><li>Perfect for long meditation sessions or for creating a calm space.</li><li>Minimalist sounds for deep peace.</li></ul> },
  { id: 906, title: 'Gratitude Meditation', artist: 'The Mindfulness Guide', releaseDate: '2023-05-23', category: 'Meditation', duration: '8:00', url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/Gratitude%20Meditation.mp3?alt=media&token=9acd6753-5e59-4f6c-a55a-930fd3726159', description: 'Focus on what you are thankful for.', src: 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?cs=srgb&dl=pexels-prasanthinturi-1051838.jpg&fm=jpg', reasonToListen: <ul className="list-disc list-inside space-y-1"><li>A guided meditation to help you cultivate a sense of gratitude.</li><li>Focuses on appreciating the good things in your life.</li><li>A powerful tool for shifting your perspective.</li></ul> },
  { id: 907, title: 'Silent Meditation Timer', artist: 'Meditation Masters', releaseDate: '2023-06-06', category: 'Meditation', duration: '30:00', url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/Silent%20Meditation%20Timer.mp3?alt=media&token=ce687555-5f51-4fbf-bfc4-0d6c6a3a2640', description: 'A timer with bells for unguided practice.', src: 'https://thumbs.dreamstime.com/z/deep-meditation-man-meditating-imaginary-landscape-chakra-points-visible-his-body-digital-illustration-30893903.jpg', reasonToListen: <ul className="list-disc list-inside space-y-1"><li>A 30-minute timer with gentle bells at the beginning, middle, and end.</li><li>Perfect for your own unguided meditation practice.</li><li>Allows you to meditate without watching the clock.</li></ul> },
  { id: 908, title: 'Chakra Balancing Sounds', artist: 'Meditation Masters', releaseDate: '2023-06-20', category: 'Meditation', duration: '14:00', url: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/Chakra%20Balancing%20Sounds.mp3?alt=media&token=2308f84f-1be3-4e30-9761-7058e0eb584d', description: 'Tones for each of the 7 chakras.', src: 'https://res.cloudinary.com/jerrick/image/upload/d_642250b563292b35f27461a7.png,f_jpg,q_auto,w_720/wdlxbrgvrk9s0tags3n4.jpg', reasonToListen: <ul className="list-disc list-inside space-y-1"><li>A sequence of sounds and frequencies designed to align and balance your chakras.</li><li>Helps to clear energy blockages and promote flow.</li><li>A powerful tool for spiritual and energetic work.</li></ul> },
];

const INITIAL_VISIBLE_TRACKS = 6;

const TrackCard = ({
    track,
    onClick,
}: {
    track: Track;
    onClick: (track: Track) => void;
}) => {
    return (
        <motion.div 
            layout="position" 
            className="w-full"
        >
            <Card
                onClick={(e) => { e.stopPropagation(); onClick(track); }}
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
                             <Play className="h-8 w-8 text-white"/>
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


export default function AudioPlaylistPage() {
    const router = useRouter();
    const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [activeFilter, setActiveFilter] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [aiRecommendedTrackId, setAiRecommendedTrackId] = useState<number | null>(null);
    const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_TRACKS);

    const { toast } = useToast();
    
    const categories = useMemo(() => ['All', ...Array.from(new Set(staticTracks.map(t => t.category)))], []);
    
    const filteredTracks = useMemo(() => {
        let tracks = staticTracks;

        if (activeFilter !== 'All') {
            tracks = tracks.filter(t => t.category === activeFilter);
        }

        if (searchQuery && !isSearching) {
            const lowerCaseQuery = searchQuery.toLowerCase();
            tracks = tracks.filter(t => 
                t.title.toLowerCase().includes(lowerCaseQuery) || 
                t.description.toLowerCase().includes(lowerCaseQuery)
            );
        }
        
        return tracks;
    }, [activeFilter, searchQuery, isSearching]);

    const handleTrackClick = (track: Track) => {
        router.push(`/playlist/${track.id}`);
    };
      
    const handleLocalSearch = () => {
        setIsSearching(true); // Manually trigger update
        if (!searchQuery.trim()) {
            toast({ variant: 'destructive', title: 'Empty Search', description: 'Please enter what you want to search for.' });
            setIsSearching(false);
            return;
        }

        const lowerCaseQuery = searchQuery.toLowerCase();
        const results = staticTracks.filter(t => 
            t.title.toLowerCase().includes(lowerCaseQuery) || 
            t.description.toLowerCase().includes(lowerCaseQuery) ||
            t.category.toLowerCase().includes(lowerCaseQuery) ||
            t.artist.toLowerCase().includes(lowerCaseQuery)
        );

        if (results.length > 0) {
            const bestMatch = results[0];
            setActiveFilter(bestMatch.category);
            setAiRecommendedTrackId(bestMatch.id);
            toast({ title: 'Local Search Result', description: `Found "${bestMatch.title}" for you.` });
        } else {
            toast({ title: 'No match found', description: 'Try refining your search query.' });
            setAiRecommendedTrackId(null);
        }
        setIsSearching(false);
    }

    const handleSearchKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleLocalSearch();
        }
    };
    
    useEffect(() => {
        if (aiRecommendedTrackId) {
            const cardElement = document.getElementById(`card-${aiRecommendedTrackId}`);
            if (cardElement) {
                cardElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            const timer = setTimeout(() => setAiRecommendedTrackId(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [aiRecommendedTrackId]);

    const handleToggleTracks = () => {
        setVisibleCount(prevCount =>
            prevCount === filteredTracks.length ? INITIAL_VISIBLE_TRACKS : filteredTracks.length
        );
    };

    const showToggleButton = filteredTracks.length > INITIAL_VISIBLE_TRACKS;
    const isExpanded = visibleCount === filteredTracks.length;

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
                            placeholder="Search for sounds (e.g., 'focus', 'rain', 'piano')..."
                            className="bg-transparent border-none text-white focus-visible:ring-0 focus-visible:ring-offset-0"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={handleSearchKeyDown}
                        />
                         <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                    onClick={handleLocalSearch}
                                    className="bg-green-600 hover:bg-green-500 text-white rounded-lg flex-shrink-0"
                                    disabled={isSearching}
                                    >
                                    {isSearching ? <Loader2 className="h-5 w-5 animate-spin" /> : <Search className="h-5 w-5"/>}
                                    <span className="ml-2 hidden md:inline">Search</span>
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Search locally across titles, descriptions, and categories.</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
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
                            {filteredTracks.slice(0, visibleCount).map((track) => (
                                <motion.div
                                    key={track.id}
                                    layout
                                    variants={itemVariants}
                                    className={cn(
                                        "group",
                                        aiRecommendedTrackId === track.id && 'ring-2 ring-green-400/80 rounded-2xl'
                                    )}
                                    id={`card-${track.id}`}
                                >
                                    <TrackCard
                                        track={track}
                                        onClick={() => handleTrackClick(track)}
                                    />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                     {showToggleButton && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-12 text-center">
                        <Button
                            onClick={handleToggleTracks}
                            variant="ghost"
                            className="text-lg font-semibold py-4 px-8 text-green-300 hover:bg-transparent hover:text-green-200 transition-all group rounded-full border-2 border-green-500/30 hover:border-green-400/60"
                        >
                            {isExpanded ? (
                            <Minus className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:rotate-90" />
                            ) : (
                            <Plus className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:rotate-90" />
                            )}
                            {isExpanded ? 'Show Less' : 'Show More'}
                        </Button>
                        </motion.div>
                    )}
                </div>
            </div>
        </>
    );
}
