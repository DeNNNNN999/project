import { readFileSync, writeFileSync, existsSync } from 'fs';
import { resolve } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Функция для создания файла 404.html (для работы маршрутизации на GitHub Pages)
function createNotFoundPage() {
  console.log('Creating 404.html file...');
  const htmlPath = resolve(__dirname, 'dist', 'index.html');
  
  if (existsSync(htmlPath)) {
    const content = readFileSync(htmlPath);
    writeFileSync(resolve(__dirname, 'dist', '404.html'), content);
    console.log('404.html created successfully!');
  } else {
    console.error('Error: Could not find dist/index.html');
  }
}

// Создаем 404.html для правильной работы маршрутизации
createNotFoundPage();

console.log('GitHub Pages fix completed successfully!');