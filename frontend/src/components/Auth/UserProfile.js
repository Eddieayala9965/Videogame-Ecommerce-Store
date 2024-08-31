import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  Snackbar,
} from "@mui/material";
import {
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
} from "../../utils/api";

const UserProfile = () => {
  const [user, setUser] = useState({ username: "", email: "" });
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await getUserProfile();
        setUser(response.data);
      } catch (error) {
        setSnackbarMessage("Failed to fetch user profile.");
        setOpenSnackbar(true);
      }
    };
    fetchUserProfile();
  }, []);

  const handleUpdate = async () => {
    try {
      await updateUserProfile(user);
      setSnackbarMessage("Profile updated successfully!");
      setOpenSnackbar(true);
    } catch (error) {
      setSnackbarMessage("Failed to update profile.");
      setOpenSnackbar(true);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteUserProfile(user.id);
      setSnackbarMessage("Profile deleted successfully!");
      setOpenSnackbar(true);
      // Optionally, redirect to login or home page
    } catch (error) {
      setSnackbarMessage("Failed to delete profile.");
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Typography variant="h4" component="h1" gutterBottom>
          User Profile
        </Typography>
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          required
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          required
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleUpdate}
        >
          Update Profile
        </Button>
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          onClick={handleDelete}
          sx={{ mt: 2 }}
        >
          Delete Profile
        </Button>
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

export default UserProfile;
