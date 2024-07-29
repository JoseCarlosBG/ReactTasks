import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Logo from "./components/Logo/Logo";
import { logoutUser } from "../../store/user/thunk";
import { PATHS, API_ENDPOINTS, ENV } from "../../constants";
import "./Header.css";

const Header = ({ userName, token, onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate(PATHS.LOGIN);
  };

  const handleRegistrationClick = () => {
    navigate(PATHS.REGISTRATION);
  };

  const handleLogout = async () => {
    try {
      const response = await fetch(ENV + API_ENDPOINTS.LOGOUT, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        onLogout();
        navigate(PATHS.LOGIN);
      } else {
        console.error("Failed to logout:", response.status);
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const displayUserName =
    userName && userName.trim() !== "" ? userName : "ADMIN";

  return (
    <header className="header">
      <div className="header-logo">
        <Logo />
      </div>
      <nav className="header-nav">
        {!displayUserName && (
          <>
            <button onClick={handleRegistrationClick}>Register</button>
            <button onClick={handleLoginClick}>Login</button>
          </>
        )}
      </nav>
      {displayUserName &&
        location.pathname !== PATHS.LOGIN &&
        location.pathname !== PATHS.REGISTRATION && (
          <div className="header-user">
            <span>{displayUserName}</span>
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
    </header>
  );
};

Header.propTypes = {
  userName: PropTypes.string,
  token: PropTypes.string.isRequired,
  onLogout: PropTypes.func.isRequired,
};

Header.defaultProps = {
  userName: "",
};

const mapStateToProps = (state) => ({
  userName: state.user.name,
  token: state.user.token,
});

const mapDispatchToProps = {
  onLogout: logoutUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
