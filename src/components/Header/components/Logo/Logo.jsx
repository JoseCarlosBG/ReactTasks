import React from 'react';
import PropTypes from 'prop-types';
import logo from './Logo.png';

const Logo = ({ src, alt, style }) => {
  return (
    <img
      src={src || logo}
      alt={alt || 'Logo'}
      style={style || { width: '100px', height: 'auto' }}
    />
  );
};

Logo.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  style: PropTypes.object,
};

Logo.defaultProps = {
  src: logo,
  alt: 'Logo',
  style: { width: '100px', height: 'auto' },
};

export default Logo;
