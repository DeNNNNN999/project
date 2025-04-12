import { useState } from 'react'
import { motion } from 'motion/react'

const ProcessorLogo = () => {
  const [isHovered, setIsHovered] = useState(false)

  // Пути для цепей процессора
  const circuits = [
    'M 30 30 L 50 30 L 50 50 L 70 50',
    'M 30 70 L 60 70 L 60 40 L 70 40',
    'M 30 50 L 40 50 L 40 60 L 70 60',
    'M 70 30 L 80 30 L 80 70',
    'M 50 80 L 50 70 L 70 70',
  ]

  // Точки соединений
  const nodes = [
    { x: 30, y: 30 },
    { x: 50, y: 50 },
    { x: 70, y: 40 },
    { x: 80, y: 70 },
    { x: 30, y: 70 },
  ]

  return (
    <motion.div
      className="relative w-full h-full cursor-pointer"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.1 }}>
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Фоновая подложка процессора */}
        <motion.rect
          x="20"
          y="20"
          width="60"
          height="60"
          rx="5"
          fill="none"
          stroke="url(#processor-gradient)"
          strokeWidth="2"
          animate={{
            opacity: isHovered ? [0.5, 1, 0.5] : 0.5,
            strokeWidth: isHovered ? [2, 3, 2] : 2,
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Цепи процессора */}
        {circuits.map((path, index) => (
          <g key={index}>
            {/* Базовая линия */}
            <motion.path
              d={path}
              fill="none"
              stroke="url(#circuit-gradient)"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{
                pathLength: isHovered ? [0, 1, 1] : 1,
                opacity: isHovered ? [0.3, 1, 0.3] : 0.3,
              }}
              transition={{
                duration: 2,
                delay: index * 0.2,
                repeat: Infinity,
                ease: 'linear',
              }}
            />

            {/* Анимированный импульс */}
            <motion.path
              d={path}
              fill="none"
              stroke="url(#pulse-gradient)"
              strokeWidth="3"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{
                pathLength: [0, 0.3, 0],
                opacity: [0, 1, 0],
                pathOffset: [0, 1],
              }}
              transition={{
                duration: 2,
                delay: index * 0.2,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          </g>
        ))}

        {/* Точки соединений */}
        {nodes.map((node, index) => (
          <motion.circle
            key={index}
            cx={node.x}
            cy={node.y}
            r="3"
            fill="url(#node-gradient)"
            animate={{
              scale: isHovered ? [1, 1.5, 1] : [1, 1.2, 1],
              opacity: isHovered ? [0.5, 1, 0.5] : [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 1.5,
              delay: index * 0.1,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            filter="url(#glow)"
          />
        ))}

        {/* Градиенты и фильтры */}
        <defs>
          <linearGradient id="processor-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
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

          <linearGradient id="circuit-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#60A5FA" />
            <stop offset="100%" stopColor="#A78BFA" />
          </linearGradient>

          <linearGradient id="pulse-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0" />
            <stop offset="50%" stopColor="#60A5FA" />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
          </linearGradient>

          <radialGradient id="node-gradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#93C5FD" />
            <stop offset="100%" stopColor="#3B82F6" />
          </radialGradient>

          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="glow" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Эффект общего свечения */}
        <motion.circle
          cx="50"
          cy="50"
          r="35"
          fill="url(#processor-gradient)"
          initial={{ opacity: 0 }}
          animate={{
            opacity: isHovered ? [0, 0.2, 0] : [0, 0.1, 0],
            scale: isHovered ? [0.8, 1.2, 0.8] : [0.9, 1.1, 0.9],
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

export default ProcessorLogo
