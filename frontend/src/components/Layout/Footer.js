import React from "react";
import { Box, Container, Typography, Link } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "#e0e0e0",
        color: "#4f4f4f",
        mt: "auto",
        py: 2,
        position: "fixed",
        bottom: 0,
      }}
      component="footer"
    >
      <Container maxWidth="lg">
        <Typography variant="body1" align="center">
          &copy; {new Date().getFullYear()} Game Station
        </Typography>
        <Typography variant="body2" align="center">
          <Link href="/privacy" sx={{ color: "#4f4f4f" }}>
            {" "}
            Privacy Policy
          </Link>{" "}
          |{" "}
          <Link href="/terms" sx={{ color: "#4f4f4f" }}>
            Terms of Service
          </Link>
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
