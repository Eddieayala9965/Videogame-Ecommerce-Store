import React from "react";
import { Box, Container, Typography, Link } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "#000000", // Black background
        color: "white",
        mt: "auto",
        py: 2,
        position: "fixed",
        bottom: 0,
      }}
      component="footer"
    >
      <Container maxWidth="lg">
        <Typography variant="body1" align="center" sx={{ color: "#cc0000" }}>
          &copy; {new Date().getFullYear()} Video Game E-Commerce Store
        </Typography>
        <Typography variant="body2" color="inherit" align="center">
          <Link href="/privacy" sx={{ color: "#ffffff" }}>
            Privacy Policy
          </Link>{" "}
          |{" "}
          <Link href="/terms" sx={{ color: "#ffffff" }}>
            Terms of Service
          </Link>
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
