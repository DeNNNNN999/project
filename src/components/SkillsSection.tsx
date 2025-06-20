import { useEffect, useRef, useState, useMemo, useCallback, memo } from 'react'
import { motion, useMotionTemplate, useMotionValue, AnimatePresence } from 'motion/react'
import { Icon } from '@iconify/react'


// Типы
interface Skill {
  name: string
  icon: string
  color: string
  category: 'frontend' | 'backend' | 'tools' | 'other'
  description: string
}

// Данные навыков
const skillsData: Skill[] = [
  // Frontend
  {
    name: 'React',
    icon: 'logos:react',
    color: '#61DAFB',
    category: 'frontend',
    description: 'Создание интерактивных UI с хуками и современными паттернами'
  },
  {
    name: 'TypeScript',
    icon: 'logos:typescript-icon',
    color: '#3178C6',
    category: 'frontend',
    description: 'Строгая типизация для масштабируемых приложений'
  },
  {
    name: 'Next.js',
    icon: 'logos:nextjs-icon',
    color: '#000000',
    category: 'frontend',
    description: 'SSR, SSG и современная веб-разработка'
  },
  {
    name: 'Three.js',
    icon: 'logos:threejs',
    color: '#000000',
    category: 'frontend',
    description: '3D графика и интерактивные визуализации'
  },
  {
    name: 'Tailwind CSS',
    icon: 'logos:tailwindcss-icon',
    color: '#06B6D4',
    category: 'frontend',
    description: 'Utility-first CSS для быстрой разработки'
  },
  {
    name: 'JavaScript',
    icon: 'logos:javascript',
    color: '#F7DF1E',
    category: 'frontend',
    description: 'ES6+, асинхронное программирование, функциональные паттерны'
  },
  
  // Backend
  {
    name: 'Node.js',
    icon: 'logos:nodejs-icon',
    color: '#539E43',
    category: 'backend',
    description: 'Серверная разработка, REST API, микросервисы'
  },
  {
    name: 'Python',
    icon: 'logos:python',
    color: '#3776AB',
    category: 'backend',
    description: 'Автоматизация, скрипты, веб-скрапинг, ML'
  },
  {
    name: 'PostgreSQL',
    icon: 'logos:postgresql',
    color: '#336791',
    category: 'backend',
    description: 'Проектирование БД, оптимизация запросов, индексы'
  },
  {
    name: 'GraphQL',
    icon: 'logos:graphql',
    color: '#E535AB',
    category: 'backend',
    description: 'Гибкие API с подписками и федерацией'
  },
  {
    name: 'Redis',
    icon: 'logos:redis',
    color: '#DC382D',
    category: 'backend',
    description: 'Кэширование, очереди, pub/sub'
  },
  {
    name: 'Prisma',
    icon: 'logos:prisma',
    color: '#2D3748',
    category: 'backend',
    description: 'Type-safe ORM с миграциями'
  },
  {
    name: 'Express',
    icon: 'simple-icons:express',
    color: '#000000',
    category: 'backend',
    description: 'Минималистичный веб-фреймворк'
  },
  
  // Tools
  {
    name: 'Docker',
    icon: 'logos:docker-icon',
    color: '#2496ED',
    category: 'tools',
    description: 'Контейнеризация и оркестрация'
  },
  {
    name: 'Git',
    icon: 'logos:git-icon',
    color: '#F05032',
    category: 'tools',
    description: 'Версионирование, GitFlow, код-ревью'
  },
  {
    name: 'Webpack',
    icon: 'logos:webpack',
    color: '#8DD6F9',
    category: 'tools',
    description: 'Сборка и оптимизация бандлов'
  },
  {
    name: 'Vite',
    icon: 'logos:vitejs',
    color: '#646CFF',
    category: 'tools',
    description: 'Молниеносная сборка проектов'
  },
  {
    name: 'Vitest',
    icon: 'logos:vitest',
    color: '#6E9F18',
    category: 'tools',
    description: 'Быстрое unit-тестирование с поддержкой Vite'
  },
  {
    name: 'React Testing Library',
    icon: 'simple-icons:testinglibrary',
    color: '#FC4544',
    category: 'tools',
    description: 'Тестирование React компонентов с фокусом на UX'
  },
  {
    name: 'Cypress',
    icon: 'simple-icons:cypress',
    color: '#17202C',
    category: 'tools',
    description: 'E2E тестирование веб-приложений'
  },
  {
    name: 'Playwright',
    icon: 'simple-icons:playwright',
    color: '#2EAD33',
    category: 'tools',
    description: 'Кроссбраузерное автоматизированное тестирование'
  },
  {
    name: 'Selenium',
    icon: 'simple-icons:selenium',
    color: '#43B02A',
    category: 'tools',
    description: 'Автоматизация браузеров для тестирования'
  },
  {
    name: 'Prometheus',
    icon: 'simple-icons:prometheus',
    color: '#E6522C',
    category: 'tools',
    description: 'Мониторинг и алертинг систем'
  }
]

// Компонент режима отображения
const ViewModeToggle = memo(({ mode, setMode }: { mode: string; setMode: (mode: string) => void }) => {
  const modes = [
    { id: 'grid', icon: 'ph:grid-four-bold', label: 'Сетка' },
    { id: 'list', icon: 'ph:list-bold', label: 'Список' },
    { id: 'cloud', icon: 'ph:cloud-bold', label: 'Облако' }
  ]
  
  return (
    <div className="flex gap-2 p-1 bg-slate-800/50 backdrop-blur rounded-lg">
      {modes.map(({ id, icon, label }) => (
        <motion.button
          key={id}
          onClick={() => setMode(id)}
          className={`px-4 py-2 rounded-md flex items-center gap-2 transition-colors ${
            mode === id ? 'bg-blue-500 text-white' : 'text-gray-400 hover:text-white'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Icon icon={icon} className="w-4 h-4" />
          <span className="text-sm">{label}</span>
        </motion.button>
      ))}
    </div>
  )
})

ViewModeToggle.displayName = 'ViewModeToggle'

// Фильтр категорий
const CategoryFilter = memo(({ 
  selected, 
  onChange 
}: { 
  selected: string; 
  onChange: (category: string) => void 
}) => {
  const categories = [
    { id: 'all', label: 'Все', icon: 'ph:squares-four-bold', color: '#6366F1' },
    { id: 'frontend', label: 'Frontend', icon: 'ph:code-bold', color: '#3B82F6' },
    { id: 'backend', label: 'Backend', icon: 'ph:database-bold', color: '#10B981' },
    { id: 'tools', label: 'Инструменты', icon: 'ph:wrench-bold', color: '#F59E0B' }
  ]
  
  return (
    <div className="flex flex-wrap gap-3">
      {categories.map(({ id, label, icon, color }) => (
        <motion.button
          key={id}
          onClick={() => onChange(id)}
          className={`px-4 py-2 rounded-full flex items-center gap-2 transition-all ${
            selected === id 
              ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' 
              : 'bg-slate-800/50 text-gray-400 hover:text-white'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Icon icon={icon} className="w-4 h-4" style={{ color: selected === id ? '#fff' : color }} />
          <span>{label}</span>
        </motion.button>
      ))}
    </div>
  )
})

CategoryFilter.displayName = 'CategoryFilter'

// Grid режим - карточка навыка
const SkillCardGrid = memo(({ skill, index }: { skill: Skill; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isFlipped, setIsFlipped] = useState(false)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    mouseX.set((x / rect.width) * 100)
    mouseY.set((y / rect.height) * 100)
  }, [mouseX, mouseY])
  
  return (
    <motion.div
      ref={cardRef}
      className="relative h-[200px] cursor-pointer"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      onMouseMove={handleMouseMove}
      onClick={() => setIsFlipped(!isFlipped)}
      style={{ transformStyle: 'preserve-3d' }}
      whileHover={{ scale: 1.05 }}
    >
      <motion.div
        className="absolute inset-0"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Передняя сторона */}
        <motion.div
          className="absolute inset-0 p-6 overflow-hidden rounded-2xl backface-hidden"
          style={{ 
            transformStyle: 'preserve-3d',
            backfaceVisibility: 'hidden',
            background: `linear-gradient(135deg, rgba(30, 41, 59, 0.95) 0%, rgba(15, 23, 42, 0.95) 100%)`,
            backdropFilter: 'blur(10px)'
          }}
        >
          {/* Градиентный фон */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20" />
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-white/5" />
          </div>
          
          {/* Интерактивное свечение */}
          <motion.div
            className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
            style={{
              background: useMotionTemplate`
                radial-gradient(
                  circle at ${mouseX}% ${mouseY}%,
                  ${skill.color}30,
                  transparent 50%
                )
              `
            }}
          />
          
          {/* Иконка и название */}
          <div className="flex flex-col items-center justify-center h-full text-center relative z-10">
            <motion.div
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              className="mb-4 p-4 rounded-xl"
              style={{ 
                backgroundColor: `${skill.color}15`,
                boxShadow: `0 0 20px ${skill.color}20`
              }}
            >
              <Icon 
                icon={skill.icon} 
                className="w-12 h-12"
                style={{ 
                  color: skill.color,
                  filter: `drop-shadow(0 0 6px ${skill.color}40)`
                }}
              />
            </motion.div>
            
            <h3 className="text-xl font-bold text-white">{skill.name}</h3>
          </div>
          
          {/* Индикатор переворота */}
          <div className="absolute bottom-4 right-4 text-gray-400">
            <Icon icon="ph:arrow-clockwise" className="w-4 h-4" />
          </div>
        </motion.div>
        
        {/* Задняя сторона */}
        <motion.div
          className="absolute inset-0 p-6 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 backface-hidden"
          style={{ 
            transformStyle: 'preserve-3d',
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}
        >
          <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
            <Icon icon={skill.icon} className="w-6 h-6" style={{ color: skill.color }} />
            {skill.name}
          </h3>
          
          <p className="text-gray-300 text-sm">{skill.description}</p>
          
          {/* Кнопка возврата */}
          <div className="absolute bottom-4 right-4 text-gray-400">
            <Icon icon="ph:arrow-counter-clockwise" className="w-4 h-4" />
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
})

SkillCardGrid.displayName = 'SkillCardGrid'

// List режим - строка навыка
const SkillRowList = memo(({ skill, index }: { skill: Skill; index: number }) => {
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className="mb-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="p-4 rounded-xl bg-slate-800/50 backdrop-blur"
        whileHover={{ scale: 1.02, x: 10 }}
        style={{
          borderLeft: isHovered ? `4px solid ${skill.color}` : '4px solid transparent'
        }}
      >
        <div className="flex items-center gap-4">
          <motion.div
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            className="p-3 rounded-xl"
            style={{ 
              backgroundColor: `${skill.color}15`,
              boxShadow: `0 0 20px ${skill.color}20`
            }}
          >
            <Icon 
              icon={skill.icon} 
              className="w-8 h-8" 
              style={{ 
                color: skill.color,
                filter: `drop-shadow(0 0 4px ${skill.color}40)`
              }} 
            />
          </motion.div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white">
              {skill.name}
            </h3>
            <p className="text-sm text-gray-400">{skill.description}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
})

SkillRowList.displayName = 'SkillRowList'

// Cloud режим
const SkillCloud = memo(({ skills }: { skills: Skill[] }) => {
  return (
    <motion.div 
      className="flex flex-wrap gap-4 justify-center items-center min-h-[400px] py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {skills.map((skill, index) => {
        // Рандомный размер для разнообразия
        const sizes = ['text-2xl', 'text-3xl', 'text-4xl', 'text-5xl']
        const randomSize = sizes[Math.floor(Math.random() * sizes.length)]
        
        return (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ 
              scale: 1.2,
              zIndex: 10,
              textShadow: `0 0 20px ${skill.color}`
            }}
            className={`cursor-pointer font-bold ${randomSize} relative`}
            style={{
              color: skill.color,
              filter: `drop-shadow(0 0 10px ${skill.color}30)`
            }}
          >
            {skill.name}
          </motion.div>
        )
      })}
    </motion.div>
  )
})

SkillCloud.displayName = 'SkillCloud'

// Главный компонент
const SkillsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [viewMode, setViewMode] = useState('grid')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  
  // Фильтрация навыков
  const filteredSkills = useMemo(() => {
    return skillsData.filter(skill => {
      const matchesCategory = selectedCategory === 'all' || skill.category === selectedCategory
      const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [selectedCategory, searchQuery])
  
  return (
    <section ref={sectionRef} id="skills" className="relative py-20 overflow-hidden">
      
      {/* Контент */}
      <div className="relative z-10 px-4 mx-auto max-w-7xl">
        {/* Заголовок */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold text-transparent bg-gradient-to-r from-fuchsia-400 via-purple-500 to-violet-600 bg-clip-text">
            Мои навыки
          </h2>
          <p className="max-w-2xl mx-auto text-gray-400">
            Технологии и инструменты, с которыми я работаю
          </p>
        </motion.div>
        
        {/* Контролы */}
        <div className="mb-8 space-y-4">
          {/* Поиск и режимы */}
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            <motion.div
              className="relative w-full md:w-auto"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Icon 
                icon="ph:magnifying-glass-bold" 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
              />
              <input
                type="text"
                placeholder="Поиск навыков..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full md:w-80 pl-10 pr-4 py-2 bg-slate-800/50 backdrop-blur rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </motion.div>
            
            <ViewModeToggle mode={viewMode} setMode={setViewMode} />
          </div>
          
          {/* Фильтры категорий */}
          <CategoryFilter selected={selectedCategory} onChange={setSelectedCategory} />
        </div>
        
        {/* Отображение навыков в зависимости от режима */}
        <AnimatePresence mode="wait">
          {viewMode === 'grid' && (
            <motion.div
              key="grid"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {filteredSkills.map((skill, index) => (
                <SkillCardGrid key={skill.name} skill={skill} index={index} />
              ))}
            </motion.div>
          )}
          
          {viewMode === 'list' && (
            <motion.div key="list">
              {filteredSkills.map((skill, index) => (
                <SkillRowList key={skill.name} skill={skill} index={index} />
              ))}
            </motion.div>
          )}
          
          {viewMode === 'cloud' && (
            <SkillCloud skills={filteredSkills} />
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

export default SkillsSection
