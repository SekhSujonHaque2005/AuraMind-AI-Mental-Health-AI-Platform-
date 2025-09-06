
import { Flame, Droplet, BookOpen, Footprints, Shield, Wand2 } from 'lucide-react';
import type { ElementType } from 'react';

export type QuestCategory = 'mindfulness' | 'hydration' | 'gratitude' | 'exercise' | 'learning' | 'digital-detox' | 'custom';

export const questIcons: Record<QuestCategory, ElementType> = {
    mindfulness: Flame,
    hydration: Droplet,
    gratitude: BookOpen,
    exercise: Footprints,
    learning: BookOpen,
    'digital-detox': Shield,
    custom: Wand2,
};

export const defaultQuests = [
  { id: 'water', title: 'Drink 8 glasses of water', xp: 10, isDefault: true, duration: 28800, category: 'hydration' as QuestCategory },
  { id: 'meditate', title: '10 minutes of meditation', xp: 20, isDefault: true, duration: 600, category: 'mindfulness' as QuestCategory },
  { id: 'journal', title: 'Gratitude journaling', xp: 15, isDefault: true, duration: 300, category: 'gratitude' as QuestCategory },
  { id: 'walk', title: 'Go for a 15-minute walk', xp: 15, isDefault: true, duration: 900, category: 'exercise' as QuestCategory },
  { id: 'read', title: 'Read a book for 15 mins', xp: 10, isDefault: true, duration: 900, category: 'learning' as QuestCategory },
  { id: 'no_screen', title: '30 mins no screen before bed', xp: 20, isDefault: true, duration: 1800, category: 'digital-detox' as QuestCategory },
];

export const levels = [
  { level: 1, name: 'Mindful Novice', xpThreshold: 0, icon: '🌱' },
  { level: 2, name: 'Wellness Apprentice', xpThreshold: 100, icon: '🌿' },
  { level: 3, name: 'Mindful Explorer', xpThreshold: 250, icon: '🌲' },
  { level: 4, name: 'Serenity Seeker', xpThreshold: 500, icon: '🧘' },
  { level: 5, name: 'Zen Master', xpThreshold: 1000, icon: '🧘‍♀️' },
];

export type QuestStatus = 'idle' | 'active' | 'completed' | 'failed';

interface Quest {
    id: string;
    title: string;
    xp: number;
    isDefault: boolean;
    duration: number | null;
    category: QuestCategory;
}
  
export type QuestWithStatus = Quest & { status: QuestStatus };

export const badges = {
    'daily_complete': { name: 'Daily Champion', icon: '🏆', description: "Your goals for today have been completed! Come back tomorrow for new adventures." },
    'consistency_hero': { name: 'Consistency Hero', icon: '💪', description: 'Completed quests 3 days in a row!' },
    'zen_master': { name: 'Zen Master', icon: '🧘', description: 'Completed 10 meditation sessions!' },
}
export type BadgeKey = keyof typeof badges;

    