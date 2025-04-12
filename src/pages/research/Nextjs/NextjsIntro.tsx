import React from 'react';

const NextjsIntro: React.FC = () => {
  return (
    <section id="intro" className="p-6 border rounded-lg bg-slate-800/40 border-slate-700/50 mb-6">
      <h2 className="mb-4 text-2xl font-semibold text-indigo-400">Next.js: Введение</h2>
      
      <div className="mb-6 text-gray-300">
        <p className="mb-3">
          Next.js — это популярный React-фреймворк, который предоставляет структуру, 
          функции и оптимизации для создания веб-приложений. Позиционируется как "React фреймворк для продакшн", 
          Next.js решает многие сложные задачи, с которыми разработчики сталкиваются при создании приложений на React.
        </p>
        
        <p className="mb-3">
          Разработанный и поддерживаемый Vercel, этот фреймворк предлагает различные методы рендеринга, 
          встроенную систему маршрутизации, оптимизации производительности и многие другие функции, 
          значительно ускоряющие процесс разработки.
        </p>
        
        <p className="mb-3">
          В этом критическом исследовании мы рассмотрим Next.js с различных сторон:
        </p>
        
        <ul className="list-disc pl-6 mb-4 text-gray-300">
          <li>Взаимоотношение Next.js и React - симбиоз или конфликт парадигм?</li>
          <li>Различные подходы к рендерингу (SSR, SSG, ISR, CSR) и их компромиссы</li>
          <li>Эволюция роутинга: от Pages Router к App Router</li>
          <li>Революция Server Components и её влияние на архитектуру приложений</li>
          <li>Интеграция с бэкендом: API Routes и Server Actions</li>
          <li>Оптимизации и производительность Next.js приложений</li>
          <li>Экосистема Next.js и взаимодействие с Vercel</li>
        </ul>
      </div>
    </section>
  );
};

export default NextjsIntro;