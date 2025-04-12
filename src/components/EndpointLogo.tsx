import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const EndpointLogo = () => {
  const svgRef = useRef<SVGSVGElement>(null)
  const cursorRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    if (!svgRef.current) return

    // Вращение внешних колец
    gsap.to('.outer-ring', {
      rotate: 360,
      duration: 30,
      repeat: -1,
      ease: 'none',
    })

    gsap.to('.middle-ring', {
      rotate: -360,
      duration: 20,
      repeat: -1,
      ease: 'none',
    })

    // Анимация рун
    gsap.to('.rune', {
      opacity: gsap.utils.wrap([0.3, 0.8]),
      duration: 'random(1, 2)',
      stagger: {
        each: 0.1,
        repeat: -1,
        yoyo: true,
      },
    })

    // Пульсация радужки
    const pulseIris = gsap.timeline({
      repeat: -1,
      yoyo: true,
    })

    pulseIris
      .to('.iris', {
        scale: 1.1,
        duration: 2,
        ease: 'power1.inOut',
      })
      .to(
        '.energy-lines',
        {
          strokeWidth: 2.5,
          opacity: 0.8,
          duration: 2,
          ease: 'power1.inOut',
        },
        0,
      )

    // Следящий эффект при движении мыши
    const handleMouseMove = (e: MouseEvent) => {
      const bounds = svgRef.current?.getBoundingClientRect()
      if (!bounds) return

      const x = ((e.clientX - bounds.left - bounds.width / 2) / bounds.width) * 2
      const y = ((e.clientY - bounds.top - bounds.height / 2) / bounds.height) * 2

      cursorRef.current = { x, y }

      // Движение зрачка
      gsap.to('.pupil', {
        x: x * 10,
        y: y * 10,
        duration: 0.5,
        ease: 'power2.out',
      })

      // Искажение радужки
      gsap.to('.iris-distort', {
        attr: {
          rx: 30 - Math.abs(x) * 5,
          ry: 30 - Math.abs(y) * 5,
        },
        duration: 0.5,
      })

      // Наклон всей структуры
      gsap.to('.oculus-group', {
        rotateX: -y * 20,
        rotateY: x * 20,
        duration: 0.5,
        ease: 'power2.out',
      })
    }

    // Генерация энергетических линий
    const createEnergyLines = () => {
      const lines = document.querySelectorAll('.energy-line')
      lines.forEach(line => {
        gsap.to(line, {
          strokeDashoffset: -20,
          duration: gsap.utils.random(1, 2),
          repeat: -1,
          ease: 'none',
        })
      })
    }

    createEnergyLines()

    // Анимация данных в радужке
    gsap.to('.data-particle', {
      rotate: 360,
      duration: 'random(2, 4)',
      repeat: -1,
      ease: 'none',
      stagger: {
        each: 0.1,
        from: 'random',
      },
    })

    const element = svgRef.current
    element.addEventListener('mousemove', handleMouseMove)

    return () => {
      element.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <svg ref={svgRef} viewBox="0 0 200 200" className="w-32 h-32 mx-auto cursor-pointer">
      <defs>
        <linearGradient id="eye-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4318FF" />
          <stop offset="100%" stopColor="#9333EA" />
        </linearGradient>

        <radialGradient id="iris-gradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#4318FF" />
          <stop offset="70%" stopColor="#9333EA" />
          <stop offset="100%" stopColor="#2D3748" />
        </radialGradient>

        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      <g className="oculus-group" transform="translate(100 100)" style={{ transformStyle: 'preserve-3d' }}>
        {/* Внешнее кольцо с рунами */}
        <g className="outer-ring">
          {Array.from({ length: 24 }).map((_, i) => (
            <g key={i} transform={`rotate(${i * 15})`}>
              <text
                className="rune"
                x="0"
                y="-60"
                fill="url(#eye-gradient)"
                fontSize="8"
                textAnchor="middle"
                opacity="0.6">
                {['/', '\\', '{', '}', '<', '>', '*', '|'][i % 8]}
              </text>
            </g>
          ))}
        </g>

        {/* Среднее кольцо с энергетическими линиями */}
        <g className="middle-ring">
          {Array.from({ length: 36 }).map((_, i) => (
            <line
              key={i}
              className="energy-line"
              x1="0"
              y1="-45"
              x2="0"
              y2="-40"
              stroke="url(#eye-gradient)"
              strokeWidth="2"
              strokeDasharray="3 3"
              transform={`rotate(${i * 10})`}
            />
          ))}
        </g>

        {/* Радужка */}
        <g className="iris" filter="url(#glow)">
          <ellipse className="iris-distort" rx="30" ry="30" fill="url(#iris-gradient)" />

          {/* Частицы данных в радужке */}
          {Array.from({ length: 12 }).map((_, i) => {
            const radius = 15
            const angle = (i * Math.PI * 2) / 12
            return (
              <g
                key={i}
                className="data-particle"
                transform={`translate(${radius * Math.cos(angle)} ${radius * Math.sin(angle)})`}>
                <circle r="2" fill="#4318FF" opacity="0.6" />
                <line x1="-2" y1="0" x2="2" y2="0" stroke="#9333EA" strokeWidth="0.5" />
              </g>
            )
          })}
        </g>

        {/* Зрачок */}
        <g className="pupil">
          <circle r="10" fill="#2D3748" filter="url(#glow)" />
          <circle r="8" fill="#1A202C" />
          <circle r="2" fill="#4318FF" className="inner-glow" filter="url(#glow)" />
        </g>

        {/* Энергетические линии вокруг зрачка */}
        <g className="energy-lines">
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i * Math.PI * 2) / 8
            return (
              <line
                key={i}
                x1={8 * Math.cos(angle)}
                y1={8 * Math.sin(angle)}
                x2={12 * Math.cos(angle)}
                y2={12 * Math.sin(angle)}
                stroke="url(#eye-gradient)"
                strokeWidth="1"
                opacity="0.6"
              />
            )
          })}
        </g>
      </g>
    </svg>
  )
}

export default EndpointLogo
