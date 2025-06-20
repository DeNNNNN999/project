import { useEffect, useRef, useState, useCallback, memo } from 'react'
import { motion } from 'motion/react'
import { Icon } from '@iconify/react'


// Структура проекта
interface Project {
  title: string
  description: string
  icon: string
  videoUrl?: string
  posterUrl?: string // Превью для видео
  demoUrl: string
  githubUrl?: string
  color: string
  technologies: string[]
  category?: string
}

// Данные проектов - ЗАМЕНИ НА СВОИ РЕАЛЬНЫЕ ПРОЕКТЫ И ВИДЕО
const projects: Project[] = [
  {
    title: 'E-Commerce Platform',
    description: 'Полнофункциональный интернет-магазин с корзиной, оплатой и админ-панелью',
    icon: 'ph:shopping-cart-bold',
    videoUrl: '/videos/project-1.mp4', // Добавь свои видео в папку public/videos
    posterUrl: '/images/project-1-poster.jpg', // Добавь постеры
    demoUrl: 'https://your-project-1.com',
    githubUrl: 'https://github.com/yourusername/project-1',
    color: '#3B82F6',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    category: 'Full-Stack'
  },
  {
    title: 'Social Media Dashboard',
    description: 'Аналитическая панель для социальных сетей с визуализацией данных',
    icon: 'ph:chart-line-bold',
    videoUrl: '/videos/project-2.mp4',
    posterUrl: '/images/project-2-poster.jpg',
    demoUrl: 'https://your-project-2.com',
    githubUrl: 'https://github.com/yourusername/project-2',
    color: '#8B5CF6',
    technologies: ['Next.js', 'TypeScript', 'D3.js', 'PostgreSQL'],
    category: 'Analytics'
  },
  {
    title: 'Task Management App',
    description: 'Приложение для управления задачами с drag-and-drop и real-time обновлениями',
    icon: 'ph:kanban-bold',
    videoUrl: '/videos/project-3.mp4',
    posterUrl: '/images/project-3-poster.jpg',
    demoUrl: 'https://your-project-3.com',
    githubUrl: 'https://github.com/yourusername/project-3',
    color: '#EC4899',
    technologies: ['React', 'Socket.io', 'Redis', 'Docker'],
    category: 'Real-time'
  },
  {
    title: 'Video Streaming Platform',
    description: 'Платформа для стриминга видео с адаптивным битрейтом и комментариями',
    icon: 'ph:video-bold',
    videoUrl: '/videos/project-4.mp4',
    posterUrl: '/images/project-4-poster.jpg',
    demoUrl: 'https://your-project-4.com',
    githubUrl: 'https://github.com/yourusername/project-4',
    color: '#10B981',
    technologies: ['React', 'WebRTC', 'HLS.js', 'AWS'],
    category: 'Streaming'
  },
  {
    title: 'AI Chat Assistant',
    description: 'Интеллектуальный чат-бот с поддержкой естественного языка',
    icon: 'ph:robot-bold',
    videoUrl: '/videos/project-5.mp4',
    posterUrl: '/images/project-5-poster.jpg',
    demoUrl: 'https://your-project-5.com',
    githubUrl: 'https://github.com/yourusername/project-5',
    color: '#F59E0B',
    technologies: ['React', 'OpenAI API', 'Node.js', 'WebSockets'],
    category: 'AI/ML'
  },
  {
    title: 'Portfolio Builder',
    description: 'Конструктор портфолио с готовыми шаблонами и кастомизацией',
    icon: 'ph:palette-bold',
    videoUrl: '/videos/project-6.mp4',
    posterUrl: '/images/project-6-poster.jpg',
    demoUrl: 'https://your-project-6.com',
    githubUrl: 'https://github.com/yourusername/project-6',
    color: '#6366F1',
    technologies: ['Next.js', 'Tailwind CSS', 'Prisma', 'Vercel'],
    category: 'SaaS'
  }
]

// Оптимизированный компонент карточки проекта
const ProjectCard = memo(({ project, index }: { project: Project; index: number }) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const [videoError, setVideoError] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  // Intersection Observer для lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => observer.disconnect()
  }, [])
  
  const handleVideoLoad = useCallback(() => {
    setIsVideoLoaded(true)
  }, [])
  
  const handleVideoError = useCallback(() => {
    setVideoError(true)
    console.warn(`Видео не найдено: ${project.videoUrl}`)
  }, [project.videoUrl])
  
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
      video.currentTime = 0
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
    className="relative overflow-hidden shadow-lg rounded-2xl backdrop-blur-xl group transition-all duration-300"
    style={{ 
    background: `linear-gradient(135deg, ${hexToRGBA(project.color, 0.1)} 0%, rgba(0,0,0,0.5) 50%, ${hexToRGBA(project.color, 0.05)} 100%)`,
    border: `1px solid ${hexToRGBA(project.color, 0.3)}`,
    boxShadow: `0 10px 30px -15px ${hexToRGBA(project.color, 0.5)}`,
    }}
    initial={{ 
      opacity: 0, 
      y: index % 2 === 0 ? 50 : -30,
      x: index % 3 === 0 ? -30 : index % 3 === 1 ? 30 : 0,
      rotateY: index % 2 === 0 ? -5 : 5
    }}
    animate={isInView ? { 
      opacity: 1, 
      y: 0,
      x: 0,
      rotateY: 0
    } : {}}
    transition={{ 
      duration: 0.6, 
      delay: index * 0.15,
      ease: [0.25, 0.1, 0.25, 1]
    }}
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
    whileHover={{ 
      y: index % 2 === 0 ? -8 : -5, 
      scale: index % 3 === 0 ? 1.03 : 1.02,
      rotateY: index % 3 === 1 ? 2 : 0,
      rotateX: index % 3 === 2 ? -1 : 0,
      transition: { duration: 0.3, ease: "easeOut" } 
    }}
    >
    {/* Уникальное свечение для каждой карточки */}
    <div
    className="absolute inset-0 opacity-0 transition-all duration-500 group-hover:opacity-40"
    style={{
    background: `radial-gradient(circle at ${index % 2 === 0 ? '30% 30%' : '70% 70%'}, ${hexToRGBA(project.color, 0.4)}, transparent 70%)`,
    filter: 'blur(60px)',
    }}
    />
      
      {/* Декоративные элементы */}
      <div 
        className="absolute top-0 left-0 right-0 h-1 opacity-70"
        style={{ 
          background: `linear-gradient(90deg, transparent, ${project.color}, transparent)` 
        }} 
      />
      
      {/* Номер проекта */}
      <div 
        className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300 group-hover:scale-110 z-10"
        style={{ 
          background: `${hexToRGBA(project.color, 0.2)}`,
          border: `2px solid ${hexToRGBA(project.color, 0.5)}`,
          boxShadow: `0 0 20px ${hexToRGBA(project.color, 0.3)}`
        }}
      >
        <span className="text-sm font-bold" style={{ color: project.color }}>
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>
      
      {/* Уникальный паттерн для каждой карточки */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ 
          backgroundImage: index % 3 === 0 
            ? `radial-gradient(${hexToRGBA(project.color, 0.3)} 1px, transparent 1px)`
            : index % 3 === 1
            ? `linear-gradient(45deg, ${hexToRGBA(project.color, 0.1)} 25%, transparent 25%), linear-gradient(-45deg, ${hexToRGBA(project.color, 0.1)} 25%, transparent 25%)`
            : `linear-gradient(${hexToRGBA(project.color, 0.1)} 1px, transparent 1px), linear-gradient(90deg, ${hexToRGBA(project.color, 0.1)} 1px, transparent 1px)`,
          backgroundSize: index % 3 === 0 ? '20px 20px' : index % 3 === 1 ? '40px 40px' : '20px 20px',
        }} 
      />
      
      {/* Видео секция */}
      <div className="relative w-full overflow-hidden bg-slate-900 aspect-video">
        {project.videoUrl && !videoError ? (
          <>
            {/* Индикатор загрузки */}
            {!isVideoLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-slate-900">
                <div className="w-8 h-8 border-2 border-purple-500 rounded-full animate-spin border-t-transparent" />
              </div>
            )}
            
            {/* Видео с ленивой загрузкой */}
            {isInView && (
              <video
                ref={videoRef}
                src={project.videoUrl}
                poster={project.posterUrl}
                className="object-cover w-full h-full"
                loop
                muted
                playsInline
                preload="none" // Важно для производительности
                onLoadedData={handleVideoLoad}
                onError={handleVideoError}
              />
            )}
            
            {/* Play иконка */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center bg-black/40 pointer-events-none"
              initial={{ opacity: 1 }}
              animate={{ opacity: isHovered ? 0 : 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-center w-12 h-12 bg-white/20 backdrop-blur rounded-full">
                <Icon icon="ph:play-fill" className="w-6 h-6 text-white ml-0.5" />
              </div>
            </motion.div>
          </>
        ) : (
          <div className="flex items-center justify-center w-full h-full bg-slate-900/50">
            <Icon 
              icon={project.icon} 
              className="w-16 h-16 opacity-50" 
              style={{ color: project.color }}
            />
          </div>
        )}
      </div>
      
      {/* Текстовое содержимое */}
      <div className="p-6 pb-14 relative">
        <div className="flex items-center gap-3 mb-3">
          <div
            className="flex items-center justify-center p-2 rounded-lg"
            style={{ backgroundColor: `${hexToRGBA(project.color, 0.2)}` }}
          >
            <Icon 
              icon={project.icon} 
              className="w-5 h-5" 
              style={{ color: project.color }}
            />
          </div>
          
          <h3 className="text-lg font-bold">
            <span className="bg-gradient-to-r bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(135deg, ${project.color} 0%, ${hexToRGBA(project.color, 0.7)} 50%, white 100%)`
              }}>
              {project.title}
            </span>
          </h3>
        </div>
        
        <p className="mb-4 text-sm text-gray-300 line-clamp-2">
          {project.description}
        </p>
        
        {/* Технологии */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.technologies.slice(0, 4).map((tech, techIndex) => (
            <span
              key={tech}
              className="px-2 py-1 text-xs rounded transition-all duration-200 hover:scale-105"
              style={{
                background: `${hexToRGBA(project.color, 0.15)}`,
                border: `1px solid ${hexToRGBA(project.color, 0.3)}`,
                color: techIndex === 0 ? project.color : 'rgba(255,255,255,0.8)'
              }}
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="px-2 py-1 text-xs text-gray-400">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>
        
        {/* Кнопки действий */}
        <div className="flex gap-2">
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-white transition-all rounded-lg hover:scale-105"
            style={{ 
              background: `${hexToRGBA(project.color, 0.2)}`,
              border: `1px solid ${hexToRGBA(project.color, 0.3)}`
            }}
          >
            <Icon icon="ph:arrow-square-out" className="w-4 h-4" />
            <span>Демо</span>
          </a>
          
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-300 transition-all bg-slate-700/50 rounded-lg hover:text-white hover:scale-105"
            >
              <Icon icon="mdi:github" className="w-4 h-4" />
              <span>Код</span>
            </a>
          )}
        </div>
        
        {/* Категория проекта */}
        {project.category && (
          <div className="absolute bottom-3 left-6 right-6">
            <div className="flex items-center justify-between py-2 px-3 rounded-lg" 
              style={{ 
                background: `${hexToRGBA(project.color, 0.1)}`,
                border: `1px solid ${hexToRGBA(project.color, 0.2)}` 
              }}
            >
              <span className="text-xs text-gray-400">Категория</span>
              <span 
                className="text-xs font-bold tracking-wider uppercase"
                style={{ color: project.color }}
              >
                {project.category}
              </span>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
})

ProjectCard.displayName = 'ProjectCard'

// Главный компонент секции проектов
const ProjectsSection = () => {
  return (
    <section id="projects" className="relative py-20 overflow-hidden">
      
      <div className="relative z-10 px-4 mx-auto max-w-7xl">
        <motion.div 
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="mb-6 text-5xl font-bold text-transparent bg-gradient-to-r from-fuchsia-400 via-purple-500 to-violet-600 bg-clip-text animate-gradient">
            Мои проекты
          </h2>
        </motion.div>
        
        {/* Сетка проектов */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>


      </div>
    </section>
  )
}

export default ProjectsSection
