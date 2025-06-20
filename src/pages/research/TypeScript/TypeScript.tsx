import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import MdxContentLoader from '../../../components/MDX/MdxContentLoader';
import LessonNavigation from '../../../components/MDX/LessonNavigation';

const TOTAL_LESSONS = 21; // TypeScript имеет 21 урок

const TypeScript: React.FC = () => {
  const [currentLesson, setCurrentLesson] = useState(1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-600/10 via-transparent to-transparent" />
        <div className="container relative z-10 px-4 py-20 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="flex justify-center mb-6">
              <div className="p-4 rounded-2xl bg-blue-600/20 backdrop-blur-sm">
                <Icon icon="logos:typescript-icon" className="w-24 h-24" />
              </div>
            </div>
            <h1 className="mb-4 text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
              TypeScript
            </h1>
            <p className="max-w-2xl mx-auto text-xl text-gray-300">
              JavaScript с типами: спасение или иллюзия безопасности?
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
                    <dd className="text-white">2012 (Microsoft)</dd>
                  </div>
                  <div>
                    <dt className="text-gray-400">Основа</dt>
                    <dd className="text-white">Надмножество JavaScript</dd>
                  </div>
                  <div>
                    <dt className="text-gray-400">Типизация</dt>
                    <dd className="text-white">Статическая, структурная</dd>
                  </div>
                  <div>
                    <dt className="text-gray-400">Последняя версия</dt>
                    <dd className="text-white">TypeScript 5.7</dd>
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
                <h3 className="mb-4 text-lg font-semibold text-blue-400">Преимущества</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Icon icon="ph:check-circle-fill" className="w-5 h-5 mt-0.5 text-green-400 shrink-0" />
                    <span className="text-gray-300">Статическая типизация</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon icon="ph:check-circle-fill" className="w-5 h-5 mt-0.5 text-green-400 shrink-0" />
                    <span className="text-gray-300">Отличная поддержка IDE</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon icon="ph:check-circle-fill" className="w-5 h-5 mt-0.5 text-green-400 shrink-0" />
                    <span className="text-gray-300">Рефакторинг без страха</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon icon="ph:check-circle-fill" className="w-5 h-5 mt-0.5 text-green-400 shrink-0" />
                    <span className="text-gray-300">Документация в коде</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon icon="ph:check-circle-fill" className="w-5 h-5 mt-0.5 text-green-400 shrink-0" />
                    <span className="text-gray-300">Generics и типы высшего порядка</span>
                  </li>
                </ul>
              </motion.div>

              {/* Common Issues */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="p-6 border rounded-lg bg-orange-900/20 border-orange-800/50"
              >
                <h3 className="mb-4 text-lg font-semibold text-orange-400">Проблемы и критика</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Icon icon="ph:warning-circle-fill" className="w-5 h-5 mt-0.5 text-orange-400 shrink-0" />
                    <span className="text-gray-300">Сложность типов</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon icon="ph:warning-circle-fill" className="w-5 h-5 mt-0.5 text-orange-400 shrink-0" />
                    <span className="text-gray-300">Время компиляции</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon icon="ph:warning-circle-fill" className="w-5 h-5 mt-0.5 text-orange-400 shrink-0" />
                    <span className="text-gray-300">any как escape hatch</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon icon="ph:warning-circle-fill" className="w-5 h-5 mt-0.5 text-orange-400 shrink-0" />
                    <span className="text-gray-300">Иллюзия безопасности runtime</span>
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
              <h2 className="mb-6 text-2xl font-semibold text-blue-400">
                TypeScript: Глубокое погружение
              </h2>
              
              <div className="mb-6 text-gray-300">
                <p className="mb-4">
                  TypeScript - это типизированное надмножество JavaScript, которое компилируется в чистый JavaScript. 
                  Но действительно ли статическая типизация решает все проблемы JavaScript?
                </p>
                <p className="p-4 border-l-4 border-blue-500/50 bg-blue-500/10 rounded-r">
                  <strong className="text-blue-400">Философия курса:</strong> Мы изучаем TypeScript не как "лучший JavaScript", 
                  а как инструмент со своими компромиссами. Критический анализ поможет использовать его эффективно.
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
                <MdxContentLoader lessonNumber={currentLesson} docFolder="TSDOCS" />
              </div>

              {/* Code Example */}
              <div className="p-6 mt-8 border rounded-lg bg-slate-900/50 border-slate-700">
                <h3 className="mb-4 text-lg font-semibold text-blue-400">Пример: Типы vs Runtime</h3>
                <pre className="p-4 overflow-x-auto text-sm rounded bg-slate-950">
                  <code className="language-typescript">{`// TypeScript думает, что всё безопасно
function processUser(user: { name: string, age: number }) {
  console.log(user.name.toUpperCase());
}

// Но в runtime...
const apiResponse = JSON.parse('{"name": null, "age": 25}');
processUser(apiResponse); // 💥 Runtime error!

// Решение: Runtime валидация
function isValidUser(obj: any): obj is { name: string, age: number } {
  return typeof obj?.name === 'string' && typeof obj?.age === 'number';
}`}</code>
                </pre>
              </div>

              {/* Additional Resources */}
              <div className="pt-8 mt-12 border-t border-slate-700">
                <h3 className="mb-4 text-xl font-semibold text-blue-400">Полезные ресурсы</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <a
                    href="https://www.typescriptlang.org/docs/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 transition-colors border rounded-lg border-slate-700 hover:bg-slate-700/50"
                  >
                    <Icon icon="simple-icons:typescript" className="w-8 h-8 text-blue-400" />
                    <div>
                      <h4 className="font-medium text-white">Официальная документация</h4>
                      <p className="text-sm text-gray-400">TypeScript Handbook</p>
                    </div>
                  </a>
                  <a
                    href="https://github.com/type-challenges/type-challenges"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 transition-colors border rounded-lg border-slate-700 hover:bg-slate-700/50"
                  >
                    <Icon icon="ph:trophy-fill" className="w-8 h-8 text-yellow-400" />
                    <div>
                      <h4 className="font-medium text-white">Type Challenges</h4>
                      <p className="text-sm text-gray-400">Прокачай типы</p>
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

export default TypeScript;