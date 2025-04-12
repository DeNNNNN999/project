import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'motion/react';
import { Icon } from '@iconify/react';


const AnimatedGradientBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Базовый градиентный фон */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-blue-900/20 to-slate-900"></div>


      <motion.div
        className="absolute inset-0 opacity-20"
        style={{
          background: 'linear-gradient(to right, transparent, rgba(59, 130, 246, 0.3), transparent)',
          height: '200%',
          width: '300%',
          left: '-100%'
        }}
        animate={{
          y: ['0%', '-50%']
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut'
        }}
      />


      <motion.div
        className="absolute inset-0 opacity-10"
        style={{
          background: 'linear-gradient(to right, transparent, rgba(139, 92, 246, 0.3), transparent)',
          height: '200%',
          width: '300%',
          left: '-100%',
          transform: 'rotate(5deg)'
        }}
        animate={{
          y: ['-50%', '0%']
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut'
        }}
      />


      <motion.div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.1) 0%, transparent 50%)',
        }}
        animate={{
          scale: [1, 1.2, 1]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />


      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
        <div className="absolute top-0 bottom-0 left-0 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent"></div>
        <div className="absolute top-0 bottom-0 right-0 w-px bg-gradient-to-b from-transparent via-purple-500 to-transparent"></div>
      </div>
    </div>
  );
};


const AnimatedText = ({ text, delay = 0, gradient = "from-blue-500 via-purple-500 to-pink-500" }) => {
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
};


const GradientButton = ({ children, primary = true, onClick, href }) => {
  return (
    <motion.button
      onClick={onClick}
      className={`relative overflow-hidden px-6 py-3 rounded-full flex items-center gap-2 font-medium text-white ${
        primary
          ? 'bg-gradient-to-r from-blue-500 to-purple-600'
          : 'bg-transparent border-2 border-purple-500'
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >

      {primary && (
        <motion.div
          className="absolute inset-0 opacity-0 bg-gradient-to-r from-purple-600 to-blue-500"
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}


      {!primary && (
        <motion.div
          className="absolute inset-0 opacity-0 bg-purple-500/10"
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}


      <span className="relative z-10">
        {children}
      </span>
    </motion.button>
  );
};


const SocialButton = ({ icon, name, link, color }) => {
  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-white rounded-lg transition-colors`}
      whileHover={{
        scale: 1.05,
        backgroundColor: `${color}20`,
        boxShadow: `0 0 10px ${color}30`
      }}
      whileTap={{ scale: 0.95 }}
    >
      <Icon icon={icon} className="w-5 h-5" style={{ color }} />
      <span className="font-medium">{name}</span>
    </motion.a>
  );
};


const AnimatedAvatar = () => {

  const imageX = useMotionValue(0);
  const imageY = useMotionValue(0);
  const imageRotateX = useTransform(imageY, [-300, 300], [15, -15]);
  const imageRotateY = useTransform(imageX, [-300, 300], [-15, 15]);


  const springConfig = { stiffness: 100, damping: 30 };
  const springX = useSpring(imageRotateX, springConfig);
  const springY = useSpring(imageRotateY, springConfig);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    imageX.set(e.clientX - centerX);
    imageY.set(e.clientY - centerY);
  };

  const resetPosition = () => {
    imageX.set(0);
    imageY.set(0);
  };

  return (
    <div className="relative">

      <div className="absolute -inset-10">

        <motion.div
          className="absolute left-0 w-full h-px top-1/2 bg-blue-500/30"
          style={{
            rotateZ: springY,
            transformOrigin: "center"
          }}
        />
        <motion.div
          className="absolute top-0 w-px h-full left-1/2 bg-blue-500/30"
          style={{
            rotateZ: springX,
            transformOrigin: "center"
          }}
        />


        <motion.div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            rotateZ: useTransform(springX, [-10, 10], [-5, 5]),
            transformOrigin: "center"
          }}
        >
          <div className="absolute top-1/2 left-1/2 w-px h-[150%] bg-purple-500/20 rotate-45 origin-center"></div>
          <div className="absolute top-1/2 left-1/2 w-px h-[150%] bg-purple-500/20 -rotate-45 origin-center"></div>
        </motion.div>
      </div>


      <motion.div
        className="absolute border rounded-full -inset-4 border-blue-500/20"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute border rounded-full -inset-8 border-purple-500/10"
        animate={{ rotate: -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute border rounded-full -inset-12 border-blue-500/5"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      />


      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const radius = 150;
        return (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-blue-500/60"
            style={{
              left: "50%",
              top: "50%",
              boxShadow: "0 0 10px rgba(59, 130, 246, 0.8)"
            }}
            animate={{
              x: Math.cos(angle) * radius,
              y: Math.sin(angle) * radius,
              scale: [1, 1.5, 1],
              opacity: [0.6, 1, 0.6]
            }}
            transition={{
              duration: 4,
              delay: i * 0.5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          />
        );
      })}


      <motion.div
        className="relative w-[420px] h-[420px] md:w-[480px] md:h-[480px]"
        onMouseMove={handleMouseMove}
        onMouseLeave={resetPosition}
        style={{
          perspective: "1000px",
          transformStyle: "preserve-3d",
        }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, type: "spring" }}
      >

        <motion.div
          className="w-full h-full p-2 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500"
          style={{
            rotateX: springX,
            rotateY: springY,
            transformStyle: "preserve-3d"
          }}
          whileHover={{
            boxShadow: "0 0 30px rgba(139, 92, 246, 0.4)"
          }}
        >

          <div className="relative w-full h-full overflow-hidden rounded-full bg-slate-900">

            <img
              src="src/assets/pppp.jpg"
              alt="Avatar"
              className="object-cover w-full h-full"
            />


            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"
              style={{
                mixBlendMode: "overlay",
                transformStyle: "preserve-3d"
              }}
              animate={{
                backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
        </motion.div>


        <motion.div
          className="absolute rounded-full -inset-2 bg-blue-500/0"
          animate={{
            boxShadow: [
              "0 0 0 rgba(59, 130, 246, 0)",
              "0 0 30px rgba(59, 130, 246, 0.6)",
              "0 0 0 rgba(59, 130, 246, 0)"
            ]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 5,
            ease: "easeInOut"
          }}
        />
      </motion.div>
    </div>
  );
};

// Главный компонент HeroSection
const HeroSection = () => {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, -150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="home" className="relative min-h-screen overflow-hidden bg-slate-900" ref={containerRef}>

      <AnimatedGradientBackground />


      <motion.div
        className="relative z-20 flex flex-col items-center justify-center h-screen px-4 mx-auto md:flex-row max-w-7xl"
        style={{ y, opacity }}>

        <div className="w-full py-10 space-y-8 md:w-1/2 md:py-0">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-2">
            <motion.div
              className="inline-block px-4 py-1 mb-4 text-sm font-medium text-blue-300 border rounded-full bg-blue-900/30 border-blue-700/30"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}>
              <span className="mr-2">👋</span> Привет, я Full-Stack разработчик
            </motion.div>

            <h1 className="text-5xl font-bold leading-tight md:text-6xl">
              <AnimatedText text="Full-Stack" delay={0.3} />
              <br />
              <AnimatedText text="Developer" delay={0.5} gradient="from-pink-500 via-purple-500 to-blue-500" />
            </h1>
          </motion.div>

          <motion.p
            className="max-w-lg text-lg text-slate-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}>
            Я <span className="font-semibold text-blue-400">Full-Stack разработчик</span>, создающий современные и
            функциональные веб-приложения. Мой стек включает React, TypeScript, Node.js и современные инструменты
            разработки. Решаю сложные алгоритмические задачи и стремлюсь писать оптимальный код.
          </motion.p>

          <motion.div
            className="relative z-30 flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}>
            <SocialButton
              icon="simple-icons:leetcode"
              name="LeetCode"
              link="https://leetcode.com/u/DeNN999/"
              color="#FFA116"
            />
            <SocialButton
              icon="simple-icons:codewars"
              name="CodeWars"
              link="https://www.codewars.com/users/DeNNxD"
              color="#B1361E"
            />
            <SocialButton icon="mdi:github" name="GitHub" link="https://github.com/DeNNNNN999" color="#6e5494" />
          </motion.div>

          <motion.div
            className="relative z-30 flex flex-wrap gap-4 pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.5 }}>
            <GradientButton onClick={handleDownloadResume} primary={true}>
              <Icon icon="mdi:download" className="w-5 h-5" />
              <span>Скачать Резюме</span>
            </GradientButton>

            <GradientButton
              onClick={() => window.open('https://hh.ru/applicant/resumes/view?resume=your_resume_id', '_blank')}
              primary={false}>
              <Icon icon="mdi:file-document" className="w-5 h-5" />
              <span>Резюме на HH.ru</span>
            </GradientButton>
          </motion.div>
        </div>


        <div className="flex items-center justify-center w-full pt-10 md:w-1/2 md:pt-0">
          <AnimatedAvatar />
        </div>
      </motion.div>


      <motion.div
        className="absolute flex flex-col items-center gap-2 transform -translate-x-1/2 bottom-10 left-1/2 text-slate-400"
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: 'reverse',
        }}>
        <span className="text-sm">Скролл вниз</span>
        <Icon icon="mdi:chevron-down" className="w-5 h-5" />
      </motion.div>
    </section>
  )
};

export default HeroSection;
