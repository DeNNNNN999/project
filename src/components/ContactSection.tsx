import { useEffect, useRef } from 'react'
import { motion } from 'motion/react'
import { Icon } from '@iconify/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ContactLogo from './ContactLogo'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const contacts = [
  {
    title: 'Email',
    value: 'dennface@mail.ru',
    icon: 'logos:google-gmail',
    link: 'mailto:fannymoments@mail.ru',
    delay: 0.2,
  },
  {
    title: 'Telegram',
    value: '@Javascriptov_CPP_Pythonovich',
    icon: 'logos:telegram',
    link: 'https://t.me/Javascriptov_CPP_Pythonovich',
    delay: 0.4,
  },
]

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const backgroundRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Анимация фонового градиента
    const gradientAnimation = gsap.timeline({
      repeat: -1,
      yoyo: true,
    })

    gradientAnimation
      .to('.background-gradient', {
        backgroundPosition: '200% 200%',
        duration: 10,
        ease: 'none',
      })
      .to('.background-gradient', {
        backgroundPosition: '0% 0%',
        duration: 10,
        ease: 'none',
      })

    // Анимация фона при скролле
    gsap.to('.parallax-bg', {
      y: '30%',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
    })

    return () => {
      gradientAnimation.kill()
    }
  }, [])

  return (
    <section ref={sectionRef} id="contact" className="relative py-20 overflow-hidden bg-[#0B1120]">
      {/* Parallax Background */}
      <div className="absolute inset-0 parallax-bg">
        <div className="absolute inset-0 bg-grid-diagonal opacity-10" />
      </div>

      {/* Animated Gradient Background */}
      <div
        ref={backgroundRef}
        className="absolute inset-0 background-gradient"
        style={{
          background: 'linear-gradient(120deg, rgba(59,130,246,0.1), rgba(147,51,234,0.1), rgba(59,130,246,0.1))',
          backgroundSize: '200% 200%',
          filter: 'blur(100px)',
        }}
      />

      {/* Основной градиентный фон */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-blue-900/50 to-slate-900/80 backdrop-blur-md" />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent animate-gradient-shift" />

      {/* Контент */}
      <div className="relative z-10 px-4 mx-auto max-w-7xl">
        <div className="text-center">
          <div className="mb-8">
            <ContactLogo />
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 text-4xl font-bold text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text">
            Связаться со мной
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="max-w-2xl mx-auto mb-12 text-gray-400">
            Выберите удобный способ для связи, и я отвечу вам в ближайшее время
          </motion.p>
        </div>

        <div className="grid max-w-2xl grid-cols-1 gap-8 mx-auto md:grid-cols-2">
          {contacts.map(contact => (
            <motion.a
              key={contact.title}
              href={contact.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: contact.delay }}
              whileHover={{ scale: 1.05 }}
              className="relative p-6 overflow-hidden border group rounded-2xl backdrop-blur-sm border-slate-700/50 bg-gradient-to-br from-slate-800/50 to-slate-900/50">
              {/* Эффект свечения при наведении */}
              <div
                className="absolute inset-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-transparent rounded-2xl"
              />

              <div className="relative flex items-center gap-4">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="p-3 transition-colors rounded-xl bg-blue-500/10 group-hover:bg-blue-500/20">
                  <Icon icon={contact.icon} className="w-8 h-8" />
                </motion.div>
                <div className="text-left">
                  <h3 className="mb-1 text-lg font-semibold text-white">{contact.title}</h3>
                  <p className="text-gray-400">{contact.value}</p>
                </div>
                <Icon
                  icon="ph:arrow-up-right"
                  className="absolute w-6 h-6 text-gray-400 transition-all -translate-y-1/2 opacity-0 top-1/2 right-4 group-hover:opacity-100 group-hover:translate-x-1"
                />
              </div>

              {/* Нижняя градиентная линия */}
              <div className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-blue-500/0 via-blue-500/50 to-blue-500/0" />
            </motion.a>
          ))}
        </div>

        {/* Нижние соц.сети */}
        <div className="flex justify-center gap-6 mt-16">
          <motion.a
            href="https://github.com/JavascriptovPythonovich"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, rotate: 360 }}
            className="text-gray-400 transition-colors hover:text-white">
            <Icon icon="mdi:github" className="w-8 h-8" />
          </motion.a>
          <motion.a
            href="https://linkedin.com/in/javascriptov-cpp-pythonovich"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, rotate: 360 }}
            className="text-gray-400 transition-colors hover:text-white">
            <Icon icon="mdi:linkedin" className="w-8 h-8" />
          </motion.a>
        </div>
      </div>
    </section>
  )
}

export default ContactSection
