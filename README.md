# 🚀 Full-Stack Developer Portfolio

[![Deploy to GitHub Pages](https://github.com/DeNNNNN999/project/actions/workflows/deploy.yml/badge.svg)](https://github.com/DeNNNNN999/project/actions/workflows/deploy.yml)
[![React](https://img.shields.io/badge/React-19.0.0-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7.2-blue.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

Интерактивное портфолио Full-Stack разработчика с 3D визуализациями и демонстрацией алгоритмов.

🌐 **[Посмотреть демо](https://DeNNNNN999.github.io/project)**

## ✨ Особенности

- 🎨 **Современный дизайн** с анимациями Framer Motion
- 🎮 **3D визуализации** алгоритмов с Three.js
- 📱 **Адаптивный дизайн** для всех устройств
- ⚡ **Оптимизированная производительность** с Vite
- 🔍 **SEO оптимизация** и доступность
- 🎯 **TypeScript** для типобезопасности

## 🛠️ Технологический стек

### Frontend
- **React 19** - UI библиотека
- **TypeScript** - Типизация
- **Three.js + React Three Fiber** - 3D графика
- **Framer Motion** - Анимации
- **Tailwind CSS** - Стилизация
- **Vite** - Сборщик

### Инструменты
- **ESLint** - Линтинг кода
- **GitHub Pages** - Хостинг
- **GitHub Actions** - CI/CD

## 🚀 Быстрый старт

### Требования
- Node.js 18+
- npm или yarn

### Установка

```bash
# Клонируйте репозиторий
git clone https://github.com/DeNNNNN999/project.git

# Перейдите в папку проекта
cd project

# Установите зависимости
npm install

# Запустите dev сервер
npm run dev
```

### Доступные команды

```bash
npm run dev      # Запуск dev сервера на localhost:3000
npm run build    # Сборка для продакшена
npm run preview  # Просмотр собранной версии
npm run deploy   # Деплой на GitHub Pages
npm run lint     # Проверка кода линтером
```

## 📂 Структура проекта

```
project/
├── src/
│   ├── components/      # React компоненты
│   ├── pages/          # Страницы приложения
│   ├── assets/         # Изображения и медиа
│   ├── animations/     # Анимации и 3D сцены
│   ├── data/          # Данные и константы
│   └── styles/        # Глобальные стили
├── public/            # Статические файлы
├── .github/           # GitHub Actions workflows
└── vite.config.ts     # Конфигурация Vite
```

## 📸 Скриншоты

![Hero Section](./public/screenshots/hero.png)
![Projects Section](./public/screenshots/projects.png)
![Skills Section](./public/screenshots/skills.png)

## 🎯 Функциональность

- **Интерактивные 3D визуализации** алгоритмов сортировки
- **Анимированные секции** с плавными переходами
- **Фильтрация навыков** по категориям
- **Режимы отображения** (сетка, список, облако)
- **Видео демонстрации** проектов
- **Контактная форма** с валидацией

## 🔧 Конфигурация

### Настройка базового URL

В `vite.config.ts`:
```typescript
export default defineConfig({
  base: '/project/', // Измените на название вашего репозитория
  // ...
})
```

### Настройка GitHub Pages

В `package.json`:
```json
{
  "homepage": "https://DeNNNNN999.github.io/project",
  // ...
}
```

## 🤝 Вклад в проект

Приветствуются pull requests. Для больших изменений, пожалуйста, откройте issue для обсуждения.

1. Fork проекта
2. Создайте feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit изменения (`git commit -m 'Add some AmazingFeature'`)
4. Push в branch (`git push origin feature/AmazingFeature`)
5. Откройте Pull Request

## 📝 Лицензия

Распространяется под лицензией MIT. См. `LICENSE` для подробностей.

## 📧 Контакты

- GitHub: [@DeNNNNN999](https://github.com/DeNNNNN999)
- LeetCode: [DeNN999](https://leetcode.com/u/DeNN999/)
- CodeWars: [DeNNxD](https://www.codewars.com/users/DeNNxD)

---

⭐ Если вам понравился проект, поставьте звезду на GitHub!
