"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Zap, Star, CheckCircle } from 'lucide-react';
import { useProgress } from '@/context/ProgressContext';

interface NotificationData {
  id: string;
  type: 'xp' | 'achievement' | 'level_complete';
  title: string;
  message: string;
  xp?: number;
  timestamp: Date;
}

export default function XPNotification() {
  const [notifications, setNotifications] = useState<NotificationData[]>([]);
  const { addEventListener, removeEventListener } = useProgress();

  useEffect(() => {
    const handleLevelCompleted = (event: any) => {
      const notification: NotificationData = {
        id: `level-${event.payload.levelId}-${Date.now()}`,
        type: 'level_complete',
        title: 'Level Complete!',
        message: `Great job completing Level ${event.payload.levelId}!`,
        xp: event.payload.xpEarned,
        timestamp: event.timestamp,
      };
      showNotification(notification);
    };

    const handleAchievementUnlocked = (event: any) => {
      const notification: NotificationData = {
        id: `achievement-${event.payload.achievementId}-${Date.now()}`,
        type: 'achievement',
        title: 'Achievement Unlocked!',
        message: `You earned: ${event.payload.achievementId}`,
        xp: event.payload.xpEarned,
        timestamp: event.timestamp,
      };
      showNotification(notification);
    };

    addEventListener('level_completed', handleLevelCompleted);
    addEventListener('achievement_unlocked', handleAchievementUnlocked);

    return () => {
      removeEventListener('level_completed', handleLevelCompleted);
      removeEventListener('achievement_unlocked', handleAchievementUnlocked);
    };
  }, [addEventListener, removeEventListener]);

  const showNotification = (notification: NotificationData) => {
    setNotifications(prev => [...prev, notification]);

    // Auto remove after 4 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== notification.id));
    }, 4000);
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'xp':
        return <Zap className="w-5 h-5 text-yellow-400" />;
      case 'achievement':
        return <Trophy className="w-5 h-5 text-yellow-400" />;
      case 'level_complete':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      default:
        return <Star className="w-5 h-5 text-primary" />;
    }
  };

  const getColors = (type: string) => {
    switch (type) {
      case 'xp':
        return 'from-yellow-500/20 to-orange-500/20 border-yellow-500/30';
      case 'achievement':
        return 'from-yellow-500/20 to-orange-500/20 border-yellow-500/30';
      case 'level_complete':
        return 'from-green-500/20 to-emerald-500/20 border-green-500/30';
      default:
        return 'from-primary/20 to-secondary/20 border-primary/30';
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 pointer-events-none">
      <AnimatePresence>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: 300, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 300, scale: 0.8 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
            className={`pointer-events-auto bg-gradient-to-r ${getColors(notification.type)} backdrop-blur-xl rounded-2xl border p-4 shadow-2xl max-w-sm cursor-pointer hover:scale-105 transition-transform`}
            onClick={() => removeNotification(notification.id)}
          >
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0">
                {getIcon(notification.type)}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-white font-semibold text-sm">
                  {notification.title}
                </h4>
                <p className="text-white/80 text-xs mt-1">
                  {notification.message}
                </p>
                {notification.xp && (
                  <div className="flex items-center gap-1 mt-2">
                    <Zap className="w-3 h-3 text-yellow-400" />
                    <span className="text-yellow-400 text-xs font-semibold">
                      +{notification.xp} XP
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Progress bar for auto-dismiss */}
            <motion.div
              className="absolute bottom-0 left-0 h-1 bg-white/30 rounded-b-2xl"
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{ duration: 4, ease: "linear" }}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}