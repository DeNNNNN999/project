# 📹 Инструкция по добавлению видео проектов

## Как добавить видео для проектов:

1. **Подготовь видео:**
   - Формат: MP4 (H.264 кодек для лучшей совместимости)
   - Размер: 1920x1080 или 1280x720
   - Длительность: 10-30 секунд (чтобы не нагружать сайт)
   - Размер файла: до 10MB на видео

2. **Оптимизация видео (рекомендуется):**
   ```bash
   # Используй FFmpeg для сжатия:
   ffmpeg -i input.mp4 -c:v libx264 -crf 23 -preset medium -c:a aac -b:a 128k output.mp4
   ```

3. **Создай превью (poster) для каждого видео:**
   - Формат: JPG
   - Размер: такой же как у видео
   - Это будет показываться пока видео загружается

4. **Названия файлов:**
   - Видео: `project-1.mp4`, `project-2.mp4`, и т.д.
   - Превью: `project-1-poster.jpg`, `project-2-poster.jpg`, и т.д.

5. **Размести файлы:**
   - Положи все видео и превью в эту папку: `/public/videos/`

## Структура файлов:
```
public/
  videos/
    project-1.mp4
    project-1-poster.jpg
    project-2.mp4
    project-2-poster.jpg
    project-3.mp4
    project-3-poster.jpg
    project-4.mp4
    project-4-poster.jpg
    project-5.mp4
    project-5-poster.jpg
    project-6.mp4
    project-6-poster.jpg
```

## Обновление данных проектов:

Открой файл `src/components/ProjectsSection.tsx` и измени массив `projects`:

```typescript
const projects: Project[] = [
  {
    title: 'Название твоего проекта',
    description: 'Описание проекта',
    icon: 'ph:icon-name', // Иконка из Phosphor Icons
    videoUrl: '/videos/project-1.mp4',
    posterUrl: '/videos/project-1-poster.jpg',
    demoUrl: 'https://ссылка-на-демо.com',
    githubUrl: 'https://github.com/твой-юзернейм/репозиторий',
    color: '#3B82F6', // Цвет акцента
    technologies: ['React', 'Node.js', 'MongoDB'] // Технологии
  },
  // ... остальные 5 проектов
]
```

## Советы:

- Видео автоматически воспроизводится при наведении
- Используй короткие демо-ролики, показывающие ключевые функции
- Оптимизируй размер файлов для быстрой загрузки
- Проверь, что видео работает в разных браузерах

## Иконки:
Найди подходящие иконки на https://icones.js.org/collection/ph
