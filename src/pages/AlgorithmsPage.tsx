import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';

// Импортируем данные алгоритмов и категорий из общего файла данных
import { algorithmCategories, algorithms, AlgorithmCard } from '../data/algorithms-data';

// Компонент для анимированного фона с градиентом и частицами
const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden -z-10">
      {/* Основной градиентный фон */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-blue-900/10 to-slate-900" />

      {/* Анимированный градиент */}
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

      {/* Сетка-матрица в стиле кода */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-grid-pattern" />
      </div>

      {/* Плавающие частицы - представляют биты данных */}
      {Array.from({ length: 50 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-blue-500 rounded-full"
          style={{
            width: Math.random() * 3 + 1,
            height: Math.random() * 3 + 1,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.4 + 0.1,
          }}
          animate={{
            y: [0, Math.random() * 100 - 50],
            x: [0, Math.random() * 40 - 20],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: Math.random() * 10 + 15,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: Math.random() * 5
          }}
        />
      ))}

      {/* Световые лучи */}
      <motion.div
        className="absolute top-0 left-1/4 w-[1px] h-[30vh] bg-gradient-to-b from-transparent via-blue-500/30 to-transparent"
        style={{ transform: "rotate(10deg)" }}
        animate={{ opacity: [0, 0.5, 0], height: ['30vh', '60vh', '30vh'] }}
        transition={{ duration: 7, repeat: Infinity, repeatType: "reverse" }}
      />
      <motion.div
        className="absolute top-0 right-1/3 w-[1px] h-[40vh] bg-gradient-to-b from-transparent via-purple-500/30 to-transparent"
        style={{ transform: "rotate(-15deg)" }}
        animate={{ opacity: [0, 0.6, 0], height: ['40vh', '70vh', '40vh'] }}
        transition={{ duration: 9, repeat: Infinity, repeatType: "reverse", delay: 3 }}
      />
    </div>
  );
};

// Компонент для анимированного входа новой секции
const AnimatedSection = ({ id, title, subtitle, children, index }) => {
  return (
    <motion.div
      id={id}
      className="mb-16"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: 0.1 * index }}
    >
      <div className="mb-6">
        <div className="inline-flex items-center px-3 py-1 mb-2 text-sm font-medium text-blue-400 rounded-full bg-blue-900/30">
          <span className="mr-2 font-mono">{index + 1}.</span> {subtitle}
        </div>
        <h2 className="text-3xl font-bold text-white">{title}</h2>
      </div>
      {children}
    </motion.div>
  );
};

// Основной компонент страницы алгоритмов
const AlgorithmsPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const containerRef = useRef(null);

  // Фильтрация алгоритмов по категории
  const filteredAlgorithms = activeCategory === 'all'
    ? algorithms
    : algorithms.filter(algo => algo.category === activeCategory);

  return (
    <div className="relative min-h-screen pb-20" ref={containerRef}>
      {/* Фоновые эффекты */}
      <AnimatedBackground />

      <div className="container relative z-10 px-4 pt-32 pb-20 mx-auto">
        {/* Заголовок страницы */}
        <motion.div
          className="relative mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative inline-block"
          >
            <div className="absolute inset-0 blur-2xl opacity-30 bg-gradient-to-br from-blue-600 to-purple-600" />
            <h1 className="relative text-5xl font-bold leading-tight text-transparent md:text-6xl bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text">
              Алгоритмы в 3D
            </h1>
          </motion.div>
          <p className="max-w-2xl mx-auto mt-6 text-lg text-slate-300">
            Интерактивное исследование алгоритмов с визуализацией их работы и реализации
          </p>
        </motion.div>

        {/* Фильтр категорий */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex flex-wrap justify-center gap-3">
            {algorithmCategories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full transition-colors flex items-center gap-2 ${
                  activeCategory === category.id
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-800/20'
                    : 'bg-slate-800/70 text-slate-300 hover:bg-slate-700/70'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon icon={category.icon} className="w-5 h-5" />
                <span>{category.name}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Сетка алгоритмов */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredAlgorithms.map((algorithm, index) => (
            <AlgorithmCard key={algorithm.id} algorithm={algorithm} index={index} />
          ))}
        </div>

        {/* Секции алгоритмов */}
        <div className="mt-24">
          <AnimatedSection
            id="complexity"
            title="Анализ сложности алгоритмов"
            subtitle="Теория"
            index={0}
          >
            <div className="p-8 overflow-hidden border rounded-2xl bg-gradient-to-br from-slate-800/70 to-slate-900/70 backdrop-blur border-slate-700/50">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div>
                  <h3 className="mb-6 text-2xl font-bold text-white">О- и Ω-нотации</h3>
                  <p className="mb-4 text-slate-300">
                    Анализ сложности алгоритмов позволяет оценить эффективность решения в терминах времени выполнения и использования памяти.
                  </p>

                  <div className="p-4 mb-4 rounded-lg bg-slate-800">
                    <p className="font-mono text-blue-400">
                      O(f(n)) = {"{"} g(n) | ∃c, n₀ 0: 0 ≤ g(n) ≤ c⋅f(n) ∀n ≥ n₀ {"}"}
                    </p>
                  </div>

                  <p className="text-slate-300">
                    O-нотация (большое О) определяет верхнюю границу роста функции, то есть наихудший сценарий производительности.
                  </p>
                </div>

                <div>
                  <h3 className="mb-6 text-2xl font-bold text-white">Классы сложности</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-4">
                      <div className="p-2 text-green-400 rounded-lg bg-green-900/30">
                        <Icon icon="ph:crown-bold" className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-bold text-white">O(1) - Константное время</div>
                        <div className="text-sm text-slate-400">Выполнение не зависит от размера входных данных</div>
                      </div>
                    </li>
                    <li className="flex items-center gap-4">
                      <div className="p-2 text-blue-400 rounded-lg bg-blue-900/30">
                        <Icon icon="ph:lightning-bold" className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-bold text-white">O(log n) - Логарифмическое время</div>
                        <div className="text-sm text-slate-400">Время растет логарифмически с размером входных данных</div>
                      </div>
                    </li>
                    <li className="flex items-center gap-4">
                      <div className="p-2 text-yellow-400 rounded-lg bg-yellow-900/30">
                        <Icon icon="ph:chart-line-bold" className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-bold text-white">O(n) - Линейное время</div>
                        <div className="text-sm text-slate-400">Время пропорционально размеру входных данных</div>
                      </div>
                    </li>
                    <li className="flex items-center gap-4">
                      <div className="p-2 text-orange-400 rounded-lg bg-orange-900/30">
                        <Icon icon="ph:chart-line-up-bold" className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-bold text-white">O(n log n) - Линеарифмическое время</div>
                        <div className="text-sm text-slate-400">Эффективные алгоритмы сортировки (быстрая, слиянием)</div>
                      </div>
                    </li>
                    <li className="flex items-center gap-4">
                      <div className="p-2 text-red-400 rounded-lg bg-red-900/30">
                        <Icon icon="ph:warning-bold" className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-bold text-white">O(2ⁿ) - Экспоненциальное время</div>
                        <div className="text-sm text-slate-400">Время удваивается с каждым новым элементом (NP-полные задачи)</div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection
            id="implementations"
            title="Реализации и примеры"
            subtitle="Практика"
            index={1}
          >
            <div className="p-8 overflow-hidden border rounded-2xl bg-gradient-to-br from-slate-800/70 to-slate-900/70 backdrop-blur border-slate-700/50">
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                <div>
                  <h3 className="mb-6 text-2xl font-bold text-white">Классические реализации</h3>

                  <p className="mb-6 text-slate-300">
                    Все алгоритмы представлены в чистом JavaScript без использования внешних библиотек. Реализации фокусируются на ясности кода и оптимальной производительности.
                  </p>

                  <ul className="space-y-4">
                    <li className="p-4 border rounded-lg bg-slate-800/50 border-slate-700/50">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-bold text-white">Сортировка</h4>
                        <span className="px-2 py-1 text-xs text-blue-400 rounded-full bg-blue-900/30">8 реализаций</span>
                      </div>
                      <p className="text-sm text-slate-400">
                        QuickSort, MergeSort, HeapSort, RadixSort, CountingSort, BubbleSort, InsertionSort, SelectionSort
                      </p>
                    </li>
                    <li className="p-4 border rounded-lg bg-slate-800/50 border-slate-700/50">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-bold text-white">Графы</h4>
                        <span className="px-2 py-1 text-xs text-blue-400 rounded-full bg-blue-900/30">6 реализаций</span>
                      </div>
                      <p className="text-sm text-slate-400">
                        BFS, DFS, Dijkstra, A*, Prim, Kruskal
                      </p>
                    </li>
                    <li className="p-4 border rounded-lg bg-slate-800/50 border-slate-700/50">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-bold text-white">Структуры данных</h4>
                        <span className="px-2 py-1 text-xs text-blue-400 rounded-full bg-blue-900/30">7 реализаций</span>
                      </div>
                      <p className="text-sm text-slate-400">
                        LinkedList, Stack, Queue, BinaryTree, Heap, Trie, Graph
                      </p>
                    </li>
                    <li className="p-4 border rounded-lg bg-slate-800/50 border-slate-700/50">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-bold text-white">Математические алгоритмы</h4>
                        <span className="px-2 py-1 text-xs text-blue-400 rounded-full bg-blue-900/30">5 реализаций</span>
                      </div>
                      <p className="text-sm text-slate-400">
                        Метод Ньютона, Схема Горнера, Алгоритм Евклида, Решето Эратосфена, Метод Монте-Карло
                      </p>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="mb-6 text-2xl font-bold text-white">Тестирование и бенчмарки</h3>

                  <div className="mb-6">
                    <p className="text-slate-300">
                      Все реализации сопровождаются тестами производительности для сравнения скорости работы и использования памяти.
                    </p>
                  </div>

                  <div className="mt-6">
                    <h4 className="mb-4 text-xl font-bold text-white">Сравнение алгоритмов сортировки</h4>
                    <div className="space-y-3">
                      <div className="relative pt-1">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <span className="inline-block text-xs font-semibold text-white">
                              QuickSort
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="inline-block text-xs font-semibold text-white">
                              94%
                            </span>
                          </div>
                        </div>
                        <div className="flex h-2 overflow-hidden text-xs rounded bg-slate-700">
                          <div style={{ width: "94%" }} className="flex flex-col justify-center text-center text-white bg-blue-500 shadow-none whitespace-nowrap"></div>
                        </div>
                      </div>
                      <div className="relative pt-1">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <span className="inline-block text-xs font-semibold text-white">
                              MergeSort
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="inline-block text-xs font-semibold text-white">
                              89%
                            </span>
                          </div>
                        </div>
                        <div className="flex h-2 overflow-hidden text-xs rounded bg-slate-700">
                          <div style={{ width: "89%" }} className="flex flex-col justify-center text-center text-white bg-purple-500 shadow-none whitespace-nowrap"></div>
                        </div>
                      </div>
                      <div className="relative pt-1">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <span className="inline-block text-xs font-semibold text-white">
                              HeapSort
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="inline-block text-xs font-semibold text-white">
                              82%
                            </span>
                          </div>
                        </div>
                        <div className="flex h-2 overflow-hidden text-xs rounded bg-slate-700">
                          <div style={{ width: "82%" }} className="flex flex-col justify-center text-center text-white bg-green-500 shadow-none whitespace-nowrap"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection
            id="interactive"
            title="Интерактивный режим"
            subtitle="Демонстрация"
            index={2}
          >
            <div className="p-8 overflow-hidden border rounded-2xl bg-gradient-to-br from-slate-800/70 to-slate-900/70 backdrop-blur border-slate-700/50">
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
                <div className="lg:col-span-2">
                  <h3 className="mb-6 text-2xl font-bold text-white">Детальные страницы алгоритмов</h3>

                  <p className="mb-6 text-slate-300">
                    Для каждого алгоритма создана отдельная страница с подробным объяснением, визуализацией работы алгоритма и кодом реализации.
                  </p>

                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg bg-blue-900/20 border-blue-800/30">
                      <div className="flex items-center gap-4">
                        <div className="p-2 text-blue-400 rounded-lg bg-blue-800/50">
                          <Icon icon="ph:info-bold" className="w-5 h-5" />
                        </div>
                        <div className="text-blue-300">
                          Выберите конкретный алгоритм из карточек выше, чтобы увидеть его детальное описание, визуализацию и реализацию.
                        </div>
                      </div>
                    </div>

                    <Link to="/algorithms/sorting/quicksort">
                      <button
                        className="w-full py-3 font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl"
                      >
                        Открыть Быструю сортировку
                      </button>
                    </Link>

                    <Link to="/algorithms/sorting">
                      <button
                        className="w-full py-3 font-medium text-white bg-gradient-to-r from-green-600 to-teal-600 rounded-xl"
                      >
                        Просмотреть все алгоритмы сортировки
                      </button>
                    </Link>
                  </div>
                </div>

                <div className="lg:col-span-3">
                  <div className="p-6 overflow-hidden bg-gradient-to-r from-slate-800/80 to-slate-900/80 border border-slate-700/50 rounded-lg">
                    <h3 className="mb-4 text-xl font-bold text-white">Изучите наши категории алгоритмов</h3>
                    
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      {algorithmCategories.filter(cat => cat.id !== 'all').map((category, index) => (
                        <Link to={category.path} key={category.id}>
                          <motion.div
                            className="p-4 transition-colors border rounded-lg hover:bg-slate-700/30 border-slate-700/30 hover:border-slate-600/50"
                            whileHover={{ y: -5 }}
                          >
                            <div className="flex items-center gap-3 mb-2">
                              <div className="p-2 rounded-lg bg-blue-900/30">
                                <Icon icon={category.icon} className="w-5 h-5 text-blue-400" />
                              </div>
                              <h4 className="font-bold text-white">{category.name}</h4>
                            </div>
                            <p className="text-sm text-slate-300">
                              {
                                {
                                  'sorting': 'Алгоритмы для упорядочивания элементов массива: быстрая сортировка, сортировка слиянием и другие.',
                                  'pathfinding': 'Алгоритмы поиска пути в графах: A*, Дейкстра, поиск в ширину и глубину.',
                                  'automata': 'Конечные автоматы и формальные языки для распознавания паттернов.',
                                  'math': 'Численные методы для решения математических задач и уравнений.'
                                }[category.id]
                              }
                            </p>
                          </motion.div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
};

export default AlgorithmsPage;
