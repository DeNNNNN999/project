import React from 'react';
import { motion } from 'motion/react';

interface DynamicGradientBackgroundProps {
  variant?: 'hero' | 'projects' | 'skills' | 'contact' | 'default';
  className?: string;
}

const DynamicGradientBackground: React.FC<DynamicGradientBackgroundProps> = ({ 
  variant = 'default',
  className = '' 
}) => {
  // Разные конфигурации для разных секций
  const gradientConfigs = {
    hero: {
      colors: ['#EC4899', '#8B5CF6', '#000000'], // pink, purple, black
      positions: ['0%', '50%', '100%'],
      animation: 'gradient-shift-hero 15s ease infinite',
    },
    projects: {
      colors: ['#000000', '#EC4899', '#8B5CF6', '#000000'], // black, pink, purple, black
      positions: ['0%', '25%', '75%', '100%'],
      animation: 'gradient-rotate 20s linear infinite',
    },
    skills: {
      colors: ['#8B5CF6', '#EC4899', '#3B82F6', '#000000'], // purple, pink, blue, black
      positions: ['0%', '33%', '66%', '100%'],
      animation: 'gradient-wave 18s ease-in-out infinite',
    },
    contact: {
      colors: ['#000000', '#EC4899', '#8B5CF6'], // black, pink, purple
      positions: ['0%', '40%', '100%'],
      animation: 'gradient-pulse 12s ease-in-out infinite',
    },
    default: {
      colors: ['#EC4899', '#8B5CF6', '#000000'],
      positions: ['0%', '50%', '100%'],
      animation: 'gradient-shift 15s ease infinite',
    }
  };

  const config = gradientConfigs[variant];

  return (
    <>
      {/* Инжектим CSS анимации */}
      <style jsx>{`
        @keyframes gradient-shift-hero {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes gradient-rotate {
          0% { background-position: 0% 0%; }
          25% { background-position: 100% 0%; }
          50% { background-position: 100% 100%; }
          75% { background-position: 0% 100%; }
          100% { background-position: 0% 0%; }
        }
        
        @keyframes gradient-wave {
          0%, 100% { 
            background-position: 0% 50%;
            background-size: 200% 200%;
          }
          25% { 
            background-position: 100% 0%;
            background-size: 250% 250%;
          }
          50% { 
            background-position: 100% 100%;
            background-size: 200% 200%;
          }
          75% { 
            background-position: 0% 100%;
            background-size: 250% 250%;
          }
        }
        
        @keyframes gradient-pulse {
          0%, 100% { 
            opacity: 0.8;
            background-size: 150% 150%;
          }
          50% { 
            opacity: 1;
            background-size: 200% 200%;
          }
        }
        
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes orb-float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -30px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        
        @keyframes orb-pulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.2); }
        }
      `}</style>

      <div className={`absolute inset-0 overflow-hidden ${className}`}>
        {/* Основной анимированный градиент */}
        <div 
          className="absolute inset-0 opacity-60"
          style={{
            background: `linear-gradient(135deg, ${config.colors.map((color, i) => `${color} ${config.positions[i]}`).join(', ')})`,
            backgroundSize: '400% 400%',
            animation: config.animation,
          }}
        />
        
        {/* Mesh градиент для глубины */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `
              radial-gradient(circle at 20% 80%, ${config.colors[0]}40 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, ${config.colors[1]}40 0%, transparent 50%),
              radial-gradient(circle at 40% 40%, ${config.colors[2]}20 0%, transparent 50%)
            `,
          }}
        />
        
        {/* Анимированные orbs для динамики */}
        {variant !== 'default' && (
          <>
            {/* Pink Orb */}
            <motion.div
              className="absolute w-96 h-96 -top-48 -left-48 rounded-full"
              style={{
                background: 'radial-gradient(circle, #EC489920 0%, transparent 70%)',
                filter: 'blur(40px)',
                animation: 'orb-float 20s ease-in-out infinite',
              }}
            />
            
            {/* Purple Orb */}
            <motion.div
              className="absolute w-80 h-80 -bottom-40 -right-40 rounded-full"
              style={{
                background: 'radial-gradient(circle, #8B5CF620 0%, transparent 70%)',
                filter: 'blur(60px)',
                animation: 'orb-float 25s ease-in-out infinite reverse',
                animationDelay: '5s',
              }}
            />
            
            {/* Центральный пульсирующий orb */}
            {(variant === 'hero' || variant === 'contact') && (
              <motion.div
                className="absolute w-[600px] h-[600px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                  background: 'radial-gradient(circle, #EC489910 0%, transparent 50%)',
                  filter: 'blur(100px)',
                  animation: 'orb-pulse 8s ease-in-out infinite',
                }}
              />
            )}
          </>
        )}
        
        {/* Noise текстура для глубины */}
        <div 
          className="absolute inset-0 opacity-[0.02] mix-blend-screen"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
        
        {/* Дополнительный слой для вариантов */}
        {variant === 'projects' && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        )}
        
        {variant === 'skills' && (
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-black/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/30 to-transparent" />
          </div>
        )}
        
        {/* Сетка для технического вида (только для skills) */}
        {variant === 'skills' && (
          <div 
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `
                linear-gradient(0deg, rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
            }}
          />
        )}
      </div>
    </>
  );
};

export default DynamicGradientBackground;
