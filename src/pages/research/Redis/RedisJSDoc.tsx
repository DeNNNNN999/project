import React, { useState } from 'react';
import MdxContentLoader from '../../../components/MDX/MdxContentLoader';
import LessonNavigation from '../../../components/MDX/LessonNavigation';

const TOTAL_LESSONS = 15; // Всего 15 MDX-файлов в папке REDISDOCS

const RedisJSDoc: React.FC = () => {
  const [currentLesson, setCurrentLesson] = useState(1);

  return (
    <section id="redisdoc" className="p-6 border rounded-lg bg-slate-800/40 border-slate-700/50">
      <h2 className="mb-4 text-2xl font-semibold text-indigo-400">Redis: Критический Курс</h2>
      
      <div className="mb-6 text-gray-300">
        <p>Этот курс представляет собой систематический и критический анализ Redis как системы хранения данных. 
        Мы рассмотрим его особенности, сильные и слабые стороны, принципы работы и практическое применение в современных веб-приложениях.</p>
      </div>
      
      <LessonNavigation 
        currentLesson={currentLesson}
        totalLessons={TOTAL_LESSONS}
        onSelectLesson={setCurrentLesson}
      />
      
      <div className="mt-8 border-t border-slate-700 pt-6">
        <MdxContentLoader 
          lessonNumber={currentLesson} 
          docFolder="REDISDOCS"
        />
      </div>
    </section>
  );
};

export default RedisJSDoc;