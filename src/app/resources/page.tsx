
'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ExternalLink, Clapperboard, PlayCircle, VideoIcon, Languages } from "lucide-react";
import { getVideos } from "./actions";
import Image from "next/image";
import { useState, useEffect } from "react";
import VideoPlayerModal from "@/components/video-player-modal";
import { Skeleton } from "@/components/ui/skeleton";
import VideoCard from "@/components/video-card";
import TextType from "@/components/ui/text-type";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import type { YouTubeVideo } from "@/contexts/ChatContext";


const staticResources = [
  {
    name: "National Suicide Prevention Lifeline",
    description: "Provides 24/7, free and confidential support for people in distress, prevention and crisis resources for you or your loved ones.",
    phone: "988",
    website: "https://988lifeline.org/",
  },
  {
    name: "Crisis Text Line",
    description: "Connect with a volunteer Crisis Counselor for free, 24/7 support via text message.",
    phone: "Text HOME to 741741",
    website: "https://www.crisistextline.org/",
  },
  {
    name: "The Trevor Project",
    description: "The leading national organization providing crisis intervention and suicide prevention services to LGBTQ young people under 25.",
    phone: "1-866-488-7386",
    website: "https://www.thetrevorproject.org/",
  },
];

const videoQueries = [
  { title: "Guided Meditations", query: "10 minute guided meditation for beginners" },
  { title: "Mental Health Tips", query: "daily mental health tips" },
  { title: "Mindfulness Exercises", query: "mindfulness exercises for anxiety" },
  { title: "Yoga for Relaxation", query: "yoga for relaxation and stress relief" },
  { title: "Positive Affirmations", query: "positive affirmations for self-love" },
  { title: "Breathing Exercises", query: "5 minute breathing exercise for stress" },
];

const languages = [
    { value: 'en', label: 'English' },
    { value: 'hi', label: 'Hindi' },
    { value: 'es', label: 'Spanish' },
    { value: 'fr', label: 'French' },
    { value: 'ar', label: 'Arabic' },
    { value: 'bn', label: 'Bengali' },
    { value: 'pt', label: 'Portuguese' },
    { value: 'ru', label: 'Russian' },
];

interface VideoSectionProps {
  title: string;
  videos: YouTubeVideo[];
  onVideoClick: (video: YouTubeVideo) => void;
  hoveredVideoId: string | null;
  setHoveredVideoId: (id: string | null) => void;
}

const VideoSection = ({ title, videos, onVideoClick, hoveredVideoId, setHoveredVideoId }: VideoSectionProps) => {
    if (videos.length === 0) return null;

    return (
        <div className="mb-12">
            <h2 className="text-3xl font-bold text-blue-300 mb-6 flex items-center">
                <Clapperboard className="mr-3 h-8 w-8 text-blue-400" /> {title}
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {videos.map((video) => (
                    <VideoCard
                        key={video.id.videoId}
                        video={video}
                        isHovered={hoveredVideoId === video.id.videoId}
                        onMouseEnter={() => setHoveredVideoId(video.id.videoId)}
                        onMouseLeave={() => setHoveredVideoId(null)}
                        onClick={() => onVideoClick(video)}
                    />
                ))}
            </div>
        </div>
    );
};


const LoadingSkeleton = () => (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="flex flex-col space-y-3 bg-black/30 backdrop-blur-md border border-blue-500/20 rounded-2xl p-4">
                <Skeleton className="h-[180px] w-full rounded-lg bg-gray-800" />
                <div className="space-y-2 pt-2">
                    <Skeleton className="h-4 w-5/6 rounded bg-gray-800" />
                    <Skeleton className="h-4 w-3/4 rounded bg-gray-800" />
                </div>
            </div>
        ))}
    </div>
);

const NoVideosFound = () => (
    <div className="text-center py-10 px-4 rounded-2xl bg-black/30 backdrop-blur-md border border-blue-500/20">
        <VideoIcon className="mx-auto h-12 w-12 text-blue-400" />
        <h3 className="mt-4 text-xl font-semibold text-white">No Videos Found</h3>
        <p className="mt-2 text-gray-400">
            There may be an issue with loading videos. Please ensure the YouTube API key is correctly configured.
        </p>
    </div>
)


export default function ResourcesPage() {
  const [videoData, setVideoData] = useState<{ title: string; videos: YouTubeVideo[] }[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<YouTubeVideo | null>(null);
  const [hoveredVideoId, setHoveredVideoId] = useState<string | null>(null);
  const [hasVideos, setHasVideos] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  useEffect(() => {
    const fetchVideos = async () => {
      setIsLoading(true);
      const data = await Promise.all(
        videoQueries.map(async ({ title, query }) => {
          const videos = await getVideos(query, selectedLanguage);
          return { title, videos };
        })
      );
      const filteredData = data.filter(section => section.videos.length > 0);
      setVideoData(filteredData);
      setHasVideos(filteredData.length > 0);
      setIsLoading(false);
    };

    fetchVideos();
  }, [selectedLanguage]);

  const handleVideoClick = (video: YouTubeVideo) => {
    setSelectedVideo(video);
  };

  const handleCloseModal = () => {
    setSelectedVideo(null);
  };


  return (
    <>
    <div className="relative flex flex-col items-center min-h-screen p-4 pb-24 overflow-x-hidden">
      <div className="absolute inset-0 -z-10 h-full w-full">
            <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"></div>
            <div className="absolute left-0 right-0 top-[-10%] h-[1000px] w-[1000px] rounded-full bg-[radial-gradient(circle_400px_at_50%_300px,#3b82f633,transparent)]"></div>
      </div>
      
      <div className="w-full max-w-7xl relative">
        <div className="absolute top-6 right-6 z-20">
            <div className="relative w-full max-w-xs flex flex-col items-end gap-2">
                 <motion.div
                    animate={{ 
                        scale: [1, 1.1, 1],
                        opacity: [0, 1, 1, 0]
                    }}
                    transition={{
                        duration: 3,
                        ease: "easeInOut",
                        times: [0, 0.1, 0.9, 1],
                        repeat: Infinity,
                        repeatDelay: 5
                    }}
                    className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-blue-500/30 blur-xl pointer-events-none"
                />
                <Label className="text-sm text-gray-400 mr-2">Select Language</Label>
                <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                    <SelectTrigger className="w-[180px] bg-black/30 backdrop-blur-md border-blue-500/20 text-white focus:ring-blue-500/50">
                        <div className="flex items-center gap-2">
                           <Languages className="h-5 w-5 text-blue-400" />
                           <SelectValue placeholder="Select Language" />
                        </div>
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900/80 backdrop-blur-md border-blue-500/30 text-white">
                        {languages.map(lang => (
                            <SelectItem key={lang.value} value={lang.value} className="cursor-pointer hover:bg-blue-500/10">
                                {lang.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </div>

        <div className="text-center my-16 flex flex-col items-center">
            <TextType
              as="h1"
              text="Resources for Your Well-being"
              typingSpeed={60}
              loop={false}
              className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-blue-400 to-purple-500 mb-4"
            />
            <TextType
                text="Support is available. Explore videos and hotlines to help you on your journey."
                typingSpeed={20}
                initialDelay={1500}
                loop={false}
                className="text-lg max-w-2xl mx-auto bg-clip-text text-transparent bg-gradient-to-br from-blue-400 to-purple-500"
            />
        </div>

        {isLoading ? (
            <div className="space-y-12">
                {videoQueries.map(({title}) => (
                    <div key={title}>
                        <h2 className="text-3xl font-bold text-blue-300 mb-6 flex items-center">
                            <Clapperboard className="mr-3 h-8 w-8 text-blue-400" /> {title}
                        </h2>
                        <LoadingSkeleton />
                    </div>
                ))}
            </div>
        ) : hasVideos ? (
            videoData.map(({ title, videos }) => (
                <VideoSection 
                key={title} 
                title={title} 
                videos={videos} 
                onVideoClick={handleVideoClick}
                hoveredVideoId={hoveredVideoId}
                setHoveredVideoId={setHoveredVideoId}
                />
            ))
        ) : (
            <NoVideosFound />
        )}

        <div className="mt-20">
            <h2 className="text-3xl font-bold text-blue-300 mb-6 text-center">Immediate Support Hotlines</h2>
            <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-3">
            {staticResources.map((resource) => (
                <Card key={resource.name} className="flex flex-col bg-black/30 backdrop-blur-md border border-blue-500/20 hover:border-blue-400/50 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-[0_0_40px_-10px_rgba(59,130,246,0.3)] rounded-2xl overflow-hidden group">
                <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                    <span className="text-xl text-blue-300">{resource.name}</span>
                    {resource.website && (
                        <a
                        href={resource.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 transition-colors"
                        aria-label={`Visit ${resource.name} website`}
                        >
                        <ExternalLink className="h-5 w-5" />
                        </a>
                    )}
                    </CardTitle>
                    <CardDescription className="text-gray-400 pt-2">{resource.description}</CardDescription>
                </CardHeader>
                <CardContent className="mt-auto pt-4">
                    <p className="font-semibold text-blue-300 text-lg">{resource.phone}</p>
                </CardContent>
                </Card>
            ))}
            </div>
            <p className="text-gray-500 text-center text-sm mt-8">
                If you are in immediate danger, please call 911 or your local emergency number.
            </p>
        </div>
      </div>
    </div>
    {selectedVideo && (
        <VideoPlayerModal 
            video={selectedVideo} 
            onClose={handleCloseModal}
        />
    )}
    </>
  );
}
