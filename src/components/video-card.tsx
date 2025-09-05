
'use client';

import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PlayCircle } from "lucide-react";
import Image from "next/image";
import type { YouTubeVideo } from "@/contexts/ChatContext";

interface VideoCardProps {
    video: YouTubeVideo;
    isHovered: boolean;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    onClick: () => void;
}

const VideoCard = ({ video, isHovered, onMouseEnter, onMouseLeave, onClick }: VideoCardProps) => {
    const videoSrc = `https://www.youtube.com/embed/${video.id.videoId}?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&loop=1&playlist=${video.id.videoId}&modestbranding=1`;

    return (
        <div
            className="group cursor-pointer"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onClick={onClick}
        >
            <Card className="flex flex-col h-full bg-black/30 backdrop-blur-md border border-blue-500/20 hover:border-blue-400/50 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-[0_0_40px_-10px_rgba(59,130,246,0.3)] rounded-2xl overflow-hidden">
                <div className="relative w-full aspect-video">
                    {isHovered ? (
                        <iframe
                            src={videoSrc}
                            title={video.snippet.title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                            className="w-full h-full"
                        ></iframe>
                    ) : (
                        <>
                            <Image
                                src={video.snippet.thumbnails.high.url}
                                alt={video.snippet.title}
                                fill
                                className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                                data-ai-hint="video thumbnail"
                            />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <PlayCircle className="h-16 w-16 text-white/80" />
                            </div>
                        </>
                    )}
                </div>
                <CardHeader>
                    <CardTitle className="text-lg text-blue-300 group-hover:text-blue-200 transition-colors duration-300">
                        {video.snippet.title}
                    </CardTitle>
                    <CardDescription className="text-gray-400 text-sm mt-1">
                        by {video.snippet.channelTitle}
                    </CardDescription>
                </CardHeader>
            </Card>
        </div>
    );
}

export default VideoCard;
