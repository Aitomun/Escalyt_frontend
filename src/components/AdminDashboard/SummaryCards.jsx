import React, { useState, useEffect } from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';
import axios from 'axios';
import FolderIcon from '@mui/icons-material/Folder';
import DraftsIcon from '@mui/icons-material/Drafts';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const SummaryCards = () => {
  const [summaryData, setSummaryData] = useState([
    { title: 'Total Tickets', count: 0, color: '#e3f2fd', icon: <FolderIcon sx={{ color: '#1976d2' }} /> },
    { title: 'Open Tickets', count: 0, color: '#ffebee', icon: <DraftsIcon sx={{ color: '#d32f2f' }} /> },
    { title: 'In-Progress Tickets', count: 0, color: '#fff3e0', icon: <HourglassEmptyIcon sx={{ color: '#ffa000' }} /> },
    { title: 'Resolved Tickets', count: 0, color: '#e8f5e9', icon: <CheckCircleOutlineIcon sx={{ color: '#388e3c' }} /> },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        
        const response = await axios.get('http://localhost:8080/api/tickets/count', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });


        if (response.status === 401) {
          throw new Error('Unauthorized');
        }

        const data = response.data;
        setSummaryData([
          { title: 'Total Tickets', count: data.open + data.inReview + data.resolved, color: '#e3f2fd', icon: <FolderIcon sx={{ color: '#1976d2' }} /> },
          { title: 'Open Tickets', count: data.open, color: '#ffebee', icon: <DraftsIcon sx={{ color: '#d32f2f' }} /> },
          { title: 'In-Progress Tickets', count: data.inReview, color: '#fff3e0', icon: <HourglassEmptyIcon sx={{ color: '#ffa000' }} /> },
          { title: 'Resolved Tickets', count: data.resolved, color: '#e8f5e9', icon: <CheckCircleOutlineIcon sx={{ color: '#388e3c' }} /> },
        ]);
      } catch (error) {
        console.error('Error fetching ticket count:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Grid container spacing={2} sx={{ mt: 2 }}>
      {summaryData.map((data, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <Paper elevation={3} sx={{ p: 2, textAlign: 'left', backgroundColor: data.color }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="body2" sx={{ color: '#000' }}>
                {data.title}
              </Typography>
              {data.icon}
            </Box>
            <Typography variant="h4" sx={{ color: data.icon.props.sx.color, marginTop: 1 }}>
              {data.count}
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default SummaryCards;
