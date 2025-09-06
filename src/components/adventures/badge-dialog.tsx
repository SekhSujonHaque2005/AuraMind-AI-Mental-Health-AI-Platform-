
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction } from '@/components/ui/alert-dialog';

export const badges = {
    'daily_complete': { name: 'Daily Champion', icon: '🏆', description: "Your goals for today have been completed! Come back tomorrow for new adventures." },
    'consistency_hero': { name: 'Consistency Hero', icon: '💪', description: 'Completed quests 3 days in a row!' },
    'zen_master': { name: 'Zen Master', icon: '🧘', description: 'Completed 10 meditation sessions!' },
}
export type BadgeKey = keyof typeof badges;

const BadgeDialog = ({ badge, onClose }: { badge: BadgeKey | null; onClose: () => void }) => {
  if (!badge) return null;

  return (
    <AnimatePresence>
      {badge && (
        <AlertDialog open={!!badge}>
          <AlertDialogContent className="bg-gray-900 border-amber-500/40 text-white">
            <AlertDialogHeader className="items-center text-center">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                className="text-7xl mb-4"
              >
                {badges[badge].icon}
              </motion.div>
              <AlertDialogTitle className="text-3xl text-amber-300">{badges[badge].name}</AlertDialogTitle>
              <AlertDialogDescription className="text-gray-300 text-lg">
                {badges[badge].description}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction onClick={onClose} className="w-full bg-amber-500 hover:bg-amber-600 text-white">
                Awesome!
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </AnimatePresence>
  );
};

export default BadgeDialog;
