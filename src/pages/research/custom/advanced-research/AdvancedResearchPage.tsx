import React from 'react';
import ResearchPageLayout from '../../../../components/Layout/ResearchPageLayout';

const AdvancedResearchPage: React.FC = () => {
  return (
    <ResearchPageLayout title="Специализированные Исследования">
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-amber-400 mb-4">Передовые Концепции</h2>
          <p className="text-gray-300">
            Исследования и эксперименты с передовыми концепциями в веб-разработке, 
            программировании и архитектуре систем.
          </p>
          {/* Здесь будут React-компоненты с исследованиями */}
        </section>
        
        <section>
          <h2 className="text-2xl font-bold text-amber-400 mb-4">Критический Анализ</h2>
          <p className="text-gray-300">
            Глубокий критический анализ существующих технологий, фреймворков и подходов,
            их сильные и слабые стороны, альтернативы и компромиссы.
          </p>
          {/* Здесь будут React-компоненты с критическим анализом */}
        </section>
      </div>
    </ResearchPageLayout>
  );
};

export default AdvancedResearchPage;
