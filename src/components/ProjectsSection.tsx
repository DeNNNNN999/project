import { useEffect, useRef, useState, useCallback, memo } from 'react'
import { motion, useSpring, useMotionTemplate, useMotionValue } from 'motion/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Icon } from '@iconify/react'
import Logo3DProjects from './3DLOGOPROJECTS'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// Структура проекта
interface Project {
  title: string
  description: string
  icon: string
  videoUrl?: string
  posterUrl?: string // Добавил превью для видео
  demoUrl: string
  githubUrl?: string // Добавил GitHub ссылку
  color: string
  technologies: string[] // Добавил технологии
}

// Данные проектов - ЗДЕСЬ МЕНЯЙ НА СВОИ ВИДЕО И ДАННЫЕ
const projects: Project[] = [
  {
    title: 'E-Commerce Platform',
    description: 'Полнофункциональный интернет-магазин с корзиной, оплатой и админ-панелью',
    icon: 'ph:shopping-cart-bold',
    videoUrl: '/videos/project-1.mp4', // Замени на свое видео
    posterUrl: '/videos/project-1-poster.jpg', // Превью видео
    demoUrl: 'https://your-project-1.com',
    githubUrl: 'https://github.com/yourusername/project-1',
    color: '#3B82F6',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe']
  },
  {
    title: 'Social Media Dashboard',
    description: 'Аналитическая панель для социальных сетей с визуализацией данных',
    icon: 'ph:chart-line-bold',
    videoUrl: '/videos/project-2.mp4',
    posterUrl: '/videos/project-2-poster.jpg',
    demoUrl: 'https://your-project-2.com',
    githubUrl: 'https://github.com/yourusername/project-2',
    color: '#8B5CF6',
    technologies: ['Next.js', 'TypeScript', 'D3.js', 'PostgreSQL']
  },
  {
    title: 'Task Management App',
    description: 'Приложение для управления задачами с drag-and-drop и real-time обновлениями',
    icon: 'ph:kanban-bold',
    videoUrl: '/videos/project-3.mp4',
    posterUrl: '/videos/project-3-poster.jpg',
    demoUrl: 'https://your-project-3.com',
    githubUrl: 'https://github.com/yourusername/project-3',
    color: '#EC4899',
    technologies: ['React', 'Socket.io', 'Redis', 'Docker']
  },
  {
    title: 'Video Streaming Platform',
    description: 'Платформа для стриминга видео с адаптивным битрейтом и комментариями',
    icon: 'ph:video-bold',
    videoUrl: '/videos/project-4.mp4',
    posterUrl: '/videos/project-4-poster.jpg',
    demoUrl: 'https://your-project-4.com',
    githubUrl: 'https://github.com/yourusername/project-4',
    color: '#10B981',
    technologies: ['React', 'WebRTC', 'HLS.js', 'AWS']
  },
  {
    title: 'AI Chat Assistant',
    description: 'Интеллектуальный чат-бот с поддержкой естественного языка',
    icon: 'ph:robot-bold',
    videoUrl: '/videos/project-5.mp4',
    posterUrl: '/videos/project-5-poster.jpg',
    demoUrl: 'https://your-project-5.com',
    githubUrl: 'https://github.com/yourusername/project-5',
    color: '#F59E0B',
    technologies: ['React', 'OpenAI API', 'Node.js', 'WebSockets']
  },
  {
    title: 'Portfolio Builder',
    description: 'Конструктор портфолио с готовыми шаблонами и кастомизацией',
    icon: 'ph:palette-bold',
    videoUrl: '/videos/project-6.mp4',
    posterUrl: '/videos/project-6-poster.jpg',
    demoUrl: 'https://your-project-6.com',
    githubUrl: 'https://github.com/yourusername/project-6',
    color: '#6366F1',
    technologies: ['Next.js', 'Tailwind CSS', 'Prisma', 'Vercel']
  }
]

// Оптимизированный компонент карточки проекта
const ProjectCard = memo(({ project, index }: { project: Project; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const [videoError, setVideoError] = useState(false)
  
  // Motion values для интерактивного свечения
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  // Пружинная анимация
  const springConfig = { damping: 30, stiffness: 200 }
  const mouseXSpring = useSpring(mouseX, springConfig)
  const mouseYSpring = useSpring(mouseY, springConfig)
  
  // Оптимизированный обработчик движения мыши
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    mouseX.set((x / rect.width) * 100)
    mouseY.set((y / rect.height) * 100)
  }, [mouseX, mouseY])
  
  // Обработка видео
  const handleVideoLoad = useCallback(() => {
    setIsVideoLoaded(true)
  }, [])
  
  const handleVideoError = useCallback(() => {
    setVideoError(true)
    console.error(`Ошибка загрузки видео для проекта: ${project.title}`)
  }, [project.title])
  
  // Воспроизведение видео при наведении
  useEffect(() => {
    const video = videoRef.current
    if (!video || !isVideoLoaded || videoError) return
    
    if (isHovered) {
      video.play().catch(() => {
        // Игнорируем ошибку автовоспроизведения
      })
    } else {
      video.pause()
      video.currentTime = 0 // Сброс к началу
    }
  }, [isHovered, isVideoLoaded, videoError])
  
  const hexToRGBA = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    return `rgba(${r}, ${g}, ${b}, ${alpha})`
  }
  
  return (
    <motion.div
      ref={cardRef}
      className="relative overflow-hidden shadow-lg rounded-2xl bg-slate-800/40 backdrop-blur-md will-change-transform"
      style={{ 
        transformStyle: 'preserve-3d',
        boxShadow: `0 10px 30px -15px ${hexToRGBA(project.color, 0.3)}`,
        height: '450px'
      }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-10%" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -10 }}
    >
      {/* Фоновое свечение */}
      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, ${hexToRGBA(project.color, 0.4)}, transparent 70%)`,
          filter: 'blur(20px)',
        }}
      />
      
      {/* Интерактивное свечение */}
      <motion.div
        className="absolute inset-0 opacity-0 transition-opacity duration-300 pointer-events-none"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              circle at ${mouseXSpring}% ${mouseYSpring}%,
              ${hexToRGBA(project.color, 0.3)},
              transparent 60%
            )
          `,
          opacity: isHovered ? 1 : 0
        }}
      />
      
      {/* Декоративная линия */}
      <div 
        className="absolute top-0 left-0 right-0 h-1"
        style={{ 
          background: `linear-gradient(90deg, transparent, ${project.color}, transparent)` 
        }} 
      />
      
      {/* Видео секция */}
      <div className="relative w-full overflow-hidden bg-black aspect-video">
        {project.videoUrl && !videoError ? (
          <>
            {/* Индикатор загрузки */}
            {!isVideoLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-slate-900">
                <div className="w-8 h-8 border-2 border-blue-500 rounded-full animate-spin border-t-transparent" />
              </div>
            )}
            
            {/* Видео */}
            <video
              ref={videoRef}
              src={project.videoUrl}
              poster={project.posterUrl}
              className="object-cover w-full h-full"
              loop
              muted
              playsInline
              preload="metadata"
              onLoadedData={handleVideoLoad}
              onError={handleVideoError}
            />
            
            {/* Play иконка при наведении */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center bg-black/40 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 0 : 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-center w-12 h-12 bg-white/20 backdrop-blur rounded-full">
                <Icon icon="ph:play-fill" className="w-6 h-6 text-white ml-0.5" />
              </div>
            </motion.div>
          </>
        ) : (
          <div className="flex items-center justify-center w-full h-full bg-slate-900">
            <Icon 
              icon={project.icon} 
              className="w-16 h-16" 
              style={{ color: project.color }}
            />
          </div>
        )}
        
        {/* Градиент внизу видео */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-800/95 to-transparent"></div>
      </div>
      
      {/* Текстовое содержимое */}
      <div className="relative flex flex-col h-full p-6">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <div
              className="flex items-center justify-center p-2 rounded-lg"
              style={{ backgroundColor: `${hexToRGBA(project.color, 0.2)}` }}
            >
              <Icon 
                icon={project.icon} 
                className="w-6 h-6" 
                style={{ color: project.color }}
              />
            </div>
            
            <h3 className="text-xl font-bold text-white">
              {project.title}
            </h3>
          </div>
          
          <p className="mb-4 text-sm text-gray-300">{project.description}</p>
          
          {/* Технологии */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 text-xs text-gray-300 bg-slate-700/50 rounded-md"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
        
        {/* Кнопки действий */}
        <div className="flex gap-3">
          <motion.a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white transition-colors rounded-full"
            style={{ 
              background: `linear-gradient(90deg, ${hexToRGBA(project.color, 0.3)}, ${hexToRGBA(project.color, 0.1)})`,
              border: `1px solid ${hexToRGBA(project.color, 0.3)}`
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Icon icon="ph:arrow-square-out-bold" />
            <span>Демо</span>
          </motion.a>
          
          {project.githubUrl && (
            <motion.a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-300 transition-colors bg-slate-700/50 rounded-full hover:text-white"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon icon="mdi:github" />
              <span>GitHub</span>
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  )
})

ProjectCard.displayName = 'ProjectCard'

// Главный компонент секции проектов
const ProjectsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    // Простая анимация фона
    const tl = gsap.timeline({ repeat: -1 })
    tl.to('.gradient-bg', {
      backgroundPosition: '100% 100%',
      duration: 20,
      ease: 'none'
    })
    
    return () => {
      tl.kill()
    }
  }, [])
  
  return (
    <section id="projects" ref={sectionRef} className="relative py-20 overflow-hidden bg-[#0B1120]">
      {/* Упрощенный фон */}
      <div 
        className="absolute inset-0 opacity-30 gradient-bg"
        style={{
          background: 'linear-gradient(135deg, rgba(59,130,246,0.1) 0%, rgba(147,51,234,0.1) 50%, rgba(59,130,246,0.1) 100%)',
          backgroundSize: '200% 200%',
          filter: 'blur(60px)'
        }}
      />
      
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/90 via-slate-900/80 to-slate-900/90" />
      
      {/* Контент */}
      <div className="relative z-10 px-4 mx-auto max-w-7xl">
        <motion.div 
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="mb-8">
            <Logo3DProjects />
          </div>
          <h2 className="mb-4 text-4xl font-bold text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text">
            Мои проекты
          </h2>
          <p className="max-w-2xl mx-auto text-gray-400">
            Портфолио избранных работ, демонстрирующих мой опыт в разработке современных веб-приложений
          </p>
        </motion.div>
        
        {/* Сетка проектов */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProjectsSection
