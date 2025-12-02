import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import MemoryGame from './games/memory/MemoryGame';
import PuzzleGame from './games/puzzle/PuzzleGame';
import QuizGame from './games/quiz/QuizGame';
import CatchGame from './games/catch/CatchGame';
import Legal from './pages/Legal';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/memory" element={<MemoryGame />} />
          <Route path="/puzzle" element={<PuzzleGame />} />
          <Route path="/quiz" element={<QuizGame />} />
          <Route path="/catch" element={<CatchGame />} />
          <Route path="/legal" element={<Legal />} />
          <Route path="*" element={<div style={{ textAlign: 'center', padding: '50px' }}><h2>404 - Page non trouvée</h2><p>Le Père Noël s'est perdu !</p></div>} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
