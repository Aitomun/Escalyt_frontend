import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const SignedOutPage = () => {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate('/');
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
          You Have Been Signed Out
        </Typography>
        <Typography variant="body1" color="textSecondary" paragraph>
          Please log in again to continue.
        </Typography>
        <Button variant="contained" color="primary" onClick={handleLoginRedirect}>
          Go to Homepage
        </Button>
      </Box>
    </Container>
  );
};

export default SignedOutPage;
