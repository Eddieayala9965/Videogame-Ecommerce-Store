import React, { useState } from "react";
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
      <AppBar position="static" sx={{ backgroundColor: "#000000" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleToggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1, color: "#cc0000" }}>
            Game Station
          </Typography>
          <Box>
            <Button sx={{ color: "#ffffff" }} component={Link} href="/">
              Home
            </Button>
            <Button sx={{ color: "#ffffff" }} component={Link} href="/about">
              About
            </Button>
            <Button sx={{ color: "#ffffff" }} component={Link} href="/contact">
              Contact
            </Button>
            {isLoggedIn ? (
              <Button sx={{ color: "#ffffff" }} onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <>
                <Button
                  sx={{ color: "#ffffff" }}
                  component={Link}
                  href="/login"
                >
                  Login
                </Button>
                <Button
                  sx={{ color: "#ffffff" }}
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
            backgroundColor: "#333333",
            height: "100%",
            color: "#ffffff",
          }}
          role="presentation"
          onClick={handleToggleDrawer(false)}
          onKeyDown={handleToggleDrawer(false)}
        >
          <List>
            <ListItem button component={Link} href="/dashboard">
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button component={Link} href="/profile">
              <ListItemText primary="Profile" />
            </ListItem>
            <ListItem button component={Link} href="/settings">
              <ListItemText primary="Settings" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
}

export default Header;
