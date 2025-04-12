import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Импортируем страницы для каждого раздела
import UMLArchitecturesPage from './uml-architectures/UMLArchitecturesPage';
import TasksPage from './tasks/TasksPage';
import GamesPage from './games/GamesPage';
import QuestionsPage from './questions/QuestionsPage';
import AdvancedResearchPage from './advanced-research/AdvancedResearchPage';

const CustomResearchRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="uml-architectures" element={<UMLArchitecturesPage />} />
      <Route path="tasks" element={<TasksPage />} />
      <Route path="games" element={<GamesPage />} />
      <Route path="questions" element={<QuestionsPage />} />
      <Route path="advanced-research" element={<AdvancedResearchPage />} />
    </Routes>
  );
};

export default CustomResearchRoutes;
