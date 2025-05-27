import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, PresentationControls, Html, Text } from '@react-three/drei';
import { motion } from 'motion/react';
import * as THREE from 'three';

import AlgorithmLayout from '../../../components/Layout/AlgorithmLayout/AlgorithmLayout';
import { getRelatedAlgorithms } from '../../../data/algorithms-data';

// Компонент для линии
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

// Компонент для анимированной ленты машины Тьюринга
const TuringTape = ({ tape, headPosition, position, scale = 1 }) => {
  // Определим, сколько ячеек ленты показывать с каждой стороны от текущей позиции
  const visibleCells = 6;
  
  // Вычисляем видимую часть ленты
  const start = Math.max(0, headPosition - visibleCells);
  const end = Math.min(tape.length - 1, headPosition + visibleCells);
  
  const visibleTape = [];
  for (let i = start; i <= end; i++) {
    visibleTape.push({
      index: i,
      symbol: tape[i] || '_'
    });
  }
  
  return (
    <group position={position}>
      {/* Ячейки ленты */}
      {visibleTape.map(cell => (
        <group key={cell.index} position={[(cell.index - headPosition) * 1.2 * scale, 0, 0]}>
          {/* Фон ячейки */}
          <mesh>
            <boxGeometry args={[1 * scale, 1 * scale, 0.2 * scale]} />
            <meshStandardMaterial 
              color={cell.index === headPosition ? "#EC4899" : "#1E293B"} 
              metalness={0.3} 
              roughness={0.4}
              emissive={cell.index === headPosition ? new THREE.Color("#EC4899") : new THREE.Color("#000000")}
              emissiveIntensity={cell.index === headPosition ? 0.3 : 0}
            />
          </mesh>
          
          {/* Символ */}
          <Html position={[0, 0, 0.2]} center>
            <div className={`flex items-center justify-center w-6 h-6 text-lg font-bold ${
              cell.index === headPosition ? 'text-white' : 'text-slate-300'
            }`}>
              {cell.symbol}
            </div>
          </Html>
        </group>
      ))}
      
      {/* Метка ленты */}
      <Html position={[0, -1.2 * scale, 0]} center>
        <div className="text-base font-medium text-slate-300">Лента</div>
      </Html>
      
      {/* Маркер головки */}
      <mesh position={[0, -0.8 * scale, 0]}>
        <coneGeometry args={[0.3 * scale, 0.6 * scale, 3]} rotation={[Math.PI, 0, 0]} />
        <meshStandardMaterial color="#EC4899" />
      </mesh>
    </group>
  );
};

// Компонент для отрисовки машины Тьюринга внутри Canvas
const TuringMachineModel = ({ animationState, isPlaying }) => {
  const groupRef = useRef();
  
  // Описание состояний и переходов машины Тьюринга
  const states = [
    { id: 'q0', position: [-3, 0, 0], isStart: true, isAccept: false },
    { id: 'q1', position: [0, 2, 0], isStart: false, isAccept: false },
    { id: 'q2', position: [3, 0, 0], isStart: false, isAccept: true },
    { id: 'q3', position: [0, -2, 0], isStart: false, isAccept: false },
  ];

  // Переходы в формате {from, to, read, write, move}
  // move может быть 'L' (влево), 'R' (вправо) или 'S' (остаться на месте)
  const transitions = [
    { from: 'q0', to: 'q0', read: '0', write: '0', move: 'R' },
    { from: 'q0', to: 'q0', read: '1', write: '1', move: 'R' },
    { from: 'q0', to: 'q0', read: 'X', write: 'X', move: 'R' },
    { from: 'q0', to: 'q1', read: '_', write: '_', move: 'L' },
    { from: 'q1', to: 'q1', read: '0', write: 'X', move: 'L' },
    { from: 'q1', to: 'q2', read: '_', write: '_', move: 'R' },
    { from: 'q1', to: 'q3', read: '1', write: '1', move: 'L' },
    { from: 'q1', to: 'q3', read: 'X', write: 'X', move: 'L' },
    { from: 'q3', to: 'q3', read: '0', write: '0', move: 'L' },
    { from: 'q3', to: 'q3', read: '1', write: '1', move: 'L' },
    { from: 'q3', to: 'q3', read: 'X', write: 'X', move: 'L' },
    { from: 'q3', to: 'q0', read: '_', write: '_', move: 'R' },
  ];
  
  // Ищем обратные переходы для корректной отрисовки
  const getReversed = (from, to) => {
    return transitions.some(t =>
      (t.from === to && t.to === from) &&
      transitions.findIndex(tr => tr.from === from && tr.to === to) <
      transitions.findIndex(tr => tr.from === to && t.to === from)
    );
  };
  
  // Анимация вращения графа
  useFrame((state, delta) => {
    if (groupRef.current) {
      // Если не играет анимация, медленно вращаем граф
      if (!isPlaying) {
        groupRef.current.rotation.y += delta * 0.1;
      }
    }
  });

  // Форматирование лейбла перехода: read→write,move
  const formatTransitionLabel = (transition) => {
    return `${transition.read}→${transition.write},${transition.move}`;
  };

  return (
    <group ref={groupRef}>
      {/* Визуализация ленты */}
      <TuringTape 
        tape={animationState.tape || ['_']} 
        headPosition={animationState.headPosition || 0} 
        position={[0, 4, 0]} 
        scale={0.8}
      />

      {/* Отрисовка переходов */}
      {transitions.map((transition, index) => {
        const isReversed = getReversed(transition.from, transition.to);
        const points = createCurve(
          transition.from,
          transition.to,
          states,
          transition.from === transition.to ? 0 : 1,
          isReversed
        );

        // Определяем позицию для лейбла перехода
        const midPointIndex = Math.floor(points.length / 2);
        const labelPosition = points[midPointIndex];

        // Проверяем, является ли этот переход текущим (активным)
        const isActiveTransition = 
          animationState.currentState === transition.from && 
          animationState.tape[animationState.headPosition] === transition.read;

        return (
          <group key={`transition-${index}`}>
            <Line
              points={points}
              color={isActiveTransition ? "#EC4899" : "#F59E0B"}
              lineWidth={isActiveTransition ? 4 : 2}
              opacity={isActiveTransition ? 0.8 : 0.6}
            />

            {/* Стрелка для указания направления */}
            {transition.from !== transition.to && (
              <mesh
                position={points[Math.floor(points.length * 0.8)]}
                lookAt={points[Math.floor(points.length * 0.81)]}
                scale={0.2}
              >
                <coneGeometry args={[0.5, 1, 16]} />
                <meshStandardMaterial color={isActiveTransition ? "#EC4899" : "#F59E0B"} />
              </mesh>
            )}

            {/* Лейбл перехода */}
            <Html
              position={[labelPosition.x, labelPosition.y, labelPosition.z]}
              center
              className="pointer-events-none"
            >
              <div className={`flex items-center justify-center px-2 py-1 text-xs font-bold text-white rounded-lg
                ${isActiveTransition ? 'bg-pink-900/90 ring-2 ring-pink-500 ring-opacity-70' : 'bg-amber-900/90'}`}>
                {formatTransitionLabel(transition)}
              </div>
            </Html>
          </group>
        );
      })}

      {/* Отрисовка состояний */}
      {states.map((state) => {
        // Проверяем, является ли это состояние текущим
        const isCurrentState = state.id === animationState.currentState;
        
        return (
          <group key={state.id} position={state.position}>
            {/* Состояние */}
            <mesh castShadow>
              <sphereGeometry args={[0.7, 32, 32]} />
              <meshPhongMaterial
                color={isCurrentState ? "#EC4899" : state.isAccept ? "#F59E0B" : "#6366F1"}
                shininess={100}
                specular={new THREE.Color("#FFFFFF")}
                emissive={isCurrentState ? new THREE.Color("#EC4899") : new THREE.Color("#000000")}
                emissiveIntensity={isCurrentState ? 0.3 : 0}
              />
            </mesh>

            {/* Дополнительное кольцо для принимающих состояний */}
            {state.isAccept && (
              <mesh position={[0, 0, 0]} scale={1.1}>
                <torusGeometry args={[0.7, 0.05, 16, 100]} />
                <meshStandardMaterial color={isCurrentState ? "#EC4899" : "#F59E0B"} />
              </mesh>
            )}

            {/* Дополнительная стрелка для начального состояния */}
            {state.isStart && (
              <group position={[-2, 0, 0]}>
                <mesh rotation={[0, 0, Math.PI / 2]}>
                  <coneGeometry args={[0.3, 0.7, 16]} />
                  <meshStandardMaterial color={isCurrentState ? "#EC4899" : "#EC4899"} />
                </mesh>
                <mesh position={[0.5, 0, 0]}>
                  <boxGeometry args={[1, 0.1, 0.1]} />
                  <meshStandardMaterial color={isCurrentState ? "#EC4899" : "#EC4899"} />
                </mesh>
              </group>
            )}

            {/* Лейбл состояния */}
            <Html position={[0, 0, 0]} center className="pointer-events-none">
              <div className={`
                w-16 h-16 rounded-full flex items-center justify-center
                text-white text-lg font-bold
                ${isCurrentState ? "bg-gradient-to-br from-pink-600/40 to-pink-900/40 ring-2 ring-pink-500 ring-opacity-70" :
                state.isAccept ? "bg-gradient-to-br from-amber-600/30 to-amber-900/30" :
                state.isStart ? "bg-gradient-to-br from-pink-600/30 to-pink-900/30" :
                "bg-gradient-to-br from-indigo-600/30 to-indigo-900/30"}
              `}>
                {state.id}
              </div>
            </Html>
          </group>
        );
      })}
    </group>
  );
};

// Компонент для визуализации машины Тьюринга
const TuringVisualization = () => {
  const [inputString, setInputString] = useState("0011");
  const [customInput, setCustomInput] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [isPaused, setIsPaused] = useState(true);
  const [isHalted, setIsHalted] = useState(false);
  const [animationState, setAnimationState] = useState({
    currentState: 'q0',
    tape: ['_', '0', '0', '1', '1', '_'],
    headPosition: 1, // Начинаем с первого символа после пустого
    history: []
  });
  const [explanationText, setExplanationText] = useState("Машина Тьюринга в начальном состоянии q0");

  // Функция для сброса анимации
  const resetMachine = (input = inputString) => {
    // Создаем начальную ленту с пустым символом в начале и конце
    const initialTape = ['_', ...input.split(''), '_'];
    
    setIsPlaying(false);
    setIsPaused(true);
    setIsHalted(false);
    setAnimationState({
      currentState: 'q0',
      tape: initialTape,
      headPosition: 1, // Начинаем с первого символа после пустого
      history: []
    });
    setExplanationText("Машина Тьюринга в начальном состоянии q0");
  };

  // Эффект для автоматического обновления при изменении входной строки
  useEffect(() => {
    resetMachine(inputString);
  }, [inputString]);

  // Функция перехода для машины Тьюринга
  const transition = (state, symbol) => {
    // Определение переходов машины Тьюринга
    const transitions = {
      'q0': {
        '0': { nextState: 'q0', write: '0', move: 'R' },
        '1': { nextState: 'q0', write: '1', move: 'R' },
        'X': { nextState: 'q0', write: 'X', move: 'R' },
        '_': { nextState: 'q1', write: '_', move: 'L' }
      },
      'q1': {
        '0': { nextState: 'q1', write: 'X', move: 'L' },
        '1': { nextState: 'q3', write: '1', move: 'L' },
        'X': { nextState: 'q3', write: 'X', move: 'L' },
        '_': { nextState: 'q2', write: '_', move: 'R' }
      },
      'q2': {
        // Принимающее состояние, нет переходов
      },
      'q3': {
        '0': { nextState: 'q3', write: '0', move: 'L' },
        '1': { nextState: 'q3', write: '1', move: 'L' },
        'X': { nextState: 'q3', write: 'X', move: 'L' },
        '_': { nextState: 'q0', write: '_', move: 'R' }
      }
    };
    
    // Проверяем наличие перехода для текущего состояния и символа
    return transitions[state]?.[symbol];
  };

  // Функция проверки принимающего состояния
  const isAcceptState = (state) => {
    return state === 'q2';
  };

  // Эффект для анимации шагов машины
  useEffect(() => {
    if (isPlaying && !isPaused && !isHalted) {
      const timer = setTimeout(() => {
        processNextStep();
      }, 1000 / speed);
      
      return () => clearTimeout(timer);
    }
  }, [isPlaying, isPaused, isHalted, speed, animationState]);

  // Обработка следующего шага машины Тьюринга
  const processNextStep = () => {
    const { currentState, tape, headPosition } = animationState;
    
    // Проверяем, находимся ли мы в принимающем состоянии
    if (isAcceptState(currentState)) {
      setIsHalted(true);
      setIsPlaying(false);
      setExplanationText(`Машина остановилась в принимающем состоянии ${currentState}. Строка принята.`);
      return;
    }
    
    // Получаем текущий символ под головкой
    const currentSymbol = tape[headPosition];
    
    // Проверяем наличие перехода
    const transitionResult = transition(currentState, currentSymbol);
    
    if (!transitionResult) {
      // Нет перехода, машина останавливается
      setIsHalted(true);
      setIsPlaying(false);
      
      if (isAcceptState(currentState)) {
        setExplanationText(`Машина остановилась в принимающем состоянии ${currentState}. Строка принята.`);
      } else {
        setExplanationText(`Машина остановилась в состоянии ${currentState}. Нет перехода по символу ${currentSymbol}.`);
      }
      
      return;
    }
    
    // Выполняем переход
    const { nextState, write, move } = transitionResult;
    
    // Создаем копию ленты
    const newTape = [...tape];
    
    // Записываем новый символ на текущую позицию
    newTape[headPosition] = write;
    
    // Определяем новую позицию головки
    let newHeadPosition = headPosition;
    if (move === 'L') {
      newHeadPosition = Math.max(0, headPosition - 1);
      // Если достигли начала ленты, добавляем пустой символ
      if (newHeadPosition === 0 && tape[0] !== '_') {
        newTape.unshift('_');
        newHeadPosition = 1;
      }
    } else if (move === 'R') {
      newHeadPosition = headPosition + 1;
      // Если достигли конца ленты, добавляем пустой символ
      if (newHeadPosition >= newTape.length) {
        newTape.push('_');
      }
    }
    
    // Обновляем историю
    const newHistory = [...animationState.history, {
      state: currentState,
      nextState,
      symbol: currentSymbol,
      write,
      move,
      headPosition,
      newHeadPosition
    }];
    
    // Обновляем состояние анимации
    setAnimationState({
      currentState: nextState,
      tape: newTape,
      headPosition: newHeadPosition,
      history: newHistory
    });
    
    // Обновляем пояснительный текст
    setExplanationText(`Переход из ${currentState} в ${nextState}, чтение ${currentSymbol}, запись ${write}, движение ${move}.`);
  };

  // Установка скорости воспроизведения
  const handleSpeedChange = (e) => {
    setSpeed(parseFloat(e.target.value));
  };

  // Управление воспроизведением
  const togglePlay = () => {
    if (isHalted) {
      // Если машина остановилась, сбрасываем и начинаем заново
      resetMachine();
      setIsPlaying(true);
      setIsPaused(false);
    } else {
      // Продолжение или пауза
      setIsPlaying(true);
      setIsPaused(!isPaused);
    }
  };

  // Переход на один шаг вперед
  const stepForward = () => {
    if (!isHalted) {
      setIsPlaying(true);
      setIsPaused(true);
      processNextStep();
    }
  };

  // Переход на один шаг назад
  const stepBackward = () => {
    if (animationState.history.length > 0) {
      // Получаем последний шаг из истории
      const lastStep = animationState.history[animationState.history.length - 1];
      
      // Создаем новую историю без последнего шага
      const newHistory = animationState.history.slice(0, -1);
      
      // Создаем копию ленты
      const newTape = [...animationState.tape];
      
      // Восстанавливаем символ на ленте
      newTape[lastStep.headPosition] = lastStep.symbol;
      
      // Обновляем состояние анимации
      setAnimationState({
        currentState: lastStep.state,
        tape: newTape,
        headPosition: lastStep.headPosition,
        history: newHistory
      });
      
      // Обновляем пояснительный текст
      if (newHistory.length === 0) {
        setExplanationText("Машина Тьюринга в начальном состоянии q0");
      } else {
        const prevStep = newHistory[newHistory.length - 1];
        setExplanationText(`Переход из ${prevStep.state} в ${prevStep.nextState}, чтение ${prevStep.symbol}, запись ${prevStep.write}, движение ${prevStep.move}.`);
      }
      
      // Сбрасываем флаг остановки
      setIsHalted(false);
    }
  };

  // Обработка custom input
  const handleCustomInputChange = (e) => {
    setCustomInput(e.target.value);
  };

  const applyCustomInput = () => {
    if (customInput.trim() && /^[01X]+$/.test(customInput)) {
      setInputString(customInput);
      resetMachine(customInput);
    }
  };

  // Предопределенные строки
  const predefinedStrings = [
    { value: "0011", label: "0011 (четное кол-во 0, принимается)" },
    { value: "01", label: "01 (четное кол-во 0, принимается)" },
    { value: "00", label: "00 (четное кол-во 0, принимается)" },
    { value: "001", label: "001 (нечетное кол-во 0, не принимается)" },
    { value: "0", label: "0 (нечетное кол-во 0, не принимается)" },
    { value: "111", label: "111 (пусто кол-во 0, принимается)" }
  ];
  
  // Форматирование ленты для отображения в UI
  const formatTape = (tape) => {
    return tape.map(symbol => symbol === '_' ? '␣' : symbol).join('');
  };

  return (
    <div className="flex flex-col">
      <div className="relative w-full h-[500px] mb-6 border rounded-lg bg-slate-900 border-slate-700">
        <Canvas shadows camera={{ position: [0, 0, 15], fov: 50 }}>
          <color attach="background" args={['#0F172A']} />

          <PresentationControls
            global
            rotation={[0, 0, 0]}
            polar={[-Math.PI / 4, Math.PI / 4]}
            azimuth={[-Math.PI / 4, Math.PI / 4]}
            config={{ mass: 2, tension: 400 }}
            snap={{ mass: 4, tension: 400 }}
            enabled={!isPlaying || isPaused}
          >
            <ambientLight intensity={0.3} />
            <pointLight position={[10, 10, 10]} intensity={1} castShadow />
            <spotLight position={[-10, 10, 10]} angle={0.3} penumbra={1} intensity={1} castShadow />

            <Suspense fallback={null}>
              <TuringMachineModel 
                animationState={animationState}
                isPlaying={isPlaying && !isPaused}
              />
              <Environment preset="city" />
            </Suspense>
          </PresentationControls>
        </Canvas>
        
        {/* Текущее состояние машины показываем поверх канваса */}
        <div className="absolute left-0 right-0 px-4 py-2 text-center rounded-lg bottom-4">
          <div className="p-3 text-white bg-slate-800/90 rounded-lg backdrop-blur">
            <p className="mb-2 text-base">
              <span className="font-semibold">Текущее состояние:</span> {animationState.currentState}
              {" | "}
              <span className="font-semibold">Позиция головки:</span> {animationState.headPosition}
            </p>
            <div className="flex items-center justify-center gap-2 text-sm">
              <div className="px-3 py-1 bg-slate-700 rounded-lg flex items-center">
                <span className="font-mono text-amber-400 whitespace-nowrap">
                  Лента: {formatTape(animationState.tape)} 
                  <span className="text-pink-500 ml-2">(головка на позиции {animationState.headPosition})</span>
                </span>
              </div>
              {isHalted && (
                <div className={`px-3 py-1 rounded-lg ${isAcceptState(animationState.currentState) ? 'bg-green-900/50 text-green-300' : 'bg-red-900/50 text-red-300'}`}>
                  {isAcceptState(animationState.currentState) ? 'Принято' : 'Остановлено'}
                </div>
              )}
            </div>
            <p className="mt-2 text-sm text-slate-300">{explanationText}</p>
          </div>
        </div>
      </div>
      
      <div className="p-4 mb-6 border rounded-lg bg-slate-800 border-slate-700">
        <div className="flex flex-wrap items-center gap-4 mb-4">
          <div className="flex-grow">
            <label className="block mb-1 text-sm text-slate-400">Входная строка</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={customInput}
                onChange={handleCustomInputChange}
                placeholder="Введите строку из символов 0, 1 и X"
                className="flex-grow px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
              />
              <button
                onClick={applyCustomInput}
                className="px-4 py-2 font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                disabled={!customInput.trim() || !/^[01X]+$/.test(customInput)}
              >
                Применить
              </button>
            </div>
            <p className="mt-1 text-xs text-slate-400">Можно использовать символы 0, 1 и X</p>
          </div>
          
          <div>
            <label className="block mb-1 text-sm text-slate-400">Или выберите:</label>
            <select
              value={inputString}
              onChange={(e) => setInputString(e.target.value)}
              className="px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
            >
              {predefinedStrings.map((str, idx) => (
                <option key={idx} value={str.value}>{str.label}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center justify-center w-full gap-4 mb-2">
          <button 
            onClick={stepBackward}
            disabled={animationState.history.length === 0}
            className="px-4 py-2 font-medium text-white transition-colors bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:opacity-50"
          >
            ← Назад
          </button>
          
          <button 
            onClick={togglePlay}
            className={`px-4 py-2 font-medium text-white transition-colors rounded-lg ${
              !isPaused ? 'bg-amber-600 hover:bg-amber-700' : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            {!isPaused ? 'Пауза' : isHalted ? 'Начать заново' : 'Воспроизвести'}
          </button>
          
          <button 
            onClick={stepForward}
            disabled={isHalted}
            className="px-4 py-2 font-medium text-white transition-colors bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:opacity-50"
          >
            Вперед →
          </button>
          
          <button 
            onClick={() => resetMachine()}
            className="px-4 py-2 font-medium text-white transition-colors bg-red-600 rounded-lg hover:bg-red-700"
          >
            Сбросить
          </button>
        </div>
        
        <div className="flex items-center justify-center gap-2 mt-4">
          <span className="text-white">Скорость:</span>
          <input 
            type="range" 
            min="0.5" 
            max="5" 
            step="0.5" 
            value={speed}
            onChange={handleSpeedChange}
            className="w-32 bg-blue-600 rounded-lg cursor-pointer"
          />
          <span className="text-white">{speed}x</span>
        </div>
      </div>
      
      <div className="p-4 mb-6 border rounded-lg bg-slate-800 border-slate-700">
        <h3 className="mb-3 text-lg font-medium text-white">Описание машины Тьюринга</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full mb-4 text-sm text-left text-gray-300">
            <thead className="uppercase bg-slate-900 text-gray-400">
              <tr>
                <th className="px-6 py-3">Состояние</th>
                <th className="px-6 py-3">Чтение</th>
                <th className="px-6 py-3">Запись</th>
                <th className="px-6 py-3">Движение</th>
                <th className="px-6 py-3">Следующее состояние</th>
                <th className="px-6 py-3">Тип</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b bg-slate-700/20 border-slate-700">
                <td className="px-6 py-4 font-medium text-white">q0</td>
                <td className="px-6 py-4">0</td>
                <td className="px-6 py-4">0</td>
                <td className="px-6 py-4">R</td>
                <td className="px-6 py-4">q0</td>
                <td className="px-6 py-4">Начальное</td>
              </tr>
              <tr className="border-b bg-slate-800/20 border-slate-700">
                <td className="px-6 py-4 font-medium text-white">q0</td>
                <td className="px-6 py-4">1</td>
                <td className="px-6 py-4">1</td>
                <td className="px-6 py-4">R</td>
                <td className="px-6 py-4">q0</td>
                <td className="px-6 py-4">Начальное</td>
              </tr>
              <tr className="border-b bg-slate-700/20 border-slate-700">
                <td className="px-6 py-4 font-medium text-white">q0</td>
                <td className="px-6 py-4">X</td>
                <td className="px-6 py-4">X</td>
                <td className="px-6 py-4">R</td>
                <td className="px-6 py-4">q0</td>
                <td className="px-6 py-4">Начальное</td>
              </tr>
              <tr className="border-b bg-slate-800/20 border-slate-700">
                <td className="px-6 py-4 font-medium text-white">q0</td>
                <td className="px-6 py-4">_</td>
                <td className="px-6 py-4">_</td>
                <td className="px-6 py-4">L</td>
                <td className="px-6 py-4">q1</td>
                <td className="px-6 py-4">Начальное</td>
              </tr>
              <tr className="border-b bg-slate-700/20 border-slate-700">
                <td className="px-6 py-4 font-medium text-white">q1</td>
                <td className="px-6 py-4">0</td>
                <td className="px-6 py-4">X</td>
                <td className="px-6 py-4">L</td>
                <td className="px-6 py-4">q1</td>
                <td className="px-6 py-4">Промежуточное</td>
              </tr>
              <tr className="border-b bg-slate-800/20 border-slate-700">
                <td className="px-6 py-4 font-medium text-white">q1</td>
                <td className="px-6 py-4">1</td>
                <td className="px-6 py-4">1</td>
                <td className="px-6 py-4">L</td>
                <td className="px-6 py-4">q3</td>
                <td className="px-6 py-4">Промежуточное</td>
              </tr>
              <tr className="border-b bg-slate-700/20 border-slate-700">
                <td className="px-6 py-4 font-medium text-white">q1</td>
                <td className="px-6 py-4">X</td>
                <td className="px-6 py-4">X</td>
                <td className="px-6 py-4">L</td>
                <td className="px-6 py-4">q3</td>
                <td className="px-6 py-4">Промежуточное</td>
              </tr>
              <tr className="border-b bg-slate-800/20 border-slate-700">
                <td className="px-6 py-4 font-medium text-white">q1</td>
                <td className="px-6 py-4">_</td>
                <td className="px-6 py-4">_</td>
                <td className="px-6 py-4">R</td>
                <td className="px-6 py-4">q2</td>
                <td className="px-6 py-4">Промежуточное</td>
              </tr>
              <tr className="border-b bg-slate-700/20 border-slate-700">
                <td className="px-6 py-4 font-medium text-white">q3</td>
                <td className="px-6 py-4">0</td>
                <td className="px-6 py-4">0</td>
                <td className="px-6 py-4">L</td>
                <td className="px-6 py-4">q3</td>
                <td className="px-6 py-4">Промежуточное</td>
              </tr>
              <tr className="border-b bg-slate-800/20 border-slate-700">
                <td className="px-6 py-4 font-medium text-white">q3</td>
                <td className="px-6 py-4">1</td>
                <td className="px-6 py-4">1</td>
                <td className="px-6 py-4">L</td>
                <td className="px-6 py-4">q3</td>
                <td className="px-6 py-4">Промежуточное</td>
              </tr>
              <tr className="border-b bg-slate-700/20 border-slate-700">
                <td className="px-6 py-4 font-medium text-white">q3</td>
                <td className="px-6 py-4">X</td>
                <td className="px-6 py-4">X</td>
                <td className="px-6 py-4">L</td>
                <td className="px-6 py-4">q3</td>
                <td className="px-6 py-4">Промежуточное</td>
              </tr>
              <tr className="border-b bg-slate-800/20 border-slate-700">
                <td className="px-6 py-4 font-medium text-white">q3</td>
                <td className="px-6 py-4">_</td>
                <td className="px-6 py-4">_</td>
                <td className="px-6 py-4">R</td>
                <td className="px-6 py-4">q0</td>
                <td className="px-6 py-4">Промежуточное</td>
              </tr>
              <tr className="bg-slate-700/20">
                <td className="px-6 py-4 font-medium text-white">q2</td>
                <td className="px-6 py-4">-</td>
                <td className="px-6 py-4">-</td>
                <td className="px-6 py-4">-</td>
                <td className="px-6 py-4">-</td>
                <td className="px-6 py-4">Принимающее</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <p className="text-slate-300">
          Эта машина Тьюринга определяет, содержит ли входная строка четное количество символов '0'. 
          Принцип работы:
        </p>
        <ul className="mt-2 ml-5 space-y-1 text-slate-300 list-disc">
          <li>Машина сканирует всю ленту, двигаясь вправо, пока не достигнет пустого символа '_' (состояние q0)</li>
          <li>Затем она начинает двигаться влево, заменяя символы '0' на 'X' и считая их (состояние q1)</li>
          <li>Если она встречает '1' или 'X', переходит в состояние q3 и продолжает движение влево</li>
          <li>Когда машина достигает начала ленты (символ '_'), она возвращается в состояние q0 и снова двигается вправо</li>
          <li>Процесс повторяется, пока все символы '0' не будут заменены на 'X'</li>
          <li>Если при последнем проходе не было обнаружено ни одного символа '0', машина переходит в принимающее состояние q2</li>
          <li>Таким образом, строка принимается, если содержит четное количество символов '0' (включая 0)</li>
        </ul>
      </div>
      
      <div className="mt-4 text-slate-300">
        <p className="text-center">
          <span className="inline-flex items-center px-2 py-1 mr-2 text-xs text-blue-300 rounded-md bg-blue-900/30">
            <span className="inline-block w-2 h-2 mr-1 bg-blue-500 rounded-full"></span>
            Обычные состояния
          </span>
          <span className="inline-flex items-center px-2 py-1 mr-2 text-xs text-amber-300 rounded-md bg-amber-900/30">
            <span className="inline-block w-2 h-2 mr-1 bg-amber-500 rounded-full"></span>
            Принимающие состояния
          </span>
          <span className="inline-flex items-center px-2 py-1 text-xs text-pink-300 rounded-md bg-pink-900/30">
            <span className="inline-block w-2 h-2 mr-1 bg-pink-500 rounded-full"></span>
            Текущее состояние
          </span>
        </p>
      </div>
    </div>
  );
};

// Реализация алгоритма машины Тьюринга
const CodeImplementation = () => {
  const turingCode = `
class TuringMachine {
  constructor(states, alphabet, tapeAlphabet, transitions, startState, acceptStates, blankSymbol = '_') {
    this.states = states;                 // Множество состояний
    this.alphabet = alphabet;             // Входной алфавит
    this.tapeAlphabet = tapeAlphabet;     // Алфавит ленты
    this.transitions = transitions;       // Функция переходов
    this.startState = startState;         // Начальное состояние
    this.acceptStates = acceptStates;     // Множество принимающих состояний
    this.blankSymbol = blankSymbol;       // Пустой символ
  }
  
  // Инициализация ленты с входной строкой
  initTape(input) {
    // Добавляем пустой символ в начало и конец ленты
    return [this.blankSymbol, ...input.split(''), this.blankSymbol];
  }
  
  // Расширение ленты при необходимости
  extendTape(tape, headPosition) {
    // Если головка находится на краю ленты, добавляем пустой символ
    if (headPosition <= 0) {
      tape.unshift(this.blankSymbol);
      return { tape, headPosition: 1 };
    } else if (headPosition >= tape.length - 1) {
      tape.push(this.blankSymbol);
    }
    return { tape, headPosition };
  }
  
  // Выполнение машины Тьюринга
  run(input, maxSteps = 10000) {
    // Инициализация ленты
    let tape = this.initTape(input);
    
    // Начальная позиция головки (после первого пустого символа)
    let headPosition = 1;
    
    // Текущее состояние
    let currentState = this.startState;
    
    // Шаги выполнения
    let steps = [];
    
    // Ограничение на количество шагов для предотвращения бесконечных циклов
    let stepCount = 0;
    
    while (stepCount < maxSteps) {
      // Если текущее состояние - принимающее, машина останавливается
      if (this.acceptStates.has(currentState)) {
        return { accepted: true, tape, headPosition, steps };
      }
      
      // Получаем текущий символ под головкой
      const currentSymbol = tape[headPosition];
      
      // Проверяем наличие перехода
      const transition = this.transitions[currentState]?.[currentSymbol];
      
      // Если нет перехода, машина останавливается
      if (!transition) {
        return { 
          accepted: this.acceptStates.has(currentState), 
          tape, 
          headPosition, 
          steps,
          error: \`Нет перехода из состояния \${currentState} по символу \${currentSymbol}\`
        };
      }
      
      // Выполняем переход
      const { nextState, write, move } = transition;
      
      // Записываем шаг в историю
      steps.push({
        state: currentState,
        symbol: currentSymbol,
        nextState,
        write,
        move,
        headPosition,
        tape: [...tape]
      });
      
      // Записываем новый символ на ленту
      tape[headPosition] = write;
      
      // Двигаем головку
      if (move === 'L') {
        headPosition--;
      } else if (move === 'R') {
        headPosition++;
      }
      
      // Расширяем ленту при необходимости
      const result = this.extendTape(tape, headPosition);
      tape = result.tape;
      headPosition = result.headPosition;
      
      // Обновляем текущее состояние
      currentState = nextState;
      
      // Увеличиваем счетчик шагов
      stepCount++;
    }
    
    // Если превышено максимальное количество шагов
    return { 
      accepted: false, 
      tape, 
      headPosition, 
      steps,
      error: \`Превышено максимальное количество шагов (\${maxSteps})\`
    };
  }
  
  // Пошаговое выполнение машины Тьюринга
  runStepByStep(input) {
    // Инициализация ленты
    const tape = this.initTape(input);
    
    // Начальная позиция головки (после первого пустого символа)
    const headPosition = 1;
    
    // Текущее состояние
    const currentState = this.startState;
    
    // Создаем объект с начальным состоянием машины
    return {
      tape,
      headPosition,
      currentState,
      steps: [],
      done: false,
      accepted: false,
      error: null
    };
  }
  
  // Выполнение одного шага машины
  step(machineState) {
    // Если машина уже остановилась, ничего не делаем
    if (machineState.done) {
      return { ...machineState };
    }
    
    // Если текущее состояние - принимающее, машина останавливается
    if (this.acceptStates.has(machineState.currentState)) {
      return { 
        ...machineState, 
        done: true, 
        accepted: true 
      };
    }
    
    // Получаем текущий символ под головкой
    const currentSymbol = machineState.tape[machineState.headPosition];
    
    // Проверяем наличие перехода
    const transition = this.transitions[machineState.currentState]?.[currentSymbol];
    
    // Если нет перехода, машина останавливается
    if (!transition) {
      return { 
        ...machineState, 
        done: true, 
        accepted: this.acceptStates.has(machineState.currentState),
        error: \`Нет перехода из состояния \${machineState.currentState} по символу \${currentSymbol}\`
      };
    }
    
    // Выполняем переход
    const { nextState, write, move } = transition;
    
    // Создаем копии для модификации
    const newTape = [...machineState.tape];
    let newHeadPosition = machineState.headPosition;
    
    // Записываем новый символ на ленту
    newTape[newHeadPosition] = write;
    
    // Двигаем головку
    if (move === 'L') {
      newHeadPosition--;
    } else if (move === 'R') {
      newHeadPosition++;
    }
    
    // Расширяем ленту при необходимости
    if (newHeadPosition <= 0) {
      newTape.unshift(this.blankSymbol);
      newHeadPosition = 1;
    } else if (newHeadPosition >= newTape.length - 1) {
      newTape.push(this.blankSymbol);
    }
    
    // Записываем шаг в историю
    const newSteps = [...machineState.steps, {
      state: machineState.currentState,
      symbol: currentSymbol,
      nextState,
      write,
      move,
      headPosition: machineState.headPosition,
      newHeadPosition,
      tape: [...machineState.tape]
    }];
    
    // Возвращаем новое состояние машины
    return {
      tape: newTape,
      headPosition: newHeadPosition,
      currentState: nextState,
      steps: newSteps,
      done: false,
      accepted: false,
      error: null
    };
  }
}

// Пример машины Тьюринга для проверки четности числа символов '0'
const createParityTuringMachine = () => {
  // Определение состояний, алфавитов
  const states = new Set(['q0', 'q1', 'q2', 'q3']);
  const alphabet = new Set(['0', '1']);
  const tapeAlphabet = new Set(['0', '1', 'X', '_']);
  
  // Определение функции переходов
  // transitions[state][symbol] = { nextState, write, move }
  const transitions = {
    'q0': {
      '0': { nextState: 'q0', write: '0', move: 'R' },
      '1': { nextState: 'q0', write: '1', move: 'R' },
      'X': { nextState: 'q0', write: 'X', move: 'R' },
      '_': { nextState: 'q1', write: '_', move: 'L' }
    },
    'q1': {
      '0': { nextState: 'q1', write: 'X', move: 'L' },
      '1': { nextState: 'q3', write: '1', move: 'L' },
      'X': { nextState: 'q3', write: 'X', move: 'L' },
      '_': { nextState: 'q2', write: '_', move: 'R' }
    },
    'q3': {
      '0': { nextState: 'q3', write: '0', move: 'L' },
      '1': { nextState: 'q3', write: '1', move: 'L' },
      'X': { nextState: 'q3', write: 'X', move: 'L' },
      '_': { nextState: 'q0', write: '_', move: 'R' }
    }
    // q2 - принимающее состояние, нет переходов
  };
  
  // Создание машины Тьюринга
  return new TuringMachine(
    states,
    alphabet,
    tapeAlphabet,
    transitions,
    'q0',                // Начальное состояние
    new Set(['q2']),     // Принимающие состояния
    '_'                  // Пустой символ
  );
};

// Тестирование
const turingMachine = createParityTuringMachine();

// Тестовые строки
const testStrings = [
  '0011',     // Четное количество 0 (принимается)
  '01',       // Четное количество 0 (принимается)
  '001',      // Нечетное количество 0 (не принимается)
  '111',      // Пусто 0 (принимается)
  '0'         // Нечетное количество 0 (не принимается)
];

// Запуск машины на тестовых строках
testStrings.forEach(input => {
  const result = turingMachine.run(input);
  console.log(\`Входная строка: \${input}\`);
  console.log(\`Результат: \${result.accepted ? 'Принято' : 'Отвергнуто'}\`);
  console.log(\`Конечная лента: \${result.tape.join('')}\`);
  console.log(\`Количество шагов: \${result.steps.length}\`);
  console.log('---');
});

// Пошаговое выполнение машины на строке "0011"
let machineState = turingMachine.runStepByStep('0011');
console.log('Начальное состояние:');
console.log(\`Лента: \${machineState.tape.join('')}\`);
console.log(\`Головка: \${machineState.headPosition}\`);
console.log(\`Состояние: \${machineState.currentState}\`);

// Выполнение первых 10 шагов (или до остановки)
for (let i = 0; i < 10; i++) {
  if (machineState.done) {
    console.log(\`Машина остановилась. Результат: \${machineState.accepted ? 'Принято' : 'Отвергнуто'}\`);
    break;
  }
  
  machineState = turingMachine.step(machineState);
  
  console.log(\`\\nШаг \${i + 1}:\`);
  console.log(\`Лента: \${machineState.tape.join('')}\`);
  console.log(\`Головка: \${machineState.headPosition}\`);
  console.log(\`Состояние: \${machineState.currentState}\`);
  
  if (machineState.error) {
    console.log(\`Ошибка: \${machineState.error}\`);
    break;
  }
}
`;

  return (
    <div className="p-4 overflow-auto font-mono text-sm text-gray-300 rounded-lg bg-slate-900" style={{ maxHeight: '600px' }}>
      <pre>{turingCode}</pre>
    </div>
  );
};

// Объяснение работы машины Тьюринга
const AlgorithmExplanation = () => {
  return (
    <div>
      <p className="mb-4">
        Машина Тьюринга — это теоретическая вычислительная модель, предложенная Аланом Тьюрингом в 1936 году. 
        Она представляет собой абстрактную машину, которая, несмотря на свою простоту, способна выполнять 
        произвольные алгоритмические вычисления. Машина Тьюринга является эталоном вычислительной мощности, 
        и согласно тезису Черча-Тьюринга, любой алгоритм может быть реализован на машине Тьюринга.
      </p>

      <h3 className="mt-6 mb-3 text-xl font-bold text-blue-400">Формальное определение:</h3>
      <p className="mb-4">
        Машину Тьюринга можно представить как семёрку (Q, &Sigma;, &Gamma;, &delta;, q₀, q_accept, q_reject), где:
      </p>
      <ul className="pl-5 mb-6 space-y-2 list-disc">
        <li><strong>Q</strong> — конечное множество состояний</li>
        <li><strong>&Sigma;</strong> — конечный алфавит входных символов (не содержит пустой символ)</li>
        <li><strong>&Gamma;</strong> — конечный алфавит ленточных символов (включает пустой символ и все символы из &Sigma;)</li>
        <li><strong>&delta;: Q × &Gamma; → Q × &Gamma; × {L, R, S}</strong> — функция переходов, определяющая для каждой 
          пары (текущее состояние, текущий символ на ленте) тройку (следующее состояние, символ для записи, 
          направление движения головки)</li>
        <li><strong>q₀ ∈ Q</strong> — начальное состояние</li>
        <li><strong>q_accept ∈ Q</strong> — принимающее состояние</li>
        <li><strong>q_reject ∈ Q</strong> — отвергающее состояние</li>
      </ul>

      <h3 className="mt-6 mb-3 text-xl font-bold text-blue-400">Компоненты машины Тьюринга:</h3>
      <ul className="pl-5 space-y-2 list-disc">
        <li>
          <strong>Бесконечная лента:</strong> Разделена на ячейки, каждая из которых содержит один символ из 
          алфавита Γ. Изначально на ленте записана входная строка, а все остальные ячейки содержат пустой символ.
        </li>
        <li>
          <strong>Головка:</strong> Указывает на текущую ячейку ленты. Может читать символ в текущей ячейке, 
          записывать новый символ и двигаться влево (L) или вправо (R), или оставаться на месте (S).
        </li>
        <li>
          <strong>Управляющее устройство:</strong> Содержит конечное множество состояний Q и функцию переходов δ. 
          В каждый момент времени машина находится в одном из состояний.
        </li>
      </ul>

      <h3 className="mt-6 mb-3 text-xl font-bold text-blue-400">Принцип работы:</h3>
      <ol className="pl-5 space-y-2 list-decimal">
        <li>
          <strong>Инициализация:</strong> Машина начинает работу в начальном состоянии q₀, с входной строкой 
          на ленте и головкой, указывающей на первый символ.
        </li>
        <li>
          <strong>Чтение символа:</strong> Машина читает символ, на который указывает головка.
        </li>
        <li>
          <strong>Выполнение перехода:</strong> На основе текущего состояния и прочитанного символа 
          машина выполняет переход согласно функции δ:
          <ul className="pl-5 mt-2 list-disc">
            <li>Изменяет текущее состояние</li>
            <li>Записывает новый символ в текущую ячейку ленты</li>
            <li>Двигает головку влево (L), вправо (R) или оставляет на месте (S)</li>
          </ul>
        </li>
        <li>
          <strong>Повторение:</strong> Шаги 2-3 повторяются до тех пор, пока машина не перейдет в принимающее 
          состояние q_accept (строка принимается) или в отвергающее состояние q_reject (строка отвергается), 
          или будет работать бесконечно.
        </li>
      </ol>

      <div className="p-4 mt-6 border rounded-lg bg-cyan-900/20 border-cyan-800/30">
        <h4 className="mb-2 font-bold text-cyan-300">Пример: Машина Тьюринга для проверки четности числа символов '0'</h4>
        <p className="text-cyan-100 mb-3">
          Машина Тьюринга, представленная в визуализации, определяет, содержит ли входная строка четное количество символов '0'.
          Алгоритм работает следующим образом:
        </p>
        <ol className="pl-5 space-y-1 text-cyan-100 list-decimal">
          <li>Машина сканирует ленту справа налево, заменяя символы '0' на 'X' (считая их по одному)</li>
          <li>Каждый раз, когда она заменяет '0', она возвращается к началу ленты и снова сканирует ее</li>
          <li>Если при сканировании не обнаружено ни одного символа '0', машина проверяет, четное ли количество было заменено</li>
          <li>Если четное, машина переходит в принимающее состояние q2, иначе останавливается в непринимающем состоянии</li>
        </ol>
        <p className="mt-3 text-cyan-100">
          Такой алгоритм иллюстрирует основные принципы работы машины Тьюринга: пошаговое преобразование ленты, 
          хранение информации в состояниях и возможность многократного сканирования входных данных.
        </p>
      </div>

      <div className="p-4 mt-6 border rounded-lg bg-blue-900/20 border-blue-800/30">
        <h4 className="mb-2 font-bold text-blue-300">Исторический контекст и значение:</h4>
        <p className="text-blue-100">
          Машина Тьюринга была предложена задолго до появления реальных компьютеров, но она оказала 
          огромное влияние на теорию вычислений и информатику в целом:
        </p>
        <ul className="pl-5 mt-3 text-blue-100 list-disc">
          <li>
            Она обеспечила математически строгое определение алгоритма и вычислимости, что позволило 
            формализовать понятие "алгоритмически разрешимой" задачи.
          </li>
          <li>
            С ее помощью Тьюринг доказал существование "алгоритмически неразрешимых" задач, таких как 
            проблема остановки.
          </li>
          <li>
            Она стала теоретической основой для архитектуры современных компьютеров, предложенной 
            фон Нейманом.
          </li>
          <li>
            Тезис Черча-Тьюринга утверждает, что любая вычислимая функция может быть вычислена на машине Тьюринга, 
            что делает ее универсальной моделью вычислений.
          </li>
        </ul>
      </div>

      <div className="p-4 mt-6 border rounded-lg bg-indigo-900/20 border-indigo-800/30">
        <h4 className="mb-2 font-bold text-indigo-300">Расширения и варианты:</h4>
        <ul className="pl-5 text-indigo-100 list-disc">
          <li>
            <strong>Многоленточные машины Тьюринга:</strong> Имеют несколько лент и головок, что 
            упрощает описание алгоритмов, но не увеличивает вычислительную мощность.
          </li>
          <li>
            <strong>Недетерминированные машины Тьюринга:</strong> Могут иметь несколько возможных 
            переходов для одной пары (состояние, символ).
          </li>
          <li>
            <strong>Универсальная машина Тьюринга:</strong> Может симулировать работу любой другой 
            машины Тьюринга, что делает ее предшественником современных компьютеров.
          </li>
          <li>
            <strong>Вероятностные и квантовые машины Тьюринга:</strong> Расширения, включающие 
            элементы вероятности или квантовой механики.
          </li>
        </ul>
      </div>
    </div>
  );
};

// Практическое применение машины Тьюринга
const ApplicationsSection = () => {
  return (
    <div>
      <p className="mb-4">
        Хотя машина Тьюринга является прежде всего теоретической моделью, ее концепции имеют широкое 
        практическое применение в информатике и технологиях, а также глубокое влияние на наше понимание 
        вычислений и пределов алгоритмической обработки.
      </p>

      <h3 className="mt-4 mb-2 text-xl font-bold text-blue-400">Теоретические применения:</h3>
      <ul className="pl-5 space-y-2 list-disc">
        <li>
          <strong>Основа теории вычислимости:</strong> Машина Тьюринга определяет, что может быть 
          вычислено алгоритмически, независимо от конкретной реализации или языка программирования.
        </li>
        <li>
          <strong>Классификация проблем:</strong> С помощью машины Тьюринга определяются классы 
          вычислительной сложности (P, NP, NP-полные, неразрешимые), что важно для понимания 
          принципиальных ограничений вычислений.
        </li>
        <li>
          <strong>Доказательство неразрешимости:</strong> Машина Тьюринга используется для доказательства 
          того, что некоторые проблемы (например, проблема остановки, проблема соответствия Поста) 
          не могут быть решены никаким алгоритмом.
        </li>
        <li>
          <strong>Формальное определение алгоритма:</strong> Машина Тьюринга предоставляет математически 
          строгое определение понятия "алгоритм", что позволяет строго доказывать свойства алгоритмов.
        </li>
      </ul>

      <h3 className="mt-6 mb-2 text-xl font-bold text-blue-400">Практическое влияние:</h3>
      <ul className="pl-5 space-y-2 list-disc">
        <li>
          <strong>Архитектура компьютеров:</strong> Концепция машины Тьюринга повлияла на разработку 
          архитектуры фон Неймана, которая лежит в основе большинства современных компьютеров.
        </li>
        <li>
          <strong>Компиляторы и языки программирования:</strong> Теория формальных языков, тесно 
          связанная с машинами Тьюринга, применяется при разработке компиляторов и языков программирования.
        </li>
        <li>
          <strong>Автоматический анализ программ:</strong> Понимание ограничений вычислений, основанное 
          на машине Тьюринга, критически важно для статического анализа программ и верификации.
        </li>
        <li>
          <strong>Искусственный интеллект:</strong> Концепции вычислимости и рекурсии, которые формализованы 
          в машине Тьюринга, фундаментальны для исследований в области ИИ.
        </li>
      </ul>

      <h3 className="mt-6 mb-2 text-xl font-bold text-blue-400">Образовательная ценность:</h3>
      <ul className="pl-5 space-y-2 list-disc">
        <li>
          <strong>Изучение основ вычислений:</strong> Машина Тьюринга используется для обучения 
          студентов-информатиков базовым принципам вычислений и алгоритмам.
        </li>
        <li>
          <strong>Понимание ограничений вычислений:</strong> Изучение машины Тьюринга помогает 
          понять принципиальные ограничения компьютеров и алгоритмов.
        </li>
        <li>
          <strong>Разработка алгоритмического мышления:</strong> Программирование в абстрактной модели 
          машины Тьюринга развивает навыки точного и строгого алгоритмического мышления.
        </li>
      </ul>

      <div className="p-4 mt-6 border rounded-lg bg-blue-900/20 border-blue-800/30">
        <h4 className="mb-2 font-bold text-blue-300">Пример: Архитектура фон Неймана и машина Тьюринга</h4>
        <p className="text-blue-100 mb-3">
          Архитектура фон Неймана, лежащая в основе большинства современных компьютеров, можно рассматривать 
          как практическую реализацию концепций машины Тьюринга:
        </p>
        <table className="w-full text-sm text-left border-collapse text-blue-200">
          <thead>
            <tr className="bg-blue-800/30">
              <th className="p-2 border border-blue-700">Машина Тьюринга</th>
              <th className="p-2 border border-blue-700">Архитектура фон Неймана</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2 border border-blue-700">Лента</td>
              <td className="p-2 border border-blue-700">Память (RAM)</td>
            </tr>
            <tr>
              <td className="p-2 border border-blue-700">Головка</td>
              <td className="p-2 border border-blue-700">Адресация памяти</td>
            </tr>
            <tr>
              <td className="p-2 border border-blue-700">Состояния</td>
              <td className="p-2 border border-blue-700">Счетчик команд и регистры</td>
            </tr>
            <tr>
              <td className="p-2 border border-blue-700">Функция переходов</td>
              <td className="p-2 border border-blue-700">Процессор (CPU) и набор инструкций</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

const TuringPage = () => {
  // Получаем связанные алгоритмы
  const relatedAlgorithms = getRelatedAlgorithms('turing', 'automata').map(algo => ({
    id: algo.id,
    name: algo.name,
    path: algo.path,
  }));

  return (
    <AlgorithmLayout
      title="Машина Тьюринга"
      description="Универсальная математическая модель вычисления с неограниченной лентой памяти"
      complexity={{
        time: 'O(n)',
        space: 'O(n)',
      }}
      category={{
        id: 'automata',
        name: 'Конечные автоматы',
        icon: 'ph:tape-bold',
      }}
      relatedAlgorithms={relatedAlgorithms}
      visualization={<TuringVisualization />}
      implementation={<CodeImplementation />}
      explanation={<AlgorithmExplanation />}
      applications={<ApplicationsSection />}
    />
  );
};

export default TuringPage;
