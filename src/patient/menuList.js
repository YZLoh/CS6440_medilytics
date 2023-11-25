import * as React from 'react';
import {ListItemButton,ListItemText, ListItemIcon} from '@mui/material';
import {Notifications, TextSnippet} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import '../App.css';  
export const menuListItems = (
  <React.Fragment>
    <Link to="/patient-profile" className='formatted-link'>
    <ListItemButton>
      <ListItemIcon>
        <TextSnippet />
      </ListItemIcon>
      
      <ListItemText primary="Profile" />
    </ListItemButton>
   </Link>
   <Link to="/patient-updates" className='formatted-link'>
    <ListItemButton>
      <ListItemIcon>
        <Notifications/>
      </ListItemIcon>
      <ListItemText primary="Updates" className='formatted-link' />
    </ListItemButton>
    </Link>
 
  </React.Fragment>
);


