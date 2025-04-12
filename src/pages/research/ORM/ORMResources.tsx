import React from 'react';

const ORMResources: React.FC = () => {
  return (
    <section id="resources" className="p-6 border rounded-lg bg-slate-800/40 border-slate-700/50 mb-6">
      <h2 className="mb-4 text-2xl font-semibold text-indigo-400">Ресурсы для Изучения ORM</h2>
      
      <div className="text-gray-300">
        <h3 className="text-lg font-semibold text-sky-400 mt-4 mb-2">Документация ORM-библиотек</h3>
        <ul className="list-disc pl-6 mb-4">
          <li><strong className="text-violet-400">Prisma</strong> - Официальная документация с подробными руководствами и примерами</li>
          <li><strong className="text-violet-400">TypeORM</strong> - Документация с объяснением концепций и API</li>
          <li><strong className="text-violet-400">MikroORM</strong> - Документация с акцентом на DDD и паттерны</li>
          <li><strong className="text-violet-400">Sequelize</strong> - Документация с руководствами и справочниками</li>
          <li><strong className="text-violet-400">Drizzle ORM</strong> - Документация с примерами использования</li>
        </ul>
        
        <h3 className="text-lg font-semibold text-sky-400 mt-4 mb-2">Концептуальные ресурсы</h3>
        <ul className="list-disc pl-6 mb-4">
          <li>"Patterns of Enterprise Application Architecture" - Martin Fowler (описывает основные паттерны ORM)</li>
          <li>"Domain-Driven Design" - Eric Evans (концепции, важные для понимания Data Mapper ORM)</li>
          <li>"SQL и реляционная теория" - C.J. Date (для понимания фундаментальных принципов реляционных БД)</li>
          <li>"Object-Relational Impedance Mismatch" - статьи, описывающие фундаментальную проблему ORM</li>
        </ul>
        
        <h3 className="text-lg font-semibold text-sky-400 mt-4 mb-2">Курсы и обучающие материалы</h3>
        <ul className="list-disc pl-6 mb-4">
          <li><strong className="text-violet-400">Prisma Course</strong> - Подробный курс по работе с Prisma</li>
          <li><strong className="text-violet-400">TypeORM Zero to Hero</strong> - Практический курс по TypeORM</li>
          <li><strong className="text-violet-400">Full Stack Open</strong> - Включает разделы по работе с ORM</li>
          <li><strong className="text-violet-400">NestJS с TypeORM</strong> - Курсы по использованию TypeORM в NestJS</li>
          <li><strong className="text-violet-400">Database Design Fundamentals</strong> - Основы проектирования баз данных</li>
        </ul>
        
        <h3 className="text-lg font-semibold text-sky-400 mt-4 mb-2">Примеры проектов и стартеры</h3>
        <ul className="list-disc pl-6 mb-4">
          <li><strong className="text-violet-400">Prisma Examples</strong> - Официальный репозиторий с примерами Prisma</li>
          <li><strong className="text-violet-400">TypeORM Sample</strong> - Примеры использования TypeORM в различных сценариях</li>
          <li><strong className="text-violet-400">MikroORM Examples</strong> - Официальные примеры MikroORM</li>
          <li><strong className="text-violet-400">Drizzle Example Projects</strong> - Примеры использования Drizzle ORM</li>
          <li><strong className="text-violet-400">T3 Stack</strong> - Включает Prisma как часть полного стека</li>
        </ul>
        
        <h3 className="text-lg font-semibold text-sky-400 mt-4 mb-2">Статьи и блоги</h3>
        <ul className="list-disc pl-6 mb-4">
          <li>"Choosing the Right ORM for Your TypeScript Project" - Сравнение различных ORM</li>
          <li>"The N+1 Problem in ORM and How to Solve It" - Анализ распространенной проблемы</li>
          <li>"TypeORM vs Prisma vs MikroORM" - Детальное сравнение</li>
          <li>"When to Use Raw SQL vs ORM" - Руководство по принятию решений</li>
          <li>"Scaling with ORM: Lessons Learned" - Опыт использования ORM в высоконагруженных системах</li>
        </ul>
        
        <h3 className="text-lg font-semibold text-sky-400 mt-4 mb-2">Инструменты и экосистема</h3>
        <ul className="list-disc pl-6 mb-4">
          <li><strong className="text-violet-400">Prisma Studio</strong> - Визуальный редактор для работы с базой данных через Prisma</li>
          <li><strong className="text-violet-400">TypeORM CLI</strong> - Инструменты командной строки для TypeORM</li>
          <li><strong className="text-violet-400">DB Visualizer</strong> - Инструменты для визуализации схемы БД</li>
          <li><strong className="text-violet-400">DrizzleKit</strong> - Инструменты для миграций и работы с Drizzle</li>
          <li><strong className="text-violet-400">MikroORM CLI</strong> - Инструменты для миграций и управления схемой</li>
        </ul>
        
        <h3 className="text-lg font-semibold text-sky-400 mt-4 mb-2">Сообщества</h3>
        <ul className="list-disc pl-6 mb-4">
          <li>Prisma Slack Community - Активное сообщество пользователей Prisma</li>
          <li>TypeORM GitHub Discussions - Обсуждения и вопросы по TypeORM</li>
          <li>Drizzle ORM Discord - Сообщество Drizzle</li>
          <li>Stack Overflow - Многочисленные вопросы и ответы по ORM</li>
          <li>Reddit r/node, r/typescript - Обсуждения ORM в контексте Node.js/TypeScript</li>
        </ul>
      </div>
    </section>
  );
};

export default ORMResources;