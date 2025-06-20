import React, { memo } from 'react';
import { motion } from 'motion/react';
import { Icon } from '@iconify/react';
import { AlgorithmStats } from './astar.model';

interface StatsDisplayProps {
  stats: AlgorithmStats;
}

export const StatsDisplay: React.FC<StatsDisplayProps> = memo(({ stats }) => {
  const statsItems = [
    {
      icon: 'mdi:map-marker-path',
      label: 'Длина пути',
      value: stats.pathLength,
      color: 'text-green-400',
      bgColor: 'bg-green-900/20',
    },
    {
      icon: 'mdi:currency-usd',
      label: 'Стоимость пути',
      value: stats.pathCost.toFixed(2),
      color: 'text-amber-400',
      bgColor: 'bg-amber-900/20',
    },
    {
      icon: 'mdi:eye',
      label: 'Узлов посещено',
      value: stats.nodesVisited,
      color: 'text-purple-400',
      bgColor: 'bg-purple-900/20',
    },
    {
      icon: 'mdi:magnify-expand',
      label: 'Узлов раскрыто',
      value: stats.nodesExpanded,
      color: 'text-blue-400',
      bgColor: 'bg-blue-900/20',
    },
    {
      icon: 'mdi:timer',
      label: 'Время выполнения',
      value: `${stats.executionTime.toFixed(2)}ms`,
      color: 'text-pink-400',
      bgColor: 'bg-pink-900/20',
    },
  ];
  
  return (
    <motion.div
      className="p-6 bg-slate-800 rounded-lg"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
    >
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <Icon icon="mdi:chart-box" className="w-5 h-5" />
        Статистика выполнения
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {statsItems.map((item, index) => (
          <motion.div
            key={item.label}
            className={`p-4 rounded-lg ${item.bgColor} border border-slate-700`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <div className={`flex items-center gap-2 mb-2 ${item.color}`}>
              <Icon icon={item.icon} className="w-5 h-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </div>
            <div className="text-2xl font-bold text-white">
              {item.value}
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Эффективность алгоритма */}
      <motion.div
        className="mt-4 p-4 bg-slate-700/50 rounded-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-300">Эффективность поиска:</span>
          <div className="flex items-center gap-2">
            <div className="w-32 h-2 bg-slate-600 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 to-green-500"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min((stats.pathLength / stats.nodesVisited) * 100, 100)}%` }}
                transition={{ duration: 0.5, delay: 0.5 }}
              />
            </div>
            <span className="text-xs text-slate-400">
              {((stats.pathLength / stats.nodesVisited) * 100).toFixed(1)}%
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
});

StatsDisplay.displayName = 'StatsDisplay';
