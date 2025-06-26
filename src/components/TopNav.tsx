import React, { useState, useEffect, useCallback, useMemo, memo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Icon } from '@iconify/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDebouncedCallback } from 'use-debounce';

// Функция для View Transitions API
const startViewTransition = (callback: () => void) => {
  if (!document.startViewTransition) {
    callback();
    return;
  }
  
  document.startViewTransition(() => {
    callback();
  });
};

// Простой логотип без Three.js
const Logo = memo(() => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = useCallback(() => {
    startViewTransition(() => {
      navigate('/');
    });
  }, [navigate]);

  return (
    <motion.div
      className="relative cursor-pointer"
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-fuchsia-500 via-purple-500 to-violet-600 p-[2px]">
        <div className="w-full h-full rounded-xl bg-black/50 backdrop-blur-sm flex items-center justify-center">
          <span className="text-white font-bold text-lg">D</span>
        </div>
      </div>
      
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-xl bg-gradient-to-br from-fuchsia-500 via-purple-500 to-violet-600 blur-xl"
        animate={{
          opacity: isHovered ? 0.6 : 0.3,
          scale: isHovered ? 1.2 : 1
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
});

Logo.displayName = 'Logo';

const TopNav = () => {
  const navItems = useMemo(() => [
    { name: 'Home', icon: 'ph:house-fill', path: '/#home' },
    { name: 'Projects', icon: 'ph:code-bold', path: '/#projects' },
    { name: 'Skills', icon: 'ph:brain-fill', path: '/#skills' },
    { name: 'Algorithms', icon: 'ph:graph-fill', path: '/algorithms' },
    { name: 'Research', icon: 'ph:book-open-fill', path: '/research' },
    { name: 'Contact', icon: 'ph:envelope-simple-fill', path: '/#contact' }
  ], []);

  const location = useLocation();
  const navigate = useNavigate();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Дебаунс для оптимизации скролла
  const handleScroll = useDebouncedCallback(() => {
    const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
    const currentScroll = window.scrollY;

    setScrollProgress(totalScroll > 0 ? (currentScroll / totalScroll) : 0);
    setIsScrolled(currentScroll > 50);
  }, 16);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const handleNavClick = useCallback((item: any, event: React.MouseEvent) => {
    event.preventDefault();

    if (item.path.startsWith('/#')) {
      const sectionId = item.path.replace('/#', '');

      if (location.pathname !== '/') {
        startViewTransition(() => {
          navigate('/');
          setTimeout(() => {
            const element = document.getElementById(sectionId);
            if (element) {
              element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }, 100);
        });
      } else {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    } else {
      startViewTransition(() => {
        navigate(item.path);
      });
    }

    setIsMobileMenuOpen(false);
  }, [location.pathname, navigate]);

  const isActive = useCallback((item: any) => {
    if (item.path.startsWith('/#')) {
      const sectionId = item.path.replace('/#', '');
      return location.pathname === '/' && location.hash === `#${sectionId}`;
    }
    return location.pathname === item.path;
  }, [location.pathname, location.hash]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-xl transition-all duration-300 ${
        isScrolled
          ? 'bg-black/80 shadow-lg shadow-purple-500/10 border-b border-purple-500/10'
          : 'bg-gradient-to-b from-black/40 to-transparent'
      }`}
      style={{
        viewTransitionName: 'navigation'
      }}
    >
      {/* Градиентная линия сверху */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />

      <div className="relative px-4 mx-auto max-w-7xl">
        <div className="flex items-center justify-between h-16">
          {/* Логотип и название */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center space-x-3"
          >
            <Logo />
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="hidden sm:block"
            >
              <h1 className="text-xl font-bold text-transparent bg-gradient-to-r from-fuchsia-500 via-purple-500 to-violet-500 bg-clip-text">
                DeNNNNN999
              </h1>
            </motion.div>
          </motion.div>

          {/* Десктоп навигация */}
          <motion.div
            className="hidden md:block"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <nav className="flex items-center space-x-1">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.name}
                  onClick={(e) => handleNavClick(item, e)}
                  className={`relative px-4 py-2 rounded-lg font-medium transition-all group ${
                    isActive(item)
                      ? 'text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Фоновая подсветка */}
                  {isActive(item) && (
                    <motion.div
                      layoutId="activeNavBg"
                      className="absolute inset-0 bg-gradient-to-r from-fuchsia-500/10 via-purple-500/10 to-violet-500/10 rounded-lg"
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}

                  <span className="relative z-10 flex items-center gap-2">
                    <Icon icon={item.icon} className="w-4 h-4" />
                    <span className="text-sm">{item.name}</span>
                  </span>

                  {/* Активный индикатор снизу */}
                  {isActive(item) && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-fuchsia-500 via-purple-500 to-violet-500"
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </motion.button>
              ))}
            </nav>
          </motion.div>

          {/* Мобильное меню */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="p-2 text-gray-300 transition-colors rounded-lg md:hidden hover:text-white hover:bg-white/5"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileTap={{ scale: 0.9 }}
          >
            <Icon
              icon={isMobileMenuOpen ? "ph:x-bold" : "ph:list-bold"}
              className="w-6 h-6"
            />
          </motion.button>
        </div>
      </div>

      {/* Прогресс бар */}
      <motion.div
        className="absolute bottom-0 left-0 h-[1px]"
        style={{
          width: `${scrollProgress * 100}%`,
          background: 'linear-gradient(90deg, #ec4899 0%, #8B5CF6 50%, #7c3aed 100%)',
          boxShadow: "0 0 10px rgba(236, 72, 153, 0.4)"
        }}
      />

      {/* Мобильное меню */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/90 backdrop-blur-xl border-t border-purple-800/20"
          >
            <div className="px-4 py-3 space-y-1">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.name}
                  onClick={(e) => handleNavClick(item, e)}
                  className={`w-full text-left py-3 px-4 rounded-lg flex items-center space-x-3 transition-all ${
                    isActive(item)
                      ? 'bg-gradient-to-r from-fuchsia-500/10 to-purple-500/10 text-white'
                      : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon icon={item.icon} className="w-5 h-5" />
                  <span>{item.name}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default TopNav;