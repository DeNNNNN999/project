import { Routes, Route } from 'react-router-dom';
import React from 'react';
import TopNav from './components/TopNav';
import HomePage from './pages/HomePage';
import AlgorithmsPage from './pages/AlgorithmsPage';
import ResearchPage from './pages/ResearchPage';
import JavaScript from './pages/research/JavaScript/JavaScript';
import TypeScript from './pages/research/TypeScript/TypeScript';
import ReactPage from './pages/research/React/React';
import Redis from './pages/research/Redis/Redis';
import Nextjs from './pages/research/Nextjs/Nextjs';
import ORM from './pages/research/ORM/ORM';
import Nodejswithexpress from './pages/research/Nodejswithexpress/Nodejswithexpress';
import Docker from './pages/research/Docker/Docker';

// Импорт страниц для Custom Research
import UMLArchitecturesPage from './pages/research/custom/uml-architectures/UMLArchitecturesPage';
import TasksPage from './pages/research/custom/tasks/TasksPage';
import GamesPage from './pages/research/custom/games/GamesPage';
import QuestionsPage from './pages/research/custom/questions/QuestionsPage';
import AdvancedResearchPage from './pages/research/custom/advanced-research/AdvancedResearchPage';

// Импорт страниц для алгоритмов
import SortingAlgorithmsPage from './pages/algorithms/sorting';
import QuickSortPage from './pages/algorithms/sorting/QuickSortPage';
import MergeSortPage from './pages/algorithms/sorting/MergeSortPage';
import HeapSortPage from './pages/algorithms/sorting/HeapSortPage';
import AutomataAlgorithmsPage from './pages/algorithms/automata';
import DFAPage from './pages/algorithms/automata/DFAPage';
import NFAPage from './pages/algorithms/automata/NFAPage';
import PDAPage from './pages/algorithms/automata/PDAPage';
import TuringPage from './pages/algorithms/automata/TuringPage';

import Footer from './components/Footer';
import PreLoader from './components/PreLoader';
import AnimatedBackground from './components/AnimatedBackground';
import StarBackground from './components/StarBackground';

const App = () => {
  return (
    <div className="min-h-screen text-white bg-slate-900">
      <PreLoader />
      <StarBackground count={80} opacity={0.3} />
      <AnimatedBackground opacity={0.7} />
      <main className="relative z-10">
        <TopNav />
        <Routes>
          <Route path="/" element={<HomePage />} />
          
          {/* Маршруты для алгоритмов */}
          <Route path="/algorithms" element={<AlgorithmsPage />} />
          
          {/* Сортировка */}
          <Route path="/algorithms/sorting" element={<SortingAlgorithmsPage />} />
          <Route path="/algorithms/sorting/quicksort" element={<QuickSortPage />} />
          <Route path="/algorithms/sorting/mergesort" element={<MergeSortPage />} />
          <Route path="/algorithms/sorting/heapsort" element={<HeapSortPage />} />
          
          {/* Автоматы */}
          <Route path="/algorithms/automata" element={<AutomataAlgorithmsPage />} />
          <Route path="/algorithms/automata/dfa" element={<DFAPage />} />
          <Route path="/algorithms/automata/nfa" element={<NFAPage />} />
          <Route path="/algorithms/automata/pda" element={<PDAPage />} />
          <Route path="/algorithms/automata/turing" element={<TuringPage />} />
          
          {/* Маршруты для исследований */}
          <Route path="/research" element={<ResearchPage />} />
          <Route path="/research/javascript" element={<JavaScript />} />
          <Route path="/research/typescript" element={<TypeScript />} />
          <Route path="/research/react" element={<ReactPage />} />
          <Route path="/research/redis" element={<Redis />} />
          <Route path="/research/nextjs" element={<Nextjs />} />
          <Route path="/research/orm" element={<ORM />} />
          <Route path="/research/nodejswithexpress" element={<Nodejswithexpress />} />
          <Route path="/research/docker" element={<Docker />} />
          
          {/* Маршруты для Custom Research */}
          <Route path="/research/custom/uml-architectures" element={<UMLArchitecturesPage />} />
          <Route path="/research/custom/tasks" element={<TasksPage />} />
          <Route path="/research/custom/games" element={<GamesPage />} />
          <Route path="/research/custom/questions" element={<QuestionsPage />} />
          <Route path="/research/custom/advanced-research" element={<AdvancedResearchPage />} />
        </Routes>
        <Footer />
      </main>
    </div>
  );
};

export default App;
