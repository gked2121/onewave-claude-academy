"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showAnimation?: boolean;
}

export default function Logo({ size = "md", showAnimation = true }: LogoProps) {
  const [displayText, setDisplayText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const fullText = "Claude Quest";

  // Typing animation effect
  useEffect(() => {
    if (!showAnimation) {
      setDisplayText(fullText);
      return;
    }

    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 150);

    return () => clearInterval(typingInterval);
  }, [showAnimation]);

  // Blinking cursor effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);

    return () => clearInterval(cursorInterval);
  }, []);

  const sizes = {
    sm: {
      width: "w-32",
      height: "h-12",
      text: "text-xs",
      padding: "p-1",
      border: "border",
      innerText: "text-[8px]",
    },
    md: {
      width: "w-40",
      height: "h-16",
      text: "text-base",
      padding: "p-1.5",
      border: "border-2",
      innerText: "text-xs",
    },
    lg: {
      width: "w-52",
      height: "h-20",
      text: "text-xl",
      padding: "p-2",
      border: "border-2",
      innerText: "text-base",
    },
  };

  const sizeConfig = sizes[size];

  return (
    <div className="flex items-center">
      {/* Chat Window Sketch */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className={`relative ${sizeConfig.width} ${sizeConfig.height}`}
      >
        {/* Window frame */}
        <div
          className={`${sizeConfig.width} ${sizeConfig.height} ${sizeConfig.border} border-orange-400/60 rounded-lg bg-gradient-to-br from-orange-500/10 to-amber-500/10 backdrop-blur-sm relative overflow-hidden flex flex-col`}
        >
          {/* Window header with dots */}
          <div className={`flex items-center justify-between px-2 py-1.5 border-b border-orange-400/30`}>
            <div className="flex gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-red-400/60"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-400/60"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-green-400/60"></div>
            </div>
          </div>

          {/* Chat content area with text */}
          <div className="flex-1 flex items-center justify-center px-3 py-2">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-1"
            >
              <h1 className={`${sizeConfig.innerText} font-bold bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent whitespace-nowrap`}>
                {displayText}
                {showAnimation && displayText.length < fullText.length && (
                  <motion.span
                    animate={{ opacity: showCursor ? 1 : 0 }}
                    className="inline-block w-0.5 h-3 ml-0.5 bg-gradient-to-b from-orange-400 to-amber-400"
                  />
                )}
              </h1>
            </motion.div>
          </div>

          {/* Typing indicator dots at bottom */}
          {showAnimation && displayText.length < fullText.length && (
            <div className="absolute bottom-2 left-2 flex gap-0.5">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{
                    y: [0, -2, 0],
                    opacity: [0.4, 1, 0.4],
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    delay: i * 0.15,
                  }}
                  className="w-1 h-1 rounded-full bg-orange-400"
                />
              ))}
            </div>
          )}
        </div>

        {/* Glow effect */}
        <motion.div
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 rounded-lg bg-gradient-to-br from-orange-500/20 to-amber-500/20 blur-sm -z-10"
        />
      </motion.div>
    </div>
  );
}
