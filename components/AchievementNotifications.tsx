"use client";

import { useEffect, useState } from "react";
import { useProgress } from "@/context/ProgressContext";
import AchievementUnlock from "./AchievementUnlock";
import { achievements } from "@/lib/achievements";
import { AchievementUnlockedEvent } from "@/types";

export default function AchievementNotifications() {
  const [currentAchievement, setCurrentAchievement] = useState<string | null>(null);
  const [queue, setQueue] = useState<string[]>([]);
  const progress = useProgress();

  useEffect(() => {
    const handleAchievementUnlocked = (event: AchievementUnlockedEvent) => {
      const achievementId = event.payload.achievementId;

      // Add to queue
      setQueue(prev => [...prev, achievementId]);
    };

    // Register event listener
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    progress.addEventListener('achievement_unlocked', handleAchievementUnlocked as any);

    return () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      progress.removeEventListener('achievement_unlocked', handleAchievementUnlocked as any);
    };
  }, [progress]);

  // Process queue - show one achievement at a time
  useEffect(() => {
    if (queue.length > 0 && !currentAchievement) {
      const [next, ...rest] = queue;
      setCurrentAchievement(next);
      setQueue(rest);
    }
  }, [queue, currentAchievement]);

  const handleClose = () => {
    setCurrentAchievement(null);
  };

  if (!currentAchievement) return null;

  const achievement = achievements.find(a => a.id === currentAchievement);
  if (!achievement) return null;

  return (
    <AchievementUnlock
      achievement={achievement}
      onClose={handleClose}
    />
  );
}
