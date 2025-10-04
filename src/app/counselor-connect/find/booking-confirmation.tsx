
'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';

export default function BookingConfirmation({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (isOpen) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 6000);
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      return () => clearTimeout(timer);
    }
  }, [isOpen]);
  
  return (
    <>
      {showConfetti && <Confetti width={windowSize.width} height={windowSize.height} recycle={false} numberOfPieces={500} />}
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md bg-gray-900/80 backdrop-blur-xl border-blue-500/20 text-white">
          <DialogHeader className="items-center text-center">
             <motion.div
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.2 }}
                className="h-20 w-20 rounded-full bg-green-500 flex items-center justify-center mb-5"
            >
                <Check className="h-12 w-12 text-white" />
            </motion.div>
            <DialogTitle className="text-2xl text-blue-300">Booking Confirmed!</DialogTitle>
            <DialogDescription className="text-gray-400 mt-2">
              Your session has been successfully scheduled. We will be connecting with you shortly via email with the details.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button type="button" className="w-full bg-blue-600 hover:bg-blue-500" onClick={onClose}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

