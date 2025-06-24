import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useAnimation, Variants } from 'framer-motion';
import { Icon } from '@iconify/react';

const KineticTypography: React.FC = () => {
  const [selectedLevel, setSelectedLevel] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [readabilityScore, setReadabilityScore] = useState(100);
  const [expressivityScore, setExpressivityScore] = useState(0);
  const [balanceMode, setBalanceMode] = useState<'info' | 'emotion'>('info');

  // Демо: Шкала выразительности
  const ExpressivityScaleDemo = () => {
    const levels = [
      {
        level: 1,
        name: 'Нулевое движение',
        description: 'Абсолютная читаемость',
        readability: 100,
        expressivity: 0,
        icon: 'ph:text-aa',
        color: 'blue'
      },
      {
        level: 2,
        name: 'Микро-движение',
        description: 'Утилитарная анимация',
        readability: 90,
        expressivity: 20,
        icon: 'ph:arrow-right',
        color: 'green'
      },
      {
        level: 3,
        name: 'Умеренное движение',
        description: 'Акцентирование',
        readability: 70,
        expressivity: 60,
        icon: 'ph:waves',
        color: 'yellow'
      },
      {
        level: 4,
        name: 'Выразительное движение',
        description: 'Текст как образ',
        readability: 30,
        expressivity: 90,
        icon: 'ph:sparkle',
        color: 'red'
      }
    ];

    return (
      <div className="bg-slate-800 rounded-lg p-6 mb-8">
        <h3 className="text-xl font-semibold text-purple-400 mb-4 flex items-center gap-2">
          <Icon icon="ph:gauge" className="w-5 h-5" />
          Шкала Выразительности
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {levels.map((level) => (
            <motion.button
              key={level.level}
              onClick={() => {
                setSelectedLevel(level.level);
                setReadabilityScore(level.readability);
                setExpressivityScore(level.expressivity);
              }}
              className={`p-4 rounded-lg border transition-all ${
                selectedLevel === level.level
                  ? `bg-${level.color}-900/30 border-${level.color}-500/50`
                  : 'bg-slate-700 border-slate-600 hover:border-slate-500'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Icon icon={level.icon} className={`w-8 h-8 mx-auto mb-2 text-${level.color}-400`} />
              <h4 className="font-semibold mb-1">Уровень {level.level}</h4>
              <p className="text-sm text-slate-400 mb-2">{level.name}</p>
              <p className="text-xs text-slate-500">{level.description}</p>
              
              <div className="mt-3 space-y-1">
                <div className="flex justify-between text-xs">
                  <span>Читаемость</span>
                  <span>{level.readability}%</span>
                </div>
                <div className="w-full bg-slate-600 rounded-full h-1 overflow-hidden">
                  <div 
                    className="h-full bg-blue-500"
                    style={{ width: `${level.readability}%` }}
                  />
                </div>
                
                <div className="flex justify-between text-xs">
                  <span>Выразительность</span>
                  <span>{level.expressivity}%</span>
                </div>
                <div className="w-full bg-slate-600 rounded-full h-1 overflow-hidden">
                  <div 
                    className="h-full bg-red-500"
                    style={{ width: `${level.expressivity}%` }}
                  />
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        <div className="bg-slate-700/50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Текущий баланс</span>
            <span className="text-sm text-slate-400">Уровень {selectedLevel}</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Icon icon="ph:book-open" className="w-4 h-4 text-blue-400" />
                <span className="text-sm">Читаемость: {readabilityScore}%</span>
              </div>
              <div className="w-full bg-slate-600 rounded-full h-2 overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-blue-500 to-blue-400"
                  initial={{ width: 0 }}
                  animate={{ width: `${readabilityScore}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Icon icon="ph:sparkle" className="w-4 h-4 text-red-400" />
                <span className="text-sm">Выразительность: {expressivityScore}%</span>
              </div>
              <div className="w-full bg-slate-600 rounded-full h-2 overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-red-500 to-red-400"
                  initial={{ width: 0 }}
                  animate={{ width: `${expressivityScore}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Демо уровней анимации текста
  const TextAnimationLevels = () => {
    const [currentDemo, setCurrentDemo] = useState(1);
    const controls = useAnimation();

    // Уровень 1: Статичный текст
    const Level1Demo = () => (
      <div className="p-8 bg-slate-900 rounded-lg">
        <p className="text-lg leading-relaxed">
          Это обычный статичный текст. Он не движется, не привлекает лишнего внимания, 
          и позволяет читателю полностью сосредоточиться на содержании. Идеально подходит 
          для длинных текстов, документации и любого контента, где важна максимальная читаемость.
        </p>
      </div>
    );

    // Уровень 2: Микро-движение
    const Level2Demo = () => {
      const [triggerAnimation, setTriggerAnimation] = useState(false);

      return (
        <div className="p-8 bg-slate-900 rounded-lg">
          <motion.h2
            className="text-2xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Важное уведомление
          </motion.h2>
          <motion.p
            className="text-lg"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Текст плавно появляется, но после появления остается статичным.
          </motion.p>
          
          <motion.button
            className="mt-4 px-4 py-2 bg-blue-600 rounded-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setTriggerAnimation(!triggerAnimation)}
          >
            Попробовать снова
          </motion.button>
        </div>
      );
    };

    // Уровень 3: Умеренное движение
    const Level3Demo = () => {
      const words = ["Быстро", "Просто", "Надежно"];
      const [key, setKey] = useState(0);

      const wordVariants: Variants = {
        hidden: { opacity: 0, y: 20, scale: 0.8 },
        visible: (i: number) => ({
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            delay: i * 0.3,
            duration: 0.5,
            ease: "easeOut"
          }
        })
      };

      return (
        <div className="p-8 bg-slate-900 rounded-lg">
          <div className="flex items-center justify-center gap-4 text-3xl font-bold">
            <AnimatePresence mode="wait">
              {words.map((word, i) => (
                <motion.span
                  key={`${word}-${key}`}
                  custom={i}
                  variants={wordVariants}
                  initial="hidden"
                  animate="visible"
                  className={`
                    ${i === 0 ? 'text-blue-400' : ''}
                    ${i === 1 ? 'text-green-400' : ''}
                    ${i === 2 ? 'text-purple-400' : ''}
                  `}
                >
                  {word}
                  {i < words.length - 1 && <span className="text-slate-500 mx-2">.</span>}
                </motion.span>
              ))}
            </AnimatePresence>
          </div>
          
          <motion.button
            className="mt-6 px-4 py-2 bg-purple-600 rounded-lg mx-auto block"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setKey(key + 1)}
          >
            Повторить анимацию
          </motion.button>
        </div>
      );
    };

    // Уровень 4: Выразительное движение
    const Level4Demo = () => {
      const text = "ДВИЖЕНИЕ";
      const [animationKey, setAnimationKey] = useState(0);

      const letterVariants: Variants = {
        initial: { 
          opacity: 0,
          scale: 0,
          rotate: -180,
          y: 50
        },
        animate: (i: number) => ({
          opacity: 1,
          scale: [0, 1.2, 1],
          rotate: [0, 10, -10, 0],
          y: [50, -20, 0],
          transition: {
            delay: i * 0.1,
            duration: 0.8,
            ease: [0.68, -0.55, 0.265, 1.55]
          }
        }),
        hover: {
          scale: 1.2,
          rotate: [0, -5, 5, 0],
          transition: {
            duration: 0.3,
            repeat: Infinity,
            repeatType: "reverse"
          }
        }
      };

      return (
        <div className="p-8 bg-slate-900 rounded-lg">
          <div className="flex items-center justify-center mb-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={animationKey}
                className="flex gap-1 text-5xl font-black"
              >
                {text.split('').map((letter, i) => (
                  <motion.span
                    key={i}
                    custom={i}
                    variants={letterVariants}
                    initial="initial"
                    animate="animate"
                    whileHover="hover"
                    className="inline-block cursor-pointer bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent"
                  >
                    {letter}
                  </motion.span>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
          
          <motion.p
            className="text-center text-sm text-slate-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            Текст становится визуальным перформансом
          </motion.p>
          
          <motion.button
            className="mt-4 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg mx-auto block"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setAnimationKey(animationKey + 1)}
          >
            Запустить снова
          </motion.button>
        </div>
      );
    };

    const demos = [
      { component: Level1Demo, title: 'Статичный текст' },
      { component: Level2Demo, title: 'Микро-движение' },
      { component: Level3Demo, title: 'Умеренное движение' },
      { component: Level4Demo, title: 'Выразительное движение' }
    ];

    const CurrentDemo = demos[selectedLevel - 1].component;

    return (
      <div className="bg-slate-800 rounded-lg p-6 mb-8">
        <h3 className="text-xl font-semibold text-blue-400 mb-4 flex items-center gap-2">
          <Icon icon="ph:play-circle" className="w-5 h-5" />
          Демонстрация уровня {selectedLevel}: {demos[selectedLevel - 1].title}
        </h3>
        
        <CurrentDemo />
      </div>
    );
  };

  // Демо: Правила безопасности
  const SafetyRulesDemo = () => {
    const [activeRule, setActiveRule] = useState<number | null>(null);

    const rules = [
      {
        id: 1,
        title: 'Чем длиннее текст, тем меньше движения',
        icon: 'ph:text-align-left',
        good: 'Короткий заголовок с анимацией',
        bad: 'Анимированный параграф из 5 предложений',
        demo: () => {
          const [showBad, setShowBad] = useState(false);
          
          return (
            <div className="space-y-4">
              <div className="p-4 bg-green-900/20 rounded-lg border border-green-500/30">
                <motion.h3 
                  className="text-lg font-semibold text-green-400"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  Правильно: Короткий заголовок
                </motion.h3>
              </div>
              
              <div className="p-4 bg-red-900/20 rounded-lg border border-red-500/30">
                <button
                  onClick={() => setShowBad(!showBad)}
                  className="text-sm text-red-400 underline mb-2"
                >
                  {showBad ? 'Остановить кошмар' : 'Показать плохой пример'}
                </button>
                {showBad && (
                  <motion.p className="text-sm">
                    {`Это очень длинный текст, который не должен анимироваться по буквам, потому что это делает его совершенно нечитаемым и раздражающим для пользователя.`.split('').map((char, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                      >
                        {char}
                      </motion.span>
                    ))}
                  </motion.p>
                )}
              </div>
            </div>
          );
        }
      },
      {
        id: 2,
        title: 'Сохраняйте базовую линию',
        icon: 'ph:arrows-horizontal',
        good: 'Буквы на одной линии',
        bad: 'Прыгающие буквы',
        demo: () => {
          const [showBad, setShowBad] = useState(false);
          
          return (
            <div className="space-y-4">
              <div className="p-4 bg-green-900/20 rounded-lg border border-green-500/30">
                <div className="text-2xl font-bold text-green-400">
                  {'BASELINE'.split('').map((char, i) => (
                    <motion.span
                      key={i}
                      className="inline-block"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </div>
              </div>
              
              <div className="p-4 bg-red-900/20 rounded-lg border border-red-500/30">
                <button
                  onClick={() => setShowBad(!showBad)}
                  className="text-sm text-red-400 underline mb-2"
                >
                  {showBad ? 'Остановить' : 'Показать плохой пример'}
                </button>
                {showBad && (
                  <div className="text-2xl font-bold text-red-400">
                    {'JUMPING'.split('').map((char, i) => (
                      <motion.span
                        key={i}
                        className="inline-block"
                        animate={{ 
                          y: [0, -20, 0],
                        }}
                        transition={{ 
                          delay: i * 0.1,
                          duration: 0.5,
                          repeat: Infinity,
                          repeatType: "reverse"
                        }}
                      >
                        {char}
                      </motion.span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        }
      },
      {
        id: 3,
        title: 'Избегайте деформации букв',
        icon: 'ph:text-strikethrough',
        good: 'Четкие, узнаваемые буквы',
        bad: 'Искаженные буквы',
        demo: () => {
          const [showBad, setShowBad] = useState(false);
          
          return (
            <div className="space-y-4">
              <div className="p-4 bg-green-900/20 rounded-lg border border-green-500/30">
                <motion.div 
                  className="text-2xl font-bold text-green-400"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  ЧИТАЕМО
                </motion.div>
              </div>
              
              <div className="p-4 bg-red-900/20 rounded-lg border border-red-500/30">
                <button
                  onClick={() => setShowBad(!showBad)}
                  className="text-sm text-red-400 underline mb-2"
                >
                  {showBad ? 'Вернуть нормальный вид' : 'Показать искажение'}
                </button>
                <motion.div 
                  className="text-2xl font-bold text-red-400"
                  animate={{ 
                    skewX: showBad ? [0, 30, -30, 0] : 0,
                    scaleY: showBad ? [1, 1.5, 0.5, 1] : 1
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: showBad ? Infinity : 0
                  }}
                >
                  НЕЧИТАЕМО
                </motion.div>
              </div>
            </div>
          );
        }
      },
      {
        id: 4,
        title: 'Дайте время на чтение',
        icon: 'ph:clock',
        good: 'Достаточно времени для чтения',
        bad: 'Текст исчезает слишком быстро',
        demo: () => {
          const [showBad, setShowBad] = useState(false);
          
          return (
            <div className="space-y-4">
              <div className="p-4 bg-green-900/20 rounded-lg border border-green-500/30">
                <AnimatePresence>
                  <motion.p
                    className="text-green-400"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    Этот текст остается на экране достаточно долго
                  </motion.p>
                </AnimatePresence>
              </div>
              
              <div className="p-4 bg-red-900/20 rounded-lg border border-red-500/30">
                <button
                  onClick={() => setShowBad(!showBad)}
                  className="text-sm text-red-400 underline mb-2"
                >
                  Показать плохой пример
                </button>
                <AnimatePresence>
                  {showBad && (
                    <motion.p
                      className="text-red-400"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      onAnimationComplete={() => {
                        setTimeout(() => setShowBad(false), 500);
                      }}
                    >
                      Этот текст исчезает слишком быст...
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>
          );
        }
      }
    ];

    return (
      <div className="bg-slate-800 rounded-lg p-6 mb-8">
        <h3 className="text-xl font-semibold text-orange-400 mb-4 flex items-center gap-2">
          <Icon icon="ph:shield-check" className="w-5 h-5" />
          Правила Безопасности
        </h3>

        <div className="grid gap-4">
          {rules.map((rule) => (
            <motion.div
              key={rule.id}
              className={`border rounded-lg p-4 transition-all cursor-pointer ${
                activeRule === rule.id
                  ? 'bg-slate-700/50 border-orange-500/50'
                  : 'bg-slate-700/30 border-slate-600 hover:border-slate-500'
              }`}
              onClick={() => setActiveRule(activeRule === rule.id ? null : rule.id)}
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium flex items-center gap-2">
                  <Icon icon={rule.icon} className="w-5 h-5 text-orange-400" />
                  {rule.title}
                </h4>
                <Icon 
                  icon={activeRule === rule.id ? "ph:caret-up" : "ph:caret-down"} 
                  className="w-5 h-5 text-slate-400" 
                />
              </div>
              
              <div className="flex gap-4 text-sm text-slate-400 mb-2">
                <span className="flex items-center gap-1">
                  <Icon icon="ph:check-circle" className="w-4 h-4 text-green-400" />
                  {rule.good}
                </span>
                <span className="flex items-center gap-1">
                  <Icon icon="ph:x-circle" className="w-4 h-4 text-red-400" />
                  {rule.bad}
                </span>
              </div>

              <AnimatePresence>
                {activeRule === rule.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4"
                  >
                    {React.createElement(rule.demo)}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    );
  };

  // Демо: Баланс информации и эмоции
  const BalanceDemo = () => {
    const infoText = "Обновление системы завершено успешно. Все данные сохранены.";
    const emotionText = "Невероятно! Просто космос!";

    return (
      <div className="bg-slate-800 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-purple-400 mb-4 flex items-center gap-2">
          <Icon icon="ph:scales" className="w-5 h-5" />
          Баланс: Информация vs Эмоция
        </h3>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <motion.button
            onClick={() => setBalanceMode('info')}
            className={`p-4 rounded-lg border transition-all ${
              balanceMode === 'info'
                ? 'bg-blue-900/20 border-blue-500/50'
                : 'bg-slate-700 border-slate-600 hover:border-blue-500/30'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Icon icon="ph:info" className="w-6 h-6 text-blue-400 mx-auto mb-2" />
            <h4 className="font-medium mb-1">Информация</h4>
            <p className="text-sm text-slate-400">Цель: Максимальная читаемость</p>
          </motion.button>

          <motion.button
            onClick={() => setBalanceMode('emotion')}
            className={`p-4 rounded-lg border transition-all ${
              balanceMode === 'emotion'
                ? 'bg-purple-900/20 border-purple-500/50'
                : 'bg-slate-700 border-slate-600 hover:border-purple-500/30'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Icon icon="ph:heart" className="w-6 h-6 text-purple-400 mx-auto mb-2" />
            <h4 className="font-medium mb-1">Эмоция</h4>
            <p className="text-sm text-slate-400">Цель: Максимальная выразительность</p>
          </motion.button>
        </div>

        <div className="bg-slate-900 rounded-lg p-6 min-h-[200px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {balanceMode === 'info' ? (
              <motion.div
                key="info"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-center"
              >
                <Icon icon="ph:check-circle" className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <p className="text-lg">{infoText}</p>
                <p className="text-sm text-slate-400 mt-2">
                  Простое появление, статичный текст, легко читается
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="emotion"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="text-center"
              >
                <div className="text-4xl font-black mb-4">
                  {emotionText.split(' ').map((word, i) => (
                    <motion.span
                      key={i}
                      className="inline-block mx-2 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent"
                      initial={{ opacity: 0, rotate: -180, scale: 0 }}
                      animate={{ 
                        opacity: 1, 
                        rotate: 0, 
                        scale: [0, 1.5, 1],
                        y: [50, -20, 0]
                      }}
                      transition={{ 
                        delay: i * 0.3,
                        duration: 0.8,
                        ease: [0.68, -0.55, 0.265, 1.55]
                      }}
                    >
                      {word}
                    </motion.span>
                  ))}
                </div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  {[...Array(5)].map((_, i) => (
                    <motion.span
                      key={i}
                      className="inline-block text-2xl mx-1"
                      animate={{ 
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.2, 1]
                      }}
                      transition={{ 
                        delay: 1.2 + i * 0.1,
                        duration: 0.5,
                        repeat: Infinity,
                        repeatDelay: 2
                      }}
                    >
                      ⭐
                    </motion.span>
                  ))}
                </motion.div>
                <p className="text-sm text-slate-400 mt-4">
                  Сложная анимация, эмоциональный эффект, читаемость вторична
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className={`mt-6 p-4 rounded-lg border ${
          balanceMode === 'info'
            ? 'bg-blue-900/20 border-blue-500/20'
            : 'bg-purple-900/20 border-purple-500/20'
        }`}>
          <p className="text-sm">
            {balanceMode === 'info' ? (
              <span className="text-blue-300">
                <strong>Рекомендация:</strong> Используйте уровни 1-2. 
                Минимальная анимация, максимальная ясность. Текст должен 
                передавать информацию, а не развлекать.
              </span>
            ) : (
              <span className="text-purple-300">
                <strong>Рекомендация:</strong> Используйте уровни 3-4. 
                Текст становится частью визуального опыта. Эмоциональное 
                воздействие важнее легкости чтения.
              </span>
            )}
          </p>
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
          Живое Слово — Баланс Читаемости и Выразительности в Кинетической Типографике
        </h1>

        <div className="bg-slate-800/50 rounded-lg p-6 mb-8 border border-slate-700">
          <p className="text-lg leading-relaxed mb-4">
            Окей, команда. Текст — это священная корова дизайна. Его главная задача — быть прочитанным. 
            Но что, если мы заставим его двигаться? Мы вступаем на территорию кинетической типографики.
          </p>
          <p className="text-lg leading-relaxed mb-4">
            Это невероятно мощный инструмент. Движущийся текст может передать интонацию, эмоцию, характер. 
            Он может превратить сухое предложение в настоящий перформанс. Но в то же время, это невероятно 
            опасный инструмент. Неправильное движение может полностью уничтожить главную функцию текста — читаемость.
          </p>
          <div className="bg-orange-900/20 rounded-lg p-4 border border-orange-500/30">
            <p className="text-orange-300 font-medium">
              <Icon icon="ph:warning" className="inline w-5 h-5 mr-2" />
              Фундаментальное противоречие: Наш мозг не может с одинаковой эффективностью делать два дела 
              одновременно: читать слова для понимания смысла и отслеживать сложное движение для анализа 
              траектории. Эти два процесса конкурируют за одни и те же когнитивные ресурсы.
            </p>
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
              Чем креативнее и сложнее анимация текста, тем круче. 
              Главное, чтобы выглядело эффектно.
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
              Работа с кинетической типографикой — это постоянный поиск хрупкого баланса. 
              Наша задача — усилить смысл текста с помощью движения, а не заслонить его.
            </p>
          </motion.div>
        </div>

        <ExpressivityScaleDemo />
        <TextAnimationLevels />
        <SafetyRulesDemo />
        <BalanceDemo />

        <div className="mt-8 bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-lg p-8 border border-blue-500/30">
          <h2 className="text-2xl font-semibold mb-6 text-blue-400">
            Вердикт: Ваша Новая Ментальная Модель
          </h2>
          
          <div className="bg-slate-800/50 rounded-lg p-6 mb-6">
            <p className="text-lg font-semibold text-purple-300 mb-4">
              Спросите себя: "Какова роль этого текста? Это информация или эмоция?"
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-900/20 rounded-lg p-4 border border-blue-500/30">
                <h4 className="font-semibold text-blue-400 mb-2 flex items-center gap-2">
                  <Icon icon="ph:info" className="w-5 h-5" />
                  Если это ИНФОРМАЦИЯ
                </h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Icon icon="ph:target" className="w-4 h-4 text-blue-400 mt-0.5" />
                    <span>Ваша цель — Максимальная Читаемость</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon icon="ph:gauge" className="w-4 h-4 text-blue-400 mt-0.5" />
                    <span>Ваш выбор — Уровень 1 или 2</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon icon="ph:strategy" className="w-4 h-4 text-blue-400 mt-0.5" />
                    <span>Не анимируйте вообще или анимируйте блок целиком</span>
                  </li>
                </ul>
              </div>

              <div className="bg-purple-900/20 rounded-lg p-4 border border-purple-500/30">
                <h4 className="font-semibold text-purple-400 mb-2 flex items-center gap-2">
                  <Icon icon="ph:heart" className="w-5 h-5" />
                  Если это ЭМОЦИЯ
                </h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Icon icon="ph:sparkle" className="w-4 h-4 text-purple-400 mt-0.5" />
                    <span>Ваша цель — Максимальная Выразительность</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon icon="ph:gauge" className="w-4 h-4 text-purple-400 mt-0.5" />
                    <span>Ваш выбор — Уровень 3 или 4</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon icon="ph:magic-wand" className="w-4 h-4 text-purple-400 mt-0.5" />
                    <span>Можете использовать сложную хореографию</span>
                  </li>
                </ul>
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
              Работа с кинетической типографикой — это как ходьба по канату. 
              С одной стороны — скучная статика, с другой — нечитаемый хаос. 
              Ваше мастерство заключается в том, чтобы найти ту самую точку баланса, 
              где движение не мешает, а помогает слову звучать громче.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default KineticTypography;