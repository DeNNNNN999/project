import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import AlgorithmLayout from '../../../components/Layout/AlgorithmLayout/AlgorithmLayout';
import { getRelatedAlgorithms } from '../../../data/algorithms-data';

// Компонент для визуализации сортировки слиянием в стиле 3Blue1Brown
const MergeSortVisualization = () => {
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

  // Функция для отрисовки текущего шага анимации
  const drawCurrentStep = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    if (!steps[currentStep]) return;
    
    const { arrays, mergeIndices, compareIndices } = steps[currentStep];
    const barWidth = width / array.length;
    const maxValue = Math.max(...array) * 1.1;
    
    // Рисуем основной массив
    arrays.forEach((subarray: number[], level: number) => {
      const offsetY = level * 80;
      
      subarray.forEach((value: number, index: number) => {
        // Определяем индекс элемента в исходном массиве
        const originalIndex = arrays[0].indexOf(value);
        const x = originalIndex * barWidth;
        
        // Высота столбца пропорциональна значению
        const barHeight = (value / maxValue) * (height * 0.6);
        
        // Выбираем цвет в зависимости от состояния элемента
        let color = 'rgba(99, 102, 241, 0.8)'; // Стандартный синий цвет
        
        // Проверяем, является ли элемент частью текущего слияния
        if (mergeIndices && mergeIndices.includes(originalIndex)) {
          color = 'rgba(236, 72, 153, 0.8)'; // Розовый для слияния
        }
        
        // Проверяем, является ли элемент частью текущего сравнения
        if (compareIndices && compareIndices.includes(originalIndex)) {
          color = 'rgba(16, 185, 129, 0.8)'; // Зеленый для сравнения
        }
        
        // Рисуем столбец
        ctx.fillStyle = color;
        ctx.fillRect(x, height - barHeight - offsetY, barWidth - 1, barHeight);
        
        // Добавляем значение сверху столбца
        ctx.fillStyle = 'white';
        ctx.font = '10px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(
          value.toString(), 
          x + barWidth / 2, 
          height - barHeight - offsetY - 5
        );
      });
      
      // Добавляем метку уровня разделения/слияния
      if (level > 0) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.font = '12px Arial';
        ctx.textAlign = 'left';
        ctx.fillText(
          `Уровень ${level}: ${subarray.length} элемент(ов)`, 
          10, 
          height - offsetY + 15
        );
      }
    });
    
    // Добавляем информацию о текущем шаге
    ctx.fillStyle = 'white';
    ctx.font = '14px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(
      `Шаг ${currentStep + 1} из ${steps.length}`, 
      width / 2, 
      30
    );
    
    // Добавляем объяснение текущего шага
    const explanation = getExplanationForStep(currentStep);
    ctx.fillText(
      explanation, 
      width / 2, 
      50
    );
  };
  
  // Получаем объяснение для текущего шага
  const getExplanationForStep = (step: number) => {
    if (!steps[step]) return "";
    
    const { type, mergeIndices, compareIndices } = steps[step];
    
    if (type === 'split') {
      return "Разделение массива на подмассивы";
    } else if (type === 'merge') {
      return "Слияние подмассивов в отсортированный массив";
    } else if (type === 'compare') {
      return "Сравнение элементов при слиянии";
    }
    
    return "";
  };

  // Генерация случайного массива
  const generateRandomArray = () => {
    const size = 16; // Фиксированный размер для лучшей визуализации
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
    
    const generatedSteps = generateMergeSortSteps(arr);
    setSteps(generatedSteps);
  };
  
  // Функция для генерации шагов сортировки слиянием
  const generateMergeSortSteps = (arr: number[]) => {
    const steps: any[] = [];
    const originalArray = [...arr];
    
    // Рекурсивная функция разделения и слияния
    const mergeSortWithSteps = (array: number[], level: number = 0): number[] => {
      // Базовый случай
      if (array.length <= 1) return array;
      
      // Разделение массива
      const middle = Math.floor(array.length / 2);
      const left = array.slice(0, middle);
      const right = array.slice(middle);
      
      // Добавляем шаг разделения
      const leftIndices = left.map(value => originalArray.indexOf(value));
      const rightIndices = right.map(value => originalArray.indexOf(value));
      
      steps.push({
        type: 'split',
        arrays: [originalArray, ...getCurrentArrayStructure(level)],
        splitIndices: [...leftIndices, ...rightIndices]
      });
      
      // Рекурсивная сортировка подмассивов
      const sortedLeft = mergeSortWithSteps(left, level + 1);
      const sortedRight = mergeSortWithSteps(right, level + 1);
      
      // Слияние подмассивов
      return merge(sortedLeft, sortedRight, level);
    };
    
    // Функция слияния двух отсортированных подмассивов
    const merge = (left: number[], right: number[], level: number): number[] => {
      const result: number[] = [];
      let leftIndex = 0;
      let rightIndex = 0;
      
      // Слияние массивов с добавлением шагов для каждого сравнения
      while (leftIndex < left.length && rightIndex < right.length) {
        // Индексы для текущего сравнения
        const leftOriginalIndex = originalArray.indexOf(left[leftIndex]);
        const rightOriginalIndex = originalArray.indexOf(right[rightIndex]);
        
        // Добавляем шаг сравнения
        steps.push({
          type: 'compare',
          arrays: [originalArray, ...getCurrentArrayStructure(level)],
          compareIndices: [leftOriginalIndex, rightOriginalIndex]
        });
        
        if (left[leftIndex] <= right[rightIndex]) {
          result.push(left[leftIndex]);
          leftIndex++;
        } else {
          result.push(right[rightIndex]);
          rightIndex++;
        }
        
        // Обновляем структуру массивов после слияния
        const currentResult = [...result];
        const currentArr = getCurrentArrayStructure(level);
        if (currentArr[level]) {
          currentArr[level] = [
            ...currentResult,
            ...left.slice(leftIndex),
            ...right.slice(rightIndex)
          ];
        }
        
        // Добавляем шаг слияния
        steps.push({
          type: 'merge',
          arrays: [originalArray, ...currentArr],
          mergeIndices: currentResult.map(value => originalArray.indexOf(value))
        });
      }
      
      // Добавляем оставшиеся элементы
      const mergedArray = [
        ...result,
        ...left.slice(leftIndex),
        ...right.slice(rightIndex)
      ];
      
      // Обновляем структуру массивов после финального слияния
      const finalArr = getCurrentArrayStructure(level);
      if (finalArr[level]) {
        finalArr[level] = mergedArray;
      }
      
      // Добавляем финальный шаг слияния
      steps.push({
        type: 'merge',
        arrays: [originalArray, ...finalArr],
        mergeIndices: mergedArray.map(value => originalArray.indexOf(value))
      });
      
      return mergedArray;
    };
    
    // Вспомогательная функция для получения текущей структуры массивов
    const getCurrentArrayStructure = (level: number) => {
      const result: number[][] = [];
      for (let i = 0; i <= level; i++) {
        result[i] = [];
      }
      return result;
    };
    
    // Запускаем сортировку и генерацию шагов
    mergeSortWithSteps([...arr]);
    
    return steps;
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
      <div className="relative w-full h-[500px] mb-6 border rounded-lg bg-slate-900 border-slate-700">
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
            Несортированные элементы
          </span>
          <span className="inline-flex items-center px-2 py-1 mr-2 text-xs text-green-300 rounded-md bg-green-900/30">
            <span className="inline-block w-2 h-2 mr-1 bg-green-500 rounded-full"></span>
            Сравниваемые элементы
          </span>
          <span className="inline-flex items-center px-2 py-1 text-xs text-pink-300 rounded-md bg-pink-900/30">
            <span className="inline-block w-2 h-2 mr-1 bg-pink-500 rounded-full"></span>
            Элементы при слиянии
          </span>
        </p>
      </div>
    </div>
  );
};

// Реализация сортировки слиянием
const CodeImplementation = () => {
  const mergeSortCode = `
/**
 * Сортировка слиянием (Merge Sort)
 * 
 * Временная сложность: O(n log n)
 * Пространственная сложность: O(n)
 */

function mergeSort(arr) {
  // Базовый случай: массив из 0 или 1 элемента уже отсортирован
  if (arr.length <= 1) {
    return arr;
  }

  // Нахождение середины массива и разделение на подмассивы
  const middle = Math.floor(arr.length / 2);
  const left = arr.slice(0, middle);
  const right = arr.slice(middle);

  // Рекурсивная сортировка и слияние подмассивов
  return merge(
    mergeSort(left),
    mergeSort(right)
  );
}

/**
 * Функция слияния двух отсортированных массивов
 */
function merge(left, right) {
  const result = [];
  let leftIndex = 0;
  let rightIndex = 0;

  // Сравниваем элементы из левого и правого массивов
  // и добавляем меньший в результат
  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      result.push(right[rightIndex]);
      rightIndex++;
    }
  }

  // Добавляем оставшиеся элементы (если они есть)
  return [
    ...result,
    ...left.slice(leftIndex),
    ...right.slice(rightIndex)
  ];
}

// Пример использования
const unsortedArray = [38, 27, 43, 3, 9, 82, 10];
const sortedArray = mergeSort(unsortedArray);
console.log(sortedArray); // [3, 9, 10, 27, 38, 43, 82]

// Оптимизированная версия с меньшим количеством создаваемых массивов
function mergeSortOptimized(arr) {
  // Вспомогательный массив для слияния
  const temp = new Array(arr.length);
  
  // Основная рекурсивная функция
  function sort(array, tempArray, left, right) {
    if (left >= right) return;
    
    // Находим середину
    const middle = Math.floor((left + right) / 2);
    
    // Сортируем левую и правую части
    sort(array, tempArray, left, middle);
    sort(array, tempArray, middle + 1, right);
    
    // Сливаем отсортированные половины
    mergeOptimized(array, tempArray, left, middle, right);
  }
  
  // Функция слияния для оптимизированной версии
  function mergeOptimized(array, tempArray, left, middle, right) {
    // Копируем обе части во вспомогательный массив
    for (let i = left; i <= right; i++) {
      tempArray[i] = array[i];
    }
    
    let i = left;         // Индекс левой части
    let j = middle + 1;   // Индекс правой части
    let k = left;         // Индекс результирующего массива
    
    // Сравниваем и копируем обратно в исходный массив
    while (i <= middle && j <= right) {
      if (tempArray[i] <= tempArray[j]) {
        array[k++] = tempArray[i++];
      } else {
        array[k++] = tempArray[j++];
      }
    }
    
    // Копируем оставшиеся элементы левой части
    while (i <= middle) {
      array[k++] = tempArray[i++];
    }
    // Копировать оставшиеся элементы правой части не нужно,
    // так как они уже находятся на своих местах
  }
  
  // Запускаем сортировку
  sort(arr, temp, 0, arr.length - 1);
  return arr;
}
`;

  return (
    <div className="p-4 overflow-auto font-mono text-sm text-gray-300 rounded-lg bg-slate-900" style={{ maxHeight: '600px' }}>
      <pre>{mergeSortCode}</pre>
    </div>
  );
};

// Объяснение алгоритма сортировки слиянием
const AlgorithmExplanation = () => {
  return (
    <div>
      <p className="mb-4">
        Сортировка слиянием (Merge Sort) — это эффективный алгоритм сортировки, основанный на принципе
        "разделяй и властвуй". Этот алгоритм разработал Джон фон Нейман в 1945 году, и он до сих пор
        широко используется благодаря своей стабильности и предсказуемой производительности.
      </p>

      <h3 className="mt-6 mb-3 text-xl font-bold text-blue-400">Принцип работы:</h3>
      <ol className="pl-5 space-y-2 list-decimal">
        <li>
          <strong>Разделение:</strong> Массив рекурсивно делится на две равные (или почти равные) части, 
          пока размер подмассивов не станет равным 1 или 0.
        </li>
        <li>
          <strong>Сортировка:</strong> Каждый подмассив считается отсортированным, когда его размер становится 1 или 0.
        </li>
        <li>
          <strong>Слияние:</strong> Отсортированные подмассивы рекурсивно объединяются для образования более крупных
          отсортированных массивов, пока весь массив не будет отсортирован.
        </li>
      </ol>

      <h3 className="mt-6 mb-3 text-xl font-bold text-blue-400">Ключевой процесс — слияние:</h3>
      <ul className="pl-5 space-y-2 list-disc">
        <li>
          При слиянии двух отсортированных массивов мы сравниваем их первые элементы.
        </li>
        <li>
          Меньший элемент помещается в результирующий массив, и указатель на соответствующий подмассив сдвигается.
        </li>
        <li>
          Процесс продолжается до тех пор, пока все элементы не будут помещены в результирующий массив.
        </li>
        <li>
          Если один из подмассивов исчерпан, все оставшиеся элементы из другого подмассива добавляются в результат.
        </li>
      </ul>

      <h3 className="mt-6 mb-3 text-xl font-bold text-blue-400">Характеристики:</h3>
      <ul className="pl-5 space-y-2 list-disc">
        <li>
          <strong>Временная сложность:</strong> O(n log n) для всех случаев (лучший, средний, худший)
        </li>
        <li>
          <strong>Пространственная сложность:</strong> O(n) — требуется дополнительная память для временного массива
        </li>
        <li>
          <strong>Стабильность:</strong> Стабильный — сохраняет относительный порядок элементов с одинаковыми значениями
        </li>
        <li>
          <strong>Распараллеливание:</strong> Хорошо подходит для параллельной реализации
        </li>
      </ul>

      <div className="p-4 mt-6 border rounded-lg bg-blue-900/20 border-blue-800/30">
        <h4 className="mb-2 font-bold text-blue-300">Интересный факт:</h4>
        <p className="text-blue-100">
          Сортировка слиянием является примером алгоритма, для которого доказано, что его
          асимптотическая сложность (O(n log n)) является оптимальной для сортировки на основе сравнений.
          Невозможно создать алгоритм сортировки на основе сравнения элементов, который бы в общем случае
          работал быстрее, чем O(n log n).
        </p>
      </div>
    </div>
  );
};

// Практическое применение сортировки слиянием
const ApplicationsSection = () => {
  return (
    <div>
      <p className="mb-4">
        Сортировка слиянием широко применяется в различных областях программирования
        благодаря своей стабильности, предсказуемой производительности и возможности
        эффективной работы с большими наборами данных.
      </p>

      <h3 className="mt-4 mb-2 text-xl font-bold text-blue-400">Где используется:</h3>
      <ul className="pl-5 space-y-2 list-disc">
        <li>
          <strong>Внешняя сортировка:</strong> Сортировка данных, которые не помещаются в оперативную память.
          Сортировка слиянием идеально подходит для работы с файлами на диске.
        </li>
        <li>
          <strong>Базы данных:</strong> Оптимизация запросов, сортировка индексов и соединение таблиц.
        </li>
        <li>
          <strong>Параллельные вычисления:</strong> Благодаря своей структуре, алгоритм хорошо подходит для
          распределенных систем и многопоточной обработки.
        </li>
        <li>
          <strong>Инверсии и близкие задачи:</strong> Подсчет инверсий в массиве
          (пар элементов, которые находятся в неправильном порядке).
        </li>
        <li>
          <strong>Сортировка связанных списков:</strong> Один из наиболее эффективных алгоритмов для сортировки
          связанных списков, так как не требует произвольного доступа к элементам.
        </li>
      </ul>

      <h3 className="mt-6 mb-2 text-xl font-bold text-blue-400">Реальные примеры:</h3>
      <ul className="pl-5 space-y-2 list-disc">
        <li>
          <strong>Java Arrays.sort():</strong> В Java для сортировки объектов используется
          модифицированная версия сортировки слиянием (Timsort).
        </li>
        <li>
          <strong>Сортировка в подсистемах Linux:</strong> Некоторые утилиты командной строки
          используют сортировку слиянием для обработки больших файлов.
        </li>
        <li>
          <strong>Mozilla Firefox:</strong> Использует сортировку слиянием в своем JavaScript-движке.
        </li>
        <li>
          <strong>Распределенные системы:</strong> Hadoop и другие фреймворки для работы с большими данными
          применяют сортировку слиянием при обработке распределенных данных.
        </li>
      </ul>

      <div className="p-4 mt-6 border rounded-lg bg-indigo-900/20 border-indigo-800/30">
        <h4 className="mb-2 font-bold text-indigo-300">Преимущества перед другими алгоритмами:</h4>
        <ul className="pl-5 space-y-1 text-indigo-100 list-disc">
          <li>
            <strong>Предсказуемость:</strong> В отличие от быстрой сортировки, всегда имеет одинаковую
            сложность O(n log n), что важно для систем реального времени.
          </li>
          <li>
            <strong>Стабильность:</strong> Сохраняет порядок равных элементов, что критично для многих приложений.
          </li>
          <li>
            <strong>Внешняя сортировка:</strong> Отлично подходит для сортировки данных, которые не помещаются в память.
          </li>
          <li>
            <strong>Отсутствие деградации:</strong> Производительность не ухудшается на уже отсортированных или
            почти отсортированных массивах.
          </li>
        </ul>
      </div>
    </div>
  );
};

const MergeSortPage = () => {
  // Получаем связанные алгоритмы
  const relatedAlgorithms = getRelatedAlgorithms('mergesort', 'sorting').map(algo => ({
    id: algo.id,
    name: algo.name,
    path: algo.path,
  }));

  return (
    <AlgorithmLayout
      title="Сортировка слиянием (Merge Sort)"
      description="Эффективный алгоритм сортировки с временной сложностью O(n log n) и стабильностью"
      complexity={{
        time: 'O(n log n)',
        space: 'O(n)',
      }}
      category={{
        id: 'sorting',
        name: 'Алгоритмы сортировки',
        icon: 'ph:sort-ascending-bold',
      }}
      relatedAlgorithms={relatedAlgorithms}
      visualization={<MergeSortVisualization />}
      implementation={<CodeImplementation />}
      explanation={<AlgorithmExplanation />}
      applications={<ApplicationsSection />}
    />
  );
};

export default MergeSortPage;
