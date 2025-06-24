import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, Loader } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';
import InteractiveBook from './InteractiveBook';

// Интерактивный SQL редактор
const SQLPlayground: React.FC = () => {
  const [query, setQuery] = useState(`-- Попробуйте написать SQL запрос
SELECT * FROM users WHERE age > 18;`);
  const [result, setResult] = useState('');
  const [activeTab, setActiveTab] = useState('query');

  const executeQuery = () => {
    // Симуляция выполнения запроса
    setResult(`
Query executed successfully!
Returned 42 rows in 15ms.

 id |  name   | age | email
----+---------+-----+----------------
  1 | Alice   |  25 | alice@example.com
  2 | Bob     |  30 | bob@example.com
  3 | Charlie |  22 | charlie@example.com
  ...
    `);
    setActiveTab('result');
  };

  return (
    <motion.div 
      className="bg-slate-800/50 backdrop-blur rounded-xl border border-slate-700 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center justify-between p-4 bg-slate-900/50 border-b border-slate-700">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <Icon icon="ph:terminal" className="w-5 h-5" />
          SQL Playground
        </h3>
        <motion.button
          onClick={executeQuery}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Icon icon="ph:play" className="w-4 h-4" />
          Выполнить
        </motion.button>
      </div>
      
      <div className="flex border-b border-slate-700">
        <button
          onClick={() => setActiveTab('query')}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === 'query' 
              ? 'text-white bg-slate-700/50 border-b-2 border-blue-500' 
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Запрос
        </button>
        <button
          onClick={() => setActiveTab('result')}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === 'result' 
              ? 'text-white bg-slate-700/50 border-b-2 border-blue-500' 
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Результат
        </button>
      </div>

      <div className="p-4">
        {activeTab === 'query' ? (
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full h-32 bg-slate-900/50 text-gray-300 font-mono text-sm p-3 rounded-lg border border-slate-700 focus:border-blue-500 focus:outline-none resize-none"
            placeholder="Введите SQL запрос..."
          />
        ) : (
          <pre className="text-gray-300 font-mono text-sm overflow-x-auto">
            {result}
          </pre>
        )}
      </div>
    </motion.div>
  );
};

// Визуализация B-Tree индекса
const BTreeVisualization: React.FC = () => {
  return (
    <motion.div 
      className="bg-slate-800/50 backdrop-blur p-6 rounded-xl border border-slate-700"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <h3 className="text-xl font-bold mb-4 text-purple-400 flex items-center gap-2">
        <Icon icon="ph:tree-structure" className="w-6 h-6" />
        B-Tree индексы
      </h3>
      <div className="space-y-4">
        <p className="text-gray-300">
          B-Tree - самый распространенный тип индекса в PostgreSQL, идеально подходит для операций сравнения.
        </p>
        
        {/* Простая визуализация B-Tree */}
        <div className="flex justify-center">
          <svg width="300" height="200" viewBox="0 0 300 200" className="text-blue-400">
            {/* Корень */}
            <rect x="130" y="10" width="40" height="30" fill="currentColor" rx="4" />
            <text x="150" y="30" textAnchor="middle" fill="white" fontSize="12">50</text>
            
            {/* Второй уровень */}
            <rect x="60" y="70" width="40" height="30" fill="currentColor" rx="4" />
            <text x="80" y="90" textAnchor="middle" fill="white" fontSize="12">25</text>
            
            <rect x="200" y="70" width="40" height="30" fill="currentColor" rx="4" />
            <text x="220" y="90" textAnchor="middle" fill="white" fontSize="12">75</text>
            
            {/* Третий уровень */}
            <rect x="20" y="130" width="40" height="30" fill="currentColor" rx="4" />
            <text x="40" y="150" textAnchor="middle" fill="white" fontSize="12">10</text>
            
            <rect x="100" y="130" width="40" height="30" fill="currentColor" rx="4" />
            <text x="120" y="150" textAnchor="middle" fill="white" fontSize="12">30</text>
            
            <rect x="160" y="130" width="40" height="30" fill="currentColor" rx="4" />
            <text x="180" y="150" textAnchor="middle" fill="white" fontSize="12">60</text>
            
            <rect x="240" y="130" width="40" height="30" fill="currentColor" rx="4" />
            <text x="260" y="150" textAnchor="middle" fill="white" fontSize="12">90</text>
            
            {/* Линии соединения */}
            <line x1="150" y1="40" x2="80" y2="70" stroke="currentColor" strokeWidth="2" />
            <line x1="150" y1="40" x2="220" y2="70" stroke="currentColor" strokeWidth="2" />
            
            <line x1="80" y1="100" x2="40" y2="130" stroke="currentColor" strokeWidth="2" />
            <line x1="80" y1="100" x2="120" y2="130" stroke="currentColor" strokeWidth="2" />
            
            <line x1="220" y1="100" x2="180" y2="130" stroke="currentColor" strokeWidth="2" />
            <line x1="220" y1="100" x2="260" y2="130" stroke="currentColor" strokeWidth="2" />
          </svg>
        </div>

        <div className="bg-slate-900/50 p-3 rounded-lg">
          <code className="text-sm text-gray-300">
            CREATE INDEX idx_users_age ON users USING btree (age);
          </code>
        </div>
      </div>
    </motion.div>
  );
};

// Компонент прогресса обучения
const LearningProgress: React.FC = () => {
  const lessons = [
    { id: 1, title: 'Введение в PostgreSQL', completed: true },
    { id: 2, title: 'Основы SQL', completed: true },
    { id: 3, title: 'DDL операции', completed: false },
    { id: 4, title: 'DML операции', completed: false },
    { id: 5, title: 'Индексы и производительность', completed: false },
  ];

  const progress = (lessons.filter(l => l.completed).length / lessons.length) * 100;

  return (
    <motion.div 
      className="bg-slate-800/50 backdrop-blur p-6 rounded-xl border border-slate-700"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <h3 className="text-xl font-bold mb-4 text-blue-400 flex items-center gap-2">
        <Icon icon="ph:graduation-cap" className="w-6 h-6" />
        Прогресс обучения
      </h3>
      
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-400 mb-2">
          <span>Общий прогресс</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-slate-900/50 rounded-full h-2">
          <motion.div 
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>
      </div>

      <div className="space-y-2">
        {lessons.map(lesson => (
          <div key={lesson.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-700/30 transition-colors">
            <Icon 
              icon={lesson.completed ? "ph:check-circle-fill" : "ph:circle"} 
              className={`w-5 h-5 ${lesson.completed ? 'text-green-400' : 'text-gray-500'}`}
            />
            <span className={`text-sm ${lesson.completed ? 'text-gray-300' : 'text-gray-500'}`}>
              {lesson.title}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

const PostgreSQL: React.FC = () => {
  const [isBookOpen, setIsBookOpen] = useState(false);
  const [showPdf, setShowPdf] = useState(false);
  const [pdfError, setPdfError] = useState(false);
  const pdfUrl = 'https://edu.postgrespro.ru/sql_primer.pdf';

  const handleBookClick = () => {
    if (!isBookOpen) {
      setIsBookOpen(true);
      setTimeout(() => setShowPdf(true), 1500);
    }
  };

  const handleClose = () => {
    setShowPdf(false);
    setIsBookOpen(false);
    setPdfError(false);
  };

  const handlePdfError = () => {
    setPdfError(true);
  };

  const openPdfInNewTab = () => {
    window.open(pdfUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-800 pt-20">
      {/* Заголовок - добавил pt-20 для отступа от навигации */}
      <motion.div 
        className="text-center py-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-center gap-4 mb-4">
          <Icon icon="logos:postgresql" className="w-16 h-16" />
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
            PostgreSQL
          </h1>
        </div>
        <p className="text-xl text-gray-300">Интерактивное руководство по SQL и оптимизации</p>
      </motion.div>

      {/* 3D сцена с книгой - уменьшил высоту и добавил margin */}
      <div className="relative h-[400px] mx-auto max-w-6xl mb-12">
        <Canvas shadows camera={{ position: [0, 2, 5], fov: 45 }}>
          <PerspectiveCamera makeDefault position={[0, 2, 5]} fov={45} />
          <OrbitControls 
            enablePan={false}
            enableZoom={true}
            minDistance={3}
            maxDistance={8}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 4}
          />
          
          <ambientLight intensity={0.5} />
          <directionalLight
            position={[10, 10, 5]}
            intensity={1}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />
          <pointLight position={[-10, 5, -10]} intensity={0.5} color="#4FC3F7" />
          <pointLight position={[10, 5, 10]} intensity={0.5} color="#1976D2" />
          
          <Suspense fallback={null}>
            <InteractiveBook 
              isOpen={isBookOpen} 
              onClick={handleBookClick}
            />
          </Suspense>
          
          <Environment preset="city" />
          
          <mesh 
            rotation={[-Math.PI / 2, 0, 0]} 
            position={[0, -0.5, 0]}
            receiveShadow
          >
            <planeGeometry args={[10, 10]} />
            <meshStandardMaterial 
              color="#1a1a2e" 
              roughness={0.8}
              metalness={0.2}
            />
          </mesh>
        </Canvas>

        {!isBookOpen && (
          <motion.div 
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <p className="text-lg text-gray-300 flex items-center gap-2">
              <Icon icon="ph:mouse-simple" className="w-6 h-6" />
              Нажмите на книгу, чтобы открыть
            </p>
          </motion.div>
        )}

        <Loader />
      </div>

      {/* PDF Viewer Modal */}
      <AnimatePresence>
        {showPdf && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          >
            <motion.div
              className="relative w-full max-w-6xl h-[90vh] bg-slate-900 rounded-lg shadow-2xl overflow-hidden"
              initial={{ scale: 0.8, opacity: 0, rotateY: -90 }}
              animate={{ scale: 1, opacity: 1, rotateY: 0 }}
              exit={{ scale: 0.8, opacity: 0, rotateY: 90 }}
              transition={{ type: "spring", damping: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-4 bg-slate-800 border-b border-slate-700">
                <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                  <Icon icon="logos:postgresql" className="w-6 h-6" />
                  PostgreSQL: Основы SQL
                </h3>
                <div className="flex items-center gap-2">
                  <motion.button
                    onClick={openPdfInNewTab}
                    className="px-3 py-1.5 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon icon="ph:arrow-square-out" className="w-4 h-4" />
                    Открыть в новой вкладке
                  </motion.button>
                  <button
                    onClick={handleClose}
                    className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
                  >
                    <Icon icon="ph:x" className="w-6 h-6 text-gray-300" />
                  </button>
                </div>
              </div>

              <div className="w-full h-[calc(100%-64px)] relative">
                {!pdfError ? (
                  <>
                    <iframe
                      src={`https://docs.google.com/viewer?url=${encodeURIComponent(pdfUrl)}&embedded=true`}
                      className="w-full h-full"
                      title="PostgreSQL SQL Primer"
                      onError={handlePdfError}
                    />
                    <div className="absolute bottom-4 left-4 bg-slate-800/90 backdrop-blur rounded-lg p-3 text-sm text-gray-300">
                      <p className="flex items-center gap-2">
                        <Icon icon="ph:info" className="w-4 h-4" />
                        Если документ не отображается, используйте кнопку "Открыть в новой вкладке"
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center p-8">
                    <Icon icon="ph:file-x" className="w-24 h-24 text-gray-500 mb-4" />
                    <h3 className="text-2xl font-bold text-white mb-2">
                      Не удалось загрузить PDF
                    </h3>
                    <p className="text-gray-400 mb-6 max-w-md">
                      Возможно, браузер блокирует отображение PDF из-за политики безопасности.
                    </p>
                    <motion.button
                      onClick={openPdfInNewTab}
                      className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Icon icon="ph:arrow-square-out" className="w-5 h-5" />
                      Открыть PDF в новой вкладке
                    </motion.button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Основной контент */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* SQL Playground и прогресс */}
        <div className="grid lg:grid-cols-3 gap-6 mb-12">
          <div className="lg:col-span-2">
            <SQLPlayground />
          </div>
          <div>
            <LearningProgress />
          </div>
        </div>

        {/* Визуализации и концепции */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <BTreeVisualization />
          
          {/* MVCC визуализация */}
          <motion.div 
            className="bg-slate-800/50 backdrop-blur p-6 rounded-xl border border-slate-700"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-xl font-bold mb-4 text-green-400 flex items-center gap-2">
              <Icon icon="ph:git-branch" className="w-6 h-6" />
              MVCC (Multi-Version Concurrency Control)
            </h3>
            <div className="space-y-4">
              <p className="text-gray-300">
                PostgreSQL использует MVCC для обеспечения изоляции транзакций без блокировок на чтение.
              </p>
              
              <div className="bg-slate-900/50 p-4 rounded-lg space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-300">Версия 1: INSERT (xmin=100)</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm text-gray-300">Версия 2: UPDATE (xmin=150, xmax=200)</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-300">Версия 3: UPDATE (xmin=200)</span>
                </div>
              </div>

              <div className="text-sm text-gray-400">
                Каждая транзакция видит свой снимок данных, что позволяет читать без блокировок.
              </div>
            </div>
          </motion.div>
        </div>

        {/* Сравнение с другими БД */}
        <motion.div 
          className="bg-slate-800/50 backdrop-blur p-6 rounded-xl border border-slate-700 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-2xl font-bold mb-6 text-white">PostgreSQL vs Другие БД</h3>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left p-3 text-gray-400">Особенность</th>
                  <th className="text-center p-3 text-blue-400">PostgreSQL</th>
                  <th className="text-center p-3 text-yellow-400">MySQL</th>
                  <th className="text-center p-3 text-green-400">MongoDB</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-700/50">
                  <td className="p-3 text-gray-300">ACID compliance</td>
                  <td className="text-center p-3"><Icon icon="ph:check-circle-fill" className="w-5 h-5 text-green-400 inline" /></td>
                  <td className="text-center p-3"><Icon icon="ph:check-circle-fill" className="w-5 h-5 text-green-400 inline" /></td>
                  <td className="text-center p-3"><Icon icon="ph:warning-circle" className="w-5 h-5 text-yellow-400 inline" /></td>
                </tr>
                <tr className="border-b border-slate-700/50">
                  <td className="p-3 text-gray-300">JSON/JSONB</td>
                  <td className="text-center p-3"><Icon icon="ph:check-circle-fill" className="w-5 h-5 text-green-400 inline" /></td>
                  <td className="text-center p-3"><Icon icon="ph:warning-circle" className="w-5 h-5 text-yellow-400 inline" /></td>
                  <td className="text-center p-3"><Icon icon="ph:check-circle-fill" className="w-5 h-5 text-green-400 inline" /></td>
                </tr>
                <tr className="border-b border-slate-700/50">
                  <td className="p-3 text-gray-300">Полнотекстовый поиск</td>
                  <td className="text-center p-3"><Icon icon="ph:check-circle-fill" className="w-5 h-5 text-green-400 inline" /></td>
                  <td className="text-center p-3"><Icon icon="ph:warning-circle" className="w-5 h-5 text-yellow-400 inline" /></td>
                  <td className="text-center p-3"><Icon icon="ph:check-circle-fill" className="w-5 h-5 text-green-400 inline" /></td>
                </tr>
                <tr>
                  <td className="p-3 text-gray-300">Сложные запросы</td>
                  <td className="text-center p-3"><Icon icon="ph:check-circle-fill" className="w-5 h-5 text-green-400 inline" /></td>
                  <td className="text-center p-3"><Icon icon="ph:check-circle-fill" className="w-5 h-5 text-green-400 inline" /></td>
                  <td className="text-center p-3"><Icon icon="ph:x-circle" className="w-5 h-5 text-red-400 inline" /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Полезные команды */}
        <motion.div 
          className="bg-slate-800/50 backdrop-blur p-6 rounded-xl border border-slate-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-2xl font-bold mb-6 text-white">Шпаргалка по командам</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-semibold mb-3 text-blue-400">Основные команды psql</h4>
              <div className="space-y-2">
                <code className="block bg-slate-900/50 p-2 rounded text-sm text-gray-300">
                  \l - список баз данных
                </code>
                <code className="block bg-slate-900/50 p-2 rounded text-sm text-gray-300">
                  \dt - список таблиц
                </code>
                <code className="block bg-slate-900/50 p-2 rounded text-sm text-gray-300">
                  \d table_name - структура таблицы
                </code>
                <code className="block bg-slate-900/50 p-2 rounded text-sm text-gray-300">
                  \timing - включить замер времени
                </code>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-3 text-green-400">Оптимизация запросов</h4>
              <div className="space-y-2">
                <code className="block bg-slate-900/50 p-2 rounded text-sm text-gray-300">
                  EXPLAIN ANALYZE - план выполнения
                </code>
                <code className="block bg-slate-900/50 p-2 rounded text-sm text-gray-300">
                  CREATE INDEX CONCURRENTLY - без блокировки
                </code>
                <code className="block bg-slate-900/50 p-2 rounded text-sm text-gray-300">
                  VACUUM ANALYZE - обновить статистику
                </code>
                <code className="block bg-slate-900/50 p-2 rounded text-sm text-gray-300">
                  pg_stat_statements - профилирование
                </code>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PostgreSQL;