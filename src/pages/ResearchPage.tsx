import React, { useState, useMemo, ReactNode, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Icon } from '@iconify/react'
import { useNavigate, Link } from 'react-router-dom'
import { useDebounce } from 'use-debounce'


interface TechnologyItem {
  id: string
  name: string
  icon: string
  secondaryIcon?: string
  iconBg?: string
  secondaryIconBg?: string
  textColor?: string
  secondaryTextColor?: string
  description: string
  path: string
}
interface Category {
  id: string
  name: string
  icon: string
  color: string
  description: string
  items?: TechnologyItem[]
  isMainCategory?: boolean
  path?: string
  comingSoon?: boolean
}

const globalCategories: Category[] = [
  {
    id: 'programming',
    name: 'Programming',
    icon: 'tabler:code',
    color: '#4361ee',
    description: 'Языки, библиотееки и фреймворки',
    items: [
      {
        id: 'javascript',
        name: 'JavaScript',
        icon: 'logos:javascript',
        iconBg: '#F7DF1E',
        textColor: '#121212',
        description: 'Динамика веба',
        path: '/research/javascript',
      },
      {
        id: 'typescript',
        name: 'TypeScript',
        icon: 'logos:typescript-icon',
        iconBg: '#3178C6',
        textColor: '#ffffff',
        description: 'Типизация поверх JS',
        path: '/research/typescript',
      },
      {
        id: 'react',
        name: 'React',
        icon: 'logos:react',
        iconBg: '#20232A',
        textColor: '#61DAFB',
        description: 'Библиотека для UI',
        path: '/research/react',
      },
      {
        id: 'nextjs',
        name: 'Next.js',
        icon: 'logos:nextjs-icon',
        iconBg: '#000000',
        textColor: '#ffffff',
        description: 'Фреймворк для React (SSR/SSG)',
        path: '/research/nextjs',
      },
    ],
  },
  {
    id: 'databases',
    name: 'Databases',
    icon: 'iconoir:database-solid',
    color: '#8B5CF6',
    description: 'Хранение и управление данными',
    items: [
      {
        id: 'postgresql',
        name: 'PostgreSQL',
        icon: 'logos:postgresql',
        iconBg: '#336791',
        textColor: '#ffffff',
        description: 'Мощная реляционная СУБД',
        path: '/research/postgresql',
      },
      {
        id: 'redis',
        name: 'Redis',
        icon: 'logos:redis',
        iconBg: '#ffffff',
        textColor: '#DC382D',
        description: 'In-memory хранилище ключ-значение',
        path: '/research/redis',
      },
    ],
  },
  {
    id: 'backend',
    name: 'Backend',
    icon: 'mdi:code-json',
    color: '#0EA5E9',
    description: 'Серверная логика, API и работа с данными',
    items: [
      {
        id: 'nodejsexpress',
        name: 'Node.js с Express',
        icon: 'logos:nodejs-icon',
        iconBg: '#339933',
        textColor: '#ffffff',
        description: 'Разработка бэкенда на JavaScript/TypeScript',
        path: '/research/nodejswithexpress',
      },
      {
        id: 'orm',
        name: 'ORM (Обзор)',
        icon: 'mdi:database-sync-outline',
        iconBg: '#ff7f50',
        textColor: '#ffffff',
        description: 'Prisma vs TypeORM vs Drizzle и др. Анализ, противоречия.',
        path: '/research/orm',
      },
    ],
  },
  {
    id: 'devops',
    name: 'DevOps & Cloud',
    icon: 'logos:kubernetes',
    color: '#10B981',
    description: 'Инфраструктура',
    items: [
      {
        id: 'docker',
        name: 'Docker',
        icon: 'logos:docker-icon',
        iconBg: '#ffffff',
        textColor: '#2496ED',
        description: 'Контейнеризация приложений',
        path: '/research/docker',
      },
    ],
  },
  {
    id: 'motion-design',
    name: 'Motion-design/web-motion-design',
    icon: 'ph:film-slate-fill',
    color: '#EC4899',
    description: 'Анимации',
    items: [
      {
        id: 'motion-design-combined',
        name: 'GSAP / After Effects',
        icon: 'logos:greensock-icon',
        secondaryIcon: 'logos:adobe-after-effects',
        iconBg: '#88CE02',
        secondaryIconBg: '#1F1E3C',
        textColor: '#ffffff',
        secondaryTextColor: '#9999FF',
        description: ' веб-анимации с GSAP и After Effects',
        path: '/research/web-motion-design',
      }
    ],
  },
  {
    id: 'advanced-research',
    name: 'Advanced Custom Research New Features Games Tasks',
    icon: 'logos:tensorflow',
    color: '#F59E0B',
    description: 'Расширенные исследования, задачи и пользовательские функции',
    items: [
      {
        id: 'uml-architectures',
        name: 'UML / Architectures',
        icon: 'clarity:diagram-solid',
        iconBg: '#3B82F6',
        textColor: '#ffffff',
        description: 'Диаграммы UML и архитектурные решения',
        path: '/research/custom/uml-architectures',
      },
      {
        id: 'tasks',
        name: 'Tasks',
        icon: 'fluent-emoji-high-contrast:clipboard',
        iconBg: '#10B981',
        textColor: '#ffffff',
        description: 'Практические задачи и решения',
        path: '/research/custom/tasks',
      },
      {
        id: 'games',
        name: 'Games',
        icon: 'solar:gamepad-minimalistic-bold',
        iconBg: '#8B5CF6',
        textColor: '#ffffff',
        description: 'Интерактивные игры и геймификация',
        path: '/research/custom/games',
      },
      {
        id: 'questions',
        name: 'Questions',
        icon: 'tabler:help-octagon-filled',
        iconBg: '#EC4899',
        textColor: '#ffffff',
        description: 'Вопросы и ответы по углубленным темам',
        path: '/research/custom/questions',
      },
      {
        id: 'custom-advanced-research',
        name: 'Custom Advanced Research',
        icon: 'fa6-solid:flask-vial',
        iconBg: '#F59E0B',
        textColor: '#ffffff',
        description: 'Специализированные исследования и эксперименты',
        path: '/research/custom/advanced-research',
      },
    ],
  },
]


// AnimatedBackground теперь используется глобально в App.tsx


interface TechnologyCardProps {
  item: TechnologyItem
}
const TechnologyCard: React.FC<TechnologyCardProps> = ({ item }) => {
  const navigate = useNavigate()
  return (
    <motion.div
      className="relative flex flex-col justify-between p-5 overflow-hidden transition-colors duration-300 border rounded-lg cursor-pointer bg-slate-800/60 border-slate-700/50 group hover:bg-slate-800/90 hover:border-slate-600"
      variants={cardVariants}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.98 }}
      onClick={() => navigate(item.path)}
      style={{ position: 'relative' }}>
      {' '}
      <motion.div
        className="absolute inset-0 border-2 border-transparent rounded-lg pointer-events-none"
        whileHover={{ borderColor: item.iconBg || '#4361ee', transition: { duration: 0.3 } }}
      />{' '}
      <div>
        {' '}
        <div className="flex items-center gap-3 mb-3">
          {' '}
          <div className="flex items-center gap-2 shrink-0">
            <motion.div
              className="flex items-center justify-center w-12 h-12 rounded-md shadow-lg"
              style={{ backgroundColor: item.iconBg || '#1E293B', boxShadow: `0 0 15px ${item.iconBg}50` || '0 0 15px rgba(30, 41, 59, 0.3)' }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
              whileHover={{ scale: 1.1 }}>
              {' '}
              <Icon icon={item.icon} className="w-7 h-7" style={{ color: item.textColor || 'white' }} />{' '}
            </motion.div>
            {item.secondaryIcon && (
              <>
                <div className="text-gray-500">/</div>
                <motion.div
                  className="flex items-center justify-center w-12 h-12 rounded-md shadow-lg"
                  style={{ backgroundColor: item.secondaryIconBg || '#1E293B', boxShadow: `0 0 15px ${item.secondaryIconBg}50` || '0 0 15px rgba(30, 41, 59, 0.3)' }}
                  transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                  whileHover={{ scale: 1.1 }}>
                  {' '}
                  <Icon icon={item.secondaryIcon} className="w-7 h-7" style={{ color: item.secondaryTextColor || 'white' }} />{' '}
                </motion.div>
              </>
            )}
          </div>{' '}
          <div>
            <h3 className="text-xl font-medium text-white transition-colors duration-300 group-hover:text-blue-300">{item.name}</h3>
          </div>{' '}
        </div>{' '}
        <p className="mb-3 text-sm text-gray-300 min-h-[40px]">{item.description}</p>{' '}
      </div>{' '}
      <div className="flex items-center justify-end pt-3 mt-4 text-xs text-gray-400 transition-colors duration-300 border-t border-slate-700/30 group-hover:text-sky-300 group-hover:border-slate-700/80">
        <motion.div initial={{ x: 0 }} whileHover={{ x: 3, transition: { type: 'spring', stiffness: 300 } }}>
          <Icon icon="ph:arrow-right-bold" className="w-4 h-4" />
        </motion.div>
      </div>{' '}
      {/* Индикатор новизны для некоторых карточек */}
      {(item.id === 'typescript' || item.id === 'react' || item.id === 'nextjs') && (
        <div className="absolute top-2 right-2 px-1.5 py-0.5 text-[10px] font-medium bg-green-500/20 text-green-300 rounded-full">
          NEW
        </div>
      )}{' '}
    </motion.div>
  )
}

// ==========================================================
// КОМПОНЕНТ: MainCategory (Без изменений)
// ==========================================================
interface MainCategoryProps {
  category: Category
}
const MainCategory: React.FC<MainCategoryProps> = ({ category }) => {
  const navigate = useNavigate()
  const handleNavigation = () => {
    if (category.path) {
      navigate(category.path)
    }
  }
  return (
    <div className={`mb-12 ${category.path ? 'cursor-pointer group' : ''}`} onClick={handleNavigation}>
      {' '}
      <motion.div
        className="flex items-start gap-4 p-2 -m-2 transition-colors duration-300 rounded-md group-hover:bg-slate-800/50"
        whileHover={category.path ? { x: 5, transition: { duration: 0.2 } } : {}}
        whileTap={category.path ? { scale: 0.98 } : {}}>
        {' '}
        <div
          className="flex items-center justify-center p-3 rounded-md shrink-0"
          style={{ backgroundColor: `${category.color}20` }}>
          {' '}
          <Icon
            icon={category.icon}
            style={{ color: category.color }}
            className="w-6 h-6 transition-transform duration-300 group-hover:scale-110"
          />{' '}
        </div>{' '}
        <div>
          {' '}
          <h2
            className="text-2xl font-bold text-white transition-colors duration-300 group-hover:text-[color:var(--category-color)]"
            style={{ '--category-color': category.color } as React.CSSProperties}>
            {category.name}
          </h2>{' '}
          <p className="text-sm text-gray-400">{category.description}</p>{' '}
        </div>{' '}
      </motion.div>{' '}
    </div>
  )
}


const ResearchCategoryTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState('uml-architectures');

  const tabs = [
    { id: 'uml-architectures', label: 'UML / Architectures', icon: 'clarity:diagram-solid', color: '#3B82F6' },
    { id: 'tasks', label: 'Tasks', icon: 'fluent-emoji-high-contrast:clipboard', color: '#10B981' },
    { id: 'games', label: 'Games', icon: 'solar:gamepad-minimalistic-bold', color: '#8B5CF6' },
    { id: 'questions', label: 'Questions', icon: 'tabler:help-octagon-filled', color: '#EC4899' },
    { id: 'custom-advanced-research', label: 'Custom Advanced Research', icon: 'fa6-solid:flask-vial', color: '#F59E0B' },
  ];

  return (
    <div className="p-6 border rounded-lg border-amber-500/50 bg-slate-800/40">
      <div className="flex flex-wrap gap-2 mb-6 border-b border-slate-700">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${activeTab === tab.id ? 'bg-slate-700 text-white' : 'text-gray-400 hover:text-white hover:bg-slate-700/50'}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <Icon icon={tab.icon} style={{ color: tab.color }} className="w-5 h-5" />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="p-4 rounded-lg bg-slate-800/30">
        {activeTab === 'uml-architectures' && (
          <div className="space-y-4">
            <h3 className="text-xl font-medium text-blue-300">UML и Архитектурные Решения</h3>
            <p className="text-gray-300">Диаграммы UML для визуализации архитектуры, паттернов проектирования и моделирования систем.</p>
            <div className="flex justify-end">
              <Link to="/research/custom/uml-architectures" className="flex items-center gap-1 text-sm text-blue-400 transition-colors hover:text-blue-300">
                Перейти к разделу <Icon icon="ph:arrow-right-bold" className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}

        {activeTab === 'tasks' && (
          <div className="space-y-4">
            <h3 className="text-xl font-medium text-green-300">Практические Задачи</h3>
            <p className="text-gray-300">Коллекция практических задач по программированию, алгоритмам и разработке с подробными решениями.</p>
            <div className="flex justify-end">
              <Link to="/research/custom/tasks" className="flex items-center gap-1 text-sm text-green-400 transition-colors hover:text-green-300">
                Перейти к разделу <Icon icon="ph:arrow-right-bold" className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}

        {activeTab === 'games' && (
          <div className="space-y-4">
            <h3 className="text-xl font-medium text-purple-300">Игры и Геймификация</h3>
            <p className="text-gray-300">Интерактивные игры и геймифицированные упражнения для обучения программированию и технологиям.</p>
            <div className="flex justify-end">
              <Link to="/research/custom/games" className="flex items-center gap-1 text-sm text-purple-400 transition-colors hover:text-purple-300">
                Перейти к разделу <Icon icon="ph:arrow-right-bold" className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}

        {activeTab === 'questions' && (
          <div className="space-y-4">
            <h3 className="text-xl font-medium text-pink-300">Вопросы и Ответы</h3>
            <p className="text-gray-300">Углубленные вопросы и развернутые ответы по сложным темам в программировании и разработке.</p>
            <div className="flex justify-end">
              <Link to="/research/custom/questions" className="flex items-center gap-1 text-sm text-pink-400 transition-colors hover:text-pink-300">
                Перейти к разделу <Icon icon="ph:arrow-right-bold" className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}

        {activeTab === 'custom-advanced-research' && (
          <div className="space-y-4">
            <h3 className="text-xl font-medium text-amber-300">Специализированные Исследования</h3>
            <p className="text-gray-300">Глубокие исследования, эксперименты и анализ передовых концепций в технологиях и программировании.</p>
            <div className="flex justify-end">
              <Link to="/research/custom/advanced-research" className="flex items-center gap-1 text-sm transition-colors text-amber-400 hover:text-amber-300">
                Перейти к разделу <Icon icon="ph:arrow-right-bold" className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


interface GlobalCategoryProps {
  category: Category
  filteredItems?: Category['items']
  isExpanded: boolean
  onToggle: () => void
}
const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', damping: 15, stiffness: 100 } },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
}
const gridContainerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
  exit: { opacity: 0 },
}

const GlobalCategory: React.FC<GlobalCategoryProps> = ({ category, filteredItems, isExpanded, onToggle }) => {
  if (category.isMainCategory) {
    return (
      <motion.div variants={cardVariants}>
        <MainCategory category={category} />
      </motion.div>
    )
  }
  const itemsToDisplay = filteredItems || category.items
  const hasContent = category.id === 'advanced-research' || (itemsToDisplay && itemsToDisplay.length > 0)
  const itemsCount = itemsToDisplay?.length || 0
  return (
    <motion.div
      className="mb-8"
      variants={cardVariants}
      layout
      transition={{ type: 'spring', damping: 20, stiffness: 100 }}>
      {' '}
      <motion.div
        className="flex items-center justify-between gap-4 p-3 mb-4 transition-colors border border-transparent rounded-md cursor-pointer hover:border-slate-700 hover:bg-slate-800/70"
        onClick={onToggle}
        title={isExpanded ? 'Свернуть' : 'Развернуть'}
        whileHover={{ backgroundColor: 'rgba(30, 41, 59, 0.7)' }}>
        {' '}
        <div className="flex items-start gap-4">
          {' '}
          <div
            className="flex items-center justify-center p-3 rounded-md shrink-0"
            style={{ backgroundColor: `${category.color}20` }}>
            {' '}
            <Icon icon={category.icon} style={{ color: category.color }} className="w-6 h-6" />{' '}
          </div>{' '}
          <div>
            {' '}
            <h2 className="text-2xl font-bold text-white">{category.name}</h2>{' '}
            <p className="text-sm text-gray-400">{category.description}</p>{' '}
          </div>{' '}
        </div>{' '}
        {hasContent && (
          <div className="flex items-center">
            {itemsCount > 0 && (
              <span className="px-2 py-0.5 mr-3 text-xs font-medium rounded-full bg-blue-500/20 text-blue-300">
                {itemsCount} {itemsCount === 1 ? 'материал' : 'материалов'}
              </span>
            )}
            <motion.div animate={{ rotate: isExpanded ? 0 : -90 }} transition={{ duration: 0.2 }}>
              {' '}
              <Icon icon="ph:caret-down-bold" className="w-5 h-5 text-gray-500" />{' '}
            </motion.div>
          </div>
        )}{' '}
      </motion.div>{' '}
      <AnimatePresence initial={false}>
        {' '}
        {isExpanded && hasContent && (
          <motion.div
            key="content"
            initial="hidden"
            animate="show"
            exit="exit"
            variants={{
              hidden: { opacity: 0, height: 0 },
              show: { opacity: 1, height: 'auto', transition: { duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] } },
              exit: { opacity: 0, height: 0, transition: { duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] } },
            }}
            className="overflow-hidden">
            {' '}
            <motion.div variants={gridContainerVariants} className="pt-2">
              {' '}
              {category.id === 'advanced-research' ? (
                <ResearchCategoryTabs />
              ) : category.comingSoon ? (
                <div className="p-6 text-center border border-dashed rounded-lg border-slate-600/50 bg-slate-800/20">
                  {' '}
                  <Icon icon="ph:clock-countdown-bold" className="w-8 h-8 mx-auto mb-3 text-gray-500" />{' '}
                  <h3 className="mb-2 text-xl font-medium text-gray-300">Скоро...</h3>{' '}
                  <p className="max-w-lg mx-auto text-sm text-gray-400"> {category.description} </p>{' '}
                </div>
              ) : itemsToDisplay && itemsToDisplay.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {' '}
                    {itemsToDisplay.map(item => (
                      <TechnologyCard key={item.id} item={item} />
                    ))}{' '}
                  </div>
                  {itemsCount > 3 && (
                    <div className="flex justify-end mt-4">
                      <button className="flex items-center gap-1 px-3 py-1.5 text-sm text-indigo-300 transition-colors bg-indigo-900/30 rounded-md hover:bg-indigo-900/50">
                        Смотреть все {itemsCount} материалов в категории
                        <Icon icon="ph:arrow-right-bold" className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </>
              ) : null}{' '}
            </motion.div>{' '}
          </motion.div>
        )}{' '}
      </AnimatePresence>{' '}
    </motion.div>
  )
}


const pageContainerVariants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.12 } } }

const ResearchPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300)
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>(() => {
    const initialState: Record<string, boolean> = {}
    const firstExpandable = globalCategories.find(cat => !cat.isMainCategory && (cat.items || cat.id === 'advanced-research'))
    if (firstExpandable) {
      initialState[firstExpandable.id] = true
    }
    const secondExpandable = globalCategories.find(cat => cat.id === 'programming')
    if (secondExpandable) {
      initialState[secondExpandable.id] = true
    }
    return initialState
  })

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => ({ ...prev, [categoryId]: !prev[categoryId] }))
  }

  const filteredCategories = useMemo(() => {
    const lowerCaseSearchTerm = debouncedSearchTerm.trim().toLowerCase()
    if (!lowerCaseSearchTerm) {
      return globalCategories
    }
    return globalCategories
      .map(category => {
        if (category.isMainCategory && category.name.toLowerCase().includes(lowerCaseSearchTerm)) {
          return category
        }
        if (
          category.id === 'advanced-research' &&
          (category.name.toLowerCase().includes(lowerCaseSearchTerm) ||
            category.description.toLowerCase().includes(lowerCaseSearchTerm))
        ) {
          return category
        }
        if (
          category.comingSoon &&
          category.id !== 'advanced-research' &&
          category.name.toLowerCase().includes(lowerCaseSearchTerm)
        ) {
          return category
        }
        const filteredItems = category.items?.filter(
          item =>
            item.name.toLowerCase().includes(lowerCaseSearchTerm) ||
            item.description.toLowerCase().includes(lowerCaseSearchTerm),
        )
        if (category.name.toLowerCase().includes(lowerCaseSearchTerm) || (filteredItems && filteredItems.length > 0)) {
          return { ...category, items: filteredItems }
        }
        return null
      })
      .filter((category): category is Category => category !== null)
  }, [debouncedSearchTerm])

  useEffect(() => {
    if (debouncedSearchTerm.trim()) {
      const newExpanded: Record<string, boolean> = {}
      filteredCategories.forEach(cat => {
        if (!cat.isMainCategory && (cat.items || cat.id === 'advanced-research')) {
          newExpanded[cat.id] = true
        }
      })
      setExpandedCategories(newExpanded)
    }
  }, [debouncedSearchTerm])

  return (
    <div className="relative min-h-screen text-white">
      <main className="container relative z-10 px-4 pt-24 pb-20 mx-auto md:pt-32">
        <motion.div
          className="mb-12 text-center md:text-left"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}>
          <h1 className="mb-1 text-4xl font-bold text-transparent md:text-5xl bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400">
            {' '}
            Research Hub{' '}
            <span className="ml-2 text-sm font-medium text-indigo-300 bg-indigo-900/30 px-2 py-0.5 rounded-full">2025</span>
          </h1>
          <p className="max-w-2xl mx-auto mt-2 text-lg text-gray-300/90 md:mx-0">
            {' '}
            Критический анализ технологий, документация и исследования с практическими задачами{' '}
          </p>
        </motion.div>

        <motion.div variants={pageContainerVariants} initial="hidden" animate="show">
          {filteredCategories.length > 0 ? (
            filteredCategories.map(category => (
              <GlobalCategory
                key={category.id}
                category={category}
                filteredItems={category.items}
                isExpanded={!!expandedCategories[category.id]}
                onToggle={() => toggleCategory(category.id)}
              />
            ))
          ) : (
            <motion.div
              className="p-8 mt-8 text-center border border-dashed rounded-lg border-slate-600/50 bg-slate-800/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}>
              <Icon icon="ph:binoculars-bold" className="w-12 h-12 mx-auto mb-5 text-gray-500" />
              <h3 className="mb-2 text-xl font-medium text-gray-300">Ничего не найдено</h3>
              <p className="max-w-lg mx-auto text-sm text-gray-400">
                {' '}
                По вашему запросу "{searchTerm}" ничего не найдено. Попробуйте изменить запрос или сбросить поиск.{' '}
              </p>
            </motion.div>
          )}
        </motion.div>
      </main>
    </div>
  )
}

export default ResearchPage
