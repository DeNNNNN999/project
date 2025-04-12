import { useState } from 'react'
import { motion } from 'motion/react'

const Logo3D = () => {
  const [isHovered, setIsHovered] = useState(false)

  // Генерируем случайные символы для кода
  const codeSymbols = '><{}/=[]();'.split('')
  const generateRandomSymbol = () => codeSymbols[Math.floor(Math.random() * codeSymbols.length)]

  // Создаем спиральные пути для анимации
  const createSpiralPath = (turns: number, radius: number) => {
    let path = 'M 50 50'
    for (let i = 0; i <= turns * 20; i++) {
      const t = i / 20
      const r = radius * (1 - t / turns)
      const angle = t * Math.PI * 12
      const x = 50 + r * Math.cos(angle)
      const y = 50 + r * Math.sin(angle)
      path += ` L ${x} ${y}`
    }
    return path
  }

  return (
    <motion.div
      className="relative w-16 h-16 cursor-pointer"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.1 }}>
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Внешний круг портала */}
        <motion.circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke="url(#portal-gradient)"
          strokeWidth="2"
          animate={{
            rotate: isHovered ? 360 : 0,
            scale: isHovered ? [1, 1.1, 1] : 1,
            strokeWidth: isHovered ? [2, 4, 2] : 2,
          }}
          transition={{
            rotate: { duration: 10, repeat: Infinity, ease: 'linear' },
            scale: { duration: 1.5, repeat: Infinity },
            strokeWidth: { duration: 1.5, repeat: Infinity },
          }}
        />

        {/* Множественные спирали с кодом */}
        {[0, 1, 2].map(index => (
          <motion.path
            key={index}
            d={createSpiralPath(3, 35 - index * 5)}
            fill="none"
            stroke={`url(#spiral-gradient-${index})`}
            strokeWidth="1"
            strokeDasharray="3 3"
            animate={{
              rotate: isHovered ? [0, 360] : [0, 180],
              scale: isHovered ? [1, 1.1, 1] : 1,
            }}
            transition={{
              rotate: {
                duration: 15 - index * 2,
                repeat: Infinity,
                ease: 'linear',
              },
              scale: {
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              },
            }}
          />
        ))}

        {/* Анимированные символы кода */}
        {Array.from({ length: 12 }).map((_, i) => {
          const symbol = generateRandomSymbol()
          const angle = (i / 12) * Math.PI * 2
          const radius = 25
          const x = 50 + radius * Math.cos(angle)
          const y = 50 + radius * Math.sin(angle)
          
          return (
            <motion.circle
              key={i}
              cx={x}
              cy={y}
              r="2"
              fill="url(#text-gradient)"
              animate={{
                rotate: [0, 360],
                scale: isHovered ? [1, 1.2, 1] : 1,
                opacity: isHovered ? [0.4, 1, 0.4] : 0.4,
              }}
              transition={{
                rotate: {
                  duration: 20,
                  repeat: Infinity,
                  ease: 'linear',
                  delay: i * 0.5,
                },
                scale: {
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.1,
                },
              }}
            />
          )
        })}

        {/* Центральное свечение */}
        <motion.circle
          cx="50"
          cy="50"
          r="20"
          fill="url(#center-gradient)"
          animate={{
            scale: isHovered ? [1, 1.3, 1] : [1, 1.1, 1],
            opacity: isHovered ? [0.7, 1, 0.7] : [0.5, 0.7, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          filter="url(#glow)"
        />

        {/* Градиенты и фильтры */}
        <defs>
          <linearGradient id="portal-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6">
              <animate
                attributeName="stopColor"
                values="#3B82F6; #8B5CF6; #EC4899; #3B82F6"
                dur="4s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="100%" stopColor="#EC4899">
              <animate
                attributeName="stopColor"
                values="#EC4899; #3B82F6; #8B5CF6; #EC4899"
                dur="4s"
                repeatCount="indefinite"
              />
            </stop>
          </linearGradient>

          {[0, 1, 2].map(index => (
            <linearGradient key={index} id={`spiral-gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#60A5FA" stopOpacity={0.8 - index * 0.2} />
              <stop offset="100%" stopColor="#C084FC" stopOpacity={0.6 - index * 0.2} />
            </linearGradient>
          ))}

          <linearGradient id="text-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#93C5FD" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>

          <radialGradient id="center-gradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="70%" stopColor="#1D4ED8" />
            <stop offset="100%" stopColor="#1E3A8A" stopOpacity="0" />
          </radialGradient>

          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="glow"
            />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Внешнее свечение */}
        <motion.circle
          cx="50"
          cy="50"
          r="45"
          fill="url(#portal-gradient)"
          animate={{
            opacity: isHovered ? [0, 0.2, 0] : 0,
            scale: isHovered ? [0.8, 1.2, 0.8] : 1,
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          filter="url(#glow)"
          style={{ mixBlendMode: 'overlay' }}
        />
      </svg>
    </motion.div>
  )
}

export default Logo3D
