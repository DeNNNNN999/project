import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Icon } from '@iconify/react';

const SimpleFPSCounter: React.FC = () => {
  const [fps, setFps] = useState(0);
  const [isMinimized, setIsMinimized] = useState(false);
  const frameRef = useRef(0);
  const lastTimeRef = useRef(performance.now());
  const frameCountRef = useRef(0);

  useEffect(() => {
    const calculateFPS = () => {
      const now = performance.now();
      frameCountRef.current++;

      // Обновляем FPS каждую секунду
      if (now - lastTimeRef.current >= 1000) {
        const currentFPS = Math.round(
          (frameCountRef.current * 1000) / (now - lastTimeRef.current)
        );
        
        setFps(currentFPS);
        frameCountRef.current = 0;
        lastTimeRef.current = now;
      }

      frameRef.current = requestAnimationFrame(calculateFPS);
    };

    frameRef.current = requestAnimationFrame(calculateFPS);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  // Определяем цвет в зависимости от FPS
  const getFPSColor = (fps: number) => {
    if (fps >= 50) return '#00ff88'; // Зеленый - отличный FPS
    if (fps >= 30) return '#ffaa00'; // Оранжевый - средний FPS  
    return '#ff4444'; // Красный - низкий FPS
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        width: isMinimized ? 'auto' : 'auto'
      }}
      className="fixed top-20 right-4 z-[9999] bg-black/90 backdrop-blur-md rounded-lg border border-purple-500/30 font-mono text-sm shadow-lg cursor-pointer select-none"
      style={{
        color: getFPSColor(fps),
        textShadow: '0 0 10px currentColor',
        boxShadow: `0 0 20px ${getFPSColor(fps)}40`
      }}
      onClick={() => setIsMinimized(!isMinimized)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div 
        className="px-3 py-2"
        animate={{ opacity: isMinimized ? 0.7 : 1 }}
      >
        {isMinimized ? (
          <div className="flex items-center">
            <span className="font-bold text-lg">{fps}</span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Icon icon="mdi:speedometer" className="w-4 h-4" />
            <span className="font-bold">{fps}</span>
            <span className="text-xs opacity-70">FPS</span>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default SimpleFPSCounter;
