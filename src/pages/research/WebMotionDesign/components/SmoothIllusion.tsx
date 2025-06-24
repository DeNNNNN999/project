import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';

const SmoothIllusion: React.FC = () => {
  const [selectedFPS, setSelectedFPS] = useState<24 | 30 | 60>(60);
  const [showPerformance, setShowPerformance] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentDemo, setCurrentDemo] = useState<'scroll' | 'transition' | 'video' | null>(null);
  const [motionBlurEnabled, setMotionBlurEnabled] = useState(true);
  const [currentFPS, setCurrentFPS] = useState(60);
  const [cpuUsage, setCpuUsage] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fpsRef = useRef<number[]>([]);
  const animationIdRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);

  // FPS мониторинг
  useEffect(() => {
    let lastTime = performance.now();
    
    const measureFPS = (currentTime: number) => {
      const deltaTime = currentTime - lastTime;
      const fps = 1000 / deltaTime;
      
      fpsRef.current.push(fps);
      if (fpsRef.current.length > 30) {
        fpsRef.current.shift();
      }
      
      const avgFPS = fpsRef.current.reduce((a, b) => a + b, 0) / fpsRef.current.length;
      setCurrentFPS(Math.round(avgFPS));
      
      lastTime = currentTime;
      
      if (showPerformance) {
        animationIdRef.current = requestAnimationFrame(measureFPS);
      }
    };
    
    if (showPerformance) {
      animationIdRef.current = requestAnimationFrame(measureFPS);
    }
    
    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, [showPerformance]);

  // Симуляция нагрузки на CPU
  useEffect(() => {
    if (isAnimating) {
      const load = selectedFPS === 60 ? 45 : selectedFPS === 30 ? 25 : 15;
      setCpuUsage(load + Math.random() * 10);
    } else {
      setCpuUsage(5 + Math.random() * 5);
    }
  }, [isAnimating, selectedFPS]);

  // Демо скролла с разным FPS
  const ScrollDemo = () => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [scrolling, setScrolling] = useState(false);
    
    const simulateScroll = () => {
      if (!scrollRef.current) return;
      setScrolling(true);
      
      let start = 0;
      const distance = 300;
      const duration = 2000;
      const startTime = Date.now();
      
      const scroll = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        
        if (scrollRef.current) {
          scrollRef.current.scrollTop = easeProgress * distance;
        }
        
        if (progress < 1) {
          setTimeout(scroll, 1000 / selectedFPS);
        } else {
          setScrolling(false);
        }
      };
      
      scroll();
    };
    
    return (
      <div className="p-6 bg-slate-800/50 rounded-lg">
        <h4 className="text-lg font-semibold text-purple-300 mb-4">
          Скролл с {selectedFPS} FPS
        </h4>
        
        <div 
          ref={scrollRef}
          className="h-48 overflow-y-auto bg-slate-900 rounded-lg p-4 mb-4"
        >
          {[...Array(20)].map((_, i) => (
            <div 
              key={i} 
              className="p-3 mb-2 bg-slate-800 rounded text-gray-300"
            >
              Элемент списка {i + 1}
            </div>
          ))}
        </div>
        
        <button
          onClick={simulateScroll}
          disabled={scrolling}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-slate-700 text-white rounded transition-colors"
        >
          {scrolling ? 'Скроллинг...' : 'Симулировать скролл'}
        </button>
        
        <p className="text-sm text-gray-400 mt-4">
          💡 При {selectedFPS === 60 ? 'плавном скролле' : selectedFPS === 30 ? 'заметных рывках' : 'сильных дерганиях'} 
          {selectedFPS < 60 && ' иллюзия прямого контроля разрушается'}
        </p>
      </div>
    );
  };

  // Демо переходов с Motion Blur
  const TransitionDemo = () => {
    const [boxPosition, setBoxPosition] = useState<'left' | 'right'>('left');
    
    const getAnimationDuration = () => {
      return selectedFPS === 24 ? 0.5 : 0.3;
    };
    
    return (
      <div className="p-6 bg-slate-800/50 rounded-lg">
        <h4 className="text-lg font-semibold text-purple-300 mb-4">
          Переход с {selectedFPS} FPS {motionBlurEnabled && '+ Motion Blur'}
        </h4>
        
        <div className="relative h-32 bg-slate-900 rounded-lg mb-4 overflow-hidden">
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 w-16 h-16 bg-purple-600 rounded-lg"
            animate={{
              x: boxPosition === 'left' ? 20 : 'calc(100% - 80px)',
            }}
            transition={{
              duration: getAnimationDuration(),
              ease: "easeInOut",
            }}
            style={{
              filter: motionBlurEnabled && selectedFPS === 24 
                ? `blur(${Math.abs(boxPosition === 'left' ? 8 : 0)}px)` 
                : 'none'
            }}
          />
          
          {/* Симуляция Motion Blur следа */}
          {motionBlurEnabled && selectedFPS === 24 && (
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 w-16 h-16 rounded-lg"
              initial={false}
              animate={{
                x: boxPosition === 'left' ? 20 : 'calc(100% - 80px)',
                opacity: [0, 0.3, 0],
                scaleX: [1, 2, 1],
              }}
              transition={{
                duration: getAnimationDuration(),
                ease: "easeInOut",
              }}
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(147, 51, 234, 0.3), transparent)',
                transformOrigin: boxPosition === 'left' ? 'left center' : 'right center',
              }}
            />
          )}
        </div>
        
        <div className="flex gap-3">
          <button
            onClick={() => setBoxPosition(boxPosition === 'left' ? 'right' : 'left')}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded transition-colors"
          >
            Переместить
          </button>
          
          {selectedFPS === 24 && (
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={motionBlurEnabled}
                onChange={(e) => setMotionBlurEnabled(e.target.checked)}
                className="w-4 h-4 rounded"
              />
              <span className="text-sm text-gray-300">Motion Blur</span>
            </label>
          )}
        </div>
        
        <p className="text-sm text-gray-400 mt-4">
          💡 {selectedFPS === 24 
            ? motionBlurEnabled 
              ? 'Motion Blur создает иллюзию плавности при низком FPS'
              : 'Без Motion Blur движение выглядит дерганым'
            : selectedFPS === 60 
              ? 'При 60 FPS движение плавное без дополнительных эффектов'
              : '30 FPS — компромисс между плавностью и производительностью'
          }
        </p>
      </div>
    );
  };

  // Визуализация производительности
  const PerformanceMonitor = () => {
    const getFPSColor = () => {
      if (currentFPS >= 55) return 'text-green-400';
      if (currentFPS >= 28) return 'text-yellow-400';
      return 'text-red-400';
    };
    
    const getCPUColor = () => {
      if (cpuUsage <= 30) return 'text-green-400';
      if (cpuUsage <= 60) return 'text-yellow-400';
      return 'text-red-400';
    };
    
    return (
      <div className="p-4 bg-slate-900 rounded-lg border border-slate-700">
        <h4 className="text-sm font-semibold text-gray-400 mb-3">Мониторинг производительности</h4>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-gray-500">FPS</span>
              <span className={`text-lg font-bold ${getFPSColor()}`}>
                {currentFPS}
              </span>
            </div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className={`h-full ${
                  currentFPS >= 55 ? 'bg-green-500' :
                  currentFPS >= 28 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                animate={{ width: `${(currentFPS / 60) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-gray-500">CPU</span>
              <span className={`text-lg font-bold ${getCPUColor()}`}>
                {Math.round(cpuUsage)}%
              </span>
            </div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className={`h-full ${
                  cpuUsage <= 30 ? 'bg-green-500' :
                  cpuUsage <= 60 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                animate={{ width: `${cpuUsage}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        </div>
        
        <div className="mt-3 text-xs text-gray-500">
          Время кадра: ~{Math.round(1000 / currentFPS)}ms
        </div>
      </div>
    );
  };

  // Сравнение стандартов FPS
  const FPSComparison = () => {
    const standards = [
      {
        fps: 60,
        name: 'Стандарт Интерактивности',
        icon: 'ph:cursor-click',
        color: 'blue',
        description: 'Для UI взаимодействий',
        frameTime: '16.67ms',
        useCase: 'Скролл, переходы, микроанимации',
        perception: 'Абсолютно плавное движение',
        cost: 'Высокая нагрузка на CPU/GPU'
      },
      {
        fps: 30,
        name: 'Стандарт Компромисса',
        icon: 'ph:scales',
        color: 'yellow',
        description: 'Для фонового контента',
        frameTime: '33.33ms',
        useCase: 'Фоновые видео, слайдшоу',
        perception: 'Приемлемая плавность',
        cost: 'Средняя нагрузка'
      },
      {
        fps: 24,
        name: 'Стандарт Кинематографа',
        icon: 'ph:film-strip',
        color: 'purple',
        description: 'Для повествования',
        frameTime: '41.67ms',
        useCase: 'Видео-ролики, презентации',
        perception: 'Кинематографичный вид',
        cost: 'Низкая нагрузка + Motion Blur'
      }
    ];
    
    return (
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        {standards.map((standard) => {
          const isActive = selectedFPS === standard.fps;
          const colorClasses = {
            blue: {
              bg: isActive ? 'bg-blue-900/30' : 'bg-slate-800/50',
              border: isActive ? 'border-blue-700' : 'border-slate-700',
              icon: 'text-blue-400',
              title: 'text-blue-400',
              badge: 'bg-blue-600'
            },
            yellow: {
              bg: isActive ? 'bg-yellow-900/30' : 'bg-slate-800/50',
              border: isActive ? 'border-yellow-700' : 'border-slate-700',
              icon: 'text-yellow-400',
              title: 'text-yellow-400',
              badge: 'bg-yellow-600'
            },
            purple: {
              bg: isActive ? 'bg-purple-900/30' : 'bg-slate-800/50',
              border: isActive ? 'border-purple-700' : 'border-slate-700',
              icon: 'text-purple-400',
              title: 'text-purple-400',
              badge: 'bg-purple-600'
            }
          }[standard.color];
          
          return (
            <motion.div
              key={standard.fps}
              onClick={() => setSelectedFPS(standard.fps as any)}
              className={`p-6 rounded-lg border cursor-pointer transition-all ${colorClasses.bg} ${colorClasses.border}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-start justify-between mb-4">
                <Icon icon={standard.icon} className={`w-8 h-8 ${colorClasses.icon}`} />
                <span className={`px-2 py-1 text-xs font-bold text-white rounded ${colorClasses.badge}`}>
                  {standard.fps} FPS
                </span>
              </div>
              
              <h4 className={`font-semibold mb-2 ${colorClasses.title}`}>
                {standard.name}
              </h4>
              <p className="text-sm text-gray-400 mb-4">{standard.description}</p>
              
              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-gray-500">Время кадра:</span>
                  <span className="text-gray-300 ml-2">{standard.frameTime}</span>
                </div>
                <div>
                  <span className="text-gray-500">Применение:</span>
                  <p className="text-gray-300 mt-1">{standard.useCase}</p>
                </div>
                <div>
                  <span className="text-gray-500">Восприятие:</span>
                  <p className="text-gray-300 mt-1">{standard.perception}</p>
                </div>
                <div>
                  <span className="text-gray-500">Цена:</span>
                  <p className="text-gray-300 mt-1">{standard.cost}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    );
  };

  // Демонстрация Motion Blur
  const MotionBlurDemo = () => {
    const [isMoving, setIsMoving] = useState(false);
    
    return (
      <div className="mb-12 p-6 bg-gradient-to-br from-purple-900/20 to-pink-900/20 rounded-lg border border-purple-700/50">
        <h3 className="text-xl font-semibold text-purple-300 mb-4">
          Магия Motion Blur
        </h3>
        
        <p className="text-gray-300 mb-6">
          Motion Blur — это "клей", который сглаживает движение при низком фреймрейте. 
          Он создает иллюзию промежуточных кадров.
        </p>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-4 bg-slate-900 rounded-lg">
            <h4 className="text-sm font-medium text-gray-400 mb-3">Без Motion Blur (24 FPS)</h4>
            <div className="relative h-24 bg-slate-800 rounded overflow-hidden mb-3">
              <motion.div
                className="absolute top-1/2 -translate-y-1/2 w-12 h-12 bg-red-500 rounded"
                animate={{
                  x: isMoving ? 'calc(100% - 48px)' : 0,
                }}
                transition={{
                  duration: 1,
                  ease: "linear",
                  repeat: isMoving ? Infinity : 0,
                  repeatType: "reverse"
                }}
              />
            </div>
            <p className="text-xs text-gray-500">Дерганое движение</p>
          </div>
          
          <div className="p-4 bg-slate-900 rounded-lg">
            <h4 className="text-sm font-medium text-gray-400 mb-3">С Motion Blur (24 FPS)</h4>
            <div className="relative h-24 bg-slate-800 rounded overflow-hidden mb-3">
              <motion.div
                className="absolute top-1/2 -translate-y-1/2 w-12 h-12 bg-green-500 rounded"
                animate={{
                  x: isMoving ? 'calc(100% - 48px)' : 0,
                }}
                transition={{
                  duration: 1,
                  ease: "linear",
                  repeat: isMoving ? Infinity : 0,
                  repeatType: "reverse"
                }}
              />
              {/* Motion Blur эффект */}
              {isMoving && (
                <motion.div
                  className="absolute top-1/2 -translate-y-1/2 h-12 bg-green-500/30 rounded"
                  animate={{
                    x: ['0%', '100%'],
                    width: ['48px', '96px', '48px'],
                    opacity: [0.8, 0.4, 0.8],
                  }}
                  transition={{
                    duration: 1,
                    ease: "linear",
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                />
              )}
            </div>
            <p className="text-xs text-gray-500">Визуально плавное движение</p>
          </div>
        </div>
        
        <button
          onClick={() => setIsMoving(!isMoving)}
          className="mt-4 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded transition-colors"
        >
          {isMoving ? 'Остановить' : 'Запустить'} анимацию
        </button>
      </div>
    );
  };

  // Технические компромиссы
  const TechnicalTradeoffs = () => {
    return (
      <div className="mb-12">
        <h3 className="text-2xl font-semibold text-purple-300 mb-6">
          Технические компромиссы
        </h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 bg-green-900/20 rounded-lg border border-green-800/50">
            <h4 className="text-green-400 font-semibold mb-3 flex items-center gap-2">
              <Icon icon="ph:check-circle" className="w-5 h-5" />
              Оптимизация производительности
            </h4>
            
            <div className="space-y-3">
              <div className="p-3 bg-green-800/20 rounded">
                <p className="font-medium text-gray-200 mb-1">CSS Transform & Opacity</p>
                <p className="text-sm text-gray-400">GPU-ускорение, 60 FPS возможны</p>
              </div>
              
              <div className="p-3 bg-green-800/20 rounded">
                <p className="font-medium text-gray-200 mb-1">will-change</p>
                <p className="text-sm text-gray-400">Подготовка слоя для анимации</p>
              </div>
              
              <div className="p-3 bg-green-800/20 rounded">
                <p className="font-medium text-gray-200 mb-1">requestAnimationFrame</p>
                <p className="text-sm text-gray-400">Синхронизация с браузером</p>
              </div>
            </div>
          </div>
          
          <div className="p-6 bg-red-900/20 rounded-lg border border-red-800/50">
            <h4 className="text-red-400 font-semibold mb-3 flex items-center gap-2">
              <Icon icon="ph:warning-circle" className="w-5 h-5" />
              Частые ошибки
            </h4>
            
            <div className="space-y-3">
              <div className="p-3 bg-red-800/20 rounded">
                <p className="font-medium text-gray-200 mb-1">Анимация width/height</p>
                <p className="text-sm text-gray-400">Вызывает reflow, убивает FPS</p>
              </div>
              
              <div className="p-3 bg-red-800/20 rounded">
                <p className="font-medium text-gray-200 mb-1">Слишком много элементов</p>
                <p className="text-sm text-gray-400">Перегрузка рендеринга</p>
              </div>
              
              <div className="p-3 bg-red-800/20 rounded">
                <p className="font-medium text-gray-200 mb-1">Motion Blur в реальном времени</p>
                <p className="text-sm text-gray-400">Огромная нагрузка на CPU</p>
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
        Иллюзия Плавности — Фреймрейт, Motion Blur и Технические Компромиссы
      </h2>

      {/* Вступление */}
      <div className="p-6 mb-8 bg-yellow-900/20 rounded-lg border border-yellow-800/50">
        <p className="text-lg text-yellow-300 mb-4">
          <Icon icon="ph:monitor" className="inline w-6 h-6 mr-2" />
          Мы можем спроектировать самую гениальную анимацию. Но если она "дергается" на устройстве 
          пользователя — вся работа идет насмарку.
        </p>
        <p className="text-gray-300 mb-0">
          <strong className="text-orange-400">Исходное заблуждение:</strong> Чем выше фреймрейт, тем лучше. 
          60 fps — это святой Грааль, к которому нужно стремиться всегда.
        </p>
      </div>

      {/* Новая идея */}
      <div className="p-6 mb-12 bg-purple-900/20 rounded-lg border border-purple-700/50">
        <h3 className="text-2xl font-semibold text-purple-400 mb-4">
          Новая идея: Фреймрейт — это бюджет производительности
        </h3>
        <p className="text-lg text-gray-200">
          Наша задача — не слепо достичь 60 fps, а создать иллюзию плавности, используя 
          <strong className="text-purple-400"> самый эффективный инструмент для контекста</strong>, 
          не "сжигая" процессор и батарею.
        </p>
      </div>

      {/* Контролы FPS */}
      <div className="mb-8 p-4 bg-slate-900 rounded-lg border border-slate-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-gray-400">Выберите FPS:</span>
            <div className="flex gap-2">
              {[60, 30, 24].map((fps) => (
                <button
                  key={fps}
                  onClick={() => setSelectedFPS(fps as any)}
                  className={`px-3 py-1 rounded transition-all ${
                    selectedFPS === fps
                      ? 'bg-purple-600 text-white'
                      : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                  }`}
                >
                  {fps} FPS
                </button>
              ))}
            </div>
          </div>
          
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={showPerformance}
              onChange={(e) => setShowPerformance(e.target.checked)}
              className="w-4 h-4 rounded"
            />
            <span className="text-sm text-gray-300">Показать производительность</span>
          </label>
        </div>
      </div>

      {/* Мониторинг производительности */}
      {showPerformance && (
        <div className="mb-8">
          <PerformanceMonitor />
        </div>
      )}

      {/* Сравнение стандартов */}
      <FPSComparison />

      {/* Демонстрации */}
      <div className="mb-12">
        <h3 className="text-2xl font-semibold text-purple-300 mb-6">
          Интерактивные демонстрации
        </h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <ScrollDemo />
          <TransitionDemo />
        </div>
      </div>

      {/* Motion Blur демо */}
      <MotionBlurDemo />

      {/* Технические компромиссы */}
      <TechnicalTradeoffs />

      {/* Практические рекомендации */}
      <div className="mb-12 p-6 bg-blue-900/20 rounded-lg border border-blue-800/50">
        <h3 className="text-xl font-semibold text-blue-400 mb-4">
          Практические рекомендации
        </h3>
        
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-gray-200 mb-2">Для интерактивных элементов:</h4>
            <ul className="space-y-1 text-sm text-gray-400">
              <li>• Целевой FPS: 60</li>
              <li>• Используйте только transform и opacity</li>
              <li>• Избегайте сложных фильтров и теней</li>
              <li>• Тестируйте на слабых устройствах</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-200 mb-2">Для видео контента:</h4>
            <ul className="space-y-1 text-sm text-gray-400">
              <li>• 30 FPS для фоновых видео</li>
              <li>• 24 FPS + Motion Blur для кинематографичности</li>
              <li>• Оптимизируйте размер и качество</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-200 mb-2">Общие принципы:</h4>
            <ul className="space-y-1 text-sm text-gray-400">
              <li>• Профилируйте производительность</li>
              <li>• Используйте CSS containment</li>
              <li>• Минимизируйте reflow и repaint</li>
              <li>• Предзагружайте критические ресурсы</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Финальный вердикт */}
      <div className="mt-12 p-8 bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-lg border border-purple-700/50">
        <h3 className="text-2xl font-bold text-purple-300 mb-6">
          Вердикт: Ваша Новая Ментальная Модель
        </h3>
        
        <div className="p-4 bg-purple-800/20 rounded-lg mb-6">
          <p className="text-lg text-purple-200 font-medium mb-0">
            Перестаньте думать о 60 fps как о единственной цели.<br/>
            <strong className="text-purple-400">Думайте о фреймрейте как о выборе правильного инструмента.</strong>
          </p>
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold text-purple-400 text-lg">
            Задайте себе вопрос: "Какова природа этого движения?"
          </h4>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-900/20 rounded-lg border border-blue-800/50">
              <Icon icon="ph:cursor-click" className="w-8 h-8 text-blue-400 mb-2" />
              <p className="font-medium text-blue-400 mb-2">Прямой отклик UI?</p>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>→ Цель: интерактивность</li>
                <li>→ Стандарт: 60 fps</li>
                <li>→ Забудьте про Motion Blur</li>
              </ul>
            </div>
            
            <div className="p-4 bg-purple-900/20 rounded-lg border border-purple-800/50">
              <Icon icon="ph:film-strip" className="w-8 h-8 text-purple-400 mb-2" />
              <p className="font-medium text-purple-400 mb-2">Видео-ролик?</p>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>→ Цель: кинематографичность</li>
                <li>→ Стандарт: 24 fps</li>
                <li>→ Обязателен Motion Blur</li>
              </ul>
            </div>
            
            <div className="p-4 bg-yellow-900/20 rounded-lg border border-yellow-800/50">
              <Icon icon="ph:battery-medium" className="w-8 h-8 text-yellow-400 mb-2" />
              <p className="font-medium text-yellow-400 mb-2">Фоновый контент?</p>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>→ Цель: эффективность</li>
                <li>→ Стандарт: 30 fps</li>
                <li>→ Экономия ресурсов</li>
              </ul>
            </div>
          </div>

          <p className="text-lg text-gray-200 italic text-center mt-8">
            Понимание этих компромиссов отличает дизайнера красивых картинок<br/>
            от <strong className="text-purple-400">инженера по созданию опыта</strong>,<br/>
            который создает красивые и работающие продукты.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SmoothIllusion;