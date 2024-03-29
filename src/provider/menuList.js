import * as React from 'react';
import { ListItemButton, ListItemText, ListItemIcon } from '@mui/material';
import { Link } from 'react-router-dom';
import '../App.css';
import { Icon } from '@iconify/react';
export const menuListItems = (
  <React.Fragment>
    <Link to="/donors" className='formatted-link'>
      <ListItemButton>
        <ListItemIcon>
          <Icon icon="ri:user-received-2-fill"  width="30" height="30"/>
        </ListItemIcon>

        <ListItemText primary="Donors" />
      </ListItemButton>
    </Link>
    <Link to="/recipients" className='formatted-link'>
      <ListItemButton>
        <ListItemIcon>
          <Icon icon="ri:user-received-2-fill" hFlip={true} width="30" height="30" />
        </ListItemIcon>
        <ListItemText primary="Recipients" className='formatted-link' />
      </ListItemButton>
    </Link>
    <Link to="/new-patient" className='formatted-link'>
      <ListItemButton>
        <ListItemIcon>
        <Icon icon="mingcute:user-add-fill" width="30" height="30" />
        </ListItemIcon>
        <ListItemText primary="New Patient" className='formatted-link' />
      </ListItemButton>
    </Link>
  </React.Fragment>
);


