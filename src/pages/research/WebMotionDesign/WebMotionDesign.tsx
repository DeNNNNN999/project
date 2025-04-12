import React from 'react'
import ResearchPageLayout from '../../../components/Layout/ResearchPageLayout'

// Импортируем компоненты для анимаций (будут созданы позже)
import HeroAnimation from './components/HeroAnimation'
import GsapAnimations from './components/GsapAnimations'
import FramerMotionExamples from './components/FramerMotionExamples'
import ThreeDimensions from './components/ThreeDimensions'
import CssAnimations from './components/CssAnimations'
import AnimationPerformance from './components/AnimationPerformance'

const WebMotionDesign: React.FC = () => {
  return (
    <ResearchPageLayout title="Web Motion Design: Анимации и Визуальные Эффекты">
      {/* Здесь будут компоненты с реальными анимациями вместо MDX документации */}
      <section className="p-6 border rounded-lg bg-slate-800/40 border-slate-700/50 mb-6">
        <h2 className="mb-4 text-2xl font-semibold text-indigo-400">Введение в Web Motion Design</h2>
        <div className="mb-6 text-gray-300">
          <p className="mb-3">
            Анимации и визуальные эффекты играют важную роль в создании интерактивного и привлекательного пользовательского опыта.
            В этом разделе вы найдете реальные примеры различных типов анимаций, реализованных с помощью современных инструментов и технологий.
          </p>
          <p className="mb-3">
            В отличие от других разделов, здесь мы представляем не текстовую документацию в формате MDX, а реальные интерактивные компоненты, 
            демонстрирующие возможности GSAP, Framer Motion, Three.js и других технологий.
          </p>
        </div>
        <div className="text-sm text-amber-300 p-3 border rounded border-amber-500/30 bg-amber-500/5">
          <p><strong>Примечание:</strong> Взаимодействуйте с компонентами ниже, чтобы увидеть анимации в действии.</p>
        </div>
      </section>

      {/* Здесь будут размещены наши компоненты с анимациями */}
      <HeroAnimation />
      <GsapAnimations />
      <FramerMotionExamples />
      <ThreeDimensions />
      <CssAnimations />
      <AnimationPerformance />
    </ResearchPageLayout>
  )
}

export default WebMotionDesign
