import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { Icon } from '@iconify/react';

const AnimaticVsFinal: React.FC = () => {
  const [selectedApproach, setSelectedApproach] = useState<'with' | 'without' | null>(null);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [showComparison, setShowComparison] = useState(false);
  const [projectType, setProjectType] = useState<'ui' | 'video' | 'logo'>('ui');
  const [timeSpent, setTimeSpent] = useState({ animatic: 0, final: 0 });
  const [technicalDebt, setTechnicalDebt] = useState(0);

  // Демо: Сравнение процессов
  const ProcessComparisonDemo = () => {
    const withAnimaticProcess = [
      { 
        phase: 'Идея', 
        time: 1, 
        icon: 'ph:lightbulb',
        description: 'Концепция и основная идея'
      },
      { 
        phase: 'Аниматик', 
        time: 3, 
        icon: 'ph:sketch-logo',
        description: 'Серые блоки, проверка тайминга'
      },
      { 
        phase: 'Правки', 
        time: 1, 
        icon: 'ph:arrows-clockwise',
        description: 'Быстрые итерации'
      },
      { 
        phase: 'Финал', 
        time: 5, 
        icon: 'ph:magic-wand',
        description: 'Чистовая работа'
      },
      { 
        phase: 'Готово', 
        time: 0, 
        icon: 'ph:check-circle',
        description: 'Результат без стресса'
      }
    ];

    const withoutAnimaticProcess = [
      { 
        phase: 'Идея', 
        time: 1, 
        icon: 'ph:lightbulb',
        description: 'Концепция в голове'
      },
      { 
        phase: 'Финал', 
        time: 8, 
        icon: 'ph:magic-wand',
        description: 'Сразу чистовая работа'
      },
      { 
        phase: 'Правки', 
        time: 6, 
        icon: 'ph:warning-circle',
        description: 'Болезненные переделки'
      },
      { 
        phase: 'Еще правки', 
        time: 4, 
        icon: 'ph:x-circle',
        description: 'Бесконечный цикл'
      },
      { 
        phase: 'Компромисс', 
        time: 0, 
        icon: 'ph:thumbs-down',
        description: 'Неидеальный результат'
      }
    ];

    const process = selectedApproach === 'with' ? withAnimaticProcess : withoutAnimaticProcess;
    const totalTime = process.reduce((acc, phase) => acc + phase.time, 0);

    useEffect(() => {
      if (selectedApproach) {
        const interval = setInterval(() => {
          setCurrentPhase((prev) => (prev + 1) % process.length);
        }, 2000);
        return () => clearInterval(interval);
      }
    }, [selectedApproach, process.length]);

    useEffect(() => {
      if (selectedApproach === 'without') {
        setTechnicalDebt((prev) => Math.min(prev + 5, 100));
      } else {
        setTechnicalDebt(0);
      }
    }, [currentPhase, selectedApproach]);

    return (
      <div className="bg-slate-800 rounded-lg p-6 mb-8">
        <h3 className="text-xl font-semibold text-blue-400 mb-4 flex items-center gap-2">
          <Icon icon="ph:git-branch" className="w-5 h-5" />
          Сравнение Процессов
        </h3>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <motion.button
            onClick={() => {
              setSelectedApproach('with');
              setCurrentPhase(0);
              setTimeSpent({ animatic: 0, final: 0 });
              setTechnicalDebt(0);
            }}
            className={`p-4 rounded-lg border transition-all ${
              selectedApproach === 'with'
                ? 'bg-green-900/20 border-green-500/50'
                : 'bg-slate-700 border-slate-600 hover:border-green-500/30'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Icon icon="ph:check-circle" className="w-6 h-6 text-green-400 mx-auto mb-2" />
            <h4 className="font-medium mb-1">С Аниматиком</h4>
            <p className="text-sm text-slate-400">Архитектурный подход</p>
          </motion.button>

          <motion.button
            onClick={() => {
              setSelectedApproach('without');
              setCurrentPhase(0);
              setTimeSpent({ animatic: 0, final: 0 });
              setTechnicalDebt(0);
            }}
            className={`p-4 rounded-lg border transition-all ${
              selectedApproach === 'without'
                ? 'bg-red-900/20 border-red-500/50'
                : 'bg-slate-700 border-slate-600 hover:border-red-500/30'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Icon icon="ph:x-circle" className="w-6 h-6 text-red-400 mx-auto mb-2" />
            <h4 className="font-medium mb-1">Без Аниматика</h4>
            <p className="text-sm text-slate-400">"Сразу в бой"</p>
          </motion.button>
        </div>

        <AnimatePresence mode="wait">
          {selectedApproach && (
            <motion.div
              key={selectedApproach}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium">Этапы процесса</h4>
                <div className="text-sm text-slate-400">
                  Общее время: {totalTime} единиц
                </div>
              </div>

              <div className="space-y-3">
                {process.map((phase, index) => (
                  <motion.div
                    key={`${selectedApproach}-${index}`}
                    className={`flex items-center gap-4 p-3 rounded-lg transition-all ${
                      index === currentPhase
                        ? selectedApproach === 'with'
                          ? 'bg-green-900/20 border border-green-500/30'
                          : 'bg-red-900/20 border border-red-500/30'
                        : index < currentPhase
                        ? 'bg-slate-700/50 opacity-60'
                        : 'bg-slate-700/30 opacity-30'
                    }`}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Icon 
                      icon={phase.icon} 
                      className={`w-6 h-6 ${
                        index === currentPhase 
                          ? selectedApproach === 'with' ? 'text-green-400' : 'text-red-400'
                          : 'text-slate-500'
                      }`} 
                    />
                    <div className="flex-1">
                      <h5 className="font-medium">{phase.phase}</h5>
                      <p className="text-sm text-slate-400">{phase.description}</p>
                    </div>
                    {phase.time > 0 && (
                      <div className="text-right">
                        <div className="text-sm font-medium">{phase.time}h</div>
                        <div className="text-xs text-slate-500">время</div>
                      </div>
                    )}
                    {index === currentPhase && (
                      <motion.div
                        className={`w-2 h-2 rounded-full ${
                          selectedApproach === 'with' ? 'bg-green-400' : 'bg-red-400'
                        }`}
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ repeat: Infinity, duration: 1 }}
                      />
                    )}
                  </motion.div>
                ))}
              </div>

              {selectedApproach === 'without' && technicalDebt > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-3 bg-red-900/20 rounded-lg border border-red-500/20"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-red-400">Технический долг</span>
                    <span className="text-sm text-red-300">{technicalDebt}%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-red-500 to-red-400"
                      initial={{ width: 0 }}
                      animate={{ width: `${technicalDebt}%` }}
                    />
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  // Демо: Что решает аниматик
  const AnimaticSolvesDemo = () => {
    const problems = [
      {
        id: 'timing',
        title: 'Работает ли тайминг?',
        icon: 'ph:timer',
        animatic: {
          time: '5 сек',
          cost: 'Бесплатно',
          result: 'Мгновенная правка'
        },
        final: {
          time: '2 часа',
          cost: 'Высокая',
          result: 'Переделка всего'
        }
      },
      {
        id: 'story',
        title: 'Понятна ли история?',
        icon: 'ph:book-open',
        animatic: {
          time: '10 мин',
          cost: 'Минимальная',
          result: 'Быстрая итерация'
        },
        final: {
          time: '1 день',
          cost: 'Критическая',
          result: 'Полный редизайн'
        }
      },
      {
        id: 'composition',
        title: 'Хороша ли композиция?',
        icon: 'ph:layout',
        animatic: {
          time: '3 мин',
          cost: 'Нулевая',
          result: 'Простая коррекция'
        },
        final: {
          time: '4 часа',
          cost: 'Средняя',
          result: 'Сложная переработка'
        }
      },
      {
        id: 'client',
        title: 'Согласовано с клиентом?',
        icon: 'ph:handshake',
        animatic: {
          time: '1 встреча',
          cost: 'Минимальная',
          result: 'Довольный клиент'
        },
        final: {
          time: '∞ встреч',
          cost: 'Катастрофа',
          result: 'Конфликт и стресс'
        }
      }
    ];

    const [selectedProblem, setSelectedProblem] = useState<string | null>(null);

    return (
      <div className="bg-slate-800 rounded-lg p-6 mb-8">
        <h3 className="text-xl font-semibold text-purple-400 mb-4 flex items-center gap-2">
          <Icon icon="ph:question" className="w-5 h-5" />
          Что Решает Аниматик
        </h3>

        <div className="grid gap-4">
          {problems.map((problem) => (
            <motion.div
              key={problem.id}
              className={`border rounded-lg p-4 cursor-pointer transition-all ${
                selectedProblem === problem.id
                  ? 'bg-purple-900/20 border-purple-500/50'
                  : 'bg-slate-700/30 border-slate-600 hover:border-purple-500/30'
              }`}
              onClick={() => setSelectedProblem(
                selectedProblem === problem.id ? null : problem.id
              )}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium flex items-center gap-2">
                  <Icon icon={problem.icon} className="w-5 h-5 text-purple-400" />
                  {problem.title}
                </h4>
                <Icon 
                  icon={selectedProblem === problem.id ? "ph:caret-up" : "ph:caret-down"} 
                  className="w-5 h-5 text-slate-400" 
                />
              </div>

              <AnimatePresence>
                {selectedProblem === problem.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 grid md:grid-cols-2 gap-4"
                  >
                    <div className="bg-green-900/20 rounded-lg p-3 border border-green-500/20">
                      <h5 className="font-medium text-green-400 mb-2 flex items-center gap-1">
                        <Icon icon="ph:check" className="w-4 h-4" />
                        На этапе аниматика
                      </h5>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Время:</span>
                          <span className="text-green-300">{problem.animatic.time}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Стоимость:</span>
                          <span className="text-green-300">{problem.animatic.cost}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Результат:</span>
                          <span className="text-green-300">{problem.animatic.result}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-red-900/20 rounded-lg p-3 border border-red-500/20">
                      <h5 className="font-medium text-red-400 mb-2 flex items-center gap-1">
                        <Icon icon="ph:x" className="w-4 h-4" />
                        На финальном этапе
                      </h5>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Время:</span>
                          <span className="text-red-300">{problem.final.time}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Стоимость:</span>
                          <span className="text-red-300">{problem.final.cost}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Результат:</span>
                          <span className="text-red-300">{problem.final.result}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    );
  };

  // Демо: Живой пример аниматика
  const LiveAnimaticDemo = () => {
    const [showAnimatic, setShowAnimatic] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false);

    const startAnimation = () => {
      setIsPlaying(true);
      setTimeout(() => setIsPlaying(false), 3000);
    };

    return (
      <div className="bg-slate-800 rounded-lg p-6 mb-8">
        <h3 className="text-xl font-semibold text-green-400 mb-4 flex items-center gap-2">
          <Icon icon="ph:play-circle" className="w-5 h-5" />
          Живой Пример
        </h3>

        <div className="mb-4 flex items-center gap-4">
          <button
            onClick={() => setShowAnimatic(true)}
            className={`px-4 py-2 rounded-lg transition-all ${
              showAnimatic
                ? 'bg-green-600 text-white'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            Аниматик
          </button>
          <button
            onClick={() => setShowAnimatic(false)}
            className={`px-4 py-2 rounded-lg transition-all ${
              !showAnimatic
                ? 'bg-purple-600 text-white'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            Финальная версия
          </button>
          <button
            onClick={startAnimation}
            disabled={isPlaying}
            className="ml-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Icon icon="ph:play" className="inline w-4 h-4 mr-1" />
            Воспроизвести
          </button>
        </div>

        <div className="relative bg-slate-900 rounded-lg p-8 h-64 overflow-hidden">
          <AnimatePresence mode="wait">
            {showAnimatic ? (
              <motion.div
                key="animatic"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                {/* Аниматик версия */}
                <div className="relative w-full max-w-md">
                  <motion.div
                    className="absolute left-0 w-20 h-20 bg-gray-500 rounded"
                    animate={isPlaying ? {
                      x: [0, 300, 300, 0],
                      y: [0, 0, 100, 100],
                    } : {}}
                    transition={{ duration: 3, ease: "easeInOut" }}
                  />
                  <motion.div
                    className="absolute right-0 w-16 h-16 bg-gray-600 rounded-full"
                    animate={isPlaying ? {
                      scale: [1, 1.5, 1, 0.5, 1],
                      rotate: [0, 180, 360]
                    } : {}}
                    transition={{ duration: 3, ease: "easeInOut" }}
                  />
                  <motion.div
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-4 bg-gray-400"
                    animate={isPlaying ? {
                      scaleX: [1, 2, 1],
                      opacity: [1, 0.5, 1]
                    } : {}}
                    transition={{ duration: 3, ease: "easeInOut" }}
                  />
                </div>
                <div className="absolute bottom-4 left-4 text-sm text-gray-400">
                  Простые формы • Фокус на движении • Быстрые правки
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="final"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                {/* Финальная версия */}
                <div className="relative w-full max-w-md">
                  <motion.div
                    className="absolute left-0 w-20 h-20 rounded overflow-hidden shadow-lg"
                    style={{
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                    }}
                    animate={isPlaying ? {
                      x: [0, 300, 300, 0],
                      y: [0, 0, 100, 100],
                    } : {}}
                    transition={{ duration: 3, ease: "easeInOut" }}
                  >
                    <div className="absolute inset-0 bg-white/20 backdrop-blur-sm" />
                    <Icon icon="ph:image" className="absolute inset-0 m-auto w-8 h-8 text-white/50" />
                  </motion.div>
                  <motion.div
                    className="absolute right-0 w-16 h-16 rounded-full shadow-lg"
                    style={{
                      background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
                    }}
                    animate={isPlaying ? {
                      scale: [1, 1.5, 1, 0.5, 1],
                      rotate: [0, 180, 360]
                    } : {}}
                    transition={{ duration: 3, ease: "easeInOut" }}
                  >
                    <div className="absolute inset-0 rounded-full bg-white/20 backdrop-blur-sm" />
                  </motion.div>
                  <motion.div
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 px-6 py-1 rounded-full"
                    style={{
                      background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
                    }}
                    animate={isPlaying ? {
                      scaleX: [1, 2, 1],
                      opacity: [1, 0.5, 1]
                    } : {}}
                    transition={{ duration: 3, ease: "easeInOut" }}
                  >
                    <span className="text-white text-sm font-medium">Loading...</span>
                  </motion.div>
                </div>
                <div className="absolute bottom-4 left-4 text-sm text-gray-400">
                  Детали • Эффекты • Цвета • Долгая работа
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-4 grid md:grid-cols-2 gap-4">
          <div className={`p-3 rounded-lg border ${
            showAnimatic
              ? 'bg-green-900/20 border-green-500/20'
              : 'bg-slate-700/20 border-slate-600'
          }`}>
            <h5 className="font-medium text-green-400 mb-1">Аниматик</h5>
            <ul className="text-sm text-slate-300 space-y-1">
              <li>• Время создания: 30 минут</li>
              <li>• Стоимость правок: минимальная</li>
              <li>• Фокус: движение и тайминг</li>
            </ul>
          </div>
          <div className={`p-3 rounded-lg border ${
            !showAnimatic
              ? 'bg-purple-900/20 border-purple-500/20'
              : 'bg-slate-700/20 border-slate-600'
          }`}>
            <h5 className="font-medium text-purple-400 mb-1">Финальная версия</h5>
            <ul className="text-sm text-slate-300 space-y-1">
              <li>• Время создания: 8 часов</li>
              <li>• Стоимость правок: высокая</li>
              <li>• Фокус: визуальное качество</li>
            </ul>
          </div>
        </div>
      </div>
    );
  };

  // Демо: Применение в разных контекстах
  const ContextApplicationDemo = () => {
    const contexts = {
      ui: {
        title: 'Продуктовый UI',
        icon: 'ph:devices',
        tool: 'Figma / Protopie',
        animatic: 'Интерактивный прототип с серыми блоками',
        benefit: 'Проверка всей логики переходов до кода'
      },
      video: {
        title: 'Видео-ролики',
        icon: 'ph:video-camera',
        tool: 'After Effects / Storyboard',
        animatic: 'Геометрические фигуры + звук',
        benefit: 'Синхронизация с музыкой и голосом'
      },
      logo: {
        title: 'Анимация логотипа',
        icon: 'ph:signature',
        tool: 'Любой удобный',
        animatic: 'Десятки 5-секундных скетчей',
        benefit: 'Быстрый поиск лучшей идеи'
      }
    };

    return (
      <div className="bg-slate-800 rounded-lg p-6 mb-8">
        <h3 className="text-xl font-semibold text-orange-400 mb-4 flex items-center gap-2">
          <Icon icon="ph:squares-four" className="w-5 h-5" />
          Применение в Разных Контекстах
        </h3>

        <div className="mb-4 flex gap-2">
          {Object.entries(contexts).map(([key, context]) => (
            <button
              key={key}
              onClick={() => setProjectType(key as typeof projectType)}
              className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${
                projectType === key
                  ? 'bg-orange-600 text-white'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              <Icon icon={context.icon} className="w-4 h-4" />
              {context.title}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={projectType}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-slate-700/50 rounded-lg p-4"
          >
            <div className="flex items-start gap-4">
              <Icon 
                icon={contexts[projectType].icon} 
                className="w-8 h-8 text-orange-400 mt-1" 
              />
              <div className="flex-1">
                <h4 className="font-medium text-lg mb-2">{contexts[projectType].title}</h4>
                <div className="space-y-2">
                  <div>
                    <span className="text-sm text-slate-400">Инструмент:</span>
                    <span className="ml-2 text-sm font-medium">{contexts[projectType].tool}</span>
                  </div>
                  <div>
                    <span className="text-sm text-slate-400">Аниматик:</span>
                    <span className="ml-2 text-sm">{contexts[projectType].animatic}</span>
                  </div>
                  <div className="pt-2 border-t border-slate-600">
                    <span className="text-sm text-orange-300">
                      <Icon icon="ph:star" className="inline w-4 h-4 mr-1" />
                      {contexts[projectType].benefit}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    );
  };

  // Демо: Типичные проблемы без аниматика
  const ProblemsWithoutAnimaticDemo = () => {
    const problems = [
      {
        id: 'polishing',
        name: 'Синдром полировки',
        icon: 'ph:sparkle',
        description: 'Часами настраиваете эффекты на элементе с неправильным таймингом',
        impact: 'Вся работа в мусор',
        visual: () => (
          <div className="relative h-20">
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 w-16 h-16 rounded-lg"
              style={{
                background: 'linear-gradient(45deg, #ff006e, #8338ec, #3a86ff)',
                filter: 'blur(0px)',
              }}
              animate={{
                filter: ['blur(0px)', 'blur(2px)', 'blur(0px)'],
                boxShadow: [
                  '0 0 20px rgba(255,0,110,0.5)',
                  '0 0 40px rgba(131,56,236,0.8)',
                  '0 0 20px rgba(58,134,255,0.5)'
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 top-full mt-2 text-xs text-red-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              Но тайминг всё равно плохой!
            </motion.div>
          </div>
        )
      },
      {
        id: 'bigpicture',
        name: 'Потеря общей картины',
        icon: 'ph:eye-closed',
        description: 'Увлеклись деталями и не видите, что композиция развалилась',
        impact: 'Несвязная анимация',
        visual: () => (
          <div className="relative h-20 w-full">
            <motion.div
              className="absolute left-0 w-4 h-4 bg-purple-500 rounded"
              animate={{ 
                x: [0, 20, 0],
                rotate: [0, 360, 720]
              }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            <motion.div
              className="absolute left-20 w-4 h-4 bg-blue-500 rounded"
              animate={{ 
                y: [0, -20, 0],
                scale: [1, 2, 1]
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <motion.div
              className="absolute right-20 w-4 h-4 bg-green-500 rounded"
              animate={{ 
                x: [0, -10, 10, 0],
                y: [0, 10, -10, 0]
              }}
              transition={{ duration: 0.8, repeat: Infinity }}
            />
            <motion.div
              className="absolute right-0 w-4 h-4 bg-red-500 rounded"
              animate={{ 
                scale: [1, 0.5, 1.5, 1],
                opacity: [1, 0.5, 1]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <div className="absolute bottom-0 left-0 right-0 text-center text-xs text-red-400">
              Каждый элемент сам по себе
            </div>
          </div>
        )
      },
      {
        id: 'fear',
        name: 'Страх перед изменениями',
        icon: 'ph:lock',
        description: 'Вложили 20 часов и боитесь менять, хотя знаете что надо',
        impact: 'Компромиссный результат',
        visual: () => (
          <div className="relative h-20 flex items-center justify-center">
            <motion.div
              className="relative w-24 h-12 bg-slate-600 rounded-lg overflow-hidden"
              animate={{ scale: [1, 0.98, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-orange-500/20" />
              <Icon icon="ph:lock" className="absolute inset-0 m-auto w-6 h-6 text-slate-400" />
              <motion.div
                className="absolute top-0 left-0 text-xs bg-red-500 text-white px-1 rounded-br"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 1, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                20h
              </motion.div>
            </motion.div>
          </div>
        )
      }
    ];

    const [activeProblem, setActiveProblem] = useState<string | null>(null);

    return (
      <div className="bg-slate-800 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-red-400 mb-4 flex items-center gap-2">
          <Icon icon="ph:warning-circle" className="w-5 h-5" />
          Типичные Проблемы без Аниматика
        </h3>

        <div className="space-y-4">
          {problems.map((problem) => (
            <motion.div
              key={problem.id}
              className={`border rounded-lg p-4 cursor-pointer transition-all ${
                activeProblem === problem.id
                  ? 'bg-red-900/20 border-red-500/50'
                  : 'bg-slate-700/30 border-slate-600 hover:border-red-500/30'
              }`}
              onClick={() => setActiveProblem(
                activeProblem === problem.id ? null : problem.id
              )}
            >
              <div className="flex items-start gap-3">
                <Icon icon={problem.icon} className="w-6 h-6 text-red-400 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-medium mb-1">{problem.name}</h4>
                  <p className="text-sm text-slate-400 mb-2">{problem.description}</p>
                  <div className="flex items-center gap-2 text-sm">
                    <Icon icon="ph:arrow-right" className="w-4 h-4 text-red-400" />
                    <span className="text-red-300">{problem.impact}</span>
                  </div>
                </div>
              </div>
              
              {activeProblem === problem.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-4 p-4 bg-slate-900 rounded-lg"
                >
                  {problem.visual()}
                </motion.div>
              )}
            </motion.div>
          ))}
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
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-400 via-green-400 to-purple-400 bg-clip-text text-transparent">
          Процесс и Результат — Почему Аниматик Важнее Финального Рендера
        </h1>

        <div className="bg-slate-800/50 rounded-lg p-6 mb-8 border border-slate-700">
          <p className="text-lg leading-relaxed mb-4">
            Окей, команда. Представьте себе архитектора, который, придумав идею дома, не делает 
            чертежи и 3D-модели, а сразу начинает заливать фундамент и класть кирпичи. 
            Звучит абсурдно? Именно так поступают многие моушн-дизайнеры, когда, получив задачу, 
            сразу открывают After Effects и начинают двигать "чистовые" ассеты, накладывать 
            эффекты и подбирать цвета.
          </p>
          <p className="text-lg font-semibold text-yellow-400">
            Они пропускают самый важный, самый фундаментальный этап процесса — аниматик.
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
              Аниматик — это необязательный, черновой этап. Это просто "эскизы". 
              Можно сэкономить на нем время и сразу приступить к "настоящей" работе. 
              Техническое исполнение и красивые эффекты в финале все равно все исправят.
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
              Аниматик — это архитектурный план вашей анимации. Это тот момент, где вы 
              принимаете 90% всех важных решений о тайминге, ритме, композиции и повествовании. 
              Ошибки на этом этапе стоят минуты. Те же ошибки на финальном этапе стоят дни.
            </p>
          </motion.div>
        </div>

        <ProcessComparisonDemo />

        <div className="my-8">
          <h2 className="text-2xl font-semibold mb-6">Что Такое Аниматик и Какую Работу он Выполняет?</h2>
          
          <div className="bg-blue-900/10 rounded-lg p-6 border border-blue-500/30 mb-6">
            <p className="text-lg text-blue-300">
              Аниматик — это упрощенная, низкодетализированная версия вашей будущей анимации. 
              Он может состоять из простых серых прямоугольников, кругов, схематичных набросков. 
              В нем нет цветов, нет текстур, нет спецэффектов. В нем есть только одно — 
              движение в его чистом, дистиллированном виде.
            </p>
          </div>
        </div>

        <AnimaticSolvesDemo />
        <LiveAnimaticDemo />

        <div className="my-8">
          <h2 className="text-2xl font-semibold mb-6">Почему Пропуск Аниматика — это Технический Долг</h2>
          <p className="text-lg mb-6">
            Пропуская этот этап, вы действуете вслепую. Это приводит к типичным проблемам:
          </p>
        </div>

        <ProblemsWithoutAnimaticDemo />

        <div className="my-8">
          <h2 className="text-2xl font-semibold mb-6">Применение в Разных Контекстах</h2>
        </div>

        <ContextApplicationDemo />

        <div className="mt-8 bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-lg p-8 border border-blue-500/30">
          <h2 className="text-2xl font-semibold mb-6 text-blue-400">
            Вердикт: Ваша Новая Ментальная Модель
          </h2>
          
          <div className="bg-slate-800/50 rounded-lg p-6 mb-6">
            <p className="text-lg font-semibold text-purple-300 mb-4">
              Влюбляйтесь в свой аниматик, а не в свой финальный рендер.
            </p>
            
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Icon icon="ph:number-circle-one" className="w-5 h-5 text-blue-400 mt-0.5" />
                <span>Думайте как архитектор: сначала — чертеж, потом — стройка. Никогда наоборот.</span>
              </li>
              <li className="flex items-start gap-2">
                <Icon icon="ph:number-circle-two" className="w-5 h-5 text-green-400 mt-0.5" />
                <span>
                  Ваше мастерство заключается не в умении накладывать красивые эффекты, 
                  а в умении создать безупречный по таймингу и композиции аниматик.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Icon icon="ph:number-circle-three" className="w-5 h-5 text-purple-400 mt-0.5" />
                <span>
                  Если ваш аниматик "скучный", никакие спецэффекты его не спасут. 
                  Если ваш аниматик захватывает дух, даже будучи собранным из серых 
                  квадратов, — вы на пути к созданию шедевра.
                </span>
              </li>
            </ul>
          </div>

          <motion.div
            className="bg-gradient-to-r from-yellow-900/20 to-orange-900/20 rounded-lg p-6 border border-yellow-500/30"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1 }}
          >
            <p className="text-lg text-yellow-300 font-medium">
              Потратьте 50% времени на идею и аниматик. И тогда оставшиеся 50% на чистовую 
              работу будут удовольствием, а не мучительным процессом бесконечных переделок. 
              Это самый эффективный способ работать быстро, качественно и без стресса.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default AnimaticVsFinal;