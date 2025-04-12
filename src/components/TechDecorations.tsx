import React from 'react';
import { motion } from 'motion/react';
import { Icon } from '@iconify/react';

// Компонент с близкими к аватару элементами
export const NearAvatarDecorations = () => {
  return (
    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 flex flex-col items-end space-y-6 mr-4">
      {/* Круглые декоративные элементы */}
      <motion.div 
        className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-blue-500/30 flex items-center justify-center"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        whileHover={{ scale: 1.1, boxShadow: "0 0 20px rgba(59, 130, 246, 0.4)" }}
      >
        <Icon icon="ph:code-bold" className="w-8 h-8 text-blue-400" />
      </motion.div>
      
      {/* Элемент с несколькими технологиями */}
      <motion.div
        className="flex flex-col items-end space-y-3"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.3, duration: 0.5 }}
      >
        <motion.div 
          className="px-3 py-2 rounded-full bg-slate-800/60 border border-slate-700/50 flex items-center gap-2"
          whileHover={{ scale: 1.05, backgroundColor: "rgba(30, 41, 59, 0.8)" }}
        >
          <Icon icon="logos:react" className="w-5 h-5" />
          <span className="text-white font-medium">React</span>
        </motion.div>
        
        <motion.div 
          className="px-3 py-2 rounded-full bg-slate-800/60 border border-slate-700/50 flex items-center gap-2"
          whileHover={{ scale: 1.05, backgroundColor: "rgba(30, 41, 59, 0.8)" }}
        >
          <Icon icon="logos:typescript-icon" className="w-5 h-5" />
          <span className="text-white font-medium">TypeScript</span>
        </motion.div>
        
        <motion.div 
          className="px-3 py-2 rounded-full bg-slate-800/60 border border-slate-700/50 flex items-center gap-2"
          whileHover={{ scale: 1.05, backgroundColor: "rgba(30, 41, 59, 0.8)" }}
        >
          <Icon icon="logos:nodejs-icon" className="w-5 h-5" />
          <span className="text-white font-medium">Node.js</span>
        </motion.div>
      </motion.div>

      {/* Вертикальная линия с точками */}
      <motion.div
        className="h-40 flex flex-col items-center justify-between mr-10"
        initial={{ opacity: 0, scaleY: 0 }}
        animate={{ opacity: 1, scaleY: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
      >
        <motion.div 
          className="w-3 h-3 rounded-full bg-blue-500"
          animate={{ 
            boxShadow: ["0 0 5px #3b82f6", "0 0 10px #3b82f6", "0 0 5px #3b82f6"]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <div className="w-px h-full bg-gradient-to-b from-blue-500 via-purple-500 to-blue-500/30" />
        <motion.div 
          className="w-3 h-3 rounded-full bg-purple-500"
          animate={{ 
            boxShadow: ["0 0 5px #8b5cf6", "0 0 10px #8b5cf6", "0 0 5px #8b5cf6"]
          }}
          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
        />
      </motion.div>
      
      {/* Диаграмма мастерства */}
      <motion.div
        className="w-32 h-32 relative"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <div className="absolute inset-0 rounded-lg border border-blue-500/30 backdrop-blur-sm bg-slate-800/40" />
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <motion.path
            d="M50,10 L85,30 L85,70 L50,90 L15,70 L15,30 Z"
            fill="none"
            stroke="rgba(59, 130, 246, 0.3)"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 1.6 }}
          />
          <motion.path
            d="M50,10 L85,30 L85,70 L50,90 L15,70 L15,30 Z"
            fill="rgba(139, 92, 246, 0.1)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2 }}
          />
          <motion.circle cx="50" cy="10" r="3" fill="#3b82f6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.7 }} />
          <motion.circle cx="85" cy="30" r="3" fill="#8b5cf6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }} />
          <motion.circle cx="85" cy="70" r="3" fill="#ec4899" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.9 }} />
          <motion.circle cx="50" cy="90" r="3" fill="#f43f5e" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.0 }} />
          <motion.circle cx="15" cy="70" r="3" fill="#8b5cf6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.1 }} />
          <motion.circle cx="15" cy="30" r="3" fill="#3b82f6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }} />
        </svg>
      </motion.div>
    </div>
  );
};

// Компонент с продвинутыми анимациями дальше от аватара
export const FarAvatarDecorations = () => {
  return (
    <div className="absolute right-0 top-0 h-full w-1/3 pointer-events-none overflow-hidden">
      {/* Анимированная сетка */}
      <motion.div 
        className="absolute inset-0 opacity-20" 
        style={{
          backgroundImage: 'linear-gradient(to right, rgba(59, 130, 246, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(59, 130, 246, 0.1) 1px, transparent 1px)',
          backgroundSize: '25px 25px'
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ delay: 2, duration: 2 }}
      />
      
      {/* Вращающиеся круги */}
      <motion.div
        className="absolute top-1/4 right-10 w-64 h-64 rounded-full border border-blue-500/20 opacity-30"
        style={{ x: '0%', y: '0%' }}
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      >
        <motion.div 
          className="absolute top-0 left-1/2 transform -translate-x-1/2 w-2 h-2 rounded-full bg-blue-500"
          animate={{ boxShadow: ['0 0 0px rgba(59,130,246,0.3)', '0 0 10px rgba(59,130,246,0.9)', '0 0 0px rgba(59,130,246,0.3)'] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
      
      <motion.div
        className="absolute bottom-1/4 right-20 w-40 h-40 rounded-full border border-purple-500/20 opacity-30"
        style={{ x: '0%', y: '0%' }}
        animate={{ rotate: -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        <motion.div 
          className="absolute top-0 left-1/2 transform -translate-x-1/2 w-2 h-2 rounded-full bg-purple-500"
          animate={{ boxShadow: ['0 0 0px rgba(139,92,246,0.3)', '0 0 10px rgba(139,92,246,0.9)', '0 0 0px rgba(139,92,246,0.3)'] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />
      </motion.div>
      
      {/* Вертикальные линии кода */}
      <motion.div
        className="absolute right-40 top-20 bottom-20 flex flex-col justify-between"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 0.8, x: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div 
            key={i}
            className="h-6 bg-gradient-to-r from-blue-500/30 to-purple-500/0 rounded-full"
            style={{ width: `${Math.random() * 80 + 20}px` }}
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ 
              delay: 1.8 + i * 0.1, 
              duration: 0.6,
              repeat: Infinity,
              repeatType: 'reverse',
              repeatDelay: Math.random() * 10 + 10
            }}
          />
        ))}
      </motion.div>
      
      {/* Плавающие частицы */}
      {Array.from({ length: 15 }).map((_, i) => {
        const size = Math.random() * 3 + 1;
        const initialX = Math.random() * 100;
        const initialY = Math.random() * 100;
        const duration = Math.random() * 10 + 20;
        const delay = Math.random() * 5;
        
        return (
          <motion.div
            key={`particle-${i}`}
            className="absolute rounded-full"
            style={{ 
              width: size, 
              height: size, 
              backgroundColor: i % 2 === 0 ? '#3b82f6' : '#8b5cf6',
              opacity: 0.6,
              right: `${initialX}%`,
              top: `${initialY}%`
            }}
            animate={{
              y: [0, Math.random() * 100 - 50],
              x: [0, Math.random() * 30 - 15],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: duration,
              repeat: Infinity,
              repeatType: 'reverse',
              delay: delay,
              ease: 'easeInOut'
            }}
          />
        );
      })}
      
      {/* Анимированные линии соединения */}
      <svg className="absolute inset-0 w-full h-full">
        <motion.line 
          x1="30%" 
          y1="20%" 
          x2="80%" 
          y2="30%" 
          stroke="rgba(59, 130, 246, 0.2)" 
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 2.5, duration: 1.5 }}
        />
        <motion.line 
          x1="25%" 
          y1="55%" 
          x2="75%" 
          y2="60%" 
          stroke="rgba(139, 92, 246, 0.2)" 
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 2.8, duration: 1.5 }}
        />
        <motion.line 
          x1="30%" 
          y1="75%" 
          x2="90%" 
          y2="40%" 
          stroke="rgba(236, 72, 153, 0.2)" 
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 3.1, duration: 1.5 }}
        />
      </svg>
      
      {/* Технологический геометрический элемент */}
      <motion.div 
        className="absolute right-16 top-1/2 transform -translate-y-1/2"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
      >
        <svg width="120" height="120" viewBox="0 0 120 120">
          <motion.circle 
            cx="60" 
            cy="60" 
            r="50" 
            fill="none" 
            stroke="rgba(59, 130, 246, 0.2)" 
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 2.2, duration: 2 }}
          />
          <motion.path
            d="M60,10 L110,60 L60,110 L10,60 Z"
            fill="none"
            stroke="rgba(139, 92, 246, 0.2)"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 2.4, duration: 2 }}
          />
          {/* Точки пересечения */}
          {[0, 90, 180, 270].map((angle, i) => {
            const radians = (angle * Math.PI) / 180;
            const x = 60 + 50 * Math.cos(radians);
            const y = 60 + 50 * Math.sin(radians);
            return (
              <motion.circle 
                key={`dot-${i}`}
                cx={x} 
                cy={y} 
                r="3" 
                fill="#3b82f6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3 + i * 0.2 }}
              />
            );
          })}
        </svg>
        
        {/* Пульсирующий круг в центре */}
        <motion.div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-500/30 rounded-full"
          style={{ width: 10, height: 10 }}
          animate={{ 
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.7, 0.3]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
    </div>
  );
};

// Основной компонент декораций
const TechDecorations = () => {
  return (
    <>
      <NearAvatarDecorations />
      <FarAvatarDecorations />
    </>
  );
};

export default TechDecorations;