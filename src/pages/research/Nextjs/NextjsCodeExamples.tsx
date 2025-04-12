import React from 'react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';

const NextjsCodeExamples: React.FC = () => {
  const pagesRouterExample = `
// pages/index.js - Домашняя страница с SSR
import Head from 'next/head';
import Link from 'next/link';

export default function Home({ posts }) {
  return (
    <div>
      <Head>
        <title>Мой блог</title>
        <meta name="description" content="Пример блога на Next.js" />
      </Head>

      <main>
        <h1>Последние посты</h1>
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <Link href={\`/posts/\${post.id}\`}>
                <a>{post.title}</a>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

// Получение данных на стороне сервера при каждом запросе
export async function getServerSideProps() {
  // В реальном приложении здесь был бы запрос к API или базе данных
  const posts = [
    { id: 1, title: 'Введение в Next.js' },
    { id: 2, title: 'Сравнение SSR и SSG' },
    { id: 3, title: 'Оптимизация производительности' },
  ];

  return {
    props: {
      posts,
    },
  };
}
`;

  const appRouterExample = `
// app/page.js - Домашняя страница с Server Component

import Link from 'next/link';

// Это React Server Component - он может получать данные напрямую
// без использования getServerSideProps или getStaticProps
async function getPosts() {
  // В реальном приложении здесь был бы запрос к API или базе данных
  return [
    { id: 1, title: 'Введение в Next.js App Router' },
    { id: 2, title: 'React Server Components' },
    { id: 3, title: 'Сравнение Pages и App роутеров' },
  ];
}

export default async function HomePage() {
  // Асинхронное получение данных прямо в компоненте
  const posts = await getPosts();

  return (
    <main>
      <h1>Последние посты</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={\`/posts/\${post.id}\`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}

// Метаданные (заменяет Head из pages)
export const metadata = {
  title: 'Мой блог',
  description: 'Пример блога на Next.js с App Router',
};
`;

  const serverActionsExample = `
// app/posts/create/page.js - Форма создания поста с Server Action

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

// Server Action определяется с помощью 'use server' директивы
async function createPost(formData) {
  'use server';
  
  const title = formData.get('title');
  const content = formData.get('content');
  
  // В реальном приложении здесь был бы код для сохранения в базу данных
  console.log('Создание поста:', { title, content });
  
  // Добавим искусственную задержку для демонстрации
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return { success: true, id: Date.now() };
}

// Клиентский компонент для формы
export default function CreatePostPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  
  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      // Получаем данные формы
      const formData = new FormData(event.target);
      
      // Вызываем Server Action
      const result = await createPost(formData);
      
      if (result.success) {
        // Переходим на страницу созданного поста
        router.push(\`/posts/\${result.id}\`);
        router.refresh(); // Обновляем данные на клиенте
      }
    } catch (err) {
      setError('Произошла ошибка при создании поста');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }
  
  return (
    <div>
      <h1>Создать новый пост</h1>
      
      {error && (
        <div className="error">{error}</div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Заголовок:</label>
          <input 
            type="text" 
            id="title" 
            name="title" 
            required 
          />
        </div>
        
        <div>
          <label htmlFor="content">Содержание:</label>
          <textarea 
            id="content" 
            name="content" 
            rows="5" 
            required 
          />
        </div>
        
        <button 
          type="submit" 
          disabled={loading}
        >
          {loading ? 'Создание...' : 'Создать пост'}
        </button>
      </form>
    </div>
  );
}
`;

  return (
    <section id="code-examples" className="p-6 border rounded-lg bg-slate-800/40 border-slate-700/50 mb-6">
      <h2 className="mb-4 text-2xl font-semibold text-indigo-400">Примеры Кода Next.js</h2>
      
      <div className="mb-6 text-gray-300">
        <h3 className="text-lg font-semibold text-sky-400 mt-4 mb-2">Pages Router - SSR Пример</h3>
        <p className="mb-4">
          Классический пример страницы в Next.js с использованием Pages Router и Server-Side Rendering:
        </p>
        
        <div className="bg-slate-900 rounded-lg overflow-x-auto mb-6">
          <pre className="p-4 text-sm">
            <code className="language-javascript">{pagesRouterExample}</code>
          </pre>
        </div>
        
        <h3 className="text-lg font-semibold text-sky-400 mt-4 mb-2">App Router - Server Component Пример</h3>
        <p className="mb-4">
          Современный пример с использованием App Router и React Server Components:
        </p>
        
        <div className="bg-slate-900 rounded-lg overflow-x-auto mb-6">
          <pre className="p-4 text-sm">
            <code className="language-javascript">{appRouterExample}</code>
          </pre>
        </div>
        
        <h3 className="text-lg font-semibold text-sky-400 mt-4 mb-2">Server Actions Пример</h3>
        <p className="mb-4">
          Пример использования Server Actions для обработки формы:
        </p>
        
        <div className="bg-slate-900 rounded-lg overflow-x-auto">
          <pre className="p-4 text-sm">
            <code className="language-javascript">{serverActionsExample}</code>
          </pre>
        </div>
      </div>
    </section>
  );
};

export default NextjsCodeExamples;