import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

// Компоненты для Markdown
const mdxComponents = {
  h1: (props: any) => <h1 className="text-2xl font-bold text-amber-400 mb-4" {...props} />,
  h2: (props: any) => <h2 className="text-xl font-bold text-amber-400 mt-6 mb-3" {...props} />,
  h3: (props: any) => <h3 className="text-lg font-semibold text-amber-400 mt-5 mb-2" {...props} />,
  p: (props: any) => <p className="mb-4 text-gray-300" {...props} />,
  ul: (props: any) => <ul className="list-disc pl-6 mb-4 text-gray-300" {...props} />,
  ol: (props: any) => <ol className="list-decimal pl-6 mb-4 text-gray-300" {...props} />,
  li: (props: any) => <li className="mb-1" {...props} />,
  code: (props: any) => <code className="bg-slate-700 text-pink-300 px-1 py-0.5 rounded" {...props} />,
  pre: (props: any) => <pre className="bg-slate-800 p-4 rounded mb-4 overflow-x-auto" {...props} />,
  blockquote: (props: any) => (
    <blockquote 
      className="border-l-4 border-amber-500 pl-4 italic text-gray-400 my-4" 
      {...props} 
    />
  ),
};

const TypeScriptTasks: React.FC = () => {
  const [content, setContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasksContent = async () => {
      try {
        setIsLoading(true);
        
        // Используем fetch для получения MDX-файла как текста
        const response = await fetch('/TSDOCS/questionsandtasks.mdx');
        
        if (!response.ok) {
          throw new Error(`Ошибка загрузки задач: ${response.status}`);
        }
        
        const text = await response.text();
        setContent(text);
        setError(null);
      } catch (err) {
        console.error('Failed to load tasks content:', err);
        setError('Не удалось загрузить задачи. Попробуйте позже.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasksContent();
  }, []);

  if (isLoading) {
    return (
      <section id="tasks" className="p-6 border rounded-lg bg-slate-800/40 border-amber-500/30">
        <h2 className="mb-4 text-2xl font-semibold text-amber-400">Задачи и Вопросы</h2>
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="tasks" className="p-6 border rounded-lg bg-slate-800/40 border-amber-500/30">
        <h2 className="mb-4 text-2xl font-semibold text-amber-400">Задачи и Вопросы</h2>
        <div className="text-red-400 p-4 border border-red-500/30 rounded bg-red-500/10">
          <p>{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section id="tasks" className="p-6 border rounded-lg bg-slate-800/40 border-amber-500/30">
      <h2 className="mb-4 text-2xl font-semibold text-amber-400">Задачи и Вопросы по TypeScript</h2>
      
      <div className="prose prose-invert max-w-none">
        <ReactMarkdown components={mdxComponents}>{content}</ReactMarkdown>
      </div>
    </section>
  );
};

export default TypeScriptTasks;