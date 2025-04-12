import React from 'react';
import ResearchPageLayout from '../../../../components/Layout/ResearchPageLayout';

const GamesPage: React.FC = () => {
  return (
    <ResearchPageLayout title="Игры и Геймификация">
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-purple-400 mb-4">Интерактивные Игры</h2>
          <p className="text-gray-300">
            Обучающие интерактивные игры для изучения концепций программирования, алгоритмов
            и технологий. Игровой подход к сложным темам.
          </p>
          {/* Здесь будут React-компоненты с играми */}
        </section>
        
        <section>
          <h2 className="text-2xl font-bold text-purple-400 mb-4">Геймифицированные Упражнения</h2>
          <p className="text-gray-300">
            Упражнения с элементами геймификации - заработок очков, прохождение уровней и
            соревновательные элементы для более увлекательного обучения.
          </p>
          {/* Здесь будут React-компоненты с упражнениями */}
        </section>
      </div>
    </ResearchPageLayout>
  );
};

export default GamesPage;
