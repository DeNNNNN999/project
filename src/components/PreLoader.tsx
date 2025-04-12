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
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-900">
          <div className="relative">
            {/* Внешний круг */}
            <motion.div
              className="absolute rounded-full -inset-8 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-20 blur-xl"
              animate={{
                scale: [1, 1.2, 1],
                rotate: 360,
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'linear',
              }}
            />

            {/* React логотип */}
            <motion.div
              animate={{
                rotate: 360,
                scale: [1, 1.1, 1],
              }}
              transition={{
                rotate: {
                  duration: 2,
                  ease: 'linear',
                  repeat: Infinity,
                },
                scale: {
                  duration: 1,
                  repeat: Infinity,
                  ease: 'easeInOut',
                },
              }}
              className="relative">
              <Icon icon="logos:react" className="w-24 h-24" />
            </motion.div>
          </div>

          {/* Прогресс бар */}
          <div className="w-48 h-1 mt-8 overflow-hidden rounded-full bg-slate-800">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
            />
          </div>

          {/* Процент загрузки */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 font-mono text-sm text-slate-400">
            Loading... {progress}%
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default PreLoader
