import React from 'react';

const RedisResources: React.FC = () => {
  return (
    <section id="resources" className="p-6 border rounded-lg bg-slate-800/40 border-slate-700/50 mb-6">
      <h2 className="mb-4 text-2xl font-semibold text-indigo-400">Ресурсы для Изучения Redis</h2>
      
      <div className="text-gray-300">
        <h3 className="text-lg font-semibold text-sky-400 mt-4 mb-2">Официальная документация</h3>
        <ul className="list-disc pl-6 mb-4">
          <li>Redis Documentation - исчерпывающая и хорошо структурированная документация</li>
          <li>Redis Commands Reference - детальное описание всех команд</li>
          <li>Redis University - бесплатные онлайн-курсы от создателей Redis</li>
        </ul>
        
        <h3 className="text-lg font-semibold text-sky-400 mt-4 mb-2">Книги</h3>
        <ul className="list-disc pl-6 mb-4">
          <li>"Redis in Action" - Josiah L. Carlson</li>
          <li>"Redis Essentials" - Maxwell Dayvson Da Silva, Hugo Lopes Tavares</li>
          <li>"Redis Cookbook" - Tiago Macedo, Fred Oliveira</li>
          <li>"Mastering Redis" - Jeremy Nelson</li>
        </ul>
        
        <h3 className="text-lg font-semibold text-sky-400 mt-4 mb-2">Клиентские библиотеки для Node.js</h3>
        <ul className="list-disc pl-6 mb-4">
          <li><strong className="text-violet-400">ioredis</strong> - надежный Redis-клиент для Node.js с поддержкой кластеров, транзакций и других продвинутых функций</li>
          <li><strong className="text-violet-400">node-redis</strong> - простой и легковесный клиент</li>
          <li><strong className="text-violet-400">redis-om</strong> - Object Mapping для Redis (подобно ORM для SQL БД)</li>
          <li><strong className="text-violet-400">connect-redis</strong> - хранилище сессий для Express</li>
          <li><strong className="text-violet-400">bull</strong> - очередь задач на базе Redis</li>
        </ul>
        
        <h3 className="text-lg font-semibold text-sky-400 mt-4 mb-2">Инструменты</h3>
        <ul className="list-disc pl-6 mb-4">
          <li><strong className="text-violet-400">RedisInsight</strong> - официальный GUI для Redis</li>
          <li><strong className="text-violet-400">Redis-commander</strong> - веб-интерфейс для Redis</li>
          <li><strong className="text-violet-400">Redis-cli</strong> - стандартный интерфейс командной строки</li>
          <li><strong className="text-violet-400">RedisJSON</strong> - модуль для работы с JSON в Redis</li>
          <li><strong className="text-violet-400">RediSearch</strong> - модуль полнотекстового поиска</li>
        </ul>
        
        <h3 className="text-lg font-semibold text-sky-400 mt-4 mb-2">Онлайн ресурсы и сообщества</h3>
        <ul className="list-disc pl-6 mb-4">
          <li>Redis Labs Blog - статьи от команды разработки Redis</li>
          <li>Redis на Stack Overflow - вопросы и ответы от сообщества</li>
          <li>Redis на GitHub - исходный код и документация</li>
          <li>Redis Weekly - еженедельная рассылка новостей и материалов о Redis</li>
        </ul>
        
        <h3 className="text-lg font-semibold text-sky-400 mt-4 mb-2">Видеокурсы</h3>
        <ul className="list-disc pl-6 mb-4">
          <li>Redis Crash Course от Traversy Media</li>
          <li>Redis и Node.js от Academind</li>
          <li>Redis для разработчиков JavaScript от Hussein Nasser</li>
        </ul>
      </div>
    </section>
  );
};

export default RedisResources;