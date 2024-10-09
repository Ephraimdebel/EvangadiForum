import React from "react";
import AskQuestion from "./components/AskQuestion/AskQuestion";
import {BrowserRouter,Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import QuestionAndAnswerPage from "./pages/QuestionAndAnswerPage/QuestionAndAnswerPage";
import Login from "./components/Login/Login";
import Register from "./pages/Register";
function App() {
  return (
    
    <Routes>
      <Route path="/" element={<Home />} >
        <Route path="/" element={< AskQuestion />} />
        <Route path= "/askquestion" element={<AskQuestion />} />
        <Route path = "/questiondetail" element={<QuestionAndAnswerPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
     </Route>
   {/* <AskQuestion/> */}
   </Routes>
  );
};

export default App;
















// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import { useState } from "react";
// import HomePage from "./HomePage";
// import AskQuestionPage from "./AskQuestionPage";

// function App() {
//   const [questions, setQuestions] = useState([]);

//   // Function to add a new question
//   const addQuestion = (newQuestion) => {
//     setQuestions((prevQuestions) => [...prevQuestions, newQuestion]);
//   };

//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<HomePage questions={questions} />} />
//         <Route
//           path="/ask-question"
//           element={<AskQuestionPage addQuestion={addQuestion} />}
//         />
//       </Routes>
//     </Router>
//   );
// }

// export default App;


  {/* <Route path="/questions" element={<QuestionAndAnswerPage />} /> 
           <Route path="/question/:id" element={<QuestionAndAnswerPage} />
           <Route path="/question" element={<QuestionAnswerPage />} /> */}