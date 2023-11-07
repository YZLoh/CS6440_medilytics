import * as React from 'react';
import {ListItemButton,ListItemText, ListItemIcon} from '@mui/material';
import { Link } from 'react-router-dom';
import '../App.css';
import { Icon } from '@iconify/react';
export const menuListItems = (
  <React.Fragment>
    <Link to="/pending-donations" className='formatted-link'>
    <ListItemButton>
      <ListItemIcon>
      <Icon icon="ri:user-received-2-fill" />
      </ListItemIcon>
      
      <ListItemText primary="Pending" />
    </ListItemButton>
   </Link>
   <Link to="/allocated-donations" className='formatted-link'>
    <ListItemButton>
      <ListItemIcon>
      <Icon icon="ri:user-received-2-fill" hFlip={true} />
      </ListItemIcon>
      <ListItemText primary="Allocated" className='formatted-link' />
    </ListItemButton>
    </Link>
    <Link to="/donation-records" className='formatted-link'>
    <ListItemButton>
      <ListItemIcon>
      <Icon icon="bx:file" hFlip={true} />
      </ListItemIcon>
      <ListItemText primary="Records" className='formatted-link' />
    </ListItemButton>
    </Link>
 
  </React.Fragment>
);


