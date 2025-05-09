import React, { useState, useEffect } from 'react';
import { Grid, Paper, Typography, Box, Button, IconButton } from '@mui/material';
import axios from 'axios';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

// Function to convert date to "time ago" format
function timeAgo(dateString) {
  const now = new Date();
  const date = new Date(dateString);
  const seconds = Math.floor((now - date) / 1000);
  
  const intervals = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 },
    { label: 'second', seconds: 1 }
  ];

  for (let i = 0; i < intervals.length; i++) {
    const interval = intervals[i];
    const count = Math.floor(seconds / interval.seconds);
    if (count !== 0) {
      return `${count} ${interval.label}${count !== 1 ? 's' : ''} ago`;
    }
  }

  return 'just now';
}


const TicketManagement = () => {
  const [tickets, setTickets] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('New Tickets');
  const [dateFilter, setDateFilter] = useState('Today');

  useEffect(() => {
    const fetchTickets = async () => {
      let url;
      switch (selectedFilter) {
        case 'New Tickets':
          url = 'http://localhost:8080/api/tickets/last-three-open-tickets';
          break;
        case 'Ongoing Tickets':
          url = 'http://localhost:8080/api/tickets/last-three-in-progress-tickets';
          break;
        case 'Resolved':
          url = 'http://localhost:8080/api/tickets/last-three-resolved-tickets';
          break;
        default:
          url = 'http://localhost:8080/api/tickets/last-three-open-tickets';
          break;
      }

      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(url, {
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
  }, [selectedFilter]);

  const handleBackClick = () => {
    setDateFilter((prev) => (prev === 'Today' ? 'Yesterday' : 'Today'));
  };

  const handleForwardClick = () => {
    setDateFilter((prev) => (prev === 'Today' ? 'All Time' : 'Today'));
  };

  const TicketCard = ({ ticket }) => (
    <Paper
      elevation={3}
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
          Ticket #{ticket.id}
        </Typography>
        <Typography variant="caption" sx={{ fontSize: '.7rem', color: '#afafaf' }}>
          {timeAgo(ticket.createdDate)}
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

  const NoTicketsMessage = () => (
    <Box sx={{ textAlign: 'center', mt: 4 }}>
      <Typography variant="h6" sx={{ color: '#999' }}>
        No {selectedFilter.toLowerCase()} available
      </Typography>
    </Box>
  );

  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 3, p: 0.5, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant={selectedFilter === 'New Tickets' ? 'contained' : 'text'}
            onClick={() => setSelectedFilter('New Tickets')}
            sx={{
              backgroundColor: selectedFilter === 'New Tickets' ? '#fff' : 'transparent',
              color: selectedFilter === 'New Tickets' ? '#afafaf' : '#b0b0b0',
              boxShadow: 'none',
              fontSize: '0.75rem',
              padding: '0.5rem',
              border: '1px solid',
              borderColor: selectedFilter === 'New Tickets' ? '#fff' : 'transparent',
              borderRadius: 2,
              textTransform: 'none',
              '&:hover': {
                backgroundColor: '#f0f0f0',
                fontSize: '0.75rem'
              }
            }}
          >
            New Tickets
          </Button>
          <Button
            variant={selectedFilter === 'Ongoing Tickets' ? 'contained' : 'text'}
            onClick={() => setSelectedFilter('Ongoing Tickets')}
            sx={{
              backgroundColor: selectedFilter === 'Ongoing Tickets' ? '#fff' : 'transparent',
              color: selectedFilter === 'Ongoing Tickets' ? '#afafaf' : '#b0b0b0',
              boxShadow: 'none',
              fontSize: '0.75rem',
              padding: '0.5rem',
              border: '1px solid',
              borderColor: selectedFilter === 'Ongoing Tickets' ? '#fff' : 'transparent',
              borderRadius: 2,
              textTransform: 'none',
              '&:hover': {
                backgroundColor: '#f0f0f0'
              }
            }}
          >
            Ongoing Tickets
          </Button>
          <Button
            variant={selectedFilter === 'Resolved' ? 'contained' : 'text'}
            onClick={() => setSelectedFilter('Resolved')}
            sx={{
              backgroundColor: selectedFilter === 'Resolved' ? '#fff' : 'transparent',
              color: selectedFilter === 'Resolved' ? '#afafaf' : '#b0b0b0',
              boxShadow: 'none',
              fontSize: '0.75rem',
              padding: '0.5rem',
              border: '1px solid',
              borderColor: selectedFilter === 'Resolved' ? '#fff' : 'transparent',
              borderRadius: 2,
              textTransform: 'none',
              '&:hover': {
                backgroundColor: '#f0f0f0'
              }
            }}
          >
            Resolved
          </Button>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#fff',
              color: '#afafaf',
              boxShadow: 'none',
              fontSize: '0.75rem',
              padding: '0.5rem',
              border: '1px solid',
              borderColor: '#fff',
              borderRadius: 2,
              textTransform: 'none',
              '&:hover': {
                backgroundColor: '#f0f0f0',
                fontSize: '0.75rem'
              }
            }}
          >
            {dateFilter}
          </Button>
          <IconButton onClick={handleBackClick} sx={{ color: '#000', backgroundColor: '#fff',
              color: '#afafaf',
              boxShadow: 'none',
              fontSize: '0.75rem',
              padding: '0.5rem',
              border: '1px solid',
              borderColor: '#fff',
              borderRadius: 2,'&:hover': { color: '#b0b0b0', } }}>
            <ArrowBackIosIcon fontSize="small" />
          </IconButton>
          <IconButton  onClick={handleForwardClick} sx={{ color: '#000',backgroundColor: '#fff',
              color: '#afafaf',
              boxShadow: 'none',
              fontSize: '0.75rem',
              padding: '0.5rem',
              border: '1px solid',
              paddingRight: 1,
              paddingLeft: 1,
              marginRight:3,
              borderColor: '#fff',
              borderRadius: 2, '&:hover': { color: '#b0b0b0' } }}>
            <ArrowForwardIosIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>

      {tickets.length > 0 ? (
        <Grid container spacing={2} sx={{ mt: 2 }}>
          {tickets.map((ticket) => (
            <Grid item xs={12} sm={6} md={4} key={ticket.id}>
              <TicketCard ticket={ticket} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <NoTicketsMessage />
      )}
    </div>
  );
};

export default TicketManagement;
