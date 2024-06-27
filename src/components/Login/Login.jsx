import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import './Login.css';

const Login = ({ setUserName }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      // Check if the response is not OK
      if (!response.ok) {
        console.error('Login failed with status:', response.status);
        return;
      }

      const result = await response.json();

      // Check if the result is successful and contains a token
      if (!result.successful || !result.result) {
        console.error('Token or username is missing in the response');
        return;
      }

      // Extract token from the result and set it in local storage
      const token = result.result.replace('Bearer ', '');
      localStorage.setItem('userToken', token);

      // Set user name if available
      if (result.user && result.user.name) {
        localStorage.setItem('userName', result.user.name);
        setUserName(result.user.name);
      }

      // Navigate to the courses page
      navigate('/courses');
      
    } catch (error) {
      console.error('Error:', error);
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

export default Login;
