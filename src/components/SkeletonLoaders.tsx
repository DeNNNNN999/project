import React from 'react';

interface SkeletonLoaderProps {
  height?: string;
  className?: string;
}

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ 
  height = '400px', 
  className = '' 
}) => {
  return (
    <div 
      className={`animate-pulse bg-slate-800/50 rounded-lg ${className}`}
      style={{ height }}
    >
      <div className="h-full flex items-center justify-center">
        <div className="text-slate-600 text-sm">Loading...</div>
      </div>
    </div>
  );
};

export const ProjectsSkeleton = () => (
  <div className="py-20 px-4">
    <div className="max-w-7xl mx-auto">
      <div className="h-12 bg-slate-800/50 rounded-lg w-48 mx-auto mb-12 animate-pulse skeleton-shimmer" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <div key={i} className="bg-slate-800/30 rounded-lg h-64 animate-pulse skeleton-shimmer" />
        ))}
      </div>
    </div>
  </div>
);

export const SkillsSkeleton = () => (
  <div className="py-20 px-4">
    <div className="max-w-7xl mx-auto">
      <div className="h-12 bg-slate-800/50 rounded-lg w-48 mx-auto mb-12 animate-pulse" />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
          <div key={i} className="bg-slate-800/30 rounded-lg h-24 animate-pulse" />
        ))}
      </div>
    </div>
  </div>
);

export const ContactSkeleton = () => (
  <div className="py-20 px-4">
    <div className="max-w-4xl mx-auto">
      <div className="h-12 bg-slate-800/50 rounded-lg w-48 mx-auto mb-12 animate-pulse" />
      <div className="bg-slate-800/30 rounded-lg h-96 animate-pulse" />
    </div>
  </div>
);
