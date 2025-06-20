import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import MdxContentLoader from '../../../components/MDX/MdxContentLoader';
import LessonNavigation from '../../../components/MDX/LessonNavigation';

const TOTAL_LESSONS = 16; // Next.js имеет 16 уроков

const Nextjs: React.FC = () => {
  const [currentLesson, setCurrentLesson] = useState(1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-100/10 via-transparent to-transparent" />
        <div className="container relative z-10 px-4 py-20 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-black rounded-2xl">
                <Icon icon="logos:nextjs-icon" className="w-24 h-24" />
              </div>
            </div>
            <h1 className="mb-4 text-5xl font-bold text-white">
              Next.js
            </h1>
            <p className="max-w-2xl mx-auto text-xl text-gray-300">
              Full-stack React фреймворк: решение всех проблем или новый vendor lock?
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
                <h3 className="mb-4 text-lg font-semibold text-gray-100">Быстрая информация</h3>
                <dl className="space-y-3 text-sm">
                  <div>
                    <dt className="text-gray-400">Создан</dt>
                    <dd className="text-white">2016 (Vercel)</dd>
                  </div>
                  <div>
                    <dt className="text-gray-400">Основа</dt>
                    <dd className="text-white">React + Node.js</dd>
                  </div>
                  <div>
                    <dt className="text-gray-400">Рендеринг</dt>
                    <dd className="text-white">SSR, SSG, ISR, CSR</dd>
                  </div>
                  <div>
                    <dt className="text-gray-400">Текущая версия</dt>
                    <dd className="text-white">Next.js 14</dd>
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
                <h3 className="mb-4 text-lg font-semibold text-gray-100">Ключевые фичи</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Icon icon="ph:file-jsx-fill" className="w-5 h-5 mt-0.5 text-blue-400 shrink-0" />
                    <span className="text-gray-300">App Router (новый)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon icon="ph:lightning-fill" className="w-5 h-5 mt-0.5 text-yellow-400 shrink-0" />
                    <span className="text-gray-300">Server Components</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon icon="ph:image-fill" className="w-5 h-5 mt-0.5 text-green-400 shrink-0" />
                    <span className="text-gray-300">Image Optimization</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon icon="ph:globe-fill" className="w-5 h-5 mt-0.5 text-purple-400 shrink-0" />
                    <span className="text-gray-300">Internationalization</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon icon="ph:database-fill" className="w-5 h-5 mt-0.5 text-cyan-400 shrink-0" />
                    <span className="text-gray-300">API Routes</span>
                  </li>
                </ul>
              </motion.div>

              {/* Rendering Methods */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="p-6 border rounded-lg bg-indigo-900/20 border-indigo-800/50"
              >
                <h3 className="mb-4 text-lg font-semibold text-indigo-400">Методы рендеринга</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="font-mono text-indigo-400">SSR</span>
                    <span className="text-gray-300">Server-Side Rendering</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-mono text-indigo-400">SSG</span>
                    <span className="text-gray-300">Static Site Generation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-mono text-indigo-400">ISR</span>
                    <span className="text-gray-300">Incremental Static Regeneration</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-mono text-indigo-400">CSR</span>
                    <span className="text-gray-300">Client-Side Rendering</span>
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
              <h2 className="mb-6 text-2xl font-semibold text-gray-100">
                Next.js: Полный стек на React
              </h2>
              
              <div className="mb-6 text-gray-300">
                <p className="mb-4">
                  Next.js обещает решить все проблемы React-разработки: роутинг, SSR, оптимизация, деплой. 
                  Но не создаёт ли он новые проблемы взамен старых? Давайте разберёмся объективно.
                </p>
                <p className="p-4 text-black bg-white border-l-4 border-black rounded-r">
                  <strong>Критический взгляд:</strong> Next.js мощный, но опinionated. 
                  Мы изучим не только возможности, но и ограничения, vendor lock-in и альтернативы.
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
                <MdxContentLoader lessonNumber={currentLesson} docFolder="NEXTDOCS" />
              </div>

              {/* App Router vs Pages Router */}
              <div className="p-6 mt-8 border rounded-lg bg-slate-900/50 border-slate-700">
                <h3 className="mb-4 text-lg font-semibold text-gray-100">App Router vs Pages Router</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="p-4 border rounded border-slate-700">
                    <h4 className="mb-2 font-medium text-blue-400">Pages Router (старый)</h4>
                    <pre className="text-xs text-gray-300">
{`pages/
├── index.js
├── about.js
└── blog/
    └── [slug].js`}
                    </pre>
                  </div>
                  <div className="p-4 border rounded border-slate-700">
                    <h4 className="mb-2 font-medium text-green-400">App Router (новый)</h4>
                    <pre className="text-xs text-gray-300">
{`app/
├── page.tsx
├── layout.tsx
└── blog/
    └── [slug]/
        └── page.tsx`}
                    </pre>
                  </div>
                </div>
              </div>

              {/* Code Example */}
              <div className="p-6 mt-8 border rounded-lg bg-slate-900/50 border-slate-700">
                <h3 className="mb-4 text-lg font-semibold text-gray-100">Пример: Server Components + Actions</h3>
                <pre className="p-4 overflow-x-auto text-sm rounded bg-slate-950">
                  <code className="language-typescript">{`// app/posts/page.tsx - Server Component
async function PostsPage() {
  // Прямой доступ к БД на сервере
  const posts = await db.post.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div>
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}

// app/posts/actions.ts - Server Actions
'use server';

export async function createPost(formData: FormData) {
  const title = formData.get('title');
  const content = formData.get('content');
  
  // Валидация на сервере
  if (!title || !content) {
    throw new Error('Missing fields');
  }
  
  // Сохранение в БД
  const post = await db.post.create({
    data: { title, content }
  });
  
  // Автоматический revalidate
  revalidatePath('/posts');
  redirect(\`/posts/\${post.id}\`);
}`}</code>
                </pre>
              </div>

              {/* Performance Metrics */}
              <div className="p-6 mt-8 border rounded-lg bg-green-900/20 border-green-800/50">
                <h3 className="mb-4 text-lg font-semibold text-green-400">Метрики производительности</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span className="text-gray-400">First Contentful Paint</span>
                      <span className="text-green-400">0.8s</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-slate-700">
                      <div className="h-full bg-gradient-to-r from-green-500 to-green-600" style={{ width: '90%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span className="text-gray-400">Time to Interactive</span>
                      <span className="text-yellow-400">2.1s</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-slate-700">
                      <div className="h-full bg-gradient-to-r from-yellow-500 to-yellow-600" style={{ width: '70%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span className="text-gray-400">Lighthouse Score</span>
                      <span className="text-green-400">98/100</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-slate-700">
                      <div className="h-full bg-gradient-to-r from-green-500 to-green-600" style={{ width: '98%' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Resources */}
              <div className="pt-8 mt-12 border-t border-slate-700">
                <h3 className="mb-4 text-xl font-semibold text-gray-100">Полезные ресурсы</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <a
                    href="https://nextjs.org/docs"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 transition-colors border rounded-lg border-slate-700 hover:bg-slate-700/50"
                  >
                    <Icon icon="logos:nextjs-icon" className="w-8 h-8" />
                    <div>
                      <h4 className="font-medium text-white">Next.js Documentation</h4>
                      <p className="text-sm text-gray-400">Официальная документация</p>
                    </div>
                  </a>
                  <a
                    href="https://github.com/vercel/next.js"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 transition-colors border rounded-lg border-slate-700 hover:bg-slate-700/50"
                  >
                    <Icon icon="mdi:github" className="w-8 h-8 text-gray-400" />
                    <div>
                      <h4 className="font-medium text-white">GitHub Repository</h4>
                      <p className="text-sm text-gray-400">Исходный код и примеры</p>
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

export default Nextjs;