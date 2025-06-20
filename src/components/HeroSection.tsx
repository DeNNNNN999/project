import React, { useRef, useState, useEffect, useCallback, useMemo, memo } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from 'motion/react';
import { Icon } from '@iconify/react';
import avatarImage from '../assets/pppp.jpg';


// Типы
interface SocialLink {
  icon: string;
  name: string;
  link: string;
  color: string;
}

const SOCIAL_LINKS: SocialLink[] = [
  { icon: "simple-icons:leetcode", name: "LeetCode", link: "https://leetcode.com/u/DeNN999/", color: "#FFA116" },
  { icon: "simple-icons:codewars", name: "CodeWars", link: "https://www.codewars.com/users/DeNNxD", color: "#B1361E" },
  { icon: "mdi:github", name: "GitHub", link: "https://github.com/DeNNNNN999", color: "#6e5494" },
];

// Анимированный текст без постоянной анимации градиента
const AnimatedText = memo(({ text, delay = 0, gradient = "from-fuchsia-500 via-purple-500 to-violet-500" }: any) => {
  return (
    <motion.span
      className={`inline-block text-transparent bg-gradient-to-r ${gradient} bg-clip-text`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
    >
      {text}
    </motion.span>
  );
});

AnimatedText.displayName = 'AnimatedText';

// Оптимизированный Typewriter
const TypewriterText = memo(({ words }: { words: string[] }) => {
  const [currentWord, setCurrentWord] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const word = words[currentWord];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (currentText.length < word.length) {
          setCurrentText(word.slice(0, currentText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (currentText.length > 0) {
          setCurrentText(currentText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentWord((prev) => (prev + 1) % words.length);
        }
      }
    }, isDeleting ? 50 : 150);

    return () => clearTimeout(timeout);
  }, [currentText, currentWord, isDeleting, words]);

  return (
    <span className="relative text-transparent bg-gradient-to-r from-fuchsia-500 via-purple-500 to-violet-500 bg-clip-text">
      {currentText}
      <motion.span
        className="absolute -right-8 top-0 text-white"
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
      >
        |
      </motion.span>
    </span>
  );
});

TypewriterText.displayName = 'TypewriterText';

// Упрощенная кнопка
const SimpleButton = memo(({ children, primary = true, onClick }: any) => {
  return (
    <motion.button
      onClick={onClick}
      className={`px-6 py-3 rounded-full flex items-center gap-2 font-medium transition-all ${
        primary
          ? 'bg-gradient-to-r from-fuchsia-500/20 to-purple-500/20 backdrop-blur-sm border border-fuchsia-500/30 text-white hover:bg-fuchsia-500/30 hover:shadow-lg hover:shadow-fuchsia-500/20'
          : 'bg-transparent border-2 border-fuchsia-500/30 text-fuchsia-300 hover:text-white hover:bg-fuchsia-500/10'
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  );
});

SimpleButton.displayName = 'SimpleButton';

// Статус доступности
const AvailabilityStatus = memo(() => {
  return (
    <motion.div
      className="inline-flex items-center gap-2 px-4 py-2 bg-fuchsia-500/10 border border-fuchsia-500/30 rounded-full"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.3 }}
    >
      <motion.div
        className="w-2 h-2 bg-fuchsia-400 rounded-full"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [1, 0.5, 1]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <span className="text-sm text-fuchsia-300">Доступен для работы</span>
    </motion.div>
  );
});

AvailabilityStatus.displayName = 'AvailabilityStatus';

// Сильно упрощенный аватар
const OptimizedAvatar = memo(() => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, type: "spring" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Простое свечение при наведении */}
      <motion.div
        className="absolute -inset-4 rounded-full bg-gradient-to-r from-fuchsia-500/50 to-purple-500/50 opacity-0 blur-xl"
        animate={{ opacity: isHovered ? 0.4 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Один вращающийся круг */}
      <motion.div
        className="absolute -inset-8 rounded-full border border-purple-500/10"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      />

      {/* Основной контейнер аватара */}
      <motion.div
        className="relative w-[300px] h-[300px] md:w-[350px] md:h-[350px]"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <div className="w-full h-full p-2 rounded-full bg-gradient-to-br from-fuchsia-500 via-purple-500 to-violet-600">
          <div className="relative w-full h-full overflow-hidden rounded-full bg-slate-900">
            <img
              src={avatarImage}
              alt="Avatar"
              className="object-cover w-full h-full"
              loading="eager"
            />

            {/* Легкий блик */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
});

OptimizedAvatar.displayName = 'OptimizedAvatar';

// Social Button
const SocialButton = memo(({ icon, name, link, color }: SocialLink) => {
  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-white rounded-lg transition-all hover:bg-white/5"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Icon icon={icon} className="w-5 h-5" style={{ color }} />
      <span className="font-medium">{name}</span>
    </motion.a>
  );
});

SocialButton.displayName = 'SocialButton';

// Главный компонент HeroSection
const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, -100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const handleDownloadResume = useCallback(() => {
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  const typewriterWords = useMemo(() => [
    "Full-Stack Developer",
    "Problem Solver",
    "UI/UX Enthusiast"
  ], []);

  return (
  <section id="home" className="relative min-h-screen overflow-hidden" ref={containerRef}>
  {/* Контент */}
      <motion.div
        className="relative z-20 flex flex-col items-center justify-center min-h-screen px-4 mx-auto md:flex-row max-w-7xl gap-12"
        style={{ y, opacity }}
      >
        {/* Левая часть с текстом */}
        <div className="w-full space-y-6 md:w-1/2">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <motion.div
              className="inline-block px-4 py-1 mb-4 text-sm font-medium text-fuchsia-300 border rounded-full bg-fuchsia-900/20 border-fuchsia-700/30"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="mr-2">👋</span>
            </motion.div>

            <h1 className="text-5xl font-bold leading-tight md:text-6xl">
              <AnimatedText text="Full-Stack" delay={0.3} />
              <br />
              <AnimatedText text="Developer" delay={0.5} gradient="from-violet-500 via-purple-500 to-fuchsia-500" />
            </h1>

            {/* Typewriter под основным заголовком */}
            <div className="text-2xl font-medium mt-4">
              <span className="text-gray-400">Я </span>
              <TypewriterText words={typewriterWords} />
            </div>

            <div className="pt-2">
              <AvailabilityStatus />
            </div>
          </motion.div>

          <motion.p
            className="max-w-lg text-lg text-slate-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            Я <span className="font-semibold text-fuchsia-400">DeNN999</span>, создающий современные и
            функциональные веб-приложения. Мой стек включает React, TypeScript, Node.js и современные инструменты
            разработки.
          </motion.p>

          {/* Социальные кнопки */}
          <motion.div
            className="flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            {SOCIAL_LINKS.map(social => (
              <SocialButton key={social.name} {...social} />
            ))}
          </motion.div>

          {/* CTA кнопки */}
          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.5 }}
          >
            <SimpleButton onClick={handleDownloadResume} primary={true}>
              <Icon icon="mdi:download" className="w-5 h-5" />
              <span>Скачать Резюме</span>
            </SimpleButton>

            <SimpleButton
              onClick={() => window.open('https://hh.ru/applicant/resumes/view?resume=your_resume_id', '_blank')}
              primary={false}
            >
              <Icon icon="mdi:file-document" className="w-5 h-5" />
              <span>Резюме на HH.ru</span>
            </SimpleButton>
          </motion.div>
        </div>

        {/* Правая часть с аватаром */}
        <div className="flex items-center justify-center w-full md:w-1/2">
          <OptimizedAvatar />
        </div>
      </motion.div>

      {/* Индикатор скролла */}
      <motion.div
        className="absolute flex flex-col items-center gap-2 transform -translate-x-1/2 bottom-10 left-1/2 text-slate-400"
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      >
        <span className="text-sm">Скролл вниз</span>
        <Icon icon="mdi:chevron-down" className="w-5 h-5" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
