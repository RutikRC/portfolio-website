"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface WavingDogBotProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  showGreeting?: boolean;
}

export const WavingDogBot = ({ 
  className, 
  size = "md", 
  showGreeting = true 
}: WavingDogBotProps) => {
  const [isWaving, setIsWaving] = useState(false);
  const [showSpeechBubble, setShowSpeechBubble] = useState(false);
  const [typedText, setTypedText] = useState("");

  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-24 h-24 sm:w-32 sm:h-32",
    lg: "w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48"
  };

  const bubbleSizeClasses = {
    sm: "text-xs px-2 py-1",
    md: "text-sm px-3 py-1.5 sm:text-base sm:px-4 sm:py-2",
    lg: "text-base px-4 py-2 sm:text-lg sm:px-5 sm:py-2.5"
  };

  // Periodic waving animation
  useEffect(() => {
    const waveInterval = setInterval(() => {
      setIsWaving(true);
      setTimeout(() => setIsWaving(false), 1000);
    }, 3500);

    return () => clearInterval(waveInterval);
  }, []);

  // Speech bubble animation
  useEffect(() => {
    if (showGreeting) {
      const showTimeout = setTimeout(() => {
        setShowSpeechBubble(true);
      }, 500);

      return () => clearTimeout(showTimeout);
    }
  }, [showGreeting]);

  // Typing effect
  useEffect(() => {
    if (showSpeechBubble) {
      const text = "こんにちは!";
      let i = 0;
      const typeInterval = setInterval(() => {
        if (i < text.length) {
          setTypedText(text.slice(0, i + 1));
          i++;
        } else {
          clearInterval(typeInterval);
        }
      }, 100);

      return () => clearInterval(typeInterval);
    }
  }, [showSpeechBubble]);

  const floatingVariants = {
    animate: {
      y: [0, -8, 0],
      transition: {
        duration: 3,
        ease: "easeInOut",
        repeat: Infinity,
      }
    }
  };

  const waveVariants = {
    wave: {
      rotate: [0, 15, -10, 15, -5, 0],
      transition: {
        duration: 0.8,
        ease: "easeInOut",
      }
    },
    idle: {
      rotate: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      }
    }
  };

  const hoverVariants = {
    hover: {
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      }
    },
    initial: {
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      }
    }
  };

  const speechBubbleVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 10,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
        duration: 0.4,
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 10,
      transition: {
        duration: 0.2,
      }
    }
  };

  return (
    <div className={cn("relative flex flex-col items-center", className)}>
      {/* Speech Bubble */}
      <AnimatePresence>
        {showSpeechBubble && showGreeting && (
          <motion.div
            variants={speechBubbleVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative mb-2"
          >
            <div className={cn(
              "bg-white rounded-2xl shadow-lg border-2 border-primary/20 relative",
              "before:content-[''] before:absolute before:-bottom-2 before:left-1/2 before:-translate-x-1/2",
              "before:w-0 before:h-0 before:border-l-[8px] before:border-r-[8px] before:border-t-[8px]",
              "before:border-l-transparent before:border-r-transparent before:border-t-white",
              "after:content-[''] after:absolute after:-bottom-3 after:left-1/2 after:-translate-x-1/2",
              "after:w-0 after:h-0 after:border-l-[10px] after:border-r-[10px] after:border-t-[10px]",
              "after:border-l-transparent after:border-r-transparent after:border-t-primary/20",
              bubbleSizeClasses[size]
            )}>
              <span className="font-medium bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {typedText}
                <motion.span
                  className="ml-0.5 text-primary"
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                >
                  |
                </motion.span>
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dog Bot Container */}
      <motion.div
        className="relative"
        variants={floatingVariants}
        animate="animate"
        whileHover="hover"
        initial="initial"
      >
        <motion.div
          variants={hoverVariants}
          whileHover="hover"
          initial="initial"
          className="cursor-pointer"
        >
          <motion.div
            variants={waveVariants}
            animate={isWaving ? "wave" : "idle"}
            className={cn(
              "relative rounded-full overflow-hidden shadow-lg",
              "ring-4 ring-primary/20 bg-gradient-to-br from-primary/10 to-secondary/10",
              "transition-shadow duration-300 hover:shadow-xl hover:ring-primary/30",
              sizeClasses[size]
            )}
          >
            <img
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/1eab43bd-00da-49a4-8b14-ee315cb86de6/generated_images/cute-cartoon-developer-dog-bot-character-d43f2122-20250713053033.jpg"
              alt="Friendly Developer Dog Bot"
              className="w-full h-full object-cover"
            />
            
            {/* Gradient Overlay for better integration */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-secondary/5 pointer-events-none" />
            
            {/* Animated Border Glow */}
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{
                boxShadow: [
                  "0 0 20px rgba(139, 92, 246, 0.3)",
                  "0 0 30px rgba(96, 165, 250, 0.3)",
                  "0 0 20px rgba(139, 92, 246, 0.3)"
                ]
              }}
              transition={{
                duration: 4,
                ease: "easeInOut",
                repeat: Infinity,
              }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};