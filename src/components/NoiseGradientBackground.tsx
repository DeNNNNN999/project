import React from 'react';
import { motion } from 'framer-motion';

interface NoiseGradientBackgroundProps {
  className?: string;
}

const NoiseGradientBackground: React.FC<NoiseGradientBackgroundProps> = ({ 
  className = '' 
}) => {
  return (
    <div className={`fixed inset-0 -z-20 ${className}`}>
      {/* SVG фильтры */}
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          {/* Органический шум */}
          <filter id="noiseFilter">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.02"
              numOctaves="4"
              seed="5"
            >
              <animate
                attributeName="baseFrequency"
                dur="60s"
                values="0.02;0.06;0.02"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 20 -10" />
          </filter>

          {/* Более мягкий шум для второго слоя */}
          <filter id="softNoiseFilter">
            <feTurbulence
              type="turbulence"
              baseFrequency="0.01"
              numOctaves="2"
              seed="10"
            >
              <animate
                attributeName="baseFrequency"
                dur="40s"
                values="0.01;0.02;0.01"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feGaussianBlur stdDeviation="1" />
            <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 10 -5" />
          </filter>
        </defs>
      </svg>

      {/* Основной градиент */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            'radial-gradient(ellipse at top left, #1a0033 0%, #000000 50%, #0a0014 100%)',
            'radial-gradient(ellipse at top right, #2d004d 0%, #000000 50%, #0a0014 100%)',
            'radial-gradient(ellipse at bottom right, #1a0033 0%, #000000 50%, #0a0014 100%)',
            'radial-gradient(ellipse at bottom left, #2d004d 0%, #000000 50%, #0a0014 100%)',
            'radial-gradient(ellipse at top left, #1a0033 0%, #000000 50%, #0a0014 100%)',
          ]
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          backgroundSize: '200% 200%',
        }}
      />

      {/* Слой с шумом */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          filter: 'url(#noiseFilter)',
          mixBlendMode: 'overlay',
        }}
      />

      {/* Второй слой с более мягким шумом для глубины */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          filter: 'url(#softNoiseFilter)',
          mixBlendMode: 'soft-light',
        }}
      />

      {/* Цветовой акцент с анимацией */}
      <motion.div
        className="absolute inset-0 opacity-40"
        animate={{
          background: [
            'radial-gradient(circle at 30% 50%, rgba(208, 38, 255, 0.2) 0%, transparent 40%)',
            'radial-gradient(circle at 70% 50%, rgba(139, 92, 246, 0.2) 0%, transparent 40%)',
            'radial-gradient(circle at 50% 30%, rgba(208, 38, 255, 0.2) 0%, transparent 40%)',
            'radial-gradient(circle at 50% 70%, rgba(139, 92, 246, 0.2) 0%, transparent 40%)',
            'radial-gradient(circle at 30% 50%, rgba(208, 38, 255, 0.2) 0%, transparent 40%)',
          ]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Виньетка для фокуса на контенте */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20" />
      </div>

      {/* Дополнительный статический шум для текстуры */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '128px 128px'
        }}
      />
    </div>
  );
};

export default NoiseGradientBackground;