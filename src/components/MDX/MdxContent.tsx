import React from 'react';
import MDXComponents from './MDXComponents';

interface MDXContentProps {
  children: React.ReactNode;
  className?: string;
}

const MDXContent: React.FC<MDXContentProps> = ({ children, className = '' }) => {
  return (
    <div className={`mdx-content prose prose-invert max-w-none ${className}`}>
      <MDXComponents>{children}</MDXComponents>
    </div>
  );
};

export default MDXContent;
