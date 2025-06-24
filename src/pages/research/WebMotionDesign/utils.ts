// Утилиты для работы с анимациями

/**
 * Проверяет, предпочитает ли пользователь уменьшенную анимацию
 */
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Возвращает длительность анимации с учетом prefers-reduced-motion
 */
export const getAnimationDuration = (duration: number): number => {
  return prefersReducedMotion() ? 0 : duration;
};

/**
 * Дебаунс функция для оптимизации частых вызовов
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Throttle функция для ограничения частоты вызовов
 */
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

/**
 * Измеряет производительность анимации
 */
export const measureAnimationPerformance = (
  animationFn: () => void
): Promise<{ fps: number; duration: number }> => {
  return new Promise((resolve) => {
    let frameCount = 0;
    let lastTime = performance.now();
    const startTime = lastTime;
    
    const measureFrame = () => {
      frameCount++;
      const currentTime = performance.now();
      const deltaTime = currentTime - startTime;
      
      if (deltaTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / deltaTime);
        resolve({ fps, duration: deltaTime });
      } else {
        requestAnimationFrame(measureFrame);
      }
    };
    
    animationFn();
    requestAnimationFrame(measureFrame);
  });
};

/**
 * Создает плавную прокрутку к элементу
 */
export const smoothScrollTo = (element: HTMLElement, offset = 0): void => {
  const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - offset;
  
  window.scrollTo({
    top: targetPosition,
    behavior: prefersReducedMotion() ? 'auto' : 'smooth'
  });
};

/**
 * Stagger анимации для списка элементов
 */
export const getStaggerDelay = (index: number, baseDelay = 50): number => {
  return prefersReducedMotion() ? 0 : index * baseDelay;
};