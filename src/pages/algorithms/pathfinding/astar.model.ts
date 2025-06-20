// Типы для A* алгоритма
export interface GridSize {
  width: number;
  height: number;
}

export interface Position {
  x: number;
  y: number;
}

export interface Node {
  position: Position;
  g: number; // Стоимость от старта
  h: number; // Эвристическая оценка до цели
  f: number; // g + h
  parent: Node | null;
  isWall: boolean;
  isStart: boolean;
  isEnd: boolean;
  isPath: boolean;
  isVisited: boolean;
  isOpen: boolean;
}

export interface AlgorithmStats {
  pathLength: number;
  nodesVisited: number;
  nodesExpanded: number;
  executionTime: number;
  pathCost: number;
}

export type HeuristicType = 'manhattan' | 'euclidean' | 'diagonal';

export interface AStarConfig {
  heuristic: HeuristicType;
  allowDiagonal: boolean;
  weightH: number; // Вес эвристики (> 1 = жадный поиск, < 1 = близко к Дейкстре)
}

export interface PathfindingResult {
  path: Node[] | null;
  stats: AlgorithmStats;
  visitedNodes: Node[];
}

// Бинарная куча для оптимизации открытого списка
class BinaryHeap<T> {
  private heap: T[] = [];
  private scoreFunction: (item: T) => number;

  constructor(scoreFunction: (item: T) => number) {
    this.scoreFunction = scoreFunction;
  }

  push(element: T): void {
    this.heap.push(element);
    this.bubbleUp(this.heap.length - 1);
  }

  pop(): T | undefined {
    const result = this.heap[0];
    const end = this.heap.pop();
    
    if (this.heap.length > 0 && end !== undefined) {
      this.heap[0] = end;
      this.sinkDown(0);
    }
    
    return result;
  }

  remove(element: T): void {
    const index = this.heap.indexOf(element);
    if (index === -1) return;
    
    const end = this.heap.pop();
    if (index !== this.heap.length && end !== undefined) {
      this.heap[index] = end;
      this.bubbleUp(index);
      this.sinkDown(index);
    }
  }

  size(): number {
    return this.heap.length;
  }

  has(element: T): boolean {
    return this.heap.includes(element);
  }

  empty(): boolean {
    return this.heap.length === 0;
  }

  private bubbleUp(index: number): void {
    const element = this.heap[index];
    const score = this.scoreFunction(element);
    
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      const parent = this.heap[parentIndex];
      
      if (score >= this.scoreFunction(parent)) break;
      
      this.heap[index] = parent;
      this.heap[parentIndex] = element;
      index = parentIndex;
    }
  }

  private sinkDown(index: number): void {
    const element = this.heap[index];
    const score = this.scoreFunction(element);
    const length = this.heap.length;
    
    while (true) {
      const leftChildIndex = 2 * index + 1;
      const rightChildIndex = 2 * index + 2;
      let swapIndex = -1;
      
      if (leftChildIndex < length) {
        const leftChild = this.heap[leftChildIndex];
        const leftScore = this.scoreFunction(leftChild);
        
        if (leftScore < score) {
          swapIndex = leftChildIndex;
        }
      }
      
      if (rightChildIndex < length) {
        const rightChild = this.heap[rightChildIndex];
        const rightScore = this.scoreFunction(rightChild);
        const compareScore = swapIndex === -1 ? score : this.scoreFunction(this.heap[swapIndex]);
        
        if (rightScore < compareScore) {
          swapIndex = rightChildIndex;
        }
      }
      
      if (swapIndex === -1) break;
      
      this.heap[index] = this.heap[swapIndex];
      this.heap[swapIndex] = element;
      index = swapIndex;
    }
  }
}

// Основная модель A* алгоритма
export class AStarModel {
  private grid: Node[][];
  private gridSize: GridSize;
  private startNode: Node | null = null;
  private endNode: Node | null = null;
  private config: AStarConfig;
  
  constructor(gridSize: GridSize, config?: Partial<AStarConfig>) {
    this.gridSize = gridSize;
    this.config = {
      heuristic: 'manhattan',
      allowDiagonal: true,
      weightH: 1.0,
      ...config,
    };
    
    this.grid = this.createGrid();
    this.setDefaultStartEnd();
  }
  
  private createGrid(): Node[][] {
    const grid: Node[][] = [];
    
    for (let y = 0; y < this.gridSize.height; y++) {
      grid[y] = [];
      for (let x = 0; x < this.gridSize.width; x++) {
        grid[y][x] = {
          position: { x, y },
          g: 0,
          h: 0,
          f: 0,
          parent: null,
          isWall: false,
          isStart: false,
          isEnd: false,
          isPath: false,
          isVisited: false,
          isOpen: false,
        };
      }
    }
    
    return grid;
  }
  
  private setDefaultStartEnd(): void {
    // Устанавливаем старт в левом верхнем углу
    const startX = Math.floor(this.gridSize.width * 0.2);
    const startY = Math.floor(this.gridSize.height * 0.5);
    this.setStart({ x: startX, y: startY });
    
    // Устанавливаем цель в правом нижнем углу
    const endX = Math.floor(this.gridSize.width * 0.8);
    const endY = Math.floor(this.gridSize.height * 0.5);
    this.setEnd({ x: endX, y: endY });
  }
  
  setStart(pos: Position): void {
    if (this.startNode) {
      this.startNode.isStart = false;
    }
    
    const node = this.getNode(pos);
    if (node && !node.isWall && !node.isEnd) {
      node.isStart = true;
      this.startNode = node;
    }
  }
  
  setEnd(pos: Position): void {
    if (this.endNode) {
      this.endNode.isEnd = false;
    }
    
    const node = this.getNode(pos);
    if (node && !node.isWall && !node.isStart) {
      node.isEnd = true;
      this.endNode = node;
    }
  }
  
  toggleWall(pos: Position): void {
    const node = this.getNode(pos);
    if (node && !node.isStart && !node.isEnd) {
      node.isWall = !node.isWall;
    }
  }
  
  getNode(pos: Position): Node | null {
    if (pos.x < 0 || pos.x >= this.gridSize.width || 
        pos.y < 0 || pos.y >= this.gridSize.height) {
      return null;
    }
    return this.grid[pos.y][pos.x];
  }
  
  getGrid(): Node[][] {
    return this.grid;
  }
  
  reset(): void {
    for (let y = 0; y < this.gridSize.height; y++) {
      for (let x = 0; x < this.gridSize.width; x++) {
        const node = this.grid[y][x];
        node.g = 0;
        node.h = 0;
        node.f = 0;
        node.parent = null;
        node.isPath = false;
        node.isVisited = false;
        node.isOpen = false;
      }
    }
  }
  
  clearWalls(): void {
    for (let y = 0; y < this.gridSize.height; y++) {
      for (let x = 0; x < this.gridSize.width; x++) {
        this.grid[y][x].isWall = false;
      }
    }
  }
  
  generateMaze(density: number = 0.3): void {
    this.clearWalls();
    
    for (let y = 0; y < this.gridSize.height; y++) {
      for (let x = 0; x < this.gridSize.width; x++) {
        const node = this.grid[y][x];
        if (!node.isStart && !node.isEnd && Math.random() < density) {
          node.isWall = true;
        }
      }
    }
  }
  
  private heuristic(a: Position, b: Position): number {
    const dx = Math.abs(a.x - b.x);
    const dy = Math.abs(a.y - b.y);
    
    switch (this.config.heuristic) {
      case 'manhattan':
        return dx + dy;
      
      case 'euclidean':
        return Math.sqrt(dx * dx + dy * dy);
      
      case 'diagonal':
        return Math.max(dx, dy);
      
      default:
        return dx + dy;
    }
  }
  
  private getNeighbors(node: Node): Node[] {
    const neighbors: Node[] = [];
    const { x, y } = node.position;
    
    // Основные направления (4-связность)
    const directions = [
      { x: 0, y: -1 }, // Вверх
      { x: 1, y: 0 },  // Вправо
      { x: 0, y: 1 },  // Вниз
      { x: -1, y: 0 }, // Влево
    ];
    
    // Диагональные направления (8-связность)
    if (this.config.allowDiagonal) {
      directions.push(
        { x: -1, y: -1 }, // Верхний левый
        { x: 1, y: -1 },  // Верхний правый
        { x: 1, y: 1 },   // Нижний правый
        { x: -1, y: 1 },  // Нижний левый
      );
    }
    
    for (const dir of directions) {
      const newX = x + dir.x;
      const newY = y + dir.y;
      
      const neighbor = this.getNode({ x: newX, y: newY });
      if (neighbor && !neighbor.isWall) {
        // Проверка на возможность диагонального движения
        if (Math.abs(dir.x) + Math.abs(dir.y) === 2) {
          // Это диагональное движение, проверяем углы
          const corner1 = this.getNode({ x: x + dir.x, y: y });
          const corner2 = this.getNode({ x: x, y: y + dir.y });
          
          if (corner1?.isWall || corner2?.isWall) {
            continue; // Нельзя срезать углы
          }
        }
        
        neighbors.push(neighbor);
      }
    }
    
    return neighbors;
  }
  
  private reconstructPath(endNode: Node): Node[] {
    const path: Node[] = [];
    let current: Node | null = endNode;
    
    while (current) {
      path.unshift(current);
      current.isPath = true;
      current = current.parent;
    }
    
    return path;
  }
  
  findPath(): PathfindingResult | null {
    if (!this.startNode || !this.endNode) {
      return null;
    }
    
    const startTime = performance.now();
    const openHeap = new BinaryHeap<Node>(node => node.f);
    const closedSet = new Set<Node>();
    const visitedNodes: Node[] = [];
    
    // Инициализация стартового узла
    this.startNode.g = 0;
    this.startNode.h = this.heuristic(this.startNode.position, this.endNode.position) * this.config.weightH;
    this.startNode.f = this.startNode.h;
    
    openHeap.push(this.startNode);
    this.startNode.isOpen = true;
    
    let nodesExpanded = 0;
    
    while (!openHeap.empty()) {
      // Получаем узел с минимальным f
      const current = openHeap.pop()!;
      current.isOpen = false;
      
      // Если достигли цели
      if (current === this.endNode) {
        const endTime = performance.now();
        const path = this.reconstructPath(current);
        
        return {
          path,
          stats: {
            pathLength: path.length,
            pathCost: current.g,
            nodesVisited: visitedNodes.length,
            nodesExpanded,
            executionTime: endTime - startTime,
          },
          visitedNodes,
        };
      }
      
      // Добавляем в закрытый список
      closedSet.add(current);
      current.isVisited = true;
      visitedNodes.push(current);
      nodesExpanded++;
      
      // Проверяем всех соседей
      const neighbors = this.getNeighbors(current);
      
      for (const neighbor of neighbors) {
        if (closedSet.has(neighbor)) {
          continue;
        }
        
        // Вычисляем стоимость движения
        const dx = Math.abs(neighbor.position.x - current.position.x);
        const dy = Math.abs(neighbor.position.y - current.position.y);
        const moveCost = (dx + dy === 2) ? Math.SQRT2 : 1; // Диагональ дороже
        
        const tentativeG = current.g + moveCost;
        
        // Если это новый узел или нашли более короткий путь
        if (!openHeap.has(neighbor)) {
          neighbor.g = tentativeG;
          neighbor.h = this.heuristic(neighbor.position, this.endNode.position) * this.config.weightH;
          neighbor.f = neighbor.g + neighbor.h;
          neighbor.parent = current;
          
          openHeap.push(neighbor);
          neighbor.isOpen = true;
        } else if (tentativeG < neighbor.g) {
          // Нашли лучший путь к соседу
          neighbor.g = tentativeG;
          neighbor.f = neighbor.g + neighbor.h;
          neighbor.parent = current;
          
          // Обновляем позицию в куче
          openHeap.remove(neighbor);
          openHeap.push(neighbor);
        }
      }
    }
    
    // Путь не найден
    const endTime = performance.now();
    return {
      path: null,
      stats: {
        pathLength: 0,
        pathCost: 0,
        nodesVisited: visitedNodes.length,
        nodesExpanded,
        executionTime: endTime - startTime,
      },
      visitedNodes,
    };
  }
  
  // Генератор для пошаговой визуализации
  *findPathGenerator(): Generator<{ current: Node; openList: Node[]; visitedNodes: Node[] }, PathfindingResult | null, unknown> {
    if (!this.startNode || !this.endNode) {
      return null;
    }
    
    const startTime = performance.now();
    const openHeap = new BinaryHeap<Node>(node => node.f);
    const closedSet = new Set<Node>();
    const visitedNodes: Node[] = [];
    
    // Инициализация
    this.startNode.g = 0;
    this.startNode.h = this.heuristic(this.startNode.position, this.endNode.position) * this.config.weightH;
    this.startNode.f = this.startNode.h;
    
    openHeap.push(this.startNode);
    this.startNode.isOpen = true;
    
    let nodesExpanded = 0;
    
    while (!openHeap.empty()) {
      const current = openHeap.pop()!;
      current.isOpen = false;
      
      // Yield текущее состояние для визуализации
      yield {
        current,
        openList: [], // Можно извлечь из heap если нужно
        visitedNodes: [...visitedNodes],
      };
      
      if (current === this.endNode) {
        const endTime = performance.now();
        const path = this.reconstructPath(current);
        
        return {
          path,
          stats: {
            pathLength: path.length,
            pathCost: current.g,
            nodesVisited: visitedNodes.length,
            nodesExpanded,
            executionTime: endTime - startTime,
          },
          visitedNodes,
        };
      }
      
      closedSet.add(current);
      current.isVisited = true;
      visitedNodes.push(current);
      nodesExpanded++;
      
      const neighbors = this.getNeighbors(current);
      
      for (const neighbor of neighbors) {
        if (closedSet.has(neighbor)) {
          continue;
        }
        
        const dx = Math.abs(neighbor.position.x - current.position.x);
        const dy = Math.abs(neighbor.position.y - current.position.y);
        const moveCost = (dx + dy === 2) ? Math.SQRT2 : 1;
        
        const tentativeG = current.g + moveCost;
        
        if (!openHeap.has(neighbor)) {
          neighbor.g = tentativeG;
          neighbor.h = this.heuristic(neighbor.position, this.endNode.position) * this.config.weightH;
          neighbor.f = neighbor.g + neighbor.h;
          neighbor.parent = current;
          
          openHeap.push(neighbor);
          neighbor.isOpen = true;
        } else if (tentativeG < neighbor.g) {
          neighbor.g = tentativeG;
          neighbor.f = neighbor.g + neighbor.h;
          neighbor.parent = current;
          
          openHeap.remove(neighbor);
          openHeap.push(neighbor);
        }
      }
    }
    
    const endTime = performance.now();
    return {
      path: null,
      stats: {
        pathLength: 0,
        pathCost: 0,
        nodesVisited: visitedNodes.length,
        nodesExpanded,
        executionTime: endTime - startTime,
      },
      visitedNodes,
    };
  }
}
