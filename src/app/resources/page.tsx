
'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ExternalLink, Clapperboard } from "lucide-react";
import { getVideos, YouTubeVideo } from "./actions";
import Image from "next/image";
import { useState, useEffect } from "react";
import VideoPlayerModal from "@/components/video-player-modal";

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
];

interface VideoSectionProps {
  title: string;
  videos: YouTubeVideo[];
  onVideoClick: (video: YouTubeVideo) => void;
  hoveredVideoId: string | null;
  setHoveredVideoId: (id: string | null) => void;
}

const VideoSection = ({ title, videos, onVideoClick, hoveredVideoId, setHoveredVideoId }: VideoSectionProps) => {
    return (
        <div className="mb-12">
            <h2 className="text-3xl font-bold text-blue-300 mb-6 flex items-center">
            <Clapperboard className="mr-3 h-8 w-8" /> {title}
            </h2>
            {videos.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {videos.map((video) => (
                <div
                    key={video.id.videoId}
                    className="group cursor-pointer"
                    onMouseEnter={() => setHoveredVideoId(video.id.videoId)}
                    onMouseLeave={() => setHoveredVideoId(null)}
                    onClick={() => onVideoClick(video)}
                >
                    <Card className="flex flex-col h-full bg-gray-900/50 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 transform hover:-translate-y-1 shadow-[0_0_15px_rgba(72,149,239,0.15)] overflow-hidden">
                    <div className="relative w-full aspect-video">
                        {hoveredVideoId === video.id.videoId ? (
                           <iframe
                                src={`https://www.youtube.com/embed/${video.id.videoId}?autoplay=1&mute=0&controls=0&rel=0`}
                                title={video.snippet.title}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="w-full h-full"
                            ></iframe>
                        ) : (
                             <Image
                                src={video.snippet.thumbnails.high.url}
                                alt={video.snippet.title}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                                data-ai-hint="video thumbnail"
                            />
                        )}
                    </div>
                    <CardHeader>
                        <CardTitle className="text-lg text-blue-300 group-hover:text-blue-200 transition-colors">
                        {video.snippet.title}
                        </CardTitle>
                        <CardDescription className="text-gray-400 text-sm mt-1">
                        by {video.snippet.channelTitle}
                        </CardDescription>
                    </CardHeader>
                    </Card>
                </div>
                ))}
            </div>
            ) : (
            <p className="text-gray-500">Could not load videos at this time. Please check back later.</p>
            )}
        </div>
    );
};


export default function ResourcesPage() {
  const [videoData, setVideoData] = useState<{ title: string; videos: YouTubeVideo[] }[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<YouTubeVideo | null>(null);
  const [hoveredVideoId, setHoveredVideoId] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      setIsLoading(true);
      const data = await Promise.all(
        videoQueries.map(async ({ title, query }) => {
          const videos = await getVideos(query);
          return { title, videos };
        })
      );
      setVideoData(data);
      setIsLoading(false);
    };

    fetchVideos();
  }, []);

  const handleVideoClick = (video: YouTubeVideo) => {
    setSelectedVideo(video);
  };

  const handleCloseModal = () => {
    setSelectedVideo(null);
  };


  return (
    <>
    <div className="container mx-auto max-w-7xl py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-blue-400 to-purple-500 mb-4">
          Resources for Your Well-being
        </h1>
        <p className="text-gray-400 text-lg">
          Support is available. Explore videos and hotlines to help you on your journey.
        </p>
      </div>

      {isLoading ? (
         <div className="text-center text-gray-400">Loading videos...</div>
      ) : (
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
      )}

      <div className="mt-20">
        <h2 className="text-3xl font-bold text-blue-300 mb-6 text-center">Immediate Support Hotlines</h2>
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
          {staticResources.map((resource) => (
            <Card key={resource.name} className="flex flex-col bg-gray-900/50 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 transform hover:-translate-y-1 shadow-[0_0_15px_rgba(72,149,239,0.15)]">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="text-xl text-blue-300">{resource.name}</span>
                  {resource.website && (
                    <a
                      href={resource.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300"
                      aria-label={`Visit ${resource.name} website`}
                    >
                      <ExternalLink className="h-5 w-5" />
                    </a>
                  )}
                </CardTitle>
                <CardDescription className="text-gray-400">{resource.description}</CardDescription>
              </CardHeader>
              <CardContent className="mt-auto">
                <p className="font-semibold text-blue-300">{resource.phone}</p>
              </CardContent>
            </Card>
          ))}
        </div>
         <p className="text-gray-500 text-center text-sm mt-8">
            If you are in immediate danger, please call 911 or your local emergency number.
        </p>
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
