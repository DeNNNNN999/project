import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import * as THREE from 'three';
import gsap from 'gsap';

// Шейдеры для создания эффекта неонового свечения с улучшенной интерактивностью
const vertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uInteractionStrength;
  
  void main() {
    vUv = uv;
    vPosition = position;
    
    // Рассчитываем влияние позиции мыши на каждую вершину
    vec3 pos = position;
    float dist = distance(vec2(pos.x, pos.y), uMouse);
    float influence = smoothstep(1.0, 0.0, dist) * uInteractionStrength;
    
    // Добавляем волнообразную деформацию от курсора
    float waveHeight = sin(dist * 8.0 - uTime * 2.0) * 0.03 * influence;
    pos += normal * waveHeight;
    
    // Добавляем небольшие пульсации и движения к вершинам
    float pulseFactor = sin(uTime * 2.0) * 0.02;
    pos += normal * pulseFactor;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  uniform float uTime;
  uniform vec3 uBaseColor;
  uniform vec3 uAccentColor;
  uniform vec2 uMouse;
  uniform float uClickIntensity;
  
  // Функция для создания неонового свечения
  float neonGlow(float dist, float radius, float intensity) {
    return pow(radius / dist, intensity);
  }
  
  void main() {
    // Создаем базовое сияние
    vec2 centeredUv = vUv * 2.0 - 1.0;
    float dist = length(centeredUv);
    
    // Анимируем пульсацию свечения
    float pulseSpeed = 1.5;
    float pulseIntensity = sin(uTime * pulseSpeed) * 0.15 + 0.85;
    
    // Создаем свечение по краям
    float rimPower = 2.0;
    float rim = 1.0 - max(0.0, dot(normalize(vPosition), vec3(0.0, 0.0, 1.0)));
    rim = pow(rim, rimPower);
    
    // Добавляем влияние позиции мыши на свечение
    float mouseDistance = distance(vUv, uMouse);
    float mouseInfluence = smoothstep(0.4, 0.0, mouseDistance) * 0.3;
    
    // Комбинируем базовое свечение и краевое свечение с влиянием мыши
    float glow = neonGlow(dist, 0.5, 2.0) * pulseIntensity + mouseInfluence;
    
    // Создаем текстуру "цифрового потока"
    float digitalFlow = sin((vUv.y * 20.0) + uTime * 3.0) * 0.5 + 0.5;
    digitalFlow *= step(0.95, digitalFlow); // Создаем дискретные линии
    
    // Добавляем эффект при клике - вспышка энергии от центра
    float clickWave = sin(dist * 20.0 - uTime * 10.0) * uClickIntensity * (1.0 - dist);
    
    // Добавляем немного случайного шума
    float noise = fract(sin(dot(vUv, vec2(12.9898, 78.233) * uTime * 0.1)) * 43758.5453);
    
    // Смешиваем цвета с учетом влияния мыши
    vec3 finalColor = mix(uBaseColor, uAccentColor, glow * 0.7 + rim * 0.3 + mouseInfluence);
    
    // Добавляем цифровой поток и шум
    finalColor += uAccentColor * digitalFlow * 0.15;
    finalColor += noise * 0.03;
    
    // Добавляем эффект от клика
    finalColor += vec3(1.0, 1.0, 1.0) * clickWave;
    
    // Прозрачность зависит от интенсивности свечения
    float alpha = min(1.0, glow * 0.8 + rim * 0.5 + mouseInfluence);
    
    gl_FragColor = vec4(finalColor, alpha);
  }
`;

// Шейдеры для частиц с интерактивными эффектами
const particlesVertexShader = `
  attribute float size;
  attribute float opacity;
  attribute vec3 color;
  
  varying float vOpacity;
  varying vec3 vColor;
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uMouseRadius;
  uniform float uMouseStrength;
  
  void main() {
    vOpacity = opacity;
    vColor = color;
    
    // Добавляем пульсацию и вращение
    vec3 pos = position;
    float angle = uTime * 0.5;
    float radius = length(pos.xy);
    
    // Вращение по орбите
    float newX = radius * cos(angle + radius * 2.0);
    float newY = radius * sin(angle + radius * 2.0);
    
    // Взаимодействие с мышью - частицы отталкиваются или притягиваются
    vec2 particlePos = vec2(newX, newY);
    vec2 mouseDirection = particlePos - uMouse;
    float mouseDist = length(mouseDirection);
    
    if(mouseDist < uMouseRadius) {
      float strength = (1.0 - mouseDist / uMouseRadius) * uMouseStrength;
      particlePos += normalize(mouseDirection) * strength;
    }
    
    pos.x = particlePos.x;
    pos.y = particlePos.y;
    
    // Пульсация размера частиц
    float pulsatedSize = size * (1.0 + 0.2 * sin(uTime * 3.0 + radius * 10.0));
    
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = pulsatedSize * (300.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const particlesFragmentShader = `
  varying float vOpacity;
  varying vec3 vColor;
  uniform float uTime;
  
  void main() {
    // Создаем мягкую круглую точку с пульсирующим ореолом
    float dist = length(gl_PointCoord - vec2(0.5));
    float circle = 1.0 - smoothstep(0.2, 0.5, dist);
    
    // Добавляем светящийся ореол
    float glow = 0.3 * (1.0 - smoothstep(0.4, 0.8, dist)) * (0.6 + 0.4 * sin(uTime * 2.0));
    
    // Усиливаем яркость в центре
    vec3 glowColor = vColor * (1.5 - dist * 1.0);
    
    // Финальный цвет с учетом прозрачности и свечения
    gl_FragColor = vec4(glowColor, (vOpacity * circle + glow));
  }
`;

// Шейдер для соединительных линий
const connectingLinesVertexShader = `
  attribute float visibility;
  varying float vVisibility;
  uniform float uTime;
  
  void main() {
    vVisibility = visibility;
    
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const connectingLinesFragmentShader = `
  varying float vVisibility;
  uniform vec3 uColor;
  uniform float uTime;
  
  void main() {
    // Создаем пульсирующий эффект для линий
    float pulse = 0.8 + 0.2 * sin(uTime * 3.0);
    vec3 color = uColor * pulse;
    
    // Применяем видимость с мягким затуханием
    gl_FragColor = vec4(color, vVisibility * 0.7);
  }
`;

const NexusLogo: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<THREE.Vector2>(new THREE.Vector2(0, 0));
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isPressed, setIsPressed] = useState(false); // Для длительного нажатия
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const shaderMaterialRef = useRef<THREE.ShaderMaterial | null>(null);
  const particlesMaterialRef = useRef<THREE.ShaderMaterial | null>(null);
  const linesMaterialRef = useRef<THREE.ShaderMaterial | null>(null);
  const linesRef = useRef<THREE.LineSegments | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const frameIdRef = useRef<number | null>(null);
  const timeRef = useRef<number>(0);
  const clickTimeRef = useRef<number>(0);
  const navigate = useNavigate();

  // Эффект для инициализации и очистки Three.js
  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    // Инициализация сцены и камеры
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000);
    camera.position.z = 5;
    cameraRef.current = camera;

    // Инициализация рендерера
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(140, 140);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;

    // Создаем базовые цвета логотипа
    const baseColor = new THREE.Color(0x2563eb);  // Синий
    const accentColor = new THREE.Color(0x7c3aed); // Фиолетовый

    // Создаем геометрию и материал для центрального диска
    const discGeometry = new THREE.CircleGeometry(1.6, 64);
    const shaderMaterial = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uBaseColor: { value: baseColor },
        uAccentColor: { value: accentColor },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
        uInteractionStrength: { value: 0.0 },
        uClickIntensity: { value: 0.0 },
      },
      transparent: true,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
    });
    shaderMaterialRef.current = shaderMaterial;

    const disc = new THREE.Mesh(discGeometry, shaderMaterial);
    scene.add(disc);

    // Создаем хексагональный элемент в центре
    const hexGeometry = new THREE.CircleGeometry(0.8, 6);
    const hexMaterial = new THREE.MeshBasicMaterial({
      color: 0x1d4ed8,
      transparent: true,
      opacity: 0.7,
    });
    const hexagon = new THREE.Mesh(hexGeometry, hexMaterial);
    hexagon.rotation.z = Math.PI / 6; // Поворачиваем для выравнивания
    scene.add(hexagon);

    // Добавляем внутреннюю шестиугольную сетку для технического вида
    const createHexGrid = () => {
      const gridGroup = new THREE.Group();
      
      // Создание шестиугольных ячеек
      for (let ring = 0; ring < 3; ring++) {
        const radius = 0.2 + ring * 0.15;
        const segments = 6;
        const hexOutlineGeom = new THREE.BufferGeometry();
        const vertices = [];
        
        for (let i = 0; i < segments; i++) {
          const angle1 = (i / segments) * Math.PI * 2;
          const angle2 = ((i + 1) / segments) * Math.PI * 2;
          
          const x1 = Math.cos(angle1) * radius;
          const y1 = Math.sin(angle1) * radius;
          const x2 = Math.cos(angle2) * radius;
          const y2 = Math.sin(angle2) * radius;
          
          vertices.push(x1, y1, 0.01, x2, y2, 0.01);
        }
        
        hexOutlineGeom.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
        
        const lineMat = new THREE.LineBasicMaterial({
          color: 0x88aaff,
          transparent: true,
          opacity: 0.5 - ring * 0.1,
          blending: THREE.AdditiveBlending,
        });
        
        const hexOutline = new THREE.LineSegments(hexOutlineGeom, lineMat);
        gridGroup.add(hexOutline);
      }
      
      // Добавление соединительных линий между шестиугольниками
      for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI * 2;
        const x1 = Math.cos(angle) * 0.2;
        const y1 = Math.sin(angle) * 0.2;
        const x2 = Math.cos(angle) * 0.65;
        const y2 = Math.sin(angle) * 0.65;
        
        const lineGeom = new THREE.BufferGeometry();
        lineGeom.setAttribute('position', new THREE.Float32BufferAttribute([x1, y1, 0.01, x2, y2, 0.01], 3));
        
        const lineMat = new THREE.LineBasicMaterial({
          color: 0x88aaff,
          transparent: true,
          opacity: 0.3,
          blending: THREE.AdditiveBlending,
        });
        
        const line = new THREE.Line(lineGeom, lineMat);
        gridGroup.add(line);
      }
      
      return gridGroup;
    };
    
    const hexGrid = createHexGrid();
    scene.add(hexGrid);

    // Создаем внутренний круг для "ядра"
    const coreGeometry = new THREE.CircleGeometry(0.5, 32);
    const coreMaterial = new THREE.MeshBasicMaterial({
      color: 0xddd6fe,
      transparent: true,
      opacity: 0.9,
    });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    scene.add(core);

    // Создаем энергетические круги вокруг ядра
    const createEnergyRings = () => {
      const ringsGroup = new THREE.Group();
      
      for (let i = 0; i < 3; i++) {
        const ringGeometry = new THREE.RingGeometry(0.3 + i * 0.08, 0.32 + i * 0.08, 64);
        const ringMaterial = new THREE.MeshBasicMaterial({
          color: i % 2 === 0 ? 0x4f46e5 : 0x7c3aed,
          transparent: true,
          opacity: 0.5 - i * 0.1,
          blending: THREE.AdditiveBlending,
          side: THREE.DoubleSide,
        });
        
        const ring = new THREE.Mesh(ringGeometry, ringMaterial);
        ringsGroup.add(ring);
      }
      
      return ringsGroup;
    };
    
    const energyRings = createEnergyRings();
    scene.add(energyRings);

    // Создаем систему частиц с большим количеством частиц
    const particlesCount = 150;
    const particlesGeometry = new THREE.BufferGeometry();
    
    // Позиции частиц в форме спиральных орбит
    const positions = new Float32Array(particlesCount * 3);
    const sizes = new Float32Array(particlesCount);
    const opacities = new Float32Array(particlesCount);
    const colors = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount; i++) {
      const i3 = i * 3;
      const radius = 0.5 + Math.random() * 1.5;
      const angle = Math.random() * Math.PI * 2;
      
      positions[i3] = Math.cos(angle) * radius;
      positions[i3 + 1] = Math.sin(angle) * radius;
      positions[i3 + 2] = (Math.random() - 0.5) * 0.2;
      
      sizes[i] = Math.random() * 0.06 + 0.02;
      opacities[i] = Math.random() * 0.7 + 0.3;
      
      // Градиент цветов от синего к фиолетовому
      const mixFactor = Math.random();
      colors[i3] = baseColor.r * (1 - mixFactor) + accentColor.r * mixFactor;
      colors[i3 + 1] = baseColor.g * (1 - mixFactor) + accentColor.g * mixFactor;
      colors[i3 + 2] = baseColor.b * (1 - mixFactor) + accentColor.b * mixFactor;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    particlesGeometry.setAttribute('opacity', new THREE.BufferAttribute(opacities, 1));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    const particlesMaterial = new THREE.ShaderMaterial({
      vertexShader: particlesVertexShader,
      fragmentShader: particlesFragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uMouseRadius: { value: 0.5 },
        uMouseStrength: { value: 0.0 }, // Сила взаимодействия (может быть как положительной, так и отрицательной)
      },
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    particlesMaterialRef.current = particlesMaterial;
    
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    particlesRef.current = particles;
    scene.add(particles);

    // Создаем соединительные линии между частицами
    const createConnectingLines = () => {
      const linesGeometry = new THREE.BufferGeometry();
      const maxConnections = 300; // Максимальное количество соединений
      
      // Создаем вершины для линий (по 2 вершины на каждую линию)
      const vertices = new Float32Array(maxConnections * 6); // xyz * 2 вершины
      const visibility = new Float32Array(maxConnections * 2); // Видимость для каждой вершины
      
      // Сначала заполняем нулями, потом будем обновлять динамически
      for (let i = 0; i < maxConnections * 6; i++) {
        vertices[i] = 0;
      }
      
      for (let i = 0; i < maxConnections * 2; i++) {
        visibility[i] = 0; // Изначально все линии невидимы
      }
      
      linesGeometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
      linesGeometry.setAttribute('visibility', new THREE.BufferAttribute(visibility, 1));
      
      const linesMaterial = new THREE.ShaderMaterial({
        vertexShader: connectingLinesVertexShader,
        fragmentShader: connectingLinesFragmentShader,
        uniforms: {
          uColor: { value: new THREE.Color(0x88aaff) },
          uTime: { value: 0 },
        },
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      
      linesMaterialRef.current = linesMaterial;
      
      const lines = new THREE.LineSegments(linesGeometry, linesMaterial);
      linesRef.current = lines;
      return lines;
    };
    
    const connectingLines = createConnectingLines();
    scene.add(connectingLines);

    // Создаем световые лучи
    const createRay = (angle: number, length: number, width: number, color: THREE.Color) => {
      const rayGeometry = new THREE.PlaneGeometry(width, length);
      const rayMaterial = new THREE.MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: 0.3,
        blending: THREE.AdditiveBlending,
      });
      
      const ray = new THREE.Mesh(rayGeometry, rayMaterial);
      ray.position.x = Math.cos(angle) * (length / 2 + 0.8);
      ray.position.y = Math.sin(angle) * (length / 2 + 0.8);
      ray.rotation.z = angle;
      
      return ray;
    };
    
    // Добавляем 8 лучей
    const rayGroup = new THREE.Group();
    const rayCount = 8;
    for (let i = 0; i < rayCount; i++) {
      const angle = (i / rayCount) * Math.PI * 2;
      const length = 0.6 + Math.random() * 0.4;
      const width = 0.1 + Math.random() * 0.1;
      const color = new THREE.Color().lerpColors(baseColor, accentColor, Math.random());
      
      const ray = createRay(angle, length, width, color);
      rayGroup.add(ray);
    }
    scene.add(rayGroup);

    // Эффект ореола
    const createGlow = (radius: number, color: THREE.Color) => {
      const glowGeometry = new THREE.CircleGeometry(radius, 32);
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: 0.2,
        blending: THREE.AdditiveBlending,
      });
      
      return new THREE.Mesh(glowGeometry, glowMaterial);
    };
    
    const outerGlow = createGlow(2.2, baseColor);
    scene.add(outerGlow);

    // Создание и добавление 3D букв "N" в центре
    const createLetter = () => {
      // Создаем группу для букв
      const letterGroup = new THREE.Group();
      
      // Создаем вертикальную линию для N
      const vLineGeometry = new THREE.PlaneGeometry(0.12, 0.6);
      const letterMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.95,
      });
      
      const leftLine = new THREE.Mesh(vLineGeometry, letterMaterial.clone());
      leftLine.position.set(-0.15, 0, 0.01);
      letterGroup.add(leftLine);
      
      const rightLine = new THREE.Mesh(vLineGeometry, letterMaterial.clone());
      rightLine.position.set(0.15, 0, 0.01);
      letterGroup.add(rightLine);
      
      // Создаем диагональную линию для N
      const dLineGeometry = new THREE.PlaneGeometry(0.14, 0.7);
      const diagonalLine = new THREE.Mesh(dLineGeometry, letterMaterial.clone());
      diagonalLine.position.set(0, 0, 0.01);
      diagonalLine.rotation.z = Math.PI / 5; // Угол наклона
      letterGroup.add(diagonalLine);
      
      return letterGroup;
    };
    
    const letter = createLetter();
    scene.add(letter);

    // Создаем "электрические разряды" - линии молний
    const createLightningEffect = () => {
      const lightningGroup = new THREE.Group();
      
      // Создаем несколько случайных молний
      for (let i = 0; i < 4; i++) {
        const points = [];
        const segments = 5 + Math.floor(Math.random() * 3);
        const radius = 0.6 + Math.random() * 0.4;
        const angle = Math.random() * Math.PI * 2;
        const startX = Math.cos(angle) * 0.4;
        const startY = Math.sin(angle) * 0.4;
        const endX = Math.cos(angle) * radius;
        const endY = Math.sin(angle) * radius;
        
        points.push(new THREE.Vector3(startX, startY, 0.01));
        
        // Добавляем случайные точки между началом и концом для эффекта зигзага
        for (let j = 1; j < segments - 1; j++) {
          const t = j / (segments - 1);
          const posX = startX + (endX - startX) * t;
          const posY = startY + (endY - startY) * t;
          
          // Добавляем случайное смещение перпендикулярно направлению молнии
          const perpX = -(endY - startY);
          const perpY = endX - startX;
          const perpLength = Math.sqrt(perpX * perpX + perpY * perpY);
          const normalizedPerpX = perpX / perpLength;
          const normalizedPerpY = perpY / perpLength;
          
          const offset = (Math.random() - 0.5) * 0.15;
          
          points.push(new THREE.Vector3(
            posX + normalizedPerpX * offset,
            posY + normalizedPerpY * offset,
            0.01
          ));
        }
        
        points.push(new THREE.Vector3(endX, endY, 0.01));
        
        const lightningGeometry = new THREE.BufferGeometry().setFromPoints(points);
        const lightningMaterial = new THREE.LineBasicMaterial({
          color: new THREE.Color().lerpColors(baseColor, accentColor, Math.random()),
          transparent: true,
          opacity: 0.0, // Изначально невидимый
          blending: THREE.AdditiveBlending,
        });
        
        const lightning = new THREE.Line(lightningGeometry, lightningMaterial);
        lightning.userData = { startTime: Math.random() * 5 }; // Для анимации
        lightningGroup.add(lightning);
      }
      
      lightningGroup.visible = false; // Изначально скрыт
      return lightningGroup;
    };
    
    const lightningEffect = createLightningEffect();
    scene.add(lightningEffect);
    
    // Функция для обновления соединительных линий
    const updateConnectingLines = () => {
      if (!linesRef.current || !particlesRef.current) return;
      
      const linesGeometry = linesRef.current.geometry;
      const particlesGeometry = particlesRef.current.geometry;
      
      const particlePositions = particlesGeometry.attributes.position.array;
      const linePositions = linesGeometry.attributes.position.array;
      const lineVisibilities = linesGeometry.attributes.visibility.array;
      
      const maxDistance = isHovered ? 0.4 : 0.3; // Максимальное расстояние для соединения
      let connectionCount = 0;
      
      // Сбрасываем все видимости
      for (let i = 0; i < lineVisibilities.length; i++) {
        lineVisibilities[i] = 0;
      }
      
      // Соединяем близкие частицы с курсором
      const localMouseX = mouseRef.current.x;
      const localMouseY = mouseRef.current.y;
      
      // Перебираем каждую частицу
      for (let i = 0; i < particlesCount; i++) {
        const ix = particlePositions[i * 3];
        const iy = particlePositions[i * 3 + 1];
        
        // Соединяем частицу с мышью, если она достаточно близко
        const distToMouse = Math.sqrt(
          Math.pow(ix - localMouseX, 2) + 
          Math.pow(iy - localMouseY, 2)
        );
        
        if (isHovered && distToMouse < 0.8 && connectionCount < linesGeometry.attributes.position.count / 2) {
          // Устанавливаем начало линии в позицию частицы
          linePositions[connectionCount * 6] = ix;
          linePositions[connectionCount * 6 + 1] = iy;
          linePositions[connectionCount * 6 + 2] = 0;
          
          // Устанавливаем конец линии в позицию мыши
          linePositions[connectionCount * 6 + 3] = localMouseX;
          linePositions[connectionCount * 6 + 4] = localMouseY;
          linePositions[connectionCount * 6 + 5] = 0;
          
          // Устанавливаем видимость линии в зависимости от расстояния
          const visibility = 1.0 - distToMouse / 0.8;
          lineVisibilities[connectionCount * 2] = visibility;
          lineVisibilities[connectionCount * 2 + 1] = visibility;
          
          connectionCount++;
        }
        
        // Также соединяем близкие частицы между собой
        if (connectionCount < linesGeometry.attributes.position.count / 2) {
          for (let j = i + 1; j < particlesCount; j++) {
            const jx = particlePositions[j * 3];
            const jy = particlePositions[j * 3 + 1];
            
            const dist = Math.sqrt(
              Math.pow(ix - jx, 2) + 
              Math.pow(iy - jy, 2)
            );
            
            if (dist < maxDistance && connectionCount < linesGeometry.attributes.position.count / 2) {
              // Устанавливаем начало линии
              linePositions[connectionCount * 6] = ix;
              linePositions[connectionCount * 6 + 1] = iy;
              linePositions[connectionCount * 6 + 2] = 0;
              
              // Устанавливаем конец линии
              linePositions[connectionCount * 6 + 3] = jx;
              linePositions[connectionCount * 6 + 4] = jy;
              linePositions[connectionCount * 6 + 5] = 0;
              
              // Устанавливаем видимость линии в зависимости от расстояния
              const visibility = 1.0 - dist / maxDistance;
              lineVisibilities[connectionCount * 2] = visibility * 0.3; // Слабее, чем связи с мышью
              lineVisibilities[connectionCount * 2 + 1] = visibility * 0.3;
              
              connectionCount++;
            }
          }
        }
      }
      
      linesGeometry.attributes.position.needsUpdate = true;
      linesGeometry.attributes.visibility.needsUpdate = true;
    };

    // Анимация молний
    const updateLightningEffect = () => {
      if (!lightningEffect.visible) return;
      
      lightningEffect.children.forEach((lightning, index) => {
        if (lightning instanceof THREE.Line && lightning.material instanceof THREE.LineBasicMaterial) {
          const time = timeRef.current - lightning.userData.startTime;
          const cycleTime = 0.6; // Длительность цикла в секундах
          
          if (time % cycleTime < 0.1) {
            // Быстрая вспышка
            lightning.material.opacity = 0.8;
          } else if (time % cycleTime < 0.2) {
            // Затухание
            lightning.material.opacity = 0.4;
          } else if (time % cycleTime < 0.25) {
            // Еще одна короткая вспышка
            lightning.material.opacity = 0.6;
          } else {
            // Скрытый
            lightning.material.opacity = 0;
          }
        }
      });
    };

    // Обработка позиции мыши для шейдеров
    const updateMouse = (x: number, y: number) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const canvasSize = 140; // Размер нашего канваса
      
      // Вычисляем нормализованные координаты от -1 до 1
      const normalizedX = ((x - rect.left) / rect.width) * 2 - 1;
      const normalizedY = -((y - rect.top) / rect.height) * 2 + 1;
      
      // Пересчитываем в координаты сцены
      const vector = new THREE.Vector3(normalizedX, normalizedY, 0);
      vector.unproject(camera);
      const dir = vector.sub(camera.position).normalize();
      const distance = -camera.position.z / dir.z;
      const pos = camera.position.clone().add(dir.multiplyScalar(distance));
      
      // Обновляем позицию мыши для использования в шейдерах
      mouseRef.current.x = pos.x;
      mouseRef.current.y = pos.y;
      
      // Обновляем uniforms для шейдеров
      if (shaderMaterialRef.current) {
        shaderMaterialRef.current.uniforms.uMouse.value.set(
          (x - rect.left) / rect.width,
          1.0 - (y - rect.top) / rect.height
        );
      }
      
      if (particlesMaterialRef.current) {
        particlesMaterialRef.current.uniforms.uMouse.value.set(pos.x, pos.y);
      }
    };

    // Анимационный цикл
    const animate = () => {
      timeRef.current += 0.01;
      
      // Обновляем все шейдеры с текущим временем
      if (shaderMaterialRef.current) {
        shaderMaterialRef.current.uniforms.uTime.value = timeRef.current;
      }
      
      if (particlesMaterialRef.current) {
        particlesMaterialRef.current.uniforms.uTime.value = timeRef.current;
      }
      
      if (linesMaterialRef.current) {
        linesMaterialRef.current.uniforms.uTime.value = timeRef.current;
      }
      
      // Обновляем эффект клика в шейдере
      if (shaderMaterialRef.current && clickTimeRef.current > 0) {
        const elapsed = timeRef.current - clickTimeRef.current;
        const intensity = Math.max(0, 1 - elapsed * 2); // Затухает за 0.5 секунды
        shaderMaterialRef.current.uniforms.uClickIntensity.value = intensity;
        
        if (intensity <= 0) {
          clickTimeRef.current = 0;
        }
      }
      
      // Обновляем эффект молний
      updateLightningEffect();
      
      // Обновляем соединительные линии
      updateConnectingLines();
      
      // Анимация вращения лучей
      rayGroup.rotation.z = timeRef.current * 0.2;
      
      // Вращение шестиугольной решетки в противоположном направлении
      hexGrid.rotation.z = -timeRef.current * 0.1;
      
      // Вращение энергетических колец с разной скоростью
      energyRings.children.forEach((ring, index) => {
        ring.rotation.z = timeRef.current * (0.2 + index * 0.1) * (index % 2 === 0 ? 1 : -1);
      });
      
      // Пульсация для эффекта "живого" логотипа
      const pulseFactor = Math.sin(timeRef.current * 1.5) * 0.05 + 1;
      hexagon.scale.set(pulseFactor, pulseFactor, 1);
      
      // Вращение внутреннего шестиугольника
      hexagon.rotation.z = Math.PI / 6 + timeRef.current * 0.1;
      
      // Пульсация яркости центрального ядра
      if (coreMaterial instanceof THREE.MeshBasicMaterial) {
        const brightness = 0.8 + Math.sin(timeRef.current * 3) * 0.1;
        coreMaterial.opacity = brightness;
      }

      // Управление взаимодействием частиц с мышью в зависимости от состояния
      if (particlesMaterialRef.current) {
        if (isHovered) {
          // Плавно увеличиваем силу взаимодействия
          const currentStrength = particlesMaterialRef.current.uniforms.uMouseStrength.value;
          const targetStrength = isPressed ? -0.2 : 0.1; // Притягивание или отталкивание
          particlesMaterialRef.current.uniforms.uMouseStrength.value += (targetStrength - currentStrength) * 0.05;
        } else {
          // Плавно уменьшаем силу взаимодействия до нуля
          particlesMaterialRef.current.uniforms.uMouseStrength.value *= 0.95;
        }
      }
      
      // Сила взаимодействия курсора с основным диском
      if (shaderMaterialRef.current) {
        const currentStrength = shaderMaterialRef.current.uniforms.uInteractionStrength.value;
        const targetStrength = isHovered ? (isPressed ? 1.0 : 0.5) : 0.0;
        shaderMaterialRef.current.uniforms.uInteractionStrength.value += (targetStrength - currentStrength) * 0.05;
      }

      renderer.render(scene, camera);
      frameIdRef.current = requestAnimationFrame(animate);
    };
    
    animate();

    // Обработка событий hover и click
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      updateMouse(e.clientX, e.clientY);
    };
    
    const handleMouseEnter = () => {
      setIsHovered(true);
      
      // Анимация при наведении
      gsap.to(camera.position, {
        z: 4.5,
        duration: 0.8,
        ease: "power2.out"
      });
      
      gsap.to(outerGlow.scale, {
        x: 1.2,
        y: 1.2,
        duration: 0.5,
        ease: "power1.out"
      });
      
      // Увеличиваем интенсивность лучей
      rayGroup.children.forEach(ray => {
        if (ray instanceof THREE.Mesh && ray.material instanceof THREE.MeshBasicMaterial) {
          gsap.to(ray.material, {
            opacity: 0.6,
            duration: 0.5
          });
        }
      });
    };
    
    const handleMouseLeave = () => {
      setIsHovered(false);
      setIsPressed(false);
      
      // Возврат анимации в обычное состояние
      gsap.to(camera.position, {
        z: 5,
        duration: 0.8,
        ease: "power2.out"
      });
      
      gsap.to(outerGlow.scale, {
        x: 1,
        y: 1,
        duration: 0.5,
        ease: "power1.out"
      });
      
      // Возвращаем нормальную интенсивность лучей
      rayGroup.children.forEach(ray => {
        if (ray instanceof THREE.Mesh && ray.material instanceof THREE.MeshBasicMaterial) {
          gsap.to(ray.material, {
            opacity: 0.3,
            duration: 0.5
          });
        }
      });
      
      // Скрываем молнии
      lightningEffect.visible = false;
    };
    
    const handleMouseDown = () => {
      setIsPressed(true);
      
      // Показываем молнии при нажатии
      lightningEffect.visible = true;
      
      // Обновляем начальное время для эффекта молний
      lightningEffect.children.forEach(lightning => {
        lightning.userData.startTime = timeRef.current;
      });
      
      // Запоминаем время клика для эффекта волны
      clickTimeRef.current = timeRef.current;
    };
    
    const handleMouseUp = () => {
      setIsPressed(false);
    };
    
    const handleClick = () => {
      setIsClicked(true);
      
      // Эффектная анимация при клике
      gsap.to(letter.scale, {
        x: 1.3,
        y: 1.3,
        duration: 0.2,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut"
      });
      
      gsap.to(disc.scale, {
        x: 0.8,
        y: 0.8,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power1.inOut",
        onComplete: () => {
          // Добавляем яркую вспышку
          const flashGeometry = new THREE.CircleGeometry(3, 32);
          const flashMaterial = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending,
          });
          
          const flash = new THREE.Mesh(flashGeometry, flashMaterial);
          scene.add(flash);
          
          gsap.to(flashMaterial, {
            opacity: 0,
            duration: 0.5,
            onComplete: () => {
              scene.remove(flash);
              navigate('/');
              setIsClicked(false);
            }
          });
        }
      });
    };

    const container = containerRef.current;
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mousedown', handleMouseDown);
    container.addEventListener('mouseup', handleMouseUp);
    container.addEventListener('click', handleClick);

    // Очистка ресурсов при размонтировании
    return () => {
      if (frameIdRef.current) {
        cancelAnimationFrame(frameIdRef.current);
      }
      
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mousedown', handleMouseDown);
      container.removeEventListener('mouseup', handleMouseUp);
      container.removeEventListener('click', handleClick);
      
      // Очистка Three.js ресурсов
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Points || object instanceof THREE.Line) {
          object.geometry.dispose();
          
          if (Array.isArray(object.material)) {
            object.material.forEach(material => material.dispose());
          } else if (object.material) {
            object.material.dispose();
          }
        }
      });
      
      renderer.dispose();
    };
  }, [navigate, isHovered, isPressed]);

  return (
    <div
      ref={containerRef}
      className="relative flex items-center justify-center w-16 h-16 cursor-pointer"
    >
      <canvas
        ref={canvasRef}
        className="absolute transform scale-50"
        style={{ pointerEvents: 'none' }}
      />
      
      {/* Интерактивные эффекты при наведении */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600/30 to-purple-600/30 opacity-0"
        animate={{ opacity: isHovered ? 0.6 : 0 }}
        transition={{ duration: 0.3 }}
      />
      
      <motion.div
        className="absolute inset-[-5px] border-2 border-blue-500/0 rounded-full"
        animate={{
          borderColor: isHovered 
            ? 'rgba(59, 130, 246, 0.5)' 
            : 'rgba(59, 130, 246, 0)',
          boxShadow: isHovered 
            ? '0 0 15px rgba(59, 130, 246, 0.5), 0 0 30px rgba(139, 92, 246, 0.3)' 
            : '0 0 0px rgba(59, 130, 246, 0)',
        }}
        transition={{ duration: 0.4 }}
      />

      {/* Добавляем подсказку, чтобы пользователь знал, что может взаимодействовать с логотипом */}
      {isHovered && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="absolute px-2 py-1 text-xs text-white rounded-md -bottom-8 bg-slate-800/90 whitespace-nowrap"
        >
          {isPressed ? "Частицы отталкиваются!" : "Нажми и удерживай"}
        </motion.div>
      )}
    </div>
  );
};

export default NexusLogo;
