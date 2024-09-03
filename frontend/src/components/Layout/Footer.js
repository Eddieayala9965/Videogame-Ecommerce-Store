import React from "react";
import {
  Box,
  Container,
  Typography,
  Link,
  Grid,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import { Facebook, Twitter, Instagram, YouTube } from "@mui/icons-material";
import { Apple, Android } from "@mui/icons-material";

const Footer = () => {
  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "#f5f5f5",
        color: "#333",
        mt: "auto",
        py: 4,
        borderTop: "1px solid #e0e0e0",
      }}
      component="footer"
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* GET HELP Section */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" gutterBottom>
              GET HELP
            </Typography>
            <Link
              href="#"
              variant="body2"
              display="block"
              sx={{ color: "#333", mb: 1 }}
            >
              Help Center
            </Link>
            <Link
              href="#"
              variant="body2"
              display="block"
              sx={{ color: "#333", mb: 1 }}
            >
              Frequently Asked Questions
            </Link>
            <Link
              href="#"
              variant="body2"
              display="block"
              sx={{ color: "#333", mb: 1 }}
            >
              Order Status
            </Link>
            <Link
              href="#"
              variant="body2"
              display="block"
              sx={{ color: "#333", mb: 1 }}
            >
              Game Station Credit Card
            </Link>
            <Link
              href="#"
              variant="body2"
              display="block"
              sx={{ color: "#333", mb: 1 }}
            >
              Recall Notices
            </Link>
            <Link
              href="#"
              variant="body2"
              display="block"
              sx={{ color: "#333", mb: 1 }}
            >
              Returns
            </Link>
            <Link
              href="#"
              variant="body2"
              display="block"
              sx={{ color: "#333", mb: 1 }}
            >
              Store Feedback
            </Link>
          </Grid>

          {/* LEGAL & PRIVACY Section */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" gutterBottom>
              LEGAL & PRIVACY
            </Typography>
            <Link
              href="#"
              variant="body2"
              display="block"
              sx={{ color: "#333", mb: 1 }}
            >
              CA Privacy Rights
            </Link>
            <Link
              href="#"
              variant="body2"
              display="block"
              sx={{ color: "#333", mb: 1 }}
            >
              CA Transparency Act
            </Link>
            <Link
              href="#"
              variant="body2"
              display="block"
              sx={{ color: "#333", mb: 1 }}
            >
              Conditions of Use
            </Link>
            <Link
              href="#"
              variant="body2"
              display="block"
              sx={{ color: "#333", mb: 1 }}
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              variant="body2"
              display="block"
              sx={{ color: "#333", mb: 1 }}
            >
              Game Station Terms & Conditions
            </Link>
            <Link
              href="#"
              variant="body2"
              display="block"
              sx={{ color: "#333", mb: 1 }}
            >
              Your Privacy Choices
            </Link>
          </Grid>

          {/* ABOUT US Section */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" gutterBottom>
              ABOUT US
            </Typography>
            <Link
              href="#"
              variant="body2"
              display="block"
              sx={{ color: "#333", mb: 1 }}
            >
              Accessibility
            </Link>
            <Link
              href="#"
              variant="body2"
              display="block"
              sx={{ color: "#333", mb: 1 }}
            >
              Affiliates
            </Link>
            <Link
              href="#"
              variant="body2"
              display="block"
              sx={{ color: "#333", mb: 1 }}
            >
              Careers
            </Link>
            <Link
              href="#"
              variant="body2"
              display="block"
              sx={{ color: "#333", mb: 1 }}
            >
              Find a Store
            </Link>
            <Link
              href="#"
              variant="body2"
              display="block"
              sx={{ color: "#333", mb: 1 }}
            >
              Investors
            </Link>
          </Grid>

          {/* SIGN UP Section */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" gutterBottom>
              SIGN UP
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Get Exclusive Promotions, Coupons, and the Latest Events
            </Typography>
            <Box sx={{ display: "flex", mb: 2 }}>
              <TextField
                placeholder="Enter Your E-mail"
                size="small"
                sx={{ flexGrow: 1, bgcolor: "#fff", borderRadius: 1 }}
              />
              <Button variant="contained" color="primary" sx={{ ml: 1 }}>
                JOIN
              </Button>
            </Box>
            <Typography variant="h6" gutterBottom>
              GET THE APP
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              <IconButton href="#" aria-label="Download on the App Store">
                <Apple sx={{ color: "#000" }} />
              </IconButton>
              <IconButton href="#" aria-label="Get it on Google Play">
                <Android sx={{ color: "#3ddc84" }} />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        {/* Social Media Icons */}
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <IconButton
            href="https://facebook.com"
            target="_blank"
            aria-label="Facebook"
          >
            <Facebook sx={{ color: "#3b5998" }} />
          </IconButton>
          <IconButton
            href="https://twitter.com"
            target="_blank"
            aria-label="Twitter"
          >
            <Twitter sx={{ color: "#1DA1F2" }} />
          </IconButton>
          <IconButton
            href="https://instagram.com"
            target="_blank"
            aria-label="Instagram"
          >
            <Instagram sx={{ color: "#E1306C" }} />
          </IconButton>
          <IconButton
            href="https://youtube.com"
            target="_blank"
            aria-label="YouTube"
          >
            <YouTube sx={{ color: "#FF0000" }} />
          </IconButton>
        </Box>

        {/* Copyright */}
        <Typography
          variant="body2"
          align="center"
          sx={{ mt: 4, color: "#777" }}
        >
          &copy; 1999-{new Date().getFullYear()} Game Station | Australia & New
          Zealand | Canada | France | Germany | Italy
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
