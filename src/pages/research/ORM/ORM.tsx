import React from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';

const ORM: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-600/10 via-transparent to-transparent" />
        <div className="container relative z-10 px-4 py-20 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="flex justify-center mb-6">
              <div className="p-4 rounded-2xl bg-emerald-600/20 backdrop-blur-sm">
                <Icon icon="ph:database-duotone" className="w-24 h-24 text-emerald-400" />
              </div>
            </div>
            <h1 className="mb-4 text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-600">
              ORM в JavaScript/TypeScript
            </h1>
            <p className="max-w-2xl mx-auto text-xl text-gray-300">
              Критический анализ парадигм и инструментов
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
                <h3 className="mb-4 text-lg font-semibold text-emerald-400">Популярные ORM</h3>
                <dl className="space-y-3 text-sm">
                  <div>
                    <dt className="text-gray-400">Prisma</dt>
                    <dd className="text-white">Type-Safe DB Client</dd>
                  </div>
                  <div>
                    <dt className="text-gray-400">Drizzle</dt>
                    <dd className="text-white">Type-Safe SQL Builder</dd>
                  </div>
                  <div>
                    <dt className="text-gray-400">MikroORM</dt>
                    <dd className="text-white">Data Mapper ORM</dd>
                  </div>
                  <div>
                    <dt className="text-gray-400">TypeORM</dt>
                    <dd className="text-white">Hybrid ORM</dd>
                  </div>
                  <div>
                    <dt className="text-gray-400">Sequelize</dt>
                    <dd className="text-white">Active Record ORM</dd>
                  </div>
                </dl>
              </motion.div>

              {/* Key Patterns */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="p-6 border rounded-lg bg-slate-800/50 border-slate-700"
              >
                <h3 className="mb-4 text-lg font-semibold text-emerald-400">Ключевые паттерны ORM</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Icon icon="ph:check-circle-fill" className="w-5 h-5 mt-0.5 text-green-400 shrink-0" />
                    <span className="text-gray-300">Object-Relational Mapping</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon icon="ph:check-circle-fill" className="w-5 h-5 mt-0.5 text-green-400 shrink-0" />
                    <span className="text-gray-300">Identity Map</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon icon="ph:check-circle-fill" className="w-5 h-5 mt-0.5 text-green-400 shrink-0" />
                    <span className="text-gray-300">Unit of Work</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon icon="ph:check-circle-fill" className="w-5 h-5 mt-0.5 text-green-400 shrink-0" />
                    <span className="text-gray-300">Data Mapper vs Active Record</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon icon="ph:check-circle-fill" className="w-5 h-5 mt-0.5 text-green-400 shrink-0" />
                    <span className="text-gray-300">Lazy Loading</span>
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
                <h3 className="mb-4 text-lg font-semibold text-orange-400">Частые проблемы</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Icon icon="ph:warning-circle-fill" className="w-5 h-5 mt-0.5 text-orange-400 shrink-0" />
                    <span className="text-gray-300">N+1 запросы</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon icon="ph:warning-circle-fill" className="w-5 h-5 mt-0.5 text-orange-400 shrink-0" />
                    <span className="text-gray-300">Impedance Mismatch</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon icon="ph:warning-circle-fill" className="w-5 h-5 mt-0.5 text-orange-400 shrink-0" />
                    <span className="text-gray-300">Типизация и runtime</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon icon="ph:warning-circle-fill" className="w-5 h-5 mt-0.5 text-orange-400 shrink-0" />
                    <span className="text-gray-300">Миграции и версионирование</span>
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
              {/* Introduction */}
              <div className="prose prose-invert max-w-none">
                <h2 className="mb-6 text-3xl font-bold text-emerald-400">
                  Введение: Хаос Терминологии и Философий
                </h2>
                
                <p className="mb-4 text-gray-300">
                  Термин "ORM" (Object-Relational Mapper) в экосистеме JavaScript/TypeScript стал зонтичным понятием, 
                  под которым скрываются инструменты с фундаментально разными архитектурами, философиями и компромиссами. 
                  Простого ответа на вопрос "Какую ORM выбрать?" не существует, потому что сам вопрос некорректен без 
                  понимания, что именно мы ожидаем от инструмента, называющего себя ORM.
                </p>

                <div className="p-4 mb-6 border-l-4 border-emerald-500/50 bg-emerald-500/10 rounded-r">
                  <p className="text-gray-300">
                    <strong className="text-emerald-400">Object-Relational Impedance Mismatch</strong> — 
                    глубокие различия между парадигмами объектно-ориентированного программирования 
                    (наследование, полиморфизм, графы объектов) и реляционных баз данных 
                    (таблицы, строки, внешние ключи, нормализация).
                  </p>
                </div>

                {/* Classical ORM Patterns */}
                <h2 className="mt-12 mb-6 text-2xl font-bold text-emerald-400">
                  Что Такое "Настоящая" ORM? Классические Паттерны
                </h2>

                <p className="mb-6 text-gray-300">
                  <strong className="text-white">Цель ORM</strong>: Абстрагировать разработчика от деталей реляционной базы данных, 
                  позволить ему работать с данными в терминах привычных объектов и их отношений, автоматически управляя 
                  синхронизацией состояния этих объектов с базой данных.
                </p>

                {/* Pattern Descriptions */}
                <div className="space-y-8 mb-12">
                  <div className="p-6 bg-slate-900/50 rounded-lg border border-slate-700">
                    <h3 className="mb-3 text-xl font-semibold text-emerald-300">Identity Map (Карта Идентичности)</h3>
                    <p className="text-gray-300">
                      Гарантирует, что для одной и той же строки из базы данных в рамках одной сессии/транзакции 
                      существует только один экземпляр объекта в памяти. Это предотвращает конфликты и обеспечивает 
                      консистентность при изменении данных через разные ссылки на "один и тот же" объект.
                    </p>
                  </div>

                  <div className="p-6 bg-slate-900/50 rounded-lg border border-slate-700">
                    <h3 className="mb-3 text-xl font-semibold text-emerald-300">Unit of Work (Единица Работы)</h3>
                    <p className="text-gray-300">
                      Механизм, который отслеживает все изменения, сделанные в загруженных из БД объектах. 
                      При завершении "единицы работы" ORM автоматически генерирует и выполняет необходимые 
                      SQL-запросы для синхронизации этих изменений с базой данных.
                    </p>
                  </div>

                  <div className="p-6 bg-slate-900/50 rounded-lg border border-slate-700">
                    <h3 className="mb-3 text-xl font-semibold text-emerald-300">Data Mapper vs Active Record</h3>
                    
                    <div className="grid md:grid-cols-2 gap-4 mt-4">
                      <div className="p-4 bg-slate-800/50 rounded">
                        <h4 className="font-semibold text-blue-400 mb-2">Data Mapper</h4>
                        <p className="text-sm text-gray-300 mb-2">
                          Отдельный слой для работы с БД. Доменные объекты не знают о базе данных.
                        </p>
                        <p className="text-xs text-green-400">✓ Четкое разделение ответственности</p>
                        <p className="text-xs text-orange-400">✗ Больше кода</p>
                      </div>
                      
                      <div className="p-4 bg-slate-800/50 rounded">
                        <h4 className="font-semibold text-purple-400 mb-2">Active Record</h4>
                        <p className="text-sm text-gray-300 mb-2">
                          Объект содержит методы для работы с БД (user.save()).
                        </p>
                        <p className="text-xs text-green-400">✓ Простота для CRUD</p>
                        <p className="text-xs text-orange-400">✗ Смешение логики</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ORM Analysis */}
                <h2 className="mt-12 mb-6 text-2xl font-bold text-emerald-400">
                  Критический Анализ Популярных JS/TS Инструментов
                </h2>

                {/* Prisma */}
                <div className="mb-10 p-6 bg-gradient-to-r from-slate-900/50 to-slate-800/50 rounded-lg border border-slate-700">
                  <div className="flex items-center gap-3 mb-4">
                    <Icon icon="simple-icons:prisma" className="w-8 h-8 text-indigo-400" />
                    <h3 className="text-xl font-semibold text-indigo-400">Prisma</h3>
                  </div>
                  
                  <p className="text-gray-300 mb-4">
                    <strong className="text-white">Философия:</strong> "Next-generation ORM", 
                    фокус на типобезопасности и Developer Experience.
                  </p>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h4 className="font-semibold text-green-400 mb-2">Сильные стороны:</h4>
                      <ul className="text-sm text-gray-300 space-y-1">
                        <li>• Отличная типобезопасность</li>
                        <li>• Декларативная схема</li>
                        <li>• Автоматические миграции</li>
                        <li>• Отличный DX</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-orange-400 mb-2">Ограничения:</h4>
                      <ul className="text-sm text-gray-300 space-y-1">
                        <li>• Нет Identity Map</li>
                        <li>• Нет Unit of Work</li>
                        <li>• Нет Lazy Loading</li>
                        <li>• Свой DSL для схемы</li>
                      </ul>
                    </div>
                  </div>

                  <p className="text-sm text-gray-400 italic">
                    <strong>Вердикт:</strong> Не ORM в классическом понимании. 
                    Это мощный типобезопасный генератор клиента БД.
                  </p>
                </div>

                {/* Drizzle */}
                <div className="mb-10 p-6 bg-gradient-to-r from-slate-900/50 to-slate-800/50 rounded-lg border border-slate-700">
                  <div className="flex items-center gap-3 mb-4">
                    <Icon icon="simple-icons:drizzle" className="w-8 h-8 text-yellow-400" />
                    <h3 className="text-xl font-semibold text-yellow-400">Drizzle ORM</h3>
                  </div>
                  
                  <p className="text-gray-300 mb-4">
                    <strong className="text-white">Философия:</strong> "TypeScript ORM that feels like writing SQL", 
                    SQL-first подход.
                  </p>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h4 className="font-semibold text-green-400 mb-2">Сильные стороны:</h4>
                      <ul className="text-sm text-gray-300 space-y-1">
                        <li>• Максимальный контроль над SQL</li>
                        <li>• Отличная типобезопасность</li>
                        <li>• Легковесная</li>
                        <li>• Предсказуемая</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-orange-400 mb-2">Ограничения:</h4>
                      <ul className="text-sm text-gray-300 space-y-1">
                        <li>• Нет управления состоянием</li>
                        <li>• Требует знания SQL</li>
                        <li>• Минимальная абстракция</li>
                      </ul>
                    </div>
                  </div>

                  <p className="text-sm text-gray-400 italic">
                    <strong>Вердикт:</strong> Не ORM, а Type-Safe SQL Query Builder. 
                    Идеально для тех, кто любит SQL.
                  </p>
                </div>

                {/* MikroORM */}
                <div className="mb-10 p-6 bg-gradient-to-r from-slate-900/50 to-slate-800/50 rounded-lg border border-slate-700">
                  <div className="flex items-center gap-3 mb-4">
                    <Icon icon="simple-icons:mikro-orm" className="w-8 h-8 text-red-400" />
                    <h3 className="text-xl font-semibold text-red-400">MikroORM</h3>
                  </div>
                  
                  <p className="text-gray-300 mb-4">
                    <strong className="text-white">Философия:</strong> Полнофункциональная TypeScript ORM, 
                    основанная на паттернах Data Mapper и Unit of Work.
                  </p>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h4 className="font-semibold text-green-400 mb-2">Сильные стороны:</h4>
                      <ul className="text-sm text-gray-300 space-y-1">
                        <li>• Полная реализация классических паттернов</li>
                        <li>• Identity Map + Unit of Work</li>
                        <li>• Поддержка DDD</li>
                        <li>• Lazy Loading</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-orange-400 mb-2">Ограничения:</h4>
                      <ul className="text-sm text-gray-300 space-y-1">
                        <li>• Высокий порог вхождения</li>
                        <li>• Требует понимания паттернов</li>
                        <li>• Может быть избыточной для простых проектов</li>
                      </ul>
                    </div>
                  </div>

                  <p className="text-sm text-gray-400 italic">
                    <strong>Вердикт:</strong> Наиболее "правильная" ORM в классическом понимании. 
                    Для сложных проектов с богатой доменной моделью.
                  </p>
                </div>

                {/* TypeORM */}
                <div className="mb-10 p-6 bg-gradient-to-r from-slate-900/50 to-slate-800/50 rounded-lg border border-slate-700">
                  <div className="flex items-center gap-3 mb-4">
                    <Icon icon="simple-icons:typeorm" className="w-8 h-8 text-orange-400" />
                    <h3 className="text-xl font-semibold text-orange-400">TypeORM</h3>
                  </div>
                  
                  <p className="text-gray-300 mb-4">
                    <strong className="text-white">Философия:</strong> Амбициозная ORM с поддержкой множества паттернов 
                    (Active Record, Data Mapper, Query Builder).
                  </p>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h4 className="font-semibold text-green-400 mb-2">Сильные стороны:</h4>
                      <ul className="text-sm text-gray-300 space-y-1">
                        <li>• Гибкость (AR + DM)</li>
                        <li>• Декораторы TypeScript</li>
                        <li>• Большое сообщество</li>
                        <li>• Query Builder</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-orange-400 mb-2">Проблемы:</h4>
                      <ul className="text-sm text-gray-300 space-y-1">
                        <li>• Типы часто "лгут"</li>
                        <li>• Непоследовательность API</li>
                        <li>• Сложность и баги</li>
                        <li>• Медленное развитие</li>
                      </ul>
                    </div>
                  </div>

                  <p className="text-sm text-gray-400 italic">
                    <strong>Вердикт:</strong> Самый противоречивый инструмент. 
                    Гибкость ценой сложности и проблем с типами.
                  </p>
                </div>

                {/* Comparison Table */}
                <h2 className="mt-12 mb-6 text-2xl font-bold text-emerald-400">
                  Сравнительная таблица
                </h2>

                <div className="overflow-x-auto mb-12">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-700">
                        <th className="text-left p-3 text-gray-400">Критерий</th>
                        <th className="text-center p-3 text-indigo-400">Prisma</th>
                        <th className="text-center p-3 text-yellow-400">Drizzle</th>
                        <th className="text-center p-3 text-red-400">MikroORM</th>
                        <th className="text-center p-3 text-orange-400">TypeORM</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-slate-800">
                        <td className="p-3 text-gray-300">Паттерн</td>
                        <td className="text-center p-3">DB Client</td>
                        <td className="text-center p-3">SQL Builder</td>
                        <td className="text-center p-3">Data Mapper</td>
                        <td className="text-center p-3">Hybrid</td>
                      </tr>
                      <tr className="border-b border-slate-800">
                        <td className="p-3 text-gray-300">Identity Map</td>
                        <td className="text-center p-3 text-red-400">✗</td>
                        <td className="text-center p-3 text-red-400">✗</td>
                        <td className="text-center p-3 text-green-400">✓</td>
                        <td className="text-center p-3 text-orange-400">~</td>
                      </tr>
                      <tr className="border-b border-slate-800">
                        <td className="p-3 text-gray-300">Unit of Work</td>
                        <td className="text-center p-3 text-red-400">✗</td>
                        <td className="text-center p-3 text-red-400">✗</td>
                        <td className="text-center p-3 text-green-400">✓</td>
                        <td className="text-center p-3 text-orange-400">~</td>
                      </tr>
                      <tr className="border-b border-slate-800">
                        <td className="p-3 text-gray-300">Типобезопасность</td>
                        <td className="text-center p-3 text-green-400">⭐⭐⭐⭐⭐</td>
                        <td className="text-center p-3 text-green-400">⭐⭐⭐⭐⭐</td>
                        <td className="text-center p-3 text-yellow-400">⭐⭐⭐⭐</td>
                        <td className="text-center p-3 text-orange-400">⭐⭐⭐</td>
                      </tr>
                      <tr className="border-b border-slate-800">
                        <td className="p-3 text-gray-300">Порог вхождения</td>
                        <td className="text-center p-3 text-yellow-400">Средний</td>
                        <td className="text-center p-3 text-green-400">Низкий</td>
                        <td className="text-center p-3 text-red-400">Высокий</td>
                        <td className="text-center p-3 text-orange-400">Средний</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Conclusion */}
                <h2 className="mt-12 mb-6 text-2xl font-bold text-emerald-400">
                  Заключение: Выбор — Не Технический, а Архитектурный
                </h2>

                <div className="p-6 bg-gradient-to-r from-emerald-900/20 to-teal-900/20 rounded-lg border border-emerald-700/50 mb-8">
                  <p className="text-gray-300 mb-4">
                    Нет "лучшей" ORM. Есть инструмент, наиболее подходящий под конкретные требования проекта, 
                    опыт команды и архитектурные принципы.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-4 mt-4">
                    <div className="p-4 bg-slate-800/50 rounded">
                      <h4 className="font-semibold text-emerald-400 mb-2">Выбирайте Prisma если:</h4>
                      <ul className="text-sm text-gray-300 space-y-1">
                        <li>• Важна типобезопасность и DX</li>
                        <li>• Нужен простой CRUD</li>
                        <li>• Не нужно управление состоянием</li>
                      </ul>
                    </div>
                    
                    <div className="p-4 bg-slate-800/50 rounded">
                      <h4 className="font-semibold text-yellow-400 mb-2">Выбирайте Drizzle если:</h4>
                      <ul className="text-sm text-gray-300 space-y-1">
                        <li>• Любите и знаете SQL</li>
                        <li>• Нужен полный контроль</li>
                        <li>• Важна производительность</li>
                      </ul>
                    </div>
                    
                    <div className="p-4 bg-slate-800/50 rounded">
                      <h4 className="font-semibold text-red-400 mb-2">Выбирайте MikroORM если:</h4>
                      <ul className="text-sm text-gray-300 space-y-1">
                        <li>• Строите сложный домен (DDD)</li>
                        <li>• Нужны классические паттерны ORM</li>
                        <li>• Есть опыт с Hibernate/Doctrine</li>
                      </ul>
                    </div>
                    
                    <div className="p-4 bg-slate-800/50 rounded">
                      <h4 className="font-semibold text-orange-400 mb-2">Выбирайте TypeORM если:</h4>
                      <ul className="text-sm text-gray-300 space-y-1">
                        <li>• Нужна гибкость AR/DM</li>
                        <li>• Любите декораторы</li>
                        <li>• Готовы к компромиссам</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <p className="text-gray-300 text-center italic">
                  Выбор ORM — это выбор архитектурного подхода к работе с данными, 
                  который повлияет на всю структуру вашего приложения.
                </p>
              </div>

              {/* Code Examples */}
              <div className="mt-12 pt-8 border-t border-slate-700">
                <h3 className="mb-6 text-xl font-semibold text-emerald-400">Примеры кода</h3>
                
                {/* Prisma Example */}
                <div className="mb-6">
                  <h4 className="mb-2 text-lg font-medium text-indigo-400">Prisma</h4>
                  <pre className="p-4 overflow-x-auto text-sm rounded bg-slate-950">
                    <code className="language-typescript">{`// schema.prisma
model User {
  id    Int     @id @default(autoincrement())
  email String  @unique
  posts Post[]
}

// Использование
const user = await prisma.user.create({
  data: { email: 'test@example.com' },
  include: { posts: true }
});`}</code>
                  </pre>
                </div>

                {/* Drizzle Example */}
                <div className="mb-6">
                  <h4 className="mb-2 text-lg font-medium text-yellow-400">Drizzle</h4>
                  <pre className="p-4 overflow-x-auto text-sm rounded bg-slate-950">
                    <code className="language-typescript">{`// Схема
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).unique()
});

// Использование
const result = await db
  .select()
  .from(users)
  .where(eq(users.email, 'test@example.com'));`}</code>
                  </pre>
                </div>

                {/* MikroORM Example */}
                <div className="mb-6">
                  <h4 className="mb-2 text-lg font-medium text-red-400">MikroORM</h4>
                  <pre className="p-4 overflow-x-auto text-sm rounded bg-slate-950">
                    <code className="language-typescript">{`@Entity()
export class User {
  @PrimaryKey()
  id!: number;

  @Property()
  email!: string;

  @OneToMany(() => Post, post => post.user)
  posts = new Collection<Post>(this);
}

// Использование с Unit of Work
const user = em.create(User, { email: 'test@example.com' });
await em.persistAndFlush(user); // Автоматически отслеживает изменения`}</code>
                  </pre>
                </div>
              </div>

              {/* Additional Resources */}
              <div className="pt-8 mt-12 border-t border-slate-700">
                <h3 className="mb-4 text-xl font-semibold text-emerald-400">Полезные ресурсы</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <a
                    href="https://www.prisma.io/docs"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 transition-colors border rounded-lg border-slate-700 hover:bg-slate-700/50"
                  >
                    <Icon icon="simple-icons:prisma" className="w-8 h-8 text-indigo-400" />
                    <div>
                      <h4 className="font-medium text-white">Prisma Documentation</h4>
                      <p className="text-sm text-gray-400">Официальная документация Prisma</p>
                    </div>
                  </a>
                  
                  <a
                    href="https://orm.drizzle.team"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 transition-colors border rounded-lg border-slate-700 hover:bg-slate-700/50"
                  >
                    <Icon icon="simple-icons:drizzle" className="w-8 h-8 text-yellow-400" />
                    <div>
                      <h4 className="font-medium text-white">Drizzle ORM</h4>
                      <p className="text-sm text-gray-400">Документация Drizzle</p>
                    </div>
                  </a>
                  
                  <a
                    href="https://mikro-orm.io"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 transition-colors border rounded-lg border-slate-700 hover:bg-slate-700/50"
                  >
                    <Icon icon="ph:database-duotone" className="w-8 h-8 text-red-400" />
                    <div>
                      <h4 className="font-medium text-white">MikroORM</h4>
                      <p className="text-sm text-gray-400">TypeScript ORM с UoW и Data Mapper</p>
                    </div>
                  </a>
                  
                  <a
                    href="https://martinfowler.com/eaaCatalog/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 transition-colors border rounded-lg border-slate-700 hover:bg-slate-700/50"
                  >
                    <Icon icon="ph:book-open-fill" className="w-8 h-8 text-emerald-400" />
                    <div>
                      <h4 className="font-medium text-white">Enterprise Application Architecture</h4>
                      <p className="text-sm text-gray-400">Паттерны от Martin Fowler</p>
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

export default ORM;