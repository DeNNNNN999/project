import React from 'react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';

const NodejswithexpressCodeExamples: React.FC = () => {
  const basicExpressExample = `
// Базовое Express приложение
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware для обработки JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Логгирование запросов
app.use((req, res, next) => {
  console.log(\`\${new Date().toISOString()} - \${req.method} \${req.path}\`);
  next();
});

// Обработка маршрутов
app.get('/', (req, res) => {
  res.send('Привет, мир!');
});

// Параметризованные маршруты
app.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  res.json({ message: \`Запрошен пользователь с ID: \${userId}\` });
});

// Обработка POST запросов
app.post('/api/data', (req, res) => {
  console.log('Полученные данные:', req.body);
  res.status(201).json({ success: true, data: req.body });
});

// Обработка ошибок
app.use((err, req, res, next) => {
  console.error('Ошибка:', err);
  res.status(500).json({ error: 'Внутренняя ошибка сервера' });
});

// Запуск сервера
app.listen(port, () => {
  console.log(\`Сервер запущен на порту \${port}\`);
});
`;

  const routerExample = `
// Модульная организация маршрутов (users.js)
const express = require('express');
const router = express.Router();

// Middleware, применяемое только к маршрутам этого роутера
router.use((req, res, next) => {
  console.log('Time:', Date.now());
  next();
});

// Определение маршрутов
router.get('/', (req, res) => {
  res.json({ message: 'Список всех пользователей' });
});

router.get('/:id', (req, res) => {
  res.json({ message: \`Информация о пользователе \${req.params.id}\` });
});

router.post('/', (req, res) => {
  // Добавление нового пользователя
  const newUser = req.body;
  // В реальном приложении тут была бы логика сохранения в БД
  res.status(201).json({ message: 'Пользователь создан', user: newUser });
});

router.put('/:id', (req, res) => {
  // Обновление пользователя
  const userId = req.params.id;
  const updates = req.body;
  res.json({ message: \`Пользователь \${userId} обновлен\`, updates });
});

router.delete('/:id', (req, res) => {
  // Удаление пользователя
  const userId = req.params.id;
  res.json({ message: \`Пользователь \${userId} удален\` });
});

module.exports = router;

// В основном файле app.js
const usersRouter = require('./routes/users');
app.use('/api/users', usersRouter);
`;

  const asyncAwaitExample = `
// Асинхронная обработка и интеграция с базой данных
const express = require('express');
const { Pool } = require('pg');  // PostgreSQL клиент
const app = express();

// Настройка подключения к базе данных
const pool = new Pool({
  user: 'dbuser',
  host: 'localhost',
  database: 'myapp',
  password: 'password',
  port: 5432,
});

// Middleware для обработки JSON
app.use(express.json());

// Асинхронный обработчик с использованием async/await
app.get('/users', async (req, res, next) => {
  try {
    // Асинхронный запрос к базе данных
    const result = await pool.query('SELECT * FROM users');
    
    // Отправка результатов
    res.json({ users: result.rows });
  } catch (err) {
    // Передача ошибки middleware обработки ошибок
    next(err);
  }
});

// Создание пользователя
app.post('/users', async (req, res, next) => {
  try {
    const { name, email } = req.body;
    
    // Валидация
    if (!name || !email) {
      return res.status(400).json({ error: 'Имя и email обязательны' });
    }
    
    // Асинхронный запрос с параметрами
    const result = await pool.query(
      'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
      [name, email]
    );
    
    res.status(201).json({ user: result.rows[0] });
  } catch (err) {
    next(err);
  }
});

// Обработка ошибок
app.use((err, req, res, next) => {
  console.error('Database error:', err);
  res.status(500).json({ error: 'Ошибка базы данных' });
});

app.listen(3000, () => {
  console.log('Сервер запущен на порту 3000');
});
`;

  const typescriptExample = `
// TypeScript версия Express приложения
import express, { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

// Определение типов данных
interface User {
  id: number;
  name: string;
  email: string;
  age?: number;
}

// Хранилище данных (для примера)
const users: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', age: 28 },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', age: 32 }
];

const app = express();
app.use(express.json());

// Типизированный запрос с параметрами
app.get('/users/:id', (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);
  
  if (isNaN(userId)) {
    return res.status(400).json({ error: 'ID должен быть числом' });
  }
  
  const user = users.find(u => u.id === userId);
  
  if (!user) {
    return res.status(404).json({ error: 'Пользователь не найден' });
  }
  
  res.json({ user });
});

// Валидация с express-validator
app.post(
  '/users',
  [
    body('name').notEmpty().withMessage('Имя обязательно'),
    body('email').isEmail().withMessage('Некорректный email'),
    body('age').optional().isInt({ min: 0 }).withMessage('Возраст должен быть положительным числом')
  ],
  (req: Request, res: Response) => {
    // Проверка результатов валидации
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    // Создание пользователя с правильными типами
    const newUser: User = {
      id: users.length + 1,
      name: req.body.name,
      email: req.body.email,
      age: req.body.age
    };
    
    users.push(newUser);
    res.status(201).json({ user: newUser });
  }
);

// Типизированный обработчик ошибок
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({ error: err.message || 'Внутренняя ошибка сервера' });
});

app.listen(3000, () => {
  console.log('TypeScript Express сервер запущен на порту 3000');
});
`;

  return (
    <section id="code-examples" className="p-6 border rounded-lg bg-slate-800/40 border-slate-700/50 mb-6">
      <h2 className="mb-4 text-2xl font-semibold text-indigo-400">Примеры Кода Node.js и Express</h2>
      
      <div className="mb-6 text-gray-300">
        <h3 className="text-lg font-semibold text-sky-400 mt-4 mb-2">Базовое Express Приложение</h3>
        <p className="mb-4">
          Пример простого Express приложения с базовыми маршрутами и middleware:
        </p>
        
        <div className="bg-slate-900 rounded-lg overflow-x-auto mb-6">
          <pre className="p-4 text-sm">
            <code className="language-javascript">{basicExpressExample}</code>
          </pre>
        </div>
        
        <h3 className="text-lg font-semibold text-sky-400 mt-4 mb-2">Модульная Организация с Express Router</h3>
        <p className="mb-4">
          Структурирование маршрутов с использованием Express Router:
        </p>
        
        <div className="bg-slate-900 rounded-lg overflow-x-auto mb-6">
          <pre className="p-4 text-sm">
            <code className="language-javascript">{routerExample}</code>
          </pre>
        </div>
        
        <h3 className="text-lg font-semibold text-sky-400 mt-4 mb-2">Асинхронная Обработка с Async/Await</h3>
        <p className="mb-4">
          Пример использования async/await для асинхронных операций:
        </p>
        
        <div className="bg-slate-900 rounded-lg overflow-x-auto mb-6">
          <pre className="p-4 text-sm">
            <code className="language-javascript">{asyncAwaitExample}</code>
          </pre>
        </div>
        
        <h3 className="text-lg font-semibold text-sky-400 mt-4 mb-2">TypeScript Express Приложение</h3>
        <p className="mb-4">
          Пример Express приложения с использованием TypeScript для типизации:
        </p>
        
        <div className="bg-slate-900 rounded-lg overflow-x-auto">
          <pre className="p-4 text-sm">
            <code className="language-typescript">{typescriptExample}</code>
          </pre>
        </div>
      </div>
    </section>
  );
};

export default NodejswithexpressCodeExamples;