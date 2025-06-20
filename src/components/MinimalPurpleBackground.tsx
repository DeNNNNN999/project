import React from 'react';
import { motion } from 'motion/react';

interface MinimalPurpleBackgroundProps {
  intensity?: 'low' | 'medium' | 'high';
  className?: string;
}

const MinimalPurpleBackground: React.FC<MinimalPurpleBackgroundProps> = ({ 
  intensity = 'medium',
  className = '' 
}) => {
  const intensityConfig = {
    low: {
      opacity: 0.15,
      blur: 120,
      scale: [0.9, 1.1, 0.9],
    },
    medium: {
      opacity: 0.2,
      blur: 100,
      scale: [0.8, 1.2, 0.8],
    },
    high: {
      opacity: 0.3,
      blur: 80,
      scale: [0.7, 1.3, 0.7],
    }
  };

  const config = intensityConfig[intensity];

  return (
    <div className={`fixed inset-0 -z-20 ${className}`}>
      {/* Чистый черный фон */}
      <div className="absolute inset-0 bg-black" />
      
      {/* Минималистичное фиолетовое свечение по центру */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
          style={{
            background: `radial-gradient(circle, rgba(139, 92, 246, ${config.opacity}) 0%, transparent 70%)`,
            filter: `blur(${config.blur}px)`,
          }}
          animate={{
            scale: config.scale,
            opacity: [config.opacity * 0.7, config.opacity, config.opacity * 0.7],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Дополнительное маленькое свечение сверху */}
        <motion.div
          className="absolute top-20 left-1/2 -translate-x-1/2 w-[400px] h-[400px] rounded-full"
          style={{
            background: `radial-gradient(circle, rgba(139, 92, 246, ${config.opacity * 0.5}) 0%, transparent 70%)`,
            filter: `blur(${config.blur + 20}px)`,
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [config.opacity * 0.3, config.opacity * 0.5, config.opacity * 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>
      
      {/* Очень легкая виньетка */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-transparent" />
      </div>
    </div>
  );
};

export default MinimalPurpleBackground;
