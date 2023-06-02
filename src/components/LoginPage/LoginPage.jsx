import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';

import Nav from '../Nav/Nav';

function LoginPage() {
  const history = useHistory();

  return (
    <div className="page-container">
      <div className="content-background"></div>
      <center className="content-a">
      <LoginForm />
      </center>

      <center className="content-b">
        <Nav />
        {/* <button
          type="button"
          className="btn btn_asLink"
          onClick={() => {
            history.push('/registration');
          }}
        >
          Register
        </button> */}
      </center>
      <div className="blank-space"></div>
    </div>
  );
}

export default LoginPage;
