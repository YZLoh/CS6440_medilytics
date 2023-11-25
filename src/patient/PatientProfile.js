import React, { useEffect, useState } from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Card,
  IconButton,
  Divider,
  Typography,
  Box,
  CssBaseline,
  Toolbar,
  List,
  AppBar as MuiAppBar,
  Drawer as MuiDrawer,
} from "@mui/material";
import { Menu, ChevronLeft, Logout } from "@mui/icons-material";
import { menuListItems } from "./menuList.js";
import { useNavigate } from "react-router-dom";
import { axiosSetup1 } from "../api/axios";
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

const defaultTheme = createTheme();

export default function Dashboard() {
  // API call to mock updates
  const [patientData, setPatientData] = useState(null);

  useEffect(() => {
    axiosSetup1
      .get("/patient/profile")
      .then((response) => {
        setPatientData(response.data);
      })
      .catch((error) => {
        // console.log(axiosSetup1);
        console.error("Error:", error);
      });
  }, []);

  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("savedRole");
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
              Profile
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

          {patientData !== null ? (
            <Card className="profile-card">
              <Typography className="card-content">Basics</Typography>
              <Typography className="card-content">
                {" "}
                Full Name:{patientData.basics.first_name[0]}{" "}
                {patientData.basics.last_name}{" "}
              </Typography>
              <Typography className="card-content">
                {" "}
                Gender: {patientData.basics.gender}{" "}
              </Typography>
              <Typography className="card-content">
                {" "}
                Date of birth:{patientData.basics.dob}
              </Typography>
            </Card>
          ) : (
            <Typography> Loading...</Typography>
          )}

          {patientData !== null ? (
            <Card className="profile-card">
              <Typography className="card-content">Lab Results</Typography>
              <Typography className="card-content">
                Display: {patientData.latest_lab_result.display}
              </Typography>
              <Typography className="card-content">
                Issued: {patientData.latest_lab_result.issued}
              </Typography>
              <Typography className="card-content">
                Resource Type: {patientData.latest_lab_result.resource_type}
              </Typography>
              <Typography className="card-content">
                Resource Id: {patientData.latest_lab_result.resource_id}
              </Typography>
              <Typography className="card-content">
                {patientData.latest_lab_result.value}{" "}
                {patientData.latest_lab_result.unit}
              </Typography>
            </Card>
          ) : (
            <Typography>Loading...</Typography>
          )}

          {patientData !== null ? (
            <Card className="profile-card">
              <Typography className="card-content">Donor Details</Typography>
              <Typography className="card-content">
                {" "}
                {patientData.donor_status}{" "}
              </Typography>
              <Typography className="card-content">
                {" "}
                {patientData.donor_status_message}{" "}
              </Typography>
            </Card>
          ) : (
            <Typography> Loading...</Typography>
          )}
        </Box>
      </Box>
    </ThemeProvider>
  );
}
