import React from 'react'

const TypeScriptCritique: React.FC = () => {
  return (
    <section id="critique" className="p-6 border rounded-lg bg-slate-800/40 border-red-900/30">
      <h2 className="mb-4 text-2xl font-semibold text-red-400">Критический Анализ и Противоречия TypeScript</h2>
      <div className="prose text-gray-300 prose-invert max-w-none">
        <p>
          Критический взгляд на TypeScript, его ограничения, противоречия и компромиссы...
        </p>
      </div>
    </section>
  )
}

export default TypeScriptCritique