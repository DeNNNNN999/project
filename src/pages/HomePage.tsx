import React, { lazy, Suspense, useEffect } from 'react';
import LazySection from '../components/LazySection';
import { ProjectsSkeleton, SkillsSkeleton, ContactSkeleton } from '../components/SkeletonLoaders';
import { preloadHomeComponents } from '../utils/preload';

// Обычный импорт для HeroSection (всегда видна)
import HeroSection from '../components/HeroSection';

// Lazy импорты для остальных секций
const ProjectsSection = lazy(() => import('../components/ProjectsSection'));
const SkillsSection = lazy(() => import('../components/SkillsSection'));
const SoftSkillsSection = lazy(() => import('../components/SoftSkillsSection'));
const ContactSection = lazy(() => import('../components/ContactSection'));

const HomePage = () => {
  // Предзагружаем компоненты когда страница загружена
  useEffect(() => {
    preloadHomeComponents();
  }, []);
  return (
    <>
      {/* Hero Section загружается сразу */}
      <HeroSection />
      
      {/* Projects Section с lazy loading */}
      <LazySection fallback={<ProjectsSkeleton />}>
        <Suspense fallback={<ProjectsSkeleton />}>
          <ProjectsSection />
        </Suspense>
      </LazySection>
      
      {/* Skills Section с lazy loading */}
      <LazySection fallback={<SkillsSkeleton />}>
        <Suspense fallback={<SkillsSkeleton />}>
          <SkillsSection />
        </Suspense>
      </LazySection>
      
      {/* Soft Skills Section с lazy loading */}
      <LazySection fallback={<SkillsSkeleton />}>
        <Suspense fallback={<SkillsSkeleton />}>
          <SoftSkillsSection />
        </Suspense>
      </LazySection>
      
      {/* Contact Section с lazy loading */}
      <LazySection fallback={<ContactSkeleton />}>
        <Suspense fallback={<ContactSkeleton />}>
          <ContactSection />
        </Suspense>
      </LazySection>
    </>
  );
};

export default HomePage;
