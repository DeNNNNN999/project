import React from 'react';

const NodejswithexpressResources: React.FC = () => {
  return (
    <section id="resources" className="p-6 border rounded-lg bg-slate-800/40 border-slate-700/50 mb-6">
      <h2 className="mb-4 text-2xl font-semibold text-indigo-400">Ресурсы для Изучения Node.js и Express</h2>
      
      <div className="text-gray-300">
        <h3 className="text-lg font-semibold text-sky-400 mt-4 mb-2">Официальная документация</h3>
        <ul className="list-disc pl-6 mb-4">
          <li>Node.js Documentation - подробная документация с API и руководствами</li>
          <li>Express.js Documentation - официальная документация фреймворка</li>
          <li>NPM Documentation - руководство по менеджеру пакетов Node.js</li>
          <li>TypeScript Documentation - для работы с типизированным JavaScript</li>
          <li>MongoDB, PostgreSQL и другие базы данных - документация для интеграции</li>
        </ul>
        
        <h3 className="text-lg font-semibold text-sky-400 mt-4 mb-2">Книги</h3>
        <ul className="list-disc pl-6 mb-4">
          <li>"Node.js Design Patterns" - Mario Casciaro, Luciano Mammino</li>
          <li>"Express in Action" - Evan Hahn</li>
          <li>"Node.js 8 the Right Way" - Jim Wilson</li>
          <li>"Web Development with Node and Express" - Ethan Brown</li>
          <li>"Practical Node.js: Building Real-World Scalable Web Apps" - Azat Mardan</li>
        </ul>
        
        <h3 className="text-lg font-semibold text-sky-400 mt-4 mb-2">Курсы и обучающие платформы</h3>
        <ul className="list-disc pl-6 mb-4">
          <li><strong className="text-violet-400">Udemy</strong> - множество курсов по Node.js и Express разной сложности</li>
          <li><strong className="text-violet-400">Pluralsight</strong> - качественные курсы для разных уровней подготовки</li>
          <li><strong className="text-violet-400">freeCodeCamp</strong> - бесплатные курсы по бэкенд-разработке</li>
          <li><strong className="text-violet-400">Node School</strong> - интерактивные уроки по Node.js</li>
          <li><strong className="text-violet-400">Wes Bos - Node.js</strong> - курс по разработке на Node.js</li>
        </ul>
        
        <h3 className="text-lg font-semibold text-sky-400 mt-4 mb-2">Полезные библиотеки и инструменты</h3>
        <ul className="list-disc pl-6 mb-4">
          <li><strong className="text-violet-400">Helmet</strong> - повышение безопасности Express-приложений</li>
          <li><strong className="text-violet-400">Passport</strong> - аутентификация для Node.js</li>
          <li><strong className="text-violet-400">Mongoose и Sequelize</strong> - ODM/ORM для MongoDB и SQL баз данных</li>
          <li><strong className="text-violet-400">Prisma</strong> - современная ORM с типобезопасностью</li>
          <li><strong className="text-violet-400">Winston и Morgan</strong> - логгирование</li>
          <li><strong className="text-violet-400">Bull</strong> - очереди заданий на Redis</li>
          <li><strong className="text-violet-400">Jest и Supertest</strong> - тестирование приложений</li>
          <li><strong className="text-violet-400">PM2</strong> - менеджер процессов для Node.js</li>
        </ul>
        
        <h3 className="text-lg font-semibold text-sky-400 mt-4 mb-2">Популярные стартеры и архитектурные шаблоны</h3>
        <ul className="list-disc pl-6 mb-4">
          <li><strong className="text-violet-400">Express Generator</strong> - официальный генератор приложений</li>
          <li><strong className="text-violet-400">TypeScript Express Starter</strong> - шаблон с TypeScript</li>
          <li><strong className="text-violet-400">Express Boilerplate</strong> - различные шаблоны для быстрого старта</li>
          <li><strong className="text-violet-400">Hackathon Starter</strong> - обширный стартер для Express приложений</li>
          <li><strong className="text-violet-400">Node Best Practices</strong> - репозиторий с лучшими практиками</li>
        </ul>
        
        <h3 className="text-lg font-semibold text-sky-400 mt-4 mb-2">Сообщества и форумы</h3>
        <ul className="list-disc pl-6 mb-4">
          <li>Stack Overflow - тэги [node.js], [express]</li>
          <li>Reddit - r/node, r/javascript, r/webdev</li>
          <li>Discord серверы - NodeJS, JavaScript</li>
          <li>GitHub Discussions - для конкретных библиотек и проектов</li>
          <li>DEV Community - статьи и обсуждения по Node.js/Express</li>
        </ul>
        
        <h3 className="text-lg font-semibold text-sky-400 mt-4 mb-2">Блоги и новостные ресурсы</h3>
        <ul className="list-disc pl-6 mb-4">
          <li>Node.js Weekly - еженедельная рассылка новостей</li>
          <li>Node.js Blog - официальный блог Node.js</li>
          <li>LogRocket Blog - статьи о Node.js, Express и связанных технологиях</li>
          <li>NodeSource Blog - технические статьи о Node.js</li>
          <li>Medium - колонки разработчиков Node.js и Express</li>
        </ul>
      </div>
    </section>
  );
};

export default NodejswithexpressResources;