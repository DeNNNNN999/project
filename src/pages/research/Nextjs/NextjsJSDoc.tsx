import React, { useState } from 'react';
import MdxContentLoader from '../../../components/MDX/MdxContentLoader';
import LessonNavigation from '../../../components/MDX/LessonNavigation';

const TOTAL_LESSONS = 16; // Всего 16 MDX-файлов в папке NEXTDOCS

const NextjsJSDoc: React.FC = () => {
  const [currentLesson, setCurrentLesson] = useState(1);

  return (
    <section id="nextjsdoc" className="p-6 border rounded-lg bg-slate-800/40 border-slate-700/50">
      <h2 className="mb-4 text-2xl font-semibold text-indigo-400">Next.js: Критический Курс</h2>
      
      <div className="mb-6 text-gray-300">
        <p>Этот курс представляет собой систематический и критический анализ Next.js как фреймворка для React. 
        Мы рассмотрим его особенности, сильные и слабые стороны, отличия от "чистого" React, различные подходы 
        к рендерингу, роутингу и получению данных.</p>
      </div>
      
      <LessonNavigation 
        currentLesson={currentLesson}
        totalLessons={TOTAL_LESSONS}
        onSelectLesson={setCurrentLesson}
      />
      
      <div className="mt-8 border-t border-slate-700 pt-6">
        <MdxContentLoader 
          lessonNumber={currentLesson} 
          docFolder="NEXTDOCS"
        />
      </div>
    </section>
  );
};

export default NextjsJSDoc;