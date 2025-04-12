import React from 'react';
import MDXTable, { MDXThead, MDXTbody, MDXTr, MDXTh, MDXTd } from './MDXTable';
import { MDXProvider } from '@mdx-js/react';

interface MDXComponentsProps {
  children: React.ReactNode;
}

const components = {
  // Переопределяем компоненты таблицы
  table: (props: any) => <MDXTable {...props} />,
  thead: (props: any) => <MDXThead {...props} />,
  tbody: (props: any) => <MDXTbody {...props} />,
  tr: (props: any) => <MDXTr {...props} />,
  th: (props: any) => <MDXTh {...props} />,
  td: (props: any) => <MDXTd {...props} />,
  
  // Другие компоненты можно добавить по необходимости
  h1: (props: any) => <h1 className="text-3xl font-bold text-white mb-6 mt-10" {...props} />,
  h2: (props: any) => <h2 className="text-2xl font-bold text-blue-400 mb-4 mt-8" {...props} />,
  h3: (props: any) => <h3 className="text-xl font-semibold text-indigo-300 mb-3 mt-6" {...props} />,
  p: (props: any) => <p className="mb-4 text-gray-300" {...props} />,
  ul: (props: any) => <ul className="mb-6 pl-5 list-disc text-gray-300" {...props} />,
  ol: (props: any) => <ol className="mb-6 pl-5 list-decimal text-gray-300" {...props} />,
  li: (props: any) => <li className="mb-1" {...props} />,
  blockquote: (props: any) => (
    <blockquote className="pl-4 italic border-l-4 border-gray-500 text-gray-400 mb-6" {...props} />
  ),
  code: (props: any) => (
    <code className="bg-slate-700/50 rounded px-1.5 py-0.5 text-sm text-indigo-200" {...props} />
  ),
  pre: (props: any) => (
    <pre className="bg-slate-800/70 p-4 rounded-lg overflow-auto mb-6 text-sm" {...props} />
  ),
  hr: (props: any) => <hr className="my-8 border-gray-700" {...props} />,
  a: (props: any) => (
    <a className="text-blue-400 hover:text-blue-300 underline transition-colors" {...props} />
  ),
  strong: (props: any) => <strong className="font-bold text-gray-200" {...props} />,
  em: (props: any) => <em className="italic text-gray-300" {...props} />,
};

const MDXComponents: React.FC<MDXComponentsProps> = ({ children }) => {
  return <MDXProvider components={components}>{children}</MDXProvider>;
};

export default MDXComponents;
