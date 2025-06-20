import { evaluate, derivative, parse } from 'mathjs';

export interface NewtonIteration {
  n: number;
  x: number;
  fx: number;
  fpx: number;
  nextX: number;
  error: number;
}

export interface NewtonResult {
  root: number;
  iterations: NewtonIteration[];
  converged: boolean;
  finalError: number;
}

export interface MathFunction {
  id: string;
  name: string;
  expression: string;
  derivative: string;
  initialGuess: number;
  description?: string;
}

export class NewtonMethod {
  private funcExpression: string;
  private derivExpression: string;
  private tolerance: number;
  private maxIterations: number;
  private func: any;
  private deriv: any;

  constructor(
    funcExpression: string,
    derivExpression: string,
    tolerance: number = 1e-6,
    maxIterations: number = 100
  ) {
    this.funcExpression = funcExpression;
    this.derivExpression = derivExpression;
    this.tolerance = tolerance;
    this.maxIterations = maxIterations;
    
    try {
      // Парсим выражения для проверки корректности
      this.func = parse(funcExpression);
      this.deriv = parse(derivExpression);
    } catch (error) {
      throw new Error('Некорректное математическое выражение');
    }
  }

  private evaluateFunction(x: number): number {
    try {
      return evaluate(this.funcExpression, { x });
    } catch (error) {
      throw new Error(`Ошибка вычисления функции при x = ${x}`);
    }
  }

  private evaluateDerivative(x: number): number {
    try {
      return evaluate(this.derivExpression, { x });
    } catch (error) {
      throw new Error(`Ошибка вычисления производной при x = ${x}`);
    }
  }

  solve(initialGuess: number): NewtonResult {
    const iterations: NewtonIteration[] = [];
    let x = initialGuess;
    let converged = false;
    
    for (let n = 0; n < this.maxIterations; n++) {
      const fx = this.evaluateFunction(x);
      const fpx = this.evaluateDerivative(x);
      
      // Проверка на деление на ноль
      if (Math.abs(fpx) < 1e-10) {
        throw new Error(`Производная близка к нулю при x = ${x.toFixed(6)}. Метод не может продолжить.`);
      }
      
      const nextX = x - fx / fpx;
      const error = Math.abs(nextX - x);
      
      iterations.push({
        n,
        x,
        fx,
        fpx,
        nextX,
        error
      });
      
      // Проверка сходимости
      if (error < this.tolerance) {
        converged = true;
        break;
      }
      
      // Проверка на расходимость
      if (!isFinite(nextX) || Math.abs(nextX) > 1e10) {
        throw new Error('Метод расходится. Попробуйте другое начальное приближение.');
      }
      
      x = nextX;
    }
    
    if (!converged) {
      throw new Error(`Метод не сошелся за ${this.maxIterations} итераций`);
    }
    
    return {
      root: x,
      iterations,
      converged,
      finalError: iterations[iterations.length - 1].error
    };
  }

  // Метод для генерации точек графика функции
  generateFunctionPoints(xMin: number, xMax: number, steps: number = 200): { x: number; y: number }[] {
    const points: { x: number; y: number }[] = [];
    const dx = (xMax - xMin) / steps;
    
    for (let i = 0; i <= steps; i++) {
      const x = xMin + i * dx;
      try {
        const y = this.evaluateFunction(x);
        if (isFinite(y) && Math.abs(y) < 1e6) {
          points.push({ x, y });
        }
      } catch {
        // Пропускаем точки, где функция не определена
      }
    }
    
    return points;
  }

  // Генерация точек касательной
  generateTangentLine(x0: number, xMin: number, xMax: number): { x: number; y: number }[] {
    try {
      const y0 = this.evaluateFunction(x0);
      const slope = this.evaluateDerivative(x0);
      
      // Уравнение касательной: y - y0 = slope * (x - x0)
      // y = slope * (x - x0) + y0
      
      return [
        { x: xMin, y: slope * (xMin - x0) + y0 },
        { x: xMax, y: slope * (xMax - x0) + y0 }
      ];
    } catch {
      return [];
    }
  }

  // Автоматическое определение производной (упрощенная версия)
  static autoDerivative(expression: string): string {
    try {
      const node = parse(expression);
      const derivNode = derivative(node, 'x');
      return derivNode.toString();
    } catch (error) {
      throw new Error('Не удалось автоматически вычислить производную');
    }
  }

  // Валидация выражения
  static validateExpression(expression: string): boolean {
    try {
      const node = parse(expression);
      // Проверяем, что выражение содержит переменную x
      const hasX = node.toString().includes('x');
      return hasX;
    } catch {
      return false;
    }
  }

  // Поиск начального приближения (простая эвристика)
  static findInitialGuess(funcExpression: string, xMin: number = -10, xMax: number = 10): number {
    const testPoints = 20;
    const dx = (xMax - xMin) / testPoints;
    let minAbsValue = Infinity;
    let bestGuess = 0;
    
    for (let i = 0; i <= testPoints; i++) {
      const x = xMin + i * dx;
      try {
        const y = evaluate(funcExpression, { x });
        const absY = Math.abs(y);
        
        if (absY < minAbsValue) {
          minAbsValue = absY;
          bestGuess = x;
        }
      } catch {
        // Пропускаем точки с ошибками
      }
    }
    
    return bestGuess;
  }
}

// Вспомогательные функции для визуализации
export function formatNumber(num: number, precision: number = 6): string {
  if (Math.abs(num) < 1e-10) return '0';
  if (Math.abs(num) > 1e6) return num.toExponential(precision);
  return num.toFixed(precision);
}

export function getIterationColor(iteration: number, total: number): string {
  const progress = iteration / Math.max(total - 1, 1);
  const hue = 240 - progress * 60; // От синего к зеленому
  return `hsl(${hue}, 70%, 50%)`;
}
