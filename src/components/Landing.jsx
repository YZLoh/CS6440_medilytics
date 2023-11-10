// Landing.jsx
import React, { useRef } from 'react';
import { Button, Box, Typography, Card, Link } from '@mui/material';
import backgroundImage from '../assets/backgroundImage.jpg';
import NavBar from './NavBar';
import { useNavigate } from 'react-router-dom';
import Contact from './Contact';
import About from './About';
import Features from './Features';

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

  const scrollToSection = (section) => {
    const sectionRef = document.getElementById(section);
    if (sectionRef) {
      sectionRef.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const boxStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh',
    display: 'flex',
    margin: '-10px',
    alignItems: 'center',
    justifyContent: 'center',
  };
  const infoTextStyle = {
    color: 'white',
  };
  const infoCardStyle = {
    backgroundColor: 'transparent',
    border: 'none',
    boxShadow: 'none',
    borderColor: 'transparent',
    marginLeft: '-100px',
  };
  const buttonStyle = {
    textTransform: 'none',
    backgroundColor: 'white',
    marginTop: '10px',
    marginLeft: '5%',
  };

  const sectionStyle = {
    paddingTop: '80px', // Adjust the padding according to the height of your navbar
  };

  const navigate = useNavigate();
  const login = () => {
    navigate('/login');
  };

  return (
    <>
      <NavBar scrollToSection={scrollToSection} />
      <div ref={neededRef} id="home">
        <Box sx={boxStyle}>
          <Card sx={infoCardStyle}>
            <Typography variant="h5" sx={infoTextStyle}>
              Revamping Organ Transplants
            </Typography>
            <Typography variant="h6" sx={infoTextStyle}>
              A transparent system facilitating better tracking of organs, <br />
              leading to more effective allocation and utilization,<br />
              enabling healthcare professionals to make informed <br /> decisions and improve patient outcomes
            </Typography>
            <div style={{ display: 'flex' }}>
              <Button sx={buttonStyle} onClick={() => scrollToSection('about')}>
                Get Started
              </Button>
              <Button sx={buttonStyle} onClick={() => scrollToSection('features')}>
                Learn More
              </Button>
            </div>
          </Card>
        </Box>
      </div>

      <div ref={neededRef} id="features" style={sectionStyle}>
          <Features />
      </div>

      <div ref={neededRef} id="about" style={sectionStyle}>
        <About />
      </div>

      <div ref={neededRef} id="contact" style={sectionStyle}>
        <Contact />
      </div>

      <Copyright sx={{ mt: 8, mb: 4 }} />
    </>
  );
}

export default Landing;
