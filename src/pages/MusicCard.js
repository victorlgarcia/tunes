import React from 'react';
import propTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { trackName, previewUrl } = this.props;
    // console.log(disc);
    return (
      <li>
        <p>
          {' '}
          {trackName}
        </p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          {' '}
          <code>audio</code>
          .
        </audio>
      </li>
    );
  }
}

MusicCard.propTypes = {
  disc: propTypes.object,
}.isRequired;

export default MusicCard;
