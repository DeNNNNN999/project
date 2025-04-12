import React from 'react';

const NodejswithexpressConcepts: React.FC = () => {
  return (
    <section id="concepts" className="p-6 border rounded-lg bg-slate-800/40 border-slate-700/50 mb-6">
      <h2 className="mb-4 text-2xl font-semibold text-indigo-400">Ключевые Концепции Node.js и Express</h2>
      
      <div className="text-gray-300">
        <h3 className="text-lg font-semibold text-sky-400 mt-4 mb-2">Архитектура Node.js</h3>
        <ul className="list-disc pl-6 mb-4">
          <li><strong className="text-violet-400">Событийный цикл (Event Loop)</strong> - сердце Node.js, обеспечивающее неблокирующий ввод/вывод</li>
          <li><strong className="text-violet-400">Однопоточность</strong> - один основной поток для выполнения кода</li>
          <li><strong className="text-violet-400">Асинхронное программирование</strong> - callbacks, Promises, async/await</li>
          <li><strong className="text-violet-400">CommonJS и ES Modules</strong> - системы модулей</li>
          <li><strong className="text-violet-400">Worker Threads</strong> - решение для CPU-интенсивных задач</li>
        </ul>
        
        <h3 className="text-lg font-semibold text-sky-400 mt-4 mb-2">Основы Express</h3>
        <ul className="list-disc pl-6 mb-4">
          <li><strong className="text-violet-400">Middleware</strong> - функции, обрабатывающие запросы по цепочке</li>
          <li><strong className="text-violet-400">Маршрутизация</strong> - определение обработчиков для разных путей и HTTP-методов</li>
          <li><strong className="text-violet-400">Router</strong> - модульная организация маршрутов</li>
          <li><strong className="text-violet-400">Шаблонизаторы</strong> - интеграция с различными шаблонизаторами (EJS, Pug, Handlebars)</li>
          <li><strong className="text-violet-400">Статические файлы</strong> - обслуживание статических ресурсов</li>
        </ul>
        
        <h3 className="text-lg font-semibold text-sky-400 mt-4 mb-2">Работа с данными</h3>
        <ul className="list-disc pl-6 mb-4">
          <li><strong className="text-violet-400">Body Parsing</strong> - обработка данных из тела запроса</li>
          <li><strong className="text-violet-400">Базы данных</strong> - интеграция с MongoDB, PostgreSQL, MySQL и др.</li>
          <li><strong className="text-violet-400">ORM/ODM</strong> - Sequelize, Prisma, Mongoose и другие абстракции БД</li>
          <li><strong className="text-violet-400">Валидация</strong> - Joi, express-validator и другие решения</li>
          <li><strong className="text-violet-400">Кэширование</strong> - использование Redis и других механизмов кэширования</li>
        </ul>
        
        <h3 className="text-lg font-semibold text-sky-400 mt-4 mb-2">Безопасность</h3>
        <ul className="list-disc pl-6 mb-4">
          <li><strong className="text-violet-400">Аутентификация</strong> - Passport.js, JWT, Sessions</li>
          <li><strong className="text-violet-400">Helmet</strong> - защита HTTP-заголовков</li>
          <li><strong className="text-violet-400">CORS</strong> - управление кросс-доменными запросами</li>
          <li><strong className="text-violet-400">Rate Limiting</strong> - ограничение частоты запросов</li>
          <li><strong className="text-violet-400">XSS, CSRF, SQL Injection</strong> - защита от основных атак</li>
        </ul>
        
        <h3 className="text-lg font-semibold text-sky-400 mt-4 mb-2">Архитектурные паттерны</h3>
        <ul className="list-disc pl-6 mb-4">
          <li><strong className="text-violet-400">MVC</strong> - Model-View-Controller паттерн</li>
          <li><strong className="text-violet-400">REST API</strong> - построение RESTful сервисов</li>
          <li><strong className="text-violet-400">Layered Architecture</strong> - разделение на слои (controllers, services, repositories)</li>
          <li><strong className="text-violet-400">Dependency Injection</strong> - внедрение зависимостей (с awilix, tsyringe и др.)</li>
          <li><strong className="text-violet-400">Microservices</strong> - построение микросервисной архитектуры</li>
        </ul>
      </div>
    </section>
  );
};

export default NodejswithexpressConcepts;