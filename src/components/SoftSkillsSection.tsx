import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, useMotionTemplate, useMotionValue, AnimatePresence } from 'motion/react'
import { useInView } from 'react-intersection-observer'
import { Icon } from '@iconify/react'

interface SoftSkill {
  name: string
  icon: string
  gradient: string
  description: string
  keywords: string[]
}

const softSkills: SoftSkill[] = [
  {
    name: 'Архитектурное мышление',
    icon: 'ph:blueprint-bold',
    gradient: 'from-amber-500 to-orange-600',
    description: 'Проектирование масштабируемых систем с учетом долгосрочной перспективы',
    keywords: ['Паттерны', 'Масштабирование', 'SOLID', 'Модульность']
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
  const { ref: inViewRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false
  })

  // Комбинируем refs
  useEffect(() => {
    if (cardRef.current) {
      inViewRef(cardRef.current)
    }
  }, [inViewRef])

  // Упрощенный mouse tracking с throttle
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!inView) return // Не обрабатываем если карточка не видна
    
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    mouseX.set((x / rect.width) * 100)
    mouseY.set((y / rect.height) * 100)
  }, [mouseX, mouseY, inView])

  return (
    <motion.div
      ref={cardRef}
      className="relative h-[400px] cursor-pointer"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      onClick={() => setIsFlipped(!isFlipped)}
      style={{ 
        transformStyle: 'preserve-3d',
        transform: inView ? undefined : 'translateY(50px)',
      }}
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
          
          {/* Анимированные частицы - только при hover и видимости */}
          <AnimatePresence>
            {isHovered && inView && (
              <div className="absolute inset-0">
                {[...Array(2)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-white/60 rounded-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{
                      left: `${30 + i * 40}%`,
                      top: `${30 + i * 30}%`,
                    }}
                  />
                ))}
              </div>
            )}
          </AnimatePresence>
          
          {/* Статичная волна с CSS анимацией при hover */}
          <div
            className="absolute bottom-0 left-0 right-0 h-32 opacity-50 transition-opacity duration-300 hover:opacity-80"
            style={{
              background: `linear-gradient(180deg, transparent, rgba(255,255,255,0.2))`,
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

            {/* Статичные линии */}
            <div className="relative h-8 mb-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
              </div>
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
          
          {/* Статичные круги с CSS hover эффектом */}
          <div className="absolute inset-0 opacity-20">
            <div 
              className="absolute border border-white/20 rounded-full transition-transform duration-300 hover:scale-105"
              style={{
                width: '150px',
                height: '150px',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)'
              }}
            />
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
  const { ref: titleRef, inView: titleInView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  return (
    <section ref={sectionRef} className="relative py-20 overflow-hidden">

      {/* Контент */}
      <div className="relative z-10 px-4 mx-auto max-w-7xl">
        {/* Заголовок секции */}
        <motion.div
          ref={titleRef}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={titleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
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
