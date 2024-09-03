import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  Snackbar,
  Link as MuiLink,
} from "@mui/material";
import { loginUser } from "../../utils/api";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser({ username, password });
      if (response.data.access_token) {
        setSnackbarMessage("Login successful!");
        setOpenSnackbar(true);
        Cookies.set("token", response.data.access_token);
        Cookies.set("user_id", response.data.user_id);
        setTimeout(() => {
          router.push("/");
        }, 2000);
      }
    } catch (error) {
      setSnackbarMessage("Login failed. Please check your credentials.");
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container maxWidth="xs">
      <Box mt={8} sx={{ textAlign: "center" }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome to Game Station
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 4 }}>
          Sign in to your Game Station account
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ backgroundColor: "#e60023", marginBottom: 2 }}
          >
            Sign In
          </Button>
          <Typography variant="body2" sx={{ margin: "16px 0" }}>
            OR
          </Typography>
          <MuiLink href="/register" underline="none">
            <Button
              variant="outlined"
              fullWidth
              sx={{ borderColor: "#333", color: "#333" }}
            >
              Create Account
            </Button>
          </MuiLink>
        </Box>
      </Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
      />
    </Container>
  );
};

export default LoginForm;
