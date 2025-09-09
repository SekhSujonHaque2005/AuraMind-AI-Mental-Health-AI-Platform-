
import Ballpit from '@/components/ballpit';
import ChatInterface from '@/components/chat-interface';

export default function ChatPage() {
  return (
    <div className="relative flex flex-col h-screen w-full overflow-hidden">
        <div className="absolute inset-0 -z-10 h-full w-full">
            <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"></div>
            <div className="absolute left-0 right-0 top-[-10%] h-[1000px] w-[1000px] rounded-full bg-[radial-gradient(circle_400px_at_50%_300px,#3b82f633,transparent)]"></div>
        </div>
        <div className="absolute inset-0 z-0">
            <Ballpit />
        </div>
        <div className="relative z-10 flex flex-col h-full">
            <ChatInterface />
        </div>
    </div>
  );
}
