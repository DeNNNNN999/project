import React from 'react';
import ResearchPageLayout from '../../../../components/Layout/ResearchPageLayout';

const TasksPage: React.FC = () => {
  return (
    <ResearchPageLayout title="Практические Задачи и Решения">
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-green-400 mb-4">Алгоритмические Задачи</h2>
          <p className="text-gray-300">
            Коллекция задач на алгоритмы и структуры данных разной сложности, с пошаговыми решениями
            и анализом временной и пространственной сложности.
          </p>
          {/* Здесь будут React-компоненты с задачами */}
        </section>
        
        <section>
          <h2 className="text-2xl font-bold text-green-400 mb-4">Задачи Системного Дизайна</h2>
          <p className="text-gray-300">
            Практические задачи по проектированию систем и масштабируемых приложений. 
            Разбор реальных сценариев, архитектурные решения и компромиссы.
          </p>
          {/* Здесь будут React-компоненты с задачами */}
        </section>
      </div>
    </ResearchPageLayout>
  );
};

export default TasksPage;
