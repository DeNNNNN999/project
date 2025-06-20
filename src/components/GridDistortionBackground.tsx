import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface GridDistortionBackgroundProps {
  className?: string;
}

const GridDistortionBackground: React.FC<GridDistortionBackgroundProps> = ({ 
  className = '' 
}) => {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    // Функция для анимации волны
    const animateWave = (e: MouseEvent) => {
      const rect = grid.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const deltaX = (x - centerX) / centerX;
      const deltaY = (y - centerY) / centerY;
      
      grid.style.setProperty('--mouse-x', deltaX.toString());
      grid.style.setProperty('--mouse-y', deltaY.toString());
    };

    window.addEventListener('mousemove', animateWave);
    
    return () => {
      window.removeEventListener('mousemove', animateWave);
    };
  }, []);

  return (
    <div className={`fixed inset-0 overflow-hidden ${className}`} style={{ zIndex: -1 }}>
      {/* Основной градиент фон */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            'radial-gradient(ellipse at 20% 30%, #2d0033 0%, #000000 40%, #1a001f 100%)',
            'radial-gradient(ellipse at 80% 70%, #4a0080 0%, #000000 40%, #2d0033 100%)',
            'radial-gradient(ellipse at 50% 50%, #d926ff 0%, #000000 50%, #1a001f 100%)',
            'radial-gradient(ellipse at 20% 30%, #2d0033 0%, #000000 40%, #1a001f 100%)',
          ]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Искаженная сетка */}
      <div 
        ref={gridRef}
        className="absolute inset-0"
        style={{
          perspective: '1000px',
          transformStyle: 'preserve-3d',
          '--mouse-x': '0',
          '--mouse-y': '0',
        } as React.CSSProperties}
      >
        {/* Анимированная сетка */}
        <motion.div
          className="w-full h-full"
          animate={{
            rotateX: [0, 5, 0, -5, 0],
            rotateY: [0, -5, 0, 5, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            backgroundImage: `
              linear-gradient(rgba(217, 38, 255, 0.3) 2px, transparent 2px),
              linear-gradient(90deg, rgba(217, 38, 255, 0.3) 2px, transparent 2px),
              linear-gradient(rgba(217, 38, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(217, 38, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px, 60px 60px, 20px 20px, 20px 20px',
            backgroundPosition: '-2px -2px, -2px -2px, -1px -1px, -1px -1px',
            transform: `
              rotateX(calc(var(--mouse-y) * 10deg))
              rotateY(calc(var(--mouse-x) * 10deg))
              translateZ(-100px)
            `,
            transformOrigin: 'center center',
          }}
        />

        {/* Вторая сетка для глубины */}
        <motion.div
          className="absolute inset-0"
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            backgroundImage: `
              linear-gradient(45deg, rgba(74, 0, 128, 0.2) 25%, transparent 25%),
              linear-gradient(-45deg, rgba(74, 0, 128, 0.2) 25%, transparent 25%),
              linear-gradient(45deg, transparent 75%, rgba(74, 0, 128, 0.2) 75%),
              linear-gradient(-45deg, transparent 75%, rgba(74, 0, 128, 0.2) 75%)
            `,
            backgroundSize: '40px 40px',
            backgroundPosition: '0 0, 0 20px, 20px -20px, -20px 0px',
            transform: `
              rotateX(calc(var(--mouse-y) * -5deg))
              rotateY(calc(var(--mouse-x) * -5deg))
              translateZ(-50px)
            `,
          }}
        />
      </div>

      {/* Волновой эффект */}
      <svg className="absolute inset-0 w-full h-full opacity-30">
        <defs>
          <filter id="wave">
            <feTurbulence
              baseFrequency="0.02"
              numOctaves="3"
              result="turbulence"
            >
              <animate
                attributeName="baseFrequency"
                dur="10s"
                values="0.02;0.05;0.02"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap
              in2="turbulence"
              in="SourceGraphic"
              scale="20"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill="url(#gridGradient)"
          filter="url(#wave)"
        />
        <defs>
          <linearGradient id="gridGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d926ff" stopOpacity="0.2">
              <animate
                attributeName="stop-opacity"
                dur="3s"
                values="0.2;0.5;0.2"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="50%" stopColor="#4a0080" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.3" />
          </linearGradient>
        </defs>
      </svg>

      {/* Свечение */}
      <motion.div
        className="absolute inset-0 opacity-50"
        animate={{
          background: [
            'radial-gradient(circle at 20% 80%, rgba(217, 38, 255, 0.4) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 20%, rgba(217, 38, 255, 0.4) 0%, transparent 50%)',
            'radial-gradient(circle at 50% 50%, rgba(217, 38, 255, 0.4) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 80%, rgba(217, 38, 255, 0.4) 0%, transparent 50%)',
          ]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          mixBlendMode: 'screen',
        }}
      />

      {/* Виньетка для фокуса */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent" />
        <div className="absolute inset-0 opacity-60" style={{ background: 'radial-gradient(circle, transparent 0%, black 80%)' }} />
      </div>

      {/* Дополнительные линии для cyberpunk эффекта */}
      <div className="absolute inset-0 opacity-20">
        <motion.div
          className="absolute w-full h-px bg-gradient-to-r from-transparent via-fuchsia-500 to-transparent"
          animate={{
            y: [-100, 2000],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
            repeatDelay: 2,
          }}
        />
        <motion.div
          className="absolute w-px h-full bg-gradient-to-b from-transparent via-purple-500 to-transparent"
          animate={{
            x: [-100, 2000],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
            repeatDelay: 3,
          }}
        />
      </div>
    </div>
  );
};

export default GridDistortionBackground;