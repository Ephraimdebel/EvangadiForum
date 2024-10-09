import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import styles from "./AskQuestion.module.css";
// import { AppState } from "../../context/AppState";
// import { useNavigate } from "react-router-dom";

function AskQuestion() {
  // const navigate = useNavigate();
  // const { user } = useContext(AppState);
  const [title, setTitle] = useState("");
  const [description, setQuestion] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/questions");
        // Handle fetched data if necessary
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!description.trim() || !title.trim() /* || !user */) {
      setError("Please fill in all fields and ensure you are logged in.");
      return;
    } else {
      setError("");
    }

    try {
      await axios.post("http://localhost:5500/api/questions/askquestion", {

        title,
        description,
        questionid:111,
        userid:11
        // user,
      });
      setTitle("");
      setQuestion("");
      alert("Question submitted successfully!");
    } catch (err) {
      console.error("Error submitting question:", err);
      setError("Failed to submit question. Please try again.");
    }
  };

  return (
    <div className={styles.container}>
      {/* Steps Section */}
      <div className={styles.steps}>
        <h2>Steps to Write a Good Question</h2>
        <ul>
          <li>Summarize your problem in a one-line title.</li>
          <li>Describe your problem in more detail.</li>
          <li>Describe what you tried and what you expected to happen.</li>
          <li>Review your question and post it to the site.</li>
        </ul>
      </div>

      {/* Ask Public Question Section */}
      <div className={styles.askPublicQuestion}>
        <h2>Ask a Public Question</h2>
        <a href="/">Go to Question Page</a>
      </div>

      {/* Question Form */}
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.titleBar}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            placeholder="Enter your question title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          />
        </div>

        <div className={styles.questionDescription}>
          <label htmlFor="question">Question Description</label>
          <textarea
            id="question"
            placeholder="Provide a detailed description of your question"
            value={description}
            onChange={(event) => setQuestion(event.target.value)}
            rows="10"
            required
          ></textarea>
        </div>

        {error && <p className={styles.error}>{error}</p>}

        <button type="submit" className={styles.submitButton}>
          Post Your Question
        </button>
      </form>
    </div>
  );
}

export default AskQuestion;
