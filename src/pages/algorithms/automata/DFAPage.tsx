import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, PresentationControls, Html } from '@react-three/drei';
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

// Компонент для отрисовки автомата внутри Canvas
const AutomatonModel = ({ animationState, inputString, currentStep, isPlaying }) => {
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
  
  // Ищем обратные переходы для корректной отрисовки
  const getReversed = (from, to) => {
    return transitions.some(t =>
      (t.from === to && t.to === from) &&
      transitions.findIndex(tr => tr.from === from && tr.to === to) <
      transitions.findIndex(tr => tr.from === to && tr.to === from)
    );
  };
  
  // Теперь useFrame используется правильно - внутри компонента, рендеримого в Canvas
  useFrame((state, delta) => {
    if (groupRef.current) {
      // Если не играет анимация, медленно вращаем граф
      if (!isPlaying) {
        groupRef.current.rotation.y += delta * 0.1;
      }
    }
  });

  return (
    <group ref={groupRef}>
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
        const isActiveTransition = animationState.currentState === transition.from && 
                                 inputString[currentStep] === transition.label;

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
              <div className={`flex items-center justify-center w-6 h-6 text-xs font-bold text-white rounded-full 
                ${isActiveTransition ? 'bg-pink-900/90 ring-2 ring-pink-500 ring-opacity-70' : 'bg-amber-900/90'}`}>
                {transition.label}
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

// Компонент для визуализации детерминированного конечного автомата
const DFAVisualization = () => {
  const [inputString, setInputString] = useState("abaab");
  const [customInput, setCustomInput] = useState("");
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [isPaused, setIsPaused] = useState(true);
  const [isAccepted, setIsAccepted] = useState(null);
  const [animationState, setAnimationState] = useState({
    currentState: 'q0',
    processedInput: '',
    remainingInput: 'abaab',
    history: []
  });
  const [explanationText, setExplanationText] = useState("Автомат в начальном состоянии q0");

  // Функция для сброса анимации
  const resetAutomaton = (input = inputString) => {
    setCurrentStep(0);
    setIsPlaying(false);
    setIsPaused(true);
    setIsAccepted(null);
    setAnimationState({
      currentState: 'q0',
      processedInput: '',
      remainingInput: input,
      history: []
    });
    setExplanationText("Автомат в начальном состоянии q0");
  };

  // Эффект для автоматического обновления при изменении входной строки
  useEffect(() => {
    resetAutomaton(inputString);
  }, [inputString]);

  // Функция перехода для DFA
  const transition = (state, symbol) => {
    const transitions = {
      'q0': { 'a': 'q1', 'b': 'q3' },
      'q1': { 'a': 'q1', 'b': 'q2' },
      'q2': { 'a': 'q1', 'b': 'q3' },
      'q3': { 'a': 'q2', 'b': 'q0' }
    };
    
    return transitions[state][symbol];
  };

  // Функция проверки принимающего состояния
  const isAcceptState = (state) => {
    return state === 'q2';
  };

  // Эффект для анимации шагов автомата
  useEffect(() => {
    if (isPlaying && !isPaused && currentStep < inputString.length) {
      const timer = setTimeout(() => {
        processNextSymbol();
      }, 1000 / speed);
      
      return () => clearTimeout(timer);
    }
  }, [isPlaying, isPaused, currentStep, inputString, speed]);

  // Обработка следующего символа
  const processNextSymbol = () => {
    if (currentStep >= inputString.length) {
      // Конец строки
      const finalState = animationState.currentState;
      setIsAccepted(isAcceptState(finalState));
      setIsPlaying(false);
      setExplanationText(`Строка ${isAcceptState(finalState) ? 'принята' : 'отвергнута'}. Конечное состояние: ${finalState}`);
      return;
    }
    
    const symbol = inputString[currentStep];
    const nextState = transition(animationState.currentState, symbol);
    
    if (!nextState) {
      // Нет перехода для данного символа
      setIsAccepted(false);
      setIsPlaying(false);
      setExplanationText(`Строка отвергнута. Нет перехода из ${animationState.currentState} по символу ${symbol}`);
      return;
    }
    
    // Обновляем состояние анимации
    setAnimationState(prev => {
      const newHistory = [...prev.history, { state: prev.currentState, symbol, nextState }];
      return {
        currentState: nextState,
        processedInput: prev.processedInput + symbol,
        remainingInput: prev.remainingInput.substring(1),
        history: newHistory
      };
    });
    
    // Обновляем текущий шаг и пояснительный текст
    setCurrentStep(prev => prev + 1);
    setExplanationText(`Переход из ${animationState.currentState} в ${nextState} по символу ${symbol}`);
    
    // Проверяем, завершилась ли обработка строки
    if (currentStep === inputString.length - 1) {
      setTimeout(() => {
        const isFinalAccepted = isAcceptState(nextState);
        setIsAccepted(isFinalAccepted);
        setExplanationText(`Строка ${isFinalAccepted ? 'принята' : 'отвергнута'}. Конечное состояние: ${nextState}`);
        setIsPlaying(false);
      }, 500);
    }
  };

  // Установка скорости воспроизведения
  const handleSpeedChange = (e) => {
    setSpeed(parseFloat(e.target.value));
  };

  // Управление воспроизведением
  const togglePlay = () => {
    if (currentStep >= inputString.length) {
      // Сброс и начало заново
      resetAutomaton();
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
    if (currentStep < inputString.length) {
      setIsPlaying(true);
      setIsPaused(true);
      processNextSymbol();
    }
  };

  // Переход на один шаг назад
  const stepBackward = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      
      // Восстанавливаем предыдущее состояние
      setAnimationState(prev => {
        const newHistory = prev.history.slice(0, -1);
        const lastState = newHistory.length > 0 
          ? newHistory[newHistory.length - 1].nextState 
          : 'q0';
        
        const previousProcessed = prev.processedInput.slice(0, -1);
        const symbol = prev.processedInput.slice(-1);
        
        return {
          currentState: lastState,
          processedInput: previousProcessed,
          remainingInput: symbol + prev.remainingInput,
          history: newHistory
        };
      });
      
      // Обновляем пояснительный текст
      if (currentStep === 1) {
        setExplanationText("Автомат в начальном состоянии q0");
      } else {
        const prevHistory = animationState.history[currentStep - 2];
        setExplanationText(`Переход из ${prevHistory.state} в ${prevHistory.nextState} по символу ${prevHistory.symbol}`);
      }
      
      setIsAccepted(null);
    }
  };

  // Обработка custom input
  const handleCustomInputChange = (e) => {
    setCustomInput(e.target.value);
  };

  const applyCustomInput = () => {
    if (customInput.trim() && /^[ab]+$/.test(customInput)) {
      setInputString(customInput);
      resetAutomaton(customInput);
    }
  };

  // Предопределенные строки
  const predefinedStrings = [
    { value: "abaab", label: "abaab (принимается)" },
    { value: "aba", label: "aba (не принимается)" },
    { value: "ababb", label: "ababb (не принимается)" },
    { value: "aabb", label: "aabb (принимается)" }
  ];

  return (
    <div className="flex flex-col">
      <div className="relative w-full h-[500px] mb-6 border rounded-lg bg-slate-900 border-slate-700">
        <Canvas shadows camera={{ position: [0, 0, 10], fov: 50 }}>
          <color attach="background" args={['#0F172A']} />

          <PresentationControls
            global
            rotation={[0, 0, 0]}
            polar={[-Math.PI / 4, Math.PI / 4]}
            azimuth={[-Math.PI / 4, Math.PI / 4]}
            config={{ mass: 2, tension: 400 }}
            snap={{ mass: 4, tension: 400 }}
            enabled={!isPlaying}
          >
            <ambientLight intensity={0.3} />
            <pointLight position={[10, 10, 10]} intensity={1} castShadow />
            <spotLight position={[-10, 10, 10]} angle={0.3} penumbra={1} intensity={1} castShadow />

            <Suspense fallback={null}>
              <AutomatonModel 
                animationState={animationState}
                inputString={inputString}
                currentStep={currentStep}
                isPlaying={isPlaying && !isPaused}
              />
              <Environment preset="city" />
            </Suspense>
          </PresentationControls>
        </Canvas>
        
        {/* Текущее состояние обработки показываем поверх канваса */}
        <div className="absolute left-0 right-0 px-4 py-2 text-center rounded-lg bottom-4">
          <div className="p-3 text-white bg-slate-800/90 rounded-lg backdrop-blur">
            <p className="mb-2 text-base">
              <span className="font-semibold">Текущее состояние:</span> {animationState.currentState}
              {" | "}
              <span className="font-semibold">Шаг:</span> {currentStep}/{inputString.length}
            </p>
            <div className="flex items-center justify-center gap-2 text-sm">
              <div className="px-3 py-1 bg-slate-700 rounded-lg">
                <span className="font-mono text-amber-400">{animationState.processedInput}</span>
                <span className="font-mono text-pink-500 animate-pulse">|</span>
                <span className="font-mono text-slate-400">{animationState.remainingInput}</span>
              </div>
              {isAccepted !== null && (
                <div className={`px-3 py-1 rounded-lg ${isAccepted ? 'bg-green-900/50 text-green-300' : 'bg-red-900/50 text-red-300'}`}>
                  {isAccepted ? 'Принято' : 'Отвергнуто'}
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
                placeholder="Введите строку из символов a и b"
                className="flex-grow px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
              />
              <button
                onClick={applyCustomInput}
                className="px-4 py-2 font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                disabled={!customInput.trim() || !/^[ab]+$/.test(customInput)}
              >
                Применить
              </button>
            </div>
            <p className="mt-1 text-xs text-slate-400">Можно использовать только символы "a" и "b"</p>
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
            disabled={currentStep === 0}
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
            {!isPaused ? 'Пауза' : currentStep >= inputString.length ? 'Начать заново' : 'Воспроизвести'}
          </button>
          
          <button 
            onClick={stepForward}
            disabled={currentStep >= inputString.length}
            className="px-4 py-2 font-medium text-white transition-colors bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:opacity-50"
          >
            Вперед →
          </button>
          
          <button 
            onClick={() => resetAutomaton()}
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
        <h3 className="mb-3 text-lg font-medium text-white">Описание автомата</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full mb-4 text-sm text-left text-gray-300">
            <thead className="uppercase bg-slate-900 text-gray-400">
              <tr>
                <th className="px-6 py-3">Состояние</th>
                <th className="px-6 py-3">Символ 'a'</th>
                <th className="px-6 py-3">Символ 'b'</th>
                <th className="px-6 py-3">Тип</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b bg-slate-700/20 border-slate-700">
                <td className="px-6 py-4 font-medium text-white">q0</td>
                <td className="px-6 py-4">q1</td>
                <td className="px-6 py-4">q3</td>
                <td className="px-6 py-4">Начальное</td>
              </tr>
              <tr className="border-b bg-slate-800/20 border-slate-700">
                <td className="px-6 py-4 font-medium text-white">q1</td>
                <td className="px-6 py-4">q1</td>
                <td className="px-6 py-4">q2</td>
                <td className="px-6 py-4">Промежуточное</td>
              </tr>
              <tr className="border-b bg-slate-700/20 border-slate-700">
                <td className="px-6 py-4 font-medium text-white">q2</td>
                <td className="px-6 py-4">q1</td>
                <td className="px-6 py-4">q3</td>
                <td className="px-6 py-4">Принимающее</td>
              </tr>
              <tr className="bg-slate-800/20">
                <td className="px-6 py-4 font-medium text-white">q3</td>
                <td className="px-6 py-4">q2</td>
                <td className="px-6 py-4">q0</td>
                <td className="px-6 py-4">Промежуточное</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <p className="text-slate-300">
          Этот DFA распознает язык строк над алфавитом {'{a, b}'}, которые содержат подстроку "ab" 
          и заканчиваются на "b". Другими словами, автомат принимает все строки, в которых 
          встречается последовательность "ab", после которой следует произвольное количество символов,
          заканчивающихся на "b".
        </p>
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

// Реализация алгоритма DFA
const CodeImplementation = () => {
  const dfaCode = `
class DFA {
  constructor(states, alphabet, transitions, startState, acceptStates) {
    this.states = states;          // Множество состояний
    this.alphabet = alphabet;      // Алфавит символов
    this.transitions = transitions; // Функция переходов
    this.startState = startState;  // Начальное состояние
    this.acceptStates = acceptStates; // Множество принимающих состояний
  }

  // Метод для проверки принимает ли автомат входную строку
  accepts(input) {
    let currentState = this.startState;

    // Обрабатываем каждый символ входной строки
    for (let i = 0; i < input.length; i++) {
      const symbol = input[i];

      // Проверяем, что символ есть в алфавите
      if (!this.alphabet.has(symbol)) {
        throw new Error(\`Символ \${symbol} не найден в алфавите\`);
      }

      // Переходим в следующее состояние
      currentState = this.transitions[currentState][symbol];
      
      // Если перехода нет, автомат отвергает строку
      if (currentState === undefined) {
        return false;
      }
    }

    // Строка принимается, если мы оказались в принимающем состоянии
    return this.acceptStates.has(currentState);
  }
  
  // Метод для визуализации обработки строки пошагово
  processStringStepByStep(input) {
    let currentState = this.startState;
    const steps = [{ state: currentState, remainingInput: input, processedInput: '' }];
    
    // Обрабатываем каждый символ входной строки
    for (let i = 0; i < input.length; i++) {
      const symbol = input[i];
      
      // Проверяем, что символ есть в алфавите
      if (!this.alphabet.has(symbol)) {
        steps.push({ 
          state: 'error', 
          remainingInput: input.substring(i + 1),
          processedInput: input.substring(0, i + 1),
          error: \`Символ \${symbol} не найден в алфавите\`
        });
        return steps;
      }
      
      // Переходим в следующее состояние
      const nextState = this.transitions[currentState][symbol];
      
      // Если перехода нет, автомат отвергает строку
      if (nextState === undefined) {
        steps.push({ 
          state: 'rejected', 
          remainingInput: input.substring(i + 1),
          processedInput: input.substring(0, i + 1),
          error: \`Нет перехода из состояния \${currentState} по символу \${symbol}\`
        });
        return steps;
      }
      
      currentState = nextState;
      
      // Добавляем текущий шаг в историю
      steps.push({ 
        state: currentState, 
        remainingInput: input.substring(i + 1),
        processedInput: input.substring(0, i + 1)
      });
    }
    
    // Проверяем, является ли конечное состояние принимающим
    const isAccepted = this.acceptStates.has(currentState);
    steps.push({ 
      state: isAccepted ? 'accepted' : 'rejected',
      remainingInput: '',
      processedInput: input,
      finalState: currentState
    });
    
    return steps;
  }
}

// Пример использования: Автомат, распознающий строки, содержащие подстроку "ab" 
// и заканчивающиеся на "b"
const createDFAForLanguage = () => {
  // Определение состояний и алфавита
  const states = ['q0', 'q1', 'q2', 'q3'];
  const alphabet = new Set(['a', 'b']);
  
  // Определение функции переходов
  const transitions = {
    'q0': { 'a': 'q1', 'b': 'q3' },
    'q1': { 'a': 'q1', 'b': 'q2' },
    'q2': { 'a': 'q1', 'b': 'q3' },
    'q3': { 'a': 'q2', 'b': 'q0' }
  };
  
  // Создание DFA
  return new DFA(
    states,
    alphabet,
    transitions,
    'q0',            // Начальное состояние
    new Set(['q2'])  // Принимающие состояния
  );
};

// Тестирование
const dfa = createDFAForLanguage();
console.log(dfa.accepts('ab'));     // true
console.log(dfa.accepts('abb'));    // false
console.log(dfa.accepts('abaab'));  // true
console.log(dfa.accepts('ba'));     // false

// Пошаговая обработка строки
const steps = dfa.processStringStepByStep('abaab');
steps.forEach((step, index) => {
  if (index === 0) {
    console.log(\`Начало: состояние \${step.state}, вход: \${step.remainingInput}\`);
  } else if (step.state === 'accepted') {
    console.log(\`Конец: строка принята, конечное состояние: \${step.finalState}\`);
  } else if (step.state === 'rejected') {
    console.log(\`Конец: строка отвергнута\${step.finalState ? \`, конечное состояние: \${step.finalState}\` : ''}\`);
  } else if (step.state === 'error') {
    console.log(\`Ошибка: \${step.error}\`);
  } else {
    const symbol = step.processedInput.slice(-1);
    console.log(\`Шаг \${index}: символ '\${symbol}', переход в состояние \${step.state}\`);
  }
});
`;

  return (
    <div className="p-4 overflow-auto font-mono text-sm text-gray-300 rounded-lg bg-slate-900" style={{ maxHeight: '600px' }}>
      <pre>{dfaCode}</pre>
    </div>
  );
};

// Объяснение работы DFA
const AlgorithmExplanation = () => {
  return (
    <div>
      <p className="mb-4">
        Детерминированный конечный автомат (DFA) — это математическая модель вычисления, используемая в теории
        автоматов и формальных языков. DFA является одним из простейших видов автоматов, но при этом чрезвычайно полезен
        для решения множества практических задач, связанных с распознаванием шаблонов и обработкой текста.
      </p>

      <h3 className="mt-6 mb-3 text-xl font-bold text-amber-400">Формальное определение DFA:</h3>
      <p className="mb-4">
        DFA можно представить как кортеж (Q, Σ, δ, q₀, F), где:
      </p>
      <ul className="pl-5 mb-6 space-y-2 list-disc">
        <li><strong>Q</strong> — конечное множество состояний</li>
        <li><strong>Σ</strong> — конечный алфавит (множество входных символов)</li>
        <li><strong>δ: Q × Σ → Q</strong> — функция перехода, определяющая следующее состояние для каждой пары (текущее состояние, входной символ)</li>
        <li><strong>q₀ ∈ Q</strong> — начальное состояние</li>
        <li><strong>F ⊆ Q</strong> — множество принимающих (или конечных) состояний</li>
      </ul>

      <h3 className="mt-6 mb-3 text-xl font-bold text-amber-400">Принцип работы:</h3>
      <ol className="pl-5 space-y-2 list-decimal">
        <li>
          <strong>Инициализация:</strong> Автомат начинает работу в начальном состоянии q₀.
        </li>
        <li>
          <strong>Обработка входа:</strong> Для каждого символа во входной строке, автомат переходит из текущего состояния
          в следующее согласно функции перехода δ.
        </li>
        <li>
          <strong>Решение о принятии:</strong> После обработки всей входной строки, если автомат находится в одном из принимающих
          состояний (F), то входная строка принимается, иначе — отвергается.
        </li>
      </ol>

      <h3 className="mt-6 mb-3 text-xl font-bold text-amber-400">Ключевые свойства DFA:</h3>
      <ul className="pl-5 space-y-2 list-disc">
        <li>
          <strong>Детерминизм:</strong> Для каждой пары (состояние, символ) существует ровно один переход, что делает
          процесс обработки входа полностью предсказуемым.
        </li>
        <li>
          <strong>Отсутствие ε-переходов:</strong> В отличие от NFA (недетерминированных автоматов), DFA не может совершать
          переходы без потребления входного символа.
        </li>
        <li>
          <strong>Эквивалентность регулярным выражениям:</strong> DFA эквивалентны регулярным выражениям по выразительной
          силе — оба формализма описывают класс регулярных языков.
        </li>
      </ul>

      <div className="p-4 mt-6 border rounded-lg bg-amber-900/20 border-amber-800/30">
        <h4 className="mb-2 font-bold text-amber-300">Важно понимать:</h4>
        <p className="text-amber-100">
          Для любого недетерминированного конечного автомата (NFA) можно построить эквивалентный DFA, но это может
          привести к экспоненциальному росту числа состояний. Этот процесс известен как детерминизация автомата.
        </p>
      </div>
    </div>
  );
};

// Практическое применение DFA
const ApplicationsSection = () => {
  return (
    <div>
      <p className="mb-4">
        Детерминированные конечные автоматы имеют широкий спектр практических применений в информатике и инженерии,
        благодаря своей простоте и эффективности.
      </p>

      <h3 className="mt-4 mb-2 text-xl font-bold text-amber-400">Области применения:</h3>
      <ul className="pl-5 space-y-2 list-disc">
        <li>
          <strong>Компиляторы и интерпретаторы:</strong> DFA используются в лексическом анализе для распознавания токенов, 
          таких как ключевые слова, идентификаторы и операторы.
        </li>
        <li>
          <strong>Регулярные выражения:</strong> Движки регулярных выражений обычно преобразуют шаблоны в DFA для
          эффективного сопоставления строк.
        </li>
        <li>
          <strong>Протоколы сетевого взаимодействия:</strong> Проверка корректности последовательностей сообщений в
          сетевых протоколах часто моделируется с помощью конечных автоматов.
        </li>
        <li>
          <strong>Валидация ввода:</strong> Проверка корректности форматов данных, таких как email-адреса, номера телефонов,
          даты и т.д.
        </li>
        <li>
          <strong>Обработка текста:</strong> Поиск подстрок, проверка синтаксиса и другие задачи обработки текста.
        </li>
        <li>
          <strong>Управление цифровыми системами:</strong> Моделирование и проектирование систем с конечным числом состояний,
          таких как светофоры, лифты, торговые автоматы.
        </li>
      </ul>

      <h3 className="mt-6 mb-2 text-xl font-bold text-amber-400">Конкретные примеры:</h3>
      <ul className="pl-5 space-y-2 list-disc">
        <li>
          <strong>Лексер в JavaScript:</strong> Инструменты вроде Babel используют DFA для токенизации JavaScript кода.
        </li>
        <li>
          <strong>Веб-фреймворки:</strong> Роутеры в веб-фреймворках часто используют конечные автоматы для сопоставления URL-шаблонов.
        </li>
        <li>
          <strong>Интерфейсы пользователя:</strong> Библиотеки управления состоянием (например, XState для React) реализуют
          конечные автоматы для управления сложной логикой UI.
        </li>
        <li>
          <strong>Валидаторы форм:</strong> Проверка вводимых пользователем данных в формах веб-приложений.
        </li>
      </ul>

      <div className="p-4 mt-6 border rounded-lg bg-blue-900/20 border-blue-800/30">
        <h4 className="mb-2 font-bold text-blue-300">Пример: DFA для проверки email-адресов</h4>
        <p className="text-blue-100 mb-2">
          Простой DFA может проверять базовую структуру email-адресов (username@domain.com):
        </p>
        <ul className="pl-5 text-blue-100 list-disc">
          <li>Состояние q₀: Начальное состояние, ожидаем первый символ username</li>
          <li>Состояние q₁: Обрабатываем username, ожидаем @ или продолжение username</li>
          <li>Состояние q₂: Обнаружен @, ожидаем первый символ domain</li>
          <li>Состояние q₃: Обрабатываем domain, ожидаем . или продолжение domain</li>
          <li>Состояние q₄: Обнаружена ., ожидаем первый символ TLD (com, org, etc.)</li>
          <li>Состояние q₅: Обрабатываем TLD (принимающее состояние)</li>
        </ul>
      </div>
    </div>
  );
};

const DFAPage = () => {
  // Получаем связанные алгоритмы
  const relatedAlgorithms = getRelatedAlgorithms('dfa', 'automata').map(algo => ({
    id: algo.id,
    name: algo.name,
    path: algo.path,
  }));

  return (
    <AlgorithmLayout
      title="Детерминированный конечный автомат (DFA)"
      description="Математическая модель вычисления с конечным числом состояний для распознавания регулярных языков"
      complexity={{
        time: 'O(n)',
        space: 'O(1)',
      }}
      category={{
        id: 'automata',
        name: 'Конечные автоматы',
        icon: 'ph:circuit-board-bold',
      }}
      relatedAlgorithms={relatedAlgorithms}
      visualization={<DFAVisualization />}
      implementation={<CodeImplementation />}
      explanation={<AlgorithmExplanation />}
      applications={<ApplicationsSection />}
    />
  );
};

export default DFAPage;
