import React, { useEffect, useState, useContext } from 'react';
import classes from './HomePage.module.css';
import QuestionsInfo from './QuestionsInfo';
import { useNavigate } from 'react-router-dom';
import axios from '../../Api/axios';
import { AppState } from '../../App';


function HomePage() {
  const [questions, setQuestions] = useState([]);
  const [displayedQuestions, setDisplayedQuestions] = useState(10); // Start with 15 questions
  const navigate = useNavigate();
  const { user } = useContext(AppState);
  const token = localStorage.getItem('token');


  useEffect(() => {
    async function getQuestions() {
      try {
        const response = await axios.get('/questions/getallquestions', {
          headers: {
            Authorization: 'Bearer ' + token,
          },
          ///http://localhost:5500/api/questions/getallquestions
        });
        setQuestions(response.data);
      } catch (err) {
        console.log('Error fetching questions:', err.message);
      }
    }
    getQuestions();
  }, []);

  const askQuestion = () => {
    navigate('/askQuestion');
  };

  // Handle showing more questions
  const seeMore = () => {
    setDisplayedQuestions((prevCount) => prevCount + 10); // Load next 15 questions
  };

  // Handle showing less questions
  const seeLess = () => {
    setDisplayedQuestions(10); // Reset to initial 15 questions
  };

  return (
    <div className={classes.main_container}>
      <div className={classes.container}>
        <div>
          {/* to navigate to askQuestion */}
          <button onClick={askQuestion}>Ask Question</button>
        </div>
        <div>
          <p> Welcome: {user?.username} </p>
        </div>
      </div>

      <p className={classes.title}>Questions</p>

      {/* Display the questions */}
      {questions.slice(0, displayedQuestions).map((question, index) => (
        <QuestionsInfo
          key={index}
          username={question.username}
          title={question.title}
          userid={question.userid}
          questionid={question.questionid}
        />
      ))}

      {/* See More or See Less buttons */}
      <div className={classes.see_more_container}>
        {displayedQuestions < questions.length && (
          <button className={classes.see_more_button} onClick={seeMore}>
            See More
          </button>
        )}
        {displayedQuestions > 15 && (
          <button className={classes.see_less_button} onClick={seeLess}>
            See Less
          </button>
        )}
      </div>
    </div>
  );
}

export default HomePage;
