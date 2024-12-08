import React from 'react';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    
    // If user is logged in, redirect to home
    if (token) {
        return <Navigate to="/home" replace />;
    }

    // Otherwise, show login or signup page
    return children;
};

export default PublicRoute;
