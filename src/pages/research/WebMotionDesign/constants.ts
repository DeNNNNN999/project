// Константы для Web Motion Design

export const ANIMATION_DURATIONS = {
  instant: 100,    // 100ms - мгновенный отклик
  fast: 200,       // 200ms - быстрая анимация
  normal: 300,     // 300ms - стандартная анимация
  slow: 500,       // 500ms - медленная анимация
  verySlow: 1000   // 1000ms - очень медленная (избегать в UI)
} as const;

export const EASING_FUNCTIONS = {
  // Стандартные easing функции
  linear: 'linear',
  easeIn: 'ease-in',
  easeOut: 'ease-out',
  easeInOut: 'ease-in-out',
  
  // Кастомные cubic-bezier для UI
  bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  smooth: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
  snappy: 'cubic-bezier(0.25, 0.1, 0.25, 1)'
} as const;

export const PERFORMANCE_THRESHOLDS = {
  targetFPS: 60,
  acceptableFPS: 50,
  poorFPS: 30,
  maxAnimationDuration: 400, // ms
  maxConcurrentAnimations: 3
} as const;

export const UI_ANIMATION_PRINCIPLES = {
  minimalism: 'Минимально достаточная анимация',
  purpose: 'Каждое движение должно иметь цель',
  performance: 'Производительность превыше красоты',
  consistency: 'Единообразие во всем интерфейсе',
  accessibility: 'Уважение к prefers-reduced-motion'
} as const;