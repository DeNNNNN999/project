import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';

interface PurpleWaveBackgroundProps {
  variant?: 'default' | 'intense' | 'subtle';
  className?: string;
}

const PurpleWaveBackground: React.FC<PurpleWaveBackgroundProps> = ({ 
  variant = 'default',
  className = '' 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Настройка canvas
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };
    resizeCanvas();

    // Параметры волн в зависимости от варианта
    const waveConfigs = {
      default: {
        waveCount: 3,
        amplitude: 50,
        frequency: 0.01,
        speed: 0.002,
        opacity: 0.8,
      },
      intense: {
        waveCount: 5,
        amplitude: 80,
        frequency: 0.015,
        speed: 0.003,
        opacity: 1,
      },
      subtle: {
        waveCount: 2,
        amplitude: 30,
        frequency: 0.008,
        speed: 0.001,
        opacity: 0.6,
      }
    };

    const config = waveConfigs[variant];
    let time = 0;

    // Отслеживание мыши для интерактивности
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      };
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Функция рисования волн
    const drawWaves = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      // Очистка canvas
      ctx.clearRect(0, 0, width, height);

      // Фоновый градиент (черный с легким фиолетовым оттенком)
      const bgGradient = ctx.createLinearGradient(0, 0, 0, height);
      bgGradient.addColorStop(0, '#0a0014'); // Почти черный с фиолетовым оттенком
      bgGradient.addColorStop(0.5, '#0f0818');
      bgGradient.addColorStop(1, '#000000');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, width, height);

      // Рисуем волны
      for (let i = 0; i < config.waveCount; i++) {
        ctx.beginPath();

        // Создаем градиент для каждой волны
        const waveGradient = ctx.createLinearGradient(0, height * 0.5, 0, height);
        const purpleShade = 100 + i * 30; // Разные оттенки фиолетового
        const opacity = config.opacity - (i * 0.1);
        
        waveGradient.addColorStop(0, `rgba(${purpleShade}, 50, ${200 - i * 30}, 0)`);
        waveGradient.addColorStop(0.5, `rgba(${purpleShade}, 50, ${200 - i * 30}, ${opacity})`);
        waveGradient.addColorStop(1, `rgba(${purpleShade}, 50, ${200 - i * 30}, 0)`);

        ctx.fillStyle = waveGradient;

        // Начинаем с левого края
        ctx.moveTo(0, height);

        // Рисуем волну используя синусоиду
        for (let x = 0; x <= width; x++) {
          const mouseInfluence = Math.sin((x / width - mouseRef.current.x) * Math.PI) * 20 * mouseRef.current.y;
          const y = height * 0.5 +
            Math.sin(x * config.frequency + time + i * Math.PI / 3) * config.amplitude +
            Math.sin(x * config.frequency * 2 + time * 1.5 + i) * (config.amplitude * 0.5) +
            mouseInfluence;
          
          ctx.lineTo(x, y);
        }

        // Замыкаем путь
        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.closePath();
        ctx.fill();

        // Добавляем свечение для верхней волны
        if (i === config.waveCount - 1) {
          ctx.shadowBlur = 30;
          ctx.shadowColor = 'rgba(139, 92, 246, 0.5)';
          ctx.stroke();
          ctx.shadowBlur = 0;
        }
      }

      // Добавляем легкое свечение сверху (как на скриншоте)
      const glowGradient = ctx.createRadialGradient(
        width * 0.5, 
        -height * 0.2, 
        0,
        width * 0.5, 
        height * 0.3, 
        height * 0.8
      );
      glowGradient.addColorStop(0, 'rgba(139, 92, 246, 0.4)');
      glowGradient.addColorStop(0.5, 'rgba(139, 92, 246, 0.1)');
      glowGradient.addColorStop(1, 'transparent');
      
      ctx.fillStyle = glowGradient;
      ctx.fillRect(0, 0, width, height * 0.5);

      time += config.speed;
      animationRef.current = requestAnimationFrame(drawWaves);
    };

    drawWaves();

    // Обработка изменения размера окна
    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [variant]);

  return (
    <>
      {/* Canvas для волн */}
      <canvas
        ref={canvasRef}
        className={`fixed inset-0 -z-20 ${className}`}
        style={{ background: '#000000' }}
      />

      {/* Дополнительные эффекты */}
      <div className="fixed inset-0 -z-10">
        {/* Виньетка */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent" />
        
        {/* Легкий noise для текстуры */}
        <div 
          className="absolute inset-0 opacity-[0.02] mix-blend-screen pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' /%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Анимированные частицы (опционально) */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-500/30 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: window.innerHeight + 10,
            }}
            animate={{
              y: -10,
              x: Math.random() * window.innerWidth,
            }}
            transition={{
              duration: 10 + Math.random() * 20,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 10,
            }}
          />
        ))}
      </div>
    </>
  );
};

export default PurpleWaveBackground;
