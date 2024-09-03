import React, { useRef, useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Link,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";

const ScrollableAppBar = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const toolbarRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const toolbarNode = toolbarRef.current;

    const handleScroll = () => {
      if (toolbarNode) {
        const { scrollLeft, scrollWidth, clientWidth } = toolbarNode;
        const scrollRatio = scrollLeft / (scrollWidth - clientWidth);
        setScrollPosition(scrollRatio * 100);
      }
    };

    if (toolbarNode) {
      toolbarNode.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (toolbarNode) {
        toolbarNode.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <Box sx={{ position: "relative", mb: 4 }}>
      <AppBar
        position="static"
        color="default"
        sx={{ backgroundColor: "#f5f5f5" }}
      >
        <Toolbar
          ref={toolbarRef}
          sx={{
            justifyContent: isSmallScreen ? "flex-start" : "center",
            overflowX: isSmallScreen ? "scroll" : "auto",
            whiteSpace: isSmallScreen ? "nowrap" : "normal",
            "&::-webkit-scrollbar": {
              display: "none",
            },
            "& a": {
              textDecoration: "none",
              color: "#333",
              padding: isSmallScreen ? "0 10px" : "0 15px",
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

      {isSmallScreen && (
        <Box
          sx={{
            position: "absolute",
            bottom: -4,
            left: `${scrollPosition}%`,
            transform: "translateX(-50%)",
            width: "30px",
            height: "4px",
            backgroundColor: "#7f7f7f",
            borderRadius: "2px",
            transition: "left 0.1s ease",
          }}
        />
      )}
    </Box>
  );
};

export default ScrollableAppBar;
