import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import MdxContentLoader from '../../../components/MDX/MdxContentLoader';
import LessonNavigation from '../../../components/MDX/LessonNavigation';

const TOTAL_LESSONS = 15; // Redis имеет 15 уроков

const Redis: React.FC = () => {
  const [currentLesson, setCurrentLesson] = useState(1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-red-600/10 via-transparent to-transparent" />
        <div className="container relative z-10 px-4 py-20 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="flex justify-center mb-6">
              <div className="p-4 rounded-2xl bg-red-600/20 backdrop-blur-sm">
                <Icon icon="logos:redis" className="w-24 h-24" />
              </div>
            </div>
            <h1 className="mb-4 text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600">
              Redis
            </h1>
            <p className="max-w-2xl mx-auto text-xl text-gray-300">
              In-memory хранилище данных: швейцарский нож или оверинжиниринг?
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
                <h3 className="mb-4 text-lg font-semibold text-red-400">Быстрая информация</h3>
                <dl className="space-y-3 text-sm">
                  <div>
                    <dt className="text-gray-400">Создан</dt>
                    <dd className="text-white">2009 (Salvatore Sanfilippo)</dd>
                  </div>
                  <div>
                    <dt className="text-gray-400">Тип</dt>
                    <dd className="text-white">In-memory структура данных</dd>
                  </div>
                  <div>
                    <dt className="text-gray-400">Язык</dt>
                    <dd className="text-white">ANSI C</dd>
                  </div>
                  <div>
                    <dt className="text-gray-400">Лицензия</dt>
                    <dd className="text-white">BSD (с изменениями)</dd>
                  </div>
                </dl>
              </motion.div>

              {/* Data Structures */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="p-6 border rounded-lg bg-slate-800/50 border-slate-700"
              >
                <h3 className="mb-4 text-lg font-semibold text-red-400">Структуры данных</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Icon icon="ph:key-fill" className="w-5 h-5 mt-0.5 text-red-400 shrink-0" />
                    <span className="text-gray-300">Strings (строки)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon icon="ph:list-bullets-fill" className="w-5 h-5 mt-0.5 text-red-400 shrink-0" />
                    <span className="text-gray-300">Lists (списки)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon icon="ph:hash-fill" className="w-5 h-5 mt-0.5 text-red-400 shrink-0" />
                    <span className="text-gray-300">Hashes (хеш-таблицы)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon icon="ph:intersect-fill" className="w-5 h-5 mt-0.5 text-red-400 shrink-0" />
                    <span className="text-gray-300">Sets (множества)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon icon="ph:sort-ascending-fill" className="w-5 h-5 mt-0.5 text-red-400 shrink-0" />
                    <span className="text-gray-300">Sorted Sets (упорядоченные множества)</span>
                  </li>
                </ul>
              </motion.div>

              {/* Use Cases */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="p-6 border rounded-lg bg-green-900/20 border-green-800/50"
              >
                <h3 className="mb-4 text-lg font-semibold text-green-400">Популярные применения</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Icon icon="ph:lightning-fill" className="w-5 h-5 mt-0.5 text-green-400 shrink-0" />
                    <span className="text-gray-300">Кеширование</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon icon="ph:timer-fill" className="w-5 h-5 mt-0.5 text-green-400 shrink-0" />
                    <span className="text-gray-300">Сессии пользователей</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon icon="ph:queue-fill" className="w-5 h-5 mt-0.5 text-green-400 shrink-0" />
                    <span className="text-gray-300">Очереди задач</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon icon="ph:chart-line-up-fill" className="w-5 h-5 mt-0.5 text-green-400 shrink-0" />
                    <span className="text-gray-300">Real-time аналитика</span>
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
              <h2 className="mb-6 text-2xl font-semibold text-red-400">
                Redis: Больше чем просто кеш
              </h2>
              
              <div className="mb-6 text-gray-300">
                <p className="mb-4">
                  Redis часто воспринимают как "просто кеш", но это мощная in-memory база данных с богатым набором структур данных. 
                  В этом курсе мы разберём, когда Redis - правильный выбор, а когда - излишество.
                </p>
                <p className="p-4 border-l-4 border-red-500/50 bg-red-500/10 rounded-r">
                  <strong className="text-red-400">Важно понимать:</strong> Redis хранит все данные в памяти. 
                  Это даёт невероятную скорость, но требует тщательного планирования и понимания ограничений.
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
                <MdxContentLoader lessonNumber={currentLesson} docFolder="REDISDOCS" />
              </div>

              {/* Performance Comparison */}
              <div className="p-6 mt-8 border rounded-lg bg-slate-900/50 border-slate-700">
                <h3 className="mb-4 text-lg font-semibold text-red-400">Производительность Redis</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span className="text-gray-400">GET/SET операции</span>
                      <span className="text-green-400">100,000+ ops/sec</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-slate-700">
                      <div className="h-full bg-gradient-to-r from-red-500 to-red-600" style={{ width: '95%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span className="text-gray-400">Sorted Sets</span>
                      <span className="text-yellow-400">50,000+ ops/sec</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-slate-700">
                      <div className="h-full bg-gradient-to-r from-red-500 to-red-600" style={{ width: '60%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span className="text-gray-400">Pub/Sub</span>
                      <span className="text-blue-400">1M+ msgs/sec</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-slate-700">
                      <div className="h-full bg-gradient-to-r from-red-500 to-red-600" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Code Example */}
              <div className="p-6 mt-8 border rounded-lg bg-slate-900/50 border-slate-700">
                <h3 className="mb-4 text-lg font-semibold text-red-400">Пример: Паттерны использования</h3>
                <pre className="p-4 overflow-x-auto text-sm rounded bg-slate-950">
                  <code className="language-javascript">{`// 1. Кеширование с TTL
await redis.setex('user:123', 3600, JSON.stringify(userData));

// 2. Rate Limiting
const key = \`rate_limit:\${userId}\`;
const current = await redis.incr(key);
if (current === 1) {
  await redis.expire(key, 60); // 1 минута
}
if (current > 10) {
  throw new Error('Rate limit exceeded');
}

// 3. Leaderboard с Sorted Sets
await redis.zadd('game:scores', score, playerId);
const top10 = await redis.zrevrange('game:scores', 0, 9, 'WITHSCORES');

// 4. Pub/Sub для real-time
// Publisher
await redis.publish('notifications', JSON.stringify(message));

// Subscriber
redis.subscribe('notifications');
redis.on('message', (channel, message) => {
  console.log('Received:', message);
});`}</code>
                </pre>
              </div>

              {/* Additional Resources */}
              <div className="pt-8 mt-12 border-t border-slate-700">
                <h3 className="mb-4 text-xl font-semibold text-red-400">Полезные ресурсы</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <a
                    href="https://redis.io/docs/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 transition-colors border rounded-lg border-slate-700 hover:bg-slate-700/50"
                  >
                    <Icon icon="logos:redis" className="w-8 h-8" />
                    <div>
                      <h4 className="font-medium text-white">Redis Documentation</h4>
                      <p className="text-sm text-gray-400">Официальная документация</p>
                    </div>
                  </a>
                  <a
                    href="https://try.redis.io/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 transition-colors border rounded-lg border-slate-700 hover:bg-slate-700/50"
                  >
                    <Icon icon="ph:play-circle-fill" className="w-8 h-8 text-red-400" />
                    <div>
                      <h4 className="font-medium text-white">Try Redis</h4>
                      <p className="text-sm text-gray-400">Интерактивный туториал</p>
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

export default Redis;