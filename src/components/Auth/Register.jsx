import React, { useState } from 'react';
import axios from '../Services/api';
import { Link } from 'react-router-dom';
import './Register.css'; // Import your register page styles

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async () => {
    try {
      setLoading(true);
      const response = await axios.post('/auth/register', { email, password });
      console.log(response.data);
      // Handle success or redirect to login
    } catch (error) {
      console.error(error);
      setError('Registration failed. Please try again.'); // Set a meaningful error message
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <h2>Create Your Account</h2>
      <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      {error && <p className="error-message">{error}</p>}
      <button onClick={handleRegister} disabled={loading}>
        {loading ? 'Registering...' : 'Register'}
      </button>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Register;
