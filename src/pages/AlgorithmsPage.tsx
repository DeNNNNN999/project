import React, { useState, useEffect, useRef, Suspense } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
  Environment,
  OrbitControls,
  useGLTF,
  Text3D,
  Float,
  MeshTransmissionMaterial,
  MeshDistortMaterial,
  Html,
  useHelper,
  PresentationControls,
  Text
} from '@react-three/drei';
import { PointLightHelper, SpotLightHelper } from 'three';
import * as THREE from 'three';
import { Icon } from '@iconify/react';
import gsap from 'gsap';

// Компонент для анимированного фона с градиентом и частицами
const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden -z-10">
      {/* Основной градиентный фон */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-blue-900/10 to-slate-900" />

      {/* Анимированный градиент */}
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.3), transparent 60%)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Сетка-матрица в стиле кода */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-grid-pattern" />
      </div>

      {/* Плавающие частицы - представляют биты данных */}
      {Array.from({ length: 50 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-blue-500 rounded-full"
          style={{
            width: Math.random() * 3 + 1,
            height: Math.random() * 3 + 1,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.4 + 0.1,
          }}
          animate={{
            y: [0, Math.random() * 100 - 50],
            x: [0, Math.random() * 40 - 20],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: Math.random() * 10 + 15,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: Math.random() * 5
          }}
        />
      ))}

      {/* Световые лучи */}
      <motion.div
        className="absolute top-0 left-1/4 w-[1px] h-[30vh] bg-gradient-to-b from-transparent via-blue-500/30 to-transparent"
        style={{ transform: "rotate(10deg)" }}
        animate={{ opacity: [0, 0.5, 0], height: ['30vh', '60vh', '30vh'] }}
        transition={{ duration: 7, repeat: Infinity, repeatType: "reverse" }}
      />
      <motion.div
        className="absolute top-0 right-1/3 w-[1px] h-[40vh] bg-gradient-to-b from-transparent via-purple-500/30 to-transparent"
        style={{ transform: "rotate(-15deg)" }}
        animate={{ opacity: [0, 0.6, 0], height: ['40vh', '70vh', '40vh'] }}
        transition={{ duration: 9, repeat: Infinity, repeatType: "reverse", delay: 3 }}
      />
    </div>
  );
};

// 3D модель для алгоритма сортировки
const SortingAlgorithm3D = ({ isVisible, type = 'quick' }) => {
  const groupRef = useRef();
  const itemsCount = type === 'quick' ? 10 : 8;
  const items = Array.from({ length: itemsCount }, (_, i) => ({
    id: i,
    height: Math.random() * 3 + 0.5,
    color: new THREE.Color(0.1 + Math.random() * 0.5, 0.3 + Math.random() * 0.5, 0.8)
  }));

  useFrame((state, delta) => {
    if (groupRef.current && isVisible) {
      groupRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {items.map((item, index) => (
        <mesh
          key={item.id}
          position={[(index - itemsCount/2) * 1.2, item.height/2, 0]}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[0.8, item.height, 0.8]} />
          <meshStandardMaterial color={item.color} metalness={0.3} roughness={0.4} />
          <Html position={[0, item.height/2 + 0.5, 0]} center className="pointer-events-none">
            <div className="px-2 py-1 text-xs text-white rounded bg-blue-900/80">{Math.floor(item.height * 10)}</div>
          </Html>
        </mesh>
      ))}

      {/* Пол для отбрасывания теней */}
      <mesh position={[0, -1, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[30, 30]} />
        <shadowMaterial transparent opacity={0.2} />
      </mesh>

      {/* Орбитальная линия */}
      <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[7, 7.1, 64]} />
        <meshBasicMaterial color="#4F46E5" transparent opacity={0.2} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};

// 3D модель графа для алгоритма поиска пути
const PathfindingAlgorithm3D = ({ isVisible }) => {
  const groupRef = useRef();
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  // Генерация случайного графа при монтировании компонента
  useEffect(() => {
    const generatedNodes = Array.from({ length: 10 }, (_, i) => ({
      id: i,
      position: [
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 8
      ]
    }));

    const generatedEdges = [];
    // Создаем ребра - соединяем ближайшие узлы
    for (let i = 0; i < generatedNodes.length; i++) {
      for (let j = i+1; j < generatedNodes.length; j++) {
        const distance = Math.sqrt(
          Math.pow(generatedNodes[i].position[0] - generatedNodes[j].position[0], 2) +
          Math.pow(generatedNodes[i].position[1] - generatedNodes[j].position[1], 2) +
          Math.pow(generatedNodes[i].position[2] - generatedNodes[j].position[2], 2)
        );

        // Соединяем только близкие узлы
        if (distance < 5 && Math.random() > 0.5) {
          generatedEdges.push({
            from: i,
            to: j,
            weight: Math.floor(distance * 10) / 10
          });
        }
      }
    }

    setNodes(generatedNodes);
    setEdges(generatedEdges);
  }, []);

  useFrame((state, delta) => {
    if (groupRef.current && isVisible) {
      groupRef.current.rotation.y += delta * 0.1;
    }
  });

  // Подсветка пути
  const pathNodes = [0, 2, 5, 7, 9]; // Путь от старта к финишу

  return (
    <group ref={groupRef}>
      {/* Отрисовка ребер графа */}
      {edges.map((edge, index) => {
        const start = nodes[edge.from].position;
        const end = nodes[edge.to].position;

        // Проверка, если это ребро на пути
        const isOnPath = pathNodes.includes(edge.from) && pathNodes.includes(edge.to) &&
                        Math.abs(pathNodes.indexOf(edge.from) - pathNodes.indexOf(edge.to)) === 1;

        return (
          <React.Fragment key={`edge-${index}`}>
            <Line
              points={[new THREE.Vector3(...start), new THREE.Vector3(...end)]}
              color={isOnPath ? "#10B981" : "#6366F1"}
              lineWidth={isOnPath ? 3 : 1}
              transparent
              opacity={isOnPath ? 0.8 : 0.4}
            />

            {/* Отображение веса ребра */}
            {isVisible && (
              <Html
                position={[
                  (start[0] + end[0]) / 2,
                  (start[1] + end[1]) / 2,
                  (start[2] + end[2]) / 2
                ]}
                center
                className="pointer-events-none"
              >
                <div className="px-2 py-1 text-xs text-white rounded bg-slate-900/80">
                  {edge.weight}
                </div>
              </Html>
            )}
          </React.Fragment>
        );
      })}

      {/* Отрисовка узлов графа */}
      {nodes.map((node, index) => {
        const isOnPath = pathNodes.includes(index);
        const isStart = index === pathNodes[0];
        const isEnd = index === pathNodes[pathNodes.length - 1];

        let nodeColor = "#6366F1"; // Обычный узел
        if (isStart) nodeColor = "#EC4899"; // Стартовый узел
        else if (isEnd) nodeColor = "#10B981"; // Финишный узел
        else if (isOnPath) nodeColor = "#14B8A6"; // Узел на пути

        return (
          <group key={`node-${index}`} position={node.position}>
            <mesh castShadow>
              <sphereGeometry args={[0.3, 32, 32]} />
              <meshStandardMaterial
                color={nodeColor}
                emissive={nodeColor}
                emissiveIntensity={isOnPath ? 0.4 : 0.1}
                metalness={0.3}
                roughness={0.4}
              />
            </mesh>

            {/* Номер узла */}
            <Html position={[0, 0.6, 0]} center className="pointer-events-none">
              <div className={`px-2 py-1 rounded text-white text-xs font-bold
                ${isStart ? "bg-pink-700" : isEnd ? "bg-emerald-700" : isOnPath ? "bg-teal-700" : "bg-indigo-900/80"}`}>
                {index}
              </div>
            </Html>

            {/* Эффект сияния вокруг важных узлов */}
            {(isStart || isEnd) && (
              <mesh>
                <sphereGeometry args={[0.4, 32, 32]} />
                <meshBasicMaterial
                  color={isStart ? "#EC4899" : "#10B981"}
                  transparent
                  opacity={0.15}
                />
              </mesh>
            )}
          </group>
        );
      })}
    </group>
  );
};

// Линия для соединения узлов графа
const Line = ({ points, color, lineWidth, opacity }) => {
  const ref = useRef();

  const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);

  return (
    <line ref={ref} geometry={lineGeometry}>
      <lineBasicMaterial attach="material" color={color} linewidth={lineWidth} transparent opacity={opacity} />
    </line>
  );
};

// 3D визуализация для финитного автомата
const FiniteAutomaton3D = ({ isVisible }) => {
  const groupRef = useRef();

  // Описание состояний и переходов
  const states = [
    { id: 'q0', position: [-3, 0, 0], isStart: true, isAccept: false },
    { id: 'q1', position: [0, 2, 0], isStart: false, isAccept: false },
    { id: 'q2', position: [3, 0, 0], isStart: false, isAccept: true },
    { id: 'q3', position: [0, -2, 0], isStart: false, isAccept: false },
  ];

  const transitions = [
    { from: 'q0', to: 'q1', label: 'a' },
    { from: 'q0', to: 'q3', label: 'b' },
    { from: 'q1', to: 'q1', label: 'a' },
    { from: 'q1', to: 'q2', label: 'b' },
    { from: 'q2', to: 'q1', label: 'a' },
    { from: 'q2', to: 'q3', label: 'b' },
    { from: 'q3', to: 'q2', label: 'a' },
    { from: 'q3', to: 'q0', label: 'b' },
  ];

  // Анимация вращения
  useFrame((state, delta) => {
    if (groupRef.current && isVisible) {
      groupRef.current.rotation.y += delta * 0.1;
    }
  });

  // Функция для создания изогнутых линий между состояниями
  const createCurve = (from, to, height = 0, reversed = false) => {
    const startPos = states.find(s => s.id === from).position;
    const endPos = states.find(s => s.id === to).position;

    // Для петель (переходов в то же состояние)
    if (from === to) {
      const p0 = new THREE.Vector3(...startPos);
      const p1 = new THREE.Vector3(startPos[0], startPos[1] + 1, startPos[2]);
      const p2 = new THREE.Vector3(startPos[0] + 1, startPos[1] + 1, startPos[2]);
      const p3 = new THREE.Vector3(...startPos);

      const curve = new THREE.CubicBezierCurve3(p0, p1, p2, p3);
      return curve.getPoints(20);
    }

    // Для переходов между разными состояниями
    const midPoint = [
      (startPos[0] + endPos[0]) / 2,
      (startPos[1] + endPos[1]) / 2 + height,
      (startPos[2] + endPos[2]) / 2,
    ];

    // Для обратных ребер делаем изгиб в другую сторону
    if (reversed) {
      midPoint[1] -= 2 * height;
    }

    const p0 = new THREE.Vector3(...startPos);
    const p1 = new THREE.Vector3(...midPoint);
    const p2 = new THREE.Vector3(...endPos);

    const curve = new THREE.QuadraticBezierCurve3(p0, p1, p2);
    return curve.getPoints(20);
  };

  // Ищем обратные переходы для корректной отрисовки
  const getReversed = (from, to) => {
    return transitions.some(t =>
      (t.from === to && t.to === from) &&
      transitions.findIndex(tr => tr.from === from && tr.to === to) <
      transitions.findIndex(tr => tr.from === to && tr.to === from)
    );
  };

  return (
    <group ref={groupRef}>
      {/* Отрисовка переходов */}
      {transitions.map((transition, index) => {
        const isReversed = getReversed(transition.from, transition.to);
        const points = createCurve(
          transition.from,
          transition.to,
          transition.from === transition.to ? 0 : 1,
          isReversed
        );

        // Определяем позицию для лейбла перехода
        const midPointIndex = Math.floor(points.length / 2);
        const labelPosition = points[midPointIndex];

        return (
          <group key={`transition-${index}`}>
            <Line
              points={points}
              color="#6366F1"
              lineWidth={2}
              opacity={0.6}
            />

            {/* Стрелка для указания направления */}
            {transition.from !== transition.to && (
              <mesh
                position={points[Math.floor(points.length * 0.8)]}
                lookAt={points[Math.floor(points.length * 0.81)]}
                scale={0.2}
              >
                <coneGeometry args={[0.5, 1, 16]} />
                <meshStandardMaterial color="#6366F1" />
              </mesh>
            )}

            {/* Лейбл перехода */}
            <Html
              position={[labelPosition.x, labelPosition.y, labelPosition.z]}
              center
              className="pointer-events-none"
            >
              <div className="flex items-center justify-center w-6 h-6 text-xs font-bold text-white rounded-full bg-indigo-900/90">
                {transition.label}
              </div>
            </Html>
          </group>
        );
      })}

      {/* Отрисовка состояний */}
      {states.map((state) => (
        <group key={state.id} position={state.position}>
          {/* Состояние */}
          <mesh castShadow>
            <sphereGeometry args={[0.7, 32, 32]} />
            <MeshTransmissionMaterial
              color={state.isAccept ? "#10B981" : "#6366F1"}
              transmission={0.4}
              thickness={0.5}
              roughness={0.2}
              ior={1.5}
            />
          </mesh>

          {/* Дополнительное кольцо для принимающих состояний */}
          {state.isAccept && (
            <mesh position={[0, 0, 0]} scale={1.1}>
              <torusGeometry args={[0.7, 0.05, 16, 100]} />
              <meshStandardMaterial color="#10B981" />
            </mesh>
          )}

          {/* Дополнительная стрелка для начального состояния */}
          {state.isStart && (
            <group position={[-2, 0, 0]}>
              <mesh rotation={[0, 0, Math.PI / 2]}>
                <coneGeometry args={[0.3, 0.7, 16]} />
                <meshStandardMaterial color="#EC4899" />
              </mesh>
              <mesh position={[0.5, 0, 0]}>
                <boxGeometry args={[1, 0.1, 0.1]} />
                <meshStandardMaterial color="#EC4899" />
              </mesh>
            </group>
          )}

          {/* Лейбл состояния */}
          <Html position={[0, 0, 0]} center className="pointer-events-none">
            <div className={`
              w-16 h-16 rounded-full flex items-center justify-center
              text-white text-lg font-bold
              ${state.isAccept ? "bg-gradient-to-br from-emerald-600/30 to-emerald-900/30" :
                 state.isStart ? "bg-gradient-to-br from-pink-600/30 to-pink-900/30" :
                 "bg-gradient-to-br from-indigo-600/30 to-indigo-900/30"}
            `}>
              {state.id}
            </div>
          </Html>
        </group>
      ))}
    </group>
  );
};

// Математический алгоритм (метод Ньютона)
const NewtonMethod3D = ({ isVisible }) => {
  const groupRef = useRef();

  // Параметры для визуализации функции
  const xMin = -5;
  const xMax = 5;
  const segments = 40;
  const step = (xMax - xMin) / segments;

  // Функция и её производная (x^3 - 2x - 5)
  const f = (x) => Math.pow(x, 3) - 2 * x - 5;
  const df = (x) => 3 * Math.pow(x, 2) - 2;

  // Генерация точек для графика функции
  const functionPoints = [];
  for (let i = 0; i <= segments; i++) {
    const x = xMin + i * step;
    const y = f(x);
    functionPoints.push(new THREE.Vector3(x, y, 0));
  }

  // Точки для итераций метода Ньютона
  const initialGuess = 2;
  const iterations = [];
  let x = initialGuess;

  // Генерация 5 итераций
  for (let i = 0; i < 5; i++) {
    const y = f(x);
    const slope = df(x);

    // Точка пересечения касательной с осью X (следующее приближение)
    const nextX = x - y / slope;
    const nextY = 0;

    iterations.push({
      x,
      y,
      nextX,
      nextY,
      slope
    });

    x = nextX;
  }

  // Анимация вращения
  useFrame((state, delta) => {
    if (groupRef.current && isVisible) {
      groupRef.current.rotation.y += delta * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Оси координат */}
      <group>
        {/* Ось X */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[12, 0.05, 0.05]} />
          <meshStandardMaterial color="#94A3B8" />
        </mesh>
        {/* Ось Y */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.05, 12, 0.05]} />
          <meshStandardMaterial color="#94A3B8" />
        </mesh>

        {/* Метки на осях */}
        {Array.from({ length: 11 }).map((_, i) => {
          const value = -5 + i;
          return (
            <group key={`x-tick-${i}`}>
              <mesh position={[value, 0, 0]}>
                <boxGeometry args={[0.02, 0.2, 0.02]} />
                <meshStandardMaterial color="#94A3B8" />
              </mesh>
              {value !== 0 && (
                <Html position={[value, -0.5, 0]} center className="pointer-events-none">
                  <div className="text-xs text-white">{value}</div>
                </Html>
              )}
            </group>
          );
        })}

        {Array.from({ length: 11 }).map((_, i) => {
          const value = -5 + i;
          return (
            <group key={`y-tick-${i}`}>
              <mesh position={[0, value, 0]}>
                <boxGeometry args={[0.2, 0.02, 0.02]} />
                <meshStandardMaterial color="#94A3B8" />
              </mesh>
              {value !== 0 && (
                <Html position={[-0.5, value, 0]} center className="pointer-events-none">
                  <div className="text-xs text-white">{value}</div>
                </Html>
              )}
            </group>
          );
        })}
      </group>

      {/* График функции */}
      <Line
        points={functionPoints}
        color="#6366F1"
        lineWidth={3}
        opacity={0.8}
      />

      {/* Итерации метода Ньютона */}
      {iterations.map((iteration, index) => {
        // Точки для построения касательной
        const tangentX1 = iteration.x - 2;
        const tangentY1 = iteration.y - 2 * iteration.slope;
        const tangentX2 = iteration.x + 2;
        const tangentY2 = iteration.y + 2 * iteration.slope;

        const tangentPoints = [
          new THREE.Vector3(tangentX1, tangentY1, 0),
          new THREE.Vector3(tangentX2, tangentY2, 0)
        ];

        // Линия от текущей точки до оси X
        const verticalLinePoints = [
          new THREE.Vector3(iteration.x, iteration.y, 0),
          new THREE.Vector3(iteration.x, 0, 0)
        ];

        return (
          <group key={`iteration-${index}`}>
            {/* Касательная линия */}
            <Line
              points={tangentPoints}
              color="#EC4899"
              lineWidth={2}
              opacity={0.6}
            />

            {/* Вертикальная линия к оси X */}
            <Line
              points={verticalLinePoints}
              color="#94A3B8"
              lineWidth={1}
              opacity={0.4}
            />

            {/* Точка на графике функции */}
            <mesh position={[iteration.x, iteration.y, 0]}>
              <sphereGeometry args={[0.15, 32, 32]} />
              <meshStandardMaterial color="#EC4899" />
            </mesh>

            {/* Точка следующего приближения на оси X */}
            <mesh position={[iteration.nextX, 0, 0]}>
              <sphereGeometry args={[0.15, 32, 32]} />
              <meshStandardMaterial color="#10B981" />
            </mesh>

            {/* Лейбл для итерации */}
            <Html position={[iteration.x + 0.5, iteration.y, 0]} center className="pointer-events-none">
              <div className="px-2 py-1 text-xs font-bold text-white rounded bg-pink-900/80">
                x{index}={iteration.x.toFixed(2)}
              </div>
            </Html>

            {/* Лейбл для следующей итерации */}
            <Html position={[iteration.nextX, -0.5, 0]} center className="pointer-events-none">
              <div className="px-2 py-1 text-xs font-bold text-white rounded bg-emerald-900/80">
                x{index+1}={iteration.nextX.toFixed(2)}
              </div>
            </Html>
          </group>
        );
      })}

      {/* Текст с уравнением */}
      {isVisible && (
        <Html position={[-4, 4, 0]} className="pointer-events-none">
          <div className="p-2 text-sm text-white rounded bg-slate-900/90">
            f(x) = x<sup>3</sup> - 2x - 5
          </div>
        </Html>
      )}
    </group>
  );
};

// Компонент для отображения 3D-сцены с заданным алгоритмом
const AlgorithmScene = ({ algorithm, isVisible }) => {
  const pointLightRef = useRef();

  // useHelper(pointLightRef, PointLightHelper, 1, 'red');

  return (
    <Canvas shadows camera={{ position: [0, 0, 10], fov: 50 }}>
      <color attach="background" args={['#0F172A']} />

      <PresentationControls
        global
        rotation={[0, 0, 0]}
        polar={[-Math.PI / 4, Math.PI / 4]}
        azimuth={[-Math.PI / 4, Math.PI / 4]}
        config={{ mass: 2, tension: 400 }}
        snap={{ mass: 4, tension: 400 }}
      >
        <ambientLight intensity={0.3} />
        <pointLight ref={pointLightRef} position={[10, 10, 10]} intensity={1} castShadow />
        <spotLight position={[-10, 10, 10]} angle={0.3} penumbra={1} intensity={1} castShadow />

        <Suspense fallback={null}>
          {algorithm === 'sorting' && <SortingAlgorithm3D isVisible={isVisible} />}
          {algorithm === 'pathfinding' && <PathfindingAlgorithm3D isVisible={isVisible} />}
          {algorithm === 'automaton' && <FiniteAutomaton3D isVisible={isVisible} />}
          {algorithm === 'newton' && <NewtonMethod3D isVisible={isVisible} />}

          <Environment preset="city" />
        </Suspense>
      </PresentationControls>
    </Canvas>
  );
};

// Компонент для анимированного входа новой секции
const AnimatedSection = ({ id, title, subtitle, children, index }) => {
  return (
    <motion.div
      id={id}
      className="mb-16"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: 0.1 * index }}
    >
      <div className="mb-6">
        <div className="inline-flex items-center px-3 py-1 mb-2 text-sm font-medium text-blue-400 rounded-full bg-blue-900/30">
          <span className="mr-2 font-mono">{index + 1}.</span> {subtitle}
        </div>
        <h2 className="text-3xl font-bold text-white">{title}</h2>
      </div>
      {children}
    </motion.div>
  );
};

// Секция с деталями алгоритма
const AlgorithmDetails = ({ algorithm, isVisible, onClose }) => {
  if (!algorithm) return null;

  const algorithms = {
    sorting: {
      title: "Алгоритмы сортировки",
      complexity: {
        quicksort: { time: "O(n log n)", space: "O(log n)" },
        mergesort: { time: "O(n log n)", space: "O(n)" },
        heapsort: { time: "O(n log n)", space: "O(1)" }
      },
      code: `
function quickSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }

  const pivot = arr[Math.floor(arr.length / 2)];
  const left = arr.filter(x => x < pivot);
  const middle = arr.filter(x => x === pivot);
  const right = arr.filter(x => x > pivot);

  return [...quickSort(left), ...middle, ...quickSort(right)];
}
      `,
      description: "Быстрая сортировка (Quicksort) - это эффективный алгоритм сортировки, реализующий стратегию \"разделяй и властвуй\". Он выбирает элемент в качестве опорного (pivot) и разделяет массив на элементы меньше опорного и больше опорного, затем рекурсивно сортирует эти части."
    },
    pathfinding: {
      title: "Алгоритм поиска пути A*",
      complexity: {
        astar: { time: "O(E + V log V)", space: "O(V)" }
      },
      code: `
function aStar(graph, start, goal, heuristic) {
  const openSet = new Set([start]);
  const closedSet = new Set();
  const cameFrom = new Map();
  const gScore = new Map();
  gScore.set(start, 0);
  const fScore = new Map();
  fScore.set(start, heuristic(start, goal));

  while (openSet.size > 0) {
    let current = null;
    let lowestFScore = Infinity;

    for (const vertex of openSet) {
      const score = fScore.get(vertex) || Infinity;
      if (score < lowestFScore) {
        lowestFScore = score;
        current = vertex;
      }
    }

    if (current === goal) {
      const path = [];
      let curr = current;
      while (curr) {
        path.unshift(curr);
        curr = cameFrom.get(curr);
      }
      return path;
    }

    openSet.delete(current);
    closedSet.add(current);

    for (const [neighbor, weight] of Object.entries(graph[current] || {})) {
      if (closedSet.has(neighbor)) continue;

      const tentativeGScore = (gScore.get(current) || Infinity) + weight;

      if (!openSet.has(neighbor)) {
        openSet.add(neighbor);
      }
      else if (tentativeGScore >= (gScore.get(neighbor) || Infinity)) {
        continue;
      }

      cameFrom.set(neighbor, current);
      gScore.set(neighbor, tentativeGScore);
      fScore.set(neighbor, tentativeGScore + heuristic(neighbor, goal));
    }
  }
  return [];
}
      `,
      description: "A* (A-star) - это алгоритм поиска пути в графе, который находит оптимальный путь между двумя точками, используя эвристическую функцию для направления поиска. Он комбинирует поиск в ширину с использованием эвристики для эффективного нахождения кратчайшего пути."
    },
    automaton: {
      title: "Детерминированные конечные автоматы",
      complexity: {
        dfa: { time: "O(n)", space: "O(1)" }
      },
      code: `
class DFA {
  constructor(states, alphabet, transitions, startState, acceptStates) {
    this.states = states;
    this.alphabet = alphabet;
    this.transitions = transitions;
    this.startState = startState;
    this.acceptStates = acceptStates;
  }

  accepts(input) {
    let currentState = this.startState;

    for (let i = 0; i < input.length; i++) {
      const symbol = input[i];

      if (!this.alphabet.has(symbol)) {
        throw new Error(\`Символ \${symbol} не найден в алфавите\`);
      }

      currentState = this.transitions[currentState][symbol];
    }

    return this.acceptStates.has(currentState);
  }
}
      `,
      description: "Детерминированный конечный автомат (DFA) - это математическая модель вычисления, используемая для распознавания регулярных языков. DFA состоит из конечного набора состояний, алфавита, функции переходов, начального состояния и набора принимающих состояний."
    },
    newton: {
      title: "Метод Ньютона (касательных)",
      complexity: {
        newton: { time: "O(log(1/ε))", space: "O(1)" }
      },
      code: `
function newtonMethod(f, df, x0, epsilon = 1e-7, maxIterations = 100) {
  let x = x0;
  let iteration = 0;

  while (Math.abs(f(x)) > epsilon && iteration < maxIterations) {
    const derivative = df(x);
    if (Math.abs(derivative) < epsilon) {
      throw new Error('Производная близка к нулю. Метод не сходится.');
    }

    x = x - f(x) / derivative;
    iteration++;
  }

  return x;
}

// Пример использования: найти корень уравнения x^3 - 2x - 5 = 0
function f(x) {
  return Math.pow(x, 3) - 2 * x - 5;
}

function df(x) {
  return 3 * Math.pow(x, 2) - 2;
}
      `,
      description: "Метод Ньютона (метод касательных) - итеративный численный метод для нахождения корней уравнения f(x) = 0. Метод использует касательные к графику функции для последовательного улучшения приближения к корню. Каждое приближение вычисляется по формуле x_{n+1} = x_n - f(x_n) / f'(x_n)."
    }
  };

  const data = algorithms[algorithm];

  if (!data) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/90 backdrop-blur"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="relative w-full max-w-4xl p-6 mx-4 overflow-auto border rounded-xl bg-slate-800 border-slate-700 max-h-[90vh]"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ type: "spring" }}
      >
        <button
          className="absolute p-2 rounded-lg top-4 right-4 hover:bg-slate-700/50"
          onClick={onClose}
        >
          <Icon icon="ph:x-bold" className="text-gray-400" />
        </button>

        <h2 className="mb-6 text-2xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">
          {data.title}
        </h2>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div>
            <div className="h-64 mb-4 overflow-hidden border rounded-lg border-slate-700">
              <AlgorithmScene algorithm={algorithm} isVisible={isVisible} />
            </div>

            <div className="p-4 border rounded-lg bg-slate-900/50 border-slate-700">
              <h3 className="mb-2 text-lg font-medium text-white">Временная и пространственная сложность</h3>
              <ul className="space-y-2">
                {Object.entries(data.complexity).map(([algo, complexity]) => (
                  <li key={algo} className="flex justify-between">
                    <span className="text-gray-400">{algo}:</span>
                    <div>
                      <span className="px-2 py-1 mr-2 text-xs text-blue-400 rounded-lg bg-blue-900/30">
                        Время: {complexity.time}
                      </span>
                      <span className="px-2 py-1 text-xs text-purple-400 rounded-lg bg-purple-900/30">
                        Память: {complexity.space}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-gray-300">{data.description}</p>

            <div>
              <h3 className="mb-2 text-lg font-medium text-white">Реализация</h3>
              <div className="p-4 overflow-auto font-mono text-sm text-gray-300 rounded-lg bg-slate-900">
                <pre>{data.code}</pre>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <button
            className="px-4 py-2 font-medium text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
            onClick={onClose}
          >
            Закрыть
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Основной компонент страницы алгоритмов
const AlgorithmsPage = () => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const containerRef = useRef(null);

  // Категории алгоритмов
  const categories = [
    { id: 'all', name: 'Все алгоритмы', icon: 'ph:code-bold' },
    { id: 'sorting', name: 'Сортировка', icon: 'ph:sort-ascending-bold' },
    { id: 'graphs', name: 'Графы', icon: 'ph:graph-bold' },
    { id: 'automata', name: 'Автоматы', icon: 'ph:brackets-curly-bold' },
    { id: 'math', name: 'Численные методы', icon: 'ph:function-bold' },
  ];

  // Данные алгоритмов
  const algorithms = [
    {
      id: 'quicksort',
      name: 'Быстрая сортировка',
      category: 'sorting',
      complexity: 'O(n log n)',
      description: 'Эффективный алгоритм сортировки с использованием подхода "разделяй и властвуй"',
      type: 'sorting',
      icon: 'ph:sort-ascending-bold',
      color: 'from-blue-600 to-indigo-600'
    },
    {
      id: 'mergesort',
      name: 'Сортировка слиянием',
      category: 'sorting',
      complexity: 'O(n log n)',
      description: 'Стабильный алгоритм сортировки основанный на слиянии подмассивов',
      type: 'sorting',
      icon: 'ph:git-merge-bold',
      color: 'from-purple-600 to-indigo-600'
    },
    {
      id: 'astar',
      name: 'A* (A-star)',
      category: 'graphs',
      complexity: 'O(E + V log V)',
      description: 'Алгоритм поиска оптимального пути в графе с использованием эвристики',
      type: 'pathfinding',
      icon: 'ph:graph-bold',
      color: 'from-green-600 to-teal-600'
    },
    {
      id: 'dfa',
      name: 'Конечный автомат',
      category: 'automata',
      complexity: 'O(n)',
      description: 'Математическая модель для распознавания регулярных языков',
      type: 'automaton',
      icon: 'ph:circuit-board-bold',
      color: 'from-yellow-600 to-orange-600'
    },
    {
      id: 'newton',
      name: 'Метод Ньютона',
      category: 'math',
      complexity: 'O(log(1/ε))',
      description: 'Итеративный численный метод для нахождения корней уравнения',
      type: 'newton',
      icon: 'ph:function-bold',
      color: 'from-pink-600 to-rose-600'
    }
  ];

  // Фильтрация алгоритмов по категории
  const filteredAlgorithms = activeCategory === 'all'
    ? algorithms
    : algorithms.filter(algo => algo.category === activeCategory);

  return (
    <>
      <div className="relative min-h-screen pb-20" ref={containerRef}>
        {/* Фоновые эффекты */}
        <AnimatedBackground />

        <div className="container relative z-10 px-4 pt-32 pb-20 mx-auto">
          {/* Заголовок страницы */}
          <motion.div
            className="relative mb-16 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative inline-block"
            >
              <div className="absolute inset-0 blur-2xl opacity-30 bg-gradient-to-br from-blue-600 to-purple-600" />
              <h1 className="relative text-5xl font-bold leading-tight text-transparent md:text-6xl bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text">
                Алгоритмы в 3D
              </h1>
            </motion.div>
            <p className="max-w-2xl mx-auto mt-6 text-lg text-slate-300">
              Интерактивное исследование алгоритмов с визуализацией их работы и реализации
            </p>
          </motion.div>

          {/* Фильтр категорий */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-2 rounded-full transition-colors flex items-center gap-2 ${
                    activeCategory === category.id
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-800/20'
                      : 'bg-slate-800/70 text-slate-300 hover:bg-slate-700/70'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon icon={category.icon} className="w-5 h-5" />
                  <span>{category.name}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Сетка алгоритмов */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredAlgorithms.map((algorithm, index) => (
              <motion.div
                key={algorithm.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="relative group"
              >
                <div
                  className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${algorithm.color} blur-xl`}
                  style={{ opacity: 0.1 }}
                />
                <motion.div
                  className="relative h-full p-1 overflow-hidden transition-colors border rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border-slate-700/50 group-hover:border-slate-600/80"
                  whileHover={{ y: -5 }}
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${algorithm.color} bg-opacity-20`}>
                        <Icon icon={algorithm.icon} className="w-6 h-6 text-white" />
                      </div>
                      <div className="px-3 py-1 text-xs font-medium rounded-full bg-slate-800/70 text-slate-300">
                        {algorithm.complexity}
                      </div>
                    </div>

                    <h3 className="mb-3 text-xl font-bold text-white">{algorithm.name}</h3>
                    <p className="mb-6 text-sm text-slate-400">{algorithm.description}</p>

                    <div className="h-48 mb-6 overflow-hidden border rounded-lg border-slate-700/50 group-hover:border-slate-600/80">
                      <AlgorithmScene algorithm={algorithm.type} isVisible={true} />
                    </div>

                    <motion.button
                      onClick={() => setSelectedAlgorithm(algorithm.type)}
                      className={`w-full py-3 font-medium text-white rounded-xl bg-gradient-to-r ${algorithm.color} opacity-90 hover:opacity-100 transition-opacity flex items-center justify-center gap-2`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span>Подробнее</span>
                      <Icon icon="ph:arrow-right-bold" />
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Секции алгоритмов */}
          <div className="mt-24">
            <AnimatedSection
              id="complexity"
              title="Анализ сложности алгоритмов"
              subtitle="Теория"
              index={0}
            >
              <div className="p-8 overflow-hidden border rounded-2xl bg-gradient-to-br from-slate-800/70 to-slate-900/70 backdrop-blur border-slate-700/50">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                  <div>
                    <h3 className="mb-6 text-2xl font-bold text-white">О- и Ω-нотации</h3>
                    <p className="mb-4 text-slate-300">
                      Анализ сложности алгоритмов позволяет оценить эффективность решения в терминах времени выполнения и использования памяти.
                    </p>

                    <div className="p-4 mb-4 rounded-lg bg-slate-800">
                      <p className="font-mono text-blue-400">
                        O(f(n)) = {"{"} g(n) | ∃c, n₀ 0: 0 ≤ g(n) ≤ c⋅f(n) ∀n ≥ n₀ {"}"}
                      </p>
                    </div>

                    <p className="text-slate-300">
                      O-нотация (большое О) определяет верхнюю границу роста функции, то есть наихудший сценарий производительности.
                    </p>
                  </div>

                  <div>
                    <h3 className="mb-6 text-2xl font-bold text-white">Классы сложности</h3>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-4">
                        <div className="p-2 text-green-400 rounded-lg bg-green-900/30">
                          <Icon icon="ph:crown-bold" className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="font-bold text-white">O(1) - Константное время</div>
                          <div className="text-sm text-slate-400">Выполнение не зависит от размера входных данных</div>
                        </div>
                      </li>
                      <li className="flex items-center gap-4">
                        <div className="p-2 text-blue-400 rounded-lg bg-blue-900/30">
                          <Icon icon="ph:lightning-bold" className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="font-bold text-white">O(log n) - Логарифмическое время</div>
                          <div className="text-sm text-slate-400">Время растет логарифмически с размером входных данных</div>
                        </div>
                      </li>
                      <li className="flex items-center gap-4">
                        <div className="p-2 text-yellow-400 rounded-lg bg-yellow-900/30">
                          <Icon icon="ph:chart-line-bold" className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="font-bold text-white">O(n) - Линейное время</div>
                          <div className="text-sm text-slate-400">Время пропорционально размеру входных данных</div>
                        </div>
                      </li>
                      <li className="flex items-center gap-4">
                        <div className="p-2 text-orange-400 rounded-lg bg-orange-900/30">
                          <Icon icon="ph:chart-line-up-bold" className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="font-bold text-white">O(n log n) - Линеарифмическое время</div>
                          <div className="text-sm text-slate-400">Эффективные алгоритмы сортировки (быстрая, слиянием)</div>
                        </div>
                      </li>
                      <li className="flex items-center gap-4">
                        <div className="p-2 text-red-400 rounded-lg bg-red-900/30">
                          <Icon icon="ph:warning-bold" className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="font-bold text-white">O(2ⁿ) - Экспоненциальное время</div>
                          <div className="text-sm text-slate-400">Время удваивается с каждым новым элементом (NP-полные задачи)</div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection
              id="implementations"
              title="Реализации и примеры"
              subtitle="Практика"
              index={1}
            >
              <div className="p-8 overflow-hidden border rounded-2xl bg-gradient-to-br from-slate-800/70 to-slate-900/70 backdrop-blur border-slate-700/50">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                  <div>
                    <h3 className="mb-6 text-2xl font-bold text-white">Классические реализации</h3>

                    <p className="mb-6 text-slate-300">
                      Все алгоритмы представлены в чистом JavaScript без использования внешних библиотек. Реализации фокусируются на ясности кода и оптимальной производительности.
                    </p>

                    <ul className="space-y-4">
                      <li className="p-4 border rounded-lg bg-slate-800/50 border-slate-700/50">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-bold text-white">Сортировка</h4>
                          <span className="px-2 py-1 text-xs text-blue-400 rounded-full bg-blue-900/30">8 реализаций</span>
                        </div>
                        <p className="text-sm text-slate-400">
                          QuickSort, MergeSort, HeapSort, RadixSort, CountingSort, BubbleSort, InsertionSort, SelectionSort
                        </p>
                      </li>
                      <li className="p-4 border rounded-lg bg-slate-800/50 border-slate-700/50">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-bold text-white">Графы</h4>
                          <span className="px-2 py-1 text-xs text-blue-400 rounded-full bg-blue-900/30">6 реализаций</span>
                        </div>
                        <p className="text-sm text-slate-400">
                          BFS, DFS, Dijkstra, A*, Prim, Kruskal
                        </p>
                      </li>
                      <li className="p-4 border rounded-lg bg-slate-800/50 border-slate-700/50">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-bold text-white">Структуры данных</h4>
                          <span className="px-2 py-1 text-xs text-blue-400 rounded-full bg-blue-900/30">7 реализаций</span>
                        </div>
                        <p className="text-sm text-slate-400">
                          LinkedList, Stack, Queue, BinaryTree, Heap, Trie, Graph
                        </p>
                      </li>
                      <li className="p-4 border rounded-lg bg-slate-800/50 border-slate-700/50">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-bold text-white">Математические алгоритмы</h4>
                          <span className="px-2 py-1 text-xs text-blue-400 rounded-full bg-blue-900/30">5 реализаций</span>
                        </div>
                        <p className="text-sm text-slate-400">
                          Метод Ньютона, Схема Горнера, Алгоритм Евклида, Решето Эратосфена, Метод Монте-Карло
                        </p>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="mb-6 text-2xl font-bold text-white">Тестирование и бенчмарки</h3>

                    <div className="h-64 mb-6 overflow-hidden border rounded-lg border-slate-700/50">
                      <Canvas>
                        <ambientLight intensity={0.3} />
                        <pointLight position={[10, 10, 10]} />

                        <mesh position={[0, 0, 0]}>
                          <sphereGeometry args={[1, 32, 32]} />
                          <meshStandardMaterial color="#4F46E5" />
                        </mesh>
                      </Canvas>
                    </div>

                    <p className="text-slate-300">
                      Все реализации сопровождаются тестами производительности для сравнения скорости работы и использования памяти.
                    </p>

                    <div className="mt-6">
                      <h4 className="mb-4 text-xl font-bold text-white">Сравнение алгоритмов сортировки</h4>
                      <div className="space-y-3">
                        <div className="relative pt-1">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <span className="inline-block text-xs font-semibold text-white">
                                QuickSort
                              </span>
                            </div>
                            <div className="text-right">
                              <span className="inline-block text-xs font-semibold text-white">
                                94%
                              </span>
                            </div>
                          </div>
                          <div className="flex h-2 overflow-hidden text-xs rounded bg-slate-700">
                            <div style={{ width: "94%" }} className="flex flex-col justify-center text-center text-white bg-blue-500 shadow-none whitespace-nowrap"></div>
                          </div>
                        </div>
                        <div className="relative pt-1">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <span className="inline-block text-xs font-semibold text-white">
                                MergeSort
                              </span>
                            </div>
                            <div className="text-right">
                              <span className="inline-block text-xs font-semibold text-white">
                                89%
                              </span>
                            </div>
                          </div>
                          <div className="flex h-2 overflow-hidden text-xs rounded bg-slate-700">
                            <div style={{ width: "89%" }} className="flex flex-col justify-center text-center text-white bg-purple-500 shadow-none whitespace-nowrap"></div>
                          </div>
                        </div>
                        <div className="relative pt-1">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <span className="inline-block text-xs font-semibold text-white">
                                HeapSort
                              </span>
                            </div>
                            <div className="text-right">
                              <span className="inline-block text-xs font-semibold text-white">
                                82%
                              </span>
                            </div>
                          </div>
                          <div className="flex h-2 overflow-hidden text-xs rounded bg-slate-700">
                            <div style={{ width: "82%" }} className="flex flex-col justify-center text-center text-white bg-green-500 shadow-none whitespace-nowrap"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection
              id="interactive"
              title="Интерактивный режим"
              subtitle="Демонстрация"
              index={2}
            >
              <div className="p-8 overflow-hidden border rounded-2xl bg-gradient-to-br from-slate-800/70 to-slate-900/70 backdrop-blur border-slate-700/50">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
                  <div className="lg:col-span-2">
                    <h3 className="mb-6 text-2xl font-bold text-white">Визуализация работы алгоритмов</h3>

                    <p className="mb-6 text-slate-300">
                      Интерактивная демонстрация помогает увидеть, как работают алгоритмы "под капотом" и как влияют на производительность различные входные данные.
                    </p>

                    <div className="space-y-4">
                      <div className="p-4 border rounded-lg bg-blue-900/20 border-blue-800/30">
                        <div className="flex items-center gap-4">
                          <div className="p-2 text-blue-400 rounded-lg bg-blue-800/50">
                            <Icon icon="ph:info-bold" className="w-5 h-5" />
                          </div>
                          <div className="text-blue-300">
                            Выберите алгоритм из карточек выше и нажмите "Подробнее", чтобы увидеть детальную визуализацию.
                          </div>
                        </div>
                      </div>

                      <button
                        className="w-full py-3 font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl"
                        onClick={() => setSelectedAlgorithm('sorting')}
                      >
                        Открыть визуализацию сортировки
                      </button>

                      <button
                        className="w-full py-3 font-medium text-white bg-gradient-to-r from-green-600 to-teal-600 rounded-xl"
                        onClick={() => setSelectedAlgorithm('pathfinding')}
                      >
                        Открыть визуализацию поиска пути
                      </button>
                    </div>
                  </div>

                  <div className="lg:col-span-3">
                    <div className="overflow-hidden border rounded-lg h-80 border-slate-700/50">
                      <AlgorithmScene algorithm="sorting" isVisible={true} />
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>

      {/* Модальное окно с деталями алгоритма */}
      <AnimatePresence>
        {selectedAlgorithm && (
          <AlgorithmDetails
            algorithm={selectedAlgorithm}
            isVisible={!!selectedAlgorithm}
            onClose={() => setSelectedAlgorithm(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default AlgorithmsPage;
