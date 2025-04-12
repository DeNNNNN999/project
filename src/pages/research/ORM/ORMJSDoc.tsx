import React, { useState } from 'react';
import MdxContentLoader from '../../../components/MDX/MdxContentLoader';
import LessonNavigation from '../../../components/MDX/LessonNavigation';

// В настоящий момент в папке ORMSDOCS есть только 1 файл, но можно добавить больше в будущем
const TOTAL_LESSONS = 1; 

const ORMJSDoc: React.FC = () => {
  const [currentLesson, setCurrentLesson] = useState(1);

  return (
    <section id="ormdoc" className="p-6 border rounded-lg bg-slate-800/40 border-slate-700/50">
      <h2 className="mb-4 text-2xl font-semibold text-indigo-400">ORM: Критический Курс</h2>
      
      <div className="mb-6 text-gray-300">
        <p>Этот курс представляет собой систематический и критический анализ ORM (Object-Relational Mapping) 
        в экосистеме JavaScript/TypeScript. Мы рассмотрим различные подходы к ORM, популярные инструменты, 
        их философию, сильные и слабые стороны, а также сценарии использования.</p>
      </div>
      
      {TOTAL_LESSONS > 1 ? (
        <LessonNavigation 
          currentLesson={currentLesson}
          totalLessons={TOTAL_LESSONS}
          onSelectLesson={setCurrentLesson}
        />
      ) : null}
      
      <div className="mt-8 border-t border-slate-700 pt-6">
        <MdxContentLoader 
          lessonNumber={currentLesson} 
          docFolder="ORMSDOCS"
        />
      </div>
    </section>
  );
};

export default ORMJSDoc;