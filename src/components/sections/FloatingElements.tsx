"use client";

import { motion } from 'framer-motion';
import { Bot, Code, Database, Brain, Cpu, Network, GitBranch, Binary } from 'lucide-react';
import { useEffect, useState } from 'react';

interface FloatingElement {
  id: string;
  type: 'shape' | 'symbol' | 'icon' | 'line';
  content: string | React.ComponentType<any>;
  x: number;
  y: number;
  scale: number;
  opacity: number;
  zIndex: number;
  duration: number;
  delay: number;
  color: string;
}

const shapes = ['hexagon', 'triangle', 'circle'];
const symbols = ['∂', '∇', '∞', 'π', 'λ', '{}', '[]', '<>'];
const icons = [Bot, Code, Database, Brain, Cpu, Network, GitBranch, Binary];
const colors = ['#8B5CF6', '#60A5FA', '#A78BFA', '#7DD3FC'];

const createRandomElement = (): FloatingElement => {
  const types = ['shape', 'symbol', 'icon', 'line'];
  const type = types[Math.floor(Math.random() * types.length)] as FloatingElement['type'];
  
  let content: string | React.ComponentType<any>;
  
  switch (type) {
    case 'shape':
      content = shapes[Math.floor(Math.random() * shapes.length)];
      break;
    case 'symbol':
      content = symbols[Math.floor(Math.random() * symbols.length)];
      break;
    case 'icon':
      content = icons[Math.floor(Math.random() * icons.length)];
      break;
    case 'line':
      content = 'line';
      break;
  }

  return {
    id: Math.random().toString(36).substr(2, 9),
    type,
    content,
    x: Math.random() * 100,
    y: Math.random() * 100,
    scale: 0.3 + Math.random() * 0.7,
    opacity: 0.1 + Math.random() * 0.4,
    zIndex: Math.floor(Math.random() * 10),
    duration: 20 + Math.random() * 40,
    delay: Math.random() * 10,
    color: colors[Math.floor(Math.random() * colors.length)]
  };
};

const ShapeComponent = ({ shape, color, opacity }: { shape: string; color: string; opacity: number }) => {
  const shapeStyle = {
    width: '100%',
    height: '100%',
    opacity,
  };

  switch (shape) {
    case 'hexagon':
      return (
        <div
          style={{
            ...shapeStyle,
            background: color,
            clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
          }}
        />
      );
    case 'triangle':
      return (
        <div
          style={{
            ...shapeStyle,
            background: color,
            clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
          }}
        />
      );
    case 'circle':
      return (
        <div
          style={{
            ...shapeStyle,
            background: color,
            borderRadius: '50%',
          }}
        />
      );
    default:
      return null;
  }
};

const LineComponent = ({ color, opacity }: { color: string; opacity: number }) => {
  const linePatterns = [
    'M0,0 L100,0 L100,20 L20,20 L20,40 L80,40',
    'M0,20 L50,0 L100,20 L50,40 Z',
    'M0,0 L100,100 M100,0 L0,100',
    'M0,50 Q50,0 100,50 T200,50',
  ];
  
  const pattern = linePatterns[Math.floor(Math.random() * linePatterns.length)];
  
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 100 100"
      style={{ opacity }}
    >
      <path
        d={pattern}
        stroke={color}
        strokeWidth="1"
        fill="none"
        strokeOpacity={opacity}
      />
    </svg>
  );
};

const FloatingElement = ({ element }: { element: FloatingElement }) => {
  const floatAnimation = {
    x: [0, Math.random() * 100 - 50, Math.random() * 100 - 50, 0],
    y: [0, Math.random() * 100 - 50, Math.random() * 100 - 50, 0],
    rotate: [0, 360],
    scale: [element.scale, element.scale * 1.2, element.scale],
  };

  const renderContent = () => {
    switch (element.type) {
      case 'shape':
        return (
          <ShapeComponent
            shape={element.content as string}
            color={element.color}
            opacity={element.opacity}
          />
        );
      case 'symbol':
        return (
          <span
            style={{
              color: element.color,
              opacity: element.opacity,
              fontSize: '1.5rem',
              fontFamily: 'monospace',
              fontWeight: 'bold',
            }}
          >
            {element.content}
          </span>
        );
      case 'icon':
        const IconComponent = element.content as React.ComponentType<any>;
        return (
          <IconComponent
            size={24}
            color={element.color}
            style={{ opacity: element.opacity }}
          />
        );
      case 'line':
        return (
          <LineComponent
            color={element.color}
            opacity={element.opacity}
          />
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        left: `${element.x}%`,
        top: `${element.y}%`,
        zIndex: element.zIndex,
        width: element.type === 'line' ? '60px' : '32px',
        height: element.type === 'line' ? '60px' : '32px',
      }}
      animate={floatAnimation}
      transition={{
        duration: element.duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay: element.delay,
        repeatDelay: Math.random() * 5,
      }}
      whileInView={{
        opacity: [0, element.opacity, element.opacity, 0],
        transition: { duration: 2, ease: "easeInOut" }
      }}
      viewport={{ once: false, amount: 0.1 }}
    >
      {renderContent()}
    </motion.div>
  );
};

export const FloatingElements = () => {
  const [elements, setElements] = useState<FloatingElement[]>([]);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Create initial elements
    const initialElements = Array.from({ length: 25 }, createRandomElement);
    setElements(initialElements);

    // Add new elements periodically
    const interval = setInterval(() => {
      setElements(prev => {
        // Remove old elements and add new ones
        const filteredElements = prev.filter((_, index) => Math.random() > 0.1);
        const newElements = Array.from({ length: 3 }, createRandomElement);
        return [...filteredElements, ...newElements].slice(0, 30);
      });
    }, 8000);

    // Handle visibility change for performance
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <motion.div
        className="relative w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        {elements.map((element) => (
          <FloatingElement
            key={element.id}
            element={element}
          />
        ))}
        
        {/* Ambient gradient overlay */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at 20% 80%, rgba(139, 92, 246, 0.03) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(96, 165, 250, 0.03) 0%, transparent 50%),
              radial-gradient(circle at 40% 40%, rgba(167, 139, 250, 0.02) 0%, transparent 50%)
            `,
            zIndex: -1,
          }}
          animate={{
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </div>
  );
};