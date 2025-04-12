
import { motion } from 'motion/react';
import EndpointLogo from './EndpointLogo';
import { useEffect } from 'react';

const navigationLinks = [
  { name: 'Home', href: '#home' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Contact', href: '#contact' }
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Добавляем защиту от копирования
  useEffect(() => {
    const preventCopy = (e: MouseEvent) => {
      // Предотвращаем контекстное меню
      e.preventDefault();
      return false;
    };
    
    const preventSelection = () => {
      return false;
    };
    
    const preventCopyKeyboard = (e: KeyboardEvent) => {
      // Блокируем Ctrl+C, Ctrl+X, Ctrl+V
      if ((e.ctrlKey || e.metaKey) && (e.key === 'c' || e.key === 'x' || e.key === 'v' || e.key === 's')) {
        e.preventDefault();
        return false;
      }
      return true;
    };

    document.addEventListener('contextmenu', preventCopy);
    document.addEventListener('selectstart', preventSelection as any);
    document.addEventListener('keydown', preventCopyKeyboard);

    return () => {
      document.removeEventListener('contextmenu', preventCopy);
      document.removeEventListener('selectstart', preventSelection as any);
      document.removeEventListener('keydown', preventCopyKeyboard);
    };
  }, []);

  return (
    <footer className="relative bg-[#0B1120] py-8 overflow-hidden">
      {/* Градиентная линия сверху */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />

      {/* Фоновые эффекты */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900/50" />
      <div className="absolute inset-0 bg-grid opacity-[0.01]" />

      <div className="relative z-10 px-4 mx-auto max-w-7xl">
        <div className="flex flex-col items-center justify-center gap-6">
          {/* Финальный логотип */}
          <div className="mb-4">
            <EndpointLogo />
          </div>

          {/* Навигация */}
          <div className="flex flex-wrap justify-center text-sm text-gray-400 gap-x-8 gap-y-2">
            {navigationLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                whileHover={{ color: '#60A5FA' }}
                className="transition-colors duration-300"
              >
                {link.name}
              </motion.a>
            ))}
          </div>

          {/* Copyright */}
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>© {currentYear}</span>
            <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
              Portfolio
            </span>
            <span>•</span>
            <span>All rights reserved</span>
            <span>•</span>
            <a 
              href="#license"
              className="hover:text-blue-400 transition-colors"
              onClick={(e) => {
                e.preventDefault();
                alert('© 2025 DeNNNNN999 - All Rights Reserved. Все права защищены. Любое копирование, распространение или использование без разрешения запрещено.');
              }}
            >
              License
            </a>
          </div>

          {/* Защита интеллектуальной собственности */}
          <div className="text-xs text-gray-600 text-center max-w-md mt-2">
            Весь контент этого портфолио защищен авторским правом. Копирование, 
            распространение или использование материалов без прямого письменного 
            разрешения автора строго запрещено.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
