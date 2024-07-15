import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Logo from './components/Logo/Logo';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../store/user/actions'; // Adjust path as per your file structure
import './Header.css';

const Header = ({ userName, isAuth, onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleRegistrationClick = () => {
    navigate('/registration');
  };

  const handleLogout = () => {
    onLogout(); // Dispatch logout action
    navigate('/login'); // Redirect to login page
  };

  return (
    <header className="header">
      <div className="header-logo">
        <Logo />
      </div>
      <nav className="header-nav">
        {!isAuth && (
          <>
            <button onClick={handleRegistrationClick}>Register</button>
            <button onClick={handleLoginClick}>Login</button>
          </>
        )}
      </nav>
      {isAuth && location.pathname !== '/login' && location.pathname !== '/registration' && (
        <div className="header-user">
          <span>{userName}</span>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </header>
  );
};

Header.propTypes = {
  userName: PropTypes.string,
  isAuth: PropTypes.bool.isRequired,
  onLogout: PropTypes.func.isRequired,
};

Header.defaultProps = {
  userName: '',
};

const mapStateToProps = (state) => ({
  userName: state.user.name,
  isAuth: state.user.isAuth,
});

const mapDispatchToProps = {
  onLogout: logoutUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
