import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';

const DisneyPrinciplesVsDigital: React.FC = () => {
  const [activeExample, setActiveExample] = useState<string>('');
  const [showDisneyPrinciples, setShowDisneyPrinciples] = useState(false);

  // Демо: Squash & Stretch
  const SquashStretchDemo = () => {
    const [isPressed, setIsPressed] = useState(false);
    const [badPressed, setBadPressed] = useState(false);

    return (
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Плохой пример - Disney стиль */}
        <div className="p-6 bg-red-900/20 rounded-lg border border-red-800/50">
          <h4 className="text-red-400 font-semibold mb-4 flex items-center gap-2">
            <Icon icon="ph:x-circle-fill" className="w-5 h-5" />
            Неправильно: Disney-стиль в UI
          </h4>
          <div className="flex items-center justify-center h-32">
            <motion.button
              onMouseDown={() => setBadPressed(true)}
              onMouseUp={() => setBadPressed(false)}
              onMouseLeave={() => setBadPressed(false)}
              animate={{
                scaleX: badPressed ? 1.3 : 1,
                scaleY: badPressed ? 0.7 : 1,
              }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 10,
                duration: 0.5
              }}
              className="px-8 py-4 bg-red-600 text-white rounded-lg font-medium shadow-lg"
            >
              Нажми меня
            </motion.button>
          </div>
          <div className="mt-4 p-3 bg-red-950/30 rounded text-sm">
            <p className="text-red-300 mb-2">⏱️ Анимация: ~500мс</p>
            <p className="text-gray-400">
              Кнопка ведет себя как желе. Пользователь ждет, пока она "отпружинит"
            </p>
          </div>
        </div>

        {/* Хороший пример - Цифровой подход */}
        <div className="p-6 bg-green-900/20 rounded-lg border border-green-800/50">
          <h4 className="text-green-400 font-semibold mb-4 flex items-center gap-2">
            <Icon icon="ph:check-circle-fill" className="w-5 h-5" />
            Правильно: Адаптация для UI
          </h4>
          <div className="flex items-center justify-center h-32">
            <motion.button
              onMouseDown={() => setIsPressed(true)}
              onMouseUp={() => setIsPressed(false)}
              onMouseLeave={() => setIsPressed(false)}
              animate={{
                scale: isPressed ? 0.98 : 1,
              }}
              transition={{
                duration: 0.1,
                ease: "easeOut"
              }}
              className="px-8 py-4 bg-green-600 text-white rounded-lg font-medium shadow-lg hover:bg-green-700"
            >
              Нажми меня
            </motion.button>
          </div>
          <div className="mt-4 p-3 bg-green-950/30 rounded text-sm">
            <p className="text-green-300 mb-2">⏱️ Анимация: ~100мс</p>
            <p className="text-gray-400">
              Мгновенный тактильный отклик. Пользователь чувствует, а не видит
            </p>
          </div>
        </div>
      </div>
    );
  };

  // Демо: Anticipation
  const AnticipationDemo = () => {
    const [showModal, setShowModal] = useState(false);
    const [showBadModal, setShowBadModal] = useState(false);

    return (
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Плохой пример */}
        <div className="p-6 bg-red-900/20 rounded-lg border border-red-800/50">
          <h4 className="text-red-400 font-semibold mb-4 flex items-center gap-2">
            <Icon icon="ph:x-circle-fill" className="w-5 h-5" />
            Неправильно: Буквальная подготовка
          </h4>
          <div className="relative h-48 bg-slate-900 rounded overflow-hidden">
            <button
              onClick={() => setShowBadModal(true)}
              className="absolute top-4 left-4 px-4 py-2 bg-red-600 text-white rounded"
            >
              Открыть модалку
            </button>

            <AnimatePresence>
              {showBadModal && (
                <motion.div
                  initial={{ scale: 1.2, opacity: 0 }}
                  animate={{ scale: [1.2, 0.9, 1], opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0 flex items-center justify-center"
                  onClick={() => setShowBadModal(false)}
                >
                  <div className="bg-white text-black p-6 rounded-lg shadow-xl">
                    <p>Модалка с "замахом"</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <p className="text-sm text-gray-400 mt-3">
            Лишнее движение добавляет задержку
          </p>
        </div>

        {/* Хороший пример */}
        <div className="p-6 bg-green-900/20 rounded-lg border border-green-800/50">
          <h4 className="text-green-400 font-semibold mb-4 flex items-center gap-2">
            <Icon icon="ph:check-circle-fill" className="w-5 h-5" />
            Правильно: Hover как подготовка
          </h4>
          <div className="relative h-48 bg-slate-900 rounded overflow-hidden">
            <motion.button
              onClick={() => setShowModal(true)}
              className="absolute top-4 left-4 px-4 py-2 bg-green-600 text-white rounded transition-all"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 4px 20px rgba(34, 197, 94, 0.4)"
              }}
              transition={{ duration: 0.2 }}
            >
              Открыть модалку
            </motion.button>

            <AnimatePresence>
              {showModal && (
                <>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 bg-black/50"
                    onClick={() => setShowModal(false)}
                  />
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  >
                    <div className="bg-white text-black p-6 rounded-lg shadow-xl pointer-events-auto">
                      <p>Быстрая и чистая модалка</p>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
          <p className="text-sm text-gray-400 mt-3">
            Hover подготавливает к действию
          </p>
        </div>
      </div>
    );
  };

  // Демо: Staging
  const StagingDemo = () => {
    const [showItems, setShowItems] = useState(false);
    const [showBadItems, setShowBadItems] = useState(false);

    const items = ['Элемент 1', 'Элемент 2', 'Элемент 3', 'Элемент 4'];

    return (
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Плохой пример */}
        <div className="p-6 bg-red-900/20 rounded-lg border border-red-800/50">
          <h4 className="text-red-400 font-semibold mb-4 flex items-center gap-2">
            <Icon icon="ph:x-circle-fill" className="w-5 h-5" />
            Неправильно: Хаотичная анимация
          </h4>
          <button
            onClick={() => setShowBadItems(!showBadItems)}
            className="mb-4 px-4 py-2 bg-red-600 text-white rounded"
          >
            Показать элементы
          </button>
          <div className="space-y-2">
            <AnimatePresence>
              {showBadItems && items.map((item, index) => (
                <motion.div
                  key={item}
                  initial={{
                    opacity: 0,
                    x: index % 2 === 0 ? -100 : 100,
                    rotate: Math.random() * 30 - 15
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    rotate: 0
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.5,
                    rotate: Math.random() * 30 - 15
                  }}
                  transition={{ duration: 0.5 }}
                  className="p-3 bg-red-800/30 rounded"
                >
                  {item}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          <p className="text-sm text-gray-400 mt-3">
            Все движется одновременно в разные стороны
          </p>
        </div>

        {/* Хороший пример */}
        <div className="p-6 bg-green-900/20 rounded-lg border border-green-800/50">
          <h4 className="text-green-400 font-semibold mb-4 flex items-center gap-2">
            <Icon icon="ph:check-circle-fill" className="w-5 h-5" />
            Правильно: Последовательная хореография
          </h4>
          <button
            onClick={() => setShowItems(!showItems)}
            className="mb-4 px-4 py-2 bg-green-600 text-white rounded"
          >
            Показать элементы
          </button>
          <div className="space-y-2">
            <AnimatePresence>
              {showItems && items.map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.05,
                    ease: "easeOut"
                  }}
                  className="p-3 bg-green-800/30 rounded"
                >
                  {item}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          <p className="text-sm text-gray-400 mt-3">
            Элементы появляются последовательно сверху вниз
          </p>
        </div>
      </div>
    );
  };

  // 12 принципов Disney
  const disneyPrinciples = [
    {
      name: "Squash & Stretch",
      icon: "ph:arrows-in-simple",
      description: "Деформация для передачи веса и гибкости"
    },
    {
      name: "Anticipation",
      icon: "ph:arrow-bend-left-down",
      description: "Подготовка к действию"
    },
    {
      name: "Staging",
      icon: "ph:spotlight",
      description: "Фокус внимания на главном"
    },
    {
      name: "Straight Ahead & Pose to Pose",
      icon: "ph:dots-three-outline",
      description: "Методы создания анимации"
    },
    {
      name: "Follow Through & Overlapping",
      icon: "ph:wind",
      description: "Инерция движения"
    },
    {
      name: "Slow In & Slow Out",
      icon: "ph:graph",
      description: "Ускорение и замедление"
    },
    {
      name: "Arc",
      icon: "ph:path",
      description: "Движение по дуге"
    },
    {
      name: "Secondary Action",
      icon: "ph:sparkle",
      description: "Вторичные действия"
    },
    {
      name: "Timing",
      icon: "ph:timer",
      description: "Скорость движения"
    },
    {
      name: "Exaggeration",
      icon: "ph:magnifying-glass-plus",
      description: "Преувеличение для выразительности"
    },
    {
      name: "Solid Drawing",
      icon: "ph:cube",
      description: "Объем и вес"
    },
    {
      name: "Appeal",
      icon: "ph:star",
      description: "Привлекательность"
    }
  ];

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        {/* Заголовок темы */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-purple-400 mb-4">
            Принципы Анимации Disney vs. Современные Цифровые Принципы
          </h2>

          <div className="p-6 bg-orange-900/20 rounded-lg border border-orange-800/50 mb-6">
            <p className="text-lg text-orange-300">
              ⚠️ <strong>Критическое заблуждение:</strong> Слепое применение принципов Disney в UI/UX
              ломает сам смысл взаимодействия.
            </p>
          </div>

          {/* Контекст сравнения */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="p-6 bg-indigo-900/20 rounded-lg border border-indigo-700/50">
              <h3 className="text-xl font-semibold text-indigo-400 mb-3 flex items-center gap-2">
                <Icon icon="ph:film-strip" className="w-6 h-6" />
                Disney Контекст
              </h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start gap-2">
                  <Icon icon="ph:monitor" className="w-5 h-5 mt-0.5 text-indigo-400" />
                  <span><strong>Среда:</strong> Неинтерактивный киноэкран</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon icon="ph:pencil" className="w-5 h-5 mt-0.5 text-indigo-400" />
                  <span><strong>Материал:</strong> Рисунки, сделанные вручную</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon icon="ph:magic-wand" className="w-5 h-5 mt-0.5 text-indigo-400" />
                  <span><strong>Цель:</strong> Иллюзия жизни, театральность</span>
                </li>
              </ul>
            </div>

            <div className="p-6 bg-purple-900/20 rounded-lg border border-purple-700/50">
              <h3 className="text-xl font-semibold text-purple-400 mb-3 flex items-center gap-2">
                <Icon icon="ph:devices" className="w-6 h-6" />
                Digital/UI Контекст
              </h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start gap-2">
                  <Icon icon="ph:cursor-click" className="w-5 h-5 mt-0.5 text-purple-400" />
                  <span><strong>Среда:</strong> Интерактивный экран</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon icon="ph:squares-four" className="w-5 h-5 mt-0.5 text-purple-400" />
                  <span><strong>Материал:</strong> Цифровые элементы UI</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon icon="ph:rocket" className="w-5 h-5 mt-0.5 text-purple-400" />
                  <span><strong>Цель:</strong> Функциональность, эффективность</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Демонстрации принципов */}
        <div className="space-y-12">
          <div>
            <h3 className="text-2xl font-semibold text-purple-300 mb-6">
              Принцип 1: Сжатие и Растяжение (Squash & Stretch)
            </h3>
            <SquashStretchDemo />
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-purple-300 mb-6">
              Принцип 2: Подготовка (Anticipation)
            </h3>
            <AnticipationDemo />
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-purple-300 mb-6">
              Принцип 3: Постановка (Staging)
            </h3>
            <StagingDemo />
          </div>
        </div>

        {/* 12 принципов Disney */}
        <div className="mt-12">
          <button
            onClick={() => setShowDisneyPrinciples(!showDisneyPrinciples)}
            className="mb-6 px-6 py-3 bg-purple-600 text-white rounded-lg flex items-center gap-2 hover:bg-purple-700 transition-colors"
          >
            <Icon icon="ph:list" className="w-5 h-5" />
            {showDisneyPrinciples ? 'Скрыть' : 'Показать'} все 12 принципов Disney
          </button>

          <AnimatePresence>
            {showDisneyPrinciples && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="grid md:grid-cols-3 gap-4"
              >
                {disneyPrinciples.map((principle, index) => (
                  <motion.div
                    key={principle.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="p-4 bg-slate-800/50 rounded-lg border border-slate-700"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-purple-600/20 rounded">
                        <Icon icon={principle.icon} className="w-5 h-5 text-purple-400" />
                      </div>
                      <h4 className="font-medium text-white">{index + 1}. {principle.name}</h4>
                    </div>
                    <p className="text-sm text-gray-400">{principle.description}</p>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Итог */}
        <div className="mt-12 p-8 bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-lg border border-purple-700/50">
          <h3 className="text-2xl font-bold text-purple-300 mb-4">
            Итог
          </h3>

          <div className="space-y-4">
            <p className="text-lg text-gray-200">
              <strong className="text-purple-400">Не применяй принципы. Адаптируй их намерения.</strong>
            </p>

            <p className="text-gray-300">
              12 принципов анимации — это не чек-лист и не набор эффектов.
              Это набор решений для проблем рисованной анимации.
            </p>

            <div className="mt-6 p-4 bg-purple-800/20 rounded-lg border-l-4 border-purple-500">
              <h4 className="font-semibold text-purple-400 mb-3">
                Инженерные вопросы перед анимацией:
              </h4>
              <ol className="space-y-2 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 font-bold">1.</span>
                  Какую задачу решает это движение?
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 font-bold">2.</span>
                  Какова минимально достаточная длительность?
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 font-bold">3.</span>
                  Не противоречит ли движение отзывчивости?
                </li>
              </ol>
            </div>

            <p className="text-lg text-gray-200 italic mt-6">
              Хороший UI-моушн — это <strong className="text-purple-400">почти невидимый моушн</strong>.
              Его не замечают, но его отсутствие делает интерфейс "мертвым".
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DisneyPrinciplesVsDigital;
