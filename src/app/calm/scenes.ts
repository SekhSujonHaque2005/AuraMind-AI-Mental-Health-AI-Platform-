
export interface Scene {
    id: string;
    name: string;
    description: string;
    emoji: string;
    image: string;
    sound: string;
}

export const scenes: Scene[] = [
  {
    id: 'forest',
    name: 'Enchanted Forest',
    description: 'Lose yourself in a tranquil forest with calming ambient sounds.',
    emoji: '🌲',
    image: 'https://images.unsplash.com/photo-1620766165457-a8025baa82e0?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aW5kaWElMjBmb3Jlc3R8ZW58MHx8MHx8fDA%3D',
    sound: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/forest-ambience-296528.mp3?alt=media&token=a6d2299f-b641-4d8f-95c1-a00c7d704060',
  },
  {
    id: 'beach',
    name: 'Sunset Beach',
    description: 'Relax on a serene beach and listen to the gentle waves.',
    emoji: '🏖️',
    image: 'https://images.pexels.com/photos/635279/pexels-photo-635279.jpeg?cs=srgb&dl=pexels-bella-white-201200-635279.jpg&fm=jpg',
    sound: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/maldives-beach-381097.mp3?alt=media&token=b2302908-1232-4a6d-a4f3-f68af61108c0',
  },
  {
    id: 'waterfall',
    name: 'Misty Waterfall',
    description: 'Find peace by a majestic waterfall in a lush jungle.',
    emoji: '💧',
    image: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d2F0ZXJmYWxsJTIwd2FsbHBhcGVyfGVufDB8fDB8fHww',
    sound: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/waterfall-sounds-259625.mp3?alt=media&token=1a57989a-b844-48f9-97a8-ec2b489d57d8',
  },
  {
    id: 'nightsky',
    name: 'Night Sky',
    description: 'Gaze at the stars and auroras under a clear night sky.',
    emoji: '🌌',
    image: 'https://images.pexels.com/photos/956981/milky-way-starry-sky-night-sky-star-956981.jpeg?cs=srgb&dl=pexels-umkreisel-app-956981.jpg&fm=jpg',
    sound: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/night-ambience-170643.mp3?alt=media&token=2621430c-2679-4171-a48f-3ad8f6a9e18e'
  },
  {
    id: 'fireplace',
    name: 'Cozy Fireplace',
    description: 'Warm yourself by a crackling fire in a rustic cabin.',
    emoji: '🔥',
    image: 'https://images.pexels.com/photos/1629159/pexels-photo-1629159.jpeg?cs=srgb&dl=pexels-minan1398-1629159.jpg&fm=jpg',
    sound: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/relaxing-crackling-fireplace-12797.mp3?alt=media&token=96144e54-5264-4e4f-b679-7a39e836b801'
  },
  {
    id: 'rainyday',
    name: 'Rainy Day',
    description: 'Listen to the pitter-patter of rain on a window pane.',
    emoji: '🌧️',
    image: 'https://images.unsplash.com/photo-1519692933481-e162a57d6721?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    sound: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/rain-and-thunder-166243.mp3?alt=media&token=2343a411-e1a7-47b2-ac7f-9430c904323e'
  },
  {
    id: 'zen-garden',
    name: 'Zen Garden',
    description: 'Find your center in a peaceful garden with flowing water.',
    emoji: '🧘',
    image: 'https://plus.unsplash.com/premium_photo-1661954483883-edd65eac3577?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8emVuJTIwZ2FyZGVufGVufDB8fDB8fHww',
    sound: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/zen-garden-14874.mp3?alt=media&token=0a3a789a-6a9b-43d9-9f7b-6c68a6f3b0e1'
  },
  {
    id: 'mountain-peak',
    name: 'Mountain Peak',
    description: 'Breathe in the crisp air from a majestic mountain summit.',
    emoji: '⛰️',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    sound: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/mountain-wind-43336.mp3?alt=media&token=1c6b1b7f-8c3e-4b6e-812e-9d2113f8c8d8'
  },
  {
    id: 'underwater-reef',
    name: 'Underwater Reef',
    description: 'Drift peacefully through a vibrant and colorful coral reef.',
    emoji: '🐠',
    image: 'https://images.unsplash.com/photo-1501813426742-d33f6b3510b6?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    sound: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/underwater-6228.mp3?alt=media&token=2d4d0b1d-0b7e-4b4e-9b2a-8d7b8a7b9e7d'
  }
];
