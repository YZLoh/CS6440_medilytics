import React from 'react';
import { Paper, Typography } from '@mui/material';
import { Event } from '@mui/icons-material';

const DonorRecordPaper = ({ record }) => {
  return (
    <Paper sx={{ p: '16px', bgcolor: '#D3D3D3', mb: '16px', borderLeft: '30px solid #C91C23' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5" sx={{ color: '#1C3966', fontWeight: 'bold' }}>
          {record.basics.first_name} {record.basics.last_name}
        </Typography>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Event sx={{ marginRight: '8px' }} />
          <Typography>Date: {record.datetime_created}</Typography>
        </div>
      </div>
      <Typography>ID: {record.patient_id}</Typography>
      <Typography>Organ: {record.organ}</Typography>
      <Typography>Latest update: {record.donor_status_message}</Typography>
    </Paper>
  );
};

export default DonorRecordPaper;
