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
const AutomatonModel = ({ animationState, inputString, currentStep, isPlaying, showEpsilonClosure }) => {
  const groupRef = useRef();
  
  // Описание состояний и переходов в NFA
  const states = [
    { id: 'q0', position: [-4, 1, 0], isStart: true, isAccept: false },
    { id: 'q1', position: [-1, 2, 0], isStart: false, isAccept: false },
    { id: 'q2', position: [2, 2, 0], isStart: false, isAccept: false },
    { id: 'q3', position: [4, 0, 0], isStart: false, isAccept: true },
    { id: 'q4', position: [2, -2, 0], isStart: false, isAccept: false },
    { id: 'q5', position: [-1, -2, 0], isStart: false, isAccept: false },
  ];

  // Переходы NFA, включая ε-переходы (обозначены как 'ε')
  const transitions = [
    { from: 'q0', to: 'q1', label: 'a' },
    { from: 'q0', to: 'q5', label: 'b' },
    { from: 'q1', to: 'q1', label: 'a' },
    { from: 'q1', to: 'q2', label: 'ε' },
    { from: 'q2', to: 'q3', label: 'b' },
    { from: 'q2', to: 'q4', label: 'a' },
    { from: 'q4', to: 'q5', label: 'a' },
    { from: 'q5', to: 'q0', label: 'ε' },
  ];
  
  // Ищем обратные переходы для корректной отрисовки
  const getReversed = (from, to) => {
    return transitions.some(t =>
      (t.from === to && t.to === from) &&
      transitions.findIndex(tr => tr.from === from && tr.to === to) <
      transitions.findIndex(tr => tr.from === to && t.to === from)
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

  // Выделяем активные ε-замыкания
  const getEpsilonTransitions = () => {
    if (!showEpsilonClosure || !animationState.epsilonClosures) return [];
    
    return transitions.filter(t => 
      t.label === 'ε' && 
      animationState.epsilonClosures.some(closure => 
        closure.includes(t.from) && closure.includes(t.to)
      )
    );
  };
  
  const epsilonTransitions = getEpsilonTransitions();

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
        const isActiveTransition = animationState.currentStates && 
                                   animationState.currentStates.includes(transition.from) && 
                                   (inputString[currentStep] === transition.label || transition.label === 'ε');
                                   
        // Проверяем, является ли этот переход ε-переходом в активном замыкании
        const isActiveEpsilonTransition = transition.label === 'ε' && 
                                         epsilonTransitions.some(t => 
                                           t.from === transition.from && t.to === transition.to
                                         );

        // Определяем цвет перехода
        let transitionColor = "#6366F1"; // Обычный цвет
        if (transition.label === 'ε') {
          transitionColor = "#94A3B8"; // Серый для ε-переходов
        }
        if (isActiveEpsilonTransition) {
          transitionColor = "#10B981"; // Зеленый для активных ε-переходов
        }
        if (isActiveTransition) {
          transitionColor = "#EC4899"; // Розовый для активных переходов
        }

        return (
          <group key={`transition-${index}`}>
            <Line
              points={points}
              color={transitionColor}
              lineWidth={isActiveTransition || isActiveEpsilonTransition ? 4 : 2}
              opacity={isActiveTransition || isActiveEpsilonTransition ? 0.8 : 0.6}
            />

            {/* Стрелка для указания направления */}
            {transition.from !== transition.to && (
              <mesh
                position={points[Math.floor(points.length * 0.8)]}
                lookAt={points[Math.floor(points.length * 0.81)]}
                scale={0.2}
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
              <div className={`flex items-center justify-center w-6 h-6 text-xs font-bold text-white rounded-full 
                ${isActiveTransition ? 'bg-pink-900/90 ring-2 ring-pink-500 ring-opacity-70' : 
                isActiveEpsilonTransition ? 'bg-emerald-900/90 ring-2 ring-emerald-500 ring-opacity-70' :
                transition.label === 'ε' ? 'bg-slate-700/90' : 'bg-indigo-900/90'}`}>
                {transition.label}
              </div>
            </Html>
          </group>
        );
      })}

      {/* Отрисовка состояний */}
      {states.map((state) => {
        // Проверяем, является ли это состояние текущим
        const isCurrentState = animationState.currentStates && 
                              animationState.currentStates.includes(state.id);
        
        // Проверяем, является ли это состояние частью ε-замыкания
        const isInEpsilonClosure = showEpsilonClosure && 
                                  animationState.epsilonClosures && 
                                  animationState.epsilonClosures.some(closure => 
                                    closure.includes(state.id)
                                  );
        
        // Определяем цвет состояния
        let stateColor = "#6366F1"; // Обычный цвет
        if (state.isAccept) {
          stateColor = "#F59E0B"; // Желтый для принимающих состояний
        }
        if (isInEpsilonClosure) {
          stateColor = "#10B981"; // Зеленый для состояний в ε-замыкании
        }
        if (isCurrentState) {
          stateColor = "#EC4899"; // Розовый для текущих состояний
        }
        
        return (
          <group key={state.id} position={state.position}>
            {/* Состояние */}
            <mesh castShadow>
              <sphereGeometry args={[0.7, 32, 32]} />
              <meshPhongMaterial
                color={stateColor}
                shininess={100}
                specular={new THREE.Color("#FFFFFF")}
                emissive={isCurrentState ? new THREE.Color(stateColor) : new THREE.Color("#000000")}
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
                ${isCurrentState ? "bg-gradient-to-br from-pink-600/40 to-pink-900/40 ring-2 ring-pink-500 ring-opacity-70" :
                isInEpsilonClosure ? "bg-gradient-to-br from-emerald-600/40 to-emerald-900/40 ring-2 ring-emerald-500 ring-opacity-70" :
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

// Компонент для визуализации недетерминированного конечного автомата
const NFAVisualization = () => {
  const [inputString, setInputString] = useState("aba");
  const [customInput, setCustomInput] = useState("");
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [isPaused, setIsPaused] = useState(true);
  const [isAccepted, setIsAccepted] = useState(null);
  const [showEpsilonClosure, setShowEpsilonClosure] = useState(true);
  const [animationState, setAnimationState] = useState({
    currentStates: ['q0'],
    processedInput: '',
    remainingInput: 'aba',
    epsilonClosures: [['q0']],
    history: []
  });
  const [explanationText, setExplanationText] = useState("NFA в начальном состоянии q0");

  // Функция для сброса анимации
  const resetAutomaton = (input = inputString) => {
    setCurrentStep(0);
    setIsPlaying(false);
    setIsPaused(true);
    setIsAccepted(null);
    
    // Находим ε-замыкание начального состояния
    const initialClosure = computeEpsilonClosure(['q0']);
    
    setAnimationState({
      currentStates: initialClosure,
      processedInput: '',
      remainingInput: input,
      epsilonClosures: [initialClosure],
      history: []
    });
    
    setExplanationText(`NFA в начальном состоянии: q0. ε-замыкание: {${initialClosure.join(', ')}}`);
  };

  // Эффект для автоматического обновления при изменении входной строки
  useEffect(() => {
    resetAutomaton(inputString);
  }, [inputString]);

  // Описание функции переходов NFA
  const transitions = {
    'q0': { 'a': ['q1'], 'b': ['q5'] },
    'q1': { 'a': ['q1'] },
    'q2': { 'a': ['q4'], 'b': ['q3'] },
    'q3': { },
    'q4': { 'a': ['q5'] },
    'q5': { }
  };
  
  // Описание ε-переходов NFA
  const epsilonTransitions = {
    'q0': [],
    'q1': ['q2'],
    'q2': [],
    'q3': [],
    'q4': [],
    'q5': ['q0']
  };

  // Функция для расчета ε-замыкания множества состояний
  const computeEpsilonClosure = (states) => {
    const visited = new Set(states);
    const stack = [...states];
    
    // Алгоритм обхода в глубину для нахождения всех достижимых состояний через ε-переходы
    while (stack.length > 0) {
      const currentState = stack.pop();
      const epsilonStates = epsilonTransitions[currentState] || [];
      
      for (const nextState of epsilonStates) {
        if (!visited.has(nextState)) {
          visited.add(nextState);
          stack.push(nextState);
        }
      }
    }
    
    return Array.from(visited).sort();
  };

  // Функция перехода для NFA
  const transition = (states, symbol) => {
    let nextStates = [];
    
    // Для каждого текущего состояния находим все возможные переходы по данному символу
    for (const state of states) {
      const stateTransitions = transitions[state][symbol] || [];
      nextStates = [...nextStates, ...stateTransitions];
    }
    
    // Удаляем дубликаты
    nextStates = [...new Set(nextStates)];
    
    // Вычисляем ε-замыкание полученных состояний
    const closure = computeEpsilonClosure(nextStates);
    
    return closure;
  };

  // Функция проверки принимающего состояния
  const isAcceptState = (states) => {
    // Проверяем, содержит ли множество текущих состояний хотя бы одно принимающее
    return states.includes('q3');
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
      const finalStates = animationState.currentStates;
      const isAccept = isAcceptState(finalStates);
      setIsAccepted(isAccept);
      setIsPlaying(false);
      setExplanationText(`Строка ${isAccept ? 'принята' : 'отвергнута'}. Конечные состояния: {${finalStates.join(', ')}}`);
      return;
    }
    
    const symbol = inputString[currentStep];
    const nextStates = transition(animationState.currentStates, symbol);
    
    if (nextStates.length === 0) {
      // Нет переходов для данного символа
      setIsAccepted(false);
      setIsPlaying(false);
      setExplanationText(`Строка отвергнута. Нет переходов из {${animationState.currentStates.join(', ')}} по символу ${symbol}`);
      return;
    }
    
    // Вычисляем ε-замыкание для новых состояний
    const epsilonClosure = computeEpsilonClosure(nextStates);
    
    // Обновляем состояние анимации
    setAnimationState(prev => {
      const newHistory = [...prev.history, { 
        states: prev.currentStates, 
        symbol, 
        nextStates: epsilonClosure 
      }];
      
      const newEpsilonClosures = [...prev.epsilonClosures, epsilonClosure];
      
      return {
        currentStates: epsilonClosure,
        processedInput: prev.processedInput + symbol,
        remainingInput: prev.remainingInput.substring(1),
        epsilonClosures: newEpsilonClosures,
        history: newHistory
      };
    });
    
    // Обновляем текущий шаг и пояснительный текст
    setCurrentStep(prev => prev + 1);
    setExplanationText(`Переход из {${animationState.currentStates.join(', ')}} в {${nextStates.join(', ')}} по символу ${symbol}.
     ε-замыкание: {${epsilonClosure.join(', ')}}`);
    
    // Проверяем, завершилась ли обработка строки
    if (currentStep === inputString.length - 1) {
      setTimeout(() => {
        const isFinalAccepted = isAcceptState(epsilonClosure);
        setIsAccepted(isFinalAccepted);
        setExplanationText(`Строка ${isFinalAccepted ? 'принята' : 'отвергнута'}. Конечные состояния: {${epsilonClosure.join(', ')}}`);
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
        const newEpsilonClosures = prev.epsilonClosures.slice(0, -1);
        
        const lastStates = newHistory.length > 0 
          ? newHistory[newHistory.length - 1].nextStates 
          : computeEpsilonClosure(['q0']);
        
        const previousProcessed = prev.processedInput.slice(0, -1);
        const symbol = prev.processedInput.slice(-1);
        
        return {
          currentStates: lastStates,
          processedInput: previousProcessed,
          remainingInput: symbol + prev.remainingInput,
          epsilonClosures: newEpsilonClosures,
          history: newHistory
        };
      });
      
      // Обновляем пояснительный текст
      if (currentStep === 1) {
        const initialClosure = computeEpsilonClosure(['q0']);
        setExplanationText(`NFA в начальном состоянии: q0. ε-замыкание: {${initialClosure.join(', ')}}`);
      } else {
        const prevHistory = animationState.history[currentStep - 2];
        setExplanationText(`Переход из {${prevHistory.states.join(', ')}} в {${prevHistory.nextStates.join(', ')}} по символу ${prevHistory.symbol}`);
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
    { value: "aba", label: "aba (принимается)" },
    { value: "aab", label: "aab (не принимается)" },
    { value: "aaba", label: "aaba (принимается)" },
    { value: "ababa", label: "ababa (принимается)" }
  ];

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
                showEpsilonClosure={showEpsilonClosure}
              />
              <Environment preset="city" />
            </Suspense>
          </PresentationControls>
        </Canvas>
        
        {/* Текущее состояние обработки показываем поверх канваса */}
        <div className="absolute left-0 right-0 px-4 py-2 text-center rounded-lg bottom-4">
          <div className="p-3 text-white bg-slate-800/90 rounded-lg backdrop-blur">
            <p className="mb-2 text-base">
              <span className="font-semibold">Текущие состояния:</span> {animationState.currentStates.join(', ')}
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

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="showEpsilonClosure"
              checked={showEpsilonClosure}
              onChange={() => setShowEpsilonClosure(!showEpsilonClosure)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="showEpsilonClosure" className="text-sm text-white">
              Показать ε-замыкания
            </label>
          </div>
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
        <h3 className="mb-3 text-lg font-medium text-white">Описание NFA</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full mb-4 text-sm text-left text-gray-300">
            <thead className="uppercase bg-slate-900 text-gray-400">
              <tr>
                <th className="px-6 py-3">Состояние</th>
                <th className="px-6 py-3">Символ 'a'</th>
                <th className="px-6 py-3">Символ 'b'</th>
                <th className="px-6 py-3">ε-переходы</th>
                <th className="px-6 py-3">Тип</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b bg-slate-700/20 border-slate-700">
                <td className="px-6 py-4 font-medium text-white">q0</td>
                <td className="px-6 py-4">q1</td>
                <td className="px-6 py-4">q5</td>
                <td className="px-6 py-4">-</td>
                <td className="px-6 py-4">Начальное</td>
              </tr>
              <tr className="border-b bg-slate-800/20 border-slate-700">
                <td className="px-6 py-4 font-medium text-white">q1</td>
                <td className="px-6 py-4">q1</td>
                <td className="px-6 py-4">-</td>
                <td className="px-6 py-4">q2</td>
                <td className="px-6 py-4">Промежуточное</td>
              </tr>
              <tr className="border-b bg-slate-700/20 border-slate-700">
                <td className="px-6 py-4 font-medium text-white">q2</td>
                <td className="px-6 py-4">q4</td>
                <td className="px-6 py-4">q3</td>
                <td className="px-6 py-4">-</td>
                <td className="px-6 py-4">Промежуточное</td>
              </tr>
              <tr className="border-b bg-slate-800/20 border-slate-700">
                <td className="px-6 py-4 font-medium text-white">q3</td>
                <td className="px-6 py-4">-</td>
                <td className="px-6 py-4">-</td>
                <td className="px-6 py-4">-</td>
                <td className="px-6 py-4">Принимающее</td>
              </tr>
              <tr className="border-b bg-slate-700/20 border-slate-700">
                <td className="px-6 py-4 font-medium text-white">q4</td>
                <td className="px-6 py-4">q5</td>
                <td className="px-6 py-4">-</td>
                <td className="px-6 py-4">-</td>
                <td className="px-6 py-4">Промежуточное</td>
              </tr>
              <tr className="bg-slate-800/20">
                <td className="px-6 py-4 font-medium text-white">q5</td>
                <td className="px-6 py-4">-</td>
                <td className="px-6 py-4">-</td>
                <td className="px-6 py-4">q0</td>
                <td className="px-6 py-4">Промежуточное</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <p className="text-slate-300">
          Этот NFA распознает язык строк над алфавитом {"{a, b}"}, которые содержат подстроку "aba". 
          Автомат использует недетерминизм и ε-переходы для отслеживания различных возможных путей 
          обработки входной строки. Ключевые особенности:
        </p>
        <ul className="mt-2 ml-5 space-y-1 text-slate-300 list-disc">
          <li>После символа 'a' в состоянии q1, есть ε-переход в q2, что позволяет проверить, следует ли 'ba'</li>
          <li>Из состояния q5 есть ε-переход обратно в q0, что позволяет "перезапустить" процесс поиска подстроки</li>
          <li>В любой момент NFA может находиться одновременно в нескольких состояниях</li>
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
          <span className="inline-flex items-center px-2 py-1 mr-2 text-xs text-pink-300 rounded-md bg-pink-900/30">
            <span className="inline-block w-2 h-2 mr-1 bg-pink-500 rounded-full"></span>
            Текущие состояния
          </span>
          <span className="inline-flex items-center px-2 py-1 text-xs text-green-300 rounded-md bg-green-900/30">
            <span className="inline-block w-2 h-2 mr-1 bg-green-500 rounded-full"></span>
            ε-замыкания
          </span>
        </p>
      </div>
    </div>
  );
};

// Реализация алгоритма NFA
const CodeImplementation = () => {
  const nfaCode = `
class NFA {
  constructor(states, alphabet, transitions, epsilonTransitions, startState, acceptStates) {
    this.states = states;               // Множество состояний
    this.alphabet = alphabet;           // Алфавит символов
    this.transitions = transitions;     // Функция переходов по символам
    this.epsilonTransitions = epsilonTransitions; // Функция ε-переходов
    this.startState = startState;       // Начальное состояние
    this.acceptStates = acceptStates;   // Множество принимающих состояний
  }
  
  // Вычисление ε-замыкания для множества состояний
  computeEpsilonClosure(states) {
    const visited = new Set(states);
    const stack = [...states];
    
    // DFS для нахождения всех достижимых состояний через ε-переходы
    while (stack.length > 0) {
      const currentState = stack.pop();
      const epsilonStates = this.epsilonTransitions[currentState] || [];
      
      for (const nextState of epsilonStates) {
        if (!visited.has(nextState)) {
          visited.add(nextState);
          stack.push(nextState);
        }
      }
    }
    
    return Array.from(visited);
  }
  
  // Функция перехода NFA по символу для множества состояний
  move(states, symbol) {
    let nextStates = [];
    
    // Для каждого состояния находим все возможные переходы по символу
    for (const state of states) {
      const stateTransitions = this.transitions[state][symbol] || [];
      nextStates = [...nextStates, ...stateTransitions];
    }
    
    // Удаляем дубликаты
    return [...new Set(nextStates)];
  }
  
  // Проверка принимает ли NFA строку
  accepts(input) {
    // Начинаем с ε-замыкания начального состояния
    let currentStates = this.computeEpsilonClosure([this.startState]);
    
    // Обрабатываем каждый символ входной строки
    for (let i = 0; i < input.length; i++) {
      const symbol = input[i];
      
      // Проверяем, что символ есть в алфавите
      if (!this.alphabet.has(symbol)) {
        throw new Error(\`Символ \${symbol} не найден в алфавите\`);
      }
      
      // Находим все состояния, достижимые по данному символу
      const nextStates = this.move(currentStates, symbol);
      
      // Вычисляем ε-замыкание для новых состояний
      currentStates = this.computeEpsilonClosure(nextStates);
      
      // Если нет переходов, NFA отвергает строку
      if (currentStates.length === 0) {
        return false;
      }
    }
    
    // Проверяем, есть ли среди текущих состояний хотя бы одно принимающее
    return currentStates.some(state => this.acceptStates.has(state));
  }
  
  // Пошаговая обработка строки с возвратом информации о каждом шаге
  processStringStepByStep(input) {
    // Начинаем с ε-замыкания начального состояния
    const initialClosure = this.computeEpsilonClosure([this.startState]);
    const steps = [{
      states: initialClosure,
      remainingInput: input,
      processedInput: '',
      epsilonClosure: initialClosure
    }];
    
    // Обрабатываем каждый символ входной строки
    let currentStates = initialClosure;
    
    for (let i = 0; i < input.length; i++) {
      const symbol = input[i];
      
      // Проверяем, что символ есть в алфавите
      if (!this.alphabet.has(symbol)) {
        steps.push({
          states: [],
          remainingInput: input.substring(i + 1),
          processedInput: input.substring(0, i + 1),
          error: \`Символ \${symbol} не найден в алфавите\`
        });
        return steps;
      }
      
      // Находим все состояния, достижимые по данному символу
      const nextStates = this.move(currentStates, symbol);
      
      // Вычисляем ε-замыкание для новых состояний
      const epsilonClosure = this.computeEpsilonClosure(nextStates);
      
      // Если нет переходов, NFA отвергает строку
      if (epsilonClosure.length === 0) {
        steps.push({
          states: [],
          remainingInput: input.substring(i + 1),
          processedInput: input.substring(0, i + 1),
          epsilonClosure: [],
          error: \`Нет переходов из состояний \${currentStates.join(', ')} по символу \${symbol}\`
        });
        return steps;
      }
      
      // Добавляем шаг в историю
      steps.push({
        states: nextStates,
        remainingInput: input.substring(i + 1),
        processedInput: input.substring(0, i + 1),
        epsilonClosure,
        symbol
      });
      
      currentStates = epsilonClosure;
    }
    
    // Проверяем, есть ли среди текущих состояний хотя бы одно принимающее
    const isAccepted = currentStates.some(state => this.acceptStates.has(state));
    
    steps.push({
      states: currentStates,
      remainingInput: '',
      processedInput: input,
      isAccepted,
      finalStates: currentStates
    });
    
    return steps;
  }
  
  // Преобразование NFA в эквивалентный DFA
  toDFA() {
    const dfaStates = [];
    const dfaTransitions = {};
    const dfaStartState = JSON.stringify(this.computeEpsilonClosure([this.startState]));
    const dfaAcceptStates = new Set();
    
    // Создаем очередь для обхода в ширину
    const queue = [this.computeEpsilonClosure([this.startState])];
    const visited = new Set([dfaStartState]);
    
    while (queue.length > 0) {
      const currentStates = queue.shift();
      const currentStateStr = JSON.stringify(currentStates);
      
      dfaStates.push(currentStateStr);
      dfaTransitions[currentStateStr] = {};
      
      // Проверяем, является ли текущее множество состояний принимающим
      if (currentStates.some(state => this.acceptStates.has(state))) {
        dfaAcceptStates.add(currentStateStr);
      }
      
      // Для каждого символа алфавита вычисляем новое состояние DFA
      for (const symbol of this.alphabet) {
        const nextStates = this.move(currentStates, symbol);
        const epsilonClosure = this.computeEpsilonClosure(nextStates);
        const nextStateStr = JSON.stringify(epsilonClosure);
        
        if (epsilonClosure.length > 0) {
          dfaTransitions[currentStateStr][symbol] = nextStateStr;
          
          // Добавляем новое состояние в очередь, если оно еще не было обработано
          if (!visited.has(nextStateStr)) {
            visited.add(nextStateStr);
            queue.push(epsilonClosure);
          }
        }
      }
    }
    
    // Создаем новый DFA
    return {
      states: dfaStates,
      alphabet: this.alphabet,
      transitions: dfaTransitions,
      startState: dfaStartState,
      acceptStates: dfaAcceptStates
    };
  }
}

// Пример использования: NFA, распознающий строки, содержащие подстроку "aba"
const createNFAForLanguage = () => {
  // Определение состояний и алфавита
  const states = ['q0', 'q1', 'q2', 'q3', 'q4', 'q5'];
  const alphabet = new Set(['a', 'b']);
  
  // Определение функции переходов
  const transitions = {
    'q0': { 'a': ['q1'], 'b': ['q5'] },
    'q1': { 'a': ['q1'] },
    'q2': { 'a': ['q4'], 'b': ['q3'] },
    'q3': { },
    'q4': { 'a': ['q5'] },
    'q5': { }
  };
  
  // Определение ε-переходов
  const epsilonTransitions = {
    'q0': [],
    'q1': ['q2'],
    'q2': [],
    'q3': [],
    'q4': [],
    'q5': ['q0']
  };
  
  // Создание NFA
  return new NFA(
    states,
    alphabet,
    transitions,
    epsilonTransitions,
    'q0',            // Начальное состояние
    new Set(['q3'])  // Принимающие состояния
  );
};

// Тестирование
const nfa = createNFAForLanguage();
console.log(nfa.accepts('aba'));    // true
console.log(nfa.accepts('aab'));    // false
console.log(nfa.accepts('aaba'));   // true
console.log(nfa.accepts('ababa'));  // true

// Пошаговая обработка строки "aba"
const steps = nfa.processStringStepByStep('aba');
steps.forEach((step, index) => {
  if (index === 0) {
    console.log(\`Начало: состояния {\${step.states.join(', ')}}, ε-замыкание: {\${step.epsilonClosure.join(', ')}}\`);
  } else if (step.error) {
    console.log(\`Ошибка: \${step.error}\`);
  } else if (step.isAccepted !== undefined) {
    console.log(\`Конец: строка \${step.isAccepted ? 'принята' : 'отвергнута'}, конечные состояния: {\${step.finalStates.join(', ')}}\`);
  } else {
    console.log(\`Шаг \${index}: символ '\${step.symbol}', переход в {\${step.states.join(', ')}}, ε-замыкание: {\${step.epsilonClosure.join(', ')}}\`);
  }
});
`;

  return (
    <div className="p-4 overflow-auto font-mono text-sm text-gray-300 rounded-lg bg-slate-900" style={{ maxHeight: '600px' }}>
      <pre>{nfaCode}</pre>
    </div>
  );
};

// Объяснение работы NFA
const AlgorithmExplanation = () => {
  return (
    <div>
      <p className="mb-4">
        Недетерминированный конечный автомат (NFA) — это математическая модель вычисления, расширяющая 
        концепцию детерминированного конечного автомата (DFA). В отличие от DFA, NFA может находиться 
        одновременно в нескольких состояниях и имеет более гибкие правила перехода между состояниями.
      </p>

      <h3 className="mt-6 mb-3 text-xl font-bold text-purple-400">Формальное определение NFA:</h3>
      <p className="mb-4">
        NFA можно представить как кортеж (Q, Σ, δ, q₀, F), где:
      </p>
      <ul className="pl-5 mb-6 space-y-2 list-disc">
        <li><strong>Q</strong> — конечное множество состояний</li>
        <li><strong>Σ</strong> — конечный алфавит (множество входных символов)</li>
        <li><strong>δ: Q × (Σ ∪ {ε}) → 2^Q</strong> — функция перехода, определяющая множество возможных 
          следующих состояний для каждой пары (текущее состояние, входной символ или ε)</li>
        <li><strong>q₀ ∈ Q</strong> — начальное состояние</li>
        <li><strong>F ⊆ Q</strong> — множество принимающих состояний</li>
      </ul>

      <h3 className="mt-6 mb-3 text-xl font-bold text-purple-400">Ключевые особенности NFA:</h3>
      <ul className="pl-5 space-y-2 list-disc">
        <li>
          <strong>Недетерминизм:</strong> Для пары (состояние, символ) может существовать несколько 
          возможных переходов или ни одного.
        </li>
        <li>
          <strong>ε-переходы:</strong> NFA может совершать переходы без потребления входного символа 
          (ε-переходы), что позволяет "бесплатно" переходить между состояниями.
        </li>
        <li>
          <strong>Множество текущих состояний:</strong> В процессе обработки входной строки NFA может 
          находиться одновременно в нескольких состояниях.
        </li>
        <li>
          <strong>Критерий принятия:</strong> Строка принимается, если хотя бы один путь обработки 
          приводит к принимающему состоянию.
        </li>
      </ul>

      <h3 className="mt-6 mb-3 text-xl font-bold text-purple-400">Принцип работы NFA:</h3>
      <ol className="pl-5 space-y-2 list-decimal">
        <li>
          <strong>Начальное состояние:</strong> NFA начинает работу с начального состояния q₀ и вычисляет 
          его ε-замыкание (все состояния, достижимые из q₀ через ε-переходы).
        </li>
        <li>
          <strong>Обработка символа:</strong> Для текущего множества состояний и входного символа, 
          NFA определяет все возможные переходы.
        </li>
        <li>
          <strong>ε-замыкание:</strong> После каждого перехода вычисляется ε-замыкание полученных состояний.
        </li>
        <li>
          <strong>Проверка принятия:</strong> После обработки всей строки, если хотя бы одно из 
          текущих состояний является принимающим, строка принимается.
        </li>
      </ol>

      <div className="p-4 mt-6 border rounded-lg bg-indigo-900/20 border-indigo-800/30">
        <h4 className="mb-2 font-bold text-indigo-300">Сравнение с DFA:</h4>
        <table className="w-full mt-2 text-sm text-left border-collapse text-indigo-200">
          <thead>
            <tr className="bg-indigo-800/30">
              <th className="p-2 border border-indigo-700">Характеристика</th>
              <th className="p-2 border border-indigo-700">DFA</th>
              <th className="p-2 border border-indigo-700">NFA</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2 border border-indigo-700">Количество переходов для пары (состояние, символ)</td>
              <td className="p-2 border border-indigo-700">Ровно один</td>
              <td className="p-2 border border-indigo-700">0, 1 или несколько</td>
            </tr>
            <tr>
              <td className="p-2 border border-indigo-700">ε-переходы</td>
              <td className="p-2 border border-indigo-700">Не допускаются</td>
              <td className="p-2 border border-indigo-700">Разрешены</td>
            </tr>
            <tr>
              <td className="p-2 border border-indigo-700">Одновременные состояния</td>
              <td className="p-2 border border-indigo-700">Только одно</td>
              <td className="p-2 border border-indigo-700">Множество</td>
            </tr>
            <tr>
              <td className="p-2 border border-indigo-700">Выразительная сила</td>
              <td className="p-2 border border-indigo-700">Регулярные языки</td>
              <td className="p-2 border border-indigo-700">Регулярные языки</td>
            </tr>
            <tr>
              <td className="p-2 border border-indigo-700">Компактность представления</td>
              <td className="p-2 border border-indigo-700">Может быть громоздким</td>
              <td className="p-2 border border-indigo-700">Обычно более компактное</td>
            </tr>
            <tr>
              <td className="p-2 border border-indigo-700">Реализация</td>
              <td className="p-2 border border-indigo-700">Прямая, эффективная</td>
              <td className="p-2 border border-indigo-700">Требует моделирования или конвертации в DFA</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="p-4 mt-6 border rounded-lg bg-purple-900/20 border-purple-800/30">
        <h4 className="mb-2 font-bold text-purple-300">Важно понимать:</h4>
        <p className="text-purple-100">
          NFA и DFA эквивалентны по выразительной силе — для любого NFA можно построить эквивалентный DFA. 
          Однако, полученный DFA может иметь экспоненциально больше состояний (до 2^n, где n — количество 
          состояний в исходном NFA). Это превращение происходит через алгоритм "subset construction", 
          который использует множества состояний NFA как отдельные состояния DFA.
        </p>
      </div>
    </div>
  );
};

// Практическое применение NFA
const ApplicationsSection = () => {
  return (
    <div>
      <p className="mb-4">
        Недетерминированные конечные автоматы имеют множество практических применений в информатике, 
        обработке текста и разработке программного обеспечения. Благодаря своей гибкости и компактности, 
        они часто используются как промежуточный этап при решении различных задач.
      </p>

      <h3 className="mt-4 mb-2 text-xl font-bold text-purple-400">Области применения:</h3>
      <ul className="pl-5 space-y-2 list-disc">
        <li>
          <strong>Регулярные выражения:</strong> NFA используются для представления регулярных выражений, 
          что позволяет эффективно моделировать сложные шаблоны поиска. Большинство движков регулярных 
          выражений внутренне преобразуют регулярное выражение в NFA, а затем в DFA для эффективного 
          выполнения.
        </li>
        <li>
          <strong>Компиляторы и интерпретаторы:</strong> В лексических анализаторах (лексерах) для 
          распознавания токенов, особенно для сложных шаблонов, которые легче представить через NFA.
        </li>
        <li>
          <strong>Анализ текста:</strong> Для сложного поиска по шаблону, проверки грамматик, 
          и обработки естественного языка.
        </li>
        <li>
          <strong>Протоколы и сетевое оборудование:</strong> Для моделирования и верификации 
          протоколов связи и работы сетевых экранов.
        </li>
        <li>
          <strong>Обработка XML и других форматов данных:</strong> Для валидации и разбора 
          структурированных данных.
        </li>
      </ul>

      <h3 className="mt-6 mb-2 text-xl font-bold text-purple-400">Преимущества использования NFA:</h3>
      <ul className="pl-5 space-y-2 list-disc">
        <li>
          <strong>Компактность:</strong> NFA обычно имеют меньше состояний и переходов, чем 
          эквивалентные DFA, что делает их более понятными и удобными для создания вручную.
        </li>
        <li>
          <strong>Удобство представления:</strong> Многие шаблоны и языки естественным образом 
          представляются через недетерминизм (например, "либо X, либо Y").
        </li>
        <li>
          <strong>Композиция:</strong> NFA легко комбинировать для создания более сложных автоматов, 
          что полезно при работе с составными шаблонами.
        </li>
        <li>
          <strong>Инкрементальная обработка:</strong> NFA позволяют строить автоматы постепенно, 
          добавляя новые состояния и переходы по мере необходимости.
        </li>
      </ul>

      <div className="p-4 mt-6 border rounded-lg bg-blue-900/20 border-blue-800/30">
        <h4 className="mb-2 font-bold text-blue-300">Пример: Регулярное выражение → NFA</h4>
        <p className="mb-2 text-blue-100">
          Регулярное выражение <code>(a|b)*aba</code> можно представить как NFA следующим образом:
        </p>
        <ul className="pl-5 mb-2 text-blue-100 list-disc">
          <li>
            Часть <code>(a|b)*</code> представляется как цикл, который может принимать любое 
            количество 'a' и 'b' (соответствует состояниям q0, q5 и ε-переходу из q5 в q0)
          </li>
          <li>
            Последовательность <code>aba</code> представляется линейной цепочкой состояний 
            (q1 → q2 → q4 → q3)
          </li>
          <li>
            ε-переход из q1 в q2 позволяет "проверить", начинается ли последовательность 'aba' 
            после того, как мы увидели 'a'
          </li>
        </ul>
        <p className="text-blue-100">
          Этот NFA компактно моделирует язык строк, содержащих подстроку 'aba', и демонстрирует 
          мощь недетерминизма и ε-переходов для выражения сложных шаблонов.
        </p>
      </div>
    </div>
  );
};

const NFAPage = () => {
  // Получаем связанные алгоритмы
  const relatedAlgorithms = getRelatedAlgorithms('dfa', 'automata').map(algo => ({
    id: algo.id,
    name: algo.name,
    path: algo.path,
  }));

  return (
    <AlgorithmLayout
      title="Недетерминированный конечный автомат (NFA)"
      description="Гибкая математическая модель вычисления с одновременными состояниями и ε-переходами"
      complexity={{
        time: 'O(2^n × m)',
        space: 'O(2^n)',
      }}
      category={{
        id: 'automata',
        name: 'Конечные автоматы',
        icon: 'ph:circuit-board-bold',
      }}
      relatedAlgorithms={relatedAlgorithms}
      visualization={<NFAVisualization />}
      implementation={<CodeImplementation />}
      explanation={<AlgorithmExplanation />}
      applications={<ApplicationsSection />}
    />
  );
};

export default NFAPage;
