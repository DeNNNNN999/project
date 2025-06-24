import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { Icon } from '@iconify/react';

const LoopingAnimation: React.FC = () => {
  const [showSeamless, setShowSeamless] = useState(true);
  const [showExplicit, setShowExplicit] = useState(true);
  const [activeExample, setActiveExample] = useState<'breathing' | 'pulse' | null>(null);
  const [showAntipatterns, setShowAntipatterns] = useState(false);
  const [cpuUsage, setCpuUsage] = useState(5);
  const [userAnnoyance, setUserAnnoyance] = useState(0);

  // Симуляция CPU и раздражения
  useEffect(() => {
    if (showAntipatterns) {
      const interval = setInterval(() => {
        setCpuUsage(prev => Math.min(100, prev + Math.random() * 10));
        setUserAnnoyance(prev => Math.min(100, prev + 2));
      }, 100);
      return () => clearInterval(interval);
    } else {
      setCpuUsage(5);
      setUserAnnoyance(0);
    }
  }, [showAntipatterns]);

  // Демо "Дыхание" - Бесшовный цикл
  const BreathingDemo = () => {
    return (
      <div className="p-6 bg-blue-900/20 rounded-lg border border-blue-800/50">
        <h4 className="text-blue-400 font-semibold mb-4 flex items-center gap-2">
          <Icon icon="ph:wind" className="w-5 h-5" />
          Тип 1: "Дыхание" — Бесшовный (Seamless) Цикл
        </h4>
        
        <div className="mb-6">
          <p className="text-gray-300 mb-2">
            Анимация без видимого начала и конца. Движение кажется <strong className="text-blue-400">непрерывным</strong>, 
            как дыхание или течение реки.
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Icon icon="ph:eye-closed" className="w-4 h-4" />
            <span>Работает на периферии сознания</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Облака */}
          <div>
            <h5 className="text-blue-300 font-medium mb-3">Плывущие облака</h5>
            <div className="relative h-48 bg-gradient-to-b from-blue-900/20 to-blue-800/10 rounded-lg overflow-hidden">
              {/* Небо */}
              <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-slate-800" />
              
              {/* Облака */}
              {[0, 1, 2].map((index) => (
                <motion.div
                  key={index}
                  className="absolute"
                  style={{
                    top: `${20 + index * 20}%`,
                    width: `${80 + index * 10}px`,
                    height: '30px',
                  }}
                  animate={{
                    x: [-100, window.innerWidth],
                  }}
                  transition={{
                    duration: 20 + index * 5,
                    repeat: Infinity,
                    ease: "linear",
                    delay: index * 7,
                  }}
                >
                  <div className="w-full h-full bg-white/10 rounded-full blur-xl" />
                </motion.div>
              ))}
              
              <div className="absolute bottom-4 left-4 text-xs text-blue-300">
                Незаметное, органичное движение
              </div>
            </div>
          </div>

          {/* Пульсация */}
          <div>
            <h5 className="text-blue-300 font-medium mb-3">Дышащий элемент</h5>
            <div className="relative h-48 bg-slate-900 rounded-lg flex items-center justify-center">
              <motion.div
                className="relative"
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {/* Свечение */}
                <motion.div
                  className="absolute inset-0 bg-blue-500/20 rounded-full blur-3xl"
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                
                {/* Ядро */}
                <div className="relative w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                  <Icon icon="ph:flower-lotus" className="w-12 h-12 text-white" />
                </div>
              </motion.div>
              
              <div className="absolute bottom-4 text-xs text-blue-300">
                Медленное, успокаивающее
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-blue-800/20 rounded text-sm">
          <p className="text-blue-300">
            <Icon icon="ph:target" className="inline w-4 h-4 mr-1" />
            <strong>Цель:</strong> Создать атмосферу, не привлекая активного внимания
          </p>
        </div>
      </div>
    );
  };

  // Демо "Пульс" - Явный цикл
  const PulseDemo = () => {
    const [isLoading, setIsLoading] = useState(true);

    return (
      <div className="p-6 bg-purple-900/20 rounded-lg border border-purple-800/50">
        <h4 className="text-purple-400 font-semibold mb-4 flex items-center gap-2">
          <Icon icon="ph:pulse" className="w-5 h-5" />
          Тип 2: "Пульс" — Явный (Explicit) Цикл
        </h4>
        
        <div className="mb-6">
          <p className="text-gray-300 mb-2">
            Анимация с четко различимыми началом, концом и паузой. Движение <strong className="text-purple-400">подчеркивает</strong> 
            свою цикличность.
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Icon icon="ph:eye" className="w-4 h-4" />
            <span>Активно привлекает внимание</span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {/* Spinner */}
          <div>
            <h5 className="text-purple-300 font-medium mb-3">Загрузка</h5>
            <div className="h-32 bg-slate-900 rounded-lg flex items-center justify-center">
              <motion.div
                className="w-12 h-12 border-4 border-purple-500/30 border-t-purple-500 rounded-full"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </div>
            <p className="text-xs text-gray-400 mt-2 text-center">
              Постоянное вращение
            </p>
          </div>

          {/* Точки */}
          <div>
            <h5 className="text-purple-300 font-medium mb-3">Обработка</h5>
            <div className="h-32 bg-slate-900 rounded-lg flex items-center justify-center">
              <div className="flex gap-2">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-3 h-3 bg-purple-500 rounded-full"
                    animate={{
                      y: [0, -10, 0],
                      opacity: [0.3, 1, 0.3],
                    }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-2 text-center">
              Четкий ритм
            </p>
          </div>

          {/* Пульсирующая кнопка */}
          <div>
            <h5 className="text-purple-300 font-medium mb-3">Призыв</h5>
            <div className="h-32 bg-slate-900 rounded-lg flex items-center justify-center">
              <motion.button
                className="relative px-6 py-3 bg-purple-600 text-white rounded-lg font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Нажми меня!
                <motion.div
                  className="absolute inset-0 bg-purple-600 rounded-lg"
                  animate={{
                    scale: [1, 1.2],
                    opacity: [0.5, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                  }}
                />
              </motion.button>
            </div>
            <p className="text-xs text-gray-400 mt-2 text-center">
              Привлечение внимания
            </p>
          </div>
        </div>

        <div className="mt-6 p-4 bg-purple-800/20 rounded text-sm">
          <p className="text-purple-300">
            <Icon icon="ph:megaphone" className="inline w-4 h-4 mr-1" />
            <strong>Сообщение:</strong> "Я здесь. Я работаю. Подожди. Все под контролем"
          </p>
        </div>
      </div>
    );
  };

  // Анти-паттерны
  const AntipatternsDemo = () => {
    const [showNoisyBg, setShowNoisyBg] = useState(false);
    const [showHiddenLoader, setShowHiddenLoader] = useState(false);
    const [showPerpetual, setShowPerpetual] = useState(false);

    return (
      <div className="space-y-6">
        <h3 className="text-2xl font-semibold text-red-400 mb-4">
          Ловушки и Анти-паттерны
        </h3>

        {/* Анти-паттерн 1: Шумный фон */}
        <div className="p-6 bg-red-900/20 rounded-lg border border-red-800/50">
          <h4 className="text-red-400 font-semibold mb-4 flex items-center gap-2">
            <Icon icon="ph:warning" className="w-5 h-5" />
            Анти-паттерн 1: Шумный фон
          </h4>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h5 className="text-red-300 font-medium mb-3">❌ Неправильно</h5>
              <div className="relative h-48 bg-slate-900 rounded-lg overflow-hidden">
                {showNoisyBg && [...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-20 h-20 bg-red-500/30 rounded-full"
                    animate={{
                      x: [0, 200, 0],
                      y: [0, 100, -50, 0],
                      scale: [1, 2, 0.5, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.3,
                    }}
                    style={{
                      left: `${i * 20}%`,
                      top: `${i * 15}%`,
                    }}
                  />
                ))}
                <div className="absolute inset-0 flex items-center justify-center p-4">
                  <p className="text-white text-center">
                    Попробуйте прочитать этот текст с активным фоном
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowNoisyBg(!showNoisyBg)}
                className="mt-3 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 w-full"
              >
                {showNoisyBg ? 'Выключить хаос' : 'Включить хаос'}
              </button>
            </div>

            <div>
              <h5 className="text-green-300 font-medium mb-3">✅ Правильно</h5>
              <div className="relative h-48 bg-slate-900 rounded-lg overflow-hidden">
                {[0, 1].map((i) => (
                  <motion.div
                    key={i}
                    className="absolute w-32 h-32 bg-green-500/10 rounded-full blur-3xl"
                    animate={{
                      x: [0, 30, 0],
                      y: [0, -20, 0],
                    }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      delay: i * 5,
                      ease: "easeInOut",
                    }}
                    style={{
                      left: `${i * 50}%`,
                      top: '30%',
                    }}
                  />
                ))}
                <div className="absolute inset-0 flex items-center justify-center p-4">
                  <p className="text-white text-center">
                    Текст легко читается с спокойным фоном
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Анти-паттерн 2: Скрытный лоадер */}
        <div className="p-6 bg-red-900/20 rounded-lg border border-red-800/50">
          <h4 className="text-red-400 font-semibold mb-4 flex items-center gap-2">
            <Icon icon="ph:warning" className="w-5 h-5" />
            Анти-паттерн 2: Скрытный лоадер
          </h4>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h5 className="text-red-300 font-medium mb-3">❌ Неправильно</h5>
              <div className="h-48 bg-slate-900 rounded-lg flex flex-col items-center justify-center p-4">
                <p className="text-gray-400 mb-4">Загрузка данных...</p>
                <motion.div
                  className="w-2 h-2 bg-gray-600 rounded-full"
                  animate={{
                    opacity: [0.2, 0.3, 0.2],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <p className="text-xs text-red-400 mt-4">Это загрузка или декор?</p>
              </div>
            </div>

            <div>
              <h5 className="text-green-300 font-medium mb-3">✅ Правильно</h5>
              <div className="h-48 bg-slate-900 rounded-lg flex flex-col items-center justify-center p-4">
                <p className="text-gray-400 mb-4">Загрузка данных...</p>
                <div className="flex gap-2">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-3 h-3 bg-green-500 rounded-full"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        delay: i * 0.15,
                      }}
                    />
                  ))}
                </div>
                <p className="text-xs text-green-400 mt-4">Очевидно, что идет процесс</p>
              </div>
            </div>
          </div>
        </div>

        {/* Анти-паттерн 3: Вечный двигатель */}
        <div className="p-6 bg-red-900/20 rounded-lg border border-red-800/50">
          <h4 className="text-red-400 font-semibold mb-4 flex items-center gap-2">
            <Icon icon="ph:warning" className="w-5 h-5" />
            Анти-паттерн 3: Вечный двигатель
          </h4>
          
          <div className="mb-4">
            <p className="text-gray-300">
              Использование цикличной анимации там, где она не нужна. После первых 3 секунд это становится 
              <strong className="text-red-400"> визуальным мусором</strong>.
            </p>
          </div>

          <div className="bg-slate-900 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h5 className="text-white font-medium">Бесполезные анимации</h5>
              <button
                onClick={() => setShowPerpetual(!showPerpetual)}
                className={`px-4 py-2 rounded font-medium ${
                  showPerpetual 
                    ? 'bg-red-600 text-white hover:bg-red-700' 
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}
              >
                {showPerpetual ? 'Выключить безумие' : 'Включить безумие'}
              </button>
            </div>

            <div className="grid grid-cols-4 gap-4">
              {/* Вращающаяся иконка */}
              <div className="text-center">
                <motion.div
                  animate={showPerpetual ? { rotate: 360 } : {}}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="inline-block mb-2"
                >
                  <Icon icon="ph:gear" className="w-8 h-8 text-gray-400" />
                </motion.div>
                <p className="text-xs text-gray-500">Настройки</p>
              </div>

              {/* Прыгающая иконка */}
              <div className="text-center">
                <motion.div
                  animate={showPerpetual ? { y: [0, -10, 0] } : {}}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                  }}
                  className="inline-block mb-2"
                >
                  <Icon icon="ph:envelope" className="w-8 h-8 text-gray-400" />
                </motion.div>
                <p className="text-xs text-gray-500">Почта</p>
              </div>

              {/* Пульсирующая иконка */}
              <div className="text-center">
                <motion.div
                  animate={showPerpetual ? { scale: [1, 1.2, 1] } : {}}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                  }}
                  className="inline-block mb-2"
                >
                  <Icon icon="ph:star" className="w-8 h-8 text-gray-400" />
                </motion.div>
                <p className="text-xs text-gray-500">Избранное</p>
              </div>

              {/* Качающаяся иконка */}
              <div className="text-center">
                <motion.div
                  animate={showPerpetual ? { rotate: [-10, 10, -10] } : {}}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                  className="inline-block mb-2"
                >
                  <Icon icon="ph:bell" className="w-8 h-8 text-gray-400" />
                </motion.div>
                <p className="text-xs text-gray-500">Уведомления</p>
              </div>
            </div>

            {/* Метрики */}
            <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
              <div className="p-3 bg-red-900/20 rounded">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">CPU использование:</span>
                  <span className={`font-mono ${cpuUsage > 50 ? 'text-red-400' : 'text-yellow-400'}`}>
                    {showPerpetual ? `${Math.round(cpuUsage)}%` : '5%'}
                  </span>
                </div>
              </div>
              <div className="p-3 bg-orange-900/20 rounded">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Уровень раздражения:</span>
                  <span className={`font-mono ${userAnnoyance > 50 ? 'text-red-400' : 'text-orange-400'}`}>
                    {showPerpetual ? `${Math.round(userAnnoyance)}%` : '0%'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Чек-лист принятия решения
  const DecisionChecklist = () => {
    const [answer, setAnswer] = useState<'atmosphere' | 'process' | 'none' | null>(null);

    return (
      <div className="p-6 bg-slate-800/50 rounded-lg border border-slate-700">
        <h4 className="text-purple-400 font-semibold mb-4 flex items-center gap-2">
          <Icon icon="ph:question" className="w-5 h-5" />
          Ключевой вопрос перед зацикливанием
        </h4>

        <div className="text-center mb-6">
          <p className="text-2xl text-purple-400 font-bold mb-2">
            "Что я хочу сказать этим повторением?"
          </p>
        </div>

        <div className="space-y-3">
          <motion.button
            onClick={() => setAnswer('atmosphere')}
            className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
              answer === 'atmosphere' 
                ? 'bg-blue-900/20 border-blue-500 shadow-blue-500/20 shadow-lg' 
                : 'bg-slate-900/50 border-slate-700 hover:border-slate-600'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-start gap-3">
              <Icon icon="ph:cloud" className="w-6 h-6 text-blue-400 mt-0.5" />
              <div>
                <p className="font-medium text-blue-400">
                  "Все спокойно, мир вокруг живой"
                </p>
                <p className="text-sm text-gray-400 mt-1">
                  Выбор: "Дыхание" (Бесшовный цикл)
                </p>
              </div>
            </div>
          </motion.button>

          <motion.button
            onClick={() => setAnswer('process')}
            className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
              answer === 'process' 
                ? 'bg-purple-900/20 border-purple-500 shadow-purple-500/20 shadow-lg' 
                : 'bg-slate-900/50 border-slate-700 hover:border-slate-600'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-start gap-3">
              <Icon icon="ph:timer" className="w-6 h-6 text-purple-400 mt-0.5" />
              <div>
                <p className="font-medium text-purple-400">
                  "Подожди, я работаю, все в порядке"
                </p>
                <p className="text-sm text-gray-400 mt-1">
                  Выбор: "Пульс" (Явный цикл)
                </p>
              </div>
            </div>
          </motion.button>

          <motion.button
            onClick={() => setAnswer('none')}
            className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
              answer === 'none' 
                ? 'bg-green-900/20 border-green-500 shadow-green-500/20 shadow-lg' 
                : 'bg-slate-900/50 border-slate-700 hover:border-slate-600'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-start gap-3">
              <Icon icon="ph:stop-circle" className="w-6 h-6 text-green-400 mt-0.5" />
              <div>
                <p className="font-medium text-green-400">
                  Ни то, ни другое
                </p>
                <p className="text-sm text-gray-400 mt-1">
                  Анимация не должна быть цикличной
                </p>
              </div>
            </div>
          </motion.button>
        </div>

        <AnimatePresence>
          {answer && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6"
            >
              {answer === 'atmosphere' && (
                <div className="p-4 bg-blue-900/20 rounded-lg border border-blue-800/50">
                  <h5 className="font-medium text-blue-400 mb-2">Ваши инструменты:</h5>
                  <ul className="space-y-1 text-sm text-gray-300">
                    <li>• Медленная скорость (10+ секунд на цикл)</li>
                    <li>• Плавные ease-кривые</li>
                    <li>• Незаметный "шов"</li>
                    <li>• Низкая контрастность</li>
                  </ul>
                  <p className="mt-3 text-sm text-blue-300">
                    <strong>Цель:</strong> Быть незаметным
                  </p>
                </div>
              )}

              {answer === 'process' && (
                <div className="p-4 bg-purple-900/20 rounded-lg border border-purple-800/50">
                  <h5 className="font-medium text-purple-400 mb-2">Ваши инструменты:</h5>
                  <ul className="space-y-1 text-sm text-gray-300">
                    <li>• Четкий ритм (1-2 секунды на цикл)</li>
                    <li>• Видимый перезапуск</li>
                    <li>• Предсказуемость паттерна</li>
                    <li>• Достаточная контрастность</li>
                  </ul>
                  <p className="mt-3 text-sm text-purple-300">
                    <strong>Цель:</strong> Быть заметным, но не назойливым
                  </p>
                </div>
              )}

              {answer === 'none' && (
                <div className="p-4 bg-green-900/20 rounded-lg border border-green-800/50">
                  <p className="text-green-300">
                    <Icon icon="ph:check-circle" className="inline w-4 h-4 mr-1" />
                    Правильное решение! Умение вовремя остановиться — такой же важный навык, 
                    как и умение создать красивое движение.
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  // Примеры правильного использования
  const GoodExamples = () => {
    return (
      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-6 bg-green-900/20 rounded-lg border border-green-800/50">
          <h4 className="text-green-400 font-semibold mb-4 flex items-center gap-2">
            <Icon icon="ph:check-circle" className="w-5 h-5" />
            Правильное "Дыхание"
          </h4>
          <ul className="space-y-3 text-sm text-gray-300">
            <li className="flex items-start gap-2">
              <Icon icon="ph:meditation" className="w-5 h-5 mt-0.5 text-green-400" />
              <div>
                <strong>Приложение для медитации:</strong> Плавная пульсация круга дыхания
              </div>
            </li>
            <li className="flex items-start gap-2">
              <Icon icon="ph:globe" className="w-5 h-5 mt-0.5 text-green-400" />
              <div>
                <strong>Промо-сайт:</strong> Медленно плывущие частицы на фоне
              </div>
            </li>
            <li className="flex items-start gap-2">
              <Icon icon="ph:gradient" className="w-5 h-5 mt-0.5 text-green-400" />
              <div>
                <strong>Ambient UI:</strong> Переливание градиента в неактивном состоянии
              </div>
            </li>
          </ul>
        </div>

        <div className="p-6 bg-green-900/20 rounded-lg border border-green-800/50">
          <h4 className="text-green-400 font-semibold mb-4 flex items-center gap-2">
            <Icon icon="ph:check-circle" className="w-5 h-5" />
            Правильный "Пульс"
          </h4>
          <ul className="space-y-3 text-sm text-gray-300">
            <li className="flex items-start gap-2">
              <Icon icon="ph:spinner" className="w-5 h-5 mt-0.5 text-green-400" />
              <div>
                <strong>Загрузка контента:</strong> Вращающийся спиннер или прогресс
              </div>
            </li>
            <li className="flex items-start gap-2">
              <Icon icon="ph:cursor-text" className="w-5 h-5 mt-0.5 text-green-400" />
              <div>
                <strong>Текстовый редактор:</strong> Мигающий курсор
              </div>
            </li>
            <li className="flex items-start gap-2">
              <Icon icon="ph:bell-ringing" className="w-5 h-5 mt-0.5 text-green-400" />
              <div>
                <strong>CTA кнопка:</strong> Пульсация для привлечения внимания
              </div>
            </li>
          </ul>
        </div>
      </div>
    );
  };

  return (
    <div className="prose prose-invert max-w-none">
      <h2 className="mb-8 text-3xl font-bold text-purple-400">
        Искусство Повторения — Магия и Проклятие Цикличной Анимации
      </h2>

      {/* Вступление */}
      <div className="p-6 mb-8 bg-yellow-900/20 rounded-lg border border-yellow-800/50">
        <p className="text-lg text-yellow-300 mb-4">
          <Icon icon="ph:arrows-clockwise" className="inline w-6 h-6 mr-2" />
          У линейной анимации все просто: есть начало, середина и конец. Но что, если движение должно 
          <strong className="text-yellow-400"> продолжаться вечно</strong>?
        </p>
        <p className="text-gray-300 mb-0">
          Хорошо сделанный цикл создает ощущение жизни. Плохо сделанный — источник сильнейшего раздражения.
        </p>
      </div>

      {/* Главная идея */}
      <div className="p-6 mb-12 bg-purple-900/20 rounded-lg border border-purple-700/50">
        <h3 className="text-2xl font-semibold text-purple-400 mb-4">
          Цикличная анимация — это форма невербального диалога
        </h3>
        <p className="text-lg text-gray-200">
          Как в любом диалоге, здесь важны не только слова, но и <strong className="text-purple-400">интонация</strong>, 
          <strong className="text-purple-400"> паузы</strong> и умение 
          <strong className="text-purple-400"> вовремя замолчать</strong>.
        </p>
      </div>

      {/* Два типа циклов */}
      <div className="space-y-8 mb-12">
        <BreathingDemo />
        <PulseDemo />
      </div>

      {/* Анти-паттерны */}
      <div className="mb-12">
        <AntipatternsDemo />
      </div>

      {/* Чек-лист */}
      <div className="mb-12">
        <DecisionChecklist />
      </div>

      {/* Примеры правильного использования */}
      <div className="mb-12">
        <h3 className="text-2xl font-semibold text-purple-300 mb-6">
          Где использовать правильно
        </h3>
        <GoodExamples />
      </div>

      {/* Финальный вердикт */}
      <div className="mt-12 p-8 bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-lg border border-purple-700/50">
        <h3 className="text-2xl font-bold text-purple-300 mb-6">
          Ваша новая ментальная модель
        </h3>
        
        <div className="p-4 bg-purple-800/20 rounded-lg mb-6">
          <p className="text-lg text-purple-200 font-medium mb-0">
            Перед тем как зациклить анимацию, задайте себе один ключевой вопрос:<br/>
            <strong className="text-purple-400">"Что я хочу сказать этим повторением?"</strong>
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-start gap-3 p-3 bg-blue-900/20 rounded-lg">
            <Icon icon="ph:cloud" className="w-6 h-6 text-blue-400 mt-0.5" />
            <div>
              <span className="font-medium text-blue-400">Создать атмосферу?</span>
              <p className="text-gray-300 text-sm mt-1">
                "Дыхание" — медленно, плавно, незаметно
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3 p-3 bg-purple-900/20 rounded-lg">
            <Icon icon="ph:timer" className="w-6 h-6 text-purple-400 mt-0.5" />
            <div>
              <span className="font-medium text-purple-400">Показать процесс?</span>
              <p className="text-gray-300 text-sm mt-1">
                "Пульс" — четко, ритмично, заметно
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3 p-3 bg-green-900/20 rounded-lg">
            <Icon icon="ph:x-circle" className="w-6 h-6 text-green-400 mt-0.5" />
            <div>
              <span className="font-medium text-green-400">Ни то, ни другое?</span>
              <p className="text-gray-300 text-sm mt-1">
                Не зацикливайте. Умение остановиться — это тоже искусство.
              </p>
            </div>
          </div>

          <p className="text-lg text-gray-200 italic text-center mt-8">
            Если ваша анимация не передает состояние<br/>
            <strong className="text-purple-400">(либо "атмосфера", либо "процесс")</strong>,<br/>
            она не должна быть цикличной.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoopingAnimation;