import React, { useState, useEffect, lazy, Suspense } from 'react';
import ReactMarkdown from 'react-markdown';
import { MDXProvider } from '@mdx-js/react';

interface MdxContentLoaderProps {
  lessonNumber: number | string;
  docFolder?: string;
}

// MDX компоненты для стилизации
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
  const [MdxComponent, setMdxComponent] = useState<React.ComponentType | null>(null);

  useEffect(() => {
    const loadMdxContent = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Динамический импорт MDX файла из src/content
        const mdxPath = `/src/content/${docFolder}/${lessonNumber}.mdx`;
        
        try {
          // Используем import.meta.glob для динамического импорта
          const modules = import.meta.glob('/src/content/**/*.mdx');
          const module = modules[mdxPath];
          
          if (!module) {
            throw new Error(`Файл не найден: ${mdxPath}`);
          }
          
          const imported = await module() as any;
          
          // MDX файлы экспортируют компонент по умолчанию
          if (imported.default) {
            setMdxComponent(() => imported.default);
          } else {
            // Если это просто текст, используем ReactMarkdown
            const response = await fetch(mdxPath);
            const text = await response.text();
            setContent(text);
          }
          
        } catch (importError) {
          // Fallback: попробуем загрузить как обычный текстовый файл
          console.warn('MDX import failed, trying as text:', importError);
          
          // Для продакшена: попробуем загрузить из public если файл там остался
          try {
            const response = await fetch(`/${docFolder}/${lessonNumber}.mdx`);
            if (response.ok) {
              const text = await response.text();
              setContent(text);
            } else {
              throw new Error(`Файл не найден ни в src/content, ни в public`);
            }
          } catch (fetchError) {
            throw new Error(`Не удалось загрузить файл ${lessonNumber}.mdx из папки ${docFolder}`);
          }
        }
        
      } catch (err: any) {
        console.error('Failed to load MDX content:', err);
        setError(err.message || 'Неизвестная ошибка при загрузке контента');
      } finally {
        setIsLoading(false);
      }
    };

    loadMdxContent();
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
        <p className="font-semibold mb-2">Ошибка загрузки контента</p>
        <p>{error}</p>
        <p className="mt-4 text-sm text-gray-400">
          Путь: /src/content/{docFolder}/{lessonNumber}.mdx
        </p>
      </div>
    );
  }

  // Если загружен MDX компонент
  if (MdxComponent) {
    return (
      <MDXProvider components={mdxComponents}>
        <div className="prose prose-invert max-w-none">
          <Suspense fallback={<div>Загрузка контента...</div>}>
            <MdxComponent />
          </Suspense>
        </div>
      </MDXProvider>
    );
  }

  // Если загружен обычный текст (fallback)
  return (
    <div className="prose prose-invert max-w-none">
      <ReactMarkdown components={mdxComponents}>{content}</ReactMarkdown>
    </div>
  );
};

export default MdxContentLoader;