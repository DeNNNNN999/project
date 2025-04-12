import React from 'react'

const JavaScriptResources: React.FC = () => {
  return (
    <section id="resources" className="p-6 border rounded-lg bg-slate-800/40 border-slate-700/50">
      <h2 className="mb-4 text-2xl font-semibold text-indigo-400">Ресурсы для Глубокого Погружения</h2>
      <ul className="space-y-2 text-gray-300 list-disc list-inside">
        {/*

        */}
        <li>
          <a
            href="https://developer.mozilla.org/ru/docs/Web/JavaScript"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline">
            MDN Web Docs (Русский)
          </a>{' '}
          - Фундаментальный ресурс.
        </li>
        <li>
          <a
            href="https://github.com/getify/You-Dont-Know-JS"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline">
            Серия книг "You Don't Know JS" (Kyle Simpson)
          </a>{' '}
          - Для глубокого понимания `this`, прототипов, асинхронности.
        </li>
        <li>
          <a
            href="https://exploringjs.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline">
            Exploring JS (Dr. Axel Rauschmayer)
          </a>{' '}
          - Детальные книги по современному JS.
        </li>


        <li>
          <a
            href="https://tc39.es/ecma262/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline">
            Спецификация ECMAScript
          </a>{' '}
          - Для самых хардкорных исследователей.
        </li>
        {/* ... другие ссылки ... */}
      </ul>
    </section>
  )
}

export default JavaScriptResources
