import React, { useState, useEffect, useRef, useCallback, useMemo, memo } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Icon } from '@iconify/react';
import { useLocation, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import FPSStats from 'react-fps-stats';
import { useDebouncedCallback } from 'use-debounce';
import * as THREE from 'three';

// Оптимизированный 3D логотип с мемоизацией
const FluidLogo = memo(() => {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<any>(null);
  const frameRef = useRef(0);
  const navigate = useNavigate();

  // Мемоизированные шейдеры для оптимизации
  const shaders = useMemo(() => ({
    vertex: `
      uniform float uTime;
      uniform vec2 uMouse;
      uniform float uHover;
      
      varying vec2 vUv;
      varying vec3 vNormal;

      void main() {
        vUv = uv;
        vNormal = normal;
        vec3 pos = position;
        
        // Упрощенная анимация для лучшей производительности
        float wave = sin(uTime * 2.0 + position.x * 3.0) * 0.1;
        pos += normal * wave * uHover;
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
    fragment: `
      uniform float uTime;
      uniform float uHover;
      
      varying vec2 vUv;
      varying vec3 vNormal;

      void main() {
        // Упрощенное освещение
        vec3 lightDir = normalize(vec3(0.5, 0.5, 1.0));
        float diffuse = max(dot(vNormal, lightDir), 0.0);
        
        // Простой градиент
        vec3 color1 = vec3(0.2, 0.5, 1.0); // Синий
        vec3 color2 = vec3(0.5, 0.2, 1.0); // Фиолетовый
        
        vec3 finalColor = mix(color1, color2, vUv.y + sin(uTime * 0.5) * 0.2);
        finalColor *= (0.8 + diffuse * 0.4);
        
        // Эффект при наведении
        finalColor += vec3(0.2) * uHover;
        
        gl_FragColor = vec4(finalColor, 0.95);
      }
    `
  }), []);

  // Оптимизированная инициализация Three.js
  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const width = 64;
    const height = 64;

    // Инициализация сцены
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: false, // Отключаем для производительности
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Ограничиваем pixel ratio

    // Создаем материал
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
        uHover: { value: 0 }
      },
      vertexShader: shaders.vertex,
      fragmentShader: shaders.fragment,
      transparent: true
    });

    // Уменьшаем количество полигонов для лучшей производительности
    const geometry = new THREE.SphereGeometry(1.8, 32, 32); // Было 64x64
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Сохраняем ссылки
    sceneRef.current = { scene, camera, renderer, mesh, material };

    // Оптимизированная анимация - 30 FPS вместо 60
    let lastTime = 0;
    const targetFPS = 30;
    const frameDelay = 1000 / targetFPS;

    const animate = (currentTime: number) => {
      frameRef.current = requestAnimationFrame(animate);

      // Ограничиваем FPS
      if (currentTime - lastTime < frameDelay) return;
      lastTime = currentTime;

      const { material, mesh, renderer, scene, camera } = sceneRef.current;
      
      material.uniforms.uTime.value = currentTime * 0.001;
      mesh.rotation.y += 0.003;
      mesh.rotation.x += 0.001;
      
      renderer.render(scene, camera);
    };

    frameRef.current = requestAnimationFrame(animate);

    // Очистка
    return () => {
      cancelAnimationFrame(frameRef.current);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [shaders]);

  // Оптимизированные обработчики событий
  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    if (sceneRef.current) {
      gsap.to(sceneRef.current.material.uniforms.uHover, {
        value: 1,
        duration: 0.6,
        ease: "power2.out"
      });
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    if (sceneRef.current) {
      gsap.to(sceneRef.current.material.uniforms.uHover, {
        value: 0,
        duration: 0.6,
        ease: "power2.out"
      });
    }
  }, []);

  const handleClick = useCallback(() => {
    if (sceneRef.current) {
      const { mesh } = sceneRef.current;
      gsap.to(mesh.scale, {
        x: 0.9,
        y: 0.9,
        z: 0.9,
        duration: 0.1,
        onComplete: () => {
          gsap.to(mesh.scale, {
            x: 1,
            y: 1,
            z: 1,
            duration: 0.4,
            ease: "back.out(1.7)"
          });
        }
      });
    }
    navigate('/');
  }, [navigate]);

  return (
    <div
      ref={containerRef}
      className="relative flex items-center justify-center w-16 h-16 cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
      
      {/* Упрощенный эффект свечения */}
      <motion.div
        className="absolute inset-0 rounded-full blur-xl pointer-events-none"
        animate={{
          opacity: isHovered ? 0.6 : 0.3,
          scale: isHovered ? 1.2 : 1
        }}
        transition={{ duration: 0.3 }}
        style={{
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.4) 0%, transparent 70%)'
        }}
      />
    </div>
  );
});

FluidLogo.displayName = 'FluidLogo';

// Мемоизированный NavItem для оптимизации
const NavItem = memo(({ item, isActive, onClick }: any) => {
  const handleClick = useCallback((e: React.MouseEvent) => {
    onClick(item, e);
  }, [item, onClick]);

  return (
    <motion.button
      onClick={handleClick}
      className="relative px-4 py-2 rounded-full group"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className={`absolute inset-0 rounded-full transition-colors duration-300
          ${isActive ? 'bg-gradient-to-r from-blue-600/20 to-purple-600/20' : 'opacity-0 group-hover:opacity-100 bg-slate-700/30'}`}
        layoutId={`nav-bg-${item.name}`}
      />

      {isActive && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600"
          layoutId="activeIndicator"
        />
      )}

      <span className={`relative z-10 flex items-center gap-2 ${isActive ? 'text-white font-medium' : 'text-gray-300 group-hover:text-white transition-colors'}`}>
        <Icon icon={item.icon} className="w-5 h-5" />
        <span>{item.name}</span>
      </span>
    </motion.button>
  );
});

NavItem.displayName = 'NavItem';

// Главный компонент навигации с оптимизациями
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
  const [showFPS, setShowFPS] = useState(false);

  // Дебаунс для оптимизации скролла
  const handleScroll = useDebouncedCallback(() => {
    const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
    const currentScroll = window.scrollY;

    setScrollProgress(totalScroll > 0 ? (currentScroll / totalScroll) : 0);
    setIsScrolled(currentScroll > 50);
  }, 16); // ~60fps

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Показываем FPS только в dev режиме
  useEffect(() => {
    setShowFPS(process.env.NODE_ENV === 'development');
  }, []);

  // Оптимизированный обработчик клика
  const handleNavClick = useCallback((item: any, event: React.MouseEvent) => {
    event.preventDefault();

    if (item.path.startsWith('/#')) {
      const sectionId = item.path.replace('/#', '');

      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const element = document.getElementById(sectionId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      } else {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    } else {
      navigate(item.path);
    }

    setIsMobileMenuOpen(false);
  }, [location.pathname, navigate]);

  // Мемоизированная проверка активности
  const isActive = useCallback((item: any) => {
    if (item.path.startsWith('/#')) {
      return location.pathname === '/' && location.hash === item.path.replace('/', '');
    }
    return location.pathname === item.path;
  }, [location.pathname, location.hash]);

  return (
    <>
      {/* FPS монитор */}
      {showFPS && (
        <FPSStats 
          top="auto" 
          bottom={10} 
          right={10} 
          left="auto"
          graphHeight={50}
          graphWidth={70}
        />
      )}

      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${
          isScrolled
            ? 'border-slate-800/80 backdrop-blur-lg bg-slate-900/80'
            : 'border-slate-800/30 backdrop-blur-md bg-slate-900/50'
        }`}
      >
        {/* Упрощенный фон */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-blue-900/20 to-slate-900/80" />

        <div className="relative px-4 mx-auto max-w-7xl">
          <div className="flex items-center justify-between h-20">
            {/* Логотип */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex-shrink-0"
            >
              <FluidLogo />
            </motion.div>

            {/* Навигация */}
            <motion.div
              className="hidden md:block"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex space-x-1 p-1.5 rounded-full bg-slate-800/50 backdrop-blur-sm border border-slate-700/50">
                {navItems.map((item) => (
                  <NavItem
                    key={item.name}
                    item={item}
                    isActive={isActive(item)}
                    onClick={handleNavClick}
                  />
                ))}
              </div>
            </motion.div>

            {/* Кнопки справа */}
            <div className="flex items-center space-x-3">
              <motion.button
                className="p-2 text-gray-300 transition-colors rounded-full bg-slate-800/80 hover:text-white"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowFPS(!showFPS)}
                title="Toggle FPS"
              >
                <Icon icon="ph:activity-bold" className="w-5 h-5" />
              </motion.button>

              <div className="md:hidden">
                <motion.button
                  className="p-2 text-gray-300 transition-colors rounded-full bg-slate-800/80 hover:text-white"
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  <Icon
                    icon={isMobileMenuOpen ? "ph:x-bold" : "ph:list-bold"}
                    className="w-5 h-5"
                  />
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        {/* Мобильное меню */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden md:hidden"
          >
            <div className="px-4 py-3 space-y-1 bg-slate-800/90 backdrop-blur-lg">
              {navItems.map((item) => (
                <motion.button
                  key={item.name}
                  onClick={(e) => handleNavClick(item, e)}
                  className={`w-full text-left py-3 px-4 rounded-lg flex items-center space-x-3 ${
                    isActive(item)
                      ? 'bg-gradient-to-r from-blue-900/50 to-purple-900/50 text-white'
                      : 'text-gray-300 hover:bg-slate-700/50'
                  }`}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon icon={item.icon} className="w-5 h-5" />
                  <span>{item.name}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Линия прогресса */}
        <motion.div
          className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
          style={{
            width: `${scrollProgress * 100}%`,
            boxShadow: "0 0 10px rgba(139, 92, 246, 0.5)"
          }}
        />
      </motion.nav>
    </>
  );
};

export default TopNav;
