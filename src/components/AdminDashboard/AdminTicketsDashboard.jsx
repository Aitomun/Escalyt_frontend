import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  Container,
  Box,
  FormControl,
  FormLabel,
  FormControlLabel,
  Button,
  Checkbox,
  FormGroup,
  Popover
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Header from './AdminHeader';
import { useNavigate } from 'react-router-dom';

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

  return 'now';
}

const AdminTicketsDashboard = () => {
  const [activities, setActivities] = useState([]);
  const [selected, setSelected] = useState([]);
  const [assignees, setAssignees] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showAllAssignees, setShowAllAssignees] = useState(false);
  const [filters, setFilters] = useState({
    priority: 'LOW',
    status: '',
    category: '',
    assigneeId: null
  });
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      // If token is empty or not found, navigate to homepage
      navigate('/signed-out');
    } else {
      // Optionally, you can add logic here to validate the token
      // For example, you could decode the token and check its expiration date
      // If token is invalid, navigate to homepage
      try {
        const payload = JSON.parse(atob(token.split('.')[1])); // Decoding JWT token
        const isExpired = payload.exp * 1000 < Date.now();
        if (isExpired) {
          navigate('/');
        }
      } catch (error) {
        console.error('Invalid token:', error);
        navigate('/');
      }
    }
    setLoading(false);  // Set loading to false after token is checked
  }, [navigate]);

  const fetchAssignees = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch("http://localhost:8080/api/admin/get-person-by-org", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 401) {
        throw new Error('Unauthorized');
      }
      const data = await response.json();
      setAssignees(data.allPersons || []);
    } catch (error) {
      console.error("Error fetching assignees:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch("http://localhost:8080/api/admin/categories", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 401) {
        throw new Error('Unauthorized');
      }
      const data = await response.json();
      setCategories(data.categories || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchData = async (filters) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch("http://localhost:8080/api/tickets/filter", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(filters)
      });

      if (response.status === 401) {
        throw new Error('Unauthorized');
      }

      const data = await response.json();
      setActivities(data.tickets || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (!loading) {
      fetchAssignees();
      fetchCategories();
      fetchData(filters);
    }
  }, [filters, loading]);

  if (loading) {
    return <div>Loading...</div>;  // Display a loading indicator while checking token
  }

  const handleCheckboxChange = (event) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: prevFilters[name] === value ? '' : value
    }));
  };

  const handleCategoryChange = (event) => {
    const { value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      category: prevFilters.category === value ? '' : value
    }));
  };

  const handleAssigneeChange = (event) => {
    const { value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      assigneeId: prevFilters.assigneeId === parseInt(value) ? null : parseInt(value)
    }));
  };

  const handleFilter = () => {
    fetchData(filters);
  };

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

  const getAssigneeNameById = (id) => {
    const assignee = assignees.find(assignee => assignee.id === id);
    return assignee ? assignee.name : "Unassigned";
  };

  const getCategoryNameById = (id) => {
    const category = categories.find(category => category.id === id);
    return category ? category.name : "Unknown";
  };

  return (
    <Container>
      <Header />

      <Box display="flex" mt={0}>
        <Box flex={1} sx={{ backgroundColor: '#f2f2f2', pl: 3, pt: 2, mr: 2 }}>
          <Typography variant="h6">Filters</Typography>
          <Box display="flex" flexDirection="column" gap={2}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Priority</FormLabel>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox name="priority" value="HIGH" checked={filters.priority === 'HIGH'} onChange={handleCheckboxChange} sx={{ transform: 'scale(0.8)' }} />}
                  label={<Typography sx={{ fontSize: '0.875rem' }}>High</Typography>}
                />
                <FormControlLabel
                  control={<Checkbox name="priority" value="MEDIUM" checked={filters.priority === 'MEDIUM'} onChange={handleCheckboxChange} sx={{ transform: 'scale(0.8)' }} />}
                  label={<Typography sx={{ fontSize: '0.875rem' }}>Medium</Typography>}
                />
                <FormControlLabel
                  control={<Checkbox name="priority" value="LOW" checked={filters.priority === 'LOW'} onChange={handleCheckboxChange} sx={{ transform: 'scale(0.8)' }} />}
                  label={<Typography sx={{ fontSize: '0.875rem' }}>Low</Typography>}
                />
              </FormGroup>
            </FormControl>
            <FormControl component="fieldset">
              <FormLabel component="legend">Status</FormLabel>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox name="status" value="OPEN" checked={filters.status === 'OPEN'} onChange={handleCheckboxChange} sx={{ transform: 'scale(0.8)' }} />}
                  label={<Typography sx={{ fontSize: '0.875rem' }}>Open</Typography>}
                />
                <FormControlLabel
                  control={<Checkbox name="status" value="IN_PROGRESS" checked={filters.status === 'IN_PROGRESS'} onChange={handleCheckboxChange} sx={{ transform: 'scale(0.8)' }} />}
                  label={<Typography sx={{ fontSize: '0.875rem' }}>In-Progress</Typography>}
                />
                <FormControlLabel
                  control={<Checkbox name="status" value="RESOLVED" checked={filters.status === 'RESOLVED'} onChange={handleCheckboxChange} sx={{ transform: 'scale(0.8)' }} />}
                  label={<Typography sx={{ fontSize: '0.875rem' }}>Resolved</Typography>}
                />
              </FormGroup>
            </FormControl>
            <FormControl component="fieldset">
              <FormLabel component="legend">Category</FormLabel>
              <FormGroup>
                {categories.length > 0 && categories.map((category, index) => (
                  <FormControlLabel
                    key={index}
                    control={<Checkbox name="category" value={category.id} checked={filters.category === category.id.toString()} onChange={handleCategoryChange} sx={{ transform: 'scale(0.8)' }} />}
                    label={<Typography sx={{ fontSize: '0.875rem' }}>{category.name}</Typography>}
                  />
                ))}
              </FormGroup>
            </FormControl>
            <FormControl component="fieldset">
              <FormLabel component="legend">Assignee</FormLabel>
              <FormGroup>
                {assignees.slice(0, showAllAssignees ? assignees.length : 3).map((assignee, index) => (
                  <FormControlLabel
                    key={index}
                    control={<Checkbox name="assigneeId" value={assignee.id} checked={filters.assigneeId === assignee.id} onChange={handleAssigneeChange} sx={{ transform: 'scale(0.8)' }} />}
                    label={<Typography sx={{ fontSize: '0.875rem' }}>{assignee.name}</Typography>}
                  />
                ))}
              </FormGroup>
              {assignees.length > 3 && (
                <Button variant="text" color="primary" onClick={() => setShowAllAssignees(!showAllAssignees)}>
                  {showAllAssignees ? 'Show Less' : 'Show More'}
                </Button>
              )}
            </FormControl>
          </Box>
        </Box>

        <Box flex={4}>
          <Typography variant="body1" sx={{ color: '#000' }}>
            Tickets({activities.length})
          </Typography>
          <Button variant="contained" color="primary" onClick={handleFilter} sx={{ mt: 2, textTransform: 'none', mb: 2 }}>
            Create Category
          </Button>
          <TableContainer>
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
                      <TableCell>{getAssigneeNameById(Number(activity.assigneeId))}</TableCell>
                      <TableCell>{activity.status}</TableCell>
                      <TableCell>{getCategoryNameById(Number(activity.categoryId))}</TableCell>
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
          </TableContainer>
        </Box>
      </Box>

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
        <Box p={2} sx={{ color: 'grey.700' }}>
          <Button fullWidth onClick={handleClose} sx={{ color: 'grey.700' }}>View</Button>
          <Button fullWidth onClick={handleClose} sx={{ color: 'grey.700' }}>Resolve</Button>
          <Button fullWidth onClick={handleClose} sx={{ color: 'grey.700' }}>Delete</Button>
        </Box>
      </Popover>
    </Container>
  );
};

export default AdminTicketsDashboard;
