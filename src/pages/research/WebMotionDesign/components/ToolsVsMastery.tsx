import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { Icon } from '@iconify/react';

const ToolsVsMastery: React.FC = () => {
  const [activeDemo, setActiveDemo] = useState<string | null>(null);
  const [toolProgress, setToolProgress] = useState(0);
  const [masteryProgress, setMasteryProgress] = useState(0);
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [showComparison, setShowComparison] = useState(false);
  const [animationMode, setAnimationMode] = useState<'tool' | 'mastery'>('tool');

  // Демо: Ловушка инструментов
  const ToolTrapDemo = () => {
    const [learnedTools, setLearnedTools] = useState<string[]>([]);
    const [dopamineHits, setDopamineHits] = useState(0);
    const [actualSkill, setActualSkill] = useState(0);

    const tools = [
      { name: 'After Effects', icon: '🎬', complexity: 85 },
      { name: 'Cinema 4D', icon: '🎮', complexity: 90 },
      { name: 'Blender', icon: '🎨', complexity: 88 },
      { name: 'Houdini', icon: '🌊', complexity: 95 },
      { name: 'Figma', icon: '🎯', complexity: 60 },
      { name: 'Principle', icon: '📱', complexity: 50 },
      { name: 'Rive', icon: '🚀', complexity: 70 },
      { name: 'Unity', icon: '🎲', complexity: 85 }
    ];

    const learnTool = (toolName: string) => {
      if (!learnedTools.includes(toolName)) {
        setLearnedTools([...learnedTools, toolName]);
        setDopamineHits(prev => prev + 1);
        setActualSkill(prev => Math.min(prev + 5, 30)); // Максимум 30% от знания инструментов
        
        // Анимация дофаминового удара
        setTimeout(() => setDopamineHits(prev => Math.max(prev - 0.5, 0)), 2000);
      }
    };

    return (
      <div className="bg-slate-800 rounded-lg p-6 border border-red-500/20">
        <h3 className="text-xl font-semibold text-red-400 mb-4 flex items-center gap-2">
          <Icon icon="ph:warning-triangle" className="w-5 h-5" />
          Ловушка Инструментов
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {tools.map((tool) => (
            <motion.button
              key={tool.name}
              onClick={() => learnTool(tool.name)}
              disabled={learnedTools.includes(tool.name)}
              className={`p-4 rounded-lg border transition-all ${
                learnedTools.includes(tool.name)
                  ? 'bg-green-900/20 border-green-500/30'
                  : 'bg-slate-700 border-slate-600 hover:border-yellow-500/50'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="text-2xl mb-1">{tool.icon}</div>
              <div className="text-sm font-medium">{tool.name}</div>
              <div className="text-xs text-slate-400 mt-1">
                {learnedTools.includes(tool.name) ? '✓ Изучено' : `${tool.complexity}% сложности`}
              </div>
            </motion.button>
          ))}
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-yellow-400">Дофаминовый удар</span>
              <span>{Math.round(dopamineHits * 10)}%</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-yellow-400 to-orange-500"
                initial={{ width: 0 }}
                animate={{ width: `${dopamineHits * 10}%` }}
                transition={{ type: 'spring', damping: 20 }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-blue-400">Иллюзия прогресса</span>
              <span>{learnedTools.length * 12.5}%</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-400 to-purple-500"
                initial={{ width: 0 }}
                animate={{ width: `${learnedTools.length * 12.5}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-red-400">Реальное мастерство</span>
              <span>{actualSkill}%</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-red-400 to-red-600"
                initial={{ width: 0 }}
                animate={{ width: `${actualSkill}%` }}
              />
            </div>
          </div>
        </div>

        <div className="mt-4 p-3 bg-red-900/20 rounded-lg border border-red-500/20">
          <p className="text-sm text-red-300">
            <span className="font-semibold">Проблема:</span> Вы изучили {learnedTools.length} инструментов, 
            но реальное мастерство составляет только {actualSkill}%. Знание кнопок ≠ умение создавать.
          </p>
        </div>
      </div>
    );
  };

  // Демо: Фундаментальные принципы
  const FundamentalsDemo = () => {
    const [selectedPrinciple, setSelectedPrinciple] = useState<string | null>(null);
    const controls = useAnimation();

    const principles = [
      {
        id: 'timing',
        name: 'Тайминг и Спейсинг',
        icon: <Icon icon="ph:timer" className="w-6 h-6" />,
        description: 'Основа всей анимации - как объекты движутся во времени',
        demo: () => (
          <div className="flex gap-4 justify-center p-8">
            <motion.div
              className="w-16 h-16 bg-blue-500 rounded-lg"
              animate={{ y: [0, -100, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="w-16 h-16 bg-green-500 rounded-lg"
              animate={{ y: [0, -100, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="w-16 h-16 bg-purple-500 rounded-lg"
              animate={{ y: [0, -100, 0] }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: [0.68, -0.55, 0.265, 1.55] 
              }}
            />
          </div>
        )
      },
      {
        id: 'composition',
        name: 'Композиция',
        icon: <Icon icon="ph:stack" className="w-6 h-6" />,
        description: 'Как элементы организованы в пространстве',
        demo: () => (
          <div className="grid grid-cols-3 gap-2 p-8">
            {[...Array(9)].map((_, i) => (
              <motion.div
                key={i}
                className={`w-full aspect-square rounded ${
                  i === 4 ? 'bg-blue-500' : 'bg-slate-600'
                }`}
                initial={{ scale: 0 }}
                animate={{ scale: i === 4 ? 1.2 : 0.8 }}
                transition={{ delay: i * 0.1 }}
              />
            ))}
          </div>
        )
      },
      {
        id: 'psychology',
        name: 'Психология восприятия',
        icon: <Icon icon="ph:brain" className="w-6 h-6" />,
        description: 'Как мозг интерпретирует движение',
        demo: () => (
          <div className="flex justify-center items-center p-8">
            <motion.div className="relative w-32 h-32">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-4 bg-slate-900 rounded-full"
                animate={{ scale: [1, 0.8, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </motion.div>
          </div>
        )
      },
      {
        id: 'observation',
        name: 'Наблюдательность',
        icon: <Icon icon="ph:eye" className="w-6 h-6" />,
        description: 'Учиться у реального мира',
        demo: () => (
          <div className="flex flex-col items-center p-8">
            <motion.div
              className="w-24 h-1 bg-blue-500 rounded-full mb-4"
              animate={{ 
                scaleX: [1, 1.5, 0.8, 1],
                y: [0, -20, 0, 0]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                times: [0, 0.2, 0.5, 1]
              }}
            />
            <div className="text-sm text-slate-400">Капля воды</div>
          </div>
        )
      }
    ];

    return (
      <div className="bg-slate-800 rounded-lg p-6 border border-green-500/20">
        <h3 className="text-xl font-semibold text-green-400 mb-4 flex items-center gap-2">
          <Icon icon="ph:trophy" className="w-5 h-5" />
          Фундаментальные Принципы
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {principles.map((principle) => (
            <motion.button
              key={principle.id}
              onClick={() => setSelectedPrinciple(
                selectedPrinciple === principle.id ? null : principle.id
              )}
              className={`p-4 rounded-lg border transition-all ${
                selectedPrinciple === principle.id
                  ? 'bg-green-900/30 border-green-500/50'
                  : 'bg-slate-700 border-slate-600 hover:border-green-500/30'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex justify-center mb-2 text-green-400">
                {principle.icon}
              </div>
              <div className="text-sm font-medium">{principle.name}</div>
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {selectedPrinciple && (
            <motion.div
              key={selectedPrinciple}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-slate-700/50 rounded-lg p-4"
            >
              {(() => {
                const principle = principles.find(p => p.id === selectedPrinciple);
                return (
                  <>
                    <p className="text-sm text-slate-300 mb-4">
                      {principle?.description}
                    </p>
                    <div className="bg-slate-900 rounded-lg overflow-hidden">
                      {principle?.demo()}
                    </div>
                  </>
                );
              })()}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-6 p-4 bg-green-900/20 rounded-lg border border-green-500/20">
          <p className="text-sm text-green-300">
            <span className="font-semibold">Преимущество:</span> Эти принципы работают в любой программе 
            и останутся актуальными через 10, 20 и даже 50 лет.
          </p>
        </div>
      </div>
    );
  };

  // Демо: Правильная ментальная модель
  const MentalModelDemo = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [selectedApproach, setSelectedApproach] = useState<'wrong' | 'right' | null>(null);

    const wrongApproach = [
      { step: 'Открываю After Effects', icon: '🖥️', time: '0 сек' },
      { step: 'Ищу крутой плагин', icon: '🔍', time: '5 мин' },
      { step: 'Пробую разные эффекты', icon: '✨', time: '30 мин' },
      { step: 'Что-то получилось!', icon: '🎯', time: '2 часа' },
      { step: 'Но зачем это нужно?', icon: '😕', time: '∞' }
    ];

    const rightApproach = [
      { step: 'Определяю цель', icon: '🎯', time: '5 мин' },
      { step: 'Скетчирую идею', icon: '✏️', time: '10 мин' },
      { step: 'Выбираю инструмент', icon: '🔧', time: '2 мин' },
      { step: 'Реализую с пониманием', icon: '💡', time: '30 мин' },
      { step: 'Результат решает задачу', icon: '✅', time: 'Готово!' }
    ];

    const steps = selectedApproach === 'wrong' ? wrongApproach : rightApproach;

    useEffect(() => {
      if (selectedApproach) {
        const interval = setInterval(() => {
          setCurrentStep(prev => (prev + 1) % steps.length);
        }, 2000);
        return () => clearInterval(interval);
      }
    }, [selectedApproach, steps.length]);

    return (
      <div className="bg-slate-800 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-blue-400 mb-4 flex items-center gap-2">
          <Icon icon="ph:target" className="w-5 h-5" />
          Ментальная Модель
        </h3>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <motion.button
            onClick={() => {
              setSelectedApproach('wrong');
              setCurrentStep(0);
            }}
            className={`p-4 rounded-lg border transition-all ${
              selectedApproach === 'wrong'
                ? 'bg-red-900/20 border-red-500/50'
                : 'bg-slate-700 border-slate-600 hover:border-red-500/30'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Icon icon="ph:x-circle" className="w-6 h-6 text-red-400 mx-auto mb-2" />
            <div className="font-medium">Неправильный подход</div>
            <div className="text-sm text-slate-400 mt-1">Инструмент → Идея</div>
          </motion.button>

          <motion.button
            onClick={() => {
              setSelectedApproach('right');
              setCurrentStep(0);
            }}
            className={`p-4 rounded-lg border transition-all ${
              selectedApproach === 'right'
                ? 'bg-green-900/20 border-green-500/50'
                : 'bg-slate-700 border-slate-600 hover:border-green-500/30'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Icon icon="ph:check-circle" className="w-6 h-6 text-green-400 mx-auto mb-2" />
            <div className="font-medium">Правильный подход</div>
            <div className="text-sm text-slate-400 mt-1">Идея → Инструмент</div>
          </motion.button>
        </div>

        <AnimatePresence mode="wait">
          {selectedApproach && (
            <motion.div
              key={selectedApproach}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-3"
            >
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0.3, x: -20 }}
                  animate={{ 
                    opacity: index <= currentStep ? 1 : 0.3,
                    x: index === currentStep ? 0 : -20,
                    scale: index === currentStep ? 1.05 : 1
                  }}
                  className={`flex items-center gap-4 p-3 rounded-lg ${
                    index === currentStep 
                      ? selectedApproach === 'wrong' 
                        ? 'bg-red-900/20 border border-red-500/30' 
                        : 'bg-green-900/20 border border-green-500/30'
                      : 'bg-slate-700/50'
                  }`}
                >
                  <div className="text-2xl">{step.icon}</div>
                  <div className="flex-1">
                    <div className="font-medium">{step.step}</div>
                    <div className="text-sm text-slate-400">{step.time}</div>
                  </div>
                  {index === currentStep && (
                    <motion.div
                      className={`w-2 h-2 rounded-full ${
                        selectedApproach === 'wrong' ? 'bg-red-400' : 'bg-green-400'
                      }`}
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ repeat: Infinity, duration: 1 }}
                    />
                  )}
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {selectedApproach && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-4 p-3 rounded-lg ${
              selectedApproach === 'wrong'
                ? 'bg-red-900/20 border border-red-500/20'
                : 'bg-green-900/20 border border-green-500/20'
            }`}
          >
            <p className="text-sm">
              {selectedApproach === 'wrong' ? (
                <span className="text-red-300">
                  Начинаете с инструмента и ищете, что с ним сделать. 
                  Результат случаен и часто бессмыслен.
                </span>
              ) : (
                <span className="text-green-300">
                  Начинаете с понимания задачи. Инструмент — лишь средство 
                  достижения конкретной цели.
                </span>
              )}
            </p>
          </motion.div>
        )}
      </div>
    );
  };

  // Демо: 80/20 принцип
  const TimeInvestmentDemo = () => {
    const [timeAllocation, setTimeAllocation] = useState({ tools: 80, fundamentals: 20 });
    const [results, setResults] = useState({ shortTerm: 80, longTerm: 20 });

    const updateAllocation = (toolsPercent: number) => {
      const fundamentalsPercent = 100 - toolsPercent;
      setTimeAllocation({ tools: toolsPercent, fundamentals: fundamentalsPercent });
      
      // Расчет результатов
      const shortTermResult = toolsPercent * 0.8 + fundamentalsPercent * 0.3;
      const longTermResult = toolsPercent * 0.2 + fundamentalsPercent * 1.5;
      
      setResults({
        shortTerm: Math.min(shortTermResult, 100),
        longTerm: Math.min(longTermResult, 100)
      });
    };

    return (
      <div className="bg-slate-800 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-purple-400 mb-4 flex items-center gap-2">
          <Icon icon="ph:clock" className="w-5 h-5" />
          Инвестиция Времени: 80/20
        </h3>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
            Распределение времени обучения
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={timeAllocation.tools}
            onChange={(e) => updateAllocation(Number(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-sm mt-2">
            <span className="text-yellow-400">
              Инструменты: {timeAllocation.tools}%
            </span>
            <span className="text-blue-400">
              Принципы: {timeAllocation.fundamentals}%
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-slate-700/50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <Icon icon="ph:lightning" className="w-4 h-4 text-yellow-400" />
              <span className="font-medium">Краткосрочный результат</span>
            </div>
            <div className="relative h-32">
              <motion.div
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-yellow-500 to-yellow-400 rounded"
                initial={{ height: 0 }}
                animate={{ height: `${results.shortTerm}%` }}
                transition={{ type: 'spring', damping: 20 }}
              />
              <div className="absolute bottom-2 left-0 right-0 text-center text-sm font-bold">
                {Math.round(results.shortTerm)}%
              </div>
            </div>
          </div>

          <div className="bg-slate-700/50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <Icon icon="ph:trend-up" className="w-4 h-4 text-blue-400" />
              <span className="font-medium">Долгосрочный результат</span>
            </div>
            <div className="relative h-32">
              <motion.div
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-500 to-blue-400 rounded"
                initial={{ height: 0 }}
                animate={{ height: `${results.longTerm}%` }}
                transition={{ type: 'spring', damping: 20 }}
              />
              <div className="absolute bottom-2 left-0 right-0 text-center text-sm font-bold">
                {Math.round(results.longTerm)}%
              </div>
            </div>
          </div>
        </div>

        <div className={`p-4 rounded-lg border ${
          timeAllocation.fundamentals >= 60 
            ? 'bg-green-900/20 border-green-500/20' 
            : timeAllocation.fundamentals >= 30
            ? 'bg-yellow-900/20 border-yellow-500/20'
            : 'bg-red-900/20 border-red-500/20'
        }`}>
          <p className="text-sm">
            {timeAllocation.fundamentals >= 60 ? (
              <span className="text-green-300">
                <strong>Отличный баланс!</strong> Фокус на принципах даст 
                устойчивый долгосрочный рост.
              </span>
            ) : timeAllocation.fundamentals >= 30 ? (
              <span className="text-yellow-300">
                <strong>Неплохо.</strong> Но увеличение времени на принципы 
                улучшит долгосрочные результаты.
              </span>
            ) : (
              <span className="text-red-300">
                <strong>Типичная ошибка.</strong> Слишком много времени на инструменты 
                дает быстрый старт, но слабый долгосрочный рост.
              </span>
            )}
          </p>
        </div>

        <div className="mt-4 p-3 bg-purple-900/20 rounded-lg border border-purple-500/20">
          <p className="text-sm text-purple-300">
            <strong>Рекомендация:</strong> 80% времени на вечные принципы, 
            20% на временные инструменты.
          </p>
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
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-yellow-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
          Модуль 16: Вечный Спор — Инструменты против Мастерства
        </h1>

        <div className="bg-slate-800/50 rounded-lg p-6 mb-8 border border-slate-700">
          <p className="text-lg leading-relaxed mb-4">
            Окей, команда. Давайте поговорим начистоту о том, что мы видим каждый день. 
            Реклама курсов кричит: "Освой After Effects за 30 дней и стань моушн-дизайнером!". 
            Форумы завалены вопросами: "Что лучше учить, Cinema 4D или Blender?". 
            Новички скачивают плагины, которые обещают "создавать голливудскую анимацию одной кнопкой".
          </p>
          <p className="text-lg font-semibold text-yellow-400">
            И все это строится на одном из самых опасных мифов в нашей индустрии.
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
              Исходное заблуждение (Миф)
            </h3>
            <p className="text-slate-300">
              Мастерство в моушн-дизайне прямо пропорционально количеству освоенных программ 
              и плагинов. Если я выучу все "горячие клавиши" и куплю все нужные инструменты, 
              я стану профессионалом.
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
              Новая идея (Реальность)
            </h3>
            <p className="text-slate-300">
              Инструменты — это всего лишь молоток и долото. Они не делают вас скульптором. 
              Мастерство — это не знание кнопок. Это фундаментальное, не зависящее от софта 
              понимание принципов: композиции, тайминга, психологии восприятия, цвета и повествования.
            </p>
          </motion.div>
        </div>

        <ToolTrapDemo />

        <div className="my-8">
          <h2 className="text-2xl font-semibold mb-6">Почему Инструменты — это Ловушка для Начинающих</h2>
          
          <div className="space-y-4">
            <motion.div
              className="bg-slate-800/50 rounded-lg p-6 border-l-4 border-yellow-500"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="text-lg font-semibold text-yellow-400 mb-2 flex items-center gap-2">
                <Icon icon="ph:lightning" className="w-5 h-5" />
                1. Они создают иллюзию прогресса
              </h3>
              <p className="text-slate-300">
                Выучить новый эффект или плагин легко. Это дает быстрый "дофаминовый укол" — 
                "сегодня я научился делать неоновое свечение!". Вы чувствуете, что растете. 
                Но на самом деле вы просто коллекционируете молотки, все еще не понимая, 
                как спроектировать дом.
              </p>
            </motion.div>

            <motion.div
              className="bg-slate-800/50 rounded-lg p-6 border-l-4 border-orange-500"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h3 className="text-lg font-semibold text-orange-400 mb-2 flex items-center gap-2">
                <Icon icon="ph:arrows-clockwise" className="w-5 h-5" />
                2. Они быстро устаревают
              </h3>
              <p className="text-slate-300">
                Мир софта меняется с бешеной скоростью. Программа, которая была стандартом 
                индустрии 5 лет назад (помните Flash?), сегодня может быть почти забыта. 
                Плагины перестают поддерживаться. Если ваше мастерство построено на знании 
                конкретного инструмента, вы рискуете "устареть" вместе с ним.
              </p>
            </motion.div>

            <motion.div
              className="bg-slate-800/50 rounded-lg p-6 border-l-4 border-red-500"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <h3 className="text-lg font-semibold text-red-400 mb-2 flex items-center gap-2">
                <Icon icon="ph:warning-triangle" className="w-5 h-5" />
                3. Они отвлекают от главного
              </h3>
              <p className="text-slate-300">
                Время, потраченное на изучение сотой функции в Cinema 4D, — это время, 
                которое вы не потратили на изучение теории цвета по Иттену, на анализ 
                работ великих режиссеров, на чтение книг о психологии восприятия или 
                на простое наблюдение за тем, как движутся объекты в реальном мире.
              </p>
            </motion.div>
          </div>
        </div>

        <FundamentalsDemo />

        <div className="my-8">
          <h2 className="text-2xl font-semibold mb-6">Что Такое Настоящее Мастерство? Фундаментальные Принципы.</h2>
          
          <div className="bg-blue-900/10 rounded-lg p-6 border border-blue-500/30 mb-6">
            <p className="text-lg text-blue-300">
              Настоящий профессионал может создать гениальную анимацию, используя три простых 
              квадрата в любой программе, даже в PowerPoint. Потому что он оперирует не эффектами, 
              а фундаментами.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                title: 'Понимание Тайминга и Спейсинга',
                description: 'Чувство ритма. Понимание, как расстояние между кадрами влияет на скорость и характер движения.',
                icon: <Icon icon="ph:timer" className="w-5 h-5" />
              },
              {
                title: 'Знание Принципов Дизайна',
                description: 'Композиция, иерархия, контраст, баланс, цвет. Как направить взгляд зрителя?',
                icon: <Icon icon="ph:palette" className="w-5 h-5" />
              },
              {
                title: 'Психология Восприятия',
                description: 'Почему ease-out ощущается как "прибытие"? Как цвет влияет на эмоции?',
                icon: <Icon icon="ph:brain" className="w-5 h-5" />
              },
              {
                title: 'Навыки Повествования',
                description: 'Как построить историю? Что такое трехактная структура?',
                icon: <Icon icon="ph:book-open" className="w-5 h-5" />
              },
              {
                title: 'Наблюдательность',
                description: 'Способность часами наблюдать за реальным миром. Как капля падает в воду?',
                icon: <Icon icon="ph:eye" className="w-5 h-5" />
              },
              {
                title: 'Критическое Мышление',
                description: 'Способность анализировать работу, задавая вопрос "почему?"',
                icon: <Icon icon="ph:lightbulb" className="w-5 h-5" />
              }
            ].map((principle, index) => (
              <motion.div
                key={principle.title}
                className="bg-slate-800/50 rounded-lg p-4 border border-slate-700"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
              >
                <h4 className="font-semibold mb-2 flex items-center gap-2 text-blue-400">
                  {principle.icon}
                  {principle.title}
                </h4>
                <p className="text-sm text-slate-300">{principle.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <MentalModelDemo />

        <div className="my-8">
          <h2 className="text-2xl font-semibold mb-6">Как Правильно Относиться к Инструментам</h2>
          
          <div className="bg-slate-800/50 rounded-lg p-6 mb-6">
            <p className="text-lg mb-4">
              Инструменты важны. Глупо это отрицать. Но они — вторичны. 
              Они — лишь способ реализации вашего замысла.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-sm font-bold">1</span>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-400 mb-1">Сначала — ИДЕЯ</h4>
                  <p className="text-sm text-slate-300">
                    Что я хочу сказать? Какую эмоцию вызвать? Какую задачу решить? 
                    Эта работа происходит у вас в голове, на бумаге, в блокноте.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-sm font-bold">2</span>
                </div>
                <div>
                  <h4 className="font-semibold text-purple-400 mb-1">Затем — ВЫБОР ИНСТРУМЕНТА</h4>
                  <p className="text-sm text-slate-300 mb-2">
                    Какой инструмент позволит мне реализовать эту идею наиболее эффективно?
                  </p>
                  <div className="space-y-2 ml-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Icon icon="ph:gear" className="w-4 h-4 text-slate-500" />
                      <span>Нужно быстро проверить гипотезу? → Figma или Keynote</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Icon icon="ph:pen" className="w-4 h-4 text-slate-500" />
                      <span>Нужна сложная анимация? → After Effects с плагинами</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Icon icon="ph:code" className="w-4 h-4 text-slate-500" />
                      <span>Нужна процедурная анимация? → JS, Processing или Unity</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded-lg p-6 border border-purple-500/30">
            <p className="text-lg font-semibold text-purple-300">
              Профессионал выбирает инструмент под задачу. 
              Новичок ищет задачу, к которой можно применить свой единственный любимый инструмент.
            </p>
          </div>
        </div>

        <TimeInvestmentDemo />

        <div className="mt-8 bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-lg p-8 border border-blue-500/30">
          <h2 className="text-2xl font-semibold mb-6 text-blue-400">
            Вердикт: Ваша Новая Ментальная Модель
          </h2>
          
          <div className="bg-slate-800/50 rounded-lg p-6 mb-6">
            <p className="text-lg font-semibold text-purple-300 mb-4">
              Инвестируйте 80% времени в изучение вечных принципов и 20% — в изучение временных инструментов.
            </p>
            
            <p className="text-lg mb-4">Перестаньте спрашивать "Какой софт мне выучить?". Начните спрашивать:</p>
            
            <ul className="space-y-2 ml-6">
              <li className="flex items-center gap-2">
                <Icon icon="ph:book-open" className="w-4 h-4 text-blue-400" />
                <span>"Какую книгу по композиции мне прочитать?"</span>
              </li>
              <li className="flex items-center gap-2">
                <Icon icon="ph:eye" className="w-4 h-4 text-purple-400" />
                <span>"Какой фильм мне посмотреть, чтобы проанализировать его ритм?"</span>
              </li>
              <li className="flex items-center gap-2">
                <Icon icon="ph:brain" className="w-4 h-4 text-green-400" />
                <span>"Как мне натренировать свою наблюдательность?"</span>
              </li>
            </ul>
          </div>

          <motion.div
            className="bg-gradient-to-r from-yellow-900/20 to-orange-900/20 rounded-lg p-6 border border-yellow-500/30"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1 }}
          >
            <p className="text-lg text-yellow-300 font-medium">
              Знание After Effects сделает вас оператором After Effects. 
              Знание композиции, тайминга и психологии сделает вас Моушн-дизайнером. 
              Первое обесценится со следующей версией софта. 
              Второе — останется с вами навсегда и будет только дорожать.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ToolsVsMastery;