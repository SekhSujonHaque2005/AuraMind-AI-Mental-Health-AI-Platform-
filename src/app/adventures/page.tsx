
'use client';

import { useState, useEffect, useCallback, useTransition, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Flame, Droplet, BookOpen, Footprints, Star, Shield, Plus, BrainCircuit, Wand2, Timer, Play, CheckCircle2, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import TextType from '@/components/ui/text-type';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { db } from '@/lib/firebase';
import { ref, update, get, push, set, remove } from 'firebase/database';
import { getAIGeneratedQuest } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import Confetti from 'react-confetti';
import { isToday, isYesterday, formatISO, startOfToday } from 'date-fns';
import TimerModal from '@/components/adventures/timer-modal';
import BadgeDialog, { type BadgeKey, badges } from '@/components/adventures/badge-dialog';

type QuestCategory = 'mindfulness' | 'hydration' | 'gratitude' | 'exercise' | 'learning' | 'digital-detox' | 'custom';

export const questIcons: Record<QuestCategory, React.ElementType> = {
    mindfulness: Flame,
    hydration: Droplet,
    gratitude: BookOpen,
    exercise: Footprints,
    learning: BookOpen,
    'digital-detox': Shield,
    custom: Wand2,
};

const defaultQuests = [
  { id: 'water', title: 'Drink 8 glasses of water', xp: 10, isDefault: true, duration: null, category: 'hydration' as QuestCategory },
  { id: 'meditate', title: '10 minutes of meditation', xp: 20, isDefault: true, duration: 600, category: 'mindfulness' as QuestCategory },
  { id: 'journal', title: 'Gratitude journaling', xp: 15, isDefault: true, duration: 300, category: 'gratitude' as QuestCategory },
  { id: 'walk', title: 'Go for a 15-minute walk', xp: 15, isDefault: true, duration: 900, category: 'exercise' as QuestCategory },
  { id: 'read', title: 'Read a book for 15 mins', xp: 10, isDefault: true, duration: 900, category: 'learning' as QuestCategory },
  { id: 'no_screen', title: '30 mins no screen before bed', xp: 20, isDefault: true, duration: 1800, category: 'digital-detox' as QuestCategory },
];

const levels = [
  { level: 1, name: 'Mindful Novice', xpThreshold: 0, icon: '🌱' },
  { level: 2, name: 'Wellness Apprentice', xpThreshold: 100, icon: '🌿' },
  { level: 3, name: 'Mindful Explorer', xpThreshold: 250, icon: '🌲' },
  { level: 4, name: 'Serenity Seeker', xpThreshold: 500, icon: '🧘' },
  { level: 5, name: 'Zen Master', xpThreshold: 1000, icon: '🧘‍♀️' },
];

export type QuestStatus = 'idle' | 'active' | 'completed' | 'failed';
export type QuestWithStatus = (typeof defaultQuests)[0] & { status: QuestStatus; icon: React.ElementType };

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring' } }
};

const USER_ID = 'user_adventures_test';

export default function AdventuresPage() {
    const [allQuests, setAllQuests] = useState<QuestWithStatus[]>([]);
    const [questStatuses, setQuestStatuses] = useState<Record<string, QuestStatus>>({});
    const [currentXp, setCurrentXp] = useState(0);
    const [streak, setStreak] = useState(0);
    const [lastCompletionDate, setLastCompletionDate] = useState<string | null>(null);
    const [showBadge, setShowBadge] = useState<BadgeKey | null>(null);
    const [isAddQuestOpen, setIsAddQuestOpen] = useState(false);
    const [newQuestTitle, setNewQuestTitle] = useState("");
    const [isGeneratingAi, startTransition] = useTransition();
    const [celebrating, setCelebrating] = useState(false);
    const [activeTimerQuest, setActiveTimerQuest] = useState<QuestWithStatus | null>(null);

    const { toast } = useToast();

    const userRef = ref(db, `users/${USER_ID}`);
    const userQuestsRef = ref(db, `users/${USER_ID}/customQuests`);
    const dailyStatusRef = ref(db, `users/${USER_ID}/dailyStatus/${formatISO(startOfToday(), { representation: 'date' })}`);

    useEffect(() => {
        const fetchInitialData = async () => {
             try {
                const snapshot = await get(userRef);
                const todayStr = formatISO(startOfToday(), { representation: 'date' });

                if (snapshot.exists()) {
                    const data = snapshot.val();
                    setCurrentXp(data.xp || 0);
                    setStreak(data.streak || 0);
                    setLastCompletionDate(data.lastCompletionDate || null);

                    const customQuestsData = data.customQuests || {};
                    const customQuestsList = Object.entries(customQuestsData).map(([id, quest]: [string, any]) => ({
                        id,
                        icon: questIcons[quest.category as QuestCategory || 'custom'],
                        isDefault: false,
                        ...quest,
                    }));

                    const combinedQuests = [...defaultQuests.map(q => ({...q, icon: questIcons[q.category]})), ...customQuestsList];
                    
                    const dailyStatusSnapshot = await get(dailyStatusRef);
                    const savedStatuses = dailyStatusSnapshot.exists() ? dailyStatusSnapshot.val() : {};
                    
                    const initialStatuses: Record<string, QuestStatus> = {};
                    combinedQuests.forEach(q => {
                        initialStatuses[q.id] = savedStatuses[q.id] || 'idle';
                    });

                    setQuestStatuses(initialStatuses);
                    setAllQuests(combinedQuests.map(q => ({...q, status: initialStatuses[q.id]})));

                } else {
                    // Initialize new user
                    set(userRef, {
                        xp: 0,
                        streak: 0,
                        lastCompletionDate: null,
                    });
                     setQuestStatuses(defaultQuests.reduce((acc, q) => ({...acc, [q.id]: 'idle'}), {}));
                     setAllQuests(defaultQuests.map(q => ({...q, status: 'idle', icon: questIcons[q.category]})));
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        fetchInitialData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const updateQuestStatus = useCallback((questId: string, status: QuestStatus) => {
        if(questStatuses[questId] === 'completed') return;

        setQuestStatuses(prev => {
            const newStatuses = { ...prev, [questId]: status };
            update(dailyStatusRef, { [questId]: status });
            return newStatuses;
        });
    }, [dailyStatusRef, questStatuses]);

    const handleCompleteQuest = (questId: string, xp: number) => {
        if (questStatuses[questId] !== 'completed') {
            updateQuestStatus(questId, 'completed');
            const newXp = currentXp + xp;
            setCurrentXp(newXp);
            update(userRef, { xp: newXp });
        }
    };

    const handleStartQuest = (quest: QuestWithStatus) => {
        if (quest.status !== 'idle') return;
        if (quest.duration) {
            setActiveTimerQuest(quest);
        } else {
            handleCompleteQuest(quest.id, quest.xp);
        }
    };
    
    useEffect(() => {
        if (activeTimerQuest) {
            const timeout = setTimeout(() => {
                // If the quest is still active (not completed) when timer runs out, mark as failed.
                if (questStatuses[activeTimerQuest.id] !== 'completed') {
                    updateQuestStatus(activeTimerQuest.id, 'failed');
                }
                setActiveTimerQuest(null);
            }, (activeTimerQuest.duration || 0) * 1000);

            return () => clearTimeout(timeout);
        }
    }, [activeTimerQuest, questStatuses, updateQuestStatus]);


    const handleAddQuest = async () => {
        if (!newQuestTitle.trim()) return;
        const newQuestData = {
            title: newQuestTitle,
            xp: 10,
            duration: null,
            category: 'custom' as QuestCategory,
            isDefault: false,
        };
        try {
            const newQuestRef = push(userQuestsRef);
            await set(newQuestRef, newQuestData);
            const newQuestWithId: QuestWithStatus = { ...newQuestData, id: newQuestRef.key!, icon: Wand2, status: 'idle' };
            setAllQuests(prev => [...prev, newQuestWithId]);
            setQuestStatuses(prev => ({ ...prev, [newQuestWithId.id]: 'idle' }));
            setNewQuestTitle("");
            setIsAddQuestOpen(false);
        } catch (error) {
            console.error("Failed to add new quest:", error);
        }
    };

    const handleGenerateAiQuest = () => {
        startTransition(async () => {
            const existingQuests = allQuests.map(q => q.title);
            const result = await getAIGeneratedQuest({ existingQuests });
            if (result.error) {
                toast({ variant: 'destructive', title: 'AI Generation Failed', description: result.error });
            } else if (result.quest) {
                setNewQuestTitle(result.quest);
                 toast({ title: 'AI Quest Generated!', description: 'Your new quest is ready to be added.' });
            }
        });
    }

    const handleCloseBadge = () => {
        setShowBadge(null);
        setCelebrating(true);
    }
    
    const questsWithLiveStatus = useMemo(() => {
        return allQuests.map(q => ({...q, status: questStatuses[q.id] || 'idle'}));
    }, [allQuests, questStatuses]);

    useEffect(() => {
        const checkAllQuestsCompleted = async () => {
            const allDone = questsWithLiveStatus.length > 0 && questsWithLiveStatus.every(q => q.status === 'completed' || q.status === 'failed');
            if (allDone) {
                const todayStr = formatISO(startOfToday(), { representation: 'date' });
                if (lastCompletionDate !== todayStr) {
                    let newStreak = 1;
                    if (lastCompletionDate && isYesterday(new Date(lastCompletionDate))) {
                        newStreak = streak + 1;
                    }
                    
                    setStreak(newStreak);
                    setLastCompletionDate(todayStr);
                    await update(userRef, { streak: newStreak, lastCompletionDate: todayStr });

                    if (!showBadge) setShowBadge('daily_complete');
                }
            }
        };
        checkAllQuestsCompleted();
    }, [questsWithLiveStatus, lastCompletionDate, streak, userRef, showBadge]);
    
    const totalDailyXp = questsWithLiveStatus.reduce((sum, quest) => sum + quest.xp, 0);
    const dailyXp = questsWithLiveStatus
        .filter(quest => quest.status === 'completed')
        .reduce((sum, quest) => sum + quest.xp, 0);

    const currentLevelInfo = [...levels].reverse().find(l => currentXp >= l.xpThreshold) || levels[0];
    const nextLevelInfo = levels.find(l => l.xpThreshold > currentXp);
    
    const dailyProgressPercentage = totalDailyXp > 0 ? (dailyXp / totalDailyXp) * 100 : 0;

    return (
        <>
            {celebrating && (
                <div className="fixed inset-0 z-[9999] pointer-events-none">
                    <Confetti recycle={true} numberOfPieces={600} />
                </div>
            )}
            <div className="relative min-h-screen p-4 md:p-8 overflow-x-hidden">
                <div className="absolute inset-0 -z-10 h-full w-full">
                    <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"></div>
                    <div className="absolute left-0 right-0 top-[-10%] h-[1000px] w-[1000px] rounded-full bg-[radial-gradient(circle_400px_at_50%_300px,#f59e0b33,transparent)]"></div>
                </div>

                <div className="w-full max-w-4xl mx-auto">
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center my-12 flex flex-col items-center"
                    >
                         <TextType
                            as="h1"
                            text="Self-Care Adventures"
                            typingSpeed={60}
                            loop={false}
                            className="text-4xl md:text-6xl font-bold mb-4 tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-amber-400 to-orange-600"
                         />
                        <TextType
                            text="Embark on daily quests to nourish your mind and body. Earn XP, level up, and become a wellness champion!"
                            typingSpeed={20}
                            initialDelay={1500}
                            loop={false}
                            className="text-lg max-w-2xl mx-auto text-gray-400"
                        />
                    </motion.div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <motion.div className="lg:col-span-1 space-y-8" variants={itemVariants} initial="hidden" animate="visible">
                            <Card className="bg-black/30 backdrop-blur-md border border-amber-500/20 rounded-2xl shadow-lg">
                                <CardHeader className="text-center">
                                    <CardTitle className="text-2xl text-amber-300">Daily Progress</CardTitle>
                                    <div className="text-5xl mt-2">{currentLevelInfo.icon}</div>
                                    <CardDescription className="text-lg font-semibold">{`Level ${currentLevelInfo.level}: ${currentLevelInfo.name}`}</CardDescription>
                                </CardHeader>
                                <CardContent className="px-6 pb-6">
                                    <Progress value={dailyProgressPercentage} className="h-3 bg-amber-900/50 [&>div]:bg-gradient-to-r [&>div]:from-amber-400 [&>div]:to-orange-500" />
                                    <div className="flex justify-between text-xs text-gray-400 mt-2">
                                        <span>{dailyXp} / {totalDailyXp} XP Today</span>
                                        {nextLevelInfo ? <span>{nextLevelInfo.xpThreshold - currentXp} XP to next level</span> : <span>Max Level!</span>}
                                    </div>
                                </CardContent>
                            </Card>
                            <Card className="bg-black/30 backdrop-blur-md border border-amber-500/20 rounded-2xl shadow-lg">
                                <CardHeader className="text-center items-center">
                                    <CardTitle className="text-2xl text-amber-300">Daily Streak</CardTitle>
                                    <div className="flex items-center text-5xl font-bold text-orange-400 mt-2">
                                        <Flame className="h-12 w-12 mr-2" />
                                        <span>{streak}</span>
                                    </div>
                                    <CardDescription>
                                        {streak > 0 ? `You're on a ${streak}-day streak!` : "Complete all quests to start a streak!"}
                                    </CardDescription>
                                </CardHeader>
                            </Card>
                        </motion.div>

                        <div className="lg:col-span-2">
                             <motion.div variants={containerVariants} initial="hidden" animate="visible">
                                <Card className="bg-black/30 backdrop-blur-md border border-amber-500/20 shadow-2xl shadow-amber-500/10 rounded-2xl">
                                    <CardHeader className="flex flex-row items-center justify-between">
                                        <div>
                                            <CardTitle className="text-3xl font-bold text-amber-300">Daily Quests</CardTitle>
                                            <CardDescription className="text-gray-400">Complete tasks to earn XP and level up!</CardDescription>
                                        </div>
                                        <Button onClick={() => setIsAddQuestOpen(true)} className="bg-amber-500 hover:bg-amber-600 text-white">
                                            <Plus className="mr-2 h-4 w-4" /> Add Quest
                                        </Button>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        {questsWithLiveStatus.map(quest => {
                                            const Icon = quest.icon;
                                            const status = questStatuses[quest.id] || 'idle';

                                            return (
                                            <motion.div key={quest.id} variants={itemVariants}>
                                                <div className={cn(
                                                    "flex items-center p-4 rounded-lg border transition-all duration-300",
                                                    status === 'completed' && 'bg-green-500/10 border-green-500/40',
                                                    status === 'failed' && 'bg-red-500/10 border-red-500/40',
                                                    status === 'idle' && 'bg-gray-800/50 border-amber-500/20 hover:border-amber-400/50'
                                                )}>
                                                    <Icon className={cn(
                                                        "h-8 w-8 mr-4",
                                                        status === 'completed' ? 'text-green-400' : 
                                                        status === 'failed' ? 'text-red-400' : 'text-amber-400'
                                                    )} />
                                                    <div className="flex-grow">
                                                        <p className="text-lg font-medium text-white">{quest.title}</p>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        {quest.duration && <div className="flex items-center text-xs text-gray-400 gap-1"><Timer className="h-4 w-4"/> {quest.duration / 60}m</div>}
                                                        <div className="flex items-center text-amber-400 font-bold text-sm">
                                                            <Star className="h-4 w-4 mr-1" />
                                                            <span>{quest.xp} XP</span>
                                                        </div>
                                                        {status === 'idle' && (
                                                            <Button size="sm" className="bg-amber-500 hover:bg-amber-600" onClick={() => handleStartQuest(quest)}>
                                                                <Play className="h-4 w-4 mr-2" /> Start
                                                            </Button>
                                                        )}
                                                        {status === 'completed' && (
                                                            <div className="flex items-center gap-2 text-green-400">
                                                                <CheckCircle2 className="h-5 w-5" />
                                                                <span>Completed</span>
                                                            </div>
                                                        )}
                                                         {status === 'failed' && (
                                                            <div className="flex items-center gap-2 text-red-400">
                                                                <XCircle className="h-5 w-5" />
                                                                <span>Failed</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )})}
                                    </CardContent>
                                </Card>
                             </motion.div>
                        </div>
                    </div>
                </div>
            </div>

            <Dialog open={isAddQuestOpen} onOpenChange={setIsAddQuestOpen}>
                <DialogContent className="bg-gray-900 border-amber-500/40 text-white">
                    <DialogHeader>
                        <DialogTitle className="text-2xl text-amber-300">Create a New Quest</DialogTitle>
                        <DialogDescription>
                            Add a personal self-care task to your daily adventures. What do you want to accomplish today?
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-4 space-y-4">
                        <div className="space-y-2">
                             <Label htmlFor="quest-title" className="text-gray-400">Quest Title</Label>
                             <Input 
                                id="quest-title"
                                value={newQuestTitle}
                                onChange={(e) => setNewQuestTitle(e.target.value)}
                                placeholder="e.g., Go for a 15-minute bike ride"
                                className="bg-gray-800/60 border-amber-500/30 text-gray-200 focus:ring-amber-500"
                             />
                        </div>
                        <div className="text-center text-gray-500 my-4">OR</div>
                         <Button onClick={handleGenerateAiQuest} className="w-full bg-transparent border border-amber-500/40 hover:bg-amber-500/10 text-amber-300" disabled={isGeneratingAi}>
                           {isGeneratingAi ? (
                                <>
                                    <BrainCircuit className="mr-2 h-4 w-4 animate-spin" />
                                    Generating...
                                </>
                           ) : (
                                <>
                                    <BrainCircuit className="mr-2 h-4 w-4" />
                                    Generate with AI
                                </>
                           )}
                         </Button>
                    </div>
                    <DialogFooter>
                        <Button variant="ghost" onClick={() => setIsAddQuestOpen(false)}>Cancel</Button>
                        <Button onClick={handleAddQuest} className="bg-amber-500 hover:bg-amber-600 text-white">Add Quest</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <BadgeDialog badge={showBadge} onClose={handleCloseBadge} />
            
            <TimerModal
                quest={activeTimerQuest}
                isOpen={!!activeTimerQuest}
                onClose={() => setActiveTimerQuest(null)}
                onComplete={() => {
                    if (activeTimerQuest) {
                        handleCompleteQuest(activeTimerQuest.id, activeTimerQuest.xp);
                    }
                }}
            />
        </>
    );
}

    