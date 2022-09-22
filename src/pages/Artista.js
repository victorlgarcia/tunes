import React from 'react';
import PropTypes from 'prop-types';

class Artista extends React.Component {
  render() {
    const { input } = this.props;

    return (
      <p className="subtitle is-4">
        {`Resultado de álbuns de: ${input}`}
      </p>
    );
  }
}

Artista.propTypes = {
  apiObj: PropTypes.string,
}.isRequired;

export default Artista;
