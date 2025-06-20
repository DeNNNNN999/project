import React, { useEffect, useRef } from 'react';

interface WaveDistortionBackgroundProps {
  className?: string;
}

const WaveDistortionBackground: React.FC<WaveDistortionBackgroundProps> = ({ 
  className = '' 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Установка размеров canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();

    // Параметры волн
    const waves = [
      {
        y: canvas.height * 0.5,
        length: 0.01,
        amplitude: 30,
        frequency: 0.01,
        speed: 0.02,
        color: 'rgba(217, 38, 255, 0.4)' // фуксия
      },
      {
        y: canvas.height * 0.5,
        length: 0.011,
        amplitude: 40,
        frequency: 0.015,
        speed: 0.025,
        color: 'rgba(139, 92, 246, 0.3)' // фиолетовый
      },
      {
        y: canvas.height * 0.5,
        length: 0.009,
        amplitude: 50,
        frequency: 0.02,
        speed: 0.03,
        color: 'rgba(74, 0, 128, 0.3)' // темно-фиолетовый
      },
      {
        y: canvas.height * 0.5,
        length: 0.012,
        amplitude: 35,
        frequency: 0.012,
        speed: 0.015,
        color: 'rgba(45, 0, 51, 0.4)' // очень темно-фиолетовый
      }
    ];

    // Функция рисования волны
    const drawWave = (wave: typeof waves[0], index: number) => {
      ctx.beginPath();
      ctx.moveTo(0, canvas.height);

      // Рисуем волну по точкам
      for (let x = 0; x <= canvas.width; x++) {
        const y = wave.y + 
          Math.sin(x * wave.length + timeRef.current * wave.speed) * wave.amplitude * Math.sin(timeRef.current * wave.frequency) +
          Math.sin(x * wave.length * 2 + timeRef.current * wave.speed * 0.5) * wave.amplitude * 0.5 +
          Math.sin(x * wave.length * 0.5 + timeRef.current * wave.speed * 1.5) * wave.amplitude * 0.3;
        
        ctx.lineTo(x, y);
      }

      // Закрываем путь
      ctx.lineTo(canvas.width, canvas.height);
      ctx.lineTo(0, canvas.height);
      ctx.closePath();

      // Градиент для волны
      const gradient = ctx.createLinearGradient(0, wave.y - wave.amplitude * 2, 0, canvas.height);
      gradient.addColorStop(0, wave.color);
      gradient.addColorStop(0.5, wave.color.replace('0.4', '0.2').replace('0.3', '0.15'));
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0.8)');

      ctx.fillStyle = gradient;
      ctx.fill();

      // Добавляем блики на гребнях волн
      ctx.strokeStyle = wave.color.replace('0.4', '0.6').replace('0.3', '0.5');
      ctx.lineWidth = 2;
      ctx.beginPath();
      
      for (let x = 0; x <= canvas.width; x += 50) {
        const y = wave.y + 
          Math.sin(x * wave.length + timeRef.current * wave.speed) * wave.amplitude * Math.sin(timeRef.current * wave.frequency);
        
        if (Math.sin(x * wave.length + timeRef.current * wave.speed) > 0.9) {
          ctx.moveTo(x - 10, y);
          ctx.lineTo(x + 10, y);
        }
      }
      ctx.stroke();
    };

    // Анимация
    const animate = () => {
      // Очистка canvas с градиентом фона
      const bgGradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, canvas.width
      );
      bgGradient.addColorStop(0, '#1a001f');
      bgGradient.addColorStop(0.5, '#0a0014');
      bgGradient.addColorStop(1, '#000000');
      
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Рисуем волны от дальней к ближней
      waves.forEach((wave, index) => {
        drawWave(wave, index);
      });

      // Добавляем эффект тумана
      const fogGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      fogGradient.addColorStop(0, 'rgba(217, 38, 255, 0.05)');
      fogGradient.addColorStop(0.5, 'rgba(139, 92, 246, 0.02)');
      fogGradient.addColorStop(1, 'rgba(0, 0, 0, 0.3)');
      
      ctx.fillStyle = fogGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Увеличиваем время
      timeRef.current += 0.05;

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Обработчик изменения размера окна
    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className={`fixed inset-0 ${className}`} style={{ zIndex: -1 }}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
      
      {/* Дополнительные эффекты */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Виньетка */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50 opacity-70" />
        <div className="absolute inset-0" style={{ 
          background: 'radial-gradient(circle at center, transparent 30%, rgba(0,0,0,0.7) 100%)' 
        }} />
        
        {/* Легкое свечение */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(217, 38, 255, 0.1) 0%, transparent 50%)'
          }}
        />
      </div>
    </div>
  );
};

export default WaveDistortionBackground;