
import React, { useState, useEffect } from 'react';
import { Grid, Paper, Typography, Box, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, MenuItem, Select } from '@mui/material';
import axios from 'axios';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

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
  const [users, setUsers] = useState([]);
  const [selectedTicketId, setSelectedTicketId] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [assignDialogOpen, setAssignDialogOpen] = useState(false);
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
      }
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(url, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTickets(response.data);
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    };
    fetchTickets();
  }, [selectedFilter]);

  const handleOpenAssignDialog = async (ticketId) => {
    setSelectedTicketId(ticketId);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8080/api/admin/get-person-by-org', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setUsers(response.data.allPersons || []);
      setAssignDialogOpen(true);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  const handleAssign = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:8080/api/tickets/assign?ticketId=${selectedTicketId}&userId=${selectedUserId}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAssignDialogOpen(false);
      setSelectedUserId('');
    } catch (error) {
      console.error('Error assigning ticket:', error);
    }
  };

  const handleBackClick = () => {
    setDateFilter((prev) => (prev === 'Today' ? 'Yesterday' : 'Today'));
  };

  const handleForwardClick = () => {
    setDateFilter((prev) => (prev === 'Today' ? 'All Time' : 'Today'));
  };

  const TicketCard = ({ ticket }) => (
    <Paper elevation={3} sx={{ p: 2, mb: 2, mr: 4, backgroundColor: '#f2f2f2' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
        <Typography variant="h6" sx={{ fontSize: '1rem', color: '3c3c3c' }}>Ticket #{ticket.id}</Typography>
        <Typography variant="caption" sx={{ fontSize: '.7rem', color: '#afafaf' }}>{timeAgo(ticket.createdDate)}</Typography>
      </Box>
      <Typography variant="body1" sx={{ fontSize: '1rem', color: '3c3c3c', textAlign: 'center', mt: 2 }}>{ticket.title}</Typography>
      <Typography sx={{ fontSize: '1rem', color: '3c3c3c', textAlign: 'center', mt: 2 }}>{ticket.description}</Typography>
     <Box
  sx={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    mt: 2,
    border: '2px solid #056FF6', // bright blue border
    borderRadius: '9px',
    padding: '8px',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#f0f8ff'
    }
  }}
  onClick={() => handleOpenAssignDialog(ticket.id)}
>
  <Typography
    variant="body1"
    sx={{ fontSize: '1rem', color: '#3c3c3c', textAlign: 'center' }}
  >
    Assign
  </Typography>
</Box>

    </Paper>
  );

  const NoTicketsMessage = () => (
    <Box sx={{ textAlign: 'center', mt: 4 }}>
      <Typography variant="h6" sx={{ color: '#999' }}>No {selectedFilter.toLowerCase()} available</Typography>
    </Box>
  );

  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 3 }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          {['New Tickets', 'Ongoing Tickets', 'Resolved'].map((filter) => (
            <Button key={filter} variant={selectedFilter === filter ? 'contained' : 'text'} onClick={() => setSelectedFilter(filter)}>{filter}</Button>
          ))}
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Button>{dateFilter}</Button>
          <IconButton onClick={handleBackClick}><ArrowBackIosIcon fontSize="small" /></IconButton>
          <IconButton onClick={handleForwardClick}><ArrowForwardIosIcon fontSize="small" /></IconButton>
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

      <Dialog open={assignDialogOpen} onClose={() => setAssignDialogOpen(false)}>
        <DialogTitle>Assign Ticket</DialogTitle>
        <DialogContent>
          <Select
            fullWidth
            value={selectedUserId}
            onChange={(e) => setSelectedUserId(e.target.value)}
            displayEmpty
          >
            <MenuItem value="" disabled>Select user</MenuItem>
            {users.map((user) => (
              <MenuItem key={user.id} value={user.id}>{user.name}</MenuItem>
            ))}
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAssignDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleAssign} variant="contained" disabled={!selectedUserId}>Assign</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TicketManagement;
