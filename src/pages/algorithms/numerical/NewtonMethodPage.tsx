import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Icon } from '@iconify/react';
import AlgorithmLayout from '../../../components/Layout/AlgorithmLayout/AlgorithmLayout';
import { getRelatedAlgorithms } from '../../../data/algorithms-data';
import { NewtonVisualizer } from './NewtonVisualizer';
import { FunctionInput } from './FunctionInput';
import { IterationTable } from './IterationTable';
import { CodeImplementation } from './CodeImplementation';
import { NewtonMethod, NewtonIteration, MathFunction } from './newton.model';

// Предустановленные функции
const PRESET_FUNCTIONS: MathFunction[] = [
  {
    id: 'polynomial',
    name: 'Полином 3-й степени',
    expression: 'x^3 - 2*x - 5',
    derivative: '3*x^2 - 2',
    initialGuess: 2,
    description: 'Классический пример с одним действительным корнем'
  },
  {
    id: 'trigonometric',
    name: 'Тригонометрическая',
    expression: 'cos(x) - x',
    derivative: '-sin(x) - 1',
    initialGuess: 0.5,
    description: 'Трансцендентное уравнение'
  },
  {
    id: 'exponential',
    name: 'Экспоненциальная',
    expression: 'e^x - 3*x',
    derivative: 'e^x - 3',
    initialGuess: 0.5,
    description: 'Уравнение с экспонентой'
  },
  {
    id: 'logarithmic',
    name: 'Логарифмическая',
    expression: 'log(x) + x^2 - 3',
    derivative: '1/x + 2*x',
    initialGuess: 1.5,
    description: 'Комбинация логарифма и полинома'
  },
  {
    id: 'sqrt',
    name: 'Квадратный корень',
    expression: 'sqrt(x) - x + 1',
    derivative: '1/(2*sqrt(x)) - 1',
    initialGuess: 2,
    description: 'Уравнение с квадратным корнем'
  }
];

// Объяснение алгоритма
const AlgorithmExplanation = () => {
  return (
    <div className="space-y-6">
      <div>
        <p className="mb-4 text-lg">
          Метод Ньютона (также известный как метод касательных) — это эффективный итеративный 
          численный метод для нахождения приближённых значений корней уравнения f(x) = 0.
        </p>

        <h3 className="mt-6 mb-3 text-xl font-bold text-amber-400">Математическая основа:</h3>
        <div className="p-4 border rounded-lg bg-slate-800/50 border-slate-700">
          <p className="mb-3 text-slate-300">
            Метод основан на линеаризации функции в окрестности текущего приближения. 
            Итерационная формула:
          </p>
          <div className="p-4 my-4 text-center bg-slate-900 rounded-lg">
            <span className="text-2xl font-mono text-blue-400">
              x<sub>n+1</sub> = x<sub>n</sub> - f(x<sub>n</sub>) / f'(x<sub>n</sub>)
            </span>
          </div>
          <p className="text-slate-300">
            где f'(x) — производная функции f(x).
          </p>
        </div>
      </div>

      <div>
        <h3 className="mt-6 mb-3 text-xl font-bold text-amber-400">Геометрическая интерпретация:</h3>
        <ol className="space-y-3 list-decimal list-inside">
          <li className="text-slate-300">
            <strong>Выбор начального приближения:</strong> Начинаем с точки x₀
          </li>
          <li className="text-slate-300">
            <strong>Построение касательной:</strong> В точке (x_n, f(x_n)) строим касательную к графику
          </li>
          <li className="text-slate-300">
            <strong>Нахождение пересечения:</strong> Находим точку пересечения касательной с осью X
          </li>
          <li className="text-slate-300">
            <strong>Новое приближение:</strong> Эта точка становится следующим приближением x_{n+1}
          </li>
          <li className="text-slate-300">
            <strong>Повторение:</strong> Процесс повторяется до достижения требуемой точности
          </li>
        </ol>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="p-4 border rounded-lg bg-green-900/20 border-green-800/30">
          <h4 className="mb-2 font-bold text-green-300">✅ Преимущества:</h4>
          <ul className="space-y-1 text-sm text-green-100 list-disc list-inside">
            <li>Квадратичная скорость сходимости</li>
            <li>Высокая точность при хорошем начальном приближении</li>
            <li>Простота реализации</li>
            <li>Эффективность для гладких функций</li>
          </ul>
        </div>

        <div className="p-4 border rounded-lg bg-red-900/20 border-red-800/30">
          <h4 className="mb-2 font-bold text-red-300">❌ Недостатки:</h4>
          <ul className="space-y-1 text-sm text-red-100 list-disc list-inside">
            <li>Требует вычисления производной</li>
            <li>Может расходиться при плохом начальном приближении</li>
            <li>Чувствителен к точкам с f'(x) ≈ 0</li>
            <li>Находит только один корень за раз</li>
          </ul>
        </div>
      </div>

      <div className="p-4 mt-6 border rounded-lg bg-amber-900/20 border-amber-800/30">
        <h4 className="mb-2 font-bold text-amber-300">⚡ Условия сходимости:</h4>
        <p className="text-amber-100">
          Метод Ньютона сходится, если:
        </p>
        <ul className="mt-2 space-y-1 text-amber-100 list-disc list-inside">
          <li>f(x) дважды непрерывно дифференцируема в окрестности корня</li>
          <li>f'(x) ≠ 0 в окрестности корня</li>
          <li>Начальное приближение достаточно близко к корню</li>
        </ul>
      </div>
    </div>
  );
};

// Практическое применение
const ApplicationsSection = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-4 text-xl font-bold text-amber-400">Области применения:</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="p-4 border rounded-lg bg-slate-800/50 border-slate-700">
            <h4 className="mb-2 font-semibold text-blue-400">🔬 Научные вычисления</h4>
            <ul className="space-y-1 text-sm text-slate-300">
              <li>• Решение нелинейных уравнений в физике</li>
              <li>• Моделирование химических реакций</li>
              <li>• Астрономические расчеты</li>
              <li>• Квантовая механика</li>
            </ul>
          </div>

          <div className="p-4 border rounded-lg bg-slate-800/50 border-slate-700">
            <h4 className="mb-2 font-semibold text-green-400">💰 Финансовая математика</h4>
            <ul className="space-y-1 text-sm text-slate-300">
              <li>• Расчет внутренней нормы доходности (IRR)</li>
              <li>• Определение ставок по облигациям</li>
              <li>• Оценка опционов (модель Блэка-Шоулза)</li>
              <li>• Риск-менеджмент</li>
            </ul>
          </div>

          <div className="p-4 border rounded-lg bg-slate-800/50 border-slate-700">
            <h4 className="mb-2 font-semibold text-purple-400">🏗️ Инженерия</h4>
            <ul className="space-y-1 text-sm text-slate-300">
              <li>• Расчет нагрузок в конструкциях</li>
              <li>• Оптимизация систем управления</li>
              <li>• Анализ электрических цепей</li>
              <li>• Гидравлические расчеты</li>
            </ul>
          </div>

          <div className="p-4 border rounded-lg bg-slate-800/50 border-slate-700">
            <h4 className="mb-2 font-semibold text-amber-400">🤖 Машинное обучение</h4>
            <ul className="space-y-1 text-sm text-slate-300">
              <li>• Оптимизация функций потерь</li>
              <li>• Обучение нейронных сетей</li>
              <li>• Логистическая регрессия</li>
              <li>• SVM оптимизация</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="p-4 border rounded-lg bg-blue-900/20 border-blue-800/30">
        <h4 className="mb-3 font-bold text-blue-300">💡 Практические примеры:</h4>
        <div className="space-y-3 text-blue-100">
          <div>
            <strong>Вычисление квадратного корня:</strong> Для нахождения √a решаем уравнение x² - a = 0.
            Это основа алгоритма вычисления квадратного корня во многих калькуляторах.
          </div>
          <div>
            <strong>GPS навигация:</strong> Определение координат по сигналам спутников требует решения
            системы нелинейных уравнений методом Ньютона-Рафсона.
          </div>
          <div>
            <strong>Компьютерная графика:</strong> Ray tracing использует метод Ньютона для нахождения
            точек пересечения лучей с поверхностями.
          </div>
        </div>
      </div>

      <div className="p-4 mt-4 border rounded-lg bg-purple-900/20 border-purple-800/30">
        <h4 className="mb-2 font-bold text-purple-300">🚀 Модификации и улучшения:</h4>
        <ul className="space-y-2 text-purple-100">
          <li><strong>Метод секущих:</strong> Не требует вычисления производной, использует разностную аппроксимацию</li>
          <li><strong>Метод Ньютона-Рафсона:</strong> Обобщение для систем нелинейных уравнений</li>
          <li><strong>Модифицированный метод Ньютона:</strong> Для кратных корней</li>
          <li><strong>Квази-Ньютоновские методы:</strong> BFGS, L-BFGS для оптимизации</li>
        </ul>
      </div>
    </div>
  );
};

// Главный компонент
const NewtonMethodPage: React.FC = () => {
  const [selectedFunction, setSelectedFunction] = useState<MathFunction>(PRESET_FUNCTIONS[0]);
  const [customFunction, setCustomFunction] = useState<string>('');
  const [customDerivative, setCustomDerivative] = useState<string>('');
  const [initialGuess, setInitialGuess] = useState<number>(2);
  const [tolerance, setTolerance] = useState<number>(0.0001);
  const [maxIterations, setMaxIterations] = useState<number>(20);
  const [iterations, setIterations] = useState<NewtonIteration[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [currentIteration, setCurrentIteration] = useState(0);
  const [error, setError] = useState<string | null>(null);
  
  const methodRef = useRef<NewtonMethod | null>(null);

  // Инициализация метода
  useEffect(() => {
    try {
      methodRef.current = new NewtonMethod(
        selectedFunction.expression,
        selectedFunction.derivative,
        tolerance,
        maxIterations
      );
      setError(null);
    } catch (err) {
      setError('Ошибка в выражении функции или производной');
    }
  }, [selectedFunction, tolerance, maxIterations]);

  // Запуск алгоритма
  const handleStart = useCallback(() => {
    if (!methodRef.current) return;
    
    setIsRunning(true);
    setCurrentIteration(0);
    setIterations([]);
    
    try {
      const result = methodRef.current.solve(initialGuess);
      setIterations(result.iterations);
      
      // Анимация итераций
      let i = 0;
      const animateIterations = () => {
        if (i < result.iterations.length) {
          setCurrentIteration(i);
          i++;
          setTimeout(animateIterations, 500);
        } else {
          setIsRunning(false);
        }
      };
      animateIterations();
    } catch (err: any) {
      setError(err.message);
      setIsRunning(false);
    }
  }, [initialGuess]);

  // Сброс
  const handleReset = useCallback(() => {
    setIsRunning(false);
    setCurrentIteration(0);
    setIterations([]);
    setError(null);
  }, []);

  // Изменение функции
  const handleFunctionChange = useCallback((func: MathFunction) => {
    setSelectedFunction(func);
    setInitialGuess(func.initialGuess);
    handleReset();
  }, [handleReset]);

  const relatedAlgorithms = useMemo(() => 
    getRelatedAlgorithms('newton', 'numerical').map(algo => ({
      id: algo.id,
      name: algo.name,
      path: algo.path,
    })),
    []
  );

  return (
    <AlgorithmLayout
      title="Метод Ньютона"
      description="Итеративный численный метод для нахождения корней уравнения с квадратичной скоростью сходимости"
      complexity={{
        time: 'O(log(1/ε))',
        space: 'O(1)',
        note: 'ε - требуемая точность',
      }}
      category={{
        id: 'numerical',
        name: 'Численные методы',
        icon: 'tabler:math-function',
      }}
      relatedAlgorithms={relatedAlgorithms}
      visualization={
        <div className="space-y-6">
          {/* Выбор функции */}
          <FunctionInput
            presetFunctions={PRESET_FUNCTIONS}
            selectedFunction={selectedFunction}
            onFunctionChange={handleFunctionChange}
            initialGuess={initialGuess}
            onInitialGuessChange={setInitialGuess}
            tolerance={tolerance}
            onToleranceChange={setTolerance}
            maxIterations={maxIterations}
            onMaxIterationsChange={setMaxIterations}
            isRunning={isRunning}
          />
          
          {/* Визуализация */}
          <NewtonVisualizer
            func={selectedFunction}
            iterations={iterations}
            currentIteration={currentIteration}
            isRunning={isRunning}
          />
          
          {/* Панель управления */}
          <div className="flex justify-center gap-4">
            <motion.button
              onClick={handleStart}
              disabled={isRunning || !!error}
              className={`px-6 py-3 rounded-lg font-medium text-white transition-all flex items-center gap-2 ${
                isRunning || !!error
                  ? 'bg-slate-600 cursor-not-allowed opacity-50'
                  : 'bg-green-600 hover:bg-green-700 hover:scale-105'
              }`}
              whileHover={{ scale: isRunning || !!error ? 1 : 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon icon="mdi:play" className="w-5 h-5" />
              Найти корень
            </motion.button>
            
            <motion.button
              onClick={handleReset}
              className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-medium text-white transition-all flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon icon="mdi:refresh" className="w-5 h-5" />
              Сбросить
            </motion.button>
          </div>
          
          {/* Ошибка */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-4 bg-red-900/20 border border-red-700 rounded-lg"
              >
                <p className="text-red-300 flex items-center gap-2">
                  <Icon icon="mdi:alert-circle" className="w-5 h-5" />
                  {error}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Таблица итераций */}
          <AnimatePresence>
            {iterations.length > 0 && (
              <IterationTable 
                iterations={iterations} 
                currentIteration={currentIteration}
              />
            )}
          </AnimatePresence>
        </div>
      }
      implementation={<CodeImplementation />}
      explanation={<AlgorithmExplanation />}
      applications={<ApplicationsSection />}
    />
  );
};

export default NewtonMethodPage;
