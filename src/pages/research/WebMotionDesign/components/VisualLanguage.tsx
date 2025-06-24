import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { Icon } from '@iconify/react';

const VisualLanguage: React.FC = () => {
  const [selectedApproach, setSelectedApproach] = useState<'realism' | 'stylization'>('realism');
  const [comparisonMode, setComparisonMode] = useState<'side-by-side' | 'toggle'>('side-by-side');
  const [activeExample, setActiveExample] = useState<string | null>(null);
  const [detailLevel, setDetailLevel] = useState(50);

  // Демо: Два языка визуальной коммуникации
  const TwoLanguagesDemo = () => {
    const [isAnimating, setIsAnimating] = useState(false);

    const triggerAnimation = () => {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 3000);
    };

    return (
      <div className="bg-slate-800 rounded-lg p-6 mb-8">
        <h3 className="text-xl font-semibold text-purple-400 mb-4 flex items-center gap-2">
          <Icon icon="ph:translate" className="w-5 h-5" />
          Два Языка Визуальной Коммуникации
        </h3>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Реализм */}
          <motion.div
            className={`p-4 rounded-lg border cursor-pointer transition-all ${
              selectedApproach === 'realism'
                ? 'bg-blue-900/20 border-blue-500/50'
                : 'bg-slate-700/30 border-slate-600 hover:border-blue-500/30'
            }`}
            onClick={() => setSelectedApproach('realism')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <h4 className="font-semibold text-blue-400 mb-2 flex items-center gap-2">
              <Icon icon="ph:camera" className="w-5 h-5" />
              Реализм — Язык Достоверности
            </h4>
            <p className="text-sm text-slate-300 mb-3">
              Максимально точная имитация физического мира
            </p>
            
            <div className="bg-slate-900 rounded-lg p-4 h-32 flex items-center justify-center">
              <motion.div
                className="relative w-24 h-24"
                animate={isAnimating && selectedApproach === 'realism' ? {
                  rotateY: [0, 360],
                  rotateX: [0, 15, 0]
                } : {}}
                transition={{ duration: 3, ease: "easeInOut" }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Реалистичный куб с градиентами и тенями */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-600 rounded-lg shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/20 rounded-lg" />
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/30 rounded-lg" />
                  <motion.div
                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-20 h-4 bg-black/30 rounded-full blur-md"
                    animate={isAnimating && selectedApproach === 'realism' ? {
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.5, 0.3]
                    } : {}}
                  />
                </div>
              </motion.div>
            </div>

            <div className="mt-3 space-y-1">
              <div className="flex items-center gap-2 text-xs">
                <Icon icon="ph:check" className="w-3 h-3 text-green-400" />
                <span>Детализация и текстуры</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <Icon icon="ph:check" className="w-3 h-3 text-green-400" />
                <span>Физическая правдоподобность</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <Icon icon="ph:x" className="w-3 h-3 text-red-400" />
                <span>Высокая стоимость производства</span>
              </div>
            </div>
          </motion.div>

          {/* Стилизация */}
          <motion.div
            className={`p-4 rounded-lg border cursor-pointer transition-all ${
              selectedApproach === 'stylization'
                ? 'bg-purple-900/20 border-purple-500/50'
                : 'bg-slate-700/30 border-slate-600 hover:border-purple-500/30'
            }`}
            onClick={() => setSelectedApproach('stylization')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <h4 className="font-semibold text-purple-400 mb-2 flex items-center gap-2">
              <Icon icon="ph:paint-brush" className="w-5 h-5" />
              Стилизация — Язык Фокуса и Эмоций
            </h4>
            <p className="text-sm text-slate-300 mb-3">
              Сознательное упрощение для усиления смысла
            </p>
            
            <div className="bg-slate-900 rounded-lg p-4 h-32 flex items-center justify-center">
              <motion.div
                className="relative w-24 h-24"
                animate={isAnimating && selectedApproach === 'stylization' ? {
                  rotate: [0, 360],
                  scale: [1, 1.2, 0.8, 1]
                } : {}}
                transition={{ duration: 3, ease: "easeInOut" }}
              >
                {/* Стилизованный куб - простые формы и яркие цвета */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-600 rounded-2xl">
                  <motion.div
                    className="absolute inset-2 bg-white/20 rounded-xl"
                    animate={isAnimating && selectedApproach === 'stylization' ? {
                      scale: [1, 0.8, 1]
                    } : {}}
                    transition={{ duration: 3 }}
                  />
                </div>
              </motion.div>
            </div>

            <div className="mt-3 space-y-1">
              <div className="flex items-center gap-2 text-xs">
                <Icon icon="ph:check" className="w-3 h-3 text-green-400" />
                <span>Быстрое восприятие</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <Icon icon="ph:check" className="w-3 h-3 text-green-400" />
                <span>Эмоциональная выразительность</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <Icon icon="ph:x" className="w-3 h-3 text-red-400" />
                <span>Риск быть непонятым</span>
              </div>
            </div>
          </motion.div>
        </div>

        <button
          onClick={triggerAnimation}
          className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          <Icon icon="ph:play" className="inline w-4 h-4 mr-1" />
          Запустить анимацию
        </button>
      </div>
    );
  };

  // Демо: Стилизация в UI
  const StylizationInUIDemo = () => {
    const [selectedIcon, setSelectedIcon] = useState<'cart' | 'document' | 'notification'>('cart');

    const examples = {
      cart: {
        name: 'Корзина',
        realistic: () => (
          <div className="relative w-full h-full flex items-center justify-center p-4">
            {/* Реалистичная корзина */}
            <div className="relative w-20 h-20">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-600 to-amber-800 rounded-lg transform rotate-3">
                <div className="absolute inset-0 bg-gradient-to-t from-transparent to-amber-500/30" />
                <div className="absolute inset-1 border-2 border-amber-700/50 rounded-lg" />
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-16 h-8 border-4 border-amber-700 rounded-full" />
                <div className="absolute bottom-2 left-2 w-2 h-2 bg-amber-900 rounded-full" />
                <div className="absolute bottom-2 right-2 w-2 h-2 bg-amber-900 rounded-full" />
              </div>
              <motion.div
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-16 h-3 bg-black/20 rounded-full blur-sm"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            <div className="absolute bottom-2 left-0 right-0 text-center">
              <span className="text-xs text-red-400">Детализировано</span>
              <span className="text-xs text-gray-500 block">~500ms распознавание</span>
            </div>
          </div>
        ),
        stylized: () => (
          <div className="relative w-full h-full flex items-center justify-center p-4">
            {/* Стилизованная корзина */}
            <div className="relative w-20 h-20">
              <motion.svg
                viewBox="0 0 24 24"
                className="w-full h-full text-purple-400"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                <path
                  fill="currentColor"
                  d="M7 4V2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v2h3a1 1 0 0 1 1 1s0 1-1 1H4c-1 0-1 0-1-1a1 1 0 0 1 1-1h3zm2 0h6V3H9v1zM5 6h14l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6z"
                />
              </motion.svg>
            </div>
            <div className="absolute bottom-2 left-0 right-0 text-center">
              <span className="text-xs text-green-400">Мгновенно понятно</span>
              <span className="text-xs text-gray-500 block">~50ms распознавание</span>
            </div>
          </div>
        )
      },
      document: {
        name: 'Документ',
        realistic: () => (
          <div className="relative w-full h-full flex items-center justify-center p-4">
            <div className="relative w-16 h-20">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-300 rounded-sm shadow-lg">
                <div className="absolute top-1 left-1 right-1 space-y-1">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-0.5 bg-gray-400 rounded-full" style={{ width: `${85 - i * 10}%` }} />
                  ))}
                </div>
                <div className="absolute top-0 right-0 w-4 h-4 bg-gradient-to-br from-gray-300 to-gray-400">
                  <div className="absolute bottom-0 left-0 w-full h-full bg-gray-100" style={{ clipPath: 'polygon(0 0, 0 100%, 100% 100%)' }} />
                </div>
              </div>
            </div>
          </div>
        ),
        stylized: () => (
          <div className="relative w-full h-full flex items-center justify-center p-4">
            <motion.svg
              viewBox="0 0 24 24"
              className="w-20 h-20 text-purple-400"
              whileHover={{ scale: 1.1 }}
            >
              <path
                fill="currentColor"
                d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"
              />
            </motion.svg>
          </div>
        )
      },
      notification: {
        name: 'Уведомление',
        realistic: () => (
          <div className="relative w-full h-full flex items-center justify-center p-4">
            <div className="relative w-20 h-20">
              <div className="absolute inset-2 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full shadow-lg">
                <div className="absolute inset-1 bg-gradient-to-t from-transparent to-yellow-300/50 rounded-full" />
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-8 h-1 bg-yellow-700 rounded-full" />
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-yellow-700 rounded" />
              </div>
              <motion.div
                className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full border-2 border-white"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <span className="text-xs text-white font-bold">3</span>
              </motion.div>
            </div>
          </div>
        ),
        stylized: () => (
          <div className="relative w-full h-full flex items-center justify-center p-4">
            <div className="relative">
              <motion.svg
                viewBox="0 0 24 24"
                className="w-20 h-20 text-purple-400"
                whileHover={{ scale: 1.1 }}
              >
                <path
                  fill="currentColor"
                  d="M12,2A2,2 0 0,1 14,4C14,4.74 13.6,5.39 13,5.73V7H14A7,7 0 0,1 21,14C21,18.42 17.42,22 13,22H11C6.58,22 3,18.42 3,14A7,7 0 0,1 10,7H11V5.73C10.4,5.39 10,4.74 10,4A2,2 0 0,1 12,2M11,9A5,5 0 0,0 6,14C6,17.31 8.69,20 12,20C15.31,20 18,17.31 18,14A5,5 0 0,0 13,9H11Z"
                />
              </motion.svg>
              <motion.div
                className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <span className="text-xs text-white font-bold">3</span>
              </motion.div>
            </div>
          </div>
        )
      }
    };

    return (
      <div className="bg-slate-800 rounded-lg p-6 mb-8">
        <h3 className="text-xl font-semibold text-green-400 mb-4 flex items-center gap-2">
          <Icon icon="ph:devices" className="w-5 h-5" />
          Почему Стилизация Выигрывает в UI
        </h3>

        <div className="mb-4 flex gap-2">
          {Object.entries(examples).map(([key, example]) => (
            <button
              key={key}
              onClick={() => setSelectedIcon(key as typeof selectedIcon)}
              className={`px-4 py-2 rounded-lg transition-all ${
                selectedIcon === key
                  ? 'bg-green-600 text-white'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              {example.name}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-red-900/20 rounded-lg p-4 border border-red-500/30">
            <h4 className="font-medium text-red-400 mb-3 flex items-center gap-2">
              <Icon icon="ph:camera" className="w-5 h-5" />
              Реалистичный подход
            </h4>
            <div className="bg-slate-900 rounded-lg h-40">
              {examples[selectedIcon].realistic()}
            </div>
          </div>

          <div className="bg-green-900/20 rounded-lg p-4 border border-green-500/30">
            <h4 className="font-medium text-green-400 mb-3 flex items-center gap-2">
              <Icon icon="ph:paint-brush" className="w-5 h-5" />
              Стилизованный подход
            </h4>
            <div className="bg-slate-900 rounded-lg h-40">
              {examples[selectedIcon].stylized()}
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Icon icon="ph:lightning" className="w-5 h-5 text-yellow-400" />
              <span className="font-medium">Скорость</span>
            </div>
            <div className="text-sm text-gray-400">
              Стилизация в <span className="text-green-400 font-bold">10x</span> быстрее
            </div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Icon icon="ph:resize" className="w-5 h-5 text-blue-400" />
              <span className="font-medium">Масштаб</span>
            </div>
            <div className="text-sm text-gray-400">
              Идеально на <span className="text-green-400 font-bold">любом</span> экране
            </div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Icon icon="ph:target" className="w-5 h-5 text-purple-400" />
              <span className="font-medium">Фокус</span>
            </div>
            <div className="text-sm text-gray-400">
              <span className="text-green-400 font-bold">0%</span> визуального шума
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Демо: Применение в разных контекстах
  const ContextApplicationDemo = () => {
    const contexts = [
      {
        id: 'product',
        name: 'Демонстрация продукта',
        icon: 'ph:watch',
        realism: { score: 95, reason: 'Нужно показать материалы и качество' },
        stylization: { score: 30, reason: 'Не передает ощущение премиальности' }
      },
      {
        id: 'explainer',
        name: 'Объясняющее видео',
        icon: 'ph:chalkboard-teacher',
        realism: { score: 20, reason: 'Отвлекает от сути' },
        stylization: { score: 90, reason: 'Фокус на понимании концепции' }
      },
      {
        id: 'brand',
        name: 'Брендинг',
        icon: 'ph:palette',
        realism: { score: 40, reason: 'Сложно создать уникальность' },
        stylization: { score: 85, reason: 'Создает узнаваемый стиль' }
      },
      {
        id: 'simulation',
        name: 'Медицинская симуляция',
        icon: 'ph:heartbeat',
        realism: { score: 100, reason: 'Критически важна точность' },
        stylization: { score: 10, reason: 'Может привести к ошибкам' }
      }
    ];

    const [selectedContext, setSelectedContext] = useState(contexts[0]);

    return (
      <div className="bg-slate-800 rounded-lg p-6 mb-8">
        <h3 className="text-xl font-semibold text-orange-400 mb-4 flex items-center gap-2">
          <Icon icon="ph:compass" className="w-5 h-5" />
          Выбор Подхода в Разных Контекстах
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {contexts.map((context) => (
            <motion.button
              key={context.id}
              onClick={() => setSelectedContext(context)}
              className={`p-3 rounded-lg border transition-all ${
                selectedContext.id === context.id
                  ? 'bg-orange-900/20 border-orange-500/50'
                  : 'bg-slate-700/30 border-slate-600 hover:border-orange-500/30'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Icon icon={context.icon} className="w-6 h-6 mx-auto mb-1 text-orange-400" />
              <div className="text-sm">{context.name}</div>
            </motion.button>
          ))}
        </div>

        <div className="bg-slate-900 rounded-lg p-6">
          <h4 className="font-medium text-lg mb-4 flex items-center gap-2">
            <Icon icon={selectedContext.icon} className="w-6 h-6 text-orange-400" />
            {selectedContext.name}
          </h4>

          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="flex items-center gap-2">
                  <Icon icon="ph:camera" className="w-4 h-4 text-blue-400" />
                  Реализм
                </span>
                <span className="text-sm font-bold">{selectedContext.realism.score}%</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden mb-2">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500 to-blue-400"
                  initial={{ width: 0 }}
                  animate={{ width: `${selectedContext.realism.score}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>
              <p className="text-sm text-gray-400">{selectedContext.realism.reason}</p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="flex items-center gap-2">
                  <Icon icon="ph:paint-brush" className="w-4 h-4 text-purple-400" />
                  Стилизация
                </span>
                <span className="text-sm font-bold">{selectedContext.stylization.score}%</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden mb-2">
                <motion.div
                  className="h-full bg-gradient-to-r from-purple-500 to-purple-400"
                  initial={{ width: 0 }}
                  animate={{ width: `${selectedContext.stylization.score}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>
              <p className="text-sm text-gray-400">{selectedContext.stylization.reason}</p>
            </div>
          </div>

          <div className="mt-4 p-3 rounded-lg border" style={{
            backgroundColor: selectedContext.realism.score > selectedContext.stylization.score 
              ? 'rgba(59, 130, 246, 0.1)' 
              : 'rgba(168, 85, 247, 0.1)',
            borderColor: selectedContext.realism.score > selectedContext.stylization.score 
              ? 'rgba(59, 130, 246, 0.3)' 
              : 'rgba(168, 85, 247, 0.3)'
          }}>
            <p className="text-sm">
              <strong>Рекомендация:</strong> Используйте{' '}
              <span className={selectedContext.realism.score > selectedContext.stylization.score ? 'text-blue-400' : 'text-purple-400'}>
                {selectedContext.realism.score > selectedContext.stylization.score ? 'реализм' : 'стилизацию'}
              </span>{' '}
              для этой задачи
            </p>
          </div>
        </div>
      </div>
    );
  };

  // Демо: Интерактивный слайдер детализации
  const DetailSliderDemo = () => {
    return (
      <div className="bg-slate-800 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-blue-400 mb-4 flex items-center gap-2">
          <Icon icon="ph:sliders-horizontal" className="w-5 h-5" />
          Спектр от Реализма к Стилизации
        </h3>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
            Уровень детализации: {detailLevel}%
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={detailLevel}
            onChange={(e) => setDetailLevel(Number(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>Максимальная стилизация</span>
            <span>Фотореализм</span>
          </div>
        </div>

        <div className="bg-slate-900 rounded-lg p-8 flex items-center justify-center">
          <motion.div
            className="relative w-32 h-32"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            {/* Базовая форма */}
            <motion.div
              className="absolute inset-0 rounded-lg"
              style={{
                background: `linear-gradient(135deg, 
                  hsl(${280 - detailLevel * 2}, ${70 + detailLevel * 0.3}%, ${50 + detailLevel * 0.2}%) 0%, 
                  hsl(${320 - detailLevel * 2}, ${70 + detailLevel * 0.3}%, ${40 + detailLevel * 0.2}%) 100%)`
              }}
              animate={{
                borderRadius: `${20 - detailLevel * 0.15}%`,
                boxShadow: detailLevel > 50 
                  ? `0 ${10 + detailLevel * 0.2}px ${20 + detailLevel * 0.3}px rgba(0,0,0,${0.2 + detailLevel * 0.003})`
                  : 'none'
              }}
            >
              {/* Детали появляются с увеличением реализма */}
              {detailLevel > 30 && (
                <motion.div
                  className="absolute inset-2 rounded-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: (detailLevel - 30) / 70 }}
                  style={{
                    background: `linear-gradient(to top, transparent, rgba(255,255,255,${detailLevel * 0.003}))`
                  }}
                />
              )}
              {detailLevel > 60 && (
                <motion.div
                  className="absolute inset-4 rounded-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: (detailLevel - 60) / 40 }}
                  style={{
                    background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2), transparent)'
                  }}
                />
              )}
              {detailLevel > 80 && (
                <>
                  <motion.div
                    className="absolute bottom-2 right-2 w-4 h-4 rounded-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: (detailLevel - 80) / 20 }}
                    style={{
                      background: 'rgba(0,0,0,0.2)'
                    }}
                  />
                  <motion.div
                    className="absolute top-2 left-2 w-6 h-1 rounded-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: (detailLevel - 80) / 20 }}
                    style={{
                      background: 'rgba(255,255,255,0.3)'
                    }}
                  />
                </>
              )}
            </motion.div>
          </motion.div>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-sm font-medium mb-1">Производство</div>
            <div className="text-2xl font-bold" style={{
              color: `hsl(${120 - detailLevel * 1.2}, 70%, 50%)`
            }}>
              {detailLevel < 30 ? '💚' : detailLevel < 70 ? '💛' : '💔'}
            </div>
            <div className="text-xs text-gray-400">
              {detailLevel < 30 ? 'Быстро' : detailLevel < 70 ? 'Средне' : 'Долго'}
            </div>
          </div>
          <div>
            <div className="text-sm font-medium mb-1">Гибкость</div>
            <div className="text-2xl font-bold" style={{
              color: `hsl(${120 - detailLevel * 1.2}, 70%, 50%)`
            }}>
              {100 - detailLevel}%
            </div>
            <div className="text-xs text-gray-400">
              {detailLevel < 30 ? 'Высокая' : detailLevel < 70 ? 'Средняя' : 'Низкая'}
            </div>
          </div>
          <div>
            <div className="text-sm font-medium mb-1">Узнаваемость</div>
            <div className="text-2xl font-bold" style={{
              color: detailLevel < 30 || detailLevel > 90 ? 'hsl(120, 70%, 50%)' : 'hsl(40, 70%, 50%)'
            }}>
              {detailLevel < 30 ? '⭐' : detailLevel > 90 ? '📸' : '❓'}
            </div>
            <div className="text-xs text-gray-400">
              {detailLevel < 30 ? 'Уникально' : detailLevel > 90 ? 'Реалистично' : 'Обычно'}
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
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          Визуальный Язык — Стилизация против Реализма
        </h1>

        <div className="bg-slate-800/50 rounded-lg p-6 mb-8 border border-slate-700">
          <p className="text-lg leading-relaxed mb-4">
            Окей, команда. Мы определились, что мы хотим сказать нашим движением. 
            Теперь вопрос — какими словами? На каком визуальном языке мы будем говорить?
          </p>
          <p className="text-lg leading-relaxed mb-4">
            И здесь лежит один из самых фундаментальных выборов в моушн-дизайне: 
            мы стремимся к реализму или к стилизации?
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
              Реализм — это вершина мастерства. Чем больше анимация похожа на реальный мир, 
              тем она "лучше", "дороже" и "профессиональнее".
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
              Реализм и стилизация — это два разных визуальных языка. 
              Выбор зависит от цели коммуникации, и часто стилизация оказывается мощнее.
            </p>
          </motion.div>
        </div>

        <TwoLanguagesDemo />
        <StylizationInUIDemo />
        <ContextApplicationDemo />
        <DetailSliderDemo />

        <div className="mt-8 bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-lg p-8 border border-blue-500/30">
          <h2 className="text-2xl font-semibold mb-6 text-blue-400">
            Вердикт: Ваша Новая Ментальная Модель
          </h2>
          
          <div className="bg-slate-800/50 rounded-lg p-6 mb-6">
            <p className="text-lg font-semibold text-purple-300 mb-4">
              Перестаньте думать о реализме как о конечной цели. 
              Начните думать о нем как об одном из многих инструментов в вашем ящике.
            </p>
            
            <div className="space-y-4">
              <div className="p-4 bg-blue-900/20 rounded-lg border border-blue-500/20">
                <h4 className="font-medium text-blue-400 mb-2 flex items-center gap-2">
                  <Icon icon="ph:camera" className="w-5 h-5" />
                  Если нужна ДОСТОВЕРНОСТЬ:
                </h4>
                <ul className="text-sm text-slate-300 space-y-1">
                  <li>• Ваш язык — Реализм</li>
                  <li>• Демонстрация физических продуктов</li>
                  <li>• Симуляции и обучение</li>
                  <li>• Будьте готовы к высоким затратам</li>
                </ul>
              </div>

              <div className="p-4 bg-purple-900/20 rounded-lg border border-purple-500/20">
                <h4 className="font-medium text-purple-400 mb-2 flex items-center gap-2">
                  <Icon icon="ph:paint-brush" className="w-5 h-5" />
                  Если нужны ФОКУС и ЭМОЦИЯ:
                </h4>
                <ul className="text-sm text-slate-300 space-y-1">
                  <li>• Ваш язык — Стилизация</li>
                  <li>• UI и цифровые продукты</li>
                  <li>• Объяснение концепций</li>
                  <li>• Создание уникального бренда</li>
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
              В мире интерфейсов стилизация — это ваш лучший друг. 
              Она позволяет говорить громко, ясно и по существу, отсекая все лишнее.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default VisualLanguage;