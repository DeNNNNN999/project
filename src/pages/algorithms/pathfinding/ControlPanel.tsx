import React, { memo } from 'react';
import { motion } from 'motion/react';
import { Icon } from '@iconify/react';
import { GridSize, HeuristicType } from './astar.model';

interface ControlPanelProps {
  gridSize: GridSize;
  speed: number;
  isRunning: boolean;
  isPaused: boolean;
  onStart: () => void;
  onPauseResume: () => void;
  onReset: () => void;
  onGridSizeChange: (size: GridSize) => void;
  onSpeedChange: (speed: number) => void;
}

const GRID_PRESETS = [
  { label: 'Маленькая (20x15)', value: { width: 20, height: 15 } },
  { label: 'Средняя (40x25)', value: { width: 40, height: 25 } },
  { label: 'Большая (60x35)', value: { width: 60, height: 35 } },
  { label: 'Огромная (80x45)', value: { width: 80, height: 45 } },
];

const SPEED_PRESETS = [
  { label: 'Очень медленно', value: 500 },
  { label: 'Медленно', value: 200 },
  { label: 'Нормально', value: 50 },
  { label: 'Быстро', value: 10 },
  { label: 'Очень быстро', value: 1 },
];

export const ControlPanel: React.FC<ControlPanelProps> = memo(({
  gridSize,
  speed,
  isRunning,
  isPaused,
  onStart,
  onPauseResume,
  onReset,
  onGridSizeChange,
  onSpeedChange,
}) => {
  return (
    <motion.div
      className="p-6 bg-slate-800 rounded-lg space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      {/* Основные кнопки управления */}
      <div className="flex flex-wrap gap-3 justify-center">
        <motion.button
          onClick={onStart}
          disabled={isRunning && !isPaused}
          className={`px-6 py-3 rounded-lg font-medium text-white transition-all flex items-center gap-2 ${
            isRunning && !isPaused
              ? 'bg-slate-600 cursor-not-allowed opacity-50'
              : 'bg-green-600 hover:bg-green-700 hover:scale-105'
          }`}
          whileHover={{ scale: isRunning && !isPaused ? 1 : 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Icon icon="mdi:play" className="w-5 h-5" />
          Запустить
        </motion.button>
        
        <motion.button
          onClick={onPauseResume}
          disabled={!isRunning}
          className={`px-6 py-3 rounded-lg font-medium text-white transition-all flex items-center gap-2 ${
            !isRunning
              ? 'bg-slate-600 cursor-not-allowed opacity-50'
              : isPaused
              ? 'bg-blue-600 hover:bg-blue-700'
              : 'bg-amber-600 hover:bg-amber-700'
          }`}
          whileHover={{ scale: !isRunning ? 1 : 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Icon icon={isPaused ? "mdi:play" : "mdi:pause"} className="w-5 h-5" />
          {isPaused ? 'Продолжить' : 'Пауза'}
        </motion.button>
        
        <motion.button
          onClick={onReset}
          className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-medium text-white transition-all flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Icon icon="mdi:refresh" className="w-5 h-5" />
          Сбросить
        </motion.button>
      </div>
      
      {/* Настройки */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Размер сетки */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-3">
            Размер сетки
          </label>
          <div className="space-y-2">
            {GRID_PRESETS.map((preset, index) => (
              <button
                key={index}
                onClick={() => onGridSizeChange(preset.value)}
                disabled={isRunning}
                className={`w-full px-4 py-2 rounded-lg text-sm transition-all ${
                  gridSize.width === preset.value.width && gridSize.height === preset.value.height
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                } ${isRunning ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {preset.label}
              </button>
            ))}
          </div>
          
          {/* Кастомный размер */}
          <div className="mt-3 space-y-2">
            <div className="flex gap-2">
              <div className="flex-1">
                <label className="text-xs text-slate-400">Ширина</label>
                <input
                  type="number"
                  min="10"
                  max="100"
                  value={gridSize.width}
                  onChange={(e) => onGridSizeChange({ ...gridSize, width: parseInt(e.target.value) || 10 })}
                  disabled={isRunning}
                  className="w-full px-3 py-1 bg-slate-700 border border-slate-600 rounded text-white text-sm disabled:opacity-50"
                />
              </div>
              <div className="flex-1">
                <label className="text-xs text-slate-400">Высота</label>
                <input
                  type="number"
                  min="10"
                  max="100"
                  value={gridSize.height}
                  onChange={(e) => onGridSizeChange({ ...gridSize, height: parseInt(e.target.value) || 10 })}
                  disabled={isRunning}
                  className="w-full px-3 py-1 bg-slate-700 border border-slate-600 rounded text-white text-sm disabled:opacity-50"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Скорость анимации */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-3">
            Скорость анимации
          </label>
          <div className="space-y-2">
            {SPEED_PRESETS.map((preset, index) => (
              <button
                key={index}
                onClick={() => onSpeedChange(preset.value)}
                className={`w-full px-4 py-2 rounded-lg text-sm transition-all ${
                  speed === preset.value
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>
          
          {/* Слайдер скорости */}
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span>Медленно</span>
              <span>{speed}ms</span>
              <span>Быстро</span>
            </div>
            <input
              type="range"
              min="1"
              max="500"
              value={500 - speed}
              onChange={(e) => onSpeedChange(500 - parseInt(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>
        </div>
      </div>
      
      {/* Подсказки */}
      <div className="p-4 bg-slate-700/50 rounded-lg">
        <h4 className="text-sm font-medium text-slate-300 mb-2">💡 Подсказки:</h4>
        <ul className="text-xs text-slate-400 space-y-1">
          <li>• Нажмите и перетащите для рисования стен</li>
          <li>• Используйте инструменты для изменения старта и цели</li>
          <li>• Попробуйте сгенерировать лабиринт для интересных путей</li>
          <li>• Включите отображение значений для понимания работы алгоритма</li>
        </ul>
      </div>
    </motion.div>
  );
});

ControlPanel.displayName = 'ControlPanel';
