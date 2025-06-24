import React, { useRef, useState, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Box, Plane, Sphere, Ring } from '@react-three/drei';
import * as THREE from 'three';

interface InteractiveBookProps {
  isOpen: boolean;
  onClick: () => void;
}

// Компонент для анимированной страницы
const AnimatedPage: React.FC<{ 
  index: number; 
  isOpen: boolean; 
  delay: number;
}> = ({ index, isOpen, delay }) => {
  const pageRef = useRef<THREE.Group>(null);
  const [progress, setProgress] = useState(0);

  useFrame((state, delta) => {
    if (!pageRef.current) return;
    
    const targetProgress = isOpen ? 1 : 0;
    setProgress(prev => THREE.MathUtils.lerp(prev, targetProgress, 0.05));
    
    // Анимация перелистывания
    const rotation = progress * Math.PI * 0.8;
    pageRef.current.rotation.y = -rotation;
    
    // Изгиб страницы при перелистывании
    const curve = Math.sin(progress * Math.PI) * 0.2;
    pageRef.current.position.z = curve;
  });

  return (
    <group ref={pageRef} position={[1.25 - index * 0.005, 0.18 + index * 0.002, 0]}>
      <Plane args={[2.5, 3.4]}>
        <meshStandardMaterial 
          color="#faf8f3" 
          side={THREE.DoubleSide}
          roughness={0.9}
        />
      </Plane>
    </group>
  );
};

// Компонент для магических частиц
const MagicParticle: React.FC<{ position: THREE.Vector3; delay: number }> = ({ position, delay }) => {
  const particleRef = useRef<THREE.Mesh>(null);
  const [lifetime, setLifetime] = useState(0);

  useFrame((state, delta) => {
    if (!particleRef.current) return;
    
    setLifetime(prev => prev + delta);
    
    // Движение вверх и затухание
    particleRef.current.position.y += delta * 0.5;
    particleRef.current.material.opacity = Math.max(0, 1 - lifetime / 3);
    
    // Вращение
    particleRef.current.rotation.z += delta * 2;
    
    // Сброс позиции
    if (lifetime > 3) {
      setLifetime(0);
      particleRef.current.position.copy(position);
    }
  });

  return (
    <mesh ref={particleRef} position={position}>
      <planeGeometry args={[0.05, 0.05]} />
      <meshBasicMaterial 
        color="#4FC3F7" 
        transparent 
        opacity={0}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
};

// Компонент светящегося кольца
const GlowRing: React.FC<{ isHovered: boolean }> = ({ isHovered }) => {
  const ringRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!ringRef.current) return;
    
    ringRef.current.rotation.z = state.clock.elapsedTime * 0.5;
    const scale = isHovered ? 1.2 : 0;
    ringRef.current.scale.setScalar(THREE.MathUtils.lerp(ringRef.current.scale.x, scale, 0.1));
  });

  return (
    <mesh ref={ringRef} position={[0, -0.3, 0]} rotation={[Math.PI / 2, 0, 0]}>
      <ringGeometry args={[2.5, 2.8, 64]} />
      <meshBasicMaterial 
        color="#4FC3F7" 
        transparent 
        opacity={0.3}
        side={THREE.DoubleSide}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
};

const InteractiveBook: React.FC<InteractiveBookProps> = ({ isOpen, onClick }) => {
  const bookRef = useRef<THREE.Group>(null);
  const coverRef = useRef<THREE.Group>(null);
  const pagesRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const [bookScale, setBookScale] = useState(1);
  const [glowIntensity, setGlowIntensity] = useState(0);
  
  // Создаем текстуру обложки с текстом и слоном
  const coverTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d')!;
    
    // Градиент для основы
    const gradient = ctx.createLinearGradient(0, 0, 1024, 1024);
    gradient.addColorStop(0, '#1e3a8a');
    gradient.addColorStop(0.5, '#2c5aa0');
    gradient.addColorStop(1, '#1e3a8a');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1024, 1024);
    
    // Текстура кожи
    for (let i = 0; i < 2000; i++) {
      const x = Math.random() * 1024;
      const y = Math.random() * 1024;
      const size = Math.random() * 3 + 1;
      const opacity = Math.random() * 0.1;
      
      ctx.fillStyle = `rgba(0,0,0,${opacity})`;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }
    
    // Золотая рамка
    ctx.strokeStyle = '#FFD700';
    ctx.lineWidth = 30;
    ctx.strokeRect(60, 60, 904, 904);
    
    // Внутренняя рамка
    ctx.strokeStyle = '#B8860B';
    ctx.lineWidth = 10;
    ctx.strokeRect(80, 80, 864, 864);
    
    // Стилизованный слон PostgreSQL (улучшенный)
    ctx.save();
    
    // Тень под слоном
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.beginPath();
    ctx.ellipse(512, 320, 150, 30, 0, 0, 2 * Math.PI);
    ctx.fill();
    
    // Тело слона
    const bodyGradient = ctx.createLinearGradient(420, 200, 580, 280);
    bodyGradient.addColorStop(0, '#4FC3F7');
    bodyGradient.addColorStop(1, '#336791');
    ctx.fillStyle = bodyGradient;
    ctx.beginPath();
    ctx.roundRect(440, 200, 144, 80, 20);
    ctx.fill();
    
    // Голова слона
    ctx.fillStyle = '#4FC3F7';
    ctx.beginPath();
    ctx.roundRect(400, 190, 70, 60, 15);
    ctx.fill();
    
    // Хобот
    ctx.beginPath();
    ctx.moveTo(400, 220);
    ctx.quadraticCurveTo(380, 240, 370, 260);
    ctx.quadraticCurveTo(365, 270, 370, 280);
    ctx.lineWidth = 25;
    ctx.strokeStyle = '#336791';
    ctx.lineCap = 'round';
    ctx.stroke();
    
    // Уши
    ctx.fillStyle = '#4FC3F7';
    ctx.beginPath();
    ctx.ellipse(390, 180, 18, 25, -Math.PI / 6, 0, 2 * Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(420, 180, 18, 25, Math.PI / 6, 0, 2 * Math.PI);
    ctx.fill();
    
    // Ноги
    ctx.fillStyle = '#1e3a8a';
    ctx.beginPath();
    ctx.roundRect(460, 280, 25, 40, 5);
    ctx.fill();
    ctx.beginPath();
    ctx.roundRect(540, 280, 25, 40, 5);
    ctx.fill();
    
    // Глаза
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(395, 210, 8, 0, 2 * Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(415, 210, 8, 0, 2 * Math.PI);
    ctx.fill();
    
    // Зрачки
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.arc(395, 210, 4, 0, 2 * Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(415, 210, 4, 0, 2 * Math.PI);
    ctx.fill();
    
    // Блики на теле
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.beginPath();
    ctx.roundRect(450, 210, 35, 18, 5);
    ctx.fill();
    ctx.beginPath();
    ctx.roundRect(520, 230, 30, 15, 5);
    ctx.fill();
    
    ctx.restore();
    
    // Заголовок PostgreSQL
    ctx.font = 'bold 110px Georgia, serif';
    ctx.fillStyle = '#FFD700';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = '#000000';
    ctx.shadowBlur = 15;
    ctx.shadowOffsetX = 4;
    ctx.shadowOffsetY = 4;
    ctx.fillText('PostgreSQL', 512, 450);
    
    // Подзаголовок
    ctx.font = '65px Georgia, serif';
    ctx.fillStyle = '#4FC3F7';
    ctx.shadowBlur = 8;
    ctx.fillText('ОСНОВЫ SQL', 512, 550);
    
    // Декоративная линия
    ctx.beginPath();
    ctx.moveTo(200, 620);
    ctx.lineTo(824, 620);
    ctx.strokeStyle = '#FFD700';
    ctx.lineWidth = 3;
    ctx.stroke();
    
    // Описание
    ctx.font = '42px Georgia, serif';
    ctx.fillStyle = '#FFD700';
    ctx.shadowBlur = 5;
    ctx.fillText('Интерактивное руководство', 512, 700);
    
    // Декоративные точки внизу
    ctx.fillStyle = '#FFD700';
    ctx.shadowBlur = 8;
    for (let i = 0; i < 5; i++) {
      ctx.beginPath();
      ctx.arc(412 + i * 50, 800, 10, 0, 2 * Math.PI);
      ctx.fill();
    }
    
    // Нижняя надпись
    ctx.font = 'italic 34px Georgia, serif';
    ctx.fillStyle = '#B8860B';
    ctx.textAlign = 'center';
    ctx.shadowBlur = 4;
    ctx.fillText('Postgres Professional', 512, 900);
    
    // Потертости по краям
    ctx.strokeStyle = 'rgba(255,255,255,0.05)';
    ctx.lineWidth = 20;
    ctx.strokeRect(10, 10, 1004, 1004);
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, []);

  // Текстура для корешка
  const spineTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d')!;
    
    // Основа корешка
    const gradient = ctx.createLinearGradient(0, 0, 0, 1024);
    gradient.addColorStop(0, '#1e3a8a');
    gradient.addColorStop(0.5, '#2c5aa0');
    gradient.addColorStop(1, '#1e3a8a');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 128, 1024);
    
    // Золотые полосы
    const stripePositions = [200, 512, 824];
    stripePositions.forEach(y => {
      ctx.fillStyle = '#FFD700';
      ctx.fillRect(0, y - 40, 128, 80);
    });
    
    // Текст на корешке
    ctx.save();
    ctx.translate(64, 512);
    ctx.rotate(-Math.PI / 2);
    ctx.font = 'bold 48px Georgia, serif';
    ctx.fillStyle = '#FFD700';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = '#000000';
    ctx.shadowBlur = 5;
    ctx.fillText('PostgreSQL • ОСНОВЫ SQL', 0, 0);
    ctx.restore();
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, []);

  // Создаем золотую фольгу
  const goldFoilTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d')!;
    
    // Золотой градиент
    const gradient = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
    gradient.addColorStop(0, '#FFD700');
    gradient.addColorStop(0.5, '#FFA500');
    gradient.addColorStop(1, '#FFD700');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 256, 256);
    
    // Блики
    for (let i = 0; i < 50; i++) {
      ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.3})`;
      ctx.fillRect(Math.random() * 256, Math.random() * 256, 2, 2);
    }
    
    return new THREE.CanvasTexture(canvas);
  }, []);

  // Анимация
  useFrame((state, delta) => {
    if (!bookRef.current) return;

    // Плавное покачивание при наведении
    if (!isOpen && hovered) {
      bookRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 2) * 0.08;
      bookRef.current.position.y = Math.sin(state.clock.elapsedTime * 3) * 0.03;
    } else if (!isOpen) {
      bookRef.current.rotation.y = THREE.MathUtils.lerp(bookRef.current.rotation.y, 0, 0.1);
      bookRef.current.position.y = THREE.MathUtils.lerp(bookRef.current.position.y, 0, 0.1);
    }

    // Анимация открытия обложки с отскоком
    if (coverRef.current) {
      const targetRotation = isOpen ? -Math.PI * 0.85 : 0;
      const springRotation = isOpen 
        ? targetRotation + Math.sin(state.clock.elapsedTime * 5) * 0.02 
        : targetRotation;
      
      coverRef.current.rotation.y = THREE.MathUtils.lerp(
        coverRef.current.rotation.y,
        springRotation,
        0.08
      );
    }

    // Анимация масштаба
    const targetScale = hovered && !isOpen ? 1.08 : 1;
    setBookScale(THREE.MathUtils.lerp(bookScale, targetScale, 0.1));
    
    // Пульсирующее свечение
    setGlowIntensity(hovered ? Math.sin(state.clock.elapsedTime * 3) * 0.5 + 0.5 : 0);
  });

  // Материалы
  const coverMaterial = new THREE.MeshPhysicalMaterial({
    map: coverTexture,
    roughness: 0.7,
    metalness: 0.1,
    clearcoat: 0.5,
    clearcoatRoughness: 0.3,
  });

  const spineMaterial = new THREE.MeshPhysicalMaterial({
    map: spineTexture,
    roughness: 0.7,
    metalness: 0.1,
    clearcoat: 0.5,
    clearcoatRoughness: 0.3,
  });

  const pageMaterial = new THREE.MeshStandardMaterial({
    color: '#faf8f3',
    roughness: 0.95,
    metalness: 0,
  });

  const goldMaterial = new THREE.MeshPhysicalMaterial({
    map: goldFoilTexture,
    color: '#FFD700',
    roughness: 0.2,
    metalness: 0.9,
    clearcoat: 1,
    clearcoatRoughness: 0.1,
    emissive: '#FFD700',
    emissiveIntensity: glowIntensity * 0.3,
  });

  // Частицы при открытии
  const [magicParticles, setMagicParticles] = useState<THREE.Vector3[]>([]);
  
  useEffect(() => {
    if (isOpen) {
      const particles = [];
      for (let i = 0; i < 30; i++) {
        particles.push(new THREE.Vector3(
          (Math.random() - 0.5) * 4,
          Math.random() * 0.5 - 0.5,
          (Math.random() - 0.5) * 4
        ));
      }
      setMagicParticles(particles);
    } else {
      setMagicParticles([]);
    }
  }, [isOpen]);

  return (
    <group
      ref={bookRef}
      position={[0, 0, 0]}
      scale={[bookScale, bookScale, bookScale]}
      onClick={onClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Магическое свечение под книгой */}
      <GlowRing isHovered={hovered} />

      {/* Основание книги (блок страниц) */}
      <group ref={pagesRef}>
        <Box
          args={[2.5, 0.35, 3.5]}
          position={[0, 0, 0]}
          castShadow
          receiveShadow
        >
          <meshStandardMaterial {...pageMaterial} />
        </Box>
        
        {/* Детализированные линии страниц */}
        {Array.from({ length: 40 }).map((_, i) => (
          <Plane
            key={i}
            args={[0.008, 3.48]}
            position={[1.25, -0.175 + i * 0.009, 0]}
            rotation={[0, Math.PI / 2, 0]}
          >
            <meshBasicMaterial 
              color={i % 5 === 0 ? "#d0d0d0" : "#e5e5e5"} 
              opacity={0.8}
              transparent
            />
          </Plane>
        ))}
        
        {/* Золотой обрез страниц */}
        <Plane
          args={[0.02, 3.5]}
          position={[1.26, 0, 0]}
          rotation={[0, Math.PI / 2, 0]}
        >
          <primitive object={goldMaterial} attach="material" />
        </Plane>
      </group>

      {/* Обложка книги */}
      <group ref={coverRef} position={[-1.25, 0.175, 0]}>
        {/* Передняя обложка с рельефом */}
        <Box
          args={[2.6, 0.08, 3.6]}
          position={[1.3, 0, 0]}
          castShadow
        >
          <primitive object={coverMaterial} attach="material" />
        </Box>

        {/* Многослойная декоративная рамка */}
        <group position={[1.3, 0.045, 0]}>
          {/* Внешняя золотая рамка */}
          <Box args={[2.4, 0.01, 3.4]} position={[0, 0, 0]}>
            <primitive object={goldMaterial} attach="material" />
          </Box>
          
          {/* Средняя рамка */}
          <Box args={[2.3, 0.008, 3.3]} position={[0, 0.005, 0]}>
            <meshStandardMaterial color="#1e3a8a" metalness={0.3} roughness={0.5} />
          </Box>
          
          {/* Внутренняя рамка */}
          <Box args={[2.2, 0.006, 3.2]} position={[0, 0.01, 0]}>
            <primitive object={goldMaterial} attach="material" />
          </Box>
        </group>

        {/* Магическое свечение на обложке при наведении */}
        {hovered && (
          <pointLight
            position={[1.3, 0.2, 0.5]}
            intensity={glowIntensity * 0.8}
            color="#FFD700"
            distance={2}
          />
        )}

        {/* Корешок книги с текстурой */}
        <Box
          args={[0.08, 0.43, 3.6]}
          position={[0, -0.175, 0]}
          castShadow
        >
          <primitive object={spineMaterial} attach="material" />
        </Box>
      </group>

      {/* Задняя обложка */}
      <Box
        args={[2.6, 0.08, 3.6]}
        position={[0, -0.215, 0]}
        castShadow
        receiveShadow
      >
        <primitive object={coverMaterial} attach="material" />
      </Box>

      {/* Эффекты при наведении */}
      {hovered && !isOpen && (
        <>
          {/* Светящиеся точки вокруг книги */}
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i / 8) * Math.PI * 2;
            const radius = 2;
            return (
              <pointLight
                key={i}
                position={[
                  Math.cos(angle) * radius,
                  0.5,
                  Math.sin(angle) * radius
                ]}
                intensity={0.2}
                color="#4FC3F7"
                distance={3}
              />
            );
          })}
        </>
      )}

      {/* Анимированные страницы при открытии */}
      {isOpen && (
        <>
          {Array.from({ length: 5 }).map((_, i) => (
            <AnimatedPage key={i} index={i} isOpen={isOpen} delay={i * 0.1} />
          ))}
        </>
      )}

      {/* Контент при открытии */}
      {isOpen && (
        <group>
          {/* Левая страница */}
          <Plane
            args={[2.4, 3.4]}
            position={[-1.2, 0.18, 0]}
            rotation={[0, 0, 0]}
          >
            <meshStandardMaterial color="#faf8f3" side={THREE.DoubleSide} />
          </Plane>

          {/* Контент на левой странице */}
          <group position={[-1.2, 0.19, 0]}>
            <Text
              position={[0, 1.4, 0]}
              fontSize={0.15}
              color="#1e3a8a"
              anchorX="center"
              anchorY="middle"
            >
              Содержание
            </Text>
            
            {[
              'Глава 1: Введение в PostgreSQL',
              'Глава 2: Основы SQL',
              'Глава 3: DDL операции',
              'Глава 4: DML операции',
              'Глава 5: Индексы',
              'Глава 6: Оптимизация'
            ].map((chapter, i) => (
              <Text
                key={i}
                position={[-0.8, 0.8 - i * 0.25, 0]}
                fontSize={0.09}
                color="#555555"
                anchorX="left"
                anchorY="middle"
              >
                {chapter}
              </Text>
            ))}
          </group>

          {/* Правая страница с интерактивными элементами */}
          <Plane
            args={[2.4, 3.4]}
            position={[1.2, 0.18, 0]}
            rotation={[0, 0, 0]}
          >
            <meshStandardMaterial color="#faf8f3" side={THREE.DoubleSide} />
          </Plane>

          {/* Контент на правой странице */}
          <group position={[1.2, 0.19, 0]}>
            <Text
              position={[0, 1.3, 0]}
              fontSize={0.18}
              color="#1e3a8a"
              anchorX="center"
              anchorY="middle"
            >
              PostgreSQL: The World's Most
            </Text>
            <Text
              position={[0, 1.05, 0]}
              fontSize={0.18}
              color="#1e3a8a"
              anchorX="center"
              anchorY="middle"
            >
              Advanced Open Source Database
            </Text>
            
            {/* Анимированная визуализация базы данных */}
            <group position={[0, 0.2, 0]}>
              {/* Цилиндры базы данных */}
              {[0, -0.15, -0.3].map((y, i) => (
                <mesh key={i} position={[0, y, 0]}>
                  <cylinderGeometry args={[0.35, 0.35, 0.05, 32]} />
                  <meshPhysicalMaterial 
                    color={i === 0 ? "#336791" : "#4FC3F7"}
                    metalness={0.3}
                    roughness={0.4}
                    clearcoat={0.5}
                    opacity={0.9}
                    transparent
                  />
                </mesh>
              ))}
              
              {/* Соединительные линии */}
              {[0.3, -0.3].map((x, i) => (
                <Box key={i} args={[0.4, 0.01, 0.01]} position={[x, -0.075, 0]} rotation={[0, 0, Math.PI / 4 * (i === 0 ? 1 : -1)]}>
                  <meshBasicMaterial color="#FFD700" />
                </Box>
              ))}
            </group>

            <Text
              position={[0, -0.3, 0]}
              fontSize={0.09}
              color="#666666"
              anchorX="center"
              anchorY="middle"
              maxWidth={2}
              textAlign="center"
            >
              Откройте для себя мощь современной
              объектно-реляционной СУБД
            </Text>

            {/* Кнопка "Начать изучение" */}
            <group position={[0, -0.8, 0]}>
              <Box args={[1.2, 0.25, 0.02]} position={[0, 0, 0]}>
                <meshPhysicalMaterial 
                  color="#336791"
                  metalness={0.2}
                  roughness={0.3}
                  clearcoat={0.5}
                />
              </Box>
              <Text
                position={[0, 0, 0.02]}
                fontSize={0.12}
                color="#FFFFFF"
                anchorX="center"
                anchorY="middle"
              >
                📖 Начать изучение
              </Text>
            </group>
            
            <Text
              position={[0, -1.3, 0]}
              fontSize={0.08}
              color="#999999"
              anchorX="center"
              anchorY="middle"
            >
              Postgres Professional © 2024
            </Text>
          </group>

          {/* Магические частицы */}
          {magicParticles.map((pos, i) => (
            <MagicParticle key={i} position={pos} delay={i * 0.1} />
          ))}
          
          {/* Светящиеся сферы для эффекта магии */}
          {isOpen && Array.from({ length: 5 }).map((_, i) => {
            const angle = (i / 5) * Math.PI * 2;
            return (
              <mesh key={i} position={[Math.cos(angle) * 1.5, 0.5, Math.sin(angle) * 1.5]}>
                <sphereGeometry args={[0.05, 16, 16]} />
                <meshBasicMaterial 
                  color="#4FC3F7"
                  transparent
                  opacity={0.6}
                  blending={THREE.AdditiveBlending}
                />
              </mesh>
            );
          })}
        </group>
      )}

      {/* Динамическая тень с blur эффектом */}
      <Plane
        args={[4, 5]}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.5, 0]}
        receiveShadow
      >
        <shadowMaterial 
          opacity={hovered ? 0.6 : 0.3} 
          blur={2}
        />
      </Plane>
    </group>
  );
};

export default InteractiveBook;