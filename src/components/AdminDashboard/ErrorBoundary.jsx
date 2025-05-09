import React from 'react';
import { Box, Typography, Button } from '@mui/material';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by ErrorBoundary: ", error, errorInfo);
  }

  handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/'; // Redirect to the home page
  };

  render() {
    if (this.state.hasError && window.location.pathname !== '/') {
      return (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh" bgcolor="#f5f5f5">
          <Typography variant="h4" color="error">Unauthorized User</Typography>
          <Typography variant="body1" color="textSecondary">Your session has expired or you are not authorized to access this page.</Typography>
          <Button variant="contained" color="primary" onClick={this.handleLogout} sx={{ mt: 2 }}>
            Go to Login
          </Button>
        </Box>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
