import React from 'react';
import classes from './Signup.module.css';



const SignupForm = () => {


  return (
    <div className={classes.container}>
      <div className={classes.formSection}>
        <h2>Join the network</h2>
        <p>Already have an account? <a href="#">Sign in</a></p>
        <form  onSubmit={handlesubmit}>
          <div>  <input    type="email" placeholder="Email" /></div>
          <br />
         <div>
          <input  type="text" placeholder="First Name" />
         <input  type="text" placeholder="Last Name" />
         </div>
         <br />
         <div>
          <input type="text" placeholder="User Name" />
          </div>
          <br />

      <div> <input   type="password" placeholder="Password" /></div>
       <br />
      <div><button type="submit">Agree and Join</button> </div>  
        </form>
        <p className={classes.terms}>
          I agree to the <a href="#">privacy policy</a> and <a href="#">terms of service</a>.
        </p>
        <p>Already have an account? <a href="#">Sign in</a></p>
      </div>

      <div className={classes.infoSection}>
        <h2>Evangadi Networks Q&A</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
        <p className={classes.howItWorks}>
          <a href="#">HOW IT WORKS</a>
        </p>
      </div>
    </div>
  );

}

export default Signup;