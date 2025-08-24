
import ChatInterface from '@/components/chat-interface';
import { ChatProvider } from '@/contexts/ChatContext';

export default function Home() {
  return (
    <ChatProvider>
        <div className="relative flex flex-col h-screen w-full">
            <ChatInterface />
        </div>
    </ChatProvider>
  );
}
