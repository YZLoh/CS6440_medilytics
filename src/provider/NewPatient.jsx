import React, { useEffect, useState } from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import {
  IconButton,
  Divider,
  Typography,
  Box,
  TextField,
  CssBaseline,
  Toolbar,
  List,
  AppBar as MuiAppBar,
  Drawer as MuiDrawer,
} from '@mui/material';
import { Menu, ChevronLeft, Logout, Search } from '@mui/icons-material'
import { Avatar } from '@mui/material';
import { menuListItems } from './menuList.js';
import "../App.css";
import { useNavigate } from "react-router-dom";
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import  axios  from "../api/axios";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);


const MainContent = styled('div')({
  marginLeft: '20px',
  padding: '16px',
  width:'50%'
});

const ProfileInfo = styled('div')({
  display: 'flex',
  alignItems: 'center',
  padding: '16px',
});

const ProfileAvatar = styled(Avatar)({
  width: '60px',
  height: '60px', // Increase avatar size
  backgroundColor: 'grey', // Blue color for the background
  color: 'white', // White font color for the avatar
});

const ProfileName = styled(Typography)({
  marginLeft: '8px',
  fontSize: '24px', // Increase username font size
  flexGrow: 1,
  color: '#1C3966', // Blue font color for the username
});

const IDLabel = styled(Typography)({
  marginLeft: '16px',
  alignSelf: 'center',
});

const genderOptions = [
  {
    value: 'female',
    label: 'female',
  },
  {
    value: 'male',
    label: 'male',
  },
  {
    value: 'other',
    label: 'other',
  },
];

const defaultTheme = createTheme();

export default function NewPatient() {

  // API call to mock updates
  const [data, setData] = useState([]);

  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);

  };

  const patientDefaultValues = {
    firstname: "",
    lastname: "",
    gender: "other",
    dob: "",
  };
  const [patientValues, setPatientValues] = useState(patientDefaultValues);

  const handleCreateButtonClick = (e) => {
    axios.post(
      '/provider/patient',
      {
        "request_type": "provider-patient",
        "first_name": patientValues.firstname,
        "last_name": patientValues.lastname,
        "dob": patientValues.dob,
        "gender": patientValues.gender
      },
      {headers: {'Content-Type': 'application/json'}}
      )
      .then(response => {
        console.log('Response:', response);
        alert(`New patient ${response.data.last_name} created!`);
        setPatientValues(patientDefaultValues);
      }).catch(error => {
          console.error('Error:', error);
      });
  };

  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem('savedRole');
    navigate('/login');
  }
  return (

    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}  >
        <CssBaseline />
        <AppBar position="absolute" open={open} style={{ backgroundColor: "#1C3966" }}>
          <Toolbar
            sx={{
              pr: '24px',
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <Menu />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              New Patient
            </Typography>
            <IconButton color="inherit" onClick={logout}>

              <Logout />

            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeft />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {menuListItems}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          {/* place body content here */}
          <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
            <MainContent>
              {/* Main Content */}
              <Stack spacing={2}>
                <TextField
                  required
                  id="patient-firstname"
                  label="First Name"
                  value={patientValues.firstname}
                  onChange={(e) => setPatientValues({ ...patientValues, firstname: e.target.value })}
                />
                <TextField
                  required
                  id="patient-lastname"
                  label="Last Name"
                  value={patientValues.lastname}
                  onChange={(e) => setPatientValues({ ...patientValues, lastname: e.target.value })}
                />
                <TextField
                  id="patient-gender"
                  select
                  label="Select"
                  helperText="Please select gender"
                  onChange={(e) => setPatientValues({ ...patientValues, gender: e.target.value })}
                >
                  {genderOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  required
                  id="patient-dob"
                  label="Date of Birth"
                  value={patientValues.dob}
                  helperText="Example: 1980-02-25"
                  onChange={(e) => setPatientValues({ ...patientValues, dob: e.target.value })}
                />
                <Button variant="contained" onClick={handleCreateButtonClick}>Create New Patient</Button>
              </Stack>
            </MainContent>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

