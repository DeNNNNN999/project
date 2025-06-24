import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';

const PrefaceIntro: React.FC = () => {
  // Демо: Управление вниманием
  const AttentionDemo = () => {
    const [notifications, setNotifications] = React.useState<number[]>([]);
    
    const addNotification = () => {
      setNotifications(prev => [...prev, Date.now()]);
      setTimeout(() => {
        setNotifications(prev => prev.slice(1));
      }, 3000);
    };
    
    return (
      <div className="grid md:grid-cols-2 gap-6">
        {/* Плохой пример */}
        <div className="p-6 bg-red-900/20 rounded-lg border border-red-800/50">
          <h4 className="text-red-400 font-semibold mb-4 flex items-center gap-2">
            <Icon icon="ph:x-circle-fill" className="w-5 h-5" />
            Неправильно: Хаотичное движение
          </h4>
          <div className="relative h-48 bg-slate-900 rounded overflow-hidden">
            <div className="absolute inset-0 p-4">
              {/* Рандомные анимации везде */}
              <motion.div
                className="absolute top-4 left-4 w-16 h-16 bg-red-500 rounded"
                animate={{
                  x: [0, 100, -50, 80],
                  y: [0, -30, 60, -20],
                  rotate: [0, 180, -90, 360],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              <motion.div
                className="absolute top-4 right-4 w-12 h-12 bg-yellow-500 rounded-full"
                animate={{
                  scale: [1, 2, 0.5, 1.5, 1],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                }}
              />
              <motion.div
                className="absolute bottom-4 left-1/2 -translate-x-1/2"
                animate={{
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                }}
              >
                <span className="text-white font-bold">СМОТРИ СЮДА!</span>
              </motion.div>
            </div>
          </div>
          <p className="text-sm text-gray-400 mt-3">
            Все движется одновременно = внимание рассеивается
          </p>
        </div>
        
        {/* Хороший пример */}
        <div className="p-6 bg-green-900/20 rounded-lg border border-green-800/50">
          <h4 className="text-green-400 font-semibold mb-4 flex items-center gap-2">
            <Icon icon="ph:check-circle-fill" className="w-5 h-5" />
            Правильно: Целенаправленное движение
          </h4>
          <div className="relative h-48 bg-slate-900 rounded overflow-hidden">
            <button
              onClick={addNotification}
              className="absolute top-4 right-4 px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
            >
              Показать уведомление
            </button>
            
            <AnimatePresence>
              {notifications.map((id, index) => (
                <motion.div
                  key={id}
                  initial={{ x: 300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 300, opacity: 0 }}
                  transition={{ type: "spring", damping: 25, stiffness: 300 }}
                  className="absolute right-4 bg-white text-black px-4 py-2 rounded shadow-lg"
                  style={{ bottom: 16 + index * 60 }}
                >
                  <p className="text-sm font-medium">Важное сообщение</p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          <p className="text-sm text-gray-400 mt-3">
            Движение привлекает внимание к важному действию
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="prose prose-invert max-w-none">
      <h2 className="mb-8 text-3xl font-bold text-purple-400">
        Предисловие: Переопределение Моушн-дизайна
      </h2>
      
      <div className="p-6 mb-8 bg-red-900/20 rounded-lg border border-red-800/50">
        <p className="text-lg text-gray-200 mb-0">
          Ключевое, что нужно понять сразу: <strong className="text-red-400">моушн-дизайн — это не "оживление графики".</strong> 
          Эта формулировка — опасное упрощение, которое низводит мощнейшую дисциплину до уровня декоративно-прикладного искусства.
        </p>
      </div>
      
      <div className="p-6 mb-8 bg-purple-900/20 rounded-lg border border-purple-700/50">
        <p className="text-xl text-purple-300 font-semibold mb-0">
          Моушн-дизайн — это <strong className="text-purple-400">инженерная дисциплина по управлению вниманием 
          и конструированию смысла через ось времени.</strong>
        </p>
      </div>

      {/* 1. Инженерная Дисциплина */}
      <h3 className="mt-12 mb-6 text-2xl font-bold text-purple-300">
        1. Инженерная Дисциплина
      </h3>
      
      <p className="text-gray-300 mb-6">
        Мы говорим не об искусстве в чистом виде, где главный критерий — самовыражение. 
        Мы говорим об инженерии, где главный критерий — <strong className="text-white">эффективность 
        в решении конкретной, измеримой задачи</strong>.
      </p>
      
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
          <h4 className="font-semibold text-orange-400 mb-2 flex items-center gap-2">
            <Icon icon="ph:cpu-duotone" className="w-5 h-5" />
            Ограничения
          </h4>
          <ul className="text-sm text-gray-300 space-y-1">
            <li>• CPU/GPU производительность</li>
            <li>• Батарея устройства</li>
            <li>• Фреймрейт (60fps)</li>
            <li>• Размер ассетов</li>
          </ul>
        </div>
        
        <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
          <h4 className="font-semibold text-blue-400 mb-2 flex items-center gap-2">
            <Icon icon="ph:check-square-duotone" className="w-5 h-5" />
            Требования
          </h4>
          <ul className="text-sm text-gray-300 space-y-1">
            <li>• Понятность</li>
            <li>• Отзывчивость</li>
            <li>• Доступность (a11y)</li>
            <li>• Консистентность</li>
          </ul>
        </div>
        
        <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
          <h4 className="font-semibold text-green-400 mb-2 flex items-center gap-2">
            <Icon icon="ph:chart-line-duotone" className="w-5 h-5" />
            Метрики
          </h4>
          <ul className="text-sm text-gray-300 space-y-1">
            <li>• Task completion time</li>
            <li>• Error rate</li>
            <li>• Conversion</li>
            <li>• Perceived performance</li>
          </ul>
        </div>
      </div>
      
      <div className="p-4 bg-purple-900/20 rounded-lg border-l-4 border-purple-500 mb-8">
        <p className="text-gray-300 mb-0">
          Хороший моушн-дизайнер думает не как художник <em>("Как бы это сделать красивее?")</em>, 
          а как инженер <em>("Какова минимально достаточная доза движения, чтобы решить эту задачу?")</em>
        </p>
      </div>

      {/* 2. Управление Вниманием */}
      <h3 className="mt-12 mb-6 text-2xl font-bold text-purple-300">
        2. Управление Вниманием
      </h3>
      
      <p className="text-gray-300 mb-6">
        Человеческий глаз эволюционно заточен мгновенно замечать движение. 
        Это древний механизм выживания. В интерфейсе мы эксплуатируем этот рефлекс.
      </p>
      
      {/* Демо управления вниманием */}
      <div className="mb-8">
        <AttentionDemo />
      </div>

      {/* Критический Вердикт */}
      <div className="mt-12 p-8 bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-lg border border-purple-700/50">
        <h3 className="text-2xl font-bold text-purple-300 mb-4">
          Критический Вердикт
        </h3>
        
        <p className="text-gray-200 text-lg mb-4">
          Думать о моушн-дизайне как об "оживлении графики" — значит оставаться на уровне ремесленника.
        </p>
        
        <p className="text-gray-200 text-lg mb-0">
          Понимание его как <strong className="text-purple-400">инженерной дисциплины по управлению 
          вниманием и смыслом во времени</strong> — это переход на уровень архитектора систем взаимодействия.
        </p>
      </div>
    </div>
  );
};

export default PrefaceIntro;