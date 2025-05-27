import React, { useState } from 'react'
import { motion } from 'motion/react'
import { Icon } from '@iconify/react'

interface Task {
  id: number
  title: string
  difficulty: 'easy' | 'medium' | 'hard'
  description: string
  hints: string[]
}

const DockerTasks: React.FC = () => {
  const [expandedTask, setExpandedTask] = useState<number | null>(null)
  const [showHints, setShowHints] = useState<Record<number, boolean>>({})
  
  const toggleTask = (taskId: number) => {
    setExpandedTask(expandedTask === taskId ? null : taskId)
  }
  
  const toggleHints = (taskId: number) => {
    setShowHints(prev => ({
      ...prev,
      [taskId]: !prev[taskId]
    }))
  }
  
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-400 bg-green-500/20'
      case 'medium': return 'text-yellow-400 bg-yellow-500/20'
      case 'hard': return 'text-red-400 bg-red-500/20'
      default: return 'text-gray-400 bg-gray-500/20'
    }
  }
  
  const tasks: Task[] = [
    {
      id: 1,
      title: 'Создание многостадийного образа',
      difficulty: 'medium',
      description: 'Создайте многостадийный Dockerfile для Node.js приложения, который сначала собирает приложение (установка зависимостей, сборка) в одном образе, а затем копирует только необходимые файлы в финальный образ, чтобы минимизировать его размер.',
      hints: [
        'Используйте AS для именования стадий сборки',
        'В первой стадии используйте node:latest для сборки',
        'Во второй стадии используйте node:alpine для минимизации размера',
        'Копируйте только необходимые файлы из первой стадии во вторую'
      ]
    },
    {
      id: 2,
      title: 'Оркестрация микросервисов с Docker Compose',
      difficulty: 'hard',
      description: 'Разработайте docker-compose.yml для системы из четырех микросервисов: фронтенд (React), бэкенд API (Node.js), база данных (PostgreSQL) и кэш (Redis). Настройте сети, тома для персистентности данных и зависимости между сервисами.',
      hints: [
        'Определите общую сеть для коммуникации между сервисами',
        'Используйте тома для PostgreSQL и Redis',
        'Настройте depends_on для правильного порядка запуска',
        'Определите переменные окружения для подключения сервисов друг к другу'
      ]
    },
    {
      id: 3,
      title: 'Базовая конфигурация Nginx в Docker',
      difficulty: 'easy',
      description: 'Создайте контейнер с Nginx, который будет обслуживать статический сайт. Настройте проброс портов и монтирование локальной директории с HTML-файлами. Добавьте базовую конфигурацию Nginx для обработки запросов.',
      hints: [
        'Используйте образ nginx:alpine',
        'Монтируйте локальную директорию в /usr/share/nginx/html',
        'Пробросьте порт 80 контейнера на порт 8080 хоста',
        'Монтируйте пользовательский nginx.conf для кастомной конфигурации'
      ]
    },
    {
      id: 4,
      title: 'Настройка CI/CD с Docker и GitHub Actions',
      difficulty: 'hard',
      description: 'Создайте конфигурацию GitHub Actions, которая будет автоматически собирать Docker-образ при пуше в репозиторий, проводить тесты в изолированной среде и публиковать образ в GitHub Container Registry при успешном прохождении всех проверок.',
      hints: [
        'Используйте actions/checkout для получения кода',
        'Используйте docker/build-push-action для сборки',
        'Настройте кэширование слоев Docker для ускорения сборки',
        'Используйте secrets для хранения учетных данных реестра'
      ]
    },
    {
      id: 5,
      title: 'Оптимизация производительности контейнеров',
      difficulty: 'medium',
      description: 'Проанализируйте и оптимизируйте существующий Dockerfile для улучшения производительности, уменьшения размера образа и следования лучшим практикам. Оптимизируйте порядок слоев, уменьшите количество слоев, используйте соответствующие базовые образы.',
      hints: [
        'Используйте .dockerignore для исключения ненужных файлов',
        'Объединяйте команды RUN для уменьшения количества слоев',
        'Размещайте редко изменяемые слои в начале Dockerfile',
        'Используйте Alpine или slim-версии образов для уменьшения размера'
      ]
    },
    {
      id: 6,
      title: 'Настройка Docker Networking',
      difficulty: 'medium',
      description: 'Создайте пользовательскую bridge-сеть и настройте три контейнера для взаимодействия через эту сеть. Один контейнер должен предоставлять API, другой — базу данных, а третий — инструмент мониторинга, который будет отслеживать два других контейнера.',
      hints: [
        'Используйте docker network create для создания bridge-сети',
        'Запускайте контейнеры с флагом --network',
        'Настройте DNS-разрешение через имена контейнеров',
        'Для мониторинга используйте Prometheus или Grafana'
      ]
    }
  ]

  return (
    <section id="tasks" className="p-6 border rounded-lg bg-slate-800/40 border-slate-700/50">
      <h2 className="mb-4 text-2xl font-semibold text-purple-400">Практические задачи по Docker</h2>
      
      <div className="mb-6">
        <p className="text-gray-300">
          Ниже представлены практические задачи различной сложности для отработки навыков работы с Docker. 
          Каждая задача имеет описание, уровень сложности и подсказки, которые помогут вам двигаться в правильном направлении.
        </p>
      </div>
      
      <div className="space-y-4">
        {tasks.map(task => (
          <motion.div 
            key={task.id}
            className="border rounded-lg bg-slate-800/60 border-slate-700/50 overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: task.id * 0.1 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <div 
              className={`flex items-center justify-between p-4 cursor-pointer ${
                expandedTask === task.id ? 'bg-slate-700/50' : ''
              }`}
              onClick={() => toggleTask(task.id)}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-md bg-purple-500/20">
                  <Icon icon="mdi:puzzle" className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white">{task.title}</h3>
                  <div className="flex items-center mt-1 gap-2">
                    <span className={`px-2 py-0.5 text-xs font-medium rounded ${getDifficultyColor(task.difficulty)}`}>
                      {task.difficulty === 'easy' ? 'Легкий' : task.difficulty === 'medium' ? 'Средний' : 'Сложный'}
                    </span>
                  </div>
                </div>
              </div>
              <Icon 
                icon="mdi:chevron-down" 
                className={`w-5 h-5 text-gray-400 transition-transform ${
                  expandedTask === task.id ? 'rotate-180' : ''
                }`} 
              />
            </div>
            
            <motion.div
              initial={false}
              animate={{ 
                height: expandedTask === task.id ? 'auto' : 0, 
                opacity: expandedTask === task.id ? 1 : 0 
              }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="p-4 pt-0 border-t border-slate-700/50">
                <p className="mb-4 text-gray-300">{task.description}</p>
                
                <div className="mt-4">
                  <button
                    className="flex items-center px-3 py-1.5 text-sm font-medium rounded-md bg-slate-700 text-purple-300 hover:bg-slate-600 transition-colors gap-2"
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleHints(task.id)
                    }}
                  >
                    <Icon icon="mdi:lightbulb-on" className="w-4 h-4" />
                    {showHints[task.id] ? 'Скрыть подсказки' : 'Показать подсказки'}
                  </button>
                  
                  {showHints[task.id] && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-3 p-3 rounded-md bg-purple-900/20 border border-purple-500/30"
                    >
                      <h4 className="mb-2 text-sm font-medium text-purple-300">Подсказки:</h4>
                      <ul className="pl-5 space-y-1 text-sm text-gray-300 list-disc">
                        {task.hints.map((hint, index) => (
                          <li key={index}>{hint}</li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
      
      <div className="p-4 mt-6 border rounded-lg bg-purple-900/20 border-purple-500/30">
        <div className="flex items-start gap-3">
          <div className="p-2 mt-1 rounded-md bg-purple-500/20 shrink-0">
            <Icon icon="mdi:information-outline" className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <h4 className="mb-2 text-lg font-medium text-purple-300">Советы по выполнению</h4>
            <p className="text-gray-300">
              Рекомендуется начинать с более простых задач и постепенно переходить к сложным. 
              Практикуйтесь регулярно и изучайте документацию Docker для понимания всех возможностей 
              и тонкостей работы с контейнерами. Не бойтесь экспериментировать, ведь одно из преимуществ 
              Docker — быстрое создание и удаление изолированных сред.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DockerTasks
