import React from 'react';
import { Icon } from '@iconify/react';

interface LessonNavigationProps {
  currentLesson: number;
  totalLessons: number;
  onSelectLesson: (lesson: number) => void;
}

const LessonNavigation: React.FC<LessonNavigationProps> = ({ 
  currentLesson, 
  totalLessons, 
  onSelectLesson 
}) => {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-white">Навигация по урокам</h3>
        <div className="flex space-x-2">
          <button
            onClick={() => currentLesson > 1 && onSelectLesson(currentLesson - 1)}
            disabled={currentLesson <= 1}
            className="p-1.5 rounded bg-slate-700 text-white disabled:opacity-50 hover:bg-slate-600"
            title="Предыдущий урок"
          >
            <Icon icon="ph:arrow-left-bold" className="w-5 h-5" />
          </button>
          <button
            onClick={() => currentLesson < totalLessons && onSelectLesson(currentLesson + 1)}
            disabled={currentLesson >= totalLessons}
            className="p-1.5 rounded bg-slate-700 text-white disabled:opacity-50 hover:bg-slate-600"
            title="Следующий урок"
          >
            <Icon icon="ph:arrow-right-bold" className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-10 gap-2 mb-4">
        {Array.from({ length: totalLessons }, (_, i) => i + 1).map((lesson) => (
          <button
            key={lesson}
            onClick={() => onSelectLesson(lesson)}
            className={`py-2 rounded text-sm font-medium transition-colors ${
              lesson === currentLesson
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
            }`}
          >
            {lesson}
          </button>
        ))}
      </div>
      
      <div className="p-3 border rounded border-amber-500/30 bg-amber-500/5">
        <p className="text-sm text-amber-300">
          <Icon icon="ph:info-bold" className="inline-block w-4 h-4 mr-1" />
          Сейчас вы просматриваете урок {currentLesson} из {totalLessons}.
        </p>
      </div>
    </div>
  );
};

export default LessonNavigation;