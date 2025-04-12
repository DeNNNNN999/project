import React from 'react'
import ReactDOM from 'react-dom/client'
// 1. Импортируем HashRouter вместо BrowserRouter
import { HashRouter as Router } from 'react-router-dom'
import App from './App' // Твой основной компонент приложения
import './index.css' // Основные стили

// Находим корневой элемент
const rootElement = document.getElementById('root')

// Проверяем, что элемент найден (хорошая практика)
if (!rootElement) {
  throw new Error("Failed to find the root element with id 'root'")
}

// Создаем корень React 18+
const root = ReactDOM.createRoot(rootElement)

// Рендерим приложение
root.render(
  <React.StrictMode>
    {/* 2. Используем Router */}
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
)
