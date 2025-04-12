import React from 'react';

const RedisIntro: React.FC = () => {
  return (
    <section id="intro" className="p-6 border rounded-lg bg-slate-800/40 border-slate-700/50 mb-6">
      <h2 className="mb-4 text-2xl font-semibold text-indigo-400">Redis: Введение</h2>
      
      <div className="mb-6 text-gray-300">
        <p className="mb-3">
          Redis (Remote Dictionary Server) - это высокопроизводительное хранилище данных в памяти, 
          которое можно использовать как базу данных, кэш, брокер сообщений и многое другое.
        </p>
        
        <p className="mb-3">
          В отличие от традиционных БД, Redis хранит все данные в RAM, что обеспечивает 
          исключительную скорость работы, но также накладывает определенные ограничения.
        </p>
        
        <p className="mb-3">
          В этом критическом исследовании мы рассмотрим Redis с разных сторон:
        </p>
        
        <ul className="list-disc pl-6 mb-4 text-gray-300">
          <li>Позиционирование Redis как базы данных vs кэша</li>
          <li>Основные структуры данных и их применение</li>
          <li>Особенности персистентности и масштабирования</li>
          <li>Интеграция Redis с Node.js приложениями</li>
          <li>Сильные и слабые стороны Redis в разных сценариях</li>
        </ul>
      </div>
    </section>
  );
};

export default RedisIntro;