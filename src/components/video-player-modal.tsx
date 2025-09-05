
'use client';

import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import type { YouTubeVideo } from "@/app/resources/actions";
import { X } from "lucide-react";
import { motion } from "framer-motion";

interface VideoPlayerModalProps {
  video: YouTubeVideo | null;
  onClose: () => void;
}

const VideoPlayerModal = ({ video, onClose }: VideoPlayerModalProps) => {
  if (!video) return null;
  const videoSrc = `https://www.youtube.com/embed/${video.id.videoId}?autoplay=1&rel=0&controls=1&showinfo=0&mute=0&modestbranding=1`;

  return (
    <Dialog open={!!video} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-w-4xl w-full p-0 bg-transparent border-none shadow-none !rounded-lg overflow-hidden">
         <DialogTitle className="sr-only">
            {`Video Player: ${video.snippet.title}`}
          </DialogTitle>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="bg-black/90 backdrop-blur-sm rounded-lg border border-blue-500/20 overflow-hidden"
        >
          <div className="p-3 flex items-center justify-between">
            <h2 className="text-blue-300 text-lg truncate font-semibold pr-4">
              {video.snippet.title}
            </h2>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="aspect-video w-full">
            <iframe
              src={videoSrc}
              title={video.snippet.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default VideoPlayerModal;
