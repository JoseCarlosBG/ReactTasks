import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Logo from './components/Logo/Logo';
import PropTypes from 'prop-types';
import './Header.css';

const Header = ({ userName, onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleRegistrationClick = () => {
    navigate('/registration');
  };

  return (
    <header className="header">
      <div className="header-logo">
        <Logo />
      </div>
      <nav className="header-nav">
        {userName && <Link to="/courses">Courses</Link>}
        {userName && <Link to="/courses/add">Add New Course</Link>}
        {!userName && (
          <>
            <button onClick={handleRegistrationClick}>Register</button>
            <button onClick={handleLoginClick}>Login</button>
          </>
        )}
      </nav>
      {userName && location.pathname !== '/login' && location.pathname !== '/registration' && (
        <div className="header-user">
          <span>{userName}</span>
          <button onClick={onLogout}>Logout</button>
        </div>
      )}
    </header>
  );
};

Header.propTypes = {
  userName: PropTypes.string,
  onLogout: PropTypes.func.isRequired,
};

Header.defaultProps = {
  userName: '',
};

export default Header;
