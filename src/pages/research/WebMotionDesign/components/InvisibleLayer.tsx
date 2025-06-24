import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';

const InvisibleLayer: React.FC = () => {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [currentDemo, setCurrentDemo] = useState<'toggle' | 'success' | 'error' | 'ambient' | null>(null);
  const [toggleState, setToggleState] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showError, setShowError] = useState(false);
  const [ambientPlaying, setAmbientPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [showWaveform, setShowWaveform] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationIdRef = useRef<number | null>(null);

  // Инициализация аудио контекста
  useEffect(() => {
    if (typeof window !== 'undefined' && !audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 256;
    }
    
    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, []);

  // Функция для проигрывания звука
  const playSound = (frequency: number, duration: number, type: 'sine' | 'square' | 'sawtooth' = 'sine') => {
    if (!soundEnabled || !audioContextRef.current) return;
    
    const oscillator = audioContextRef.current.createOscillator();
    const gainNode = audioContextRef.current.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContextRef.current.destination);
    
    // Подключаем к анализатору для визуализации
    if (analyserRef.current) {
      gainNode.connect(analyserRef.current);
    }
    
    oscillator.type = type;
    oscillator.frequency.value = frequency;
    
    // Установка громкости
    const volumeValue = volume / 100;
    gainNode.gain.value = volumeValue * 0.1; // Базовая громкость
    
    // Огибающая для плавного звука
    const now = audioContextRef.current.currentTime;
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(volumeValue * 0.1, now + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + duration);
    
    oscillator.start(now);
    oscillator.stop(now + duration);
    
    // Визуализация
    if (showWaveform) {
      visualizeWaveform();
    }
  };

  // Визуализация звуковых волн
  const visualizeWaveform = () => {
    if (!canvasRef.current || !analyserRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    
    const draw = () => {
      animationIdRef.current = requestAnimationFrame(draw);
      
      analyserRef.current!.getByteTimeDomainData(dataArray);
      
      ctx.fillStyle = 'rgba(30, 41, 59, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#a855f7';
      ctx.beginPath();
      
      const sliceWidth = canvas.width / bufferLength;
      let x = 0;
      
      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = v * canvas.height / 2;
        
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
        
        x += sliceWidth;
      }
      
      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.stroke();
    };
    
    draw();
    
    // Остановка визуализации через некоторое время
    setTimeout(() => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    }, 2000);
  };

  // Звуки для разных действий
  const sounds = {
    toggle: () => {
      playSound(600, 0.1, 'sine');
      setTimeout(() => playSound(800, 0.1, 'sine'), 50);
    },
    success: () => {
      playSound(400, 0.15, 'sine');
      setTimeout(() => playSound(600, 0.15, 'sine'), 100);
      setTimeout(() => playSound(800, 0.2, 'sine'), 200);
    },
    error: () => {
      playSound(200, 0.2, 'sawtooth');
      setTimeout(() => playSound(150, 0.3, 'sawtooth'), 100);
    },
    ambient: () => {
      // Создаем более сложный эмбиент
      const playAmbientNote = () => {
        if (!ambientPlaying) return;
        const frequencies = [220, 277, 330, 370, 440];
        const freq = frequencies[Math.floor(Math.random() * frequencies.length)];
        playSound(freq, 2, 'sine');
        setTimeout(playAmbientNote, Math.random() * 2000 + 1000);
      };
      playAmbientNote();
    }
  };

  // Демо тумблера
  const ToggleDemo = () => {
    const handleToggle = () => {
      setToggleState(!toggleState);
      if (soundEnabled) sounds.toggle();
    };

    return (
      <div className="p-6 bg-slate-800/50 rounded-lg">
        <h4 className="text-lg font-semibold text-purple-300 mb-4">
          Пример 1: Тумблер с подтверждением
        </h4>
        
        <div className="flex items-center justify-center gap-8 mb-4">
          <motion.button
            onClick={handleToggle}
            className={`relative w-20 h-10 rounded-full p-1 cursor-pointer ${
              toggleState ? 'bg-purple-600' : 'bg-slate-600'
            }`}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="w-8 h-8 bg-white rounded-full shadow-lg"
              animate={{ x: toggleState ? 40 : 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          </motion.button>
          
          <div className="text-sm text-gray-400">
            Состояние: <span className="font-semibold text-white">
              {toggleState ? 'Включено' : 'Выключено'}
            </span>
          </div>
        </div>
        
        <p className="text-sm text-gray-400">
          💡 Короткий "щелчок" в момент фиксации создает ощущение физического переключателя
        </p>
      </div>
    );
  };

  // Демо успешного действия
  const SuccessDemo = () => {
    const handleSuccess = () => {
      setShowConfetti(true);
      if (soundEnabled) sounds.success();
      setTimeout(() => setShowConfetti(false), 2000);
    };

    return (
      <div className="p-6 bg-slate-800/50 rounded-lg">
        <h4 className="text-lg font-semibold text-purple-300 mb-4">
          Пример 2: Момент успеха
        </h4>
        
        <div className="relative flex flex-col items-center justify-center gap-4">
          <motion.button
            onClick={handleSuccess}
            className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Icon icon="ph:check-circle" className="inline w-5 h-5 mr-2" />
            Завершить все задачи
          </motion.button>
          
          <AnimatePresence>
            {showConfetti && (
              <motion.div
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-gradient-to-r from-green-400 to-blue-500 rounded-full"
                    style={{
                      left: '50%',
                      top: '50%',
                    }}
                    initial={{ x: 0, y: 0, scale: 0 }}
                    animate={{
                      x: (Math.random() - 0.5) * 200,
                      y: (Math.random() - 0.5) * 200,
                      scale: [0, 1.5, 0],
                      rotate: Math.random() * 360,
                    }}
                    transition={{
                      duration: 1,
                      delay: i * 0.02,
                      ease: "easeOut"
                    }}
                  />
                ))}
                
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: [0, 1.2, 1], opacity: [0, 1, 1] }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="text-4xl">🎉</div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <p className="text-sm text-gray-400 mt-4">
          💡 Восходящая мелодия усиливает чувство достижения вместе с визуальным конфетти
        </p>
      </div>
    );
  };

  // Демо ошибки
  const ErrorDemo = () => {
    const handleError = () => {
      setShowError(true);
      if (soundEnabled) sounds.error();
      setTimeout(() => setShowError(false), 1000);
    };

    return (
      <div className="p-6 bg-slate-800/50 rounded-lg">
        <h4 className="text-lg font-semibold text-purple-300 mb-4">
          Пример 3: Обратная связь об ошибке
        </h4>
        
        <div className="space-y-4">
          <div className="relative">
            <motion.input
              type="text"
              placeholder="Введите email"
              className={`w-full px-4 py-2 bg-slate-700 rounded-lg text-white placeholder-gray-400 border-2 transition-colors ${
                showError ? 'border-red-500' : 'border-transparent'
              }`}
              animate={showError ? { x: [-5, 5, -5, 5, 0] } : {}}
              transition={{ duration: 0.3 }}
            />
            
            <motion.button
              onClick={handleError}
              className="mt-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition-colors"
            >
              Симулировать ошибку
            </motion.button>
          </div>
          
          <AnimatePresence>
            {showError && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-red-400 text-sm flex items-center gap-2"
              >
                <Icon icon="ph:warning-circle" className="w-4 h-4" />
                Неверный формат email
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <p className="text-sm text-gray-400 mt-4">
          💡 Низкий, "неприятный" звук мгновенно сигнализирует об ошибке
        </p>
      </div>
    );
  };

  // Демо эмбиента
  const AmbientDemo = () => {
    const handleAmbient = () => {
      if (!ambientPlaying) {
        setAmbientPlaying(true);
        if (soundEnabled) sounds.ambient();
      } else {
        setAmbientPlaying(false);
      }
    };

    return (
      <div className="p-6 bg-slate-800/50 rounded-lg">
        <h4 className="text-lg font-semibold text-purple-300 mb-4">
          Пример 4: Атмосферный звук
        </h4>
        
        <div className="flex flex-col items-center gap-4">
          <motion.div
            className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center"
            animate={ambientPlaying ? {
              scale: [1, 1.1, 1],
              opacity: [0.7, 1, 0.7],
            } : {}}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Icon 
              icon={ambientPlaying ? "ph:pause" : "ph:play"} 
              className="w-12 h-12 text-white"
            />
          </motion.div>
          
          <motion.button
            onClick={handleAmbient}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              ambientPlaying 
                ? 'bg-purple-600 hover:bg-purple-700 text-white' 
                : 'bg-slate-700 hover:bg-slate-600 text-gray-300'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {ambientPlaying ? 'Остановить медитацию' : 'Начать медитацию'}
          </motion.button>
        </div>
        
        <p className="text-sm text-gray-400 mt-4">
          💡 Мягкий эмбиентный звук создает атмосферу спокойствия и концентрации
        </p>
      </div>
    );
  };

  // Визуализация хорошего vs плохого звукового дизайна
  const GoodVsBadExamples = () => {
    return (
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {/* Хороший пример */}
        <div className="p-6 bg-green-900/20 rounded-lg border border-green-800/50">
          <h4 className="text-green-400 font-semibold mb-4 flex items-center gap-2">
            <Icon icon="ph:check-circle" className="w-5 h-5" />
            Правильный подход
          </h4>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Icon icon="ph:speaker-low" className="w-5 h-5 text-green-400 mt-0.5" />
              <div>
                <p className="font-medium text-gray-200">Тихий и информативный</p>
                <p className="text-sm text-gray-400">Звук на грани восприятия, но четко различимый</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Icon icon="ph:timer" className="w-5 h-5 text-green-400 mt-0.5" />
              <div>
                <p className="font-medium text-gray-200">Короткий и точный</p>
                <p className="text-sm text-gray-400">Длительность соответствует анимации</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Icon icon="ph:gear" className="w-5 h-5 text-green-400 mt-0.5" />
              <div>
                <p className="font-medium text-gray-200">Настраиваемый</p>
                <p className="text-sm text-gray-400">Всегда есть возможность отключить</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Icon icon="ph:target" className="w-5 h-5 text-green-400 mt-0.5" />
              <div>
                <p className="font-medium text-gray-200">Целенаправленный</p>
                <p className="text-sm text-gray-400">Каждый звук имеет функцию</p>
              </div>
            </div>
          </div>
        </div>

        {/* Плохой пример */}
        <div className="p-6 bg-red-900/20 rounded-lg border border-red-800/50">
          <h4 className="text-red-400 font-semibold mb-4 flex items-center gap-2">
            <Icon icon="ph:x-circle" className="w-5 h-5" />
            Неправильный подход
          </h4>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Icon icon="ph:speaker-high" className="w-5 h-5 text-red-400 mt-0.5" />
              <div>
                <p className="font-medium text-gray-200">Громкий и навязчивый</p>
                <p className="text-sm text-gray-400">Отвлекает от контента</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Icon icon="ph:infinity" className="w-5 h-5 text-red-400 mt-0.5" />
              <div>
                <p className="font-medium text-gray-200">Затянутый</p>
                <p className="text-sm text-gray-400">Длинные "свуши" и "вжухи"</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Icon icon="ph:lock" className="w-5 h-5 text-red-400 mt-0.5" />
              <div>
                <p className="font-medium text-gray-200">Принудительный</p>
                <p className="text-sm text-gray-400">Нельзя отключить или настроить</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Icon icon="ph:shuffle" className="w-5 h-5 text-red-400 mt-0.5" />
              <div>
                <p className="font-medium text-gray-200">Случайный</p>
                <p className="text-sm text-gray-400">Звук ради звука, без цели</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Контролы звука
  const SoundControls = () => {
    return (
      <div className="mb-8 p-6 bg-purple-900/20 rounded-lg border border-purple-700/50">
        <h3 className="text-xl font-semibold text-purple-400 mb-4">
          Управление звуком
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={soundEnabled}
                onChange={(e) => setSoundEnabled(e.target.checked)}
                className="w-5 h-5 rounded bg-slate-700 border-slate-600 text-purple-600 focus:ring-purple-500"
              />
              <span className="text-gray-300">Звуковые эффекты</span>
            </label>
            
            <div className="flex items-center gap-2">
              <Icon icon="ph:speaker-low" className="w-4 h-4 text-gray-400" />
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                disabled={!soundEnabled}
                className="w-32 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer disabled:opacity-50"
              />
              <Icon icon="ph:speaker-high" className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-400 w-12">{volume}%</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={showWaveform}
              onChange={(e) => setShowWaveform(e.target.checked)}
              disabled={!soundEnabled}
              className="w-5 h-5 rounded bg-slate-700 border-slate-600 text-purple-600 focus:ring-purple-500"
            />
            <span className="text-gray-300">Показать визуализацию звука</span>
          </div>
        </div>
        
        {showWaveform && (
          <div className="mt-4 p-4 bg-slate-900 rounded-lg">
            <canvas
              ref={canvasRef}
              width={400}
              height={100}
              className="w-full h-24 rounded"
            />
          </div>
        )}
      </div>
    );
  };

  // Концепция тишины
  const SilenceSection = () => {
    return (
      <div className="mb-12 p-8 bg-slate-900 rounded-lg border border-slate-700">
        <h3 className="text-2xl font-semibold text-purple-300 mb-6 flex items-center gap-3">
          <Icon icon="ph:moon" className="w-8 h-8" />
          Тишина как Инструмент
        </h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="text-lg font-medium text-purple-400">Когда тишина лучше</h4>
            <div className="space-y-3">
              <div className="p-4 bg-slate-800/50 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <Icon icon="ph:code" className="w-5 h-5 text-blue-400" />
                  <span className="font-medium text-gray-200">Редакторы кода</span>
                </div>
                <p className="text-sm text-gray-400">
                  Любой звук может разрушить концентрацию разработчика
                </p>
              </div>
              
              <div className="p-4 bg-slate-800/50 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <Icon icon="ph:article" className="w-5 h-5 text-green-400" />
                  <span className="font-medium text-gray-200">Инструменты для письма</span>
                </div>
                <p className="text-sm text-gray-400">
                  Тишина помогает сосредоточиться на тексте
                </p>
              </div>
              
              <div className="p-4 bg-slate-800/50 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <Icon icon="ph:book-open" className="w-5 h-5 text-purple-400" />
                  <span className="font-medium text-gray-200">Приложения для чтения</span>
                </div>
                <p className="text-sm text-gray-400">
                  Звук может отвлечь от погружения в контент
                </p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-lg font-medium text-purple-400">Сила контраста</h4>
            <div className="p-6 bg-gradient-to-br from-purple-900/20 to-pink-900/20 rounded-lg">
              <p className="text-gray-300 mb-4">
                Если 99% взаимодействий беззвучны, то один звук для критически важного действия 
                будет иметь максимальный эффект.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-gray-600 rounded-full" />
                  <span className="text-sm text-gray-400">Обычное действие - тишина</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-gray-600 rounded-full" />
                  <span className="text-sm text-gray-400">Еще одно действие - тишина</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse" />
                  <span className="text-sm text-purple-300 font-medium">Важное действие - ЗВУК!</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="prose prose-invert max-w-none">
      <h2 className="mb-8 text-3xl font-bold text-purple-400">
        Невидимый Слой — Звук как Партнер Движения
      </h2>

      {/* Вступление */}
      <div className="p-6 mb-8 bg-yellow-900/20 rounded-lg border border-yellow-800/50">
        <p className="text-lg text-yellow-300 mb-4">
          <Icon icon="ph:ear" className="inline w-6 h-6 mr-2" />
          До сих пор мы говорили о том, что пользователь видит. Но опыт взаимодействия — мультисенсорный. 
          Мы часто забываем о том, что пользователь может слышать.
        </p>
        <p className="text-gray-300 mb-0">
          <strong className="text-orange-400">Исходное заблуждение:</strong> Звук в интерфейсе — это "рюшечки", 
          которые можно добавить в конце. В худшем случае — это просто раздражающие "клики" и "свуши".
        </p>
      </div>

      {/* Новая идея */}
      <div className="p-6 mb-12 bg-purple-900/20 rounded-lg border border-purple-700/50">
        <h3 className="text-2xl font-semibold text-purple-400 mb-4">
          Новая идея: Звук — это партнер движения
        </h3>
        <p className="text-lg text-gray-200">
          Звук работает в тандеме с анимацией, чтобы создать более богатый, информативный и эмоциональный опыт. 
          Хороший UI-звук делает то же, что и хорошая микроанимация: 
          <strong className="text-purple-400"> он предоставляет обратную связь, но через другой канал</strong>.
        </p>
      </div>

      {/* Контролы звука */}
      <SoundControls />

      {/* Две функции звука */}
      <div className="mb-12">
        <h3 className="text-2xl font-semibold text-purple-300 mb-6">
          Две Великие Функции Звука в UI
        </h3>
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Функция комфорта */}
          <div className="p-6 bg-blue-900/20 rounded-lg border border-blue-800/50">
            <h4 className="text-blue-400 font-semibold mb-3 flex items-center gap-2">
              <Icon icon="ph:shield-check" className="w-6 h-6" />
              Работа 1: Усиление Обратной Связи
            </h4>
            <p className="text-gray-300 mb-3">
              <strong className="text-blue-300">90%</strong> всего полезного UI-звука. 
              Подтверждает действия и делает взаимодействия более тактильными.
            </p>
            <div className="p-4 bg-blue-800/20 rounded">
              <p className="text-sm text-blue-200 font-medium mb-2">
                Движение + Звук = Повышенная Уверенность
              </p>
              <p className="text-sm text-gray-400">
                Мозг получает подтверждение по двум каналам одновременно
              </p>
            </div>
          </div>
          
          {/* Функция восторга */}
          <div className="p-6 bg-pink-900/20 rounded-lg border border-pink-800/50">
            <h4 className="text-pink-400 font-semibold mb-3 flex items-center gap-2">
              <Icon icon="ph:sparkle" className="w-6 h-6" />
              Работа 2: Создание Эмоций
            </h4>
            <p className="text-gray-300 mb-3">
              <strong className="text-pink-300">10%</strong> запоминающихся моментов. 
              Работает с анимацией "Восторга" для эмоционального резонанса.
            </p>
            <div className="p-4 bg-pink-800/20 rounded">
              <p className="text-sm text-pink-200 font-medium mb-2">
                Движение + Звук = Эмоциональный Резонанс
              </p>
              <p className="text-sm text-gray-400">
                Мультисенсорное вознаграждение закрепляет позитивные эмоции
              </p>
            </div>
          </div>
        </div>

        {/* Демонстрации */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <ToggleDemo />
          <SuccessDemo />
          <ErrorDemo />
          <AmbientDemo />
        </div>
      </div>

      {/* Хорошие vs плохие примеры */}
      <GoodVsBadExamples />

      {/* Великий грех */}
      <div className="mb-12 p-6 bg-red-900/20 rounded-lg border border-red-800/50">
        <h3 className="text-2xl font-semibold text-red-400 mb-4">
          Великий Грех: Звуковой Мусор
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <Icon icon="ph:warning" className="w-6 h-6 text-red-400 mt-0.5" />
            <div>
              <h4 className="font-semibold text-gray-200 mb-1">Шум вместо информации</h4>
              <p className="text-gray-400">
                Громкий "свуш" при каждом переходе. Он не подтверждает действие, он просто раздражает.
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Icon icon="ph:warning" className="w-6 h-6 text-red-400 mt-0.5" />
            <div>
              <h4 className="font-semibold text-gray-200 mb-1">Неуместность</h4>
              <p className="text-gray-400">
                Игровые, "мультяшные" звуки в серьезном финансовом приложении подрывают доверие.
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Icon icon="ph:warning" className="w-6 h-6 text-red-400 mt-0.5" />
            <div>
              <h4 className="font-semibold text-gray-200 mb-1">Отсутствие контроля</h4>
              <p className="text-gray-400">
                <strong className="text-red-300">Самый главный грех.</strong> Любой звук должен быть отключаемым. 
                Это не обсуждается.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Тишина как инструмент */}
      <SilenceSection />

      {/* Финальный вердикт */}
      <div className="mt-12 p-8 bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-lg border border-purple-700/50">
        <h3 className="text-2xl font-bold text-purple-300 mb-6">
          Вердикт: Ваша Новая Ментальная Модель
        </h3>
        
        <div className="p-4 bg-purple-800/20 rounded-lg mb-6">
          <p className="text-lg text-purple-200 font-medium mb-0">
            Перестаньте думать о звуке как об отдельной сущности.<br/>
            <strong className="text-purple-400">Думайте о нем как о невидимом слое вашей анимации.</strong>
          </p>
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold text-purple-400 text-lg">
            При проектировании движения задайте себе дополнительный вопрос:
          </h4>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-900/20 rounded-lg border border-blue-800/50">
              <Icon icon="ph:toggle-left" className="w-8 h-8 text-blue-400 mb-2" />
              <p className="font-medium text-blue-400 mb-2">Утилитарное действие</p>
              <p className="text-sm text-gray-300">
                Может ли тихий "щелчок" добавить ему веса?
              </p>
            </div>
            
            <div className="p-4 bg-green-900/20 rounded-lg border border-green-800/50">
              <Icon icon="ph:confetti" className="w-8 h-8 text-green-400 mb-2" />
              <p className="font-medium text-green-400 mb-2">Момент восторга</p>
              <p className="text-sm text-gray-300">
                Может ли звуковой эффект усилить радость?
              </p>
            </div>
            
            <div className="p-4 bg-purple-900/20 rounded-lg border border-purple-800/50">
              <Icon icon="ph:brain" className="w-8 h-8 text-purple-400 mb-2" />
              <p className="font-medium text-purple-400 mb-2">Требует концентрации</p>
              <p className="text-sm text-gray-300">
                Не будет ли тишина лучшим выбором?
              </p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-yellow-900/20 rounded-lg border border-yellow-800/50">
            <p className="text-lg text-yellow-300 font-medium flex items-center gap-2">
              <Icon icon="ph:key" className="w-6 h-6" />
              Золотое правило: Дайте пользователю выключатель
            </p>
            <p className="text-gray-300 mt-2">
              Хороший звук — это тот, который пользователь хочет включить сам, 
              а не тот, который он судорожно ищет, как отключить.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvisibleLayer;