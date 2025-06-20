import React, { useState, useEffect, useRef } from 'react';

const SimpleFPSCounter: React.FC = () => {
  const [fps, setFps] = useState(0);
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
    <div
      className="fixed top-4 right-4 z-[9999] px-3 py-2 bg-black/80 backdrop-blur-sm rounded-lg border border-gray-700/50 font-mono text-sm"
      style={{
        color: getFPSColor(fps),
        textShadow: '0 0 10px currentColor'
      }}
    >
      {fps} FPS
    </div>
  );
};

export default SimpleFPSCounter;
