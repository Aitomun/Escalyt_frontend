import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const withAuth = (WrappedComponent) => {
  return (props) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const verifyToken = async () => {
        const token = localStorage.getItem('token');
        const publicPaths = ['/', '/login', '/email-confirmation-success', '/email-confirmation-failure'];

        if (!token && !publicPaths.includes(location.pathname)) {
          navigate('/');
          return;
        }

        if (token) {
          try {
            const response = await fetch('http://localhost:8080/api/auth/verify-token', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              }
            });

            if (!response.ok && !publicPaths.includes(location.pathname)) {
              localStorage.removeItem('token');
              navigate('/');
            }
          } catch (error) {
            console.error('Error verifying token:', error);
            if (!publicPaths.includes(location.pathname)) {
              localStorage.removeItem('token');
              navigate('/');
            }
          }
        }
        setLoading(false);  // Set loading to false after token is verified
      };

      verifyToken();
    }, [navigate, location.pathname]);

    if (loading) {
      return <div>Loading...</div>;  // Display a loading indicator while verifying token
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
