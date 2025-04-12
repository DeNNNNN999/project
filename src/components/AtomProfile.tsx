import { useState } from 'react'
import { motion } from 'motion/react'
import { Icon } from '@iconify/react'

const AtomProfile = () => {
  const [isHovered, setIsHovered] = useState(false)

  const techs = [
    { icon: 'logos:react', color: '#61DAFB', baseDelay: 0 },
    { icon: 'logos:typescript-icon', color: '#3178C6', baseDelay: 0.2 },
    { icon: 'logos:nodejs-icon', color: '#539E43', baseDelay: 0.4 },
    { icon: 'logos:mongodb-icon', color: '#47A248', baseDelay: 0.6 },
    { icon: 'logos:nextjs-icon', color: '#ffffff', baseDelay: 0.8 },
  ]

  return (
    <motion.div
      className="relative w-[400px] h-[400px]"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}>
      {/* Орбиты технологий */}
      {techs.map((tech, index) => (
        <motion.div
          key={index}
          className="absolute inset-0"
          style={{
            transformStyle: 'preserve-3d',
            transform: `rotateZ(${(360 / techs.length) * index}deg)`,
          }}>
          {/* Орбита */}
          <motion.div
            className="absolute inset-0 border-2 border-transparent rounded-full"
            style={{
              background: `linear-gradient(90deg, ${tech.color}30, transparent 50%, ${tech.color}30)`,
              mask: 'linear-gradient(#fff, #fff) padding-box, linear-gradient(#fff, #fff)',
              maskComposite: 'exclude',
            }}
            animate={{
              rotate: isHovered ? 360 : 0,
              scale: isHovered ? [1, 1.1, 1] : 1,
            }}
            transition={{
              rotate: { duration: 20 - index * 2, repeat: Infinity, ease: 'linear' },
              scale: { duration: 1, repeat: Infinity },
            }}
          />

          {/* Иконка на орбите */}
          <motion.div
            className="absolute"
            style={{
              top: '50%',
              left: '50%',
              transform: `translateX(180px) translateY(-50%)`,
            }}
            animate={{
              rotate: isHovered ? -360 : 0,
              scale: isHovered ? [1, 1.2, 1] : 1,
            }}
            transition={{
              rotate: { duration: 20 - index * 2, repeat: Infinity, ease: 'linear' },
              scale: { duration: 1, repeat: Infinity, delay: tech.baseDelay },
            }}>
            <div
              className="p-3 border rounded-full bg-slate-800/80 backdrop-blur-sm border-slate-700/50 hover:border-slate-600">
              <Icon icon={tech.icon} className="w-6 h-6" />
            </div>
          </motion.div>
        </motion.div>
      ))}

      {/* Центральный круг с фото */}
      <motion.div
        className="absolute w-64 h-64 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
        animate={{
          scale: isHovered ? 1.1 : 1,
          rotate: isHovered ? [0, 360] : 0,
        }}
        transition={{
          scale: { duration: 0.3 },
          rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
        }}>
        <div className="relative w-full h-full">
          {/* Градиентная рамка */}
          <div className="absolute inset-0 p-1 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
            <div className="w-full h-full overflow-hidden rounded-full bg-slate-900">
              <img src="/api/placeholder/300/300" alt="Your Photo" className="object-cover w-full h-full" />
            </div>
          </div>

          {/* Свечение при наведении */}
          <motion.div
            className="absolute rounded-full -inset-4"
            animate={{
              opacity: isHovered ? 0.4 : 0,
            }}
            style={{
              background: 'radial-gradient(circle at center, rgba(59,130,246,0.5), transparent 70%)',
              filter: 'blur(10px)',
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  )
}

export default AtomProfile
