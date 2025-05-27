import React, { useState, Suspense } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Icon } from '@iconify/react';
import { Canvas } from '@react-three/fiber';
import { Environment, PresentationControls, Html } from '@react-three/drei';
import * as THREE from 'three';

// Импорт данных алгоритмов из общего файла данных
import { algorithmCategories, getAlgorithmsByCategory, AlgorithmCard } from '../../../data/algorithms-data';

// Компонент для линии в 3D-визуализации
const Line = ({ points, color, lineWidth, opacity }) => {
  const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
  return (
    <line geometry={lineGeometry}>
      <lineBasicMaterial attach="material" color={color} linewidth={lineWidth} transparent opacity={opacity} />
    </line>
  );
};

// Функция для создания изогнутых линий между состояниями
const createCurve = (from, to, states, height = 0, reversed = false) => {
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

// Превью DFA автомата
const DFAPreview = () => {
  // Описание состояний и переходов для DFA
  const states = [
    { id: 'q0', position: [-2, 0, 0], isStart: true, isAccept: false },
    { id: 'q1', position: [0, 1.5, 0], isStart: false, isAccept: false },
    { id: 'q2', position: [2, 0, 0], isStart: false, isAccept: true },
  ];

  const transitions = [
    { from: 'q0', to: 'q1', label: 'a' },
    { from: 'q1', to: 'q2', label: 'b' },
    { from: 'q1', to: 'q1', label: 'a' },
  ];

  return (
    <group scale={[0.6, 0.6, 0.6]}>
      {/* Отрисовка переходов */}
      {transitions.map((transition, index) => {
        const points = createCurve(
          transition.from,
          transition.to,
          states,
          transition.from === transition.to ? 0 : 0.8
        );

        // Определяем позицию для лейбла перехода
        const midPointIndex = Math.floor(points.length / 2);
        const labelPosition = points[midPointIndex];

        return (
          <group key={`transition-${index}`}>
            <Line
              points={points}
              color={"#F59E0B"}
              lineWidth={2}
              opacity={0.8}
            />

            {/* Стрелка для указания направления */}
            {transition.from !== transition.to && (
              <mesh
                position={points[Math.floor(points.length * 0.8)]}
                lookAt={points[Math.floor(points.length * 0.81)]}
                scale={0.15}
              >
                <coneGeometry args={[0.5, 1, 16]} />
                <meshStandardMaterial color={"#F59E0B"} />
              </mesh>
            )}

            {/* Лейбл перехода */}
            <Html
              position={[labelPosition.x, labelPosition.y, labelPosition.z]}
              center
              className="pointer-events-none"
            >
              <div className="flex items-center justify-center w-5 h-5 text-xs font-bold text-white rounded-full bg-amber-900/90">
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
            <sphereGeometry args={[0.5, 32, 32]} />
            <meshPhongMaterial
              color={state.isAccept ? "#F59E0B" : "#6366F1"}
              shininess={100}
              specular={new THREE.Color("#FFFFFF")}
            />
          </mesh>

          {/* Дополнительное кольцо для принимающих состояний */}
          {state.isAccept && (
            <mesh position={[0, 0, 0]} scale={1.1}>
              <torusGeometry args={[0.5, 0.05, 16, 100]} />
              <meshStandardMaterial color={"#F59E0B"} />
            </mesh>
          )}

          {/* Дополнительная стрелка для начального состояния */}
          {state.isStart && (
            <group position={[-1.5, 0, 0]}>
              <mesh rotation={[0, 0, Math.PI / 2]}>
                <coneGeometry args={[0.2, 0.5, 16]} />
                <meshStandardMaterial color={"#EC4899"} />
              </mesh>
              <mesh position={[0.3, 0, 0]}>
                <boxGeometry args={[0.6, 0.1, 0.1]} />
                <meshStandardMaterial color={"#EC4899"} />
              </mesh>
            </group>
          )}

          {/* Лейбл состояния */}
          <Html position={[0, 0, 0]} center className="pointer-events-none">
            <div className={`
              w-10 h-10 rounded-full flex items-center justify-center
              text-white text-sm font-medium
              ${state.isAccept ? "bg-gradient-to-br from-amber-600/30 to-amber-900/30" :
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

// Превью NFA автомата
const NFAPreview = () => {
  // Упрощенное описание состояний и переходов для NFA
  const states = [
    { id: 'q0', position: [-2, 0, 0], isStart: true, isAccept: false },
    { id: 'q1', position: [0, 1.5, 0], isStart: false, isAccept: false },
    { id: 'q2', position: [2, 0, 0], isStart: false, isAccept: true },
    { id: 'q3', position: [0, -1.5, 0], isStart: false, isAccept: false },
  ];

  const transitions = [
    { from: 'q0', to: 'q1', label: 'a' },
    { from: 'q0', to: 'q3', label: 'b' },
    { from: 'q1', to: 'q2', label: 'ε' },
    { from: 'q3', to: 'q0', label: 'ε' },
  ];

  return (
    <group scale={[0.5, 0.5, 0.5]}>
      {/* Отрисовка переходов */}
      {transitions.map((transition, index) => {
        const points = createCurve(
          transition.from,
          transition.to,
          states,
          transition.from === transition.to ? 0 : 0.8
        );

        // Определяем позицию для лейбла перехода
        const midPointIndex = Math.floor(points.length / 2);
        const labelPosition = points[midPointIndex];

        // Определяем цвет перехода
        const transitionColor = transition.label === 'ε' ? "#94A3B8" : "#8B5CF6";

        return (
          <group key={`transition-${index}`}>
            <Line
              points={points}
              color={transitionColor}
              lineWidth={2}
              opacity={0.8}
            />

            {/* Стрелка для указания направления */}
            {transition.from !== transition.to && (
              <mesh
                position={points[Math.floor(points.length * 0.8)]}
                lookAt={points[Math.floor(points.length * 0.81)]}
                scale={0.15}
              >
                <coneGeometry args={[0.5, 1, 16]} />
                <meshStandardMaterial color={transitionColor} />
              </mesh>
            )}

            {/* Лейбл перехода */}
            <Html
              position={[labelPosition.x, labelPosition.y, labelPosition.z]}
              center
              className="pointer-events-none"
            >
              <div className={`flex items-center justify-center w-5 h-5 text-xs font-bold text-white rounded-full 
                ${transition.label === 'ε' ? 'bg-slate-700/90' : 'bg-purple-900/90'}`}>
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
            <sphereGeometry args={[0.5, 32, 32]} />
            <meshPhongMaterial
              color={state.isAccept ? "#8B5CF6" : "#6366F1"}
              shininess={100}
              specular={new THREE.Color("#FFFFFF")}
            />
          </mesh>

          {/* Дополнительное кольцо для принимающих состояний */}
          {state.isAccept && (
            <mesh position={[0, 0, 0]} scale={1.1}>
              <torusGeometry args={[0.5, 0.05, 16, 100]} />
              <meshStandardMaterial color={"#8B5CF6"} />
            </mesh>
          )}

          {/* Дополнительная стрелка для начального состояния */}
          {state.isStart && (
            <group position={[-1.5, 0, 0]}>
              <mesh rotation={[0, 0, Math.PI / 2]}>
                <coneGeometry args={[0.2, 0.5, 16]} />
                <meshStandardMaterial color={"#EC4899"} />
              </mesh>
              <mesh position={[0.3, 0, 0]}>
                <boxGeometry args={[0.6, 0.1, 0.1]} />
                <meshStandardMaterial color={"#EC4899"} />
              </mesh>
            </group>
          )}

          {/* Лейбл состояния */}
          <Html position={[0, 0, 0]} center className="pointer-events-none">
            <div className={`
              w-10 h-10 rounded-full flex items-center justify-center
              text-white text-sm font-medium
              ${state.isAccept ? "bg-gradient-to-br from-purple-600/30 to-purple-900/30" :
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

// Превью PDA автомата
const PDAPreview = () => {
  // Упрощенное описание состояний и переходов для PDA
  const states = [
    { id: 'q0', position: [-2, 0, 0], isStart: true, isAccept: false },
    { id: 'q1', position: [0, 1.5, 0], isStart: false, isAccept: false },
    { id: 'q2', position: [2, 0, 0], isStart: false, isAccept: true },
  ];

  const transitions = [
    { from: 'q0', to: 'q1', label: 'a,ε→A' },
    { from: 'q1', to: 'q1', label: 'a,A→AA' },
    { from: 'q1', to: 'q2', label: 'b,A→ε' },
  ];

  return (
    <group scale={[0.5, 0.5, 0.5]}>
      {/* Отрисовка стека */}
      <mesh position={[0, -3, -1]} rotation={[0, 0, 0]}>
        <boxGeometry args={[3, 4, 0.2]} />
        <meshStandardMaterial color={"#0F766E"} opacity={0.3} transparent />
      </mesh>

      {/* Отрисовка переходов */}
      {transitions.map((transition, index) => {
        const points = createCurve(
          transition.from,
          transition.to,
          states,
          transition.from === transition.to ? 0 : 0.8
        );

        // Определяем позицию для лейбла перехода
        const midPointIndex = Math.floor(points.length / 2);
        const labelPosition = points[midPointIndex];

        return (
          <group key={`transition-${index}`}>
            <Line
              points={points}
              color={"#0EA5E9"}
              lineWidth={2}
              opacity={0.8}
            />

            {/* Стрелка для указания направления */}
            {transition.from !== transition.to && (
              <mesh
                position={points[Math.floor(points.length * 0.8)]}
                lookAt={points[Math.floor(points.length * 0.81)]}
                scale={0.15}
              >
                <coneGeometry args={[0.5, 1, 16]} />
                <meshStandardMaterial color={"#0EA5E9"} />
              </mesh>
            )}

            {/* Лейбл перехода */}
            <Html
              position={[labelPosition.x, labelPosition.y, labelPosition.z]}
              center
              className="pointer-events-none"
            >
              <div className="flex items-center justify-center px-2 py-1 text-xs font-bold text-white rounded-md bg-cyan-900/90">
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
            <sphereGeometry args={[0.5, 32, 32]} />
            <meshPhongMaterial
              color={state.isAccept ? "#0EA5E9" : "#0891B2"}
              shininess={100}
              specular={new THREE.Color("#FFFFFF")}
            />
          </mesh>

          {/* Дополнительное кольцо для принимающих состояний */}
          {state.isAccept && (
            <mesh position={[0, 0, 0]} scale={1.1}>
              <torusGeometry args={[0.5, 0.05, 16, 100]} />
              <meshStandardMaterial color={"#0EA5E9"} />
            </mesh>
          )}

          {/* Дополнительная стрелка для начального состояния */}
          {state.isStart && (
            <group position={[-1.5, 0, 0]}>
              <mesh rotation={[0, 0, Math.PI / 2]}>
                <coneGeometry args={[0.2, 0.5, 16]} />
                <meshStandardMaterial color={"#EC4899"} />
              </mesh>
              <mesh position={[0.3, 0, 0]}>
                <boxGeometry args={[0.6, 0.1, 0.1]} />
                <meshStandardMaterial color={"#EC4899"} />
              </mesh>
            </group>
          )}

          {/* Лейбл состояния */}
          <Html position={[0, 0, 0]} center className="pointer-events-none">
            <div className={`
              w-10 h-10 rounded-full flex items-center justify-center
              text-white text-sm font-medium
              ${state.isAccept ? "bg-gradient-to-br from-cyan-600/30 to-cyan-900/30" :
               state.isStart ? "bg-gradient-to-br from-pink-600/30 to-pink-900/30" :
               "bg-gradient-to-br from-cyan-600/30 to-cyan-900/30"}
            `}>
              {state.id}
            </div>
          </Html>
        </group>
      ))}
    </group>
  );
};

// Превью машины Тьюринга
const TuringPreview = () => {
  // Упрощенное описание состояний и переходов для машины Тьюринга
  const states = [
    { id: 'q0', position: [-2, 0, 0], isStart: true, isAccept: false },
    { id: 'q1', position: [0, 1.5, 0], isStart: false, isAccept: false },
    { id: 'q2', position: [2, 0, 0], isStart: false, isAccept: true },
  ];

  const transitions = [
    { from: 'q0', to: 'q1', label: '0→1,R' },
    { from: 'q1', to: 'q1', label: '1→1,R' },
    { from: 'q1', to: 'q2', label: '_→_,L' },
  ];

  return (
    <group scale={[0.5, 0.5, 0.5]}>
      {/* Отрисовка ленты */}
      <group position={[0, -2.5, 0]}>
        {[-4, -3, -2, -1, 0, 1, 2, 3, 4].map((pos, idx) => (
          <mesh key={idx} position={[pos, 0, 0]}>
            <boxGeometry args={[0.95, 0.95, 0.1]} />
            <meshStandardMaterial color={pos === 0 ? "#4F46E5" : "#1E293B"} opacity={0.4} transparent />
            <Html position={[0, 0, 0.1]} center>
              <div className="w-6 h-6 flex items-center justify-center text-white text-xs font-mono">
                {pos === 0 ? '1' : (pos === 1 ? '0' : '_')}
              </div>
            </Html>
          </mesh>
        ))}
        {/* Головка */}
        <mesh position={[0, 1, 0]}>
          <coneGeometry args={[0.3, 0.6, 4]} rotation={[0, Math.PI/4, 0]} />
          <meshStandardMaterial color={"#4F46E5"} />
        </mesh>
      </group>

      {/* Отрисовка переходов */}
      {transitions.map((transition, index) => {
        const points = createCurve(
          transition.from,
          transition.to,
          states,
          transition.from === transition.to ? 0 : 0.8
        );

        // Определяем позицию для лейбла перехода
        const midPointIndex = Math.floor(points.length / 2);
        const labelPosition = points[midPointIndex];

        return (
          <group key={`transition-${index}`}>
            <Line
              points={points}
              color={"#4F46E5"}
              lineWidth={2}
              opacity={0.8}
            />

            {/* Стрелка для указания направления */}
            {transition.from !== transition.to && (
              <mesh
                position={points[Math.floor(points.length * 0.8)]}
                lookAt={points[Math.floor(points.length * 0.81)]}
                scale={0.15}
              >
                <coneGeometry args={[0.5, 1, 16]} />
                <meshStandardMaterial color={"#4F46E5"} />
              </mesh>
            )}

            {/* Лейбл перехода */}
            <Html
              position={[labelPosition.x, labelPosition.y, labelPosition.z]}
              center
              className="pointer-events-none"
            >
              <div className="flex items-center justify-center px-2 py-1 text-xs font-bold text-white rounded-md bg-indigo-900/90">
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
            <sphereGeometry args={[0.5, 32, 32]} />
            <meshPhongMaterial
              color={state.isAccept ? "#4F46E5" : "#6366F1"}
              shininess={100}
              specular={new THREE.Color("#FFFFFF")}
            />
          </mesh>

          {/* Дополнительное кольцо для принимающих состояний */}
          {state.isAccept && (
            <mesh position={[0, 0, 0]} scale={1.1}>
              <torusGeometry args={[0.5, 0.05, 16, 100]} />
              <meshStandardMaterial color={"#4F46E5"} />
            </mesh>
          )}

          {/* Дополнительная стрелка для начального состояния */}
          {state.isStart && (
            <group position={[-1.5, 0, 0]}>
              <mesh rotation={[0, 0, Math.PI / 2]}>
                <coneGeometry args={[0.2, 0.5, 16]} />
                <meshStandardMaterial color={"#EC4899"} />
              </mesh>
              <mesh position={[0.3, 0, 0]}>
                <boxGeometry args={[0.6, 0.1, 0.1]} />
                <meshStandardMaterial color={"#EC4899"} />
              </mesh>
            </group>
          )}

          {/* Лейбл состояния */}
          <Html position={[0, 0, 0]} center className="pointer-events-none">
            <div className={`
              w-10 h-10 rounded-full flex items-center justify-center
              text-white text-sm font-medium
              ${state.isAccept ? "bg-gradient-to-br from-indigo-600/30 to-indigo-900/30" :
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

// Разделы с автоматами с предпросмотром
const AutomataSection = ({ title, description, icon, color, preview, path }) => {
  const navigate = useNavigate();
  
  return (
    <motion.div
      className="p-6 border rounded-xl bg-slate-800/70 border-slate-700/50 h-full flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
      onClick={() => navigate(path)}
    >
      <div className="mb-4 flex items-center">
        <div className={`p-3 rounded-xl bg-gradient-to-br ${color} bg-opacity-20 mr-3`}>
          <Icon icon={icon} className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-xl font-bold text-white">{title}</h3>
      </div>
      
      <p className="text-slate-300 mb-4">{description}</p>
      
      <div className="flex-grow border border-slate-700/50 rounded-lg overflow-hidden bg-slate-900/50 mb-4 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <Canvas shadows camera={{ position: [0, 0, 10], fov: 35 }}>
            <color attach="background" args={['#0F172A']} />
            <ambientLight intensity={0.3} />
            <pointLight position={[10, 10, 10]} intensity={0.6} />
            <Suspense fallback={null}>
              <PresentationControls
                global
                rotation={[0, 0, 0]}
                polar={[-Math.PI / 4, Math.PI / 4]}
                azimuth={[-Math.PI / 4, Math.PI / 4]}
                config={{ mass: 2, tension: 400 }}
              >
                {preview}
              </PresentationControls>
              <Environment preset="city" />
            </Suspense>
          </Canvas>
        </div>
      </div>
      
      <motion.button
        className={`w-full py-3 font-medium text-white rounded-xl bg-gradient-to-r ${color} opacity-90 hover:opacity-100 transition-opacity flex items-center justify-center gap-2`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <span>Подробнее</span>
        <Icon icon="ph:arrow-right-bold" />
      </motion.button>
    </motion.div>
  );
};

const AutomataAlgorithmsPage = () => {
  // Получаем только алгоритмы из категории автоматов
  const automataAlgorithms = getAlgorithmsByCategory('automata');

  return (
    <div className="relative min-h-screen py-32 bg-slate-900">
      {/* Фоновый градиент */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-yellow-900/10 to-slate-900" />
        <motion.div
          className="absolute inset-0 opacity-20"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(234, 179, 8, 0.3), transparent 60%)',
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
      </div>

      <div className="container relative z-10 px-4 mx-auto">
        {/* Навигационная цепочка */}
        <div className="mb-8">
          <motion.div 
            className="flex items-center space-x-2 text-sm text-slate-400"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Link to="/" className="hover:text-white">Главная</Link>
            <Icon icon="ph:caret-right" />
            <Link to="/algorithms" className="hover:text-white">Алгоритмы</Link>
            <Icon icon="ph:caret-right" />
            <span className="text-white">Конечные автоматы</span>
          </motion.div>
        </div>

        {/* Заголовок и описание */}
        <motion.div 
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center px-4 py-2 mb-4 space-x-2 rounded-full bg-yellow-900/30 border border-yellow-700/30">
            <Icon icon="ph:circuit-board-bold" className="w-5 h-5 text-yellow-400" />
            <span className="text-sm font-medium text-yellow-300">Категория</span>
          </div>
          
          <h1 className="mb-4 text-4xl font-bold text-transparent md:text-5xl bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-400 bg-clip-text">
            Конечные автоматы
          </h1>
          
          <p className="max-w-3xl mx-auto text-lg text-slate-300">
            Исследуйте теорию автоматов — математические модели для распознавания шаблонов, валидации входных данных 
            и моделирования последовательностей событий.
          </p>
        </motion.div>

        {/* Разделы с автоматами */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2 mb-12">
          <AutomataSection 
            title="Детерминированный конечный автомат (DFA)" 
            description="Математическая модель вычисления с конечным числом состояний для распознавания регулярных языков" 
            icon="ph:circuit-board-bold"
            color="from-yellow-600 to-orange-600"
            preview={<DFAPreview />}
            path="/algorithms/automata/dfa"
          />
          
          <AutomataSection 
            title="Недетерминированный конечный автомат (NFA)" 
            description="Гибкая модель вычисления с одновременными состояниями и ε-переходами" 
            icon="ph:circuit-board-bold"
            color="from-purple-600 to-pink-600"
            preview={<NFAPreview />}
            path="/algorithms/automata/nfa"
          />
        </div>
        
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2">
          <AutomataSection 
            title="Автомат с магазинной памятью (PDA)" 
            description="Расширение конечного автомата со стеком для распознавания контекстно-свободных языков" 
            icon="ph:stack-bold"
            color="from-emerald-600 to-teal-600"
            preview={<PDAPreview />}
            path="/algorithms/automata/pda"
          />
          
          <AutomataSection 
            title="Машина Тьюринга" 
            description="Универсальная модель вычислений с неограниченной лентой" 
            icon="ph:tape-bold"
            color="from-blue-600 to-cyan-600"
            preview={<TuringPreview />}
            path="/algorithms/automata/turing"
          />
        </div>

        {/* Сравнительная информация */}
        <motion.div
          className="p-8 mt-16 border rounded-2xl bg-slate-800/70 border-slate-700/50"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h2 className="mb-6 text-2xl font-bold text-white">Типы конечных автоматов</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-300">
              <thead className="uppercase bg-slate-800 text-gray-400">
                <tr>
                  <th className="px-6 py-3">Тип автомата</th>
                  <th className="px-6 py-3">Детерминизм</th>
                  <th className="px-6 py-3">Переходы</th>
                  <th className="px-6 py-3">Выразительная сила</th>
                  <th className="px-6 py-3">Примечание</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b bg-slate-700/20 border-slate-700">
                  <td className="px-6 py-4 font-medium text-white">
                    <Link to="/algorithms/automata/dfa" className="underline text-yellow-400 hover:text-yellow-300">
                      DFA (Детерминированный)
                    </Link>
                  </td>
                  <td className="px-6 py-4">Детерминированный</td>
                  <td className="px-6 py-4">Один переход на символ</td>
                  <td className="px-6 py-4">Регулярные языки</td>
                  <td className="px-6 py-4">Простая реализация, эффективное выполнение</td>
                </tr>
                <tr className="border-b bg-slate-800/20 border-slate-700">
                  <td className="px-6 py-4 font-medium text-white">
                    NFA (Недетерминированный)
                  </td>
                  <td className="px-6 py-4">Недетерминированный</td>
                  <td className="px-6 py-4">Несколько или ε-переходы</td>
                  <td className="px-6 py-4">Регулярные языки</td>
                  <td className="px-6 py-4">Более компактное представление чем DFA</td>
                </tr>
                <tr className="border-b bg-slate-700/20 border-slate-700">
                  <td className="px-6 py-4 font-medium text-white">
                    PDA (Автомат с магазинной памятью)
                  </td>
                  <td className="px-6 py-4">Обычно недетерминированный</td>
                  <td className="px-6 py-4">С использованием стека</td>
                  <td className="px-6 py-4">Контекстно-свободные языки</td>
                  <td className="px-6 py-4">Может распознавать вложенные структуры</td>
                </tr>
                <tr className="bg-slate-800/20">
                  <td className="px-6 py-4 font-medium text-white">
                    Машина Тьюринга
                  </td>
                  <td className="px-6 py-4">Может быть любым</td>
                  <td className="px-6 py-4">С неограниченной памятью</td>
                  <td className="px-6 py-4">Рекурсивно перечислимые языки</td>
                  <td className="px-6 py-4">Теоретически наиболее мощная модель вычислений</td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Иерархия Хомского */}
        <motion.div
          className="p-8 mt-12 border rounded-2xl bg-slate-800/70 border-slate-700/50"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <h2 className="mb-6 text-2xl font-bold text-white">Иерархия формальных языков (Хомского)</h2>
          
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <p className="mb-4 text-slate-300">
                Иерархия Хомского классифицирует формальные грамматики и соответствующие им типы автоматов по их 
                выразительной силе. Каждый тип автомата соответствует определенному классу языков.
              </p>
              
              <div className="p-4 bg-blue-900/20 border border-blue-800/40 rounded-lg">
                <h3 className="mb-2 text-lg font-semibold text-blue-400">Практическое применение автоматов</h3>
                <ul className="pl-5 space-y-1 text-blue-100 list-disc">
                  <li>Лексический анализ в компиляторах</li>
                  <li>Валидация форматов данных (XML, JSON)</li>
                  <li>Парсинг регулярных выражений</li>
                  <li>Моделирование протоколов связи</li>
                  <li>Системы управления состояниями в UI</li>
                  <li>Обработка естественного языка</li>
                </ul>
              </div>
            </div>
            
            <div className="relative overflow-hidden rounded-lg min-h-[300px] bg-gradient-to-br from-slate-900 to-slate-800 p-6">
              <div className="absolute inset-0 flex items-center justify-center">
                <svg width="320" height="300" viewBox="0 0 320 300">
                  {/* Уровень 0 - Рекурсивно перечислимые языки */}
                  <rect x="10" y="10" width="300" height="280" rx="8" 
                    fill="none" stroke="#334155" strokeWidth="2" />
                  <text x="150" y="30" textAnchor="middle" 
                    fill="#94A3B8" fontSize="12">Тип 0: Рекурсивно перечислимые языки</text>
                  <text x="150" y="50" textAnchor="middle" 
                    fill="#64748B" fontSize="10">Машина Тьюринга</text>
                  
                  {/* Уровень 1 - Контекстно-зависимые языки */}
                  <rect x="40" y="60" width="240" height="210" rx="8" 
                    fill="none" stroke="#475569" strokeWidth="2" />
                  <text x="150" y="80" textAnchor="middle" 
                    fill="#94A3B8" fontSize="12">Тип 1: Контекстно-зависимые языки</text>
                  <text x="150" y="100" textAnchor="middle" 
                    fill="#64748B" fontSize="10">Линейно ограниченный автомат</text>
                  
                  {/* Уровень 2 - Контекстно-свободные языки */}
                  <rect x="70" y="110" width="180" height="140" rx="8" 
                    fill="none" stroke="#334155" strokeWidth="2" />
                  <text x="150" y="130" textAnchor="middle" 
                    fill="#94A3B8" fontSize="12">Тип 2: Контекстно-свободные языки</text>
                  <text x="150" y="150" textAnchor="middle" 
                    fill="#64748B" fontSize="10">Автомат с магазинной памятью (PDA)</text>
                  
                  {/* Уровень 3 - Регулярные языки */}
                  <rect x="100" y="160" width="120" height="70" rx="8" 
                    fill="none" stroke="#0EA5E9" strokeWidth="2" />
                  <text x="150" y="180" textAnchor="middle" 
                    fill="#38BDF8" fontSize="12">Тип 3: Регулярные языки</text>
                  <text x="150" y="200" textAnchor="middle" 
                    fill="#7DD3FC" fontSize="10">Конечный автомат (DFA, NFA)</text>
                </svg>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Кнопка возврата */}
        <div className="flex justify-center mt-12">
          <Link to="/algorithms">
            <motion.button
              className="flex items-center gap-2 px-6 py-3 font-medium text-white transition-colors bg-yellow-600 rounded-lg hover:bg-yellow-700"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon icon="ph:arrow-left" className="w-5 h-5" />
              <span>Вернуться ко всем алгоритмам</span>
            </motion.button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AutomataAlgorithmsPage;
