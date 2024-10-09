import React from "react";
import classes from "./HomePage.module.css";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";

function QuestionsInfo({ userName, questions }) {
  return (
    <>
      <div className={classes.questions_container}>
        <hr />
        <div className={classes.ask_question}>
          <div className={classes.ask_user_info}>
            <div className={classes.ask_user}>
              <FaRegCircleUser
                className={classes.icon}
                // style={{ color: "gray" }}
                size={35}
              />
              <span>{userName}</span>
            </div>
            <div className={classes.ask_question_text}>
              {/* <input type="text" placeholder="Ask Question" /> */}
              <p>{questions}</p>
            </div>
          </div>
          {}

          <div>
            <FaAngleRight />
          </div>
        </div>

        {/* <hr /> */}
      </div>
    </>
  );
}

export default QuestionsInfo;
