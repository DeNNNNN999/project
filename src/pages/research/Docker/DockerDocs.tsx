import React, { useState } from 'react';
import MdxContentLoader from '../../../components/MDX/MdxContentLoader';
import LessonNavigation from '../../../components/MDX/LessonNavigation';

const TOTAL_LESSONS = 15; 

const DockerDocs: React.FC = () => {
  const [currentLesson, setCurrentLesson] = useState(1);

  return (
    <section id="docker-docs" className="p-6 border rounded-lg bg-slate-800/40 border-slate-700/50">
      <h2 className="mb-4 text-2xl font-semibold text-indigo-400">Docker: Критический Курс</h2>

      <div className="mb-6 text-gray-300">
        <p>Этот курс представляет собой систематический и критический анализ Docker как технологии контейнеризации.
        Мы рассмотрим ее особенности, сильные и слабые стороны, историю развития и практическое применение.</p>
      </div>

      <LessonNavigation
        currentLesson={currentLesson}
        totalLessons={TOTAL_LESSONS}
        onSelectLesson={setCurrentLesson}
      />

      <div className="pt-6 mt-8 border-t border-slate-700">
        <MdxContentLoader lessonNumber={currentLesson} docFolder="DOCKERDOCS" />
      </div>
    </section>
  );
};

export default DockerDocs;
