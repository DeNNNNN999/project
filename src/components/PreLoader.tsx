import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Icon } from '@iconify/react'

const PreLoader = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => setIsLoading(false), 300)
          return 100
        }
        return prev + 4
      })
    }, 50)

    return () => clearInterval(interval)
  }, [])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-[#0B1120] via-[#0F0A1F] to-[#050510]">
          {/* Анимированные градиентные сферы на фоне */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute w-[600px] h-[600px] -top-48 -left-48 rounded-full"
              style={{
                background: 'radial-gradient(circle, #EC489940 0%, transparent 70%)',
                filter: 'blur(60px)',
              }}
              animate={{
                x: [0, 100, 0],
                y: [0, -50, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

            <motion.div
              className="absolute w-[500px] h-[500px] -bottom-32 -right-32 rounded-full"
              style={{
                background: 'radial-gradient(circle, #8B5CF640 0%, transparent 70%)',
                filter: 'blur(60px)',
              }}
              animate={{
                x: [0, -100, 0],
                y: [0, 50, 0],
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 2,
              }}
            />
          </div>

          <div className="relative">
            {/* Пульсирующие кольца */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute inset-0 rounded-full"
                style={{
                  border: '2px solid',
                  borderColor: i === 0 ? '#EC4899' : i === 1 ? '#8B5CF6' : '#3B82F6',
                  opacity: 0.3,
                }}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{
                  scale: [1, 1.5, 2],
                  opacity: [0.3, 0.1, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: 'easeOut',
                }}
              />
            ))}

            {/* Главный контейнер с логотипом */}
            <motion.div
              className="relative flex items-center justify-center w-32 h-32 rounded-full"
              style={{
                background:
                  'linear-gradient(135deg, rgba(236, 72, 153, 0.1) 0%, rgba(139, 92, 246, 0.1) 50%, rgba(59, 130, 246, 0.1) 100%)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 4,
                ease: 'linear',
                repeat: Infinity,
              }}>
              {/* React логотип с градиентом */}
              <div className="relative">
                <Icon icon="logos:react" className="w-16 h-16 relative z-10" />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 blur-lg opacity-50"
                  animate={{
                    scale: [0.8, 1.2, 0.8],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              </div>
            </motion.div>
          </div>

          {/* Текст загрузки с градиентом */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12 text-center">
            <h2 className="text-2xl font-bold text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text animate-gradient-text">
              Инициализация портфолио
            </h2>
          </motion.div>

          {/* Прогресс бар с градиентом */}
          <div className="relative w-64 h-2 mt-8 overflow-hidden rounded-full bg-white/5 backdrop-blur">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full relative"
              style={{
                background: 'linear-gradient(90deg, #EC4899 0%, #8B5CF6 50%, #3B82F6 100%)',
              }}>
              {/* Свечение на конце прогресс бара */}
              <motion.div
                className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, transparent 70%)',
                  filter: 'blur(8px)',
                }}
                animate={{
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </motion.div>
          </div>

          {/* Процент загрузки */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-4 font-mono text-sm">
            <span className="text-gray-400">Загрузка: </span>
            <span className="text-transparent bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text font-bold">
              {progress}%
            </span>
          </motion.div>

          {/* Анимированные точки загрузки */}
          <div className="flex gap-2 mt-4">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-500"
                animate={{
                  y: [0, -10, 0],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default PreLoader
