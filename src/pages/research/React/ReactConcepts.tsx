import React from 'react'

const ReactConcepts: React.FC = () => {
  return (
    <section id="concepts" className="p-6 border rounded-lg bg-slate-800/40 border-slate-700/50">
      <h2 className="mb-4 text-2xl font-semibold text-indigo-400">Основные Концепции</h2>
      <div className="prose text-gray-300 prose-invert max-w-none">
        <p>
          Разбор компонентов, хуков, состояния, жизненного цикла и других ключевых концепций React...
        </p>
      </div>
    </section>
  )
}

export default ReactConcepts