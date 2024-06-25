import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import { API_ENDPOINTS, PLACEHOLDER_TEXTS } from '../../constants';
import './Registration.css';

const Registration = () => {
  const env = 'http://localhost:4000';
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateName = (name) => {
    const nameRegex = /^[A-Za-z]{4,20}$/;
    return nameRegex.test(name);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return email.length >= 3 && email.length <= 50 && emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6 && password.length <= 20;
  };

  const validateForm = () => {
    const newErrors = {};
    if (!validateName(name)) {
      newErrors.name = 'Name must be 4-20 alphabetical characters.';
    }
    if (!validateEmail(email)) {
      newErrors.email = 'Email must be 3-50 characters and a valid email address.';
    }
    if (!validatePassword(password)) {
      newErrors.password = 'Password must be 6-20 characters.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      const response = await fetch(env + API_ENDPOINTS.REGISTER, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        navigate('/login');
      } else {
        // Handle error
        alert('Registration failed');
      }
    }
  };

  return (
    <div className="registration-container">
      <form onSubmit={handleSubmit}>
        <h2>Registration</h2>
        <Input
          labelText="Name: "
          placeholder={PLACEHOLDER_TEXTS.NAME}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {errors.name && <p className="error">{errors.name}</p>}
        <Input
          labelText="Email: "
          placeholder={PLACEHOLDER_TEXTS.EMAIL}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <p className="error">{errors.email}</p>}
        <Input
          labelText="Password: "
          placeholder={PLACEHOLDER_TEXTS.PASSWORD}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && <p className="error">{errors.password}</p>}
        <Button type="submit">Register</Button>
        <p>
          If you have an account you can <a href="/login">Login</a>
        </p>
      </form>
    </div>
  );
};

export default Registration;
