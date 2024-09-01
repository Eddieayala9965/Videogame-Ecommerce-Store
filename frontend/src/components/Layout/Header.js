import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

function Header() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleToggleDrawer = (open) => () => {
    setIsDrawerOpen(open);
  };

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("user_id");
    setIsLoggedIn(false);
    router.push("/login");
  };

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#f5f5f5" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleToggleDrawer(true)}
            sx={{ color: "#4f4f4f" }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1, color: "#333333" }}>
            Game Station
          </Typography>
          <Box>
            <Button sx={{ color: "#333333" }} component={Link} href="/">
              Home
            </Button>
            <Button sx={{ color: "#333333" }} component={Link} href="/products">
              Products
            </Button>
            {isLoggedIn ? (
              <Button sx={{ color: "#333333" }} onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <>
                <Button
                  sx={{ color: "#333333" }}
                  component={Link}
                  href="/login"
                >
                  Login
                </Button>
                <Button
                  sx={{ color: "#333333" }}
                  component={Link}
                  href="/register"
                >
                  Register
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={handleToggleDrawer(false)}
      >
        <Box
          sx={{
            width: 250,
            backgroundColor: "#fafafa",
            height: "100%",
            color: "#333333",
          }}
          role="presentation"
          onClick={handleToggleDrawer(false)}
          onKeyDown={handleToggleDrawer(false)}
        >
          <List>
            <ListItem button component={Link} href="/profile">
              <ListItemText primary="Profile" />
            </ListItem>
            <ListItem button component={Link} href="/cart">
              <ListItemText primary="Cart" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
}

export default Header;
