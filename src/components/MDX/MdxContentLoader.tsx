import React, { useState, useEffect } from 'react';
import { MDXProvider } from '@mdx-js/react';
import ReactMarkdown from 'react-markdown';

// Типы для MDX контента
interface MdxContentLoaderProps {
  lessonNumber: number | string;
  docFolder?: string; // Добавляем опциональный параметр для указания папки
}

// Компоненты для Markdown
const mdxComponents = {
  h1: (props: any) => <h1 className="text-2xl font-bold text-indigo-400 mb-4" {...props} />,
  h2: (props: any) => <h2 className="text-xl font-bold text-violet-400 mt-6 mb-3" {...props} />,
  h3: (props: any) => <h3 className="text-lg font-semibold text-sky-400 mt-5 mb-2" {...props} />,
  p: (props: any) => <p className="mb-4 text-gray-300" {...props} />,
  ul: (props: any) => <ul className="list-disc pl-6 mb-4 text-gray-300" {...props} />,
  ol: (props: any) => <ol className="list-decimal pl-6 mb-4 text-gray-300" {...props} />,
  li: (props: any) => <li className="mb-1" {...props} />,
  code: (props: any) => <code className="bg-slate-700 text-pink-300 px-1 py-0.5 rounded" {...props} />,
  pre: (props: any) => <pre className="bg-slate-800 p-4 rounded mb-4 overflow-x-auto" {...props} />,
  blockquote: (props: any) => (
    <blockquote 
      className="border-l-4 border-indigo-500 pl-4 italic text-gray-400 my-4" 
      {...props} 
    />
  ),
};

const MdxContentLoader: React.FC<MdxContentLoaderProps> = ({ lessonNumber, docFolder = 'JSDOCS' }) => {
  const [content, setContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMdxContent = async () => {
      try {
        setIsLoading(true);
        
        // Добавляем base path для GitHub Pages
        const basePath = import.meta.env.MODE === 'production' ? '/project' : '';
        const response = await fetch(`${basePath}/${docFolder}/${lessonNumber}.mdx`);
        
        if (!response.ok) {
          throw new Error(`Ошибка загрузки урока ${lessonNumber}: ${response.status}`);
        }
        
        const text = await response.text();
        setContent(text);
        setError(null);
        
        console.log(`Успешно загружен файл ${basePath}/${docFolder}/${lessonNumber}.mdx`);
      } catch (err) {
        console.error('Failed to load MDX content:', err);
        setError(`Не удалось загрузить урок из "${docFolder}/${lessonNumber}.mdx". Пожалуйста, проверьте правильность пути и наличие файла.`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMdxContent();
  }, [lessonNumber, docFolder]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-400 p-4 border border-red-500/30 rounded bg-red-500/10">
        <p>{error}</p>
        <p className="mt-2 text-sm">Проверьте следующее:</p>
        <ul className="list-disc pl-6 mt-1 text-sm">
          <li>Существует ли директория "{docFolder}" в папке public?</li>
          <li>Существует ли файл "{lessonNumber}.mdx" в этой директории?</li>
          <li>Правильно ли указано имя директории (с учетом регистра)?</li>
        </ul>
      </div>
    );
  }

  return (
    <div className="prose prose-invert max-w-none">
      <ReactMarkdown components={mdxComponents}>{content}</ReactMarkdown>
    </div>
  );
};

export default MdxContentLoader;