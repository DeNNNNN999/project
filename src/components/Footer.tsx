import { motion, useMotionValue, useTransform } from 'motion/react';
import { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';

const navigationLinks = [
  { name: 'Главная', href: '#home', icon: 'ph:house-bold' },
  { name: 'Проекты', href: '#projects', icon: 'ph:code-bold' },
  { name: 'Навыки', href: '#skills', icon: 'ph:lightning-bold' },
  { name: 'Контакты', href: '#contact', icon: 'ph:chats-bold' }
];

const socialLinks = [
  { icon: 'mdi:github', link: 'https://github.com/DeNNNNN999', color: '#6e5494' },
  { icon: 'logos:telegram', link: 'https://t.me/Javascriptov_CPP_Pythonovich', color: '#26A5E4' },
  { icon: 'simple-icons:leetcode', link: 'https://leetcode.com/u/DeNN999/', color: '#FFA116' },
  { icon: 'simple-icons:codewars', link: 'https://www.codewars.com/users/DeNNxD', color: '#B1361E' }
];

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [isVisible, setIsVisible] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Градиент следующий за мышью
  const gradientX = useTransform(mouseX, [0, window.innerWidth], ['0%', '100%']);
  const gradientY = useTransform(mouseY, [0, window.innerHeight], ['0%', '100%']);

  useEffect(() => {
    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <footer className="relative bg-[#0B1120] overflow-hidden">
      {/* Анимированный градиентный фон */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle 800px at ${gradientX} ${gradientY}, rgba(59, 130, 246, 0.15), transparent 50%)`
          }}
        />

        {/* Волновой паттерн */}
        <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <motion.path
            fill="rgba(59, 130, 246, 0.05)"
            fillOpacity="1"
            initial={{ d: "M0,320L48,304C96,288,192,256,288,224C384,192,480,160,576,165.3C672,171,768,213,864,229.3C960,245,1056,235,1152,213.3C1248,192,1344,160,1392,144L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" }}
            animate={{
              d: [
                "M0,320L48,304C96,288,192,256,288,224C384,192,480,160,576,165.3C672,171,768,213,864,229.3C960,245,1056,235,1152,213.3C1248,192,1344,160,1392,144L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                "M0,320L48,288C96,256,192,192,288,176C384,160,480,192,576,208C672,224,768,224,864,197.3C960,171,1056,117,1152,117.3C1248,117,1344,171,1392,197.3L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                "M0,320L48,304C96,288,192,256,288,224C384,192,480,160,576,165.3C672,171,768,213,864,229.3C960,245,1056,235,1152,213.3C1248,192,1344,160,1392,144L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              ]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </svg>

        {/* Сетка */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
            backgroundSize: '30px 30px'
          }}
        />
      </div>

      {/* Градиентная линия сверху */}
      <motion.div
        className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />

      <div className="relative z-10 px-4 py-12 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Левая колонка - Лого и описание */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            {/* Анимированный логотип */}
            <motion.div
              className="inline-block"
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-3xl font-bold">
                <span className="text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text">
                  DeNNNNN999
                </span>
              </h3>
            </motion.div>

            <p className="text-gray-400 text-sm">
              Full-Stack разработчик, создающий современные веб-приложения
              с использованием передовых технологий
            </p>

            {/* Статус */}
            <motion.div
              className="flex items-center gap-2"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="w-2 h-2 bg-green-400 rounded-full" />
              <span className="text-sm text-green-400">Открыт для предложений</span>
            </motion.div>
          </motion.div>

          {/* Центральная колонка - Навигация */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <h4 className="text-lg font-semibold text-white">Навигация</h4>
            <div className="grid grid-cols-2 gap-3">
              {navigationLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-2 text-gray-400 hover:text-white transition-all group"
                >
                  <Icon
                    icon={link.icon}
                    className="w-4 h-4 group-hover:scale-110 transition-transform"
                  />
                  <span>{link.name}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Правая колонка - Социальные сети */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-4"
          >
            <h4 className="text-lg font-semibold text-white">Связаться</h4>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.icon}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.5 + index * 0.1, type: "spring" }}
                  whileHover={{ y: -5, scale: 1.2 }}
                  className="relative group"
                >
                  <motion.div
                    className="absolute inset-0 rounded-full blur-md opacity-0 group-hover:opacity-70 transition-opacity"
                    style={{ backgroundColor: social.color }}
                  />
                  <div className="relative p-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 group-hover:border-white/40 transition-all">
                    <Icon icon={social.icon} className="w-5 h-5 text-white" />
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Разделитель */}
        <motion.div
          className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent my-8"
          initial={{ scaleX: 0 }}
          animate={isVisible ? { scaleX: 1 } : {}}
          transition={{ duration: 1, delay: 0.6 }}
        />

        {/* Copyright и дополнительная информация */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <div className="flex flex-wrap items-center gap-2 text-sm text-gray-400">
            <span>© {currentYear}</span>
            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              DeNNNNN999
            </span>
            <span>•</span>
            <span>Все права защищены</span>
          </div>

          <div className="flex items-center gap-4 text-sm">
            <motion.button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <span>Наверх</span>
              <Icon icon="ph:arrow-up-bold" className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>

        {/* Финальная анимация */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ delay: 1 }}
        >
          <p className="text-xs text-gray-600">
             <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="inline-block text-red-500"
            ></motion.span>
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
