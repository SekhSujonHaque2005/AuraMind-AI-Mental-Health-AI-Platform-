import ChatInterface from '@/components/chat-interface';

export default function Home() {
  return (
    <div className="flex flex-col h-[calc(100vh-4.5rem)] container mx-auto p-4">
      <ChatInterface />
    </div>
  );
}
