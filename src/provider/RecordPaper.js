import React from 'react';
import { Paper, Typography } from '@mui/material';
import { Event } from '@mui/icons-material';

const RecordPaper = ({ record }) => {
  return (
    <Paper sx={{ p: '16px', bgcolor: '#D3D3D3', mb: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5" sx={{ color: '#1C3966', fontWeight: 'bold' }}>
          {record.title}
        </Typography>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Event sx={{ marginRight: '8px' }} />
          <Typography>Date: {record.date}</Typography>
        </div>
      </div>
      <Typography>{record.description}</Typography>
    </Paper>
  );
};

export default RecordPaper;
