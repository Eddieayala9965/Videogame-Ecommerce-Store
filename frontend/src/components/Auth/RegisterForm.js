import { useState } from "react";
import { TextField, Button, Typography, Container, Box } from "@mui/material";
import { registerUser } from "../api";

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setSnackbarMessage("Passwords do not match");
      setOpenSnackbar(true);
      return;
    }
    try {
      const response = await registerUser({ username, email, password });
      setSnackbarMessage("Registration successful!");
      setOpenSnackbar(true);
    } catch (error) {
      setSnackbarMessage("Registration failed. Please try again.");
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Typography variant="h4" component={h1} gutterBottom>
          Register
        </Typography>
      </Box>
    </Container>
  );
};
