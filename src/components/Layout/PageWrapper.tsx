import React, { ReactNode } from 'react';

interface PageWrapperProps {
  children: ReactNode;
}

const PageWrapper: React.FC<PageWrapperProps> = ({ children }) => {
  return (
    <div className="pt-16 min-h-screen">
      {children}
    </div>
  );
};

export default PageWrapper;