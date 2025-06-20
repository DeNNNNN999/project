import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Icon } from '@iconify/react';

interface PathfindingIndexProps {}

const PathfindingIndex: React.FC<PathfindingIndexProps> = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link
            to="/algorithms"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-4"
          >
            <Icon icon="mdi:arrow-left" className="w-5 h-5" />
            Назад к алгоритмам
          </Link>
          
          <h1 className="text-4xl font-bold mb-4">Алгоритмы поиска пути</h1>
          <p className="text-xl text-slate-300">
            Изучите различные алгоритмы для нахождения оптимальных путей в графах и на сетках
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Link
              to="/algorithms/pathfinding/astar"
              className="block p-6 bg-slate-800 rounded-lg border border-slate-700 hover:border-blue-500 transition-all hover:shadow-lg hover:shadow-blue-500/20"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-3 bg-blue-600/20 rounded-lg">
                  <Icon icon="material-symbols:route" className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold">A* (A-star)</h3>
              </div>
              
              <p className="text-slate-400 mb-4">
                Эффективный алгоритм поиска кратчайшего пути с использованием эвристической функции
              </p>
              
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Icon icon="mdi:clock-outline" className="w-4 h-4 text-green-400" />
                  <span className="text-slate-300">O(b^d)</span>
                </div>
                <div className="flex items-center gap-1">
                  <Icon icon="mdi:memory" className="w-4 h-4 text-purple-400" />
                  <span className="text-slate-300">O(b^d)</span>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Заглушки для будущих алгоритмов */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="opacity-50"
          >
            <div className="block p-6 bg-slate-800 rounded-lg border border-slate-700">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-3 bg-gray-600/20 rounded-lg">
                  <Icon icon="mdi:map-marker-path" className="w-6 h-6 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold">Dijkstra</h3>
              </div>
              
              <p className="text-slate-400 mb-4">
                Классический алгоритм поиска кратчайшего пути во взвешенном графе
              </p>
              
              <div className="text-sm text-slate-500">Скоро будет доступно</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="opacity-50"
          >
            <div className="block p-6 bg-slate-800 rounded-lg border border-slate-700">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-3 bg-gray-600/20 rounded-lg">
                  <Icon icon="mdi:graph" className="w-6 h-6 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold">BFS Pathfinding</h3>
              </div>
              
              <p className="text-slate-400 mb-4">
                Поиск кратчайшего пути в невзвешенном графе методом поиска в ширину
              </p>
              
              <div className="text-sm text-slate-500">Скоро будет доступно</div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PathfindingIndex;
