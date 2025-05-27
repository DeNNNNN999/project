import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, PresentationControls, Html } from '@react-three/drei';
import { motion } from 'motion/react';

import AlgorithmLayout from '../../../components/Layout/AlgorithmLayout/AlgorithmLayout';
import { getRelatedAlgorithms } from '../../../data/algorithms-data';

// Компонент для визуализации быстрой сортировки
const QuickSortVisualization = () => {
  // Создаем массив случайных чисел
  const itemsCount = 10;
  const items = Array.from({ length: itemsCount }, (_, i) => ({
    id: i,
    height: Math.random() * 3 + 0.5,
    color: `rgb(${100 + Math.random() * 155}, ${200}, ${255})`
  }));

  // Начальное состояние массива
  const initialArray = [...items];
  // Отсортированный массив (для демонстрации конечного результата)
  const sortedArray = [...items].sort((a, b) => a.height - b.height);

  return (
    <Canvas shadows camera={{ position: [0, 0, 10], fov: 50 }}>
      <color attach="background" args={['#0F172A']} />

      <PresentationControls
        global
        rotation={[0, 0, 0]}
        polar={[-Math.PI / 4, Math.PI / 4]}
        azimuth={[-Math.PI / 4, Math.PI / 4]}
        config={{ mass: 2, tension: 400 }}
        snap={{ mass: 4, tension: 400 }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} castShadow />
        <spotLight position={[-10, 10, 10]} angle={0.3} penumbra={1} intensity={1} castShadow />

        <Suspense fallback={null}>
          {/* Исходный массив */}
          <group position={[-6, 2, 0]}>
            <Html position={[0, 3, 0]}>
              <div className="p-2 text-sm font-bold text-white whitespace-nowrap bg-blue-900/80 rounded-lg">
                Исходный массив
              </div>
            </Html>
            {initialArray.map((item, index) => (
              <mesh
                key={`initial-${item.id}`}
                position={[(index - itemsCount/2) * 1.2, item.height/2, 0]}
                castShadow
                receiveShadow
              >
                <boxGeometry args={[0.8, item.height, 0.8]} />
                <meshStandardMaterial color={item.color} metalness={0.3} roughness={0.4} />
                <Html position={[0, item.height/2 + 0.5, 0]} center className="pointer-events-none">
                  <div className="px-2 py-1 text-xs text-white rounded bg-blue-900/80">{Math.floor(item.height * 10)}</div>
                </Html>
              </mesh>
            ))}
          </group>

          {/* Пивот */}
          <group position={[0, 0, 0]}>
            <Html position={[0, 3, 0]}>
              <div className="p-2 text-sm font-bold text-white whitespace-nowrap bg-purple-900/80 rounded-lg">
                Выбор опорного элемента (pivot)
              </div>
            </Html>
            {initialArray.map((item, index) => {
              const isPivot = index === Math.floor(itemsCount / 2); // Средний элемент как пивот
              return (
                <mesh
                  key={`pivot-${item.id}`}
                  position={[(index - itemsCount/2) * 1.2, item.height/2, 0]}
                  castShadow
                  receiveShadow
                >
                  <boxGeometry args={[0.8, item.height, 0.8]} />
                  <meshStandardMaterial 
                    color={isPivot ? '#EC4899' : item.color} 
                    metalness={0.3} 
                    roughness={0.4} 
                    emissive={isPivot ? '#EC4899' : 'black'}
                    emissiveIntensity={isPivot ? 0.5 : 0}
                  />
                  <Html position={[0, item.height/2 + 0.5, 0]} center className="pointer-events-none">
                    <div className={`px-2 py-1 text-xs text-white rounded ${isPivot ? 'bg-pink-900/80' : 'bg-blue-900/80'}`}>
                      {Math.floor(item.height * 10)}
                    </div>
                  </Html>
                </mesh>
              );
            })}
          </group>

          {/* Отсортированный массив */}
          <group position={[6, -2, 0]}>
            <Html position={[0, 3, 0]}>
              <div className="p-2 text-sm font-bold text-white whitespace-nowrap bg-green-900/80 rounded-lg">
                Отсортированный массив
              </div>
            </Html>
            {sortedArray.map((item, index) => (
              <mesh
                key={`sorted-${item.id}`}
                position={[(index - itemsCount/2) * 1.2, item.height/2, 0]}
                castShadow
                receiveShadow
              >
                <boxGeometry args={[0.8, item.height, 0.8]} />
                <meshStandardMaterial color={'#10B981'} metalness={0.3} roughness={0.4} />
                <Html position={[0, item.height/2 + 0.5, 0]} center className="pointer-events-none">
                  <div className="px-2 py-1 text-xs text-white rounded bg-emerald-900/80">{Math.floor(item.height * 10)}</div>
                </Html>
              </mesh>
            ))}
          </group>

          <Environment preset="city" />
        </Suspense>
      </PresentationControls>
    </Canvas>
  );
};

// Реализация алгоритма Быстрой сортировки
const CodeImplementation = () => {
  const quickSortCode = `
function quickSort(arr) {
  // Базовый случай: массив пуст или содержит один элемент
  if (arr.length <= 1) {
    return arr;
  }

  // Выбор опорного элемента (pivot)
  const pivotIndex = Math.floor(arr.length / 2);
  const pivot = arr[pivotIndex];
  
  // Разделение массива на подмассивы
  const left = []; // Элементы меньше опорного
  const right = []; // Элементы больше опорного
  const equal = []; // Элементы равные опорному
  
  // Проходим по всем элементам массива
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else if (arr[i] > pivot) {
      right.push(arr[i]);
    } else {
      equal.push(arr[i]);
    }
  }
  
  // Рекурсивно применяем quickSort к обоим подмассивам и объединяем результаты
  return [...quickSort(left), ...equal, ...quickSort(right)];
}

// Альтернативная реализация с использованием filter
function quickSortAlternative(arr) {
  if (arr.length <= 1) {
    return arr;
  }

  const pivot = arr[Math.floor(arr.length / 2)];
  const left = arr.filter(x => x < pivot);
  const middle = arr.filter(x => x === pivot);
  const right = arr.filter(x => x > pivot);

  return [...quickSortAlternative(left), ...middle, ...quickSortAlternative(right)];
}

// Пример использования
const unsortedArray = [3, 6, 8, 1, 4, 9, 2, 7, 5];
const sortedArray = quickSort(unsortedArray);
console.log(sortedArray); // [1, 2, 3, 4, 5, 6, 7, 8, 9]
`;

  return (
    <div className="p-4 overflow-auto font-mono text-sm text-gray-300 rounded-lg bg-slate-900">
      <pre>{quickSortCode}</pre>
    </div>
  );
};

// Объяснение алгоритма
const AlgorithmExplanation = () => {
  return (
    <div>
      <p className="mb-4">
        Быстрая сортировка (QuickSort) - это эффективный алгоритм сортировки, реализующий стратегию "разделяй и властвуй".
        Алгоритм был разработан Тони Хоаром в 1960 году и с тех пор стал одним из самых популярных алгоритмов сортировки благодаря своей высокой производительности на практике.
      </p>

      <h3 className="mt-6 mb-3 text-xl font-bold text-blue-400">Принцип работы:</h3>
      <ol className="pl-5 space-y-2 list-decimal">
        <li>
          <strong>Выбор опорного элемента (pivot):</strong> Алгоритм выбирает один элемент из массива в качестве опорного. 
          Существуют различные стратегии выбора: первый элемент, последний, средний, случайный или медиана.
        </li>
        <li>
          <strong>Разделение (partition):</strong> Элементы массива перераспределяются таким образом, 
          что все элементы, меньшие опорного, находятся перед ним, а все элементы, большие опорного - после него.
        </li>
        <li>
          <strong>Рекурсивное применение:</strong> Алгоритм рекурсивно применяется к подмассивам слева и справа от опорного элемента.
        </li>
        <li>
          <strong>Базовый случай:</strong> Когда размер подмассива становится 0 или 1, рекурсия останавливается, так как такие массивы уже отсортированы.
        </li>
      </ol>

      <h3 className="mt-6 mb-3 text-xl font-bold text-blue-400">Характеристики:</h3>
      <ul className="pl-5 space-y-2 list-disc">
        <li>
          <strong>Сложность в среднем случае:</strong> O(n log n)
        </li>
        <li>
          <strong>Сложность в худшем случае:</strong> O(n²) - возникает, когда опорный элемент всегда выбирается как наименьший или наибольший элемент
        </li>
        <li>
          <strong>Пространственная сложность:</strong> O(log n) - из-за рекурсивных вызовов на стеке
        </li>
        <li>
          <strong>Нестабильность:</strong> QuickSort не гарантирует сохранение относительного порядка равных элементов
        </li>
      </ul>

      <div className="p-4 mt-6 border rounded-lg bg-blue-900/20 border-blue-800/30">
        <h4 className="mb-2 font-bold text-blue-300">Интересный факт:</h4>
        <p className="text-blue-100">
          Несмотря на то, что худший случай имеет сложность O(n²), на практике QuickSort обычно работает быстрее других алгоритмов сортировки со сложностью O(n log n) благодаря эффективной работе с кэшем и меньшим константам в реальной реализации.
        </p>
      </div>
    </div>
  );
};

// Практическое применение
const ApplicationsSection = () => {
  return (
    <div>
      <p className="mb-4">
        Быстрая сортировка широко используется в различных областях программирования и является реализацией по умолчанию во многих стандартных библиотеках.
      </p>

      <h3 className="mt-4 mb-2 text-xl font-bold text-blue-400">Где применяется:</h3>
      <ul className="pl-5 space-y-2 list-disc">
        <li>
          <strong>Стандартные библиотеки языков программирования:</strong> Многие реализации функций сортировки, такие как 
          Array.prototype.sort() в JavaScript, используют QuickSort или его вариации.
        </li>
        <li>
          <strong>Базы данных:</strong> Для индексирования и сортировки данных.
        </li>
        <li>
          <strong>Обработка числовых данных:</strong> В научных вычислениях, статистическом анализе.
        </li>
        <li>
          <strong>Компьютерная графика:</strong> Для сортировки объектов по глубине или другим характеристикам.
        </li>
        <li>
          <strong>k-тый наименьший элемент:</strong> Алгоритм QuickSelect, основанный на QuickSort, используется для 
          эффективного нахождения k-того наименьшего элемента.
        </li>
      </ul>

      <h3 className="mt-6 mb-2 text-xl font-bold text-blue-400">Модификации:</h3>
      <ul className="pl-5 space-y-2 list-disc">
        <li>
          <strong>Выбор медианы трех:</strong> Улучшение выбора опорного элемента для снижения вероятности худшего случая.
        </li>
        <li>
          <strong>Introsort:</strong> Гибрид QuickSort и HeapSort, который переключается на HeapSort, когда глубина рекурсии становится слишком большой.
        </li>
        <li>
          <strong>Dual-pivot QuickSort:</strong> Вариант с двумя опорными элементами, используемый в Java.
        </li>
      </ul>
    </div>
  );
};

const QuickSortPage = () => {
  // Получаем связанные алгоритмы
  const relatedAlgorithms = getRelatedAlgorithms('quicksort', 'sorting').map(algo => ({
    id: algo.id,
    name: algo.name,
    path: algo.path,
  }));

  return (
    <AlgorithmLayout
      title="Быстрая сортировка (QuickSort)"
      description="Эффективный алгоритм сортировки с использованием стратегии 'разделяй и властвуй'"
      complexity={{
        time: 'O(n log n)',
        space: 'O(log n)',
      }}
      category={{
        id: 'sorting',
        name: 'Алгоритмы сортировки',
        icon: 'ph:sort-ascending-bold',
      }}
      relatedAlgorithms={relatedAlgorithms}
      visualization={<QuickSortVisualization />}
      implementation={<CodeImplementation />}
      explanation={<AlgorithmExplanation />}
      applications={<ApplicationsSection />}
    />
  );
};

export default QuickSortPage;
