import React from 'react'
import { motion } from 'motion/react'

const AnimatedBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-[#0F172A]" /> {/* Темно-синий фон */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-[#0F172A]" />
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'radial-gradient(circle at 25px 25px, rgba(255, 255, 255, 0.2) 2px, transparent 0)',
          backgroundSize: '50px 50px',
        }}
      />
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 3 + 1,
            height: Math.random() * 3 + 1,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: `rgba(${Math.floor(Math.random() * 100 + 100)}, ${Math.floor(
              Math.random() * 100 + 100,
            )}, ${Math.floor(Math.random() * 255)}, ${Math.random() * 0.4 + 0.1})`,
            boxShadow: '0 0 8px rgba(120, 120, 255, 0.3)',
          }}
          animate={{
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: Math.random() * 5 + 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

export default AnimatedBackground
