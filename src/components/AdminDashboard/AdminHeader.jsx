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
import { Link, useLocation, useNavigate } from 'react-router-dom';

const BlueSelect = styled(Select)(() => ({
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

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8080/api/auth/authenticated-user', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      const initials = `${data.firstName.charAt(0)}${data.lastName.charAt(0)}`;

      localStorage.setItem('profilePicture2', data.profilePicture);
      localStorage.setItem('initials2', initials);

      setUser({
        firstName: data.firstName,
        lastName: data.lastName,
        profilePicture: data.profilePicture,
        initials
      });
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8080/api/admin/categories', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
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

  const handleNotificationClick = (event) => setAnchorEl(event.currentTarget);
  const handleProfileClick = (event) => setProfileAnchorEl(event.currentTarget);
  const handlePopoverClose = () => {
    setAnchorEl(null);
    setProfileAnchorEl(null);
  };

  return (
    <AppBar position="static" color="inherit" elevation={0}>
      <Container maxWidth="lg">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box display="flex" alignItems="center">
            <Link to="/" style={{ textDecoration: 'none' }}>
              <img src={logo} alt="Escalayt Logo" style={{ width: '120px' }} />
            </Link>
          </Box>

          <Box display="flex" alignItems="center" sx={{ gap: 2 }}>
            <Typography
              variant="body1"
              sx={{ fontWeight: isAdminDashboard ? 'bold' : 'normal' }}
            >
              <Link to="/admin/dashboard" style={{ textDecoration: 'none', color: 'inherit' }}>
                Dashboard
              </Link>
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontWeight: isAdminTicketsDashboard ? 'bold' : 'normal' }}
            >
              <Link to="/adminticketsdashboard" style={{ textDecoration: 'none', color: 'inherit' }}>
                All Tickets
              </Link>
            </Typography>
            <IconButton color="inherit" onClick={handleNotificationClick}>
              <NotificationsNoneIcon sx={{ fontSize: 30, color: '#056ff6' }} />
            </IconButton>
            <Avatar
              src={user.profilePicture}
              alt={user.initials}
              sx={{ bgcolor: '#056ff6', cursor: 'pointer' }}
              onClick={handleProfileClick}
            >
              {user.initials}
            </Avatar>
          </Box>
        </Toolbar>

        {isAdminDashboard && (
          <Box display="flex" justifyContent="flex-end" alignItems="center" mt={2} gap={2}>
            <Box display="flex" flexDirection="column" alignItems="flex-start">
              <Typography sx={{ fontSize: '.8rem', color: '#afafaf' }}>Sort by</Typography>
              <BlueSelect defaultValue="This year" variant="outlined" size="small">
                <MenuItem value="This year">This year</MenuItem>
                <MenuItem value="Last year">Last year</MenuItem>
                <MenuItem value="All time">All time</MenuItem>
              </BlueSelect>
            </Box>
            <Link to="/admin/addEmployee">
              <Button variant="contained" sx={{ backgroundColor: '#056ff6', mt: '1.2rem' }}>
                Add New User
              </Button>
            </Link>
          </Box>
        )}
      </Container>

      {/* Notifications Popover */}
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        PaperProps={{ sx: { width: '300px', p: 3 } }}
      >
        <Box>
          <Box display="flex" justifyContent="flex-end">
            <IconButton onClick={handlePopoverClose}><CloseIcon /></IconButton>
          </Box>
          <Typography variant="h6" sx={{ fontSize: 14, mb: 1 }}>Notifications</Typography>
          <List>
            {notifications.map((notification, i) => (
              <ListItem key={i}>
                <Avatar
                  src={notification.profilePicture || ''}
                  sx={{ width: 24, height: 24, mr: 2 }}
                />
                <ListItemText
                  primary={
                    <Typography variant="body2" sx={{ fontSize: 13 }}>
                      {notification.name}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Popover>

      {/* Profile Popover */}
      <Popover
        open={Boolean(profileAnchorEl)}
        anchorEl={profileAnchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        PaperProps={{ sx: { width: '200px', p: 2 } }}
      >
        <Box>
          <Typography
            onClick={handleProfileClick}
            sx={{ fontSize: 14, cursor: 'pointer', mb: 1 }}
          >
            Profile
          </Typography>
          <Typography
            onClick={handleLogout}
            sx={{ fontSize: 14, cursor: 'pointer' }}
          >
            Log out
          </Typography>
        </Box>
      </Popover>
    </AppBar>
  );
};

export default Header;
