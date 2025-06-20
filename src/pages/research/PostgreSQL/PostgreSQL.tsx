import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, Loader } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';
import InteractiveBook from './InteractiveBook';

const PostgreSQL: React.FC = () => {
  const [isBookOpen, setIsBookOpen] = useState(false);
  const [showPdf, setShowPdf] = useState(false);
  const [pdfError, setPdfError] = useState(false);
  const pdfUrl = 'https://edu.postgrespro.ru/sql_primer.pdf';

  const handleBookClick = () => {
    if (!isBookOpen) {
      setIsBookOpen(true);
      // Показать PDF после анимации открытия
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-800">
      {/* Заголовок */}
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
        <p className="text-xl text-gray-300">Интерактивное руководство по SQL</p>
      </motion.div>

      {/* 3D сцена с книгой */}
      <div className="relative h-[600px] mx-auto max-w-6xl">
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
          
          {/* Освещение */}
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
          
          {/* Книга */}
          <Suspense fallback={null}>
            <InteractiveBook 
              isOpen={isBookOpen} 
              onClick={handleBookClick}
            />
          </Suspense>
          
          {/* Окружение */}
          <Environment preset="city" />
          
          {/* Стол */}
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

        {/* Подсказка */}
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

        {/* Индикатор загрузки 3D */}
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
              {/* Заголовок */}
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

              {/* PDF Content */}
              <div className="w-full h-[calc(100%-64px)] relative">
                {!pdfError ? (
                  <>
                    <iframe
                      src={`https://docs.google.com/viewer?url=${encodeURIComponent(pdfUrl)}&embedded=true`}
                      className="w-full h-full"
                      title="PostgreSQL SQL Primer"
                      onError={handlePdfError}
                    />
                    {/* Альтернативный способ отображения */}
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
                      Вы можете открыть документ в новой вкладке.
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
                    <a
                      href={pdfUrl}
                      download="postgresql_sql_primer.pdf"
                      className="mt-4 text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-2"
                    >
                      <Icon icon="ph:download" className="w-4 h-4" />
                      Скачать PDF
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Дополнительная информация */}
      <motion.div 
        className="max-w-5xl mx-auto px-6 py-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <div className="grid md:grid-cols-3 gap-6">
          {/* О руководстве */}
          <motion.div 
            className="bg-slate-800/50 backdrop-blur p-6 rounded-xl border border-slate-700"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Icon icon="ph:book-open" className="w-12 h-12 text-blue-400 mb-4" />
            <h3 className="text-2xl font-bold mb-4 text-blue-400">О руководстве</h3>
            <p className="text-gray-300 mb-4">
              Интерактивное руководство от Postgres Professional с основами SQL и PostgreSQL.
            </p>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center gap-2">
                <Icon icon="ph:check-circle" className="text-green-400 flex-shrink-0" />
                <span>Основы SQL запросов</span>
              </li>
              <li className="flex items-center gap-2">
                <Icon icon="ph:check-circle" className="text-green-400 flex-shrink-0" />
                <span>Работа с таблицами</span>
              </li>
              <li className="flex items-center gap-2">
                <Icon icon="ph:check-circle" className="text-green-400 flex-shrink-0" />
                <span>Транзакции и блокировки</span>
              </li>
              <li className="flex items-center gap-2">
                <Icon icon="ph:check-circle" className="text-green-400 flex-shrink-0" />
                <span>Оптимизация запросов</span>
              </li>
            </ul>
          </motion.div>

          {/* Ключевые темы */}
          <motion.div 
            className="bg-slate-800/50 backdrop-blur p-6 rounded-xl border border-slate-700"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Icon icon="ph:list-checks" className="w-12 h-12 text-purple-400 mb-4" />
            <h3 className="text-2xl font-bold mb-4 text-purple-400">Ключевые темы</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Icon icon="ph:database" className="w-5 h-5 text-purple-400 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-gray-200">DDL операции</h4>
                  <p className="text-sm text-gray-400">CREATE, ALTER, DROP</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Icon icon="ph:pencil" className="w-5 h-5 text-purple-400 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-gray-200">DML операции</h4>
                  <p className="text-sm text-gray-400">SELECT, INSERT, UPDATE, DELETE</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Icon icon="ph:key" className="w-5 h-5 text-purple-400 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-gray-200">Индексы</h4>
                  <p className="text-sm text-gray-400">B-tree, Hash, GiST, GIN</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Icon icon="ph:shield-check" className="w-5 h-5 text-purple-400 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-gray-200">Безопасность</h4>
                  <p className="text-sm text-gray-400">Роли, привилегии, RLS</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Полезные ресурсы */}
          <motion.div 
            className="bg-slate-800/50 backdrop-blur p-6 rounded-xl border border-slate-700"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Icon icon="ph:link" className="w-12 h-12 text-green-400 mb-4" />
            <h3 className="text-2xl font-bold mb-4 text-green-400">Ресурсы</h3>
            <div className="space-y-3">
              <a 
                href="https://postgrespro.ru/docs/postgresql" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block p-3 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <Icon icon="ph:book-open" className="w-5 h-5 text-blue-400" />
                  <span className="text-gray-300 group-hover:text-white transition-colors">Документация</span>
                  <Icon icon="ph:arrow-square-out" className="w-4 h-4 text-gray-500 ml-auto group-hover:text-gray-300" />
                </div>
              </a>
              
              <a 
                href="https://www.postgresql.org/docs/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block p-3 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <Icon icon="ph:globe" className="w-5 h-5 text-blue-400" />
                  <span className="text-gray-300 group-hover:text-white transition-colors">PostgreSQL.org</span>
                  <Icon icon="ph:arrow-square-out" className="w-4 h-4 text-gray-500 ml-auto group-hover:text-gray-300" />
                </div>
              </a>
              
              <a 
                href="https://github.com/postgres/postgres" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block p-3 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <Icon icon="ph:github-logo" className="w-5 h-5 text-blue-400" />
                  <span className="text-gray-300 group-hover:text-white transition-colors">GitHub</span>
                  <Icon icon="ph:arrow-square-out" className="w-4 h-4 text-gray-500 ml-auto group-hover:text-gray-300" />
                </div>
              </a>

              <a 
                href="https://www.pgadmin.org/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block p-3 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <Icon icon="ph:desktop" className="w-5 h-5 text-blue-400" />
                  <span className="text-gray-300 group-hover:text-white transition-colors">pgAdmin</span>
                  <Icon icon="ph:arrow-square-out" className="w-4 h-4 text-gray-500 ml-auto group-hover:text-gray-300" />
                </div>
              </a>
            </div>
          </motion.div>
        </div>

        {/* Дополнительная кнопка для прямого доступа к PDF */}
        <motion.div 
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <motion.button
            onClick={() => setShowPdf(true)}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Icon icon="ph:book-open" className="w-6 h-6" />
            Читать руководство сейчас
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PostgreSQL;