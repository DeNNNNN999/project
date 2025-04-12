import React from 'react';

const ORMTasks: React.FC = () => {
  return (
    <section id="tasks" className="p-6 border rounded-lg bg-slate-800/40 border-slate-700/50 mb-6">
      <h2 className="mb-4 text-2xl font-semibold text-indigo-400">Практические Задания</h2>
      
      <div className="text-gray-300">
        <p className="mb-4">
          Для закрепления теоретических знаний предлагаем выполнить следующие практические задания.
          Эти задания позволят лучше понять различия между подходами ORM и выбрать наиболее подходящий
          для конкретных сценариев.
        </p>
        
        <div className="space-y-6">
          <div className="p-4 border border-indigo-500/30 rounded-lg bg-indigo-500/5">
            <h3 className="text-lg font-medium text-indigo-400 mb-2">Задание 1: Сравнение ORM с использованием базового CRUD</h3>
            <p className="mb-2">Реализуйте простую систему управления задачами (todo-list) с несколькими ORM:</p>
            <ul className="list-disc pl-6 mb-2">
              <li>Создайте одинаковые модели (User, Task) в Prisma, TypeORM и MikroORM</li>
              <li>Реализуйте базовые CRUD-операции на каждой ORM</li>
              <li>Сравните количество кода, типобезопасность и удобство использования</li>
              <li>Напишите небольшой отчет о различиях в подходах каждой ORM</li>
            </ul>
          </div>
          
          <div className="p-4 border border-indigo-500/30 rounded-lg bg-indigo-500/5">
            <h3 className="text-lg font-medium text-indigo-400 mb-2">Задание 2: Решение проблемы N+1 запросов</h3>
            <p className="mb-2">Создайте модель блога с комментариями и решите проблему N+1 запросов в разных ORM:</p>
            <ul className="list-disc pl-6 mb-2">
              <li>Создайте модели Post, Comment, User с отношениями</li>
              <li>Напишите запрос, который загружает посты с комментариями и авторами</li>
              <li>Найдите и исправьте проблему N+1 запросов в трех разных ORM</li>
              <li>Сравните подходы к решению проблемы и сгенерированные SQL-запросы</li>
            </ul>
          </div>
          
          <div className="p-4 border border-indigo-500/30 rounded-lg bg-indigo-500/5">
            <h3 className="text-lg font-medium text-indigo-400 mb-2">Задание 3: Управление сложными отношениями</h3>
            <p className="mb-2">Реализуйте систему с полиморфными отношениями и наследованием:</p>
            <ul className="list-disc pl-6 mb-2">
              <li>Создайте модель Content (базовый класс) и наследующие от него Post, Page, Product</li>
              <li>Добавьте модель Comment с полиморфной связью (комментарии могут относиться к любому типу контента)</li>
              <li>Реализуйте теги (Tags) с отношением многие-ко-многим к Content</li>
              <li>Сравните, как разные ORM справляются с такими сложными отношениями</li>
            </ul>
          </div>
          
          <div className="p-4 border border-indigo-500/30 rounded-lg bg-indigo-500/5">
            <h3 className="text-lg font-medium text-indigo-400 mb-2">Задание 4: Транзакции и конкурентный доступ</h3>
            <p className="mb-2">Протестируйте поведение различных ORM при конкурентном доступе:</p>
            <ul className="list-disc pl-6 mb-2">
              <li>Создайте модель UserAccount с балансом (balance)</li>
              <li>Реализуйте функцию перевода средств между аккаунтами с транзакциями</li>
              <li>Создайте скрипт, который имитирует конкурентные переводы между аккаунтами</li>
              <li>Сравните, как разные ORM обрабатывают проблемы конкурентности и изоляции транзакций</li>
            </ul>
          </div>
          
          <div className="p-4 border border-indigo-500/30 rounded-lg bg-indigo-500/5">
            <h3 className="text-lg font-medium text-indigo-400 mb-2">Задание 5: Миграции и эволюция схемы</h3>
            <p className="mb-2">Изучите процесс миграции схемы базы данных в разных ORM:</p>
            <ul className="list-disc pl-6 mb-2">
              <li>Создайте начальную схему данных e-commerce системы (Product, Category, User, Order)</li>
              <li>Реализуйте и примените несколько последовательных миграций:</li>
              <li>Добавьте поля к существующим таблицам</li>
              <li>Создайте новые таблицы с внешними ключами</li>
              <li>Измените типы данных существующих полей</li>
              <li>Сравните, как разные ORM генерируют и применяют миграции, обрабатывают проблемы совместимости</li>
            </ul>
          </div>
          
          <div className="p-4 border border-indigo-500/30 rounded-lg bg-indigo-500/5">
            <h3 className="text-lg font-medium text-indigo-400 mb-2">Задание 6: Производительность и оптимизация</h3>
            <p className="mb-2">Проведите нагрузочное тестирование разных ORM:</p>
            <ul className="list-disc pl-6 mb-2">
              <li>Создайте таблицу с большим количеством данных (100K+ записей)</li>
              <li>Реализуйте одинаковые запросы с фильтрацией, сортировкой и пагинацией на разных ORM</li>
              <li>Проведите нагрузочное тестирование с инструментами вроде autocannon или k6</li>
              <li>Проанализируйте сгенерированные SQL-запросы и их производительность</li>
              <li>Оптимизируйте запросы на каждой ORM и сравните результаты повторных тестов</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ORMTasks;