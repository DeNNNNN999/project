import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Icon } from '@iconify/react';

// Импорт данных алгоритмов из общего файла данных
import { algorithmCategories, getAlgorithmsByCategory, AlgorithmCard } from '../../../data/algorithms-data';

const SortingAlgorithmsPage = () => {
  // Получаем только алгоритмы сортировки
  const sortingAlgorithms = getAlgorithmsByCategory('sorting');

  return (
    <div className="relative min-h-screen py-32 bg-slate-900">
      {/* Фоновый градиент */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-blue-900/10 to-slate-900" />
        <motion.div
          className="absolute inset-0 opacity-20"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.3), transparent 60%)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="container relative z-10 px-4 mx-auto">
        {/* Навигационная цепочка */}
        <div className="mb-8">
          <motion.div 
            className="flex items-center space-x-2 text-sm text-slate-400"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Link to="/" className="hover:text-white">Главная</Link>
            <Icon icon="ph:caret-right" />
            <Link to="/algorithms" className="hover:text-white">Алгоритмы</Link>
            <Icon icon="ph:caret-right" />
            <span className="text-white">Алгоритмы сортировки</span>
          </motion.div>
        </div>

        {/* Заголовок и описание */}
        <motion.div 
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center px-4 py-2 mb-4 space-x-2 rounded-full bg-blue-900/30 border border-blue-700/30">
            <Icon icon="ph:sort-ascending-bold" className="w-5 h-5 text-blue-400" />
            <span className="text-sm font-medium text-blue-300">Категория</span>
          </div>
          
          <h1 className="mb-4 text-4xl font-bold text-transparent md:text-5xl bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text">
            Алгоритмы сортировки
          </h1>
          
          <p className="max-w-3xl mx-auto text-lg text-slate-300">
            Исследуйте различные алгоритмы сортировки, их реализации и визуализации работы. От простых методов до сложных оптимизированных алгоритмов.
          </p>
        </motion.div>

        {/* Карточки алгоритмов */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {sortingAlgorithms.map((algorithm, index) => (
            <AlgorithmCard key={algorithm.id} algorithm={algorithm} index={index} />
          ))}
        </div>

        {/* Сравнительная информация */}
        <motion.div
          className="p-8 mt-16 border rounded-2xl bg-slate-800/70 border-slate-700/50"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h2 className="mb-6 text-2xl font-bold text-white">Сравнение алгоритмов сортировки</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-300">
              <thead className="uppercase bg-slate-800 text-gray-400">
                <tr>
                  <th className="px-6 py-3">Алгоритм</th>
                  <th className="px-6 py-3">Среднее время</th>
                  <th className="px-6 py-3">Худшее время</th>
                  <th className="px-6 py-3">Память</th>
                  <th className="px-6 py-3">Стабильность</th>
                  <th className="px-6 py-3">Примечание</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b bg-slate-700/20 border-slate-700">
                  <td className="px-6 py-4 font-medium text-white">
                    <Link to="/algorithms/sorting/quicksort" className="underline text-blue-400 hover:text-blue-300">
                      Quick Sort
                    </Link>
                  </td>
                  <td className="px-6 py-4">O(n log n)</td>
                  <td className="px-6 py-4">O(n²)</td>
                  <td className="px-6 py-4">O(log n)</td>
                  <td className="px-6 py-4">Нет</td>
                  <td className="px-6 py-4">Обычно самый быстрый на практике</td>
                </tr>
                <tr className="border-b bg-slate-800/20 border-slate-700">
                  <td className="px-6 py-4 font-medium text-white">
                    <Link to="/algorithms/sorting/mergesort" className="underline text-blue-400 hover:text-blue-300">
                      Merge Sort
                    </Link>
                  </td>
                  <td className="px-6 py-4">O(n log n)</td>
                  <td className="px-6 py-4">O(n log n)</td>
                  <td className="px-6 py-4">O(n)</td>
                  <td className="px-6 py-4">Да</td>
                  <td className="px-6 py-4">Стабильный, предсказуемая производительность</td>
                </tr>
                <tr className="border-b bg-slate-700/20 border-slate-700">
                  <td className="px-6 py-4 font-medium text-white">
                    <Link to="/algorithms/sorting/heapsort" className="underline text-blue-400 hover:text-blue-300">
                      Heap Sort
                    </Link>
                  </td>
                  <td className="px-6 py-4">O(n log n)</td>
                  <td className="px-6 py-4">O(n log n)</td>
                  <td className="px-6 py-4">O(1)</td>
                  <td className="px-6 py-4">Нет</td>
                  <td className="px-6 py-4">Сортировка на месте, постоянное использование памяти</td>
                </tr>
                <tr className="bg-slate-800/20">
                  <td className="px-6 py-4 font-medium text-white">Bubble Sort</td>
                  <td className="px-6 py-4">O(n²)</td>
                  <td className="px-6 py-4">O(n²)</td>
                  <td className="px-6 py-4">O(1)</td>
                  <td className="px-6 py-4">Да</td>
                  <td className="px-6 py-4">Простой, но неэффективный для больших наборов</td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Кнопка возврата */}
        <div className="flex justify-center mt-12">
          <Link to="/algorithms">
            <motion.button
              className="flex items-center gap-2 px-6 py-3 font-medium text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon icon="ph:arrow-left" className="w-5 h-5" />
              <span>Вернуться ко всем алгоритмам</span>
            </motion.button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SortingAlgorithmsPage;
