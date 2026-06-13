import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeWrapper, Navbar, Footer } from './components';
import Landing from './pages/landing/Landing';
import Dashboard from './pages/dashboard/Dashboard';
import Maps from './pages/maps/Maps';

function App() {
  return (
    <Router>
      <ThemeWrapper>
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/maps" element={<Maps />} />
          </Routes>
        </main>
        <Footer />
      </ThemeWrapper>
    </Router>
  );
}

export default App;
