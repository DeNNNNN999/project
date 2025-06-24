import { useEffect, useRef, useState, useCallback, memo } from 'react'
import { motion } from 'motion/react'
import { Icon } from '@iconify/react'


// Структура проекта
interface Project {
  title: string
  description: string
  icon: string
  demoUrl?: string
  githubUrl?: string
  color: string
  technologies: string[]
  category?: string
}

// Реальные проекты
const projects: Project[] = [
  {
    title: 'Hyperion ORM',
    description: 'Легковесная ORM библиотека для TypeScript с поддержкой миграций и type-safety',
    icon: 'ph:database',
    githubUrl: 'https://github.com/DeNNNNN999/hyperion-orm',
    color: '#3B82F6',
    technologies: ['TypeScript', 'PostgreSQL', 'SQLite', 'Jest'],
    category: 'Library'
  },
  {
    title: 'React Headless Hooks',
    description: 'Коллекция переиспользуемых React хуков для создания headless UI компонентов',
    icon: 'ph:puzzle-piece',
    demoUrl: 'https://react-headless-hooks.vercel.app',
    githubUrl: 'https://github.com/DeNNNNN999/react-headless-hooks',
    color: '#8B5CF6',
    technologies: ['React', 'TypeScript', 'Storybook', 'Vitest'],
    category: 'Library'
  },
  {
    title: 'E-Commerce Platform',
    description: 'Современный интернет-магазин с корзиной, оплатой через Stripe и админ-панелью',
    icon: 'ph:shopping-cart',
    demoUrl: 'https://my-ecommerce.vercel.app',
    githubUrl: 'https://github.com/DeNNNNN999/ecommerce',
    color: '#EC4899',
    technologies: ['Next.js', 'Prisma', 'Stripe', 'Tailwind CSS'],
    category: 'Full-Stack'
  },
  {
    title: 'MyDeeplom',
    description: 'Платформа для создания и защиты дипломных работ с AI-ассистентом',
    icon: 'ph:graduation-cap',
    demoUrl: 'https://mydeeplom.ru',
    color: '#10B981',
    technologies: ['React', 'Node.js', 'OpenAI', 'MongoDB'],
    category: 'SaaS'
  },
  {
    title: 'Academic Management System',
    description: 'Система управления учебным процессом для университетов и колледжей',
    icon: 'ph:student',
    githubUrl: 'https://github.com/DeNNNNN999/academic-system',
    color: '#F59E0B',
    technologies: ['Vue.js', 'Express', 'PostgreSQL', 'Redis'],
    category: 'Enterprise'
  },
  {
    title: '3D Racing Game',
    description: 'Браузерная 3D гоночная игра с физикой и мультиплеером',
    icon: 'ph:game-controller',
    demoUrl: 'https://3d-racing-game.vercel.app',
    githubUrl: 'https://github.com/DeNNNNN999/3d-racing',
    color: '#EF4444',
    technologies: ['Three.js', 'React', 'WebGL', 'Socket.io'],
    category: 'Game'
  }
]

// Оптимизированный компонент карточки проекта
const ProjectCard = memo(({ project, index }: { project: Project; index: number }) => {
  const [isHovered, setIsHovered] = useState(false)
  
  const hexToRGBA = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    return `rgba(${r}, ${g}, ${b}, ${alpha})`
  }
  
  return (
    <motion.div
    className="relative overflow-hidden shadow-lg rounded-xl bg-slate-800/50 backdrop-blur-sm group transition-all duration-300 hover:shadow-xl"
    style={{ 
      borderTop: `2px solid ${project.color}`,
    }}
    initial={{ 
      opacity: 0, 
      y: 20
    }}
    animate={{ 
      opacity: 1, 
      y: 0
    }}
    transition={{ 
      duration: 0.5, 
      delay: index * 0.1,
      ease: "easeOut"
    }}
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
    whileHover={{ 
      y: -4,
      transition: { duration: 0.2 } 
    }}
    >
      
      {/* Текстовое содержимое */}
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div
            className="flex items-center justify-center p-2.5 rounded-lg bg-slate-700/50"
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
        
        <p className="mb-6 text-sm text-gray-400 leading-relaxed">
          {project.description}
        </p>
        
        {/* Технологии */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 text-xs rounded-full bg-slate-700/50 text-gray-300"
            >
              {tech}
            </span>
          ))}
        </div>
        
        {/* Кнопки действий */}
        <div className="flex gap-3">
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white transition-all rounded-lg bg-slate-700 hover:bg-slate-600"
            >
              <Icon icon="ph:arrow-square-out" className="w-4 h-4" />
              <span>Демо</span>
            </a>
          )}
          
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-300 transition-all bg-slate-700/50 rounded-lg hover:text-white hover:bg-slate-600/50"
            >
              <Icon icon="mdi:github" className="w-4 h-4" />
              <span>Код</span>
            </a>
          )}
        </div>
        
        {/* Категория проекта */}
        {project.category && (
          <div className="mt-4 pt-4 border-t border-slate-700">
            <span 
              className="text-xs font-medium"
              style={{ color: project.color }}
            >
              {project.category}
            </span>
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
