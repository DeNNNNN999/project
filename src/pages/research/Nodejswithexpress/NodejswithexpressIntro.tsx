import React from 'react';

const NodejswithexpressIntro: React.FC = () => {
  return (
    <section id="intro" className="p-6 border rounded-lg bg-slate-800/40 border-slate-700/50 mb-6">
      <h2 className="mb-4 text-2xl font-semibold text-indigo-400">Node.js с Express: Введение</h2>
      
      <div className="mb-6 text-gray-300">
        <p className="mb-3">
          Node.js — это среда выполнения JavaScript на стороне сервера, построенная на движке V8 от Google.
          Express — это минималистичный и гибкий веб-фреймворк для Node.js, который предоставляет набор 
          функций для разработки веб-приложений и API.
        </p>
        
        <p className="mb-3">
          Вместе они образуют мощный дуэт, который стал одним из самых популярных стеков для разработки 
          серверной части веб-приложений, особенно в JavaScript-ориентированных командах.
        </p>
        
        <p className="mb-3">
          В этом критическом исследовании мы рассмотрим Node.js и Express с различных сторон:
        </p>
        
        <ul className="list-disc pl-6 mb-4 text-gray-300">
          <li>Архитектурные особенности и ограничения однопоточной модели Node.js</li>
          <li>Преимущества и недостатки событийно-ориентированной асинхронной парадигмы</li>
          <li>Минимализм Express и его влияние на структуру проектов</li>
          <li>Управление middleware и маршрутизацией в Express</li>
          <li>Производительность и масштабируемость Node.js/Express приложений</li>
          <li>Сравнение с альтернативными подходами и фреймворками</li>
          <li>Типизация серверного JavaScript с использованием TypeScript</li>
        </ul>
      </div>
    </section>
  );
};

export default NodejswithexpressIntro;