import ChatInterface from '@/components/chat-interface';
import Prism from '@/components/prism';

export default function Home() {
  return (
    <div className="relative flex flex-col h-screen w-full bg-black">
      <div className="absolute inset-0 z-0">
        <Prism
          animationType="rotate"
          timeScale={0.25}
          height={3.5}
          baseWidth={5.5}
          scale={3.6}
          hueShift={0.7}
          colorFrequency={0.6}
          noise={0.3}
          glow={1}
        />
      </div>
      <div className="relative z-10 flex-1">
        <ChatInterface />
      </div>
    </div>
  );
}
