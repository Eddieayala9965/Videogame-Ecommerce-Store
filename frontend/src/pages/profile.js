import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Avatar,
  Snackbar,
  Modal,
} from "@mui/material";
import { getUserProfile, updateUser } from "../utils/api";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const router = useRouter();
  const userId = Cookies.get("user_id");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUserProfile(userId);
        setUser(userData);
        setUsername(userData.username);
        setEmail(userData.email);
        setProfilePicture(userData.profile_picture);
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
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
    >
      <Typography variant="h4" gutterBottom>
        Profile
      </Typography>
      <Avatar
        src={profilePicture || "/default-avatar.png"}
        alt={username}
        sx={{ width: 120, height: 120, mb: 2 }}
      />
      <Typography variant="h6">{username}</Typography>
      <Typography variant="body2">{email}</Typography>

      <Box mt={3}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenModal}
          sx={{ mr: 2 }}
        >
          Edit Profile
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => router.push("/orders")}
        >
          View Order History
        </Button>
      </Box>

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
          <Typography variant="h6" component="h2" gutterBottom>
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
            >
              Save Changes
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default Profile;
