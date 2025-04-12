import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';
import gsap from 'gsap';

const TesseractLogo = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const timeRef = useRef(0);
  const navigate = useNavigate();
  
  // Vertex shader для 4D тессеракта
  const vertexShader = `
    uniform float uTime;
    uniform vec2 uMouse;
    uniform float uHover;
    uniform float uClick;
    uniform mat4 uRotationXY;
    uniform mat4 uRotationXZ;
    uniform mat4 uRotationXW;
    uniform mat4 uRotationYZ;
    uniform mat4 uRotationYW;
    uniform mat4 uRotationZW;
    
    varying vec4 vPosition4D;
    varying vec2 vUv;
    varying vec3 vNormal;
    varying float vEdgeFactor;
    
    // 4D ротация точки
    vec4 rotatePoint4D(vec4 p) {
      // Последовательные вращения во всех шести плоскостях 4D
      p = uRotationXY * p;
      p = uRotationXZ * p;
      p = uRotationXW * p;
      p = uRotationYZ * p;
      p = uRotationYW * p;
      p = uRotationZW * p;
      return p;
    }
    
    // Проекция из 4D в 3D с перспективой
    vec3 projectTo3D(vec4 p) {
      float w = 2.0;
      float distance = w + p.w;
      return vec3(p.xyz) / distance;
    }
    
    // Определение ребра для подсветки
    float detectEdge(vec3 position) {
      // Детектируем ребра по близости к краям куба
      vec3 absPos = abs(position);
      float maxDimension = max(max(absPos.x, absPos.y), absPos.z);
      float threshold = 0.95; // Насколько близко к краю должна быть точка
      
      // Если хотя бы одна координата близка к 1 (краю куба), то это ребро
      if (absPos.x > threshold || absPos.y > threshold || absPos.z > threshold) {
        return 1.0;
      }
      
      // Также детектируем вершины тессеракта
      if (absPos.x > 0.9 && absPos.y > 0.9 || 
          absPos.x > 0.9 && absPos.z > 0.9 || 
          absPos.y > 0.9 && absPos.z > 0.9) {
        return 1.0;
      }
      
      return 0.0;
    }
    
    void main() {
      vUv = uv;
      vNormal = normal;
      
      // Создаем 4D-версию точки - сначала определяем 16 вершин тессеракта
      // Применяем преобразование к исходным точкам, чтобы получить тессеракт
      vec4 pos4D = vec4(position * 0.5, 0.0); // Преобразуем 3D точки в 4D, добавляя W-компоненту
      
      // Модифицируем W-компоненту в зависимости от координат точки
      // Это создаст проекцию тессеракта
      pos4D.w = (sin(uTime * 0.1) * 0.5 + 0.5) * 0.5;
      
      // Добавляем эффект мыши - при наведении усиливаем 4D эффект
      if (uHover > 0.01) {
        // Усиливаем влияние 4-го измерения при наведении
        float wFactor = 0.4 * uHover * (1.0 + sin(uTime * 2.0) * 0.3);
        pos4D.w += wFactor;
        
        // Добавляем влияние позиции мыши
        vec2 mouseDir = uv - uMouse;
        float mouseDist = length(mouseDir);
        float mouseEffect = (1.0 - smoothstep(0.0, 0.5, mouseDist)) * 0.2 * uHover;
        pos4D.xy += mouseDir * mouseEffect;
      }
      
      // При клике добавляем импульс
      if (uClick > 0.01) {
        float clickPulse = sin(uTime * 15.0) * uClick * 0.3;
        pos4D.w += clickPulse;
        pos4D.xyz *= 1.0 + clickPulse * 0.2;
      }
      
      // Применяем 4D вращение
      vec4 rotated4D = rotatePoint4D(pos4D);
      
      // Сохраняем 4D позицию для использования в фрагментном шейдере
      vPosition4D = rotated4D;
      
      // Проецируем из 4D в 3D
      vec3 projected3D = projectTo3D(rotated4D);
      
      // Определяем, является ли точка частью ребра
      vEdgeFactor = detectEdge(projected3D);
      
      // Финальная позиция для рендеринга
      vec4 mvPosition = modelViewMatrix * vec4(projected3D * 1.5, 1.0);
      gl_Position = projectionMatrix * mvPosition;
    }
  `;
  
  // Fragment shader для тессеракта
  const fragmentShader = `
    uniform float uTime;
    uniform float uHover;
    uniform float uClick;
    
    varying vec4 vPosition4D;
    varying vec2 vUv;
    varying vec3 vNormal;
    varying float vEdgeFactor;
    
    // Функция для получения переливающихся цветов на основе 4D координат
    vec3 getHypercubeColor(vec4 pos) {
      // Используем 4D координаты для создания необычных цветовых паттернов
      float phase = uTime * 0.2;
      
      // Базовый цвет - неоновые оттенки синего и фиолетового
      vec3 baseColor1 = vec3(0.1, 0.4, 0.9); // Яркий синий
      vec3 baseColor2 = vec3(0.6, 0.2, 0.9); // Яркий фиолетовый
      vec3 baseColor3 = vec3(0.1, 0.8, 0.9); // Бирюзовый
      
      // Используем W-координату для смешивания цветов
      float wFactor = pos.w * 0.5 + 0.5; // Нормализуем в диапазон [0, 1]
      float patternMix = sin(wFactor * 5.0 + phase) * 0.5 + 0.5;
      
      // Смешиваем три цвета в зависимости от 4D координат
      vec3 color = mix(
        mix(baseColor1, baseColor2, patternMix),
        baseColor3,
        sin(pos.z * 2.0 + pos.w * 3.0 + phase * 2.0) * 0.5 + 0.5
      );
      
      // Добавляем свечение, зависящее от 4D координат
      float glowIntensity = 0.3 + 0.7 * pow(sin(wFactor * 6.28 + phase * 3.0) * 0.5 + 0.5, 2.0);
      color *= 1.0 + glowIntensity * 0.5;
      
      return color;
    }
    
    // Функция для создания эффекта голографического свечения
    vec3 holographicGlow(vec3 baseColor, float glowIntensity) {
      // Создаем эффект голографического свечения
      float scanLine = sin(vUv.y * 80.0 + uTime * 2.0) * 0.05 + 0.95;
      vec3 glowColor = vec3(0.5, 0.9, 1.0) * glowIntensity;
      return baseColor * scanLine + glowColor * pow(glowIntensity, 2.0) * 0.4;
    }
    
    // Аберрация и глитч-эффекты
    vec3 applyGlitchEffects(vec3 color) {
      // Хроматическая аберрация
      float aberrationStrength = 0.01 * (1.0 + uHover * 2.0);
      float rgbSplit = sin(uTime * 0.5) * aberrationStrength;
      
      // Глитч-эффекты при наведении/клике
      if (uHover > 0.01 || uClick > 0.01) {
        // Случайные глитчи
        float glitchFactor = max(uHover, uClick) * 0.1;
        if (fract(uTime * 3.0) < glitchFactor) {
          color += vec3(0.1, 0.0, 0.2) * glitchFactor * sin(vUv.y * 100.0);
        }
        
        // Цифровой шум
        float noise = fract(sin(dot(vUv, vec2(12.9898, 78.233)) * 43758.5453));
        color += vec3(noise) * 0.03 * max(uHover, uClick);
      }
      
      return color;
    }
    
    void main() {
      // Получаем базовый цвет на основе 4D координат
      vec3 color = getHypercubeColor(vPosition4D);
      
      // Добавляем свечение ребер тессеракта
      if (vEdgeFactor > 0.5) {
        // Яркое неоновое свечение для ребер
        vec3 edgeColor = vec3(0.9, 0.8, 1.0) * (1.5 + sin(uTime * 3.0) * 0.5);
        color = mix(color, edgeColor, 0.8);
      }
      
      // Добавляем голографические эффекты
      float glowFactor = 0.6 + 0.4 * uHover + 0.2 * sin(uTime * 0.5);
      color = holographicGlow(color, glowFactor);
      
      // Добавляем глитч-эффекты и аберрации
      color = applyGlitchEffects(color);
      
      // Эффект при клике
      if (uClick > 0.01) {
        float clickPulse = sin(uTime * 20.0) * 0.5 + 0.5;
        vec3 pulseColor = vec3(1.0, 0.8, 0.5); // Яркое золотистое свечение
        color = mix(color, pulseColor, clickPulse * uClick * 0.5);
      }
      
      // Добавляем сканлайны для футуристического вида
      float scanLine = step(0.5, fract(vUv.y * 30.0 + uTime));
      color *= 0.95 + scanLine * 0.05;
      
      // Создаем полупрозрачность по краям для мягкого перехода
      float alpha = 0.95;
      float edgeSoftness = 0.1;
      float distFromCenter = length(vUv - vec2(0.5));
      alpha *= 1.0 - smoothstep(0.4 - edgeSoftness, 0.5, distFromCenter);
      
      // Финальный цвет с прозрачностью
      gl_FragColor = vec4(color, alpha);
    }
  `;
  
  // Инициализируем Three.js сцену при монтировании компонента
  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;
    
    // Настройка контейнера и размеров
    const container = containerRef.current;
    const width = 70;
    const height = 70;
    
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
    
    // Создаем матрицы для 4D вращения
    const getRotationMatrix = (angle, axisA, axisB, dimension) => {
      const matrix = new THREE.Matrix4().identity();
      
      const cosAngle = Math.cos(angle);
      const sinAngle = Math.sin(angle);
      
      // Копируем начальную матрицу
      const elements = [...matrix.elements];
      
      // Устанавливаем элементы для вращения в плоскости axisA-axisB
      elements[axisA * 4 + axisA] = cosAngle;
      elements[axisA * 4 + axisB] = -sinAngle;
      elements[axisB * 4 + axisA] = sinAngle;
      elements[axisB * 4 + axisB] = cosAngle;
      
      return new THREE.Matrix4().fromArray(elements);
    };
    
    // Создаем материал с шейдерами и всеми необходимыми униформами
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
        uHover: { value: 0 },
        uClick: { value: 0 },
        // 4D матрицы вращения
        uRotationXY: { value: new THREE.Matrix4().identity() },
        uRotationXZ: { value: new THREE.Matrix4().identity() },
        uRotationXW: { value: new THREE.Matrix4().identity() },
        uRotationYZ: { value: new THREE.Matrix4().identity() },
        uRotationYW: { value: new THREE.Matrix4().identity() },
        uRotationZW: { value: new THREE.Matrix4().identity() }
      },
      vertexShader,
      fragmentShader,
      transparent: true,
      side: THREE.DoubleSide
    });
    
    // Создаем геометрию для тессеракта - используем высокодетализированный куб
    // Вместо куба можно использовать другие геометрии для создания интересных форм
    const geometry = new THREE.BoxGeometry(2, 2, 2, 10, 10, 10);
    
    // Создаем меш
    const tesseract = new THREE.Mesh(geometry, material);
    scene.add(tesseract);
    
    // Функция анимации
    const animate = () => {
      const animationId = requestAnimationFrame(animate);
      
      // Обновляем время для шейдера
      timeRef.current += 0.01;
      material.uniforms.uTime.value = timeRef.current;
      
      // Обновляем матрицы вращения для 4D эффекта
      const t = timeRef.current;
      
      // Разные скорости вращения для разных плоскостей
      material.uniforms.uRotationXY.value = getRotationMatrix(t * 0.3, 0, 1, 4);
      material.uniforms.uRotationXZ.value = getRotationMatrix(t * 0.2, 0, 2, 4);
      material.uniforms.uRotationXW.value = getRotationMatrix(t * 0.1, 0, 3, 4);
      material.uniforms.uRotationYZ.value = getRotationMatrix(t * 0.15, 1, 2, 4);
      material.uniforms.uRotationYW.value = getRotationMatrix(t * 0.05, 1, 3, 4);
      material.uniforms.uRotationZW.value = getRotationMatrix(t * 0.07, 2, 3, 4);
      
      // Рендер сцены
      renderer.render(scene, camera);
    };
    
    // Запуск анимации
    animate();
    
    // Плавно активируем интерактивность при наведении
    const updateHoverState = (hovered) => {
      gsap.to(material.uniforms.uHover, {
        value: hovered ? 1.0 : 0.0,
        duration: 0.5,
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
            duration: 0.8
          });
        }
      });
      
      // Также добавляем физическую анимацию сжатия
      gsap.to(tesseract.scale, {
        x: 0.8,
        y: 0.8,
        z: 0.8,
        duration: 0.1,
        onComplete: () => {
          gsap.to(tesseract.scale, {
            x: 1,
            y: 1,
            z: 1,
            duration: 0.8,
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
        duration: 0.3,
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
      
      container.removeEventListener('mouseenter', () => {
        setIsHovered(true);
        updateHoverState(true);
      });
      
      container.removeEventListener('mouseleave', () => {
        setIsHovered(false);
        updateHoverState(false);
      });
      
      container.removeEventListener('mousemove', updateMousePosition);
      
      container.removeEventListener('mousedown', () => {
        setIsClicked(true);
        handleClick();
      });
      
      container.removeEventListener('mouseup', () => {
        setIsClicked(false);
      });
      
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, [navigate]);
  
  return (
    <div 
      ref={containerRef}
      className="relative w-16 h-16 flex items-center justify-center cursor-pointer"
    >
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
                'radial-gradient(circle, rgba(99, 102, 241, 0.6) 0%, rgba(0, 0, 0, 0) 70%)',
                'radial-gradient(circle, rgba(139, 92, 246, 0.6) 0%, rgba(0, 0, 0, 0) 70%)',
                'radial-gradient(circle, rgba(79, 70, 229, 0.6) 0%, rgba(0, 0, 0, 0) 70%)'
              ]
            : 'radial-gradient(circle, rgba(99, 102, 241, 0.3) 0%, rgba(0, 0, 0, 0) 70%)',
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
          {Array.from({ length: 10 }).map((_, i) => {
            const angle = (i / 10) * Math.PI * 2;
            const radius = 25 + Math.random() * 10;
            const size = 1 + Math.random() * 3;
            
            return (
              <motion.div
                key={i}
                className="absolute rounded-full bg-indigo-500 shadow-lg shadow-indigo-500/50"
                style={{ 
                  width: size, 
                  height: size,
                  boxShadow: '0 0 12px rgba(99, 102, 241, 0.8)',
                  x: Math.cos(angle) * radius,
                  y: Math.sin(angle) * radius,
                  opacity: 0
                }}
                animate={{ 
                  opacity: [0, 0.9, 0],
                  scale: [0, 2, 0]
                }}
                transition={{
                  duration: 2 + Math.random() * 2, 
                  repeat: Infinity,
                  delay: i * 0.1
                }}
              />
            );
          })}
        </>
      )}
      
      {/* Глитч эффект при клике */}
      {isClicked && (
        <motion.div
          className="absolute inset-0 bg-white/30 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.8, 0] }}
          transition={{ duration: 0.5, ease: "linear" }}
          style={{ pointerEvents: "none" }}
        />
      )}
    </div>
  );
};

export default TesseractLogo;
