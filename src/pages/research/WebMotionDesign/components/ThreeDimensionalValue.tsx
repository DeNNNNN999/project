import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';

const ThreeDimensionalValue: React.FC = () => {
  const [activeAxis, setActiveAxis] = useState<'x' | 'y' | 'z' | null>(null);
  const [showContextDemo, setShowContextDemo] = useState(false);
  const [currentContext, setCurrentContext] = useState<'browsing' | 'task' | 'celebrating'>('browsing');

  // 3D модель визуализация
  const ThreeDModel = () => {
    return (
      <div className="relative h-80 mb-8">
        <div className="absolute inset-0 flex items-center justify-center">
          {/* 3D оси */}
          <svg viewBox="0 0 400 400" className="w-full h-full max-w-md">
            {/* Ось X - Функциональная полезность */}
            <motion.line
              x1="50" y1="200" x2="200" y2="200"
              stroke="#10b981"
              strokeWidth="3"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="cursor-pointer"
              onMouseEnter={() => setActiveAxis('x')}
              onMouseLeave={() => setActiveAxis(null)}
            />
            <motion.text
              x="220" y="205"
              fill="#10b981"
              className="text-sm font-semibold cursor-pointer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              onMouseEnter={() => setActiveAxis('x')}
              onMouseLeave={() => setActiveAxis(null)}
            >
              X: Utility
            </motion.text>

            {/* Ось Y - Эмоциональный резонанс */}
            <motion.line
              x1="50" y1="200" x2="50" y2="50"
              stroke="#ec4899"
              strokeWidth="3"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
              className="cursor-pointer"
              onMouseEnter={() => setActiveAxis('y')}
              onMouseLeave={() => setActiveAxis(null)}
            />
            <motion.text
              x="10" y="40"
              fill="#ec4899"
              className="text-sm font-semibold cursor-pointer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              onMouseEnter={() => setActiveAxis('y')}
              onMouseLeave={() => setActiveAxis(null)}
            >
              Y: Emotion
            </motion.text>

            {/* Ось Z - Контекст */}
            <motion.line
              x1="50" y1="200" x2="150" y2="150"
              stroke="#8b5cf6"
              strokeWidth="3"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
              className="cursor-pointer"
              onMouseEnter={() => setActiveAxis('z')}
              onMouseLeave={() => setActiveAxis(null)}
            />
            <motion.text
              x="160" y="145"
              fill="#8b5cf6"
              className="text-sm font-semibold cursor-pointer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              onMouseEnter={() => setActiveAxis('z')}
              onMouseLeave={() => setActiveAxis(null)}
            >
              Z: Context
            </motion.text>

            {/* Центральная точка оптимального баланса */}
            <motion.circle
              cx="100" cy="125"
              r="8"
              fill="#fbbf24"
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ duration: 0.5, delay: 1.5 }}
            />
            <motion.text
              x="115" y="130"
              fill="#fbbf24"
              className="text-xs font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
            >
              Оптимальный баланс
            </motion.text>
          </svg>
        </div>

        {/* Подсказки при наведении */}
        <AnimatePresence>
          {activeAxis && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className={`absolute bottom-0 left-0 right-0 p-4 rounded-lg border ${
                activeAxis === 'x' ? 'bg-green-900/20 border-green-800/50' :
                activeAxis === 'y' ? 'bg-pink-900/20 border-pink-800/50' :
                'bg-purple-900/20 border-purple-800/50'
              }`}
            >
              {activeAxis === 'x' && (
                <div>
                  <h4 className="font-semibold text-green-400 mb-1">Функциональная полезность</h4>
                  <p className="text-sm text-gray-300">Помогает ли анимация выполнить задачу быстрее и проще?</p>
                </div>
              )}
              {activeAxis === 'y' && (
                <div>
                  <h4 className="font-semibold text-pink-400 mb-1">Эмоциональный резонанс</h4>
                  <p className="text-sm text-gray-300">Какие чувства вызывает и как отражает бренд?</p>
                </div>
              )}
              {activeAxis === 'z' && (
                <div>
                  <h4 className="font-semibold text-purple-400 mb-1">Контекстуальная уместность</h4>
                  <p className="text-sm text-gray-300">Уместна ли анимация в данном контексте?</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  // Демо Spotify лайка
  const SpotifyLikeDemo = () => {
    const [isLiked, setIsLiked] = useState(false);
    const [showMetrics, setShowMetrics] = useState(false);

    return (
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Плохой пример - только утилитарность */}
        <div className="p-6 bg-red-900/20 rounded-lg border border-red-800/50">
          <h4 className="text-red-400 font-semibold mb-4 flex items-center gap-2">
            <Icon icon="ph:x-circle-fill" className="w-5 h-5" />
            Только функция (плоско)
          </h4>
          <div className="bg-slate-900 rounded-lg p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-gray-700 rounded" />
              <div>
                <div className="h-4 w-32 bg-gray-700 rounded mb-2" />
                <div className="h-3 w-24 bg-gray-800 rounded" />
              </div>
            </div>
            <button
              onClick={() => {}}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Icon icon="ph:heart" className="w-6 h-6" />
            </button>
          </div>
          <p className="text-sm text-gray-400 mt-3">
            ⏱️ 0ms анимации • 😐 Нет эмоций • 📉 Низкая вовлеченность
          </p>
        </div>

        {/* Хороший пример - баланс всех осей */}
        <div className="p-6 bg-green-900/20 rounded-lg border border-green-800/50">
          <h4 className="text-green-400 font-semibold mb-4 flex items-center gap-2">
            <Icon icon="ph:check-circle-fill" className="w-5 h-5" />
            Трехмерный подход Spotify
          </h4>
          <div className="bg-slate-900 rounded-lg p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-green-600 rounded flex items-center justify-center">
                <Icon icon="ph:music-note" className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-white font-medium">Любимая песня</div>
                <div className="text-gray-400 text-sm">Исполнитель</div>
              </div>
            </div>
            <button
              onClick={() => setIsLiked(!isLiked)}
              className="relative"
            >
              <motion.div
                animate={isLiked ? {
                  scale: [1, 0.8, 1.2, 1],
                } : {}}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <Icon 
                  icon={isLiked ? "ph:heart-fill" : "ph:heart"} 
                  className={`w-6 h-6 transition-colors ${
                    isLiked ? 'text-green-500' : 'text-gray-400 hover:text-white'
                  }`}
                />
              </motion.div>
              
              {/* Частицы при лайке */}
              <AnimatePresence>
                {isLiked && (
                  <>
                    {[...Array(6)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute top-1/2 left-1/2 w-1 h-1 bg-green-500 rounded-full"
                        initial={{ x: 0, y: 0, opacity: 1 }}
                        animate={{
                          x: Math.cos(i * 60 * Math.PI / 180) * 20,
                          y: Math.sin(i * 60 * Math.PI / 180) * 20,
                          opacity: 0
                        }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                      />
                    ))}
                  </>
                )}
              </AnimatePresence>
            </button>
          </div>
          
          <button
            onClick={() => setShowMetrics(!showMetrics)}
            className="mt-3 text-sm text-green-400 hover:text-green-300"
          >
            {showMetrics ? 'Скрыть' : 'Показать'} метрики
          </button>
          
          <AnimatePresence>
            {showMetrics && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-2 text-sm text-gray-400"
              >
                <p>⏱️ 400ms • 😊 +15% вовлеченность • 💚 Усиление бренда</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  };

  // Демо контекстуальной анимации
  const ContextualAnimationDemo = () => {
    const getAnimationDuration = (context: string) => {
      switch(context) {
        case 'browsing': return 300;
        case 'task': return 100;
        case 'celebrating': return 800;
        default: return 200;
      }
    };

    return (
      <div className="p-6 bg-slate-800/50 rounded-lg border border-slate-700">
        <h4 className="text-purple-400 font-semibold mb-4">
          Адаптивная длительность анимации
        </h4>
        
        <div className="grid grid-cols-3 gap-2 mb-6">
          <button
            onClick={() => setCurrentContext('browsing')}
            className={`px-4 py-2 rounded transition-all ${
              currentContext === 'browsing' 
                ? 'bg-purple-600 text-white' 
                : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
            }`}
          >
            <Icon icon="ph:eye" className="w-4 h-4 inline mr-2" />
            Browsing
          </button>
          <button
            onClick={() => setCurrentContext('task')}
            className={`px-4 py-2 rounded transition-all ${
              currentContext === 'task' 
                ? 'bg-purple-600 text-white' 
                : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
            }`}
          >
            <Icon icon="ph:target" className="w-4 h-4 inline mr-2" />
            Task
          </button>
          <button
            onClick={() => setCurrentContext('celebrating')}
            className={`px-4 py-2 rounded transition-all ${
              currentContext === 'celebrating' 
                ? 'bg-purple-600 text-white' 
                : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
            }`}
          >
            <Icon icon="ph:confetti" className="w-4 h-4 inline mr-2" />
            Celebrating
          </button>
        </div>

        <div className="relative h-32 bg-slate-900 rounded-lg overflow-hidden mb-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentContext}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ 
                duration: getAnimationDuration(currentContext) / 1000,
                ease: currentContext === 'task' ? 'easeOut' : 'easeInOut'
              }}
              className="absolute inset-0 flex items-center justify-center"
            >
              {currentContext === 'browsing' && (
                <div className="text-center">
                  <Icon icon="ph:images" className="w-12 h-12 text-blue-400 mb-2" />
                  <p className="text-gray-300">Спокойный просмотр</p>
                </div>
              )}
              {currentContext === 'task' && (
                <div className="text-center">
                  <Icon icon="ph:check-circle" className="w-12 h-12 text-green-400 mb-2" />
                  <p className="text-gray-300">Быстрое действие</p>
                </div>
              )}
              {currentContext === 'celebrating' && (
                <motion.div 
                  className="text-center"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 0.5, repeat: 2 }}
                >
                  <Icon icon="ph:trophy" className="w-12 h-12 text-yellow-400 mb-2" />
                  <p className="text-gray-300">Момент триумфа!</p>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="p-3 bg-purple-900/20 rounded text-sm">
          <code className="text-purple-300">
            getAnimationDuration('{currentContext}') = {getAnimationDuration(currentContext)}ms
          </code>
        </div>
      </div>
    );
  };

  return (
    <div className="prose prose-invert max-w-none">
      <h2 className="mb-8 text-3xl font-bold text-purple-400">
        Трехмерная Модель Ценности Анимации
      </h2>

      {/* Вступление */}
      <div className="p-6 mb-8 bg-orange-900/20 rounded-lg border border-orange-800/50">
        <p className="text-lg text-orange-300 mb-0">
          💡 <strong>Критическое переосмысление:</strong> "Форма должна следовать за функцией" — 
          это гигиенический минимум, а не потолок. В продуктах мирового класса нужна многомерная модель оценки.
        </p>
      </div>

      {/* 3D модель */}
      <div className="mb-12">
        <h3 className="text-2xl font-semibold text-purple-300 mb-6">
          Визуализация трехмерной модели
        </h3>
        <ThreeDModel />
      </div>

      {/* Три измерения */}
      <div className="grid lg:grid-cols-3 gap-6 mb-12">
        {/* Ось X */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-6 bg-green-900/20 rounded-lg border border-green-800/50"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center">
              <Icon icon="ph:wrench-duotone" className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-green-400">Ось X: Utility</h3>
              <p className="text-sm text-gray-400">Функциональная полезность</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <p className="text-gray-300">Фундаментальный вопрос:</p>
            <p className="text-green-300 font-medium italic">
              "Помогает ли это движение выполнить задачу быстрее и проще?"
            </p>
            
            <div className="pt-3 space-y-2">
              <h4 className="font-medium text-gray-200">Jobs to Be Done:</h4>
              <ul className="space-y-1 text-sm text-gray-400">
                <li className="flex items-start gap-2">
                  <Icon icon="ph:info" className="w-4 h-4 mt-0.5 text-green-400" />
                  <span><strong>Информировать:</strong> статусы, ошибки</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon icon="ph:compass" className="w-4 h-4 mt-0.5 text-green-400" />
                  <span><strong>Ориентировать:</strong> навигация</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon icon="ph:check" className="w-4 h-4 mt-0.5 text-green-400" />
                  <span><strong>Подтверждать:</strong> отклик</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon icon="ph:hourglass" className="w-4 h-4 mt-0.5 text-green-400" />
                  <span><strong>Маскировать:</strong> загрузка</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Ось Y */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-6 bg-pink-900/20 rounded-lg border border-pink-800/50"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-pink-600/20 rounded-lg flex items-center justify-center">
              <Icon icon="ph:heart-duotone" className="w-6 h-6 text-pink-400" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-pink-400">Ось Y: Emotion</h3>
              <p className="text-sm text-gray-400">Эмоциональный резонанс</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <p className="text-gray-300">Стратегический вопрос:</p>
            <p className="text-pink-300 font-medium italic">
              "Какие чувства вызывает и как усиливает бренд?"
            </p>
            
            <div className="pt-3 space-y-3">
              <div className="p-3 bg-pink-800/20 rounded">
                <h4 className="font-medium text-pink-300 mb-1">Эмоциональная задача</h4>
                <p className="text-sm text-gray-400">
                  Создание микро-моментов радости, формирование привязанности
                </p>
              </div>
              
              <div className="p-3 bg-pink-800/20 rounded">
                <h4 className="font-medium text-pink-300 mb-1">Брендовая задача</h4>
                <p className="text-sm text-gray-400">
                  Трансляция характера и ценностей через движение
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Ось Z */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-6 bg-purple-900/20 rounded-lg border border-purple-800/50"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center">
              <Icon icon="ph:globe-duotone" className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-purple-400">Ось Z: Context</h3>
              <p className="text-sm text-gray-400">Контекстуальная уместность</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <p className="text-gray-300">Прагматичный вопрос:</p>
            <p className="text-purple-300 font-medium italic">
              "Уместно ли это здесь и сейчас?"
            </p>
            
            <div className="pt-3 space-y-2">
              <h4 className="font-medium text-gray-200">Факторы контекста:</h4>
              <ul className="space-y-1 text-sm text-gray-400">
                <li className="flex items-start gap-2">
                  <Icon icon="ph:user" className="w-4 h-4 mt-0.5 text-purple-400" />
                  <span><strong>User Intent:</strong> browsing vs task</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon icon="ph:clock" className="w-4 h-4 mt-0.5 text-purple-400" />
                  <span><strong>Frequency:</strong> редкое vs частое</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon icon="ph:devices" className="w-4 h-4 mt-0.5 text-purple-400" />
                  <span><strong>Platform:</strong> мощность устройства</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Примеры применения */}
      <div className="space-y-12 mb-12">
        <div>
          <h3 className="text-2xl font-semibold text-purple-300 mb-6">
            Кейс: Spotify Like Animation
          </h3>
          <SpotifyLikeDemo />
        </div>

        <div>
          <h3 className="text-2xl font-semibold text-purple-300 mb-6">
            Кейс: Контекстуальная адаптация
          </h3>
          <ContextualAnimationDemo />
        </div>
      </div>

      {/* Примеры брендов */}
      <div className="mb-12">
        <h3 className="text-2xl font-semibold text-purple-300 mb-6">
          Signature Interactions мировых брендов
        </h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 bg-slate-800/50 rounded-lg border border-slate-700">
            <div className="flex items-center gap-3 mb-4">
              <Icon icon="simple-icons:stripe" className="w-8 h-8 text-[#635BFF]" />
              <h4 className="text-xl font-semibold text-white">Stripe</h4>
            </div>
            <p className="text-gray-300 mb-3">
              Выверенные плавные анимации транслируют надежность и премиальность.
            </p>
            <div className="p-3 bg-purple-900/20 rounded text-sm">
              <p className="text-purple-300">
                "Мы педантичны. Нам можно доверять деньги."
              </p>
            </div>
          </div>

          <div className="p-6 bg-slate-800/50 rounded-lg border border-slate-700">
            <div className="flex items-center gap-3 mb-4">
              <Icon icon="simple-icons:apple" className="w-8 h-8 text-white" />
              <h4 className="text-xl font-semibold text-white">Apple</h4>
            </div>
            <p className="text-gray-300 mb-3">
              "Медленные" анимации создают ощущение премиальности и физичности.
            </p>
            <div className="p-3 bg-purple-900/20 rounded text-sm">
              <p className="text-purple-300">
                Готовы пожертвовать скоростью ради утверждения бренда.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Эволюция Material Design */}
      <div className="p-6 bg-blue-900/20 rounded-lg border border-blue-800/50 mb-12">
        <h3 className="text-xl font-semibold text-blue-400 mb-4">
          Эволюция Google Material Design
        </h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <span className="text-blue-400 font-bold">v1:</span>
            <div>
              <span className="font-medium text-white">Идеализм</span>
              <p className="text-sm text-gray-400">Ripple-эффекты везде, форма важнее функции</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-blue-400 font-bold">v2:</span>
            <div>
              <span className="font-medium text-white">Реализм</span>
              <p className="text-sm text-gray-400">Жалобы на производительность, приоритет функции</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-blue-400 font-bold">v3:</span>
            <div>
              <span className="font-medium text-white">Адаптивность</span>
              <p className="text-sm text-gray-400">Анимация меняется от контекста и настроения</p>
            </div>
          </div>
        </div>
      </div>

      {/* Финальный вердикт */}
      <div className="mt-12 p-8 bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-lg border border-purple-700/50">
        <h3 className="text-2xl font-bold text-purple-300 mb-6">
          Вердикт для Principal Designer/Engineer
        </h3>
        
        <div className="p-4 bg-purple-800/20 rounded-lg mb-6">
          <p className="text-lg text-purple-200 font-medium mb-0">
            Забудьте о плоской дихотомии "Форма vs. Функция". 
            <strong className="text-purple-400"> Мыслите в трех измерениях.</strong>
          </p>
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold text-purple-400 text-lg">
            Перед утверждением анимации, задайте три вопроса:
          </h4>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-green-900/20 rounded-lg">
              <span className="text-green-400 font-bold text-lg">1.</span>
              <div>
                <span className="font-medium text-green-400">Утилитарность:</span>
                <span className="text-gray-300"> Поможет ли это пользователю?</span>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 bg-pink-900/20 rounded-lg">
              <span className="text-pink-400 font-bold text-lg">2.</span>
              <div>
                <span className="font-medium text-pink-400">Эмоции/Бренд:</span>
                <span className="text-gray-300"> Поможет ли это нашему бизнесу?</span>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 bg-purple-900/20 rounded-lg">
              <span className="text-purple-400 font-bold text-lg">3.</span>
              <div>
                <span className="font-medium text-purple-400">Контекст:</span>
                <span className="text-gray-300"> Уместно ли это здесь и сейчас?</span>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-yellow-900/20 rounded-lg border-l-4 border-yellow-500">
            <p className="text-gray-200">
              <Icon icon="ph:scales" className="inline w-5 h-5 text-yellow-400 mr-2" />
              <strong className="text-yellow-400">Идеальное решение</strong> лежит на пересечении 
              положительных ответов. Иногда придется пожертвовать 150мс скорости ради роста доверия. 
              А иногда — убить гениальную анимацию, потому что она тормозит на 40% устройств.
            </p>
          </div>

          <p className="text-lg text-gray-200 italic text-center mt-8">
            Это и есть работа <strong className="text-purple-400">архитектора цифрового опыта</strong>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ThreeDimensionalValue;