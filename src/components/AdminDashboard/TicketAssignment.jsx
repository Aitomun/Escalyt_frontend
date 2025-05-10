import React, { useState, useEffect } from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';
import axios from 'axios';

const TicketCard = ({ ticket }) => (
  <Paper
    elevation={2}
    sx={{
      p: 2,
      mb: 2,
      mr: 4,
      backgroundColor: '#f2f2f2',
      "&:hover": {
        "& *": {
          fontSize: '0.875rem',
          fontWeight: 400,
          lineHeight: 1.43,
          letterSpacing: '0.01071em'
        }
      }
    }}
  >
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
      <Typography variant="h6" sx={{ fontSize: '1rem', color: '3c3c3c' }}>
        Tickets #{ticket.id}
      </Typography>
      <Typography variant="caption" sx={{ fontSize: '.7rem', color: '#afafaf' }}>
        {ticket.time}
      </Typography>
    </Box>

    <Typography variant="body1" sx={{ fontSize: '1rem', color: '3c3c3c', textAlign: 'center', marginTop: 2 }}>
      {ticket.title}
    </Typography>
    <Typography sx={{ fontSize: '1rem', color: '3c3c3c', textAlign: 'center', marginTop: 2 }} variant="body1" color="textSecondary">
      {ticket.description}
    </Typography>
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 2, backgroundColor: '#fff', border: 1.8, borderColor: '#bbbcbc', padding: 1 }}>
      <Typography variant="body1" sx={{ fontSize: '1rem', color: '#3c3c3c', textAlign: 'center' }}>
        Assign
      </Typography>
    </Box>
  </Paper>
);

const TicketAssignment = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8080/api/tickets/last-three-open-tickets', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });


        if (response.status === 401) {
          throw new Error('Unauthorized');
        }

        setTickets(response.data);
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    };

    fetchTickets();
  }, []);

  return (
    <Grid container spacing={2} sx={{ mt: 2 }}>
      {tickets.map((ticket) => (
        <Grid item xs={12} sm={6} md={4} key={ticket.id}>
          <TicketCard ticket={ticket} />
        </Grid>
      ))}
    </Grid>
  );
};

export default TicketAssignment;
