import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { Icon } from '@iconify/react';

const TimeAsMaterial: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingType, setLoadingType] = useState<'static' | 'spinner' | 'skeleton' | 'playful'>('static');
  const [animationType, setAnimationType] = useState<'linear' | 'ease-out'>('linear');
  const [formStep, setFormStep] = useState(1);
  const [formData, setFormData] = useState<any>({});
  const [showTimeComparison, setShowTimeComparison] = useState(false);
  const [perceivedTime, setPerceivedTime] = useState({ static: 0, spinner: 0, skeleton: 0, playful: 0 });

  // Демо двойной природы времени
  const DualNatureDemo = () => {
    const [absoluteTime, setAbsoluteTime] = useState(0);
    const [subjectiveTime, setSubjectiveTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
      let interval: NodeJS.Timeout;
      if (isRunning) {
        interval = setInterval(() => {
          setAbsoluteTime(prev => prev + 100);
          // Субъективное время идет нелинейно
          setSubjectiveTime(prev => {
            if (prev < 2000) return prev + 150; // Первые 2 секунды кажутся длиннее
            if (prev < 4000) return prev + 100; // Средние 2 секунды нормальные
            return prev + 50; // Последние секунды пролетают быстро
          });
        }, 100);
      }
      return () => clearInterval(interval);
    }, [isRunning]);

    const resetTimers = () => {
      setAbsoluteTime(0);
      setSubjectiveTime(0);
      setIsRunning(false);
    };

    return (
      <div className="p-6 bg-purple-900/20 rounded-lg border border-purple-800/50 mb-12">
        <h3 className="text-2xl font-semibold text-purple-400 mb-6">
          Двойная природа времени
        </h3>
        
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="p-4 bg-blue-900/20 rounded-lg border border-blue-800/50">
            <h4 className="text-blue-400 font-semibold mb-3 flex items-center gap-2">
              <Icon icon="ph:clock" className="w-5 h-5" />
              Абсолютное время
            </h4>
            <div className="text-center">
              <div className="text-4xl font-mono text-blue-300 mb-2">
                {(absoluteTime / 1000).toFixed(1)}s
              </div>
              <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-blue-500"
                  animate={{ width: `${(absoluteTime / 5000) * 100}%` }}
                />
              </div>
              <p className="text-sm text-gray-400 mt-3">
                Линейно и предсказуемо
              </p>
            </div>
          </div>

          <div className="p-4 bg-purple-900/20 rounded-lg border border-purple-800/50">
            <h4 className="text-purple-400 font-semibold mb-3 flex items-center gap-2">
              <Icon icon="ph:brain" className="w-5 h-5" />
              Субъективное время
            </h4>
            <div className="text-center">
              <div className="text-4xl font-mono text-purple-300 mb-2">
                {(subjectiveTime / 1000).toFixed(1)}s
              </div>
              <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-purple-500"
                  animate={{ width: `${(subjectiveTime / 5000) * 100}%` }}
                />
              </div>
              <p className="text-sm text-gray-400 mt-3">
                Эластично и субъективно
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              isRunning 
                ? 'bg-red-600 hover:bg-red-700 text-white' 
                : 'bg-green-600 hover:bg-green-700 text-white'
            }`}
          >
            {isRunning ? 'Остановить' : 'Запустить'} таймеры
          </button>
          <button
            onClick={resetTimers}
            className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition-colors"
          >
            Сбросить
          </button>
        </div>

        <div className="mt-6 p-4 bg-purple-800/20 rounded text-sm text-gray-300">
          <Icon icon="ph:lightbulb" className="inline w-4 h-4 text-purple-400 mr-1" />
          Заметьте: субъективное время течет по-разному. Начало кажется медленным, конец — быстрым.
        </div>
      </div>
    );
  };

  // Техника 1: Занять Мозг
  const OccupyBrainDemo = () => {
    const [startTime, setStartTime] = useState<number | null>(null);
    const [endTime, setEndTime] = useState<number | null>(null);

    const startLoading = (type: typeof loadingType) => {
      setLoadingType(type);
      setIsLoading(true);
      setStartTime(Date.now());
      setEndTime(null);
      
      // Симуляция загрузки
      setTimeout(() => {
        const end = Date.now();
        setEndTime(end);
        setIsLoading(false);
        
        // Обновляем воспринимаемое время
        const elapsed = end - Date.now() + 3000; // 3 секунды загрузки
        setPerceivedTime(prev => ({
          ...prev,
          [type]: elapsed
        }));
      }, 3000);
    };

    // Компоненты загрузки
    const LoadingStatic = () => (
      <div className="text-center text-gray-400">
        <p className="text-lg">Загрузка...</p>
      </div>
    );

    const LoadingSpinner = () => (
      <div className="flex justify-center">
        <motion.div
          className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    );

    const LoadingSkeleton = () => (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="h-4 bg-slate-700 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-slate-700/50 rounded w-full"></div>
          </div>
        ))}
      </div>
    );

    const LoadingPlayful = () => {
      const [dino, setDino] = useState({ jump: false, score: 0 });
      
      useEffect(() => {
        const interval = setInterval(() => {
          setDino(prev => ({ ...prev, score: prev.score + 1 }));
        }, 500);
        return () => clearInterval(interval);
      }, []);

      return (
        <div className="text-center">
          <motion.div
            animate={dino.jump ? { y: -30 } : { y: 0 }}
            transition={{ duration: 0.3 }}
            className="inline-block mb-2"
          >
            <Icon icon="ph:alien" className="w-16 h-16 text-green-400" />
          </motion.div>
          <p className="text-gray-400">Счет: {dino.score}</p>
          <button
            onClick={() => setDino(prev => ({ ...prev, jump: true }))}
            onAnimationEnd={() => setDino(prev => ({ ...prev, jump: false }))}
            className="mt-2 px-4 py-1 bg-green-600 text-white rounded text-sm"
          >
            Прыгнуть!
          </button>
        </div>
      );
    };

    return (
      <div className="mb-12">
        <h3 className="text-2xl font-semibold text-purple-300 mb-6">
          Техника 1: "Занять Мозг" — Маскировка Ожидания
        </h3>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Статический текст */}
          <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
            <h4 className="text-red-400 font-medium mb-3">Плохо: Статический</h4>
            <div className="h-32 flex items-center justify-center bg-slate-900 rounded mb-3">
              {isLoading && loadingType === 'static' ? <LoadingStatic /> : (
                <Icon icon="ph:package" className="w-12 h-12 text-gray-600" />
              )}
            </div>
            <button
              onClick={() => startLoading('static')}
              disabled={isLoading}
              className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white rounded transition-colors"
            >
              Загрузить
            </button>
            <p className="text-xs text-gray-400 mt-2">
              Мозг не занят = время тянется
            </p>
          </div>

          {/* Спиннер */}
          <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
            <h4 className="text-yellow-400 font-medium mb-3">Лучше: Спиннер</h4>
            <div className="h-32 flex items-center justify-center bg-slate-900 rounded mb-3">
              {isLoading && loadingType === 'spinner' ? <LoadingSpinner /> : (
                <Icon icon="ph:package" className="w-12 h-12 text-gray-600" />
              )}
            </div>
            <button
              onClick={() => startLoading('spinner')}
              disabled={isLoading}
              className="w-full px-4 py-2 bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-600 text-white rounded transition-colors"
            >
              Загрузить
            </button>
            <p className="text-xs text-gray-400 mt-2">
              Движение отвлекает внимание
            </p>
          </div>

          {/* Скелетон */}
          <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
            <h4 className="text-blue-400 font-medium mb-3">Хорошо: Скелетон</h4>
            <div className="h-32 flex items-center justify-center bg-slate-900 rounded mb-3 p-3">
              {isLoading && loadingType === 'skeleton' ? <LoadingSkeleton /> : (
                <Icon icon="ph:package" className="w-12 h-12 text-gray-600" />
              )}
            </div>
            <button
              onClick={() => startLoading('skeleton')}
              disabled={isLoading}
              className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white rounded transition-colors"
            >
              Загрузить
            </button>
            <p className="text-xs text-gray-400 mt-2">
              Подготавливает к контенту
            </p>
          </div>

          {/* Игривый лоадер */}
          <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
            <h4 className="text-green-400 font-medium mb-3">Отлично: Игра</h4>
            <div className="h-32 flex items-center justify-center bg-slate-900 rounded mb-3">
              {isLoading && loadingType === 'playful' ? <LoadingPlayful /> : (
                <Icon icon="ph:package" className="w-12 h-12 text-gray-600" />
              )}
            </div>
            <button
              onClick={() => startLoading('playful')}
              disabled={isLoading}
              className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white rounded transition-colors"
            >
              Загрузить
            </button>
            <p className="text-xs text-gray-400 mt-2">
              Превращает ожидание в игру
            </p>
          </div>
        </div>

        <div className="p-4 bg-purple-900/20 rounded-lg border-l-4 border-purple-500">
          <p className="text-gray-300">
            <Icon icon="ph:magic-wand" className="inline w-5 h-5 text-purple-400 mr-2" />
            <strong className="text-purple-400">Магия:</strong> Мы не сделали процесс быстрее. 
            Мы сделали ожидание менее мучительным, занимая мозг пользователя.
          </p>
        </div>
      </div>
    );
  };

  // Техника 2: Быстрый старт
  const FastStartDemo = () => {
    const [isMoving, setIsMoving] = useState(false);
    const [showComparison, setShowComparison] = useState(false);

    const startAnimation = () => {
      setIsMoving(true);
      setTimeout(() => setIsMoving(false), 400);
    };

    return (
      <div className="mb-12">
        <h3 className="text-2xl font-semibold text-purple-300 mb-6">
          Техника 2: "Быстрый Старт, Медленный Финиш"
        </h3>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Линейная анимация */}
          <div className="p-6 bg-red-900/20 rounded-lg border border-red-800/50">
            <h4 className="text-red-400 font-semibold mb-4 flex items-center gap-2">
              <Icon icon="ph:equals" className="w-5 h-5" />
              Линейная анимация
            </h4>
            <div className="relative h-20 bg-slate-900 rounded-lg mb-4 overflow-hidden">
              <motion.div
                className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center"
                animate={isMoving && animationType === 'linear' ? { x: 300 } : { x: 0 }}
                transition={{ duration: 0.4, ease: "linear" }}
              >
                <Icon icon="ph:package" className="w-6 h-6 text-white" />
              </motion.div>
            </div>
            <div className="space-y-2 text-sm text-gray-400">
              <p>⏱️ Длительность: 400ms</p>
              <p>📊 Скорость: Постоянная</p>
              <p>🧠 Ощущение: Механично, медленно</p>
            </div>
          </div>

          {/* Ease-out анимация */}
          <div className="p-6 bg-green-900/20 rounded-lg border border-green-800/50">
            <h4 className="text-green-400 font-semibold mb-4 flex items-center gap-2">
              <Icon icon="ph:chart-line-down" className="w-5 h-5" />
              Ease-out анимация
            </h4>
            <div className="relative h-20 bg-slate-900 rounded-lg mb-4 overflow-hidden">
              <motion.div
                className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center"
                animate={isMoving && animationType === 'ease-out' ? { x: 300 } : { x: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <Icon icon="ph:package" className="w-6 h-6 text-white" />
              </motion.div>
            </div>
            <div className="space-y-2 text-sm text-gray-400">
              <p>⏱️ Длительность: 400ms (та же!)</p>
              <p>📊 Скорость: Быстрый старт → замедление</p>
              <p>🧠 Ощущение: Отзывчиво, естественно</p>
            </div>
          </div>
        </div>

        {/* График скорости */}
        <div className="p-6 bg-slate-800/50 rounded-lg border border-slate-700 mb-6">
          <h4 className="text-purple-400 font-semibold mb-4">Визуализация скорости движения</h4>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h5 className="text-red-300 font-medium mb-2">Линейная</h5>
              <div className="h-32 bg-slate-900 rounded p-4">
                <svg viewBox="0 0 100 50" className="w-full h-full">
                  <line x1="10" y1="40" x2="90" y2="10" stroke="#ef4444" strokeWidth="2" />
                  <text x="50" y="48" fill="#9ca3af" fontSize="8" textAnchor="middle">Время →</text>
                  <text x="5" y="25" fill="#9ca3af" fontSize="8" textAnchor="middle" transform="rotate(-90 5 25)">Скорость</text>
                </svg>
              </div>
            </div>
            <div>
              <h5 className="text-green-300 font-medium mb-2">Ease-out</h5>
              <div className="h-32 bg-slate-900 rounded p-4">
                <svg viewBox="0 0 100 50" className="w-full h-full">
                  <path d="M 10,40 Q 30,10 90,10" fill="none" stroke="#10b981" strokeWidth="2" />
                  <text x="50" y="48" fill="#9ca3af" fontSize="8" textAnchor="middle">Время →</text>
                  <text x="5" y="25" fill="#9ca3af" fontSize="8" textAnchor="middle" transform="rotate(-90 5 25)">Скорость</text>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => {
              setAnimationType('linear');
              startAnimation();
            }}
            className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
          >
            Запустить линейную
          </button>
          <button
            onClick={() => {
              setAnimationType('ease-out');
              startAnimation();
            }}
            className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
          >
            Запустить ease-out
          </button>
        </div>

        <div className="mt-6 p-4 bg-green-900/20 rounded-lg border-l-4 border-green-500">
          <p className="text-gray-300">
            <Icon icon="ph:brain" className="inline w-5 h-5 text-green-400 mr-2" />
            <strong className="text-green-400">Психология:</strong> Мозг уделяет больше внимания началу движения. 
            Резкий старт создает иллюзию высокой скорости, даже если общее время одинаково.
          </p>
        </div>
      </div>
    );
  };

  // Техника 3: Разделяй и властвуй
  const DivideConquerDemo = () => {
    const totalFields = 10;
    const fieldsPerStep = 3;
    const maxSteps = Math.ceil(totalFields / fieldsPerStep);

    const handleNext = () => {
      if (formStep < maxSteps) {
        setFormStep(formStep + 1);
      }
    };

    const handlePrev = () => {
      if (formStep > 1) {
        setFormStep(formStep - 1);
      }
    };

    const [showAllFields, setShowAllFields] = useState(false);

    return (
      <div className="mb-12">
        <h3 className="text-2xl font-semibold text-purple-300 mb-6">
          Техника 3: "Разделяй и Властвуй" — Разбивка Сложных Процессов
        </h3>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Все поля сразу */}
          <div className="p-6 bg-red-900/20 rounded-lg border border-red-800/50">
            <h4 className="text-red-400 font-semibold mb-4 flex items-center gap-2">
              <Icon icon="ph:x-circle" className="w-5 h-5" />
              Плохо: Все сразу
            </h4>
            
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {showAllFields ? (
                <>
                  {[...Array(10)].map((_, i) => (
                    <div key={i}>
                      <label className="block text-sm text-gray-400 mb-1">
                        Поле {i + 1}
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 bg-slate-800 rounded border border-slate-600 text-white"
                        placeholder={`Введите данные ${i + 1}`}
                      />
                    </div>
                  ))}
                  <button className="w-full mt-4 px-4 py-2 bg-red-600 text-white rounded">
                    Отправить все
                  </button>
                </>
              ) : (
                <div className="text-center py-12">
                  <Icon icon="ph:list-dashes" className="w-16 h-16 text-red-400 mx-auto mb-4" />
                  <button
                    onClick={() => setShowAllFields(true)}
                    className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition-colors"
                  >
                    Показать форму
                  </button>
                </div>
              )}
            </div>
            
            <p className="text-sm text-gray-400 mt-4">
              😰 Пугающе! 10 полей = большая задача
            </p>
          </div>

          {/* Пошаговая форма */}
          <div className="p-6 bg-green-900/20 rounded-lg border border-green-800/50">
            <h4 className="text-green-400 font-semibold mb-4 flex items-center gap-2">
              <Icon icon="ph:check-circle" className="w-5 h-5" />
              Хорошо: По шагам
            </h4>
            
            {/* Прогресс */}
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-400">Шаг {formStep} из {maxSteps}</span>
                <span className="text-sm text-gray-400">{Math.round((formStep / maxSteps) * 100)}%</span>
              </div>
              <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-green-500"
                  animate={{ width: `${(formStep / maxSteps) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>

            {/* Поля текущего шага */}
            <AnimatePresence mode="wait">
              <motion.div
                key={formStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-3"
              >
                {[...Array(Math.min(fieldsPerStep, totalFields - (formStep - 1) * fieldsPerStep))].map((_, i) => {
                  const fieldIndex = (formStep - 1) * fieldsPerStep + i;
                  return (
                    <div key={fieldIndex}>
                      <label className="block text-sm text-gray-400 mb-1">
                        {fieldIndex === 0 && 'Ваше имя'}
                        {fieldIndex === 1 && 'Email'}
                        {fieldIndex === 2 && 'Телефон'}
                        {fieldIndex === 3 && 'Компания'}
                        {fieldIndex === 4 && 'Должность'}
                        {fieldIndex === 5 && 'Опыт работы'}
                        {fieldIndex === 6 && 'Навыки'}
                        {fieldIndex === 7 && 'Образование'}
                        {fieldIndex === 8 && 'Портфолио'}
                        {fieldIndex === 9 && 'О себе'}
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 bg-slate-800 rounded border border-slate-600 text-white focus:border-green-500 transition-colors"
                        placeholder="Введите данные"
                      />
                    </div>
                  );
                })}
              </motion.div>
            </AnimatePresence>

            {/* Навигация */}
            <div className="flex justify-between mt-6">
              <button
                onClick={handlePrev}
                disabled={formStep === 1}
                className={`px-4 py-2 rounded transition-colors ${
                  formStep === 1
                    ? 'bg-slate-700 text-gray-500 cursor-not-allowed'
                    : 'bg-slate-700 hover:bg-slate-600 text-white'
                }`}
              >
                Назад
              </button>
              
              {formStep < maxSteps ? (
                <button
                  onClick={handleNext}
                  className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded transition-colors flex items-center gap-2"
                >
                  Далее
                  <Icon icon="ph:arrow-right" className="w-4 h-4" />
                </button>
              ) : (
                <button className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded transition-colors flex items-center gap-2">
                  <Icon icon="ph:check" className="w-4 h-4" />
                  Завершить
                </button>
              )}
            </div>
            
            <p className="text-sm text-gray-400 mt-4">
              😊 Легко! По 3 поля = маленькие задачи
            </p>
          </div>
        </div>

        <div className="mt-6 p-4 bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
          <p className="text-gray-300">
            <Icon icon="ph:scissors" className="inline w-5 h-5 text-blue-400 mr-2" />
            <strong className="text-blue-400">Эффект:</strong> Мы взяли одну большую временную затрату и разделили 
            её на несколько маленьких. Анимация перехода маскирует паузу, пока мозг переключается на следующую задачу.
          </p>
        </div>
      </div>
    );
  };

  // Сравнение восприятия времени
  const TimePerceptionComparison = () => {
    return (
      <div className="p-6 bg-slate-800/50 rounded-lg border border-slate-700">
        <h4 className="text-purple-400 font-semibold mb-4 flex items-center gap-2">
          <Icon icon="ph:chart-bar" className="w-5 h-5" />
          Сравнение восприятия времени
        </h4>
        
        <div className="space-y-3">
          {Object.entries({
            static: { label: 'Статический текст', color: 'red', perceived: 4.5 },
            spinner: { label: 'Спиннер', color: 'yellow', perceived: 3.5 },
            skeleton: { label: 'Скелетон', color: 'blue', perceived: 2.8 },
            playful: { label: 'Игровой лоадер', color: 'green', perceived: 2.0 }
          }).map(([key, data]) => (
            <div key={key}>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-400">{data.label}</span>
                <span className={`text-sm text-${data.color}-400`}>
                  ~{data.perceived}с воспринимаемых
                </span>
              </div>
              <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full bg-${data.color}-500`}
                  initial={{ width: 0 }}
                  animate={{ width: `${(data.perceived / 5) * 100}%` }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                />
              </div>
            </div>
          ))}
        </div>
        
        <p className="text-xs text-gray-400 mt-4">
          * Реальное время загрузки: 3 секунды для всех вариантов
        </p>
      </div>
    );
  };

  return (
    <div className="prose prose-invert max-w-none">
      <h2 className="mb-8 text-3xl font-bold text-purple-400">
        Время как Материал — Искусство Управления Восприятием
      </h2>

      {/* Вступление */}
      <div className="p-6 mb-8 bg-blue-900/20 rounded-lg border border-blue-800/50">
        <p className="text-lg text-blue-300 mb-4">
          <Icon icon="ph:clock" className="inline w-6 h-6 mr-2" />
          Графический дизайнер работает с формой и цветом. Архитектор — с пространством и объемом. 
          <strong className="text-blue-400"> Наш главный материал — это время</strong>. 
          И это самый странный материал на свете.
        </p>
        <p className="text-gray-300 mb-0">
          <strong className="text-orange-400">Исходное заблуждение:</strong> Наша работа — управлять абсолютным временем. 
          Сделать анимацию за 300 мс.
        </p>
      </div>

      {/* Главная идея */}
      <div className="p-6 mb-12 bg-purple-900/20 rounded-lg border border-purple-700/50">
        <h3 className="text-2xl font-semibold text-purple-400 mb-4">
          Новая идея: Мы управляем субъективным временем
        </h3>
        <p className="text-lg text-gray-200">
          Наша работа — управлять субъективным временем. 
          Мы — <strong className="text-purple-400">"волшебники"</strong>, которые могут растягивать 
          и сжимать восприятие времени пользователем, чтобы сделать опыт использования продукта 
          менее фрустрирующим и более приятным.
        </p>
      </div>

      {/* Демо двойной природы */}
      <DualNatureDemo />

      {/* Три техники */}
      <div className="mb-12">
        <h3 className="text-2xl font-semibold text-purple-300 mb-6">
          Три Техники Управления Временем
        </h3>
        <p className="text-gray-300 mb-8">
          Как мы можем "взломать" мозг пользователя и заставить его чувствовать время так, как нам нужно?
        </p>

        <OccupyBrainDemo />
        <FastStartDemo />
        <DivideConquerDemo />
      </div>

      {/* Сравнение восприятия */}
      <div className="mb-12">
        <TimePerceptionComparison />
      </div>

      {/* Финальный вердикт */}
      <div className="mt-12 p-8 bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-lg border border-purple-700/50">
        <h3 className="text-2xl font-bold text-purple-300 mb-6">
          Вердикт: Ваша Новая Ментальная Модель
        </h3>
        
        <div className="p-4 bg-purple-800/20 rounded-lg mb-6">
          <p className="text-lg text-purple-200 font-medium mb-0">
            Перестаньте думать о времени как о константе.<br/>
            Начните относиться к нему как к <strong className="text-purple-400">глине</strong>, 
            из которой вы лепите пользовательский опыт.
          </p>
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold text-purple-400 text-lg">
            Ваша задача — быть архитектором восприятия. Задавайте себе эти вопросы:
          </h4>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-blue-900/20 rounded-lg">
              <Icon icon="ph:hourglass" className="w-6 h-6 text-blue-400 mt-0.5" />
              <div>
                <span className="font-medium text-blue-400">Здесь есть ожидание?</span>
                <p className="text-gray-300 text-sm mt-1">
                  Как я могу занять мозг пользователя, чтобы ожидание ощущалось короче?
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 bg-green-900/20 rounded-lg">
              <Icon icon="ph:arrow-right" className="w-6 h-6 text-green-400 mt-0.5" />
              <div>
                <span className="font-medium text-green-400">Здесь есть переход?</span>
                <p className="text-gray-300 text-sm mt-1">
                  Как я могу использовать нелинейное движение (ease-out), чтобы переход ощущался быстрее?
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 bg-purple-900/20 rounded-lg">
              <Icon icon="ph:scissors" className="w-6 h-6 text-purple-400 mt-0.5" />
              <div>
                <span className="font-medium text-purple-400">Здесь есть сложный процесс?</span>
                <p className="text-gray-300 text-sm mt-1">
                  Как я могу разбить его на части и с помощью анимации "склеить" их так, 
                  чтобы весь процесс ощущался легче и короче?
                </p>
              </div>
            </div>
          </div>

          <p className="text-lg text-gray-200 italic text-center mt-8">
            Освоив эти техники, вы перейдете от управления миллисекундами<br/>
            к <strong className="text-purple-400">управлению чувствами</strong>.<br/>
            А это и есть суть высококлассного дизайна.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TimeAsMaterial;
