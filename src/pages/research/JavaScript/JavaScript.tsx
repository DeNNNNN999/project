import React from 'react'

// Импортируем компоненты секций из той же папки
import JavaScriptIntro from './JavaScriptIntro'
import JavaScriptJSDoc from './JavaScriptJSDoc' // Новый компонент с JSDoc
import JavaScriptConcepts from './JavaScriptConcepts'
import JavaScriptCritique from './JavaScriptCritique'
import JavaScriptCodeExamples from './JavaScriptCodeExamples'
import JavaScriptTasks from './JavaScriptTasks' // Новый компонент с задачами
import JavaScriptResources from './JavaScriptResources'
// ... возможно, другие секции ...

// Импортируем общий компонент лэйаута (путь может отличаться)
import ResearchPageLayout from '../../../components/Layout/ResearchPageLayout'

const JavaScriptPage: React.FC = () => {
  return (
    // Используем общий лэйаут для страниц документации
    <ResearchPageLayout title="JavaScript: Критический Анализ">
      <JavaScriptIntro />
      <JavaScriptJSDoc /> {/* Новый компонент с MDX-документацией */}
      <JavaScriptConcepts />
      <JavaScriptCritique /> {/* Секция с критикой */}
      <JavaScriptCodeExamples />
      <JavaScriptTasks /> {/* Новый компонент с задачами */}
      <JavaScriptResources />
    </ResearchPageLayout>
  )
}

export default JavaScriptPage
