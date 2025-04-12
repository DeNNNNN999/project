import React from 'react';

const RedisTasks: React.FC = () => {
  return (
    <section id="tasks" className="p-6 border rounded-lg bg-slate-800/40 border-slate-700/50 mb-6">
      <h2 className="mb-4 text-2xl font-semibold text-indigo-400">Практические Задания</h2>
      
      <div className="text-gray-300">
        <p className="mb-4">
          Для закрепления теоретических знаний предлагаем выполнить следующие практические задания.
          Они постепенно усложняются и охватывают различные аспекты работы с Redis.
        </p>
        
        <div className="space-y-6">
          <div className="p-4 border border-indigo-500/30 rounded-lg bg-indigo-500/5">
            <h3 className="text-lg font-medium text-indigo-400 mb-2">Задание 1: Базовые операции</h3>
            <p className="mb-2">Установите Redis локально и реализуйте простое API для управления пользователями с использованием Node.js и ioredis:</p>
            <ul className="list-disc pl-6 mb-2">
              <li>Создание пользователя (сохранение в хэш-структуре)</li>
              <li>Получение данных пользователя</li>
              <li>Обновление данных пользователя</li>
              <li>Удаление пользователя</li>
              <li>Настройка истечения срока жизни записи</li>
            </ul>
          </div>
          
          <div className="p-4 border border-indigo-500/30 rounded-lg bg-indigo-500/5">
            <h3 className="text-lg font-medium text-indigo-400 mb-2">Задание 2: Сессии и кэширование</h3>
            <p className="mb-2">Реализуйте в Express-приложении:</p>
            <ul className="list-disc pl-6 mb-2">
              <li>Систему хранения сессий в Redis</li>
              <li>Кэширование результатов запросов к внешнему API с настраиваемым TTL</li>
              <li>Механизм инвалидации кэша при обновлении данных</li>
            </ul>
          </div>
          
          <div className="p-4 border border-indigo-500/30 rounded-lg bg-indigo-500/5">
            <h3 className="text-lg font-medium text-indigo-400 mb-2">Задание 3: Работа со сложными структурами</h3>
            <p className="mb-2">Создайте систему для социальной сети, реализующую:</p>
            <ul className="list-disc pl-6 mb-2">
              <li>Хранение постов пользователей (с использованием хэшей)</li>
              <li>Ленту активности (с использованием списков или Streams)</li>
              <li>Счетчики лайков и просмотров (с использованием встроенных инкрементов)</li>
              <li>Сервис рейтинга популярности постов (с использованием Sorted Sets)</li>
            </ul>
          </div>
          
          <div className="p-4 border border-indigo-500/30 rounded-lg bg-indigo-500/5">
            <h3 className="text-lg font-medium text-indigo-400 mb-2">Задание 4: Rate Limiting и блокировки</h3>
            <p className="mb-2">Реализуйте следующие механизмы защиты API:</p>
            <ul className="list-disc pl-6 mb-2">
              <li>Ограничение числа запросов (Rate Limiting) на базе Redis</li>
              <li>Распределенные блокировки для критических секций кода</li>
              <li>Защиту от брутфорс-атак (блокировка IP после серии неудачных попыток)</li>
            </ul>
          </div>
          
          <div className="p-4 border border-indigo-500/30 rounded-lg bg-indigo-500/5">
            <h3 className="text-lg font-medium text-indigo-400 mb-2">Задание 5: Масштабирование и отказоустойчивость</h3>
            <p className="mb-2">Создайте конфигурацию для высоконагруженного приложения:</p>
            <ul className="list-disc pl-6 mb-2">
              <li>Настройте Redis Sentinel для высокой доступности</li>
              <li>Сконфигурируйте Redis Cluster для горизонтального масштабирования</li>
              <li>Реализуйте стратегию резервного копирования с использованием RDB и AOF</li>
              <li>Спроектируйте систему мониторинга Redis</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RedisTasks;