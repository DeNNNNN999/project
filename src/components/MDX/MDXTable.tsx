import React from 'react';

interface MDXTableProps {
  children: React.ReactNode;
  className?: string;
}

const MDXTable: React.FC<MDXTableProps> = ({ children, className = '' }) => {
  return (
    <div className="overflow-x-auto my-6">
      <table className={`min-w-full divide-y divide-slate-700 bg-slate-800/50 rounded-lg border border-slate-700 ${className}`}>
        {children}
      </table>
    </div>
  );
};

interface MDXTheadProps {
  children: React.ReactNode;
}

export const MDXThead: React.FC<MDXTheadProps> = ({ children }) => {
  return (
    <thead className="bg-slate-700/70">
      {children}
    </thead>
  );
};

interface MDXTbodyProps {
  children: React.ReactNode;
}

export const MDXTbody: React.FC<MDXTbodyProps> = ({ children }) => {
  return (
    <tbody className="divide-y divide-slate-700/70 bg-slate-800/30">
      {children}
    </tbody>
  );
};

interface MDXTrProps {
  children: React.ReactNode;
  isHeader?: boolean;
}

export const MDXTr: React.FC<MDXTrProps> = ({ children, isHeader = false }) => {
  return (
    <tr className={isHeader ? 'bg-slate-700/40' : 'hover:bg-slate-700/20 transition-colors'}>
      {children}
    </tr>
  );
};

interface MDXThProps {
  children: React.ReactNode;
  align?: 'left' | 'center' | 'right';
}

export const MDXTh: React.FC<MDXThProps> = ({ children, align = 'left' }) => {
  const alignClass = align === 'left' ? 'text-left' : align === 'right' ? 'text-right' : 'text-center';
  
  return (
    <th scope="col" className={`px-4 py-3.5 text-sm font-semibold text-white ${alignClass}`}>
      {children}
    </th>
  );
};

interface MDXTdProps {
  children: React.ReactNode;
  align?: 'left' | 'center' | 'right';
}

export const MDXTd: React.FC<MDXTdProps> = ({ children, align = 'left' }) => {
  const alignClass = align === 'left' ? 'text-left' : align === 'right' ? 'text-right' : 'text-center';
  
  return (
    <td className={`px-4 py-3 text-sm text-gray-300 ${alignClass}`}>
      {children}
    </td>
  );
};

export default MDXTable;
