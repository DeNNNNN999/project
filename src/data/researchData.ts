export interface TechnologyItem {
  id: string
  name: string
  icon: string
  iconBg?: string // Сделаем опциональным, можно задать дефолт
  textColor?: string // Сделаем опциональным
  description: string
  path: string
}

export interface Category {
  id: string
  name: string
  icon: string
  color: string
  description: string
  items?: TechnologyItem[] // Массив технологий (опционально)
  isMainCategory?: boolean // Для категорий без карточек
  path?: string // Путь для isMainCategory
  comingSoon?: boolean // Для секции Challenges
}

export const globalCategories: Category[] = [
  {
    id: 'programming',
    name: 'Programming',
    icon: 'ph:code-bold',
    color: '#4361ee',
    description: 'Языки и фреймворки',
    items: [
      {
        id: 'javascript',
        name: 'JavaScript',
        icon: 'logos:javascript',
        iconBg: '#F7DF1E',
        textColor: '#121212',
        description: 'Разработка динамической логики',
        path: '/research/javascript',
      },
      {
        id: 'typescript',
        name: 'TypeScript',
        icon: 'logos:typescript-icon',
        iconBg: '#3178C6',
        textColor: '#ffffff',
        description: 'Типизация и надежность кода',
        path: '/research/typescript',
      },
      {
        id: 'react',
        name: 'React',
        icon: 'logos:react',
        iconBg: '#20232A',
        textColor: '#61DAFB',
        description: 'Создание интерфейсов',
        path: '/research/react',
      },
      {
        id: 'nextjs',
        name: 'Next.js',
        icon: 'logos:nextjs-icon',
        iconBg: '#000000',
        textColor: '#ffffff',
        description: 'SSR и статическая генерация',
        path: '/research/nextjs',
      },
      // ... другие языки/фреймворки
    ],
  },
  {
    id: 'databases',
    name: 'Databases',
    icon: 'ph:database-bold',
    color: '#8B5CF6',
    description: 'Базы данных и хранение информации',
    items: [
      {
        id: 'postgresql',
        name: 'PostgreSQL',
        icon: 'logos:postgresql',
        iconBg: '#336791',
        textColor: '#ffffff',
        description: 'Реляционная база данных',
        path: '/research/postgresql',
      },
      {
        id: 'mongodb',
        name: 'MongoDB',
        icon: 'logos:mongodb-icon',
        iconBg: '#ffffff',
        textColor: '#13AA52',
        description: 'NoSQL база данных',
        path: '/research/mongodb',
      },
      {
        id: 'redis',
        name: 'Redis',
        icon: 'logos:redis',
        iconBg: '#ffffff',
        textColor: '#DC382D',
        description: 'Кэширование и очереди',
        path: '/research/redis',
      },
      // ... другие БД
    ],
  },
  {
    id: 'backend',
    name: 'Backend',
    icon: 'ph:server-bold',
    color: '#0EA5E9',
    description: 'Фреймворки и ORM для серверной разработки',
    items: [
      {
        id: 'nodejs',
        name: 'Node.js',
        icon: 'logos:nodejs-icon',
        iconBg: '#339933',
        textColor: '#ffffff',
        description: 'Серверная разработка',
        path: '/research/nodejs',
      },
      {
        id: 'express',
        name: 'Express',
        icon: 'logos:express',
        iconBg: '#000000',
        textColor: '#ffffff',
        description: 'Web-фреймворк для Node.js',
        path: '/research/express',
      },
      {
        id: 'prisma',
        name: 'Prisma',
        icon: 'simple-icons:prisma',
        iconBg: '#ffffff',
        textColor: '#2D3748',
        description: 'Современная ORM',
        path: '/research/prisma',
      },
      {
        id: 'graphql',
        name: 'GraphQL',
        icon: 'logos:graphql',
        iconBg: '#ffffff',
        textColor: '#E535AB',
        description: 'API запросов и мутаций',
        path: '/research/graphql',
      },
      // ... другие бэкенд технологии
    ],
  },
  {
    id: 'devops',
    name: 'DevOps',
    icon: 'ph:cloud-bold',
    color: '#10B981',
    description: 'Инструменты разработки и деплоя',
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
      {
        id: 'kubernetes',
        name: 'Kubernetes',
        icon: 'logos:kubernetes',
        iconBg: '#ffffff',
        textColor: '#326CE5',
        description: 'Оркестрация контейнеров',
        path: '/research/kubernetes',
      },
      {
        id: 'github-actions',
        name: 'GitHub Actions',
        icon: 'logos:github-actions',
        iconBg: '#2088FF',
        textColor: '#ffffff',
        description: 'CI/CD пайплайны',
        path: '/research/github-actions',
      },
      {
        id: 'aws',
        name: 'AWS',
        icon: 'logos:aws',
        iconBg: '#232F3E',
        textColor: '#FF9900',
        description: 'Облачные сервисы',
        path: '/research/aws',
      },
      // ... другие DevOps инструменты
    ],
  },
  {
    id: 'motion-design',
    name: 'Motion Design',
    icon: 'ph:circle-notch-bold',
    color: '#EC4899',
    description: 'Анимации, взаимодействия и визуальные эффекты',
    isMainCategory: true,
    path: '/research/motion-design',
  },
  {
    id: 'security',
    name: 'Information Security',
    icon: 'ph:shield-bold',
    color: '#DC2626',
    description: 'Защита данных и приложений',
    isMainCategory: true,
    path: '/research/security',
  },
  {
    id: 'challenges',
    name: 'Challenges',
    icon: 'ph:check-square-bold',
    color: '#F59E0B',
    description: 'Решайте задачи, получайте награды и развивайте навыки',
    comingSoon: true,
  },
]
