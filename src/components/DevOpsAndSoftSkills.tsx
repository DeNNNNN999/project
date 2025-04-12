import { useEffect, useRef } from 'react'
import { motion, useMotionTemplate, useMotionValue } from 'motion/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Icon } from '@iconify/react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface Skill {
  name: string
  icon: string
  color: string

  category: 'devops' | 'soft'
}

const skills: Skill[] = [
  // DevOps Skills
  {
    name: 'Git',
    icon: 'logos:git',
    color: '#F05032',

    category: 'devops',
  },
  {
    name: 'GitHub',
    icon: 'logos:github-icon',
    color: '#181717',

    category: 'devops',
  },
  {
    name: 'Docker',
    icon: 'logos:docker-icon',
    color: '#2496ED',

    category: 'devops',
  },
  {
    name: 'Prometheus',
    icon: 'logos:prometheus',
    color: '#E6522C',

    category: 'devops',
  },
  {
    name: 'Python',
    icon: 'logos:python',
    color: '#3776AB',
    category: 'devops',
  },
  {
    name: 'Selenium',
    icon: 'logos:selenium',
    color: '#43B02A',
    category: 'devops',
  },
  {
    name: 'Jest',
    icon: 'logos:jest',
    color: '#C21325',
    category: 'devops',
  },
  {
    name: 'Cypress',
    icon: 'logos:cypress',
    color: '#17202C',
    category: 'devops',
  },

  // Soft Skills
  {
    name: 'Адаптивность',
    icon: 'ph:brain-bold',
    color: '#FF00FF',
    category: 'soft',
  },
  {
    name: 'Командная работа',
    icon: 'ph:users-three-bold',
    color: '#FF00FF',
    category: 'soft',
  },
  {
    name: 'Критическое мышление',
    icon: 'ph:lightbulb-bold',
    color: '#FF00FF',
    category: 'soft',
  },
  {
    name: 'Коммуникация',
    icon: 'ph:chats-bold',
    color: '#FF00FF',
    category: 'soft',
  },
]

const SkillCard = ({ skill }: { skill: Skill }) => {
  const cardRef = useRef<HTMLDivElement>(null)
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

      const rotateX = -(y - centerY) / 20
      const rotateY = (x - centerX) / 20

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
      className="relative p-6 overflow-hidden cursor-pointer rounded-2xl backdrop-blur-sm will-change-transform group"
      style={{ transformStyle: 'preserve-3d' }}>
      {/* Градиентный фон */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-800/50 to-slate-900/50" />

      {/* Эффект свечения при наведении */}
      <motion.div
        className="absolute inset-0 transition-opacity duration-500 opacity-0 pointer-events-none group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              circle at ${mouseX}% ${mouseY}%,
              rgba(255,0,255,0.15),
              transparent 80%
            )
          `,
        }}
      />

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <motion.div
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            className="p-3 rounded-xl bg-fuchsia-500/10">
            <Icon icon={skill.icon} className="w-8 h-8 text-fuchsia-400" />
          </motion.div>
          <h3 className="text-lg font-semibold text-white">{skill.name}</h3>
        </div>
      </div>

      {/* Нижняя градиентная линия */}
      <div className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-fuchsia-500/0 via-fuchsia-500/50 to-fuchsia-500/0" />
    </motion.div>
  )
}

const DevOpsAndSoftSkills = () => {
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
    <section ref={sectionRef} className="relative py-20 overflow-hidden bg-[#0B1120]">
      {/* Parallax Background */}
      <div className="absolute inset-0 parallax-bg">
        <div className="absolute inset-0 bg-grid-diagonal opacity-10" />
      </div>

      {/* Animated Gradient Background */}
      <div
        ref={backgroundRef}
        className="absolute inset-0 background-gradient"
        style={{
          background: 'linear-gradient(120deg, rgba(255,0,255,0.1), rgba(147,51,234,0.1), rgba(255,0,255,0.1))',
          backgroundSize: '200% 200%',
          filter: 'blur(100px)',
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-blue-900/50 to-slate-900/80 backdrop-blur-md" />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-fuchsia-500/10 to-transparent animate-gradient-shift" />

      <div className="relative z-10 px-4 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          {/* DevOps Skills */}
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="flex items-center gap-3 mb-8">
              <Icon icon="ph:terminal-window-bold" className="w-8 h-8 text-fuchsia-500" />
              <h3 className="text-2xl font-semibold text-white">DevOps & Tools</h3>
            </div>
            <div className="grid gap-4">
              {skills
                .filter(skill => skill.category === 'devops')
                .map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}>
                    <SkillCard skill={skill} />
                  </motion.div>
                ))}
            </div>
          </motion.div>

          {/* Soft Skills */}
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="flex items-center gap-3 mb-8">
              <Icon icon="ph:brain-bold" className="w-8 h-8 text-fuchsia-500" />
              <h3 className="text-2xl font-semibold text-white">Soft Skills</h3>
            </div>
            <div className="grid gap-4">
              {skills
                .filter(skill => skill.category === 'soft')
                .map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}>
                    <SkillCard skill={skill} />
                  </motion.div>
                ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default DevOpsAndSoftSkills
