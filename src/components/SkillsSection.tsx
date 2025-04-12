import { useEffect, useRef } from 'react'
import { motion, useMotionTemplate, useMotionValue } from 'motion/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Icon } from '@iconify/react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface HardSkill {
  name: string
  icon: string
  color: string

  category: 'frontend' | 'backend'
}

const hardSkills: HardSkill[] = [
  // Frontend
  {
    name: 'JavaScript',
    icon: 'logos:javascript',
    color: '#F7DF1E',

    category: 'frontend',
  },
  {
    name: 'TypeScript',
    icon: 'logos:typescript-icon',
    color: '#3178C6',

    category: 'frontend',
  },
  {
    name: 'Tailwind CSS',
    icon: 'logos:tailwindcss-icon',
    color: '#06B6D4',

    category: 'frontend',
  },
  {
    name: 'React',
    icon: 'logos:react',
    color: '#61DAFB',

    category: 'frontend',
  },
  {
    name: 'Webpack',
    icon: 'logos:webpack',
    color: '#8DD6F9',

    category: 'frontend',
  },
  {
    name: 'Next.js',
    icon: 'logos:nextjs-icon',
    color: '#000000',

    category: 'frontend',
  },
  {
    name: 'Vite',
    icon: 'logos:vitejs',
    color: '#646CFF',

    category: 'frontend',
  },
  {
    name: 'Three.js',
    icon: 'logos:threejs',
    color: '#000000',

    category: 'frontend',
  },

  // Backend
  {
    name: 'Node.js',
    icon: 'logos:nodejs-icon',
    color: '#539E43',
    category: 'backend',
  },
  {
    name: 'Express',
    icon: 'simple-icons:express',
    color: '#FFFFFF',

    category: 'backend',
  },
  {
    name: 'GraphQL',
    icon: 'logos:graphql',
    color: '#E535AB',

    category: 'backend',
  },
  {
    name: 'PostgreSQL',
    icon: 'logos:postgresql',
    color: '#336791',
    category: 'backend',
  },
  {
    name: 'Redis',
    icon: 'logos:redis',
    color: '#DC382D',

    category: 'backend',
  },
  {
    name: 'TypeORM',
    icon: 'simple-icons:typeorm',
    color: '#FE0902',
    category: 'backend',
  },
  {
    name: 'Drizzle',
    icon: 'simple-icons:drizzle',
    color: '#C5F74F',
    category: 'backend',
  },
  {
    name: 'Prisma',
    icon: 'logos:prisma',
    color: '#2D3748',
    category: 'backend',
  },
]

const SkillCard = ({ skill }: { skill: HardSkill }) => {
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
              rgba(59,130,246,0.15),
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
            className="p-3 rounded-xl bg-blue-500/10">
            <Icon icon={skill.icon} className="w-8 h-8 text-blue-400" />
          </motion.div>
          <h3 className="text-lg font-semibold text-white">{skill.name}</h3>
        </div>
      </div>

      {/* Нижняя градиентная линия */}
      <div className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-blue-500/0 via-blue-500/50 to-blue-500/0" />
    </motion.div>
  )
}

const SkillsSection = () => {
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
    <section ref={sectionRef} id="skills" className="relative py-20 overflow-hidden bg-[#0B1120]">
      {/* Parallax Background */}
      <div className="absolute inset-0 parallax-bg">
        <div className="absolute inset-0 bg-grid-diagonal opacity-10" />
      </div>

      {/* Animated Gradient Background */}
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
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-16 text-center">
          <h2
            className="mb-4 text-4xl font-bold text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text">
            Мои навыки
          </h2>
          <p className="max-w-2xl mx-auto text-gray-400">Ключевые технологии, которые я использую в разработке</p>
        </motion.div>

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          {/* Frontend Skills */}
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="flex items-center gap-3 mb-8">
              <Icon icon="ph:code-bold" className="w-8 h-8 text-blue-500" />
              <h3 className="text-2xl font-semibold text-white">Frontend</h3>
            </div>
            <div className="grid gap-4">
              {hardSkills
                .filter(skill => skill.category === 'frontend')
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

          {/* Backend Skills */}
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="flex items-center gap-3 mb-8">
              <Icon icon="ph:database-bold" className="w-8 h-8 text-blue-500" />
              <h3 className="text-2xl font-semibold text-white">Backend</h3>
            </div>
            <div className="grid gap-4">
              {hardSkills
                .filter(skill => skill.category === 'backend')
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

export default SkillsSection
