import React from 'react';
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from './MusicCard';

class album extends React.Component {
  constructor() {
    super();
    this.state = {
      position: [],
      songs: [],
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

  render() {
    const { songs, position } = this.state;
    console.log(songs);
    return (
      <div data-testid="page-album">
        <Header />
        <h1 data-testid="artist-name">
          {position.artistName}
        </h1>
        <h2 data-testid="album-name">
          {position.collectionName}
        </h2>
        <ul>

          {songs.filter((disco) => disco !== position)
            .map((disc, id) => <MusicCard { ...disc } key={ id } />)}

        </ul>
      </div>
    );
  }
}
album.propTypes = {
  apiObj: PropTypes.object,
}.isRequired;
export default album;
