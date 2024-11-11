import { useState } from 'react'
import Login from './Components/Login'

import '@fortawesome/fontawesome-free/css/all.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Components/Homepage';
import Dashboard from './Components/Dashboard';
function App(){
    
    return(
        <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} /> {/* Home component */}
           <Route path="/Login" element={<Login />} />
           <Route path="/HomePage" element={<HomePage />} /> 
        </Routes>
      </Router>
        
)
}
  
export default App
