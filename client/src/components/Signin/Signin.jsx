import React from "react";
import "../Signin/Signin.css";
import { useRef } from 'react';
import axios from '../../axiosConfig';



function Signin() {

  const emailDom = useRef();
  const firstnameDom = useRef();
  const lastnameDom = useRef();
  const usernameDom = useRef();
  const passwordDom = useRef();


  async function handlesubmit(e) {
    e.preventDefualt();
  try{
         await axios.post ('/users/Signup',{
             email:EmailValue,
             firstname:FirstValue,
             lastname:LastValue,
             username:UsernameVlaue,
             password:PassValue,
         });
        }
    catch(error){
           console(error.response);
       }
      }

  return (
    <div className="container">
      <div className="formSection">
        <h2>Join the network</h2>
        <p className="join"> 
          Already have an account? <a href="#">Sign in</a>
        </p>
        <form onSubmit={handlesubmit}>
          <div>
            <input  ref={emailDom} type="email" placeholder="Email" />
          </div>

          <div className="two">
            <input  ref={firstnameDom} type="text" placeholder="First Name" />
            <input   ref={lastnameDom} type="text" placeholder="Last Name" />
          </div>

         

          <div>
            <input  ref={usernameDom}  type="text" placeholder="User Name" />
          </div>

          <div>
            <input  ref={passwordDom}  type="password" placeholder="Password" />
          </div>

          <div>
            <button  className="button"
            type="submit">Agree and Join</button>{" "}
          </div>
        </form>
        <p className="terms">
          I agree to the <a href="#">privacy policy</a> and{" "}
          <a href="#">terms of service</a>.
        </p>
        <p className="account">
          <a href="#"> Already have an account?</a>
        </p>
      </div>

      <div className="infoSection">
        <h2 className="about">About</h2>
        <h2>Evangadi Networks Q&A</h2>
        <p>
          No matter what stage of life you are in, whether you’re just starting
          elementary school or being promoted to CEO of a Fortune 500 company,
          you have much to offer to those who are trying to follow in your
          footsteps.
        </p>
        <p>
          Wheather you are willing to share your knowledge or you are just
          looking to meet mentors of your own, please start by joining the
          network her
        </p>

        <p className="howItWorks">
          <a href="#">HOW IT WORKS</a>
        </p>
      </div>







    </div>

  );
}

export default Signin;
