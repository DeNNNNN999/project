import React from 'react';

const ORMIntro: React.FC = () => {
  return (
    <section id="intro" className="p-6 border rounded-lg bg-slate-800/40 border-slate-700/50 mb-6">
      <h2 className="mb-4 text-2xl font-semibold text-indigo-400">ORM: Введение</h2>
      
      <div className="mb-6 text-gray-300">
        <p className="mb-3">
          ORM (Object-Relational Mapping) - это техника программирования, которая позволяет разработчикам
          взаимодействовать с реляционными базами данных, используя объектно-ориентированный подход.
          В экосистеме JavaScript/TypeScript термин "ORM" охватывает широкий спектр инструментов с 
          различной философией и функциональностью.
        </p>
        
        <p className="mb-3">
          От полноценных ORM с управлением состоянием (MikroORM) до типобезопасных генераторов запросов (Drizzle, Prisma),
          мир JS/TS предлагает множество подходов к проблеме объектно-реляционного несоответствия, каждый 
          со своими компромиссами и преимуществами.
        </p>
        
        <p className="mb-3">
          В этом критическом исследовании мы рассмотрим:
        </p>
        
        <ul className="list-disc pl-6 mb-4 text-gray-300">
          <li>Что такое "настоящая" ORM и какие паттерны она реализует</li>
          <li>Различия между классическими ORM, Active Record и Query Builder подходами</li>
          <li>Критический анализ популярных инструментов: Prisma, Drizzle, TypeORM, Sequelize, MikroORM</li>
          <li>Типобезопасность и компромиссы в современных решениях</li>
          <li>Производительность и архитектурные последствия выбора ORM</li>
          <li>Рекомендации по выбору подходящего инструмента для разных сценариев</li>
        </ul>
      </div>
    </section>
  );
};

export default ORMIntro;