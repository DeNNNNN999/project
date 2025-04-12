import { motion } from 'motion/react';
import { Icon } from '@iconify/react';

const AlgorithmsSection = () => {
  return (
    <section id="algorithms" className="py-20 relative">
      {/* Фоновые элементы */}
      <div className="absolute inset-0 bg-gradient-radial from-blue-900/20 to-transparent opacity-30" />
      
      <div className="container mx-auto px-4">
        {/* Заголовок секции в академическом стиле */}
        <motion.div 
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold mb-3 text-transparent bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text">
            # Алгоритмическая теория и практика
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Изучение и применение эффективных алгоритмов для решения сложных задач с оптимальной временной и пространственной сложностью.
          </p>
        </motion.div>
        
        {/* Секция Codewars */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bg-slate-800/50 backdrop-blur p-6 rounded-xl border border-slate-700/50">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2 flex items-center">
                  <span className="text-red-500 mr-2">#</span> Codewars: 1 kyu
                </h3>
                <p className="text-gray-400">
                  Топ 0.631% пользователей платформы • 2,991 очков чести • 39 решенных задач высокой сложности
                </p>
              </div>
              <div className="bg-yellow-600 px-3 py-1.5 rounded-lg text-white font-bold text-sm flex items-center">
                <Icon icon="ph:trophy-fill" className="mr-1" /> 1 kyu
              </div>
            </div>
            
            {/* Прогресс-бар */}
            <div className="h-4 bg-slate-700/50 rounded-full overflow-hidden mb-6">
              <div 
                className="h-full bg-gradient-to-r from-yellow-500 to-yellow-600" 
                style={{ width: '99.4%' }}
              />
            </div>
            
            {/* Текущее положение до достижения 8 dan */}
            <div className="flex justify-between text-sm mb-8">
              <span className="text-yellow-500">Текущий ранг: 1 kyu</span>
              <span className="text-gray-400">Следующий ранг: 1 dan</span>
            </div>
            
            {/* Избранные решения */}
            <h4 className="text-xl font-bold text-white mb-4 flex items-center">
              <span className="text-red-500 mr-2">##</span> Избранные решения
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Решение 1 */}
              <div className="bg-slate-900/50 backdrop-blur rounded-lg p-5 border border-slate-800 hover:border-blue-500/50 transition-colors">
                <div className="flex justify-between mb-3">
                  <h5 className="font-bold text-white">Construct Quadratic</h5>
                  <span className="text-xs px-2 py-1 bg-gray-800 rounded-md text-gray-400">1 kyu</span>
                </div>
                <p className="text-gray-400 text-sm mb-3">Реализация алгоритма восстановления квадратичной функции по точкам с применением систем линейных уравнений.</p>
                <div className="flex justify-between">
                  <span className="text-xs text-gray-500">Сложность: O(n³)</span>
                  <a href="#" className="text-blue-400 text-sm hover:underline">Подробнее</a>
                </div>
              </div>
              
              {/* Решение 2 */}
              <div className="bg-slate-900/50 backdrop-blur rounded-lg p-5 border border-slate-800 hover:border-blue-500/50 transition-colors">
                <div className="flex justify-between mb-3">
                  <h5 className="font-bold text-white">Functional Binary Trees</h5>
                  <span className="text-xs px-2 py-1 bg-gray-800 rounded-md text-gray-400">1 kyu</span>
                </div>
                <p className="text-gray-400 text-sm mb-3">Функциональная реализация сбалансированных бинарных деревьев с операциями вставки, удаления и обхода.</p>
                <div className="flex justify-between">
                  <span className="text-xs text-gray-500">Сложность: O(log n)</span>
                  <a href="#" className="text-blue-400 text-sm hover:underline">Подробнее</a>
                </div>
              </div>
            </div>
            
            <div className="mt-8 flex justify-center">
              <motion.a 
                href="https://www.codewars.com/users/DeNNNNN999" 
                target="_blank"
                className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-md transition-colors flex items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon icon="ph:code-bold" className="mr-2" />
                Полный профиль Codewars
              </motion.a>
            </div>
          </div>
        </motion.div>
        
        {/* Алгоритмические исследования */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="bg-slate-800/50 backdrop-blur p-6 rounded-xl border border-slate-700/50">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              <span className="text-red-500 mr-2">#</span> Анализ временной и пространственной сложности
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
              {/* Теоретическая часть */}
              <div>
                <h4 className="text-xl text-white mb-4">
                  <span className="text-red-500 font-mono">##</span> Формальные определения
                </h4>
                
                <div className="bg-slate-900/70 border border-slate-800 rounded-lg p-4 mb-4">
                  <p className="text-gray-300 font-mono text-sm">
                    <span className="text-blue-400">Definition 1.1 (Сложность O).</span> Функция f(n) принадлежит классу O(g(n)), если существуют положительные константы c и n₀ такие, что f(n) ≤ c·g(n) для всех n ≥ n₀.
                  </p>
                </div>
                
                <div className="bg-slate-900/70 border border-slate-800 rounded-lg p-4">
                  <p className="text-gray-300 font-mono text-sm">
                    <span className="text-blue-400">Definition 1.2 (Оптимальность).</span> Алгоритм считается асимптотически оптимальным, если его временная сложность соответствует нижней границе сложности для данной задачи.
                  </p>
                </div>
              </div>
              
              {/* Практическая часть */}
              <div>
                <h4 className="text-xl text-white mb-4">
                  <span className="text-red-500 font-mono">##</span> Примеры оптимизации
                </h4>
                
                <div className="bg-slate-900/70 border border-slate-800 rounded-lg p-4 mb-4">
                  <h5 className="text-white mb-2">Мемоизация рекурсивных вычислений</h5>
                  <p className="text-gray-400 text-sm">Улучшение с O(2ⁿ) до O(n) путем кеширования промежуточных результатов на примере чисел Фибоначчи.</p>
                </div>
                
                <div className="bg-slate-900/70 border border-slate-800 rounded-lg p-4">
                  <h5 className="text-white mb-2">Бинарный поиск в отсортированных данных</h5>
                  <p className="text-gray-400 text-sm">Достижение оптимальной сложности O(log n) для задачи поиска вместо O(n) при линейном переборе.</p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center mt-6">
              <motion.a 
                href="#" 
                className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-md transition-colors flex items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon icon="ph:article-bold" className="mr-2" />
                Подробнее об алгоритмических исследованиях
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AlgorithmsSection;
