import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import { placeholderTexts } from '../../constants';
import './Registration.css'; // Create and import a CSS file for styles

const Registration = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch('http://localhost:4000/register', {
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
  };

  return (
    <div className="registration-container">
      <form onSubmit={handleSubmit}>
        <h2>Registration</h2>
        <Input
          labelText="Name: "
          placeholder={placeholderTexts.name}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          labelText="Email: "
          placeholder={placeholderTexts.email}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          labelText="Password: "
          placeholder={placeholderTexts.password}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit">Register</Button>
        <p>
          If you have an account you can <a href="/login">Login</a>
        </p>
      </form>
    </div>
  );
};

export default Registration;
