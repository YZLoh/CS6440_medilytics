import React, { useEffect, useState } from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import {
  IconButton,
  Divider,
  Typography,
  Box,
  TextField,
  InputAdornment,
  CssBaseline,
  Toolbar,
  List,
  AppBar as MuiAppBar,
  Drawer as MuiDrawer,
} from "@mui/material";
import { Menu, ChevronLeft, Logout, Search } from "@mui/icons-material";
import { menuListItems } from "./menuList.js";
import "../App.css";
import { useNavigate } from "react-router-dom";
import  axios  from "../api/axios";
import { Icon } from "@iconify/react";
import AllocatedRecordPaper from "./AllocatedRecordPaper";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const MainContent = styled("div")({
  marginLeft: " 20px",
  padding: "16px",
  width:'80%'
});

const ProfileInfo = styled("div")({
  display: "flex",
  alignItems: "center",
  padding: "16px",
});


const ProfileName = styled(Typography)({
  marginLeft: "8px",
  fontSize: "24px", // Increase username font size
  flexGrow: 1,
  color: "#1C3966", // Blue font color for the username
});

const IDLabel = styled(Typography)({
  marginLeft: "16px",
  alignSelf: "center",
});

const defaultTheme = createTheme();

export default function AllocatedDonations() {
  // API call to mock updates
  const [records, setRecords] = useState([]);
  useEffect(() => {
    axios
      .get("/opo/allocated")
      .then((response) => {
        setRecords(response.data.data_list);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem('savedRole');
    navigate("/login");
  };
  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="absolute"
          open={open}
          style={{ backgroundColor: "#1C3966" }}
        >
          <Toolbar
            sx={{
              pr: "24px",
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
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
              Allocated Donations
            </Typography>
            <IconButton color="inherit" onClick={logout}>
              <Logout />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeft />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">{menuListItems}</List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          {/* place body content here */}
          {/* <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '20px'}}> */}
          <MainContent>
            {/* Main Content */}
            <Toolbar />
            {/* Profile Info (Top Left Corner) */}
            <ProfileInfo>
              <Icon
                icon="mdi:user-circle"
                color="grey"
                width="60"
                height="60"
              />
              <ProfileName>John Doe</ProfileName>
              <IDLabel>ID: 12345</IDLabel>
            </ProfileInfo>
            <Divider sx={{ width: "100%", my: "16px" }} />
            <TextField
              label="Search"
              variant="outlined"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: "16px" }}
            />
            <Divider sx={{ width: "100%", my: "16px" }} />
            {/* Map the list of records to generate RecordPaper components */}
            {records.map((record, index) => (
              <AllocatedRecordPaper key={index} record={record} />
            ))}
          </MainContent>
          {/* </Box> */}
        </Box>
      </Box>
    </ThemeProvider>
  );
}
