import { Toolbar,AppBar, Typography, Button } from '@mui/material'
import React from 'react'


// const appbarStyle ={
//   backgroundColor: 'white'
// }
const toolbarStyle ={
  backgroundColor: '#1C3966'
}

const buttonStyle = {
  color: 'inherit',
  textTransform: 'none'

}


function NavBar({ scrollToSection }) {

  return (
    <AppBar >
      <Toolbar sx= {toolbarStyle}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1}}>
          Medilytics
        </Typography>
        <Button sx={buttonStyle} onClick={scrollToSection}>Home</Button>
        <Button sx={buttonStyle} onClick={scrollToSection}>About</Button>
        <Button sx={buttonStyle} onClick={scrollToSection}>Features</Button>
        <Button sx={buttonStyle} onClick={scrollToSection}>Contact</Button>
      </Toolbar>
    </AppBar>
  )
}

export default NavBar