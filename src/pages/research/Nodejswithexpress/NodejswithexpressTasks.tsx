import React from 'react';

const NodejswithexpressTasks: React.FC = () => {
  return (
    <section id="tasks" className="p-6 border rounded-lg bg-slate-800/40 border-slate-700/50 mb-6">
      <h2 className="mb-4 text-2xl font-semibold text-indigo-400">Практические Задания</h2>
      
      <div className="text-gray-300">
        <p className="mb-4">
          Для закрепления теоретических знаний предлагаем выполнить следующие практические задания
          по Node.js и Express. Задания постепенно усложняются, охватывая различные аспекты
          серверной разработки.
        </p>
        
        <div className="space-y-6">
          <div className="p-4 border border-indigo-500/30 rounded-lg bg-indigo-500/5">
            <h3 className="text-lg font-medium text-indigo-400 mb-2">Задание 1: Базовый REST API</h3>
            <p className="mb-2">Создайте базовый REST API с Express для управления списком задач (Todo List):</p>
            <ul className="list-disc pl-6 mb-2">
              <li>Реализуйте CRUD-операции (Create, Read, Update, Delete) для задач</li>
              <li>Используйте Express Router для организации маршрутов</li>
              <li>Добавьте валидацию входных данных</li>
              <li>Реализуйте пагинацию и фильтрацию при получении списка задач</li>
              <li>Обеспечьте правильную обработку ошибок</li>
            </ul>
          </div>
          
          <div className="p-4 border border-indigo-500/30 rounded-lg bg-indigo-500/5">
            <h3 className="text-lg font-medium text-indigo-400 mb-2">Задание 2: Интеграция с базой данных</h3>
            <p className="mb-2">Расширьте предыдущее приложение, добавив интеграцию с базой данных:</p>
            <ul className="list-disc pl-6 mb-2">
              <li>Выберите и подключите базу данных (MongoDB или PostgreSQL)</li>
              <li>Добавьте ORM/ODM (Mongoose, Sequelize, Prisma или TypeORM)</li>
              <li>Реализуйте модели данных и репозитории</li>
              <li>Добавьте транзакции для операций, требующих атомарности</li>
              <li>Реализуйте связи между объектами (например, задачи принадлежат пользователям)</li>
            </ul>
          </div>
          
          <div className="p-4 border border-indigo-500/30 rounded-lg bg-indigo-500/5">
            <h3 className="text-lg font-medium text-indigo-400 mb-2">Задание 3: Аутентификация и авторизация</h3>
            <p className="mb-2">Добавьте систему аутентификации и авторизации:</p>
            <ul className="list-disc pl-6 mb-2">
              <li>Реализуйте регистрацию и вход пользователей</li>
              <li>Добавьте JWT-аутентификацию или сессии</li>
              <li>Реализуйте ролевую систему прав (обычные пользователи, админы)</li>
              <li>Защитите маршруты требованием аутентификации и авторизации</li>
              <li>Реализуйте восстановление пароля</li>
            </ul>
          </div>
          
          <div className="p-4 border border-indigo-500/30 rounded-lg bg-indigo-500/5">
            <h3 className="text-lg font-medium text-indigo-400 mb-2">Задание 4: Middleware и производительность</h3>
            <p className="mb-2">Улучшите приложение, добавив необходимые middleware и оптимизации:</p>
            <ul className="list-disc pl-6 mb-2">
              <li>Добавьте middleware для логгирования запросов</li>
              <li>Настройте CORS для работы с фронтендом</li>
              <li>Реализуйте rate limiting для API</li>
              <li>Добавьте кэширование часто запрашиваемых данных с Redis</li>
              <li>Реализуйте сжатие ответов для уменьшения объема передаваемых данных</li>
            </ul>
          </div>
          
          <div className="p-4 border border-indigo-500/30 rounded-lg bg-indigo-500/5">
            <h3 className="text-lg font-medium text-indigo-400 mb-2">Задание 5: Архитектурные улучшения</h3>
            <p className="mb-2">Реорганизуйте приложение в соответствии с архитектурными принципами:</p>
            <ul className="list-disc pl-6 mb-2">
              <li>Разделите приложение на слои (контроллеры, сервисы, репозитории)</li>
              <li>Добавьте внедрение зависимостей (DI) с awilix или tsyringe</li>
              <li>Реализуйте систему миграций для базы данных</li>
              <li>Добавьте типизацию с TypeScript</li>
              <li>Настройте тесты (unit, integration, e2e)</li>
            </ul>
          </div>
          
          <div className="p-4 border border-indigo-500/30 rounded-lg bg-indigo-500/5">
            <h3 className="text-lg font-medium text-indigo-400 mb-2">Задание 6: Масштабирование</h3>
            <p className="mb-2">Подготовьте приложение к масштабированию:</p>
            <ul className="list-disc pl-6 mb-2">
              <li>Реализуйте конфигурацию через переменные окружения</li>
              <li>Добавьте управление процессами с PM2 или настройку кластеризации</li>
              <li>Реализуйте фоновые задачи с использованием очередей (Bull или Agenda)</li>
              <li>Настройте мониторинг и логгирование</li>
              <li>Подготовьте Docker-композицию для запуска всех компонентов приложения</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NodejswithexpressTasks;