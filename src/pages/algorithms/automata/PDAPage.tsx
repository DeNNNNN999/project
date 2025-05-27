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

// Компонент для визуализации стека (магазинной памяти)
const Stack = ({ stackItems, position, scale = 1 }) => {
  const stackHeight = Math.max(1, stackItems.length); // Минимальная высота 1 для пустого стека
  
  return (
    <group position={position}>
      {/* Основание стека */}
      <mesh position={[0, -0.4 * scale, 0]}>
        <boxGeometry args={[3 * scale, 0.2 * scale, 1 * scale]} />
        <meshStandardMaterial color="#475569" />
      </mesh>
      
      {/* Элементы стека */}
      {stackItems.map((item, index) => (
        <group key={index} position={[0, (index * 0.6 + 0.1) * scale, 0]}>
          {/* Фон элемента */}
          <mesh>
            <boxGeometry args={[2.8 * scale, 0.5 * scale, 0.8 * scale]} />
            <meshStandardMaterial 
              color={index === stackItems.length - 1 ? "#3B82F6" : "#64748B"} 
              metalness={0.3} 
              roughness={0.4}
              emissive={index === stackItems.length - 1 ? new THREE.Color("#3B82F6") : new THREE.Color("#000000")}
              emissiveIntensity={index === stackItems.length - 1 ? 0.3 : 0}
            />
          </mesh>
          
          {/* Текст элемента */}
          <Html position={[0, 0, 0.5]} center>
            <div className="flex items-center justify-center w-8 h-6 text-sm font-bold text-white">
              {item}
            </div>
          </Html>
        </group>
      ))}
      
      {/* Метка стека */}
      <Html position={[0, -1 * scale, 0]} center>
        <div className="text-base font-medium text-slate-300">Стек</div>
      </Html>
    </group>
  );
};

// Компонент для анимированной ленты входных символов
const InputTape = ({ inputString, currentPosition, position, scale = 1 }) => {
  return (
    <group position={position}>
      {/* Ячейки ленты */}
      {inputString.split('').map((char, index) => (
        <group key={index} position={[(index - currentPosition) * 1.2 * scale, 0, 0]}>
          {/* Фон ячейки */}
          <mesh>
            <boxGeometry args={[1 * scale, 1 * scale, 0.2 * scale]} />
            <meshStandardMaterial 
              color={index === currentPosition ? "#EC4899" : "#1E293B"} 
              metalness={0.3} 
              roughness={0.4}
              emissive={index === currentPosition ? new THREE.Color("#EC4899") : new THREE.Color("#000000")}
              emissiveIntensity={index === currentPosition ? 0.3 : 0}
            />
          </mesh>
          
          {/* Символ */}
          <Html position={[0, 0, 0.2]} center>
            <div className={`flex items-center justify-center w-6 h-6 text-lg font-bold ${
              index === currentPosition ? 'text-white' : 'text-slate-300'
            }`}>
              {char}
            </div>
          </Html>
        </group>
      ))}
      
      {/* Метка входной ленты */}
      <Html position={[0, -1.2 * scale, 0]} center>
        <div className="text-base font-medium text-slate-300">Вход</div>
      </Html>
      
      {/* Маркер текущей позиции */}
      <mesh position={[0, -0.8 * scale, 0]}>
        <coneGeometry args={[0.3 * scale, 0.6 * scale, 3]} rotation={[Math.PI, 0, 0]} />
        <meshStandardMaterial color="#EC4899" />
      </mesh>
    </group>
  );
};

// Компонент для отрисовки автомата внутри Canvas
const AutomatonModel = ({ animationState, inputString, currentStep, isPlaying }) => {
  const groupRef = useRef();
  
  // Описание состояний и переходов PDA
  const states = [
    { id: 'q0', position: [-3, 0, 0], isStart: true, isAccept: false },
    { id: 'q1', position: [0, 2, 0], isStart: false, isAccept: false },
    { id: 'q2', position: [3, 0, 0], isStart: false, isAccept: true },
    { id: 'q3', position: [0, -2, 0], isStart: false, isAccept: false },
  ];

  // Переходы в формате {from, to, inputSymbol, stackRead, stackPush}
  // stackRead - что читаем со стека, stackPush - что пишем на стек (в виде массива, может быть пусто)
  const transitions = [
    { from: 'q0', to: 'q0', inputSymbol: 'a', stackRead: 'Z', stackPush: ['A', 'Z'] },
    { from: 'q0', to: 'q0', inputSymbol: 'a', stackRead: 'A', stackPush: ['A', 'A'] },
    { from: 'q0', to: 'q1', inputSymbol: 'b', stackRead: 'A', stackPush: [] },
    { from: 'q1', to: 'q1', inputSymbol: 'b', stackRead: 'A', stackPush: [] },
    { from: 'q1', to: 'q2', inputSymbol: 'ε', stackRead: 'Z', stackPush: ['Z'] },
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

  // Форматирование лейбла перехода: input, pop→push
  const formatTransitionLabel = (transition) => {
    const input = transition.inputSymbol === 'ε' ? 'ε' : transition.inputSymbol;
    const pop = transition.stackRead;
    const push = transition.stackPush.length > 0 ? transition.stackPush.join('') : 'ε';
    
    return `${input},${pop}→${push}`;
  };

  return (
    <group ref={groupRef}>
      {/* Визуализация стека */}
      <Stack 
        stackItems={animationState.stack || ['Z']} 
        position={[-6, 0, 0]} 
        scale={0.8} 
      />
      
      {/* Визуализация входной ленты */}
      <InputTape 
        inputString={inputString} 
        currentPosition={currentStep} 
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
          (
            (inputString[currentStep] === transition.inputSymbol || transition.inputSymbol === 'ε') &&
            (animationState.stack[animationState.stack.length - 1] === transition.stackRead)
          );

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

// Компонент для визуализации автомата с магазинной памятью
const PDAVisualization = () => {
  const [inputString, setInputString] = useState("aabb");
  const [customInput, setCustomInput] = useState("");
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [isPaused, setIsPaused] = useState(true);
  const [isAccepted, setIsAccepted] = useState(null);
  const [animationState, setAnimationState] = useState({
    currentState: 'q0',
    processedInput: '',
    remainingInput: 'aabb',
    stack: ['Z'],
    history: []
  });
  const [explanationText, setExplanationText] = useState("PDA в начальном состоянии q0. Дно стека: Z");

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
      stack: ['Z'],
      history: []
    });
    setExplanationText("PDA в начальном состоянии q0. Дно стека: Z");
  };

  // Эффект для автоматического обновления при изменении входной строки
  useEffect(() => {
    resetAutomaton(inputString);
  }, [inputString]);

  // Функция перехода для PDA
  const transition = (state, symbol, stack) => {
    // Если стек пуст, нет переходов
    if (stack.length === 0) return null;
    
    const topStack = stack[stack.length - 1];
    
    // Определение переходов PDA
    const transitions = {
      'q0': {
        'a': {
          'Z': { nextState: 'q0', push: ['A', 'Z'] },
          'A': { nextState: 'q0', push: ['A', 'A'] }
        },
        'b': {
          'A': { nextState: 'q1', push: [] } // Pop A
        }
      },
      'q1': {
        'b': {
          'A': { nextState: 'q1', push: [] } // Pop A
        },
        'ε': {
          'Z': { nextState: 'q2', push: ['Z'] } // Сохраняем Z на стеке
        }
      },
      'q2': {}, // Нет переходов из принимающего состояния
      'q3': {}
    };
    
    // Проверка символа и верхнего элемента стека
    if (transitions[state]?.[symbol]?.[topStack]) {
      return transitions[state][symbol][topStack];
    }
    
    // Проверка ε-переходов
    if (transitions[state]?.['ε']?.[topStack]) {
      return transitions[state]['ε'][topStack];
    }
    
    return null;
  };

  // Функция проверки принимающего состояния
  const isAcceptState = (state) => {
    return state === 'q2';
  };

  // Эффект для анимации шагов автомата
  useEffect(() => {
    if (isPlaying && !isPaused && (currentStep < inputString.length || animationState.currentState === 'q1')) {
      const timer = setTimeout(() => {
        processNextStep();
      }, 1000 / speed);
      
      return () => clearTimeout(timer);
    }
  }, [isPlaying, isPaused, currentStep, inputString, speed, animationState]);

  // Обработка следующего шага (символа или ε-перехода)
  const processNextStep = () => {
    // Попробуем сначала ε-переход
    const epsilonResult = transition(animationState.currentState, 'ε', animationState.stack);
    
    if (epsilonResult) {
      // Выполняем ε-переход
      executeTransition('ε', epsilonResult);
      return;
    }
    
    // Если нет ε-перехода и входная строка закончилась
    if (currentStep >= inputString.length) {
      // Конец строки
      const finalState = animationState.currentState;
      const isAccept = isAcceptState(finalState);
      setIsAccepted(isAccept);
      setIsPlaying(false);
      setExplanationText(`Строка ${isAccept ? 'принята' : 'отвергнута'}. Конечное состояние: ${finalState}`);
      return;
    }
    
    const symbol = inputString[currentStep];
    const result = transition(animationState.currentState, symbol, animationState.stack);
    
    if (!result) {
      // Нет перехода для данного символа
      setIsAccepted(false);
      setIsPlaying(false);
      setExplanationText(`Строка отвергнута. Нет перехода из ${animationState.currentState} по символу ${symbol} с верхним символом стека ${animationState.stack[animationState.stack.length - 1]}`);
      return;
    }
    
    // Выполняем переход с текущим символом
    executeTransition(symbol, result);
    
    // Увеличиваем счетчик текущего символа
    setCurrentStep(prev => prev + 1);
  };
  
  // Выполнение перехода (изменение состояния и стека)
  const executeTransition = (symbol, transitionResult) => {
    // Обновляем состояние анимации
    setAnimationState(prev => {
      // Создаем копию стека
      const newStack = [...prev.stack];
      
      // Удаляем верхний элемент стека (pop)
      newStack.pop();
      
      // Добавляем новые элементы на стек (push)
      newStack.push(...transitionResult.push.reverse());
      
      // Обновляем историю
      const newHistory = [...prev.history, { 
        state: prev.currentState, 
        symbol, 
        stackBefore: [...prev.stack],
        stackAfter: newStack,
        nextState: transitionResult.nextState
      }];
      
      // Обновляем обработанную и оставшуюся части входной строки
      let newProcessed = prev.processedInput;
      let newRemaining = prev.remainingInput;
      
      if (symbol !== 'ε') {
        newProcessed = prev.processedInput + symbol;
        newRemaining = prev.remainingInput.substring(1);
      }
      
      return {
        currentState: transitionResult.nextState,
        processedInput: newProcessed,
        remainingInput: newRemaining,
        stack: newStack,
        history: newHistory
      };
    });
    
    // Обновляем пояснительный текст
    if (symbol === 'ε') {
      setExplanationText(`ε-переход из ${animationState.currentState} в ${transitionResult.nextState}. Верхний элемент стека: ${animationState.stack[animationState.stack.length - 1]}`);
    } else {
      setExplanationText(`Переход из ${animationState.currentState} в ${transitionResult.nextState} по символу ${symbol}. Верхний элемент стека: ${animationState.stack[animationState.stack.length - 1]}`);
    }
    
    // Проверяем, завершилась ли обработка строки
    if (symbol !== 'ε' && currentStep === inputString.length - 1) {
      setTimeout(() => {
        const isFinalAccepted = isAcceptState(transitionResult.nextState);
        if (isFinalAccepted) {
          setIsAccepted(true);
          setExplanationText(`Строка принята. Конечное состояние: ${transitionResult.nextState}`);
          setIsPlaying(false);
        }
      }, 500);
    }
  };

  // Установка скорости воспроизведения
  const handleSpeedChange = (e) => {
    setSpeed(parseFloat(e.target.value));
  };

  // Управление воспроизведением
  const togglePlay = () => {
    if (currentStep >= inputString.length && !animationState.currentState === 'q1') {
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
    if (currentStep < inputString.length || animationState.currentState === 'q1') {
      setIsPlaying(true);
      setIsPaused(true);
      processNextStep();
    }
  };

  // Переход на один шаг назад
  const stepBackward = () => {
    if (animationState.history.length > 0) {
      // Восстанавливаем предыдущее состояние
      setAnimationState(prev => {
        const lastHistoryItem = prev.history[prev.history.length - 1];
        const newHistory = prev.history.slice(0, -1);
        
        let newProcessed = prev.processedInput;
        let newRemaining = prev.remainingInput;
        
        // Если это был не ε-переход
        if (lastHistoryItem.symbol !== 'ε') {
          // Изменяем счетчик текущего символа
          setCurrentStep(currentStepValue => Math.max(0, currentStepValue - 1));
          
          // Обновляем обработанную и оставшуюся части входной строки
          newProcessed = newProcessed.slice(0, -1);
          newRemaining = lastHistoryItem.symbol + newRemaining;
        }
        
        return {
          currentState: lastHistoryItem.state,
          processedInput: newProcessed,
          remainingInput: newRemaining,
          stack: lastHistoryItem.stackBefore,
          history: newHistory
        };
      });
      
      // Обновляем пояснительный текст
      if (animationState.history.length === 1) {
        setExplanationText("PDA в начальном состоянии q0. Дно стека: Z");
      } else {
        const prevHistoryItem = animationState.history[animationState.history.length - 2];
        setExplanationText(`Переход из ${prevHistoryItem.state} в ${prevHistoryItem.nextState} по символу ${prevHistoryItem.symbol}`);
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
    { value: "aabb", label: "aabb (принимается)" },
    { value: "ab", label: "ab (принимается)" },
    { value: "aaabbb", label: "aaabbb (принимается)" },
    { value: "aab", label: "aab (не принимается)" },
    { value: "abb", label: "abb (не принимается)" },
    { value: "aba", label: "aba (не принимается)" }
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
              <span className="font-semibold">Стек:</span> {animationState.stack.join('')}
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
            {!isPaused ? 'Пауза' : isAccepted !== null ? 'Начать заново' : 'Воспроизвести'}
          </button>
          
          <button 
            onClick={stepForward}
            disabled={isAccepted !== null}
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
        <h3 className="mb-3 text-lg font-medium text-white">Описание автомата с магазинной памятью</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full mb-4 text-sm text-left text-gray-300">
            <thead className="uppercase bg-slate-900 text-gray-400">
              <tr>
                <th className="px-6 py-3">Состояние</th>
                <th className="px-6 py-3">Вход</th>
                <th className="px-6 py-3">Стек (читаем)</th>
                <th className="px-6 py-3">Стек (пишем)</th>
                <th className="px-6 py-3">Следующее состояние</th>
                <th className="px-6 py-3">Тип</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b bg-slate-700/20 border-slate-700">
                <td className="px-6 py-4 font-medium text-white">q0</td>
                <td className="px-6 py-4">a</td>
                <td className="px-6 py-4">Z</td>
                <td className="px-6 py-4">AZ</td>
                <td className="px-6 py-4">q0</td>
                <td className="px-6 py-4">Начальное</td>
              </tr>
              <tr className="border-b bg-slate-800/20 border-slate-700">
                <td className="px-6 py-4 font-medium text-white">q0</td>
                <td className="px-6 py-4">a</td>
                <td className="px-6 py-4">A</td>
                <td className="px-6 py-4">AA</td>
                <td className="px-6 py-4">q0</td>
                <td className="px-6 py-4">Начальное</td>
              </tr>
              <tr className="border-b bg-slate-700/20 border-slate-700">
                <td className="px-6 py-4 font-medium text-white">q0</td>
                <td className="px-6 py-4">b</td>
                <td className="px-6 py-4">A</td>
                <td className="px-6 py-4">ε (pop)</td>
                <td className="px-6 py-4">q1</td>
                <td className="px-6 py-4">Начальное</td>
              </tr>
              <tr className="border-b bg-slate-800/20 border-slate-700">
                <td className="px-6 py-4 font-medium text-white">q1</td>
                <td className="px-6 py-4">b</td>
                <td className="px-6 py-4">A</td>
                <td className="px-6 py-4">ε (pop)</td>
                <td className="px-6 py-4">q1</td>
                <td className="px-6 py-4">Промежуточное</td>
              </tr>
              <tr className="border-b bg-slate-700/20 border-slate-700">
                <td className="px-6 py-4 font-medium text-white">q1</td>
                <td className="px-6 py-4">ε</td>
                <td className="px-6 py-4">Z</td>
                <td className="px-6 py-4">Z</td>
                <td className="px-6 py-4">q2</td>
                <td className="px-6 py-4">Промежуточное</td>
              </tr>
              <tr className="bg-slate-800/20">
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
          Этот PDA (Push-down Automaton, автомат с магазинной памятью) распознает язык 
          <span className="mx-1 font-mono text-blue-300">a<sup>n</sup>b<sup>n</sup></span>, 
          где <span className="font-mono text-blue-300">n ≥ 1</span>. Принцип работы:
        </p>
        <ul className="mt-2 ml-5 space-y-1 text-slate-300 list-disc">
          <li>При чтении символа 'a', автомат добавляет 'A' на вершину стека (считает количество 'a')</li>
          <li>При чтении символа 'b', автомат удаляет 'A' с вершины стека (сверяет с количеством 'a')</li>
          <li>Когда все символы 'a' и 'b' прочитаны и на вершине стека остается 'Z' (дно стека), 
              автомат переходит в принимающее состояние q2 через ε-переход</li>
          <li>Строка принимается только если количество 'a' точно равно количеству 'b', иначе автомат 
              будет в состоянии q1 с неправильным содержимым стека или не сможет выполнить переход</li>
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

// Реализация алгоритма PDA
const CodeImplementation = () => {
  const pdaCode = `
class PDA {
  constructor(states, inputAlphabet, stackAlphabet, transitions, startState, initialStackSymbol, acceptStates) {
    this.states = states;                     // Множество состояний
    this.inputAlphabet = inputAlphabet;       // Алфавит входных символов
    this.stackAlphabet = stackAlphabet;       // Алфавит символов стека
    this.transitions = transitions;           // Функция переходов
    this.startState = startState;             // Начальное состояние
    this.initialStackSymbol = initialStackSymbol; // Начальный символ стека
    this.acceptStates = acceptStates;         // Множество принимающих состояний
  }
  
  // Проверка принимает ли PDA строку
  accepts(input) {
    // Начальная конфигурация (состояние, индекс непрочитанного символа, стек)
    const initialConfig = {
      state: this.startState,
      index: 0,
      stack: [this.initialStackSymbol]
    };
    
    // Множество непроверенных конфигураций
    const queue = [initialConfig];
    
    // Множество посещенных конфигураций (для избежания зацикливания)
    const visited = new Set();
    
    // Пока есть непроверенные конфигурации
    while (queue.length > 0) {
      const { state, index, stack } = queue.shift();
      
      // Если конфигурация уже была проверена, пропускаем
      const configKey = \`\${state}|\${index}|\${stack.join('')}\`;
      if (visited.has(configKey)) continue;
      visited.add(configKey);
      
      // Если достигли конца входной строки и находимся в принимающем состоянии - строка принята
      if (index === input.length && this.acceptStates.has(state)) {
        return true;
      }
      
      // Получаем текущий символ или ε, если конец строки
      const symbol = index < input.length ? input[index] : null;
      
      // Проверяем возможные переходы
      // 1. Переходы по текущему символу
      if (symbol !== null) {
        this.addNextConfigurations(queue, state, symbol, index + 1, stack);
      }
      
      // 2. ε-переходы (без потребления входного символа)
      this.addNextConfigurations(queue, state, 'ε', index, stack);
    }
    
    // Все возможные конфигурации проверены, строка не принята
    return false;
  }
  
  // Добавляет новые конфигурации в очередь на основе текущего состояния и символа
  addNextConfigurations(queue, currentState, symbol, nextIndex, currentStack) {
    // Если стек пуст, нет переходов
    if (currentStack.length === 0) return;
    
    // Текущий верхний символ стека
    const topStack = currentStack[currentStack.length - 1];
    
    // Находим все возможные переходы
    const possibleTransitions = this.getTransitions(currentState, symbol, topStack);
    
    // Для каждого возможного перехода
    for (const { nextState, push } of possibleTransitions) {
      // Создаем новый стек (удаляем верхний символ и добавляем новые)
      const newStack = [...currentStack.slice(0, -1), ...push.reverse()];
      
      // Добавляем новую конфигурацию в очередь
      queue.push({
        state: nextState,
        index: nextIndex,
        stack: newStack
      });
    }
  }
  
  // Получает все возможные переходы из текущего состояния по символу и верхнему символу стека
  getTransitions(state, symbol, stackTop) {
    const result = [];
    
    // Проверяем переходы в функции переходов
    if (this.transitions[state]?.[symbol]?.[stackTop]) {
      const transitions = this.transitions[state][symbol][stackTop];
      for (const { nextState, push } of transitions) {
        result.push({ nextState, push });
      }
    }
    
    return result;
  }
  
  // Пошаговая обработка строки
  processStringStepByStep(input) {
    // Начальная конфигурация
    const steps = [{
      state: this.startState,
      index: 0,
      processedInput: '',
      remainingInput: input,
      stack: [this.initialStackSymbol],
      action: 'start'
    }];
    
    // Текущая конфигурация
    let currentState = this.startState;
    let currentIndex = 0;
    let currentStack = [this.initialStackSymbol];
    
    // Отслеживаем, использовали ли мы ε-переход
    let usedEpsilonTransition = false;
    
    // Пока не достигли конца строки или не было отвержения
    do {
      usedEpsilonTransition = false;
      
      // Пробуем сначала ε-переходы
      const epsilonTransitions = this.getTransitions(currentState, 'ε', 
        currentStack.length > 0 ? currentStack[currentStack.length - 1] : null);
      
      if (epsilonTransitions.length > 0) {
        // Берем первый возможный ε-переход
        const { nextState, push } = epsilonTransitions[0];
        
        // Обновляем стек
        const newStack = [...currentStack.slice(0, -1), ...push.reverse()];
        
        // Добавляем шаг
        steps.push({
          state: currentState,
          nextState,
          index: currentIndex,
          processedInput: input.substring(0, currentIndex),
          remainingInput: input.substring(currentIndex),
          symbol: 'ε',
          stackBefore: [...currentStack],
          stackAfter: newStack,
          stack: newStack,
          action: 'epsilon-transition'
        });
        
        // Обновляем текущее состояние
        currentState = nextState;
        currentStack = newStack;
        usedEpsilonTransition = true;
        continue;
      }
      
      // Если достигли конца входной строки
      if (currentIndex >= input.length) {
        // Проверяем, находимся ли в принимающем состоянии
        const isAccepted = this.acceptStates.has(currentState);
        
        steps.push({
          state: currentState,
          index: currentIndex,
          processedInput: input,
          remainingInput: '',
          stack: currentStack,
          action: isAccepted ? 'accept' : 'reject',
          isAccepted
        });
        
        break;
      }
      
      // Текущий символ входной строки
      const symbol = input[currentIndex];
      
      // Проверяем, есть ли переход для текущего символа
      const transitions = this.getTransitions(currentState, symbol, 
        currentStack.length > 0 ? currentStack[currentStack.length - 1] : null);
      
      if (transitions.length === 0) {
        // Нет перехода, отвергаем строку
        steps.push({
          state: currentState,
          index: currentIndex,
          processedInput: input.substring(0, currentIndex),
          remainingInput: input.substring(currentIndex),
          stack: currentStack,
          action: 'reject',
          reason: \`Нет перехода из состояния \${currentState} по символу \${symbol} с верхним символом стека \${
            currentStack.length > 0 ? currentStack[currentStack.length - 1] : 'пусто'
          }\`
        });
        
        break;
      }
      
      // Берем первый возможный переход
      const { nextState, push } = transitions[0];
      
      // Обновляем стек
      const newStack = [...currentStack.slice(0, -1), ...push.reverse()];
      
      // Добавляем шаг
      steps.push({
        state: currentState,
        nextState,
        index: currentIndex,
        processedInput: input.substring(0, currentIndex),
        remainingInput: input.substring(currentIndex),
        symbol,
        stackBefore: [...currentStack],
        stackAfter: newStack,
        stack: newStack,
        action: 'transition'
      });
      
      // Обновляем текущее состояние и переходим к следующему символу
      currentState = nextState;
      currentIndex++;
      currentStack = newStack;
      
    } while (currentIndex <= input.length || usedEpsilonTransition);
    
    return steps;
  }
}

// Пример использования: PDA для языка a^n b^n, где n ≥ 1
const createPDAForAnBn = () => {
  // Определение состояний, алфавитов
  const states = ['q0', 'q1', 'q2', 'q3'];
  const inputAlphabet = new Set(['a', 'b']);
  const stackAlphabet = new Set(['Z', 'A']);
  
  // Определение функции переходов
  // transitions[state][symbol][stackTop] = [{ nextState, push }]
  const transitions = {
    'q0': {
      'a': {
        'Z': [{ nextState: 'q0', push: ['A', 'Z'] }],
        'A': [{ nextState: 'q0', push: ['A', 'A'] }]
      },
      'b': {
        'A': [{ nextState: 'q1', push: [] }] // Pop A
      }
    },
    'q1': {
      'b': {
        'A': [{ nextState: 'q1', push: [] }] // Pop A
      },
      'ε': {
        'Z': [{ nextState: 'q2', push: ['Z'] }]
      }
    },
    'q2': {}
  };
  
  // Создание PDA
  return new PDA(
    new Set(states),
    inputAlphabet,
    stackAlphabet,
    transitions,
    'q0',            // Начальное состояние
    'Z',             // Начальный символ стека
    new Set(['q2'])  // Принимающие состояния
  );
};

// Тестирование
const pda = createPDAForAnBn();
console.log('ab:', pda.accepts('ab'));       // true
console.log('aabb:', pda.accepts('aabb'));   // true
console.log('aaabbb:', pda.accepts('aaabbb')); // true
console.log('aab:', pda.accepts('aab'));     // false
console.log('abb:', pda.accepts('abb'));     // false
console.log('aba:', pda.accepts('aba'));     // false

// Пошаговая обработка строки "aabb"
const steps = pda.processStringStepByStep('aabb');
steps.forEach((step, index) => {
  console.log(\`Шаг \${index}:\`);
  console.log(\`  Состояние: \${step.state}\`);
  console.log(\`  Стек: [\${step.stack.join(', ')}]\`);
  
  if (step.action === 'start') {
    console.log('  Начало обработки');
  } else if (step.action === 'transition') {
    console.log(\`  Переход по символу '\${step.symbol}' в состояние \${step.nextState}\`);
    console.log(\`  Стек до: [\${step.stackBefore.join(', ')}], после: [\${step.stackAfter.join(', ')}]\`);
  } else if (step.action === 'epsilon-transition') {
    console.log(\`  ε-переход в состояние \${step.nextState}\`);
    console.log(\`  Стек до: [\${step.stackBefore.join(', ')}], после: [\${step.stackAfter.join(', ')}]\`);
  } else if (step.action === 'accept') {
    console.log('  Строка принята!');
  } else if (step.action === 'reject') {
    console.log(\`  Строка отвергнута. \${step.reason || ''}\`);
  }
  
  console.log(\`  Обработано: '\${step.processedInput}', осталось: '\${step.remainingInput}'\`);
  console.log();
});
`;

  return (
    <div className="p-4 overflow-auto font-mono text-sm text-gray-300 rounded-lg bg-slate-900" style={{ maxHeight: '600px' }}>
      <pre>{pdaCode}</pre>
    </div>
  );
};

// Объяснение работы PDA
const AlgorithmExplanation = () => {
  return (
    <div>
      <p className="mb-4">
        Автомат с магазинной памятью (Push-Down Automaton, PDA) — это математическая модель вычисления, 
        которая расширяет возможности конечных автоматов (DFA, NFA) добавлением неограниченной стековой памяти. 
        Эта дополнительная память позволяет PDA распознавать более сложные языки, выходящие за рамки 
        регулярных языков.
      </p>

      <h3 className="mt-6 mb-3 text-xl font-bold text-emerald-400">Формальное определение PDA:</h3>
      <p className="mb-4">
        PDA можно представить как семёрку (Q, Σ, Γ, δ, q₀, Z₀, F), где:
      </p>
      <ul className="pl-5 mb-6 space-y-2 list-disc">
        <li><strong>Q</strong> — конечное множество состояний</li>
        <li><strong>Σ</strong> — конечный алфавит входных символов</li>
        <li><strong>Γ</strong> — конечный алфавит символов стека</li>
        <li><strong>δ: Q × (Σ ∪ {ε}) × Γ → 2^(Q × Γ*)</strong> — функция переходов, определяющая 
          для каждой тройки (текущее состояние, входной символ или ε, верхний символ стека) 
          множество пар (следующее состояние, строка символов для записи в стек)</li>
        <li><strong>q₀ ∈ Q</strong> — начальное состояние</li>
        <li><strong>Z₀ ∈ Γ</strong> — начальный символ стека</li>
        <li><strong>F ⊆ Q</strong> — множество принимающих состояний</li>
      </ul>

      <h3 className="mt-6 mb-3 text-xl font-bold text-emerald-400">Ключевые особенности PDA:</h3>
      <ul className="pl-5 space-y-2 list-disc">
        <li>
          <strong>Стековая память:</strong> PDA имеет доступ к стеку (Last-In-First-Out) неограниченного 
          размера, что позволяет ему "запоминать" информацию.
        </li>
        <li>
          <strong>Операции со стеком:</strong> PDA может выполнять над стеком три операции: 
          push (добавление символа на вершину), pop (удаление верхнего символа) и 
          replace (замена верхнего символа).
        </li>
        <li>
          <strong>Недетерминизм:</strong> PDA может иметь несколько возможных переходов для 
          одной и той же тройки (состояние, символ, верхний символ стека).
        </li>
        <li>
          <strong>ε-переходы:</strong> PDA может совершать переходы без потребления входного 
          символа, изменяя только состояние и/или стек.
        </li>
        <li>
          <strong>Принятие по конечному состоянию:</strong> Строка принимается, если после 
          обработки всех входных символов, PDA находится в принимающем состоянии.
        </li>
        <li>
          <strong>Принятие по пустому стеку:</strong> Альтернативно, можно определить, что 
          строка принимается, если после обработки всех входных символов стек пуст.
        </li>
      </ul>

      <h3 className="mt-6 mb-3 text-xl font-bold text-emerald-400">Принцип работы PDA:</h3>
      <ol className="pl-5 space-y-2 list-decimal">
        <li>
          <strong>Инициализация:</strong> PDA начинает работу в начальном состоянии q₀ с 
          начальным символом Z₀ на стеке.
        </li>
        <li>
          <strong>Чтение входного символа:</strong> PDA читает текущий входной символ и 
          проверяет верхний символ стека.
        </li>
        <li>
          <strong>Выполнение перехода:</strong> На основе текущего состояния, входного символа 
          и верхнего символа стека, PDA выполняет переход, который может включать:
          <ul className="pl-5 mt-2 list-disc">
            <li>Изменение текущего состояния</li>
            <li>Удаление верхнего символа стека (pop)</li>
            <li>Добавление новых символов на стек (push)</li>
            <li>Потребление входного символа (или ε-переход без потребления)</li>
          </ul>
        </li>
        <li>
          <strong>Повторение:</strong> Шаги 2-3 повторяются до тех пор, пока не будет обработана 
          вся входная строка.
        </li>
        <li>
          <strong>Проверка принятия:</strong> После обработки всей строки, PDA проверяет, находится 
          ли он в принимающем состоянии (или имеет пустой стек, в зависимости от критерия принятия).
        </li>
      </ol>

      <div className="p-4 mt-6 border rounded-lg bg-teal-900/20 border-teal-800/30">
        <h4 className="mb-2 font-bold text-teal-300">Пример: PDA для языка a<sup>n</sup>b<sup>n</sup></h4>
        <p className="text-teal-100 mb-3">
          Язык L = {"{a<sup>n</sup>b<sup>n</sup> | n ≥ 1}"} не является регулярным, но может быть распознан PDA.
          Ключевая идея: использовать стек для подсчета количества символов 'a', а затем 
          сверять его с количеством символов 'b'.
        </p>
        <ol className="pl-5 space-y-1 text-teal-100 list-decimal">
          <li>При чтении 'a', добавляем символ 'A' на стек (состояние q0)</li>
          <li>При первом чтении 'b', переходим в состояние q1 и начинаем удалять символы 'A' со стека</li>
          <li>При последующем чтении 'b', продолжаем удалять символы 'A' (состояние q1)</li>
          <li>Когда все 'b' прочитаны и на вершине стека находится символ 'Z' (дно стека), 
              переходим в принимающее состояние q2</li>
        </ol>
        <p className="mt-3 text-teal-100">
          Если количество 'a' и 'b' совпадает, то после обработки всех 'b' на стеке останется 
          только символ 'Z', и PDA перейдет в принимающее состояние. В противном случае, либо 
          стек опустеет раньше времени, либо на нем останутся лишние символы 'A'.
        </p>
      </div>

      <div className="p-4 mt-6 border rounded-lg bg-blue-900/20 border-blue-800/30">
        <h4 className="mb-2 font-bold text-blue-300">Сравнение с другими автоматами:</h4>
        <table className="w-full mt-2 text-sm text-left border-collapse text-blue-200">
          <thead>
            <tr className="bg-blue-800/30">
              <th className="p-2 border border-blue-700">Класс автоматов</th>
              <th className="p-2 border border-blue-700">Память</th>
              <th className="p-2 border border-blue-700">Распознаваемые языки</th>
              <th className="p-2 border border-blue-700">Примеры языков</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2 border border-blue-700">DFA/NFA</td>
              <td className="p-2 border border-blue-700">Только состояния</td>
              <td className="p-2 border border-blue-700">Регулярные языки</td>
              <td className="p-2 border border-blue-700">a*, (a|b)*, a*b*</td>
            </tr>
            <tr>
              <td className="p-2 border border-blue-700">PDA</td>
              <td className="p-2 border border-blue-700">Состояния + стек</td>
              <td className="p-2 border border-blue-700">Контекстно-свободные языки</td>
              <td className="p-2 border border-blue-700">a<sup>n</sup>b<sup>n</sup>, палиндромы, правильные скобочные выражения</td>
            </tr>
            <tr>
              <td className="p-2 border border-blue-700">Машина Тьюринга</td>
              <td className="p-2 border border-blue-700">Состояния + лента</td>
              <td className="p-2 border border-blue-700">Рекурсивно перечислимые языки</td>
              <td className="p-2 border border-blue-700">a<sup>n</sup>b<sup>n</sup>c<sup>n</sup>, произвольные вычисления</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Практическое применение PDA
const ApplicationsSection = () => {
  return (
    <div>
      <p className="mb-4">
        Автоматы с магазинной памятью (PDA) находят широкое применение в компьютерных 
        науках и технологиях, особенно в задачах, где требуется распознавание контекстно-свободных 
        языков и анализ структурированных данных.
      </p>

      <h3 className="mt-4 mb-2 text-xl font-bold text-emerald-400">Основные области применения:</h3>
      <ul className="pl-5 space-y-2 list-disc">
        <li>
          <strong>Компиляторы и интерпретаторы:</strong> PDA используются для синтаксического анализа 
          (парсинга) исходного кода программ. Они являются основой для многих алгоритмов парсинга, 
          таких как LL, LR, LALR, которые преобразуют линейную последовательность токенов в 
          иерархическую структуру (дерево разбора).
        </li>
        <li>
          <strong>Проверка правильности скобочных выражений:</strong> PDA идеально подходят для 
          проверки сбалансированности различных видов скобок в математических выражениях, 
          программном коде, XML, HTML и других форматах.
        </li>
        <li>
          <strong>Обработка XML и HTML:</strong> Валидация и парсинг документов XML и HTML, где 
          важно проверять соответствие открывающих и закрывающих тегов.
        </li>
        <li>
          <strong>Анализ естественных языков:</strong> Некоторые аспекты грамматики естественных 
          языков могут быть смоделированы с помощью контекстно-свободных грамматик и распознаны 
          с помощью PDA.
        </li>
        <li>
          <strong>Формальная верификация протоколов:</strong> PDA используются для моделирования и 
          проверки корректности коммуникационных протоколов.
        </li>
        <li>
          <strong>Анализ рекурсивных структур данных:</strong> Обработка иерархических структур данных, 
          таких как деревья, вложенные объекты JSON и т.д.
        </li>
      </ul>

      <h3 className="mt-6 mb-2 text-xl font-bold text-emerald-400">Конкретные примеры применения:</h3>
      <ul className="pl-5 space-y-2 list-disc">
        <li>
          <strong>Парсеры в компиляторах:</strong> В основе компиляторов JavaScript, Python, 
          C++ и других языков программирования лежат PDA для синтаксического анализа.
        </li>
        <li>
          <strong>Валидаторы JSON и XML:</strong> Проверка структурной корректности JSON 
          объектов и XML документов.
        </li>
        <li>
          <strong>Проверка типов в системах типизации:</strong> Контроль соответствия типов 
          в языках со сложной системой типов.
        </li>
        <li>
          <strong>Анализаторы математических выражений:</strong> Разбор и вычисление 
          арифметических выражений с учетом приоритета операций.
        </li>
        <li>
          <strong>Обработка регулярных выражений с обратными ссылками:</strong> Расширенные 
          регулярные выражения, поддерживающие обратные ссылки, требуют большей выразительной 
          силы, чем обычные регулярные языки.
        </li>
      </ul>

      <div className="p-4 mt-6 border rounded-lg bg-emerald-900/20 border-emerald-800/30">
        <h4 className="mb-2 font-bold text-emerald-300">Пример: Синтаксический анализ выражений</h4>
        <p className="text-emerald-100 mb-3">
          Рассмотрим, как PDA может использоваться для разбора математических выражений с вложенными скобками:
        </p>
        <div className="p-3 mb-3 bg-black/30 font-mono text-sm text-emerald-100 rounded">
          E → E + T | E - T | T<br/>
          T → T * F | T / F | F<br/>
          F → (E) | num
        </div>
        <p className="text-emerald-100 mb-2">
          Для выражения «2 * (3 + 4)», PDA будет действовать следующим образом:
        </p>
        <ol className="pl-5 text-emerald-100 list-decimal">
          <li>Читает «2», распознает как число (F), помещает на стек</li>
          <li>Читает «*», распознает как умножение, помещает на стек</li>
          <li>Читает «(», помещает на стек маркер начала новой вложенной конструкции</li>
          <li>Читает «3», распознает как число (F), помещает на стек</li>
          <li>Читает «+», распознает как сложение, помещает на стек</li>
          <li>Читает «4», распознает как число (F), помещает на стек</li>
          <li>Читает «)», начинает "сворачивать" вложенное выражение:
             <ul className="ml-6 list-disc">
               <li>Извлекает «4», «+» и «3», создает выражение «3 + 4» (тип E)</li>
               <li>Удаляет маркер начала вложенной конструкции «(»</li>
               <li>Помещает результат выражения E на стек</li>
             </ul>
          </li>
          <li>Сворачивает последние элементы: «(3 + 4)» (тип F), «*» и «2» в выражение «2 * (3 + 4)» (тип E)</li>
        </ol>
        <p className="mt-3 text-emerald-100">
          Этот процесс создает синтаксическое дерево, которое затем может быть использовано для вычисления 
          или дальнейшего анализа выражения. Подобный подход используется в большинстве современных 
          компиляторов и интерпретаторов.
        </p>
      </div>
    </div>
  );
};

const PDAPage = () => {
  // Получаем связанные алгоритмы
  const relatedAlgorithms = getRelatedAlgorithms('pda', 'automata').map(algo => ({
    id: algo.id,
    name: algo.name,
    path: algo.path,
  }));

  return (
    <AlgorithmLayout
      title="Автомат с магазинной памятью (PDA)"
      description="Математическая модель вычисления со стеком для распознавания контекстно-свободных языков"
      complexity={{
        time: 'O(n³)',
        space: 'O(n²)',
      }}
      category={{
        id: 'automata',
        name: 'Конечные автоматы',
        icon: 'ph:stack-bold',
      }}
      relatedAlgorithms={relatedAlgorithms}
      visualization={<PDAVisualization />}
      implementation={<CodeImplementation />}
      explanation={<AlgorithmExplanation />}
      applications={<ApplicationsSection />}
    />
  );
};

export default PDAPage;
