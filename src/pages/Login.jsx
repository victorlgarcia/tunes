import React from 'react';
import { Link } from 'react-router-dom';

class Login extends React.Component {
  render() {
    return (
      <div data-testid="page-login">
        <Link to="/album">Album</Link>
        <h1>Conteúdo do Login</h1>
      </div>
    );
  }
}

export default Login;
