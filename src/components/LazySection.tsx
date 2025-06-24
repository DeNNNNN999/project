import React, { useEffect, useRef, useState } from 'react';

interface LazySectionProps {
  children: React.ReactNode;
  threshold?: number;
  rootMargin?: string;
  fallback?: React.ReactNode;
  className?: string;
  minHeight?: string;
}

const LazySection: React.FC<LazySectionProps> = ({
  children,
  threshold = 0.1,
  rootMargin = '100px',
  fallback = null,
  className = '',
  minHeight = '400px'
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          // Отключаем observer после первого показа
          observer.disconnect();
          
          // Небольшая задержка для плавного перехода
          setTimeout(() => {
            setIsLoaded(true);
          }, 100);
        }
      },
      {
        threshold,
        rootMargin
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, isVisible]);

  return (
    <div 
      ref={sectionRef} 
      className={`${className} ${isLoaded ? 'lazy-section-enter' : ''}`}
      style={{ minHeight: !isVisible ? minHeight : 'auto' }}
    >
      {isVisible ? children : (
        <div className="animate-pulse">
          {fallback}
        </div>
      )}
    </div>
  );
};

export default LazySection;
