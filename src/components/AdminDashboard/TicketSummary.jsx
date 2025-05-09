// src/components/TicketSummary.jsx
import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';

const summaryData = [
  { title: 'Total Tickets', count: 50, color: '#1976d2' },
  { title: 'Open Tickets', count: 10, color: '#d32f2f' },
  { title: 'In-Progress Tickets', count: 8, color: '#ffa726' },
  { title: 'Resolved Tickets', count: 32, color: '#388e3c' },
];

const TicketSummary = () => {
  return (
    <Grid container spacing={2} style={{ marginTop: '20px' }}>
      {summaryData.map((data, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <Paper style={{ padding: '20px', textAlign: 'center', backgroundColor: data.color, color: '#fff' }}>
            <Typography variant="h6">{data.title}</Typography>
            <Typography variant="h4">{data.count}</Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default TicketSummary;
