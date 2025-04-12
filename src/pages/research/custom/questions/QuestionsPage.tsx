import React from 'react';
import ResearchPageLayout from '../../../../components/Layout/ResearchPageLayout';

const QuestionsPage: React.FC = () => {
  return (
    <ResearchPageLayout title="Вопросы и Ответы">
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-pink-400 mb-4">Сложные Концепции</h2>
          <p className="text-gray-300">
            Подробные ответы на сложные концептуальные вопросы в программировании, 
            фреймворках и методологиях разработки.
          </p>
          {/* Здесь будут React-компоненты с вопросами и ответами */}
        </section>
        
        <section>
          <h2 className="text-2xl font-bold text-pink-400 mb-4">Интервью и Экзамены</h2>
          <p className="text-gray-300">
            Типичные и нетипичные вопросы с технических интервью с подробными ответами,
            объяснениями и примерами кода.
          </p>
          {/* Здесь будут React-компоненты с вопросами интервью */}
        </section>
      </div>
    </ResearchPageLayout>
  );
};

export default QuestionsPage;
