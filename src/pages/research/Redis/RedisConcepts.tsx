import React from 'react';

const RedisConcepts: React.FC = () => {
  return (
    <section id="concepts" className="p-6 border rounded-lg bg-slate-800/40 border-slate-700/50 mb-6">
      <h2 className="mb-4 text-2xl font-semibold text-indigo-400">Ключевые Концепции Redis</h2>
      
      <div className="text-gray-300">
        <h3 className="text-lg font-semibold text-sky-400 mt-4 mb-2">Структуры данных</h3>
        <p className="mb-3">
          Redis предоставляет несколько высокооптимизированных структур данных:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li><strong className="text-violet-400">Strings</strong> - простые строки, числа, бинарные данные</li>
          <li><strong className="text-violet-400">Lists</strong> - связные списки (реализованы как двусвязные списки)</li>
          <li><strong className="text-violet-400">Sets</strong> - неупорядоченные коллекции уникальных элементов</li>
          <li><strong className="text-violet-400">Sorted Sets</strong> - множества с рейтингом (score)</li>
          <li><strong className="text-violet-400">Hashes</strong> - хэш-таблицы для хранения пар ключ-значение</li>
          <li><strong className="text-violet-400">Streams</strong> - потоки данных, хронологические журналы</li>
          <li><strong className="text-violet-400">Геопространственные индексы</strong> - для локационных данных</li>
        </ul>
        
        <h3 className="text-lg font-semibold text-sky-400 mt-4 mb-2">Персистентность</h3>
        <p className="mb-3">
          Redis поддерживает два механизма сохранения данных:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li><strong className="text-violet-400">RDB</strong> - снимки (snapshots) всей базы данных</li>
          <li><strong className="text-violet-400">AOF</strong> - журнал операций (append-only file)</li>
        </ul>
        
        <h3 className="text-lg font-semibold text-sky-400 mt-4 mb-2">Масштабирование</h3>
        <p className="mb-3">
          Для масштабирования Redis предлагает:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li><strong className="text-violet-400">Репликация</strong> - master-replica архитектура</li>
          <li><strong className="text-violet-400">Redis Sentinel</strong> - для высокой доступности</li>
          <li><strong className="text-violet-400">Redis Cluster</strong> - для горизонтального масштабирования</li>
        </ul>
        
        <h3 className="text-lg font-semibold text-sky-400 mt-4 mb-2">Производительность</h3>
        <p className="mb-3">
          Ключевые факторы высокой производительности Redis:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Хранение данных в RAM</li>
          <li>Однопоточная модель выполнения (до Redis 6.0)</li>
          <li>Неблокирующий I/O</li>
          <li>Оптимизированные структуры данных</li>
          <li>Минимальный overhead на сетевые операции</li>
        </ul>
      </div>
    </section>
  );
};

export default RedisConcepts;