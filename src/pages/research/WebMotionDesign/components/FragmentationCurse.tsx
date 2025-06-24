import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';

const FragmentationCurse: React.FC = () => {
  const [selectedDevice, setSelectedDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [performanceMode, setPerformanceMode] = useState<'high' | 'medium' | 'low'>('high');
  const [showTokenSystem, setShowTokenSystem] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [showMetrics, setShowMetrics] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  // Устройства для симуляции
  const devices = {
    desktop: {
      name: 'Desktop 27"',
      width: 800,
      height: 450,
      scale: 0.9,
      icon: 'ph:desktop',
      color: 'blue'
    },
    tablet: {
      name: 'iPad Pro',
      width: 400,
      height: 550,
      scale: 0.8,
      icon: 'ph:device-tablet',
      color: 'purple'
    },
    mobile: {
      name: 'iPhone 14',
      width: 200,
      height: 400,
      scale: 0.7,
      icon: 'ph:device-mobile',
      color: 'green'
    }
  };

  // Моушн токены
  const motionTokens = {
    duration: {
      instant: '100ms',
      fast: '200ms',
      medium: '300ms',
      slow: '500ms',
      deliberate: '700ms'
    },
    easing: {
      linear: 'linear',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
    },
    stagger: {
      fast: '50ms',
      medium: '100ms',
      slow: '150ms'
    },
    scale: {
      sm: 0.95,
      md: 0.9,
      lg: 0.8
    }
  };

  // CSS переменные для токенов
  useEffect(() => {
    const root = document.documentElement;
    Object.entries(motionTokens.duration).forEach(([key, value]) => {
      root.style.setProperty(`--motion-duration-${key}`, value);
    });
    Object.entries(motionTokens.easing).forEach(([key, value]) => {
      root.style.setProperty(`--motion-easing-${key}`, value);
    });
  }, []);

  // Демо адаптивной хореографии
  const AdaptiveChoreographyDemo = () => {
    const cards = Array.from({ length: 9 }, (_, i) => ({
      id: i,
      title: `Карточка ${i + 1}`,
      color: ['bg-blue-500', 'bg-purple-500', 'bg-green-500'][i % 3]
    }));

    const getAnimationVariants = () => {
      if (selectedDevice === 'desktop') {
        // Десктоп: сложная последовательная анимация
        return {
          container: {
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.05,
                delayChildren: 0.1
              }
            }
          },
          item: {
            hidden: { opacity: 0, y: 20, scale: 0.9 },
            visible: {
              opacity: 1,
              y: 0,
              scale: 1,
              transition: {
                duration: 0.3,
                ease: "easeOut"
              }
            }
          }
        };
      } else if (selectedDevice === 'tablet') {
        // Планшет: группировка по рядам
        return {
          container: {
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.05
              }
            }
          },
          item: {
            hidden: { opacity: 0, scale: 0.95 },
            visible: {
              opacity: 1,
              scale: 1,
              transition: {
                duration: 0.25,
                ease: "easeOut"
              }
            }
          }
        };
      } else {
        // Мобильный: все элементы как один блок
        return {
          container: {
            hidden: { opacity: 0, scale: 0.95 },
            visible: {
              opacity: 1,
              scale: 1,
              transition: {
                duration: 0.3,
                ease: "easeOut"
              }
            }
          },
          item: {
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                duration: 0
              }
            }
          }
        };
      }
    };

    const variants = getAnimationVariants();

    return (
      <div className="p-6 bg-slate-800/50 rounded-lg">
        <h4 className="text-lg font-semibold text-purple-300 mb-4">
          Адаптивная хореография
        </h4>
        
        <div className="flex justify-center mb-4">
          <button
            onClick={() => {
              setIsAnimating(false);
              setTimeout(() => setIsAnimating(true), 100);
            }}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded transition-colors"
          >
            Запустить анимацию
          </button>
        </div>

        <div className="relative bg-slate-900 rounded-lg overflow-hidden" style={{
          width: `${devices[selectedDevice].width}px`,
          height: `${devices[selectedDevice].height}px`,
          transform: `scale(${devices[selectedDevice].scale})`,
          transformOrigin: 'top center',
          margin: '0 auto'
        }}>
          <AnimatePresence mode="wait">
            {isAnimating && (
              <motion.div
                variants={variants.container}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className={`grid gap-2 p-4 h-full ${
                  selectedDevice === 'desktop' ? 'grid-cols-3' :
                  selectedDevice === 'tablet' ? 'grid-cols-2' : 'grid-cols-1'
                }`}
              >
                {cards.map((card) => (
                  <motion.div
                    key={card.id}
                    variants={variants.item}
                    className={`${card.color} rounded-lg p-4 flex items-center justify-center text-white font-medium`}
                  >
                    {card.title}
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <p className="text-sm text-gray-400 mt-4 text-center">
          💡 {selectedDevice === 'desktop' 
            ? 'Элегантная последовательная анимация для большого экрана' 
            : selectedDevice === 'tablet'
            ? 'Упрощенная группировка для среднего экрана'
            : 'Единый блок для маленького экрана'
          }
        </p>
      </div>
    );
  };

  // Демо производительности (Graceful Degradation)
  const PerformanceDegradationDemo = () => {
    const getAnimationProps = () => {
      switch (performanceMode) {
        case 'high':
          return {
            animate: {
              x: [0, 100, 0],
              rotate: [0, 180, 360],
              scale: [1, 1.2, 1],
            },
            transition: {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            },
            style: {
              boxShadow: '0 20px 40px rgba(147, 51, 234, 0.5)',
              filter: 'blur(0px)'
            },
            whileHover: { scale: 1.1 }
          };
        case 'medium':
          return {
            animate: {
              x: [0, 100, 0],
              opacity: [1, 0.8, 1]
            },
            transition: {
              duration: 2,
              repeat: Infinity,
              ease: "linear"
            },
            style: {},
            whileHover: { opacity: 0.8 }
          };
        case 'low':
          return {
            animate: {},
            transition: {},
            style: {},
            whileHover: {}
          };
      }
    };

    const props = getAnimationProps();

    return (
      <div className="p-6 bg-slate-800/50 rounded-lg">
        <h4 className="text-lg font-semibold text-purple-300 mb-4">
          Graceful Degradation
        </h4>

        <div className="space-y-4">
          <div className="flex gap-2 justify-center">
            {(['high', 'medium', 'low'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setPerformanceMode(mode)}
                className={`px-3 py-1 rounded text-sm transition-all ${
                  performanceMode === mode
                    ? mode === 'high' ? 'bg-green-600 text-white' :
                      mode === 'medium' ? 'bg-yellow-600 text-white' :
                      'bg-red-600 text-white'
                    : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                }`}
              >
                {mode === 'high' ? 'Высокая' : mode === 'medium' ? 'Средняя' : 'Низкая'}
              </button>
            ))}
          </div>

          <div className="relative h-32 bg-slate-900 rounded-lg flex items-center justify-center">
            <motion.div
              className="w-20 h-20 bg-purple-600 rounded-lg flex items-center justify-center"
              {...props}
            >
              <Icon icon="ph:cube" className="w-8 h-8 text-white" />
            </motion.div>
          </div>

          <div className="space-y-2 text-sm">
            <div className={`p-3 rounded ${
              performanceMode === 'high' ? 'bg-green-900/30 border border-green-800/50' :
              'bg-slate-800/30 border border-slate-700/50'
            }`}>
              <div className="flex items-center gap-2">
                <Icon icon={performanceMode === 'high' ? 'ph:check' : 'ph:x'} 
                      className={performanceMode === 'high' ? 'text-green-400' : 'text-gray-500'} />
                <span className={performanceMode === 'high' ? 'text-green-300' : 'text-gray-500'}>
                  3D трансформации и тени
                </span>
              </div>
            </div>

            <div className={`p-3 rounded ${
              performanceMode !== 'low' ? 'bg-yellow-900/30 border border-yellow-800/50' :
              'bg-slate-800/30 border border-slate-700/50'
            }`}>
              <div className="flex items-center gap-2">
                <Icon icon={performanceMode !== 'low' ? 'ph:check' : 'ph:x'} 
                      className={performanceMode !== 'low' ? 'text-yellow-400' : 'text-gray-500'} />
                <span className={performanceMode !== 'low' ? 'text-yellow-300' : 'text-gray-500'}>
                  Базовые анимации (transform, opacity)
                </span>
              </div>
            </div>

            <div className="p-3 bg-red-900/30 border border-red-800/50">
              <div className="flex items-center gap-2">
                <Icon icon="ph:check" className="text-red-400" />
                <span className="text-red-300">
                  {performanceMode === 'low' ? 'Только статичный контент' : 'Fallback готов'}
                </span>
              </div>
            </div>
          </div>
        </div>

        <p className="text-sm text-gray-400 mt-4">
          💡 {performanceMode === 'high' 
            ? 'Полный опыт для мощных устройств' 
            : performanceMode === 'medium'
            ? 'Оптимизированная версия для средних устройств'
            : 'Минимальная нагрузка для слабых устройств'
          }
        </p>
      </div>
    );
  };

  // Система моушн-токенов
  const MotionTokenSystem = () => {
    const [selectedToken, setSelectedToken] = useState<'duration' | 'easing' | 'stagger'>('duration');

    return (
      <div className="mb-12 p-6 bg-gradient-to-br from-purple-900/20 to-pink-900/20 rounded-lg border border-purple-700/50">
        <h3 className="text-xl font-semibold text-purple-300 mb-4">
          Система моушн-токенов
        </h3>

        <div className="mb-4">
          <div className="flex gap-2 mb-4">
            {(['duration', 'easing', 'stagger'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setSelectedToken(type)}
                className={`px-3 py-1 rounded text-sm transition-all ${
                  selectedToken === type
                    ? 'bg-purple-600 text-white'
                    : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>

          <div className="grid gap-3">
            {selectedToken === 'duration' && (
              <>
                {Object.entries(motionTokens.duration).map(([key, value]) => (
                  <div key={key} className="flex items-center gap-4 p-3 bg-slate-800/50 rounded">
                    <code className="text-purple-300 font-mono text-sm">
                      --motion-duration-{key}
                    </code>
                    <span className="text-gray-400 text-sm">{value}</span>
                    <motion.div
                      className="ml-auto w-16 h-8 bg-purple-600 rounded"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: parseFloat(value) / 1000, repeat: Infinity, repeatDelay: 1 }}
                    />
                  </div>
                ))}
              </>
            )}

            {selectedToken === 'easing' && (
              <>
                {Object.entries(motionTokens.easing).map(([key, value]) => (
                  <div key={key} className="flex items-center gap-4 p-3 bg-slate-800/50 rounded">
                    <code className="text-purple-300 font-mono text-sm">
                      --motion-easing-{key}
                    </code>
                    <motion.div
                      className="ml-auto w-32 h-2 bg-purple-600 rounded-full"
                      animate={{ scaleX: [0, 1] }}
                      transition={{ 
                        duration: 1, 
                        ease: value === 'linear' ? 'linear' : [0.4, 0, 0.2, 1],
                        repeat: Infinity,
                        repeatDelay: 0.5
                      }}
                      style={{ originX: 0 }}
                    />
                  </div>
                ))}
              </>
            )}

            {selectedToken === 'stagger' && (
              <>
                {Object.entries(motionTokens.stagger).map(([key, value]) => (
                  <div key={key} className="flex items-center gap-4 p-3 bg-slate-800/50 rounded">
                    <code className="text-purple-300 font-mono text-sm">
                      --motion-stagger-{key}
                    </code>
                    <span className="text-gray-400 text-sm">{value}</span>
                    <div className="ml-auto flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-4 h-8 bg-purple-600 rounded"
                          animate={{ y: [0, -10, 0] }}
                          transition={{ 
                            duration: 0.5,
                            delay: i * (parseFloat(value) / 1000),
                            repeat: Infinity,
                            repeatDelay: 1
                          }}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>

        <div className="mt-6 p-4 bg-slate-900 rounded">
          <h4 className="text-sm font-medium text-gray-400 mb-2">Пример использования:</h4>
          <pre className="text-xs text-gray-300 overflow-x-auto">
{`/* Вместо магических чисел */
.card {
  transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1);
}

/* Используем токены */
.card {
  transition: transform var(--motion-duration-medium) 
              var(--motion-easing-easeInOut);
}`}
          </pre>
        </div>
      </div>
    );
  };

  // Симулятор устройств
  const DeviceSimulator = () => {
    return (
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-purple-300 mb-4">
          Симулятор устройств
        </h3>

        <div className="grid md:grid-cols-3 gap-4">
          {(Object.entries(devices) as [keyof typeof devices, typeof devices[keyof typeof devices]][]).map(([key, device]) => {
            const isActive = selectedDevice === key;
            const colorClasses = {
              blue: {
                bg: isActive ? 'bg-blue-900/30' : 'bg-slate-800/50',
                border: isActive ? 'border-blue-700' : 'border-slate-700',
                icon: 'text-blue-400'
              },
              purple: {
                bg: isActive ? 'bg-purple-900/30' : 'bg-slate-800/50',
                border: isActive ? 'border-purple-700' : 'border-slate-700',
                icon: 'text-purple-400'
              },
              green: {
                bg: isActive ? 'bg-green-900/30' : 'bg-slate-800/50',
                border: isActive ? 'border-green-700' : 'border-slate-700',
                icon: 'text-green-400'
              }
            }[device.color];

            return (
              <motion.button
                key={key}
                onClick={() => setSelectedDevice(key)}
                className={`p-4 rounded-lg border transition-all ${colorClasses.bg} ${colorClasses.border}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Icon icon={device.icon} className={`w-12 h-12 mx-auto mb-2 ${colorClasses.icon}`} />
                <h4 className="font-medium text-gray-200">{device.name}</h4>
                <p className="text-xs text-gray-400 mt-1">
                  {device.width} × {device.height}px
                </p>
              </motion.button>
            );
          })}
        </div>
      </div>
    );
  };

  // Метрики производительности
  const PerformanceMetrics = () => {
    const getMetrics = () => {
      const baseMetrics = {
        fps: performanceMode === 'high' ? 60 : performanceMode === 'medium' ? 45 : 30,
        cpu: performanceMode === 'high' ? 65 : performanceMode === 'medium' ? 35 : 15,
        memory: performanceMode === 'high' ? 120 : performanceMode === 'medium' ? 80 : 50,
        battery: performanceMode === 'high' ? 85 : performanceMode === 'medium' ? 50 : 20
      };

      // Добавляем вариацию
      return {
        fps: Math.max(10, baseMetrics.fps + Math.random() * 10 - 5),
        cpu: Math.min(100, baseMetrics.cpu + Math.random() * 20 - 10),
        memory: baseMetrics.memory + Math.random() * 20 - 10,
        battery: Math.min(100, baseMetrics.battery + Math.random() * 10 - 5)
      };
    };

    const [metrics, setMetrics] = useState(getMetrics());

    useEffect(() => {
      const interval = setInterval(() => {
        setMetrics(getMetrics());
      }, 1000);
      return () => clearInterval(interval);
    }, [performanceMode]);

    if (!showMetrics) return null;

    return (
      <div className="fixed top-4 right-4 p-4 bg-slate-900/95 rounded-lg border border-slate-700 shadow-xl">
        <h4 className="text-sm font-semibold text-gray-400 mb-3">Метрики устройства</h4>
        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between gap-8">
            <span className="text-gray-500">FPS</span>
            <span className={`font-mono ${
              metrics.fps >= 55 ? 'text-green-400' :
              metrics.fps >= 30 ? 'text-yellow-400' : 'text-red-400'
            }`}>{Math.round(metrics.fps)}</span>
          </div>
          <div className="flex items-center justify-between gap-8">
            <span className="text-gray-500">CPU</span>
            <span className={`font-mono ${
              metrics.cpu <= 40 ? 'text-green-400' :
              metrics.cpu <= 70 ? 'text-yellow-400' : 'text-red-400'
            }`}>{Math.round(metrics.cpu)}%</span>
          </div>
          <div className="flex items-center justify-between gap-8">
            <span className="text-gray-500">RAM</span>
            <span className="font-mono text-gray-300">{Math.round(metrics.memory)}MB</span>
          </div>
          <div className="flex items-center justify-between gap-8">
            <span className="text-gray-500">Батарея</span>
            <span className={`font-mono ${
              metrics.battery <= 30 ? 'text-green-400' :
              metrics.battery <= 60 ? 'text-yellow-400' : 'text-red-400'
            }`}>{Math.round(metrics.battery)}%</span>
          </div>
        </div>
      </div>
    );
  };

  // Три измерения масштабируемости
  const ScalabilityDimensions = () => {
    return (
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="p-6 bg-blue-900/20 rounded-lg border border-blue-800/50">
          <Icon icon="ph:devices" className="w-8 h-8 text-blue-400 mb-3" />
          <h4 className="text-blue-400 font-semibold mb-2">
            Масштабируемость Восприятия
          </h4>
          <p className="text-sm text-gray-300 mb-3">
            Адаптация к размеру и плотности экрана
          </p>
          <ul className="space-y-2 text-sm text-gray-400">
            <li className="flex items-start gap-2">
              <Icon icon="ph:check" className="w-4 h-4 text-blue-400 mt-0.5" />
              <span>Упрощение хореографии на малых экранах</span>
            </li>
            <li className="flex items-start gap-2">
              <Icon icon="ph:check" className="w-4 h-4 text-blue-400 mt-0.5" />
              <span>Группировка элементов для ясности</span>
            </li>
            <li className="flex items-start gap-2">
              <Icon icon="ph:check" className="w-4 h-4 text-blue-400 mt-0.5" />
              <span>Сохранение читаемости</span>
            </li>
          </ul>
        </div>

        <div className="p-6 bg-yellow-900/20 rounded-lg border border-yellow-800/50">
          <Icon icon="ph:cpu" className="w-8 h-8 text-yellow-400 mb-3" />
          <h4 className="text-yellow-400 font-semibold mb-2">
            Масштабируемость Производительности
          </h4>
          <p className="text-sm text-gray-300 mb-3">
            Адаптация к мощности устройства
          </p>
          <ul className="space-y-2 text-sm text-gray-400">
            <li className="flex items-start gap-2">
              <Icon icon="ph:check" className="w-4 h-4 text-yellow-400 mt-0.5" />
              <span>Graceful degradation эффектов</span>
            </li>
            <li className="flex items-start gap-2">
              <Icon icon="ph:check" className="w-4 h-4 text-yellow-400 mt-0.5" />
              <span>Отключение дорогих операций</span>
            </li>
            <li className="flex items-start gap-2">
              <Icon icon="ph:check" className="w-4 h-4 text-yellow-400 mt-0.5" />
              <span>Режим экономии батареи</span>
            </li>
          </ul>
        </div>

        <div className="p-6 bg-purple-900/20 rounded-lg border border-purple-800/50">
          <Icon icon="ph:package" className="w-8 h-8 text-purple-400 mb-3" />
          <h4 className="text-purple-400 font-semibold mb-2">
            Масштабируемость Системы
          </h4>
          <p className="text-sm text-gray-300 mb-3">
            Консистентность через токены
          </p>
          <ul className="space-y-2 text-sm text-gray-400">
            <li className="flex items-start gap-2">
              <Icon icon="ph:check" className="w-4 h-4 text-purple-400 mt-0.5" />
              <span>Единая система токенов</span>
            </li>
            <li className="flex items-start gap-2">
              <Icon icon="ph:check" className="w-4 h-4 text-purple-400 mt-0.5" />
              <span>Централизованное управление</span>
            </li>
            <li className="flex items-start gap-2">
              <Icon icon="ph:check" className="w-4 h-4 text-purple-400 mt-0.5" />
              <span>Масштабирование команды</span>
            </li>
          </ul>
        </div>
      </div>
    );
  };

  return (
    <div className="prose prose-invert max-w-none">
      <h2 className="mb-8 text-3xl font-bold text-purple-400">
        Проклятие Фрагментации — Масштабируемость Моушн-дизайна
      </h2>

      {/* Вступление */}
      <div className="p-6 mb-8 bg-yellow-900/20 rounded-lg border border-yellow-800/50">
        <p className="text-lg text-yellow-300 mb-4">
          <Icon icon="ph:warning-circle" className="inline w-6 h-6 mr-2" />
          Мы спроектировали шикарную анимацию на нашем 5K-мониторе. Через неделю получаем отчеты: 
          на старом Android она тормозит, на ноутбуке выглядит громоздко, а на телевизоре — потерянно.
        </p>
        <p className="text-gray-300 mb-0">
          <strong className="text-orange-400">Исходное заблуждение:</strong> Можно спроектировать один раз 
          и просто попросить разработчиков "сделать адаптивной".
        </p>
      </div>

      {/* Новая идея */}
      <div className="p-6 mb-12 bg-purple-900/20 rounded-lg border border-purple-700/50">
        <h3 className="text-2xl font-semibold text-purple-400 mb-4">
          Новая идея: Система правил вместо одной анимации
        </h3>
        <p className="text-lg text-gray-200">
          Моушн-дизайн должен быть масштабируемым по своей сути. Мы проектируем не одну "идеальную" анимацию, 
          а <strong className="text-purple-400">систему правил и токенов</strong>, которая генерирует 
          уместные анимации для любого контекста.
        </p>
      </div>

      {/* Контролы */}
      <div className="mb-8 p-4 bg-slate-900 rounded-lg border border-slate-700">
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={reducedMotion}
              onChange={(e) => setReducedMotion(e.target.checked)}
              className="w-4 h-4 rounded"
            />
            <span className="text-sm text-gray-300">prefers-reduced-motion</span>
          </label>
          
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={showMetrics}
              onChange={(e) => setShowMetrics(e.target.checked)}
              className="w-4 h-4 rounded"
            />
            <span className="text-sm text-gray-300">Показать метрики</span>
          </label>
        </div>
      </div>

      {/* Метрики производительности */}
      <PerformanceMetrics />

      {/* Три измерения */}
      <ScalabilityDimensions />

      {/* Симулятор устройств */}
      <DeviceSimulator />

      {/* Демонстрации */}
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        <AdaptiveChoreographyDemo />
        <PerformanceDegradationDemo />
      </div>

      {/* Система токенов */}
      <MotionTokenSystem />

      {/* Практические примеры */}
      <div className="mb-12">
        <h3 className="text-2xl font-semibold text-purple-300 mb-6">
          Практические примеры
        </h3>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 bg-green-900/20 rounded-lg border border-green-800/50">
            <h4 className="text-green-400 font-semibold mb-3 flex items-center gap-2">
              <Icon icon="ph:check-circle" className="w-5 h-5" />
              Правильный подход
            </h4>
            <pre className="text-xs text-gray-300 bg-slate-900 p-3 rounded overflow-x-auto">
{`/* Адаптивная хореография */
@media (max-width: 768px) {
  .card-list {
    /* Группируем анимацию на мобильных */
    animation: fadeInScale 0.3s ease-out;
  }
}

/* Graceful degradation */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}

/* Использование токенов */
.element {
  transition: transform var(--motion-duration-fast) 
              var(--motion-easing-easeOut);
}`}
            </pre>
          </div>

          <div className="p-6 bg-red-900/20 rounded-lg border border-red-800/50">
            <h4 className="text-red-400 font-semibold mb-3 flex items-center gap-2">
              <Icon icon="ph:x-circle" className="w-5 h-5" />
              Неправильный подход
            </h4>
            <pre className="text-xs text-gray-300 bg-slate-900 p-3 rounded overflow-x-auto">
{`/* Фиксированные значения */
.card {
  /* Одинаково для всех устройств */
  animation: complexStagger 2s ease-out;
  filter: blur(0px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.3);
}

/* Игнорирование предпочтений */
/* Нет проверки prefers-reduced-motion */

/* Магические числа */
.element {
  transition: all 347ms 
              cubic-bezier(0.4, 0, 0.2, 1);
}`}
            </pre>
          </div>
        </div>
      </div>

      {/* Чеклист масштабируемости */}
      <div className="mb-12 p-6 bg-blue-900/20 rounded-lg border border-blue-800/50">
        <h3 className="text-xl font-semibold text-blue-400 mb-4">
          Чеклист масштабируемости
        </h3>
        
        <div className="space-y-3">
          <label className="flex items-start gap-3 cursor-pointer">
            <input type="checkbox" className="w-5 h-5 mt-0.5 rounded" />
            <div>
              <p className="font-medium text-gray-200">Протестировано на малых экранах</p>
              <p className="text-sm text-gray-400">Упрощена ли хореография для мобильных?</p>
            </div>
          </label>
          
          <label className="flex items-start gap-3 cursor-pointer">
            <input type="checkbox" className="w-5 h-5 mt-0.5 rounded" />
            <div>
              <p className="font-medium text-gray-200">Есть fallback для слабых устройств</p>
              <p className="text-sm text-gray-400">Отключаются ли дорогие эффекты?</p>
            </div>
          </label>
          
          <label className="flex items-start gap-3 cursor-pointer">
            <input type="checkbox" className="w-5 h-5 mt-0.5 rounded" />
            <div>
              <p className="font-medium text-gray-200">Используются токены</p>
              <p className="text-sm text-gray-400">Нет ли магических чисел в коде?</p>
            </div>
          </label>
          
          <label className="flex items-start gap-3 cursor-pointer">
            <input type="checkbox" className="w-5 h-5 mt-0.5 rounded" />
            <div>
              <p className="font-medium text-gray-200">Поддержка prefers-reduced-motion</p>
              <p className="text-sm text-gray-400">Учитываются ли предпочтения пользователя?</p>
            </div>
          </label>
          
          <label className="flex items-start gap-3 cursor-pointer">
            <input type="checkbox" className="w-5 h-5 mt-0.5 rounded" />
            <div>
              <p className="font-medium text-gray-200">Протестировано на реальных устройствах</p>
              <p className="text-sm text-gray-400">Не только в симуляторе?</p>
            </div>
          </label>
        </div>
      </div>

      {/* Финальный вердикт */}
      <div className="mt-12 p-8 bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-lg border border-purple-700/50">
        <h3 className="text-2xl font-bold text-purple-300 mb-6">
          Вердикт: Ваша Новая Ментальная Модель
        </h3>
        
        <div className="p-4 bg-purple-800/20 rounded-lg mb-6">
          <p className="text-lg text-purple-200 font-medium mb-0">
            Перестаньте проектировать одну анимацию.<br/>
            <strong className="text-purple-400">Начните проектировать систему анимации.</strong>
          </p>
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold text-purple-400 text-lg">
            Перед началом работы задайте себе эти вопросы:
          </h4>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-900/20 rounded-lg border border-blue-800/50">
              <Icon icon="ph:devices" className="w-8 h-8 text-blue-400 mb-2" />
              <p className="font-medium text-blue-400 mb-2">Восприятие</p>
              <p className="text-sm text-gray-300">
                Как эта хореография будет выглядеть на маленьком экране?
              </p>
            </div>
            
            <div className="p-4 bg-yellow-900/20 rounded-lg border border-yellow-800/50">
              <Icon icon="ph:cpu" className="w-8 h-8 text-yellow-400 mb-2" />
              <p className="font-medium text-yellow-400 mb-2">Производительность</p>
              <p className="text-sm text-gray-300">
                Что произойдет на слабом устройстве? Какой fallback?
              </p>
            </div>
            
            <div className="p-4 bg-purple-900/20 rounded-lg border border-purple-800/50">
              <Icon icon="ph:package" className="w-8 h-8 text-purple-400 mb-2" />
              <p className="font-medium text-purple-400 mb-2">Система</p>
              <p className="text-sm text-gray-300">
                Использую ли я токены вместо магических чисел?
              </p>
            </div>
          </div>

          <p className="text-lg text-gray-200 italic text-center mt-8">
            Проектирование с оглядкой на масштабируемость отличает<br/>
            дизайн для "шота на Dribbble" от <strong className="text-purple-400">дизайна для реального продукта</strong>,<br/>
            которым пользуются миллионы людей на тысячах разных устройств.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FragmentationCurse;