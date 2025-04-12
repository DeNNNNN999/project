import React, { useState } from 'react';
import MdxContentLoader from '../../../components/MDX/MdxContentLoader';
import LessonNavigation from '../../../components/MDX/LessonNavigation';

const TOTAL_LESSONS = 18; // Предполагаемое количество MDX-файлов для React

const ReactJSDoc: React.FC = () => {
  const [currentLesson, setCurrentLesson] = useState(1);

  return (
    <section id="reactdoc" className="p-6 border rounded-lg bg-slate-800/40 border-slate-700/50">
      <h2 className="mb-4 text-2xl font-semibold text-indigo-400">React: Критический Курс</h2>

      <div className="mb-6 text-gray-300">
        <p>Этот курс представляет собой систематический и критический анализ React.
        Мы рассмотрим компонентный подход, особенности работы с состоянием, сильные и слабые стороны, а также практическое применение.</p>
      </div>

      <LessonNavigation
        currentLesson={currentLesson}
        totalLessons={TOTAL_LESSONS}
        onSelectLesson={setCurrentLesson}
      />

      <div className="pt-6 mt-8 border-t border-slate-700">
        <MdxContentLoader lessonNumber={currentLesson} docFolder="REACTDOCS" />
      </div>
    </section>
  );
};

export default ReactJSDoc;
