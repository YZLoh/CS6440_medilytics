import React from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';

const boxStyle = {
  marginTop: '30px',
  marginLeft: 'auto',
  marginRight: 'auto', // Center the box horizontally
  textAlign: 'center', // Center the content inside the box
};

const formStyle = {
  marginTop: '20px',
  display: 'flex',
  flexDirection: 'column',
  width: '600px', // Adjust the width of the form
  marginLeft: 'auto', // Center the form horizontally
  marginRight: 'auto', // Center the form horizontally
};

const titleStyle = {
  fontSize: '24px', // Adjust the font size
  fontWeight: 'bold', // Make it bold
  marginBottom: '10px', // Add margin below the title
};

function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <Box sx={boxStyle}>
      <Typography variant="h6" sx={titleStyle}>
        Contact Us
      </Typography>
      <Typography>
        Have questions or feedback? Reach out to us using the form below.
      </Typography>

      <form onSubmit={handleSubmit} style={formStyle}>
        <TextField
          label="Name"
          variant="outlined"
          margin="normal"
          required
        />
        <TextField
          label="Email"
          variant="outlined"
          margin="normal"
          required
        />
        <TextField
          label="Message"
          variant="outlined"
          margin="normal"
          multiline
          rows={4}
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginTop: '20px' }}
        >
          Submit
        </Button>
      </form>
    </Box>
  );
}

export default Contact;
