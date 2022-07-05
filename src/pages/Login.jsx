import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Carregando from './Carregando';
// import Carregando from './Carregando';
// import { Link } from 'react-router-dom';
// import Search from './Search';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      namePerson: '',
      btnDisabled: true,
      loading: false,
      redi: false,
    };
  }

  // componentWillUnmount() {
  //   <Redirect to="/search" />;
  // }

  handleCondition = () => {
    const { namePerson } = this.state;
    const size = 3;
    if (namePerson.length >= size) {
      this.setState({
        btnDisabled: false,
      });
    } else {
      this.setState({
        btnDisabled: true,
      });
    }
  }

  handleValue = (event) => {
    this.setState({
      namePerson: event.target.value,
    }, this.handleCondition);
  }

  handleSubmit = async () => {
    const { namePerson } = this.state;
    this.setState({
      loading: true,
    });

    await createUser({ name: namePerson });
    console.log('State', namePerson);
    this.setState({
      redi: true,
    });
  }

  render() {
    const { loading, btnDisabled, redi } = this.state;
    console.log(loading);
    return (
      <div data-testid="page-login">

        <input
          data-testid="login-name-input"
          onChange={ this.handleValue }
        />
        <button
          type="button"
          data-testid="login-submit-button"
          disabled={ btnDisabled }
          onClick={ this.handleSubmit }
        >
          Entrar

        </button>
        <div>
          { loading ? <Carregando />
            : null}
          { redi ? <Redirect to="/search" />
            : null}
          {' '}
        </div>

      </div>
    );
  }
}

export default Login;
