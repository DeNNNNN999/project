// Типы для Web Motion Design

export interface Topic {
  id: number;
  title: string;
  component: React.ComponentType | null;
  description?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime?: number; // в минутах
}

export interface MotionExample {
  title: string;
  description: string;
  code: string;
  demo: React.ReactNode;
  isCorrect: boolean;
}

export interface AnimationMetrics {
  fps: number;
  duration: number;
  cpuUsage?: number;
  smoothness: 'poor' | 'fair' | 'good' | 'excellent';
}