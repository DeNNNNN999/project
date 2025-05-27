import React, { ReactNode } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Icon } from '@iconify/react';

interface AlgorithmCategory {
  id: string;
  name: string;
  icon: string;
}

interface RelatedAlgorithm {
  id: string;
  name: string;
  path: string;
}

interface AlgorithmLayoutProps {
  title: string;
  description: string;
  complexity: {
    time: string;
    space: string;
  };
  category: AlgorithmCategory;
  relatedAlgorithms: RelatedAlgorithm[];
  implementation?: ReactNode;
  visualization?: ReactNode;
  explanation?: ReactNode;
  applications?: ReactNode;
  children?: ReactNode;
}

const AlgorithmLayout: React.FC<AlgorithmLayoutProps> = ({
  title,
  description,
  complexity,
  category,
  relatedAlgorithms,
  implementation,
  visualization,
  explanation,
  applications,
  children
}) => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen py-32 bg-slate-900">
      {/* Фоновый градиент */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-blue-900/10 to-slate-900" />
        <motion.div
          className="absolute inset-0 opacity-20"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.3), transparent 60%)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="container relative z-10 px-4 mx-auto">
        {/* Навигационная цепочка */}
        <div className="mb-8">
          <motion.div 
            className="flex items-center space-x-2 text-sm text-slate-400"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Link to="/" className="hover:text-white">Главная</Link>
            <Icon icon="ph:caret-right" />
            <Link to="/algorithms" className="hover:text-white">Алгоритмы</Link>
            <Icon icon="ph:caret-right" />
            <Link to={`/algorithms/${category.id.toLowerCase()}`} className="hover:text-white">{category.name}</Link>
            <Icon icon="ph:caret-right" />
            <span className="text-white">{title}</span>
          </motion.div>
        </div>

        {/* Заголовок и описание */}
        <motion.div 
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center px-4 py-2 mb-4 space-x-2 rounded-full bg-blue-900/30 border border-blue-700/30">
            <Icon icon={category.icon} className="w-5 h-5 text-blue-400" />
            <span className="text-sm font-medium text-blue-300">{category.name}</span>
          </div>
          
          <h1 className="mb-4 text-4xl font-bold text-transparent md:text-5xl bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text">
            {title}
          </h1>
          
          <p className="max-w-3xl mx-auto text-lg text-slate-300">
            {description}
          </p>
        </motion.div>

        {/* Основная сетка контента */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Сайдбар */}
          <div className="lg:col-span-1">
            <motion.div 
              className="sticky space-y-6 top-8"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {/* Временная и пространственная сложность */}
              <div className="p-6 border rounded-xl bg-slate-800/70 border-slate-700/50">
                <h3 className="mb-4 text-xl font-bold text-white">Сложность</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">Временная:</span>
                    <span className="px-3 py-1 text-sm font-medium rounded-full bg-blue-900/30 text-blue-300">
                      {complexity.time}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">Пространственная:</span>
                    <span className="px-3 py-1 text-sm font-medium rounded-full bg-purple-900/30 text-purple-300">
                      {complexity.space}
                    </span>
                  </div>
                </div>
              </div>

              {/* Связанные алгоритмы */}
              <div className="p-6 border rounded-xl bg-slate-800/70 border-slate-700/50">
                <h3 className="mb-4 text-xl font-bold text-white">Связанные алгоритмы</h3>
                <ul className="space-y-2">
                  {relatedAlgorithms.map((algo) => (
                    <li key={algo.id}>
                      <Link 
                        to={algo.path}
                        className="flex items-center px-3 py-2 space-x-2 transition-colors rounded-lg hover:bg-slate-700/50 text-slate-300 hover:text-white"
                      >
                        <Icon icon="ph:algorithm" className="w-5 h-5" />
                        <span>{algo.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Кнопка возврата к списку */}
              <motion.button
                onClick={() => navigate('/algorithms')}
                className="flex items-center justify-center w-full gap-2 px-4 py-3 font-medium text-white transition-colors border rounded-xl bg-slate-800 hover:bg-slate-700 border-slate-700"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Icon icon="ph:arrow-left" className="w-5 h-5" />
                <span>Ко всем алгоритмам</span>
              </motion.button>
            </motion.div>
          </div>

          {/* Основное содержимое */}
          <div className="lg:col-span-2 space-y-8">
            {/* Визуализация */}
            {visualization && (
              <motion.div
                className="p-6 border rounded-xl bg-slate-800/70 border-slate-700/50"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <h2 className="mb-4 text-2xl font-bold text-white">Визуализация</h2>
                <div className="overflow-hidden border rounded-lg min-h-[400px] border-slate-700/50">
                  {visualization}
                </div>
              </motion.div>
            )}

            {/* Объяснение */}
            {explanation && (
              <motion.div
                className="p-6 border rounded-xl bg-slate-800/70 border-slate-700/50"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <h2 className="mb-4 text-2xl font-bold text-white">Как это работает</h2>
                <div className="prose prose-invert max-w-none">
                  {explanation}
                </div>
              </motion.div>
            )}

            {/* Реализация */}
            {implementation && (
              <motion.div
                className="p-6 border rounded-xl bg-slate-800/70 border-slate-700/50"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <h2 className="mb-4 text-2xl font-bold text-white">Реализация</h2>
                {implementation}
              </motion.div>
            )}

            {/* Применение */}
            {applications && (
              <motion.div
                className="p-6 border rounded-xl bg-slate-800/70 border-slate-700/50"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <h2 className="mb-4 text-2xl font-bold text-white">Практическое применение</h2>
                <div className="prose prose-invert max-w-none">
                  {applications}
                </div>
              </motion.div>
            )}

            {/* Дополнительное содержимое */}
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlgorithmLayout;
