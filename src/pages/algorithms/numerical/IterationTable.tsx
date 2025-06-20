import React, { memo } from 'react';
import { motion } from 'motion/react';
import { Icon } from '@iconify/react';
import { NewtonIteration, formatNumber, getIterationColor } from './newton.model';

interface IterationTableProps {
  iterations: NewtonIteration[];
  currentIteration: number;
}

export const IterationTable: React.FC<IterationTableProps> = memo(({
  iterations,
  currentIteration,
}) => {
  return (
    <motion.div
      className="overflow-hidden bg-slate-800 rounded-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="p-4 border-b border-slate-700">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <Icon icon="mdi:table" className="w-5 h-5 text-blue-400" />
          Таблица итераций
        </h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-900/50">
              <th className="px-4 py-3 text-left text-slate-300 font-medium">n</th>
              <th className="px-4 py-3 text-left text-slate-300 font-medium">x_n</th>
              <th className="px-4 py-3 text-left text-slate-300 font-medium">f(x_n)</th>
              <th className="px-4 py-3 text-left text-slate-300 font-medium">f'(x_n)</th>
              <th className="px-4 py-3 text-left text-slate-300 font-medium">x_{n+1}</th>
              <th className="px-4 py-3 text-left text-slate-300 font-medium">|x_{n+1} - x_n|</th>
            </tr>
          </thead>
          <tbody>
            {iterations.map((iter, index) => (
              <motion.tr
                key={iter.n}
                className={`border-t border-slate-700 transition-colors ${
                  index <= currentIteration
                    ? index === currentIteration
                      ? 'bg-blue-600/20'
                      : 'bg-slate-700/20'
                    : 'opacity-30'
                }`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ 
                  opacity: index <= currentIteration ? 1 : 0.3,
                  x: 0 
                }}
                transition={{ delay: index * 0.05 }}
              >
                <td className="px-4 py-3 font-mono text-white">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: getIterationColor(index, iterations.length) }}
                    />
                    {iter.n}
                  </div>
                </td>
                <td className="px-4 py-3 font-mono text-blue-300">
                  {formatNumber(iter.x, 6)}
                </td>
                <td className="px-4 py-3 font-mono text-purple-300">
                  {formatNumber(iter.fx, 6)}
                </td>
                <td className="px-4 py-3 font-mono text-amber-300">
                  {formatNumber(iter.fpx, 6)}
                </td>
                <td className="px-4 py-3 font-mono text-green-300">
                  {formatNumber(iter.nextX, 6)}
                </td>
                <td className="px-4 py-3 font-mono text-red-300">
                  {formatNumber(iter.error, 8)}
                  {iter.error < 0.0001 && (
                    <Icon icon="mdi:check-circle" className="inline-block ml-2 w-4 h-4 text-green-400" />
                  )}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Итоговая информация */}
      {currentIteration === iterations.length - 1 && iterations.length > 0 && (
        <motion.div
          className="p-4 border-t border-slate-700 bg-slate-900/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Icon icon="mdi:bullseye-arrow" className="w-5 h-5 text-green-400" />
              <span className="text-slate-300">Найденный корень:</span>
              <span className="font-mono text-white font-semibold">
                {formatNumber(iterations[iterations.length - 1].nextX, 8)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Icon icon="mdi:counter" className="w-5 h-5 text-blue-400" />
              <span className="text-slate-300">Итераций:</span>
              <span className="font-mono text-white font-semibold">
                {iterations.length}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Icon icon="mdi:epsilon" className="w-5 h-5 text-purple-400" />
              <span className="text-slate-300">Точность:</span>
              <span className="font-mono text-white font-semibold">
                {formatNumber(iterations[iterations.length - 1].error, 10)}
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
});

IterationTable.displayName = 'IterationTable';
