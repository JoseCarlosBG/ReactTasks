import React from 'react';
import Logo from './components/Logo/Logo';
import './Header.css';
import PropTypes from 'prop-types';

const Header = ({ name, onButtonClick }) => {
  return (
    <header className="header">
      <Logo />
      <div className="header__user-info">
        <span>{name}</span>
        <button className="button" onClick={onButtonClick}>Logout</button>
      </div>
    </header>
  );
};

Header.propTypes = {
  name: PropTypes.string.isRequired,
  onButtonClick: PropTypes.func.isRequired,
};

export default Header;
