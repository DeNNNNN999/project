import React, { useRef, useEffect, useCallback, useMemo } from 'react';
import { motion } from 'motion/react';
import { NewtonMethod, NewtonIteration, MathFunction, formatNumber } from './newton.model';

interface NewtonVisualizerProps {
  func: MathFunction;
  iterations: NewtonIteration[];
  currentIteration: number;
  isRunning: boolean;
}

// Цветовая схема
const COLORS = {
  background: '#0f172a',
  grid: '#1e293b',
  gridLine: '#334155',
  axis: '#64748b',
  function: '#3b82f6',
  tangent: '#f59e0b',
  point: '#10b981',
  root: '#ef4444',
  text: '#e2e8f0',
  iteration: {
    start: '#8b5cf6',
    end: '#10b981',
  }
};

export const NewtonVisualizer: React.FC<NewtonVisualizerProps> = ({
  func,
  iterations,
  currentIteration,
  isRunning,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  
  // Параметры визуализации
  const canvasWidth = 800;
  const canvasHeight = 500;
  const padding = 40;
  
  // Диапазон для отображения
  const xRange = useMemo(() => {
    if (iterations.length === 0) {
      return { min: -5, max: 5 };
    }
    
    // Находим минимальное и максимальное x среди всех итераций
    const allX = iterations.flatMap(iter => [iter.x, iter.nextX]);
    const minX = Math.min(...allX);
    const maxX = Math.max(...allX);
    const margin = Math.abs(maxX - minX) * 0.5;
    
    return {
      min: minX - margin,
      max: maxX + margin
    };
  }, [iterations]);
  
  const yRange = useMemo(() => {
    try {
      const method = new NewtonMethod(func.expression, func.derivative);
      const points = method.generateFunctionPoints(xRange.min, xRange.max);
      
      if (points.length === 0) {
        return { min: -5, max: 5 };
      }
      
      const yValues = points.map(p => p.y);
      const minY = Math.min(...yValues, 0);
      const maxY = Math.max(...yValues, 0);
      const margin = Math.abs(maxY - minY) * 0.2;
      
      return {
        min: minY - margin,
        max: maxY + margin
      };
    } catch {
      return { min: -5, max: 5 };
    }
  }, [func, xRange]);
  
  // Преобразование координат
  const worldToScreen = useCallback((x: number, y: number): { x: number; y: number } => {
    const screenX = padding + (x - xRange.min) / (xRange.max - xRange.min) * (canvasWidth - 2 * padding);
    const screenY = canvasHeight - padding - (y - yRange.min) / (yRange.max - yRange.min) * (canvasHeight - 2 * padding);
    return { x: screenX, y: screenY };
  }, [xRange, yRange, canvasWidth, canvasHeight, padding]);
  
  // Отрисовка сетки и осей
  const drawGrid = useCallback((ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = COLORS.background;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    
    // Сетка
    ctx.strokeStyle = COLORS.gridLine;
    ctx.lineWidth = 0.5;
    
    // Вертикальные линии
    const xStep = Math.pow(10, Math.floor(Math.log10(xRange.max - xRange.min))) / 2;
    for (let x = Math.ceil(xRange.min / xStep) * xStep; x <= xRange.max; x += xStep) {
      const screen = worldToScreen(x, 0);
      ctx.beginPath();
      ctx.moveTo(screen.x, padding);
      ctx.lineTo(screen.x, canvasHeight - padding);
      ctx.stroke();
    }
    
    // Горизонтальные линии
    const yStep = Math.pow(10, Math.floor(Math.log10(yRange.max - yRange.min))) / 2;
    for (let y = Math.ceil(yRange.min / yStep) * yStep; y <= yRange.max; y += yStep) {
      const screen = worldToScreen(0, y);
      ctx.beginPath();
      ctx.moveTo(padding, screen.y);
      ctx.lineTo(canvasWidth - padding, screen.y);
      ctx.stroke();
    }
    
    // Оси
    ctx.strokeStyle = COLORS.axis;
    ctx.lineWidth = 2;
    
    // Ось X
    const xAxisY = worldToScreen(0, 0).y;
    ctx.beginPath();
    ctx.moveTo(padding, xAxisY);
    ctx.lineTo(canvasWidth - padding, xAxisY);
    ctx.stroke();
    
    // Ось Y
    const yAxisX = worldToScreen(0, 0).x;
    ctx.beginPath();
    ctx.moveTo(yAxisX, padding);
    ctx.lineTo(yAxisX, canvasHeight - padding);
    ctx.stroke();
    
    // Подписи осей
    ctx.fillStyle = COLORS.text;
    ctx.font = '12px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    
    // Подписи на оси X
    for (let x = Math.ceil(xRange.min); x <= xRange.max; x++) {
      if (Math.abs(x) > 0.1) {
        const screen = worldToScreen(x, 0);
        ctx.fillText(x.toString(), screen.x, xAxisY + 5);
      }
    }
    
    // Подписи на оси Y
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    for (let y = Math.ceil(yRange.min); y <= yRange.max; y++) {
      if (Math.abs(y) > 0.1) {
        const screen = worldToScreen(0, y);
        ctx.fillText(y.toString(), yAxisX - 5, screen.y);
      }
    }
  }, [xRange, yRange, worldToScreen, canvasWidth, canvasHeight, padding]);
  
  // Отрисовка функции
  const drawFunction = useCallback((ctx: CanvasRenderingContext2D) => {
    try {
      const method = new NewtonMethod(func.expression, func.derivative);
      const points = method.generateFunctionPoints(xRange.min, xRange.max, 400);
      
      if (points.length < 2) return;
      
      ctx.strokeStyle = COLORS.function;
      ctx.lineWidth = 2;
      ctx.beginPath();
      
      const firstPoint = worldToScreen(points[0].x, points[0].y);
      ctx.moveTo(firstPoint.x, firstPoint.y);
      
      for (let i = 1; i < points.length; i++) {
        const point = worldToScreen(points[i].x, points[i].y);
        
        // Проверка на разрывы
        if (Math.abs(points[i].y - points[i - 1].y) > (yRange.max - yRange.min) * 0.5) {
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(point.x, point.y);
        } else {
          ctx.lineTo(point.x, point.y);
        }
      }
      
      ctx.stroke();
    } catch (error) {
      console.error('Error drawing function:', error);
    }
  }, [func, xRange, yRange, worldToScreen]);
  
  // Отрисовка итераций
  const drawIterations = useCallback((ctx: CanvasRenderingContext2D) => {
    if (iterations.length === 0) return;
    
    const visibleIterations = iterations.slice(0, currentIteration + 1);
    
    visibleIterations.forEach((iter, index) => {
      const alpha = 0.3 + (index / visibleIterations.length) * 0.7;
      
      // Точка на функции
      const funcPoint = worldToScreen(iter.x, iter.fx);
      ctx.fillStyle = `rgba(139, 92, 246, ${alpha})`;
      ctx.beginPath();
      ctx.arc(funcPoint.x, funcPoint.y, 6, 0, 2 * Math.PI);
      ctx.fill();
      
      // Касательная
      if (index === currentIteration) {
        try {
          const method = new NewtonMethod(func.expression, func.derivative);
          const tangentPoints = method.generateTangentLine(iter.x, xRange.min, xRange.max);
          
          if (tangentPoints.length === 2) {
            ctx.strokeStyle = COLORS.tangent;
            ctx.lineWidth = 2;
            ctx.setLineDash([5, 5]);
            ctx.beginPath();
            
            const start = worldToScreen(tangentPoints[0].x, tangentPoints[0].y);
            const end = worldToScreen(tangentPoints[1].x, tangentPoints[1].y);
            
            ctx.moveTo(start.x, start.y);
            ctx.lineTo(end.x, end.y);
            ctx.stroke();
            ctx.setLineDash([]);
          }
        } catch (error) {
          console.error('Error drawing tangent:', error);
        }
      }
      
      // Вертикальная линия от точки до оси X
      ctx.strokeStyle = `rgba(239, 68, 68, ${alpha * 0.5})`;
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.moveTo(funcPoint.x, funcPoint.y);
      ctx.lineTo(funcPoint.x, worldToScreen(iter.x, 0).y);
      ctx.stroke();
      ctx.setLineDash([]);
      
      // Следующая точка на оси X
      if (index < visibleIterations.length - 1) {
        const nextPoint = worldToScreen(iter.nextX, 0);
        ctx.fillStyle = `rgba(16, 185, 129, ${alpha})`;
        ctx.beginPath();
        ctx.arc(nextPoint.x, nextPoint.y, 4, 0, 2 * Math.PI);
        ctx.fill();
        
        // Стрелка к следующей итерации
        if (index === currentIteration - 1) {
          ctx.strokeStyle = `rgba(245, 158, 11, ${alpha})`;
          ctx.lineWidth = 2;
          ctx.beginPath();
          
          const currentX = worldToScreen(iter.x, 0);
          const nextX = worldToScreen(iter.nextX, 0);
          
          // Дуга над осью X
          const midX = (currentX.x + nextX.x) / 2;
          const controlY = currentX.y - 30;
          
          ctx.moveTo(currentX.x, currentX.y);
          ctx.quadraticCurveTo(midX, controlY, nextX.x, nextX.y);
          ctx.stroke();
          
          // Стрелка
          const angle = Math.atan2(nextX.y - controlY, nextX.x - midX);
          const arrowSize = 8;
          
          ctx.beginPath();
          ctx.moveTo(nextX.x, nextX.y);
          ctx.lineTo(
            nextX.x - arrowSize * Math.cos(angle - Math.PI / 6),
            nextX.y - arrowSize * Math.sin(angle - Math.PI / 6)
          );
          ctx.moveTo(nextX.x, nextX.y);
          ctx.lineTo(
            nextX.x - arrowSize * Math.cos(angle + Math.PI / 6),
            nextX.y - arrowSize * Math.sin(angle + Math.PI / 6)
          );
          ctx.stroke();
        }
      }
      
      // Подпись итерации
      if (index === currentIteration) {
        ctx.fillStyle = COLORS.text;
        ctx.font = 'bold 14px monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';
        ctx.fillText(`x${index} = ${formatNumber(iter.x, 4)}`, funcPoint.x, funcPoint.y - 10);
      }
    });
    
    // Финальный корень
    if (currentIteration === iterations.length - 1 && iterations.length > 0) {
      const lastIter = iterations[iterations.length - 1];
      const rootPoint = worldToScreen(lastIter.nextX, 0);
      
      // Большой круг для корня
      ctx.fillStyle = COLORS.root;
      ctx.beginPath();
      ctx.arc(rootPoint.x, rootPoint.y, 8, 0, 2 * Math.PI);
      ctx.fill();
      
      // Подпись корня
      ctx.fillStyle = COLORS.text;
      ctx.font = 'bold 16px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      ctx.fillText(`Корень: ${formatNumber(lastIter.nextX, 6)}`, rootPoint.x, rootPoint.y + 10);
    }
  }, [iterations, currentIteration, func, xRange, worldToScreen]);
  
  // Основная функция отрисовки
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Очистка и отрисовка
    drawGrid(ctx);
    drawFunction(ctx);
    drawIterations(ctx);
    
    // Информационная панель
    ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
    ctx.fillRect(10, 10, 250, 80);
    
    ctx.strokeStyle = COLORS.gridLine;
    ctx.lineWidth = 1;
    ctx.strokeRect(10, 10, 250, 80);
    
    ctx.fillStyle = COLORS.text;
    ctx.font = '14px monospace';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    
    ctx.fillText(`Функция: ${func.name}`, 20, 20);
    ctx.fillText(`f(x) = ${func.expression}`, 20, 40);
    ctx.fillText(`f'(x) = ${func.derivative}`, 20, 60);
  }, [drawGrid, drawFunction, drawIterations, func]);
  
  // Эффект для отрисовки
  useEffect(() => {
    draw();
  }, [draw]);
  
  // Анимация при изменении итерации
  useEffect(() => {
    if (isRunning) {
      const animate = () => {
        draw();
        animationRef.current = requestAnimationFrame(animate);
      };
      animate();
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isRunning, draw]);
  
  return (
    <motion.div
      className="relative bg-slate-900 rounded-lg overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <canvas
        ref={canvasRef}
        width={canvasWidth}
        height={canvasHeight}
        className="w-full h-auto"
        style={{ imageRendering: 'crisp-edges' }}
      />
      
      {/* Легенда */}
      <div className="absolute bottom-4 right-4 p-3 bg-slate-800/90 rounded-lg text-xs">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-3 h-3 bg-blue-500 rounded-full" />
          <span className="text-slate-300">График функции</span>
        </div>
        <div className="flex items-center gap-2 mb-1">
          <div className="w-3 h-3 bg-amber-500 rounded-full" />
          <span className="text-slate-300">Касательная</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-full" />
          <span className="text-slate-300">Корень</span>
        </div>
      </div>
    </motion.div>
  );
};
