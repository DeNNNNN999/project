import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { Icon } from '@iconify/react';

const TrueAnticipation: React.FC = () => {
  const [selectedLevel, setSelectedLevel] = useState<'physical' | 'psychological'>('physical');
  const [showComparison, setShowComparison] = useState(false);
  const [activeDemo, setActiveDemo] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  // Демо: Два уровня ожидания
  const TwoLevelsDemo = () => {
    const [triggerAnimation, setTriggerAnimation] = useState(false);

    const restartAnimation = () => {
      setTriggerAnimation(false);
      setTimeout(() => setTriggerAnimation(true), 100);
    };

    return (
      <div className="bg-slate-800 rounded-lg p-6 mb-8">
        <h3 className="text-xl font-semibold text-purple-400 mb-4 flex items-center gap-2">
          <Icon icon="ph:stack" className="w-5 h-5" />
          Два Уровня "Ожидания"
        </h3>

        <div className="mb-6 flex gap-4">
          <button
            onClick={() => setSelectedLevel('physical')}
            className={`px-4 py-2 rounded-lg transition-all ${
              selectedLevel === 'physical'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            Физическое ожидание
          </button>
          <button
            onClick={() => setSelectedLevel('psychological')}
            className={`px-4 py-2 rounded-lg transition-all ${
              selectedLevel === 'psychological'
                ? 'bg-purple-600 text-white'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            Психологическое ожидание
          </button>
        </div>

        <AnimatePresence mode="wait">
          {selectedLevel === 'physical' ? (
            <motion.div
              key="physical"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              <div className="bg-blue-900/20 rounded-lg p-4 border border-blue-500/30">
                <h4 className="font-semibold text-blue-400 mb-2 flex items-center gap-2">
                  <Icon icon="ph:person-simple-run" className="w-5 h-5" />
                  Язык Персонажей и Объектов
                </h4>
                <p className="text-sm text-slate-300 mb-4">
                  Классическое понимание: движение в обратную сторону перед основным действием.
                  Накопление энергии и телеграфирование намерений.
                </p>
                
                <div className="bg-slate-900 rounded-lg p-8 flex items-center justify-center">
                  <motion.div
                    className="relative"
                    animate={triggerAnimation ? {
                      x: [0, -30, 0, 150],
                      scaleX: [1, 1.2, 0.8, 1]
                    } : {}}
                    transition={{
                      duration: 1.5,
                      times: [0, 0.2, 0.3, 1],
                      ease: [0.68, -0.55, 0.265, 1.55]
                    }}
                  >
                    <div className="w-20 h-20 bg-blue-500 rounded-lg flex items-center justify-center">
                      <Icon icon="ph:person-simple" className="w-10 h-10 text-white" />
                    </div>
                    <motion.div
                      className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-xs text-blue-300"
                      initial={{ opacity: 0 }}
                      animate={triggerAnimation ? {
                        opacity: [0, 1, 1, 0],
                      } : { opacity: 0 }}
                      transition={{
                        duration: 1.5,
                        times: [0, 0.1, 0.25, 0.4]
                      }}
                    >
                      Замах назад
                    </motion.div>
                  </motion.div>
                </div>

                <button
                  onClick={restartAnimation}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 w-full"
                >
                  <Icon icon="ph:play" className="inline w-4 h-4 mr-1" />
                  Показать физическое ожидание
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-green-900/20 rounded-lg p-3 border border-green-500/20">
                  <h5 className="font-medium text-green-400 mb-1 flex items-center gap-1">
                    <Icon icon="ph:check" className="w-4 h-4" />
                    Где уместно
                  </h5>
                  <ul className="text-sm text-slate-300 space-y-1">
                    <li>• Персонажная анимация</li>
                    <li>• Нарративные ролики</li>
                    <li>• Объекты с массой</li>
                  </ul>
                </div>
                <div className="bg-red-900/20 rounded-lg p-3 border border-red-500/20">
                  <h5 className="font-medium text-red-400 mb-1 flex items-center gap-1">
                    <Icon icon="ph:x" className="w-4 h-4" />
                    Где ошибка
                  </h5>
                  <ul className="text-sm text-slate-300 space-y-1">
                    <li>• UI элементы</li>
                    <li>• Модальные окна</li>
                    <li>• Абстрактные контейнеры</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="psychological"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              <div className="bg-purple-900/20 rounded-lg p-4 border border-purple-500/30">
                <h4 className="font-semibold text-purple-400 mb-2 flex items-center gap-2">
                  <Icon icon="ph:cursor-click" className="w-5 h-5" />
                  Язык Интерфейсов
                </h4>
                <p className="text-sm text-slate-300 mb-4">
                  Современное понимание: сигнализирование о намерении через изменение состояния.
                  Подготовка пользователя без добавления задержек.
                </p>
                
                <div className="bg-slate-900 rounded-lg p-8">
                  <div className="space-y-4">
                    {/* Hover состояние */}
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-slate-400 w-20">Hover:</span>
                      <motion.button
                        className="px-6 py-3 bg-purple-600 text-white rounded-lg relative overflow-hidden"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        whileHover={{ 
                          scale: 1.05,
                          backgroundColor: '#7c3aed'
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        <span className="relative z-10">Наведи на меня</span>
                        <motion.div
                          className="absolute inset-0 bg-white/10"
                          initial={{ scale: 0, opacity: 0 }}
                          animate={isHovered ? { scale: 2, opacity: 1 } : { scale: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        />
                      </motion.button>
                    </div>

                    {/* Focus состояние */}
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-slate-400 w-20">Focus:</span>
                      <motion.input
                        type="text"
                        placeholder="Кликни или используй Tab"
                        className="px-4 py-2 bg-slate-700 rounded-lg outline-none transition-all"
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        animate={isFocused ? {
                          boxShadow: '0 0 0 3px rgba(168, 85, 247, 0.5)'
                        } : {
                          boxShadow: '0 0 0 0px rgba(168, 85, 247, 0)'
                        }}
                      />
                    </div>

                    {/* Press состояние */}
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-slate-400 w-20">Press:</span>
                      <motion.button
                        className="px-6 py-3 bg-purple-600 text-white rounded-lg"
                        onMouseDown={() => setIsPressed(true)}
                        onMouseUp={() => setIsPressed(false)}
                        onMouseLeave={() => setIsPressed(false)}
                        animate={isPressed ? { scale: 0.95 } : { scale: 1 }}
                        transition={{ duration: 0.1 }}
                      >
                        Нажми и удерживай
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded-lg p-4 border border-purple-500/20">
                <p className="text-sm text-purple-300">
                  <Icon icon="ph:lightbulb" className="inline w-4 h-4 mr-1" />
                  <strong>Ключевое отличие:</strong> Психологическое ожидание экономит время 
                  и когнитивные усилия пользователя, давая подсказки заранее и делая 
                  интерфейс предсказуемым.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  // Демо: Конфликт движения против информации
  const ConflictDemo = () => {
    const [showWrong, setShowWrong] = useState(false);
    const [showRight, setShowRight] = useState(false);
    const [panelOpenWrong, setPanelOpenWrong] = useState(false);
    const [panelOpenRight, setPanelOpenRight] = useState(false);

    return (
      <div className="bg-slate-800 rounded-lg p-6 mb-8">
        <h3 className="text-xl font-semibold text-red-400 mb-4 flex items-center gap-2">
          <Icon icon="ph:warning-circle" className="w-5 h-5" />
          Конфликт: Движение против Информации
        </h3>

        <p className="text-sm text-slate-300 mb-6">
          Попытка использовать физическое ожидание в UI приводит к прямому конфликту 
          и путает пользователя.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Неправильная реализация */}
          <div className="bg-red-900/20 rounded-lg p-4 border border-red-500/30">
            <h4 className="font-medium text-red-400 mb-3 flex items-center gap-2">
              <Icon icon="ph:x-circle" className="w-5 h-5" />
              Реализация с ошибкой
            </h4>
            
            <div className="bg-slate-900 rounded-lg p-6 h-48 relative overflow-hidden">
              <button
                onClick={() => {
                  setShowWrong(true);
                  setPanelOpenWrong(!panelOpenWrong);
                  setTimeout(() => setShowWrong(false), 1500);
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                <Icon icon="ph:list" className="inline w-4 h-4 mr-1" />
                Открыть панель
              </button>

              <AnimatePresence>
                {panelOpenWrong && (
                  <motion.div
                    className="absolute right-0 top-0 bottom-0 w-48 bg-red-800 p-4"
                    initial={{ x: 300 }}
                    animate={{ x: showWrong ? [300, 320, 0] : 0 }}
                    exit={{ x: 300 }}
                    transition={{ 
                      duration: 0.5,
                      times: showWrong ? [0, 0.3, 1] : [0, 1]
                    }}
                  >
                    <h5 className="font-medium mb-2">Панель</h5>
                    <p className="text-sm text-red-200">
                      Заметили движение назад?
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {showWrong && (
                <motion.div
                  className="absolute bottom-2 left-2 right-2 bg-red-900/50 rounded p-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                >
                  <p className="text-xs text-red-300">
                    <Icon icon="ph:warning" className="inline w-3 h-3 mr-1" />
                    Мозг получает ложный сигнал "закрытия"!
                  </p>
                </motion.div>
              )}
            </div>
          </div>

          {/* Правильная реализация */}
          <div className="bg-green-900/20 rounded-lg p-4 border border-green-500/30">
            <h4 className="font-medium text-green-400 mb-3 flex items-center gap-2">
              <Icon icon="ph:check-circle" className="w-5 h-5" />
              Правильная реализация
            </h4>
            
            <div className="bg-slate-900 rounded-lg p-6 h-48 relative overflow-hidden">
              <motion.button
                onClick={() => {
                  setShowRight(true);
                  setPanelOpenRight(!panelOpenRight);
                  setTimeout(() => setShowRight(false), 1500);
                }}
                className="px-4 py-2 bg-green-600 text-white rounded-lg"
                whileHover={{ scale: 1.05, backgroundColor: '#16a34a' }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.1 }}
              >
                <Icon icon="ph:list" className="inline w-4 h-4 mr-1" />
                Открыть панель
              </motion.button>

              <AnimatePresence>
                {panelOpenRight && (
                  <motion.div
                    className="absolute right-0 top-0 bottom-0 w-48 bg-green-800 p-4"
                    initial={{ x: 200, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 200, opacity: 0 }}
                    transition={{ 
                      duration: 0.3,
                      ease: "easeOut"
                    }}
                  >
                    <h5 className="font-medium mb-2">Панель</h5>
                    <p className="text-sm text-green-200">
                      Прямое, понятное движение
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {showRight && (
                <motion.div
                  className="absolute bottom-2 left-2 right-2 bg-green-900/50 rounded p-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                >
                  <p className="text-xs text-green-300">
                    <Icon icon="ph:check" className="inline w-3 h-3 mr-1" />
                    Ожидание через hover-состояние кнопки
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Демо: Примеры психологического ожидания
  const PsychologicalExamplesDemo = () => {
    const [selectedExample, setSelectedExample] = useState<string | null>(null);

    const examples = [
      {
        id: 'hover',
        title: 'Состояние Hover',
        icon: 'ph:cursor',
        description: 'Кнопка сигнализирует о готовности к действию',
        demo: () => (
          <div className="flex justify-center">
            <motion.button
              className="px-8 py-4 bg-blue-600 text-white rounded-lg font-medium"
              whileHover={{ 
                scale: 1.05,
                backgroundColor: '#2563eb',
                boxShadow: '0 10px 25px rgba(37, 99, 235, 0.3)'
              }}
              transition={{ duration: 0.2 }}
            >
              Купить сейчас
            </motion.button>
          </div>
        )
      },
      {
        id: 'focus',
        title: 'Состояние Focus',
        icon: 'ph:text-aa',
        description: 'Поле показывает готовность принимать ввод',
        demo: () => (
          <div className="space-y-3">
            <motion.input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 bg-slate-700 rounded-lg outline-none"
              whileFocus={{
                boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.5)',
                borderColor: '#3b82f6'
              }}
            />
            <motion.input
              type="password"
              placeholder="Пароль"
              className="w-full px-4 py-3 bg-slate-700 rounded-lg outline-none"
              whileFocus={{
                boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.5)',
                borderColor: '#3b82f6'
              }}
            />
          </div>
        )
      },
      {
        id: 'loading',
        title: 'Подготовка к загрузке',
        icon: 'ph:spinner',
        description: 'Система показывает, что обрабатывает запрос',
        demo: () => {
          const [isLoading, setIsLoading] = useState(false);
          
          return (
            <div className="text-center">
              <motion.button
                onClick={() => {
                  setIsLoading(true);
                  setTimeout(() => setIsLoading(false), 2000);
                }}
                className="px-6 py-3 bg-purple-600 text-white rounded-lg relative overflow-hidden"
                whileTap={{ scale: 0.95 }}
                disabled={isLoading}
              >
                <AnimatePresence mode="wait">
                  {isLoading ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2"
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <Icon icon="ph:spinner" className="w-5 h-5" />
                      </motion.div>
                      Загрузка...
                    </motion.div>
                  ) : (
                    <motion.span
                      key="text"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      Отправить
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          );
        }
      },
      {
        id: 'micro',
        title: 'Микро-взаимодействия',
        icon: 'ph:hand-tap',
        description: 'Тончайшие намеки на интерактивность',
        demo: () => (
          <div className="grid grid-cols-3 gap-4">
            <motion.div
              className="p-4 bg-slate-700 rounded-lg text-center cursor-pointer"
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <Icon icon="ph:house" className="w-8 h-8 mx-auto mb-2" />
              <span className="text-sm">Главная</span>
            </motion.div>
            <motion.div
              className="p-4 bg-slate-700 rounded-lg text-center cursor-pointer"
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <Icon icon="ph:compass" className="w-8 h-8 mx-auto mb-2" />
              <span className="text-sm">Обзор</span>
            </motion.div>
            <motion.div
              className="p-4 bg-slate-700 rounded-lg text-center cursor-pointer"
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <Icon icon="ph:user" className="w-8 h-8 mx-auto mb-2" />
              <span className="text-sm">Профиль</span>
            </motion.div>
          </div>
        )
      }
    ];

    return (
      <div className="bg-slate-800 rounded-lg p-6 mb-8">
        <h3 className="text-xl font-semibold text-green-400 mb-4 flex items-center gap-2">
          <Icon icon="ph:sparkle" className="w-5 h-5" />
          Примеры Психологического Ожидания в UI
        </h3>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {examples.map((example) => (
            <motion.button
              key={example.id}
              onClick={() => setSelectedExample(
                selectedExample === example.id ? null : example.id
              )}
              className={`p-4 rounded-lg border text-left transition-all ${
                selectedExample === example.id
                  ? 'bg-green-900/20 border-green-500/50'
                  : 'bg-slate-700/30 border-slate-600 hover:border-green-500/30'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-start gap-3">
                <Icon icon={example.icon} className="w-6 h-6 text-green-400 mt-0.5" />
                <div>
                  <h4 className="font-medium mb-1">{example.title}</h4>
                  <p className="text-sm text-slate-400">{example.description}</p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {selectedExample && (
            <motion.div
              key={selectedExample}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-slate-900 rounded-lg p-6"
            >
              {examples.find(e => e.id === selectedExample)?.demo()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  // Демо: Сравнение применения
  const ApplicationComparisonDemo = () => {
    const [showAnimation, setShowAnimation] = useState(false);

    const triggerAnimations = () => {
      setShowAnimation(true);
      setTimeout(() => setShowAnimation(false), 3000);
    };

    return (
      <div className="bg-slate-800 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-orange-400 mb-4 flex items-center gap-2">
          <Icon icon="ph:scales" className="w-5 h-5" />
          Применение в Разных Контекстах
        </h3>

        <button
          onClick={triggerAnimations}
          className="mb-6 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
        >
          <Icon icon="ph:play" className="inline w-4 h-4 mr-1" />
          Показать сравнение
        </button>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Персонаж/Объект */}
          <div className="bg-orange-900/20 rounded-lg p-4 border border-orange-500/30">
            <h4 className="font-medium text-orange-400 mb-3 flex items-center gap-2">
              <Icon icon="ph:person-simple-run" className="w-5 h-5" />
              Персонаж/Объект с массой
            </h4>
            
            <div className="bg-slate-900 rounded-lg p-6 h-40 flex items-center justify-center">
              <motion.div
                className="w-16 h-16 bg-orange-500 rounded-full relative"
                animate={showAnimation ? {
                  x: [0, -20, 0, 100, 0],
                  scaleX: [1, 1.3, 0.7, 1, 1]
                } : {}}
                transition={{
                  duration: 3,
                  times: [0, 0.2, 0.4, 0.7, 1],
                  ease: "easeInOut"
                }}
              >
                <motion.div
                  className="absolute inset-2 bg-orange-300 rounded-full"
                  animate={showAnimation ? {
                    scaleX: [1, 0.8, 1.2, 1, 1]
                  } : {}}
                  transition={{
                    duration: 3,
                    times: [0, 0.2, 0.4, 0.7, 1]
                  }}
                />
              </motion.div>
            </div>
            
            <div className="mt-3 text-sm text-orange-300">
              <Icon icon="ph:check" className="inline w-4 h-4 mr-1" />
              Используйте физическое ожидание для правдоподобности
            </div>
          </div>

          {/* UI Элемент */}
          <div className="bg-blue-900/20 rounded-lg p-4 border border-blue-500/30">
            <h4 className="font-medium text-blue-400 mb-3 flex items-center gap-2">
              <Icon icon="ph:app-window" className="w-5 h-5" />
              UI Элемент/Интерфейс
            </h4>
            
            <div className="bg-slate-900 rounded-lg p-6 h-40 flex items-center justify-center">
              <motion.button
                className="px-6 py-3 bg-blue-600 text-white rounded-lg"
                animate={showAnimation ? {
                  scale: [1, 1, 1.05, 0.95, 1, 1],
                  backgroundColor: ['#2563eb', '#2563eb', '#3b82f6', '#2563eb', '#1d4ed8', '#2563eb']
                } : {}}
                transition={{
                  duration: 3,
                  times: [0, 0.3, 0.4, 0.5, 0.6, 1]
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <AnimatePresence mode="wait">
                  {showAnimation ? (
                    <motion.span
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      Обработка...
                    </motion.span>
                  ) : (
                    <motion.span
                      key="default"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      Нажми меня
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
            
            <div className="mt-3 text-sm text-blue-300">
              <Icon icon="ph:check" className="inline w-4 h-4 mr-1" />
              Используйте психологическое ожидание для ясности
            </div>
          </div>
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
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-400 via-blue-400 to-green-400 bg-clip-text text-transparent">
          Сила Намерения — Истинный Смысл "Ожидания" (Anticipation)
        </h1>

        <div className="bg-slate-800/50 rounded-lg p-6 mb-8 border border-slate-700">
          <p className="text-lg leading-relaxed mb-4">
            Окей, команда. Давайте вернемся к одному из самых известных, но и самых 
            неправильно понятых принципов — "Ожидание" или "Подготовка" (Anticipation).
          </p>
          <p className="text-lg leading-relaxed mb-4">
            В большинстве уроков для начинающих его объясняют очень просто: "Это движение 
            в обратную сторону перед основным действием. Персонаж замахивается перед ударом. 
            Мячик приседает перед прыжком". И многие на этом останавливаются. Они усваивают 
            формулу: "хочешь сделать движение — сначала сделай движение назад".
          </p>
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
              Anticipation — это физическое действие. Это просто "замах".
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
              Anticipation — это психологическое явление. Его работа — создать предвкушение 
              и дать сигнал о намерении: "Внимание, сейчас что-то произойдет!"
            </p>
          </motion.div>
        </div>

        <TwoLevelsDemo />
        <ConflictDemo />
        <PsychologicalExamplesDemo />
        <ApplicationComparisonDemo />

        <div className="mt-8 bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-lg p-8 border border-blue-500/30">
          <h2 className="text-2xl font-semibold mb-6 text-blue-400">
            Вердикт: Ваша Новая Ментальная Модель
          </h2>
          
          <div className="bg-slate-800/50 rounded-lg p-6 mb-6">
            <p className="text-lg font-semibold text-purple-300 mb-4">
              Перестаньте думать об "ожидании" как о движении назад. 
              Начните думать о нем как о сигнале о будущем.
            </p>
            
            <div className="space-y-4">
              <div className="p-4 bg-blue-900/20 rounded-lg border border-blue-500/20">
                <h4 className="font-medium text-blue-400 mb-2 flex items-center gap-2">
                  <Icon icon="ph:person-simple-run" className="w-5 h-5" />
                  Если вы анимируете персонажа или объект с массой:
                </h4>
                <p className="text-sm text-slate-300">
                  Используйте Физическое Ожидание, чтобы сделать движение правдоподобным 
                  и выразительным.
                </p>
              </div>

              <div className="p-4 bg-purple-900/20 rounded-lg border border-purple-500/20">
                <h4 className="font-medium text-purple-400 mb-2 flex items-center gap-2">
                  <Icon icon="ph:devices" className="w-5 h-5" />
                  Если вы проектируете интерфейс:
                </h4>
                <p className="text-sm text-slate-300">
                  Используйте Психологическое Ожидание. Ваш главный инструмент — это 
                  изменение состояния элемента при наведении, фокусе или нажатии 
                  (hover, focus, active/press).
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
              Истинный смысл "ожидания" в UI — это не про замах перед прыжком. 
              Это про свет, который загорается над дверью лифта за секунду до того, 
              как она начнет открываться. Это тонкий намек, который делает весь 
              опыт более комфортным и понятным.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default TrueAnticipation;