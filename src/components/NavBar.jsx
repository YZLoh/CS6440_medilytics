// NavBar.jsx
import React from 'react';
import { Toolbar, AppBar, Typography, Button } from '@mui/material';

const toolbarStyle = {
  backgroundColor: '#1C3966',
};

const buttonStyle = {
  color: 'inherit',
  textTransform: 'none',
};

function NavBar({ scrollToSection }) {
  return (
    <AppBar>
      <Toolbar sx={toolbarStyle}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Medilytics
        </Typography>
        <Button sx={buttonStyle} onClick={() => scrollToSection('home')}>
          Home
        </Button>
        <Button sx={buttonStyle} onClick={() => scrollToSection('about')}>
          About
        </Button>
        <Button sx={buttonStyle} onClick={() => scrollToSection('features')}>
          Features
        </Button>
        <Button sx={buttonStyle} onClick={() => scrollToSection('contact')}>
          Contact
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
