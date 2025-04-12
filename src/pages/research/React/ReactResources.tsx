import React from 'react'

const ReactResources: React.FC = () => {
  return (
    <section id="resources" className="p-6 border rounded-lg bg-slate-800/40 border-slate-700/50">
      <h2 className="mb-4 text-2xl font-semibold text-indigo-400">Ресурсы и Материалы</h2>
      <div className="prose text-gray-300 prose-invert max-w-none">
        <p>
          Полезные ресурсы для изучения React и справочная информация...
        </p>
      </div>
    </section>
  )
}

export default ReactResources