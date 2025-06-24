import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { Icon } from '@iconify/react';

const GreatBalance: React.FC = () => {
  const [selectedLayer, setSelectedLayer] = useState<'logic' | 'emotion' | 'both'>('logic');
  const [animationSpeed, setAnimationSpeed] = useState(300);
  const [emotionalIntensity, setEmotionalIntensity] = useState(50);
  const [showComparison, setShowComparison] = useState(false);
  const [activeDemo, setActiveDemo] = useState<'payment' | 'navigation' | 'notification'>('navigation');
  const controls = useAnimation();

  // Демо: Два слоя восприятия
  const TwoLayersDemo = () => {
    const [isAnimating, setIsAnimating] = useState(false);
    const [currentView, setCurrentView] = useState<'home' | 'details'>('home');

    const triggerTransition = () => {
      setIsAnimating(true);
      setCurrentView(currentView === 'home' ? 'details' : 'home');
      setTimeout(() => setIsAnimating(false), animationSpeed + 200);
    };

    // Базовые easing функции
    const easings = {
      logical: [0.4, 0.0, 0.2, 1], // Material Design standard
      emotional: {
        low: [0.25, 0.46, 0.45, 0.94], // Subtle personality
        medium: [0.68, -0.55, 0.265, 1.55], // Playful bounce
        high: [0.87, -0.41, 0.19, 1.22] // Dramatic overshoot
      }
    };

    const getEasing = () => {
      if (selectedLayer === 'logic') return easings.logical;
      if (selectedLayer === 'emotion') {
        if (emotionalIntensity < 33) return easings.emotional.low;
        if (emotionalIntensity < 66) return easings.emotional.medium;
        return easings.emotional.high;
      }
      // Both - blend based on intensity
      if (emotionalIntensity < 50) return easings.logical;
      if (emotionalIntensity < 66) return easings.emotional.low;
      return easings.emotional.medium;
    };

    return (
      <div className="bg-slate-800 rounded-lg p-6 mb-8">
        <h3 className="text-xl font-semibold text-purple-400 mb-4 flex items-center gap-2">
          <Icon icon="ph:layers" className="w-5 h-5" />
          Два Слоя Восприятия Анимации
        </h3>

        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <motion.button
            onClick={() => setSelectedLayer('logic')}
            className={`p-4 rounded-lg border transition-all ${
              selectedLayer === 'logic'
                ? 'bg-blue-900/20 border-blue-500/50'
                : 'bg-slate-700/30 border-slate-600 hover:border-blue-500/30'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Icon icon="ph:brain" className="w-8 h-8 mx-auto mb-2 text-blue-400" />
            <h4 className="font-semibold text-blue-400">Логический слой</h4>
            <p className="text-xs text-slate-400 mt-1">Функция и скорость</p>
          </motion.button>

          <motion.button
            onClick={() => setSelectedLayer('emotion')}
            className={`p-4 rounded-lg border transition-all ${
              selectedLayer === 'emotion'
                ? 'bg-pink-900/20 border-pink-500/50'
                : 'bg-slate-700/30 border-slate-600 hover:border-pink-500/30'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Icon icon="ph:heart" className="w-8 h-8 mx-auto mb-2 text-pink-400" />
            <h4 className="font-semibold text-pink-400">Эмоциональный слой</h4>
            <p className="text-xs text-slate-400 mt-1">Характер и настроение</p>
          </motion.button>

          <motion.button
            onClick={() => setSelectedLayer('both')}
            className={`p-4 rounded-lg border transition-all ${
              selectedLayer === 'both'
                ? 'bg-gradient-to-r from-blue-900/20 to-pink-900/20 border-purple-500/50'
                : 'bg-slate-700/30 border-slate-600 hover:border-purple-500/30'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Icon icon="ph:scales" className="w-8 h-8 mx-auto mb-2 text-purple-400" />
            <h4 className="font-semibold text-purple-400">Синергия</h4>
            <p className="text-xs text-slate-400 mt-1">Баланс обоих слоев</p>
          </motion.button>
        </div>

        {/* Контролы */}
        <div className="space-y-4 mb-6">
          <div>
            <label className="text-sm text-slate-400 mb-2 block">
              Скорость анимации: {animationSpeed}ms
            </label>
            <input
              type="range"
              min="100"
              max="1000"
              value={animationSpeed}
              onChange={(e) => setAnimationSpeed(Number(e.target.value))}
              className="w-full"
            />
          </div>

          {(selectedLayer === 'emotion' || selectedLayer === 'both') && (
            <div>
              <label className="text-sm text-slate-400 mb-2 block">
                Эмоциональная интенсивность: {emotionalIntensity}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={emotionalIntensity}
                onChange={(e) => setEmotionalIntensity(Number(e.target.value))}
                className="w-full"
              />
            </div>
          )}
        </div>

        {/* Демо область */}
        <div className="bg-slate-900 rounded-lg p-8 relative overflow-hidden h-64">
          <AnimatePresence mode="wait">
            {currentView === 'home' ? (
              <motion.div
                key="home"
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -300, opacity: 0 }}
                transition={{
                  duration: animationSpeed / 1000,
                  ease: getEasing()
                }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="text-center">
                  <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <Icon icon="ph:house" className="w-16 h-16 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold mb-2">Главный экран</h4>
                  <p className="text-sm text-slate-400">Нажмите для перехода</p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="details"
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -300, opacity: 0 }}
                transition={{
                  duration: animationSpeed / 1000,
                  ease: getEasing()
                }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="text-center">
                  <div className="w-32 h-32 bg-gradient-to-br from-pink-500 to-orange-500 rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <Icon icon="ph:article" className="w-16 h-16 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold mb-2">Детальный экран</h4>
                  <p className="text-sm text-slate-400">Нажмите для возврата</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            onClick={triggerTransition}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 z-10"
            disabled={isAnimating}
          >
            <Icon icon="ph:arrow-right" className="inline w-4 h-4 mr-1" />
            Переключить экран
          </button>
        </div>

        {/* Анализ текущей настройки */}
        <div className="mt-6 p-4 bg-slate-700/30 rounded-lg">
          <h4 className="font-medium mb-2 text-purple-300">Анализ текущей анимации:</h4>
          <div className="space-y-2 text-sm">
            {selectedLayer === 'logic' && (
              <>
                <p className="text-blue-300">
                  <Icon icon="ph:check" className="inline w-4 h-4 mr-1" />
                  <strong>Логический фундамент:</strong> Чистое, предсказуемое движение
                </p>
                <p className="text-slate-400">
                  • Стандартная ease-out кривая для естественного замедления
                </p>
                <p className="text-slate-400">
                  • Оптимальная скорость для восприятия направления
                </p>
              </>
            )}
            {selectedLayer === 'emotion' && (
              <>
                <p className="text-pink-300">
                  <Icon icon="ph:heart" className="inline w-4 h-4 mr-1" />
                  <strong>Эмоциональный характер:</strong> Выразительное движение
                </p>
                <p className="text-slate-400">
                  • {emotionalIntensity < 33 && "Тонкая персонализация через мягкие кривые"}
                  {emotionalIntensity >= 33 && emotionalIntensity < 66 && "Игривый характер с легким пружинистым эффектом"}
                  {emotionalIntensity >= 66 && "Драматичный overshoot для яркой индивидуальности"}
                </p>
              </>
            )}
            {selectedLayer === 'both' && (
              <>
                <p className="text-purple-300">
                  <Icon icon="ph:scales" className="inline w-4 h-4 mr-1" />
                  <strong>Синергия слоев:</strong> Функциональность + Характер
                </p>
                <p className="text-slate-400">
                  • Сохранена логическая ясность перехода
                </p>
                <p className="text-slate-400">
                  • Добавлен эмоциональный оттенок через тонкую настройку easing
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Демо: Когда баланс нарушается
  const BalanceViolationDemo = () => {
    const [showPaymentAnimation, setShowPaymentAnimation] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [notificationType, setNotificationType] = useState<'emotional' | 'logical'>('emotional');

    return (
      <div className="bg-slate-800 rounded-lg p-6 mb-8">
        <h3 className="text-xl font-semibold text-red-400 mb-4 flex items-center gap-2">
          <Icon icon="ph:warning-circle" className="w-5 h-5" />
          Когда Баланс Нарушается
        </h3>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Эмоция без логики */}
          <div className="bg-red-900/20 rounded-lg p-4 border border-red-500/30">
            <h4 className="font-medium text-red-400 mb-3 flex items-center gap-2">
              <Icon icon="ph:x-circle" className="w-5 h-5" />
              Эмоция без Логики
            </h4>
            <p className="text-sm text-slate-300 mb-4">
              Красивая анимация оплаты, которая мешает пользователю
            </p>

            <div className="bg-slate-900 rounded-lg p-6 h-48 relative overflow-hidden flex items-center justify-center">
              <button
                onClick={() => {
                  setShowPaymentAnimation(true);
                  setTimeout(() => setShowPaymentAnimation(false), 3500);
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                disabled={showPaymentAnimation}
              >
                <Icon icon="ph:credit-card" className="inline w-4 h-4 mr-1" />
                Оплатить $99
              </button>

              <AnimatePresence>
                {showPaymentAnimation && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-slate-900/95 flex items-center justify-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ 
                        scale: [0, 1.2, 1, 1.1, 1],
                        rotate: [0, 180, 360, 720]
                      }}
                      transition={{ 
                        duration: 3,
                        times: [0, 0.3, 0.5, 0.8, 1]
                      }}
                      className="relative"
                    >
                      <motion.div
                        className="w-32 h-32 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500"
                        animate={{
                          boxShadow: [
                            '0 0 0 0px rgba(251, 191, 36, 0)',
                            '0 0 0 20px rgba(251, 191, 36, 0.3)',
                            '0 0 0 40px rgba(251, 191, 36, 0)'
                          ]
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: 2,
                          ease: "easeOut"
                        }}
                      />
                      <motion.div
                        className="absolute inset-0 flex items-center justify-center"
                        animate={{ rotate: -720 }}
                        transition={{ duration: 3 }}
                      >
                        <Icon icon="ph:confetti" className="w-16 h-16 text-white" />
                      </motion.div>
                    </motion.div>
                    <motion.p
                      className="absolute bottom-8 text-lg font-semibold"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 2.5 }}
                    >
                      Поздравляем с покупкой! 🎉
                    </motion.p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="mt-3 text-sm text-red-300">
              <Icon icon="ph:clock" className="inline w-4 h-4 mr-1" />
              3+ секунды ожидания = фрустрация пользователя
            </div>
          </div>

          {/* Логика без эмоции */}
          <div className="bg-orange-900/20 rounded-lg p-4 border border-orange-500/30">
            <h4 className="font-medium text-orange-400 mb-3 flex items-center gap-2">
              <Icon icon="ph:robot" className="w-5 h-5" />
              Логика без Эмоции
            </h4>
            <p className="text-sm text-slate-300 mb-4">
              Мгновенные переходы без характера
            </p>

            <div className="bg-slate-900 rounded-lg p-6 h-48 relative overflow-hidden">
              <div className="space-y-3">
                <button
                  onClick={() => {
                    setNotificationType('logical');
                    setShowNotification(true);
                    setTimeout(() => setShowNotification(false), 2000);
                  }}
                  className="w-full px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 text-left"
                >
                  <Icon icon="ph:bell" className="inline w-4 h-4 mr-1" />
                  Показать уведомление
                </button>

                <AnimatePresence>
                  {showNotification && notificationType === 'logical' && (
                    <div className="bg-gray-700 rounded p-3">
                      <p className="text-sm">Операция выполнена успешно.</p>
                    </div>
                  )}
                </AnimatePresence>

                <div className="text-xs text-slate-500">
                  <p>• Без анимации появления</p>
                  <p>• Без плавности</p>
                  <p>• Без индивидуальности</p>
                </div>
              </div>
            </div>

            <div className="mt-3 text-sm text-orange-300">
              <Icon icon="ph:emoji-sad" className="inline w-4 h-4 mr-1" />
              Функционально, но безжизненно
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Демо: Примеры правильного баланса
  const BalancedExamplesDemo = () => {
    const [selectedExample, setSelectedExample] = useState<string>('button');
    const [isLoading, setIsLoading] = useState(false);
    const [cardFlipped, setCardFlipped] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const examples = {
      button: {
        title: 'Кнопка действия',
        description: 'Логика: мгновенный отклик. Эмоция: тактильное ощущение.',
        demo: () => (
          <div className="flex justify-center">
            <motion.button
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium relative overflow-hidden"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setIsLoading(true);
                setTimeout(() => setIsLoading(false), 1500);
              }}
            >
              <motion.span
                className="relative z-10"
                animate={isLoading ? { opacity: 0.5 } : { opacity: 1 }}
              >
                {isLoading ? 'Обработка...' : 'Отправить заявку'}
              </motion.span>
              
              {/* Ripple эффект при клике */}
              <motion.div
                className="absolute inset-0 bg-white/20"
                initial={{ scale: 0, opacity: 0 }}
                animate={isLoading ? { scale: 2, opacity: [0, 0.3, 0] } : {}}
                transition={{ duration: 0.6 }}
              />
              
              {/* Shimmer эффект при загрузке */}
              {isLoading && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                  animate={{ x: [-200, 200] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              )}
            </motion.button>
          </div>
        )
      },
      card: {
        title: 'Карточка товара',
        description: 'Логика: показать больше информации. Эмоция: элегантное раскрытие.',
        demo: () => (
          <div className="flex justify-center">
            <motion.div
              className="w-64 bg-slate-700 rounded-lg overflow-hidden cursor-pointer"
              onClick={() => setCardFlipped(!cardFlipped)}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              style={{ perspective: 1000 }}
            >
              <motion.div
                className="relative h-80"
                animate={{ rotateY: cardFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, ease: [0.4, 0.0, 0.2, 1] }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Лицевая сторона */}
                <div className="absolute inset-0 backface-hidden p-6 flex flex-col">
                  <div className="w-full h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg mb-4" />
                  <h4 className="text-lg font-semibold mb-2">Premium Package</h4>
                  <p className="text-sm text-slate-400 mb-4">Нажмите для деталей</p>
                  <div className="mt-auto">
                    <p className="text-2xl font-bold">$99</p>
                  </div>
                </div>
                
                {/* Обратная сторона */}
                <div 
                  className="absolute inset-0 backface-hidden p-6 flex flex-col"
                  style={{ transform: 'rotateY(180deg)' }}
                >
                  <h4 className="text-lg font-semibold mb-4">Что включено:</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <Icon icon="ph:check-circle" className="w-4 h-4 text-green-400" />
                      <span>Полный доступ</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Icon icon="ph:check-circle" className="w-4 h-4 text-green-400" />
                      <span>Приоритетная поддержка</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Icon icon="ph:check-circle" className="w-4 h-4 text-green-400" />
                      <span>Обновления</span>
                    </li>
                  </ul>
                  <button className="mt-auto px-4 py-2 bg-purple-600 text-white rounded-lg">
                    Купить сейчас
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </div>
        )
      },
      menu: {
        title: 'Навигационное меню',
        description: 'Логика: иерархия и доступ. Эмоция: плавное развертывание.',
        demo: () => (
          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="px-4 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 flex items-center gap-2"
            >
              <Icon icon="ph:list" className="w-5 h-5" />
              Меню
              <motion.div
                animate={{ rotate: menuOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <Icon icon="ph:caret-down" className="w-4 h-4" />
              </motion.div>
            </button>
            
            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2, ease: [0.4, 0.0, 0.2, 1] }}
                  className="absolute top-full left-0 mt-2 w-48 bg-slate-700 rounded-lg shadow-xl overflow-hidden"
                >
                  {['Главная', 'Продукты', 'О нас', 'Контакты'].map((item, index) => (
                    <motion.a
                      key={item}
                      href="#"
                      className="block px-4 py-3 hover:bg-slate-600 transition-colors"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ 
                        delay: index * 0.05,
                        duration: 0.3,
                        ease: [0.4, 0.0, 0.2, 1]
                      }}
                    >
                      {item}
                    </motion.a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      }
    };

    return (
      <div className="bg-slate-800 rounded-lg p-6 mb-8">
        <h3 className="text-xl font-semibold text-green-400 mb-4 flex items-center gap-2">
          <Icon icon="ph:check-circle" className="w-5 h-5" />
          Примеры Правильного Баланса
        </h3>

        <div className="grid md:grid-cols-3 gap-4 mb-6">
          {Object.entries(examples).map(([key, example]) => (
            <motion.button
              key={key}
              onClick={() => setSelectedExample(key)}
              className={`p-4 rounded-lg border text-left transition-all ${
                selectedExample === key
                  ? 'bg-green-900/20 border-green-500/50'
                  : 'bg-slate-700/30 border-slate-600 hover:border-green-500/30'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <h4 className="font-medium mb-1">{example.title}</h4>
              <p className="text-xs text-slate-400">{example.description}</p>
            </motion.button>
          ))}
        </div>

        <div className="bg-slate-900 rounded-lg p-8 min-h-[300px] flex items-center justify-center">
          {examples[selectedExample as keyof typeof examples]?.demo()}
        </div>

        <div className="mt-4 p-4 bg-green-900/20 rounded-lg border border-green-500/20">
          <p className="text-sm text-green-300">
            <Icon icon="ph:scales" className="inline w-4 h-4 mr-1" />
            <strong>Баланс достигнут:</strong> Каждая анимация решает функциональную задачу
            (логический слой) и при этом создает уникальное ощущение (эмоциональный слой).
          </p>
        </div>
      </div>
    );
  };

  // Демо: Двухэтапный процесс
  const TwoStepProcessDemo = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [showResult, setShowResult] = useState(false);

    const steps = [
      {
        title: 'Шаг 1: Логический фундамент',
        icon: 'ph:foundation',
        color: 'blue',
        questions: [
          'Откуда и куда движется элемент?',
          'Какова оптимальная скорость?',
          'Правильная ли последовательность?',
          'Понятна ли пространственная логика?'
        ]
      },
      {
        title: 'Шаг 2: Эмоциональный характер',
        icon: 'ph:paint-brush',
        color: 'pink',
        questions: [
          'Какой характер у бренда?',
          'Какое ощущение нужно создать?',
          'Какая easing-функция подходит?',
          'Нужны ли дополнительные эффекты?'
        ]
      }
    ];

    return (
      <div className="bg-slate-800 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-purple-400 mb-4 flex items-center gap-2">
          <Icon icon="ph:steps" className="w-5 h-5" />
          Двухэтапный Процесс Создания Анимации
        </h3>

        <div className="space-y-6">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className={`p-6 rounded-lg border transition-all ${
                currentStep === index
                  ? `bg-${step.color}-900/20 border-${step.color}-500/50`
                  : 'bg-slate-700/30 border-slate-600'
              }`}
              animate={currentStep === index ? { scale: 1.02 } : { scale: 1 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-full bg-${step.color}-600 flex items-center justify-center`}>
                  <Icon icon={step.icon} className="w-6 h-6 text-white" />
                </div>
                <h4 className={`text-lg font-semibold text-${step.color}-400`}>
                  {step.title}
                </h4>
              </div>

              <div className="grid md:grid-cols-2 gap-3">
                {step.questions.map((question, qIndex) => (
                  <motion.div
                    key={qIndex}
                    className="flex items-center gap-2 text-sm text-slate-300"
                    initial={{ opacity: 0, x: -10 }}
                    animate={currentStep === index ? { opacity: 1, x: 0 } : { opacity: 0.5, x: 0 }}
                    transition={{ delay: qIndex * 0.1 }}
                  >
                    <Icon 
                      icon={currentStep > index ? "ph:check-circle-fill" : "ph:circle"} 
                      className={`w-4 h-4 ${currentStep > index ? 'text-green-400' : 'text-slate-500'}`} 
                    />
                    <span>{question}</span>
                  </motion.div>
                ))}
              </div>

              {currentStep === index && (
                <motion.button
                  onClick={() => {
                    if (index < steps.length - 1) {
                      setCurrentStep(index + 1);
                    } else {
                      setShowResult(true);
                    }
                  }}
                  className={`mt-4 px-4 py-2 bg-${step.color}-600 text-white rounded-lg hover:bg-${step.color}-700`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  {index < steps.length - 1 ? 'Далее' : 'Завершить'}
                </motion.button>
              )}
            </motion.div>
          ))}

          <AnimatePresence>
            {showResult && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="p-6 bg-gradient-to-r from-blue-900/20 to-pink-900/20 rounded-lg border border-purple-500/50"
              >
                <h4 className="text-lg font-semibold text-purple-400 mb-3 flex items-center gap-2">
                  <Icon icon="ph:sparkle" className="w-5 h-5" />
                  Результат: Великий Баланс
                </h4>
                <p className="text-slate-300">
                  Анимация, которая одновременно функциональна и выразительна.
                  Движение настолько логично, что его не замечаешь, но настолько 
                  пропитано характером, что его чувствуешь.
                </p>
                <button
                  onClick={() => {
                    setCurrentStep(0);
                    setShowResult(false);
                  }}
                  className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                  <Icon icon="ph:arrow-counter-clockwise" className="inline w-4 h-4 mr-1" />
                  Начать заново
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  };

  return (
    <div className="prose prose-invert max-w-none">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          Великий Баланс — Эмоциональный vs. Логический Моушн-дизайн
        </h1>

        <div className="bg-slate-800/50 rounded-lg p-6 mb-8 border border-slate-700">
          <p className="text-lg leading-relaxed mb-4">
            Окей, команда. Вот мы и у цели. Весь наш курс, по сути, был посвящен поиску 
            баланса между двумя великими силами, двумя целями, которые постоянно перетягивают 
            канат в нашей работе.
          </p>
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="p-4 bg-blue-900/20 rounded-lg border border-blue-500/30">
              <h3 className="text-xl font-semibold text-blue-400 mb-2 flex items-center gap-2">
                <Icon icon="ph:brain" className="w-5 h-5" />
                Логика
              </h3>
              <p className="text-slate-300">
                Движение, которое информирует, проясняет, направляет. Его цель — сделать 
                интерфейс понятным, быстрым и эффективным. Это язык разума.
              </p>
            </div>
            <div className="p-4 bg-pink-900/20 rounded-lg border border-pink-500/30">
              <h3 className="text-xl font-semibold text-pink-400 mb-2 flex items-center gap-2">
                <Icon icon="ph:heart" className="w-5 h-5" />
                Эмоция
              </h3>
              <p className="text-slate-300">
                Движение, которое радует, удивляет, создает настроение, выражает характер 
                бренда. Его цель — сделать интерфейс приятным, запоминающимся и человечным. 
                Это язык сердца.
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <motion.div
            className="bg-red-900/10 rounded-lg p-6 border border-red-500/30"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-xl font-semibold text-red-400 mb-3 flex items-center gap-2">
              <Icon icon="ph:x-circle" className="w-5 h-5" />
              Исходное заблуждение
            </h3>
            <p className="text-slate-300">
              Эти две силы — противоположности. Они взаимоисключающи. Чтобы сделать 
              анимацию более эмоциональной, нужно пожертвовать ее логикой и скоростью. 
              Чтобы сделать ее логичной, нужно отказаться от эмоций и "души".
            </p>
          </motion.div>

          <motion.div
            className="bg-green-900/10 rounded-lg p-6 border border-green-500/30"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-xl font-semibold text-green-400 mb-3 flex items-center gap-2">
              <Icon icon="ph:check-circle" className="w-5 h-5" />
              Новая идея
            </h3>
            <p className="text-slate-300">
              Логика и Эмоция — это не враги. Это два разных слоя одного и того же движения. 
              Великий моушн-дизайн не выбирает между ними. Он удовлетворяет обе потребности 
              одновременно, просто делает это на разных уровнях восприятия.
            </p>
          </motion.div>
        </div>

        <TwoLayersDemo />
        <BalanceViolationDemo />
        <BalancedExamplesDemo />
        <TwoStepProcessDemo />

        <div className="mt-8 bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded-lg p-8 border border-purple-500/30">
          <h2 className="text-2xl font-semibold mb-6 text-purple-400">
            Вердикт: Ваша Новаторская Ментальная Модель
          </h2>
          
          <div className="bg-slate-800/50 rounded-lg p-6 mb-6">
            <p className="text-lg font-semibold text-purple-300 mb-4">
              Перестаньте думать о выборе "ИЛИ/ИЛИ". Начните думать в парадигме "И/И".
            </p>
            
            <div className="space-y-4">
              <div className="p-4 bg-blue-900/20 rounded-lg border border-blue-500/20">
                <h4 className="font-medium text-blue-400 mb-2 flex items-center gap-2">
                  <Icon icon="ph:number-one" className="w-5 h-5" />
                  Сначала постройте безупречный ЛОГИЧЕСКИЙ фундамент
                </h4>
                <p className="text-sm text-slate-300">
                  Обеспечьте правильное направление, скорость и хореографию. Сделайте так, 
                  чтобы анимация была быстрой, понятной и не мешала пользователю. 
                  Задайте себе вопрос: "Решает ли это движение утилитарную задачу?".
                </p>
              </div>

              <div className="p-4 bg-pink-900/20 rounded-lg border border-pink-500/20">
                <h4 className="font-medium text-pink-400 mb-2 flex items-center gap-2">
                  <Icon icon="ph:number-two" className="w-5 h-5" />
                  Затем нанесите слой ЭМОЦИОНАЛЬНОГО характера
                </h4>
                <p className="text-sm text-slate-300">
                  С помощью кривых, легких дополнительных эффектов и стилизации придайте 
                  движению индивидуальность, которая соответствует вашему бренду. 
                  Задайте себе вопрос: "Какое ощущение создает это движение?".
                </p>
              </div>
            </div>
          </div>

          <motion.div
            className="bg-gradient-to-r from-yellow-900/20 to-orange-900/20 rounded-lg p-6 border border-yellow-500/30"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1 }}
          >
            <p className="text-lg text-yellow-300 font-medium">
              Великий моушн-дизайн — это не компромисс между логикой и эмоцией. 
              Это их синергия. Это когда движение настолько логично, что вы его не замечаете, 
              но настолько пропитано характером, что вы его чувствуете. 
              Это и есть вершина нашего мастерства.
            </p>
          </motion.div>

          <div className="mt-6 text-center">
            <p className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              Поздравляю! Вы прошли весь курс Web Motion Design 🎉
            </p>
            <p className="text-slate-400 mt-2">
              Теперь у вас есть все инструменты для создания анимаций, 
              которые работают на двух уровнях одновременно.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default GreatBalance;