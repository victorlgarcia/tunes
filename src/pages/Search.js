import React from 'react';
// import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Carregando from './Carregando';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      input: '',
      btnDisabled: true,
      load: false,
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

   test = async () => {
     const { input } = this.state;
     this.setState({
       load: true,
     });
     await searchAlbumsAPI(input);
     this.setState({
       load: false,
     });
   };

  handleSubmit = (event) => {
    event.preventDefault();
    this.test();
  }

  render() {
    const { btnDisabled, load, input } = this.state;
    console.log(input, load);
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
            onClick={ this.handleSubmit }
          >
            Pesquisar

          </button>
        </form>
        {load ? <Carregando /> : null}
      </div>
    );
  }
}
export default Search;
