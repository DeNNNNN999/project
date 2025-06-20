import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import MdxContentLoader from '../../../components/MDX/MdxContentLoader';
import LessonNavigation from '../../../components/MDX/LessonNavigation';

const TOTAL_LESSONS = 15; // Node.js с Express имеет 15 уроков

const Nodejswithexpress: React.FC = () => {
  const [currentLesson, setCurrentLesson] = useState(1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-green-600/10 via-transparent to-transparent" />
        <div className="container relative z-10 px-4 py-20 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="flex justify-center gap-4 mb-6">
              <div className="p-4 rounded-2xl bg-green-600/20 backdrop-blur-sm">
                <Icon icon="logos:nodejs-icon" className="w-20 h-20" />
              </div>
              <div className="p-4 rounded-2xl bg-gray-600/20 backdrop-blur-sm">
                <Icon icon="simple-icons:express" className="w-20 h-20 text-gray-300" />
              </div>
            </div>
            <h1 className="mb-4 text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600">
              Node.js + Express
            </h1>
            <p className="max-w-2xl mx-auto text-xl text-gray-300">
              Backend на JavaScript: революция или костыль?
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
                <h3 className="mb-4 text-lg font-semibold text-green-400">Быстрая информация</h3>
                <dl className="space-y-3 text-sm">
                  <div>
                    <dt className="text-gray-400">Node.js создан</dt>
                    <dd className="text-white">2009 (Ryan Dahl)</dd>
                  </div>
                  <div>
                    <dt className="text-gray-400">Express создан</dt>
                    <dd className="text-white">2010 (TJ Holowaychuk)</dd>
                  </div>
                  <div>
                    <dt className="text-gray-400">Runtime</dt>
                    <dd className="text-white">V8 JavaScript Engine</dd>
                  </div>
                  <div>
                    <dt className="text-gray-400">Парадигма</dt>
                    <dd className="text-white">Event-driven, Non-blocking I/O</dd>
                  </div>
                </dl>
              </motion.div>

              {/* Key Features */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="p-6 border rounded-lg bg-slate-800/50 border-slate-700"
              >
                <h3 className="mb-4 text-lg font-semibold text-green-400">Ключевые особенности</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Icon icon="ph:lightning-fill" className="w-5 h-5 mt-0.5 text-green-400 shrink-0" />
                    <span className="text-gray-300">Асинхронный Event Loop</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon icon="ph:package-fill" className="w-5 h-5 mt-0.5 text-green-400 shrink-0" />
                    <span className="text-gray-300">NPM экосистема</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon icon="ph:rocket-fill" className="w-5 h-5 mt-0.5 text-green-400 shrink-0" />
                    <span className="text-gray-300">Быстрый I/O</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon icon="ph:devices-fill" className="w-5 h-5 mt-0.5 text-green-400 shrink-0" />
                    <span className="text-gray-300">Единый язык для full-stack</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon icon="ph:arrows-out-simple-fill" className="w-5 h-5 mt-0.5 text-green-400 shrink-0" />
                    <span className="text-gray-300">Middleware архитектура</span>
                  </li>
                </ul>
              </motion.div>

              {/* Common Pitfalls */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="p-6 border rounded-lg bg-orange-900/20 border-orange-800/50"
              >
                <h3 className="mb-4 text-lg font-semibold text-orange-400">Типичные проблемы</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Icon icon="ph:warning-circle-fill" className="w-5 h-5 mt-0.5 text-orange-400 shrink-0" />
                    <span className="text-gray-300">Callback Hell</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon icon="ph:warning-circle-fill" className="w-5 h-5 mt-0.5 text-orange-400 shrink-0" />
                    <span className="text-gray-300">CPU-intensive задачи</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon icon="ph:warning-circle-fill" className="w-5 h-5 mt-0.5 text-orange-400 shrink-0" />
                    <span className="text-gray-300">Memory leaks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon icon="ph:warning-circle-fill" className="w-5 h-5 mt-0.5 text-orange-400 shrink-0" />
                    <span className="text-gray-300">Отсутствие типизации</span>
                  </li>
                </ul>
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
              <h2 className="mb-6 text-2xl font-semibold text-green-400">
                Node.js с Express: Backend на JavaScript
              </h2>
              
              <div className="mb-6 text-gray-300">
                <p className="mb-4">
                  Node.js позволил JavaScript выйти за пределы браузера, а Express стал де-факто стандартом для веб-серверов. 
                  Но готов ли JavaScript к серьёзному backend-у? Давайте разберёмся критически.
                </p>
                <p className="p-4 border-l-4 border-green-500/50 bg-green-500/10 rounded-r">
                  <strong className="text-green-400">Подход курса:</strong> Мы не просто изучаем API, а анализируем архитектурные решения, 
                  производительность, безопасность и сравниваем с альтернативами.
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
                <MdxContentLoader lessonNumber={currentLesson} docFolder="EXPRESSWITHNODEJSDOCS" />
              </div>

              {/* Event Loop Visualization */}
              <div className="p-6 mt-8 border rounded-lg bg-slate-900/50 border-slate-700">
                <h3 className="mb-4 text-lg font-semibold text-green-400">Event Loop в действии</h3>
                <div className="p-4 font-mono text-sm rounded bg-slate-950">
                  <div className="mb-2">
                    <span className="text-green-400">// Call Stack</span>
                  </div>
                  <div className="mb-4 text-gray-300">
                    <div>[3] setTimeout callback</div>
                    <div>[2] console.log('async')</div>
                    <div>[1] main()</div>
                  </div>
                  
                  <div className="mb-2">
                    <span className="text-blue-400">// Task Queue</span>
                  </div>
                  <div className="mb-4 text-gray-300">
                    <div className="text-yellow-400">{`callback: () => console.log('2')`}</div>
                  </div>
                  
                  <div className="mb-2">
                    <span className="text-purple-400">// Microtask Queue</span>
                  </div>
                  <div className="text-gray-300">
                    <div className="text-cyan-400">Promise.resolve().then(...)</div>
                  </div>
                </div>
              </div>

              {/* Code Example */}
              <div className="p-6 mt-8 border rounded-lg bg-slate-900/50 border-slate-700">
                <h3 className="mb-4 text-lg font-semibold text-green-400">Пример: Express сервер с best practices</h3>
                <pre className="p-4 overflow-x-auto text-sm rounded bg-slate-950">
                  <code className="language-javascript">{`import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';

const app = express();

// Security middleware
app.use(helmet());
app.use(compression());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(err.status || 500).json({
    error: process.env.NODE_ENV === 'production' 
      ? 'Internal Server Error' 
      : err.message
  });
});

// Graceful shutdown
process.on('SIGTERM', () => {
  server.close(() => {
    console.log('Process terminated');
  });
});`}</code>
                </pre>
              </div>

              {/* Performance Tips */}
              <div className="p-6 mt-8 border rounded-lg bg-blue-900/20 border-blue-800/50">
                <h3 className="mb-4 text-lg font-semibold text-blue-400">Оптимизация производительности</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h4 className="mb-2 font-medium text-white">Do's ✅</h4>
                    <ul className="space-y-1 text-sm text-gray-300">
                      <li>• Используй clustering</li>
                      <li>• Кешируй статику</li>
                      <li>• Применяй streaming</li>
                      <li>• Оптимизируй middleware</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="mb-2 font-medium text-white">Don'ts ❌</h4>
                    <ul className="space-y-1 text-sm text-gray-300">
                      <li>• Синхронные операции</li>
                      <li>• Блокировка Event Loop</li>
                      <li>• Игнорирование ошибок</li>
                      <li>• Отсутствие мониторинга</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Additional Resources */}
              <div className="pt-8 mt-12 border-t border-slate-700">
                <h3 className="mb-4 text-xl font-semibold text-green-400">Полезные ресурсы</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <a
                    href="https://nodejs.org/docs/latest/api/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 transition-colors border rounded-lg border-slate-700 hover:bg-slate-700/50"
                  >
                    <Icon icon="logos:nodejs-icon" className="w-8 h-8" />
                    <div>
                      <h4 className="font-medium text-white">Node.js Docs</h4>
                      <p className="text-sm text-gray-400">Официальная документация</p>
                    </div>
                  </a>
                  <a
                    href="https://expressjs.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 transition-colors border rounded-lg border-slate-700 hover:bg-slate-700/50"
                  >
                    <Icon icon="simple-icons:express" className="w-8 h-8 text-gray-400" />
                    <div>
                      <h4 className="font-medium text-white">Express.js</h4>
                      <p className="text-sm text-gray-400">Минималистичный фреймворк</p>
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

export default Nodejswithexpress;