import React from 'react';
import ResearchPageLayout from '../../../../components/Layout/ResearchPageLayout';

const UMLArchitecturesPage: React.FC = () => {
  return (
    <ResearchPageLayout title="UML и Архитектурные Решения">
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-blue-400 mb-4">Диаграммы UML</h2>
          <p className="text-gray-300">
            Здесь будут представлены различные типы UML-диаграмм и примеры их использования в проектировании 
            программных систем. Включая диаграммы классов, последовательностей, компонентов и т.д.
          </p>
          {/* Здесь будут React-компоненты с UML-диаграммами */}
        </section>
        
        <section>
          <h2 className="text-2xl font-bold text-blue-400 mb-4">Архитектурные Паттерны</h2>
          <p className="text-gray-300">
            Обзор и примеры архитектурных паттернов: MVC, MVVM, Clean Architecture, Hexagonal Architecture, 
            Микросервисы и другие подходы к построению архитектуры приложений.
          </p>
          {/* Здесь будут React-компоненты с архитектурными моделями */}
        </section>
      </div>
    </ResearchPageLayout>
  );
};

export default UMLArchitecturesPage;
