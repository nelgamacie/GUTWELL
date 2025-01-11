import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TreatmentPage from './components/Treatment/page';
import './components/Treatment/page.css';

function App() {
  return (
  
    <Router>
     
    <Routes>
      <Route path="/treatment" element={<TreatmentPage />} />
      {/* Define other routes here using the element prop */}
    </Routes>
  </Router>
      );
     }
  
     
     export default App;
     