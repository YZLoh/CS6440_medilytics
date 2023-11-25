import { Typography, Box, Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

function PageNotFound() {
  const navigate = useNavigate();
  const navHome = () => {
    navigate("/");
  };

  return (
    <Box sx={{ marginTop: "10%" }}>
      <Typography variant="h1" sx={{ textAlign: "center" }}>
        404
      </Typography>
      <Typography variant="h3" sx={{ textAlign: "center" }}>
        Sorry, the page you requested could not be found.
      </Typography>
      <Button
        variant="contained"
        onClick={navHome}
        sx={{
          marginLeft: "50%",
          height: "60px",
          textTransform: "none",
          color: "#fff",
          backgroundColor: "#1C3966",
          marginTop: "30px" 
        }}
      >
        Go Home
      </Button>
    </Box>
  );
}

export default PageNotFound;
