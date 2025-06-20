import React, { useRef, useEffect, useCallback, useState, memo } from 'react';
import { motion } from 'motion/react';
import { AStarModel, Node, Position } from './astar.model';

interface AStarVisualizerProps {
  model: AStarModel | null;
  isRunning: boolean;
  isPaused: boolean;
  speed: number;
}

// Цветовая схема
const COLORS = {
  grid: '#1e293b',
  gridLine: '#334155',
  start: '#22c55e',
  end: '#ef4444',
  wall: '#475569',
  visited: '#8b5cf6',
  open: '#3b82f6',
  path: '#facc15',
  pathLine: '#f59e0b',
  current: '#ec4899',
  text: '#f1f5f9',
  hover: 'rgba(255, 255, 255, 0.1)',
  values: {
    g: '#22c55e',
    h: '#8b5cf6',
    f: '#f59e0b',
  },
} as const;

// Тип инструмента рисования
type DrawingTool = 'wall' | 'start' | 'end' | 'erase';

export const AStarVisualizer: React.FC<AStarVisualizerProps> = memo(({
  model,
  isRunning,
  isPaused,
  speed,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const generatorRef = useRef<Generator<any, any, unknown> | null>(null);
  
  const [cellSize, setCellSize] = useState(24);
  const [hoveredCell, setHoveredCell] = useState<Position | null>(null);
  const [selectedTool, setSelectedTool] = useState<DrawingTool>('wall');
  const [isDrawing, setIsDrawing] = useState(false);
  const [showValues, setShowValues] = useState(false);
  
  // Вычисление размера ячейки на основе размера контейнера
  useEffect(() => {
    const updateCellSize = () => {
      if (!containerRef.current || !model) return;
      
      const grid = model.getGrid();
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      
      const cellWidth = Math.floor(width / grid[0].length);
      const cellHeight = Math.floor(height / grid.length);
      
      setCellSize(Math.min(cellWidth, cellHeight, 40));
    };
    
    updateCellSize();
    window.addEventListener('resize', updateCellSize);
    
    return () => window.removeEventListener('resize', updateCellSize);
  }, [model]);
  
  // Функция отрисовки сетки
  const drawGrid = useCallback((ctx: CanvasRenderingContext2D, grid: Node[][]) => {
    const width = grid[0].length * cellSize;
    const height = grid.length * cellSize;
    
    // Очистка канваса
    ctx.clearRect(0, 0, width, height);
    
    // Фон
    ctx.fillStyle = COLORS.grid;
    ctx.fillRect(0, 0, width, height);
    
    // Отрисовка ячеек
    for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[y].length; x++) {
        const node = grid[y][x];
        const xPos = x * cellSize;
        const yPos = y * cellSize;
        
        // Цвет ячейки
        if (node.isStart) {
          ctx.fillStyle = COLORS.start;
        } else if (node.isEnd) {
          ctx.fillStyle = COLORS.end;
        } else if (node.isWall) {
          ctx.fillStyle = COLORS.wall;
        } else if (node.isPath) {
          ctx.fillStyle = COLORS.path;
        } else if (node.isVisited) {
          ctx.fillStyle = COLORS.visited;
        } else if (node.isOpen) {
          ctx.fillStyle = COLORS.open;
        } else {
          ctx.fillStyle = COLORS.grid;
        }
        
        ctx.fillRect(xPos + 1, yPos + 1, cellSize - 2, cellSize - 2);
        
        // Отображение значений f, g, h
        if (showValues && (node.isVisited || node.isOpen) && cellSize > 20) {
          ctx.font = `${Math.floor(cellSize / 4)}px monospace`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          
          if (cellSize > 30) {
            // Показываем все значения
            ctx.fillStyle = COLORS.values.g;
            ctx.fillText(node.g.toFixed(1), xPos + cellSize * 0.25, yPos + cellSize * 0.3);
            
            ctx.fillStyle = COLORS.values.h;
            ctx.fillText(node.h.toFixed(1), xPos + cellSize * 0.75, yPos + cellSize * 0.3);
            
            ctx.fillStyle = COLORS.values.f;
            ctx.font = `bold ${Math.floor(cellSize / 3)}px monospace`;
            ctx.fillText(node.f.toFixed(1), xPos + cellSize * 0.5, yPos + cellSize * 0.7);
          } else {
            // Показываем только f
            ctx.fillStyle = COLORS.values.f;
            ctx.fillText(node.f.toFixed(0), xPos + cellSize * 0.5, yPos + cellSize * 0.5);
          }
        }
      }
    }
    
    // Линии сетки
    ctx.strokeStyle = COLORS.gridLine;
    ctx.lineWidth = 1;
    
    for (let x = 0; x <= grid[0].length; x++) {
      ctx.beginPath();
      ctx.moveTo(x * cellSize, 0);
      ctx.lineTo(x * cellSize, height);
      ctx.stroke();
    }
    
    for (let y = 0; y <= grid.length; y++) {
      ctx.beginPath();
      ctx.moveTo(0, y * cellSize);
      ctx.lineTo(width, y * cellSize);
      ctx.stroke();
    }
    
    // Подсветка при наведении
    if (hoveredCell && !isRunning) {
      ctx.fillStyle = COLORS.hover;
      ctx.fillRect(
        hoveredCell.x * cellSize + 1,
        hoveredCell.y * cellSize + 1,
        cellSize - 2,
        cellSize - 2
      );
    }
  }, [cellSize, showValues, hoveredCell, isRunning]);
  
  // Отрисовка пути
  const drawPath = useCallback((ctx: CanvasRenderingContext2D, path: Node[]) => {
    if (path.length < 2) return;
    
    ctx.strokeStyle = COLORS.pathLine;
    ctx.lineWidth = Math.max(2, cellSize / 8);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    ctx.beginPath();
    ctx.moveTo(
      path[0].position.x * cellSize + cellSize / 2,
      path[0].position.y * cellSize + cellSize / 2
    );
    
    for (let i = 1; i < path.length; i++) {
      ctx.lineTo(
        path[i].position.x * cellSize + cellSize / 2,
        path[i].position.y * cellSize + cellSize / 2
      );
    }
    
    ctx.stroke();
    
    // Стрелки направления
    if (cellSize > 20) {
      for (let i = 0; i < path.length - 1; i++) {
        const from = path[i].position;
        const to = path[i + 1].position;
        
        const angle = Math.atan2(to.y - from.y, to.x - from.x);
        const arrowSize = cellSize / 6;
        
        const centerX = (from.x + to.x) / 2 * cellSize + cellSize / 2;
        const centerY = (from.y + to.y) / 2 * cellSize + cellSize / 2;
        
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(angle);
        
        ctx.beginPath();
        ctx.moveTo(arrowSize, 0);
        ctx.lineTo(-arrowSize, -arrowSize);
        ctx.lineTo(-arrowSize, arrowSize);
        ctx.closePath();
        
        ctx.fillStyle = COLORS.pathLine;
        ctx.fill();
        
        ctx.restore();
      }
    }
  }, [cellSize]);
  
  // Основная функция отрисовки
  const draw = useCallback(() => {
    if (!canvasRef.current || !model) return;
    
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;
    
    const grid = model.getGrid();
    drawGrid(ctx, grid);
    
    // Отрисовка пути, если есть
    const pathNodes = grid.flat().filter(node => node.isPath);
    if (pathNodes.length > 0) {
      drawPath(ctx, pathNodes);
    }
  }, [model, drawGrid, drawPath]);
  
  // Анимация алгоритма
  const animate = useCallback(() => {
    if (!model || !generatorRef.current || isPaused) return;
    
    const result = generatorRef.current.next();
    
    if (!result.done) {
      draw();
      
      // Планируем следующий шаг
      animationRef.current = setTimeout(() => {
        requestAnimationFrame(animate);
      }, speed);
    } else {
      // Алгоритм завершен
      const pathResult = result.value;
      if (pathResult?.path) {
        // Анимация построения пути
        let pathIndex = 0;
        const animatePath = () => {
          if (pathIndex < pathResult.path.length) {
            pathResult.path[pathIndex].isPath = true;
            draw();
            pathIndex++;
            setTimeout(animatePath, 50);
          }
        };
        animatePath();
      }
      
      generatorRef.current = null;
    }
  }, [model, draw, speed, isPaused]);
  
  // Запуск алгоритма
  useEffect(() => {
    if (isRunning && model && !generatorRef.current) {
      model.reset();
      generatorRef.current = model.findPathGenerator();
      animate();
    } else if (!isRunning && animationRef.current) {
      clearTimeout(animationRef.current);
      animationRef.current = null;
      generatorRef.current = null;
    }
    
    return () => {
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
    };
  }, [isRunning, model, animate]);
  
  // Продолжение после паузы
  useEffect(() => {
    if (!isPaused && isRunning && generatorRef.current) {
      animate();
    }
  }, [isPaused, isRunning, animate]);
  
  // Обработка событий мыши
  const getCellFromMouseEvent = useCallback((e: React.MouseEvent<HTMLCanvasElement>): Position | null => {
    if (!canvasRef.current) return null;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) / cellSize);
    const y = Math.floor((e.clientY - rect.top) / cellSize);
    
    return { x, y };
  }, [cellSize]);
  
  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isRunning || !model) return;
    
    const cell = getCellFromMouseEvent(e);
    if (!cell) return;
    
    setIsDrawing(true);
    
    switch (selectedTool) {
      case 'wall':
        model.toggleWall(cell);
        break;
      case 'start':
        model.setStart(cell);
        break;
      case 'end':
        model.setEnd(cell);
        break;
      case 'erase':
        const node = model.getNode(cell);
        if (node?.isWall) {
          model.toggleWall(cell);
        }
        break;
    }
    
    draw();
  }, [isRunning, model, selectedTool, getCellFromMouseEvent, draw]);
  
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const cell = getCellFromMouseEvent(e);
    if (!cell) return;
    
    setHoveredCell(cell);
    
    if (isDrawing && !isRunning && model) {
      if (selectedTool === 'wall' || selectedTool === 'erase') {
        const node = model.getNode(cell);
        if (node && !node.isStart && !node.isEnd) {
          if (selectedTool === 'wall' && !node.isWall) {
            model.toggleWall(cell);
          } else if (selectedTool === 'erase' && node.isWall) {
            model.toggleWall(cell);
          }
          draw();
        }
      }
    }
  }, [isDrawing, isRunning, model, selectedTool, getCellFromMouseEvent, draw]);
  
  const handleMouseUp = useCallback(() => {
    setIsDrawing(false);
  }, []);
  
  const handleMouseLeave = useCallback(() => {
    setHoveredCell(null);
    setIsDrawing(false);
  }, []);
  
  // Инициализация и обновление канваса
  useEffect(() => {
    if (!canvasRef.current || !model) return;
    
    const grid = model.getGrid();
    canvasRef.current.width = grid[0].length * cellSize;
    canvasRef.current.height = grid.length * cellSize;
    
    draw();
  }, [model, cellSize, draw]);
  
  if (!model) {
    return (
      <div className="flex items-center justify-center h-96 bg-slate-800 rounded-lg">
        <p className="text-slate-400">Инициализация...</p>
      </div>
    );
  }
  
  const grid = model.getGrid();
  const canvasWidth = grid[0].length * cellSize;
  const canvasHeight = grid.length * cellSize;
  
  return (
    <div className="space-y-4">
      {/* Панель инструментов */}
      <motion.div 
        className="flex flex-wrap items-center gap-4 p-4 bg-slate-800 rounded-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex gap-2">
          <button
            onClick={() => setSelectedTool('wall')}
            disabled={isRunning}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedTool === 'wall'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            } disabled:opacity-50`}
          >
            🧱 Стена
          </button>
          
          <button
            onClick={() => setSelectedTool('start')}
            disabled={isRunning}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedTool === 'start'
                ? 'bg-green-600 text-white'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            } disabled:opacity-50`}
          >
            🟢 Старт
          </button>
          
          <button
            onClick={() => setSelectedTool('end')}
            disabled={isRunning}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedTool === 'end'
                ? 'bg-red-600 text-white'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            } disabled:opacity-50`}
          >
            🔴 Цель
          </button>
          
          <button
            onClick={() => setSelectedTool('erase')}
            disabled={isRunning}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedTool === 'erase'
                ? 'bg-amber-600 text-white'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            } disabled:opacity-50`}
          >
            🧹 Стереть
          </button>
        </div>
        
        <div className="h-8 w-px bg-slate-600" />
        
        <button
          onClick={() => model.clearWalls()}
          disabled={isRunning}
          className="px-4 py-2 bg-slate-700 text-slate-300 rounded-lg hover:bg-slate-600 disabled:opacity-50"
        >
          Очистить стены
        </button>
        
        <button
          onClick={() => model.generateMaze(0.3)}
          disabled={isRunning}
          className="px-4 py-2 bg-slate-700 text-slate-300 rounded-lg hover:bg-slate-600 disabled:opacity-50"
        >
          Генерировать лабиринт
        </button>
        
        <label className="flex items-center gap-2 text-slate-300">
          <input
            type="checkbox"
            checked={showValues}
            onChange={(e) => setShowValues(e.target.checked)}
            className="w-4 h-4 rounded"
          />
          Показать значения
        </label>
      </motion.div>
      
      {/* Канвас */}
      <div 
        ref={containerRef}
        className="relative bg-slate-900 rounded-lg overflow-hidden"
        style={{ height: '600px' }}
      >
        <canvas
          ref={canvasRef}
          width={canvasWidth}
          height={canvasHeight}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-crosshair"
          style={{ imageRendering: 'pixelated' }}
        />
      </div>
      
      {/* Легенда */}
      <motion.div 
        className="flex flex-wrap gap-4 p-4 bg-slate-800 rounded-lg text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500 rounded" />
          <span className="text-slate-300">Старт</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-500 rounded" />
          <span className="text-slate-300">Цель</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-slate-600 rounded" />
          <span className="text-slate-300">Стена</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-500 rounded" />
          <span className="text-slate-300">В очереди</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-purple-500 rounded" />
          <span className="text-slate-300">Посещен</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-yellow-400 rounded" />
          <span className="text-slate-300">Путь</span>
        </div>
      </motion.div>
    </div>
  );
});

AStarVisualizer.displayName = 'AStarVisualizer';
