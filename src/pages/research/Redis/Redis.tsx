import React from 'react'

// Импортируем компоненты секций
import RedisIntro from './RedisIntro'
import RedisJSDoc from './RedisJSDoc'
import RedisConcepts from './RedisConcepts'
import RedisCritique from './RedisCritique'
import RedisCodeExamples from './RedisCodeExamples'
import RedisTasks from './RedisTasks'
import RedisResources from './RedisResources'

// Импортируем общий компонент лэйаута
import ResearchPageLayout from '../../../components/Layout/ResearchPageLayout'

const RedisPage: React.FC = () => {
  return (
    // Используем общий лэйаут для страниц документации
    <ResearchPageLayout title="Redis: Критический Анализ">
      <RedisIntro />
      <RedisJSDoc />
      <RedisConcepts />
      <RedisCritique />
      <RedisCodeExamples />
      <RedisTasks />
      <RedisResources />
    </ResearchPageLayout>
  )
}

export default RedisPage
