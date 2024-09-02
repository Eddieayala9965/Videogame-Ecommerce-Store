import React, { useRef, useEffect } from "react";
import { Box, Typography } from "@mui/material";

const GameTrailer = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 60;
    }
  }, []);

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "400px",
        overflow: "hidden",
        mb: 4,
        borderRadius: "15px",
      }}
    >
      <video
        ref={videoRef}
        src="/videos/wukong-trailer.mp4"
        autoPlay
        loop
        muted
        playsInline
        style={{
          width: "1155px",
          height: "400px",
          objectFit: "cover",
          borderRadius: "15px",
        }}
      />

      <Typography
        sx={{
          position: "absolute",
          color: "#ffffff",
          fontSize: "48px",
          fontFamily: "'Zhi Mang Xing', serif",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
          left: "12%",
          transform: "translateX(0%)",
          bottom: "20px",
        }}
      >
        Black Myth: Wukong
      </Typography>
    </Box>
  );
};

export default GameTrailer;
