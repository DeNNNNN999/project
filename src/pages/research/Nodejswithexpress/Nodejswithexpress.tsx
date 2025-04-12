import React from 'react'

// Импортируем компоненты секций
import NodejswithexpressIntro from './NodejswithexpressIntro'
import NodejswithexpressJSDoc from './NodejswithexpressJSDoc'
import NodejswithexpressConcepts from './NodejswithexpressConcepts'
import NodejswithexpressCritique from './NodejswithexpressCritique'
import NodejswithexpressCodeExamples from './NodejswithexpressCodeExamples'
import NodejswithexpressTasks from './NodejswithexpressTasks'
import NodejswithexpressResources from './NodejswithexpressResources'

// Импортируем общий компонент лэйаута
import ResearchPageLayout from '../../../components/Layout/ResearchPageLayout'

const NodejswithexpressPage: React.FC = () => {
  return (
    // Используем общий лэйаут для страниц документации
    <ResearchPageLayout title="Node.js с Express: Критический Анализ">
      <NodejswithexpressIntro />
      <NodejswithexpressJSDoc />
      <NodejswithexpressConcepts />
      <NodejswithexpressCritique />
      <NodejswithexpressCodeExamples />
      <NodejswithexpressTasks />
      <NodejswithexpressResources />
    </ResearchPageLayout>
  )
}

export default NodejswithexpressPage
