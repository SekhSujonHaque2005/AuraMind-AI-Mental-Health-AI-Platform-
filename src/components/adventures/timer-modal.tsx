
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';

const CONFIRMATION_TIMEOUT = 10; // 10 seconds to respond

const TimerModal = ({
    isOpen,
    title,
    duration,
    onClose,
    onComplete,
    onFail,
}: {
    isOpen: boolean;
    title: string;
    duration: number;
    onClose: () => void;
    onComplete: () => void;
    onFail: () => void;
}) => {
    const [timeLeft, setTimeLeft] = useState(duration);
    const [stage, setStage] = useState<'running' | 'confirming'>('running');
    const [confirmationTimeLeft, setConfirmationTimeLeft] = useState(CONFIRMATION_TIMEOUT);

    // Effect to handle the main countdown logic
    useEffect(() => {
        if (!isOpen) return;

        // Reset state when modal opens for a new quest
        setTimeLeft(duration);
        setStage('running');
        setConfirmationTimeLeft(CONFIRMATION_TIMEOUT);

        const interval = setInterval(() => {
            setTimeLeft(prev => {
                if (prev > 1) {
                    return prev - 1;
                }
                // Timer finished, move to confirmation stage
                setStage('confirming');
                clearInterval(interval);
                return 0;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [isOpen, duration]);

    // Effect to handle the confirmation countdown
    useEffect(() => {
        if (stage !== 'confirming' || !isOpen) return;

        const confirmationInterval = setInterval(() => {
            setConfirmationTimeLeft(prev => {
                if (prev > 1) {
                    return prev - 1;
                }
                // Confirmation time ran out, fail the quest
                onFail();
                onClose();
                clearInterval(confirmationInterval);
                return 0;
            });
        }, 1000);

        return () => clearInterval(confirmationInterval);
    }, [stage, isOpen, onFail, onClose]);
    
    if (!isOpen) {
        return null;
    }

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const handleComplete = () => {
        onComplete();
        onClose();
    };

    const handleFail = () => {
        onFail();
        onClose();
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="bg-gray-900 border-amber-500/40 text-white">
                <DialogHeader>
                    <DialogTitle className="text-2xl text-amber-300">{title}</DialogTitle>
                     <DialogDescription>
                        {stage === 'running' ? "Focus on your task. Mark it as complete when you're done." : "Did you complete your quest?"}
                    </DialogDescription>
                </DialogHeader>

                {stage === 'running' ? (
                     <div className="py-8 flex flex-col items-center justify-center gap-6">
                        <div className="text-7xl font-bold font-mono text-white tracking-widest">
                            {formatTime(timeLeft)}
                        </div>
                        <Progress value={(timeLeft / duration) * 100} className="w-full h-3 bg-amber-900/50 [&>div]:bg-gradient-to-r [&>div]:from-amber-400 [&>div]:to-orange-500" />
                    </div>
                ) : (
                    <div className="py-8 flex flex-col items-center justify-center gap-6">
                         <AlertTriangle className="h-20 w-20 text-yellow-400 mb-4" />
                         <p className="text-gray-300">
                           Failing in {confirmationTimeLeft}s if no response...
                         </p>
                    </div>
                )}
               
                <DialogFooter className="grid grid-cols-2 gap-4">
                    {stage === 'running' ? (
                        <>
                            <Button variant="ghost" onClick={onClose}>Cancel</Button>
                            <Button onClick={handleComplete} className="bg-green-600 hover:bg-green-700 text-white">
                                <CheckCircle2 className="mr-2 h-4 w-4" />
                                Mark as Complete
                            </Button>
                        </>
                    ) : (
                         <>
                            <Button onClick={handleFail} className="bg-red-600 hover:bg-red-700 text-white">
                                <XCircle className="mr-2 h-4 w-4" /> No, I didn't
                            </Button>
                            <Button onClick={handleComplete} className="bg-green-600 hover:bg-green-700 text-white">
                                <CheckCircle2 className="mr-2 h-4 w-4" /> Yes, I did!
                            </Button>
                        </>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default TimerModal;
