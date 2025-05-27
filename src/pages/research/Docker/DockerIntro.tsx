import React from 'react'
import { motion } from 'motion/react'
import { Icon } from '@iconify/react'

const DockerIntro: React.FC = () => {
  return (
    <section className="p-6 border rounded-lg bg-slate-800/40 border-slate-700/50">
      <h2 className="mb-4 text-2xl font-semibold text-blue-400">Docker: Введение</h2>
      
      <div className="mb-6">
        <p className="mb-4 text-gray-300">
          Docker - это платформа для разработки, доставки и запуска приложений в контейнерах. 
          Контейнеры позволяют разработчикам упаковать приложение со всеми необходимыми зависимостями 
          и конфигурациями в стандартизированный блок для разработки программного обеспечения.
        </p>
        
        <p className="mb-4 text-gray-300">
          В отличие от виртуальных машин, контейнеры используют общее ядро хост-системы и изолируют 
          процессы приложения от остальной системы. Это делает их легкими и эффективными, 
          обеспечивая при этом изоляцию, необходимую для согласованной работы приложений в различных средах.
        </p>
      </div>
      
      <div className="p-4 mb-6 border rounded-lg bg-slate-700/30 border-slate-600/50">
        <h3 className="mb-3 text-lg font-semibold text-indigo-300">Ключевые преимущества Docker:</h3>
        <ul className="pl-5 space-y-2 text-gray-300 list-disc">
          <li>
            <span className="font-medium text-indigo-200">Консистентность среды</span> - "работает на моей машине" больше не проблема
          </li>
          <li>
            <span className="font-medium text-indigo-200">Изоляция и безопасность</span> - приложения работают в изолированной среде
          </li>
          <li>
            <span className="font-medium text-indigo-200">Масштабируемость</span> - легко масштабировать контейнеры по мере необходимости
          </li>
          <li>
            <span className="font-medium text-indigo-200">Быстрый старт и остановка</span> - секунды вместо минут в случае виртуальных машин
          </li>
          <li>
            <span className="font-medium text-indigo-200">Эффективность ресурсов</span> - меньшие накладные расходы по сравнению с виртуальными машинами
          </li>
        </ul>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <motion.div 
          className="p-4 border rounded-lg bg-slate-700/30 border-slate-600/50"
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
          <div className="flex items-center mb-3 gap-3">
            <div className="p-2 rounded-md bg-blue-500/20">
              <Icon icon="mdi:docker" className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-blue-300">Принципы работы Docker</h3>
          </div>
          <p className="text-gray-300">
            Docker использует клиент-серверную архитектуру с демоном Docker, API и интерфейсом командной строки. 
            Он строит контейнеры из образов - легковесных, автономных, исполняемых пакетов, включающих всё необходимое 
            для запуска приложения.
          </p>
        </motion.div>
        
        <motion.div 
          className="p-4 border rounded-lg bg-slate-700/30 border-slate-600/50"
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
          <div className="flex items-center mb-3 gap-3">
            <div className="p-2 rounded-md bg-purple-500/20">
              <Icon icon="mdi:cloud-sync" className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold text-purple-300">Контейнеры vs VM</h3>
          </div>
          <p className="text-gray-300">
            В отличие от виртуальных машин, которые эмулируют полную операционную систему, контейнеры Docker 
            используют ресурсы хост-системы и делят её ядро. Это делает их более легкими, быстрыми и эффективными, 
            идеальными для микросервисной архитектуры и CI/CD.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default DockerIntro
