export interface AlgorithmComplexity {
  time: string;
  space: string;
  note?: string;
}

export interface Algorithm {
  id: string;
  name: string;
  description: string;
  category: 'sorting' | 'automata' | 'pathfinding' | 'graph' | 'dynamic' | 'greedy' | 'numerical';
  path: string;
  complexity: AlgorithmComplexity;
  icon?: string;
  tags?: string[];
}

export interface AlgorithmCategory {
  id: string;
  name: string;
  icon: string;
  path: string;
  description?: string;
}



export const algorithmCategories: AlgorithmCategory[] = [
  {
    id: 'all',
    name: 'Все алгоритмы',
    icon: 'mdi:view-grid',
    path: '/algorithms'
  },
  {
    id: 'sorting',
    name: 'Сортировка',
    icon: 'mdi:sort-variant',
    path: '/algorithms/sorting'
  },
  {
    id: 'automata',
    name: 'Конечные автоматы',
    icon: 'ph:circuit-board-bold',
    path: '/algorithms/automata'
  },
  {
    id: 'pathfinding',
    name: 'Поиск пути',
    icon: 'material-symbols:route',
    path: '/algorithms/pathfinding'
  },
  {
    id: 'numerical',
    name: 'Численные методы',
    icon: 'tabler:math-function',
    path: '/algorithms/numerical'
  }
];

export const algorithms: Algorithm[] = [
  // Sorting Algorithms
  {
    id: 'quicksort',
    name: 'Quick Sort',
    description: 'Эффективный алгоритм сортировки с использованием стратегии "разделяй и властвуй"',
    category: 'sorting',
    path: '/algorithms/sorting/quicksort',
    complexity: {
      time: 'O(n log n)',
      space: 'O(log n)',
      note: 'В худшем случае O(n²)'
    },
    icon: 'mdi:sort-variant',
    tags: ['divide-and-conquer', 'in-place']
  },
  {
    id: 'mergesort',
    name: 'Merge Sort',
    description: 'Стабильный алгоритм сортировки слиянием',
    category: 'sorting',
    path: '/algorithms/sorting/mergesort',
    complexity: {
      time: 'O(n log n)',
      space: 'O(n)'
    },
    icon: 'mdi:call-merge',
    tags: ['divide-and-conquer', 'stable']
  },
  {
    id: 'heapsort',
    name: 'Heap Sort',
    description: 'Сортировка с использованием структуры данных "куча"',
    category: 'sorting',
    path: '/algorithms/sorting/heapsort',
    complexity: {
      time: 'O(n log n)',
      space: 'O(1)'
    },
    icon: 'mdi:tree',
    tags: ['in-place', 'heap']
  },

  // Automata Algorithms
  {
    id: 'dfa',
    name: 'DFA',
    description: 'Детерминированный конечный автомат для распознавания регулярных языков',
    category: 'automata',
    path: '/algorithms/automata/dfa',
    complexity: {
      time: 'O(n)',
      space: 'O(1)',
      note: 'n - длина входной строки'
    },
    icon: 'ph:circuit-board-bold',
    tags: ['fsm', 'regular-languages']
  },
  {
    id: 'nfa',
    name: 'NFA',
    description: 'Недетерминированный конечный автомат с множественными переходами',
    category: 'automata',
    path: '/algorithms/automata/nfa',
    complexity: {
      time: 'O(n²m)',
      space: 'O(nm)',
      note: 'n - состояния, m - длина строки'
    },
    icon: 'mdi:state-machine',
    tags: ['fsm', 'nondeterministic']
  },
  {
    id: 'pda',
    name: 'PDA',
    description: 'Автомат с магазинной памятью для контекстно-свободных языков',
    category: 'automata',
    path: '/algorithms/automata/pda',
    complexity: {
      time: 'O(n³)',
      space: 'O(n²)'
    },
    icon: 'mdi:stack-overflow',
    tags: ['context-free', 'stack']
  },
  {
    id: 'turing',
    name: 'Turing Machine',
    description: 'Универсальная вычислительная модель Тьюринга',
    category: 'automata',
    path: '/algorithms/automata/turing',
    complexity: {
      time: 'Varies',
      space: 'Unbounded'
    },
    icon: 'mdi:infinity',
    tags: ['computation', 'theoretical']
  },

  // Pathfinding Algorithms
  {
    id: 'astar',
    name: 'A* (A-star)',
    description: 'Эффективный алгоритм поиска кратчайшего пути с использованием эвристической функции',
    category: 'pathfinding',
    path: '/algorithms/pathfinding/astar',
    complexity: {
      time: 'O(b^d)',
      space: 'O(b^d)',
      note: 'b - коэффициент ветвления, d - глубина решения'
    },
    icon: 'material-symbols:route',
    tags: ['heuristic', 'optimal', 'graph']
  },
  {
    id: 'dijkstra',
    name: 'Dijkstra',
    description: 'Классический алгоритм поиска кратчайшего пути во взвешенном графе',
    category: 'pathfinding',
    path: '/algorithms/pathfinding/dijkstra',
    complexity: {
      time: 'O(V² + E)',
      space: 'O(V)',
      note: 'С бинарной кучей: O((V + E) log V)'
    },
    icon: 'mdi:map-marker-path',
    tags: ['graph', 'weighted', 'optimal']
  },

  // Numerical Methods
  {
    id: 'newton',
    name: 'Метод Ньютона',
    description: 'Итеративный численный метод для нахождения корней уравнения',
    category: 'numerical',
    path: '/algorithms/numerical/newton',
    complexity: {
      time: 'O(log(1/ε))',
      space: 'O(1)',
      note: 'ε - требуемая точность'
    },
    icon: 'tabler:math-function',
    tags: ['root-finding', 'iterative', 'calculus']
  }
];

// Helper functions
export function getAlgorithmsByCategory(category: Algorithm['category']): Algorithm[] {
  return algorithms.filter(algo => algo.category === category);
}

export function getRelatedAlgorithms(currentId: string, category: Algorithm['category']): Algorithm[] {
  return algorithms.filter(algo =>
    algo.category === category && algo.id !== currentId
  );
}

export function getAlgorithmById(id: string): Algorithm | undefined {
  return algorithms.find(algo => algo.id === id);
}

export function getAlgorithmByPath(path: string): Algorithm | undefined {
  return algorithms.find(algo => algo.path === path);
}
