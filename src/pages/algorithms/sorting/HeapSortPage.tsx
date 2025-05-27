import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import AlgorithmLayout from '../../../components/Layout/AlgorithmLayout/AlgorithmLayout';
import { getRelatedAlgorithms } from '../../../data/algorithms-data';

// Компонент для визуализации пирамидальной сортировки в стиле 3Blue1Brown
const HeapSortVisualization = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [array, setArray] = useState<number[]>([]);
  const [steps, setSteps] = useState<any[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(1);
  const animationRef = useRef<number | null>(null);

  // Создаем случайный массив при загрузке компонента
  useEffect(() => {
    generateRandomArray();
  }, []);

  // Эффект для выполнения анимации
  useEffect(() => {
    if (isPlaying && currentStep < steps.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, 1000 / speed);
      
      return () => clearTimeout(timer);
    } else if (currentStep >= steps.length - 1) {
      setIsPlaying(false);
    }
  }, [isPlaying, currentStep, steps.length, speed]);

  // Эффект для отрисовки на канвасе
  useEffect(() => {
    if (!canvasRef.current || steps.length === 0) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Установка высоты и ширины канваса
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    
    // Очистка канваса
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Отрисовка текущего шага
    drawCurrentStep(ctx, canvas.width, canvas.height);
    
  }, [steps, currentStep]);

  // Генерация случайного массива
  const generateRandomArray = () => {
    const size = 15; // Фиксированный размер для лучшей визуализации
    const newArray = Array.from({ length: size }, () => 
      Math.floor(Math.random() * 100) + 1
    );
    setArray(newArray);
    resetAndGenerateSteps(newArray);
  };
  
  // Сброс и генерация шагов сортировки
  const resetAndGenerateSteps = (arr: number[]) => {
    setCurrentStep(0);
    setIsPlaying(false);
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
    
    const generatedSteps = generateHeapSortSteps(arr);
    setSteps(generatedSteps);
  };

  // Функция для отрисовки текущего шага анимации
  const drawCurrentStep = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    if (!steps[currentStep]) return;
    
    const { heap, sortedIndices, activeIndices, swappedIndices, heapifyIndices, extractedIndex } = steps[currentStep];
    
    // Определяем максимальную глубину кучи
    const maxDepth = Math.floor(Math.log2(heap.length));
    
    // Рассчитываем радиус узла и расстояния между узлами
    const nodeRadius = Math.min(width, height) * 0.05;
    const horizontalSpacing = width / (Math.pow(2, maxDepth) + 1);
    const verticalSpacing = (height * 0.6) / (maxDepth + 1);
    
    // Отрисовка соединений между узлами
    for (let i = 0; i < heap.length; i++) {
      const parentIndex = Math.floor((i - 1) / 2);
      
      if (parentIndex >= 0) {
        const depth = Math.floor(Math.log2(i + 1));
        const position = i - Math.pow(2, depth) + 1;
        const parentDepth = Math.floor(Math.log2(parentIndex + 1));
        const parentPosition = parentIndex - Math.pow(2, parentDepth) + 1;
        
        const x = width / 2 + (position - Math.pow(2, depth) / 2) * horizontalSpacing * Math.pow(2, maxDepth - depth);
        const y = 100 + depth * verticalSpacing;
        
        const parentX = width / 2 + (parentPosition - Math.pow(2, parentDepth) / 2) * horizontalSpacing * Math.pow(2, maxDepth - parentDepth);
        const parentY = 100 + parentDepth * verticalSpacing;
        
        // Определяем цвет линии
        let lineColor = 'rgba(148, 163, 184, 0.4)'; // Стандартный серый
        
        if (
          (heapifyIndices && (heapifyIndices.includes(i) || heapifyIndices.includes(parentIndex))) ||
          (swappedIndices && (swappedIndices.includes(i) || swappedIndices.includes(parentIndex)))
        ) {
          lineColor = 'rgba(236, 72, 153, 0.6)'; // Розовый для активных операций
        }
        
        // Рисуем линию
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(parentX, parentY);
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    }
    
    // Отрисовка узлов кучи
    for (let i = 0; i < heap.length; i++) {
      const depth = Math.floor(Math.log2(i + 1));
      const position = i - Math.pow(2, depth) + 1;
      
      const x = width / 2 + (position - Math.pow(2, depth) / 2) * horizontalSpacing * Math.pow(2, maxDepth - depth);
      const y = 100 + depth * verticalSpacing;
      
      // Определяем цвет узла
      let nodeColor = 'rgba(99, 102, 241, 0.8)'; // Стандартный синий
      
      if (sortedIndices && sortedIndices.includes(i)) {
        nodeColor = 'rgba(16, 185, 129, 0.8)'; // Зеленый для отсортированных
      }
      
      if (activeIndices && activeIndices.includes(i)) {
        nodeColor = 'rgba(251, 191, 36, 0.8)'; // Желтый для активных
      }
      
      if (heapifyIndices && heapifyIndices.includes(i)) {
        nodeColor = 'rgba(236, 72, 153, 0.8)'; // Розовый для heapify
      }
      
      if (swappedIndices && swappedIndices.includes(i)) {
        nodeColor = 'rgba(239, 68, 68, 0.8)'; // Красный для менявшихся
      }
      
      if (extractedIndex === i) {
        nodeColor = 'rgba(16, 185, 129, 0.8)'; // Зеленый для извлеченного
      }
      
      // Рисуем круг для узла
      ctx.beginPath();
      ctx.arc(x, y, nodeRadius, 0, Math.PI * 2);
      ctx.fillStyle = nodeColor;
      ctx.fill();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Добавляем значение внутри узла
      ctx.fillStyle = 'white';
      ctx.font = 'bold 16px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(heap[i].toString(), x, y);
    }
    
    // Отрисовка отсортированного массива в нижней части
    if (steps[currentStep].sortedArray && steps[currentStep].sortedArray.length > 0) {
      const sortedArray = steps[currentStep].sortedArray;
      const barWidth = width / array.length;
      const barBase = height - 50;
      const maxValue = Math.max(...array) * 1.1;
      
      // Заголовок отсортированного массива
      ctx.fillStyle = 'white';
      ctx.font = 'bold 16px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('Отсортированная часть:', width / 2, barBase - 30);
      
      // Рисуем отсортированный массив как столбцы
      for (let i = 0; i < sortedArray.length; i++) {
        const value = sortedArray[i];
        const barHeight = (value / maxValue) * 100;
        const x = (width - sortedArray.length * barWidth) / 2 + i * barWidth;
        
        ctx.fillStyle = 'rgba(16, 185, 129, 0.8)'; // Зеленый для отсортированных
        ctx.fillRect(x, barBase - barHeight, barWidth - 2, barHeight);
        
        ctx.fillStyle = 'white';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(value.toString(), x + barWidth / 2, barBase - barHeight - 15);
      }
    }
    
    // Добавляем информацию о текущем шаге
    ctx.fillStyle = 'white';
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(
      `Шаг ${currentStep + 1} из ${steps.length}: ${steps[currentStep].description || ""}`, 
      width / 2, 
      50
    );
  };
  
  // Функция для генерации шагов пирамидальной сортировки
  const generateHeapSortSteps = (arr: number[]) => {
    const steps: any[] = [];
    const originalArray = [...arr];
    let heap = [...arr];
    
    // Добавляем начальный шаг
    steps.push({
      heap: [...heap],
      description: "Начальный массив"
    });
    
    // Фаза 1: Построение max-кучи (heapify)
    // Начинаем с последнего родительского узла и идем вверх
    for (let i = Math.floor(heap.length / 2) - 1; i >= 0; i--) {
      heapifyDown(heap, i, heap.length, steps);
    }
    
    steps.push({
      heap: [...heap],
      description: "Max-куча построена"
    });
    
    // Фаза 2: Сортировка путем извлечения максимума
    const sortedArray: number[] = [];
    
    for (let i = heap.length - 1; i > 0; i--) {
      // Запоминаем индексы для анимации
      steps.push({
        heap: [...heap],
        swappedIndices: [0, i],
        description: `Своп корня (${heap[0]}) с последним элементом (${heap[i]})`,
        sortedArray: [...sortedArray]
      });
      
      // Меняем местами корень и последний элемент
      [heap[0], heap[i]] = [heap[i], heap[0]];
      
      // Добавляем элемент в отсортированную часть
      sortedArray.unshift(heap[i]);
      
      steps.push({
        heap: [...heap],
        extractedIndex: i,
        description: `Извлечение максимума: ${heap[i]}`,
        sortedArray: [...sortedArray]
      });
      
      // Восстанавливаем свойство кучи для оставшихся элементов
      heapifyDown(heap, 0, i, steps, sortedArray);
    }
    
    // Добавляем последний отсортированный элемент
    sortedArray.unshift(heap[0]);
    
    steps.push({
      heap: [...heap],
      description: "Сортировка завершена",
      sortedArray: [...sortedArray]
    });
    
    return steps;
  };
  
  // Функция для восстановления свойства кучи
  const heapifyDown = (heap: number[], index: number, heapSize: number, steps: any[], sortedArray: number[] = []) => {
    let largest = index;
    const left = 2 * index + 1;
    const right = 2 * index + 2;
    
    // Отмечаем текущий узел и его детей как активные
    const activeIndices = [index];
    if (left < heapSize) activeIndices.push(left);
    if (right < heapSize) activeIndices.push(right);
    
    steps.push({
      heap: [...heap],
      activeIndices,
      description: `Проверка поддерева с корнем ${heap[index]}`,
      sortedArray: [...sortedArray]
    });
    
    // Нахождение наибольшего среди корня, левого и правого ребенка
    if (left < heapSize && heap[left] > heap[largest]) {
      largest = left;
    }
    
    if (right < heapSize && heap[right] > heap[largest]) {
      largest = right;
    }
    
    // Если наибольший элемент не корень, меняем их местами и продолжаем вниз
    if (largest !== index) {
      steps.push({
        heap: [...heap],
        swappedIndices: [index, largest],
        description: `Своп ${heap[index]} ↔ ${heap[largest]}`,
        sortedArray: [...sortedArray]
      });
      
      [heap[index], heap[largest]] = [heap[largest], heap[index]];
      
      steps.push({
        heap: [...heap],
        heapifyIndices: [index, largest],
        description: `После свопа: ${heap[index]} и ${heap[largest]}`,
        sortedArray: [...sortedArray]
      });
      
      // Рекурсивно восстанавливаем свойство кучи для поддерева
      heapifyDown(heap, largest, heapSize, steps, sortedArray);
    }
  };
  
  // Управление воспроизведением
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };
  
  // Переход на один шаг вперед
  const stepForward = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  // Переход на один шаг назад
  const stepBackward = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  // Сброс анимации
  const resetAnimation = () => {
    setCurrentStep(0);
    setIsPlaying(false);
  };
  
  // Установка скорости воспроизведения
  const handleSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSpeed(parseFloat(e.target.value));
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-full h-[550px] mb-6 border rounded-lg bg-slate-900 border-slate-700">
        <canvas 
          ref={canvasRef} 
          className="w-full h-full" 
        />
      </div>
      
      <div className="flex flex-wrap items-center justify-center w-full gap-4 mb-2">
        <button 
          onClick={generateRandomArray}
          className="px-4 py-2 font-medium text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          Новый массив
        </button>
        
        <button 
          onClick={stepBackward}
          disabled={currentStep === 0}
          className="px-4 py-2 font-medium text-white transition-colors bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:opacity-50"
        >
          ← Назад
        </button>
        
        <button 
          onClick={togglePlayPause}
          className={`px-4 py-2 font-medium text-white transition-colors rounded-lg ${
            isPlaying ? 'bg-amber-600 hover:bg-amber-700' : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          {isPlaying ? 'Пауза' : 'Воспроизвести'}
        </button>
        
        <button 
          onClick={stepForward}
          disabled={currentStep === steps.length - 1}
          className="px-4 py-2 font-medium text-white transition-colors bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:opacity-50"
        >
          Вперед →
        </button>
        
        <button 
          onClick={resetAnimation}
          className="px-4 py-2 font-medium text-white transition-colors bg-red-600 rounded-lg hover:bg-red-700"
        >
          Сбросить
        </button>
      </div>
      
      <div className="flex items-center gap-2 mb-4">
        <span className="text-white">Скорость:</span>
        <input 
          type="range" 
          min="0.5" 
          max="5" 
          step="0.5" 
          value={speed}
          onChange={handleSpeedChange}
          className="w-32 bg-blue-600 rounded-lg cursor-pointer"
        />
        <span className="text-white">{speed}x</span>
      </div>
      
      <div className="flex flex-col items-center mb-2">
        <p className="mb-2 text-white">
          Прогресс: Шаг {currentStep + 1} из {steps.length}
        </p>
        <div className="w-full max-w-xl h-2 bg-slate-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-blue-600 transition-all duration-300"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          ></div>
        </div>
      </div>
      
      <div className="mt-4 text-slate-300">
        <p className="text-center">
          <span className="inline-flex items-center px-2 py-1 mr-2 text-xs text-blue-300 rounded-md bg-blue-900/30">
            <span className="inline-block w-2 h-2 mr-1 bg-blue-500 rounded-full"></span>
            Обычные узлы
          </span>
          <span className="inline-flex items-center px-2 py-1 mr-2 text-xs text-yellow-300 rounded-md bg-yellow-900/30">
            <span className="inline-block w-2 h-2 mr-1 bg-yellow-500 rounded-full"></span>
            Активные узлы
          </span>
          <span className="inline-flex items-center px-2 py-1 mr-2 text-xs text-pink-300 rounded-md bg-pink-900/30">
            <span className="inline-block w-2 h-2 mr-1 bg-pink-500 rounded-full"></span>
            Heapify процесс
          </span>
          <span className="inline-flex items-center px-2 py-1 text-xs text-green-300 rounded-md bg-green-900/30">
            <span className="inline-block w-2 h-2 mr-1 bg-green-500 rounded-full"></span>
            Отсортированные элементы
          </span>
        </p>
      </div>
    </div>
  );
};

// Реализация пирамидальной сортировки (Heap Sort)
const CodeImplementation = () => {
  const heapSortCode = `
/**
 * Пирамидальная сортировка (Heap Sort)
 * 
 * Временная сложность: O(n log n)
 * Пространственная сложность: O(1)
 */

function heapSort(arr) {
  const n = arr.length;
  
  // Фаза 1: Построение max-кучи
  // Начинаем с последнего родительского узла и двигаемся к корню
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i);
  }
  
  // Фаза 2: Извлечение элементов из кучи в порядке убывания
  for (let i = n - 1; i > 0; i--) {
    // Перемещаем текущий корень (максимум) в конец
    [arr[0], arr[i]] = [arr[i], arr[0]];
    
    // Вызываем heapify для уменьшенной кучи
    heapify(arr, i, 0);
  }
  
  return arr;
}

/**
 * Функция для восстановления свойства кучи (heapify)
 * Поддерживает свойство, что родитель всегда больше своих детей
 */
function heapify(arr, heapSize, rootIndex) {
  let largest = rootIndex;       // Инициализируем наибольший элемент как корень
  const left = 2 * rootIndex + 1;  // Левый потомок
  const right = 2 * rootIndex + 2; // Правый потомок
  
  // Если левый потомок больше корня
  if (left < heapSize && arr[left] > arr[largest]) {
    largest = left;
  }
  
  // Если правый потомок больше наибольшего элемента
  if (right < heapSize && arr[right] > arr[largest]) {
    largest = right;
  }
  
  // Если наибольший элемент не корень
  if (largest !== rootIndex) {
    // Меняем местами корень и найденный наибольший элемент
    [arr[rootIndex], arr[largest]] = [arr[largest], arr[rootIndex]];
    
    // Рекурсивно применяем heapify к поддереву
    heapify(arr, heapSize, largest);
  }
}

// Пример использования
const unsortedArray = [12, 11, 13, 5, 6, 7];
console.log("Исходный массив:", unsortedArray);

const sortedArray = heapSort([...unsortedArray]);
console.log("Отсортированный массив:", sortedArray); // [5, 6, 7, 11, 12, 13]

// Итеративная версия heapify для избегания переполнения стека
function heapifyIterative(arr, heapSize, rootIndex) {
  let current = rootIndex;
  
  while (true) {
    let largest = current;
    const left = 2 * current + 1;
    const right = 2 * current + 2;
    
    if (left < heapSize && arr[left] > arr[largest]) {
      largest = left;
    }
    
    if (right < heapSize && arr[right] > arr[largest]) {
      largest = right;
    }
    
    if (largest === current) {
      // Если наибольший элемент не изменился, завершаем цикл
      break;
    }
    
    // Меняем местами текущий узел и наибольший
    [arr[current], arr[largest]] = [arr[largest], arr[current]];
    
    // Переходим к поддереву
    current = largest;
  }
}
`;

  return (
    <div className="p-4 overflow-auto font-mono text-sm text-gray-300 rounded-lg bg-slate-900" style={{ maxHeight: '600px' }}>
      <pre>{heapSortCode}</pre>
    </div>
  );
};

// Объяснение алгоритма пирамидальной сортировки
const AlgorithmExplanation = () => {
  return (
    <div>
      <p className="mb-4">
        Пирамидальная сортировка (Heap Sort) — это эффективный алгоритм сортировки, основанный на структуре данных
        "двоичная куча" (binary heap). Этот алгоритм был разработан Дж. Уильямсом в 1964 году и сочетает в себе 
        преимущества быстрой сортировки (эффективность) и сортировки слиянием (стабильная производительность).
      </p>

      <h3 className="mt-6 mb-3 text-xl font-bold text-blue-400">Двоичная куча (Binary Heap):</h3>
      <p className="mb-2">
        Прежде чем говорить о пирамидальной сортировке, нужно понять структуру данных "куча":
      </p>
      <ul className="pl-5 space-y-2 list-disc">
        <li>
          <strong>Куча</strong> — это полное двоичное дерево, где значение в каждом узле не меньше (max-heap) или 
          не больше (min-heap) значений его потомков.
        </li>
        <li>
          <strong>Двоичная куча</strong> эффективно представляется в виде массива, где:
          <ul className="pl-5 mt-1 space-y-1 list-disc">
            <li>Для узла в позиции <code>i</code> его левый потомок находится в позиции <code>2i + 1</code></li>
            <li>Правый потомок находится в позиции <code>2i + 2</code></li>
            <li>Родитель находится в позиции <code>floor((i-1)/2)</code></li>
          </ul>
        </li>
      </ul>

      <h3 className="mt-6 mb-3 text-xl font-bold text-blue-400">Принцип работы Heap Sort:</h3>
      <ol className="pl-5 space-y-2 list-decimal">
        <li>
          <strong>Построение max-heap:</strong> Преобразование несортированного массива в max-heap, где наибольший
          элемент находится в корне.
        </li>
        <li>
          <strong>Извлечение максимума:</strong> Меняем местами корень (максимальный элемент) с последним элементом кучи, 
          уменьшаем размер кучи и восстанавливаем свойство max-heap для оставшихся элементов.
        </li>
        <li>
          <strong>Повторение:</strong> Шаг 2 повторяется до тех пор, пока все элементы не будут извлечены, 
          что даст отсортированный массив.
        </li>
      </ol>

      <h3 className="mt-6 mb-3 text-xl font-bold text-blue-400">Процесс Heapify:</h3>
      <p className="mb-2">
        Ключевой операцией в пирамидальной сортировке является <code>heapify</code> — процесс, который гарантирует,
        что поддерево с корнем в определенном узле соответствует свойству кучи:
      </p>
      <ol className="pl-5 space-y-2 list-decimal">
        <li>Сравниваем корень с его детьми и находим наибольший элемент.</li>
        <li>Если наибольший элемент — не корень, меняем корень с наибольшим элементом.</li>
        <li>Рекурсивно применяем <code>heapify</code> к поддереву, затронутому обменом.</li>
      </ol>

      <h3 className="mt-6 mb-3 text-xl font-bold text-blue-400">Характеристики:</h3>
      <ul className="pl-5 space-y-2 list-disc">
        <li>
          <strong>Временная сложность:</strong> O(n log n) для всех случаев (лучший, средний, худший)
        </li>
        <li>
          <strong>Пространственная сложность:</strong> O(1) — сортировка выполняется "на месте"
        </li>
        <li>
          <strong>Стабильность:</strong> Нестабильный — не гарантирует сохранение относительного порядка равных элементов
        </li>
      </ul>

      <div className="p-4 mt-6 border rounded-lg bg-blue-900/20 border-blue-800/30">
        <h4 className="mb-2 font-bold text-blue-300">Интересный факт:</h4>
        <p className="text-blue-100">
          Пирамидальная сортировка часто рассматривается как улучшенная версия сортировки выбором (Selection Sort).
          В обоих алгоритмах мы последовательно находим минимальный/максимальный элемент, но в Heap Sort это делается
          с использованием структуры данных куча, что сокращает время с O(n²) до O(n log n).
        </p>
      </div>
    </div>
  );
};

// Практическое применение пирамидальной сортировки
const ApplicationsSection = () => {
  return (
    <div>
      <p className="mb-4">
        Пирамидальная сортировка имеет ряд важных практических применений благодаря своей эффективности,
        предсказуемой производительности и оптимальному использованию памяти.
      </p>

      <h3 className="mt-4 mb-2 text-xl font-bold text-blue-400">Где используется:</h3>
      <ul className="pl-5 space-y-2 list-disc">
        <li>
          <strong>Системы реального времени:</strong> Благодаря гарантированной производительности O(n log n) 
          в худшем случае, Heap Sort идеально подходит для систем, где предсказуемость времени выполнения
          критически важна.
        </li>
        <li>
          <strong>Встроенные системы:</strong> Благодаря минимальному потреблению памяти (O(1)), 
          алгоритм хорошо подходит для устройств с ограниченными ресурсами.
        </li>
        <li>
          <strong>K наибольших/наименьших элементов:</strong> Эффективное нахождение k наибольших или
          наименьших элементов в массиве без полной сортировки.
        </li>
        <li>
          <strong>Алгоритмы планирования:</strong> В операционных системах и базах данных для
          эффективного управления приоритетами задач.
        </li>
        <li>
          <strong>Гибридные алгоритмы сортировки:</strong> Часто используется как часть более сложных 
          алгоритмов, например, IntroSort (используемый в C++ STL), который комбинирует QuickSort, 
          HeapSort и InsertionSort.
        </li>
      </ul>

      <h3 className="mt-6 mb-2 text-xl font-bold text-blue-400">Структура данных "Куча" (Heap):</h3>
      <p className="mb-2">
        Помимо сортировки, бинарная куча сама по себе является ценной структурой данных с множеством применений:
      </p>
      <ul className="pl-5 space-y-2 list-disc">
        <li>
          <strong>Приоритетные очереди:</strong> Эффективная реализация очередей с приоритетом, 
          где элементы извлекаются в порядке их приоритета.
        </li>
        <li>
          <strong>Алгоритм Дейкстры:</strong> Для нахождения кратчайшего пути в графе.
        </li>
        <li>
          <strong>Алгоритм Прима:</strong> Для нахождения минимального остовного дерева в графе.
        </li>
        <li>
          <strong>Алгоритм Хаффмана:</strong> Для сжатия данных, где куча используется для выбора
          наименее частых символов.
        </li>
      </ul>

      <div className="p-4 mt-6 border rounded-lg bg-indigo-900/20 border-indigo-800/30">
        <h4 className="mb-2 font-bold text-indigo-300">Сравнение с другими алгоритмами сортировки:</h4>
        <ul className="pl-5 space-y-1 text-indigo-100 list-disc">
          <li>
            <strong>В сравнении с QuickSort:</strong> Heap Sort имеет гарантированную сложность O(n log n) 
            даже в худшем случае, в то время как QuickSort может деградировать до O(n²). Однако на практике
            QuickSort часто быстрее благодаря лучшей локальности данных и меньшим константам.
          </li>
          <li>
            <strong>В сравнении с MergeSort:</strong> Heap Sort требует O(1) дополнительной памяти,
            тогда как MergeSort требует O(n). Однако MergeSort является стабильным алгоритмом сортировки,
            в отличие от Heap Sort.
          </li>
          <li>
            <strong>В сравнении с IntroSort:</strong> IntroSort переключается между QuickSort и HeapSort,
            используя преимущества обоих алгоритмов — скорость QuickSort в среднем случае и гарантированную
            производительность HeapSort в худшем случае.
          </li>
        </ul>
      </div>
    </div>
  );
};

const HeapSortPage = () => {
  // Получаем связанные алгоритмы
  const relatedAlgorithms = getRelatedAlgorithms('heapsort', 'sorting').map(algo => ({
    id: algo.id,
    name: algo.name,
    path: algo.path,
  }));

  return (
    <AlgorithmLayout
      title="Пирамидальная сортировка (Heap Sort)"
      description="Эффективный алгоритм сортировки на основе двоичной кучи с гарантированной сложностью O(n log n)"
      complexity={{
        time: 'O(n log n)',
        space: 'O(1)',
      }}
      category={{
        id: 'sorting',
        name: 'Алгоритмы сортировки',
        icon: 'ph:sort-ascending-bold',
      }}
      relatedAlgorithms={relatedAlgorithms}
      visualization={<HeapSortVisualization />}
      implementation={<CodeImplementation />}
      explanation={<AlgorithmExplanation />}
      applications={<ApplicationsSection />}
    />
  );
};

export default HeapSortPage;
