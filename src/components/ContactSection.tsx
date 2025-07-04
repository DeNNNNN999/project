import { useRef, useState } from 'react'
import { motion, useMotionValue, useTransform, useSpring } from 'motion/react'
import { Icon } from '@iconify/react'


interface Contact {
  title: string
  value: string
  icon: string
  link: string
  color: string
  hoverColor: string
}

const contacts: Contact[] = [
  {
    title: 'Email',
    value: 'dennface@mail.ru',
    icon: 'logos:google-gmail',
    link: 'mailto:dennface@mail.ru',
    color: '#EA4335',
    hoverColor: 'from-red-500 to-red-600'
  },
  {
    title: 'Telegram',
    value: '@Javascriptov_CPP_Pythonovich',
    icon: 'logos:telegram',
    link: 'https://t.me/Javascriptov_CPP_Pythonovich',
    color: '#26A5E4',
    hoverColor: 'from-blue-500 to-blue-600'
  },
  {
    title: 'GitHub',
    value: 'DeNNNNN999',
    icon: 'mdi:github',
    link: 'https://github.com/DeNNNNN999',
    color: '#6e5494',
    hoverColor: 'from-purple-500 to-purple-600'
  },
  {
    title: 'LinkedIn',
    value: 'Профессиональная сеть',
    icon: 'mdi:linkedin',
    link: 'https://www.linkedin.com/in/denis-goncharov-160585370/',
    color: '#0A66C2',
    hoverColor: 'from-blue-600 to-blue-700'
  }
]

// Компонент для 3D карточки контакта
const ContactCard = ({ contact, index }: { contact: Contact; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useTransform(mouseY, [-100, 100], [10, -10])
  const rotateY = useTransform(mouseX, [-100, 100], [-10, 10])

  const springRotateX = useSpring(rotateX, { stiffness: 300, damping: 30 })
  const springRotateY = useSpring(rotateY, { stiffness: 300, damping: 30 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    mouseX.set(e.clientX - centerX)
    mouseY.set(e.clientY - centerY)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
    setIsHovered(false)
  }

  return (
    <motion.a
      ref={cardRef}
      href={contact.link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformPerspective: 1000,
        transformStyle: 'preserve-3d'
      }}
      className="relative block"
    >
      <div className="relative p-8 overflow-hidden rounded-3xl backdrop-blur-xl border-2 border-white/30 bg-white/10 group">
        {/* Градиентный фон при наведении */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${contact.hoverColor} opacity-0`}
          animate={{ opacity: isHovered ? 0.1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Анимированные частицы */}
        {isHovered && (
          <div className="absolute inset-0">
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white/60 rounded-full"
                initial={{
                  x: Math.random() * 300,
                  y: Math.random() * 200,
                  scale: 0
                }}
                animate={{
                  y: -200,
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.1,
                  repeat: Infinity
                }}
              />
            ))}
          </div>
        )}

        {/* Световой эффект */}
        <motion.div
          className="absolute inset-0 opacity-0 pointer-events-none"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            background: `radial-gradient(circle at ${mouseX.get() + 150}px ${mouseY.get() + 100}px, rgba(255,255,255,0.2), transparent 40%)`
          }}
        />

        <div className="relative z-10 flex items-center gap-6">
          {/* Иконка с анимацией */}
          <motion.div
            className="relative"
            whileHover={{ scale: 1.2, rotate: 360 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          >
            <div className="absolute inset-0 rounded-2xl blur-lg"
              style={{ backgroundColor: contact.color, opacity: 0.3 }}
            />
            <div className="relative p-4 bg-white/20 backdrop-blur-md rounded-2xl border border-white/40">
              <Icon icon={contact.icon} className="w-10 h-10" style={{ color: contact.color }} />
            </div>
          </motion.div>

          {/* Текстовая информация */}
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white mb-1">{contact.title}</h3>
            <p className="text-white/80">{contact.value}</p>
          </div>

          {/* Стрелка */}
          <motion.div
            animate={{ x: isHovered ? 5 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <Icon icon="ph:arrow-up-right-bold" className="w-6 h-6 text-white/60" />
          </motion.div>
        </div>

        {/* Нижняя подсветка */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1"
          style={{ backgroundColor: contact.color }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.a>
  )
}

// Основной компонент
const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null)

  return (
    <section ref={sectionRef} id="contact" className="relative py-20 overflow-hidden">

      {/* Контент */}
      <div className="relative z-10 px-4 mx-auto max-w-7xl">
        {/* Заголовок секции */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          {/* Анимированный заголовок */}
          <motion.div
            className="inline-block mb-4"
            whileHover={{ scale: 1.05 }}
          >
            <h2 className="text-5xl md:text-6xl font-bold">
              <span className="text-transparent bg-gradient-to-r from-fuchsia-400 via-purple-500 to-violet-600 bg-clip-text">
                Контакты
              </span>
            </h2>
          </motion.div>

          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Свяжитесь со мной любым удобным способом
          </p>
        </motion.div>

        {/* Сетка контактов */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {contacts.map((contact, index) => (
            <ContactCard key={contact.title} contact={contact} index={index} />
          ))}
        </div>

        {/* Дополнительная информация */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-400">
            Предпочитаю общение в Telegram для быстрого ответа
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default ContactSection
