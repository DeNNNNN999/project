import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';

const SpeedOfPerception: React.FC = () => {
  const [currentGear, setCurrentGear] = useState<1 | 2 | 3>(2);
  const [showDemo, setShowDemo] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Визуализация коробки передач
  const GearBox = () => {
    return (
      <div className="relative h-64 mb-8">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            {/* Фон коробки передач */}
            <div className="w-64 h-48 bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg shadow-2xl border border-slate-700 p-4">
              <h4 className="text-center text-purple-400 font-semibold mb-4">Когнитивная коробка передач</h4>
              
              {/* Передачи */}
              <div className="grid grid-cols-3 gap-4">
                {[1, 2, 3].map((gear) => (
                  <motion.button
                    key={gear}
                    onClick={() => setCurrentGear(gear as 1 | 2 | 3)}
                    className={`relative p-4 rounded-lg border-2 transition-all ${
                      currentGear === gear
                        ? 'bg-purple-600/20 border-purple-500 shadow-purple-500/50 shadow-lg'
                        : 'bg-slate-800/50 border-slate-600 hover:border-slate-500'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="text-2xl font-bold text-white">{gear}</div>
                    <div className="text-xs mt-1">
                      {gear === 1 && <span className="text-green-400">100-200ms</span>}
                      {gear === 2 && <span className="text-purple-400">250-400ms</span>}
                      {gear === 3 && <span className="text-pink-400">&gt;500ms</span>}
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Индикатор текущей передачи */}
              <motion.div
                className="absolute -bottom-8 left-0 right-0 text-center"
                key={currentGear}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <span className="text-sm text-gray-400">Текущая передача: </span>
                <span className={`font-bold ${
                  currentGear === 1 ? 'text-green-400' :
                  currentGear === 2 ? 'text-purple-400' :
                  'text-pink-400'
                }`}>
                  {currentGear === 1 && 'Реактивная'}
                  {currentGear === 2 && 'Переходная'}
                  {currentGear === 3 && 'Повествовательная'}
                </span>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Демо реактивной скорости
  const ReactiveSpeedDemo = () => {
    const [buttonStates, setButtonStates] = useState<Record<string, boolean>>({});
    
    const handleButtonClick = (id: string, duration: number) => {
      setButtonStates(prev => ({ ...prev, [id]: true }));
      setTimeout(() => {
        setButtonStates(prev => ({ ...prev, [id]: false }));
      }, duration);
    };

    return (
      <div className="p-6 bg-green-900/20 rounded-lg border border-green-800/50">
        <h4 className="text-green-400 font-semibold mb-4 flex items-center gap-2">
          <Icon icon="ph:lightning-fill" className="w-5 h-5" />
          Передача 1: Реактивная скорость (100-200мс)
        </h4>
        
        <p className="text-gray-300 mb-6">
          Тактильный отклик — это не видится, а <strong className="text-green-400">чувствуется</strong>
        </p>

        <div className="grid md:grid-cols-3 gap-4 mb-6">
          {/* 50ms - слишком быстро */}
          <div className="space-y-3">
            <button
              onClick={() => handleButtonClick('50ms', 50)}
              className="w-full px-6 py-3 bg-slate-700 rounded-lg text-white font-medium relative overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-white/20"
                initial={false}
                animate={buttonStates['50ms'] ? { scale: [1, 1.5], opacity: [1, 0] } : {}}
                transition={{ duration: 0.05 }}
              />
              <span className="relative z-10">50ms</span>
            </button>
            <p className="text-xs text-gray-400 text-center">
              ⚠️ Слишком быстро — не ощущается
            </p>
          </div>

          {/* 150ms - оптимально */}
          <div className="space-y-3">
            <button
              onClick={() => handleButtonClick('150ms', 150)}
              className="w-full px-6 py-3 bg-green-600 rounded-lg text-white font-medium relative overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-white/20"
                initial={false}
                animate={buttonStates['150ms'] ? { scale: [1, 1.5], opacity: [1, 0] } : {}}
                transition={{ duration: 0.15 }}
              />
              <span className="relative z-10">150ms ✓</span>
            </button>
            <p className="text-xs text-green-400 text-center">
              ✅ Идеально — мгновенный отклик
            </p>
          </div>

          {/* 300ms - слишком медленно */}
          <div className="space-y-3">
            <button
              onClick={() => handleButtonClick('300ms', 300)}
              className="w-full px-6 py-3 bg-slate-700 rounded-lg text-white font-medium relative overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-white/20"
                initial={false}
                animate={buttonStates['300ms'] ? { scale: [1, 1.5], opacity: [1, 0] } : {}}
                transition={{ duration: 0.3 }}
              />
              <span className="relative z-10">300ms</span>
            </button>
            <p className="text-xs text-gray-400 text-center">
              ⚠️ Слишком медленно — ощущается лаг
            </p>
          </div>
        </div>

        <div className="p-4 bg-green-800/20 rounded text-sm">
          <p className="text-green-300 mb-2">
            <Icon icon="ph:brain" className="inline w-4 h-4 mr-1" />
            <strong>Когнитивная задача:</strong> "Я нажал — оно отреагировало"
          </p>
          <p className="text-gray-400">
            Задержка до 100мс воспринимается как мгновенная. Больше 200мс — уже лаг.
          </p>
        </div>
      </div>
    );
  };

  // Демо переходной скорости
  const TransitionalSpeedDemo = () => {
    const [activeSpeed, setActiveSpeed] = useState<'fast' | 'optimal' | 'slow'>('optimal');
    const [isOpen, setIsOpen] = useState(false);

    const getDuration = () => {
      switch(activeSpeed) {
        case 'fast': return 0.15;
        case 'optimal': return 0.3;
        case 'slow': return 0.6;
      }
    };

    return (
      <div className="p-6 bg-purple-900/20 rounded-lg border border-purple-700/50">
        <h4 className="text-purple-400 font-semibold mb-4 flex items-center gap-2">
          <Icon icon="ph:swap-fill" className="w-5 h-5" />
          Передача 2: Переходная скорость (250-400мс)
        </h4>
        
        <p className="text-gray-300 mb-6">
          Смена контекста — нужно время чтобы <strong className="text-purple-400">понять траекторию</strong>
        </p>

        {/* Контролы скорости */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveSpeed('fast')}
            className={`px-4 py-2 rounded transition-all ${
              activeSpeed === 'fast' 
                ? 'bg-red-600 text-white' 
                : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
            }`}
          >
            150ms (быстро)
          </button>
          <button
            onClick={() => setActiveSpeed('optimal')}
            className={`px-4 py-2 rounded transition-all ${
              activeSpeed === 'optimal' 
                ? 'bg-purple-600 text-white' 
                : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
            }`}
          >
            300ms (оптимально)
          </button>
          <button
            onClick={() => setActiveSpeed('slow')}
            className={`px-4 py-2 rounded transition-all ${
              activeSpeed === 'slow' 
                ? 'bg-red-600 text-white' 
                : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
            }`}
          >
            600ms (медленно)
          </button>
        </div>

        {/* Демо область */}
        <div className="relative h-64 bg-slate-900 rounded-lg overflow-hidden mb-4">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="absolute top-4 left-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 z-10"
          >
            {isOpen ? 'Закрыть' : 'Открыть'} панель
          </button>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ 
                  duration: getDuration(),
                  ease: "easeInOut"
                }}
                className="absolute right-0 top-0 bottom-0 w-64 bg-purple-800/50 backdrop-blur p-6"
              >
                <h3 className="text-white font-semibold mb-4">Боковая панель</h3>
                <div className="space-y-3">
                  <div className="h-4 bg-purple-700/50 rounded" />
                  <div className="h-4 bg-purple-700/50 rounded w-3/4" />
                  <div className="h-4 bg-purple-700/50 rounded w-1/2" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Индикатор траектории */}
          <AnimatePresence>
            {isOpen && activeSpeed === 'optimal' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute bottom-4 left-4 right-4"
              >
                <div className="flex items-center gap-2 text-purple-300 text-sm">
                  <Icon icon="ph:arrow-right" className="w-4 h-4" />
                  <span>Мозг успевает отследить траекторию</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Обратная связь */}
        <div className="p-4 bg-purple-800/20 rounded text-sm">
          {activeSpeed === 'fast' && (
            <p className="text-red-400">
              <Icon icon="ph:warning" className="inline w-4 h-4 mr-1" />
              <strong>Слишком быстро:</strong> Резкий скачок, теряется ориентация
            </p>
          )}
          {activeSpeed === 'optimal' && (
            <p className="text-purple-300">
              <Icon icon="ph:check-circle" className="inline w-4 h-4 mr-1" />
              <strong>Оптимально:</strong> Мозг понимает откуда пришел элемент
            </p>
          )}
          {activeSpeed === 'slow' && (
            <p className="text-red-400">
              <Icon icon="ph:timer" className="inline w-4 h-4 mr-1" />
              <strong>Слишком медленно:</strong> Превращается в ожидание
            </p>
          )}
        </div>
      </div>
    );
  };

  // Демо повествовательной скорости
  const NarrativeSpeedDemo = () => {
    const [showCelebration, setShowCelebration] = useState(false);
    const [showOnboarding, setShowOnboarding] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);

    const triggerCelebration = () => {
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 2000);
    };

    const startOnboarding = () => {
      setShowOnboarding(true);
      setCurrentStep(0);
      const interval = setInterval(() => {
        setCurrentStep(prev => {
          if (prev >= 2) {
            clearInterval(interval);
            setTimeout(() => {
              setShowOnboarding(false);
            }, 1000);
            return prev;
          }
          return prev + 1;
        });
      }, 800);
    };

    return (
      <div className="p-6 bg-pink-900/20 rounded-lg border border-pink-700/50">
        <h4 className="text-pink-400 font-semibold mb-4 flex items-center gap-2">
          <Icon icon="ph:film-strip-fill" className="w-5 h-5" />
          Передача 3: Повествовательная скорость (&gt;500мс)
        </h4>
        
        <p className="text-gray-300 mb-6">
          История и настроение — пользователь готов <strong className="text-pink-400">наблюдать</strong>
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Celebration анимация */}
          <div className="relative h-48 bg-slate-900 rounded-lg overflow-hidden">
            <button
              onClick={triggerCelebration}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg font-medium hover:shadow-lg transition-shadow"
            >
              Завершить задачу
            </button>

            <AnimatePresence>
              {showCelebration && (
                <>
                  {/* Конфетти */}
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-3 h-3 rounded-full"
                      style={{
                        left: '50%',
                        top: '50%',
                        backgroundColor: ['#ec4899', '#8b5cf6', '#3b82f6', '#10b981'][i % 4]
                      }}
                      initial={{ 
                        x: 0, 
                        y: 0,
                        opacity: 0,
                        scale: 0
                      }}
                      animate={{ 
                        x: (Math.random() - 0.5) * 200,
                        y: (Math.random() - 0.5) * 200,
                        opacity: [0, 1, 0],
                        scale: [0, 1.5, 0],
                        rotate: Math.random() * 720
                      }}
                      transition={{ 
                        duration: 1.5,
                        delay: i * 0.1,
                        ease: "easeOut"
                      }}
                    />
                  ))}
                  
                  {/* Текст поздравления */}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="text-center">
                      <Icon icon="ph:trophy-fill" className="w-16 h-16 text-yellow-400 mx-auto mb-2" />
                      <h3 className="text-white text-xl font-bold">Отлично!</h3>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Onboarding анимация */}
          <div className="relative h-48 bg-slate-900 rounded-lg overflow-hidden">
            <button
              onClick={startOnboarding}
              className="absolute top-4 right-4 px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
            >
              Показать обучение
            </button>

            <AnimatePresence>
              {showOnboarding && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {/* Шаги онбординга */}
                  <AnimatePresence mode="wait">
                    {currentStep === 0 && (
                      <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.5 }}
                        className="text-center"
                      >
                        <Icon icon="ph:hand-waving" className="w-12 h-12 text-blue-400 mx-auto mb-2" />
                        <p className="text-white">Добро пожаловать!</p>
                      </motion.div>
                    )}
                    {currentStep === 1 && (
                      <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.5 }}
                        className="text-center"
                      >
                        <Icon icon="ph:cursor-click" className="w-12 h-12 text-blue-400 mx-auto mb-2" />
                        <p className="text-white">Нажимайте кнопки</p>
                      </motion.div>
                    )}
                    {currentStep === 2 && (
                      <motion.div
                        key="step3"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.5 }}
                        className="text-center"
                      >
                        <Icon icon="ph:rocket" className="w-12 h-12 text-blue-400 mx-auto mb-2" />
                        <p className="text-white">Готово к работе!</p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Индикатор прогресса */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {[0, 1, 2].map((step) => (
                      <div
                        key={step}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          step <= currentStep ? 'bg-blue-400' : 'bg-slate-600'
                        }`}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-6 p-4 bg-pink-800/20 rounded text-sm">
          <p className="text-pink-300">
            <Icon icon="ph:popcorn" className="inline w-4 h-4 mr-1" />
            <strong>Режим "наблюдаю":</strong> Пользователь понимает, что ему показывают "мультфильм"
          </p>
        </div>
      </div>
    );
  };

  // Интерактивная демонстрация магических чисел
  const MagicNumbersDemo = () => {
    const [customDuration, setCustomDuration] = useState(300);
    const [isAnimating, setIsAnimating] = useState(false);

    const triggerAnimation = () => {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), customDuration);
    };

    return (
      <div className="p-6 bg-slate-800/50 rounded-lg border border-slate-700 mb-8">
        <h4 className="text-purple-400 font-semibold mb-4">
          Экспериментируйте со скоростью
        </h4>
        
        <div className="flex items-center gap-4 mb-6">
          <input
            type="range"
            min="50"
            max="1000"
            value={customDuration}
            onChange={(e) => setCustomDuration(Number(e.target.value))}
            className="flex-1"
            style={{
              background: `linear-gradient(to right, #8b5cf6 0%, #8b5cf6 ${(customDuration - 50) / 9.5}%, #475569 ${(customDuration - 50) / 9.5}%, #475569 100%)`
            }}
          />
          <span className="text-white font-mono w-20 text-right">{customDuration}ms</span>
        </div>

        <div className="relative h-32 bg-slate-900 rounded-lg overflow-hidden mb-4">
          <motion.div
            className="absolute top-1/2 left-4 -translate-y-1/2 w-16 h-16 bg-purple-500 rounded-lg"
            animate={isAnimating ? { x: 'calc(100% - 5rem)' } : { x: 0 }}
            transition={{ duration: customDuration / 1000, ease: "easeInOut" }}
          />
        </div>

        <button
          onClick={triggerAnimation}
          className="w-full px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
        >
          Запустить анимацию
        </button>

        <div className="mt-4 text-sm text-gray-400">
          {customDuration < 200 && (
            <p className="text-green-400">⚡ Реактивная скорость — тактильный отклик</p>
          )}
          {customDuration >= 200 && customDuration <= 400 && (
            <p className="text-purple-400">🔄 Переходная скорость — смена контекста</p>
          )}
          {customDuration > 400 && (
            <p className="text-pink-400">🎬 Повествовательная скорость — история</p>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          background: #8b5cf6;
          cursor: pointer;
          border-radius: 50%;
          border: 2px solid #1f2937;
        }
        input[type="range"]::-moz-range-thumb {
          width: 20px;
          height: 20px;
          background: #8b5cf6;
          cursor: pointer;
          border-radius: 50%;
          border: 2px solid #1f2937;
          border: none;
        }
        input[type="range"] {
          -webkit-appearance: none;
          appearance: none;
          height: 8px;
          border-radius: 4px;
          outline: none;
        }
      ` }} />
      <div className="prose prose-invert max-w-none">
      <h2 className="mb-8 text-3xl font-bold text-purple-400">
        Скорость Восприятия — Почему 300мс не всегда правильный ответ
      </h2>

      {/* Вступление */}
      <div className="p-6 mb-8 bg-orange-900/20 rounded-lg border border-orange-800/50">
        <p className="text-lg text-orange-300 mb-4">
          <Icon icon="ph:warning" className="inline w-6 h-6 mr-2" />
          <strong>Опасность магических чисел:</strong> "100мс для отклика, 300мс для перехода, не больше 500мс..."
        </p>
        <p className="text-gray-300 mb-0">
          Эти цифры превращаются в догму. Мы используем их, не понимая <strong className="text-orange-400">почему</strong>.
        </p>
      </div>

      {/* Главная идея */}
      <div className="p-6 mb-12 bg-purple-900/20 rounded-lg border border-purple-700/50">
        <h3 className="text-2xl font-semibold text-purple-400 mb-4">
          Новая идея: Скорость — это инструмент управления когнитивной нагрузкой
        </h3>
        <p className="text-lg text-gray-200">
          Правильная скорость — это не конкретное число, а то количество времени, которое нужно мозгу, 
          чтобы <strong className="text-purple-400">с комфортом обработать изменение</strong>, 
          не почувствовав ни задержки, ни спешки.
        </p>
      </div>

      {/* Коробка передач */}
      <div className="mb-12">
        <h3 className="text-2xl font-semibold text-purple-300 mb-6 text-center">
          Три скоростных режима
        </h3>
        <GearBox />
      </div>

      {/* Демонстрация магических чисел */}
      <MagicNumbersDemo />

      {/* Демонстрации передач */}
      <div className="space-y-8 mb-12">
        <ReactiveSpeedDemo />
        <TransitionalSpeedDemo />
        <NarrativeSpeedDemo />
      </div>

      {/* Сравнительная таблица */}
      <div className="mb-12">
        <h3 className="text-2xl font-semibold text-purple-300 mb-6">
          Когнитивный бюджет для разных задач
        </h3>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left p-4 text-purple-400">Передача</th>
                <th className="text-left p-4 text-purple-400">Скорость</th>
                <th className="text-left p-4 text-purple-400">Когнитивная задача</th>
                <th className="text-left p-4 text-purple-400">Примеры</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-700/50">
                <td className="p-4">
                  <span className="text-green-400 font-semibold">1. Реактивная</span>
                </td>
                <td className="p-4 font-mono text-sm">100-200ms</td>
                <td className="p-4 text-gray-300">
                  Мгновенный тактильный отклик.<br/>
                  <span className="text-sm text-gray-400 italic">"Я нажал — оно отреагировало"</span>
                </td>
                <td className="p-4 text-sm text-gray-400">
                  • Нажатие кнопки<br/>
                  • Переключение тумблера<br/>
                  • Hover эффекты
                </td>
              </tr>
              <tr className="border-b border-slate-700/50">
                <td className="p-4">
                  <span className="text-purple-400 font-semibold">2. Переходная</span>
                </td>
                <td className="p-4 font-mono text-sm">250-400ms</td>
                <td className="p-4 text-gray-300">
                  Плавная смена контекста.<br/>
                  <span className="text-sm text-gray-400 italic">"Откуда пришло, куда ушло"</span>
                </td>
                <td className="p-4 text-sm text-gray-400">
                  • Навигация между экранами<br/>
                  • Открытие модальных окон<br/>
                  • Раскрытие панелей
                </td>
              </tr>
              <tr>
                <td className="p-4">
                  <span className="text-pink-400 font-semibold">3. Повествовательная</span>
                </td>
                <td className="p-4 font-mono text-sm">&gt;500ms</td>
                <td className="p-4 text-gray-300">
                  История и настроение.<br/>
                  <span className="text-sm text-gray-400 italic">"Смотрю представление"</span>
                </td>
                <td className="p-4 text-sm text-gray-400">
                  • Онбординг<br/>
                  • Celebration анимации<br/>
                  • Сложные лоадеры
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Практические рекомендации */}
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        <div className="p-6 bg-red-900/20 rounded-lg border border-red-800/50">
          <h4 className="text-red-400 font-semibold mb-4 flex items-center gap-2">
            <Icon icon="ph:x-circle" className="w-5 h-5" />
            Частые ошибки
          </h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="flex items-start gap-2">
              <Icon icon="ph:dot" className="w-4 h-4 mt-0.5 text-red-400" />
              <span>Использование 300мс для всего подряд</span>
            </li>
            <li className="flex items-start gap-2">
              <Icon icon="ph:dot" className="w-4 h-4 mt-0.5 text-red-400" />
              <span>Игнорирование контекста взаимодействия</span>
            </li>
            <li className="flex items-start gap-2">
              <Icon icon="ph:dot" className="w-4 h-4 mt-0.5 text-red-400" />
              <span>Слепое следование гайдлайнам</span>
            </li>
            <li className="flex items-start gap-2">
              <Icon icon="ph:dot" className="w-4 h-4 mt-0.5 text-red-400" />
              <span>"Задумчивые" кнопки с долгим откликом</span>
            </li>
          </ul>
        </div>

        <div className="p-6 bg-green-900/20 rounded-lg border border-green-800/50">
          <h4 className="text-green-400 font-semibold mb-4 flex items-center gap-2">
            <Icon icon="ph:check-circle" className="w-5 h-5" />
            Лучшие практики
          </h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="flex items-start gap-2">
              <Icon icon="ph:dot" className="w-4 h-4 mt-0.5 text-green-400" />
              <span>Анализировать когнитивную задачу</span>
            </li>
            <li className="flex items-start gap-2">
              <Icon icon="ph:dot" className="w-4 h-4 mt-0.5 text-green-400" />
              <span>Тестировать на реальных устройствах</span>
            </li>
            <li className="flex items-start gap-2">
              <Icon icon="ph:dot" className="w-4 h-4 mt-0.5 text-green-400" />
              <span>Адаптировать под контекст</span>
            </li>
            <li className="flex items-start gap-2">
              <Icon icon="ph:dot" className="w-4 h-4 mt-0.5 text-green-400" />
              <span>Приоритет восприятию над числами</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Финальный вердикт */}
      <div className="mt-12 p-8 bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-lg border border-purple-700/50">
        <h3 className="text-2xl font-bold text-purple-300 mb-6">
          Ваша новая ментальная модель
        </h3>
        
        <div className="p-4 bg-purple-800/20 rounded-lg mb-6">
          <p className="text-lg text-purple-200 font-medium mb-0">
            Перестаньте спрашивать: <del className="text-gray-500">"Какую длительность поставить?"</del><br/>
            Начните спрашивать: <strong className="text-purple-400">"Какую когнитивную задачу решает это движение?"</strong>
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-start gap-3 p-3 bg-green-900/20 rounded-lg">
            <Icon icon="ph:lightning" className="w-6 h-6 text-green-400 mt-0.5" />
            <div>
              <span className="font-medium text-green-400">Ответ на прямое действие?</span>
              <p className="text-gray-300 text-sm mt-1">
                Реактивная скорость. Цель — быть почувствованным, а не увиденным.
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3 p-3 bg-purple-900/20 rounded-lg">
            <Icon icon="ph:swap" className="w-6 h-6 text-purple-400 mt-0.5" />
            <div>
              <span className="font-medium text-purple-400">Смена контекста?</span>
              <p className="text-gray-300 text-sm mt-1">
                Переходная скорость. Цель — дать время понять, не заставляя ждать.
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3 p-3 bg-pink-900/20 rounded-lg">
            <Icon icon="ph:film-strip" className="w-6 h-6 text-pink-400 mt-0.5" />
            <div>
              <span className="font-medium text-pink-400">История или представление?</span>
              <p className="text-gray-300 text-sm mt-1">
                Повествовательная скорость. Цель — вовлечь и удержать внимание.
              </p>
            </div>
          </div>

          <p className="text-lg text-gray-200 italic text-center mt-8">
            Правильная скорость — это не цифра в гайдлайне.<br/>
            <strong className="text-purple-400">
              Это скорость, которая делает взаимодействие естественным как дыхание.
            </strong>
          </p>
        </div>
      </div>
    </div>
    </>
  );
};

export default SpeedOfPerception;