import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';

const CharacterOfMovement: React.FC = () => {
  const [activeEasing, setActiveEasing] = useState<'ease-out' | 'ease-in' | 'ease-in-out'>('ease-out');
  const [showDemo, setShowDemo] = useState(false);
  const [demoType, setDemoType] = useState<'arrival' | 'departure' | 'movement'>('arrival');

  // Визуализация кривых
  const EasingCurveVisualizer = () => {
    const curves = {
      'ease-out': 'M 0,100 C 0,0 25,0 100,0',
      'ease-in': 'M 0,100 C 75,100 100,100 100,0',
      'ease-in-out': 'M 0,100 C 0,50 100,50 100,0'
    };

    const getEasingFunction = (type: string) => {
      switch(type) {
        case 'ease-out': return [0, 0, 0.2, 1];
        case 'ease-in': return [0.8, 0, 1, 1];
        case 'ease-in-out': return [0.4, 0, 0.6, 1];
        default: return [0, 0, 1, 1];
      }
    };

    return (
      <div className="relative h-64 mb-8">
        <div className="grid grid-cols-3 gap-4 h-full">
          {(['ease-out', 'ease-in', 'ease-in-out'] as const).map((easing) => (
            <motion.div
              key={easing}
              className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all ${
                activeEasing === easing
                  ? 'bg-purple-900/20 border-purple-500 shadow-purple-500/50 shadow-lg'
                  : 'bg-slate-800/50 border-slate-600 hover:border-slate-500'
              }`}
              onClick={() => setActiveEasing(easing)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Название */}
              <h4 className={`text-center font-semibold mb-2 ${
                activeEasing === easing ? 'text-purple-400' : 'text-gray-300'
              }`}>
                {easing === 'ease-out' && '🚀 Прибытие'}
                {easing === 'ease-in' && '✈️ Уход'}
                {easing === 'ease-in-out' && '🚡 Перемещение'}
              </h4>
              
              {/* SVG кривая */}
              <svg viewBox="0 0 100 100" className="w-full h-24 mb-2">
                {/* Сетка */}
                <g opacity="0.2">
                  <line x1="0" y1="50" x2="100" y2="50" stroke="white" strokeWidth="0.5" />
                  <line x1="50" y1="0" x2="50" y2="100" stroke="white" strokeWidth="0.5" />
                </g>
                
                {/* Кривая */}
                <path
                  d={curves[easing]}
                  fill="none"
                  stroke={activeEasing === easing ? '#a855f7' : '#64748b'}
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                
                {/* Точки */}
                <circle cx="0" cy="100" r="3" fill={activeEasing === easing ? '#a855f7' : '#64748b'} />
                <circle cx="100" cy="0" r="3" fill={activeEasing === easing ? '#a855f7' : '#64748b'} />
              </svg>
              
              {/* Код */}
              <div className="text-xs font-mono text-center">
                {easing === 'ease-out' && 'cubic-bezier(0, 0, 0.2, 1)'}
                {easing === 'ease-in' && 'cubic-bezier(0.8, 0, 1, 1)'}
                {easing === 'ease-in-out' && 'cubic-bezier(0.4, 0, 0.6, 1)'}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  };

  // Демо "Прибытие" (ease-out)
  const ArrivalDemo = () => {
    const [showModal, setShowModal] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [cards, setCards] = useState<number[]>([]);

    const addCard = () => {
      setCards([...cards, Date.now()]);
    };

    return (
      <div className="p-6 bg-green-900/20 rounded-lg border border-green-800/50">
        <h4 className="text-green-400 font-semibold mb-4 flex items-center gap-2">
          <Icon icon="ph:arrow-down-left" className="w-5 h-5" />
          Интонация 1: "Прибытие" (Ease-out)
        </h4>
        
        <div className="mb-6">
          <p className="text-gray-300 mb-2">
            Движение начинается <strong className="text-green-400">быстро</strong>, 
            затем <strong className="text-green-400">плавно замедляется</strong>
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Icon icon="ph:soccer-ball" className="w-4 h-4" />
            <span>Как мяч, брошенный в стену</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Модальное окно */}
          <div className="relative h-48 bg-slate-900 rounded-lg overflow-hidden">
            <button
              onClick={() => setShowModal(!showModal)}
              className="absolute top-4 left-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 z-10"
            >
              Открыть модалку
            </button>

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
                    initial={{ scale: 0.8, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.8, opacity: 0, y: 20 }}
                    transition={{ 
                      type: "tween",
                      ease: [0, 0, 0.2, 1], // ease-out
                      duration: 0.3
                    }}
                    className="absolute inset-x-4 top-1/2 -translate-y-1/2 bg-white rounded-lg p-6 shadow-xl"
                  >
                    <h3 className="text-gray-900 font-semibold mb-2">Модальное окно</h3>
                    <p className="text-gray-600 text-sm">Появляется с ease-out</p>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Боковое меню */}
          <div className="relative h-48 bg-slate-900 rounded-lg overflow-hidden">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="absolute top-4 left-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 z-10"
            >
              {showMenu ? 'Закрыть' : 'Открыть'} меню
            </button>

            <AnimatePresence>
              {showMenu && (
                <motion.div
                  initial={{ x: '-100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '-100%' }}
                  transition={{ 
                    type: "tween",
                    ease: [0, 0, 0.2, 1], // ease-out
                    duration: 0.3
                  }}
                  className="absolute left-0 top-0 bottom-0 w-48 bg-green-800/50 backdrop-blur p-4"
                >
                  <h3 className="text-white font-semibold mb-4">Меню</h3>
                  <div className="space-y-2">
                    <div className="h-3 bg-green-700/50 rounded" />
                    <div className="h-3 bg-green-700/50 rounded w-3/4" />
                    <div className="h-3 bg-green-700/50 rounded w-1/2" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-6 p-4 bg-green-800/20 rounded text-sm">
          <p className="text-green-300">
            <Icon icon="ph:check-circle" className="inline w-4 h-4 mr-1" />
            <strong>Правило:</strong> 90% анимаций появления должны использовать ease-out
          </p>
        </div>
      </div>
    );
  };

  // Демо "Уход" (ease-in)
  const DepartureDemo = () => {
    const [notifications, setNotifications] = useState<number[]>([1, 2, 3]);

    const removeNotification = (id: number) => {
      setNotifications(notifications.filter(n => n !== id));
    };

    const resetNotifications = () => {
      setNotifications([1, 2, 3]);
    };

    return (
      <div className="p-6 bg-blue-900/20 rounded-lg border border-blue-800/50">
        <h4 className="text-blue-400 font-semibold mb-4 flex items-center gap-2">
          <Icon icon="ph:arrow-up-right" className="w-5 h-5" />
          Интонация 2: "Уход" (Ease-in)
        </h4>
        
        <div className="mb-6">
          <p className="text-gray-300 mb-2">
            Движение начинается <strong className="text-blue-400">медленно</strong>, 
            затем <strong className="text-blue-400">ускоряется</strong>
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Icon icon="ph:rocket-launch" className="w-4 h-4" />
            <span>Как запуск ракеты</span>
          </div>
        </div>

        <div className="relative h-64 bg-slate-900 rounded-lg overflow-hidden">
          <div className="absolute top-4 right-4 space-y-2">
            <AnimatePresence>
              {notifications.map((id) => (
                <motion.div
                  key={id}
                  layout
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 100 }}
                  transition={{ 
                    type: "tween",
                    ease: [0.8, 0, 1, 1], // ease-in для ухода
                    duration: 0.3
                  }}
                  className="flex items-center gap-3 p-3 bg-blue-800/50 backdrop-blur rounded-lg"
                >
                  <Icon icon="ph:bell" className="w-5 h-5 text-blue-300" />
                  <span className="text-white">Уведомление {id}</span>
                  <button
                    onClick={() => removeNotification(id)}
                    className="ml-auto text-gray-400 hover:text-white"
                  >
                    <Icon icon="ph:x" className="w-4 h-4" />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {notifications.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={resetNotifications}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Восстановить уведомления
              </button>
            </div>
          )}
        </div>

        <div className="mt-6 p-4 bg-blue-800/20 rounded text-sm">
          <p className="text-blue-300">
            <Icon icon="ph:info" className="inline w-4 h-4 mr-1" />
            <strong>Логика:</strong> После ухода с экрана скорость не важна — пусть улетает быстро
          </p>
        </div>
      </div>
    );
  };

  // Демо "Перемещение" (ease-in-out)
  const MovementDemo = () => {
    const [sliderValue, setSliderValue] = useState(50);
    const [toggleState, setToggleState] = useState(false);
    const [activeTab, setActiveTab] = useState(0);

    return (
      <div className="p-6 bg-purple-900/20 rounded-lg border border-purple-700/50">
        <h4 className="text-purple-400 font-semibold mb-4 flex items-center gap-2">
          <Icon icon="ph:arrows-left-right" className="w-5 h-5" />
          Интонация 3: "Перемещение" (Ease-in-out)
        </h4>
        
        <div className="mb-6">
          <p className="text-gray-300 mb-2">
            <strong className="text-purple-400">Плавное</strong> начало и 
            <strong className="text-purple-400"> плавный</strong> конец
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Icon icon="ph:cable-car" className="w-4 h-4" />
            <span>Как поездка на фуникулере</span>
          </div>
        </div>

        <div className="space-y-6">
          {/* Слайдер */}
          <div className="p-4 bg-slate-800/50 rounded-lg">
            <label className="text-sm text-gray-400 mb-2 block">Слайдер</label>
            <div className="relative h-2 bg-slate-700 rounded-full">
              <motion.div
                className="absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-purple-500 rounded-full shadow-lg cursor-grab active:cursor-grabbing"
                animate={{ left: `${sliderValue}%` }}
                transition={{ 
                  type: "tween",
                  ease: [0.4, 0, 0.6, 1], // ease-in-out
                  duration: 0.3
                }}
                style={{ x: '-50%' }}
              />
            </div>
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => setSliderValue(0)}
                className="px-3 py-1 bg-purple-600 text-white rounded text-sm hover:bg-purple-700"
              >
                0%
              </button>
              <button
                onClick={() => setSliderValue(50)}
                className="px-3 py-1 bg-purple-600 text-white rounded text-sm hover:bg-purple-700"
              >
                50%
              </button>
              <button
                onClick={() => setSliderValue(100)}
                className="px-3 py-1 bg-purple-600 text-white rounded text-sm hover:bg-purple-700"
              >
                100%
              </button>
            </div>
          </div>

          {/* Переключатель */}
          <div className="p-4 bg-slate-800/50 rounded-lg">
            <label className="text-sm text-gray-400 mb-2 block">Переключатель</label>
            <button
              onClick={() => setToggleState(!toggleState)}
              className="relative w-16 h-8 bg-slate-700 rounded-full"
            >
              <motion.div
                className="absolute top-1 w-6 h-6 bg-white rounded-full shadow-md"
                animate={{ left: toggleState ? '34px' : '4px' }}
                transition={{ 
                  type: "tween",
                  ease: [0.4, 0, 0.6, 1], // ease-in-out
                  duration: 0.3
                }}
              />
            </button>
          </div>

          {/* Табы */}
          <div className="p-4 bg-slate-800/50 rounded-lg">
            <label className="text-sm text-gray-400 mb-2 block">Табы</label>
            <div className="relative flex gap-2">
              {['Таб 1', 'Таб 2', 'Таб 3'].map((tab, index) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(index)}
                  className={`px-4 py-2 rounded-lg relative z-10 transition-colors ${
                    activeTab === index ? 'text-white' : 'text-gray-400'
                  }`}
                >
                  {tab}
                </button>
              ))}
              <motion.div
                className="absolute top-0 h-full bg-purple-600 rounded-lg"
                animate={{ 
                  left: `${activeTab * 33.33}%`,
                  width: '33.33%'
                }}
                transition={{ 
                  type: "tween",
                  ease: [0.4, 0, 0.6, 1], // ease-in-out
                  duration: 0.3
                }}
              />
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-purple-800/20 rounded text-sm">
          <p className="text-purple-300">
            <Icon icon="ph:eye" className="inline w-4 h-4 mr-1" />
            <strong>Принцип:</strong> Оба конца пути видны — движение должно быть предсказуемым
          </p>
        </div>
      </div>
    );
  };

  // Сравнительное демо
  const ComparisonDemo = () => {
    const [triggerAnimation, setTriggerAnimation] = useState(false);

    const restartAnimation = () => {
      setTriggerAnimation(false);
      setTimeout(() => setTriggerAnimation(true), 100);
    };

    return (
      <div className="p-6 bg-slate-800/50 rounded-lg border border-slate-700 mb-8">
        <h4 className="text-purple-400 font-semibold mb-4">
          Сравнение всех трех типов
        </h4>

        <div className="space-y-4 mb-6">
          {/* Ease-out */}
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-400 w-24">Ease-out:</span>
            <div className="flex-1 h-12 bg-slate-900 rounded relative overflow-hidden">
              <motion.div
                className="absolute top-2 left-2 w-8 h-8 bg-green-500 rounded"
                animate={triggerAnimation ? { x: 'calc(100% - 3rem)' } : { x: 0 }}
                transition={{ 
                  type: "tween",
                  ease: [0, 0, 0.2, 1],
                  duration: 1
                }}
              />
            </div>
          </div>

          {/* Ease-in */}
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-400 w-24">Ease-in:</span>
            <div className="flex-1 h-12 bg-slate-900 rounded relative overflow-hidden">
              <motion.div
                className="absolute top-2 left-2 w-8 h-8 bg-blue-500 rounded"
                animate={triggerAnimation ? { x: 'calc(100% - 3rem)' } : { x: 0 }}
                transition={{ 
                  type: "tween",
                  ease: [0.8, 0, 1, 1],
                  duration: 1
                }}
              />
            </div>
          </div>

          {/* Ease-in-out */}
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-400 w-24">Ease-in-out:</span>
            <div className="flex-1 h-12 bg-slate-900 rounded relative overflow-hidden">
              <motion.div
                className="absolute top-2 left-2 w-8 h-8 bg-purple-500 rounded"
                animate={triggerAnimation ? { x: 'calc(100% - 3rem)' } : { x: 0 }}
                transition={{ 
                  type: "tween",
                  ease: [0.4, 0, 0.6, 1],
                  duration: 1
                }}
              />
            </div>
          </div>
        </div>

        <button
          onClick={restartAnimation}
          className="w-full px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
        >
          Запустить анимацию
        </button>
      </div>
    );
  };

  // Примеры неправильного использования
  const BadExamplesDemo = () => {
    const [showBadModal, setShowBadModal] = useState(false);
    const [showGoodModal, setShowGoodModal] = useState(false);

    return (
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Плохой пример */}
        <div className="p-6 bg-red-900/20 rounded-lg border border-red-800/50">
          <h4 className="text-red-400 font-semibold mb-4 flex items-center gap-2">
            <Icon icon="ph:x-circle-fill" className="w-5 h-5" />
            Неправильно: ease-in-out везде
          </h4>
          
          <div className="relative h-48 bg-slate-900 rounded-lg overflow-hidden mb-4">
            <button
              onClick={() => setShowBadModal(!showBadModal)}
              className="absolute top-4 left-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 z-10"
            >
              Открыть модалку
            </button>

            <AnimatePresence>
              {showBadModal && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ 
                    type: "tween",
                    ease: [0.4, 0, 0.6, 1], // ease-in-out для появления
                    duration: 0.5
                  }}
                  className="absolute inset-x-4 top-1/2 -translate-y-1/2 bg-white rounded-lg p-6 shadow-xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <p className="text-gray-900">Медленное появление</p>
                  <p className="text-sm text-gray-600 mt-1">ease-in-out = задержка</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <p className="text-sm text-gray-400">
            ⚠️ Медленное начало создает ощущение лага
          </p>
        </div>

        {/* Хороший пример */}
        <div className="p-6 bg-green-900/20 rounded-lg border border-green-800/50">
          <h4 className="text-green-400 font-semibold mb-4 flex items-center gap-2">
            <Icon icon="ph:check-circle-fill" className="w-5 h-5" />
            Правильно: ease-out для появления
          </h4>
          
          <div className="relative h-48 bg-slate-900 rounded-lg overflow-hidden mb-4">
            <button
              onClick={() => setShowGoodModal(!showGoodModal)}
              className="absolute top-4 left-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 z-10"
            >
              Открыть модалку
            </button>

            <AnimatePresence>
              {showGoodModal && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.8, opacity: 0, y: 20 }}
                  transition={{ 
                    type: "tween",
                    ease: [0, 0, 0.2, 1], // ease-out для появления
                    duration: 0.3
                  }}
                  className="absolute inset-x-4 top-1/2 -translate-y-1/2 bg-white rounded-lg p-6 shadow-xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <p className="text-gray-900">Быстрый отклик</p>
                  <p className="text-sm text-gray-600 mt-1">ease-out = мгновенно</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <p className="text-sm text-gray-400">
            ✅ Быстрое начало подтверждает действие
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="prose prose-invert max-w-none">
      <h2 className="mb-8 text-3xl font-bold text-purple-400">
        Характер Движения — Почему Ease-in-out не универсальный ответ
      </h2>

      {/* Вступление */}
      <div className="p-6 mb-8 bg-orange-900/20 rounded-lg border border-orange-800/50">
        <p className="text-lg text-orange-300 mb-4">
          <Icon icon="ph:warning" className="inline w-6 h-6 mr-2" />
          <strong>Самая распространенная ошибка:</strong> Использование ease-in-out на всем подряд
        </p>
        <p className="text-gray-300 mb-0">
          Это как актер, произносящий все реплики одним тоном — <strong className="text-orange-400">лишено жизни и смысла</strong>.
        </p>
      </div>

      {/* Главная идея */}
      <div className="p-6 mb-12 bg-purple-900/20 rounded-lg border border-purple-700/50">
        <h3 className="text-2xl font-semibold text-purple-400 mb-4">
          Кривая ускорения — это характер и намерение движения
        </h3>
        <p className="text-lg text-gray-200">
          Выбор кривой — это не техническая деталь, а фундаментальное решение о том, 
          <strong className="text-purple-400"> что именно вы хотите сказать пользователю</strong> своим движением.
        </p>
      </div>

      {/* Визуализация кривых */}
      <div className="mb-12">
        <h3 className="text-2xl font-semibold text-purple-300 mb-6 text-center">
          Три основные "интонации" движения
        </h3>
        <EasingCurveVisualizer />
      </div>

      {/* Сравнительное демо */}
      <ComparisonDemo />

      {/* Плохие примеры */}
      <BadExamplesDemo />

      {/* Демонстрации интонаций */}
      <div className="space-y-8 mb-12">
        <ArrivalDemo />
        <DepartureDemo />
        <MovementDemo />
      </div>

      {/* Практическая шпаргалка */}
      <div className="mb-12">
        <h3 className="text-2xl font-semibold text-purple-300 mb-6">
          Шпаргалка по выбору кривой
        </h3>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-green-900/20 rounded-lg border border-green-800/50">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center">
                <Icon icon="ph:arrow-down-left" className="w-6 h-6 text-green-400" />
              </div>
              <h4 className="text-xl font-semibold text-green-400">Ease-out</h4>
            </div>
            <p className="text-gray-300 mb-4">Движение ВНУТРЬ экрана</p>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <Icon icon="ph:check" className="w-4 h-4 mt-0.5 text-green-400" />
                <span>Модальные окна</span>
              </li>
              <li className="flex items-start gap-2">
                <Icon icon="ph:check" className="w-4 h-4 mt-0.5 text-green-400" />
                <span>Выпадающие меню</span>
              </li>
              <li className="flex items-start gap-2">
                <Icon icon="ph:check" className="w-4 h-4 mt-0.5 text-green-400" />
                <span>Новые карточки</span>
              </li>
              <li className="flex items-start gap-2">
                <Icon icon="ph:check" className="w-4 h-4 mt-0.5 text-green-400" />
                <span>Тултипы</span>
              </li>
            </ul>
          </div>

          <div className="p-6 bg-blue-900/20 rounded-lg border border-blue-800/50">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center">
                <Icon icon="ph:arrow-up-right" className="w-6 h-6 text-blue-400" />
              </div>
              <h4 className="text-xl font-semibold text-blue-400">Ease-in</h4>
            </div>
            <p className="text-gray-300 mb-4">Движение ЗА пределы экрана</p>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <Icon icon="ph:check" className="w-4 h-4 mt-0.5 text-blue-400" />
                <span>Закрытие уведомлений</span>
              </li>
              <li className="flex items-start gap-2">
                <Icon icon="ph:check" className="w-4 h-4 mt-0.5 text-blue-400" />
                <span>Удаление элементов</span>
              </li>
              <li className="flex items-start gap-2">
                <Icon icon="ph:check" className="w-4 h-4 mt-0.5 text-blue-400" />
                <span>Свайп для удаления</span>
              </li>
              <li className="flex items-start gap-2">
                <Icon icon="ph:check" className="w-4 h-4 mt-0.5 text-blue-400" />
                <span>Скрытие панелей</span>
              </li>
            </ul>
          </div>

          <div className="p-6 bg-purple-900/20 rounded-lg border border-purple-800/50">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center">
                <Icon icon="ph:arrows-left-right" className="w-6 h-6 text-purple-400" />
              </div>
              <h4 className="text-xl font-semibold text-purple-400">Ease-in-out</h4>
            </div>
            <p className="text-gray-300 mb-4">Движение ВНУТРИ экрана</p>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <Icon icon="ph:check" className="w-4 h-4 mt-0.5 text-purple-400" />
                <span>Слайдеры</span>
              </li>
              <li className="flex items-start gap-2">
                <Icon icon="ph:check" className="w-4 h-4 mt-0.5 text-purple-400" />
                <span>Переключатели</span>
              </li>
              <li className="flex items-start gap-2">
                <Icon icon="ph:check" className="w-4 h-4 mt-0.5 text-purple-400" />
                <span>Табы</span>
              </li>
              <li className="flex items-start gap-2">
                <Icon icon="ph:check" className="w-4 h-4 mt-0.5 text-purple-400" />
                <span>Карусели</span>
              </li>
            </ul>
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
            Перестаньте использовать ease-in-out как универсальную заплатку.<br/>
            Задайте себе один простой вопрос:
          </p>
        </div>

        <div className="text-center mb-8">
          <p className="text-2xl text-purple-400 font-bold mb-4">
            "Какова траектория этого элемента относительно экрана?"
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-start gap-3 p-3 bg-green-900/20 rounded-lg">
            <Icon icon="ph:arrow-down-left" className="w-6 h-6 text-green-400 mt-0.5" />
            <div>
              <span className="font-medium text-green-400">ИЗ-ЗА пределов экрана ВНУТРЬ?</span>
              <p className="text-gray-300 text-sm mt-1">
                Ease-out. Начинайте быстро, заканчивайте плавно.
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3 p-3 bg-blue-900/20 rounded-lg">
            <Icon icon="ph:arrow-up-right" className="w-6 h-6 text-blue-400 mt-0.5" />
            <div>
              <span className="font-medium text-blue-400">ИЗНУТРИ экрана ЗА его пределы?</span>
              <p className="text-gray-300 text-sm mt-1">
                Ease-in. Начинайте плавно, заканчивайте быстро.
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3 p-3 bg-purple-900/20 rounded-lg">
            <Icon icon="ph:arrows-left-right" className="w-6 h-6 text-purple-400 mt-0.5" />
            <div>
              <span className="font-medium text-purple-400">ИЗНУТРИ экрана и ОСТАЕТСЯ ВНУТРИ?</span>
              <p className="text-gray-300 text-sm mt-1">
                Ease-in-out. Плавное начало, плавный конец.
              </p>
            </div>
          </div>

          <p className="text-lg text-gray-200 italic text-center mt-8">
            Понимая эту логику, вы начнете создавать анимации, которые<br/>
            <strong className="text-purple-400">
              не просто движутся, а общаются с пользователем на интуитивном уровне.
            </strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CharacterOfMovement;