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
          width: "1155px",
          height: "262.5px",
        }}
      >
        <CardMedia
          component="img"
          image={images[currentImageIndex]}
          alt="Game Slide"
          style={{
            width: "1155px",
            height: "262.5px",
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
              bottom: "20px",
              right: "30px",
              transform: "translateX(0)",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                color: "#ff8c00",
                fontFamily: "'Impact', 'Oswald', sans-serif",
                fontWeight: "bold",
                textTransform: "uppercase",
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
          width: "90%",
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
