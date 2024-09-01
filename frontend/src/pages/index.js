import React from "react";
import { Container, Typography, Button } from "@mui/material";
import { useRouter } from "next/router";

const HomePage = () => {
  const router = useRouter();

  const handleLogin = () => {
    router.push("/login");
  };

  return (
    <Container>
      <Typography variant="h3" component="h1" gutterBottom>
        Welcome to the Video Game E-Commerce Store!
      </Typography>
      <Button variant="contained" color="primary" onClick={handleLogin}>
        Login
      </Button>
    </Container>
  );
};

export default HomePage;
