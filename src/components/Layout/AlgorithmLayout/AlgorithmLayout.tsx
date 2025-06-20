import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Icon } from '@iconify/react';
import { AlgorithmComplexity } from '../../../data/algorithms-data';
import PageWrapper from '../PageWrapper';

interface Category {
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
  complexity: AlgorithmComplexity;
  category: Category;
  relatedAlgorithms?: RelatedAlgorithm[];
  visualization: React.ReactNode;
  implementation: React.ReactNode;
  explanation: React.ReactNode;
  applications?: React.ReactNode;
}

const AlgorithmLayout: React.FC<AlgorithmLayoutProps> = ({
  title,
  description,
  complexity,
  category,
  relatedAlgorithms = [],
  visualization,
  implementation,
  explanation,
  applications,
}) => {
  const [activeTab, setActiveTab] = useState<'visualization' | 'implementation' | 'explanation' | 'applications'>('visualization');

  const tabs = [
    { id: 'visualization', label: 'Визуализация', icon: 'mdi:eye' },
    { id: 'implementation', label: 'Реализация', icon: 'mdi:code-braces' },
    { id: 'explanation', label: 'Объяснение', icon: 'mdi:book-open-page-variant' },
    ...(applications ? [{ id: 'applications', label: 'Применение', icon: 'mdi:lightbulb' }] : []),
  ] as const;

  return (
    <PageWrapper>
      <div className="bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 text-sm mb-4">
            <Link to="/algorithms" className="text-slate-400 hover:text-white transition-colors">
              Алгоритмы
            </Link>
            <Icon icon="mdi:chevron-right" className="w-4 h-4 text-slate-600" />
            <Link to={`/algorithms/${category.id}`} className="text-slate-400 hover:text-white transition-colors">
              {category.name}
            </Link>
            <Icon icon="mdi:chevron-right" className="w-4 h-4 text-slate-600" />
            <span className="text-white">{title}</span>
          </div>

          <div className="flex items-start gap-6 mb-6">
            <div className="p-4 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-xl">
              <Icon icon={category.icon} className="w-12 h-12 text-blue-400" />
            </div>
            
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-3">{title}</h1>
              <p className="text-xl text-slate-300 mb-4">{description}</p>
              
              {/* Complexity badges */}
              <div className="flex flex-wrap gap-3">
                <div className="px-4 py-2 bg-green-900/30 border border-green-700/50 rounded-lg">
                  <span className="text-green-400 text-sm font-medium">Время: </span>
                  <span className="text-white font-mono">{complexity.time}</span>
                </div>
                <div className="px-4 py-2 bg-purple-900/30 border border-purple-700/50 rounded-lg">
                  <span className="text-purple-400 text-sm font-medium">Память: </span>
                  <span className="text-white font-mono">{complexity.space}</span>
                </div>
                {complexity.note && (
                  <div className="px-4 py-2 bg-amber-900/30 border border-amber-700/50 rounded-lg">
                    <span className="text-amber-400 text-sm">⚠️ {complexity.note}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 p-1 bg-slate-800 rounded-lg">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-700'
                }`}
              >
                <Icon icon={tab.icon} className="w-5 h-5" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main content */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {activeTab === 'visualization' && (
                  <div className="bg-slate-800 rounded-lg p-6">
                    {visualization}
                  </div>
                )}
                
                {activeTab === 'implementation' && (
                  <div className="bg-slate-800 rounded-lg p-6">
                    {implementation}
                  </div>
                )}
                
                {activeTab === 'explanation' && (
                  <div className="bg-slate-800 rounded-lg p-6 prose prose-invert max-w-none">
                    {explanation}
                  </div>
                )}
                
                {activeTab === 'applications' && applications && (
                  <div className="bg-slate-800 rounded-lg p-6 prose prose-invert max-w-none">
                    {applications}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-slate-800 rounded-lg p-6"
            >
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Icon icon="mdi:information" className="w-5 h-5 text-blue-400" />
                Краткая информация
              </h3>
              
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-slate-400">Категория:</span>
                  <div className="mt-1 flex items-center gap-2">
                    <Icon icon={category.icon} className="w-4 h-4 text-blue-400" />
                    <span className="text-white">{category.name}</span>
                  </div>
                </div>
                
                <div>
                  <span className="text-slate-400">Сложность по времени:</span>
                  <div className="mt-1 font-mono text-green-400">{complexity.time}</div>
                </div>
                
                <div>
                  <span className="text-slate-400">Сложность по памяти:</span>
                  <div className="mt-1 font-mono text-purple-400">{complexity.space}</div>
                </div>
              </div>
            </motion.div>

            {/* Related algorithms */}
            {relatedAlgorithms.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-slate-800 rounded-lg p-6"
              >
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Icon icon="mdi:link-variant" className="w-5 h-5 text-purple-400" />
                  Похожие алгоритмы
                </h3>
                
                <div className="space-y-2">
                  {relatedAlgorithms.map((algo) => (
                    <Link
                      key={algo.id}
                      to={algo.path}
                      className="block p-3 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <Icon icon="mdi:arrow-right" className="w-4 h-4 text-slate-400" />
                        <span className="text-white">{algo.name}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Resources */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-slate-800 rounded-lg p-6"
            >
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Icon icon="mdi:book-open-variant" className="w-5 h-5 text-amber-400" />
                Полезные ресурсы
              </h3>
              
              <div className="space-y-3">
                <a
                  href="#"
                  className="flex items-center gap-2 text-sm text-slate-300 hover:text-white transition-colors"
                >
                  <Icon icon="mdi:wikipedia" className="w-4 h-4" />
                  Wikipedia
                </a>
                <a
                  href="#"
                  className="flex items-center gap-2 text-sm text-slate-300 hover:text-white transition-colors"
                >
                  <Icon icon="mdi:youtube" className="w-4 h-4" />
                  Видео объяснение
                </a>
                <a
                  href="#"
                  className="flex items-center gap-2 text-sm text-slate-300 hover:text-white transition-colors"
                >
                  <Icon icon="mdi:github" className="w-4 h-4" />
                  Примеры на GitHub
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      </div>
    </PageWrapper>
  );
};

export default AlgorithmLayout;
