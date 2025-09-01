
'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import type { YouTubeVideo } from "@/app/resources/actions";
import { X } from "lucide-react";

interface VideoPlayerModalProps {
  video: YouTubeVideo;
  onClose: () => void;
}

const VideoPlayerModal = ({ video, onClose }: VideoPlayerModalProps) => {
  const videoSrc = `https://www.youtube.com/embed/${video.id.videoId}?autoplay=1&rel=0&controls=1`;

  return (
    <Dialog open={!!video} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-w-4xl w-full p-0 bg-black border-blue-500/30 shadow-2xl rounded-lg overflow-hidden">
        <DialogHeader className="p-4 flex flex-row items-center justify-between">
          <DialogTitle className="text-blue-300 text-lg truncate">
            {video.snippet.title}
          </DialogTitle>
          <DialogClose asChild>
             <button
              className="p-1 rounded-full text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </DialogClose>
        </DialogHeader>
        <div className="aspect-video w-full">
          <iframe
            src={videoSrc}
            title={video.snippet.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VideoPlayerModal;
