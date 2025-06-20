import { useEffect, useRef, useState } from 'react'
import { motion, useMotionTemplate, useMotionValue, AnimatePresence } from 'motion/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Icon } from '@iconify/react'


if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface SoftSkill {
  name: string
  icon: string
  gradient: string
  description: string
  keywords: string[]
}

const softSkills: SoftSkill[] = [
  {
    name: 'Лидерство',
    icon: 'ph:crown-bold',
    gradient: 'from-amber-500 to-orange-600',
    description: 'Умение вести команду к общей цели, вдохновлять и мотивировать коллег',

    keywords: ['Мотивация', 'Видение', 'Стратегия', 'Делегирование']
  },
  {
    name: 'Коммуникация',
    icon: 'ph:chats-circle-bold',
    gradient: 'from-blue-500 to-indigo-600',
    description: 'Эффективное общение с клиентами, командой и стейкхолдерами',

    keywords: ['Презентации', 'Переговоры', 'Активное слушание', 'Эмпатия']
  },
  {
    name: 'Решение проблем',
    icon: 'ph:lightbulb-filament-bold',
    gradient: 'from-green-500 to-emerald-600',
    description: 'Системный подход к анализу сложных задач и поиску оптимальных решений',

    keywords: ['Анализ', 'Креативность', 'Логика', 'Инновации']
  },
  {
    name: 'Адаптивность',
    icon: 'ph:arrows-clockwise-bold',
    gradient: 'from-purple-500 to-pink-600',
    description: 'Быстрая адаптация к изменениям и новым технологиям',

    keywords: ['Гибкость', 'Обучаемость', 'Стрессоустойчивость', 'Открытость']
  },
  {
    name: 'Тайм-менеджмент',
    icon: 'ph:clock-countdown-bold',
    gradient: 'from-red-500 to-rose-600',
    description: 'Эффективное управление временем и приоритетами',

    keywords: ['Планирование', 'Дедлайны', 'Продуктивность', 'Фокус']
  },
  {
    name: 'Командная работа',
    icon: 'ph:users-three-bold',
    gradient: 'from-cyan-500 to-teal-600',
    description: 'Умение работать в команде и достигать синергии',

    keywords: ['Сотрудничество', 'Поддержка', 'Доверие', 'Результат']
  }
]

const SkillCard = ({ skill, index }: { skill: SoftSkill; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [isFlipped, setIsFlipped] = useState(false)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const rotateX = (y - centerY) / 10
      const rotateY = -(x - centerX) / 10

      gsap.to(card, {
        rotateX,
        rotateY,
        transformPerspective: 1000,
        duration: 0.5,
        ease: 'power2.out',
      })

      mouseX.set((x / rect.width) * 100)
      mouseY.set((y / rect.height) * 100)
    }

    const handleMouseLeave = () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.5,
        ease: 'power2.out',
      })
    }

    card.addEventListener('mousemove', handleMouseMove)
    card.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      card.removeEventListener('mousemove', handleMouseMove)
      card.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [mouseX, mouseY])

  return (
    <motion.div
      ref={cardRef}
      className="relative h-[400px] cursor-pointer"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsFlipped(!isFlipped)}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <motion.div
        className="absolute inset-0"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Передняя сторона карточки - Glassmorphism */}
        <motion.div
          className="absolute inset-0 rounded-3xl overflow-hidden backdrop-blur-xl border-2 border-white/40"
          style={{ 
            transformStyle: 'preserve-3d',
            backfaceVisibility: 'hidden',
            background: 'rgba(255, 255, 255, 0.2)',
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
          }}
        >
          {/* Градиентная подсветка */}
          <div className={`absolute inset-0 bg-gradient-to-br ${skill.gradient} opacity-15`} />
          
          {/* Анимированные частицы */}
          <div className="absolute inset-0">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-3 h-3 bg-white/80 rounded-full"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${10 + i * 20}%`,
                  boxShadow: '0 0 10px rgba(255, 255, 255, 0.8)',
                  filter: 'blur(0.5px)'
                }}
                animate={{
                  y: [-20, 20, -20],
                  x: [-10, 10, -10],
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 3 + i,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.5
                }}
              />
            ))}
          </div>
          
          {/* Бесконечная волна */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-32"
            style={{
              background: `linear-gradient(180deg, transparent, rgba(255,255,255,0.25))`,
            }}
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'linear'
            }}
          />

          {/* Интерактивное свечение */}
          <motion.div
            className="absolute inset-0 opacity-0 pointer-events-none"
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            style={{
              background: useMotionTemplate`
                radial-gradient(
                  circle 600px at ${mouseX}% ${mouseY}%,
                  rgba(255,255,255,0.3),
                  transparent 40%
                )
              `
            }}
          />

          {/* Контент карточки */}
          <div className="relative z-10 p-8 h-full flex flex-col">
            {/* Иконка */}
            <motion.div
              className="mb-6"
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            >
              <div className="w-20 h-20 bg-white/30 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/50">
                <Icon icon={skill.icon} className="w-12 h-12 text-white drop-shadow-lg" />
              </div>
            </motion.div>

            {/* Название */}
            <h3 className="text-3xl font-bold text-white mb-3">{skill.name}</h3>

            {/* Описание */}
            <p className="text-white/90 text-sm mb-6 flex-grow">{skill.description}</p>

            {/* Анимированные орбиты */}
            <div className="relative h-12 mb-4">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-white/70 to-transparent"
                  style={{ 
                    top: `${i * 16}px`,
                    filter: 'blur(0.5px)',
                    boxShadow: '0 0 8px rgba(255, 255, 255, 0.5)'
                  }}
                  animate={{
                    x: ['-100%', '100%'],
                    opacity: [0, 1, 0]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.5,
                    ease: 'linear'
                  }}
                />
              ))}
            </div>

            {/* Кнопка переворота */}
            <div className="flex items-center justify-center">
              <motion.div
                className="text-white/80 text-sm flex items-center gap-2"
                animate={{ x: isHovered ? [0, 5, 0] : 0 }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <span>Подробнее</span>
                <Icon icon="ph:arrow-right-bold" className="w-4 h-4" />
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Задняя сторона карточки - Glassmorphism */}
        <motion.div
          className="absolute inset-0 rounded-3xl overflow-hidden backdrop-blur-xl border-2 border-white/35"
          style={{ 
            transformStyle: 'preserve-3d',
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: 'rgba(255, 255, 255, 0.22)',
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
          }}
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${skill.gradient} opacity-15`} />
          
          {/* Круговые анимации */}
          <div className="absolute inset-0">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute border-2 border-white/35 rounded-full"
                style={{
                  width: `${100 + i * 50}px`,
                  height: `${100 + i * 50}px`,
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)'
                }}
                animate={{
                  rotate: 360,
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 10 + i * 5,
                  repeat: Infinity,
                  ease: 'linear'
                }}
              />
            ))}
          </div>
          
          <div className="relative z-10 p-8 h-full flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <Icon icon={skill.icon} className="w-8 h-8 text-white" />
              <h3 className="text-2xl font-bold text-white">{skill.name}</h3>
            </div>

            <div className="flex-grow">
              <h4 className="text-white/80 text-sm uppercase tracking-wider mb-4">Ключевые аспекты</h4>
              <div className="grid grid-cols-2 gap-3">
                {skill.keywords.map((keyword, idx) => (
                  <motion.div
                    key={keyword}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + idx * 0.1 }}
                    className="bg-white/25 backdrop-blur-md rounded-lg px-4 py-2 text-center border border-white/40 hover:bg-white/35 transition-all duration-300"
                  >
                    <span className="text-white/90 text-sm">{keyword}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Кнопка возврата */}
            <motion.button
              onClick={(e) => {
                e.stopPropagation()
                setIsFlipped(false)
              }}
              className="mt-6 text-white/80 text-sm flex items-center gap-2 mx-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon icon="ph:arrow-counter-clockwise-bold" className="w-4 h-4" />
              <span>Вернуться</span>
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

const SoftSkillsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Параллакс эффект для фона
    gsap.to('.soft-skills-bg', {
      y: '20%',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
    })

    // Анимация появления заголовка
    gsap.from('.section-title', {
      y: 50,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: '.section-title',
        start: 'top 80%',
      }
    })
  }, [])

  return (
    <section ref={sectionRef} className="relative py-20 overflow-hidden">

      {/* Контент */}
      <div className="relative z-10 px-4 mx-auto max-w-7xl">
        {/* Заголовок секции */}
        <motion.div
          className="text-center mb-16 section-title"
        >
          <motion.div
            className="inline-flex items-center gap-3 mb-4 px-6 py-2 bg-purple-500/10 rounded-full"
            whileHover={{ scale: 1.05 }}
          >
            <Icon icon="ph:sparkle-bold" className="w-5 h-5 text-purple-400" />
            <span className="text-purple-400 font-medium">Soft Skills</span>
            <Icon icon="ph:sparkle-bold" className="w-5 h-5 text-purple-400" />
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-transparent bg-gradient-to-r from-fuchsia-400 via-purple-500 to-violet-600 bg-clip-text">
              Мои софт скиллы
            </span>
          </h2>
          
          <p className="text-gray-400 max-w-2xl mx-auto">
            Технические навыки важны, но именно soft skills делают из хорошего разработчика — отличного
          </p>
        </motion.div>

        {/* Сетка карточек */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {softSkills.map((skill, index) => (
            <SkillCard key={skill.name} skill={skill} index={index} />
          ))}
        </div>

        {/* Дополнительная информация */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-gray-400 italic">
            "Soft skills — это инвестиция в карьеру, которая окупается на протяжении всей жизни"
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default SoftSkillsSection
