import {React, useRef} from 'react'
import { Button,Box, Typography, Card, Link } from '@mui/material'
import backgroundImage from  '../assets/backgroundImage.jpg'
import NavBar from './NavBar';
import {useNavigate} from "react-router-dom";
import Contact from './Contact'
import About from './About'
import Features from './Features'


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="/">
        Medilytics
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


function Landing() {
  const neededRef = useRef(null);

  const scrollToSection = () =>{
    if (neededRef.current){
      neededRef.current.scrollIntoView({behavior: 'smooth'})
    }
  } ;

    const boxStyle = {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        display: 'flex',
        margin: '-10px',
        alignItems: 'center',
        justifyContent:'center'
    };
    const infoTextStyle ={
      color:'white'
    };
    const infoCardStyle ={
      backgroundColor: 'transparent',
      border: 'none',
      boxShadow:'none',
      borderColor:'transparent',
      marginLeft:'-100px'
    }
    const buttonStyle ={
      textTransform: 'none',
      backgroundColor:'white',
      marginTop:'10px',
      marginLeft:'5%'

    }

    const navigate = useNavigate();
    const login =() => {
      navigate('/login');
    }
  return (
    <>
    
    <NavBar scrollToSection={scrollToSection}/>
    <div ref = { neededRef }>
    <Box sx= {boxStyle} >
        <Card sx={infoCardStyle}>
          <Typography variant="h5" sx={infoTextStyle}>
            Revamping Organ Transplants
          </Typography>
          <Typography variant="h6"sx={infoTextStyle}>
          A transparent system facilitating better tracking of organs, <br/>
           leading to more effective allocation and utilization,<br/>
            enabling healthcare professionals to make informed <br/> decisions and improve patient outcomes
          </Typography>
          <div style={{display:'flex'}}>
          <Button sx={buttonStyle} onClick={login}>
            Get Started
          </Button>
          <Button sx={buttonStyle}>
           Learn More
          </Button>
          </div>

        </Card>
   </Box>
    </div>
       
   

<div ref = { neededRef }>
<Features />
  </div>  
  
  <div  ref = { neededRef }>
  <About/>
  </div>
   
   {/* <Contact/> */}

   <Copyright sx={{ mt: 8, mb: 4 }} />
    </>

  )
}

export default Landing