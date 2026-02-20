"use client";

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface FloatingElement {
  id: string;
  shape: string;
  x: number;
  y: number;
  delay: number;
  duration: number;
  size: number;
}

export default function FloatingElements() {
  const [elements, setElements] = useState<FloatingElement[]>([]);

  useEffect(() => {
    const newElements: FloatingElement[] = [];
    // Premium subtle geometric elements
    for (let i = 0; i < 6; i++) {
      newElements.push({
        id: `floating-${i}`,
        shape: 'circle', // Simple circles for premium look
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 10,
        duration: 15 + Math.random() * 10, // Very slow movement
        size: 4 + Math.random() * 8 // Random sizes
      });
    }
    setElements(newElements);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-30">
      {elements.map((element) => (
        <motion.div
          key={element.id}
          className="absolute rounded-full bg-gradient-to-br from-indigo-400/15 to-violet-400/15"
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            width: `${element.size}px`,
            height: `${element.size}px`,
          }}
          animate={{
            y: [-40, 40, -40],
            x: [-20, 20, -20],
            scale: [0.8, 1.2, 0.8],
            opacity: [0.05, 0.25, 0.05],
          }}
          transition={{
            duration: element.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: element.delay,
          }}
        />
      ))}

      {/* Sophisticated gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/3 via-violet-500/2 to-pink-500/3" />
    </div>
  );
}