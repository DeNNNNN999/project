// Функция для предзагрузки компонентов
export const preloadComponent = (componentLoader: () => Promise<any>) => {
  componentLoader();
};

// Предзагружаем важные компоненты когда браузер свободен
export const preloadHomeComponents = () => {
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
      // Предзагружаем компоненты в порядке приоритета
      preloadComponent(() => import('../components/ProjectsSection'));
      preloadComponent(() => import('../components/SkillsSection'));
      
      setTimeout(() => {
        preloadComponent(() => import('../components/SoftSkillsSection'));
        preloadComponent(() => import('../components/ContactSection'));
      }, 1000);
    });
  } else {
    // Fallback для браузеров без requestIdleCallback
    setTimeout(() => {
      preloadComponent(() => import('../components/ProjectsSection'));
      preloadComponent(() => import('../components/SkillsSection'));
      preloadComponent(() => import('../components/SoftSkillsSection'));
      preloadComponent(() => import('../components/ContactSection'));
    }, 2000);
  }
};
