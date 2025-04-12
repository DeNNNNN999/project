import React from 'react'

const TypeScriptIntro: React.FC = () => {
  return (
    <section id="intro" className="p-6 border rounded-lg bg-slate-800/40 border-slate-700/50">
      <h2 className="mb-4 text-2xl font-semibold text-indigo-400">Введение в TypeScript</h2>
      <div className="prose text-gray-300 prose-invert max-w-none">
        <p>
          Общая информация о TypeScript, его месте в мире и краткая история...
        </p>
      </div>
    </section>
  )
}

export default TypeScriptIntro