import React from 'react';
import { motion } from 'motion/react';

interface WavesBackgroundProps {
  opacity?: number;
}

const WavesBackground: React.FC<WavesBackgroundProps> = ({ opacity = 1 }) => {
  return (
    <>
      {/* Инжектим CSS анимации */}
      <style jsx>{`
        @keyframes aurora {
          0%, 100% {
            background-position: 50% 50%, 60% 50%, 40% 50%;
          }
          25% {
            background-position: 80% 20%, 20% 80%, 60% 30%;
          }
          50% {
            background-position: 30% 70%, 70% 30%, 50% 50%;
          }
          75% {
            background-position: 20% 40%, 40% 60%, 80% 70%;
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0) scale(1);
          }
          33% {
            transform: translateY(-20px) translateX(10px) scale(1.05);
          }
          66% {
            transform: translateY(10px) translateX(-10px) scale(0.95);
          }
        }
        
        @keyframes glow-pulse {
          0%, 100% {
            opacity: 0.3;
            filter: blur(60px);
          }
          50% {
            opacity: 0.6;
            filter: blur(80px);
          }
        }
      `}</style>

      {/* Основной темный фон с легким градиентом */}
      <div className="fixed inset-0 -z-20 bg-gradient-to-br from-[#0B1120] via-[#0F0A1F] to-[#050510]" />
      
      {/* Динамический Aurora эффект */}
      <div 
        className="fixed inset-0 -z-10 opacity-30"
        style={{
          background: `
            radial-gradient(ellipse at 20% 30%, #EC489940 0%, transparent 50%),
            radial-gradient(ellipse at 60% 70%, #8B5CF640 0%, transparent 50%),
            radial-gradient(ellipse at 80% 40%, #3B82F630 0%, transparent 60%)
          `,
          backgroundSize: '150% 150%, 180% 180%, 200% 200%',
          animation: 'aurora 20s ease-in-out infinite',
          filter: 'blur(40px)',
        }}
      />
      
      {/* Плавающие градиентные сферы */}
      <div className="fixed inset-0 -z-10">
        {/* Pink сфера */}
        <motion.div
          className="absolute w-[600px] h-[600px] -top-48 -left-48"
          style={{
            background: 'radial-gradient(circle, #EC489920 0%, transparent 70%)',
            animation: 'float 25s ease-in-out infinite',
            animationDelay: '0s',
          }}
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 60,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Purple сфера */}
        <motion.div
          className="absolute w-[500px] h-[500px] -bottom-32 -right-32"
          style={{
            background: 'radial-gradient(circle, #8B5CF620 0%, transparent 70%)',
            animation: 'float 30s ease-in-out infinite reverse',
            animationDelay: '10s',
          }}
          animate={{
            rotate: [360, 0],
          }}
          transition={{
            duration: 45,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Центральная пульсирующая сфера */}
        <div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]"
          style={{
            background: 'radial-gradient(circle, #EC489910 0%, #8B5CF610 30%, transparent 70%)',
            animation: 'glow-pulse 8s ease-in-out infinite',
          }}
        />
      </div>
      
      {/* Mesh паттерн для глубины */}
      <div className="fixed inset-0 -z-10">
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(to right, #EC489905 1px, transparent 1px),
              linear-gradient(to bottom, #8B5CF605 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px',
            transform: 'perspective(500px) rotateX(60deg)',
            transformOrigin: 'center center',
          }}
        />
      </div>
      
      {/* Виньетка для фокуса */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
      </div>
      
      {/* Легкий шум для текстуры */}
      <div 
        className="fixed inset-0 -z-10 opacity-[0.015] mix-blend-screen pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' /%3E%3C/svg%3E")`,
        }}
      />
    </>
  );
};

export default WavesBackground;
