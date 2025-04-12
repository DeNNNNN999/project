import React from 'react'

// Импортируем компоненты секций
import NextjsIntro from './NextjsIntro'
import NextjsJSDoc from './NextjsJSDoc'
import NextjsConcepts from './NextjsConcepts'
import NextjsCritique from './NextjsCritique'
import NextjsCodeExamples from './NextjsCodeExamples'
import NextjsTasks from './NextjsTasks'
import NextjsResources from './NextjsResources'

// Импортируем общий компонент лэйаута
import ResearchPageLayout from '../../../components/Layout/ResearchPageLayout'

const NextjsPage: React.FC = () => {
  return (
    // Используем общий лэйаут для страниц документации
    <ResearchPageLayout title="Next.js: Критический Анализ">
      <NextjsIntro />
      <NextjsJSDoc />
      <NextjsConcepts />
      <NextjsCritique />
      <NextjsCodeExamples />
      <NextjsTasks />
      <NextjsResources />
    </ResearchPageLayout>
  )
}

export default NextjsPage
