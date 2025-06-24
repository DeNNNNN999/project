import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';

const MicroAnimations: React.FC = () => {
  const [savedItems, setSavedItems] = useState<number[]>([]);
  const [toggleStates, setToggleStates] = useState<{ [key: string]: boolean }>({});
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);
  const [loginError, setLoginError] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [delightTriggered, setDelightTriggered] = useState(false);
  const [showBadExample, setShowBadExample] = useState(false);

  // Таблица вопросов и ответов
  const QuestionsTable = () => {
    const examples = [
      {
        action: 'Нажатие на кнопку "Сохранить"',
        question: 'Система меня услышала? Мои данные сохранились?',
        response: 'Кнопка быстро меняет цвет/масштаб. Появляется иконка галочки.',
        icon: 'ph:floppy-disk',
        color: 'green'
      },
      {
        action: 'Переключение тумблера',
        question: 'Настройка включилась? Какое сейчас состояние?',
        response: 'Ползунок плавно переезжает на другую сторону. Меняется цвет.',
        icon: 'ph:toggle-left',
        color: 'blue'
      },
      {
        action: 'Потянуть список для обновления',
        question: 'Я могу здесь потянуть? Как далеко? Обновление началось?',
        response: 'Список "сопротивляется" (rubber-band), появляется и вращается спиннер.',
        icon: 'ph:arrow-clockwise',
        color: 'purple'
      },
      {
        action: 'Ввод неверного пароля',
        question: 'Что-то не так? Какое именно поле заполнено неверно?',
        response: 'Поле ввода быстро и коротко трясется из стороны в сторону.',
        icon: 'ph:lock',
        color: 'red'
      },
      {
        action: 'Наведение курсора на иконку',
        question: 'Это кликабельно? Что это делает?',
        response: 'Иконка слегка увеличивается. Появляется всплывающая подсказка.',
        icon: 'ph:cursor',
        color: 'yellow'
      }
    ];

    return (
      <div className="mb-12">
        <h3 className="text-2xl font-semibold text-purple-300 mb-6">
          Микроанимация как Ответ на Вопрос
        </h3>
        <p className="text-gray-300 mb-6">
          Каждый раз, когда пользователь взаимодействует с UI, у него в голове возникает подсознательный вопрос. 
          Работа хорошей микроанимации — <strong className="text-purple-400">мгновенно на него ответить</strong>.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full bg-slate-800/50 rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-purple-900/20 border-b border-slate-700">
                <th className="text-left p-4 text-purple-400 font-semibold">Действие пользователя</th>
                <th className="text-left p-4 text-purple-400 font-semibold">Невысказанный вопрос</th>
                <th className="text-left p-4 text-purple-400 font-semibold">Ответ микроанимации</th>
              </tr>
            </thead>
            <tbody>
              {examples.map((example, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border-b border-slate-700/50 hover:bg-slate-800/30"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <Icon 
                        icon={example.icon} 
                        className={`w-5 h-5 text-${example.color}-400`} 
                      />
                      <span className="text-gray-300">{example.action}</span>
                    </div>
                  </td>
                  <td className="p-4 text-gray-400 italic">{example.question}</td>
                  <td className="p-4 text-gray-300">{example.response}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 p-4 bg-purple-900/20 rounded-lg border-l-4 border-purple-500">
          <p className="text-gray-300">
            <Icon icon="ph:lightbulb" className="inline w-5 h-5 text-purple-400 mr-2" />
            Ни в одном из этих случаев основная цель — не "красота". 
            Основная цель — <strong className="text-purple-400">ясность и уверенность</strong>. 
            Микроанимация устраняет малейшее сомнение.
          </p>
        </div>
      </div>
    );
  };

  // Демо анимаций комфорта
  const ComfortAnimationsDemo = () => {
    const [saving, setSaving] = useState<number | null>(null);

    const handleSave = (itemId: number) => {
      setSaving(itemId);
      setTimeout(() => {
        setSavedItems([...savedItems, itemId]);
        setSaving(null);
      }, 200);
    };

    const handleToggle = (toggleId: string) => {
      setToggleStates({
        ...toggleStates,
        [toggleId]: !toggleStates[toggleId]
      });
    };

    return (
      <div className="p-6 bg-blue-900/20 rounded-lg border border-blue-800/50 mb-8">
        <h4 className="text-blue-400 font-semibold mb-4 flex items-center gap-2">
          <Icon icon="ph:hand-heart" className="w-5 h-5" />
          Лагерь 1: Анимации Комфорта (95%)
        </h4>
        
        <p className="text-gray-300 mb-6">
          Их задача — быть полезными и почти невидимыми. 
          <strong className="text-blue-400"> Быстрые (100-200мс)</strong>, 
          <strong className="text-blue-400"> предсказуемые</strong>, 
          <strong className="text-blue-400"> утилитарные</strong>.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Кнопка сохранения */}
          <div>
            <h5 className="text-blue-300 font-medium mb-3">Подтверждение действия</h5>
            <div className="space-y-3">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex items-center justify-between p-3 bg-slate-800 rounded">
                  <span className="text-gray-300">Элемент {item}</span>
                  <motion.button
                    onClick={() => handleSave(item)}
                    disabled={savedItems.includes(item)}
                    className={`px-4 py-2 rounded font-medium transition-all ${
                      savedItems.includes(item)
                        ? 'bg-green-600 text-white cursor-default'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                    animate={{
                      scale: saving === item ? 0.95 : 1,
                    }}
                    transition={{ duration: 0.1 }}
                  >
                    <AnimatePresence mode="wait">
                      {savedItems.includes(item) ? (
                        <motion.div
                          key="saved"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center gap-2"
                        >
                          <Icon icon="ph:check" className="w-4 h-4" />
                          Сохранено
                        </motion.div>
                      ) : (
                        <motion.div
                          key="save"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          Сохранить
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-3">⏱️ 200ms • Мгновенная обратная связь</p>
          </div>

          {/* Переключатели */}
          <div>
            <h5 className="text-blue-300 font-medium mb-3">Изменение состояния</h5>
            <div className="space-y-4">
              {['notifications', 'darkMode', 'autoSave'].map((toggle, index) => (
                <div key={toggle} className="flex items-center justify-between">
                  <span className="text-gray-300">
                    {toggle === 'notifications' && 'Уведомления'}
                    {toggle === 'darkMode' && 'Темная тема'}
                    {toggle === 'autoSave' && 'Автосохранение'}
                  </span>
                  <button
                    onClick={() => handleToggle(toggle)}
                    className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${
                      toggleStates[toggle] ? 'bg-blue-600' : 'bg-slate-600'
                    }`}
                  >
                    <motion.div
                      className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm"
                      animate={{
                        x: toggleStates[toggle] ? 24 : 2
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                        duration: 0.2
                      }}
                    />
                  </button>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-3">⏱️ 200ms • Четкое изменение состояния</p>
          </div>
        </div>

        {/* Интерактивные иконки */}
        <div className="mt-6">
          <h5 className="text-blue-300 font-medium mb-3">Обратная связь при наведении</h5>
          <div className="flex gap-4">
            {['home', 'heart', 'bookmark', 'share', 'settings'].map((icon) => (
              <div key={icon} className="relative">
                <motion.button
                  onMouseEnter={() => setHoveredIcon(icon)}
                  onMouseLeave={() => setHoveredIcon(null)}
                  className="p-3 rounded-lg bg-slate-800 text-gray-400"
                  whileHover={{ 
                    scale: 1.05,
                    backgroundColor: 'rgb(51 65 85)',
                  }}
                  transition={{ duration: 0.15 }}
                >
                  <Icon 
                    icon={`ph:${icon}`} 
                    className="w-6 h-6"
                  />
                </motion.button>
                
                <AnimatePresence>
                  {hoveredIcon === icon && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      transition={{ duration: 0.15 }}
                      className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-700 text-white text-xs rounded whitespace-nowrap"
                    >
                      {icon.charAt(0).toUpperCase() + icon.slice(1)}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-3">⏱️ 150ms • Подтверждение интерактивности</p>
        </div>
      </div>
    );
  };

  // Демо анимаций восторга
  const DelightAnimationsDemo = () => {
    const [liked, setLiked] = useState(false);
    const [completed, setCompleted] = useState(false);
    const [subscribed, setSubscribed] = useState(false);

    return (
      <div className="p-6 bg-purple-900/20 rounded-lg border border-purple-800/50 mb-8">
        <h4 className="text-purple-400 font-semibold mb-4 flex items-center gap-2">
          <Icon icon="ph:sparkle" className="w-5 h-5" />
          Лагерь 2: Анимации Восторга (5%)
        </h4>
        
        <p className="text-gray-300 mb-6">
          Это ваш "спецназ". Микроанимации, сознательно спроектированные, чтобы вызвать эмоциональную реакцию.
          <strong className="text-purple-400"> Дольше (300-500мс)</strong>, 
          <strong className="text-purple-400"> сложнее</strong>, 
          <strong className="text-purple-400"> эмоциональнее</strong>.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Лайк в стиле Twitter */}
          <div className="text-center">
            <h5 className="text-purple-300 font-medium mb-4">Лайк с эмоцией</h5>
            <button
              onClick={() => setLiked(!liked)}
              className="relative p-4"
            >
              <motion.div
                animate={liked ? {
                  scale: [1, 0.8, 1.3, 1.1, 1],
                } : {}}
                transition={{ duration: 0.5 }}
              >
                <Icon 
                  icon={liked ? "ph:heart-fill" : "ph:heart"} 
                  className={`w-12 h-12 transition-colors ${
                    liked ? 'text-red-500' : 'text-gray-400'
                  }`}
                />
              </motion.div>
              
              {/* Частицы */}
              <AnimatePresence>
                {liked && (
                  <>
                    {[...Array(6)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute top-1/2 left-1/2 w-2 h-2 bg-red-400 rounded-full"
                        initial={{ x: 0, y: 0, opacity: 1 }}
                        animate={{
                          x: Math.cos(i * 60 * Math.PI / 180) * 30,
                          y: Math.sin(i * 60 * Math.PI / 180) * 30,
                          opacity: 0,
                          scale: 0
                        }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6 }}
                      />
                    ))}
                  </>
                )}
              </AnimatePresence>
            </button>
            <p className="text-xs text-gray-400 mt-2">⏱️ 500ms • Эмоциональный отклик</p>
          </div>

          {/* Завершение задачи */}
          <div className="text-center">
            <h5 className="text-purple-300 font-medium mb-4">Успешное завершение</h5>
            <button
              onClick={() => {
                setCompleted(true);
                setTimeout(() => setCompleted(false), 2000);
              }}
              className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700"
            >
              Завершить задачу
            </button>
            
            <AnimatePresence>
              {completed && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-4"
                >
                  <motion.div
                    animate={{
                      scale: [0, 1.2, 1],
                      rotate: [0, 10, -10, 0]
                    }}
                    transition={{ duration: 0.6 }}
                  >
                    <Icon icon="ph:confetti" className="w-16 h-16 text-yellow-400 mx-auto" />
                  </motion.div>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-green-400 font-semibold mt-2"
                  >
                    Отлично! 🎉
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>
            <p className="text-xs text-gray-400 mt-2">⏱️ 600ms • Празднование успеха</p>
          </div>

          {/* Подписка с анимацией */}
          <div className="text-center">
            <h5 className="text-purple-300 font-medium mb-4">Важное действие</h5>
            <motion.button
              onClick={() => setSubscribed(!subscribed)}
              className={`relative px-6 py-3 rounded-lg font-medium overflow-hidden ${
                subscribed 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-purple-600 text-white hover:bg-purple-700'
              }`}
              whileHover={!subscribed ? { scale: 1.05 } : {}}
              whileTap={!subscribed ? { scale: 0.95 } : {}}
            >
              <AnimatePresence mode="wait">
                {!subscribed ? (
                  <motion.span
                    key="subscribe"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    Подписаться
                  </motion.span>
                ) : (
                  <motion.span
                    key="subscribed"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2"
                  >
                    <Icon icon="ph:check-circle-fill" className="w-5 h-5" />
                    Подписка оформлена!
                  </motion.span>
                )}
              </AnimatePresence>
              
              {/* Волна */}
              <AnimatePresence>
                {subscribed && (
                  <motion.div
                    className="absolute inset-0 bg-white/20"
                    initial={{ scale: 0, opacity: 1 }}
                    animate={{ scale: 3, opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    style={{ borderRadius: '50%' }}
                  />
                )}
              </AnimatePresence>
            </motion.button>
            <p className="text-xs text-gray-400 mt-2">⏱️ 800ms • Подчеркивание важности</p>
          </div>
        </div>
      </div>
    );
  };

  // Демо ошибок
  const ErrorDemo = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<{ email?: boolean; password?: boolean }>({});

    const handleLogin = () => {
      const newErrors: { email?: boolean; password?: boolean } = {};
      
      if (!email.includes('@')) {
        newErrors.email = true;
      }
      if (password.length < 6) {
        newErrors.password = true;
      }
      
      setErrors(newErrors);
      if (Object.keys(newErrors).length > 0) {
        setLoginError(true);
        setTimeout(() => setLoginError(false), 500);
      }
    };

    return (
      <div className="p-6 bg-red-900/20 rounded-lg border border-red-800/50">
        <h4 className="text-red-400 font-semibold mb-4 flex items-center gap-2">
          <Icon icon="ph:warning-circle" className="w-5 h-5" />
          Микроанимации ошибок
        </h4>
        
        <div className="max-w-sm mx-auto space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Email</label>
            <motion.input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrors({ ...errors, email: false });
              }}
              className={`w-full px-4 py-2 bg-slate-800 rounded border ${
                errors.email ? 'border-red-500' : 'border-slate-600'
              } text-white focus:outline-none focus:border-blue-500`}
              animate={errors.email && loginError ? {
                x: [0, -10, 10, -10, 10, 0],
              } : {}}
              transition={{ duration: 0.4 }}
            />
            <AnimatePresence>
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-red-400 text-xs mt-1"
                >
                  Введите корректный email
                </motion.p>
              )}
            </AnimatePresence>
          </div>
          
          <div>
            <label className="block text-sm text-gray-400 mb-1">Пароль</label>
            <motion.input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrors({ ...errors, password: false });
              }}
              className={`w-full px-4 py-2 bg-slate-800 rounded border ${
                errors.password ? 'border-red-500' : 'border-slate-600'
              } text-white focus:outline-none focus:border-blue-500`}
              animate={errors.password && loginError ? {
                x: [0, -10, 10, -10, 10, 0],
              } : {}}
              transition={{ duration: 0.4 }}
            />
            <AnimatePresence>
              {errors.password && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-red-400 text-xs mt-1"
                >
                  Пароль должен быть не менее 6 символов
                </motion.p>
              )}
            </AnimatePresence>
          </div>
          
          <button
            onClick={handleLogin}
            className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Войти
          </button>
        </div>
        
        <p className="text-xs text-gray-400 mt-4 text-center">
          ⏱️ 400ms • Тряска привлекает внимание к ошибке
        </p>
      </div>
    );
  };

  // Анти-паттерн: путаница лагерей
  const BadPracticeDemo = () => {
    return (
      <div className="p-6 bg-red-900/20 rounded-lg border border-red-800/50">
        <h4 className="text-red-400 font-semibold mb-4 flex items-center gap-2">
          <Icon icon="ph:x-circle" className="w-5 h-5" />
          Главная Ошибка: Путать Лагеря
        </h4>
        
        <p className="text-gray-300 mb-6">
          Проблемы начинаются, когда мы применяем принципы "Восторга" к анимациям "Комфорта".
        </p>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Плохой пример */}
          <div>
            <h5 className="text-red-300 font-medium mb-3">❌ Избыточная анимация переключателя</h5>
            <div className="p-4 bg-slate-900 rounded">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-300">Wi-Fi</span>
                <button
                  onClick={() => setShowBadExample(!showBadExample)}
                  className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${
                    showBadExample ? 'bg-red-600' : 'bg-slate-600'
                  }`}
                >
                  <motion.div
                    className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm"
                    animate={{
                      x: showBadExample ? 24 : 2,
                      rotate: showBadExample ? 360 : 0,
                    }}
                    transition={{
                      x: {
                        type: "spring",
                        stiffness: 100,
                        damping: 10,
                        duration: 0.8
                      },
                      rotate: {
                        duration: 0.8,
                        ease: "easeInOut"
                      }
                    }}
                  >
                    {showBadExample && (
                      <motion.div
                        className="absolute inset-0 bg-red-400 rounded-full"
                        initial={{ scale: 0 }}
                        animate={{ scale: [1, 2, 0] }}
                        transition={{ duration: 0.8 }}
                      />
                    )}
                  </motion.div>
                </button>
              </div>
              <p className="text-xs text-red-400">
                ⏱️ 800ms • Слишком долго для рутинного действия!
              </p>
            </div>
          </div>
          
          {/* Правильный пример */}
          <div>
            <h5 className="text-green-300 font-medium mb-3">✅ Правильная скорость</h5>
            <div className="p-4 bg-slate-900 rounded">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-300">Wi-Fi</span>
                <button
                  onClick={() => setToggleStates({ ...toggleStates, wifi: !toggleStates['wifi'] })}
                  className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${
                    toggleStates['wifi'] ? 'bg-green-600' : 'bg-slate-600'
                  }`}
                >
                  <motion.div
                    className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm"
                    animate={{
                      x: toggleStates['wifi'] ? 24 : 2
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 30,
                      duration: 0.2
                    }}
                  />
                </button>
              </div>
              <p className="text-xs text-green-400">
                ⏱️ 200ms • Быстро и понятно
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-red-800/20 rounded">
          <p className="text-red-300 text-sm">
            <Icon icon="ph:warning" className="inline w-4 h-4 mr-1" />
            <strong>Последствия:</strong> Вы задерживаете пользователя и превращаете утилитарное действие в раздражающий мультфильм.
            Анимации Восторга — это специя. Они ценны именно потому, что они <strong>редки</strong>.
          </p>
        </div>
      </div>
    );
  };

  // Чек-лист для принятия решений
  const DecisionChecklist = () => {
    const [selectedType, setSelectedType] = useState<'comfort' | 'delight' | null>(null);

    return (
      <div className="p-6 bg-slate-800/50 rounded-lg border border-slate-700">
        <h4 className="text-purple-400 font-semibold mb-4 flex items-center gap-2">
          <Icon icon="ph:list-checks" className="w-5 h-5" />
          Перед созданием микроанимации, определите ее работу
        </h4>

        <div className="space-y-4">
          <motion.button
            onClick={() => setSelectedType('comfort')}
            className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
              selectedType === 'comfort' 
                ? 'bg-blue-900/20 border-blue-500 shadow-blue-500/20 shadow-lg' 
                : 'bg-slate-900/50 border-slate-700 hover:border-slate-600'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-start gap-3">
              <Icon icon="ph:arrows-clockwise" className="w-6 h-6 text-blue-400 mt-0.5" />
              <div>
                <p className="font-medium text-blue-400">
                  Это рутинный ответ на действие пользователя?
                </p>
                <p className="text-sm text-gray-400 mt-1">
                  Переключатели, кнопки, навигация, ввод данных
                </p>
              </div>
            </div>
          </motion.button>

          <motion.button
            onClick={() => setSelectedType('delight')}
            className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
              selectedType === 'delight' 
                ? 'bg-purple-900/20 border-purple-500 shadow-purple-500/20 shadow-lg' 
                : 'bg-slate-900/50 border-slate-700 hover:border-slate-600'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-start gap-3">
              <Icon icon="ph:star" className="w-6 h-6 text-purple-400 mt-0.5" />
              <div>
                <p className="font-medium text-purple-400">
                  Это вознаграждение за важное, успешное действие?
                </p>
                <p className="text-sm text-gray-400 mt-1">
                  Завершение покупки, достижение цели, первый вход
                </p>
              </div>
            </div>
          </motion.button>
        </div>

        <AnimatePresence>
          {selectedType && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6"
            >
              {selectedType === 'comfort' ? (
                <div className="p-4 bg-blue-900/20 rounded-lg border border-blue-800/50">
                  <h5 className="font-medium text-blue-400 mb-3">
                    Ваша цель — Комфорт
                  </h5>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li className="flex items-start gap-2">
                      <Icon icon="ph:lightning" className="w-4 h-4 mt-0.5 text-blue-400" />
                      <span><strong>Скорость:</strong> 100-200мс максимум</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon icon="ph:eye" className="w-4 h-4 mt-0.5 text-blue-400" />
                      <span><strong>Ясность:</strong> Очевидное изменение состояния</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon icon="ph:repeat" className="w-4 h-4 mt-0.5 text-blue-400" />
                      <span><strong>Предсказуемость:</strong> Всегда одинаковое поведение</span>
                    </li>
                  </ul>
                  <p className="mt-3 text-blue-300 font-medium">
                    Сделайте ее почти невидимой.
                  </p>
                </div>
              ) : (
                <div className="p-4 bg-purple-900/20 rounded-lg border border-purple-800/50">
                  <h5 className="font-medium text-purple-400 mb-3">
                    Ваша цель — Восторг
                  </h5>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li className="flex items-start gap-2">
                      <Icon icon="ph:sparkle" className="w-4 h-4 mt-0.5 text-purple-400" />
                      <span><strong>Выразительность:</strong> 300-500мс для полного эффекта</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon icon="ph:heart" className="w-4 h-4 mt-0.5 text-purple-400" />
                      <span><strong>Эмоциональность:</strong> Частицы, трансформации, цвет</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon icon="ph:crown" className="w-4 h-4 mt-0.5 text-purple-400" />
                      <span><strong>Уместность:</strong> Только для особых моментов</span>
                    </li>
                  </ul>
                  <p className="mt-3 text-purple-300 font-medium">
                    Сделайте ее запоминающейся. Но используйте редко.
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <div className="prose prose-invert max-w-none">
      <h2 className="mb-8 text-3xl font-bold text-purple-400">
        Душа в Деталях — Микроанимации как Язык Обратной Связи
      </h2>

      {/* Вступление */}
      <div className="p-6 mb-8 bg-orange-900/20 rounded-lg border border-orange-800/50">
        <p className="text-lg text-orange-300 mb-4">
          <Icon icon="ph:warning" className="inline w-6 h-6 mr-2" />
          <strong>Исходное заблуждение:</strong> Микроанимации — это "вишенка на торте". 
          Это декоративные элементы, которые делают интерфейс "живым" и "прикольным". 
          Их можно добавить в конце, если останется время.
        </p>
        <p className="text-gray-300 mb-0">
          Правда в том, что ощущение "качества" и "отзывчивости" продукта на 80% создается не большими анимациями. 
          Оно создается крошечными, почти невидимыми движениями, которые происходят в ответ на каждое ваше действие.
        </p>
      </div>

      {/* Главная идея */}
      <div className="p-6 mb-12 bg-purple-900/20 rounded-lg border border-purple-700/50">
        <h3 className="text-2xl font-semibold text-purple-400 mb-4">
          Новая идея: Микроанимации — это фундаментальный слой обратной связи
        </h3>
        <p className="text-lg text-gray-200">
          Микроанимации — это не декор. Это <strong className="text-purple-400">кровеносная система</strong> вашего интерфейса. 
          Они — это короткие, невербальные ответы на невысказанные вопросы пользователя. 
          Их главная цель — не "оживить", а <strong className="text-purple-400">информировать и подтверждать</strong>, 
          делая взаимодействие плавным и предсказуемым.
        </p>
      </div>

      {/* Таблица вопросов */}
      <QuestionsTable />

      {/* Два лагеря */}
      <div className="mb-12">
        <h3 className="text-2xl font-semibold text-purple-300 mb-6">
          Два Лагеря Микроанимаций: Комфорт vs. Информативность
        </h3>
        <p className="text-gray-300 mb-8">
          Здесь и кроется главное противоречие, которое мы должны решить. 
          Мы всегда балансируем на грани между двумя целями:
        </p>

        <ComfortAnimationsDemo />
        <DelightAnimationsDemo />
      </div>

      {/* Демо ошибок */}
      <div className="mb-12">
        <h3 className="text-2xl font-semibold text-purple-300 mb-6">
          Обратная связь при ошибках
        </h3>
        <ErrorDemo />
      </div>

      {/* Анти-паттерны */}
      <div className="mb-12">
        <BadPracticeDemo />
      </div>

      {/* Чек-лист */}
      <div className="mb-12">
        <DecisionChecklist />
      </div>

      {/* Финальный вердикт */}
      <div className="mt-12 p-8 bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-lg border border-purple-700/50">
        <h3 className="text-2xl font-bold text-purple-300 mb-6">
          Вердикт: Ваша Новая Ментальная Модель
        </h3>
        
        <div className="p-4 bg-purple-800/20 rounded-lg mb-6">
          <p className="text-lg text-purple-200 font-medium mb-0">
            Микроанимации — это не декор. 
            Это <strong className="text-purple-400">самый важный слой вашего интерфейса</strong>, 
            отвечающий за качество ощущений.
          </p>
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex items-start gap-3 p-3 bg-blue-900/20 rounded-lg">
            <Icon icon="ph:hand-heart" className="w-6 h-6 text-blue-400 mt-0.5" />
            <div>
              <span className="font-medium text-blue-400">95% — Анимации Комфорта</span>
              <p className="text-gray-300 text-sm mt-1">
                Быстрые, предсказуемые, утилитарные. Почти невидимые.
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3 p-3 bg-purple-900/20 rounded-lg">
            <Icon icon="ph:sparkle" className="w-6 h-6 text-purple-400 mt-0.5" />
            <div>
              <span className="font-medium text-purple-400">5% — Анимации Восторга</span>
              <p className="text-gray-300 text-sm mt-1">
                Эмоциональные, запоминающиеся. Используйте как специю — редко.
              </p>
            </div>
          </div>
        </div>

        <p className="text-lg text-gray-200 italic text-center">
          Хороший продукт — это не тот, где все "летает и взрывается".<br/>
          Это тот, где каждое, даже самое мелкое взаимодействие,<br/>
          ощущается <strong className="text-purple-400">надежным, предсказуемым и легким</strong>.<br/>
          Эту работу делают именно микроанимации "Комфорта".
        </p>
      </div>
    </div>
  );
};

export default MicroAnimations;
