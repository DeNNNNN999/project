import React, { memo } from 'react';
import { motion } from 'motion/react';
import { Icon } from '@iconify/react';
import { MathFunction } from './newton.model';

interface FunctionInputProps {
  presetFunctions: MathFunction[];
  selectedFunction: MathFunction;
  onFunctionChange: (func: MathFunction) => void;
  initialGuess: number;
  onInitialGuessChange: (value: number) => void;
  tolerance: number;
  onToleranceChange: (value: number) => void;
  maxIterations: number;
  onMaxIterationsChange: (value: number) => void;
  isRunning: boolean;
}

export const FunctionInput: React.FC<FunctionInputProps> = memo(({
  presetFunctions,
  selectedFunction,
  onFunctionChange,
  initialGuess,
  onInitialGuessChange,
  tolerance,
  onToleranceChange,
  maxIterations,
  onMaxIterationsChange,
  isRunning,
}) => {
  return (
    <motion.div
      className="p-6 bg-slate-800 rounded-lg space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Выбор функции */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-3">
          Выберите функцию
        </label>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {presetFunctions.map((func) => (
            <button
              key={func.id}
              onClick={() => onFunctionChange(func)}
              disabled={isRunning}
              className={`p-4 rounded-lg border transition-all text-left ${
                selectedFunction.id === func.id
                  ? 'bg-blue-600/20 border-blue-500 text-white'
                  : 'bg-slate-700/50 border-slate-600 text-slate-300 hover:bg-slate-700 hover:border-slate-500'
              } ${isRunning ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <h4 className="font-semibold mb-1">{func.name}</h4>
              <p className="text-sm font-mono mb-2">f(x) = {func.expression}</p>
              <p className="text-xs text-slate-400">{func.description}</p>
            </button>
          ))}
        </div>
      </div>
      
      {/* Информация о выбранной функции */}
      <div className="p-4 bg-slate-700/50 rounded-lg">
        <h4 className="text-sm font-medium text-slate-300 mb-2">Выбранная функция:</h4>
        <div className="space-y-1">
          <p className="text-white font-mono">f(x) = {selectedFunction.expression}</p>
          <p className="text-blue-300 font-mono">f'(x) = {selectedFunction.derivative}</p>
        </div>
      </div>
      
      {/* Параметры */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Начальное приближение */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Начальное приближение (x₀)
          </label>
          <div className="relative">
            <input
              type="number"
              value={initialGuess}
              onChange={(e) => onInitialGuessChange(parseFloat(e.target.value) || 0)}
              disabled={isRunning}
              step="0.1"
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500 disabled:opacity-50"
            />
            <Icon 
              icon="mdi:target" 
              className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400"
            />
          </div>
          <p className="mt-1 text-xs text-slate-400">
            Точка старта итераций
          </p>
        </div>
        
        {/* Точность */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Точность (ε)
          </label>
          <div className="relative">
            <select
              value={tolerance}
              onChange={(e) => onToleranceChange(parseFloat(e.target.value))}
              disabled={isRunning}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500 disabled:opacity-50 appearance-none"
            >
              <option value={0.1}>0.1</option>
              <option value={0.01}>0.01</option>
              <option value={0.001}>0.001</option>
              <option value={0.0001}>0.0001</option>
              <option value={0.00001}>0.00001</option>
              <option value={0.000001}>0.000001</option>
            </select>
            <Icon 
              icon="mdi:chevron-down" 
              className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none"
            />
          </div>
          <p className="mt-1 text-xs text-slate-400">
            Критерий остановки
          </p>
        </div>
        
        {/* Макс. итераций */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Макс. итераций
          </label>
          <div className="relative">
            <input
              type="number"
              value={maxIterations}
              onChange={(e) => onMaxIterationsChange(parseInt(e.target.value) || 1)}
              disabled={isRunning}
              min="1"
              max="100"
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500 disabled:opacity-50"
            />
            <Icon 
              icon="mdi:repeat" 
              className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400"
            />
          </div>
          <p className="mt-1 text-xs text-slate-400">
            Защита от зацикливания
          </p>
        </div>
      </div>
      
      {/* Формула метода */}
      <div className="p-4 bg-blue-900/20 border border-blue-700/30 rounded-lg">
        <h4 className="text-sm font-medium text-blue-300 mb-2 flex items-center gap-2">
          <Icon icon="mdi:information" className="w-4 h-4" />
          Формула метода Ньютона:
        </h4>
        <div className="text-center">
          <span className="text-lg font-mono text-blue-100">
            x<sub>n+1</sub> = x<sub>n</sub> - f(x<sub>n</sub>) / f'(x<sub>n</sub>)
          </span>
        </div>
      </div>
    </motion.div>
  );
});

FunctionInput.displayName = 'FunctionInput';
