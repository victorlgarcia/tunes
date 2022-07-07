import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Artista from './Artista';
// import Artist from './Artist';
import Carregando from './Carregando';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      input: '',
      artist: '',
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
      artist: input,
    });

    this.setState({

      load: true,

    });
    const x = await searchAlbumsAPI(input);

    // this.estadoSetado(value);
    this.setState({
      apiObj: x,
      input: '',
    }, this.handleCondition);
    this.setState({

      load: false,

    });
    // this.test();
  }

  // renderName = () => {
  //   const { apiObj, input } = this.state;
  //   return apiObj.find((album) => album.artistName === input).artistName;
  // }

  render() {
    const { btnDisabled, load, apiObj, input, artist } = this.state;

    return (
      <div data-testid="page-search">

        <Header />
        <form>
          <input
            data-testid="search-artist-input"
            onChange={ this.handleValue }
            value={ input }
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

        {artist.length > 0
          ? <Artista input={ artist } />

          : null}
        {/* {apiObj.length > 0
          ? `Resultado de álbuns de:

            ${apiObj.find((album) => album.artistName).artistName}`

          : null} */}

        {load ? <Carregando /> : null}

        {apiObj.length === 0 ? <p>Nenhum álbum foi encontrado</p> : null}

        <ul>

          {apiObj.map((album) => (

            <li key={ album.collectionId }>

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

            </li>
          ))}
        </ul>
      </div>
    );
  }
}
export default Search;
