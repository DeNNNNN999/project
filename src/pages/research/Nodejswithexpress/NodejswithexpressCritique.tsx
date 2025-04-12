import React from 'react';

const NodejswithexpressCritique: React.FC = () => {
  return (
    <section id="critique" className="p-6 border rounded-lg bg-slate-800/40 border-slate-700/50 mb-6">
      <h2 className="mb-4 text-2xl font-semibold text-indigo-400">Критический Взгляд на Node.js и Express</h2>
      
      <div className="text-gray-300">
        <h3 className="text-lg font-semibold text-sky-400 mt-4 mb-2">Однопоточная модель Node.js: Благо или ограничение?</h3>
        <p className="mb-3">
          Однопоточная модель с событийным циклом — это одновременно и сильная, и слабая сторона Node.js:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li><span className="text-green-400">Плюсы:</span> Эффективная обработка множества параллельных I/O-операций, низкий расход памяти, отсутствие состояний гонки (race conditions)</li>
          <li><span className="text-red-400">Минусы:</span> CPU-интенсивные операции блокируют всё приложение, сложность отладки асинхронного кода, необходимость аккуратного обращения с ошибками</li>
        </ul>
        <p className="mb-3">
          Worker Threads и кластеризация решают часть проблем, но вносят дополнительную сложность в архитектуру.
        </p>
        
        <h3 className="text-lg font-semibold text-sky-400 mt-4 mb-2">Минимализм Express: Свобода или отсутствие структуры?</h3>
        <p className="mb-3">
          Express намеренно минималистичен, предоставляя лишь базовый функционал:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li><span className="text-green-400">Плюсы:</span> Гибкость, низкая кривая обучения, возможность выбора именно тех инструментов, которые нужны</li>
          <li><span className="text-red-400">Минусы:</span> Отсутствие общепринятых стандартов структуры проекта, необходимость ручной настройки многих вещей, фрагментация экосистемы middleware</li>
        </ul>
        <p className="mb-3">
          Разработчики часто создают свои архитектурные решения, что приводит к различиям между проектами и сложностям при их поддержке.
        </p>
        
        <h3 className="text-lg font-semibold text-sky-400 mt-4 mb-2">Callback Hell и асинхронность</h3>
        <p className="mb-3">
          Хотя с появлением Promises и async/await ситуация улучшилась, асинхронная природа Node.js всё еще создает вызовы:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Сложная отладка при вложенных цепочках промисов</li>
          <li>Неочевидные потоки выполнения из-за отложенных операций</li>
          <li>Ошибки, которые легко "проглотить" в асинхронном коде</li>
        </ul>
        
        <h3 className="text-lg font-semibold text-sky-400 mt-4 mb-2">Типизация и TypeScript</h3>
        <p className="mb-3">
          JavaScript — динамически типизированный язык, что может приводить к ошибкам времени выполнения:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>TypeScript частично решает проблему, но добавляет свой уровень сложности</li>
          <li>Типы для Express и многих популярных библиотек не всегда точны или полны</li>
          <li>Интеграция TypeScript требует дополнительных инструментов сборки (ts-node, компиляция и т.д.)</li>
        </ul>
        
        <h3 className="text-lg font-semibold text-sky-400 mt-4 mb-2">Конкуренция со стороны специализированных решений</h3>
        <p className="mb-3">
          В последние годы появились серьезные альтернативы:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li><strong className="text-violet-400">NestJS</strong> — фреймворк с четкой структурой, внедрением зависимостей и встроенной модульностью</li>
          <li><strong className="text-violet-400">Fastify</strong> — более быстрая и со встроенной валидацией альтернатива Express</li>
          <li><strong className="text-violet-400">Deno</strong> — среда выполнения от создателя Node.js с лучшей безопасностью и встроенной поддержкой TypeScript</li>
          <li><strong className="text-violet-400">Bun</strong> — новая JavaScript-среда с акцентом на производительность</li>
        </ul>
        
        <h3 className="text-lg font-semibold text-sky-400 mt-4 mb-2">Заключение</h3>
        <p className="mb-3">
          Node.js и Express — это зрелые, проверенные временем инструменты с огромной экосистемой и поддержкой. 
          Они отлично подходят для определенных сценариев, особенно для I/O-интенсивных приложений и API. 
          Однако, важно осознавать их ограничения и компромиссы, чтобы принимать обоснованные архитектурные 
          решения и правильно структурировать свои проекты.
        </p>
      </div>
    </section>
  );
};

export default NodejswithexpressCritique;