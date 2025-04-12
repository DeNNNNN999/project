import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

try {
  const indexPath = path.join(__dirname, 'dist', 'index.html');
  const notFoundPath = path.join(__dirname, 'dist', '404.html');
  
  if (fs.existsSync(indexPath)) {
    fs.copyFileSync(indexPath, notFoundPath);
    console.log('Successfully created 404.html');
  } else {
    console.error('dist/index.html not found');
  }
} catch (error) {
  console.error('Error:', error);
}