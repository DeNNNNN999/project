import React from 'react'
import { motion } from 'motion/react'
import { Icon } from '@iconify/react'

const DockerConcepts: React.FC = () => {
  const concepts = [
    {
      title: 'Образы (Images)',
      description: 'Неизменяемые шаблоны с инструкциями для создания контейнеров. Образы строятся слоями, обеспечивая эффективную переносимость и повторное использование.',
      icon: 'mdi:file-image',
      color: 'blue'
    },
    {
      title: 'Контейнеры (Containers)',
      description: 'Изолированные запущенные экземпляры образов. Контейнеры временны и сохраняют только изменения до уничтожения.',
      icon: 'mdi:package-variant-closed',
      color: 'green'
    },
    {
      title: 'Dockerfile',
      description: 'Текстовый файл с набором инструкций для автоматического создания образа. Определяет базовый образ, команды, порты и точку входа.',
      icon: 'mdi:file-document-outline',
      color: 'purple'
    },
    {
      title: 'Docker Hub',
      description: 'Централизованный репозиторий образов Docker. Позволяет находить, публиковать и делиться образами контейнеров.',
      icon: 'mdi:cloud-upload',
      color: 'sky'
    },
    {
      title: 'Docker Compose',
      description: 'Инструмент для определения и запуска многоконтейнерных приложений. Использует YAML-файл для настройки служб, сетей и томов.',
      icon: 'mdi:ray-start-arrow',
      color: 'amber'
    },
    {
      title: 'Volumes (Тома)',
      description: 'Механизм для постоянного хранения данных за пределами жизненного цикла контейнера. Упрощает совместное использование данных между контейнерами.',
      icon: 'mdi:database',
      color: 'red'
    },
    {
      title: 'Networks (Сети)',
      description: 'Позволяют контейнерам безопасно общаться друг с другом и с внешним миром. Поддерживает различные типы сетей для разных сценариев.',
      icon: 'mdi:network',
      color: 'teal'
    },
    {
      title: 'Docker Swarm',
      description: 'Встроенное решение для оркестрации кластеров Docker. Позволяет управлять группой хостов Docker как единым виртуальным хостом.',
      icon: 'mdi:server-network',
      color: 'pink'
    }
  ]

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string, text: string, border: string }> = {
      blue: { bg: 'bg-blue-500/20', text: 'text-blue-400', border: 'border-blue-500/30' },
      green: { bg: 'bg-green-500/20', text: 'text-green-400', border: 'border-green-500/30' },
      purple: { bg: 'bg-purple-500/20', text: 'text-purple-400', border: 'border-purple-500/30' },
      sky: { bg: 'bg-sky-500/20', text: 'text-sky-400', border: 'border-sky-500/30' },
      amber: { bg: 'bg-amber-500/20', text: 'text-amber-400', border: 'border-amber-500/30' },
      red: { bg: 'bg-red-500/20', text: 'text-red-400', border: 'border-red-500/30' },
      teal: { bg: 'bg-teal-500/20', text: 'text-teal-400', border: 'border-teal-500/30' },
      pink: { bg: 'bg-pink-500/20', text: 'text-pink-400', border: 'border-pink-500/30' }
    }
    
    return colors[color] || colors.blue
  }

  return (
    <section id="concepts" className="p-6 border rounded-lg bg-slate-800/40 border-slate-700/50">
      <h2 className="mb-4 text-2xl font-semibold text-blue-400">Ключевые Концепции Docker</h2>
      
      <div className="mb-6">
        <p className="text-gray-300">
          Понимание основных концепций Docker критически важно для эффективного использования этой технологии. 
          Ниже представлены ключевые понятия, которые формируют экосистему Docker.
        </p>
      </div>
      
      <div className="grid gap-4 sm:grid-cols-2">
        {concepts.map((concept, index) => {
          const colors = getColorClasses(concept.color)
          
          return (
            <motion.div 
              key={index}
              className={`p-4 border rounded-lg bg-slate-800/60 ${colors.border}`}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <div className="flex items-center mb-3 gap-3">
                <div className={`p-2 rounded-md ${colors.bg}`}>
                  <Icon icon={concept.icon} className={`w-6 h-6 ${colors.text}`} />
                </div>
                <h3 className={`text-lg font-semibold ${colors.text}`}>{concept.title}</h3>
              </div>
              <p className="text-gray-300">{concept.description}</p>
            </motion.div>
          )
        })}
      </div>
      
      <div className="p-4 mt-6 border rounded-lg bg-indigo-900/20 border-indigo-500/30">
        <div className="flex items-start gap-3">
          <div className="p-2 mt-1 rounded-md bg-indigo-500/20 shrink-0">
            <Icon icon="mdi:information-outline" className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <h4 className="mb-2 text-lg font-medium text-indigo-300">Глубокое понимание</h4>
            <p className="text-gray-300">
              Эти концепции тесно взаимосвязаны, образуя комплексную экосистему для работы с контейнерами. 
              Детальное изучение каждой из них помогает эффективно использовать Docker в различных сценариях: 
              от локальной разработки до производственного развертывания микросервисной архитектуры.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DockerConcepts
