import React from 'react';
import { Paper, Typography } from '@mui/material';
import { Event } from '@mui/icons-material';
import { Icon } from '@iconify/react';
const PendingRecordPaper = ({ record }) => {
  return (
    <Paper sx={{ p: '16px', bgcolor: '#D3D3D3', mb: '16px', borderLeft: '30px solid #C91C23' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5" sx={{ color: '#1C3966', fontWeight: 'bold' }}>
        {record.organ_requested}
        </Typography>
        <div style={{ display: 'flex', alignItems: 'center' }}>
        <Icon icon="mingcute:hospital-fill" width="30" height="30" />
          <Typography>{record.provider_name}</Typography>
          <Event sx={{ marginLeft: '8px' }} />
          <Typography>Date: {record.datetime_created}</Typography>
        </div>
      </div>
      <Typography>ID: {record.request_id}</Typography>
      <Typography>Recipient: {record.receipient_basics.aborhd.display}</Typography>
      <Typography>ID: {record.request_id}</Typography>
      {/* add remaining info here */}
    </Paper>
  );
};

export default PendingRecordPaper;
