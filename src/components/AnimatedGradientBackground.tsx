import React from 'react';
import { motion } from 'motion/react';

interface AnimatedGradientBackgroundProps {
  className?: string;
}

const AnimatedGradientBackground: React.FC<AnimatedGradientBackgroundProps> = ({ 
  className = '' 
}) => {
  return (
    <>
      {/* CSS анимации */}
      <style jsx>{`
        @keyframes gradient-x {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        
        @keyframes gradient-y {
          0%, 100% {
            background-position: 50% 0%;
          }
          50% {
            background-position: 50% 100%;
          }
        }
        
        @keyframes gradient-xy {
          0%, 100% {
            background-position: 0% 0%;
          }
          25% {
            background-position: 100% 0%;
          }
          50% {
            background-position: 100% 100%;
          }
          75% {
            background-position: 0% 100%;
          }
        }
      `}</style>

      <div className={`fixed inset-0 -z-20 ${className}`}>
        {/* Основной градиент - глубокий черный к фиолетовому */}
        <div 
          className="absolute inset-0"
          style={{
            background: `linear-gradient(125deg, 
              #000000 0%,
              #0a0014 25%,
              #1a0033 40%,
              #2d004d 55%,
              #1a0033 70%,
              #0a0014 85%,
              #000000 100%
            )`,
            backgroundSize: '200% 200%',
            animation: 'gradient-xy 20s ease infinite',
          }}
        />
        
        {/* Слой с фуксией */}
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            background: `linear-gradient(45deg, 
              transparent 0%,
              rgba(208, 38, 255, 0.2) 50%,
              transparent 100%
            )`,
            backgroundSize: '200% 200%',
            animation: 'gradient-x 15s ease infinite',
          }}
        />
        
        {/* Виньетка */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent" />
      </div>
    </>
  );
};

export default AnimatedGradientBackground;
