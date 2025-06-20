import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Box, Plane } from '@react-three/drei';
import * as THREE from 'three';

interface InteractiveBookProps {
  isOpen: boolean;
  onClick: () => void;
}

const InteractiveBook: React.FC<InteractiveBookProps> = ({ isOpen, onClick }) => {
  const bookRef = useRef<THREE.Group>(null);
  const coverRef = useRef<THREE.Group>(null);
  const pagesRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const [bookScale, setBookScale] = useState(1);
  
  // Создаем процедурную текстуру для кожи
  const createLeatherTexture = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d')!;
    
    // Создаем текстуру кожи
    ctx.fillStyle = '#1e3a8a';
    ctx.fillRect(0, 0, 256, 256);
    
    // Добавляем шум для текстуры
    for (let i = 0; i < 1000; i++) {
      ctx.fillStyle = `rgba(0,0,0,${Math.random() * 0.1})`;
      ctx.fillRect(Math.random() * 256, Math.random() * 256, 2, 2);
    }
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.repeat.set(2, 2);
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    return texture;
  };

  // Анимация
  useFrame((state, delta) => {
    if (!bookRef.current) return;

    // Плавное покачивание при наведении
    if (!isOpen && hovered) {
      bookRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 2) * 0.05;
      bookRef.current.position.y = Math.sin(state.clock.elapsedTime * 3) * 0.02;
    } else if (!isOpen) {
      bookRef.current.rotation.y = THREE.MathUtils.lerp(bookRef.current.rotation.y, 0, 0.1);
      bookRef.current.position.y = THREE.MathUtils.lerp(bookRef.current.position.y, 0, 0.1);
    }

    // Анимация открытия обложки
    if (coverRef.current) {
      const targetRotation = isOpen ? -Math.PI * 0.85 : 0;
      coverRef.current.rotation.y = THREE.MathUtils.lerp(
        coverRef.current.rotation.y,
        targetRotation,
        0.08
      );
    }

    // Анимация масштаба при наведении
    const targetScale = hovered && !isOpen ? 1.05 : 1;
    setBookScale(THREE.MathUtils.lerp(bookScale, targetScale, 0.1));
  });

  // Материалы с улучшенными текстурами
  const coverMaterial = new THREE.MeshPhysicalMaterial({
    color: '#1e3a8a',
    roughness: 0.6,
    metalness: 0.1,
    clearcoat: 0.3,
    clearcoatRoughness: 0.4,
    map: createLeatherTexture(),
  });

  const pageMaterial = new THREE.MeshStandardMaterial({
    color: '#faf8f3',
    roughness: 0.95,
    metalness: 0,
  });

  const goldMaterial = new THREE.MeshStandardMaterial({
    color: '#FFD700',
    roughness: 0.25,
    metalness: 0.9,
    emissive: '#FFD700',
    emissiveIntensity: 0.1,
  });

  // Эффект частиц при открытии
  const [particles, setParticles] = useState<THREE.Vector3[]>([]);
  
  useEffect(() => {
    if (isOpen) {
      const newParticles = [];
      for (let i = 0; i < 20; i++) {
        newParticles.push(new THREE.Vector3(
          (Math.random() - 0.5) * 3,
          Math.random() * 2,
          (Math.random() - 0.5) * 3
        ));
      }
      setParticles(newParticles);
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
        
        {/* Линии страниц на торце */}
        {Array.from({ length: 30 }).map((_, i) => (
          <Plane
            key={i}
            args={[0.01, 3.5]}
            position={[1.25, -0.175 + i * 0.012, 0]}
            rotation={[0, Math.PI / 2, 0]}
          >
            <meshBasicMaterial color="#e0e0e0" />
          </Plane>
        ))}
      </group>

      {/* Обложка книги (может открываться) */}
      <group ref={coverRef} position={[-1.25, 0.175, 0]}>
        {/* Передняя обложка */}
        <Box
          args={[2.6, 0.08, 3.6]}
          position={[1.3, 0, 0]}
          castShadow
        >
          <primitive object={coverMaterial} attach="material" />
        </Box>

        {/* Декоративная рамка на обложке */}
        <group position={[1.3, 0.045, 0]}>
          {/* Золотая рамка */}
          <Box args={[2.3, 0.005, 3.3]} position={[0, 0, 0]}>
            <primitive object={goldMaterial} attach="material" />
          </Box>
          
          {/* Внутренняя рамка */}
          <Box args={[2.2, 0.002, 3.2]} position={[0, 0.003, 0]}>
            <meshStandardMaterial color="#2c5aa0" />
          </Box>
        </group>

        {/* PostgreSQL элефант (стилизованный) */}
        <group position={[1.3, 0.05, -0.5]}>
          {/* Тело слона */}
          <Box args={[0.7, 0.02, 0.5]} position={[0, 0, 0]}>
            <meshStandardMaterial color="#ffffff" emissive="#336791" emissiveIntensity={0.3} />
          </Box>
          
          {/* Голова */}
          <Box args={[0.35, 0.02, 0.35]} position={[-0.25, 0, -0.3]}>
            <meshStandardMaterial color="#ffffff" emissive="#336791" emissiveIntensity={0.3} />
          </Box>
          
          {/* Хобот */}
          <Box args={[0.15, 0.02, 0.4]} position={[-0.4, 0, -0.5]}>
            <meshStandardMaterial color="#ffffff" emissive="#336791" emissiveIntensity={0.3} />
          </Box>
          
          {/* Ноги */}
          {[[-0.2, 0.2], [0.2, 0.2]].map(([x, z], i) => (
            <Box key={i} args={[0.15, 0.02, 0.15]} position={[x, 0, z]}>
              <meshStandardMaterial color="#336791" />
            </Box>
          ))}
        </group>

        {/* Заголовок на обложке */}
        <Text
          position={[1.3, 0.055, 0.5]}
          fontSize={0.35}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"

        >
          PostgreSQL
        </Text>
        
        <Text
          position={[1.3, 0.055, 0.9]}
          fontSize={0.18}
          color="#4FC3F7"
          anchorX="center"
          anchorY="middle"
        >
          ОСНОВЫ SQL
        </Text>
        
        <Text
          position={[1.3, 0.055, 1.3]}
          fontSize={0.12}
          color="#FFD700"
          anchorX="center"
          anchorY="middle"
        >
          Интерактивное руководство
        </Text>

        {/* Корешок книги */}
        <Box
          args={[0.08, 0.43, 3.6]}
          position={[0, -0.175, 0]}
          castShadow
        >
          <primitive object={coverMaterial} attach="material" />
        </Box>

        {/* Текст на корешке */}
        <Text
          position={[0.045, -0.175, 0]}
          fontSize={0.22}
          color="#FFD700"
          anchorX="center"
          anchorY="middle"
          rotation={[0, Math.PI / 2, Math.PI / 2]}
        >
          PostgreSQL • SQL PRIMER • Postgres Professional
        </Text>
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
          <pointLight
            position={[0, 2, 2]}
            intensity={0.3}
            color="#4FC3F7"
            distance={5}
          />
          <pointLight
            position={[0, 1, -2]}
            intensity={0.2}
            color="#336791"
            distance={4}
          />
        </>
      )}

      {/* Страницы при открытии */}
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

          {/* Правая страница */}
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
              maxWidth={2}

            >
              PostgreSQL: The World's Most
            </Text>
            <Text
              position={[0, 1.05, 0]}
              fontSize={0.18}
              color="#1e3a8a"
              anchorX="center"
              anchorY="middle"
              maxWidth={2}
              font="/fonts/helvetiker_bold.typeface.json"
            >
              Advanced Open Source Database
            </Text>
            
            <Text
              position={[0, 0.6, 0]}
              fontSize={0.1}
              color="#555555"
              anchorX="center"
              anchorY="middle"
              maxWidth={2.2}
              textAlign="center"
              lineHeight={1.4}
            >
              Это интерактивное руководство познакомит вас
              с основами языка SQL и особенностями работы
              с PostgreSQL - мощной объектно-реляционной
              системой управления базами данных
            </Text>

            {/* Иконка базы данных */}
            <group position={[0, 0, 0]}>
              <Box args={[0.4, 0.02, 0.3]} position={[0, 0.1, 0]}>
                <meshStandardMaterial color="#336791" />
              </Box>
              <Box args={[0.4, 0.02, 0.3]} position={[0, -0.1, 0]}>
                <meshStandardMaterial color="#4FC3F7" />
              </Box>
              <Box args={[0.35, 0.18, 0.02]} position={[0, 0, 0]}>
                <meshStandardMaterial color="#5a9fd4" />
              </Box>
            </group>

            <Text
              position={[0, -0.7, 0]}
              fontSize={0.11}
              color="#666666"
              anchorX="center"
              anchorY="middle"
            >
              ─ ◆ ─
            </Text>

            <Text
              position={[0, -1.0, 0]}
              fontSize={0.13}
              color="#1e3a8a"
              anchorX="center"
              anchorY="middle"
            >
              📖 Нажмите для чтения
            </Text>
            
            <Text
              position={[0, -1.3, 0]}
              fontSize={0.09}
              color="#999999"
              anchorX="center"
              anchorY="middle"
            >
              Postgres Professional © 2024
            </Text>
          </group>

          {/* Эффект магических частиц */}
          {particles.map((pos, i) => (
            <mesh key={i} position={pos}>
              <sphereGeometry args={[0.02, 8, 8]} />
              <meshStandardMaterial
                color="#4FC3F7"
                emissive="#4FC3F7"
                emissiveIntensity={2}
                transparent
                opacity={0.6}
              />
            </mesh>
          ))}
        </group>
      )}

      {/* Динамическая тень */}
      <Plane
        args={[4, 5]}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.5, 0]}
        receiveShadow
      >
        <shadowMaterial opacity={hovered ? 0.5 : 0.3} />
      </Plane>
    </group>
  );
};

export default InteractiveBook;