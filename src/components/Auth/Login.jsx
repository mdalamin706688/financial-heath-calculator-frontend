import React, { useState } from 'react';
import axios from '../Services/api';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css'; // Import your login page styles

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post('/auth/login', { email, password });
      const token = response.data.token;
      localStorage.setItem('token', token);

      // Redirect to the financial data section
      navigate('/financial-data/view');
    } catch (error) {
      console.error(error);
      setError('Invalid email or password. Please try again.'); // Set a meaningful error message
    } finally {
      setLoading(false);
    }
  };

return (
    <div className="login-container">
        <h2>Login to Your Account</h2>
        <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        {error && <p className="error-message">{error}</p>}
        <button onClick={handleLogin} disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
        </button>
        <p>Don't have an account? Please <Link to="/register">Register</Link></p>
    </div>
);
}

export default Login;
