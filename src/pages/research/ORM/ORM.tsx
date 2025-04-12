import React from 'react'

// Импортируем компоненты секций
import ORMIntro from './ORMIntro'
import ORMJSDoc from './ORMJSDoc'
import ORMConcepts from './ORMConcepts'
import ORMCritique from './ORMCritique'
import ORMCodeExamples from './ORMCodeExamples'
import ORMTasks from './ORMTasks'
import ORMResources from './ORMResources'
import ORMComparisonTable from './components/ORMComparisonTable'

// Импортируем общий компонент лэйаута
import ResearchPageLayout from '../../../components/Layout/ResearchPageLayout'

// Импортируем MDX компоненты
import MDXComponents from '../../../components/MDX/MDXComponents'

const ORMPage: React.FC = () => {
  return (
    // Используем общий лэйаут для страниц документации
    <ResearchPageLayout title="ORM: Критический Анализ">
      <MDXComponents>
        <ORMIntro />
        <ORMJSDoc />
        <ORMConcepts />
        <ORMCritique />
        <ORMComparisonTable />
        <ORMCodeExamples />
        <ORMTasks />
        <ORMResources />
      </MDXComponents>
    </ResearchPageLayout>
  )
}

export default ORMPage
