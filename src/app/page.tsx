import ChatInterface from '@/components/chat-interface';
import GradientBlinds from '@/components/gradient-blinds';

export default function Home() {
  return (
    <div className="relative flex flex-col h-screen w-full bg-black">
      <div className="absolute inset-0 z-0">
        <GradientBlinds
          gradientColors={['#2927FF', '#FF9FFC']}
          angle={-25}
          noise={0.1}
          blindCount={8}
          spotlightRadius={0.7}
          spotlightSoftness={0.8}
          spotlightOpacity={0.4}
          mouseDampening={0.08}
          mixBlendMode="lighten"
        />
      </div>
      <div className="relative z-10 flex-1">
        <ChatInterface />
      </div>
    </div>
  );
}
