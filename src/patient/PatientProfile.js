import React, { useEffect, useState} from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import {Card, IconButton, Divider, Typography,Box, CssBaseline, Toolbar, List, AppBar as MuiAppBar, Drawer as MuiDrawer  } from '@mui/material';
import {Menu, ChevronLeft, Logout } from '@mui/icons-material'
import { menuListItems} from './menuList.js';
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

export default function Dashboard() {

    // API call to mock updates
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('/patient/profile')
        .then(response => {
            setData(response.data);
            // console.log(data);
         
        }).catch(error => {
            console.error('Error:', error);
        });},[]);
// console.log(data.basics);
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
              Profile
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
          {/* <Card className='profile-card'>
          <Typography className='card-content'>Basics</Typography>
          <Typography className='card-content'>Full Name: {data.basics.first_name} {data.basics.last_name}</Typography>
          <Typography className='card-content'>Gender: {data.basics.gender}</Typography>
          <Typography className='card-content'> Date of birth: {data.basics.dob}</Typography>
        </Card>
        <Card className='profile-card'>
          <Typography className='card-content'>Basics</Typography>
          <Typography className='card-content'>Full Name: {data.basics.first_name} {data.basics.last_name}</Typography>
          <Typography className='card-content'>Gender: {data.basics.gender}</Typography>
          <Typography className='card-content'> Date of birth: {data.basics.dob}</Typography>
        </Card>
        <Card className='profile-card'>
        <Typography className='card-content'>Lab Results</Typography>
        <Typography className='card-content'>Display: {data.latest_lab_result.display}</Typography>
        <Typography className='card-content'>Issued: {data.latest_lab_result.issued}</Typography>
        <Typography className='card-content'>Resource Type: {data.latest_lab_result.resource_type}</Typography>
        <Typography className='card-content'>Resource Id: {data.latest_lab_result.resource_id}</Typography>
        <Typography className='card-content'>{data.latest_lab_result.value} {data.latest_lab_result.unit}</Typography>
        </Card>


        <Card className='profile-card'>
          <Typography className='card-content'>Donor Details</Typography>
          <Typography className='card-content'> {data.donor_status} </Typography>
          <Typography className='card-content'> {data.donor_status_message} </Typography>
        </Card>  */}
        </Box>

      </Box>

    </ThemeProvider>
  );
}