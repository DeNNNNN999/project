import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import MdxContentLoader from '../../../components/MDX/MdxContentLoader';
import LessonNavigation from '../../../components/MDX/LessonNavigation';

const TOTAL_LESSONS = 19; // React имеет 19 уроков

const ReactPage: React.FC = () => {
  const [currentLesson, setCurrentLesson] = useState(1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 via-transparent to-transparent" />
        <div className="container relative z-10 px-4 py-20 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="flex justify-center mb-6">
              <div className="p-4 rounded-2xl bg-cyan-500/20 backdrop-blur-sm">
                <Icon icon="logos:react" className="w-24 h-24" />
              </div>
            </div>
            <h1 className="mb-4 text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-600">
              React
            </h1>
            <p className="max-w-2xl mx-auto text-xl text-gray-300">
              Библиотека для UI или религия современного фронтенда?
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
                <h3 className="mb-4 text-lg font-semibold text-cyan-400">Быстрая информация</h3>
                <dl className="space-y-3 text-sm">
                  <div>
                    <dt className="text-gray-400">Создан</dt>
                    <dd className="text-white">2013 (Facebook/Meta)</dd>
                  </div>
                  <div>
                    <dt className="text-gray-400">Тип</dt>
                    <dd className="text-white">UI библиотека</dd>
                  </div>
                  <div>
                    <dt className="text-gray-400">Парадигма</dt>
                    <dd className="text-white">Декларативная, компонентная</dd>
                  </div>
                  <div>
                    <dt className="text-gray-400">Текущая версия</dt>
                    <dd className="text-white">React 19</dd>
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
                <h3 className="mb-4 text-lg font-semibold text-cyan-400">Ключевые концепции</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Icon icon="ph:atom-fill" className="w-5 h-5 mt-0.5 text-cyan-400 shrink-0" />
                    <span className="text-gray-300">Virtual DOM</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon icon="ph:atom-fill" className="w-5 h-5 mt-0.5 text-cyan-400 shrink-0" />
                    <span className="text-gray-300">Однонаправленный поток данных</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon icon="ph:atom-fill" className="w-5 h-5 mt-0.5 text-cyan-400 shrink-0" />
                    <span className="text-gray-300">Hooks и функциональные компоненты</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon icon="ph:atom-fill" className="w-5 h-5 mt-0.5 text-cyan-400 shrink-0" />
                    <span className="text-gray-300">JSX синтаксис</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon icon="ph:atom-fill" className="w-5 h-5 mt-0.5 text-cyan-400 shrink-0" />
                    <span className="text-gray-300">Server Components (новое)</span>
                  </li>
                </ul>
              </motion.div>

              {/* Common Mistakes */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="p-6 border rounded-lg bg-purple-900/20 border-purple-800/50"
              >
                <h3 className="mb-4 text-lg font-semibold text-purple-400">Частые ошибки</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Icon icon="ph:warning-octagon-fill" className="w-5 h-5 mt-0.5 text-purple-400 shrink-0" />
                    <span className="text-gray-300">Мутация state</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon icon="ph:warning-octagon-fill" className="w-5 h-5 mt-0.5 text-purple-400 shrink-0" />
                    <span className="text-gray-300">useEffect dependency hell</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon icon="ph:warning-octagon-fill" className="w-5 h-5 mt-0.5 text-purple-400 shrink-0" />
                    <span className="text-gray-300">Prop drilling</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon icon="ph:warning-octagon-fill" className="w-5 h-5 mt-0.5 text-purple-400 shrink-0" />
                    <span className="text-gray-300">Избыточные ре-рендеры</span>
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
              <h2 className="mb-6 text-2xl font-semibold text-cyan-400">
                React: Критический анализ
              </h2>
              
              <div className="mb-6 text-gray-300">
                <p className="mb-4">
                  React изменил подход к построению пользовательских интерфейсов, но создал ли он больше проблем, чем решил? 
                  В этом курсе мы критически анализируем React, его экосистему и влияние на индустрию.
                </p>
                <p className="p-4 border-l-4 border-cyan-500/50 bg-cyan-500/10 rounded-r">
                  <strong className="text-cyan-400">Подход курса:</strong> Мы не просто учим "как использовать React", 
                  а разбираем почему он работает именно так, какие компромиссы были сделаны и какие альтернативы существуют.
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
                <MdxContentLoader lessonNumber={currentLesson} docFolder="REACTDOCS" />
              </div>

              {/* React Evolution Timeline */}
              <div className="p-6 mt-8 border rounded-lg bg-slate-900/50 border-slate-700">
                <h3 className="mb-4 text-lg font-semibold text-cyan-400">Эволюция React</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex gap-3">
                    <span className="font-mono text-cyan-400 shrink-0">2013</span>
                    <span className="text-gray-300">Открытый релиз, классовые компоненты</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="font-mono text-cyan-400 shrink-0">2018</span>
                    <span className="text-gray-300">React 16.8 - Hooks революция</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="font-mono text-cyan-400 shrink-0">2020</span>
                    <span className="text-gray-300">React 17 - постепенные обновления</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="font-mono text-cyan-400 shrink-0">2022</span>
                    <span className="text-gray-300">React 18 - Concurrent features</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="font-mono text-cyan-400 shrink-0">2024</span>
                    <span className="text-gray-300">React 19 - Server Components, Actions</span>
                  </div>
                </div>
              </div>

              {/* Code Example */}
              <div className="p-6 mt-8 border rounded-lg bg-slate-900/50 border-slate-700">
                <h3 className="mb-4 text-lg font-semibold text-cyan-400">Пример: Эволюция компонентов</h3>
                <pre className="p-4 overflow-x-auto text-sm rounded bg-slate-950">
                  <code className="language-jsx">{`// 2013: Классовый компонент
class Counter extends React.Component {
  state = { count: 0 };
  
  increment = () => {
    this.setState({ count: this.state.count + 1 });
  };
  
  render() {
    return <button onClick={this.increment}>{this.state.count}</button>;
  }
}

// 2019: Функциональный с Hooks
function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}

// 2024: Server Component с Actions
async function Counter() {
  async function increment() {
    'use server';
    // Серверная логика
  }
  
  return <form action={increment}><button>Increment</button></form>;
}`}</code>
                </pre>
              </div>

              {/* Additional Resources */}
              <div className="pt-8 mt-12 border-t border-slate-700">
                <h3 className="mb-4 text-xl font-semibold text-cyan-400">Ресурсы для изучения</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <a
                    href="https://react.dev/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 transition-colors border rounded-lg border-slate-700 hover:bg-slate-700/50"
                  >
                    <Icon icon="logos:react" className="w-8 h-8" />
                    <div>
                      <h4 className="font-medium text-white">React.dev</h4>
                      <p className="text-sm text-gray-400">Новая официальная документация</p>
                    </div>
                  </a>
                  <a
                    href="https://github.com/facebook/react"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 transition-colors border rounded-lg border-slate-700 hover:bg-slate-700/50"
                  >
                    <Icon icon="mdi:github" className="w-8 h-8 text-gray-400" />
                    <div>
                      <h4 className="font-medium text-white">GitHub Repository</h4>
                      <p className="text-sm text-gray-400">Исходный код React</p>
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

export default ReactPage;