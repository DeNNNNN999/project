import React, { useState } from 'react';
import MdxContentLoader from '../../../components/MDX/MdxContentLoader';
import LessonNavigation from '../../../components/MDX/LessonNavigation';

// Подразумевается, что есть папка EXPRESSWITHNODEJSDOCS с MDX файлами
const TOTAL_LESSONS = 14; // Предполагаемое количество уроков, можно изменить

const NodejswithexpressJSDoc: React.FC = () => {
  const [currentLesson, setCurrentLesson] = useState(1);

  return (
    <section id="nodejsexpressdoc" className="p-6 border rounded-lg bg-slate-800/40 border-slate-700/50">
      <h2 className="mb-4 text-2xl font-semibold text-indigo-400">Node.js с Express: Критический Курс</h2>

      <div className="mb-6 text-gray-300">
        <p>Этот курс представляет собой систематический и критический анализ Node.js и Express как платформы для разработки
        серверной части веб-приложений. Мы рассмотрим их особенности, сильные и слабые стороны, архитектурные
        паттерны и практические аспекты использования в современной веб-разработке.</p>
      </div>

      <LessonNavigation
        currentLesson={currentLesson}
        totalLessons={TOTAL_LESSONS}
        onSelectLesson={setCurrentLesson}
      />

      <div className="pt-6 mt-8 border-t border-slate-700">
        <MdxContentLoader 
          lessonNumber={currentLesson}
          docFolder="EXPRESSWITHNODEJSDOCS"
        />
      </div>
    </section>
  );
};

export default NodejswithexpressJSDoc;
