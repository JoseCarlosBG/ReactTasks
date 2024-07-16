import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getUserRole } from '../../store/selectors'; 

const PrivateRoute = ({ children }) => {
  const userRole = useSelector(getUserRole);

  if (userRole !== 'ADMIN') {
    return <Navigate to="/courses" />;
  }

  return children;
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;
