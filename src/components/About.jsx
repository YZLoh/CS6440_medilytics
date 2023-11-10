import { Box, Typography } from '@mui/material';
import React from 'react';

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

function About() {
  return (
    <Box sx={boxStyle}>
      <Typography variant="h6" sx={titleStyle}>
        Transparent Open Source Tranplant System
      </Typography>
      <Typography>
        As noted by the CDC, there exists a clear lack of organ donors. As noted by the CDC, there are around 100,000 people on the active waiting list for organs, but only approximately
        <br />14,000 deceased organ donors in 2021, with each providing on average 3.5 organs. Living donors provide on average only around 6,000 organs per year.
        In 2020, the non-utilization <br />rate of recovered organs stood at 21.3% for kidneys, despite a dramatic decline in discarded organs from hepatitis C-positive donors.
        Also, any mismatch or delay between organ donor <br /> and recipient can therefore result in serious health concerns for both parties. For example, prolonged waiting times for organ recipients not only put patients' lives at risk but also
        strain <br /> healthcare resources and increase costs. Meanwhile, inefficient organ allocation and utilization can lead to the wastage of precious donor organs, which is ethically and medically unacceptable.<br />
        The current reliance on proprietary systems and the limited availability of data for research and innovation hamper the progress of organ transplantation as a field of medicine.
        A transparent <br /> system would allow for better tracking of organs, leading to more effective allocation and utilization, enabling healthcare professionals to make informed decisions and improve patient outcomes, <br />
        thereby ensuring the integrity and reliability of the entire transplantation process.
      </Typography>
    </Box>
  );
}

export default About;
