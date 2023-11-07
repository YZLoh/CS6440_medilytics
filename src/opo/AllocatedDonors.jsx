import React, { useEffect, useState} from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import {Card, IconButton, Divider, Typography,Box, CssBaseline, Toolbar, List, AppBar as MuiAppBar, Drawer as MuiDrawer  } from '@mui/material';
import {Menu, ChevronLeft, Logout } from '@mui/icons-material'
import { menuListItems} from './menuList.js';
import "../App.css";
import {useNavigate} from "react-router-dom";
import axios from '../api/axios';

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


const defaultTheme = createTheme();

export default function AllocatedDonors() {

  // API call to mock updates
  const [data, setData] = useState([]);

// useEffect(() => {
//     axios.get('/patient/updates')
//     .then(response => {
//         setData(response.data.data_list);
     
//     }).catch(error => {
//         console.error('Error:', error);
//     });},[]);
  //  console.log(data.data_list)
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
 
  };

  const navigate = useNavigate();
  const logout =() => {
    navigate('/login');
  }
  return (
    
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}  >
        <CssBaseline />
        <AppBar position="absolute" open={open} style={{backgroundColor:"#1C3966"}}>
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
              Allocated Donors
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

        </Box>
      </Box>
    </ThemeProvider>
  );
}
