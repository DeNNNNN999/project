import React from 'react'

// Импортируем компоненты секций из той же папки
import ReactIntro from './ReactIntro'
import ReactJSDoc from './ReactJSDoc' // Компонент с документацией
import ReactConcepts from './ReactConcepts'
import ReactCritique from './ReactCritique'
import ReactCodeExamples from './ReactCodeExamples'
import ReactTasks from './ReactTasks' // Компонент с задачами
import ReactResources from './ReactResources'

// Импортируем общий компонент лэйаута
import ResearchPageLayout from '../../../components/Layout/ResearchPageLayout'

const ReactPage: React.FC = () => {
  return (
    <ResearchPageLayout title="React: Критический Анализ">
      <ReactIntro />
      <ReactJSDoc /> {/* Компонент с MDX-документацией */}
      <ReactConcepts />
      <ReactCritique /> 
      <ReactCodeExamples />
      <ReactTasks /> {/* Компонент с задачами */}
      <ReactResources />
    </ResearchPageLayout>
  )
}

export default ReactPage