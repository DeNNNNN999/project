import { motion } from 'motion/react';
import { Icon } from '@iconify/react';

const ResearchSection = () => {
  return (
    <section id="research" className="py-20 relative">
      {/* Фоновые элементы */}
      <div className="absolute inset-0 bg-gradient-radial from-purple-900/20 to-transparent opacity-30" />
      
      <div className="container mx-auto px-4">
        {/* Заголовок секции в академическом стиле */}
        <motion.div 
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold mb-3 text-transparent bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text">
            # Технические исследования
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Изучение теоретических основ программирования и практическая реализация алгоритмических концепций.
          </p>
        </motion.div>
        
        {/* Секция исследовательских проектов */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bg-slate-800/50 backdrop-blur p-6 rounded-xl border border-slate-700/50">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              <span className="text-red-500 mr-2">#</span> Исследовательские проекты
            </h3>
            
            {/* Теоретические исследования */}
            <div className="mb-10">
              <h4 className="text-xl text-white mb-4 flex items-center">
                <span className="text-red-500 mr-2">##</span> Теория алгоритмов
              </h4>
              
              <div className="bg-slate-900/50 backdrop-blur p-5 rounded-lg border border-slate-800">
                <h5 className="text-white text-lg font-bold mb-3">Структуры данных в функциональном программировании</h5>
                
                <div className="prose prose-invert prose-sm max-w-none mb-4">
                  <p>
                    Исследование реализации классических структур данных в функциональной парадигме программирования с фокусом на неизменяемость и ссылочную прозрачность.
                  </p>
                  
                  <div className="bg-slate-800/80 border border-slate-700 rounded p-3 my-4 font-mono text-sm">
                    <p className="mb-2 text-blue-400">Definition 1.1 (Функциональная структура данных)</p>
                    <p>Структура данных, реализованная без использования мутабельного состояния, при которой любая модификация создает новую версию структуры, сохраняя предыдущую неизменной.</p>
                  </div>
                  
                  <p>
                    В рамках исследования были изучены и реализованы:
                  </p>
                  
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Персистентные списки с разделением структуры</li>
                    <li>Персистентные ассоциативные массивы на HAMT (Hash Array Mapped Trie)</li>
                    <li>Finger trees с асимптотически эффективными операциями</li>
                  </ul>
                </div>
                
                <div className="flex justify-end">
                  <motion.a 
                    href="#" 
                    className="bg-slate-700 hover:bg-slate-600 text-white px-3 py-1.5 text-sm rounded-md transition-colors flex items-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon icon="ph:book-open-fill" className="mr-2" />
                    Читать исследование
                  </motion.a>
                </div>
              </div>
            </div>
            
            {/* Практические исследования */}
            <h4 className="text-xl text-white mb-4 flex items-center">
              <span className="text-red-500 mr-2">##</span> Экспериментальные проекты
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Проект 1 */}
              <div className="bg-slate-900/50 backdrop-blur rounded-lg p-5 border border-slate-800 hover:border-purple-500/50 transition-colors">
                <div className="flex justify-between mb-3">
                  <h5 className="font-bold text-white">Типизированная микро-ORM</h5>
                  <span className="text-xs px-2 py-1 bg-purple-900/50 rounded-md text-purple-300">TypeScript</span>
                </div>
                <p className="text-gray-400 text-sm mb-3">
                  Разработка типобезопасной ORM с автоматической генерацией типов на основе схемы базы данных и статическим анализом SQL запросов.
                </p>
                <div className="flex items-center text-gray-500 text-xs space-x-3 mb-3">
                  <span>Статический анализ</span>
                  <span>Type-safety</span>
                  <span>Zero-runtime</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-gray-500">2023</span>
                  <a href="#" className="text-blue-400 text-sm hover:underline">Подробнее</a>
                </div>
              </div>
              
              {/* Проект 2 */}
              <div className="bg-slate-900/50 backdrop-blur rounded-lg p-5 border border-slate-800 hover:border-purple-500/50 transition-colors">
                <div className="flex justify-between mb-3">
                  <h5 className="font-bold text-white">Алгоритмический визуализатор</h5>
                  <span className="text-xs px-2 py-1 bg-blue-900/50 rounded-md text-blue-300">React</span>
                </div>
                <p className="text-gray-400 text-sm mb-3">
                  Интерактивная визуализация работы сложных алгоритмов и структур данных с возможностью пошагового выполнения и анализа сложности.
                </p>
                <div className="flex items-center text-gray-500 text-xs space-x-3 mb-3">
                  <span>Образовательный</span>
                  <span>Интерактивный</span>
                  <span>Анимированный</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-gray-500">2024</span>
                  <a href="#" className="text-blue-400 text-sm hover:underline">Подробнее</a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Методологическая секция */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="bg-slate-800/50 backdrop-blur p-6 rounded-xl border border-slate-700/50">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              <span className="text-red-500 mr-2">#</span> Содержание
            </h3>
            
            <div className="bg-slate-900/70 border border-slate-800 rounded-lg p-5">
              <p className="text-gray-400 mb-6">Индекс исследовательских материалов в формате академической работы.</p>
              
              <div className="space-y-3">
                <div className="flex">
                  <div className="w-8 text-gray-500 flex-shrink-0">1.</div>
                  <div className="text-white">
                    Введение в алгоритмическое мышление 
                    <div className="border-t border-dashed border-gray-700 mt-1"></div>
                  </div>
                  <div className="ml-2 text-gray-500">1</div>
                </div>
                
                <div className="flex">
                  <div className="w-8 text-gray-500 flex-shrink-0">2.</div>
                  <div className="text-white">
                    Структуры данных для эффективных вычислений
                    <div className="border-t border-dashed border-gray-700 mt-1"></div>
                  </div>
                  <div className="ml-2 text-gray-500">8</div>
                </div>
                
                <div className="flex">
                  <div className="w-8 text-gray-500 flex-shrink-0">2.1.</div>
                  <div className="text-white ml-4">
                    Хеш-таблицы и их модификации
                    <div className="border-t border-dashed border-gray-700 mt-1"></div>
                  </div>
                  <div className="ml-2 text-gray-500">9</div>
                </div>
                
                <div className="flex">
                  <div className="w-8 text-gray-500 flex-shrink-0">2.2.</div>
                  <div className="text-white ml-4">
                    Деревья поиска и сбалансированные структуры
                    <div className="border-t border-dashed border-gray-700 mt-1"></div>
                  </div>
                  <div className="ml-2 text-gray-500">15</div>
                </div>
                
                <div className="flex">
                  <div className="w-8 text-gray-500 flex-shrink-0">3.</div>
                  <div className="text-white">
                    Анализ временной и пространственной сложности
                    <div className="border-t border-dashed border-gray-700 mt-1"></div>
                  </div>
                  <div className="ml-2 text-gray-500">23</div>
                </div>
                
                <div className="flex">
                  <div className="w-8 text-gray-500 flex-shrink-0">4.</div>
                  <div className="text-white">
                    Функциональные подходы к программированию
                    <div className="border-t border-dashed border-gray-700 mt-1"></div>
                  </div>
                  <div className="ml-2 text-gray-500">31</div>
                </div>
                
                <div className="flex">
                  <div className="w-8 text-gray-500 flex-shrink-0">5.</div>
                  <div className="text-white">
                    Заключение и дальнейшие исследования
                    <div className="border-t border-dashed border-gray-700 mt-1"></div>
                  </div>
                  <div className="ml-2 text-gray-500">42</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ResearchSection;
