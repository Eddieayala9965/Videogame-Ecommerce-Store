import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  Snackbar,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormControl,
  FormLabel,
  Link,
} from "@mui/material";
import { registerUser } from "../../utils/api";
import { useRouter } from "next/router";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser({ email, username, password });
      setSnackbarMessage("Registration successful!");
      setOpenSnackbar(true);
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (error) {
      setSnackbarMessage("Registration failed. Please try again.");
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container maxWidth="md">
      <Box mt={5} sx={{ textAlign: "center" }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Create Account
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 4 }}>
          Create your Game Station account, then join Pro to start earning
          points and rewards today!
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
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            sx={{ backgroundColor: "#e60023", marginTop: 3 }}
          >
            Submit
          </Button>
          <Typography
            variant="body2"
            sx={{ textAlign: "center", marginTop: 2 }}
          >
            By clicking "Create Account", I acknowledge and agree to Game
            Station's <Link href="/privacy-policy">Privacy Policy</Link>,{" "}
            <Link href="/terms">Conditions of Use</Link>, and{" "}
            <Link href="/terms">Terms & Conditions</Link>.
          </Typography>
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

export default RegisterForm;
