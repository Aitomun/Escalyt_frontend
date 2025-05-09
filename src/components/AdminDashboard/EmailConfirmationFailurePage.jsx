// src/EmailConfirmationFailurePage.js
import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

const EmailConfirmationFailurePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const message = query.get('message') || 'An error occurred while confirming your email.';

  const handleGoHome = () => {
    navigate('/'); // Redirect to the homepage
  };

  return (
    <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '50px' }}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="60vh"
        bgcolor="#f9f9f9"
        padding="40px"
        borderRadius="10px"
        boxShadow="0 0 10px rgba(0,0,0,0.1)"
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Error
        </Typography>
        <Typography variant="body1" color="textSecondary" paragraph>
          {message}
        </Typography>
        <Button variant="contained" color="primary" onClick={handleGoHome}>
          Go to Homepage
        </Button>
      </Box>
    </Container>
  );
};

export default EmailConfirmationFailurePage;
