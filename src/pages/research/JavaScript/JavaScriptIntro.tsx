import React from 'react'

const JavaScriptIntro: React.FC = () => {
  return (
    <section id="intro" className="p-6 border rounded-lg bg-slate-800/40 border-slate-700/50">
      <h2 className="mb-4 text-2xl font-semibold text-indigo-400">Введение в JavaScript</h2>
      <div className="prose text-gray-300 prose-invert max-w-none">
        {' '}
        {/* Стили для текста */}
        {/* Здесь будет твой текст:
          - Краткая история JS (можно упомянуть 10 дней и маркетинг с Java).
          - Основное назначение языка (как задумывалось и как используется сейчас).
          - Его роль в современной веб-разработке.
        */}
        <p>Общая информация о языке, его месте в мире и краткая история...</p>
        <p>...</p>
      </div>
    </section>
  )
}

export default JavaScriptIntro
