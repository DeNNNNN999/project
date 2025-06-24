import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';

const ChoreographyArt: React.FC = () => {
  const [animationType, setAnimationType] = useState<'parallel' | 'sequential' | 'grouped'>('parallel');
  const [isAnimating, setIsAnimating] = useState(false);
  const [staggerDelay, setStaggerDelay] = useState(50);
  const [showModal, setShowModal] = useState(false);
  const [showCards, setShowCards] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [selectedTab, setSelectedTab] = useState<'profile' | 'settings' | 'history'>('profile');

  // Демо контент
  const contentItems = [
    { id: 1, title: 'Заголовок страницы', type: 'heading', icon: 'ph:text-h-one' },
    { id: 2, title: 'Подзаголовок с описанием', type: 'subheading', icon: 'ph:text-h-two' },
    { id: 3, title: 'Основная картинка', type: 'image', icon: 'ph:image' },
    { id: 4, title: 'Текстовый контент', type: 'text', icon: 'ph:article' },
    { id: 5, title: 'Кнопка действия', type: 'button', icon: 'ph:cursor-click' }
  ];

  const cardItems = [
    { id: 1, title: 'Карточка 1', color: 'bg-blue-500' },
    { id: 2, title: 'Карточка 2', color: 'bg-green-500' },
    { id: 3, title: 'Карточка 3', color: 'bg-purple-500' },
    { id: 4, title: 'Карточка 4', color: 'bg-pink-500' },
    { id: 5, title: 'Карточка 5', color: 'bg-yellow-500' },
    { id: 6, title: 'Карточка 6', color: 'bg-red-500' }
  ];

  // Основное демо
  const MainDemo = () => {
    const triggerAnimation = () => {
      setIsAnimating(false);
      setTimeout(() => setIsAnimating(true), 100);
    };

    const getAnimationProps = (index: number) => {
      switch (animationType) {
        case 'parallel':
          return {
            initial: { opacity: 0, y: 20, scale: 0.9 },
            animate: { opacity: 1, y: 0, scale: 1 },
            transition: { duration: 0.5, ease: "easeOut" }
          };
        case 'sequential':
          return {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { 
              duration: 0.3, 
              delay: index * (staggerDelay / 1000),
              ease: "easeOut"
            }
          };
        case 'grouped':
          // Группировка: заголовки вместе, потом контент
          const groupDelay = index < 2 ? 0 : 0.2;
          const itemDelay = index < 2 ? index * 0.1 : (index - 2) * 0.05;
          return {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { 
              duration: 0.3, 
              delay: groupDelay + itemDelay,
              ease: "easeOut"
            }
          };
      }
    };

    return (
      <div className="mb-12">
        <h3 className="text-2xl font-semibold text-purple-300 mb-6">
          Интерактивная демонстрация
        </h3>

        {/* Контролы */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setAnimationType('parallel')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                animationType === 'parallel'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
              }`}
            >
              <Icon icon="ph:equals" className="inline w-4 h-4 mr-2" />
              Параллельная
            </button>
            <button
              onClick={() => setAnimationType('sequential')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                animationType === 'sequential'
                  ? 'bg-green-600 text-white shadow-lg shadow-green-600/30'
                  : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
              }`}
            >
              <Icon icon="ph:list" className="inline w-4 h-4 mr-2" />
              Последовательная
            </button>
            <button
              onClick={() => setAnimationType('grouped')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                animationType === 'grouped'
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                  : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
              }`}
            >
              <Icon icon="ph:stack" className="inline w-4 h-4 mr-2" />
              Группировка
            </button>
          </div>

          {/* Настройка задержки для последовательной анимации */}
          {animationType === 'sequential' && (
            <div className="p-4 bg-slate-800/50 rounded-lg">
              <label className="block text-sm text-gray-400 mb-2">
                Задержка между элементами: {staggerDelay}ms
              </label>
              <input
                type="range"
                min="10"
                max="150"
                value={staggerDelay}
                onChange={(e) => setStaggerDelay(Number(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Быстро</span>
                <span>Медленно</span>
              </div>
            </div>
          )}
        </div>

        {/* Демо контейнер */}
        <div className="relative">
          <div className="p-8 bg-slate-900 rounded-lg border border-slate-700 min-h-[400px]">
            <AnimatePresence mode="wait">
              {isAnimating && (
                <div className="space-y-4">
                  {contentItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      {...getAnimationProps(index)}
                      className={`p-4 bg-slate-800 rounded-lg border border-slate-700 ${
                        item.type === 'heading' ? 'text-2xl font-bold text-white' :
                        item.type === 'subheading' ? 'text-lg text-gray-300' :
                        item.type === 'image' ? 'h-32 bg-gradient-to-br from-purple-500 to-pink-500' :
                        item.type === 'text' ? 'text-gray-400' :
                        'inline-block px-6 py-3 bg-purple-600 text-white rounded-lg'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon icon={item.icon} className="w-6 h-6" />
                        <span>{item.title}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </AnimatePresence>

            {!isAnimating && (
              <div className="flex items-center justify-center h-full">
                <button
                  onClick={triggerAnimation}
                  className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
                >
                  <Icon icon="ph:play" className="w-5 h-5" />
                  Запустить анимацию
                </button>
              </div>
            )}
          </div>

          {/* Таймлайн визуализация */}
          {isAnimating && (
            <div className="mt-4 p-4 bg-slate-800/50 rounded-lg">
              <h4 className="text-sm text-gray-400 mb-2">Временная шкала анимации:</h4>
              <div className="relative h-16">
                {contentItems.map((item, index) => {
                  const props = getAnimationProps(index);
                  const delay = props.transition.delay || 0;
                  const duration = props.transition.duration || 0.5;
                  const start = delay * 100;
                  const width = duration * 100;

                  return (
                    <motion.div
                      key={item.id}
                      className="absolute h-2 bg-purple-500 rounded"
                      style={{
                        top: `${index * 10}px`,
                        left: `${start}px`,
                        width: `${width}px`
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay }}
                    />
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Демо модального окна
  const ModalDemo = () => {
    return (
      <div className="mb-8">
        <h4 className="text-xl font-semibold text-purple-300 mb-4">
          Пример 1: Модальное окно (Параллельная анимация)
        </h4>
        
        <button
          onClick={() => setShowModal(true)}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          Открыть модальное окно
        </button>

        <AnimatePresence>
          {showModal && (
            <>
              {/* Оверлей */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-black/50 z-40"
                onClick={() => setShowModal(false)}
              />
              
              {/* Модальное окно */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-slate-800 rounded-lg shadow-xl z-50 p-6"
              >
                <motion.h3
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="text-xl font-semibold text-white mb-4"
                >
                  Параллельная анимация
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="text-gray-300 mb-6"
                >
                  Все элементы модального окна появляются одновременно, создавая ощущение целостности и стабильности.
                </motion.p>
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded transition-colors"
                >
                  Закрыть
                </motion.button>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <p className="text-sm text-gray-400 mt-4">
          💡 Модальное окно появляется как единое целое — оверлей, контейнер и контент анимируются параллельно
        </p>
      </div>
    );
  };

  // Демо списка карточек
  const CardsDemo = () => {
    return (
      <div className="mb-8">
        <h4 className="text-xl font-semibold text-purple-300 mb-4">
          Пример 2: Список карточек (Последовательная анимация)
        </h4>
        
        <button
          onClick={() => setShowCards(!showCards)}
          className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors mb-4"
        >
          {showCards ? 'Скрыть' : 'Показать'} карточки
        </button>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <AnimatePresence>
            {showCards && cardItems.map((card, index) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.8 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.05,
                  ease: "easeOut"
                }}
                className={`${card.color} p-6 rounded-lg text-white text-center`}
              >
                <div className="text-2xl font-bold mb-2">{card.title}</div>
                <div className="text-sm opacity-80">Контент карточки</div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <p className="text-sm text-gray-400 mt-4">
          💡 Карточки появляются последовательно с эффектом "домино", направляя взгляд слева направо и сверху вниз
        </p>
      </div>
    );
  };

  // Демо дашборда с группировкой
  const DashboardDemo = () => {
    const dashboardSections = [
      {
        id: 'header',
        title: 'Панель управления',
        type: 'header',
        delay: 0
      },
      {
        id: 'stats',
        title: 'Статистика',
        items: [
          { label: 'Посетители', value: '1,234', color: 'blue' },
          { label: 'Продажи', value: '$5,678', color: 'green' },
          { label: 'Конверсия', value: '3.4%', color: 'purple' }
        ],
        delay: 0.2
      },
      {
        id: 'chart',
        title: 'График активности',
        type: 'chart',
        delay: 0.4
      },
      {
        id: 'recent',
        title: 'Последние действия',
        items: ['Действие 1', 'Действие 2', 'Действие 3'],
        delay: 0.6
      }
    ];

    return (
      <div className="mb-8">
        <h4 className="text-xl font-semibold text-purple-300 mb-4">
          Пример 3: Дашборд (Группировка)
        </h4>
        
        <button
          onClick={() => setShowDashboard(!showDashboard)}
          className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors mb-4"
        >
          {showDashboard ? 'Скрыть' : 'Показать'} дашборд
        </button>

        <div className="bg-slate-900 rounded-lg p-6 border border-slate-700">
          <AnimatePresence>
            {showDashboard && (
              <div className="space-y-6">
                {/* Заголовок */}
                <motion.h2
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, delay: 0 }}
                  className="text-2xl font-bold text-white"
                >
                  Панель управления
                </motion.h2>

                {/* Статистика - группа 1 */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="grid grid-cols-3 gap-4"
                >
                  {[
                    { label: 'Посетители', value: '1,234', color: 'bg-blue-500' },
                    { label: 'Продажи', value: '$5,678', color: 'bg-green-500' },
                    { label: 'Конверсия', value: '3.4%', color: 'bg-purple-500' }
                  ].map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ 
                        duration: 0.3, 
                        delay: 0.2 + index * 0.05,
                        ease: "easeOut"
                      }}
                      className="p-4 bg-slate-800 rounded-lg border border-slate-700"
                    >
                      <div className="text-sm text-gray-400">{stat.label}</div>
                      <div className={`text-2xl font-bold text-white mt-1`}>{stat.value}</div>
                      <div className={`h-1 ${stat.color} rounded mt-3`} />
                    </motion.div>
                  ))}
                </motion.div>

                {/* График - группа 2 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                  className="h-48 bg-slate-800 rounded-lg border border-slate-700 p-4"
                >
                  <div className="text-gray-400 mb-3">График активности</div>
                  <div className="h-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded flex items-center justify-center">
                    <Icon icon="ph:chart-line" className="w-16 h-16 text-purple-400" />
                  </div>
                </motion.div>

                {/* Последние действия - группа 3 */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, delay: 0.6 }}
                  className="bg-slate-800 rounded-lg border border-slate-700 p-4"
                >
                  <div className="text-gray-400 mb-3">Последние действия</div>
                  <div className="space-y-2">
                    {['Пользователь зарегистрировался', 'Новый заказ #1234', 'Обновление статуса'].map((action, index) => (
                      <motion.div
                        key={action}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ 
                          duration: 0.2, 
                          delay: 0.6 + index * 0.05 
                        }}
                        className="p-2 bg-slate-900 rounded text-sm text-gray-300"
                      >
                        {action}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </div>

        <p className="text-sm text-gray-400 mt-4">
          💡 Элементы сгруппированы по смыслу: сначала заголовок, затем статистика (параллельно), потом график, и в конце список действий
        </p>
      </div>
    );
  };

  // Визуализация подходов
  const ApproachesVisualization = () => {
    return (
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {/* Параллельная анимация */}
        <div className="p-6 bg-blue-900/20 rounded-lg border border-blue-800/50">
          <h4 className="text-blue-400 font-semibold mb-4 flex items-center gap-2">
            <Icon icon="ph:equals" className="w-5 h-5" />
            Подход 1: "Большой Взрыв"
          </h4>
          
          <div className="space-y-3 mb-4">
            <div className="flex items-center gap-3">
              <Icon icon="ph:package" className="w-5 h-5 text-blue-400" />
              <span className="text-gray-300">Все элементы одновременно</span>
            </div>
            <div className="flex items-center gap-3">
              <Icon icon="ph:eye" className="w-5 h-5 text-blue-400" />
              <span className="text-gray-300">Восприятие как единое целое</span>
            </div>
            <div className="flex items-center gap-3">
              <Icon icon="ph:shield-check" className="w-5 h-5 text-blue-400" />
              <span className="text-gray-300">Стабильность и уверенность</span>
            </div>
          </div>

          <div className="p-4 bg-blue-800/20 rounded">
            <p className="text-sm text-blue-300">
              <strong>Аналогия:</strong> Вы распахиваете двери в новый зал. 
              Вы видите всю сцену целиком в один момент.
            </p>
          </div>
        </div>

        {/* Последовательная анимация */}
        <div className="p-6 bg-green-900/20 rounded-lg border border-green-800/50">
          <h4 className="text-green-400 font-semibold mb-4 flex items-center gap-2">
            <Icon icon="ph:list" className="w-5 h-5" />
            Подход 2: "Эффект Домино"
          </h4>
          
          <div className="space-y-3 mb-4">
            <div className="flex items-center gap-3">
              <Icon icon="ph:arrow-right" className="w-5 h-5 text-green-400" />
              <span className="text-gray-300">Элементы по очереди</span>
            </div>
            <div className="flex items-center gap-3">
              <Icon icon="ph:path" className="w-5 h-5 text-green-400" />
              <span className="text-gray-300">Направление взгляда</span>
            </div>
            <div className="flex items-center gap-3">
              <Icon icon="ph:sparkle" className="w-5 h-5 text-green-400" />
              <span className="text-gray-300">Легкость и элегантность</span>
            </div>
          </div>

          <div className="p-4 bg-green-800/20 rounded">
            <p className="text-sm text-green-300">
              <strong>Аналогия:</strong> Карты, которые раскладывают на столе одна за другой. 
              Наш взгляд невольно следует за движением.
            </p>
          </div>
        </div>
      </div>
    );
  };

  // Ловушки и советы
  const PitfallsSection = () => {
    return (
      <div className="mb-12">
        <h3 className="text-2xl font-semibold text-purple-300 mb-6">
          Ловушки и Компромиссы
        </h3>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 bg-red-900/20 rounded-lg border border-red-800/50">
            <h4 className="text-red-400 font-semibold mb-3 flex items-center gap-2">
              <Icon icon="ph:warning" className="w-5 h-5" />
              Ловушка "Параллельности"
            </h4>
            <p className="text-gray-300 mb-3">
              Если на экране много сложных элементов, их одновременное появление может создать 
              ощущение хаоса и визуальной перегрузки.
            </p>
            <div className="p-3 bg-red-800/20 rounded text-sm">
              <p className="text-red-300">
                <strong>Решение:</strong> Используйте параллельную анимацию только для простых, 
                связанных элементов или когда их немного.
              </p>
            </div>
          </div>

          <div className="p-6 bg-orange-900/20 rounded-lg border border-orange-800/50">
            <h4 className="text-orange-400 font-semibold mb-3 flex items-center gap-2">
              <Icon icon="ph:warning" className="w-5 h-5" />
              Ловушка "Последовательности"
            </h4>
            <p className="text-gray-300 mb-3">
              Если задержка между элементами слишком большая, анимация будет ощущаться медленной 
              и затянутой. Пользователь уже готов взаимодействовать, но вынужден ждать.
            </p>
            <div className="p-3 bg-orange-800/20 rounded text-sm">
              <p className="text-orange-300">
                <strong>Решение:</strong> Общая длительность последовательной анимации не должна 
                превышать 300-500мс. Задержка между элементами: 30-75мс.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="prose prose-invert max-w-none">
      <h2 className="mb-8 text-3xl font-bold text-purple-400">
        Искусство Хореографии — Параллельная vs. Последовательная Анимация
      </h2>

      {/* Вступление */}
      <div className="p-6 mb-8 bg-yellow-900/20 rounded-lg border border-yellow-800/50">
        <p className="text-lg text-yellow-300 mb-4">
          <Icon icon="ph:users-three" className="inline w-6 h-6 mr-2" />
          Когда на экране должен измениться не один, а сразу несколько элементов — заголовок, картинка, 
          текст, кнопка — перед нами встает выбор, который фундаментально меняет восприятие всего экрана.
        </p>
        <p className="text-gray-300 mb-0">
          <strong className="text-orange-400">Исходное заблуждение:</strong> Главное, чтобы все элементы 
          красиво появились. Можно просто анимировать весь контейнер целиком.
        </p>
      </div>

      {/* Главная идея */}
      <div className="p-6 mb-12 bg-purple-900/20 rounded-lg border border-purple-700/50">
        <h3 className="text-2xl font-semibold text-purple-400 mb-4">
          Новая идея: Хореография — это инструмент повествования
        </h3>
        <p className="text-lg text-gray-200">
          Хореография появления элементов — это мощнейший инструмент повествования. 
          Выбор между параллельным и последовательным подходом — это выбор того, 
          <strong className="text-purple-400"> что мы хотим, чтобы пользователь увидел и понял в первую очередь</strong>.
        </p>
      </div>

      {/* Визуализация подходов */}
      <ApproachesVisualization />

      {/* Основное демо */}
      <MainDemo />

      {/* Примеры использования */}
      <div className="mb-12">
        <h3 className="text-2xl font-semibold text-purple-300 mb-6">
          Практические примеры
        </h3>
        
        <ModalDemo />
        <CardsDemo />
        <DashboardDemo />
      </div>

      {/* Ловушки */}
      <PitfallsSection />

      {/* Финальный вердикт */}
      <div className="mt-12 p-8 bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-lg border border-purple-700/50">
        <h3 className="text-2xl font-bold text-purple-300 mb-6">
          Вердикт: Ваша Новая Ментальная Модель
        </h3>
        
        <div className="p-4 bg-purple-800/20 rounded-lg mb-6">
          <p className="text-lg text-purple-200 font-medium mb-0">
            Перестаньте думать об анимации экрана как об анимации одного контейнера.<br/>
            <strong className="text-purple-400">Думайте как режиссер-постановщик.</strong>
          </p>
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold text-purple-400 text-lg">
            Задайте себе ключевой вопрос: "Какова визуальная история этого экрана?"
          </h4>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-900/20 rounded-lg border border-blue-800/50">
              <p className="font-medium text-blue-400 mb-2">
                "Я хочу, чтобы он увидел все сразу, как единое целое."
              </p>
              <ul className="space-y-1 text-sm text-gray-300">
                <li>→ Ваш выбор: Параллельная анимация</li>
                <li>→ Ваша цель: Стабильность и целостность</li>
                <li>→ Используйте для: модалок, виджетов, табов</li>
              </ul>
            </div>
            
            <div className="p-4 bg-green-900/20 rounded-lg border border-green-800/50">
              <p className="font-medium text-green-400 mb-2">
                "Я хочу провести его взгляд от А к Б и показать иерархию."
              </p>
              <ul className="space-y-1 text-sm text-gray-300">
                <li>→ Ваш выбор: Последовательная анимация</li>
                <li>→ Ваша цель: Направление внимания</li>
                <li>→ Используйте для: списков, сложных экранов</li>
              </ul>
            </div>
          </div>

          <p className="text-lg text-gray-200 italic text-center mt-8">
            Освоив эту хореографию, вы начнете не просто показывать экраны,<br/>
            а <strong className="text-purple-400">рассказывать визуальные микро-истории</strong>,<br/>
            которые делают ваш интерфейс интуитивно понятным на самом глубоком уровне.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChoreographyArt;
