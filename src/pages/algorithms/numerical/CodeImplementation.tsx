import React, { memo, useState } from 'react';
import { motion } from 'motion/react';

const implementations = {
  typescript: `// Метод Ньютона для нахождения корней уравнения в TypeScript

interface NewtonResult {
  root: number;
  iterations: number;
  converged: boolean;
  error: number;
}

class NewtonMethod {
  private func: (x: number) => number;
  private derivative: (x: number) => number;
  private tolerance: number;
  private maxIterations: number;
  
  constructor(
    func: (x: number) => number,
    derivative: (x: number) => number,
    tolerance: number = 1e-6,
    maxIterations: number = 100
  ) {
    this.func = func;
    this.derivative = derivative;
    this.tolerance = tolerance;
    this.maxIterations = maxIterations;
  }
  
  solve(initialGuess: number): NewtonResult {
    let x = initialGuess;
    let iterations = 0;
    let error = Infinity;
    
    while (iterations < this.maxIterations && error > this.tolerance) {
      const fx = this.func(x);
      const fpx = this.derivative(x);
      
      // Проверка на деление на ноль
      if (Math.abs(fpx) < 1e-10) {
        throw new Error(\`Производная близка к нулю при x = \${x}\`);
      }
      
      // Формула Ньютона
      const nextX = x - fx / fpx;
      error = Math.abs(nextX - x);
      
      // Проверка на расходимость
      if (!isFinite(nextX)) {
        throw new Error('Метод расходится');
      }
      
      x = nextX;
      iterations++;
    }
    
    return {
      root: x,
      iterations,
      converged: error <= this.tolerance,
      error
    };
  }
}

// Пример использования: найти корень x³ - 2x - 5 = 0

// Определяем функцию и её производную
const f = (x: number) => x ** 3 - 2 * x - 5;
const fp = (x: number) => 3 * x ** 2 - 2;

// Создаем экземпляр метода
const newton = new NewtonMethod(f, fp, 1e-6, 50);

// Решаем с начальным приближением x₀ = 2
try {
  const result = newton.solve(2);
  
  console.log(\`Корень: \${result.root}\`);
  console.log(\`Итераций: \${result.iterations}\`);
  console.log(\`Погрешность: \${result.error}\`);
  console.log(\`Проверка: f(\${result.root}) = \${f(result.root)}\`);
} catch (error) {
  console.error('Ошибка:', error.message);
}

// Визуализация процесса сходимости
function visualizeConvergence(
  func: (x: number) => number,
  derivative: (x: number) => number,
  x0: number,
  iterations: number
): void {
  let x = x0;
  
  console.log('\\nПроцесс сходимости:');
  console.log('n\\tx_n\\t\\tf(x_n)\\t\\tf\\'(x_n)\\tПогрешность');
  console.log('-'.repeat(60));
  
  for (let n = 0; n < iterations; n++) {
    const fx = func(x);
    const fpx = derivative(x);
    const nextX = x - fx / fpx;
    const error = Math.abs(nextX - x);
    
    console.log(
      \`\${n}\\t\${x.toFixed(6)}\\t\${fx.toFixed(6)}\\t\${fpx.toFixed(6)}\\t\${error.toExponential(2)}\`
    );
    
    if (error < 1e-6) break;
    x = nextX;
  }
}

// Запуск визуализации
visualizeConvergence(f, fp, 2, 10);`,

  python: `# Метод Ньютона для нахождения корней уравнения в Python

import numpy as np
import matplotlib.pyplot as plt
from typing import Callable, Tuple, List

class NewtonMethod:
    """Класс для решения уравнений методом Ньютона"""
    
    def __init__(
        self,
        func: Callable[[float], float],
        derivative: Callable[[float], float],
        tolerance: float = 1e-6,
        max_iterations: int = 100
    ):
        self.func = func
        self.derivative = derivative
        self.tolerance = tolerance
        self.max_iterations = max_iterations
        
    def solve(self, initial_guess: float) -> dict:
        """Найти корень уравнения методом Ньютона"""
        x = initial_guess
        history = []
        
        for n in range(self.max_iterations):
            fx = self.func(x)
            fpx = self.derivative(x)
            
            # Проверка на деление на ноль
            if abs(fpx) < 1e-10:
                raise ValueError(f"Производная близка к нулю при x = {x:.6f}")
            
            # Формула Ньютона
            x_next = x - fx / fpx
            error = abs(x_next - x)
            
            # Сохраняем историю
            history.append({
                'n': n,
                'x': x,
                'fx': fx,
                'fpx': fpx,
                'x_next': x_next,
                'error': error
            })
            
            # Проверка сходимости
            if error < self.tolerance:
                return {
                    'root': x_next,
                    'iterations': n + 1,
                    'converged': True,
                    'error': error,
                    'history': history
                }
            
            # Проверка расходимости
            if not np.isfinite(x_next):
                raise ValueError("Метод расходится")
            
            x = x_next
        
        return {
            'root': x,
            'iterations': self.max_iterations,
            'converged': False,
            'error': error,
            'history': history
        }
    
    def visualize(self, x0: float, x_range: Tuple[float, float] = None):
        """Визуализация процесса поиска корня"""
        # Решаем уравнение
        result = self.solve(x0)
        
        # Определяем диапазон для графика
        if x_range is None:
            all_x = [h['x'] for h in result['history']]
            x_min = min(all_x) - 1
            x_max = max(all_x) + 1
        else:
            x_min, x_max = x_range
        
        # Создаем график
        fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(14, 6))
        
        # График функции с итерациями
        x_plot = np.linspace(x_min, x_max, 1000)
        y_plot = [self.func(x) for x in x_plot]
        
        ax1.plot(x_plot, y_plot, 'b-', linewidth=2, label='f(x)')
        ax1.axhline(y=0, color='k', linestyle='-', alpha=0.3)
        ax1.axvline(x=result['root'], color='r', linestyle='--', 
                    alpha=0.5, label=f'Корень: {result["root"]:.6f}')
        
        # Показываем итерации
        for i, h in enumerate(result['history'][:5]):  # Первые 5 итераций
            # Точка на кривой
            ax1.plot(h['x'], h['fx'], 'ro', markersize=8)
            
            # Касательная
            x_tangent = np.array([x_min, x_max])
            y_tangent = h['fpx'] * (x_tangent - h['x']) + h['fx']
            ax1.plot(x_tangent, y_tangent, 'g--', alpha=0.5)
            
            # Пересечение с осью X
            ax1.plot(h['x_next'], 0, 'go', markersize=6)
            
            # Вертикальная линия
            ax1.plot([h['x'], h['x']], [0, h['fx']], 'r:', alpha=0.5)
        
        ax1.set_xlabel('x')
        ax1.set_ylabel('f(x)')
        ax1.set_title('Метод Ньютона: Геометрическая интерпретация')
        ax1.grid(True, alpha=0.3)
        ax1.legend()
        
        # График сходимости
        errors = [h['error'] for h in result['history']]
        ax2.semilogy(range(len(errors)), errors, 'bo-')
        ax2.set_xlabel('Итерация')
        ax2.set_ylabel('Погрешность')
        ax2.set_title('Скорость сходимости')
        ax2.grid(True, alpha=0.3)
        
        plt.tight_layout()
        plt.show()

# Пример использования
if __name__ == "__main__":
    # Пример 1: x³ - 2x - 5 = 0
    def f1(x):
        return x**3 - 2*x - 5
    
    def f1_prime(x):
        return 3*x**2 - 2
    
    # Создаем и решаем
    newton1 = NewtonMethod(f1, f1_prime)
    result1 = newton1.solve(2.0)
    
    print("Пример 1: x³ - 2x - 5 = 0")
    print(f"Корень: {result1['root']:.10f}")
    print(f"Итераций: {result1['iterations']}")
    print(f"Погрешность: {result1['error']:.2e}")
    print(f"Проверка: f({result1['root']:.10f}) = {f1(result1['root']):.2e}")
    
    # Визуализация
    newton1.visualize(2.0, x_range=(-1, 4))
    
    # Пример 2: cos(x) - x = 0
    def f2(x):
        return np.cos(x) - x
    
    def f2_prime(x):
        return -np.sin(x) - 1
    
    newton2 = NewtonMethod(f2, f2_prime)
    result2 = newton2.solve(0.5)
    
    print("\\nПример 2: cos(x) - x = 0")
    print(f"Корень: {result2['root']:.10f}")
    print(f"Итераций: {result2['iterations']}")
    
    # Сравнение с другими методами
    def compare_methods():
        """Сравнение метода Ньютона с методом бисекции"""
        from scipy.optimize import newton, bisect
        
        # Функция
        func = lambda x: x**3 - 2*x - 5
        
        # Метод Ньютона (scipy)
        root_newton = newton(func, x0=2.0, fprime=lambda x: 3*x**2 - 2)
        
        # Метод бисекции
        root_bisect = bisect(func, a=2, b=3)
        
        print("\\nСравнение методов:")
        print(f"Метод Ньютона: {root_newton:.10f}")
        print(f"Метод бисекции: {root_bisect:.10f}")
        print(f"Разница: {abs(root_newton - root_bisect):.2e}")
    
    compare_methods()`,

  javascript: `// Метод Ньютона для нахождения корней уравнения в JavaScript

class NewtonMethod {
  constructor(func, derivative, tolerance = 1e-6, maxIterations = 100) {
    this.func = func;
    this.derivative = derivative;
    this.tolerance = tolerance;
    this.maxIterations = maxIterations;
  }
  
  solve(initialGuess) {
    let x = initialGuess;
    let iterations = 0;
    let error = Infinity;
    const history = [];
    
    while (iterations < this.maxIterations && error > this.tolerance) {
      const fx = this.func(x);
      const fpx = this.derivative(x);
      
      // Проверка на деление на ноль
      if (Math.abs(fpx) < 1e-10) {
        throw new Error(\`Производная близка к нулю при x = \${x.toFixed(6)}\`);
      }
      
      // Формула Ньютона
      const nextX = x - fx / fpx;
      error = Math.abs(nextX - x);
      
      // Сохраняем историю итераций
      history.push({
        n: iterations,
        x: x,
        fx: fx,
        fpx: fpx,
        nextX: nextX,
        error: error
      });
      
      // Проверка на расходимость
      if (!isFinite(nextX)) {
        throw new Error('Метод расходится');
      }
      
      x = nextX;
      iterations++;
    }
    
    return {
      root: x,
      iterations: iterations,
      converged: error <= this.tolerance,
      error: error,
      history: history
    };
  }
  
  // Вспомогательный метод для отображения процесса
  printConvergenceTable() {
    console.log('n\\tx_n\\t\\tf(x_n)\\t\\tf\\'(x_n)\\tПогрешность');
    console.log('-'.repeat(70));
    
    this.history.forEach(step => {
      console.log(
        \`\${step.n}\\t\${step.x.toFixed(6)}\\t\${step.fx.toFixed(6)}\\t\` +
        \`\${step.fpx.toFixed(6)}\\t\${step.error.toExponential(2)}\`
      );
    });
  }
}

// Пример 1: Решение x³ - 2x - 5 = 0
console.log('=== Пример 1: x³ - 2x - 5 = 0 ===');

const f1 = x => x ** 3 - 2 * x - 5;
const f1Prime = x => 3 * x ** 2 - 2;

const newton1 = new NewtonMethod(f1, f1Prime);
const result1 = newton1.solve(2);

console.log(\`Корень: \${result1.root.toFixed(10)}\`);
console.log(\`Итераций: \${result1.iterations}\`);
console.log(\`Погрешность: \${result1.error.toExponential(2)}\`);
console.log(\`Проверка: f(\${result1.root}) = \${f1(result1.root).toExponential(2)}\`);

// Пример 2: Решение cos(x) - x = 0
console.log('\\n=== Пример 2: cos(x) - x = 0 ===');

const f2 = x => Math.cos(x) - x;
const f2Prime = x => -Math.sin(x) - 1;

const newton2 = new NewtonMethod(f2, f2Prime, 1e-10);
const result2 = newton2.solve(0.5);

console.log(\`Корень: \${result2.root.toFixed(10)}\`);
console.log(\`Итераций: \${result2.iterations}\`);

// Пример 3: Вычисление квадратного корня через метод Ньютона
console.log('\\n=== Пример 3: Вычисление √2 ===');

// Для √a решаем уравнение x² - a = 0
const sqrtNewton = (a, x0 = 1) => {
  const f = x => x * x - a;
  const fPrime = x => 2 * x;
  
  const newton = new NewtonMethod(f, fPrime, 1e-15);
  return newton.solve(x0);
};

const sqrt2 = sqrtNewton(2, 1.5);
console.log(\`√2 ≈ \${sqrt2.root.toFixed(15)}\`);
console.log(\`Math.sqrt(2) = \${Math.sqrt(2).toFixed(15)}\`);
console.log(\`Разница: \${Math.abs(sqrt2.root - Math.sqrt(2)).toExponential(2)}\`);

// Визуализация для HTML Canvas
function drawNewtonMethod(canvasId, func, derivative, x0, xMin = -5, xMax = 5) {
  const canvas = document.getElementById(canvasId);
  const ctx = canvas.getContext('2d');
  const width = canvas.width;
  const height = canvas.height;
  
  // Масштабирование
  const scaleX = x => (x - xMin) / (xMax - xMin) * width;
  const scaleY = y => height - (y + 5) / 10 * height;
  
  // Очистка
  ctx.clearRect(0, 0, width, height);
  
  // Оси
  ctx.strokeStyle = '#666';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(0, scaleY(0));
  ctx.lineTo(width, scaleY(0));
  ctx.moveTo(scaleX(0), 0);
  ctx.lineTo(scaleX(0), height);
  ctx.stroke();
  
  // График функции
  ctx.strokeStyle = '#3b82f6';
  ctx.lineWidth = 2;
  ctx.beginPath();
  for (let px = 0; px < width; px++) {
    const x = xMin + (xMax - xMin) * px / width;
    const y = func(x);
    if (px === 0) {
      ctx.moveTo(px, scaleY(y));
    } else {
      ctx.lineTo(px, scaleY(y));
    }
  }
  ctx.stroke();
  
  // Итерации метода Ньютона
  let x = x0;
  for (let i = 0; i < 5; i++) {
    const fx = func(x);
    const fpx = derivative(x);
    const nextX = x - fx / fpx;
    
    // Точка на кривой
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.arc(scaleX(x), scaleY(fx), 5, 0, 2 * Math.PI);
    ctx.fill();
    
    // Касательная
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    const tangentY1 = fx + fpx * (xMin - x);
    const tangentY2 = fx + fpx * (xMax - x);
    ctx.moveTo(scaleX(xMin), scaleY(tangentY1));
    ctx.lineTo(scaleX(xMax), scaleY(tangentY2));
    ctx.stroke();
    ctx.setLineDash([]);
    
    // Следующая точка
    ctx.fillStyle = '#10b981';
    ctx.beginPath();
    ctx.arc(scaleX(nextX), scaleY(0), 4, 0, 2 * Math.PI);
    ctx.fill();
    
    if (Math.abs(nextX - x) < 1e-6) break;
    x = nextX;
  }
}

// Экспорт для использования
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { NewtonMethod };
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
        <h4 className="font-semibold text-white mb-2">📝 Особенности реализации:</h4>
        <ul className="space-y-1 text-sm text-slate-300">
          <li>• Метод требует явного задания производной функции</li>
          <li>• Важна проверка на деление на ноль при f'(x) ≈ 0</li>
          <li>• Необходим контроль расходимости и максимального числа итераций</li>
          <li>• Квадратичная скорость сходимости при хорошем начальном приближении</li>
          <li>• Для вычисления производной можно использовать автоматическое дифференцирование</li>
        </ul>
      </div>
    </motion.div>
  );
});

CodeImplementation.displayName = 'CodeImplementation';
