import React from 'react';
import { motion } from 'motion/react';

interface MinimalGradientBackgroundProps {
  variant?: 'hero' | 'projects' | 'skills' | 'contact' | 'default';
  className?: string;
}

const MinimalGradientBackground: React.FC<MinimalGradientBackgroundProps> = ({ 
  variant = 'default',
  className = '' 
}) => {
  // Минималистичные конфигурации с purple и black
  const gradientConfigs = {
    hero: {
      gradient: 'radial-gradient(ellipse at top, rgba(139, 92, 246, 0.15) 0%, transparent 50%)',
      animation: 'pulse 8s ease-in-out infinite',
    },
    projects: {
      gradient: 'radial-gradient(circle at 30% 50%, rgba(139, 92, 246, 0.1) 0%, transparent 60%)',
      animation: 'shift 15s ease-in-out infinite',
    },
    skills: {
      gradient: 'radial-gradient(circle at 70% 30%, rgba(139, 92, 246, 0.12) 0%, transparent 50%)',
      animation: 'breathe 10s ease-in-out infinite',
    },
    contact: {
      gradient: 'radial-gradient(ellipse at bottom, rgba(139, 92, 246, 0.1) 0%, transparent 60%)',
      animation: 'glow 12s ease-in-out infinite',
    },
    default: {
      gradient: 'radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.1) 0%, transparent 70%)',
      animation: 'pulse 10s ease-in-out infinite',
    }
  };

  const config = gradientConfigs[variant];

  return (
    <>
      {/* CSS анимации */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
        
        @keyframes shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes breathe {
          0%, 100% { opacity: 0.3; filter: blur(60px); }
          50% { opacity: 0.6; filter: blur(40px); }
        }
        
        @keyframes glow {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.7; }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) translateX(0); }
          33% { transform: translateY(-20px) translateX(10px); }
          66% { transform: translateY(10px) translateX(-10px); }
        }
      `}</style>

      <div className={`absolute inset-0 overflow-hidden ${className}`}>
        {/* Основной градиент */}
        <div 
          className="absolute inset-0"
          style={{
            background: config.gradient,
            animation: config.animation,
          }}
        />
        
        {/* Дополнительное свечение для hero секции */}
        {variant === 'hero' && (
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]"
            style={{
              background: 'radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, transparent 70%)',
              filter: 'blur(100px)',
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        )}
        
        {/* Минималистичные плавающие элементы */}
        {(variant === 'projects' || variant === 'skills') && (
          <>
            <div 
              className="absolute w-96 h-96 -top-48 -right-48 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(139, 92, 246, 0.05) 0%, transparent 70%)',
                animation: 'float-slow 20s ease-in-out infinite',
              }}
            />
            <div 
              className="absolute w-80 h-80 -bottom-40 -left-40 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(139, 92, 246, 0.05) 0%, transparent 70%)',
                animation: 'float-slow 25s ease-in-out infinite reverse',
              }}
            />
          </>
        )}
        
        {/* Очень легкая сетка для skills */}
        {variant === 'skills' && (
          <div 
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `
                linear-gradient(0deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '100px 100px',
            }}
          />
        )}
        
        {/* Затемнение снизу */}
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/20 to-transparent" />
      </div>
    </>
  );
};

export default MinimalGradientBackground;
