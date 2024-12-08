import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Import your CSS file
import api from '../services/apiService'; // Import the API service

export default function Login() {
  const [credentials, setCredentials] = useState({ Username: '', Password: '' });
  const [message, setMessage] = useState(''); // State to handle success/error message
  const [loading, setLoading] = useState(false); // State for loading indicator
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    setMessage(''); // Clear previous messages

    try {
      const response = await api.post('/auth/login', credentials); // Use Axios API instance

      if (response.status === 200 && response.data.token) {
        localStorage.setItem('token', response.data.token); // Store JWT token
        setMessage('Login successful! Redirecting to home...'); // Show success message
        setTimeout(() => {
          navigate('/home'); // Redirect to home page after 1 second
        }, 1000);
      } else {
        setMessage(response.data.message || 'Login failed.'); // Show error message
      }
    } catch (error) {
      setMessage('An error occurred during login. Please try again.');
      console.error('Error:', error);
    } finally {
      setLoading(false); // Stop loading
    }
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <h2 className="login-header">Login to your account</h2>

        <form onSubmit={handleSubmit} className="login-form">
          <div>
            <label htmlFor="username" className="login-label">Username</label>
            <input
              id="username"
              name="Username"
              type="text"
              placeholder="Username"
              value={credentials.Username}
              onChange={handleChange}
              required
              className="login-input"
            />
          </div>

          <div>
            <label htmlFor="password" className="login-label">Password</label>
            <input
              id="password"
              name="Password"
              type="password"
              placeholder="Password"
              value={credentials.Password}
              onChange={handleChange}
              required
              className="login-input"
            />
          </div>

          <button type="submit" disabled={loading} className="login-button">
            {loading ? 'Logging in...' : 'Login'}
          </button>

          {message && <p className="login-message">{message}</p>}
        </form>

        <p className="login-footer">
          Not a member?{' '}
          <a href="#" className="login-link">Start a 14-day free trial</a>
        </p>
      </div>
    </div>
  );
}
