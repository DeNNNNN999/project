import React from 'react'
import { motion } from 'motion/react'
import { Icon } from '@iconify/react'

interface Resource {
  title: string
  url: string
  description: string
  type: 'documentation' | 'tutorial' | 'book' | 'course' | 'tool' | 'community'
}

const DockerResources: React.FC = () => {
  const resources: Resource[] = [
    {
      title: 'Официальная документация Docker',
      url: 'https://docs.docker.com/',
      description: 'Полная официальная документация по Docker, включая руководства, справочные материалы и примеры.',
      type: 'documentation'
    },
    {
      title: 'Docker Hub',
      url: 'https://hub.docker.com/',
      description: 'Репозиторий образов Docker, где можно найти готовые образы для различных приложений и сервисов.',
      type: 'tool'
    },
    {
      title: 'Play with Docker',
      url: 'https://labs.play-with-docker.com/',
      description: 'Интерактивная онлайн-среда для экспериментов с Docker без необходимости установки.',
      type: 'tutorial'
    },
    {
      title: 'Docker Deep Dive',
      url: 'https://www.amazon.com/Docker-Deep-Dive-Nigel-Poulton/dp/1521822808',
      description: 'Книга Найджела Поултона, которая детально рассматривает основы и продвинутые концепции Docker.',
      type: 'book'
    },
    {
      title: 'Docker Mastery (Udemy)',
      url: 'https://www.udemy.com/course/docker-mastery/',
      description: 'Популярный курс по Docker и Kubernetes от Брета Фишера, охватывающий все аспекты контейнеризации.',
      type: 'course'
    },
    {
      title: 'Docker Reddit',
      url: 'https://www.reddit.com/r/docker/',
      description: 'Сообщество Docker на Reddit, где можно найти ответы на вопросы и обсудить проблемы.',
      type: 'community'
    },
    {
      title: 'Portainer',
      url: 'https://www.portainer.io/',
      description: 'Веб-интерфейс для управления контейнерами Docker, облегчающий работу с контейнерами через UI.',
      type: 'tool'
    },
    {
      title: 'Docker Curriculum',
      url: 'https://docker-curriculum.com/',
      description: 'Всеобъемлющее руководство по Docker, от основ до развертывания многоконтейнерных приложений.',
      type: 'tutorial'
    },
    {
      title: 'Container Security Book',
      url: 'https://www.oreilly.com/library/view/container-security/9781492056690/',
      description: 'Книга от O\'Reilly о безопасности контейнеров, охватывающая Docker и Kubernetes.',
      type: 'book'
    },
    {
      title: 'Dive (Инструмент для анализа образов)',
      url: 'https://github.com/wagoodman/dive',
      description: 'Инструмент для исследования, анализа и оптимизации слоев Docker-образов.',
      type: 'tool'
    }
  ]
  
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'documentation': return 'mdi:file-document-outline'
      case 'tutorial': return 'mdi:school-outline'
      case 'book': return 'mdi:book-open-variant'
      case 'course': return 'mdi:medal-outline'
      case 'tool': return 'mdi:tools'
      case 'community': return 'mdi:account-group'
      default: return 'mdi:link-variant'
    }
  }
  
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'documentation': return 'text-blue-400 bg-blue-500/20'
      case 'tutorial': return 'text-green-400 bg-green-500/20'
      case 'book': return 'text-purple-400 bg-purple-500/20'
      case 'course': return 'text-amber-400 bg-amber-500/20'
      case 'tool': return 'text-red-400 bg-red-500/20'
      case 'community': return 'text-sky-400 bg-sky-500/20'
      default: return 'text-gray-400 bg-gray-500/20'
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'documentation': return 'Документация'
      case 'tutorial': return 'Руководство'
      case 'book': return 'Книга'
      case 'course': return 'Курс'
      case 'tool': return 'Инструмент'
      case 'community': return 'Сообщество'
      default: return 'Ресурс'
    }
  }

  return (
    <section id="resources" className="p-6 border rounded-lg bg-slate-800/40 border-slate-700/50">
      <h2 className="mb-4 text-2xl font-semibold text-indigo-400">Полезные ресурсы по Docker</h2>
      
      <div className="mb-6">
        <p className="text-gray-300">
          Ниже представлен список тщательно отобранных ресурсов для углубленного изучения Docker: 
          от официальной документации до специализированных книг, курсов и инструментов.
        </p>
      </div>
      
      <div className="grid gap-4 sm:grid-cols-2">
        {resources.map((resource, index) => (
          <motion.a
            key={index}
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 transition-all duration-300 border rounded-lg bg-slate-800/60 border-slate-700/50 hover:border-indigo-500/40 hover:bg-slate-800/80"
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-md mt-1 shrink-0 ${getTypeColor(resource.type)}`}>
                <Icon icon={getTypeIcon(resource.type)} className="w-5 h-5" />
              </div>
              
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg font-medium text-white">{resource.title}</h3>
                  <span className={`px-2 py-0.5 text-xs font-medium rounded ${getTypeColor(resource.type)}`}>
                    {getTypeLabel(resource.type)}
                  </span>
                </div>
                <p className="mb-2 text-sm text-gray-300">{resource.description}</p>
                <div className="flex items-center text-indigo-400 gap-1 text-sm">
                  <span>Перейти</span>
                  <Icon icon="mdi:arrow-right" className="w-4 h-4" />
                </div>
              </div>
            </div>
          </motion.a>
        ))}
      </div>
      
      <div className="p-4 mt-6 border rounded-lg bg-indigo-900/20 border-indigo-500/30">
        <div className="flex items-start gap-3">
          <div className="p-2 mt-1 rounded-md bg-indigo-500/20 shrink-0">
            <Icon icon="mdi:lightbulb-on" className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <h4 className="mb-2 text-lg font-medium text-indigo-300">Совет по обучению</h4>
            <p className="text-gray-300">
              Лучший способ изучить Docker — это сочетание теории и практики. Начните с официальной документации 
              и интерактивных руководств, затем переходите к более глубоким материалам. Обязательно экспериментируйте 
              с контейнерами на практических примерах, создавая свои собственные образы и контейнеры для реальных приложений.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DockerResources
