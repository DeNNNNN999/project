import React, { useMemo } from 'react';
import { motion } from 'motion/react';

interface StarBackgroundProps {
  count?: number;
  opacity?: number;
}

const StarBackground: React.FC<StarBackgroundProps> = ({ count = 100, opacity = 0.5 }) => {
  // Генерируем звезды для фона
  const stars = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => {
        const size = Math.random() * 2 + 0.5;
        const isBlinking = Math.random() > 0.7;
        
        return {
          id: i,
          size,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          opacity: Math.random() * 0.8 + 0.2,
          blinkDuration: Math.random() * 5 + 3,
          blinkDelay: Math.random() * 5,
          isBlinking,
        };
      }),
    [count],
  );

  return (
    <div className="fixed inset-0 -z-20 overflow-hidden" style={{ opacity }}>
      {stars.map(star => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            width: star.size,
            height: star.size,
            left: star.left,
            top: star.top,
            opacity: star.isBlinking ? 0.2 : star.opacity,
          }}
          animate={
            star.isBlinking
              ? {
                  opacity: [star.opacity, star.opacity * 0.3, star.opacity],
                  scale: [1, 1.2, 1],
                }
              : {}
          }
          transition={{
            duration: star.blinkDuration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: star.blinkDelay,
          }}
        />
      ))}
    </div>
  );
};

export default StarBackground;
