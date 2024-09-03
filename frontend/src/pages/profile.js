import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Avatar,
  Snackbar,
  Modal,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import { getUserProfile, updateUser } from "../utils/api";
import Cookies from "js-cookie";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const userId = Cookies.get("user_id");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUserProfile(userId);
        setUser(userData);
        setUsername(userData.username);
        setEmail(userData.email);
      } catch (error) {
        setSnackbarMessage("Failed to load user profile");
        setOpenSnackbar(true);
      }
    };

    fetchUser();
  }, [userId]);

  const handleUpdateProfile = async () => {
    try {
      const updatedUser = { username, email };
      await updateUser(userId, updatedUser);
      setSnackbarMessage("Profile updated successfully!");
      setOpenSnackbar(true);
      setOpenModal(false);
    } catch (error) {
      setSnackbarMessage("Failed to update profile");
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  if (!user) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box display="flex" minHeight="100vh">
      {/* Sidebar */}
      <Box
        sx={{
          width: 240,
          backgroundColor: "#f5f5f5",
          padding: 2,
        }}
      >
        <List component="nav">
          <ListItem button>
            <ListItemText primary="Pro Active Offers" />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText primary="Pro Rewards Center" />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText primary="Pro Membership" />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText primary="Rewards Activity" />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText primary="Addresses" />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText primary="Payments" />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText primary="Password" />
          </ListItem>
        </List>
      </Box>

      {/* Main Content */}
      <Box flexGrow={1} padding={3} bgcolor="#fff">
        <Typography variant="h3" gutterBottom>
          Hi, {username}
        </Typography>
        <Typography variant="h4" gutterBottom>
          Profile
        </Typography>
        <Avatar
          src="/default-avatar.png" // Replace with user's avatar if available
          alt={username}
          sx={{ width: 120, height: 120, mb: 2 }}
        />
        <Typography variant="h5">Name</Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          {username}
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Typography variant="h5">Email</Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          {email}
        </Typography>

        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenModal}
          sx={{
            mt: 3,
            backgroundColor: "#e60023",
            textTransform: "none",
            fontSize: "1rem",
          }}
        >
          Update Profile
        </Button>

        <Snackbar
          open={openSnackbar}
          autoHideDuration={4000}
          onClose={handleCloseSnackbar}
          message={snackbarMessage}
        />

        <Modal open={openModal} onClose={handleCloseModal}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              p: 4,
              boxShadow: 24,
            }}
          >
            <Typography variant="h5" component="h2" gutterBottom>
              Edit Profile
            </Typography>
            <TextField
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              margin="normal"
            />
            <Box mt={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleUpdateProfile}
                sx={{
                  backgroundColor: "#e60023",
                  textTransform: "none",
                  fontSize: "1rem",
                }}
              >
                Save Changes
              </Button>
            </Box>
          </Box>
        </Modal>
      </Box>
    </Box>
  );
};

export default Profile;
