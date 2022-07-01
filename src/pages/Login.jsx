import React from 'react';
// import { Link } from 'react-router-dom';

class Login extends React.Component {
  render() {
    return (
      <div data-testid="page-login">

        <input data-testid="login-name-input" />
        <button type="submit" data-testid="login-submit-button">Entrar</button>

      </div>
    );
  }
}

export default Login;
