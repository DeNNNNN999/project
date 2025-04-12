import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Icon } from '@iconify/react'
import Logo3DProjects from './3DLOGOPROJECTS'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const projects = [
  {
    title: 'E-commerce Platform',
    description: 'Современная платформа электронной коммерции с микросервисной архитектурой и real-time обновлениями',
    features: [
      'Микросервисная архитектура',
      'Real-time обновления корзины',
      'Интеграция с платежными системами',
      'Админ-панель с аналитикой',
    ],
    technologies: ['Next.js', 'NestJS', 'PostgreSQL', 'Redis', 'Docker'],
    icon: 'ph:shopping-cart-bold',
    demoUrl: 'https://demo.example.com/ecommerce',
  },
  {
    title: 'Task Management System',
    description: 'Система управления задачами с drag-and-drop интерфейсом и real-time обновлениями',
    features: ['Real-time обновления', 'Drag-and-drop интерфейс', 'Интеграция с календарем', 'Система уведомлений'],
    technologies: ['React', 'TypeScript', 'Node.js', 'GraphQL', 'MongoDB'],
    icon: 'ph:list-checks-bold',
    demoUrl: 'https://demo.example.com/tasks',
  },
  {
    title: 'Analytics Dashboard',
    description: 'Интерактивная панель аналитики с визуализацией данных и real-time обновлениями',
    features: ['Real-time графики', 'Экспорт данных', 'Настраиваемые виджеты', 'API интеграции'],
    technologies: ['React', 'D3.js', 'Express', 'WebSocket', 'PostgreSQL'],
    icon: 'ph:chart-line-bold',
    demoUrl: 'https://demo.example.com/analytics',
  },
]

const ProjectCard = ({ project }: { project: (typeof projects)[0] }) => {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const rotateX = -(y - centerY) / 20
      const rotateY = (x - centerX) / 20

      gsap.to(card, {
        rotateX,
        rotateY,
        transformPerspective: 1000,
        duration: 0.5,
        ease: 'power2.out',
      })
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
  }, [])

  return (
    <div
      ref={cardRef}
      className="relative p-6 border cursor-pointer rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm will-change-transform group border-slate-700/50"
      style={{ transformStyle: 'preserve-3d' }}>
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-blue-500/10">
            <Icon icon={project.icon} className="text-3xl text-blue-400" />
          </div>
          <h3 className="text-xl font-bold text-white">{project.title}</h3>
        </div>

        <p className="mb-4 text-gray-400">{project.description}</p>

        <ul className="mb-6 space-y-2">
          {project.features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2 text-gray-300">
              <Icon icon="ph:check-circle" className="flex-shrink-0 text-emerald-500" />
              {feature}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.technologies.map((tech, index) => (
            <span key={index} className="px-3 py-1 text-sm text-blue-300 rounded-full bg-slate-800/50">
              {tech}
            </span>
          ))}
        </div>

        <a
          href={project.demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-blue-400 transition-colors hover:text-blue-300">
          <span>Открыть демо</span>
          <Icon icon="ph:arrow-right" />
        </a>
      </div>

      <div className="absolute inset-0 transition-opacity opacity-0 bg-gradient-to-r from-blue-500/0 via-blue-500/10 to-transparent group-hover:opacity-100 rounded-xl" />
    </div>
  )
}

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const backgroundRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const gradientAnimation = gsap.timeline({
      repeat: -1,
      yoyo: true,
    })

    gradientAnimation
      .to('.background-gradient', {
        backgroundPosition: '200% 200%',
        duration: 10,
        ease: 'none',
      })
      .to('.background-gradient', {
        backgroundPosition: '0% 0%',
        duration: 10,
        ease: 'none',
      })

    gsap.to('.parallax-bg', {
      y: '30%',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
    })

    return () => {
      gradientAnimation.kill()
    }
  }, [])

  return (
    <section id="projects" ref={sectionRef} className="relative py-20 overflow-hidden bg-[#0B1120]">
      <div className="absolute inset-0 parallax-bg">
        <div className="absolute inset-0 bg-grid-diagonal opacity-10" />
      </div>

      <div
        ref={backgroundRef}
        className="absolute inset-0 background-gradient"
        style={{
          background: 'linear-gradient(120deg, rgba(59,130,246,0.1), rgba(147,51,234,0.1), rgba(59,130,246,0.1))',
          backgroundSize: '200% 200%',
          filter: 'blur(100px)',
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-blue-900/50 to-slate-900/80 backdrop-blur-md" />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent animate-gradient-shift" />

      <div className="relative z-10 px-4 mx-auto max-w-7xl">
        <div className="text-center">
          <div className="mb-8">
            <Logo3DProjects />
          </div>
          <h2 className="mb-4 text-4xl font-bold text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text">
            Мои проекты
          </h2>
          <p className="max-w-2xl mx-auto mb-16 text-gray-400">
            Здесь представлены некоторые из моих последних проектов, демонстрирующих навыки в разработке современных
            веб-приложений
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project.title}
              className="transition-transform duration-300 transform project-card hover:-translate-y-2">
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProjectsSection
