// ContactUs.js
import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import './ContactUs.css';

import {
  Container,
  TextField,
  Button,
  Typography,
  Snackbar,
  Box,
} from '@mui/material';

export const ContactUs = () => {
  const form = useRef();
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_y5x22bg', 'template_qq3witv', form.current, 'VCA4mvrlwmPyWJ7Sy')
      .then(
        (result) => {
          setSuccessMsg('Email sent successfully!');
          setErrorMsg('');
          form.current.reset();
        },
        (error) => {
          setErrorMsg(`Failed to send email: ${error.text}`);
          setSuccessMsg('');
        }
      );
  };

  return (
    <div className="contact-page">
      <Container maxWidth="sm" className="contact-us-container">
        <Box>
          <Typography variant="h4" gutterBottom align="center">
            Contact Us
          </Typography>
          <form ref={form} onSubmit={sendEmail} className="contact-form">
            <TextField
              label="Name"
              name="user_name"
              variant="outlined"
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Email"
              name="user_email"
              type="email"
              variant="outlined"
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Message"
              name="message"
              variant="outlined"
              multiline
              rows={4}
              fullWidth
              margin="normal"
              required
            />
            <Button variant="contained" color="primary" type="submit" fullWidth className="submit-button">
              Send
            </Button>
          </form>
          {successMsg && (
            <Snackbar
              open={true}
              autoHideDuration={6000}
              message={successMsg}
              onClose={() => setSuccessMsg('')}
            />
          )}
          {errorMsg && (
            <Snackbar
              open={true}
              autoHideDuration={6000}
              message={errorMsg}
              onClose={() => setErrorMsg('')}
            />
          )}
        </Box>
      </Container>
    </div>
  );
};

export default ContactUs;
