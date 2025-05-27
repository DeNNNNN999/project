import React, { useState } from 'react'
import { motion } from 'motion/react'
import { Icon } from '@iconify/react'

const DockerCritique: React.FC = () => {
  const [expandedSection, setExpandedSection] = useState<number | null>(null)
  
  const critiques = [
    {
      title: 'Сложность и кривая обучения',
      description: 'Несмотря на популярность, Docker имеет крутую кривую обучения. Новичкам приходится осваивать множество концепций одновременно: образы, контейнеры, сети, тома и более продвинутые инструменты для оркестрации. Документация хоть и обширна, но может быть перегружена для начинающих.',
      icon: 'mdi:chart-line'
    },
    {
      title: 'Производительность на Windows и macOS',
      description: 'Docker изначально разрабатывался для Linux и использует его возможности. На Windows и macOS Docker работает через промежуточный слой виртуализации, что приводит к снижению производительности и увеличению потребления ресурсов по сравнению с нативным использованием в Linux.',
      icon: 'mdi:speedometer'
    },
    {
      title: 'Безопасность и уязвимости',
      description: 'Контейнеры не так изолированы, как виртуальные машины. Уязвимости в ядре могут потенциально затронуть все контейнеры. Также образы из публичных репозиториев могут содержать уязвимый код или вредоносное ПО. Требуется постоянное сканирование образов и правильная настройка безопасности демона Docker.',
      icon: 'mdi:shield-alert'
    },
    {
      title: 'Хранение данных и управление состоянием',
      description: 'Хотя Docker-тома решают проблему персистентности данных, управление состоянием в контейнерах остаётся сложной задачей. Синхронизация данных между контейнерами, резервное копирование и миграция томов между разными хостами требуют дополнительных инструментов и стратегий.',
      icon: 'mdi:database-sync'
    },
    {
      title: 'Корпоративная стратегия и лицензирование',
      description: 'Docker Inc. неоднократно менял свою бизнес-модель и стратегию, что создавало неопределенность в сообществе. Изменения в лицензировании Docker Desktop для предприятий и сдвиг фокуса компании вызывали беспокойство относительно долгосрочной стабильности экосистемы.',
      icon: 'mdi:license'
    },
    {
      title: 'Альтернативы и фрагментация',
      description: 'Рост популярности альтернативных движков контейнеризации, таких как containerd и CRI-O, а также инструментов командной строки, таких как Podman, создаёт фрагментацию экосистемы. Это усложняет выбор и может вызвать проблемы совместимости в долгосрочной перспективе.',
      icon: 'mdi:puzzle'
    }
  ]
  
  const toggleSection = (index: number) => {
    if (expandedSection === index) {
      setExpandedSection(null)
    } else {
      setExpandedSection(index)
    }
  }

  return (
    <section id="critique" className="p-6 border rounded-lg bg-slate-800/40 border-slate-700/50">
      <h2 className="mb-4 text-2xl font-semibold text-red-400">Критический Взгляд на Docker</h2>
      
      <div className="mb-6">
        <p className="text-gray-300">
          Хотя Docker произвел революцию в разработке и развертывании приложений, 
          важно объективно оценивать его ограничения и проблемы. Ниже представлен критический анализ 
          технологии Docker с различных точек зрения.
        </p>
      </div>
      
      <div className="space-y-4">
        {critiques.map((critique, index) => (
          <motion.div 
            key={index}
            className="border rounded-lg bg-slate-800/60 border-slate-700/50 overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <div 
              className={`flex items-center justify-between p-4 cursor-pointer ${
                expandedSection === index ? 'bg-slate-700/50' : ''
              }`}
              onClick={() => toggleSection(index)}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-md bg-red-500/20">
                  <Icon icon={critique.icon} className="w-5 h-5 text-red-400" />
                </div>
                <h3 className="text-lg font-medium text-white">{critique.title}</h3>
              </div>
              <Icon 
                icon="mdi:chevron-down" 
                className={`w-5 h-5 text-gray-400 transition-transform ${
                  expandedSection === index ? 'rotate-180' : ''
                }`} 
              />
            </div>
            
            <motion.div
              initial={false}
              animate={{ height: expandedSection === index ? 'auto' : 0, opacity: expandedSection === index ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="p-4 pt-0 border-t border-slate-700/50">
                <p className="text-gray-300">{critique.description}</p>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
      
      <div className="p-4 mt-6 border rounded-lg bg-amber-900/20 border-amber-500/30">
        <div className="flex items-start gap-3">
          <div className="p-2 mt-1 rounded-md bg-amber-500/20 shrink-0">
            <Icon icon="mdi:lightbulb-on" className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <h4 className="mb-2 text-lg font-medium text-amber-300">Объективный подход</h4>
            <p className="text-gray-300">
              Критический анализ не означает, что Docker неэффективен. Напротив, понимание ограничений 
              и проблемных областей позволяет принимать более обоснованные решения при использовании 
              контейнеризации и выбирать правильные инструменты для конкретных задач. В некоторых сценариях 
              альтернативные подходы (виртуальные машины, serverless) могут быть более подходящими.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DockerCritique
