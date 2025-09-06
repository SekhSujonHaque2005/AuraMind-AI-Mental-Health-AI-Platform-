
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';

const TimerModal = ({
    isOpen,
    title,
    duration,
    onClose,
    onComplete
}: {
    isOpen: boolean;
    title: string;
    duration: number;
    onClose: () => void;
    onComplete: () => void;
}) => {
    const [timeLeft, setTimeLeft] = useState(duration);

    useEffect(() => {
        if (!isOpen) return;

        setTimeLeft(duration);
        const interval = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(interval);
                    onClose(); // Auto-close when timer ends
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [isOpen, duration, onClose]);
    
    if (!isOpen) {
        return null;
    }

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const handleManualComplete = () => {
        onComplete();
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="bg-gray-900 border-amber-500/40 text-white">
                <DialogHeader>
                    <DialogTitle className="text-2xl text-amber-300">{title}</DialogTitle>
                    <DialogDescription>
                        Focus on your task. Mark it as complete when you're done.
                    </DialogDescription>
                </DialogHeader>
                <div className="py-8 flex flex-col items-center justify-center gap-6">
                    <div className="text-7xl font-bold font-mono text-white tracking-widest">
                        {formatTime(timeLeft)}
                    </div>
                    <Progress value={(timeLeft / duration) * 100} className="w-full h-3 bg-amber-900/50 [&>div]:bg-gradient-to-r [&>div]:from-amber-400 [&>div]:to-orange-500" />
                </div>
                <DialogFooter>
                    <Button variant="ghost" onClick={onClose}>Cancel</Button>
                    <Button onClick={handleManualComplete} className="bg-green-600 hover:bg-green-700 text-white">
                        <CheckCircle2 className="mr-2 h-4 w-4" />
                        Mark as Complete
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default TimerModal;
