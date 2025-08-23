import ChatInterface from '@/components/chat-interface';

export default function Home() {
  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] container mx-auto py-4 sm:py-8 pl-0">
      <ChatInterface />
    </div>
  );
}
