import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';

function LoginPage() {
  const history = useHistory();

  return (
    <>
      <LoginForm />
      {/* <button
        type="button"
        className="btn btn_asLink"
        onClick={() => {
          history.push('/registration');
        }}
      >
        Register
      </button> */}
    </>
  );
}

export default LoginPage;
