import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';

// Импорт компонентов тем
import { PrefaceIntro, DisneyPrinciplesVsDigital, ThreeDimensionalValue, PhysicsOfSensations, SpeedOfPerception, CharacterOfMovement, ThirdDimension, LoopingAnimation, MicroAnimations, TimeAsMaterial, ChoreographyArt, InvisibleLayer, SmoothIllusion, FragmentationCurse, MovementMeaning, ToolsVsMastery, KineticTypography, AnimaticVsFinal, TrueAnticipation, VisualLanguage, GreatBalance } from './components';

// Данные о темах
const TOTAL_TOPICS = 21; // Включая все темы
const topics = [
  { id: 0, title: "Предисловие: Переопределение Моушн-дизайна", component: PrefaceIntro },
  { id: 1, title: "Принципы Disney vs Digital", component: DisneyPrinciplesVsDigital },
  { id: 2, title: "Трехмерная Модель Ценности Анимации", component: ThreeDimensionalValue },
  { id: 3, title: "Физика Ощущений — От Информации к Тактильности", component: PhysicsOfSensations },
  { id: 4, title: "Скорость Восприятия — Почему 300мс не всегда правильный ответ", component: SpeedOfPerception },
  { id: 5, title: "Характер Движения — Почему Ease-in-out не универсальный ответ", component: CharacterOfMovement },
  { id: 6, title: "Третье Измерение — Роскошь или Необходимость?", component: ThirdDimension },
  { id: 7, title: "Искусство Повторения — Магия и Проклятие Цикличной Анимации", component: LoopingAnimation },
  { id: 8, title: "Душа в Деталях — Микроанимации как Язык Обратной Связи", component: MicroAnimations },
  { id: 9, title: "Время как Материал — Искусство Управления Восприятием", component: TimeAsMaterial },
  { id: 10, title: "Искусство Хореографии — Параллельная vs. Последовательная Анимация", component: ChoreographyArt },
  { id: 11, title: "Невидимый Слой — Звук как Партнер Движения", component: InvisibleLayer },
  { id: 12, title: "Иллюзия Плавности — Фреймрейт, Motion Blur и Технические Компромиссы", component: SmoothIllusion },
  { id: 13, title: "Проклятие Фрагментации — Масштабируемость Моушн-дизайна", component: FragmentationCurse },
  { id: 14, title: "Смысл Движения — Нарративный vs. Абстрактный Моушн-дизайн", component: MovementMeaning },
  { id: 15, title: "Вечный Спор — Инструменты против Мастерства", component: ToolsVsMastery },
  { id: 16, title: "Живое Слово — Баланс Читаемости и Выразительности в Кинетической Типографике", component: KineticTypography },
  { id: 17, title: "Процесс и Результат — Почему Аниматик Важнее Финального Рендера", component: AnimaticVsFinal },
  { id: 18, title: "Сила Намерения — Истинный Смысл \"Ожидания\" (Anticipation)", component: TrueAnticipation },
  { id: 19, title: "Визуальный Язык — Стилизация против Реализма", component: VisualLanguage },
  { id: 20, title: "Великий Баланс — Эмоциональный vs. Логический Моушн-дизайн", component: GreatBalance },
];

const WebMotionDesign: React.FC = () => {
  const [currentTopic, setCurrentTopic] = useState(0);
  const [completedTopics, setCompletedTopics] = useState<number[]>([]);

  const CurrentTopicComponent = topics[currentTopic]?.component;
  const progress = (completedTopics.length / topics.length) * 100;

  const handleTopicClick = (topicId: number) => {
    setCurrentTopic(topicId);
    // Отмечаем тему как просмотренную
    if (!completedTopics.includes(topicId)) {
      setCompletedTopics([...completedTopics, topicId]);
    }
  };

  const navigateToTopic = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && currentTopic > 0) {
      handleTopicClick(currentTopic - 1);
    } else if (direction === 'next' && currentTopic < topics.length - 1) {
      handleTopicClick(currentTopic + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-600/10 via-transparent to-transparent" />
        <div className="container relative z-10 px-4 py-20 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="flex justify-center mb-6">
              <div className="p-4 rounded-2xl bg-purple-600/20 backdrop-blur-sm">
                <Icon icon="ph:magic-wand-duotone" className="w-24 h-24 text-purple-400" />
              </div>
            </div>
            <h1 className="mb-4 text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              Web Motion Design
            </h1>
            <p className="max-w-2xl mx-auto text-xl text-gray-300">
              Инженерная дисциплина по управлению вниманием и конструированию смысла
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container px-4 py-12 mx-auto">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Quick Stats */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="p-6 border rounded-lg bg-slate-800/50 border-slate-700"
              >
                <h3 className="mb-4 text-lg font-semibold text-purple-400">Быстрая информация</h3>
                <dl className="space-y-3 text-sm">
                  <div>
                    <dt className="text-gray-400">Всего тем</dt>
                    <dd className="text-white">{topics.length} модулей (включая предисловие)</dd>
                  </div>
                  <div>
                    <dt className="text-gray-400">Основа</dt>
                    <dd className="text-white">Motion Design + Engineering</dd>
                  </div>
                  <div>
                    <dt className="text-gray-400">Инструменты</dt>
                    <dd className="text-white">GSAP, Framer Motion, CSS</dd>
                  </div>
                  <div>
                    <dt className="text-gray-400">Прогресс</dt>
                    <dd className="text-white">{completedTopics.length} из {topics.length}</dd>
                  </div>
                </dl>
              </motion.div>

              {/* Key Principles */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="p-6 border rounded-lg bg-slate-800/50 border-slate-700"
              >
                <h3 className="mb-4 text-lg font-semibold text-purple-400">Ключевые принципы</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Icon icon="ph:check-circle-fill" className="w-5 h-5 mt-0.5 text-green-400 shrink-0" />
                    <span className="text-gray-300">Функциональность &gt; Красота</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon icon="ph:check-circle-fill" className="w-5 h-5 mt-0.5 text-green-400 shrink-0" />
                    <span className="text-gray-300">Performance First</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon icon="ph:check-circle-fill" className="w-5 h-5 mt-0.5 text-green-400 shrink-0" />
                    <span className="text-gray-300">Управление вниманием</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon icon="ph:check-circle-fill" className="w-5 h-5 mt-0.5 text-green-400 shrink-0" />
                    <span className="text-gray-300">Минимализм движения</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon icon="ph:check-circle-fill" className="w-5 h-5 mt-0.5 text-green-400 shrink-0" />
                    <span className="text-gray-300">Accessibility важна</span>
                  </li>
                </ul>
              </motion.div>

              {/* Common Mistakes */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="p-6 border rounded-lg bg-orange-900/20 border-orange-800/50"
              >
                <h3 className="mb-4 text-lg font-semibold text-orange-400">Частые ошибки</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Icon icon="ph:warning-circle-fill" className="w-5 h-5 mt-0.5 text-orange-400 shrink-0" />
                    <span className="text-gray-300">Оверинжиниринг анимаций</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon icon="ph:warning-circle-fill" className="w-5 h-5 mt-0.5 text-orange-400 shrink-0" />
                    <span className="text-gray-300">Игнорирование производительности</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon icon="ph:warning-circle-fill" className="w-5 h-5 mt-0.5 text-orange-400 shrink-0" />
                    <span className="text-gray-300">Слепое копирование Disney</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon icon="ph:warning-circle-fill" className="w-5 h-5 mt-0.5 text-orange-400 shrink-0" />
                    <span className="text-gray-300">Анимация ради анимации</span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="p-8 border rounded-lg bg-slate-800/50 border-slate-700"
            >
              <h2 className="mb-6 text-2xl font-semibold text-purple-400">
                Web Motion Design: Критический курс
              </h2>
              
              <div className="mb-6 text-gray-300">
                <p className="mb-4">
                  Этот курс представляет собой систематический анализ моушн-дизайна как инженерной дисциплины. 
                  Мы развенчаем популярные мифы и научимся создавать эффективные анимации.
                </p>
                <p className="p-4 border-l-4 border-purple-500/50 bg-purple-500/10 rounded-r">
                  <strong className="text-purple-400">Философия курса:</strong> Мы изучаем motion design не как 
                  "оживление графики", а как инструмент управления вниманием и конструирования смысла.
                </p>
              </div>

              {/* Progress bar */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-purple-400">Навигация по темам</h3>
                  <span className="text-sm text-gray-400">
                    <Icon icon="ph:star-fill" className="inline w-4 h-4 text-yellow-400" /> Средний
                  </span>
                </div>
                <div className="mb-4">
                  <div className="text-sm text-gray-400 mb-2">Прогресс</div>
                  <div className="relative h-2 bg-slate-700 rounded-full overflow-hidden">
                    <motion.div
                      className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-500 to-pink-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    />
                  </div>
                  <div className="text-right text-xs text-gray-500 mt-1">{Math.round(progress)}%</div>
                </div>
              </div>

              {/* Current Topic */}
              <div className="mb-6 p-4 bg-purple-900/20 rounded-lg border border-purple-700/50">
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex items-center justify-center w-10 h-10 bg-purple-600 rounded-lg">
                    <Icon icon="ph:book-open-text-duotone" className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {currentTopic === 0 ? 'Предисловие' : `Тема ${currentTopic}`}
                    </h3>
                    <p className="text-sm text-gray-400">{topics[currentTopic]?.title}</p>
                  </div>
                </div>
              </div>

              {/* Topic Grid */}
              <div className="grid grid-cols-4 md:grid-cols-5 gap-3 mb-8">
                {/* Предисловие */}
                <motion.button
                  onClick={() => handleTopicClick(0)}
                  className={`
                    relative p-3 rounded-lg font-medium transition-all col-span-4 md:col-span-5
                    ${
                      currentTopic === 0
                        ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30' 
                        : completedTopics.includes(0)
                        ? 'bg-purple-900/30 text-purple-300 hover:bg-purple-900/50'
                        : 'bg-slate-700/50 text-gray-300 hover:bg-slate-700'
                    }
                  `}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon icon="ph:book-open-text-duotone" className="inline w-5 h-5 mr-2" />
                  Предисловие
                  {completedTopics.includes(0) && currentTopic !== 0 && (
                    <Icon 
                      icon="ph:check-circle-fill" 
                      className="absolute top-2 right-2 w-4 h-4 text-green-400" 
                    />
                  )}
                </motion.button>

                {/* Остальные темы */}
                {topics.slice(1).map((topic, index) => {
                  const topicNum = index + 1;
                  const isActive = topicNum === currentTopic;
                  const isCompleted = completedTopics.includes(topicNum);
                  const hasContent = topic?.component !== null;

                  return (
                    <motion.button
                      key={topicNum}
                      onClick={() => handleTopicClick(topicNum)}
                      disabled={!hasContent}
                      className={`
                        relative p-3 rounded-lg font-medium transition-all
                        ${isActive 
                          ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30' 
                          : isCompleted
                          ? 'bg-purple-900/30 text-purple-300 hover:bg-purple-900/50'
                          : hasContent
                          ? 'bg-slate-700/50 text-gray-300 hover:bg-slate-700'
                          : 'bg-slate-800/30 text-gray-600 cursor-not-allowed'
                        }
                      `}
                      whileHover={hasContent ? { scale: 1.05 } : {}}
                      whileTap={hasContent ? { scale: 0.95 } : {}}
                    >
                      {topicNum}
                      {isCompleted && !isActive && (
                        <Icon 
                          icon="ph:check-circle-fill" 
                          className="absolute top-1 right-1 w-3 h-3 text-green-400" 
                        />
                      )}
                      {!hasContent && (
                        <Icon 
                          icon="ph:lock-fill" 
                          className="absolute top-1 right-1 w-3 h-3 text-gray-500" 
                        />
                      )}
                    </motion.button>
                  );
                })}
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between mb-8">
                <button
                  onClick={() => navigateToTopic('prev')}
                  disabled={currentTopic === 0}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-lg transition-all
                    ${currentTopic === 0 
                      ? 'bg-slate-700/30 text-gray-600 cursor-not-allowed' 
                      : 'bg-slate-700 text-white hover:bg-slate-600'
                    }
                  `}
                >
                  <Icon icon="ph:arrow-left" className="w-4 h-4" />
                  Предыдущая
                </button>

                <span className="text-sm text-gray-400">
                  {currentTopic === 0 ? 'Предисловие' : `Тема ${currentTopic} из ${topics.length - 1}`}
                </span>

                <button
                  onClick={() => navigateToTopic('next')}
                  disabled={currentTopic === topics.length - 1}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-lg transition-all
                    ${currentTopic === topics.length - 1 
                      ? 'bg-slate-700/30 text-gray-600 cursor-not-allowed' 
                      : 'bg-purple-600 text-white hover:bg-purple-700'
                    }
                  `}
                >
                  Следующая
                  <Icon icon="ph:arrow-right" className="w-4 h-4" />
                </button>
              </div>

              {/* Topic Content */}
              <div className="pt-8 border-t border-slate-700">
                <AnimatePresence mode="wait">
                  {CurrentTopicComponent ? (
                    <motion.div
                      key={currentTopic}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <CurrentTopicComponent />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="placeholder"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center py-20"
                    >
                      <Icon icon="ph:construction" className="w-16 h-16 mx-auto mb-4 text-gray-500" />
                      <h3 className="text-xl font-medium text-gray-400 mb-2">
                        {currentTopic === 0 ? 'Предисловие' : `Тема ${currentTopic}`}: {topics[currentTopic]?.title}
                      </h3>
                      <p className="text-gray-500">
                        Контент для этой темы находится в разработке
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Additional Resources */}
              <div className="pt-8 mt-12 border-t border-slate-700">
                <h3 className="mb-4 text-xl font-semibold text-purple-400">Дополнительные ресурсы</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <a
                    href="https://greensock.com/docs/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 transition-colors border rounded-lg border-slate-700 hover:bg-slate-700/50"
                  >
                    <Icon icon="simple-icons:greensock" className="w-8 h-8 text-green-400" />
                    <div>
                      <h4 className="font-medium text-white">GSAP Documentation</h4>
                      <p className="text-sm text-gray-400">Мощная библиотека анимаций</p>
                    </div>
                  </a>
                  <a
                    href="https://www.framer.com/motion/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 transition-colors border rounded-lg border-slate-700 hover:bg-slate-700/50"
                  >
                    <Icon icon="simple-icons:framer" className="w-8 h-8 text-pink-400" />
                    <div>
                      <h4 className="font-medium text-white">Framer Motion</h4>
                      <p className="text-sm text-gray-400">React библиотека для анимаций</p>
                    </div>
                  </a>
                </div>
              </div>
            </motion.div>
          </main>
        </div>
      </section>
    </div>
  );
};

export default WebMotionDesign;