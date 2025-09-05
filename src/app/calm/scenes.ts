
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
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRX3HVPNVGz4O-VaiFZxYoB7IcfDnE2D6AMMw&s',
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
    image: 'https://images.unsplash.com/photo-1475036127633-954353a23a49?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    sound: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/night-ambience-170643.mp3?alt=media&token=2621430c-2679-4171-a48f-3ad8f6a9e18e'
  },
  {
    id: 'fireplace',
    name: 'Cozy Fireplace',
    description: 'Warm yourself by a crackling fire in a rustic cabin.',
    emoji: '🔥',
    image: 'https://images.unsplash.com/photo-1542382257-80deda093718?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    sound: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/relaxing-crackling-fireplace-12797.mp3?alt=media&token=96144e54-5264-4e4f-b679-7a39e836b801'
  },
  {
    id: 'rainyday',
    name: 'Rainy Day',
    description: 'Listen to the pitter-patter of rain on a window pane.',
    emoji: '🌧️',
    image: 'https://images.unsplash.com/photo-1519692933481-e162a57d6721?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    sound: 'https://firebasestorage.googleapis.com/v0/b/auramind-14qmq.firebasestorage.app/o/rain-and-thunder-166243.mp3?alt=media&token=2343a411-e1a7-47b2-ac7f-9430c904323e'
  }
];
