import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateSurveyPage from './pages/CreateSurveyPage';
import SurveyListPage from './pages/SurveyListPage';
import SurveyDetailPage from './pages/SurveyDetailPage';
import SurveyResultsPage from './pages/SurveyResultsPage'; 
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/create" element={<CreateSurveyPage />} />
        <Route path="/surveys" element={<SurveyListPage />} />
        <Route path="/survey/:id" element={<SurveyDetailPage />} />
        <Route path="/survey/:id/results" element={<SurveyResultsPage />} />
        <Route path="/" element={<SurveyListPage />} />
      </Routes>
    </Router>
  );
}

export default App;