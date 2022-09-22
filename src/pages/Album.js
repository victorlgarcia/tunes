import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from './MusicCard';
import Carregando from './Carregando';

class album extends React.Component {
  constructor() {
    super();
    this.state = {
      position: [],
      songs: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.handleMusics();
  }

  handleMusics = async () => {
    const { match: { params: { id } } } = this.props;
    const music = await getMusics(id);
    const position1 = music[0];
    this.setState({
      position: position1,
      songs: music,
    });
  }

  handleFavorite = async (songId) => {
    const { songs } = this.state;
    this.setState({
      loading: true,

    });

    const favoriteSong = songs.filter((track) => track.trackId === (+songId));
    console.log(favoriteSong);

    this.setState({
      loading: false,
    });
  }

  render() {
    const { songs, position, loading } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <div className="albumList">
          <h1 className="title is-4" data-testid="artist-name">
            {position.artistName}
          </h1>
          <img
            src={ position.artworkUrl100 }
            alt={ position.artistName }
          />
          <h2 className="subtitle is-3" data-testid="album-name">
            {position.collectionName}
          </h2>
          {loading ? <Carregando /> : null}
          <ul>

            {songs.filter((disco) => disco !== position)
              .map((disc, id) => (<MusicCard
                disc={ disc }
                handleFavorite={ this.handleFavorite }
                // song={ songs }
                // checked={ ischecked }
                key={ id }
              />))}

          </ul>
        </div>
      </div>
    );
  }
}
album.propTypes = {
  apiObj: PropTypes.object,
  recebeValordoFilho: PropTypes.func,
}.isRequired;
export default album;
