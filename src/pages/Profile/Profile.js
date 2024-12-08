import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import api from '../../services/apiService';
import './Profile.css';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      const customerID = localStorage.getItem('customerID') || '1';

      try {
        const response = await api.get(`/profile`, {
          params: { customerID },
        });
        setUserData(response.data);
      } catch (err) {
        setError('Failed to fetch user data. Please try again.');
        console.error('Error fetching profile:', err);
      }
    };

    fetchProfileData();
  }, []);

  if (error) {
    return <Typography color="error" variant="body1">Error: {error}</Typography>;
  }

  if (!userData) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box className="profile-page">
      <Box className="profile-container">
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Profile
        </Typography>
        <Typography variant="body1"><strong>Username:</strong> {userData.Username}</Typography>
        <Typography variant="body1"><strong>Name:</strong> {userData.Name}</Typography>
        <Typography variant="body1"><strong>Address:</strong> {userData.Address}</Typography>
        <Typography variant="body1"><strong>Contact:</strong> {userData.Contact}</Typography>
        <Typography variant="body1"><strong>City:</strong> {userData.City}</Typography>
      </Box>
    </Box>
  );
};

export default Profile;
