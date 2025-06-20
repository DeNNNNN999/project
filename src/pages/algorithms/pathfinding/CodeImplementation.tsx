import React, { memo, useState } from 'react';
import { motion } from 'motion/react';

const implementations = {
  typescript: `// A* Pathfinding Algorithm Implementation in TypeScript

interface Point {
  x: number;
  y: number;
}

interface Node {
  position: Point;
  g: number; // Cost from start
  h: number; // Heuristic cost to end
  f: number; // Total cost (g + h)
  parent: Node | null;
}

class AStar {
  private grid: boolean[][]; // true = walkable, false = wall
  private width: number;
  private height: number;
  
  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.grid = Array(height).fill(null).map(() => 
      Array(width).fill(true)
    );
  }
  
  // Manhattan distance heuristic
  private heuristic(a: Point, b: Point): number {
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
  }
  
  // Get walkable neighbors
  private getNeighbors(point: Point): Point[] {
    const neighbors: Point[] = [];
    const directions = [
      { x: 0, y: -1 },  // Up
      { x: 1, y: 0 },   // Right
      { x: 0, y: 1 },   // Down
      { x: -1, y: 0 },  // Left
      // Diagonal movements (optional)
      { x: -1, y: -1 }, // Top-left
      { x: 1, y: -1 },  // Top-right
      { x: 1, y: 1 },   // Bottom-right
      { x: -1, y: 1 },  // Bottom-left
    ];
    
    for (const dir of directions) {
      const newX = point.x + dir.x;
      const newY = point.y + dir.y;
      
      // Check bounds
      if (newX >= 0 && newX < this.width && 
          newY >= 0 && newY < this.height &&
          this.grid[newY][newX]) {
        
        // For diagonal movement, check if corners are walkable
        if (Math.abs(dir.x) + Math.abs(dir.y) === 2) {
          if (!this.grid[point.y + dir.y][point.x] || 
              !this.grid[point.y][point.x + dir.x]) {
            continue;
          }
        }
        
        neighbors.push({ x: newX, y: newY });
      }
    }
    
    return neighbors;
  }
  
  // Main pathfinding method
  findPath(start: Point, end: Point): Point[] | null {
    // Priority queue (open list)
    const openList: Node[] = [];
    const closedSet = new Set<string>();
    const nodeMap = new Map<string, Node>();
    
    // Helper to get node key
    const getKey = (p: Point) => \`\${p.x},\${p.y}\`;
    
    // Initialize start node
    const startNode: Node = {
      position: start,
      g: 0,
      h: this.heuristic(start, end),
      f: 0,
      parent: null,
    };
    startNode.f = startNode.g + startNode.h;
    
    openList.push(startNode);
    nodeMap.set(getKey(start), startNode);
    
    while (openList.length > 0) {
      // Find node with lowest f score
      let currentIndex = 0;
      for (let i = 1; i < openList.length; i++) {
        if (openList[i].f < openList[currentIndex].f) {
          currentIndex = i;
        }
      }
      
      const currentNode = openList.splice(currentIndex, 1)[0];
      const currentKey = getKey(currentNode.position);
      
      // Check if we reached the goal
      if (currentNode.position.x === end.x && 
          currentNode.position.y === end.y) {
        return this.reconstructPath(currentNode);
      }
      
      closedSet.add(currentKey);
      
      // Check all neighbors
      const neighbors = this.getNeighbors(currentNode.position);
      
      for (const neighborPos of neighbors) {
        const neighborKey = getKey(neighborPos);
        
        if (closedSet.has(neighborKey)) {
          continue;
        }
        
        // Calculate movement cost (diagonal = √2 ≈ 1.414)
        const dx = Math.abs(neighborPos.x - currentNode.position.x);
        const dy = Math.abs(neighborPos.y - currentNode.position.y);
        const moveCost = (dx + dy === 2) ? 1.414 : 1;
        
        const tentativeG = currentNode.g + moveCost;
        
        let neighborNode = nodeMap.get(neighborKey);
        
        if (!neighborNode) {
          // Create new node
          neighborNode = {
            position: neighborPos,
            g: tentativeG,
            h: this.heuristic(neighborPos, end),
            f: 0,
            parent: currentNode,
          };
          neighborNode.f = neighborNode.g + neighborNode.h;
          
          openList.push(neighborNode);
          nodeMap.set(neighborKey, neighborNode);
        } else if (tentativeG < neighborNode.g) {
          // Found better path to neighbor
          neighborNode.g = tentativeG;
          neighborNode.f = neighborNode.g + neighborNode.h;
          neighborNode.parent = currentNode;
        }
      }
    }
    
    // No path found
    return null;
  }
  
  // Reconstruct path from end node
  private reconstructPath(endNode: Node): Point[] {
    const path: Point[] = [];
    let current: Node | null = endNode;
    
    while (current) {
      path.unshift(current.position);
      current = current.parent;
    }
    
    return path;
  }
  
  // Set wall at position
  setWall(x: number, y: number, isWall: boolean): void {
    if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
      this.grid[y][x] = !isWall;
    }
  }
}

// Usage example
const pathfinder = new AStar(20, 20);

// Set some walls
pathfinder.setWall(5, 5, true);
pathfinder.setWall(5, 6, true);
pathfinder.setWall(5, 7, true);

// Find path
const path = pathfinder.findPath(
  { x: 0, y: 0 },
  { x: 19, y: 19 }
);

if (path) {
  console.log('Path found:', path);
} else {
  console.log('No path exists');
}`,

  python: `# A* Pathfinding Algorithm Implementation in Python

import heapq
from typing import List, Tuple, Optional, Set
import math

class AStar:
    def __init__(self, width: int, height: int):
        self.width = width
        self.height = height
        # True = walkable, False = wall
        self.grid = [[True for _ in range(width)] for _ in range(height)]
    
    def heuristic(self, a: Tuple[int, int], b: Tuple[int, int]) -> float:
        """Manhattan distance heuristic"""
        return abs(a[0] - b[0]) + abs(a[1] - b[1])
    
    def get_neighbors(self, pos: Tuple[int, int]) -> List[Tuple[int, int]]:
        """Get all walkable neighboring positions"""
        x, y = pos
        neighbors = []
        
        # 8-directional movement
        directions = [
            (0, -1),   # Up
            (1, 0),    # Right
            (0, 1),    # Down
            (-1, 0),   # Left
            (-1, -1),  # Top-left
            (1, -1),   # Top-right
            (1, 1),    # Bottom-right
            (-1, 1),   # Bottom-left
        ]
        
        for dx, dy in directions:
            nx, ny = x + dx, y + dy
            
            # Check bounds
            if 0 <= nx < self.width and 0 <= ny < self.height:
                if self.grid[ny][nx]:  # Check if walkable
                    # For diagonal movement, check corners
                    if abs(dx) + abs(dy) == 2:
                        if not self.grid[y + dy][x] or not self.grid[y][x + dx]:
                            continue
                    neighbors.append((nx, ny))
        
        return neighbors
    
    def find_path(self, start: Tuple[int, int], 
                  end: Tuple[int, int]) -> Optional[List[Tuple[int, int]]]:
        """Find shortest path from start to end using A*"""
        
        # Priority queue: (f_score, g_score, position, path)
        open_list = [(0, 0, start, [start])]
        
        # Track visited nodes with their best g_score
        g_scores = {start: 0}
        
        # Set of closed nodes
        closed_set: Set[Tuple[int, int]] = set()
        
        while open_list:
            f_score, g_score, current, path = heapq.heappop(open_list)
            
            # Skip if already processed with better score
            if current in closed_set:
                continue
            
            # Check if reached goal
            if current == end:
                return path
            
            closed_set.add(current)
            
            # Check all neighbors
            for neighbor in self.get_neighbors(current):
                if neighbor in closed_set:
                    continue
                
                # Calculate movement cost
                dx = abs(neighbor[0] - current[0])
                dy = abs(neighbor[1] - current[1])
                move_cost = math.sqrt(2) if dx + dy == 2 else 1
                
                tentative_g = g_score + move_cost
                
                # Skip if we've found a better path to this neighbor
                if neighbor in g_scores and tentative_g >= g_scores[neighbor]:
                    continue
                
                # Update best path to neighbor
                g_scores[neighbor] = tentative_g
                h_score = self.heuristic(neighbor, end)
                f_score = tentative_g + h_score
                
                heapq.heappush(open_list, 
                             (f_score, tentative_g, neighbor, path + [neighbor]))
        
        # No path found
        return None
    
    def set_wall(self, x: int, y: int, is_wall: bool = True):
        """Set or remove wall at position"""
        if 0 <= x < self.width and 0 <= y < self.height:
            self.grid[y][x] = not is_wall
    
    def print_path(self, path: Optional[List[Tuple[int, int]]]):
        """Visualize the grid with path"""
        if not path:
            print("No path found!")
            return
        
        path_set = set(path)
        
        for y in range(self.height):
            for x in range(self.width):
                if (x, y) == path[0]:
                    print('S', end=' ')  # Start
                elif (x, y) == path[-1]:
                    print('E', end=' ')  # End
                elif (x, y) in path_set:
                    print('*', end=' ')  # Path
                elif not self.grid[y][x]:
                    print('#', end=' ')  # Wall
                else:
                    print('.', end=' ')  # Empty
            print()

# Example usage
if __name__ == "__main__":
    # Create 20x20 grid
    pathfinder = AStar(20, 20)
    
    # Add some walls
    for i in range(5, 15):
        pathfinder.set_wall(10, i)
    for i in range(5, 15):
        pathfinder.set_wall(i, 10)
    
    # Find path
    start = (0, 0)
    end = (19, 19)
    path = pathfinder.find_path(start, end)
    
    # Display result
    pathfinder.print_path(path)
    
    if path:
        print(f"\\nPath length: {len(path)}")
        print(f"Path cost: {sum(math.sqrt(2) if abs(path[i][0] - path[i+1][0]) + 
                                                abs(path[i][1] - path[i+1][1]) == 2 
                                          else 1 
                          for i in range(len(path)-1)):.2f}")`,

  javascript: `// A* Pathfinding Algorithm Implementation in JavaScript

class PriorityQueue {
  constructor() {
    this.heap = [];
  }
  
  push(item, priority) {
    this.heap.push({ item, priority });
    this.bubbleUp(this.heap.length - 1);
  }
  
  pop() {
    if (this.heap.length === 0) return null;
    
    const result = this.heap[0];
    const end = this.heap.pop();
    
    if (this.heap.length > 0) {
      this.heap[0] = end;
      this.sinkDown(0);
    }
    
    return result.item;
  }
  
  bubbleUp(index) {
    const element = this.heap[index];
    
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      const parent = this.heap[parentIndex];
      
      if (element.priority >= parent.priority) break;
      
      this.heap[index] = parent;
      this.heap[parentIndex] = element;
      index = parentIndex;
    }
  }
  
  sinkDown(index) {
    const element = this.heap[index];
    const length = this.heap.length;
    
    while (true) {
      let swapIndex = null;
      const leftChildIndex = 2 * index + 1;
      const rightChildIndex = 2 * index + 2;
      
      if (leftChildIndex < length) {
        const leftChild = this.heap[leftChildIndex];
        if (leftChild.priority < element.priority) {
          swapIndex = leftChildIndex;
        }
      }
      
      if (rightChildIndex < length) {
        const rightChild = this.heap[rightChildIndex];
        const compareElement = swapIndex === null ? element : this.heap[swapIndex];
        
        if (rightChild.priority < compareElement.priority) {
          swapIndex = rightChildIndex;
        }
      }
      
      if (swapIndex === null) break;
      
      this.heap[index] = this.heap[swapIndex];
      this.heap[swapIndex] = element;
      index = swapIndex;
    }
  }
  
  get size() {
    return this.heap.length;
  }
}

class AStar {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    // Initialize grid (true = walkable, false = wall)
    this.grid = Array(height).fill(null).map(() => Array(width).fill(true));
  }
  
  // Manhattan distance heuristic
  heuristic(a, b) {
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
  }
  
  // Get walkable neighbors
  getNeighbors(point) {
    const neighbors = [];
    const directions = [
      { x: 0, y: -1 },   // Up
      { x: 1, y: 0 },    // Right
      { x: 0, y: 1 },    // Down
      { x: -1, y: 0 },   // Left
      { x: -1, y: -1 },  // Top-left
      { x: 1, y: -1 },   // Top-right
      { x: 1, y: 1 },    // Bottom-right
      { x: -1, y: 1 },   // Bottom-left
    ];
    
    for (const dir of directions) {
      const newX = point.x + dir.x;
      const newY = point.y + dir.y;
      
      // Check bounds
      if (newX >= 0 && newX < this.width && 
          newY >= 0 && newY < this.height &&
          this.grid[newY][newX]) {
        
        // For diagonal movement, check corners
        if (Math.abs(dir.x) + Math.abs(dir.y) === 2) {
          if (!this.grid[point.y + dir.y][point.x] || 
              !this.grid[point.y][point.x + dir.x]) {
            continue;
          }
        }
        
        neighbors.push({ x: newX, y: newY });
      }
    }
    
    return neighbors;
  }
  
  // Find shortest path using A*
  findPath(start, end) {
    const openList = new PriorityQueue();
    const closedSet = new Set();
    const gScore = new Map();
    const parent = new Map();
    
    const getKey = (point) => \`\${point.x},\${point.y}\`;
    
    // Initialize start node
    gScore.set(getKey(start), 0);
    const hScore = this.heuristic(start, end);
    openList.push(start, hScore);
    
    while (openList.size > 0) {
      const current = openList.pop();
      const currentKey = getKey(current);
      
      // Check if reached goal
      if (current.x === end.x && current.y === end.y) {
        return this.reconstructPath(parent, current);
      }
      
      closedSet.add(currentKey);
      
      // Check all neighbors
      const neighbors = this.getNeighbors(current);
      
      for (const neighbor of neighbors) {
        const neighborKey = getKey(neighbor);
        
        if (closedSet.has(neighborKey)) {
          continue;
        }
        
        // Calculate movement cost
        const dx = Math.abs(neighbor.x - current.x);
        const dy = Math.abs(neighbor.y - current.y);
        const moveCost = (dx + dy === 2) ? Math.SQRT2 : 1;
        
        const tentativeG = gScore.get(currentKey) + moveCost;
        
        if (!gScore.has(neighborKey) || tentativeG < gScore.get(neighborKey)) {
          // Found better path
          parent.set(neighborKey, current);
          gScore.set(neighborKey, tentativeG);
          
          const h = this.heuristic(neighbor, end);
          const f = tentativeG + h;
          
          openList.push(neighbor, f);
        }
      }
    }
    
    // No path found
    return null;
  }
  
  // Reconstruct path from parent map
  reconstructPath(parentMap, end) {
    const path = [];
    let current = end;
    
    while (current) {
      path.unshift(current);
      const key = \`\${current.x},\${current.y}\`;
      current = parentMap.get(key);
    }
    
    return path;
  }
  
  // Set wall at position
  setWall(x, y, isWall = true) {
    if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
      this.grid[y][x] = !isWall;
    }
  }
  
  // Visualize grid with path
  visualize(path) {
    const pathSet = new Set(path?.map(p => \`\${p.x},\${p.y}\`) || []);
    let output = '';
    
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const key = \`\${x},\${y}\`;
        
        if (path && x === path[0].x && y === path[0].y) {
          output += 'S ';
        } else if (path && x === path[path.length - 1].x && 
                   y === path[path.length - 1].y) {
          output += 'E ';
        } else if (pathSet.has(key)) {
          output += '* ';
        } else if (!this.grid[y][x]) {
          output += '# ';
        } else {
          output += '. ';
        }
      }
      output += '\\n';
    }
    
    return output;
  }
}

// Example usage
const pathfinder = new AStar(20, 20);

// Create walls
for (let i = 5; i < 15; i++) {
  pathfinder.setWall(10, i);
}

// Find path
const start = { x: 0, y: 0 };
const end = { x: 19, y: 19 };
const path = pathfinder.findPath(start, end);

// Display result
console.log(pathfinder.visualize(path));

if (path) {
  console.log('Path found! Length:', path.length);
} else {
  console.log('No path exists!');
}`,
};

export const CodeImplementation: React.FC = memo(() => {
  const [selectedLanguage, setSelectedLanguage] = useState<keyof typeof implementations>('typescript');
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      {/* Language selector */}
      <div className="flex gap-2 p-1 bg-slate-800 rounded-lg">
        {Object.keys(implementations).map((lang) => (
          <button
            key={lang}
            onClick={() => setSelectedLanguage(lang as keyof typeof implementations)}
            className={`px-4 py-2 rounded-md font-medium transition-all ${
              selectedLanguage === lang
                ? 'bg-blue-600 text-white'
                : 'text-slate-400 hover:text-white hover:bg-slate-700'
            }`}
          >
            {lang.charAt(0).toUpperCase() + lang.slice(1)}
          </button>
        ))}
      </div>
      
      {/* Code display */}
      <div className="relative">
        <pre className="p-6 bg-slate-900 rounded-lg overflow-x-auto">
          <code className="text-sm text-slate-300 font-mono">
            {implementations[selectedLanguage]}
          </code>
        </pre>
        
        {/* Copy button */}
        <button
          onClick={() => navigator.clipboard.writeText(implementations[selectedLanguage])}
          className="absolute top-4 right-4 px-3 py-1 bg-slate-700 hover:bg-slate-600 rounded text-sm text-white transition-colors"
        >
          📋 Копировать
        </button>
      </div>
      
      {/* Implementation notes */}
      <div className="p-4 bg-slate-800 rounded-lg">
        <h4 className="font-semibold text-white mb-2">📝 Примечания к реализации:</h4>
        <ul className="space-y-1 text-sm text-slate-300">
          <li>• Используется бинарная куча (приоритетная очередь) для оптимизации выбора узлов</li>
          <li>• Поддерживается 8-направленное движение с проверкой углов</li>
          <li>• Диагональное движение имеет стоимость √2 ≈ 1.414</li>
          <li>• Алгоритм гарантированно находит кратчайший путь при допустимой эвристике</li>
        </ul>
      </div>
    </motion.div>
  );
});

CodeImplementation.displayName = 'CodeImplementation';
