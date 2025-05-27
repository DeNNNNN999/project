import React from 'react'

// Импортируем компоненты секций 
import DockerIntro from './DockerIntro'
import DockerDocs from './DockerDocs'
import DockerConcepts from './DockerConcepts'
import DockerCritique from './DockerCritique'
import DockerCodeExamples from './DockerCodeExamples'
import DockerTasks from './DockerTasks'
import DockerResources from './DockerResources'

// Импортируем общий компонент лэйаута
import ResearchPageLayout from '../../../components/Layout/ResearchPageLayout'

const DockerPage: React.FC = () => {
  return (
    // Используем общий лэйаут для страниц документации
    <ResearchPageLayout title="Docker: Критический Анализ">
      <DockerIntro />
      <DockerDocs />
      <DockerConcepts />
      <DockerCritique />
      <DockerCodeExamples />
      <DockerTasks />
      <DockerResources />
    </ResearchPageLayout>
  )
}

export default DockerPage
