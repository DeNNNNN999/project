/// <reference types="vite/client" />

// MDX типы
declare module '*.mdx' {
  import type { ComponentType } from 'react'
  
  export interface MDXFrontmatter {
    title: string
    description: string
    chapter: number
    difficulty: 'beginner' | 'intermediate' | 'advanced'
    tags: string[]
    estimatedTime: number
    prerequisites?: string[]
    objectives: string[]
    lastUpdated: string
  }
  
  export const frontmatter: MDXFrontmatter
  export const metadata: MDXFrontmatter
  
  const MDXComponent: ComponentType<any>
  export default MDXComponent
}

// Расширяем глобальные типы для Vite
interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_API_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
  readonly glob: (pattern: string) => Record<string, () => Promise<any>>
}

// TypeScript образцы кода
declare global {
  interface Window {
    monaco?: any
    typescript?: any
  }
}

// Модули для библиотек без типов
declare module 'react-syntax-highlighter/dist/esm/styles/prism/*'
declare module 'react-syntax-highlighter/dist/esm/languages/prism/*'