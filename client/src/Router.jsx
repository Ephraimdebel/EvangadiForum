import React from 'react'
import HomePage from './components/HomePage/HomePage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AskQuestion from './pages/askQuestion'

 function Routing() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* It is used to navigate to the askQuestionPage */}
        <Route path="/askQuestion" element={<AskQuestion />} />
              
      </Routes>
    </Router>
  );
}

export default Routing