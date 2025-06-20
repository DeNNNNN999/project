import React, { ReactNode } from 'react'
import PageWrapper from './PageWrapper'

interface ResearchPageLayoutProps {
  title: string
  children: ReactNode
}

const ResearchPageLayout: React.FC<ResearchPageLayoutProps> = ({ title, children }) => {
  return (
    <PageWrapper>
      <div className="container px-4 py-8 mx-auto text-white bg-slate-900">
      {' '}
      {/* Примерные стили Tailwind */}
      <h1 className="mb-6 text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400">
        {title}
      </h1>
      <div className="space-y-8">
        {' '}
        {/* Добавляем отступы между секциями */}
        {children}
      </div>
      </div>
    </PageWrapper>
  )
}

export default ResearchPageLayout
