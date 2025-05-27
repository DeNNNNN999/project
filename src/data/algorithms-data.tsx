import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Icon } from '@iconify/react';

// Метаданные категорий алгоритмов
export const algorithmCategories = [
  { id: 'all', name: 'Все алгоритмы', icon: 'ph:code-bold' },
  { id: 'sorting', name: 'Сортировка', icon: 'ph:sort-ascending-bold', path: '/algorithms/sorting' },
  { id: 'pathfinding', name: 'Поиск пути', icon: 'ph:graph-bold', path: '/algorithms/pathfinding' },
  { id: 'automata', name: 'Автоматы', icon: 'ph:brackets-curly-bold', path: '/algorithms/automata' },
  { id: 'math', name: 'Численные методы', icon: 'ph:function-bold', path: '/algorithms/math' },
];

// Метаданные всех алгоритмов
export const algorithms = [
  // Алгоритмы сортировки
  {
    id: 'quicksort',
    name: 'Быстрая сортировка',
    category: 'sorting',
    complexity: {
      time: 'O(n log n)',
      space: 'O(log n)',
    },
    description: 'Эффективный алгоритм сортировки с использованием подхода "разделяй и властвуй"',
    type: 'sorting',
    icon: 'ph:sort-ascending-bold',
    color: 'from-blue-600 to-indigo-600',
    path: '/algorithms/sorting/quicksort',
  },
  {
    id: 'mergesort',
    name: 'Сортировка слиянием',
    category: 'sorting',
    complexity: {
      time: 'O(n log n)',
      space: 'O(n)',
    },
    description: 'Стабильный алгоритм сортировки основанный на слиянии подмассивов',
    type: 'sorting',
    icon: 'ph:git-merge-bold',
    color: 'from-purple-600 to-indigo-600',
    path: '/algorithms/sorting/mergesort',
  },
  {
    id: 'heapsort',
    name: 'Пирамидальная сортировка',
    category: 'sorting',
    complexity: {
      time: 'O(n log n)',
      space: 'O(1)',
    },
    description: 'Алгоритм сортировки, использующий структуру данных "куча" (heap)',
    type: 'sorting',
    icon: 'ph:tree-structure-bold',
    color: 'from-green-600 to-blue-600',
    path: '/algorithms/sorting/heapsort',
  },
  
  // Алгоритмы поиска пути
  {
    id: 'astar',
    name: 'A* (A-star)',
    category: 'pathfinding',
    complexity: {
      time: 'O(E + V log V)',
      space: 'O(V)',
    },
    description: 'Алгоритм поиска оптимального пути в графе с использованием эвристики',
    type: 'pathfinding',
    icon: 'ph:graph-bold',
    color: 'from-green-600 to-teal-600',
    path: '/algorithms/pathfinding/astar',
  },
  {
    id: 'dijkstra',
    name: 'Алгоритм Дейкстры',
    category: 'pathfinding',
    complexity: {
      time: 'O(E + V log V)',
      space: 'O(V)',
    },
    description: 'Алгоритм поиска кратчайшего пути от одной вершины до всех остальных',
    type: 'pathfinding',
    icon: 'ph:tree-structure-bold',
    color: 'from-teal-600 to-cyan-600',
    path: '/algorithms/pathfinding/dijkstra',
  },
  
  // Автоматы
  {
    id: 'dfa',
    name: 'Конечный автомат',
    category: 'automata',
    complexity: {
      time: 'O(n)',
      space: 'O(1)',
    },
    description: 'Математическая модель для распознавания регулярных языков',
    type: 'automaton',
    icon: 'ph:circuit-board-bold',
    color: 'from-yellow-600 to-orange-600',
    path: '/algorithms/automata/dfa',
  },
  {
    id: 'nfa',
    name: 'Недетерминированный конечный автомат',
    category: 'automata', 
    complexity: {
      time: 'O(2^n × m)',
      space: 'O(2^n)',
    },
    description: 'Гибкая модель вычисления с одновременными состояниями и ε-переходами',
    type: 'automaton',
    icon: 'ph:circuit-board-bold',
    color: 'from-purple-600 to-pink-600',
    path: '/algorithms/automata/nfa',
  },
  {
    id: 'pda',
    name: 'Автомат с магазинной памятью',
    category: 'automata',
    complexity: {
      time: 'O(n³)',
      space: 'O(n²)',
    },
    description: 'Расширение конечного автомата со стеком для распознавания контекстно-свободных языков',
    type: 'automaton',
    icon: 'ph:stack-bold',
    color: 'from-emerald-600 to-teal-600',
    path: '/algorithms/automata/pda',
  },
  {
    id: 'turing',
    name: 'Машина Тьюринга',
    category: 'automata',
    complexity: {
      time: 'O(n)',
      space: 'O(n)',
    },
    description: 'Универсальная модель вычислений с неограниченной лентой',
    type: 'automaton',
    icon: 'ph:tape-bold',
    color: 'from-blue-600 to-cyan-600',
    path: '/algorithms/automata/turing',
  },
  
  // Численные методы
  {
    id: 'newton',
    name: 'Метод Ньютона',
    category: 'math',
    complexity: {
      time: 'O(log(1/ε))',
      space: 'O(1)',
    },
    description: 'Итеративный численный метод для нахождения корней уравнения',
    type: 'newton',
    icon: 'ph:function-bold',
    color: 'from-pink-600 to-rose-600',
    path: '/algorithms/math/newton',
  },
];

// Вспомогательная функция для получения алгоритмов по категории
export const getAlgorithmsByCategory = (category) => {
  if (category === 'all') return algorithms;
  return algorithms.filter(algo => algo.category === category);
};

// Вспомогательная функция для получения алгоритма по ID
export const getAlgorithmById = (id) => {
  return algorithms.find(algo => algo.id === id);
};

// Вспомогательная функция для получения связанных алгоритмов
export const getRelatedAlgorithms = (currentId, categoryId, limit = 3) => {
  const sameCategoryAlgorithms = algorithms
    .filter(algo => algo.category === categoryId && algo.id !== currentId)
    .slice(0, limit);
  
  // Если недостаточно алгоритмов той же категории, добавляем из других категорий
  if (sameCategoryAlgorithms.length < limit) {
    const otherAlgorithms = algorithms
      .filter(algo => algo.category !== categoryId && algo.id !== currentId)
      .slice(0, limit - sameCategoryAlgorithms.length);
    
    return [...sameCategoryAlgorithms, ...otherAlgorithms];
  }
  
  return sameCategoryAlgorithms;
};

// Компонент для отображения карточки алгоритма
export const AlgorithmCard = ({ algorithm, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
      className="relative group"
    >
      <div
        className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${algorithm.color} blur-xl`}
        style={{ opacity: 0.1 }}
      />
      <motion.div
        className="relative h-full p-1 overflow-hidden transition-colors border rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border-slate-700/50 group-hover:border-slate-600/80"
        whileHover={{ y: -5 }}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className={`p-3 rounded-xl bg-gradient-to-br ${algorithm.color} bg-opacity-20`}>
              <Icon icon={algorithm.icon} className="w-6 h-6 text-white" />
            </div>
            <div className="px-3 py-1 text-xs font-medium rounded-full bg-slate-800/70 text-slate-300">
              {algorithm.complexity.time}
            </div>
          </div>

          <h3 className="mb-3 text-xl font-bold text-white">{algorithm.name}</h3>
          <p className="mb-6 text-sm text-slate-400">{algorithm.description}</p>

          <Link to={algorithm.path}>
            <motion.button
              className={`w-full py-3 font-medium text-white rounded-xl bg-gradient-to-r ${algorithm.color} opacity-90 hover:opacity-100 transition-opacity flex items-center justify-center gap-2`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Подробнее</span>
              <Icon icon="ph:arrow-right-bold" />
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
};
