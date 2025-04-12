import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { Icon } from '@iconify/react'

const ICONS = ['logos:react', 'logos:typescript-icon', 'logos:nodejs-icon', 'logos:postgresql', 'logos:docker-icon']

const generateRingSegments = (count: number, radius: number) => {
  const segments = []
  const angleStep = (2 * Math.PI) / count

  for (let i = 0; i < count; i++) {
    const startAngle = i * angleStep
    const endAngle = (i + 0.85) * angleStep // Оставляем небольшой зазор между сегментами

    const startX = radius * Math.cos(startAngle)
    const startY = radius * Math.sin(startAngle)
    const endX = radius * Math.cos(endAngle)
    const endY = radius * Math.sin(endAngle)

    segments.push({
      id: i,
      path: `M ${startX} ${startY} A ${radius} ${radius} 0 0 1 ${endX} ${endY}`,
      rotation: (i * 360) / count,
    })
  }

  return segments
}

const Logo3DProjects = () => {
  const svgRef = useRef<SVGSVGElement>(null)
  const currentIconIndex = useRef(0)

  useEffect(() => {
    if (!svgRef.current) return

    gsap.set(['.torus-group', '.particles'], {
      transformOrigin: 'center',
      transformPerspective: 1000,
    })

    // Анимация сегментов кольца
    const segments = document.querySelectorAll('.ring-segment')
    segments.forEach((segment, i) => {
      const tl = gsap.timeline({
        repeat: -1,
        defaults: { ease: 'power2.inOut' },
      })

      const delay = i * 0.1
      const baseRotation = parseInt(segment.getAttribute('data-rotation') || '0')

      tl.to(segment, {
        rotation: baseRotation + 30,
        duration: 2,
        delay: delay,
      })
        .to(segment, {
          rotation: baseRotation - 30,
          duration: 2,
        })
        .to(segment, {
          rotation: baseRotation,
          duration: 2,
        })

      // Добавляем случайные "сбои" в анимации
      setInterval(() => {
        gsap.to(segment, {
          rotation: baseRotation + gsap.utils.random(-60, 60),
          duration: 0.3,
          ease: 'power4.out',
          onComplete: () => {
            gsap.to(segment, {
              rotation: baseRotation,
              duration: 0.5,
              ease: 'elastic.out(1, 0.3)',
            })
          },
        })
      }, gsap.utils.random(3000, 6000))
    })

    // Анимация потоков данных
    gsap.to('.data-flow', {
      strokeDashoffset: -20,
      duration: 1,
      repeat: -1,
      ease: 'none',
      stagger: {
        each: 0.1,
        repeat: -1,
      },
    })

    // Пульсация ядра
    const pulseCore = gsap.timeline({
      repeat: -1,
      yoyo: true,
      defaults: { ease: 'power2.inOut' },
    })

    pulseCore
      .to('.core-rings circle', {
        scale: 1.1,
        duration: 1,
        stagger: {
          from: 'center',
          amount: 0.3,
        },
      })
      .to(
        '.core-glow',
        {
          opacity: 0.8,
          scale: 1.2,
          duration: 1,
          stagger: {
            from: 'center',
            amount: 0.3,
          },
        },
        '<',
      )

    // Эмиссия частиц
    const emitParticles = () => {
      gsap.fromTo(
        '.particle',
        {
          x: 0,
          y: 0,
          scale: 1,
          opacity: 1,
        },
        {
          x: 'random(-150, 150)',
          y: 'random(-150, 150)',
          scale: 0,
          opacity: 0,
          duration: 'random(1, 2)',
          stagger: {
            amount: 1,
            from: 'random',
          },
          ease: 'power2.out',
          onComplete: () => {
            gsap.set('.particle', {
              x: 0,
              y: 0,
              scale: 1,
              opacity: 1,
            })
          },
        },
      )
    }

    // Смена иконок
    const changeIcon = () => {
      gsap.to('.core-icon', {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          currentIconIndex.current = (currentIconIndex.current + 1) % ICONS.length
          const iconElement = document.querySelector('.core-icon')
          if (iconElement) {
            iconElement.setAttribute('data-icon', ICONS[currentIconIndex.current])
            gsap.to(iconElement, {
              scale: 1,
              opacity: 1,
              duration: 0.3,
              ease: 'back.out(1.7)',
            })
          }
        },
      })
    }

    // 3D трансформация при движении мыши
    const handleMouseMove = (e: MouseEvent) => {
      const bounds = svgRef.current?.getBoundingClientRect()
      if (!bounds) return

      const x = (e.clientX - bounds.left - bounds.width / 2) * 0.1
      const y = (e.clientY - bounds.top - bounds.height / 2) * 0.1

      gsap.to('.torus-group', {
        rotateX: -y,
        rotateY: x,
        duration: 0.5,
        ease: 'power2.out',
      })

      // Дополнительное искажение сегментов
      segments.forEach((segment, i) => {
        gsap.to(segment, {
          scale: 1 + Math.abs(Math.sin(i + x * 0.1)) * 0.1,
          duration: 0.3,
        })
      })
    }

    setInterval(changeIcon, 3000)
    setInterval(emitParticles, 2000)

    const element = svgRef.current
    element.addEventListener('mousemove', handleMouseMove)

    return () => {
      element.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  const ringSegments = generateRingSegments(24, 80)

  return (
    <svg ref={svgRef} viewBox="0 0 400 400" className="w-64 h-64 mx-auto">
      <defs>
        <linearGradient id="ring-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4318FF" />
          <stop offset="100%" stopColor="#9333EA" />
        </linearGradient>

        <linearGradient id="data-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#4318FF" stopOpacity="0" />
          <stop offset="50%" stopColor="#9333EA" />
          <stop offset="100%" stopColor="#4318FF" stopOpacity="0" />
        </linearGradient>

        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>

        <filter id="core-glow">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      <g className="torus-group" transform="translate(200 200)">
        {/* Кольцо из сегментов */}
        <g className="ring-segments">
          {ringSegments.map((segment) => (
            <g
              key={segment.id}
              className="ring-segment"
              data-rotation={segment.rotation}
              transform={`rotate(${segment.rotation})`}>
              <path d={segment.path} stroke="url(#ring-gradient)" strokeWidth="4" fill="none" filter="url(#glow)" />
              <path
                className="data-flow"
                d={segment.path}
                stroke="url(#data-gradient)"
                strokeWidth="2"
                fill="none"
                strokeDasharray="4 4"
                opacity="0.6"
              />
            </g>
          ))}
        </g>

        {/* Ядро */}
        <g className="core" filter="url(#core-glow)">
          <g className="core-rings">
            {[40, 35, 30].map((radius, i) => (
              <circle key={i} r={radius} fill="url(#ring-gradient)" opacity={0.2 + i * 0.1} className="core-ring" />
            ))}
          </g>
          <g className="core-glow">
            <circle r="45" fill="url(#ring-gradient)" opacity="0.1" />
          </g>
          <Icon icon={ICONS[0]} className="core-icon" width="40" height="40" x="-20" y="-20" />
        </g>

        {/* Частицы */}
        <g className="particles">
          {Array.from({ length: 30 }).map((_, i) => (
            <circle key={i} className="particle" r="2" fill="url(#ring-gradient)" opacity="0.6" filter="url(#glow)" />
          ))}
        </g>
      </g>
    </svg>
  )
}

export default Logo3DProjects
