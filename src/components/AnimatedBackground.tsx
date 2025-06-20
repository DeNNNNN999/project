import React from 'react';
import { motion } from 'framer-motion';

// Компонент для анимированного фона с градиентом и частицами
const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden -z-10">
      {/* Основной градиентный фон */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-blue-900/20 to-slate-900" />

      {/* Анимированный градиент */}
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.3), transparent 60%)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Сетка-матрица в стиле кода */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-grid-pattern" />
      </div>

      {/* Плавающие частицы - представляют биты данных */}
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-blue-500 rounded-full"
          style={{
            width: Math.random() * 3 + 1,
            height: Math.random() * 3 + 1,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.4 + 0.1,
          }}
          animate={{
            y: [0, Math.random() * 100 - 50],
            x: [0, Math.random() * 40 - 20],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: Math.random() * 10 + 15,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: Math.random() * 5
          }}
        />
      ))}

      {/* Световые лучи */}
      <motion.div
        className="absolute top-0 left-1/4 w-[1px] h-[30vh] bg-gradient-to-b from-transparent via-blue-500/30 to-transparent"
        style={{ transform: "rotate(10deg)" }}
        animate={{ opacity: [0, 0.5, 0], height: ['30vh', '60vh', '30vh'] }}
        transition={{ duration: 7, repeat: Infinity, repeatType: "reverse" }}
      />
      <motion.div
        className="absolute top-0 right-1/3 w-[1px] h-[40vh] bg-gradient-to-b from-transparent via-purple-500/30 to-transparent"
        style={{ transform: "rotate(-15deg)" }}
        animate={{ opacity: [0, 0.6, 0], height: ['40vh', '70vh', '40vh'] }}
        transition={{ duration: 9, repeat: Infinity, repeatType: "reverse", delay: 3 }}
      />
    </div>
  );
};

export default AnimatedBackground;