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
  Hidden,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HistoryIcon from "@mui/icons-material/History";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import GamesIcon from "@mui/icons-material/VideogameAsset";
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

  const handleLogin = () => {
    Cookies.set("token", "your_token_value", { expires: 1 / 48 });
    Cookies.set("user_id", "your_user_id_value", { expires: 1 / 48 });
    setIsLoggedIn(true);
  };

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
            <Hidden mdDown>
              <Button sx={{ color: "#333333" }} component={Link} href="/">
                <HomeIcon sx={{ mr: 1 }} />
                Home
              </Button>
              <Button
                sx={{ color: "#333333" }}
                component={Link}
                href="/products"
              >
                <GamesIcon sx={{ mr: 1 }} />
                Products
              </Button>
              {isLoggedIn ? (
                <Button sx={{ color: "#333333" }} onClick={handleLogout}>
                  <LogoutIcon sx={{ mr: 1 }} />
                  Logout
                </Button>
              ) : (
                <>
                  <Button
                    sx={{ color: "#333333" }}
                    component={Link}
                    href="/login"
                    onClick={handleLogin}
                  >
                    <LoginIcon sx={{ mr: 1 }} />
                    Login
                  </Button>
                  <Button
                    sx={{ color: "#333333" }}
                    component={Link}
                    href="/register"
                  >
                    <AppRegistrationIcon sx={{ mr: 1 }} />
                    Register
                  </Button>
                </>
              )}
            </Hidden>
            <Hidden mdUp>
              <IconButton sx={{ color: "#333333" }} component={Link} href="/">
                <HomeIcon />
              </IconButton>
              <IconButton
                sx={{ color: "#333333" }}
                component={Link}
                href="/products"
              >
                <GamesIcon />
              </IconButton>
              {isLoggedIn ? (
                <IconButton sx={{ color: "#333333" }} onClick={handleLogout}>
                  <LogoutIcon />
                </IconButton>
              ) : (
                <>
                  <IconButton
                    sx={{ color: "#333333" }}
                    component={Link}
                    href="/login"
                    onClick={handleLogin}
                  >
                    <LoginIcon />
                  </IconButton>
                  <IconButton
                    sx={{ color: "#333333" }}
                    component={Link}
                    href="/register"
                  >
                    <AppRegistrationIcon />
                  </IconButton>
                </>
              )}
            </Hidden>
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
              <AccountCircleIcon sx={{ marginRight: 2 }} />
              <ListItemText primary="Profile" />
            </ListItem>
            <ListItem button component={Link} href="/cart">
              <ShoppingCartIcon sx={{ marginRight: 2 }} />
              <ListItemText primary="Cart" />
            </ListItem>
            <ListItem button component={Link} href="/orders">
              <HistoryIcon sx={{ marginRight: 2 }} />
              <ListItemText primary="Order History" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
}

export default Header;
