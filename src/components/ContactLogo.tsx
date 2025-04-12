import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const ContactLogo = () => {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current) return

    // Базовая пульсация внешнего круга
    gsap.to('.outer-circle', {
      scale: 1.1,
      opacity: 0.8,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
    })

    // Анимация соединительных линий
    gsap.to('.connection-line', {
      strokeDashoffset: -30,
      duration: 2,
      repeat: -1,
      ease: 'none',
      stagger: {
        each: 0.3,
        repeat: -1,
      },
    })

    // Анимация сигнальных точек
    gsap.to('.signal-point', {
      scale: 1.5,
      opacity: 0,
      duration: 1,
      repeat: -1,
      stagger: {
        each: 0.2,
        repeat: -1,
      },
      ease: 'power1.out',
    })

    // Анимация центральной иконки
    const iconAnimation = gsap.timeline({ repeat: -1 })
    iconAnimation
      .to('.message-icon', {
        y: -5,
        duration: 1,
        ease: 'power1.inOut',
      })
      .to('.message-icon', {
        y: 5,
        duration: 1,
        ease: 'power1.inOut',
      })

    // Анимация волн
    gsap.to('.wave', {
      scale: 2,
      opacity: 0,
      duration: 2,
      stagger: {
        each: 0.5,
        repeat: -1,
      },
      ease: 'power1.out',
    })

    // Реакция на движение мыши
    const handleMouseMove = (e: MouseEvent) => {
      const bounds = svgRef.current?.getBoundingClientRect()
      if (!bounds) return

      const x = (e.clientX - bounds.left - bounds.width / 2) * 0.1
      const y = (e.clientY - bounds.top - bounds.height / 2) * 0.1

      gsap.to('.logo-content', {
        rotateX: -y,
        rotateY: x,
        duration: 0.5,
        ease: 'power2.out',
      })

      // Смещение соединительных линий
      gsap.to('.connection-group', {
        x: x * 0.5,
        y: y * 0.5,
        duration: 0.5,
      })
    }

    const svgElement = svgRef.current
    svgElement.addEventListener('mousemove', handleMouseMove)

    return () => {
      svgElement.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <svg ref={svgRef} viewBox="0 0 400 400" className="w-64 h-64 mx-auto">
      <defs>
        <linearGradient id="contact-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4318FF" />
          <stop offset="100%" stopColor="#9333EA" />
        </linearGradient>

        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>

        <filter id="wave-blur">
          <feGaussianBlur stdDeviation="2" />
        </filter>
      </defs>

      <g className="logo-content" transform="translate(200 200)">
        {/* Волны связи */}
        {[1, 2, 3].map(i => (
          <circle
            key={i}
            className="wave"
            r={30 + i * 10}
            fill="none"
            stroke="url(#contact-gradient)"
            strokeWidth="1"
            opacity="0.3"
            filter="url(#wave-blur)"
          />
        ))}

        {/* Основной круг */}
        <circle
          className="outer-circle"
          r="60"
          fill="none"
          stroke="url(#contact-gradient)"
          strokeWidth="2"
          filter="url(#glow)"
        />

        {/* Точки соединения */}
        <g className="connection-group">
          {[0, 60, 120, 180, 240, 300].map(angle => {
            const x = 50 * Math.cos((angle * Math.PI) / 180)
            const y = 50 * Math.sin((angle * Math.PI) / 180)
            return (
              <g key={angle}>
                <circle
                  className="signal-point"
                  cx={x}
                  cy={y}
                  r="4"
                  fill="url(#contact-gradient)"
                  filter="url(#glow)"
                />
                <path
                  className="connection-line"
                  d={`M ${x * 0.6} ${y * 0.6} L ${x} ${y}`}
                  stroke="url(#contact-gradient)"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  opacity="0.6"
                />
              </g>
            )
          })}
        </g>

        {/* Центральная иконка */}
        <g className="message-icon">
          <rect x="-20" y="-15" width="40" height="30" rx="5" fill="url(#contact-gradient)" filter="url(#glow)" />
          <path d="M -15 -5 L 0 5 L 15 -5" stroke="white" strokeWidth="2" fill="none" />
        </g>

        {/* Декоративные элементы */}
        <circle r="25" fill="url(#contact-gradient)" opacity="0.1" />
        <circle r="35" fill="none" stroke="url(#contact-gradient)" strokeWidth="1" opacity="0.3" />
      </g>
    </svg>
  )
}

export default ContactLogo
