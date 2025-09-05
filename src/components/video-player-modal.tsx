
'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { YouTubeVideo } from "@/app/resources/actions";
import { motion } from "framer-motion";

interface VideoPlayerModalProps {
  video: YouTubeVideo | null;
  onClose: () => void;
}

const VideoPlayerModal = ({ video, onClose }: VideoPlayerModalProps) => {
  if (!video) return null;
  const videoSrc = `https://www.youtube.com/embed/${video.id.videoId}?autoplay=1&rel=0&controls=1&showinfo=0&modestbranding=1`;

  return (
    <Dialog open={!!video} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-w-4xl w-full p-0 bg-transparent border-none shadow-none !rounded-lg overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="bg-black/90 backdrop-blur-sm rounded-lg border border-blue-500/20 overflow-hidden"
        >
          <DialogHeader className="p-3 pr-12">
            <DialogTitle className="text-blue-300 text-lg truncate font-semibold">
              {video.snippet.title}
            </DialogTitle>
          </DialogHeader>
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
