import React, { useState } from 'react'
import { motion } from 'motion/react'
import { Icon } from '@iconify/react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface CodeTabProps {
  children: React.ReactNode
  title: string
  language: string
  code: string
  isActive: boolean
  onClick: () => void
}

const CodeTab: React.FC<CodeTabProps> = ({ title, language, code, isActive, onClick }) => {
  return (
    <div className="mb-6">
      <button
        className={`px-4 py-2 font-medium rounded-t-lg text-sm transition-colors ${
          isActive 
            ? 'bg-slate-800 text-blue-400 border-t border-l border-r border-blue-500/30' 
            : 'bg-slate-700/50 text-gray-400 hover:text-white hover:bg-slate-700'
        }`}
        onClick={onClick}
      >
        {title}
      </button>
      
      {isActive && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="border rounded-r-lg rounded-b-lg border-slate-600"
        >
          <div className="flex items-center justify-between p-2 border-b bg-slate-800/80 border-slate-600">
            <div className="flex items-center gap-2">
              <Icon icon="mdi:code-tags" className="w-4 h-4 text-gray-400" />
              <span className="text-xs font-medium text-gray-400">{language}</span>
            </div>
            <div className="flex gap-2">
              <button 
                className="p-1 text-gray-400 transition-colors rounded hover:bg-slate-700 hover:text-white"
                title="Копировать код"
                onClick={() => navigator.clipboard.writeText(code)}
              >
                <Icon icon="mdi:content-copy" className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="p-0 overflow-auto">
            <SyntaxHighlighter 
              language={language} 
              style={vscDarkPlus}
              customStyle={{ 
                margin: 0,
                background: 'transparent',
                padding: '1rem',
                fontSize: '0.9rem',
                borderRadius: '0 0 0.5rem 0.5rem',
              }}
            >
              {code}
            </SyntaxHighlighter>
          </div>
        </motion.div>
      )}
    </div>
  )
}

const DockerCodeExamples: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dockerfile')
  
  const examples = {
    dockerfile: {
      title: 'Пример Dockerfile',
      language: 'dockerfile',
      code: `# Базовый образ
FROM node:18-alpine

# Рабочая директория внутри контейнера
WORKDIR /app

# Копирование файлов package.json и package-lock.json
COPY package*.json ./

# Установка зависимостей
RUN npm ci --only=production

# Копирование исходного кода приложения
COPY . .

# Определение порта, который будет использоваться
EXPOSE 3000

# Запуск приложения
CMD ["node", "src/index.js"]`
    },
    compose: {
      title: 'Пример docker-compose.yml',
      language: 'yaml',
      code: `version: '3.8'

services:
  web:
    build: ./web
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DB_HOST=db
      - DB_PORT=5432
      - DB_USER=postgres
    volumes:
      - ./web:/app
      - /app/node_modules
    depends_on:
      - db
    restart: unless-stopped

  db:
    image: postgres:14-alpine
    volumes:
      - postgres_data:/var/lib/postgresql/data
    environment:
      - POSTGRES_PASSWORD=secret
      - POSTGRES_USER=postgres
      - POSTGRES_DB=myapp
    ports:
      - "5432:5432"

volumes:
  postgres_data:`
    },
    commands: {
      title: 'Основные команды Docker',
      language: 'bash',
      code: `# Сборка образа
docker build -t myapp:latest .

# Запуск контейнера
docker run -d -p 3000:3000 --name myapp myapp:latest

# Просмотр запущенных контейнеров
docker ps

# Просмотр всех контейнеров
docker ps -a

# Просмотр логов контейнера
docker logs myapp

# Остановка контейнера
docker stop myapp

# Удаление контейнера
docker rm myapp

# Просмотр образов
docker images

# Удаление образа
docker rmi myapp:latest

# Запуск docker-compose
docker-compose up -d

# Остановка docker-compose
docker-compose down`
    },
    network: {
      title: 'Работа с сетями Docker',
      language: 'bash',
      code: `# Создание сети
docker network create mynetwork

# Просмотр списка сетей
docker network ls

# Подключение контейнера к сети
docker network connect mynetwork mycontainer

# Запуск контейнера в определенной сети
docker run -d --name myapp --network mynetwork myapp:latest

# Отключение контейнера от сети
docker network disconnect mynetwork mycontainer

# Инспектирование сети
docker network inspect mynetwork

# Удаление сети
docker network rm mynetwork`
    },
    volume: {
      title: 'Работа с томами Docker',
      language: 'bash',
      code: `# Создание тома
docker volume create myvolume

# Просмотр списка томов
docker volume ls

# Инспектирование тома
docker volume inspect myvolume

# Запуск контейнера с подключенным томом
docker run -d -v myvolume:/data --name myapp myapp:latest

# Привязка локальной директории (bind mount)
docker run -d -v $(pwd)/data:/app/data --name myapp myapp:latest

# Удаление тома
docker volume rm myvolume

# Удаление неиспользуемых томов
docker volume prune`
    }
  }

  return (
    <section id="code-examples" className="p-6 border rounded-lg bg-slate-800/40 border-slate-700/50">
      <h2 className="mb-4 text-2xl font-semibold text-green-400">Примеры кода Docker</h2>
      
      <div className="mb-6">
        <p className="text-gray-300">
          Ниже представлены практические примеры использования Docker, от базовых конфигураций до более 
          продвинутых сценариев. Эти примеры демонстрируют лучшие практики и типичные случаи использования.
        </p>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {Object.entries(examples).map(([key, example]) => (
          <button
            key={key}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === key 
                ? 'bg-green-500/20 text-green-400' 
                : 'bg-slate-700/50 text-gray-400 hover:text-white hover:bg-slate-700'
            }`}
            onClick={() => setActiveTab(key)}
          >
            {example.title}
          </button>
        ))}
      </div>
      
      {Object.entries(examples).map(([key, example]) => (
        <div key={key} className={`${activeTab === key ? 'block' : 'hidden'}`}>
          <SyntaxHighlighter 
            language={example.language} 
            style={vscDarkPlus}
            customStyle={{ 
              borderRadius: '0.5rem',
              marginTop: '1rem',
            }}
          >
            {example.code}
          </SyntaxHighlighter>
        </div>
      ))}
      
      <div className="p-4 mt-6 border rounded-lg bg-green-900/20 border-green-500/30">
        <div className="flex items-start gap-3">
          <div className="p-2 mt-1 rounded-md bg-green-500/20 shrink-0">
            <Icon icon="mdi:check-circle" className="w-5 h-5 text-green-400" />
          </div>
          <div>
            <h4 className="mb-2 text-lg font-medium text-green-300">Лучшие практики</h4>
            <p className="text-gray-300">
              При написании Dockerfile и настройке Docker-контейнеров рекомендуется следовать принципам минимализма 
              (использовать Alpine или slim-версии образов), многослойности (оптимизировать кэширование слоёв) и безопасности 
              (не запускать контейнеры от root). Также важно правильно организовывать сборку многостадийных образов для 
              минимизации их размера.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DockerCodeExamples
