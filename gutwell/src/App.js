import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TreatmentPage from './components/Treatment/page';
import './components/Treatment/page.css';
import EducationalPage from './components/Education/Education';
import Navbar from './components/Navbar';
import CalendarPage from "./components/calendar/page"; // Calendar page
import Home from './components/home';

function App() {
  return (
  
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/calendar" element={<CalendarPage />} />
      <Route path="/treatment" element={<TreatmentPage />} />
      <Route path="/education" element={<EducationalPage />} />
      {/* Define other routes here using the element prop */}
    </Routes>
  </Router>
      );
     }
  
     
     export default App;
     