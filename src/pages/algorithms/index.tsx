import React from 'react';
import { Link } from 'react-router-dom';

// Импортируем данные алгоритмов и категорий из общего файла данных
import {
  algorithmCategories,
  algorithms,
  getAlgorithmsByCategory,
  getAlgorithmById,
  getRelatedAlgorithms
} from '../../data/algorithms-data';

// Экспортируем эти данные и функции для использования в других файлах
export {
  algorithmCategories,
  algorithms,
  getAlgorithmsByCategory,
  getAlgorithmById,
  getRelatedAlgorithms
};

// По умолчанию экспортируем компонент, который может отображать общую страницу алгоритмов
// Здесь мы использовали бы компонент AlgorithmsPage, но для избежания циклической зависимости
// мы просто перенаправляем на главную страницу алгоритмов
export default function AlgorithmsIndexPage() {
  return (
    <div>
      <Link to="/algorithms">Перейти к странице алгоритмов</Link>
    </div>
  );
}
