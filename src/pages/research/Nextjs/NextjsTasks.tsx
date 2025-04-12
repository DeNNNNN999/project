import React from 'react';

const NextjsTasks: React.FC = () => {
  return (
    <section id="tasks" className="p-6 border rounded-lg bg-slate-800/40 border-slate-700/50 mb-6">
      <h2 className="mb-4 text-2xl font-semibold text-indigo-400">Практические Задания</h2>
      
      <div className="text-gray-300">
        <p className="mb-4">
          Для закрепления теоретических знаний предлагаем выполнить следующие практические задания.
          Они постепенно усложняются и охватывают различные аспекты разработки с Next.js.
        </p>
        
        <div className="space-y-6">
          <div className="p-4 border border-indigo-500/30 rounded-lg bg-indigo-500/5">
            <h3 className="text-lg font-medium text-indigo-400 mb-2">Задание 1: Миграция React SPA в Next.js</h3>
            <p className="mb-2">Возьмите простое React SPA-приложение (например, To-Do список) и мигрируйте его в Next.js:</p>
            <ul className="list-disc pl-6 mb-2">
              <li>Настройте Pages Router</li>
              <li>Преобразуйте компоненты React для работы с Next.js</li>
              <li>Реализуйте навигацию с использованием Link</li>
              <li>Добавьте базовые метаданные с использованием Head</li>
            </ul>
          </div>
          
          <div className="p-4 border border-indigo-500/30 rounded-lg bg-indigo-500/5">
            <h3 className="text-lg font-medium text-indigo-400 mb-2">Задание 2: Реализация блога с SSG и ISR</h3>
            <p className="mb-2">Создайте простой блог с использованием Next.js и Pages Router:</p>
            <ul className="list-disc pl-6 mb-2">
              <li>Используйте getStaticProps для получения списка постов</li>
              <li>Реализуйте динамические страницы постов с getStaticProps и getStaticPaths</li>
              <li>Добавьте Incremental Static Regeneration для обновления контента</li>
              <li>Создайте API Route для добавления комментариев к постам</li>
            </ul>
          </div>
          
          <div className="p-4 border border-indigo-500/30 rounded-lg bg-indigo-500/5">
            <h3 className="text-lg font-medium text-indigo-400 mb-2">Задание 3: E-commerce с App Router</h3>
            <p className="mb-2">Разработайте прототип интернет-магазина с использованием App Router:</p>
            <ul className="list-disc pl-6 mb-2">
              <li>Создайте структуру с вложенными лэйаутами</li>
              <li>Используйте Server Components для каталога продуктов</li>
              <li>Реализуйте Client Components для корзины и форм</li>
              <li>Настройте кэширование данных с разными стратегиями для разных типов данных</li>
              <li>Добавьте перехватывающие роуты (intercepting routes) для модальных окон деталей товара</li>
            </ul>
          </div>
          
          <div className="p-4 border border-indigo-500/30 rounded-lg bg-indigo-500/5">
            <h3 className="text-lg font-medium text-indigo-400 mb-2">Задание 4: Аутентификация и приватные маршруты</h3>
            <p className="mb-2">Реализуйте систему аутентификации с защищенными маршрутами:</p>
            <ul className="list-disc pl-6 mb-2">
              <li>Настройте аутентификацию с использованием NextAuth.js или авторских решений</li>
              <li>Создайте защищенные маршруты с использованием Middleware</li>
              <li>Реализуйте страницы входа/регистрации с Server Actions для обработки форм</li>
              <li>Добавьте управление сессиями и профилем пользователя</li>
            </ul>
          </div>
          
          <div className="p-4 border border-indigo-500/30 rounded-lg bg-indigo-500/5">
            <h3 className="text-lg font-medium text-indigo-400 mb-2">Задание 5: Оптимизация и продвинутые функции</h3>
            <p className="mb-2">Усовершенствуйте существующий Next.js проект с акцентом на производительность:</p>
            <ul className="list-disc pl-6 mb-2">
              <li>Оптимизируйте изображения с next/image, включая генерацию и настройку placeholder</li>
              <li>Настройте загрузку шрифтов с next/font с учетом производительности</li>
              <li>Реализуйте динамический импорт компонентов и страниц</li>
              <li>Добавьте поддержку интернационализации (i18n)</li>
              <li>Настройте Streaming SSR для предварительной отправки части страницы</li>
              <li>Реализуйте поддержку PWA с использованием next-pwa</li>
            </ul>
          </div>
          
          <div className="p-4 border border-indigo-500/30 rounded-lg bg-indigo-500/5">
            <h3 className="text-lg font-medium text-indigo-400 mb-2">Задание 6: Полноценное Full-Stack приложение</h3>
            <p className="mb-2">Создайте полноценное приложение, интегрирующее все аспекты Next.js:</p>
            <ul className="list-disc pl-6 mb-2">
              <li>Интеграция с базой данных (например, Prisma с PostgreSQL или MongoDB)</li>
              <li>Реализация сложных форм с валидацией и обработкой через Server Actions</li>
              <li>Настройка системы уведомлений в реальном времени</li>
              <li>Интеграция аналитики и мониторинга производительности</li>
              <li>Настройка CI/CD с автоматическим развертыванием</li>
              <li>Реализация Unit и E2E тестирования</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NextjsTasks;