import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  MenuItem,
  Select,
  Avatar,
  Box,
  Container,
  Popover,
  ListItem,
  ListItemText,
  Switch,
  List,
  Button
} from '@mui/material';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import logo from '../../AdminDashboardImages/Frame-58.png';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const BlueSelect = styled(Select)(({ theme }) => ({
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: '#056ff6',
  },
  '& .MuiSelect-icon': {
    color: '#056ff6',
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: '#056ff6',
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: '#056ff6',
  },
}));

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAdminDashboard = location.pathname.includes('/admin/dashboard');
  const isAdminTicketsDashboard = location.pathname.includes('adminticketsdashboard');

  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    profilePicture: '',
    initials: ''
  });
  const [notifications, setNotifications] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [profileAnchorEl, setProfileAnchorEl] = useState(null);

  const clearLocalStorage = () => {
    localStorage.clear();
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };


  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8080/api/auth/authenticated-user', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      const initials = `${data.firstName.charAt(0)}${data.lastName.charAt(0)}`;

      localStorage.removeItem('profilePicture2');
      localStorage.removeItem('initials2');

      localStorage.setItem('profilePicture2', data.profilePicture);
      localStorage.setItem('initials2', initials);

      setUser({
        firstName: data.firstName,
        lastName: data.lastName,
        profilePicture: data.profilePicture,
        initials: initials
      });
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8080/api/admin/categories', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 401) {
        throw new Error('Unauthorized');
      }

      const data = await response.json();
      setNotifications(data.categories || []);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  useEffect(() => {
    const storedProfilePicture = localStorage.getItem('profilePicture2');
    const storedInitials = localStorage.getItem('initials2');

    if (storedProfilePicture && storedInitials) {
      setUser({
        firstName: '',
        lastName: '',
        profilePicture: storedProfilePicture,
        initials: storedInitials
      });
    } else {
      fetchUserData();
    }
    fetchNotifications();
  }, []);

  const handleNotificationClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileClick = (event) => {
    setProfileAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setProfileAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const profileOpen = Boolean(profileAnchorEl);
  const id = open ? 'simple-popover' : undefined;
  const profileId = profileOpen ? 'profile-popover' : undefined;

  return (
    <AppBar position="static" color="inherit" elevation={0}>
      <Container>
        <Toolbar>
          <Box display="flex" alignItems="center" flexGrow={1}>
            <img src={logo} alt="Escalayt Logo" style={{ width: '120px', marginRight: '10px' }} />
          </Box>

          <Box display="flex" alignItems="center">
            <Typography
              variant="body1"
              style={{
                marginRight: '20px',
                fontWeight: isAdminDashboard ? 'bold' : 'normal',
              }}
            >
              <Link to="/admin/dashboard" style={{ textDecoration: 'none', color: 'inherit' }}>Dashboard</Link>
            </Typography>
            <Typography
              variant="body2"
              style={{
                marginRight: '20px',
                fontWeight: isAdminTicketsDashboard ? 'bold' : 'normal',
              }}
            >
              <Link to="/adminticketsdashboard" style={{ textDecoration: 'none', color: 'inherit' }}>All Tickets</Link>
            </Typography>
            <IconButton color="inherit" style={{ marginRight: '20px' }} onClick={handleNotificationClick}>
              <NotificationsNoneIcon style={{ fontSize: '30px', color: '#056ff6' }} />
            </IconButton>
            <Avatar
              style={{ marginRight: '20px', backgroundColor: '#056ff6' }}
              src={user.profilePicture}
              alt={user.initials}
              onClick={handleProfileClick}
              onError={(e) => { e.target.onerror = null; e.target.src = ''; }}
            >
              {user.initials}
            </Avatar>
          </Box>
        </Toolbar>

        {isAdminDashboard && (
          <Box display="flex" justifyContent="flex-end" mt={2}>
            <Box>
              <Typography style={{ fontSize: '.8rem', color: '#afafaf' }}>
                Sort by
              </Typography>
              <BlueSelect defaultValue="This year" variant="outlined" size="small" style={{ marginRight: '20px' }}>
                <MenuItem value="This year">This year</MenuItem>
                <MenuItem value="Last year">Last year</MenuItem>
                <MenuItem value="All time">All time</MenuItem>
              </BlueSelect>
            </Box>
            <Button variant="contained" style={{ backgroundColor: '#056ff6', height: '80%' }}>
              Add New User
            </Button>
          </Box>
        )}
      </Container>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
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
            width: '300px', // Adjust the width to fit the content
            padding: 3,
          },
        }}
      >
        <Box display="flex" flexDirection="column" sx={{ color: 'grey.700' }}>
          <Box display="flex" justifyContent="flex-end">
            <IconButton onClick={handlePopoverClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Box display="flex" flexDirection="column" mb={2}>
            <NotificationsNoneIcon style={{ fontSize: '24px', color: '#056ff6' }} />
            <Typography variant="h6" sx={{ fontSize: 14, color: '#000', mt: 1 }}>Notifications</Typography>
          </Box>
          <List sx={{}}>
            {notifications.map((notification, index) => (
              <ListItem key={index} alignItems="flex-start" sx={{ padding: 0, margin: 0 }}>
                <Box display="flex" width="100%" alignItems="center" sx={{ padding: 0, margin: 0 }}>
                  <Box flexBasis="10%">
                    <Avatar
                      alt={notification.name}
                      src={notification.profilePicture || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMyhU4g6pK8HDx-Px-DBXJGTyLmxbf3FSyFw&s'}
                      sx={{ height: 15, width: 15 }}
                    />
                  </Box>
                  <Box flexBasis="75%">
                    <ListItemText
                      secondary={
                        <Typography component="span" variant="body2" color="textPrimary" sx={{ fontSize: 12 }}>
                          {notification.name}
                        </Typography>
                      }
                    />
                  </Box>
                  <Box flexBasis="15%" textAlign="right">
                    <Typography component="span" variant="body2" color="textPrimary" sx={{ fontSize: 11 }}>
                      {notification.id}
                    </Typography>
                  </Box>
                </Box>
              </ListItem>
            ))}
          </List>
        </Box>
      </Popover>

      <Popover
        id={profileId}
        open={profileOpen}
        anchorEl={profileAnchorEl}
        onClose={handlePopoverClose}
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
            width: '200px', // Adjust the width to fit the content
            padding: 2,
          },
        }}
      >
        <Box display="flex" flexDirection="column" sx={{ color: 'grey.700' }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
      <Typography variant="body1" sx={{ fontSize: 14, fontWeight: 'bold' }}>
        Notifications
      </Typography>
      <Switch />
    </Box>
          
          {/* <Typography variant="body2" sx={{ fontSize: 14, mb: 1 }}>Profile</Typography>
          <Typography onClick={logout} variant="body2" sx={{ fontSize: 14 }}>Log out</Typography> */}

<Typography
        onClick={handleProfileClick}
        variant="body2"
        sx={{
          fontSize: 14,
          mb: 1,
          cursor: 'pointer',
          '&:hover': {
            color: '',
            textDecoration: '',
          }
        }}
      >
        Profile
      </Typography>
      <Typography
        onClick={handleLogout}
        variant="body2"
        sx={{
          fontSize: 14,
          cursor: 'pointer',
          '&:hover': {
            color: '',
            textDecoration: '',
          }
        }}
      >
        Log out
      </Typography>
        </Box>
      </Popover>
    </AppBar>
  );
};

export default Header;
