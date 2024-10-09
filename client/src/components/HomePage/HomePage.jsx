import React,{useEffect, useState} from 'react';
import classes from './HomePage.module.css'
import QuestionsInfo from './QuestionsInfo'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


function HomePage({ question }) {
  const [user, setUser] = useState({});
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();

  

  // Fetch questions from the backend when the component loads
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/questions")
      .then((response) => setQuestions(response.data))
      .catch((error) => console.error("Error fetching questions:", error));
  }, []);
  
  const askQuestion = () => {
    navigate("/askQuestion");
  };
  return (
    <div className={classes.main_container}>
      <div className={classes.container}>
        <div>
          {/* to navigate to askQuestion */}
          <button onClick={askQuestion}>Ask Question</button>
        </div>
        <div>
          <p> welcome:userName</p>
        </div>
      </div>
      <p>Questions</p>

      <hr />
      {/* <h1>Questions</h1>
      <ul>
        {questions.map((question, index) => (
          <li key={index}>
            <p>{question}</p>
          </li>
        ))}
      </ul>

      <hr />
      <hr /> */}
      <QuestionsInfo userName="ephi" questions="questions" />
      <QuestionsInfo userName="Tina" questions="questions" />
      <QuestionsInfo userName="zebib" questions="questions" />
      <QuestionsInfo userName="Akili" questions="questions" />
    </div>
  );
}

export default HomePage