import React from 'react'
import { Icon } from '@iconify/react'
import { motion } from 'framer-motion'
import type { DifficultyLevel } from '../../types/lesson'

interface LessonNavigationProps {
  currentLesson: number
  totalLessons: number
  onSelectLesson: (lesson: number) => void
  difficulty?: DifficultyLevel
  className?: string
}

// Карта сложности для визуального отображения
const difficultyConfig: Record<DifficultyLevel, { color: string; icon: string; label: string }> = {
  beginner: { color: 'text-green-400', icon: 'ph:star', label: 'Начальный' },
  intermediate: { color: 'text-yellow-400', icon: 'ph:star-fill', label: 'Средний' },
  advanced: { color: 'text-orange-400', icon: 'ph:fire', label: 'Продвинутый' },
  expert: { color: 'text-red-400', icon: 'ph:lightning', label: 'Экспертный' }
}

const LessonNavigation: React.FC<LessonNavigationProps> = ({
  currentLesson,
  totalLessons,
  onSelectLesson,
  difficulty = 'intermediate',
  className = ''
}) => {
  // Вычисляем прогресс
  const progress = Math.round((currentLesson / totalLessons) * 100)
  const difficultyInfo = difficultyConfig[difficulty]

  // Генерируем список уроков для навигации
  const lessons = Array.from({ length: totalLessons }, (_, i) => i + 1)

  // Функция для определения статуса урока
  const getLessonStatus = (lessonNum: number): 'completed' | 'current' | 'upcoming' => {
    if (lessonNum < currentLesson) return 'completed'
    if (lessonNum === currentLesson) return 'current'
    return 'upcoming'
  }

  // Стили для кнопок уроков
  const getLessonButtonStyles = (status: ReturnType<typeof getLessonStatus>) => {
    const baseStyles = "w-10 h-10 rounded-lg flex items-center justify-center text-sm font-medium transition-all duration-200"
    
    switch (status) {
      case 'completed':
        return `${baseStyles} bg-green-600/20 text-green-400 border border-green-600/30 hover:bg-green-600/30`
      case 'current':
        return `${baseStyles} bg-blue-600/30 text-blue-300 border border-blue-500 shadow-lg ring-2 ring-blue-500/50`
      case 'upcoming':
        return `${baseStyles} bg-slate-800/50 text-slate-400 border border-slate-700 hover:bg-slate-700/50 hover:text-slate-300`
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-6 border rounded-lg bg-slate-800/50 border-slate-700 ${className}`}
    >
      {/* Заголовок */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-slate-200">Навигация по урокам</h3>
        <div className={`flex items-center gap-1 text-sm ${difficultyInfo.color}`}>
          <Icon icon={difficultyInfo.icon} className="w-4 h-4" />
          <span>{difficultyInfo.label}</span>
        </div>
      </div>

      {/* Прогресс-бар */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-slate-400">Прогресс</span>
          <span className="text-sm font-medium text-slate-300">{progress}%</span>
        </div>
        <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-blue-400"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Текущий урок */}
      <div className="mb-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-blue-600/30 rounded-lg flex items-center justify-center">
            <Icon icon="ph:book-open" className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <h4 className="font-medium text-blue-300">Урок {currentLesson}</h4>
            <p className="text-sm text-blue-400/70">Текущий урок</p>
          </div>
        </div>
      </div>

      {/* Сетка уроков */}
      <div className="grid grid-cols-5 gap-2 mb-4">
        {lessons.map((lessonNum) => {
          const status = getLessonStatus(lessonNum)
          return (
            <motion.button
              key={lessonNum}
              onClick={() => onSelectLesson(lessonNum)}
              className={getLessonButtonStyles(status)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title={`Урок ${lessonNum} (${status === 'completed' ? 'Завершен' : status === 'current' ? 'Текущий' : 'Предстоящий'})`}
            >
              {status === 'completed' ? (
                <Icon icon="ph:check" className="w-4 h-4" />
              ) : (
                lessonNum
              )}
            </motion.button>
          )
        })}
      </div>

      {/* Навигационные кнопки */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-700">
        <button
          onClick={() => onSelectLesson(Math.max(1, currentLesson - 1))}
          disabled={currentLesson <= 1}
          className="flex items-center gap-2 px-3 py-2 text-sm text-slate-400 hover:text-slate-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Icon icon="ph:arrow-left" className="w-4 h-4" />
          Предыдущий
        </button>

        <span className="text-sm text-slate-500">
          {currentLesson} из {totalLessons}
        </span>

        <button
          onClick={() => onSelectLesson(Math.min(totalLessons, currentLesson + 1))}
          disabled={currentLesson >= totalLessons}
          className="flex items-center gap-2 px-3 py-2 text-sm text-slate-400 hover:text-slate-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Следующий
          <Icon icon="ph:arrow-right" className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  )
}

export default LessonNavigation