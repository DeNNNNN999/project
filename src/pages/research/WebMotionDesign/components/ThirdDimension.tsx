import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';

const ThirdDimension: React.FC = () => {
  const [show3D, setShow3D] = useState(false);
  const [showPerformance, setShowPerformance] = useState(false);
  const [activeJob, setActiveJob] = useState<1 | 2 | 3>(1);
  const [show25D, setShow25D] = useState(true);
  const [performanceMetrics, setPerformanceMetrics] = useState({ fps: 60, battery: 100, cpu: 10 });

  // Симуляция производительности
  useEffect(() => {
    if (show3D && showPerformance) {
      const interval = setInterval(() => {
        setPerformanceMetrics(prev => ({
          fps: Math.max(15, prev.fps - Math.random() * 5),
          battery: Math.max(70, prev.battery - 0.5),
          cpu: Math.min(90, prev.cpu + Math.random() * 10)
        }));
      }, 100);
      return () => clearInterval(interval);
    } else {
      setPerformanceMetrics({ fps: 60, battery: 100, cpu: 10 });
    }
  }, [show3D, showPerformance]);

  // Визуализация цены 3D
  const PriceOf3D = () => {
    return (
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {/* Цена производительности */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-6 bg-red-900/20 rounded-lg border border-red-800/50"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-red-600/20 rounded-lg flex items-center justify-center">
              <Icon icon="ph:battery-warning" className="w-6 h-6 text-red-400" />
            </div>
            <h4 className="text-xl font-semibold text-red-400">Производительность</h4>
          </div>
          <p className="text-gray-300 mb-3">Деньги вашего пользователя</p>
          <ul className="space-y-2 text-sm text-gray-400">
            <li className="flex items-start gap-2">
              <Icon icon="ph:lightning" className="w-4 h-4 mt-0.5 text-red-400" />
              <span>CPU/GPU нагрузка</span>
            </li>
            <li className="flex items-start gap-2">
              <Icon icon="ph:thermometer" className="w-4 h-4 mt-0.5 text-red-400" />
              <span>Нагрев устройства</span>
            </li>
            <li className="flex items-start gap-2">
              <Icon icon="ph:battery-empty" className="w-4 h-4 mt-0.5 text-red-400" />
              <span>Быстрый разряд батареи</span>
            </li>
          </ul>
          <div className="mt-4 p-3 bg-red-800/20 rounded">
            <p className="text-xs text-red-300">
              15% заряда за 10 минут = враждебность к пользователю
            </p>
          </div>
        </motion.div>

        {/* Цена когнитивной нагрузки */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-6 bg-orange-900/20 rounded-lg border border-orange-800/50"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-orange-600/20 rounded-lg flex items-center justify-center">
              <Icon icon="ph:brain" className="w-6 h-6 text-orange-400" />
            </div>
            <h4 className="text-xl font-semibold text-orange-400">Когнитивная нагрузка</h4>
          </div>
          <p className="text-gray-300 mb-3">Время вашего пользователя</p>
          <ul className="space-y-2 text-sm text-gray-400">
            <li className="flex items-start gap-2">
              <Icon icon="ph:cube" className="w-4 h-4 mt-0.5 text-orange-400" />
              <span>Сложная ментальная модель</span>
            </li>
            <li className="flex items-start gap-2">
              <Icon icon="ph:question" className="w-4 h-4 mt-0.5 text-orange-400" />
              <span>Неоднозначность</span>
            </li>
            <li className="flex items-start gap-2">
              <Icon icon="ph:eye-closed" className="w-4 h-4 mt-0.5 text-orange-400" />
              <span>Отвлечение от задачи</span>
            </li>
          </ul>
          <div className="mt-4 p-3 bg-orange-800/20 rounded">
            <p className="text-xs text-orange-300">
              Мозг тратит ресурсы на перспективу вместо контента
            </p>
          </div>
        </motion.div>

        {/* Цена доступности */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-6 bg-yellow-900/20 rounded-lg border border-yellow-800/50"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-yellow-600/20 rounded-lg flex items-center justify-center">
              <Icon icon="ph:warning-octagon" className="w-6 h-6 text-yellow-400" />
            </div>
            <h4 className="text-xl font-semibold text-yellow-400">Доступность</h4>
          </div>
          <p className="text-gray-300 mb-3">Здоровье вашего пользователя</p>
          <ul className="space-y-2 text-sm text-gray-400">
            <li className="flex items-start gap-2">
              <Icon icon="ph:spiral" className="w-4 h-4 mt-0.5 text-yellow-400" />
              <span>Вестибулярные расстройства</span>
            </li>
            <li className="flex items-start gap-2">
              <Icon icon="ph:waves" className="w-4 h-4 mt-0.5 text-yellow-400" />
              <span>Киберболезнь</span>
            </li>
            <li className="flex items-start gap-2">
              <Icon icon="ph:accessibility" className="w-4 h-4 mt-0.5 text-yellow-400" />
              <span>prefers-reduced-motion</span>
            </li>
          </ul>
          <div className="mt-4 p-3 bg-yellow-800/20 rounded">
            <p className="text-xs text-yellow-300">
              Головокружение, тошнота, дезориентация
            </p>
          </div>
        </motion.div>
      </div>
    );
  };

  // Демо производительности
  const PerformanceDemo = () => {
    return (
      <div className="p-6 bg-slate-800/50 rounded-lg border border-slate-700 mb-8">
        <h4 className="text-purple-400 font-semibold mb-4">
          Производительность: 2D vs 3D
        </h4>

        <div className="grid md:grid-cols-2 gap-6">
          {/* 2D версия */}
          <div className="relative">
            <h5 className="text-green-400 font-medium mb-3">2D карточка</h5>
            <div className="relative h-48 bg-slate-900 rounded-lg overflow-hidden">
              <motion.div
                className="absolute inset-4 bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-xl p-6"
                animate={!show3D ? { y: [0, -10, 0] } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Icon icon="ph:credit-card" className="w-12 h-12 text-white mb-2" />
                <p className="text-white font-semibold">Простая карточка</p>
                <p className="text-green-100 text-sm">Легкая анимация</p>
              </motion.div>
            </div>
            <div className="mt-3 space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">FPS:</span>
                <span className="text-green-400 font-mono">60</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">CPU:</span>
                <span className="text-green-400 font-mono">10%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Батарея:</span>
                <span className="text-green-400 font-mono">100%</span>
              </div>
            </div>
          </div>

          {/* 3D версия */}
          <div className="relative">
            <h5 className="text-red-400 font-medium mb-3">3D карточка</h5>
            <div className="relative h-48 bg-slate-900 rounded-lg overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="w-32 h-32 bg-gradient-to-br from-red-500 to-red-600 rounded-lg shadow-2xl preserve-3d"
                  animate={show3D ? {
                    rotateY: [0, 360],
                    rotateX: [-20, 20, -20]
                  } : {}}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  style={{ 
                    transformStyle: 'preserve-3d',
                    perspective: 1000
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Icon icon="ph:cube" className="w-16 h-16 text-white" />
                  </div>
                </motion.div>
              </div>
              
              {/* Симуляция полигонов */}
              {show3D && [...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-red-400/20"
                  animate={{
                    x: Math.random() * 200 - 100,
                    y: Math.random() * 200 - 100,
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                  style={{
                    left: '50%',
                    top: '50%'
                  }}
                />
              ))}
            </div>
            <div className="mt-3 space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">FPS:</span>
                <span className={`font-mono ${performanceMetrics.fps > 30 ? 'text-yellow-400' : 'text-red-400'}`}>
                  {show3D ? Math.round(performanceMetrics.fps) : '60'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">CPU:</span>
                <span className={`font-mono ${performanceMetrics.cpu < 50 ? 'text-yellow-400' : 'text-red-400'}`}>
                  {show3D ? `${Math.round(performanceMetrics.cpu)}%` : '10%'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Батарея:</span>
                <span className={`font-mono ${performanceMetrics.battery > 85 ? 'text-yellow-400' : 'text-red-400'}`}>
                  {show3D ? `${Math.round(performanceMetrics.battery)}%` : '100%'}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <button
            onClick={() => {
              setShow3D(!show3D);
              setShowPerformance(true);
            }}
            className={`px-6 py-2 rounded-lg font-medium transition-all ${
              show3D 
                ? 'bg-red-600 text-white hover:bg-red-700' 
                : 'bg-green-600 text-white hover:bg-green-700'
            }`}
          >
            {show3D ? 'Выключить 3D' : 'Включить 3D'}
          </button>
        </div>
      </div>
    );
  };

  // Правильные работы для 3D
  const RightJobsFor3D = () => {
    const jobs = [
      {
        id: 1,
        title: 'Демонстрация физического объекта',
        icon: 'ph:sneaker',
        color: 'green',
        examples: ['E-commerce: покрутить кроссовок', 'Медицина: 3D модель сердца', 'Архитектура: виртуальный дом']
      },
      {
        id: 2,
        title: 'Пространственная метафора',
        icon: 'ph:globe',
        color: 'blue',
        examples: ['VR/AR интерфейсы', '3D визуализация данных', 'Игровые интерфейсы']
      },
      {
        id: 3,
        title: 'Фирменное взаимодействие',
        icon: 'ph:shooting-star',
        color: 'purple',
        examples: ['Глобус Stripe/GitHub', '3D маскот Duolingo', 'Один wow-элемент']
      }
    ];

    return (
      <div className="mb-8">
        <h3 className="text-2xl font-semibold text-purple-300 mb-6">
          Три правильные "работы" для 3D
        </h3>

        <div className="grid md:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <motion.div
              key={job.id}
              className={`p-6 rounded-lg border cursor-pointer transition-all ${
                activeJob === job.id
                  ? `bg-${job.color}-900/20 border-${job.color}-800/50 shadow-lg shadow-${job.color}-900/50`
                  : 'bg-slate-800/50 border-slate-700 hover:border-slate-600'
              }`}
              onClick={() => setActiveJob(job.id as 1 | 2 | 3)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-12 h-12 bg-${job.color}-600/20 rounded-lg flex items-center justify-center`}>
                  <Icon icon={job.icon} className={`w-6 h-6 text-${job.color}-400`} />
                </div>
                <h4 className={`text-lg font-semibold text-${job.color}-400`}>Работа {job.id}</h4>
              </div>
              <p className="text-gray-300 mb-4">{job.title}</p>
              <ul className="space-y-1 text-sm text-gray-400">
                {job.examples.map((example, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Icon icon="ph:check" className={`w-4 h-4 mt-0.5 text-${job.color}-400`} />
                    <span>{example}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    );
  };

  // Демо 2.5D техник
  const TwoPointFiveDemo = () => {
    const [hoveredCard, setHoveredCard] = useState<number | null>(null);
    const [scrollY, setScrollY] = useState(0);

    return (
      <div className="p-6 bg-purple-900/20 rounded-lg border border-purple-800/50">
        <h4 className="text-purple-400 font-semibold mb-4 flex items-center gap-2">
          <Icon icon="ph:magic-wand" className="w-5 h-5" />
          Магия "2.5D" — Глубина для бедных
        </h4>

        <p className="text-gray-300 mb-6">
          В 90% случаев нам не нужно настоящее 3D. Нам нужна <strong className="text-purple-400">иллюзия глубины</strong>.
        </p>

        <div className="space-y-8">
          {/* Слои и тени */}
          <div>
            <h5 className="text-purple-300 font-medium mb-3">1. Слои и тени (Material Design)</h5>
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3].map((elevation) => (
                <motion.div
                  key={elevation}
                  className="p-4 bg-white text-gray-900 rounded-lg text-center"
                  animate={{
                    boxShadow: hoveredCard === elevation 
                      ? `0 ${elevation * 8}px ${elevation * 16}px rgba(0,0,0,0.${elevation * 2})`
                      : `0 ${elevation * 2}px ${elevation * 4}px rgba(0,0,0,0.${elevation})`
                  }}
                  onMouseEnter={() => setHoveredCard(elevation)}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{
                    transform: hoveredCard === elevation ? `translateY(-${elevation * 2}px)` : 'translateY(0)'
                  }}
                >
                  <p className="font-semibold">Высота {elevation}</p>
                  <p className="text-sm text-gray-600">Тень {elevation * 2}px</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Параллакс */}
          <div>
            <h5 className="text-purple-300 font-medium mb-3">2. Параллакс эффект</h5>
            <div 
              className="relative h-32 bg-slate-900 rounded-lg overflow-hidden"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width;
                setScrollY((x - 0.5) * 20);
              }}
            >
              {/* Фон */}
              <motion.div
                className="absolute inset-0 opacity-30"
                animate={{ x: scrollY * 0.5 }}
              >
                <div className="h-full w-[150%] bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600" />
              </motion.div>
              
              {/* Средний слой */}
              <motion.div
                className="absolute inset-x-0 top-1/2 -translate-y-1/2"
                animate={{ x: scrollY }}
              >
                <div className="flex gap-4 px-8">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-16 h-16 bg-purple-500/50 rounded" />
                  ))}
                </div>
              </motion.div>
              
              {/* Передний план */}
              <motion.div
                className="absolute inset-x-0 bottom-4"
                animate={{ x: scrollY * 1.5 }}
              >
                <p className="text-white text-center font-semibold">Двигайте мышью →</p>
              </motion.div>
            </div>
          </div>

          {/* Масштаб и размытие */}
          <div>
            <h5 className="text-purple-300 font-medium mb-3">3. Масштаб и размытие</h5>
            <div className="relative h-32 bg-slate-900 rounded-lg flex items-center justify-center">
              <div className="relative">
                {/* Задний план */}
                <motion.div
                  className="absolute -inset-4 bg-purple-600/20 rounded-lg blur-sm"
                  animate={{ scale: 0.9 }}
                />
                {/* Средний план */}
                <motion.div
                  className="absolute -inset-2 bg-purple-600/40 rounded-lg"
                  animate={{ scale: 0.95 }}
                />
                {/* Передний план */}
                <div className="relative bg-purple-600 text-white p-4 rounded-lg">
                  <p className="font-semibold">Передний план</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-purple-800/20 rounded text-sm">
          <p className="text-purple-300">
            <Icon icon="ph:coins" className="inline w-4 h-4 mr-1" />
            <strong>Цена:</strong> Почти бесплатно по сравнению с настоящим 3D
          </p>
        </div>
      </div>
    );
  };

  // Чек-лист принятия решения
  const DecisionChecklist = () => {
    const [checks, setChecks] = useState([false, false, false, false]);

    const toggleCheck = (index: number) => {
      const newChecks = [...checks];
      newChecks[index] = !newChecks[index];
      setChecks(newChecks);
    };

    const questions = [
      'Какую задачу я решаю?',
      'Могу ли я решить ее с помощью 2.5D (слои, тени, параллакс)?',
      'Действительно ли мне нужна объемная модель для передачи информации?',
      'Могу ли я гарантировать 60 FPS на среднем устройстве?'
    ];

    return (
      <div className="p-6 bg-slate-800/50 rounded-lg border border-slate-700">
        <h4 className="text-purple-400 font-semibold mb-4 flex items-center gap-2">
          <Icon icon="ph:list-checks" className="w-5 h-5" />
          Чек-лист принятия решения
        </h4>

        <div className="space-y-3">
          {questions.map((question, index) => (
            <motion.div
              key={index}
              className={`p-3 rounded-lg border cursor-pointer transition-all ${
                checks[index] 
                  ? 'bg-green-900/20 border-green-800/50' 
                  : 'bg-slate-900/50 border-slate-700'
              }`}
              onClick={() => toggleCheck(index)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-start gap-3">
                <div className={`w-6 h-6 rounded border-2 flex items-center justify-center mt-0.5 ${
                  checks[index] 
                    ? 'bg-green-600 border-green-600' 
                    : 'border-slate-600'
                }`}>
                  {checks[index] && <Icon icon="ph:check" className="w-4 h-4 text-white" />}
                </div>
                <p className={`${checks[index] ? 'text-green-300' : 'text-gray-300'}`}>
                  {question}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {checks[1] && !checks[2] && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 p-4 bg-green-900/20 rounded-lg border border-green-800/50"
            >
              <p className="text-green-300 text-sm">
                <Icon icon="ph:check-circle" className="inline w-4 h-4 mr-1" />
                Отлично! Используйте 2.5D техники — это оптимальное решение.
              </p>
            </motion.div>
          )}
          
          {checks[2] && !checks[3] && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 p-4 bg-red-900/20 rounded-lg border border-red-800/50"
            >
              <p className="text-red-300 text-sm">
                <Icon icon="ph:warning" className="inline w-4 h-4 mr-1" />
                Проблема с производительностью! Вернитесь к 2.5D решению.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <div className="prose prose-invert max-w-none">
      <h2 className="mb-8 text-3xl font-bold text-purple-400">
        Третье Измерение — Роскошь или Необходимость?
      </h2>

      {/* Вступление */}
      <div className="p-6 mb-8 bg-blue-900/20 rounded-lg border border-blue-800/50">
        <p className="text-lg text-blue-300 mb-4">
          <Icon icon="ph:cube" className="inline w-6 h-6 mr-2" />
          <strong>Искушение 3D:</strong> "А что, если эта карточка будет переворачиваться, как в реальной жизни?"
        </p>
        <p className="text-gray-300 mb-0">
          3D обещает глубину, реализм, иммерсивность. И в этом кроется его <strong className="text-blue-400">главная опасность</strong>.
        </p>
      </div>

      {/* Главная идея */}
      <div className="p-6 mb-12 bg-purple-900/20 rounded-lg border border-purple-700/50">
        <h3 className="text-2xl font-semibold text-purple-400 mb-4">
          3D — это самый "дорогой" инструмент в арсенале
        </h3>
        <p className="text-lg text-gray-200">
          У него есть три цены: <strong className="text-red-400">производительность</strong>, 
          <strong className="text-orange-400"> когнитивная нагрузка</strong> и 
          <strong className="text-yellow-400"> доступность</strong>. 
          Используйте его как хирург использует скальпель — редко, точно и только когда необходимо.
        </p>
      </div>

      {/* Демо производительности */}
      <PerformanceDemo />

      {/* Визуализация цены */}
      <div className="mb-12">
        <h3 className="text-2xl font-semibold text-purple-300 mb-6">
          Цена третьего измерения
        </h3>
        <PriceOf3D />
      </div>

      {/* Правильные работы */}
      <RightJobsFor3D />

      {/* 2.5D демо */}
      <div className="mb-12">
        <TwoPointFiveDemo />
      </div>

      {/* Чек-лист */}
      <div className="mb-12">
        <DecisionChecklist />
      </div>

      {/* Примеры из реального мира */}
      <div className="mb-12">
        <h3 className="text-2xl font-semibold text-purple-300 mb-6">
          Примеры из реального мира
        </h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 bg-green-900/20 rounded-lg border border-green-800/50">
            <h4 className="text-green-400 font-semibold mb-3 flex items-center gap-2">
              <Icon icon="ph:check-circle" className="w-5 h-5" />
              Правильное использование 3D
            </h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-start gap-2">
                <Icon icon="simple-icons:nike" className="w-5 h-5 mt-0.5 text-green-400" />
                <div>
                  <strong>Nike:</strong> 3D модели кроссовок для покупателей
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Icon icon="simple-icons:stripe" className="w-5 h-5 mt-0.5 text-green-400" />
                <div>
                  <strong>Stripe:</strong> Один интерактивный глобус
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Icon icon="simple-icons:duolingo" className="w-5 h-5 mt-0.5 text-green-400" />
                <div>
                  <strong>Duolingo:</strong> 3D маскот как бренд
                </div>
              </li>
            </ul>
          </div>

          <div className="p-6 bg-red-900/20 rounded-lg border border-red-800/50">
            <h4 className="text-red-400 font-semibold mb-3 flex items-center gap-2">
              <Icon icon="ph:x-circle" className="w-5 h-5" />
              Неправильное использование 3D
            </h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-start gap-2">
                <Icon icon="ph:cards" className="w-5 h-5 mt-0.5 text-red-400" />
                <div>
                  <strong>3D карточки:</strong> Без функционального смысла
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Icon icon="ph:navigation-arrow" className="w-5 h-5 mt-0.5 text-red-400" />
                <div>
                  <strong>3D навигация:</strong> Дезориентирует пользователей
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Icon icon="ph:text-aa" className="w-5 h-5 mt-0.5 text-red-400" />
                <div>
                  <strong>3D текст:</strong> Ухудшает читаемость
                </div>
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
            Перестаньте думать о 3D как об украшении.<br/>
            <strong className="text-purple-400">Думайте о нем как о специнструменте.</strong>
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-start gap-3 p-3 bg-blue-900/20 rounded-lg">
            <Icon icon="ph:package" className="w-6 h-6 text-blue-400 mt-0.5" />
            <div>
              <span className="font-medium text-blue-400">Показываете объект?</span>
              <p className="text-gray-300 text-sm mt-1">
                3D оправдано — это суть контента.
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3 p-3 bg-purple-900/20 rounded-lg">
            <Icon icon="ph:stack" className="w-6 h-6 text-purple-400 mt-0.5" />
            <div>
              <span className="font-medium text-purple-400">Нужна иллюзия глубины?</span>
              <p className="text-gray-300 text-sm mt-1">
                2.5D техники — оптимальное решение.
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3 p-3 bg-yellow-900/20 rounded-lg">
            <Icon icon="ph:battery-warning" className="w-6 h-6 text-yellow-400 mt-0.5" />
            <div>
              <span className="font-medium text-yellow-400">Помните о цене</span>
              <p className="text-gray-300 text-sm mt-1">
                Каждый полигон = батарея, время и здоровье пользователя.
              </p>
            </div>
          </div>

          <p className="text-lg text-gray-200 italic text-center mt-8">
            Используйте 3D, когда нужно показать <strong className="text-purple-400">объект</strong>, 
            а не просто <strong className="text-purple-400">интерфейс</strong>.<br/>
            Во всех остальных случаях магии 2.5D будет более чем достаточно.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ThirdDimension;