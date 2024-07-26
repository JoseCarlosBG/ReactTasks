import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import PropTypes from 'prop-types';
import './Login.css';
import { loginUser } from '../../store/user/thunk';

const Login = ({ setUserName }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await dispatch(loginUser(email, password));
      let userName = localStorage.getItem('userName'); // Fetch userName from localStorage after login

      if (!userName || userName.trim() === '' || userName.trim() === 'null') {
        userName = 'ADMIN';
      }
      
      setUserName(userName); // Update state with the fetched or default userName
      navigate('/courses');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <Input
          labelText="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
          required
        />
        <Input
          labelText="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          required
        />
        <Button type="submit">Login</Button>
      </form>
      <p>
        If you do not have an account, you can <Link to="/registration">Register</Link>
      </p>
    </div>
  );
};

Login.propTypes = {
  setUserName: PropTypes.func.isRequired,
};

export default Login;
