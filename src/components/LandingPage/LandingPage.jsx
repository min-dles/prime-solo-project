import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';

// LUNAR PHASE: 
import { Moon } from "lunarphase-js";

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';
// Footer will only appear when user is not logged in 
import Footer from '../Footer/Footer';

function LandingPage() {
  const [heading, setHeading] = useState('Welcome!');
  const history = useHistory();

  const date = new Date();
  const phase = Moon.lunarPhase(date);

  const onLogin = (event) => {
    history.push('/login');
  };

  return (
    <div className="container">
      <h2>{heading}</h2>
      <h3>{phase}</h3>
      
      <div className="grid">
        <div className="grid-col grid-col_8">
          <div class="first-quarter moon"></div>
          <div class="new moon"></div>
          <div class="full moon"></div>
          <div class="third-quarter moon"></div>


        </div>
        <div className="grid-col grid-col_4">
          <RegisterForm />

          <center>
            <h4>Already a Member?</h4>
            <button className="btn btn_sizeSm" onClick={onLogin}>
              Login
            </button>
          </center>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default LandingPage;
