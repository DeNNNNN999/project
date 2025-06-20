import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import MdxContentLoader from '../../../components/MDX/MdxContentLoader';
import LessonNavigation from '../../../components/MDX/LessonNavigation';

const TOTAL_LESSONS = 15; // Docker имеет 15 уроков

const Docker: React.FC = () => {
  const [currentLesson, setCurrentLesson] = useState(1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 via-transparent to-transparent" />
        <div className="container relative z-10 px-4 py-20 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="flex justify-center mb-6">
              <div className="p-4 rounded-2xl bg-blue-500/20 backdrop-blur-sm">
                <Icon icon="logos:docker-icon" className="w-24 h-24" />
              </div>
            </div>
            <h1 className="mb-4 text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
              Docker
            </h1>
            <p className="max-w-2xl mx-auto text-xl text-gray-300">
              Контейнеризация: революция в деплое или ещё один слой абстракции?
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container px-4 py-12 mx-auto">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Quick Stats */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="p-6 border rounded-lg bg-slate-800/50 border-slate-700"
              >
                <h3 className="mb-4 text-lg font-semibold text-blue-400">Быстрая информация</h3>
                <dl className="space-y-3 text-sm">
                  <div>
                    <dt className="text-gray-400">Создан</dt>
                    <dd className="text-white">2013 (Solomon Hykes)</dd>
                  </div>
                  <div>
                    <dt className="text-gray-400">Язык</dt>
                    <dd className="text-white">Go</dd>
                  </div>
                  <div>
                    <dt className="text-gray-400">Тип</dt>
                    <dd className="text-white">Платформа контейнеризации</dd>
                  </div>
                  <div>
                    <dt className="text-gray-400">Runtime</dt>
                    <dd className="text-white">containerd, runc</dd>
                  </div>
                </dl>
              </motion.div>

              {/* Core Concepts */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="p-6 border rounded-lg bg-slate-800/50 border-slate-700"
              >
                <h3 className="mb-4 text-lg font-semibold text-blue-400">Ключевые концепции</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Icon icon="ph:package-fill" className="w-5 h-5 mt-0.5 text-blue-400 shrink-0" />
                    <span className="text-gray-300">Images (образы)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon icon="ph:cube-fill" className="w-5 h-5 mt-0.5 text-blue-400 shrink-0" />
                    <span className="text-gray-300">Containers (контейнеры)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon icon="ph:stack-fill" className="w-5 h-5 mt-0.5 text-blue-400 shrink-0" />
                    <span className="text-gray-300">Layers (слои)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon icon="ph:git-branch-fill" className="w-5 h-5 mt-0.5 text-blue-400 shrink-0" />
                    <span className="text-gray-300">Registry (реестр)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon icon="ph:network-fill" className="w-5 h-5 mt-0.5 text-blue-400 shrink-0" />
                    <span className="text-gray-300">Networking</span>
                  </li>
                </ul>
              </motion.div>

              {/* Docker vs VMs */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="p-6 border rounded-lg bg-purple-900/20 border-purple-800/50"
              >
                <h3 className="mb-4 text-lg font-semibold text-purple-400">Docker vs VMs</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <h4 className="mb-1 font-medium text-white">Docker ✅</h4>
                    <ul className="space-y-1 text-gray-300">
                      <li>• Легковесные (MB)</li>
                      <li>• Быстрый старт (секунды)</li>
                      <li>• Общее ядро ОС</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="mb-1 font-medium text-white">VMs ❌</h4>
                    <ul className="space-y-1 text-gray-300">
                      <li>• Тяжёлые (GB)</li>
                      <li>• Медленный старт (минуты)</li>
                      <li>• Полная ОС в каждой VM</li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="p-8 border rounded-lg bg-slate-800/50 border-slate-700"
            >
              <h2 className="mb-6 text-2xl font-semibold text-blue-400">
                Docker: Контейнеризация приложений
              </h2>
              
              <div className="mb-6 text-gray-300">
                <p className="mb-4">
                  Docker изменил подход к развёртыванию приложений, но действительно ли контейнеры решают все проблемы деплоя? 
                  В этом курсе мы критически анализируем Docker, его экосистему и реальные use cases.
                </p>
                <p className="p-4 border-l-4 border-blue-500/50 bg-blue-500/10 rounded-r">
                  <strong className="text-blue-400">Практический подход:</strong> Мы не только изучаем команды Docker, 
                  но и разбираем архитектуру, безопасность, оптимизацию и альтернативы.
                </p>
              </div>

              {/* Lesson Navigation */}
              <LessonNavigation 
                currentLesson={currentLesson}
                totalLessons={TOTAL_LESSONS}
                onSelectLesson={setCurrentLesson}
              />
              
              {/* MDX Content */}
              <div className="pt-8 mt-8 border-t border-slate-700">
                <MdxContentLoader lessonNumber={currentLesson} docFolder="DOCKERDOCS" />
              </div>

              {/* Docker Architecture */}
              <div className="p-6 mt-8 border rounded-lg bg-slate-900/50 border-slate-700">
                <h3 className="mb-4 text-lg font-semibold text-blue-400">Архитектура Docker</h3>
                <div className="p-4 font-mono text-sm rounded bg-slate-950">
                  <div className="mb-4 text-center">
                    <div className="mb-2 text-blue-400">┌─────────────┐</div>
                    <div className="mb-2 text-blue-400">│ Docker CLI  │</div>
                    <div className="mb-2 text-blue-400">└──────┬──────┘</div>
                    <div className="mb-2 text-gray-500">       │ REST API</div>
                    <div className="mb-2 text-green-400">┌──────▼──────┐</div>
                    <div className="mb-2 text-green-400">│ Docker Daemon│</div>
                    <div className="mb-2 text-green-400">└──────┬──────┘</div>
                    <div className="mb-2 text-gray-500">       │</div>
                    <div className="mb-2 text-yellow-400">┌──────▼──────┐</div>
                    <div className="mb-2 text-yellow-400">│ containerd  │</div>
                    <div className="mb-2 text-yellow-400">└──────┬──────┘</div>
                    <div className="mb-2 text-gray-500">       │</div>
                    <div className="mb-2 text-red-400">┌──────▼──────┐</div>
                    <div className="text-red-400">│    runc     │</div>
                  </div>
                </div>
              </div>

              {/* Dockerfile Best Practices */}
              <div className="p-6 mt-8 border rounded-lg bg-slate-900/50 border-slate-700">
                <h3 className="mb-4 text-lg font-semibold text-blue-400">Dockerfile Best Practices</h3>
                <pre className="p-4 overflow-x-auto text-sm rounded bg-slate-950">
                  <code className="language-dockerfile">{`# ❌ Плохо
FROM node:latest
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]

# ✅ Хорошо
FROM node:18-alpine AS builder
WORKDIR /app
# Сначала копируем только package файлы для кеширования
COPY package*.json ./
RUN npm ci --only=production

FROM node:18-alpine
WORKDIR /app
# Используем non-root user
USER node
# Копируем только необходимое
COPY --chown=node:node --from=builder /app/node_modules ./node_modules
COPY --chown=node:node . .
# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node healthcheck.js
EXPOSE 3000
CMD ["node", "server.js"]`}</code>
                </pre>
              </div>

              {/* Docker Compose Example */}
              <div className="p-6 mt-8 border rounded-lg bg-slate-900/50 border-slate-700">
                <h3 className="mb-4 text-lg font-semibold text-blue-400">Docker Compose для разработки</h3>
                <pre className="p-4 overflow-x-auto text-sm rounded bg-slate-950">
                  <code className="language-yaml">{`version: '3.9'

services:
  app:
    build: 
      context: .
      target: development
    volumes:
      - .:/app
      - /app/node_modules  # Анонимный volume для node_modules
    environment:
      - NODE_ENV=development
      - DATABASE_URL=postgresql://user:pass@db:5432/mydb
    ports:
      - "3000:3000"
    depends_on:
      db:
        condition: service_healthy

  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
      POSTGRES_DB: mydb
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U user"]
      interval: 10s
      timeout: 5s
      retries: 5

  redis:
    image: redis:7-alpine
    command: redis-server --appendonly yes
    volumes:
      - redis_data:/data

volumes:
  postgres_data:
  redis_data:`}</code>
                </pre>
              </div>

              {/* Security Tips */}
              <div className="p-6 mt-8 border rounded-lg bg-red-900/20 border-red-800/50">
                <h3 className="mb-4 text-lg font-semibold text-red-400">Безопасность Docker</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Icon icon="ph:shield-check-fill" className="w-5 h-5 mt-0.5 text-green-400 shrink-0" />
                    <span className="text-gray-300">Используй официальные и минимальные образы (alpine)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon icon="ph:shield-check-fill" className="w-5 h-5 mt-0.5 text-green-400 shrink-0" />
                    <span className="text-gray-300">Не запускай контейнеры от root</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon icon="ph:shield-check-fill" className="w-5 h-5 mt-0.5 text-green-400 shrink-0" />
                    <span className="text-gray-300">Сканируй образы на уязвимости</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon icon="ph:shield-check-fill" className="w-5 h-5 mt-0.5 text-green-400 shrink-0" />
                    <span className="text-gray-300">Используй секреты, а не переменные окружения для паролей</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon icon="ph:shield-warning-fill" className="w-5 h-5 mt-0.5 text-red-400 shrink-0" />
                    <span className="text-gray-300">Никогда не храни секреты в образах!</span>
                  </li>
                </ul>
              </div>

              {/* Additional Resources */}
              <div className="pt-8 mt-12 border-t border-slate-700">
                <h3 className="mb-4 text-xl font-semibold text-blue-400">Полезные ресурсы</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <a
                    href="https://docs.docker.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 transition-colors border rounded-lg border-slate-700 hover:bg-slate-700/50"
                  >
                    <Icon icon="logos:docker-icon" className="w-8 h-8" />
                    <div>
                      <h4 className="font-medium text-white">Docker Documentation</h4>
                      <p className="text-sm text-gray-400">Официальная документация</p>
                    </div>
                  </a>
                  <a
                    href="https://play-with-docker.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 transition-colors border rounded-lg border-slate-700 hover:bg-slate-700/50"
                  >
                    <Icon icon="ph:play-circle-fill" className="w-8 h-8 text-blue-400" />
                    <div>
                      <h4 className="font-medium text-white">Play with Docker</h4>
                      <p className="text-sm text-gray-400">Практика в браузере</p>
                    </div>
                  </a>
                </div>
              </div>
            </motion.div>
          </main>
        </div>
      </section>
    </div>
  );
};

export default Docker;