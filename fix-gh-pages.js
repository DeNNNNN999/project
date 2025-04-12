// Скрипт для исправления путей после сборки для GitHub Pages
const fs = require('fs');
const path = require('path');

// Функция для создания файла 404.html (для работы маршрутизации на GitHub Pages)
function createNotFoundPage() {
  console.log('Creating 404.html file...');
  const htmlPath = path.resolve(__dirname, 'dist', 'index.html');
  
  if (fs.existsSync(htmlPath)) {
    const content = fs.readFileSync(htmlPath);
    fs.writeFileSync(path.resolve(__dirname, 'dist', '404.html'), content);
    console.log('404.html created successfully!');
  } else {
    console.error('Error: Could not find dist/index.html');
  }
}

// Создаем 404.html для правильной работы маршрутизации
createNotFoundPage();

console.log('GitHub Pages fix completed successfully!');