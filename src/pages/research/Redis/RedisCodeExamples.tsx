import React from 'react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';

const RedisCodeExamples: React.FC = () => {
  const nodeJsExample = `
// Установка: npm install ioredis

const Redis = require('ioredis');
const redis = new Redis({
  host: 'localhost',
  port: 6379,
  // password: 'optional-password',
});

// Базовые операции со строками
async function basicStringOperations() {
  // Установка значения
  await redis.set('user:1:name', 'John Doe');
  
  // Получение значения
  const name = await redis.get('user:1:name');
  console.log('User name:', name); // 'John Doe'
  
  // Установка с истечением срока (в секундах)
  await redis.setex('session:123', 3600, 'active');
  
  // Инкремент числового значения
  await redis.set('counter', 1);
  await redis.incr('counter');
  const counter = await redis.get('counter');
  console.log('Counter:', counter); // '2'
}

// Работа с хэшами
async function hashOperations() {
  // Установка нескольких полей в хэше
  await redis.hset('user:1', 'name', 'John', 'email', 'john@example.com', 'age', 30);
  
  // Получение всех полей
  const user = await redis.hgetall('user:1');
  console.log('User data:', user); // { name: 'John', email: 'john@example.com', age: '30' }
  
  // Получение отдельного поля
  const email = await redis.hget('user:1', 'email');
  console.log('Email:', email); // 'john@example.com'
  
  // Проверка существования поля
  const hasPhone = await redis.hexists('user:1', 'phone');
  console.log('Has phone:', hasPhone); // 0 (false)
}

// Работа со списками
async function listOperations() {
  // Добавление элементов в список
  await redis.lpush('notifications', 'New message');
  await redis.rpush('notifications', 'Friend request');
  
  // Получение всех элементов списка
  const notifications = await redis.lrange('notifications', 0, -1);
  console.log('Notifications:', notifications); // ['New message', 'Friend request']
  
  // Удаление и получение первого элемента
  const notification = await redis.lpop('notifications');
  console.log('Popped notification:', notification); // 'New message'
}

// Работа с множествами
async function setOperations() {
  // Добавление элементов в множество
  await redis.sadd('user:1:tags', 'developer', 'nodejs', 'redis');
  
  // Получение всех элементов множества
  const tags = await redis.smembers('user:1:tags');
  console.log('Tags:', tags); // ['developer', 'nodejs', 'redis']
  
  // Проверка наличия элемента
  const isRedisUser = await redis.sismember('user:1:tags', 'redis');
  console.log('Is Redis user:', isRedisUser); // 1 (true)
  
  // Операции над множествами
  await redis.sadd('user:2:tags', 'developer', 'python', 'mongodb');
  const commonTags = await redis.sinter('user:1:tags', 'user:2:tags');
  console.log('Common tags:', commonTags); // ['developer']
}

// Транзакции
async function transactionExample() {
  const multi = redis.multi();
  multi.set('key1', 'value1');
  multi.incr('counter');
  multi.hset('hash', 'field', 'value');
  
  const results = await multi.exec();
  console.log('Transaction results:', results);
}

// Pub/Sub
function pubSubExample() {
  // Подписчик
  const subscriber = new Redis();
  subscriber.subscribe('channel1', (err, count) => {
    if (err) console.error('Failed to subscribe:', err);
    else console.log(\`Subscribed to \${count} channel(s)\`);
  });
  
  subscriber.on('message', (channel, message) => {
    console.log(\`Received \${message} from \${channel}\`);
  });
  
  // Издатель
  const publisher = new Redis();
  setTimeout(() => {
    publisher.publish('channel1', 'Hello world!');
  }, 1000);
}

// Вызов функций
async function main() {
  try {
    await basicStringOperations();
    await hashOperations();
    await listOperations();
    await setOperations();
    await transactionExample();
    pubSubExample();
  } catch (error) {
    console.error('Error:', error);
  } finally {
    // Закрытие соединения (в реальном приложении обычно держим открытым)
    // redis.quit();
  }
}

main();
`;

  return (
    <section id="code-examples" className="p-6 border rounded-lg bg-slate-800/40 border-slate-700/50 mb-6">
      <h2 className="mb-4 text-2xl font-semibold text-indigo-400">Примеры Кода с Redis</h2>
      
      <div className="mb-6 text-gray-300">
        <p className="mb-4">
          Ниже представлен пример использования Redis с Node.js при помощи популярной библиотеки ioredis.
          Пример охватывает основные операции с различными структурами данных, транзакции и Pub/Sub.
        </p>
        
        <div className="bg-slate-900 rounded-lg overflow-x-auto">
          <pre className="p-4 text-sm">
            <code className="language-javascript">{nodeJsExample}</code>
          </pre>
        </div>
        
        <p className="mt-4">
          Этот пример демонстрирует, насколько просто и выразительно можно работать с Redis из Node.js
          приложения, используя привычный async/await синтаксис.
        </p>
      </div>
    </section>
  );
};

export default RedisCodeExamples;