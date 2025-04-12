import React from 'react'

// Импортируем компоненты секций из той же папки
import TypeScriptIntro from './TypeScriptIntro'
import TypeScriptJSDoc from './TypeScriptJSDoc' // Компонент с документацией
import TypeScriptConcepts from './TypeScriptConcepts'
import TypeScriptCritique from './TypeScriptCritique'
import TypeScriptCodeExamples from './TypeScriptCodeExamples'
import TypeScriptTasks from './TypeScriptTasks' // Компонент с задачами
import TypeScriptResources from './TypeScriptResources'

// Импортируем общий компонент лэйаута
import ResearchPageLayout from '../../../components/Layout/ResearchPageLayout'

const TypeScriptPage: React.FC = () => {
  return (
    <ResearchPageLayout title="TypeScript: Критический Анализ">
      <TypeScriptIntro />
      <TypeScriptJSDoc /> {/* Компонент с MDX-документацией */}
      <TypeScriptConcepts />
      <TypeScriptCritique /> 
      <TypeScriptCodeExamples />
      <TypeScriptTasks /> {/* Компонент с задачами */}
      <TypeScriptResources />
    </ResearchPageLayout>
  )
}

export default TypeScriptPage