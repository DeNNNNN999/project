import React, { useMemo } from 'react';
import { motion } from 'motion/react';

const AnimatedBackground: React.FC<{ opacity?: number }> = ({ opacity = 1 }) => {
  // Генерируем частицы для фона
  const particles = useMemo(
    () =>
      Array.from({ length: 30 }).map((_, i) => ({
        id: i,
        width: Math.random() * 3 + 0.5,
        height: Math.random() * 3 + 0.5,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        background: `rgba(${Math.floor(Math.random() * 80 + 100)}, ${Math.floor(
          Math.random() * 80 + 100,
        )}, ${Math.floor(Math.random() * 100 + 155)}, ${Math.random() * 0.25 + 0.05})`,
        boxShadow: '0 0 5px rgba(100, 100, 255, 0.15)',
        duration: Math.random() * 12 + 10,
        delay: Math.random() * 5,
        xRange: Math.random() * 60 - 30,
        yRange: Math.random() * 60 - 30,
      })),
    [],
  );

  // Большие светящиеся круги
  const glowCircles = useMemo(
    () =>
      Array.from({ length: 4 }).map((_, i) => ({
        id: i,
        width: Math.random() * 300 + 200,
        height: Math.random() * 300 + 200,
        left: `${Math.random() * 80 + 10}%`,
        top: `${Math.random() * 80 + 10}%`,
        background: `radial-gradient(circle, rgba(${
          Math.random() > 0.5 ? '62, 82, 163' : '106, 72, 168'
        }, 0.08) 0%, rgba(${
          Math.random() > 0.5 ? '41, 53, 94' : '72, 52, 112'
        }, 0) 70%)`,
        duration: Math.random() * 60 + 40,
        delay: Math.random() * 10,
        scale: [0.8, 1.2, 0.9],
      })),
    [],
  );

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#0F172A]" style={{ opacity }}>
      {/* Анимированные частицы */}
      {particles.map(p => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.width,
            height: p.height,
            left: p.left,
            top: p.top,
            background: p.background,
            boxShadow: p.boxShadow,
          }}
          animate={{ 
            opacity: [0.1, 0.5, 0.1], 
            scale: [1, 1.05, 1], 
            x: [0, p.xRange, 0], 
            y: [0, p.yRange, 0] 
          }}
          transition={{ 
            duration: p.duration, 
            repeat: Infinity, 
            ease: 'linear', 
            delay: p.delay 
          }}
        />
      ))}

      {/* Большие светящиеся круги */}
      {glowCircles.map(circle => (
        <motion.div
          key={`glow-${circle.id}`}
          className="absolute rounded-full opacity-40"
          style={{
            width: circle.width,
            height: circle.height,
            left: circle.left,
            top: circle.top,
            background: circle.background,
          }}
          animate={{ 
            scale: circle.scale,
            x: [0, Math.random() * 40 - 20, 0],
            y: [0, Math.random() * 40 - 20, 0],
          }}
          transition={{ 
            duration: circle.duration, 
            repeat: Infinity, 
            ease: 'linear', 
            delay: circle.delay 
          }}
        />
      ))}

      {/* Градиент сверху */}
      <div className="absolute top-0 left-0 w-full h-[300px] bg-gradient-to-b from-blue-900/10 to-transparent" />
      
      {/* Градиент снизу */}
      <div className="absolute bottom-0 left-0 w-full h-[300px] bg-gradient-to-t from-slate-900/30 to-transparent" />
    </div>
  );
};

export default AnimatedBackground;
