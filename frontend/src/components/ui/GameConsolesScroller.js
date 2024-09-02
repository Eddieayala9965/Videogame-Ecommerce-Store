import React, { useState, useRef, useEffect } from "react";
import { Box, Card, CardMedia, Typography } from "@mui/material";

const GameConsolesScroller = () => {
  const consoles = [
    { name: "PlayStation 5", img: "/images/PS5.jpeg", price: "$499" },
    { name: "Xbox Series X", img: "/images/SeriesX.jpeg", price: "$499" },
    { name: "Nintendo Switch", img: "/images/Switch.jpeg", price: "$299" },
    { name: "PlayStation 4", img: "/images/PS4.jpeg", price: "$399" },
    { name: "Xbox One", img: "/images/Xbox.jpeg", price: "$299" },
    { name: "Nintendo 3DS", img: "/images/3DS.jpeg", price: "$199" },
    { name: "PlayStation Vita", img: "/images/Vita.jpeg", price: "$249" },
    { name: "Sega Genesis Mini", img: "/images/Sega.jpg", price: "$79" },
    { name: "Atari VCS", img: "/images/Atari.jpg", price: "$199" },
    { name: "Neo Geo Mini", img: "/images/Neo.jpg", price: "$129" },
  ];

  const scrollerRef = useRef(null);
  const [scrollBarWidth, setScrollBarWidth] = useState(0);

  const handleScroll = () => {
    if (scrollerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollerRef.current;
      const scrollPercentage = scrollLeft / (scrollWidth - clientWidth);
      setScrollBarWidth(scrollPercentage * 100);
    }
  };

  useEffect(() => {
    const scroller = scrollerRef.current;
    scroller.addEventListener("scroll", handleScroll);
    return () => {
      scroller.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Box sx={{ position: "relative", mb: 4 }}>
      {/* Title */}
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          marginBottom: "20px",
          fontWeight: "bold",
        }}
      >
        Best Gaming Consoles
      </Typography>

      {/* Scrolling Content */}
      <Box
        ref={scrollerRef}
        sx={{
          display: "flex",
          overflowX: "scroll",
          padding: "20px 0",
          "&::-webkit-scrollbar": {
            display: "none",
          },
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
        }}
      >
        {consoles.map((console, index) => (
          <Card
            key={index}
            sx={{
              flex: "0 0 auto",
              width: "220px",
              textAlign: "center",
              padding: "15px",
              margin: "0 10px",
              backgroundColor: "#fff",
              color: "#000",
              borderRadius: "10px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              transition: "transform 0.3s, box-shadow 0.3s",
              ":hover": {
                transform: "scale(1.05)",
                boxShadow: "0 6px 12px rgba(0, 0, 0, 0.3)",
              },
            }}
          >
            <CardMedia
              component="img"
              height="160"
              image={console.img}
              alt={console.name}
              sx={{
                borderRadius: "10px",
              }}
            />
            <Typography variant="subtitle1" sx={{ mt: 2 }}>
              {console.name}
            </Typography>
            <Typography variant="subtitle2" sx={{ mt: 1, fontWeight: "bold" }}>
              {console.price}
            </Typography>
          </Card>
        ))}
      </Box>

      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          height: "4px",
          backgroundColor: "#000",
          width: `${scrollBarWidth}%`,
          transition: "width 0.2s ease",
        }}
      />
    </Box>
  );
};

export default GameConsolesScroller;
