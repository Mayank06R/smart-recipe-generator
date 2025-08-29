import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import RecipesPage from './pages/RecipesPage';
import { RecipeProvider } from './context/RecipeContext';
import './index.css';

function App() {
  return (
    <RecipeProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
          <Header />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/recipes" element={<RecipesPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </RecipeProvider>
  );
}

export default App;