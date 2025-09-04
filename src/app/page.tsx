
import Ballpit from '@/components/ballpit';
import ChatInterface from '@/components/chat-interface';

export default function Home() {
  return (
    <div className="relative flex flex-col h-screen w-full">
        <div className="absolute inset-0 z-0">
            <Ballpit />
        </div>
        <div className="relative z-10 flex flex-col h-full">
            <ChatInterface />
        </div>
    </div>
  );
}
