import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Checkbox,
  IconButton,
  Container,
  Popover,
  Button,
  Box
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

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

const RecentActivities = () => {
  const [activities, setActivities] = useState([]);
  const [selected, setSelected] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedActivity, setSelectedActivity] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch("http://localhost:8080/api/tickets/admin/recent?", {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.status === 401) {
          throw new Error('Unauthorized');
        }

        const data = await response.json();
        setActivities(data.content);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = activities.map((activity) => activity.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const handleMoreClick = (event, activity) => {
    setAnchorEl(event.currentTarget);
    setSelectedActivity(activity);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedActivity(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <Container>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Recent Activities
      </Typography>
      
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: '#e0f7fa' }}>
            <TableCell padding="checkbox">
              <Checkbox
                indeterminate={selected.length > 0 && selected.length < activities.length}
                checked={activities.length > 0 && selected.length === activities.length}
                onChange={handleSelectAllClick}
              />
            </TableCell>
            <TableCell>Ticket Number</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Priority</TableCell>
            <TableCell>Assignee</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Date Created</TableCell>
            <TableCell>Location</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {activities.map((activity) => {
            const isItemSelected = isSelected(activity.id);
            return (
              <TableRow
                key={activity.id}
                hover
                role="checkbox"
                aria-checked={isItemSelected}
                selected={isItemSelected}
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={isItemSelected}
                    onChange={(event) => handleClick(event, activity.id)}
                  />
                </TableCell>
                <TableCell>{activity.id}</TableCell>
                <TableCell>{activity.title}</TableCell>
                <TableCell>
                  {activity.priority === 'HIGH' ? (
                    <span>
                      <span style={{ color: 'red', fontSize: '1.5em', marginRight: '0.5em' }}>●</span>
                      High
                    </span>
                  ) : activity.priority === 'MEDIUM' ? (
                    <span>
                      <span style={{ color: 'orange', fontSize: '1.5em', marginRight: '0.5em' }}>●</span>
                      Medium
                    </span>
                  ) : (
                    <span>
                      <span style={{ color: 'green', fontSize: '1.5em', marginRight: '0.5em' }}>●</span>
                      Low
                    </span>
                  )}
                </TableCell>
                <TableCell>{activity.assigneeId ? `${activity.assigneeId}` : "Unassigned"}</TableCell>
                <TableCell>{activity.status}</TableCell>
                <TableCell>{activity.categoryId}</TableCell>
                <TableCell>{activity.createdDate ? timeAgo(activity.createdDate) : "N/A"}</TableCell>
                      <TableCell>{activity.location}</TableCell>
                <TableCell>
                  <IconButton onClick={(event) => handleMoreClick(event, activity)}>
                    <MoreVertIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <Popover
  id={id}
  open={open}
  anchorEl={anchorEl}
  onClose={handleClose}
  anchorOrigin={{
    vertical: 'bottom',
    horizontal: 'left',
  }}
  transformOrigin={{
    vertical: 'top',
    horizontal: 'left',
  }}
  PaperProps={{
    sx: {
      width: '10%', 
    },
  }}
>
  <Box p={2} sx={{ color: 'grey.700' }}> {/* Set text color to grey */}
    <Button fullWidth onClick={handleClose} sx={{ color: 'grey.700' }}>View</Button>
    <Button fullWidth onClick={handleClose} sx={{ color: 'grey.700' }}>Resolve</Button>
    <Button fullWidth onClick={handleClose} sx={{ color: 'grey.700' }}>Delete</Button>
  </Box>
</Popover>

    </Container>
  );
};

export default RecentActivities;
