import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthPage.css';

const AuthPage = () => {
    const navigate = useNavigate(); // Using useNavigate for routing

    const handleLoginClick = () => {
        navigate('/login'); // Redirect to the login page
    };

    const handleSignupClick = () => {
        navigate('/signup'); // Redirect to the signup page
    };

    return (
        <div className="auth-container">
            <h1>Welcome to Our Platform</h1>
            <button className="auth-button" onClick={handleLoginClick}>Login</button>
            <button className="auth-button" onClick={handleSignupClick}>Signup</button>
        </div>
    );
};

export default AuthPage;
