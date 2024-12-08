import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Use named import

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');

    if (token) {
        try {
            // Decode the token and check expiration
            const decodedToken = jwtDecode(token);
            const currentTime = Date.now() / 1000; // Current time in seconds

            if (decodedToken.exp < currentTime) {
                // Token has expired
                localStorage.removeItem('token'); // Optionally remove expired token
                return <Navigate to="/login" replace />;
            }

            // Token is valid
            return children;
        } catch (error) {
            console.error('Invalid token', error);
            return <Navigate to="/login" replace />;
        }
    }

    // No token found
    return <Navigate to="/login" replace />;
};

export default ProtectedRoute;
