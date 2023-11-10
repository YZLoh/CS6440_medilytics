import React from 'react';
import { Box, Grid, Card, CardContent, Typography, Icon } from '@mui/material';
import { Visibility, Create, UploadFile } from '@mui/icons-material';

function Features() {
  const boxStyle = {
    marginTop: '30px',
    marginLeft: 'auto',
    marginRight: 'auto', // Center the box horizontally
    textAlign: 'center', // Center the content inside the box
  };

  const titleStyle = {
    fontSize: '24px', // Adjust the font size
    fontWeight: 'bold', // Make it bold
    marginBottom: '20px', // Add margin below the title
  };

  const cardStyle = {
    backgroundColor: '#1C3966',
    color: '#fff',
  };

  const cardContentStyle = {
    alignItems: 'center',
    justifyContent: 'center',
  };

  const iconStyle = {
    marginTop: '5%',
  };

  const featureData = [
    {
      title: 'Enhanced Accessibility',
      icon: Visibility,
      desc:
        'OPOs can efficiently log donor information, while recipients can search for donors based on relevance.',
    },
    {
      title: 'Efficient Data Entry',
      icon: Create,
      desc:
        'Provision of user-friendly data entry interface, minimizing the need for extensive typing and clicking.',
    },
    {
      title: 'Hybrid Data Format',
      icon: UploadFile,
      desc:
        'Historical records and documents can seamlessly be saved, preserving valuable information and maintaining ease of access.',
    },
  ];

  return (
    <Box sx={boxStyle}>
      <Typography variant="h6" sx={titleStyle}> Features </Typography>
      <Grid container spacing={2} justifyContent="center"> {/* Center the Grid container */}
        {featureData.map((card, index) => (
          <Grid item xs={3} key={index}>
            <Card sx={cardStyle}>
              <Icon component={card.icon} sx={iconStyle}></Icon>
              <CardContent>
                <Typography variant="h6" sx={cardContentStyle}>
                  {card.title}{' '}
                </Typography>
                <Typography>{card.desc} </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Features;
