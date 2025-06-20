import React, { useState, useEffect, useRef, useCallback, useMemo, memo } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'motion/react';
import { Icon } from '@iconify/react';
import { useLocation, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import SimpleFPSCounter from './SimpleFPSCounter';
import { useDebouncedCallback } from 'use-debounce';
import * as THREE from 'three';


const LiquidMetalLogo = memo(() => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<any>(null);
  const frameRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const shaders = useMemo(() => ({
    vertex: `
      uniform float uTime;
      uniform vec2 uMouse;
      uniform float uHover;
      uniform float uClick;

      varying vec2 vUv;
      varying vec3 vPosition;
      varying vec3 vNormal;
      varying float vDistortion;

      void main() {
        vUv = uv;
        vNormal = normalize(normalMatrix * normal);
        vPosition = position;

        vec3 pos = position;

        float distortion = sin(uTime * 2.0 + position.x * 5.0) * cos(uTime * 1.5 + position.y * 5.0) * 0.15;
        vec2 mouseEffect = (uMouse - 0.5) * 2.0;
        distortion += length(mouseEffect) * 0.1 * uHover;
        float breathing = sin(uTime * 1.5) * 0.05;

        pos += normal * (distortion + breathing) * (0.8 + uHover * 0.5);
        pos *= 1.0 + uClick * 0.1 * sin(uTime * 20.0);

        vDistortion = distortion;

        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
    fragment: `
      uniform float uTime;
      uniform float uHover;
      uniform vec2 uMouse;

      varying vec2 vUv;
      varying vec3 vPosition;
      varying vec3 vNormal;
      varying float vDistortion;

      void main() {
        vec3 color1 = vec3(0.7, 0.7, 0.9);
        vec3 color2 = vec3(0.2, 0.3, 0.6);
        vec3 color3 = vec3(0.9, 0.9, 1.0);

        vec3 lightPos = vec3(5.0, 5.0, 5.0);
        vec3 lightDir = normalize(lightPos - vPosition);
        float diff = max(dot(vNormal, lightDir), 0.0);

        vec3 viewDir = normalize(cameraPosition - vPosition);
        float fresnel = pow(1.0 - dot(viewDir, vNormal), 2.0);

        vec3 reflectDir = reflect(-lightDir, vNormal);
        float spec = pow(max(dot(viewDir, reflectDir), 0.0), 32.0);

        float gradientShift = sin(uTime * 0.5 + vUv.y * 3.0) * 0.3;
        vec3 baseColor = mix(color2, color1, vUv.y + gradientShift);

        baseColor = mix(baseColor, color3, fresnel * 0.6);
        baseColor += spec * color3 * 1.5;

        float rainbow = sin(vPosition.x * 10.0 + uTime) * 0.1;
        baseColor.r += rainbow * 0.2;
        baseColor.b -= rainbow * 0.1;

        baseColor *= 1.0 + uHover * 0.3;
        baseColor += vec3(abs(vDistortion) * 2.0) * uHover;

        gl_FragColor = vec4(baseColor, 0.95);
      }
    `
  }), []);

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const width = 40;
    const height = 40;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
    camera.position.z = 4;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
        uHover: { value: 0 },
        uClick: { value: 0 }
      },
      vertexShader: shaders.vertex,
      fragmentShader: shaders.fragment,
      transparent: true
    });

    const geometry = new THREE.SphereGeometry(1.5, 32, 32);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    sceneRef.current = { scene, camera, renderer, mesh, material };

    const animate = (time: number) => {
      frameRef.current = requestAnimationFrame(animate);

      const { material, mesh, renderer, scene, camera } = sceneRef.current;

      material.uniforms.uTime.value = time * 0.001;
      mesh.rotation.y += 0.005;
      mesh.rotation.x = Math.sin(time * 0.0005) * 0.1;

      renderer.render(scene, camera);
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameRef.current);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [shaders]);

  const handleClick = useCallback(() => {
    if (sceneRef.current) {
      gsap.to(sceneRef.current.material.uniforms.uClick, {
        value: 1,
        duration: 0.1,
        onComplete: () => {
          gsap.to(sceneRef.current.material.uniforms.uClick, {
            value: 0,
            duration: 0.6,
            ease: "elastic.out(1, 0.3)"
          });
        }
      });
    }
    navigate('/');
  }, [navigate]);

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

  return (
    <div
      ref={containerRef}
      className="relative flex items-center justify-center w-10 h-10 cursor-pointer"
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />

      {/* Свечение */}
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

LiquidMetalLogo.displayName = 'LiquidMetalLogo';

// Классический навбар
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
  const [showFPS, setShowFPS] = useState(true);

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

  const isActive = useCallback((item: any) => {
    if (item.path.startsWith('/#')) {
      const sectionId = item.path.replace('/#', '');
      return location.pathname === '/' && location.hash === `#${sectionId}`;
    }
    return location.pathname === item.path;
  }, [location.pathname, location.hash]);

  return (
    <>
      {showFPS && <SimpleFPSCounter />}

      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-xl transition-all duration-300 ${
          isScrolled
            ? 'bg-black/80 shadow-lg shadow-purple-500/20 border-b border-purple-500/20'
            : 'bg-gradient-to-b from-black/60 to-transparent'
        }`}
      >
        {/* Градиентная линия сверху */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-fuchsia-500/50 to-transparent" />

        <div className="relative px-4 mx-auto max-w-7xl">
          <div className="flex items-center justify-between h-16">
            {/* Логотип и название */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center space-x-3"
            >
              <LiquidMetalLogo />
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="hidden sm:block"
              >
                <h1 className="text-xl font-bold text-transparent bg-gradient-to-r from-fuchsia-500 via-purple-500 to-violet-500 bg-clip-text animate-gradient-text">
                  DeNNNNN999
                </h1>
                <p className="text-xs text-gray-400"></p>
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
                        className="absolute inset-0 bg-gradient-to-r from-fuchsia-600/20 via-purple-600/20 to-violet-600/20 rounded-lg"
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}

                    {/* Hover эффект */}
                    <div className="absolute inset-0 bg-white/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />

                    <span className="relative z-10 flex items-center gap-2">
                      <Icon icon={item.icon} className="w-5 h-5" />
                      <span>{item.name}</span>
                    </span>

                    {/* Активный индикатор снизу */}
                    {isActive(item) && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-fuchsia-500 via-purple-500 to-violet-500"
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                  </motion.button>
                ))}
              </nav>
            </motion.div>

            {/* Правая часть */}
            <div className="flex items-center space-x-3">
              {/* FPS Toggle */}
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/5"
                onClick={() => setShowFPS(!showFPS)}
                title="Toggle FPS"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Icon icon="ph:activity-bold" className="w-5 h-5" />
              </motion.button>

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
        </div>

        {/* Прогресс бар */}
        <motion.div
          className="absolute bottom-0 left-0 h-[2px]"
          style={{
            width: `${scrollProgress * 100}%`,
            background: 'linear-gradient(90deg, #d026ff 0%, #8B5CF6 50%, #7c3aed 100%)',
            boxShadow: "0 0 20px rgba(208, 38, 255, 0.6), 0 0 40px rgba(139, 92, 246, 0.4)"
          }}
        />

        {/* Мобильное меню */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-black/90 backdrop-blur-xl border-t border-purple-800/30"
            >
              <div className="px-4 py-3 space-y-1">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.name}
                    onClick={(e) => handleNavClick(item, e)}
                    className={`w-full text-left py-3 px-4 rounded-lg flex items-center space-x-3 transition-all ${
                      isActive(item)
                        ? 'bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-white'
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
    </>
  );
};

export default TopNav;
