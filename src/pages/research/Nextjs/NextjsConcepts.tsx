import React from 'react';

const NextjsConcepts: React.FC = () => {
  return (
    <section id="concepts" className="p-6 border rounded-lg bg-slate-800/40 border-slate-700/50 mb-6">
      <h2 className="mb-4 text-2xl font-semibold text-indigo-400">Ключевые Концепции Next.js</h2>
      
      <div className="text-gray-300">
        <h3 className="text-lg font-semibold text-sky-400 mt-4 mb-2">Рендеринг в Next.js</h3>
        <p className="mb-3">
          Next.js поддерживает различные стратегии рендеринга:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li><strong className="text-violet-400">Server-Side Rendering (SSR)</strong> - генерация HTML на сервере при каждом запросе</li>
          <li><strong className="text-violet-400">Static Site Generation (SSG)</strong> - генерация HTML во время сборки</li>
          <li><strong className="text-violet-400">Incremental Static Regeneration (ISR)</strong> - регенерация статических страниц через определённые интервалы</li>
          <li><strong className="text-violet-400">Client-Side Rendering (CSR)</strong> - рендеринг на стороне клиента</li>
          <li><strong className="text-violet-400">Partial Rendering</strong> - смешанные подходы, включая Streaming SSR</li>
        </ul>
        
        <h3 className="text-lg font-semibold text-sky-400 mt-4 mb-2">Роутинг</h3>
        <p className="mb-3">
          Next.js предлагает два подхода к роутингу:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li><strong className="text-violet-400">Pages Router</strong> - классический файловый роутер, где файлы в директории pages соответствуют маршрутам</li>
          <li><strong className="text-violet-400">App Router</strong> - новый подход с директорией app, поддерживающий React Server Components, вложенные лэйауты, и серверные функции</li>
        </ul>
        
        <h3 className="text-lg font-semibold text-sky-400 mt-4 mb-2">Получение данных</h3>
        <p className="mb-3">
          В зависимости от роутера и типа рендеринга, данные можно получать различными способами:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li><strong className="text-violet-400">getServerSideProps</strong> - для SSR в Pages Router</li>
          <li><strong className="text-violet-400">getStaticProps</strong> - для SSG в Pages Router</li>
          <li><strong className="text-violet-400">getStaticPaths</strong> - для динамических маршрутов с SSG</li>
          <li><strong className="text-violet-400">Server Components</strong> - асинхронное получение данных прямо в серверных компонентах (App Router)</li>
          <li><strong className="text-violet-400">Fetch API с кэшированием</strong> - встроенное управление кэшем в App Router</li>
          <li><strong className="text-violet-400">SWR и React Query</strong> - клиентское получение данных с кэшированием</li>
        </ul>
        
        <h3 className="text-lg font-semibold text-sky-400 mt-4 mb-2">Серверные возможности</h3>
        <p className="mb-3">
          Next.js предоставляет интегрированные серверные функции:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li><strong className="text-violet-400">API Routes</strong> - создание API эндпоинтов прямо в Next.js приложении</li>
          <li><strong className="text-violet-400">Server Actions</strong> - выполнение функций на сервере из клиентских компонентов</li>
          <li><strong className="text-violet-400">Edge Runtime</strong> - выполнение кода ближе к пользователю на глобальной сети Edge</li>
          <li><strong className="text-violet-400">Middleware</strong> - перехват и модификация запросов перед рендерингом</li>
        </ul>
        
        <h3 className="text-lg font-semibold text-sky-400 mt-4 mb-2">Оптимизации</h3>
        <p className="mb-3">
          Next.js предлагает встроенные оптимизации для улучшения производительности:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li><strong className="text-violet-400">Image Optimization</strong> - автоматическая оптимизация изображений с компонентом next/image</li>
          <li><strong className="text-violet-400">Font Optimization</strong> - загрузка шрифтов с оптимальной производительностью</li>
          <li><strong className="text-violet-400">Script Optimization</strong> - управление загрузкой внешних скриптов</li>
          <li><strong className="text-violet-400">Code Splitting</strong> - автоматическое разделение кода по маршрутам</li>
          <li><strong className="text-violet-400">Prefetching</strong> - предварительная загрузка страниц для быстрого перехода</li>
        </ul>
      </div>
    </section>
  );
};

export default NextjsConcepts;