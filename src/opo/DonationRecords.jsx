import React, { useEffect, useState, useRef} from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import {Card, IconButton, Divider, Typography,Box, CssBaseline, Toolbar, List, AppBar as MuiAppBar, Drawer as MuiDrawer  } from '@mui/material';
import {Menu, ChevronLeft, Logout } from '@mui/icons-material'
import { menuListItems} from './menuList.js';
import Pagination from './Pagination'
import "../App.css";
import './downloadtranscript.css';
import './donationrecords.css';
import SearchBar from '../components/SearchBar'
import {useNavigate} from "react-router-dom";
import axios from '../api/axios';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);


const defaultTheme = createTheme();

export default function DonationRecords() {

  // API call to mock updates
  const [data, setData] = useState([]);


  const [searchQuery, setSearchQuery] = useState('');
  const [items] = useState([
    { id: 1, name: 'Item 1', description: 'Description for Item 1' , date: "2023-01-20"},
    { id: 2, name: 'Item 2', description: 'Description for Item 2' , date: "2023-01-20"},
    { id: 3, name: 'Item 3', description: 'Description for Item 2' , date: "2023-01-20"},
    { id: 4, name: 'Item 4', description: 'Description for Item 2' , date: "2023-01-20"},
    { id: 5, name: 'Item 5', description: 'Description for Item 2' , date: "2023-01-20"},
    { id: 6, name: 'Item 6', description: 'Description for Item 2' , date: "2023-01-20"},
    { id: 7, name: 'Item 7', description: 'Description for Item 2' , date: "2023-01-20"},
    { id: 8, name: 'Item 8', description: 'Description for Item 2' , date: "2023-01-20"},
    // Add more items to your list
  ]);

  const itemsPerPage = 6; // Number of items to display per page
  const [currentPage, setCurrentPage] = useState(1);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to the first page when searching
  };

  const totalItems = items.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const paginatedItems = items.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const download = (id) => {
    // Assuming you want to download a sample text file when the button is clicked
    const sampleText = 'This is a sample text file content.';
    const blob = new Blob([sampleText], { type: 'text/plain' });
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = 'sample_text_file.txt';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileDisplay, setSelectedFileDisplay] = useState('');


  const filteredItems = items.filter((transcript) =>
    transcript.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const fileInputRef = useRef(null);

 
  const handleUploadClick = () => {
    const uploadWindow = window.open('', '_blank', 'width=800,height=400 left=300 top=200');
    uploadWindow.document.title = 'File Upload';

    uploadWindow.document.body.innerHTML = `
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f0f0f0;
        margin: 0;
        padding: 20px;
      }
      
      .file-upload-window {
        width: 100%;
        max-width: 400px;
        margin: 20px auto;
        padding: 20px;
        background-color: #fff;
        border: 1px solid #ccc;
        border-radius: 5px;
      }
      
      .file-upload-window h2 {
        margin-top: 0;
        font-size: 20px;
        color: #333;
      }
      
      label {
        display: block;
        margin-bottom: 5px;
        font-weight: bold;
      }
      
      input[type='text'],
      input[type='file'],
      button {
        display: block;
        width: 100%;
        padding: 8px;
        margin-bottom: 15px;
        font-size: 14px;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-sizing: border-box;
      }
      
      .drag-drop-box {
        border: 2px dashed #ccc;
        padding: 20px;
        border-radius: 5px;
        cursor: pointer;
      }
      
      .drag-drop-box p {
        margin: 0;
        font-size: 16px;
        color: #888;
      }
      
      .drag-drop-box button {
        padding: 8px 16px;
        font-size: 14px;
        background-color: #3498db;
        color: #fff;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.3s ease;
      }
      
      .drag-drop-box button:hover {
        background-color: #2980b9;
      }
    </style>
    
    <div class="file-upload-window">
      <h2>Upload File</h2>
      <label for="fileName">Name:</label>
      <input type="text" id="fileName" placeholder="Enter name">
  
      <label for="fileInput">File:</label>
      <input type="file" id="fileInput" style="display: none;">
  
      <div class="drag-drop-box">
        <p>Drag & Drop File Here</p>
        <p>${selectedFileDisplay}</p>
        <button onclick="openFilePicker()">Select File</button>
      </div>
    </div>
  `;

    uploadWindow.openFilePicker = () => {
      const fileInput = uploadWindow.document.getElementById('fileInput');
      fileInput.click();
    };

    uploadWindow.handleFileSelect = (file) => {
      setSelectedFile(file);
      setSelectedFileDisplay(`Selected File: ${file.name}`);
      console.log('Selected file:', file);
      uploadWindow.close();
    };
  };

  const handleFileSelect = (e) => {
    // Handle the selected file here
    const selectedFile = e.target.files[0];
    console.log('Selected file:', selectedFile);
  };

  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
 
  };

  const navigate = useNavigate();
  const logout =() => {
    localStorage.removeItem('savedRole');
    navigate('/login');
  }
  return (
    
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}  >
        <CssBaseline />
        <AppBar position="absolute" open={open} style={{backgroundColor:"#1C3966"}}>
          <Toolbar
            sx={{
              pr: '24px', 
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <Menu />
            </IconButton>
            <Typography 
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Records
            </Typography>
            <IconButton color="inherit" onClick={logout}>
            
                <Logout />
              
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeft />
            </IconButton>
          </Toolbar>
          <Divider />
           <List component="nav">
            {menuListItems}
          </List> 
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
 {/* place body content here */}
 <div className="right_container">
 <div className="transcript__search__container">
            <SearchBar onSearch={handleSearch} />
        </div>
 
 <div className="transcript__list__container">
          <table className="transcript__table">
            <thead>
              <tr>
                <th>Transcript Name</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
                {(searchQuery ? filteredItems : paginatedItems).map((transcript) => (
                  <tr key={transcript.id}>
                    <td>{transcript.name}</td>
                    {/* Assuming 'date' is a property in each transcript object */}
                    <td>{transcript.date}</td>
                    <td>
                      <button className="download__button" onClick={() => download(transcript.id)}>
                        Download
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
          </table>

          <div className="transcript__upload__container">
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileSelect}
                /* Add other file input attributes if needed */
            />
            <button onClick={handleUploadClick} className="upload__button">Upload</button>
          </div>
        </div>
          
          <div className="transcipt__pagination__container">
            <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            />
          </div>
          </div>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
