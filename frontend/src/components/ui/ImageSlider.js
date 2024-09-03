import React, { useState, useEffect } from "react";
import { Box, Container, Typography } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";

const images = [
  "/images/BO6.webp",
  "/images/Pro.webp",
  "/images/Starwars.webp",
];

const ImageSlider = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const progressTimer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress < 100 ? prevProgress + 1 : 0
      );
    }, 50);

    if (progress === 100) {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      setProgress(0);
    }

    return () => clearInterval(progressTimer);
  }, [progress]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "auto",
        overflow: "hidden",
        backgroundColor: "transparent",
        marginBottom: "20px",
        flexDirection: "column",
        position: "relative",
      }}
    >
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          width: {
            xs: "100%", // Full width on small screens
            sm: "90%",
            md: "80%",
            lg: "1155px", // Original size on large screens
          },
          height: {
            xs: "auto",
            sm: "auto",
            md: "auto",
            lg: "262.5px",
          },
        }}
      >
        <CardMedia
          component="img"
          image={images[currentImageIndex]}
          alt="Game Slide"
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "15px",
            objectFit: "cover",
            transition: "opacity 0.5s ease-in-out",
            opacity: 1,
          }}
        />

        {images[currentImageIndex] === "/images/BO6.webp" && (
          <Box
            sx={{
              position: "absolute",
              bottom: "10px",
              right: "10px",
              transform: "translateX(0)",
              padding: "5px",
              backgroundColor: "rgba(0, 0, 0, 0.5)", // Optional: to make text stand out
              borderRadius: "5px",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: "#ff8c00",
                fontFamily: "'Impact', 'Oswald', sans-serif",
                fontWeight: "bold",
                textTransform: "uppercase",
                fontSize: {
                  xs: "12px",
                  sm: "14px",
                  md: "16px",
                  lg: "20px",
                },
              }}
            >
              Pre Order Now, OCT 26.
            </Typography>
          </Box>
        )}
      </Container>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: {
            xs: "90%",
            sm: "80%",
            md: "70%",
            lg: "60%",
          },
          mt: 2,
        }}
      >
        {images.map((_, index) => (
          <Box
            key={index}
            sx={{
              width: "100%",
              height: "3px",
              backgroundColor: "#e0e0e0",
              margin: "0 2px",
              position: "relative",
              overflow: "hidden",
              borderRadius: "2px",
            }}
          >
            <Box
              sx={{
                height: "100%",
                backgroundColor:
                  index === currentImageIndex ? "#000" : "#e0e0e0",
                width: index === currentImageIndex ? `${progress}%` : 0,
                transition: "width 0.5s ease",
              }}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ImageSlider;
