import React from "react";
import { Container, Box, AppBar, Toolbar, Link } from "@mui/material";
import ImageSlider from "../components/ui/ImageSlider";
import ScrollableAppBar from "../components/Layout/ScrollableAppBar";
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
      <ScrollableAppBar />
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
