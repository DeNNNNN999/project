import React from 'react';

const ORMCritique: React.FC = () => {
  return (
    <section id="critique" className="p-6 border rounded-lg bg-slate-800/40 border-slate-700/50 mb-6">
      <h2 className="mb-4 text-2xl font-semibold text-indigo-400">Критический Взгляд на ORM</h2>
      
      <div className="text-gray-300">
        <h3 className="text-lg font-semibold text-sky-400 mt-4 mb-2">Объектно-реляционное несоответствие</h3>
        <p className="mb-3">
          Фундаментальная проблема всех ORM — попытка объединить две разные парадигмы: объектно-ориентированную
          и реляционную. Этот "импедансный несоответствие" создает концептуальные сложности, которые не могут
          быть полностью решены любым ORM-инструментом. Иерархическая природа объектов часто противоречит
          табличной структуре реляционных БД, что приводит к компромиссам в дизайне и производительности.
        </p>
        
        <h3 className="text-lg font-semibold text-sky-400 mt-4 mb-2">Типобезопасность vs Гибкость</h3>
        <p className="mb-3">
          Современные ORM для TypeScript стремятся обеспечить максимальную типобезопасность, но часто за счет гибкости.
          Prisma обеспечивает лучшую типизацию, но жестко ограничивает динамические запросы. TypeORM пытается быть
          более гибким, но типизация может "лгать" в сложных случаях. Drizzle находит компромисс, но усложняет определение 
          схемы. Разработчики вынуждены выбирать между строгой, но ограниченной типизацией и гибкостью с потенциальными
          ошибками времени выполнения.
        </p>
        
        <h3 className="text-lg font-semibold text-sky-400 mt-4 mb-2">Производительность и N+1 проблема</h3>
        <p className="mb-3">
          ORM могут генерировать неоптимальные SQL-запросы, особенно при работе со связями. Классическая проблема N+1
          (один запрос на список объектов и N дополнительных запросов для связанных данных) часто требует явной
          оптимизации. Хотя современные ORM предлагают eager loading и другие способы решения, это требует от
          разработчика понимания внутреннего устройства ORM и SQL, что противоречит идее абстрагирования от деталей БД.
        </p>
        
        <h3 className="text-lg font-semibold text-sky-400 mt-4 mb-2">Сложность абстракций и "магия"</h3>
        <p className="mb-3">
          ORM часто вводят сложные абстракции, которые действуют как "черные ящики" для разработчиков.
          Когда все работает, это удобно, но когда возникают проблемы, отладка может стать кошмаром. 
          "Магические" свойства и поведение (особенно с ленивой загрузкой и отслеживанием изменений)
          требуют глубокого понимания внутренней работы ORM, что нивелирует преимущество абстракции.
        </p>
        
        <h3 className="text-lg font-semibold text-sky-400 mt-4 mb-2">Смешение концепций в экосистеме JS/TS</h3>
        <p className="mb-3">
          В экосистеме JavaScript/TypeScript термин "ORM" используется для обозначения совершенно разных инструментов —
          от полноценных ORM (MikroORM) до типобезопасных генераторов запросов (Drizzle, Prisma). Это создает
          путаницу и неправильные ожидания. Разработчики, знакомые с ORM из других языков (Hibernate, Entity Framework),
          могут быть разочарованы отсутствием привычных функций или удивлены разными архитектурными подходами.
        </p>
        
        <h3 className="text-lg font-semibold text-sky-400 mt-4 mb-2">Конкретные инструменты: критические недостатки</h3>
        <div className="space-y-4 mb-4">
          <div className="p-3 border border-red-500/30 rounded-lg bg-red-500/5">
            <h4 className="font-semibold text-red-400 mb-1">Prisma</h4>
            <ul className="list-disc pl-6">
              <li>Собственный язык схемы (DSL) вместо TypeScript</li>
              <li>Отсутствие Unit of Work и Identity Map</li>
              <li>Ограниченные возможности для сложных запросов</li>
              <li>Полная регенерация клиента при изменении схемы</li>
            </ul>
          </div>
          
          <div className="p-3 border border-red-500/30 rounded-lg bg-red-500/5">
            <h4 className="font-semibold text-red-400 mb-1">TypeORM</h4>
            <ul className="list-disc pl-6">
              <li>Непоследовательная архитектура (смешение AR и DM)</li>
              <li>Проблемы с реальной типобезопасностью</li>
              <li>Баги и медленное развитие</li>
              <li>Отсутствие строгой реализации UoW и Identity Map</li>
            </ul>
          </div>
          
          <div className="p-3 border border-red-500/30 rounded-lg bg-red-500/5">
            <h4 className="font-semibold text-red-400 mb-1">Sequelize</h4>
            <ul className="list-disc pl-6">
              <li>Устаревший подход к TypeScript-интеграции</li>
              <li>Ограниченные возможности для сложных запросов</li>
              <li>Исторический багаж и неоптимальные паттерны</li>
            </ul>
          </div>
          
          <div className="p-3 border border-red-500/30 rounded-lg bg-red-500/5">
            <h4 className="font-semibold text-red-400 mb-1">Drizzle</h4>
            <ul className="list-disc pl-6">
              <li>Не ORM в традиционном смысле</li>
              <li>Отсутствие управления состоянием объектов</li>
              <li>Меньше абстракций от SQL</li>
            </ul>
          </div>
          
          <div className="p-3 border border-red-500/30 rounded-lg bg-red-500/5">
            <h4 className="font-semibold text-red-400 mb-1">MikroORM</h4>
            <ul className="list-disc pl-6">
              <li>Высокий порог вхождения</li>
              <li>Сложнее масштабировать для очень высоких нагрузок</li>
              <li>Требует глубокого понимания паттернов Domain-Driven Design</li>
            </ul>
          </div>
        </div>
        
        <h3 className="text-lg font-semibold text-sky-400 mt-4 mb-2">Заключение</h3>
        <p className="mb-3">
          Выбор ORM в JavaScript/TypeScript — это не столько технический, сколько архитектурный выбор.
          Нет "лучшего" инструмента, есть инструмент, подходящий для конкретных требований проекта, опыта
          команды и архитектурной философии. Понимание фундаментальных компромиссов и ограничений каждого
          подхода критически важно для принятия взвешенных решений и избегания разочарований в процессе разработки.
        </p>
      </div>
    </section>
  );
};

export default ORMCritique;