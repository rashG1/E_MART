import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';
import api from '../services/apiService';

const Signup = () => {
  const [formData, setFormData] = useState({
    Username: '',
    Name: '',
    Address: '',
    Contact: '',
    Type: 'End',
    City: '',
    Password: '',
  });
  const [message, setMessage] = useState('');
  const [step, setStep] = useState(1);
  const navigate = useNavigate(); // Use navigate instead of window.location.href

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Use the `api` service to make the request
      const response = await api.post('/auth/signup', formData);
      setMessage(response.data.message);

      if (response.status === 201) {
        setTimeout(() => {
          navigate('/login'); // Navigate to login page
        }, 10);
      }
    } catch (error) {
      setMessage('An error occurred. Your Username is already used.');
      console.error('Error:', error);
    }
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <div className="signup-page">
      <div className="signup-container">
        <h2 className="signup-header">Create Your Account</h2>

        <form onSubmit={handleSubmit} className="signup-form">
          {step === 1 && (
            <>
              <div>
                <label htmlFor="username" className="signup-label">Username</label>
                <input
                  id="username"
                  name="Username"
                  type="text"
                  placeholder="Username"
                  value={formData.Username}
                  onChange={handleChange}
                  required
                  className="signup-input"
                />
              </div>

              <div>
                <label htmlFor="name" className="signup-label">Name</label>
                <input
                  id="name"
                  name="Name"
                  type="text"
                  placeholder="Name"
                  value={formData.Name}
                  onChange={handleChange}
                  required
                  className="signup-input"
                />
              </div>

              <div>
                <label htmlFor="address" className="signup-label">Address</label>
                <input
                  id="address"
                  name="Address"
                  type="text"
                  placeholder="Address"
                  value={formData.Address}
                  onChange={handleChange}
                  required
                  className="signup-input"
                />
              </div>

              <div>
                <button type="button" className="signup-button" onClick={nextStep}>
                  Next
                </button>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div>
                <label htmlFor="contact" className="signup-label">Contact</label>
                <input
                  id="contact"
                  name="Contact"
                  type="text"
                  placeholder="Contact"
                  value={formData.Contact}
                  onChange={handleChange}
                  required
                  className="signup-input"
                />
              </div>

              <div>
                <label htmlFor="type" className="signup-label">Type</label>
                <select
                  id="type"
                  name="Type"
                  value={formData.Type}
                  onChange={handleChange}
                  required
                  className="signup-select"
                >
                  <option value="End">End</option>
                  <option value="Retailer">Retailer</option>
                </select>
              </div>

              <div>
                <label htmlFor="city" className="signup-label">City</label>
                <input
                  id="city"
                  name="City"
                  type="text"
                  placeholder="City"
                  value={formData.City}
                  onChange={handleChange}
                  required
                  className="signup-input"
                />
              </div>

              <div>
                <label htmlFor="password" className="signup-label">Password</label>
                <input
                  id="password"
                  name="Password"
                  type="password"
                  placeholder="Password"
                  value={formData.Password}
                  onChange={handleChange}
                  required
                  className="signup-input"
                />
              </div>

              <div>
                <button type="button" className="signup-button" onClick={prevStep}>
                  Back
                </button>
                <button type="submit" className="signup-button">
                  Submit
                </button>
              </div>
            </>
          )}

          {message && <p className="signup-message">{message}</p>}
        </form>

        <p className="signup-footer">
          Already have an account?{' '}
          <a href="/login" className="signup-link">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
