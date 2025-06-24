import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';

const MovementMeaning: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<'abstract' | 'narrative'>('abstract');
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [onboardingType, setOnboardingType] = useState<'narrative' | 'abstract'>('narrative');
  const [deleteType, setDeleteType] = useState<'abstract' | 'narrative'>('abstract');
  const [filesDeleted, setFilesDeleted] = useState<number[]>([]);
  const [logoAnimating, setLogoAnimating] = useState(false);
  const [storyProgress, setStoryProgress] = useState(0);

  // Файлы для демо удаления
  const files = [
    { id: 1, name: 'document.pdf', icon: 'ph:file-pdf' },
    { id: 2, name: 'photo.jpg', icon: 'ph:image' },
    { id: 3, name: 'video.mp4', icon: 'ph:video' },
    { id: 4, name: 'music.mp3', icon: 'ph:music-note' },
  ];

  // Демо абстрактного моушн-дизайна
  const AbstractMotionDemo = () => {
    const [toggleState, setToggleState] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [selectedTab, setSelectedTab] = useState(0);
    const [errorShake, setErrorShake] = useState(false);

    const tabs = ['Home', 'Profile', 'Settings'];

    return (
      <div className="p-6 bg-slate-800/50 rounded-lg">
        <h4 className="text-lg font-semibold text-blue-400 mb-4">
          Абстрактный моушн-дизайн: Язык механики
        </h4>

        <div className="space-y-6">
          {/* Переключатель */}
          <div className="p-4 bg-slate-900 rounded">
            <p className="text-sm text-gray-400 mb-3">Универсальная метафора: переключение состояния</p>
            <motion.button
              onClick={() => setToggleState(!toggleState)}
              className={`relative w-16 h-8 rounded-full p-1 cursor-pointer ${
                toggleState ? 'bg-blue-600' : 'bg-slate-600'
              }`}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="w-6 h-6 bg-white rounded-full shadow-lg"
                animate={{ x: toggleState ? 32 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            </motion.button>
            <p className="text-xs text-gray-500 mt-2">Мгновенная, понятная обратная связь</p>
          </div>

          {/* Навигация с подчеркиванием */}
          <div className="p-4 bg-slate-900 rounded">
            <p className="text-sm text-gray-400 mb-3">Показ активного состояния</p>
            <div className="flex gap-6">
              {tabs.map((tab, index) => (
                <button
                  key={tab}
                  onClick={() => setSelectedTab(index)}
                  className="relative px-4 py-2 text-gray-300 hover:text-white transition-colors"
                >
                  {tab}
                  {selectedTab === index && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"
                      layoutId="underline"
                    />
                  )}
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-2">Линия следует за выбором</p>
          </div>

          {/* Выезжающее меню */}
          <div className="p-4 bg-slate-900 rounded relative overflow-hidden">
            <p className="text-sm text-gray-400 mb-3">Иерархия через движение</p>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
            >
              <Icon icon="ph:list" className="inline w-4 h-4 mr-2" />
              Меню
            </button>
            
            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  initial={{ x: '100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '100%' }}
                  transition={{ type: "spring", damping: 25, stiffness: 200 }}
                  className="absolute top-0 right-0 h-full w-48 bg-slate-800 shadow-xl p-4"
                >
                  <button
                    onClick={() => setMenuOpen(false)}
                    className="mb-4 text-gray-400 hover:text-white"
                  >
                    <Icon icon="ph:x" className="w-6 h-6" />
                  </button>
                  {['Option 1', 'Option 2', 'Option 3'].map((item) => (
                    <div key={item} className="py-2 text-gray-300 hover:text-white cursor-pointer">
                      {item}
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
            <p className="text-xs text-gray-500 mt-2">Выезжает справа = следующий уровень</p>
          </div>

          {/* Ошибка с подрагиванием */}
          <div className="p-4 bg-slate-900 rounded">
            <p className="text-sm text-gray-400 mb-3">Обратная связь об ошибке</p>
            <motion.input
              type="text"
              placeholder="Введите только цифры"
              className="w-full px-4 py-2 bg-slate-700 rounded text-white"
              animate={errorShake ? { x: [-10, 10, -10, 10, 0] } : {}}
              transition={{ duration: 0.4 }}
            />
            <button
              onClick={() => {
                setErrorShake(true);
                setTimeout(() => setErrorShake(false), 500);
              }}
              className="mt-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded text-sm transition-colors"
            >
              Симулировать ошибку
            </button>
            <p className="text-xs text-gray-500 mt-2">Подрагивание = что-то пошло не так</p>
          </div>
        </div>
      </div>
    );
  };

  // Демо нарративного моушн-дизайна
  const NarrativeMotionDemo = () => {
    const [showStory, setShowStory] = useState(false);
    const [currentAct, setCurrentAct] = useState(0);

    const story = [
      { 
        title: 'Постановка',
        description: 'Одинокий кубик в пустоте',
        color: 'bg-gray-500'
      },
      { 
        title: 'Конфликт',
        description: 'Появляется препятствие',
        color: 'bg-red-500'
      },
      { 
        title: 'Развитие',
        description: 'Кубик учится прыгать',
        color: 'bg-yellow-500'
      },
      { 
        title: 'Кульминация',
        description: 'Преодоление препятствия',
        color: 'bg-green-500'
      },
      { 
        title: 'Развязка',
        description: 'Счастливый конец',
        color: 'bg-blue-500'
      }
    ];

    const playStory = () => {
      setShowStory(true);
      setCurrentAct(0);
      
      // Автоматическое продвижение по актам
      const intervals = [2000, 2000, 2000, 2000, 2000];
      let currentIndex = 0;
      
      const advance = () => {
        if (currentIndex < story.length - 1) {
          currentIndex++;
          setCurrentAct(currentIndex);
          setTimeout(advance, intervals[currentIndex]);
        } else {
          setTimeout(() => {
            setShowStory(false);
            setCurrentAct(0);
          }, 2000);
        }
      };
      
      setTimeout(advance, intervals[0]);
    };

    return (
      <div className="p-6 bg-slate-800/50 rounded-lg">
        <h4 className="text-lg font-semibold text-purple-400 mb-4">
          Нарративный моушн-дизайн: Язык историй
        </h4>

        <div className="space-y-6">
          {/* Мини-история */}
          <div className="p-4 bg-slate-900 rounded">
            <p className="text-sm text-gray-400 mb-3">История с началом, серединой и концом</p>
            
            <div className="relative h-48 bg-slate-800 rounded-lg overflow-hidden mb-4">
              <AnimatePresence mode="wait">
                {showStory && (
                  <>
                    {/* Главный герой - кубик */}
                    <motion.div
                      className={`absolute w-12 h-12 rounded ${story[currentAct].color}`}
                      initial={{ x: 20, y: 100 }}
                      animate={{
                        x: currentAct === 0 ? 20 : 
                           currentAct === 1 ? 100 :
                           currentAct === 2 ? 150 :
                           currentAct === 3 ? 250 :
                           350,
                        y: currentAct === 3 ? [100, 40, 100] : 100,
                        rotate: currentAct === 2 ? [0, 360] : 0,
                        scale: currentAct === 4 ? [1, 1.2, 1] : 1
                      }}
                      transition={{
                        duration: 1,
                        y: { type: "spring", stiffness: 300 }
                      }}
                    />
                    
                    {/* Препятствие */}
                    {currentAct >= 1 && currentAct <= 3 && (
                      <motion.div
                        className="absolute w-8 h-24 bg-red-900 rounded"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        style={{ left: 200, bottom: 0 }}
                      />
                    )}
                    
                    {/* Текст истории */}
                    <motion.div
                      className="absolute top-4 left-4 right-4"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      key={currentAct}
                    >
                      <h5 className="text-white font-medium">{story[currentAct].title}</h5>
                      <p className="text-sm text-gray-400">{story[currentAct].description}</p>
                    </motion.div>

                    {/* Прогресс истории */}
                    <div className="absolute bottom-2 left-4 right-4 flex gap-1">
                      {story.map((_, index) => (
                        <div
                          key={index}
                          className={`h-1 flex-1 rounded ${
                            index <= currentAct ? 'bg-purple-500' : 'bg-slate-700'
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </AnimatePresence>
            </div>

            <button
              onClick={playStory}
              disabled={showStory}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-slate-700 text-white rounded transition-colors"
            >
              {showStory ? 'История идет...' : 'Запустить историю'}
            </button>
            <p className="text-xs text-gray-500 mt-2">Персонаж, конфликт, развитие, кульминация</p>
          </div>

          {/* Анимация логотипа */}
          <div className="p-4 bg-slate-900 rounded">
            <p className="text-sm text-gray-400 mb-3">Брендинг через движение</p>
            
            <div className="flex justify-center mb-4">
              <motion.div
                className="relative w-32 h-32"
                animate={logoAnimating ? {
                  rotate: [0, 360],
                } : {}}
                transition={{ duration: 2, ease: "easeInOut" }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full"
                  animate={logoAnimating ? {
                    scale: [1, 0.8, 1.2, 1],
                  } : {}}
                  transition={{ duration: 2, ease: "easeInOut" }}
                />
                <motion.div
                  className="absolute inset-4 bg-slate-900 rounded-full"
                  animate={logoAnimating ? {
                    scale: [1, 1.2, 0.8, 1],
                  } : {}}
                  transition={{ duration: 2, ease: "easeInOut" }}
                />
                <motion.div
                  className="absolute inset-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full"
                  animate={logoAnimating ? {
                    rotate: [-360, 0],
                  } : {}}
                  transition={{ duration: 2, ease: "easeInOut" }}
                />
              </motion.div>
            </div>

            <button
              onClick={() => {
                setLogoAnimating(true);
                setTimeout(() => setLogoAnimating(false), 2000);
              }}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded transition-colors w-full"
            >
              Анимировать логотип
            </button>
            <p className="text-xs text-gray-500 mt-2">Рассказывает историю бренда через движение</p>
          </div>

          {/* Эмоциональная обратная связь */}
          <div className="p-4 bg-slate-900 rounded">
            <p className="text-sm text-gray-400 mb-3">Микро-истории успеха</p>
            
            <motion.button
              className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium w-full"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                // Здесь была бы анимация конфетти
              }}
            >
              <Icon icon="ph:check-circle" className="inline w-5 h-5 mr-2" />
              Завершить задачу
            </motion.button>
            <p className="text-xs text-gray-500 mt-2">Празднование достижения, а не просто констатация</p>
          </div>
        </div>
      </div>
    );
  };

  // Демо правильного и неправильного использования
  const DeleteFileDemo = () => {
    const handleDelete = (fileId: number) => {
      setFilesDeleted([...filesDeleted, fileId]);
      if (deleteType === 'abstract') {
        // Для абстрактного - мгновенно убираем из списка
        setTimeout(() => {
          setFilesDeleted(filesDeleted.filter(id => id !== fileId));
        }, 300);
      } else {
        // Для нарративного - долгая анимация
        setTimeout(() => {
          setFilesDeleted(filesDeleted.filter(id => id !== fileId));
        }, 2000);
      }
    };

    return (
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-purple-300 mb-4">
          Пример: Удаление файла
        </h3>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Правильно: Абстрактный подход */}
          <div className="p-6 bg-green-900/20 rounded-lg border border-green-800/50">
            <h4 className="text-green-400 font-semibold mb-3 flex items-center gap-2">
              <Icon icon="ph:check-circle" className="w-5 h-5" />
              Правильно: Механика
            </h4>
            
            <div className="mb-4">
              <label className="flex items-center gap-2 mb-3">
                <input
                  type="radio"
                  checked={deleteType === 'abstract'}
                  onChange={() => setDeleteType('abstract')}
                  className="w-4 h-4"
                />
                <span className="text-sm text-gray-300">Использовать абстрактный подход</span>
              </label>
              
              <div className="space-y-2">
                {files.filter(f => !filesDeleted.includes(f.id)).map((file) => (
                  <motion.div
                    key={file.id}
                    layout
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center justify-between p-3 bg-slate-800 rounded"
                  >
                    <div className="flex items-center gap-3">
                      <Icon icon={file.icon} className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-300">{file.name}</span>
                    </div>
                    <button
                      onClick={() => handleDelete(file.id)}
                      className="p-1 text-red-400 hover:text-red-300"
                    >
                      <Icon icon="ph:trash" className="w-5 h-5" />
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <p className="text-sm text-gray-400">
              ✓ Быстрое исчезновение<br/>
              ✓ Мгновенная обратная связь<br/>
              ✓ Не отвлекает от задачи
            </p>
          </div>

          {/* Неправильно: Нарративный подход */}
          <div className="p-6 bg-red-900/20 rounded-lg border border-red-800/50">
            <h4 className="text-red-400 font-semibold mb-3 flex items-center gap-2">
              <Icon icon="ph:x-circle" className="w-5 h-5" />
              Неправильно: История
            </h4>
            
            <div className="mb-4">
              <label className="flex items-center gap-2 mb-3">
                <input
                  type="radio"
                  checked={deleteType === 'narrative'}
                  onChange={() => setDeleteType('narrative')}
                  className="w-4 h-4"
                />
                <span className="text-sm text-gray-300">Использовать нарративный подход</span>
              </label>
              
              <div className="space-y-2">
                {files.map((file) => {
                  const isDeleting = filesDeleted.includes(file.id);
                  return (
                    <motion.div
                      key={file.id}
                      className="flex items-center justify-between p-3 bg-slate-800 rounded overflow-hidden"
                    >
                      <motion.div
                        className="flex items-center gap-3"
                        animate={isDeleting ? {
                          scale: [1, 0.8, 1.2, 0],
                          rotate: [0, -10, 10, 360],
                          opacity: [1, 1, 1, 0]
                        } : {}}
                        transition={{ duration: 2 }}
                      >
                        <Icon icon={file.icon} className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-300">{file.name}</span>
                        {isDeleting && (
                          <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-xs text-red-400"
                          >
                            😢 Прощай...
                          </motion.span>
                        )}
                      </motion.div>
                      <button
                        onClick={() => handleDelete(file.id)}
                        disabled={isDeleting}
                        className="p-1 text-red-400 hover:text-red-300 disabled:opacity-50"
                      >
                        <Icon icon="ph:trash" className="w-5 h-5" />
                      </button>
                    </motion.div>
                  );
                })}
              </div>
            </div>
            
            <p className="text-sm text-gray-400">
              ✗ Излишняя драматизация<br/>
              ✗ Мучительная задержка<br/>
              ✗ Раздражает при повторении
            </p>
          </div>
        </div>
      </div>
    );
  };

  // Демо онбординга
  const OnboardingDemo = () => {
    const [currentStep, setCurrentStep] = useState(0);
    
    const narrativeSteps = [
      {
        title: "Добро пожаловать в будущее",
        description: "Где ваши идеи оживают",
        icon: "ph:rocket-launch",
        animation: { scale: [0, 1.2, 1], rotate: [0, 10, -10, 0] }
      },
      {
        title: "Создавайте без границ",
        description: "Инструменты, которые вдохновляют",
        icon: "ph:paint-brush",
        animation: { y: [-20, 0], opacity: [0, 1] }
      },
      {
        title: "Делитесь с миром",
        description: "Ваше творчество достойно внимания",
        icon: "ph:globe",
        animation: { scale: [0.8, 1], rotate: [0, 360] }
      }
    ];

    const abstractSteps = [
      {
        title: "Функция 1",
        description: "• Создание проектов\n• Управление файлами",
        icon: "ph:folder"
      },
      {
        title: "Функция 2", 
        description: "• Совместная работа\n• Комментарии",
        icon: "ph:users"
      },
      {
        title: "Функция 3",
        description: "• Экспорт\n• Публикация",
        icon: "ph:export"
      }
    ];

    const steps = onboardingType === 'narrative' ? narrativeSteps : abstractSteps;

    return (
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-purple-300 mb-4">
          Пример: Онбординг
        </h3>

        <div className="mb-4 flex gap-2">
          <button
            onClick={() => setOnboardingType('narrative')}
            className={`px-4 py-2 rounded transition-all ${
              onboardingType === 'narrative'
                ? 'bg-purple-600 text-white'
                : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
            }`}
          >
            Нарративный подход
          </button>
          <button
            onClick={() => setOnboardingType('abstract')}
            className={`px-4 py-2 rounded transition-all ${
              onboardingType === 'abstract'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
            }`}
          >
            Абстрактный подход
          </button>
        </div>

        <div className="relative h-96 bg-slate-900 rounded-lg overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center"
            >
              {onboardingType === 'narrative' ? (
                <>
                  <motion.div
                    animate={narrativeSteps[currentStep].animation}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  >
                    <Icon 
                      icon={steps[currentStep].icon} 
                      className="w-24 h-24 mx-auto mb-6 text-purple-400"
                    />
                  </motion.div>
                  <motion.h2
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-2xl font-bold text-white mb-2"
                  >
                    {steps[currentStep].title}
                  </motion.h2>
                  <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-gray-400"
                  >
                    {steps[currentStep].description}
                  </motion.p>
                </>
              ) : (
                <>
                  <Icon 
                    icon={steps[currentStep].icon} 
                    className="w-16 h-16 mx-auto mb-4 text-blue-400"
                  />
                  <h2 className="text-xl font-semibold text-white mb-2">
                    {steps[currentStep].title}
                  </h2>
                  <p className="text-gray-400 whitespace-pre-line">
                    {steps[currentStep].description}
                  </p>
                </>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Навигация */}
          <div className="absolute bottom-8 left-8 right-8 flex items-center justify-between">
            <button
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 disabled:bg-slate-800 disabled:text-gray-600 text-white rounded transition-colors"
            >
              Назад
            </button>

            <div className="flex gap-2">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentStep ? 'bg-purple-500' : 'bg-slate-700'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
              disabled={currentStep === steps.length - 1}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-slate-800 disabled:text-gray-600 text-white rounded transition-colors"
            >
              Далее
            </button>
          </div>
        </div>

        <div className="mt-4 grid md:grid-cols-2 gap-4">
          <div className={`p-4 rounded-lg ${
            onboardingType === 'narrative' 
              ? 'bg-purple-900/20 border border-purple-800/50'
              : 'bg-slate-800/30 border border-slate-700/50'
          }`}>
            <h5 className="font-medium text-purple-400 mb-2">Нарративный подход</h5>
            <p className="text-sm text-gray-400">
              • Эмоциональная связь<br/>
              • Запоминающаяся история<br/>
              • Вовлечение пользователя
            </p>
          </div>
          
          <div className={`p-4 rounded-lg ${
            onboardingType === 'abstract' 
              ? 'bg-blue-900/20 border border-blue-800/50'
              : 'bg-slate-800/30 border border-slate-700/50'
          }`}>
            <h5 className="font-medium text-blue-400 mb-2">Абстрактный подход</h5>
            <p className="text-sm text-gray-400">
              • Быстрая информация<br/>
              • Четкие функции<br/>
              • Эффективность
            </p>
          </div>
        </div>
      </div>
    );
  };

  // Сравнение двух языков
  const LanguagesComparison = () => {
    return (
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        <motion.div
          className={`p-6 rounded-lg border cursor-pointer transition-all ${
            selectedLanguage === 'abstract'
              ? 'bg-blue-900/20 border-blue-700 shadow-lg shadow-blue-900/50'
              : 'bg-slate-800/50 border-slate-700 hover:bg-slate-800/70'
          }`}
          onClick={() => setSelectedLanguage('abstract')}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Icon icon="ph:gear" className="w-12 h-12 text-blue-400 mb-4" />
          <h3 className="text-xl font-semibold text-blue-400 mb-3">
            Язык 1: Абстрактный
          </h3>
          <p className="text-gray-300 mb-4">Язык систем, состояний и обратной связи</p>
          
          <div className="space-y-3">
            <div>
              <h4 className="font-medium text-gray-200 mb-1">Цель:</h4>
              <p className="text-sm text-gray-400">Информировать и прояснять</p>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-200 mb-1">Инструменты:</h4>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>• Универсальные метафоры</li>
                <li>• Мгновенная обратная связь</li>
                <li>• Минималистичность</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-200 mb-1">Где живет:</h4>
              <p className="text-sm text-gray-400">
                Кнопки, переключатели, меню, переходы
              </p>
            </div>
            
            <div className="pt-3 border-t border-slate-700">
              <p className="text-xs text-blue-300">
                99% всего UI моушн-дизайна
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className={`p-6 rounded-lg border cursor-pointer transition-all ${
            selectedLanguage === 'narrative'
              ? 'bg-purple-900/20 border-purple-700 shadow-lg shadow-purple-900/50'
              : 'bg-slate-800/50 border-slate-700 hover:bg-slate-800/70'
          }`}
          onClick={() => setSelectedLanguage('narrative')}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Icon icon="ph:book-open" className="w-12 h-12 text-purple-400 mb-4" />
          <h3 className="text-xl font-semibold text-purple-400 mb-3">
            Язык 2: Нарративный
          </h3>
          <p className="text-gray-300 mb-4">Язык историй с началом, серединой и концом</p>
          
          <div className="space-y-3">
            <div>
              <h4 className="font-medium text-gray-200 mb-1">Цель:</h4>
              <p className="text-sm text-gray-400">Вовлекать, обучать, вызывать эмоции</p>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-200 mb-1">Инструменты:</h4>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>• Постановка и режиссура</li>
                <li>• Тайминг и ритм</li>
                <li>• Развитие персонажа</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-200 mb-1">Где живет:</h4>
              <p className="text-sm text-gray-400">
                Онбординги, промо, брендинг, моменты восторга
              </p>
            </div>
            
            <div className="pt-3 border-t border-slate-700">
              <p className="text-xs text-purple-300">
                Для особых моментов
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    );
  };

  return (
    <div className="prose prose-invert max-w-none">
      <h2 className="mb-8 text-3xl font-bold text-purple-400">
        Смысл Движения — Нарративный vs. Абстрактный Моушн-дизайн
      </h2>

      {/* Вступление */}
      <div className="p-6 mb-8 bg-yellow-900/20 rounded-lg border border-yellow-800/50">
        <p className="text-lg text-yellow-300 mb-4">
          <Icon icon="ph:lightbulb" className="inline w-6 h-6 mr-2" />
          До сих пор мы говорили о движении как о способе улучшить юзабилити. 
          Но есть и другая вселенная, где движение рассказывает истории.
        </p>
        <p className="text-gray-300 mb-0">
          <strong className="text-orange-400">Исходное заблуждение:</strong> Чем больше "истории" 
          в анимации, тем она лучше и интереснее.
        </p>
      </div>

      {/* Новая идея */}
      <div className="p-6 mb-12 bg-purple-900/20 rounded-lg border border-purple-700/50">
        <h3 className="text-2xl font-semibold text-purple-400 mb-4">
          Новая идея: Два разных языка для разных целей
        </h3>
        <p className="text-lg text-gray-200">
          Нарративный и абстрактный моушн-дизайн — это два разных языка. 
          Использование не того языка подобно 
          <strong className="text-purple-400"> попытке объяснить математику поэмой</strong>.
        </p>
      </div>

      {/* Сравнение языков */}
      <LanguagesComparison />

      {/* Демонстрации */}
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        <AbstractMotionDemo />
        <NarrativeMotionDemo />
      </div>

      {/* Примеры правильного/неправильного использования */}
      <DeleteFileDemo />
      <OnboardingDemo />

      {/* Ключевые ошибки */}
      <div className="mb-12">
        <h3 className="text-2xl font-semibold text-purple-300 mb-6">
          Конфликт языков: Главные ошибки
        </h3>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 bg-red-900/20 rounded-lg border border-red-800/50">
            <h4 className="text-red-400 font-semibold mb-3 flex items-center gap-2">
              <Icon icon="ph:x-circle" className="w-6 h-6" />
              Ошибка 1: Нарратив вместо механики
            </h4>
            
            <div className="mb-4">
              <p className="text-gray-300 mb-3">
                Попытка рассказать историю там, где нужна простая обратная связь.
              </p>
              
              <div className="p-4 bg-red-800/20 rounded">
                <p className="text-sm text-gray-400 mb-2">Пример:</p>
                <p className="text-sm text-red-300">
                  Файл при удалении грустит, плачет и превращается в облачко пыли
                </p>
              </div>
            </div>
            
            <p className="text-sm text-gray-400">
              <strong>Результат:</strong> Мило в первый раз, мучительно в сотый. 
              Вы использовали поэзию для технической документации.
            </p>
          </div>

          <div className="p-6 bg-orange-900/20 rounded-lg border border-orange-800/50">
            <h4 className="text-orange-400 font-semibold mb-3 flex items-center gap-2">
              <Icon icon="ph:x-circle" className="w-6 h-6" />
              Ошибка 2: Механика вместо нарратива
            </h4>
            
            <div className="mb-4">
              <p className="text-gray-300 mb-3">
                Сухие переходы там, где нужна эмоциональная связь.
              </p>
              
              <div className="p-4 bg-orange-800/20 rounded">
                <p className="text-sm text-gray-400 mb-2">Пример:</p>
                <p className="text-sm text-orange-300">
                  Онбординг с простыми слайдами и списками функций
                </p>
              </div>
            </div>
            
            <p className="text-sm text-gray-400">
              <strong>Результат:</strong> Упущен шанс создать связь. 
              Вы использовали техническую документацию для поэмы.
            </p>
          </div>
        </div>
      </div>

      {/* Практическое руководство */}
      <div className="mb-12 p-6 bg-blue-900/20 rounded-lg border border-blue-800/50">
        <h3 className="text-xl font-semibold text-blue-400 mb-4">
          Практическое руководство по выбору
        </h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-blue-300 mb-3">
              Используйте абстрактный, когда:
            </h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <Icon icon="ph:check" className="w-4 h-4 text-blue-400 mt-0.5" />
                <span>Действие повторяется часто</span>
              </li>
              <li className="flex items-start gap-2">
                <Icon icon="ph:check" className="w-4 h-4 text-blue-400 mt-0.5" />
                <span>Нужна мгновенная обратная связь</span>
              </li>
              <li className="flex items-start gap-2">
                <Icon icon="ph:check" className="w-4 h-4 text-blue-400 mt-0.5" />
                <span>Пользователь выполняет задачу</span>
              </li>
              <li className="flex items-start gap-2">
                <Icon icon="ph:check" className="w-4 h-4 text-blue-400 mt-0.5" />
                <span>Важна скорость и эффективность</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-purple-300 mb-3">
              Используйте нарративный, когда:
            </h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <Icon icon="ph:check" className="w-4 h-4 text-purple-400 mt-0.5" />
                <span>Это первый опыт пользователя</span>
              </li>
              <li className="flex items-start gap-2">
                <Icon icon="ph:check" className="w-4 h-4 text-purple-400 mt-0.5" />
                <span>Нужно объяснить ценность</span>
              </li>
              <li className="flex items-start gap-2">
                <Icon icon="ph:check" className="w-4 h-4 text-purple-400 mt-0.5" />
                <span>Важен эмоциональный отклик</span>
              </li>
              <li className="flex items-start gap-2">
                <Icon icon="ph:check" className="w-4 h-4 text-purple-400 mt-0.5" />
                <span>Это особый/редкий момент</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Финальный вердикт */}
      <div className="mt-12 p-8 bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-lg border border-purple-700/50">
        <h3 className="text-2xl font-bold text-purple-300 mb-6">
          Вердикт: Ваша Новая Ментальная Модель
        </h3>
        
        <div className="p-4 bg-purple-800/20 rounded-lg mb-6">
          <p className="text-lg text-purple-200 font-medium mb-0">
            Перед проектированием движения задайте главный вопрос:<br/>
            <strong className="text-purple-400">"Я хочу ПРОЯСНИТЬ МЕХАНИКУ или РАССКАЗАТЬ ИСТОРИЮ?"</strong>
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-4 bg-blue-900/20 rounded-lg border border-blue-800/50">
            <Icon icon="ph:gear" className="w-8 h-8 text-blue-400 mb-2" />
            <h4 className="font-medium text-blue-400 mb-2">Прояснить механику?</h4>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>→ Язык: Абстрактный</li>
              <li>→ Инструменты: скорость, утилитарность</li>
              <li>→ Будьте кратким и невидимым</li>
            </ul>
          </div>
          
          <div className="p-4 bg-purple-900/20 rounded-lg border border-purple-800/50">
            <Icon icon="ph:book-open" className="w-8 h-8 text-purple-400 mb-2" />
            <h4 className="font-medium text-purple-400 mb-2">Рассказать историю?</h4>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>→ Язык: Нарративный</li>
              <li>→ Инструменты: постановка, ритм</li>
              <li>→ Не бойтесь быть выразительным</li>
            </ul>
          </div>
        </div>

        <p className="text-lg text-gray-200 italic text-center mt-8">
          Понимание этой границы отделяет дизайнера интерфейсов<br/>
          от <strong className="text-purple-400">режиссера цифрового опыта</strong>.<br/>
          Выбирайте свой язык осознанно.
        </p>
      </div>
    </div>
  );
};

export default MovementMeaning;