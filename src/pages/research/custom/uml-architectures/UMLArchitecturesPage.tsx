import React, { useState } from 'react';
import ResearchPageLayout from '../../../../components/Layout/ResearchPageLayout';
import { motion } from 'framer-motion';

interface DiagramType {
  id: string;
  name: string;
  category: 'useful' | 'process' | 'useless';
  description: string;
  realUsage: string;
  verdict: string;
  codeExample?: string;
}

const diagramTypes: DiagramType[] = [
  {
    id: 'sequence',
    name: 'Sequence Diagram',
    category: 'useful',
    description: 'Показать взаимодействие во времени',
    realUsage: 'Debugging распределенных систем, разбор race conditions, объяснение async flow',
    verdict: 'Единственная диаграмма, которая естественно отображает время'
  },
  {
    id: 'component',
    name: 'Component/Container Diagram (C4)',
    category: 'useful',
    description: 'Высокоуровневая архитектура',
    realUsage: 'Для стейкхолдеров: красивая картинка в draw.io, для команды: генерится из кода',
    verdict: 'Процесс обновления ДОЛЖЕН быть болезненным = сложность архитектуры под контролем'
  },
  {
    id: 'er',
    name: 'ER Diagram',
    category: 'useful',
    description: 'Структура БД',
    realUsage: 'Единственный нормальный способ обсуждать структуру БД',
    verdict: 'Генерите из реальной схемы: pg_dump --schema-only | sql2diagram',
    codeExample: 'pg_dump --schema-only | sql2diagram'
  },
  {
    id: 'class',
    name: 'Class Diagram',
    category: 'process',
    description: 'Одноразовый инструмент мышления',
    realUsage: 'Проектирование на доске, синхронизация ментальных моделей',
    verdict: 'Полезна как ПРОЦЕСС, не как АРТЕФАКТ'
  },
  {
    id: 'state',
    name: 'State Machine Diagram',
    category: 'process',
    description: 'Моделирование состояний',
    realUsage: 'Сложные бизнес-процессы, протоколы (TCP handshake), Game logic',
    verdict: 'Шедевр для сложных процессов, мусор для простого CRUD'
  },
  {
    id: 'usecase',
    name: 'Use Case Diagram',
    category: 'useless',
    description: 'Взаимодействие пользователей с системой',
    realUsage: 'Всегда деградирует до "User делает всё"',
    verdict: 'User Story Mapping делает то же самое в 100 раз лучше'
  },
  {
    id: 'deployment',
    name: 'Deployment Diagram',
    category: 'useless',
    description: 'Развертывание системы',
    realUsage: 'Упрощенная карта для onboarding, не спецификация',
    verdict: 'Terraform - источник правды, диаграмма - для PM'
  }
];

const UMLArchitecturesPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'useful' | 'process' | 'useless'>('all');
  const [expandedDiagram, setExpandedDiagram] = useState<string | null>(null);

  const filteredDiagrams = selectedCategory === 'all' 
    ? diagramTypes 
    : diagramTypes.filter(d => d.category === selectedCategory);

  const getCategoryColor = (category: string) => {
    switch(category) {
      case 'useful': return 'text-green-400 border-green-400 bg-green-400/10';
      case 'process': return 'text-yellow-400 border-yellow-400 bg-yellow-400/10';
      case 'useless': return 'text-red-400 border-red-400 bg-red-400/10';
      default: return 'text-gray-400 border-gray-400';
    }
  };

  const getCategoryEmoji = (category: string) => {
    switch(category) {
      case 'useful': return '🟢';
      case 'process': return '🟡';
      case 'useless': return '🔴';
      default: return '';
    }
  };

  return (
    <ResearchPageLayout title="🔥 UML: Полный Разбор с Циничным Реализмом">
      <div className="space-y-12">
        {/* Intro Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-red-900/20 to-orange-900/20 p-8 rounded-lg border border-red-500/30"
        >
          <h2 className="text-3xl font-bold text-red-400 mb-6">Часть 1: Как UML Стал Религией</h2>
          
          <div className="space-y-4">
            <div className="bg-black/40 p-4 rounded border border-red-500/20">
              <h3 className="text-xl font-semibold text-orange-400 mb-2">История Одной Иллюзии</h3>
              <div className="space-y-2 text-gray-300">
                <p><span className="text-yellow-400">1997 год:</span> OMG стандартизирует UML. Обещание: "Универсальный язык для описания систем!"</p>
                <p><span className="text-yellow-400">2024 год:</span> 99% разработчиков рисуют квадратики и стрелочки в draw.io, называя это "UML".</p>
                <p className="text-red-400 font-semibold">Что произошло: UML превратился в то же, что и Agile - набор ритуалов без понимания сути.</p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Key Division Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-8"
        >
          <h2 className="text-3xl font-bold text-blue-400 mb-6">💎 Ключевое Разделение: Два Типа Диаграмм</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-green-900/20 to-blue-900/20 p-6 rounded-lg border border-green-500/30"
            >
              <h3 className="text-2xl font-bold text-green-400 mb-4">Диаграммы для Мышления</h3>
              <ul className="space-y-2 text-gray-300">
                <li><span className="text-yellow-300">Цель:</span> Исследовать, спорить, приходить к консенсусу</li>
                <li><span className="text-yellow-300">Инструмент:</span> Белая доска, салфетка, draw.io</li>
                <li><span className="text-yellow-300">Жизненный цикл:</span> Эфемерный. Создаются и выбрасываются</li>
                <li><span className="text-yellow-300">Примеры:</span> Sequence для бага, Class для домена</li>
              </ul>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 p-6 rounded-lg border border-purple-500/30"
            >
              <h3 className="text-2xl font-bold text-purple-400 mb-4">Диаграммы как Документация</h3>
              <ul className="space-y-2 text-gray-300">
                <li><span className="text-yellow-300">Цель:</span> Быть источником правды, служить справочником</li>
                <li><span className="text-yellow-300">Инструмент:</span> Mermaid, PlantUML, Structurizr, код</li>
                <li><span className="text-yellow-300">Жизненный цикл:</span> Долгосрочный. Обновляются с кодом</li>
                <li><span className="text-yellow-300">Примеры:</span> C4 из кода, ER из схемы БД</li>
              </ul>
            </motion.div>
          </div>

          <div className="bg-red-900/20 p-4 rounded-lg border border-red-500/30">
            <p className="text-red-400 font-semibold text-lg">
              ⚠️ 99% проблем с UML возникают, когда люди пытаются использовать "Диаграммы для Мышления" как "Диаграммы как Документацию".
            </p>
          </div>
        </motion.section>

        {/* 14 Types Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-8"
        >
          <h2 className="text-3xl font-bold text-orange-400 mb-6">14 Типов Диаграмм: Честный Разбор</h2>
          
          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-4 mb-8">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-6 py-2 rounded-lg border transition-all ${
                selectedCategory === 'all' 
                  ? 'bg-blue-500/20 border-blue-400 text-blue-400' 
                  : 'border-gray-600 text-gray-400 hover:border-gray-400'
              }`}
            >
              Все диаграммы
            </button>
            <button
              onClick={() => setSelectedCategory('useful')}
              className={`px-6 py-2 rounded-lg border transition-all ${
                selectedCategory === 'useful' 
                  ? 'bg-green-500/20 border-green-400 text-green-400' 
                  : 'border-gray-600 text-gray-400 hover:border-gray-400'
              }`}
            >
              🟢 Реально полезные
            </button>
            <button
              onClick={() => setSelectedCategory('process')}
              className={`px-6 py-2 rounded-lg border transition-all ${
                selectedCategory === 'process' 
                  ? 'bg-yellow-500/20 border-yellow-400 text-yellow-400' 
                  : 'border-gray-600 text-gray-400 hover:border-gray-400'
              }`}
            >
              🟡 Полезные как процесс
            </button>
            <button
              onClick={() => setSelectedCategory('useless')}
              className={`px-6 py-2 rounded-lg border transition-all ${
                selectedCategory === 'useless' 
                  ? 'bg-red-500/20 border-red-400 text-red-400' 
                  : 'border-gray-600 text-gray-400 hover:border-gray-400'
              }`}
            >
              🔴 Практически бесполезные
            </button>
          </div>

          {/* Diagrams Grid */}
          <div className="grid gap-6">
            {filteredDiagrams.map((diagram) => (
              <motion.div
                key={diagram.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                whileHover={{ scale: 1.01 }}
                className={`p-6 rounded-lg border ${getCategoryColor(diagram.category)} cursor-pointer transition-all`}
                onClick={() => setExpandedDiagram(expandedDiagram === diagram.id ? null : diagram.id)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold flex items-center gap-3">
                      <span>{getCategoryEmoji(diagram.category)}</span>
                      {diagram.name}
                    </h3>
                    <p className="text-gray-400 mt-1">{diagram.description}</p>
                  </div>
                  <motion.div
                    animate={{ rotate: expandedDiagram === diagram.id ? 180 : 0 }}
                    className="text-gray-400"
                  >
                    ▼
                  </motion.div>
                </div>

                {expandedDiagram === diagram.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-4 mt-4 pt-4 border-t border-gray-700"
                  >
                    <div>
                      <h4 className="text-lg font-semibold text-yellow-400 mb-2">Когда РЕАЛЬНО нужна:</h4>
                      <p className="text-gray-300">{diagram.realUsage}</p>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-orange-400 mb-2">Вердикт:</h4>
                      <p className="text-gray-300">{diagram.verdict}</p>
                    </div>
                    {diagram.codeExample && (
                      <div className="bg-black/60 p-4 rounded-lg border border-gray-700">
                        <code className="text-green-400 font-mono">{diagram.codeExample}</code>
                      </div>
                    )}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Survival Rules Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="space-y-8"
        >
          <h2 className="text-3xl font-bold text-purple-400 mb-6">🎯 Правила Выживания в Мире Диаграмм</h2>
          
          <div className="space-y-6">
            <motion.div 
              whileHover={{ x: 10 }}
              className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 p-6 rounded-lg border border-blue-500/30"
            >
              <h3 className="text-2xl font-bold text-blue-400 mb-3">Правило 1: Определи Цель</h3>
              <p className="text-gray-300 mb-2">Перед рисованием спроси:</p>
              <ul className="space-y-1 text-gray-300 list-disc list-inside">
                <li>Я думаю или документирую?</li>
                <li>Какой ОДИН вопрос отвечает эта диаграмма?</li>
                <li>Кто аудитория?</li>
              </ul>
            </motion.div>

            <motion.div 
              whileHover={{ x: 10 }}
              className="bg-gradient-to-r from-green-900/20 to-blue-900/20 p-6 rounded-lg border border-green-500/30"
            >
              <h3 className="text-2xl font-bold text-green-400 mb-3">Правило 2: Выбери Правильный Инструмент</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-lg font-semibold text-yellow-300 mb-2">Для Мышления:</h4>
                  <ul className="space-y-1 text-gray-300 text-sm">
                    <li>• Белая доска &gt; любой tool</li>
                    <li>• Фото доски &gt; "красивая" диаграмма</li>
                    <li>• Выброси после использования</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-yellow-300 mb-2">Для Документации:</h4>
                  <pre className="text-gray-300 text-sm bg-black/40 p-2 rounded">
{`Если:
  - Нельзя сгенерировать: не делай
  - Обновление &gt; 5 минут: не делай
  - Меняется чаще раза в месяц: не делай
Иначе:
  - Используй Mermaid/PlantUML`}</pre>
                </div>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ x: 10 }}
              className="bg-gradient-to-r from-orange-900/20 to-red-900/20 p-6 rounded-lg border border-orange-500/30"
            >
              <h3 className="text-2xl font-bold text-orange-400 mb-3">Правило 3: Полезное Трение</h3>
              <p className="text-gray-300 mb-2">Некоторые диаграммы ДОЛЖНЫ быть сложными в обновлении:</p>
              <ul className="space-y-1 text-gray-300 list-disc list-inside">
                <li>Фундаментальная архитектура</li>
                <li>Границы сервисов</li>
                <li>Модель данных</li>
              </ul>
              <p className="text-red-400 font-semibold mt-2">Это feature, не bug. Трение = время подумать.</p>
            </motion.div>
          </div>
        </motion.section>

        {/* Modern Alternatives Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="space-y-8"
        >
          <h2 className="text-3xl font-bold text-cyan-400 mb-6">💎 Что Использовать в 2024</h2>
          
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-6 rounded-lg border border-gray-700">
              <h3 className="text-xl font-bold text-yellow-400 mb-4">Вместо UML Class Diagram</h3>
              <pre className="bg-black/60 p-4 rounded-lg overflow-x-auto">
                <code className="text-green-400 font-mono text-sm">{`// Это лучше любой диаграммы:
interface Payment {
  id: string;
  amount: Money;
  status: PaymentStatus;
}

type PaymentStatus = 'pending' | 'processing' | 'completed' | 'failed';

// Или для сложных случаев - ADT:
type PaymentEvent = 
  | { type: 'created', amount: Money }
  | { type: 'processed', transactionId: string }
  | { type: 'failed', reason: string };`}</code>
              </pre>
            </div>

            <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-6 rounded-lg border border-gray-700">
              <h3 className="text-xl font-bold text-yellow-400 mb-4">Вместо Deployment Diagram</h3>
              <pre className="bg-black/60 p-4 rounded-lg overflow-x-auto">
                <code className="text-blue-400 font-mono text-sm">{`# docker-compose.yml или k8s manifests
# Это исполняемая документация
services:
  api:
    image: myapp:latest
    depends_on: [db, redis]
  db:
    image: postgres:14
  redis:
    image: redis:7`}</code>
              </pre>
            </div>

            <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-6 rounded-lg border border-gray-700">
              <h3 className="text-xl font-bold text-yellow-400 mb-4">Для Архитектуры</h3>
              <p className="text-gray-300 mb-2">C4 Model + Structurizr:</p>
              <ul className="space-y-1 text-gray-300 list-disc list-inside">
                <li>Код как источник правды</li>
                <li>Разные уровни детализации</li>
                <li>Версионируется с кодом</li>
              </ul>
            </div>
          </div>
        </motion.section>

        {/* Final Verdict Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="bg-gradient-to-r from-red-900/30 to-purple-900/30 p-8 rounded-lg border border-red-500/40"
        >
          <h2 className="text-3xl font-bold text-red-400 mb-6">Финальный Вердикт 2.0</h2>
          
          <div className="space-y-6">
            <div className="bg-black/40 p-4 rounded">
              <p className="text-xl text-orange-400 font-semibold mb-2">
                UML мертв как "универсальный язык"
              </p>
              <p className="text-gray-300">
                Он был слишком амбициозен, как эсперанто. Вместо него - набор специализированных инструментов.
              </p>
            </div>

            <div className="bg-gradient-to-r from-green-900/20 to-blue-900/20 p-6 rounded-lg border border-green-500/30">
              <h3 className="text-2xl font-bold text-green-400 mb-4">Главный Принцип</h3>
              <p className="text-gray-300 mb-4">Спрашивай себя: я сейчас думаю или документирую?</p>
              <ul className="space-y-2">
                <li className="text-gray-300">
                  <span className="text-yellow-300">Думаешь?</span> Хватай маркер, рисуй что угодно. Назови это "набросок". Выброси после.
                </li>
                <li className="text-gray-300">
                  <span className="text-yellow-300">Документируешь?</span> Генерируй из кода или не делай вообще.
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 p-6 rounded-lg border border-purple-500/30">
              <h3 className="text-2xl font-bold text-purple-400 mb-4">Тест на Полезность</h3>
              <p className="text-gray-300 mb-2">На любой запрос "нарисовать диаграмму" задай вопрос:</p>
              <p className="text-xl text-yellow-300 italic">
                "Какое конкретное решение эта диаграмма поможет принять или какую ошибку предотвратить?"
              </p>
              <p className="text-red-400 font-bold mt-4">Нет ответа = Won't Fix.</p>
            </div>

            <div className="mt-8 p-4 bg-gradient-to-r from-yellow-900/20 to-orange-900/20 rounded-lg border border-yellow-500/30">
              <p className="text-lg text-yellow-400 font-semibold text-center">
                P.S. Лучшая диаграмма - та, которую не нужно рисовать. Вторая по качеству - та, которая рисует себя сама из кода. Все остальное - компромиссы с реальностью.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Radical Pragmatism Manifesto Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="mt-16 space-y-12"
        >
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent mb-4">
              🔥 МАНИФЕСТ РАДИКАЛЬНОГО ПРАГМАТИЗМА
            </h1>
            <p className="text-2xl text-gray-400">Почему Все Методологии - Это Ложь</p>
          </div>

          {/* Part 1: Sacred Cows */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.4 }}
            className="space-y-8"
          >
            <h2 className="text-3xl font-bold text-orange-400">Часть 1: Священные Коровы, Которые Все Неправильно Готовят</h2>
            
            {/* Agile Section */}
            <motion.div 
              whileHover={{ scale: 1.01 }}
              className="bg-gradient-to-r from-red-900/20 to-orange-900/20 p-6 rounded-lg border border-red-500/30"
            >
              <h3 className="text-2xl font-bold text-red-400 mb-4">Agile - Философия, Ставшая Религией</h3>
              
              <div className="grid md:grid-cols-2 gap-6 mb-4">
                <div>
                  <h4 className="text-lg font-semibold text-yellow-300 mb-2">Что обещали:</h4>
                  <p className="text-gray-300">Гибкость, быстрая доставка ценности, счастливые разработчики.</p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-red-300 mb-2">Реальность:</h4>
                  <p className="text-gray-300">В 90% компаний это просто Waterfall с ежедневными митингами. "Мы Agile" = "у нас нет процессов, но мы делаем стендапы".</p>
                </div>
              </div>

              <div className="bg-black/40 p-4 rounded mb-4">
                <h4 className="text-lg font-semibold text-orange-400 mb-2">Главные проблемы:</h4>
                <ul className="space-y-2 text-gray-300">
                  <li>• <span className="text-yellow-300">Cargo cult Agile</span> - копируют ритуалы без понимания принципов</li>
                  <li>• Менеджмент использует Agile как <span className="text-red-300">оправдание отсутствия планирования</span></li>
                  <li>• "Responding to change" → <span className="text-red-300">"меняем требования каждые 2 дня"</span></li>
                  <li>• Документация? <span className="text-orange-300">"Мы же Agile, код - это документация!"</span> (спойлер: нет)</li>
                </ul>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-green-900/20 p-3 rounded border border-green-500/30">
                  <p className="text-green-400 font-semibold">✅ Когда работает:</p>
                  <p className="text-gray-300 text-sm">Команды до 10 человек с высокой автономией и прямым доступом к заказчику.</p>
                </div>
                <div className="bg-red-900/20 p-3 rounded border border-red-500/30">
                  <p className="text-red-400 font-semibold">❌ Когда провал:</p>
                  <p className="text-gray-300 text-sm">Enterprise с дедлайнами, регулируемые индустрии, проекты с фиксированным скоупом.</p>
                </div>
              </div>
            </motion.div>

            {/* Scrum Section */}
            <motion.div 
              whileHover={{ scale: 1.01 }}
              className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 p-6 rounded-lg border border-purple-500/30"
            >
              <h3 className="text-2xl font-bold text-purple-400 mb-4">Scrum - Театр Абсурда в 2-недельных Актах</h3>
              
              <div className="grid md:grid-cols-2 gap-6 mb-4">
                <div>
                  <h4 className="text-lg font-semibold text-yellow-300 mb-2">Обещания:</h4>
                  <p className="text-gray-300">Предсказуемость, прозрачность, самоорганизующиеся команды.</p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-red-300 mb-2">Реальность:</h4>
                  <ul className="space-y-1 text-gray-300 text-sm">
                    <li>• Sprint Planning: 4 часа гадания на кофейной гуще</li>
                    <li>• Daily Standup: 15 минут → 45 минут статус-репортов</li>
                    <li>• Sprint Review: Показываем недоделанные фичи</li>
                    <li>• Retrospective: "Всё хорошо, но могло быть лучше" (ничего не меняется)</li>
                  </ul>
                </div>
              </div>

              <div className="bg-black/40 p-4 rounded">
                <h4 className="text-lg font-semibold text-pink-400 mb-2">Критические проблемы:</h4>
                <ul className="space-y-2 text-gray-300">
                  <li>• <span className="text-red-300">Story Points</span> - псевдонаучная фигня. Эстимейты неверны на 200-300%</li>
                  <li>• <span className="text-orange-300">Scrum Master</span> - часто бесполезная роль. Либо секретарь, либо микроменеджер</li>
                  <li>• <span className="text-yellow-300">Velocity как метрика</span> - приводит к инфляции story points и gaming the system</li>
                  <li>• <span className="text-purple-300">2-недельные спринты</span> - искусственное ограничение</li>
                </ul>
              </div>
            </motion.div>

            {/* Kanban Section */}
            <motion.div 
              whileHover={{ scale: 1.01 }}
              className="bg-gradient-to-r from-blue-900/20 to-cyan-900/20 p-6 rounded-lg border border-blue-500/30"
            >
              <h3 className="text-2xl font-bold text-blue-400 mb-4">Kanban - "У Нас Просто Доска с Тасками"</h3>
              
              <div className="grid md:grid-cols-2 gap-6 mb-4">
                <div>
                  <h4 className="text-lg font-semibold text-yellow-300 mb-2">Обещания:</h4>
                  <p className="text-gray-300">Визуализация работы, ограничение WIP, continuous flow.</p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-red-300 mb-2">Реальность:</h4>
                  <p className="text-gray-300">В 80% случаев это просто Trello/Jira board без WIP лимитов и метрик.</p>
                </div>
              </div>

              <div className="bg-black/40 p-4 rounded mb-4">
                <h4 className="text-lg font-semibold text-cyan-400 mb-2">Проблемы:</h4>
                <ul className="space-y-2 text-gray-300">
                  <li>• Без WIP limits это не Kanban, а <span className="text-red-300">хаос</span></li>
                  <li>• "Pull system" работает только с <span className="text-yellow-300">дисциплинированной командой</span></li>
                  <li>• Метрики (lead time, cycle time) <span className="text-orange-300">игнорируются</span></li>
                  <li>• Превращается в <span className="text-red-300">бесконечный поток тасок</span> без приоритизации</li>
                </ul>
              </div>

              <div className="bg-green-900/20 p-3 rounded border border-green-500/30">
                <p className="text-green-400 font-semibold">✅ Когда работает:</p>
                <p className="text-gray-300 text-sm">DevOps/SRE команды, поддержка, continuous delivery.</p>
              </div>
            </motion.div>

            {/* Waterfall Section */}
            <motion.div 
              whileHover={{ scale: 1.01 }}
              className="bg-gradient-to-r from-gray-900 to-gray-800 p-6 rounded-lg border border-gray-600"
            >
              <h3 className="text-2xl font-bold text-gray-400 mb-4">Waterfall - Динозавр, Который Отказывается Вымирать</h3>
              
              <div className="bg-green-900/20 p-4 rounded border border-green-500/30 mb-4">
                <p className="text-green-400 font-semibold mb-2">⚡ Неожиданная правда:</p>
                <p className="text-gray-300">Для некоторых проектов это всё еще лучший выбор.</p>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h4 className="text-lg font-semibold text-green-400 mb-2">Где работает:</h4>
                  <ul className="space-y-1 text-gray-300 text-sm">
                    <li>• NASA, SpaceX - когда ошибка стоит жизней</li>
                    <li>• Embedded systems с дорогим деплоем</li>
                    <li>• Проекты с жесткими регуляторными требованиями</li>
                    <li>• Fixed-price контракты</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-red-400 mb-2">Проблемы очевидны:</h4>
                  <ul className="space-y-1 text-gray-300 text-sm">
                    <li>• Поздняя обратная связь</li>
                    <li>• Изменения стоят космических денег</li>
                    <li>• "Big bang" релизы - recipe for disaster</li>
                    <li>• Документация устаревает быстрее, чем пишется</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Part 2: Why Everything is a Lie */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.6 }}
            className="space-y-8"
          >
            <h2 className="text-3xl font-bold text-purple-400">Часть 2: Почему ВСЁ ЭТО НЕ ТО, ЧЕМ ПРИТВОРЯЕТСЯ</h2>
            
            <div className="space-y-6">
              <motion.div 
                whileHover={{ x: 10 }}
                className="bg-gradient-to-r from-red-900/20 to-orange-900/20 p-6 rounded-lg border-l-4 border-red-500"
              >
                <h3 className="text-2xl font-bold text-red-400 mb-3">Agile: Манифест Свободы → Инструмент Контроля</h3>
                <p className="text-gray-300 mb-2">
                  <span className="text-yellow-300 font-bold">ПОЧЕМУ ТАК ПРОИЗОШЛО:</span> Потому что свобода не продается. Консалтинговые компании не могут продать "просто поговорите с пользователями". Но они могут продать 2-дневный тренинг по Agile за $5000/человека, сертификацию за $500 и внедрение за $500K.
                </p>
                <p className="text-red-400 font-semibold">
                  Горькая правда: Agile был убит в тот момент, когда стал индустрией с оборотом в миллиарды долларов.
                </p>
              </motion.div>

              <motion.div 
                whileHover={{ x: 10 }}
                className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 p-6 rounded-lg border-l-4 border-purple-500"
              >
                <h3 className="text-2xl font-bold text-purple-400 mb-3">Scrum: Самоорганизация → Микроменеджмент 2.0</h3>
                <p className="text-gray-300 mb-2">
                  <span className="text-yellow-300 font-bold">ПОЧЕМУ:</span> Scrum дал менеджменту иллюзию отказа от контроля, сохранив все рычаги власти. Кто решает, что попадет в спринт? Кто определяет Definition of Done?
                </p>
                <p className="text-pink-400 font-semibold">
                  Разоблачение: Scrum Master - это просто Project Manager, который ходит на стендапы.
                </p>
              </motion.div>

              <motion.div 
                whileHover={{ x: 10 }}
                className="bg-gradient-to-r from-blue-900/20 to-cyan-900/20 p-6 rounded-lg border-l-4 border-blue-500"
              >
                <h3 className="text-2xl font-bold text-blue-400 mb-3">Kanban: Поток → Конвейер</h3>
                <p className="text-gray-300 mb-2">
                  <span className="text-yellow-300 font-bold">СЕКРЕТ:</span> Настоящий Kanban требует мужества сказать "НЕТ" новой работе, когда WIP лимит достигнут. Но попробуйте сказать НЕТ вашему VP of Product.
                </p>
              </motion.div>

              <motion.div 
                whileHover={{ x: 10 }}
                className="bg-gradient-to-r from-gray-900 to-gray-800 p-6 rounded-lg border-l-4 border-gray-500"
              >
                <h3 className="text-2xl font-bold text-gray-400 mb-3">Waterfall: План → Ложь</h3>
                <p className="text-gray-300">
                  <span className="text-yellow-300 font-bold">ПАРАДОКС:</span> Waterfall честнее всех - он открыто признает, что не верит в изменения. Остальные методологии врут, что они гибкие.
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Diamond Truth Section */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.8 }}
            className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 p-8 rounded-lg border border-yellow-500/40"
          >
            <h2 className="text-3xl font-bold text-yellow-400 mb-6 text-center">💎 БРИЛЛИАНТОВАЯ ИСТИНА</h2>
            <h3 className="text-2xl text-orange-400 mb-6 text-center">Почему ВСЕ методологии становятся карго-культом:</h3>
            
            <div className="space-y-6">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="bg-black/40 p-6 rounded-lg"
              >
                <h4 className="text-xl font-bold text-red-400 mb-3">1. Методологии продают НАДЕЖДУ</h4>
                <ul className="space-y-2 text-gray-300">
                  <li>• "Внедрите Scrum и станете как Spotify!"</li>
                  <li>• "Используйте SAFe и масштабируйтесь как Amazon!"</li>
                  <li className="text-yellow-300">Это как продавать диету: "Ешьте это и станете как модель с обложки!"</li>
                </ul>
              </motion.div>

              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="bg-black/40 p-6 rounded-lg"
              >
                <h4 className="text-xl font-bold text-purple-400 mb-3">2. Процесс НЕ МОЖЕТ исправить культуру</h4>
                <ul className="space-y-2 text-gray-300">
                  <li>• Если у вас культура недоверия, Scrum превратится в инструмент контроля</li>
                  <li>• Если у вас культура страха, Kanban станет способом визуализировать, кого уволить</li>
                  <li>• Если у вас культура лжи, Waterfall породит фантастические планы</li>
                </ul>
              </motion.div>

              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="bg-black/40 p-6 rounded-lg"
              >
                <h4 className="text-xl font-bold text-green-400 mb-3">3. Консалтеры и вендоры ЗАИНТЕРЕСОВАНЫ в сложности</h4>
                <ul className="space-y-2 text-gray-300">
                  <li>• Простое не продается</li>
                  <li>• "Здравый смысл" не требует сертификации</li>
                  <li>• "Поговорите друг с другом" не стоит $500K</li>
                </ul>
              </motion.div>
            </div>
          </motion.div>

          {/* What Really Works */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2 }}
            className="space-y-8"
          >
            <h2 className="text-3xl font-bold text-green-400">Что ДЕЙСТВИТЕЛЬНО работает:</h2>
            
            <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
              <pre className="text-green-400 font-mono overflow-x-auto">
{`// Вместо методологии, ответьте на 3 вопроса:

const realProcess = {
  // 1. Как мы понимаем, что делать?
  understanding: "Прямой контакт с пользователями" || "Умрем",
  
  // 2. Как мы решаем, что важнее?
  prioritization: "Тот, кто платит" || "Тот, кто страдает",
  
  // 3. Как мы понимаем, что сделали?
  validation: "Пользователи платят/используют" || "Мы зря потратили время"
};`}
              </pre>
            </div>

            <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 p-6 rounded-lg border border-blue-500/30">
              <h3 className="text-2xl font-bold text-blue-400 mb-4">Универсальный алгоритм выбора:</h3>
              <div className="space-y-3 text-gray-300">
                <div className="flex items-start">
                  <span className="text-red-400 mr-2">❓</span>
                  <div>
                    <p className="font-semibold">Если команда НЕ может ответить на вопрос "Что делать?"</p>
                    <p className="text-yellow-300">→ Вам не нужна методология, вам нужен Product Manager</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-orange-400 mr-2">❓</span>
                  <div>
                    <p className="font-semibold">Если команда НЕ может ответить "Как делать?"</p>
                    <p className="text-yellow-300">→ Вам не нужна методология, вам нужны Senior-ы</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-purple-400 mr-2">❓</span>
                  <div>
                    <p className="font-semibold">Если команда НЕ может договориться</p>
                    <p className="text-yellow-300">→ Вам не нужна методология, вам нужна терапия</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-green-400 mr-2">✅</span>
                  <div>
                    <p className="font-semibold">Если команда может всё вышеперечисленное</p>
                    <p className="text-green-300 font-bold">→ Вам не нужна методология, просто не мешайте им работать</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Avoiding Tyranny of Structurelessness */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.2 }}
            className="space-y-8"
          >
            <h2 className="text-3xl font-bold text-cyan-400">💎 ИЗБЕГАЯ ТИРАНИИ БЕССТРУКТУРНОСТИ</h2>
            
            <div className="bg-gradient-to-r from-red-900/20 to-purple-900/20 p-6 rounded-lg border border-red-500/30">
              <p className="text-gray-300 mb-4">
                Но "просто не мешайте им работать" — это мечта. В реальности, даже в самой здоровой команде, полное отсутствие структуры порождает новую, невидимую тиранию:
              </p>
              <ul className="space-y-2 text-gray-300">
                <li>• <span className="text-red-400 font-semibold">Тирания самого громкого:</span> Решения принимает не самый умный, а самый наглый.</li>
                <li>• <span className="text-orange-400 font-semibold">Тирания неявных ожиданий:</span> Никто не знает, когда задача будет сделана. Начинаются догадки и обиды.</li>
                <li>• <span className="text-yellow-400 font-semibold">Тирания невидимой работы:</span> Поддержка, рефакторинг, помощь коллегам — все это "растворяется" и не ценится.</li>
              </ul>
              <p className="text-purple-400 font-semibold mt-4">
                Полный отказ от процесса — это такая же утопия, как и "Scrum по книжке". Истинный путь — не отсутствие процесса, а минимально необходимый, осознанный процесс.
              </p>
            </div>

            <div className="bg-gradient-to-r from-green-900/20 to-blue-900/20 p-6 rounded-lg border border-green-500/30">
              <h3 className="text-2xl font-bold text-green-400 mb-4">Прагматичный набор для "здоровой команды, которой не мешают":</h3>
              
              <div className="space-y-4">
                <motion.div 
                  whileHover={{ x: 5 }}
                  className="bg-black/40 p-4 rounded"
                >
                  <h4 className="text-lg font-semibold text-yellow-300 mb-2">1. Доска (The Wall of Truth)</h4>
                  <p className="text-gray-300">Не Jira с 50 полями. Простая доска с колонками Next Up | In Progress (WIP: 3) | Review | Done. WIP-лимит — не обсуждается.</p>
                </motion.div>

                <motion.div 
                  whileHover={{ x: 5 }}
                  className="bg-black/40 p-4 rounded"
                >
                  <h4 className="text-lg font-semibold text-cyan-300 mb-2">2. Демо (The Reality Check)</h4>
                  <p className="text-gray-300">Раз в неделю, на 30 минут, команда показывает живой, работающий продукт. Цель — не отчитаться, а получить обратную связь.</p>
                </motion.div>

                <motion.div 
                  whileHover={{ x: 5 }}
                  className="bg-black/40 p-4 rounded"
                >
                  <h4 className="text-lg font-semibold text-purple-300 mb-2">3. Ретро (The System Tune-up)</h4>
                  <p className="text-gray-300">Раз в две недели, на 45 минут. Два вопроса: "Что нам мешает работать быстрее?" и "Какое одно изменение мы можем сделать?". Фокус на системе, а не на людях.</p>
                </motion.div>

                <motion.div 
                  whileHover={{ x: 5 }}
                  className="bg-black/40 p-4 rounded"
                >
                  <h4 className="text-lg font-semibold text-orange-300 mb-2">4. Ежедневный Huddle (The Sync)</h4>
                  <p className="text-gray-300">10 минут, стоя. Не "что я делал вчера", а "над чем я работаю сегодня и где мне нужна помощь?".</p>
                </motion.div>
              </div>

              <p className="text-blue-400 font-semibold mt-4">
                Это не "Scrum" и не "Kanban™". Это просто здравый смысл, формализованный в виде легковесных ритуалов.
              </p>
            </div>
          </motion.div>

          {/* Final Truth Bomb */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2.4 }}
            className="space-y-8"
          >
            <h2 className="text-3xl font-bold text-red-400 text-center">🎯 ФИНАЛЬНАЯ БОМБА ПРАВДЫ</h2>
            
            <div className="bg-gradient-to-r from-red-900/30 to-orange-900/30 p-8 rounded-lg border border-red-500/40">
              <p className="text-2xl text-orange-400 font-bold text-center mb-6">
                Все методологии - это костыли для сломанных организаций.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <p className="text-gray-300">• Здоровой команде не нужен Scrum Master, чтобы поговорить утром</p>
                  <p className="text-gray-300">• Компетентным инженерам не нужны story points, чтобы оценить работу</p>
                </div>
                <div className="space-y-2">
                  <p className="text-gray-300">• Доверяющему менеджменту не нужны burn down charts</p>
                  <p className="text-gray-300">• Зрелой организации не нужен SAFe, чтобы координироваться</p>
                </div>
              </div>

              <div className="bg-black/60 p-6 rounded-lg">
                <h3 className="text-2xl font-bold text-yellow-400 mb-4 text-center">Запомните навсегда:</h3>
                <p className="text-xl text-red-400 font-bold text-center mb-4">
                  Методология - это НЕ решение. Это симптом.
                </p>
                <p className="text-gray-300 mb-4">
                  Если вам нужна сложная методология - у вас есть проблемы посерьезнее:
                </p>
                <ul className="grid md:grid-cols-2 gap-2 text-gray-300">
                  <li>• Нет доверия</li>
                  <li>• Нет компетенций</li>
                  <li>• Нет понимания целей</li>
                  <li>• Нет связи с реальностью</li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Final Manifesto */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.6 }}
            className="space-y-8"
          >
            <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 p-8 rounded-lg border border-purple-500/40">
              <h2 className="text-3xl font-bold text-purple-400 mb-6 text-center">Финальный Манифест</h2>
              
              <div className="space-y-4 text-gray-300 mb-6">
                <p>
                  Вместо того чтобы искать серебряную пулю в виде новой методологии, направьте все силы на устранение главных проблем: недоверия, некомпетентности и отсутствия цели.
                </p>
                <p>
                  А пока вы это делаете, не живите в хаосе. Создайте свой собственный, минималистичный процесс из первых принципов: визуализируйте работу, ограничивайте незавершенку, регулярно получайте фидбэк и устраняйте препятствия.
                </p>
                <p className="text-xl text-yellow-400 font-bold text-center">
                  Перестаньте покупать чужие костыли. Начните строить свой экзоскелет.
                </p>
              </div>

              <div className="bg-black/40 p-6 rounded-lg">
                <h3 className="text-2xl font-bold text-green-400 mb-4">Главные принципы Радикального Прагматизма:</h3>
                <ol className="space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-yellow-400 font-bold mr-2">1.</span>
                    <span>Начинай с Самого Тупого Решения, Которое Может Сработать</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-400 font-bold mr-2">2.</span>
                    <span>Сложность Должна Заслужить Свое Существование</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-400 font-bold mr-2">3.</span>
                    <span>Контекст — Король</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-400 font-bold mr-2">4.</span>
                    <span>Измеряй Влияние, а не Активность</span>
                  </li>
                </ol>
              </div>
            </div>

            <div className="bg-gradient-to-r from-yellow-900/20 to-red-900/20 p-6 rounded-lg border border-yellow-500/30">
              <p className="text-xl text-yellow-400 font-bold text-center">
                P.S. Если ваш консультант говорит, что вам нужно 6 месяцев на внедрение Agile - он продает вам не Agile, а свои услуги на 6 месяцев.
              </p>
            </div>
          </motion.div>
        </motion.section>

        {/* Backend & Frontend Architectures Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.8 }}
          className="mt-16 space-y-12"
        >
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
              Backend &amp; Frontend Архитектуры: Полное Развенчание Мифов
            </h1>
          </div>

          {/* Part 1: What is Architecture */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 3 }}
            className="space-y-8"
          >
            <h2 className="text-3xl font-bold text-cyan-400">Часть 1: Что Такое Архитектура + Железный Закон</h2>
            
            <div className="bg-gradient-to-r from-red-900/20 to-orange-900/20 p-6 rounded-lg border border-red-500/30">
              <h3 className="text-2xl font-bold text-red-400 mb-4">Популярное Заблуждение</h3>
              <p className="text-gray-300 mb-2">
                <span className="text-yellow-300">Джун:</span> "Какую архитектуру выбрать для проекта?"
              </p>
              <p className="text-orange-400 font-semibold">
                Реальность: Архитектура - это НЕ выбор из каталога. Это emergent property вашей системы, результат тысяч микро-решений.
              </p>
            </div>

            <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
              <h4 className="text-xl font-bold text-yellow-400 mb-4">Что Такое Архитектура На Самом Деле</h4>
              <pre className="text-green-400 font-mono overflow-x-auto">
{`// Архитектура - это совокупность:
const Architecture = {
  decisions: "Которые дорого изменить",
  constraints: "Которые формируют все остальные решения", 
  tradeoffs: "Которые вы приняли осознанно (или нет)"
};`}
              </pre>
            </div>

            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 p-8 rounded-lg border border-purple-500/40"
            >
              <h3 className="text-2xl font-bold text-purple-400 mb-4">🔥 Закон Конвея - Фундаментальная Истина</h3>
              
              <blockquote className="text-xl text-yellow-300 italic mb-6 text-center">
                "Организации проектируют системы, которые копируют их коммуникационную структуру"
              </blockquote>
              
              <p className="text-gray-300 mb-4 font-semibold">Это не метафора. Это железный закон:</p>
              
              <ul className="space-y-2 text-gray-300 mb-6">
                <li>• 5 разобщенных команд = 5 плохо взаимодействующих микросервисов</li>
                <li>• Один всемогущий архитектор = Монолит с God Objects</li>
                <li>• Отдельные Frontend/Backend команды = Две системы, воюющие через REST API</li>
              </ul>
              
              <div className="bg-black/40 p-4 rounded">
                <p className="text-orange-400 font-bold">
                  Вывод: Ваше первое архитектурное решение - не SQL vs NoSQL. Это "Как мы структурируем команды?"
                </p>
              </div>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-r from-blue-900/20 to-cyan-900/20 p-6 rounded-lg border border-blue-500/30">
                <h4 className="text-xl font-bold text-blue-400 mb-3">Архитектура: ЧТО и КАК построено</h4>
                <ul className="space-y-1 text-gray-300">
                  <li>• Монолит, Микросервисы, Serverless</li>
                  <li>• MVC, Event-Driven, CQRS</li>
                </ul>
              </div>
              <div className="bg-gradient-to-r from-green-900/20 to-emerald-900/20 p-6 rounded-lg border border-green-500/30">
                <h4 className="text-xl font-bold text-green-400 mb-3">Архитектурная Методология: КАК ПРИНИМАТЬ РЕШЕНИЯ</h4>
                <ul className="space-y-1 text-gray-300">
                  <li>• DDD, Clean Architecture, Hexagonal</li>
                  <li>• Все они - разные способы реализации Dependency Inversion Principle</li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Part 2: Backend Architectures */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 3.2 }}
            className="space-y-8"
          >
            <h2 className="text-3xl font-bold text-orange-400">Часть 2: Backend Архитектуры - От Простого к Аду</h2>
            
            {/* Monolith Section */}
            <motion.div 
              whileHover={{ scale: 1.01 }}
              className="bg-gradient-to-r from-green-900/20 to-blue-900/20 p-6 rounded-lg border border-green-500/30"
            >
              <h3 className="text-2xl font-bold text-green-400 mb-4">🏗️ Монолит - Незаслуженно Оклеветанный Герой</h3>
              
              <p className="text-gray-300 mb-4">
                <span className="text-yellow-300 font-semibold">Реальность:</span> GitHub, Shopify, StackOverflow - монолиты, обрабатывающие миллионы запросов.
              </p>
              
              <div className="bg-black/40 p-4 rounded mb-4">
                <h4 className="text-lg font-semibold text-cyan-400 mb-2">Модульный Монолит (правильный монолит):</h4>
                <pre className="text-gray-300 font-mono text-sm overflow-x-auto">
{`src/
├── users/
│   ├── api/
│   ├── domain/
│   ├── infrastructure/
│   └── index.ts (public API)
├── orders/
│   └── ... (та же структура)
└── shared/`}
                </pre>
              </div>
              
              <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
                <p className="text-yellow-300 font-semibold mb-2">Pro tip: Enforce границы через компилятор, не линтер:</p>
                <pre className="text-green-400 font-mono text-sm overflow-x-auto">
{`// tsconfig.json - Project References
{
  "references": [
    { "path": "./src/users" },
    { "path": "./src/orders" }
  ]
}
// Теперь orders не может импортировать users/internal`}
                </pre>
              </div>
            </motion.div>

            {/* Microservices Section */}
            <motion.div 
              whileHover={{ scale: 1.01 }}
              className="bg-gradient-to-r from-red-900/20 to-orange-900/20 p-6 rounded-lg border border-red-500/30"
            >
              <h3 className="text-2xl font-bold text-red-400 mb-4">🎭 Микросервисы - Distributed Hell в 80% Случаев</h3>
              
              <h4 className="text-xl font-bold text-orange-400 mb-4">Реальная цена микросервисов:</h4>
              
              <div className="space-y-6">
                <div className="bg-black/40 p-4 rounded">
                  <h5 className="text-lg font-bold text-yellow-300 mb-2">1. Когнитивная Сложность</h5>
                  <ul className="space-y-2 text-gray-300">
                    <li>• <span className="text-green-300">Монолит:</span> Ctrl+Click → определение функции</li>
                    <li>• <span className="text-red-300">Микросервисы:</span> Jaeger/DataDog → 20 минут detective work → "А, вот почему 503"</li>
                  </ul>
                </div>
                
                <div className="bg-black/40 p-4 rounded">
                  <h5 className="text-lg font-bold text-yellow-300 mb-2">2. Асинхронность = Ад²</h5>
                  <pre className="text-gray-300 font-mono text-sm overflow-x-auto">
{`// Кажется просто:
eventBus.publish('OrderCreated', order);

// Реальность:
// - Идемпотентность (дубликаты)
// - Порядок событий (race conditions)
// - At-least-once delivery
// - Dead letter queues
// - Распределенные транзакции
// - Eventual consistency`}
                  </pre>
                </div>
                
                <div className="bg-red-900/20 p-4 rounded border border-red-500/30">
                  <h5 className="text-lg font-bold text-red-400 mb-2">3. Distributed Monolith - Худшее из Двух Миров</h5>
                  <pre className="text-gray-300 font-mono text-sm overflow-x-auto">
{`# "Микросервисы" в большинстве компаний:
OrderService:
  database: shared_postgres # 🚩
  depends_on: [UserService, PaymentService] # 🚩
  deploy: "только все вместе" # 🚩🚩🚩`}
                  </pre>
                  <p className="text-red-400 font-semibold mt-2">
                    Это не микросервисы. Это distributed monolith - все недостатки обоих подходов.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Serverless Section */}
            <motion.div 
              whileHover={{ scale: 1.01 }}
              className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 p-6 rounded-lg border border-purple-500/30"
            >
              <h3 className="text-2xl font-bold text-purple-400 mb-4">🌩️ Serverless - NoOps или NoDocs?</h3>
              
              <div className="bg-black/40 p-4 rounded">
                <h4 className="text-lg font-semibold text-pink-400 mb-2">Cold Start Reality Check:</h4>
                <pre className="text-gray-300 font-mono text-sm overflow-x-auto">
{`// Java Lambda cold start
const timeline = {
  0: "Request arrives",
  1500: "JVM starts",
  3000: "Spring Boot initializes", 
  5000: "Your code runs",
  5100: "Response sent"
};
// Пользователь: "Почему так медленно?"`}
                </pre>
              </div>
            </motion.div>

            {/* Event-Driven Section */}
            <motion.div 
              whileHover={{ scale: 1.01 }}
              className="bg-gradient-to-r from-cyan-900/20 to-blue-900/20 p-6 rounded-lg border border-cyan-500/30"
            >
              <h3 className="text-2xl font-bold text-cyan-400 mb-4">🎯 Event-Driven - Красиво в Теории, Больно на Практике</h3>
              
              <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
                <h4 className="text-lg font-semibold text-yellow-300 mb-2">Transactional Outbox Pattern (единственный правильный способ):</h4>
                <pre className="text-green-400 font-mono text-sm overflow-x-auto">
{`BEGIN;
  INSERT INTO orders (...);
  INSERT INTO outbox_events (aggregate_id, event_type, payload) 
    VALUES (order.id, 'OrderCreated', {...});
COMMIT;

-- Отдельный процесс
SELECT * FROM outbox_events WHERE published = false;
-- Publish to Kafka/SQS
-- Mark as published`}
                </pre>
              </div>
            </motion.div>
          </motion.div>

          {/* Part 3: Frontend */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 3.4 }}
            className="space-y-8"
          >
            <h2 className="text-3xl font-bold text-pink-400">Часть 3: Frontend - От jQuery до Микрофронтенд Ада</h2>
            
            {/* Component Revolution */}
            <motion.div 
              whileHover={{ scale: 1.01 }}
              className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 p-6 rounded-lg border border-blue-500/30"
            >
              <h3 className="text-2xl font-bold text-blue-400 mb-4">⚛️ Component Revolution - Решила Одни Проблемы, Создала Другие</h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-black/40 p-4 rounded">
                  <p className="text-green-400 font-semibold">2013:</p>
                  <p className="text-gray-300">"React спасет нас от jQuery спагетти!"</p>
                </div>
                <div className="bg-black/40 p-4 rounded">
                  <p className="text-red-400 font-semibold">2024:</p>
                  <pre className="text-gray-300 font-mono text-sm">
{`// 50 строк Redux boilerplate для toggle
// vs
const [isOpen, setIsOpen] = useState(false); // 🤦‍♂️`}
                  </pre>
                </div>
              </div>
            </motion.div>

            {/* Microfrontends */}
            <motion.div 
              whileHover={{ scale: 1.01 }}
              className="bg-gradient-to-r from-red-900/20 to-pink-900/20 p-6 rounded-lg border border-red-500/30"
            >
              <h3 className="text-2xl font-bold text-red-400 mb-4">🎪 Микрофронтенды - Enterprise Suicide</h3>
              
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h4 className="text-lg font-semibold text-yellow-300 mb-2">Обещания:</h4>
                  <p className="text-gray-300">Независимые команды! Разные технологии!</p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-red-300 mb-2">Реальность:</h4>
                  <ul className="space-y-1 text-gray-300 text-sm">
                    <li>• Bundle size: 5MB JS (React + Vue + Angular на одной странице)</li>
                    <li>• Design System Hell: 5 версий одной кнопки</li>
                    <li>• State Sharing: window.postMessage как в 2010</li>
                  </ul>
                </div>
              </div>
              
              <p className="text-orange-400 font-semibold">
                Единственный valid use case: Amazon/IKEA scale + dedicated platform team.
              </p>
            </motion.div>

            {/* Islands Architecture */}
            <motion.div 
              whileHover={{ scale: 1.01 }}
              className="bg-gradient-to-r from-green-900/20 to-cyan-900/20 p-6 rounded-lg border border-green-500/30"
            >
              <h3 className="text-2xl font-bold text-green-400 mb-4">🏝️ Islands Architecture - Старое Новое Решение</h3>
              
              <pre className="bg-black/40 p-4 rounded text-gray-300 font-mono text-sm overflow-x-auto mb-4">
{`<!-- 95% статики -->
<article>...</article>

<!-- 5% интерактива -->
<div data-island="CommentSection">
  <!-- Гидратируется только это -->
</div>`}
              </pre>
              
              <p className="text-cyan-400 font-semibold">
                Почему работает: Потому что 95% веба - это контент, не приложения.
              </p>
            </motion.div>
          </motion.div>

          {/* Part 4: Architectural Fitness Functions */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 3.6 }}
            className="space-y-8"
          >
            <h2 className="text-3xl font-bold text-green-400">Часть 4: Architectural Fitness Functions - Измеряй, а не Спорь</h2>
            
            <div className="bg-gradient-to-r from-cyan-900/30 to-blue-900/30 p-8 rounded-lg border border-cyan-500/40">
              <h3 className="text-2xl font-bold text-cyan-400 mb-6">Перестаньте Выбирать, Начните Измерять</h3>
              
              <p className="text-gray-300 mb-6">
                Вместо "какая архитектура правильная", определите измеримые характеристики:
              </p>
              
              <div className="bg-gray-900 p-6 rounded-lg border border-gray-700 mb-6">
                <pre className="text-green-400 font-mono text-sm overflow-x-auto">
{`const architecturalFitness = {
  performance: {
    metric: "p99 latency < 100ms",
    test: () => loadTest.p99 < 100
  },
  
  developerVelocity: {
    metric: "New dev deploys in day 1",
    test: () => onboardingTime <= 1
  },
  
  operationalCost: {
    metric: "Infra cost < 5% of revenue",
    test: () => (AWS.bill / revenue) < 0.05
  },
  
  resilience: {
    metric: "Rollback time < 5 min",
    test: () => rollbackTest.duration < 300
  }
};`}
                </pre>
              </div>
              
              <div className="bg-black/40 p-6 rounded">
                <h4 className="text-xl font-bold text-yellow-400 mb-4">Как Это Меняет Всё</h4>
                <ul className="space-y-2 text-gray-300">
                  <li>• Хотите микросервис? Докажите, что он не нарушит latency fitness function.</li>
                  <li>• Хотите NoSQL? Покажите, что recovery time соответствует SLA.</li>
                  <li>• 15 слоев для TODO? Напишите fitness function, которую это улучшает.</li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Final Wisdom */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.8 }}
            className="space-y-8"
          >
            <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 p-8 rounded-lg border border-purple-500/40">
              <h2 className="text-3xl font-bold text-purple-400 mb-6 text-center">💎 Финальная Мудрость 2.0</h2>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-red-900/20 p-4 rounded border border-red-500/30">
                  <h3 className="text-xl font-bold text-red-400 mb-3">Архитектура - это НЕ:</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>✗ Выбор из каталога</li>
                    <li>✗ Решение в начале проекта</li>
                    <li>✗ Оправдание для резюме</li>
                  </ul>
                </div>
                <div className="bg-green-900/20 p-4 rounded border border-green-500/30">
                  <h3 className="text-xl font-bold text-green-400 mb-3">Архитектура - это:</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>✓ Отражение структуры команды (Conway's Law)</li>
                    <li>✓ Эволюционный процесс</li>
                    <li>✓ Измеримые trade-offs</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-gray-900 p-6 rounded-lg border border-gray-700 mb-6">
                <h3 className="text-xl font-bold text-yellow-400 mb-4">Универсальный Алгоритм:</h3>
                <pre className="text-green-400 font-mono text-sm overflow-x-auto">
{`function evolveArchitecture() {
  // 1. Начни с простейшего
  let architecture = "Modular Monolith";
  
  // 2. Измеряй fitness functions
  while (product.isAlive) {
    const bottleneck = findBottleneck(fitnessFunctions);
    
    // 3. Эволюционируй только больное место
    if (bottleneck === "team coordination") {
      extractMicroservice(bottleneck.domain);
    } else if (bottleneck === "scaling") {
      moveToServerless(bottleneck.component);
    }
    
    // 4. Измерь результат
    if (!improved(fitnessFunctions)) {
      rollback();
    }
  }
}`}
                </pre>
              </div>
              
              <div className="bg-gradient-to-r from-yellow-900/20 to-orange-900/20 p-6 rounded-lg border border-yellow-500/30">
                <h3 className="text-2xl font-bold text-yellow-400 mb-4 text-center">Главное Правило:</h3>
                <p className="text-xl text-orange-400 font-semibold text-center">
                  Лучшая архитектура - та, которую можно изменить, когда поймешь, что нужно на самом деле
                </p>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-red-900/20 to-orange-900/20 p-6 rounded-lg border border-red-500/30">
              <p className="text-xl text-red-400 font-bold text-center">
                P.S. Если ваш архитектор начинает с выбора технологий, а не с понимания организационной структуры и fitness functions - он архитектор резюме, а не систем.
              </p>
            </div>
          </motion.div>
        </motion.section>
      </div>
    </ResearchPageLayout>
  );
};

export default UMLArchitecturesPage;
