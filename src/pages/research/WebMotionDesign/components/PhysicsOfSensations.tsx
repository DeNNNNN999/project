import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Icon } from '@iconify/react';

const PhysicsOfSensations: React.FC = () => {
  const [volumeLevel, setVolumeLevel] = useState(5);
  const [showComparison, setShowComparison] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Кастомные стили для слайдера
  const sliderStyles = `
    .slider::-webkit-slider-thumb {
      appearance: none;
      width: 20px;
      height: 20px;
      background: #8b5cf6;
      cursor: pointer;
      border-radius: 50%;
      border: 2px solid #1f2937;
    }
    .slider::-moz-range-thumb {
      width: 20px;
      height: 20px;
      background: #8b5cf6;
      cursor: pointer;
      border-radius: 50%;
      border: 2px solid #1f2937;
    }
  `;

  // Визуализация ручки громкости
  const VolumeKnob = () => {
    const rotation = useTransform(
      useMotionValue(volumeLevel),
      [0, 10],
      [-135, 135]
    );

    return (
      <div className="relative h-64 mb-8">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            {/* Фон циферблата */}
            <div className="w-48 h-48 rounded-full bg-gradient-to-br from-slate-800 to-slate-900 shadow-2xl border border-slate-700">
              {/* Метки уровней */}
              <div className="absolute inset-0">
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => {
                  const angle = -135 + (num * 27);
                  const isActive = num <= volumeLevel;
                  return (
                    <div
                      key={num}
                      className="absolute w-full h-full"
                      style={{ transform: `rotate(${angle}deg)` }}
                    >
                      <div className={`absolute top-4 left-1/2 -translate-x-1/2 w-1 h-3 rounded-full transition-colors ${
                        isActive ? 'bg-purple-500' : 'bg-slate-600'
                      }`} />
                      <span className={`absolute top-8 left-1/2 -translate-x-1/2 text-xs font-medium transition-colors ${
                        isActive ? 'text-purple-400' : 'text-slate-500'
                      }`} style={{ transform: `rotate(${-angle}deg)` }}>
                        {num}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Центральная ручка */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                style={{ rotate: rotation }}
              >
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-600 to-purple-800 shadow-lg flex items-center justify-center">
                  <div className="w-4 h-16 bg-white/20 rounded-full" />
                </div>
              </motion.div>
            </div>

            {/* Подписи уровней */}
            <div className="absolute -bottom-2 -left-8 text-xs text-green-400 font-medium">0: Метафора</div>
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs text-purple-400 font-medium">5: Бренд</div>
            <div className="absolute -bottom-2 -right-8 text-xs text-pink-400 font-medium">10: Реализм</div>
          </div>
        </div>

        {/* Слайдер управления */}
        <div className="absolute bottom-0 left-0 right-0 px-8">
          <input
            type="range"
            min="0"
            max="10"
            value={volumeLevel}
            onChange={(e) => setVolumeLevel(Number(e.target.value))}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, #8b5cf6 0%, #8b5cf6 ${volumeLevel * 10}%, #475569 ${volumeLevel * 10}%, #475569 100%)`
            }}
          />
        </div>
      </div>
    );
  };

  // Демо удаления элемента
  const DeleteDemo = () => {
    const [items, setItems] = useState([1, 2, 3, 4, 5]);
    const [physicsMode, setPhysicsMode] = useState<'info' | 'realistic'>('info');

    const deleteItem = (id: number) => {
      setItems(items.filter(item => item !== id));
    };

    const resetItems = () => {
      setItems([1, 2, 3, 4, 5]);
    };

    return (
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Физика информации */}
        <div className="p-6 bg-green-900/20 rounded-lg border border-green-800/50">
          <h4 className="text-green-400 font-semibold mb-4 flex items-center gap-2">
            <Icon icon="ph:check-circle-fill" className="w-5 h-5" />
            Уровень 1-3: Физика Информации
          </h4>
          <div className="space-y-2 mb-4">
            <AnimatePresence>
              {items.map((item) => (
                <motion.div
                  key={`info-${item}`}
                  layout
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center justify-between p-3 bg-slate-800 rounded"
                >
                  <span className="text-gray-300">Элемент {item}</span>
                  <button
                    onClick={() => deleteItem(item)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <Icon icon="ph:trash" className="w-5 h-5" />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          <button
            onClick={resetItems}
            className="text-sm text-green-400 hover:text-green-300"
          >
            Восстановить элементы
          </button>
          <p className="text-sm text-gray-400 mt-3">
            ⏱️ 200ms • Чисто • Эффективно • "Этого больше нет"
          </p>
        </div>

        {/* Реалистичная физика */}
        <div className="p-6 bg-red-900/20 rounded-lg border border-red-800/50">
          <h4 className="text-red-400 font-semibold mb-4 flex items-center gap-2">
            <Icon icon="ph:x-circle-fill" className="w-5 h-5" />
            Уровень 8-10: Избыточный реализм
          </h4>
          <div className="space-y-2 mb-4 relative overflow-hidden h-[220px]">
            <AnimatePresence>
              {items.map((item, index) => (
                <motion.div
                  key={`real-${item}`}
                  initial={{ opacity: 0, x: -100, rotate: -180 }}
                  animate={{ 
                    opacity: 1, 
                    x: 0, 
                    rotate: 0,
                    y: index * 48
                  }}
                  exit={{ 
                    opacity: 0,
                    x: 300,
                    rotate: 720,
                    scale: 0.5,
                    transition: {
                      duration: 0.8,
                      type: "spring",
                      bounce: 0.5
                    }
                  }}
                  transition={{ 
                    type: "spring",
                    stiffness: 100,
                    damping: 15
                  }}
                  className="absolute left-0 right-0 flex items-center justify-between p-3 bg-slate-800 rounded"
                >
                  <span className="text-gray-300">Элемент {item}</span>
                  <button
                    onClick={() => deleteItem(item)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <Icon icon="ph:trash" className="w-5 h-5" />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          <button
            onClick={resetItems}
            className="text-sm text-red-400 hover:text-red-300"
          >
            Восстановить элементы
          </button>
          <p className="text-sm text-gray-400 mt-3">
            ⏱️ 800ms • Медленно • "Резиновый мячик" • Дешево
          </p>
        </div>
      </div>
    );
  };

  // Демо лайка с разными уровнями физики
  const LikePhysicsDemo = () => {
    const [level1Liked, setLevel1Liked] = useState(false);
    const [level5Liked, setLevel5Liked] = useState(false);
    const [level9Liked, setLevel9Liked] = useState(false);

    return (
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {/* Уровень 1-3 */}
        <div className="p-6 bg-slate-800/50 rounded-lg border border-slate-700">
          <h4 className="text-green-400 font-semibold mb-4">Уровень 1-3</h4>
          <div className="flex justify-center mb-4">
            <button
              onClick={() => setLevel1Liked(!level1Liked)}
              className="p-4"
            >
              <motion.div
                animate={{ 
                  scale: level1Liked ? 1 : 1,
                  color: level1Liked ? '#10b981' : '#6b7280'
                }}
                transition={{ duration: 0.1 }}
              >
                <Icon 
                  icon={level1Liked ? "ph:heart-fill" : "ph:heart"} 
                  className="w-8 h-8"
                />
              </motion.div>
            </button>
          </div>
          <p className="text-sm text-gray-400 text-center">
            Мгновенно • Утилитарно
          </p>
        </div>

        {/* Уровень 4-7 */}
        <div className="p-6 bg-purple-900/20 rounded-lg border border-purple-700/50">
          <h4 className="text-purple-400 font-semibold mb-4">Уровень 4-7</h4>
          <div className="flex justify-center mb-4">
            <button
              onClick={() => setLevel5Liked(!level5Liked)}
              className="p-4 relative"
            >
              <motion.div
                animate={level5Liked ? {
                  scale: [1, 0.8, 1.2, 1],
                } : {}}
                transition={{ 
                  duration: 0.4,
                  type: "spring",
                  stiffness: 300,
                  damping: 20
                }}
              >
                <Icon 
                  icon={level5Liked ? "ph:heart-fill" : "ph:heart"} 
                  className={`w-8 h-8 transition-colors ${
                    level5Liked ? 'text-purple-500' : 'text-gray-400'
                  }`}
                />
              </motion.div>
              {/* Микро-частицы */}
              <AnimatePresence>
                {level5Liked && (
                  <>
                    {[...Array(4)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute top-1/2 left-1/2 w-1 h-1 bg-purple-400 rounded-full"
                        initial={{ x: 0, y: 0, opacity: 1 }}
                        animate={{
                          x: Math.cos(i * 90 * Math.PI / 180) * 15,
                          y: Math.sin(i * 90 * Math.PI / 180) * 15,
                          opacity: 0
                        }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                      />
                    ))}
                  </>
                )}
              </AnimatePresence>
            </button>
          </div>
          <p className="text-sm text-gray-400 text-center">
            Выразительно • Бренд
          </p>
        </div>

        {/* Уровень 8-10 */}
        <div className="p-6 bg-pink-900/20 rounded-lg border border-pink-700/50">
          <h4 className="text-pink-400 font-semibold mb-4">Уровень 8-10</h4>
          <div className="flex justify-center mb-4">
            <button
              onClick={() => setLevel9Liked(!level9Liked)}
              className="p-4"
            >
              <motion.div
                animate={level9Liked ? {
                  scale: [1, 1.5, 0.5, 1.3, 0.8, 1.1, 0.9, 1],
                  rotate: [0, -30, 30, -15, 15, -5, 5, 0]
                } : {}}
                transition={{ 
                  duration: 1.2,
                  type: "spring",
                  bounce: 0.6
                }}
              >
                <Icon 
                  icon={level9Liked ? "ph:heart-fill" : "ph:heart"} 
                  className={`w-8 h-8 transition-colors ${
                    level9Liked ? 'text-pink-500' : 'text-gray-400'
                  }`}
                />
              </motion.div>
            </button>
          </div>
          <p className="text-sm text-gray-400 text-center">
            Избыточно • "Желе"
          </p>
        </div>
      </div>
    );
  };

  // Демо тактильной физики (Drag & Drop)
  const DragDropDemo = () => {
    const dragX = useMotionValue(0);
    const dragY = useMotionValue(0);
    const springX = useSpring(dragX, { stiffness: 300, damping: 30 });
    const springY = useSpring(dragY, { stiffness: 300, damping: 30 });

    return (
      <div className="p-6 bg-purple-900/20 rounded-lg border border-purple-700/50 mb-8">
        <h4 className="text-purple-400 font-semibold mb-4">
          Уровень 8-10: Тактильная физика (Drag & Drop)
        </h4>
        <div className="relative h-64 bg-slate-900 rounded-lg overflow-hidden">
          <motion.div
            drag
            dragConstraints={{
              top: -100,
              left: -100,
              right: 100,
              bottom: 100,
            }}
            dragElastic={0.2}
            whileDrag={{ scale: 1.1 }}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={() => setIsDragging(false)}
            style={{ x: springX, y: springY }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg shadow-xl cursor-grab active:cursor-grabbing flex items-center justify-center"
          >
            <Icon icon="ph:hand-grabbing" className="w-8 h-8 text-white" />
          </motion.div>
          
          {isDragging && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <p className="text-purple-300 text-sm">Чувствуете вес и инерцию?</p>
            </motion.div>
          )}
        </div>
        <p className="text-sm text-gray-400 mt-3">
          Попробуйте перетащить блок. Пружинная физика создает ощущение веса.
        </p>
      </div>
    );
  };

  // Pull-to-refresh демо
  const PullToRefreshDemo = () => {
    const [isRefreshing, setIsRefreshing] = useState(false);
    const pullY = useMotionValue(0);
    const pullProgress = useTransform(pullY, [0, 100], [0, 1]);
    const containerRef = useRef<HTMLDivElement>(null);

    return (
      <div className="p-6 bg-blue-900/20 rounded-lg border border-blue-700/50">
        <h4 className="text-blue-400 font-semibold mb-4">
          Pull-to-Refresh: Резиновая физика
        </h4>
        <div 
          ref={containerRef}
          className="relative h-64 bg-slate-900 rounded-lg overflow-hidden touch-pan-y"
        >
          <motion.div
            drag="y"
            dragConstraints={{ top: 0, bottom: 100 }}
            dragElastic={{ top: 0, bottom: 0.5 }}
            onDrag={(_, info) => {
              if (info.offset.y > 80 && !isRefreshing) {
                setIsRefreshing(true);
                setTimeout(() => {
                  setIsRefreshing(false);
                  pullY.set(0);
                }, 1500);
              }
            }}
            style={{ y: pullY }}
            className="h-full"
          >
            {/* Индикатор обновления */}
            <motion.div
              className="absolute top-4 left-1/2 -translate-x-1/2"
              style={{ 
                opacity: pullProgress,
                scale: pullProgress 
              }}
            >
              <motion.div
                animate={isRefreshing ? { rotate: 360 } : {}}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Icon icon="ph:arrow-clockwise" className="w-6 h-6 text-blue-400" />
              </motion.div>
            </motion.div>

            {/* Контент списка */}
            <div className="p-4 space-y-2">
              {[1, 2, 3, 4, 5].map((item) => (
                <div key={item} className="p-3 bg-slate-800 rounded">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-full" />
                    <div>
                      <div className="h-3 w-24 bg-slate-700 rounded mb-1" />
                      <div className="h-2 w-32 bg-slate-700/50 rounded" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
        <p className="text-sm text-gray-400 mt-3">
          Потяните список вниз. Эластичное сопротивление = тактильная обратная связь.
        </p>
      </div>
    );
  };

  return (
    <div className="prose prose-invert max-w-none">
      <style dangerouslySetInnerHTML={{ __html: sliderStyles }} />
      <h2 className="mb-8 text-3xl font-bold text-purple-400">
        Физика Ощущений — От Информации к Тактильности
      </h2>

      {/* Вступление */}
      <div className="p-6 mb-8 bg-orange-900/20 rounded-lg border border-orange-800/50">
        <p className="text-lg text-orange-300 mb-4">
          <Icon icon="ph:warning" className="inline w-6 h-6 mr-2" />
          <strong>Классическая ловушка:</strong> "Сделаем все максимально реалистичным!"
        </p>
        <p className="text-gray-300 mb-0">
          Мы все попадались. Часы на создание "отскакивающих" менюшек, чтобы понять — 
          в реальном продукте это ощущается <strong className="text-orange-400">медленно и дешево</strong>.
        </p>
      </div>

      {/* Главная идея */}
      <div className="p-6 mb-12 bg-purple-900/20 rounded-lg border border-purple-700/50">
        <h3 className="text-2xl font-semibold text-purple-400 mb-4 flex items-center gap-2">
          <Icon icon="ph:equalizer" className="w-8 h-8" />
          Главная Идея: Физика — это "Ручка Громкости"
        </h3>
        <p className="text-lg text-gray-200">
          Представьте не переключатель "ДА/НЕТ", а <strong className="text-purple-400">эквалайзер звукорежиссера</strong>. 
          На этой ручке — весь спектр физики в UI.
        </p>
      </div>

      {/* Визуализация ручки громкости */}
      <div className="mb-12">
        <h3 className="text-2xl font-semibold text-purple-300 mb-6 text-center">
          Крутите ручку физики
        </h3>
        <VolumeKnob />
        
        {/* Описание уровней */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`p-6 rounded-lg border transition-all ${
              volumeLevel <= 3 
                ? 'bg-green-900/20 border-green-800/50 shadow-green-900/50 shadow-lg'
                : 'bg-slate-800/50 border-slate-700'
            }`}
          >
            <h4 className="text-xl font-semibold text-green-400 mb-2">1-3: Физика Информации</h4>
            <p className="text-gray-300 text-sm">
              Утилитарное движение. Цель — передать смысл максимально быстро и чисто.
            </p>
            <div className="mt-3 space-y-1 text-xs text-gray-400">
              <p>• fade-out, slide-in</p>
              <p>• простые ease-кривые</p>
              <p>• 100-300ms</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`p-6 rounded-lg border transition-all ${
              volumeLevel >= 4 && volumeLevel <= 7
                ? 'bg-purple-900/20 border-purple-700/50 shadow-purple-900/50 shadow-lg'
                : 'bg-slate-800/50 border-slate-700'
            }`}
          >
            <h4 className="text-xl font-semibold text-purple-400 mb-2">4-7: Физика Бренда</h4>
            <p className="text-gray-300 text-sm">
              Органичное, упругое движение. Выражает характер продукта.
            </p>
            <div className="mt-3 space-y-1 text-xs text-gray-400">
              <p>• spring-физика</p>
              <p>• кастомные кривые Безье</p>
              <p>• 300-600ms</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className={`p-6 rounded-lg border transition-all ${
              volumeLevel >= 8
                ? 'bg-pink-900/20 border-pink-700/50 shadow-pink-900/50 shadow-lg'
                : 'bg-slate-800/50 border-slate-700'
            }`}
          >
            <h4 className="text-xl font-semibold text-pink-400 mb-2">8-10: Физика Тактильности</h4>
            <p className="text-gray-300 text-sm">
              Реалистичная имитация. Пользователь "трогает" пиксели.
            </p>
            <div className="mt-3 space-y-1 text-xs text-gray-400">
              <p>• инерция и вес</p>
              <p>• эластичность</p>
              <p>• momentum</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Примеры */}
      <div className="space-y-12 mb-12">
        <div>
          <h3 className="text-2xl font-semibold text-purple-300 mb-6">
            Кейс: Удаление элементов
          </h3>
          <DeleteDemo />
        </div>

        <div>
          <h3 className="text-2xl font-semibold text-purple-300 mb-6">
            Кейс: Эволюция лайка
          </h3>
          <LikePhysicsDemo />
        </div>

        <div>
          <h3 className="text-2xl font-semibold text-purple-300 mb-6">
            Прямая манипуляция объектами
          </h3>
          <DragDropDemo />
          <PullToRefreshDemo />
        </div>
      </div>

      {/* Контекстуальные правила */}
      <div className="mb-12">
        <h3 className="text-2xl font-semibold text-purple-300 mb-6">
          Когда и куда крутить ручку?
        </h3>
        
        <div className="space-y-6">
          {/* Уровень 1 */}
          <div className="p-6 bg-green-900/20 rounded-lg border border-green-800/50">
            <h4 className="text-xl font-semibold text-green-400 mb-3 flex items-center gap-2">
              <Icon icon="ph:gauge" className="w-6 h-6" />
              Уровень 1-3: Когда пользователь — ЗРИТЕЛЬ
            </h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-300 mb-2"><strong>Сценарии:</strong></p>
                <ul className="space-y-1 text-sm text-gray-400">
                  <li>• Навигация по ссылкам</li>
                  <li>• Появление уведомлений</li>
                  <li>• Отображение ошибок</li>
                  <li>• Удаление элементов</li>
                </ul>
              </div>
              <div>
                <p className="text-gray-300 mb-2"><strong>Почему:</strong></p>
                <p className="text-sm text-gray-400">
                  Цель — получить информацию быстро. Любая задержка на "физику" будет барьером.
                </p>
              </div>
            </div>
          </div>

          {/* Уровень 2 */}
          <div className="p-6 bg-purple-900/20 rounded-lg border border-purple-700/50">
            <h4 className="text-xl font-semibold text-purple-400 mb-3 flex items-center gap-2">
              <Icon icon="ph:sparkle" className="w-6 h-6" />
              Уровень 4-7: Когда нужен ХАРАКТЕР
            </h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-300 mb-2"><strong>Сценарии:</strong></p>
                <ul className="space-y-1 text-sm text-gray-400">
                  <li>• Фирменные взаимодействия</li>
                  <li>• Открытие панелей</li>
                  <li>• Лайки и реакции</li>
                  <li>• Раскрытие карточек</li>
                </ul>
              </div>
              <div>
                <p className="text-gray-300 mb-2"><strong>Почему:</strong></p>
                <p className="text-sm text-gray-400">
                  Баланс между скоростью и выразительностью. Создает "премиальное" ощущение.
                </p>
              </div>
            </div>
          </div>

          {/* Уровень 3 */}
          <div className="p-6 bg-pink-900/20 rounded-lg border border-pink-700/50">
            <h4 className="text-xl font-semibold text-pink-400 mb-3 flex items-center gap-2">
              <Icon icon="ph:hand" className="w-6 h-6" />
              Уровень 8-10: Когда пользователь — АКТЕР
            </h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-300 mb-2"><strong>Сценарии:</strong></p>
                <ul className="space-y-1 text-sm text-gray-400">
                  <li>• Pull-to-refresh</li>
                  <li>• Drag & Drop</li>
                  <li>• Momentum scrolling</li>
                  <li>• Жесты и свайпы</li>
                </ul>
              </div>
              <div>
                <p className="text-gray-300 mb-2"><strong>Почему:</strong></p>
                <p className="text-sm text-gray-400">
                  Мозг ожидает отклика, похожего на реальный мир. Без него интерфейс "мертвый".
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Финальный вердикт */}
      <div className="mt-12 p-8 bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-lg border border-purple-700/50">
        <h3 className="text-2xl font-bold text-purple-300 mb-6">
          Ваша новая ментальная модель
        </h3>
        
        <div className="p-4 bg-purple-800/20 rounded-lg mb-6">
          <p className="text-lg text-purple-200 font-medium mb-0">
            Забудьте про "физика — это хорошо/плохо". 
            <strong className="text-purple-400"> Физика — это инструмент с регулятором.</strong>
          </p>
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold text-purple-400 text-lg">
            Перед каждой анимацией спросите себя:
          </h4>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-blue-900/20 rounded-lg">
              <span className="text-blue-400 font-bold text-lg">1.</span>
              <div>
                <span className="font-medium text-blue-400">Какова природа взаимодействия?</span>
                <p className="text-gray-300 text-sm mt-1">
                  Пользователь — ЗРИТЕЛЬ или АКТЕР, манипулирующий сценой?
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 bg-purple-900/20 rounded-lg">
              <span className="text-purple-400 font-bold text-lg">2.</span>
              <div>
                <span className="font-medium text-purple-400">Какова наша цель?</span>
                <p className="text-gray-300 text-sm mt-1">
                  ИНФОРМИРОВАТЬ, выразить ХАРАКТЕР или дать ТАКТИЛЬНУЮ обратную связь?
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-yellow-900/20 rounded-lg border-l-4 border-yellow-500">
            <p className="text-gray-200">
              <Icon icon="ph:lightbulb" className="inline w-5 h-5 text-yellow-400 mr-2" />
              <strong className="text-yellow-400">Ирония:</strong> Создать простую "метафорическую" 
              анимацию, которая ощущается идеально, технически сложнее, чем включить готовый 
              физический движок.
            </p>
          </div>

          <p className="text-lg text-gray-200 italic text-center mt-8">
            Ваша задача — не симулировать реальность. <br/>
            <strong className="text-purple-400">Ваша задача — оркестрировать ощущения.</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PhysicsOfSensations;