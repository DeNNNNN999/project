import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Icon } from '@iconify/react';

import AlgorithmLayout from '../../../components/Layout/AlgorithmLayout/AlgorithmLayout';
import { getRelatedAlgorithms } from '../../../data/algorithms-data';
import { AStarModel, Node, GridSize, AlgorithmStats } from './astar.model';
import { AStarVisualizer } from './AStarVisualizer';
import { ControlPanel } from './ControlPanel';
import { StatsDisplay } from './StatsDisplay';
import { CodeImplementation } from './CodeImplementation';

// Конфигурация по умолчанию
const DEFAULT_GRID_SIZE: GridSize = { width: 40, height: 25 };
const DEFAULT_SPEED = 50; // ms между шагами

// Объяснение алгоритма
const AlgorithmExplanation = () => {
  return (
    <div className="space-y-6">
      <div>
        <p className="mb-4 text-lg">
          A* (A-star) — это алгоритм поиска пути в графе, который находит кратчайший путь от начальной вершины к целевой.
          Он является расширением алгоритма Дейкстры и использует эвристическую функцию для более эффективного поиска.
        </p>

        <h3 className="mt-6 mb-3 text-xl font-bold text-amber-400">Ключевые концепции:</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg bg-slate-800/50 border-slate-700">
            <h4 className="mb-2 font-semibold text-blue-400">Функция оценки f(n) = g(n) + h(n)</h4>
            <ul className="space-y-2 text-slate-300">
              <li><strong className="text-green-400">g(n)</strong> — стоимость пути от начальной точки до текущей</li>
              <li><strong className="text-purple-400">h(n)</strong> — эвристическая оценка расстояния от текущей точки до цели</li>
              <li><strong className="text-amber-400">f(n)</strong> — общая оценка стоимости пути через данную точку</li>
            </ul>
          </div>

          <div className="p-4 border rounded-lg bg-slate-800/50 border-slate-700">
            <h4 className="mb-2 font-semibold text-blue-400">Эвристические функции:</h4>
            <ul className="space-y-2 text-slate-300">
              <li><strong>Манхэттенское расстояние:</strong> |x₁ - x₂| + |y₁ - y₂| (для сетки с 4 направлениями)</li>
              <li><strong>Евклидово расстояние:</strong> √((x₁ - x₂)² + (y₁ - y₂)²) (для любых направлений)</li>
              <li><strong>Диагональное расстояние:</strong> max(|x₁ - x₂|, |y₁ - y₂|) (для 8 направлений)</li>
            </ul>
          </div>
        </div>
      </div>

      <div>
        <h3 className="mt-6 mb-3 text-xl font-bold text-amber-400">Принцип работы:</h3>
        <ol className="space-y-3 list-decimal list-inside">
          <li className="text-slate-300">
            <strong>Инициализация:</strong> Добавляем стартовую точку в открытый список с f = h (так как g = 0)
          </li>
          <li className="text-slate-300">
            <strong>Основной цикл:</strong>
            <ul className="mt-2 ml-6 space-y-1 list-disc">
              <li>Выбираем узел с минимальным f из открытого списка</li>
              <li>Если это целевой узел — путь найден</li>
              <li>Перемещаем узел в закрытый список</li>
              <li>Для каждого соседа вычисляем g, h и f</li>
              <li>Добавляем или обновляем соседей в открытом списке</li>
            </ul>
          </li>
          <li className="text-slate-300">
            <strong>Восстановление пути:</strong> Идем от цели к старту по родительским узлам
          </li>
        </ol>
      </div>

      <div className="p-4 mt-6 border rounded-lg bg-amber-900/20 border-amber-800/30">
        <h4 className="mb-2 font-bold text-amber-300">⚡ Важные свойства:</h4>
        <ul className="space-y-1 text-amber-100 list-disc list-inside">
          <li>A* гарантированно находит кратчайший путь, если эвристика допустима (не переоценивает)</li>
          <li>Эффективнее Дейкстры благодаря направленному поиску</li>
          <li>Требует больше памяти для хранения открытого и закрытого списков</li>
          <li>Производительность сильно зависит от качества эвристики</li>
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
            <h4 className="mb-2 font-semibold text-blue-400">🎮 Игровая индустрия</h4>
            <ul className="space-y-1 text-sm text-slate-300">
              <li>• Навигация NPC в играх</li>
              <li>• Стратегии в RTS играх</li>
              <li>• Pathfinding в RPG и MOBA</li>
            </ul>
          </div>

          <div className="p-4 border rounded-lg bg-slate-800/50 border-slate-700">
            <h4 className="mb-2 font-semibold text-green-400">🤖 Робототехника</h4>
            <ul className="space-y-1 text-sm text-slate-300">
              <li>• Планирование маршрутов роботов</li>
              <li>• Навигация дронов</li>
              <li>• Автономные транспортные средства</li>
            </ul>
          </div>

          <div className="p-4 border rounded-lg bg-slate-800/50 border-slate-700">
            <h4 className="mb-2 font-semibold text-purple-400">🗺️ Картография</h4>
            <ul className="space-y-1 text-sm text-slate-300">
              <li>• GPS навигация</li>
              <li>• Оптимизация маршрутов доставки</li>
              <li>• Городское планирование</li>
            </ul>
          </div>

          <div className="p-4 border rounded-lg bg-slate-800/50 border-slate-700">
            <h4 className="mb-2 font-semibold text-amber-400">🧩 Решение задач</h4>
            <ul className="space-y-1 text-sm text-slate-300">
              <li>• Решение головоломок</li>
              <li>• Оптимизация в логистике</li>
              <li>• Планирование в AI системах</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="p-4 border rounded-lg bg-blue-900/20 border-blue-800/30">
        <h4 className="mb-3 font-bold text-blue-300">💡 Реальные примеры использования:</h4>
        <div className="space-y-3 text-blue-100">
          <div>
            <strong>Google Maps:</strong> Модифицированная версия A* для поиска оптимальных маршрутов с учетом 
            трафика, типов дорог и предпочтений пользователя.
          </div>
          <div>
            <strong>StarCraft II:</strong> Использует иерархический A* для навигации юнитов по сложным картам 
            с препятствиями и динамическими объектами.
          </div>
          <div>
            <strong>Unity Navigation:</strong> Встроенная система навигации использует A* на навигационных мешах 
            (NavMesh) для 3D pathfinding.
          </div>
        </div>
      </div>

      <div className="p-4 mt-4 border rounded-lg bg-purple-900/20 border-purple-800/30">
        <h4 className="mb-2 font-bold text-purple-300">🚀 Оптимизации и модификации:</h4>
        <ul className="space-y-2 text-purple-100">
          <li><strong>Jump Point Search (JPS):</strong> Ускоряет A* на однородных сетках, пропуская симметричные пути</li>
          <li><strong>Hierarchical A*:</strong> Разбивает карту на регионы для ускорения поиска на больших картах</li>
          <li><strong>Theta*:</strong> Находит более естественные пути, позволяя диагональные переходы любой длины</li>
          <li><strong>D* и D* Lite:</strong> Динамические версии для изменяющихся карт</li>
        </ul>
      </div>
    </div>
  );
};

// Главный компонент страницы
const AStarPage: React.FC = () => {
  // Состояние алгоритма
  const [gridSize, setGridSize] = useState<GridSize>(DEFAULT_GRID_SIZE);
  const [speed, setSpeed] = useState(DEFAULT_SPEED);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [stats, setStats] = useState<AlgorithmStats | null>(null);
  
  // Реф для модели алгоритма
  const modelRef = useRef<AStarModel | null>(null);
  const animationRef = useRef<number | null>(null);
  
  // Инициализация модели
  useEffect(() => {
    modelRef.current = new AStarModel(gridSize);
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [gridSize]);
  
  // Запуск алгоритма
  const handleStart = useCallback(() => {
    if (!modelRef.current) return;
    
    setIsRunning(true);
    setIsPaused(false);
    setStats(null);
    
    // Запускаем алгоритм
    const result = modelRef.current.findPath();
    
    if (result) {
      setStats(result.stats);
      // Здесь будет анимация
    } else {
      setIsRunning(false);
    }
  }, []);
  
  // Пауза/возобновление
  const handlePauseResume = useCallback(() => {
    setIsPaused(prev => !prev);
  }, []);
  
  // Сброс
  const handleReset = useCallback(() => {
    if (modelRef.current) {
      modelRef.current.reset();
      setIsRunning(false);
      setIsPaused(false);
      setStats(null);
    }
  }, []);
  
  // Изменение размера сетки
  const handleGridSizeChange = useCallback((newSize: GridSize) => {
    setGridSize(newSize);
    handleReset();
  }, [handleReset]);
  
  // Получаем связанные алгоритмы
  const relatedAlgorithms = useMemo(() => 
    getRelatedAlgorithms('astar', 'pathfinding').map(algo => ({
      id: algo.id,
      name: algo.name,
      path: algo.path,
    })),
    []
  );

  return (
    <AlgorithmLayout
      title="A* (A-star) Pathfinding"
      description="Эффективный алгоритм поиска кратчайшего пути с использованием эвристической функции"
      complexity={{
        time: 'O(b^d)',
        space: 'O(b^d)',
        note: 'b - коэффициент ветвления, d - глубина решения',
      }}
      category={{
        id: 'pathfinding',
        name: 'Поиск пути',
        icon: 'material-symbols:route',
      }}
      relatedAlgorithms={relatedAlgorithms}
      visualization={
        <div className="space-y-6">
          {/* Визуализатор */}
          <AStarVisualizer
            model={modelRef.current}
            isRunning={isRunning}
            isPaused={isPaused}
            speed={speed}
          />
          
          {/* Панель управления */}
          <ControlPanel
            gridSize={gridSize}
            speed={speed}
            isRunning={isRunning}
            isPaused={isPaused}
            onStart={handleStart}
            onPauseResume={handlePauseResume}
            onReset={handleReset}
            onGridSizeChange={handleGridSizeChange}
            onSpeedChange={setSpeed}
          />
          
          {/* Статистика */}
          <AnimatePresence>
            {stats && <StatsDisplay stats={stats} />}
          </AnimatePresence>
        </div>
      }
      implementation={<CodeImplementation />}
      explanation={<AlgorithmExplanation />}
      applications={<ApplicationsSection />}
    />
  );
};

export default AStarPage;
