import React, { useState, useEffect, Suspense } from 'react'
import ReactMarkdown from 'react-markdown'
import { MDXProvider } from '@mdx-js/react'
import type { 
  MdxContentLoaderProps, 
  MdxLoadingState, 
  DynamicMDXModule,
  MDXComponents 
} from '../../types/mdx'

// Типизированные компоненты для стилизации MDX
const createMDXComponents = (): MDXComponents => ({
  h1: (props) => <h1 className="text-2xl font-bold text-indigo-400 mb-4" {...props} />,
  h2: (props) => <h2 className="text-xl font-bold text-violet-400 mt-6 mb-3" {...props} />,
  h3: (props) => <h3 className="text-lg font-semibold text-sky-400 mt-5 mb-2" {...props} />,
  p: (props) => <p className="mb-4 text-gray-300" {...props} />,
  ul: (props) => <ul className="list-disc pl-6 mb-4 text-gray-300" {...props} />,
  ol: (props) => <ol className="list-decimal pl-6 mb-4 text-gray-300" {...props} />,
  li: (props) => <li className="mb-1" {...props} />,
  code: (props) => {
    if (typeof props.children === 'string' && !props.className?.includes('language-')) {
      return <code className="bg-slate-700 text-pink-300 px-1 py-0.5 rounded" {...props} />
    }
    return <code {...props} />
  },
  pre: (props) => <pre className="bg-slate-800 p-4 rounded mb-4 overflow-x-auto" {...props} />,
  blockquote: (props) => (
    <blockquote 
      className="border-l-4 border-indigo-500 pl-4 italic text-gray-400 my-4" 
      {...props} 
    />
  ),
})

// Компонент загрузки
const MDXLoader: React.FC = () => (
  <div className="flex justify-center items-center py-12">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500" />
  </div>
)

// Компонент ошибки
interface MDXErrorProps {
  error: string
  lessonNumber: number | string
  docFolder: string
}

const MDXError: React.FC<MDXErrorProps> = ({ error, lessonNumber, docFolder }) => (
  <div className="text-red-400 p-4 border border-red-500/30 rounded bg-red-500/10">
    <p className="font-semibold mb-2">Ошибка загрузки контента</p>
    <p className="mb-2">{error}</p>
    <details className="mt-4">
      <summary className="text-sm text-gray-400 cursor-pointer">
        Техническая информация
      </summary>
      <div className="mt-2 text-sm text-gray-400">
        <p>Путь: /src/content/{docFolder}/{lessonNumber}.mdx</p>
        <p>Урок: {lessonNumber}</p>
        <p>Папка: {docFolder}</p>
      </div>
    </details>
  </div>
)

// Основной компонент
const MdxContentLoader: React.FC<MdxContentLoaderProps> = ({ 
  lessonNumber, 
  docFolder = 'JSDOCS',
  components: customComponents,
  onLoadStart,
  onLoadEnd
}) => {
  const [loadingState, setLoadingState] = useState<MdxLoadingState>({
    isLoading: true,
    error: null,
    hasContent: false
  })
  
  const [content, setContent] = useState<string>('')
  const [MdxComponent, setMdxComponent] = useState<React.ComponentType | null>(null)
  
  const mdxComponents = React.useMemo(() => ({
    ...createMDXComponents(),
    ...customComponents
  }), [customComponents])

  useEffect(() => {
    const loadMdxContent = async (): Promise<void> => {
      try {
        setLoadingState(prev => ({ ...prev, isLoading: true, error: null }))
        onLoadStart?.()
        
        // Пути для поиска файла
        const mdxPath = `/src/content/${docFolder}/${lessonNumber}.mdx`
        const fallbackPath = `/${docFolder}/${lessonNumber}.mdx`
        
        try {
          // Пытаемся импортировать MDX как модуль
          const modules = import.meta.glob<DynamicMDXModule>('/src/content/**/*.mdx')
          const moduleLoader = modules[mdxPath]
          
          if (moduleLoader) {
            const imported = await moduleLoader()
            
            if (imported.default) {
              setMdxComponent(() => imported.default)
              setLoadingState({
                isLoading: false,
                error: null,
                hasContent: true
              })
              onLoadEnd?.()
              return
            }
          }
          
          throw new Error('MDX module not found')
          
        } catch (importError) {
          console.warn('MDX import failed, trying as text:', importError)
          
          // Fallback: загружаем как текст
          try {
            const response = await fetch(fallbackPath)
            if (!response.ok) {
              throw new Error(`HTTP ${response.status}: ${response.statusText}`)
            }
            
            const text = await response.text()
            if (!text.trim()) {
              throw new Error('Файл пуст')
            }
            
            setContent(text)
            setMdxComponent(null)
            setLoadingState({
              isLoading: false,
              error: null,
              hasContent: true
            })
            onLoadEnd?.()
            
          } catch (fetchError) {
            throw new Error(
              `Не удалось загрузить файл ${lessonNumber}.mdx из папки ${docFolder}. ` +
              `Проверьте, что файл существует и доступен.`
            )
          }
        }
        
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Неизвестная ошибка при загрузке контента'
        
        console.error('Failed to load MDX content:', err)
        setLoadingState({
          isLoading: false,
          error: errorMessage,
          hasContent: false
        })
        onLoadEnd?.(err instanceof Error ? err : new Error(errorMessage))
      }
    }

    loadMdxContent()
  }, [lessonNumber, docFolder, onLoadStart, onLoadEnd])

  // Состояние загрузки
  if (loadingState.isLoading) {
    return <MDXLoader />
  }

  // Состояние ошибки
  if (loadingState.error) {
    return (
      <MDXError 
        error={loadingState.error}
        lessonNumber={lessonNumber}
        docFolder={docFolder}
      />
    )
  }

  // Рендер MDX компонента
  if (MdxComponent) {
    return (
      <MDXProvider components={mdxComponents}>
        <div className="prose prose-invert max-w-none">
          <Suspense fallback={<MDXLoader />}>
            <MdxComponent />
          </Suspense>
        </div>
      </MDXProvider>
    )
  }

  // Fallback: рендер Markdown
  if (content) {
    return (
      <div className="prose prose-invert max-w-none">
        <ReactMarkdown components={mdxComponents as any}>
          {content}
        </ReactMarkdown>
      </div>
    )
  }

  // Не должно достигаться, но на всякий случай
  return (
    <MDXError 
      error="Нет контента для отображения"
      lessonNumber={lessonNumber}
      docFolder={docFolder}
    />
  )
}

export default MdxContentLoader