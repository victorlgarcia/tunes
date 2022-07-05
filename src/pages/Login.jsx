import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
// import Carregando from './Carregando';
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
    };
  }

  componentWillUnmount() {
    <h2>Carregando...</h2>;
  }

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

  redirectLoad = () => {

  }

  handleSubmit = async () => {
    const { namePerson } = this.state;
    this.setState({
      loading: true,
    }, this.redirectLoad);

    await createUser({ name: namePerson });
    console.log('State', namePerson);

    this.setState({
      loading: false,
    });
  }

  render() {
    const { loading, btnDisabled } = this.state;
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
          { loading ? <Redirect to="/search" />
            : null}
          {' '}
        </div>

      </div>
    );
  }
}

export default Login;
