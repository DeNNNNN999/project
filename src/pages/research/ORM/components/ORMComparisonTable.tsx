import React from 'react';
import MDXTable, { MDXThead, MDXTbody, MDXTr, MDXTh, MDXTd } from '../../../../components/MDX/MDXTable';

const ORMComparisonTable: React.FC = () => {
  return (
    <div className="my-8">
      <h3 className="text-xl font-bold mb-4 text-white">Итоговый Анализ Парадигм</h3>
      
      <MDXTable>
        <MDXThead>
          <MDXTr isHeader>
            <MDXTh>Парадигма</MDXTh>
            <MDXTh>Prisma</MDXTh>
            <MDXTh>Drizzle</MDXTh>
            <MDXTh>MikroORM</MDXTh>
            <MDXTh>Sequelize</MDXTh>
            <MDXTh>TypeORM</MDXTh>
          </MDXTr>
        </MDXThead>
        <MDXTbody>
          <MDXTr>
            <MDXTh>Основная Суть</MDXTh>
            <MDXTd>Type-Safe DB Client</MDXTd>
            <MDXTd>Type-Safe SQL QB</MDXTd>
            <MDXTd>Data Mapper ORM (UoW, Identity Map)</MDXTd>
            <MDXTd>Active Record ORM</MDXTd>
            <MDXTd>Hybrid (AR/DM/QB) ORM</MDXTd>
          </MDXTr>
          <MDXTr>
            <MDXTh>Управление Сост.</MDXTh>
            <MDXTd>Нет</MDXTd>
            <MDXTd>Нет</MDXTd>
            <MDXTd>Есть (UoW, Identity Map)</MDXTd>
            <MDXTd>Частично (через AR)</MDXTd>
            <MDXTd>Частично/Непоследовательно</MDXTd>
          </MDXTr>
          <MDXTr>
            <MDXTh>Схема</MDXTh>
            <MDXTd>Свой DSL (.prisma)</MDXTd>
            <MDXTd>TypeScript API</MDXTd>
            <MDXTd>TS Классы/Декораторы/Схема</MDXTd>
            <MDXTd>JS/TS Объекты</MDXTd>
            <MDXTd>TS Классы/Декораторы</MDXTd>
          </MDXTr>
          <MDXTr>
            <MDXTh>Типобезопасность</MDXTh>
            <MDXTd>Отличная (генерация)</MDXTd>
            <MDXTd>Отличная (интеграция с TS)</MDXTd>
            <MDXTd>Высокая (требует внимания)</MDXTd>
            <MDXTd>Частичная (требует доработок)</MDXTd>
            <MDXTd>Проблемная (типы часто "лгут")</MDXTd>
          </MDXTr>
          <MDXTr>
            <MDXTh>Близость к SQL</MDXTh>
            <MDXTd>Средняя (абстракция клиента)</MDXTd>
            <MDXTd>Максимальная</MDXTd>
            <MDXTd>Низкая (абстракция DM)</MDXTd>
            <MDXTd>Средняя (абстракция AR)</MDXTd>
            <MDXTd>Варьируется (ORM API vs QB)</MDXTd>
          </MDXTr>
          <MDXTr>
            <MDXTh>Порог Вхождения</MDXTh>
            <MDXTd>Средний</MDXTd>
            <MDXTd>Низкий (если знаешь SQL+TS)</MDXTd>
            <MDXTd>Высокий</MDXTd>
            <MDXTd>Низкий/Средний</MDXTd>
            <MDXTd>Средний/Высокий (из-за сложности)</MDXTd>
          </MDXTr>
        </MDXTbody>
      </MDXTable>
      
      <p className="text-gray-300 mt-4">
        Как видно, под вывеской "ORM" в JS/TS скрываются совершенно разные звери. Нет единого стандарта, как в Java (JPA/Hibernate) или .NET (Entity Framework). Это дает простор для инноваций (Prisma, Drizzle), но и вносит путаницу.
      </p>
    </div>
  );
};

export default ORMComparisonTable;
