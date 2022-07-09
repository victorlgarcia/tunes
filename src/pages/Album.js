import React from 'react';
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from './MusicCard';
import { addSong } from '../services/favoriteSongsAPI';
import Carregando from './Carregando';

class album extends React.Component {
  constructor() {
    super();
    this.state = {
      position: [],
      songs: [],
      loading: false,
      // ischecked: false,
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

  handleFavorite = async () => {
    const { songs } = this.state;
    this.setState({
      loading: true,
    });
    await addSong(songs);

    this.setState({
      loading: false,
    });
  }

  render() {
    const { songs, position, loading } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <h1 data-testid="artist-name">
          {position.artistName}
        </h1>
        <h2 data-testid="album-name">
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
    );
  }
}
album.propTypes = {
  apiObj: PropTypes.object,
}.isRequired;
export default album;
