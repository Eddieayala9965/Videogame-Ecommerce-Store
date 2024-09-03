import React from "react";
import { Container, Box, AppBar, Toolbar, Link } from "@mui/material";
import ImageSlider from "../components/ui/ImageSlider";
import GameConsolesScroller from "../components/ui/GameConsolesScroller";
import Footer from "../components/Layout/Footer";

const HomePage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <AppBar
        position="static"
        color="default"
        sx={{ backgroundColor: "#f5f5f5", mb: 4 }}
      >
        <Toolbar
          sx={{
            justifyContent: "center",
            overflowX: "auto",
            "& a": {
              textDecoration: "none",
              color: "#333",
              padding: "0 15px",
              "&:hover": {
                color: "#000",
              },
            },
          }}
        >
          <Link href="#">New Releases</Link>
          <Link href="#">Top Deals</Link>
          <Link href="#">Best Sellers</Link>
          <Link href="#">Pre-Owned</Link>
          <Link href="#">Collectibles</Link>
          <Link href="#">Consoles</Link>
          <Link href="#">Video Games</Link>
        </Toolbar>
      </AppBar>
      <ImageSlider />
      <GameConsolesScroller />
      <Container
        maxWidth="sm"
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          mb: 4,
        }}
      ></Container>
      <Footer />
    </Box>
  );
};

export default HomePage;
