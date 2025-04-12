import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Icon } from '@iconify/react';
import { useLocation, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import SnakeLogo from './SnakeLogo';
import * as THREE from 'three'

// Жидкий WebGL логотип с реактивными шейдерами
const FluidLogo = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const timeRef = useRef(0);
  const navigate = useNavigate();

  // Vertex shader для жидкой анимации
  const vertexShader = `
    uniform float uTime;
    uniform vec2 uMouse;
    uniform float uHover;
    uniform float uClick;

    varying vec2 vUv;
    varying vec3 vNormal;

    // Simplex noise для создания волн
    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
    vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

    float snoise(vec3 v) {
      const vec2 C = vec2(1.0/6.0, 1.0/3.0);
      const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

      // Находим ближайшую точку в решетке
      vec3 i = floor(v + dot(v, C.yyy));
      vec3 x0 = v - i + dot(i, C.xxx);

      // Находим ближайший из четырех тетраэдров
      vec3 g = step(x0.yzx, x0.xyz);
      vec3 l = 1.0 - g;
      vec3 i1 = min(g.xyz, l.zxy);
      vec3 i2 = max(g.xyz, l.zxy);

      vec3 x1 = x0 - i1 + C.xxx;
      vec3 x2 = x0 - i2 + C.yyy;
      vec3 x3 = x0 - D.yyy;

      // Вычисляем градиенты
      i = mod289(i);
      vec4 p = permute(permute(permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));

      // Градиенты из 7x7x7 точек
      float n_ = 0.142857142857;
      vec3 ns = n_ * D.wyz - D.xzx;

      vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

      vec4 x_ = floor(j * ns.z);
      vec4 y_ = floor(j - 7.0 * x_);

      vec4 x = x_ * ns.x + ns.yyyy;
      vec4 y = y_ * ns.x + ns.yyyy;
      vec4 h = 1.0 - abs(x) - abs(y);

      vec4 b0 = vec4(x.xy, y.xy);
      vec4 b1 = vec4(x.zw, y.zw);

      vec4 s0 = floor(b0) * 2.0 + 1.0;
      vec4 s1 = floor(b1) * 2.0 + 1.0;
      vec4 sh = -step(h, vec4(0.0));

      vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
      vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

      vec3 p0 = vec3(a0.xy, h.x);
      vec3 p1 = vec3(a0.zw, h.y);
      vec3 p2 = vec3(a1.xy, h.z);
      vec3 p3 = vec3(a1.zw, h.w);

      // Нормализуем градиенты
      vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
      p0 *= norm.x;
      p1 *= norm.y;
      p2 *= norm.z;
      p3 *= norm.w;

      // Смешиваем шумы
      vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
      m = m * m;
      return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
    }

    void main() {
      vUv = uv;
      vNormal = normal;

      // Создаем жидкую деформацию
      vec3 pos = position;

      // Базовый шум для органической формы
      float noise = snoise(vec3(pos.x * 2.0, pos.y * 2.0, uTime * 0.1)) * 0.15;

      // Добавляем волновой эффект от движения мыши
      float mouseIntensity = 0.0;
      if (uHover > 0.0) {
        vec2 dir = vUv - uMouse;
        float dist = length(dir);
        mouseIntensity = (1.0 - smoothstep(0.0, 0.6, dist)) * uHover * 0.4;
      }

      // Пульсация при клике
      float clickIntensity = uClick * sin(uTime * 10.0) * 0.1 * (1.0 - smoothstep(0.0, 1.0, uTime - floor(uTime)));

      // Применяем деформацию вдоль нормали
      pos += normal * (noise + mouseIntensity + clickIntensity) * 0.5;

      // Проекция и позиционирование
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;

  // Fragment shader для цветов и эффектов
  const fragmentShader = `
    uniform float uTime;
    uniform vec2 uMouse;
    uniform float uHover;
    uniform float uClick;

    varying vec2 vUv;
    varying vec3 vNormal;

    // HSL в RGB конвертер для контроля цветовой гаммы
    vec3 hsl2rgb(vec3 c) {
      vec3 rgb = clamp(abs(mod(c.x * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
      return c.z + c.y * (rgb - 0.5) * (1.0 - abs(2.0 * c.z - 1.0));
    }

    void main() {
      // Вектор направления к источнику света (можно динамически изменять)
      vec3 lightDir = normalize(vec3(0.5, 0.5, 1.0));

      // Вычисляем базовое освещение по модели Фонга
      float diffuse = max(dot(vNormal, lightDir), 0.0);

      // Вычисляем отражение
      vec3 reflectDir = reflect(-lightDir, vNormal);
      vec3 viewDir = normalize(vec3(0.0, 0.0, 1.0));
      float specular = pow(max(dot(reflectDir, viewDir), 0.0), 32.0);

      // Градиент цвета в зависимости от времени и положения
      float hue = mod(uTime * 0.05 + vUv.x * 0.2 + vUv.y * 0.1, 1.0);

      // Базовый градиент от голубого к фиолетовому
      vec3 baseColor = hsl2rgb(vec3(
        0.6 + sin(uTime * 0.1) * 0.1,  // Базовый оттенок синий-фиолетовый
        0.7,                          // Насыщенность
        0.5 + diffuse * 0.3           // Светлота зависит от освещения
      ));

      // Добавляем блики при наведении
      vec3 hoverColor = hsl2rgb(vec3(
        0.8,                          // Сдвигаем к фиолетовым оттенкам при наведении
        0.8,                          // Увеличиваем насыщенность
        0.6                           // Увеличиваем светлоту
      ));

      // Добавляем свечение от курсора
      vec2 mousePos = uMouse;
      float mouseDist = length(vUv - mousePos);
      float mouseGlow = 1.0 - smoothstep(0.0, 0.4, mouseDist);

      // Объединяем все эффекты
      vec3 finalColor = mix(baseColor, hoverColor, uHover * 0.6);

      // Добавляем блики
      finalColor += specular * 0.4 * (1.0 + uHover);

      // Добавляем свечение от курсора
      finalColor += hsl2rgb(vec3(0.7, 1.0, 0.6)) * mouseGlow * uHover * 0.6;

      // Пульсация при клике
      if (uClick > 0.01) {
        float pulse = sin(uTime * 15.0) * 0.5 + 0.5;
        finalColor = mix(finalColor, vec3(1.0, 1.0, 1.0), pulse * uClick * 0.3);
      }

      // Финальная прозрачность - делаем края немного прозрачными
      float alpha = 0.95;
      float edgeSoftness = 0.05;
      float distFromCenter = length(vUv - vec2(0.5));
      alpha *= 1.0 - smoothstep(0.4 - edgeSoftness, 0.5, distFromCenter);

      gl_FragColor = vec4(finalColor, alpha);
    }
  `;

  // Инициализируем Three.js сцену при монтировании компонента
  useEffect(() => {
    if (!containerRef.current) return;

    // Настройка контейнера и размеров
    const container = containerRef.current;
    const width = 64;
    const height = 64;

    // Инициализация Three.js
    const scene = new THREE.Scene();

    // Камера
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 2000);
    camera.position.z = 5;

    // Рендерер
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      canvas: canvasRef.current
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Создаем материал с шейдерами
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
        uHover: { value: 0 },
        uClick: { value: 0 }
      },
      vertexShader,
      fragmentShader,
      transparent: true,
      side: THREE.DoubleSide
    });

    // Создаем геометрию логотипа (сфера с деформациями для органического эффекта)
    const geometry = new THREE.SphereGeometry(1.8, 64, 64);

    // Создаем меш
    const fluidBall = new THREE.Mesh(geometry, material);
    scene.add(fluidBall);

    // Добавляем вращение
    fluidBall.rotation.x = 0.2;
    fluidBall.rotation.y = 0.3;

    // Функция анимации
    const animate = () => {
      const animationId = requestAnimationFrame(animate);

      // Обновляем время для шейдера
      timeRef.current += 0.01;
      material.uniforms.uTime.value = timeRef.current;

      // Плавное вращение
      fluidBall.rotation.y += 0.003;
      fluidBall.rotation.x += 0.001;

      // Рендер сцены
      renderer.render(scene, camera);
    };

    // Запуск анимации
    animate();

    // Плавно активируем интерактивность при наведении
    const updateHoverState = (hovered) => {
      gsap.to(material.uniforms.uHover, {
        value: hovered ? 1.0 : 0.0,
        duration: 0.8,
        ease: "power2.out"
      });
    };

    // Обработка кликов с анимацией
    const handleClick = () => {
      // Создаем эффект клика в шейдере
      gsap.to(material.uniforms.uClick, {
        value: 1.0,
        duration: 0.1,
        onComplete: () => {
          gsap.to(material.uniforms.uClick, {
            value: 0.0,
            duration: 0.5
          });
        }
      });

      // Также добавляем физическую анимацию сжатия
      gsap.to(fluidBall.scale, {
        x: 0.9,
        y: 0.9,
        z: 0.9,
        duration: 0.1,
        onComplete: () => {
          gsap.to(fluidBall.scale, {
            x: 1,
            y: 1,
            z: 1,
            duration: 0.5,
            ease: "elastic.out(1, 0.3)"
          });
        }
      });

      // Навигация на главную страницу
      navigate('/');
    };

    // Обновление позиции мыши для шейдера
    const updateMousePosition = (e) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1.0 - (e.clientY - rect.top) / rect.height;

      gsap.to(material.uniforms.uMouse.value, {
        x,
        y,
        duration: 0.5,
        ease: "power2.out"
      });

      setMousePosition({ x, y });
    };

    // Добавляем слушатели событий
    container.addEventListener('mouseenter', () => {
      setIsHovered(true);
      updateHoverState(true);
    });

    container.addEventListener('mouseleave', () => {
      setIsHovered(false);
      updateHoverState(false);
    });

    container.addEventListener('mousemove', updateMousePosition);

    container.addEventListener('mousedown', () => {
      setIsClicked(true);
      handleClick();
    });

    container.addEventListener('mouseup', () => {
      setIsClicked(false);
    });

    // Очистка при размонтировании
    return () => {
      cancelAnimationFrame(animate);
      container.removeEventListener('mouseenter', () => updateHoverState(true));
      container.removeEventListener('mouseleave', () => updateHoverState(false));
      container.removeEventListener('mousemove', updateMousePosition);
      container.removeEventListener('mousedown', () => setIsClicked(true));
      container.removeEventListener('mouseup', () => setIsClicked(false));
    };
  }, [navigate]);

  return (
    <div
      ref={containerRef}
      className="relative flex items-center justify-center w-16 h-16 cursor-pointer"
    >
      {/* Canvas для Three.js */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />

      {/* Световые эффекты вокруг логотипа */}
      <motion.div
        className="absolute inset-0 rounded-full blur-2xl"
        animate={{
          background: isHovered
            ? [
                'radial-gradient(circle, rgba(99, 102, 241, 0.4) 0%, rgba(0, 0, 0, 0) 70%)',
                'radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, rgba(0, 0, 0, 0) 70%)',
                'radial-gradient(circle, rgba(79, 70, 229, 0.4) 0%, rgba(0, 0, 0, 0) 70%)'
              ]
            : 'radial-gradient(circle, rgba(99, 102, 241, 0.2) 0%, rgba(0, 0, 0, 0) 70%)',
          scale: isHovered ? [1, 1.2, 1.1] : 1
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse"
        }}
        style={{ pointerEvents: "none" }}
      />

      {/* Динамические частицы вокруг логотипа при наведении */}
      {isHovered && (
        <>
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i / 8) * Math.PI * 2;
            const radius = 25 + Math.random() * 5;
            const size = 1 + Math.random() * 2;

            return (
              <motion.div
                key={i}
                className="absolute bg-blue-500 rounded-full shadow-lg shadow-blue-500/50"
                style={{
                  width: size,
                  height: size,
                  boxShadow: '0 0 8px rgba(59, 130, 246, 0.8)',
                  x: Math.cos(angle) * radius,
                  y: Math.sin(angle) * radius,
                  opacity: 0
                }}
                animate={{
                  opacity: [0, 0.7, 0],
                  scale: [0, 2, 0]
                }}
                transition={{
                  duration: 2 + Math.random(),
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              />
            );
          })}
        </>
      )}
    </div>
  );
};

// Обновленная компонента для пунктов меню с различными анимациями
const NavItem = ({ item, isActive, onClick }) => {
  return (
    <motion.button
      onClick={onClick}
      className="relative px-4 py-2 rounded-full group"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Фоновая подсветка */}
      <motion.div
        className={`absolute inset-0 rounded-full transition-colors duration-300
          ${isActive ? 'bg-gradient-to-r from-blue-600/20 to-purple-600/20' : 'opacity-0 group-hover:opacity-100 bg-slate-700/30'}`}
        layoutId={`nav-bg-${item.name}`}
        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
      />

      {/* Светящаяся нижняя линия */}
      {isActive && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600"
          layoutId="activeIndicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="absolute top-0 left-0 right-0 h-full overflow-hidden">
            <div className="absolute top-0 left-0 w-20 h-full bg-white/50 blur-sm animate-pulse-subtle" />
            <div className="absolute top-0 w-12 h-full left-1/4 bg-white/30 blur-sm animate-pulse-subtle" style={{ animationDelay: "0.5s" }} />
          </div>
        </motion.div>
      )}

      <span className={`relative z-10 flex items-center gap-2 ${isActive ? 'text-white font-medium' : 'text-gray-300 group-hover:text-white transition-colors'}`}>
        {/* Иконка с кастомной анимацией */}
        <motion.div
          whileHover={{ rotate: 360, scale: 1.2 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className={`${isActive ? 'text-white' : 'text-gray-400 group-hover:text-white transition-colors'}`}
        >
          <Icon icon={item.icon} className="w-5 h-5" />
        </motion.div>

        {/* Текст с эффектом */}
        <motion.span
          className="relative"
          whileHover={{
            textShadow: "0 0 8px rgba(255, 255, 255, 0.5)"
          }}
        >
          {item.name}

          {/* Всплывающий блик при наведении */}
          <motion.span
            className="absolute inset-0 text-transparent transition-opacity opacity-0 bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 group-hover:opacity-100"
            style={{ mixBlendMode: "overlay" }}
          >
            {item.name}
          </motion.span>
        </motion.span>

        {/* Бейдж если есть */}
        {item.badge && (
          <motion.span
            className={`text-xs px-1.5 py-0.5 rounded-md text-white ${item.badge.color}`}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            {item.badge.text}
          </motion.span>
        )}
      </span>
    </motion.button>
  );
};

// Главный компонент навигации
const TopNav = () => {
  // Новая структура навигационных элементов с путями для Router
  const navItems = [
    { name: 'Home', icon: 'ph:house-fill', path: '/#home' },
    { name: 'Projects', icon: 'ph:code-bold', path: '/#projects' },
    { name: 'Skills', icon: 'ph:brain-fill', path: '/#skills' },
    {
      name: 'Algorithms',
      icon: 'ph:graph-fill',
      path: '/algorithms',
    },
    {
      name: 'Research',
      icon: 'ph:book-open-fill',
      path: '/research'
    },
    { name: 'Contact', icon: 'ph:envelope-simple-fill', path: '/#contact' }
  ];

  const location = useLocation();
  const navigate = useNavigate();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Обработка скролла для эффектов
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;

      setScrollProgress(totalScroll > 0 ? (currentScroll / totalScroll) : 0);
      setIsScrolled(currentScroll > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Обрабатывает клик на пункт меню
  const handleNavClick = (item, event) => {
    event.preventDefault();

    if (item.path.startsWith('/#')) {
      // Если это ссылка с хэшем, извлекаем ID секции и скроллим к ней
      const sectionId = item.path.replace('/#', '');

      // Если мы не на главной, сначала переходим на главную
      if (location.pathname !== '/') {
        navigate('/');
        // Даем больше времени на загрузку главной страницы перед скроллом
        setTimeout(() => {
          const element = document.getElementById(sectionId);
          if (element) {
            scrollToElement(element);
          } else {
            console.log(`Элемент с id=${sectionId} не найден`);
          }
        }, 300);
      } else {
        // Если мы уже на главной, просто скроллим
        const element = document.getElementById(sectionId);
        if (element) {
          scrollToElement(element);
        }
      }
    } else {
      // Обычная навигация по страницам
      navigate(item.path);
    }

    // Закрываем мобильное меню, если оно открыто
    setIsMobileMenuOpen(false);
  };

  const scrollToElement = (element) => {
    const offset = 100;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.scrollY - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });

    // Добавляем дополнительную проверку на случай, если скролл не сработал с первого раза
    setTimeout(() => {
      const newPosition = element.getBoundingClientRect().top;
      if (Math.abs(newPosition - offset) > 50) {
        window.scrollTo({
          top: element.getBoundingClientRect().top + window.scrollY - offset,
          behavior: 'smooth'
        });
      }
    }, 500);
  };

  // Определение активного элемента
  const isActive = (item) => {
    if (item.path.startsWith('/#')) {
      return location.pathname === '/' && location.hash === item.path.replace('/', '');
    }
    return location.pathname === item.path;
  };

  return (
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
      {/* Фоновая анимация */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-blue-900/30 to-slate-900/80"></div>
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent"
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute inset-0 opacity-20"
          style={{
            background: `radial-gradient(circle at ${scrollProgress * 100}% 0%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)`
          }}
        />
      </div>

      <div className="px-4 mx-auto max-w-7xl">
        <div className="flex items-center justify-between h-20">
          {/* Левая часть с логотипом */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex-shrink-0 cursor-pointer"
            onClick={() => navigate('/')}
          >
            <div className="flex items-center">
              <SnakeLogo />
            </div>
          </motion.div>

          {/* Центральная навигация */}
          <motion.div
            className="hidden md:block"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <motion.div
              className="flex space-x-1 p-1.5 rounded-full bg-slate-800/50 backdrop-blur-sm border border-slate-700/50"
              layoutId="navContainer"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            >
              {navItems.map((item, index) => (
                <NavItem
                  key={item.name}
                  item={item}
                  isActive={isActive(item)}
                  onClick={(e) => handleNavClick(item, e)}
                />
              ))}
            </motion.div>
          </motion.div>

          {/* Правая часть - темная тема и мобильное меню */}
          <div className="flex items-center space-x-3">
            {/* Кнопка тёмной темы */}
            <motion.button
              className="p-2 text-gray-300 transition-colors rounded-full bg-slate-800/80 hover:text-white"
              whileHover={{ scale: 1.1, rotate: 10 }}
              whileTap={{ scale: 0.9 }}
            >
              <Icon icon="ph:moon-stars-fill" className="w-5 h-5" />
            </motion.button>

            {/* Мобильное меню */}
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

      {/* Выпадающее мобильное меню */}
      <motion.div
        className="overflow-hidden md:hidden"
        animate={{
          height: isMobileMenuOpen ? 'auto' : 0,
          opacity: isMobileMenuOpen ? 1 : 0
        }}
        initial={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.3 }}
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
              <Icon
                icon={item.icon}
                className={`w-5 h-5 ${isActive(item) ? 'text-blue-400' : 'text-gray-400'}`}
              />
              <span>{item.name}</span>

              {isActive(item) && (
                <motion.div
                  className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-500"
                  layoutId="mobileActiveIndicator"
                />
              )}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Анимированная линия прогресса скролла */}
      <motion.div
        className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
        style={{
          width: `${scrollProgress * 100}%`,
          background: `linear-gradient(to right, #3b82f6 0%, #8b5cf6 ${scrollProgress * 100 / 2}%, #ec4899 ${scrollProgress * 100}%)`,
          boxShadow: "0 0 10px rgba(139, 92, 246, 0.5)"
        }}
        transition={{ duration: 0.1 }}
      >
        {/* Светящаяся точка на конце линии прогресса */}
        <motion.div
          className="absolute right-0 w-3 h-3 transform -translate-y-1/2 rounded-full shadow-lg top-1/2 bg-white/80 shadow-purple-500/50"
          style={{ filter: "blur(1px)" }}
        />
      </motion.div>
    </motion.nav>
  );
};

export default TopNav;
