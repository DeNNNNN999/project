import fs from 'fs';
import path from 'path';

// Пути к каталогам JavaScript
const jsSourcePath = './JSDOCS';
const jsTargetPath = './public/JSDOCS';

// Пути к каталогам TypeScript
const tsSourcePath = './TSDOCS';
const tsTargetPath = './public/TSDOCS';

// Пути к каталогам React
const reactSourcePath = './REACTDOCS';
const reactTargetPath = './public/REACTDOCS';

// Функция копирования файлов
function copyFiles(sourcePath, targetPath) {
  // Убедимся, что каталог назначения существует
  if (!fs.existsSync(targetPath)) {
    fs.mkdirSync(targetPath, { recursive: true });
  }

  // Проверяем, существует ли исходный каталог
  if (!fs.existsSync(sourcePath)) {
    console.log(`Исходный каталог ${sourcePath} не найден.`);
    return;
  }

  // Копируем файлы
  const files = fs.readdirSync(sourcePath);

  for (const file of files) {
    const sourceFile = path.join(sourcePath, file);
    const targetFile = path.join(targetPath, file);
    
    // Проверяем, что это файл, не директория
    if (fs.statSync(sourceFile).isFile()) {
      fs.copyFileSync(sourceFile, targetFile);
      console.log(`Copied: ${file} to ${targetPath}`);
    }
  }
}

// Вызываем функцию копирования для JavaScript
copyFiles(jsSourcePath, jsTargetPath);

// Вызываем функцию копирования для TypeScript
copyFiles(tsSourcePath, tsTargetPath);

// Вызываем функцию копирования для React
copyFiles(reactSourcePath, reactTargetPath);

console.log('All MDX files have been copied to public directory!');