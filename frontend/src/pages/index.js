import React from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { useRouter } from "next/router";

const HomePage = () => {
  const router = useRouter();

  const handleLogin = () => {
    router.push("/login");
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        textAlign: "center",
      }}
    >
      <Typography
        variant="h3"
        component="h1"
        gutterBottom
        sx={{ color: "#333333" }}
      >
        Welcome to the Video Game E-Commerce Store!
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleLogin}
        sx={{
          mt: 3,
          backgroundColor: "#3f51b5",
          color: "#ffffff",
          "&:hover": {
            backgroundColor: "#303f9f",
          },
        }}
      >
        Login
      </Button>
    </Container>
  );
};

export default HomePage;
