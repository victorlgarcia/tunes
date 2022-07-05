import React from 'react';
// import { Link } from 'react-router-dom';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      input: '',
      btnDisabled: true,
    };
  }

  handleValue = (event) => {
    this.setState({
      input: event.target.value,
    }, this.handleCondition);
  }

  handleCondition = () => {
    const { input } = this.state;
    const size = 2;
    if (input.length >= size) {
      this.setState({
        btnDisabled: false,
      });
    } else {
      this.setState({
        btnDisabled: true,
      });
    }
  }

  render() {
    const { btnDisabled } = this.state;
    return (
      <div data-testid="page-search">

        <Header />
        <form>
          <input
            data-testid="search-artist-input"
            onChange={ this.handleValue }
          />
          <button
            type="submit"
            data-testid="search-artist-button"
            disabled={ btnDisabled }
          >
            Pesquisar

          </button>
        </form>

      </div>
    );
  }
}
export default Search;
