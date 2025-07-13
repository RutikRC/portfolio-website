"use client";

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TypewriterSequence {
  text: string;
  segments?: Array<{
    text: string;
    color?: 'primary' | 'secondary' | 'default';
  }>;
  typingSpeed?: number;
  pauseAfter?: number;
  shouldBackspace?: boolean;
  backspaceSpeed?: number;
}

interface TypewriterEffectProps {
  sequences: TypewriterSequence[];
  className?: string;
  cursorColor?: string;
  promptSymbol?: string;
  loop?: boolean;
  initialDelay?: number;
}

const defaultSequences: TypewriterSequence[] = [
  {
    text: "Hello, I'm Rutik, building intelligent software...",
    segments: [
      { text: "Hello, I'm ", color: 'default' },
      { text: "Rutik", color: 'primary' },
      { text: ", building ", color: 'default' },
      { text: "intelligent software", color: 'secondary' },
      { text: "...", color: 'default' }
    ],
    typingSpeed: 80,
    pauseAfter: 2500,
    shouldBackspace: true,
    backspaceSpeed: 40
  },
  {
    text: "Specializing in MERN stack development...",
    segments: [
      { text: "Specializing in ", color: 'default' },
      { text: "MERN stack", color: 'primary' },
      { text: " development", color: 'secondary' },
      { text: "...", color: 'default' }
    ],
    typingSpeed: 70,
    pauseAfter: 2500,
    shouldBackspace: true,
    backspaceSpeed: 35
  },
  {
    text: "Creating AI-powered solutions with Orchids AI...",
    segments: [
      { text: "Creating ", color: 'default' },
      { text: "AI-powered", color: 'primary' },
      { text: " solutions with ", color: 'default' },
      { text: "Orchids AI", color: 'secondary' },
      { text: "...", color: 'default' }
    ],
    typingSpeed: 85,
    pauseAfter: 2500,
    shouldBackspace: true,
    backspaceSpeed: 45
  },
  {
    text: "Full-stack developer passionate about innovation...",
    segments: [
      { text: "Full-stack ", color: 'primary' },
      { text: "developer", color: 'secondary' },
      { text: " passionate about ", color: 'default' },
      { text: "innovation", color: 'primary' },
      { text: "...", color: 'default' }
    ],
    typingSpeed: 75,
    pauseAfter: 3000,
    shouldBackspace: true,
    backspaceSpeed: 38
  }
];

export const TypewriterEffect = ({ 
  sequences = defaultSequences,
  className = "",
  cursorColor = "text-primary",
  promptSymbol = ">",
  loop = true,
  initialDelay = 800
}: TypewriterEffectProps) => {
  const [currentSequenceIndex, setCurrentSequenceIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [isBackspacing, setIsBackspacing] = useState(false);
  const [isPausing, setIsPausing] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  const currentSequence = sequences[currentSequenceIndex];
  const fullText = currentSequence?.text || "";

  // Cursor blinking animation
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);

    return () => clearInterval(cursorInterval);
  }, []);

  // Initialize with delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialized(true);
      setIsTyping(true);
    }, initialDelay);

    return () => clearTimeout(timer);
  }, [initialDelay]);

  // Main typing logic
  useEffect(() => {
    if (!isInitialized || !currentSequence) return;

    let timer: NodeJS.Timeout;

    if (isTyping && currentCharIndex < fullText.length) {
      timer = setTimeout(() => {
        setCurrentText(fullText.slice(0, currentCharIndex + 1));
        setCurrentCharIndex(prev => prev + 1);
      }, currentSequence.typingSpeed || 80);
    } else if (isTyping && currentCharIndex >= fullText.length) {
      // Finished typing
      setIsTyping(false);
      if (currentSequence.pauseAfter) {
        setIsPausing(true);
        timer = setTimeout(() => {
          setIsPausing(false);
          if (currentSequence.shouldBackspace) {
            setIsBackspacing(true);
          } else {
            // Move to next sequence directly
            handleNextSequence();
          }
        }, currentSequence.pauseAfter);
      } else if (currentSequence.shouldBackspace) {
        setIsBackspacing(true);
      } else {
        handleNextSequence();
      }
    } else if (isBackspacing && currentCharIndex > 0) {
      timer = setTimeout(() => {
        setCurrentCharIndex(prev => prev - 1);
        setCurrentText(fullText.slice(0, currentCharIndex - 1));
      }, currentSequence.backspaceSpeed || 40);
    } else if (isBackspacing && currentCharIndex <= 0) {
      // Finished backspacing
      setIsBackspacing(false);
      handleNextSequence();
    }

    return () => clearTimeout(timer);
  }, [isInitialized, currentCharIndex, isTyping, isBackspacing, fullText, currentSequence, isPausing]);

  const handleNextSequence = useCallback(() => {
    setCurrentCharIndex(0);
    setCurrentText("");
    
    if (loop) {
      setCurrentSequenceIndex(prev => (prev + 1) % sequences.length);
      // Small delay before starting next sequence
      setTimeout(() => setIsTyping(true), 300);
    } else if (currentSequenceIndex < sequences.length - 1) {
      setCurrentSequenceIndex(prev => prev + 1);
      setTimeout(() => setIsTyping(true), 300);
    }
  }, [currentSequenceIndex, sequences.length, loop]);

  // Get colored segments for current text
  const getColoredText = () => {
    if (!currentSequence?.segments) {
      return <span className="text-foreground">{currentText}</span>;
    }

    let textIndex = 0;
    const result = [];

    for (let i = 0; i < currentSequence.segments.length; i++) {
      const segment = currentSequence.segments[i];
      const segmentEnd = textIndex + segment.text.length;
      const visibleSegment = currentText.slice(textIndex, Math.min(segmentEnd, currentText.length));
      
      if (visibleSegment) {
        const colorClass = segment.color === 'primary' 
          ? 'text-primary' 
          : segment.color === 'secondary'
          ? 'text-secondary'
          : 'text-foreground';
          
        result.push(
          <span key={i} className={colorClass}>
            {visibleSegment}
          </span>
        );
      }
      
      textIndex = segmentEnd;
      if (textIndex >= currentText.length) break;
    }

    return result;
  };

  return (
    <div className={`font-mono ${className}`}>
      <div className="flex items-center space-x-2">
        {/* Terminal prompt */}
        <motion.span 
          className="text-secondary font-bold text-lg md:text-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {promptSymbol}
        </motion.span>
        
        {/* Typing text container */}
        <div className="flex items-center min-h-[1.5em]">
          <motion.div
            className="text-base md:text-lg lg:text-xl font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            {getColoredText()}
          </motion.div>
          
          {/* Cursor */}
          <AnimatePresence>
            <motion.span
              className={`inline-block w-[2px] h-[1.2em] ml-1 ${cursorColor} bg-current`}
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: showCursor ? 1 : 0,
                scaleY: showCursor ? 1 : 0.8
              }}
              transition={{ 
                duration: 0.1,
                ease: "easeInOut"
              }}
              style={{ transformOrigin: "bottom" }}
            />
          </AnimatePresence>
        </div>
      </div>
      
      {/* Status indicator for debugging (remove in production) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="text-xs text-muted-foreground mt-2 space-x-2">
          <span>Seq: {currentSequenceIndex}/{sequences.length - 1}</span>
          <span>Char: {currentCharIndex}/{fullText.length}</span>
          <span>State: {isTyping ? 'typing' : isBackspacing ? 'erasing' : isPausing ? 'pausing' : 'idle'}</span>
        </div>
      )}
    </div>
  );
};

// Advanced typewriter with multiple lines and staggered effects
interface MultiLineTypewriterProps {
  lines: Array<{
    sequences: TypewriterSequence[];
    delay?: number;
    className?: string;
  }>;
  className?: string;
}

export const MultiLineTypewriter = ({ lines, className = "" }: MultiLineTypewriterProps) => {
  return (
    <div className={`space-y-4 ${className}`}>
      {lines.map((line, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.6, 
            delay: (line.delay || 0) + (index * 0.3),
            ease: "easeOut"
          }}
        >
          <TypewriterEffect
            sequences={line.sequences}
            className={line.className}
            initialDelay={(line.delay || 0) + (index * 200)}
          />
        </motion.div>
      ))}
    </div>
  );
};

// Code-style typewriter with syntax highlighting
interface CodeTypewriterProps {
  code: string;
  language?: string;
  className?: string;
  typingSpeed?: number;
}

export const CodeTypewriter = ({ 
  code, 
  language = "javascript", 
  className = "",
  typingSpeed = 50 
}: CodeTypewriterProps) => {
  const [currentCode, setCurrentCode] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < code.length) {
      const timer = setTimeout(() => {
        setCurrentCode(prev => prev + code[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, typingSpeed);

      return () => clearTimeout(timer);
    }
  }, [currentIndex, code, typingSpeed]);

  // Simple syntax highlighting for demo
  const highlightCode = (text: string) => {
    return text
      .replace(/(const|let|var|function|return|if|else|for|while)\b/g, '<span class="text-primary">$1</span>')
      .replace(/(['"`])((?:(?!\1)[^\\]|\\.)*)(\1)/g, '<span class="text-secondary">$1$2$3</span>')
      .replace(/(\d+)/g, '<span class="text-blue-400">$1</span>');
  };

  return (
    <div className={`font-mono text-sm bg-muted p-4 rounded-lg border ${className}`}>
      <div className="flex items-center space-x-2 mb-3">
        <div className="flex space-x-1">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <span className="text-muted-foreground text-xs">{language}</span>
      </div>
      <div 
        className="text-foreground leading-relaxed"
        dangerouslySetInnerHTML={{ __html: highlightCode(currentCode) }}
      />
      {currentIndex < code.length && (
        <span className="animate-pulse text-primary">|</span>
      )}
    </div>
  );
};