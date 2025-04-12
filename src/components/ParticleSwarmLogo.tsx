import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';
import gsap from 'gsap';

const ParticleSwarmLogo = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const particlesRef = useRef(null);
  const particleSystemRef = useRef(null);
  const targetPositionsRef = useRef(null);
  const currentStateRef = useRef('logo');
  const navigate = useNavigate();

  // Инициализация и создание частиц
  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    // Настройка размеров
    const container = containerRef.current;
    const width = 70;
    const height = 70;

    // Инициализация Three.js
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Создаем камеру
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.z = 15;
    cameraRef.current = camera;

    // Создаем рендерер
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;

    // Текстура для частиц
    const loader = new THREE.TextureLoader();
    const particleTexture = loader.load('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAF8WlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNi4wLWMwMDYgNzkuMTY0NzUzLCAyMDIxLzAyLzE1LTExOjUyOjEzICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjIuMyAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMjEtMDktMzBUMTU6NDE6NTQrMDI6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDIxLTA5LTMwVDE1OjQzOjIwKzAyOjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDIxLTA5LTMwVDE1OjQzOjIwKzAyOjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgcGhvdG9zaG9wOklDQ1Byb2ZpbGU9InNSR0IgSUVDNjE5NjYtMi4xIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjZiMmFkOWU1LTAxZjMt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');

    // Создаем геометрию частиц
    const particleCount = 4000;
    const particles = new THREE.BufferGeometry();

    // Создаем позиции для частиц в виде сферы
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const angles = new Float32Array(particleCount);
    const phases = new Float32Array(particleCount);

    // Цветовая палитра
    const palette = [
      new THREE.Color('#4f46e5'),  // Индиго
      new THREE.Color('#7c3aed'),  // Фиолетовый
      new THREE.Color('#8b5cf6'),  // Пурпурный
      new THREE.Color('#a855f7'),  // Сиреневый
      new THREE.Color('#3b82f6'),  // Синий
    ];
    
    // Инициализируем частицы
    for (let i = 0; i < particleCount; i++) {
      // Позиция в виде случайной сферы
      const radius = 4 + Math.random() * 1;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      
      // Случайный цвет из палитры
      const color = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
      
      // Случайный размер
      sizes[i] = 0.05 + Math.random() * 0.15;
      
      // Случайный угол и фаза для анимации
      angles[i] = Math.random() * Math.PI * 2;
      phases[i] = Math.random() * Math.PI * 2;
    }
    
    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    particles.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    particles.setAttribute('angle', new THREE.BufferAttribute(angles, 1));
    particles.setAttribute('phase', new THREE.BufferAttribute(phases, 1));
    
    // Создаем шейдерный материал для частиц
    const particleMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        pointTexture: { value: particleTexture },
        pixelRatio: { value: renderer.getPixelRatio() },
        hoverIntensity: { value: 0 },
        clickIntensity: { value: 0 },
        morphProgress: { value: 0 },
        mousePosition: { value: new THREE.Vector2(0, 0) },
      },
      vertexShader: `
        uniform float time;
        uniform float hoverIntensity;
        uniform float clickIntensity;
        uniform float morphProgress;
        uniform vec2 mousePosition;
        uniform float pixelRatio;
        
        attribute float size;
        attribute float angle;
        attribute float phase;
        attribute vec3 color;
        
        varying vec3 vColor;
        varying float vAngle;
        
        void main() {
            vColor = color;
            vAngle = angle;
            
            // Получаем текущую позицию частицы
            vec3 pos = position;
            
            // Добавляем 'дыхание' частиц
            float breathing = sin(time * 0.5 + phase) * 0.08;
            pos *= 1.0 + breathing * (1.0 + hoverIntensity * 0.5);
            
            // Добавляем волну при наведении мыши
            if (hoverIntensity > 0.0) {
                float dist = length(pos.xy - mousePosition);
                float waveFactor = (1.0 - smoothstep(0.0, 5.0, dist)) * hoverIntensity;
                pos.z += sin(time * 2.0 + phase * 10.0) * waveFactor * 0.5;
            }
            
            // Добавляем вибрацию при клике
            if (clickIntensity > 0.0) {
                float vibration = sin(time * 30.0 + phase * 100.0) * clickIntensity * 0.2;
                pos += normalize(pos) * vibration;
            }
            
            // Проецируем позицию на экран
            vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
            gl_Position = projectionMatrix * mvPosition;
            
            // Задаем размер точки с учетом hoverIntensity
            float particleSize = size * (1.0 + hoverIntensity * 0.3 + breathing * 0.5);
            
            // Применяем пульсацию при клике
            if (clickIntensity > 0.0) {
                particleSize *= 1.0 + sin(time * 20.0) * clickIntensity * 0.5;
            }
            
            gl_PointSize = particleSize * (300.0 / -mvPosition.z) * pixelRatio;
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform sampler2D pointTexture;
        uniform float hoverIntensity;
        uniform float clickIntensity;
        
        varying vec3 vColor;
        varying float vAngle;
        
        void main() {
            // Координаты текстуры с вращением
            float c = cos(vAngle + time * 0.5);
            float s = sin(vAngle + time * 0.5);
            vec2 rotatedUV = vec2(
                c * (gl_PointCoord.x - 0.5) + s * (gl_PointCoord.y - 0.5) + 0.5,
                c * (gl_PointCoord.y - 0.5) - s * (gl_PointCoord.x - 0.5) + 0.5
            );
            
            // Получаем цвет из текстуры и альфа-канал
            vec4 texColor = texture2D(pointTexture, rotatedUV);
            
            // Если вышли за пределы круглой текстуры, отбрасываем фрагмент
            if (texColor.a < 0.3) discard;
            
            // Базовый цвет частицы
            vec3 color = vColor;
            
            // Усиливаем яркость при наведении
            if (hoverIntensity > 0.0) {
                color = mix(color, vec3(1.0, 1.0, 1.0), hoverIntensity * 0.3);
            }
            
            // Добавляем свечение при клике
            if (clickIntensity > 0.0) {
                float pulse = (sin(time * 10.0) * 0.5 + 0.5) * clickIntensity;
                color = mix(color, vec3(1.0, 1.0, 1.0), pulse * 0.5);
            }
            
            gl_FragColor = vec4(color, texColor.a);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    // Создаем систему частиц
    const particleSystem = new THREE.Points(particles, particleMaterial);
    scene.add(particleSystem);
    particleSystemRef.current = particleSystem;
    particlesRef.current = particles;

    // Создаем целевые позиции для морфинга
    
    // Функция для создания формы логотипа
    const createLogoPositions = () => {
      const logoPositions = new Float32Array(particleCount * 3);
      
      // Создаем форму "P" с небольшими вариациями
      for (let i = 0; i < particleCount; i++) {
        const t = i / particleCount;
        const noise = Math.random() * 0.5;
        
        // Простой алгоритм для создания буквы "P"
        let x, y, z;
        
        if (i % 3 === 0) {
          // Вертикальная линия P
          x = -1.5 + (Math.random() - 0.5) * 0.8;
          y = -2.0 + Math.random() * 4.0;
          z = noise - 0.5;
        } else if (i % 3 === 1) {
          // Верхняя дуга P
          const angle = Math.random() * Math.PI;
          const radius = 1.5 + (Math.random() - 0.5) * 0.5;
          x = -1.5 + Math.cos(angle) * radius;
          y = 1.0 + Math.sin(angle) * radius;
          z = noise - 0.5;
        } else {
          // Произвольные точки для создания объема
          const randomAngle = Math.random() * Math.PI * 2;
          const randomRadius = 3.0 * Math.random();
          x = Math.cos(randomAngle) * randomRadius;
          y = Math.sin(randomAngle) * randomRadius;
          z = (Math.random() - 0.5) * 3.0;
        }
        
        logoPositions[i * 3] = x;
        logoPositions[i * 3 + 1] = y;
        logoPositions[i * 3 + 2] = z;
      }
      
      return logoPositions;
    };
    
    // Функция для создания формы сферы
    const createSpherePositions = () => {
      const spherePositions = new Float32Array(particleCount * 3);
      
      for (let i = 0; i < particleCount; i++) {
        const radius = 3.0 + Math.random() * 1.0;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;
        
        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.sin(phi) * Math.sin(theta);
        const z = radius * Math.cos(phi);
        
        spherePositions[i * 3] = x;
        spherePositions[i * 3 + 1] = y;
        spherePositions[i * 3 + 2] = z;
      }
      
      return spherePositions;
    };
    
    // Функция для создания вихря
    const createVortexPositions = () => {
      const vortexPositions = new Float32Array(particleCount * 3);
      
      for (let i = 0; i < particleCount; i++) {
        const t = i / particleCount;
        const angle = t * Math.PI * 40;
        const radiusXY = 0.2 + t * 4.0;
        const height = -2.0 + t * 4.0;
        
        const x = Math.cos(angle) * radiusXY;
        const y = Math.sin(angle) * radiusXY;
        const z = height;
        
        vortexPositions[i * 3] = x;
        vortexPositions[i * 3 + 1] = y;
        vortexPositions[i * 3 + 2] = z;
      }
      
      return vortexPositions;
    };
    
    // Создаем целевые позиции для разных форм
    targetPositionsRef.current = {
      logo: createLogoPositions(),
      sphere: createSpherePositions(),
      vortex: createVortexPositions()
    };
    
    // Функция анимации
    const clock = new THREE.Clock();
    
    const animate = () => {
      requestAnimationFrame(animate);
      
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();
      
      // Обновляем униформы шейдера
      particleMaterial.uniforms.time.value = elapsedTime;
      
      // Вращаем всю систему частиц
      particleSystem.rotation.y = elapsedTime * 0.05;
      
      // Рендерим сцену
      renderer.render(scene, camera);
    };
    
    // Запускаем анимацию
    animate();
    
    // Функция для морфинга между состояниями
    const morphTo = (targetState) => {
      if (currentStateRef.current === targetState) return;
      
      const currentPositions = particles.attributes.position.array;
      const targetPositions = targetPositionsRef.current[targetState];
      
      // Останавливаем предыдущую анимацию если есть
      gsap.killTweensOf(particleMaterial.uniforms.morphProgress);
      
      // Анимируем переход
      gsap.to(particleMaterial.uniforms.morphProgress, {
        value: 1,
        duration: 1.5,
        ease: "power3.inOut",
        onUpdate: () => {
          const progress = particleMaterial.uniforms.morphProgress.value;
          
          // Интерполируем между текущими и целевыми позициями
          for (let i = 0; i < particleCount * 3; i++) {
            currentPositions[i] = gsap.utils.interpolate(
              currentPositions[i],
              targetPositions[i],
              progress
            );
          }
          
          // Обновляем буфер позиций
          particles.attributes.position.needsUpdate = true;
        },
        onComplete: () => {
          // Сбрасываем progress для следующей анимации
          particleMaterial.uniforms.morphProgress.value = 0;
          currentStateRef.current = targetState;
        }
      });
    };
    
    // Обработчики событий
    const handleMouseEnter = () => {
      setIsHovered(true);
      
      // Анимируем интенсивность hover-эффекта
      gsap.to(particleMaterial.uniforms.hoverIntensity, {
        value: 1.0,
        duration: 0.5,
        ease: "power2.out"
      });
      
      // Морфинг в логотип при наведении
      morphTo('logo');
    };
    
    const handleMouseLeave = () => {
      setIsHovered(false);
      
      // Анимируем интенсивность hover-эффекта
      gsap.to(particleMaterial.uniforms.hoverIntensity, {
        value: 0,
        duration: 0.5,
        ease: "power2.out"
      });
      
      // Возвращаемся к сфере при уходе курсора
      morphTo('sphere');
    };
    
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      
      // Обновляем позицию мыши в шейдере
      particleMaterial.uniforms.mousePosition.value.set(x * 5, y * 5);
    };
    
    const handleClick = () => {
      setIsClicked(true);
      
      // Анимируем эффект клика
      gsap.to(particleMaterial.uniforms.clickIntensity, {
        value: 1.0,
        duration: 0.2,
        ease: "power2.in",
        onComplete: () => {
          // Морфинг в вихрь при клике
          morphTo('vortex');
          
          // Возвращаем к нормальному состоянию
          gsap.to(particleMaterial.uniforms.clickIntensity, {
            value: 0,
            duration: 0.8,
            delay: 0.3,
            ease: "power2.out",
            onComplete: () => {
              // После эффекта возвращаемся к логотипу
              setTimeout(() => {
                morphTo('logo');
              }, 800);
              
              setIsClicked(false);
              
              // Перенаправление на главную страницу
              navigate('/');
            }
          });
        }
      });
    };
    
    // Добавляем обработчики событий
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('click', handleClick);
    
    // Инициализируем начальное состояние (сфера)
    morphTo('sphere');
    
    // Очистка при размонтировании
    return () => {
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('click', handleClick);
      
      // Освобождаем ресурсы Three.js
      scene.remove(particleSystem);
      particles.dispose();
      particleMaterial.dispose();
      
      renderer.dispose();
    };
  }, [navigate]);

  return (
    <div
      ref={containerRef}
      className="relative w-16 h-16 cursor-pointer flex items-center justify-center"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
      
      {/* Фоновое свечение */}
      <motion.div
        className="absolute inset-0 rounded-full blur-2xl opacity-70"
        animate={{
          background: isHovered
            ? [
                'radial-gradient(circle, rgba(79, 70, 229, 0.6) 0%, rgba(0, 0, 0, 0) 70%)',
                'radial-gradient(circle, rgba(139, 92, 246, 0.6) 0%, rgba(0, 0, 0, 0) 70%)',
                'radial-gradient(circle, rgba(168, 85, 247, 0.6) 0%, rgba(0, 0, 0, 0) 70%)'
              ]
            : 'radial-gradient(circle, rgba(79, 70, 229, 0.3) 0%, rgba(0, 0, 0, 0) 70%)',
          scale: isHovered ? [1, 1.2, 1.1] : 1
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse"
        }}
        style={{ pointerEvents: "none" }}
      />
      
      {/* Эффект при клике */}
      {isClicked && (
        <motion.div
          className="absolute inset-0 rounded-full bg-white/30"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: [0, 0.8, 0], scale: [0.5, 1.5, 0.5] }}
          transition={{ duration: 0.8 }}
          style={{ pointerEvents: "none" }}
        />
      )}
    </div>
  );
};

export default ParticleSwarmLogo;
