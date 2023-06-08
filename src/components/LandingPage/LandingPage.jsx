import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../Layouts/LoggedOut.css';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';

function LandingPage() {
  const [heading, setHeading] = useState('Welcome!');
  const history = useHistory();

  const onLogin = (event) => {
    history.push('/login');
  };

  return (
    <>
      <h2>{heading}</h2>
      <center>
        <h4>Go To Log-In:</h4>
        <button className="btn btn_sizeSm" onClick={onLogin}>
          Login
        </button>
      </center>
      <RegisterForm />
    </>
  );
}

export default LandingPage;
