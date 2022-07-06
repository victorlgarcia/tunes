import React from 'react';
import { Link } from 'react-router-dom';
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
      apiObj: [],
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

  // estadoSetado = (value) => {
  //   this.setState((prevState) => ({
  //     apiObj: [...prevState.apiObj, value],
  //   }));
  // }

  //  test = async () => {
  //    const { input } = this.state;

  //    this.setState({
  //      load: true,

  //    });

  //    // this.estadoSetado(value);
  //    this.setState({
  //      apiObj: await searchAlbumsAPI(input),
  //    });
  //    this.setState({
  //      load: false,

  //    });
  //  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { input } = this.state;

    this.setState({
      load: true,

    });
    const x = await searchAlbumsAPI(input);

    // this.estadoSetado(value);
    this.setState({
      apiObj: x,
    });
    this.setState({
      load: false,

    });
    // this.test();
  }

  render() {
    const { btnDisabled, load, apiObj, input } = this.state;
    // console.log(apiObj.find((album) => input === album.artistName));
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
        <p>
          Resultado de álbuns de:
          { apiObj.includes((album) => album.artistName === input)}
        </p>
        {apiObj.length === 0 ? <p>Nenhum álbum foi encontrado</p> : null}
        <ul>
          {apiObj.map((album) => (

            <li key={ album.collectionId }>

              <p>
                <Link
                  data-testid={ `link-to-album-${album.collectionId}` }
                  to={ `/album/${album.collectionId}` }
                >
                  <img
                    src={ album.artworkUrl100 }
                    alt={ album.collectionName }
                  />
                  <p>{album.collectionName}</p>

                </Link>

              </p>

            </li>
          ))}
        </ul>
      </div>
    );
  }
}
export default Search;
