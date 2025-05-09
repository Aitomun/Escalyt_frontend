// src/components/TicketList.jsx
import React, { useState } from 'react';
import { Tabs, Tab, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField,Checkbox } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const tickets = [
  { number: '001', title: 'Fix leaking pipe', priority: 'High', assignee: 'Abdul Ahmed', status: 'Resolved', category: 'Plumbing', date: '2 days ago', location: 'Building B' },
  { number: '002', title: 'Install new office chairs', priority: 'Medium', assignee: 'Sophie Artesay', status: 'Open', category: 'Office', date: '3 days ago', location: 'Building A' },
  // ... more tickets
];

const TicketList = () => {
  const [tabValue, setTabValue] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box style={{ marginTop: '20px' }}>
      <Tabs value={tabValue} onChange={handleChange} centered>
        <Tab label="New Tickets" />
        <Tab label="Ongoing Tickets" />
        <Tab label="Resolved Tickets" />
      </Tabs>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Date"
          value={selectedDate}
          onChange={(newDate) => setSelectedDate(newDate)}
          renderInput={(params) => <TextField {...params} style={{ marginTop: '20px' }} />}
        />
      </LocalizationProvider>
      <TableContainer component={Paper} style={{ marginTop: '20px' }}>
        <Table>
          <TableHead>
            <TableRow>
            
                <TableCell>Ticket Number</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Priority</TableCell>
              <TableCell>Assignee</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Date Created</TableCell>
              <TableCell>Location</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tickets.map((ticket) => (
              <TableRow key={ticket.number}>
                <TableCell>{ticket.number}</TableCell>
                <TableCell>{ticket.title}</TableCell>
                <TableCell style={{ color: ticket.priority === 'High' ? '#d32f2f' : ticket.priority === 'Medium' ? '#ffa726' : '#388e3c' }}>{ticket.priority}</TableCell>
                <TableCell>{ticket.assignee}</TableCell>
                <TableCell>{ticket.status}</TableCell>
                <TableCell>{ticket.category}</TableCell>
                <TableCell>{ticket.date}</TableCell>
                <TableCell>{ticket.location}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TicketList;
