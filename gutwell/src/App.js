import React from 'react';
import './App.css';
import Home from './components/home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Define other routes here using the element prop */}
      </Routes>
    </Router>
  );
}

export default App;
