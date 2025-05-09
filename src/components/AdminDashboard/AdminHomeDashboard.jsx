import React, { useState, useEffect } from 'react';
import { Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Header from './AdminHeader';
import SummaryCards from './SummaryCards';
import TicketFilters from './TicketFilters';
import RecentActivities from './RecentActivities';

const AdminHomeDashboard = () => {
  const [loading, setLoading] = useState(true); // Added loading state
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      // If token is empty or not found, navigate to the signed-out page
      navigate('/signed-out');
    } else {
      try {
        const payload = JSON.parse(atob(token.split('.')[1])); // Decoding JWT token
        const isExpired = payload.exp * 1000 < Date.now();
        if (isExpired) {
          navigate('/');
        } else {
          setLoading(false); // Token is valid, stop loading
        }
      } catch (error) {
        console.error('Invalid token:', error);
        navigate('/');
      }
    }
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>; // Show loading indicator while validating token
  }

  return (
    <Container maxWidth="lg">
      <Header />
      <SummaryCards />
      <TicketFilters />
      <RecentActivities />
    </Container>
  );
}

export default AdminHomeDashboard;
