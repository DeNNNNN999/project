import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import MdxContentLoader from '../../../components/MDX/MdxContentLoader';
import LessonNavigation from '../../../components/MDX/LessonNavigation';

const TOTAL_LESSONS = 14;

const JavaScript: React.FC = () => {
  const [currentLesson, setCurrentLesson] = useState(1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/10 via-transparent to-transparent" />
        <div className="container relative z-10 px-4 py-20 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="flex justify-center mb-6">
              <div className="p-4 rounded-2xl bg-yellow-500/20 backdrop-blur-sm">
                <Icon icon="logos:javascript" className="w-24 h-24" />
              </div>
            </div>
            <h1 className="mb-4 text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
              JavaScript
            </h1>
            <p className="max-w-2xl mx-auto text-xl text-gray-300">
              Критический анализ языка, который изменил веб
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
                <h3 className="mb-4 text-lg font-semibold text-yellow-400">Быстрая информация</h3>
                <dl className="space-y-3 text-sm">
                  <div>
                    <dt className="text-gray-400">Создан</dt>
                    <dd className="text-white">1995 (Brendan Eich)</dd>
                  </div>
                  <div>
                    <dt className="text-gray-400">Парадигма</dt>
                    <dd className="text-white">Мультипарадигменный</dd>
                  </div>
                  <div>
                    <dt className="text-gray-400">Типизация</dt>
                    <dd className="text-white">Динамическая, слабая</dd>
                  </div>
                  <div>
                    <dt className="text-gray-400">Последняя версия</dt>
                    <dd className="text-white">ECMAScript 2024</dd>
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
                <h3 className="mb-4 text-lg font-semibold text-yellow-400">Ключевые особенности</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Icon icon="ph:check-circle-fill" className="w-5 h-5 mt-0.5 text-green-400 shrink-0" />
                    <span className="text-gray-300">Event Loop и асинхронность</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon icon="ph:check-circle-fill" className="w-5 h-5 mt-0.5 text-green-400 shrink-0" />
                    <span className="text-gray-300">Прототипное наследование</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon icon="ph:check-circle-fill" className="w-5 h-5 mt-0.5 text-green-400 shrink-0" />
                    <span className="text-gray-300">Функции первого класса</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon icon="ph:check-circle-fill" className="w-5 h-5 mt-0.5 text-green-400 shrink-0" />
                    <span className="text-gray-300">Замыкания (Closures)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon icon="ph:warning-circle-fill" className="w-5 h-5 mt-0.5 text-orange-400 shrink-0" />
                    <span className="text-gray-300">Автоматическое приведение типов</span>
                  </li>
                </ul>
              </motion.div>

              {/* Common Pitfalls */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="p-6 border rounded-lg bg-red-900/20 border-red-800/50"
              >
                <h3 className="mb-4 text-lg font-semibold text-red-400">Частые проблемы</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Icon icon="ph:x-circle-fill" className="w-5 h-5 mt-0.5 text-red-400 shrink-0" />
                    <span className="text-gray-300">typeof null === "object"</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon icon="ph:x-circle-fill" className="w-5 h-5 mt-0.5 text-red-400 shrink-0" />
                    <span className="text-gray-300">0.1 + 0.2 !== 0.3</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon icon="ph:x-circle-fill" className="w-5 h-5 mt-0.5 text-red-400 shrink-0" />
                    <span className="text-gray-300">this контекст</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon icon="ph:x-circle-fill" className="w-5 h-5 mt-0.5 text-red-400 shrink-0" />
                    <span className="text-gray-300">Hoisting переменных</span>
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
              <h2 className="mb-6 text-2xl font-semibold text-yellow-400">
                JavaScript: Критический Курс
              </h2>
              
              <div className="mb-6 text-gray-300">
                <p className="mb-4">
                  Этот курс представляет собой систематический и критический анализ JavaScript как языка программирования. 
                  Мы рассмотрим его особенности, сильные и слабые стороны, исторический контекст и практическое применение.
                </p>
                <p className="p-4 border-l-4 border-yellow-500/50 bg-yellow-500/10 rounded-r">
                  <strong className="text-yellow-400">Важно:</strong> Курс предполагает критический взгляд на язык. 
                  Мы не просто изучаем синтаксис, а анализируем дизайн-решения и их последствия.
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
                <MdxContentLoader lessonNumber={currentLesson} docFolder="JSDOCS" />
              </div>

              {/* Additional Resources */}
              <div className="pt-8 mt-12 border-t border-slate-700">
                <h3 className="mb-4 text-xl font-semibold text-yellow-400">Дополнительные ресурсы</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <a
                    href="https://developer.mozilla.org/en-US/docs/Web/JavaScript"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 transition-colors border rounded-lg border-slate-700 hover:bg-slate-700/50"
                  >
                    <Icon icon="simple-icons:mdnwebdocs" className="w-8 h-8 text-orange-400" />
                    <div>
                      <h4 className="font-medium text-white">MDN Web Docs</h4>
                      <p className="text-sm text-gray-400">Официальная документация</p>
                    </div>
                  </a>
                  <a
                    href="https://javascript.info/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 transition-colors border rounded-lg border-slate-700 hover:bg-slate-700/50"
                  >
                    <Icon icon="ph:book-open-fill" className="w-8 h-8 text-yellow-400" />
                    <div>
                      <h4 className="font-medium text-white">JavaScript.info</h4>
                      <p className="text-sm text-gray-400">Современный учебник</p>
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

export default JavaScript;