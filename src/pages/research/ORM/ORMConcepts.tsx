import React from 'react';

const ORMConcepts: React.FC = () => {
  return (
    <section id="concepts" className="p-6 border rounded-lg bg-slate-800/40 border-slate-700/50 mb-6">
      <h2 className="mb-4 text-2xl font-semibold text-indigo-400">Ключевые Концепции ORM</h2>
      
      <div className="text-gray-300">
        <h3 className="text-lg font-semibold text-sky-400 mt-4 mb-2">Основные Паттерны ORM</h3>
        <p className="mb-3">
          Классические ORM реализуют несколько ключевых паттернов проектирования:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li><strong className="text-violet-400">Identity Map</strong> - гарантирует, что для одной строки из БД существует только один объект в памяти</li>
          <li><strong className="text-violet-400">Unit of Work</strong> - отслеживает изменения в объектах и синхронизирует их с БД</li>
          <li><strong className="text-violet-400">Repository</strong> - абстрагирует доступ к данным через интерфейс коллекции</li>
          <li><strong className="text-violet-400">Data Mapper</strong> - отделяет объекты домена от логики доступа к БД</li>
          <li><strong className="text-violet-400">Active Record</strong> - объекты сами содержат методы для работы с БД</li>
        </ul>
        
        <h3 className="text-lg font-semibold text-sky-400 mt-4 mb-2">Data Mapper vs Active Record</h3>
        <p className="mb-3">
          Два основных архитектурных подхода в ORM:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="p-4 border border-blue-500/30 rounded-lg bg-blue-500/5">
            <h4 className="font-semibold text-blue-400 mb-2">Data Mapper</h4>
            <p className="mb-2">Отделяет доменные объекты от логики БД через отдельный слой маппинга.</p>
            <p><strong>Примеры:</strong> MikroORM, TypeORM (с репозиториями)</p>
            <p className="mt-2"><strong>Плюсы:</strong> Чистая доменная модель, лучше для DDD</p>
            <p><strong>Минусы:</strong> Больше кода, выше порог вхождения</p>
          </div>
          
          <div className="p-4 border border-green-500/30 rounded-lg bg-green-500/5">
            <h4 className="font-semibold text-green-400 mb-2">Active Record</h4>
            <p className="mb-2">Модели содержат методы для взаимодействия с БД (save(), delete()).</p>
            <p><strong>Примеры:</strong> Sequelize, TypeORM (без репозиториев)</p>
            <p className="mt-2"><strong>Плюсы:</strong> Простота и скорость разработки</p>
            <p><strong>Минусы:</strong> Смешение ответственностей, сложнее тестировать</p>
          </div>
        </div>
        
        <h3 className="text-lg font-semibold text-sky-400 mt-4 mb-2">Типы ORM в JavaScript/TypeScript</h3>
        <p className="mb-3">
          В экосистеме JS/TS существует несколько подходов к ORM:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li><strong className="text-violet-400">Классические ORM</strong> - полная реализация паттернов Identity Map и Unit of Work (MikroORM)</li>
          <li><strong className="text-violet-400">Active Record ORM</strong> - смешение модели и доступа к БД (Sequelize)</li>
          <li><strong className="text-violet-400">Query Builders с маппингом</strong> - типобезопасные билдеры запросов (Prisma, Drizzle)</li>
          <li><strong className="text-violet-400">Гибридные решения</strong> - поддержка нескольких подходов (TypeORM)</li>
        </ul>
        
        <h3 className="text-lg font-semibold text-sky-400 mt-4 mb-2">Отношения и связи</h3>
        <p className="mb-3">
          ORM обычно поддерживают различные типы отношений между сущностями:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li><strong className="text-violet-400">One-to-One</strong> - один к одному (пользователь и профиль)</li>
          <li><strong className="text-violet-400">One-to-Many</strong> - один ко многим (пользователь и посты)</li>
          <li><strong className="text-violet-400">Many-to-Many</strong> - многие ко многим (посты и теги)</li>
          <li><strong className="text-violet-400">Eager Loading</strong> - загрузка связанных данных вместе с основными</li>
          <li><strong className="text-violet-400">Lazy Loading</strong> - загрузка связанных данных по требованию</li>
        </ul>
        
        <h3 className="text-lg font-semibold text-sky-400 mt-4 mb-2">Схемы и миграции</h3>
        <p className="mb-3">
          Управление структурой базы данных через ORM:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li><strong className="text-violet-400">Schema-First</strong> - определение схемы отдельно от кода (Prisma)</li>
          <li><strong className="text-violet-400">Code-First</strong> - генерация схемы из кода (TypeORM, MikroORM)</li>
          <li><strong className="text-violet-400">Миграции</strong> - управление изменениями схемы БД</li>
          <li><strong className="text-violet-400">Автоматическая синхронизация</strong> - автоматическое обновление схемы</li>
        </ul>
      </div>
    </section>
  );
};

export default ORMConcepts;