import React from 'react';

const NextjsResources: React.FC = () => {
  return (
    <section id="resources" className="p-6 border rounded-lg bg-slate-800/40 border-slate-700/50 mb-6">
      <h2 className="mb-4 text-2xl font-semibold text-indigo-400">Ресурсы для Изучения Next.js</h2>
      
      <div className="text-gray-300">
        <h3 className="text-lg font-semibold text-sky-400 mt-4 mb-2">Официальная документация</h3>
        <ul className="list-disc pl-6 mb-4">
          <li>Next.js Documentation - подробная и хорошо структурированная документация</li>
          <li>Learn Next.js - интерактивный курс от разработчиков Next.js</li>
          <li>Next.js GitHub репозиторий - исходный код и примеры</li>
          <li>Vercel Blog - статьи о Next.js от компании-разработчика</li>
        </ul>
        
        <h3 className="text-lg font-semibold text-sky-400 mt-4 mb-2">Книги</h3>
        <ul className="list-disc pl-6 mb-4">
          <li>"Next.js in Action" - Adam Boduch</li>
          <li>"Real-World Next.js" - Michele Riva</li>
          <li>"Fullstack React with TypeScript" - включает разделы по Next.js</li>
          <li>"Professional Next.js" - Fernando Doglio</li>
        </ul>
        
        <h3 className="text-lg font-semibold text-sky-400 mt-4 mb-2">Курсы и обучающие ресурсы</h3>
        <ul className="list-disc pl-6 mb-4">
          <li><strong className="text-violet-400">Next.js & React</strong> - The Complete Guide (Maximilian Schwarzmüller)</li>
          <li><strong className="text-violet-400">Mastering Next.js</strong> - Курс от Lee Robinson (Vercel)</li>
          <li><strong className="text-violet-400">Build a Fullstack App with Next.js, Prisma, and PostgreSQL</strong> от Laith Harb</li>
          <li><strong className="text-violet-400">YouTube канал Vercel</strong> - официальные обучающие видео</li>
          <li><strong className="text-violet-400">LevelUpTuts</strong> - серия видео по Next.js</li>
        </ul>
        
        <h3 className="text-lg font-semibold text-sky-400 mt-4 mb-2">Стартеры и примеры проектов</h3>
        <ul className="list-disc pl-6 mb-4">
          <li><strong className="text-violet-400">Next.js Examples</strong> - официальная коллекция примеров от Vercel</li>
          <li><strong className="text-violet-400">create-t3-app</strong> - стартер с Next.js, TypeScript, Tailwind, tRPC, и Prisma</li>
          <li><strong className="text-violet-400">next-commerce</strong> - пример e-commerce приложения</li>
          <li><strong className="text-violet-400">next-auth-example</strong> - пример аутентификации с NextAuth.js</li>
          <li><strong className="text-violet-400">taxonomy</strong> - пример блога с MDX</li>
        </ul>
        
        <h3 className="text-lg font-semibold text-sky-400 mt-4 mb-2">Полезные библиотеки для Next.js</h3>
        <ul className="list-disc pl-6 mb-4">
          <li><strong className="text-violet-400">NextAuth.js</strong> - авторизация и аутентификация</li>
          <li><strong className="text-violet-400">SWR</strong> и <strong className="text-violet-400">React Query</strong> - управление состоянием и получение данных</li>
          <li><strong className="text-violet-400">next-i18next</strong> - интернационализация</li>
          <li><strong className="text-violet-400">next-seo</strong> - управление SEO</li>
          <li><strong className="text-violet-400">next-pwa</strong> - добавление Progressive Web App функциональности</li>
          <li><strong className="text-violet-400">next-mdx-remote</strong> - для работы с MDX</li>
        </ul>
        
        <h3 className="text-lg font-semibold text-sky-400 mt-4 mb-2">Сообщества и форумы</h3>
        <ul className="list-disc pl-6 mb-4">
          <li>Next.js Discord - официальный канал для обсуждений</li>
          <li>r/nextjs на Reddit - сообщество разработчиков</li>
          <li>DEV Community - статьи и обсуждения по Next.js</li>
          <li>Stack Overflow - вопросы и ответы по Next.js</li>
        </ul>
        
        <h3 className="text-lg font-semibold text-sky-400 mt-4 mb-2">Блоги и рассылки</h3>
        <ul className="list-disc pl-6 mb-4">
          <li>Josh W Comeau - блог с глубокими статьями о React и Next.js</li>
          <li>Lee Robinson's Blog - от руководителя DevRel в Vercel</li>
          <li>Next.js Weekly - еженедельная рассылка новостей и материалов</li>
          <li>Smashing Magazine - регулярные статьи о Next.js</li>
        </ul>
      </div>
    </section>
  );
};

export default NextjsResources;