import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Icon } from '@iconify/react';

const NumericalMethodsIndex: React.FC = () => {
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
          
          <h1 className="text-4xl font-bold mb-4">Численные методы</h1>
          <p className="text-xl text-slate-300">
            Изучите методы приближенного решения математических задач
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Link
              to="/algorithms/numerical/newton"
              className="block p-6 bg-slate-800 rounded-lg border border-slate-700 hover:border-blue-500 transition-all hover:shadow-lg hover:shadow-blue-500/20"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-3 bg-blue-600/20 rounded-lg">
                  <Icon icon="tabler:math-function" className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold">Метод Ньютона</h3>
              </div>
              
              <p className="text-slate-400 mb-4">
                Итеративный численный метод для нахождения корней уравнения
              </p>
              
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Icon icon="mdi:clock-outline" className="w-4 h-4 text-green-400" />
                  <span className="text-slate-300">O(log(1/ε))</span>
                </div>
                <div className="flex items-center gap-1">
                  <Icon icon="mdi:memory" className="w-4 h-4 text-purple-400" />
                  <span className="text-slate-300">O(1)</span>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Заглушки для будущих методов */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="opacity-50"
          >
            <div className="block p-6 bg-slate-800 rounded-lg border border-slate-700">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-3 bg-gray-600/20 rounded-lg">
                  <Icon icon="tabler:divide" className="w-6 h-6 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold">Метод бисекции</h3>
              </div>
              
              <p className="text-slate-400 mb-4">
                Простой и надежный метод деления отрезка пополам
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
                  <Icon icon="tabler:line" className="w-6 h-6 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold">Метод секущих</h3>
              </div>
              
              <p className="text-slate-400 mb-4">
                Модификация метода Ньютона без вычисления производной
              </p>
              
              <div className="text-sm text-slate-500">Скоро будет доступно</div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default NumericalMethodsIndex;
