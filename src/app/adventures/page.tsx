
'use client';

import { useState, useEffect, useCallback, useTransition } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Flame, Droplet, BookOpen, Footprints, Star, Shield, Trophy, Plus, BrainCircuit, Wand2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import TextType from '@/components/ui/text-type';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction } from '@/components/ui/alert-dialog';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { db } from '@/lib/firebase';
import { ref, onValue, set, update, get, push } from 'firebase/database';
import { getAIGeneratedQuest } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';

const defaultQuests = [
  { id: 'water', title: 'Drink 8 glasses of water', icon: Droplet, xp: 10, isDefault: true },
  { id: 'meditate', title: '10 minutes of meditation', icon: Flame, xp: 20, isDefault: true },
  { id: 'journal', title: 'Gratitude journaling', icon: BookOpen, xp: 15, isDefault: true },
  { id: 'walk', title: 'Go for an evening walk', icon: Footprints, xp: 15, isDefault: true },
  { id: 'read', title: 'Read a book for 15 mins', icon: BookOpen, xp: 10, isDefault: true },
  { id: 'no_screen', title: '30 mins no screen before bed', icon: Shield, xp: 20, isDefault: true },
];

const levels = [
  { level: 1, name: 'Mindful Novice', xpThreshold: 0, icon: '🌱' },
  { level: 2, name: 'Wellness Apprentice', xpThreshold: 100, icon: '🌿' },
  { level: 3, name: 'Mindful Explorer', xpThreshold: 250, icon: '🌲' },
  { level: 4, name: 'Serenity Seeker', xpThreshold: 500, icon: '🧘' },
  { level: 5, name: 'Zen Master', xpThreshold: 1000, icon: '🧘‍♀️' },
];

const badges = {
    'daily_complete': { name: 'Daily Champion', icon: '🏆', description: 'You completed all quests for the day!' },
    'consistency_hero': { name: 'Consistency Hero', icon: '💪', description: 'Completed quests 3 days in a row!' },
    'zen_master': { name: 'Zen Master', icon: '🧘', description: 'Completed 10 meditation sessions!' },
}

type BadgeKey = keyof typeof badges;

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
    const [allQuests, setAllQuests] = useState(defaultQuests);
    const [completedQuests, setCompletedQuests] = useState<Set<string>>(new Set());
    const [currentXp, setCurrentXp] = useState(0);
    const [showBadge, setShowBadge] = useState<BadgeKey | null>(null);
    const [isAddQuestOpen, setIsAddQuestOpen] = useState(false);
    const [newQuestTitle, setNewQuestTitle] = useState("");
    const [isGeneratingAi, startTransition] = useTransition();
    const { toast } = useToast();


    const userRef = ref(db, `users/${USER_ID}`);
    const userQuestsRef = ref(db, `users/${USER_ID}/customQuests`);
    
    useEffect(() => {
        const fetchInitialData = async () => {
             try {
                const snapshot = await get(userRef);
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    setCurrentXp(data.xp || 0);
                    setCompletedQuests(new Set(data.completedQuests ? Object.keys(data.completedQuests) : []));

                    const customQuestsData = data.customQuests || {};
                    const customQuestsList = Object.entries(customQuestsData).map(([id, quest]: [string, any]) => ({
                        ...quest,
                        id,
                        icon: Wand2,
                        isDefault: false,
                    }));
                    setAllQuests([...defaultQuests, ...customQuestsList]);

                } else {
                    set(userRef, {
                        name: 'You',
                        xp: 0,
                        avatar: `https://i.pravatar.cc/150?u=${USER_ID}`,
                        completedQuests: {},
                        customQuests: {}
                    });
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        fetchInitialData();
    }, []);

    const updateXpInDb = useCallback((newXp: number) => {
        update(userRef, { xp: newXp });
    }, [userRef]);

    const handleQuestToggle = (questId: string, xp: number) => {
        const newCompleted = new Set(completedQuests);
        let newXp = currentXp;

        const questRef = ref(db, `users/${USER_ID}/completedQuests/${questId}`);

        if (newCompleted.has(questId)) {
            newCompleted.delete(questId);
            newXp -= xp;
            set(questRef, null); 
        } else {
            newCompleted.add(questId);
            newXp += xp;
            set(questRef, true); 
        }
        
        setCompletedQuests(newCompleted);
        setCurrentXp(newXp);
        updateXpInDb(newXp);
    };

    const handleAddQuest = async () => {
        if (!newQuestTitle.trim()) return;

        const newQuest = {
            title: newQuestTitle,
            xp: 10, // Default XP for custom quests
        };

        try {
            const newQuestRef = push(userQuestsRef);
            await set(newQuestRef, newQuest);
            
            const newQuestWithId = { ...newQuest, id: newQuestRef.key!, icon: Wand2, isDefault: false };
            setAllQuests(prev => [...prev, newQuestWithId]);

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
                toast({
                    variant: 'destructive',
                    title: 'AI Generation Failed',
                    description: result.error,
                });
            } else if (result.quest) {
                setNewQuestTitle(result.quest);
                 toast({
                    title: 'AI Quest Generated!',
                    description: 'Your new quest is ready to be added.',
                });
            }
        });
    }


    useEffect(() => {
        if (completedQuests.size === allQuests.length && allQuests.length > 0 && !showBadge) {
            setShowBadge('daily_complete');
        }
    }, [completedQuests, allQuests, showBadge]);

    const currentLevelInfo = [...levels].reverse().find(l => currentXp >= l.xpThreshold) || levels[0];
    const nextLevelInfo = levels.find(l => l.xpThreshold > currentXp);

    const progressToNextLevel = nextLevelInfo 
        ? ((currentXp - currentLevelInfo.xpThreshold) / (nextLevelInfo.xpThreshold - currentLevelInfo.xpThreshold)) * 100
        : 100;

    return (
        <>
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
                        <motion.div className="lg:col-span-1" variants={itemVariants} initial="hidden" animate="visible">
                            <Card className="bg-black/30 backdrop-blur-md border border-amber-500/20 rounded-2xl shadow-lg">
                                <CardHeader className="text-center">
                                    <CardTitle className="text-2xl text-amber-300">Your Progress</CardTitle>
                                    <div className="text-5xl mt-2">{currentLevelInfo.icon}</div>
                                    <CardDescription className="text-lg font-semibold">{`Level ${currentLevelInfo.level}: ${currentLevelInfo.name}`}</CardDescription>
                                </CardHeader>
                                <CardContent className="px-6 pb-6">
                                    <Progress value={progressToNextLevel} className="h-3 bg-amber-900/50 [&>div]:bg-gradient-to-r [&>div]:from-amber-400 [&>div]:to-orange-500" />
                                    <div className="flex justify-between text-xs text-gray-400 mt-2">
                                        <span>{currentXp} XP</span>
                                        {nextLevelInfo ? <span>{nextLevelInfo.xpThreshold - currentXp} XP to next level</span> : <span>Max Level!</span>}
                                    </div>
                                </CardContent>
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
                                        {allQuests.map(quest => (
                                            <motion.div key={quest.id} variants={itemVariants}>
                                                <div 
                                                    className={cn(
                                                        "flex items-center p-4 rounded-lg border transition-all duration-300 cursor-pointer",
                                                        completedQuests.has(quest.id) 
                                                            ? 'bg-green-500/10 border-green-500/40' 
                                                            : 'bg-gray-800/50 border-amber-500/20 hover:border-amber-400/50'
                                                    )}
                                                    onClick={() => handleQuestToggle(quest.id, quest.xp)}
                                                >
                                                    <quest.icon className={cn(
                                                        "h-8 w-8 mr-4",
                                                        completedQuests.has(quest.id) ? 'text-green-400' : 'text-amber-400'
                                                    )} />
                                                    <div className="flex-grow">
                                                        <p className="text-lg font-medium text-white">{quest.title}</p>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex items-center text-amber-400 font-bold text-sm">
                                                            <Star className="h-4 w-4 mr-1" />
                                                            <span>{quest.xp} XP</span>
                                                        </div>
                                                        <Checkbox 
                                                            checked={completedQuests.has(quest.id)}
                                                            onCheckedChange={() => handleQuestToggle(quest.id, quest.xp)}
                                                            className="h-6 w-6 border-amber-400 data-[state=checked]:bg-green-500"
                                                        />
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
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

            <AnimatePresence>
                {showBadge && (
                     <AlertDialog open={!!showBadge} onOpenChange={(isOpen) => !isOpen && setShowBadge(null)}>
                        <AlertDialogContent className="bg-gray-900 border-amber-500/40 text-white">
                             <AlertDialogHeader className="items-center text-center">
                                <motion.div
                                    initial={{ scale: 0, rotate: -180 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                                    className="text-7xl mb-4"
                                >
                                    {badges[showBadge].icon}
                                </motion.div>
                                <AlertDialogTitle className="text-3xl text-amber-300">{badges[showBadge].name}</AlertDialogTitle>
                                <AlertDialogDescription className="text-gray-300 text-lg">
                                    {badges[showBadge].description}
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogAction onClick={() => setShowBadge(null)} className="w-full bg-amber-500 hover:bg-amber-600 text-white">
                                    Awesome!
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                )}
            </AnimatePresence>
        </>
    );
}

    