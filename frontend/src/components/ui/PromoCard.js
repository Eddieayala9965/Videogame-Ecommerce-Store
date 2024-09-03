import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Box,
  Typography,
  Button,
  Grid,
} from "@mui/material";

const PromoCard = () => {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "row",
        marginTop: 5,
        marginBottom: 5,
        marginX: "auto",
        width: "70%",
        boxShadow: 3,
        "@media (max-width: 600px)": {
          width: "80%",
        },
        "@media (max-width: 800px)": {
          width: "60%",
        },
      }}
    >
      <Grid container direction="row" alignItems="center">
        <Grid item xs={12} md={3}>
          <CardMedia
            component="img"
            sx={{ width: "100%", height: "auto", objectFit: "contain" }}
            image="/images/Untitled design (2).jpg"
            alt="Game Station Pro"
          />
        </Grid>
        <Grid item xs={12} md={9}>
          <CardContent sx={{ padding: "8px 16px" }}>
            <Typography variant="h6" gutterBottom sx={{ fontSize: "1rem" }}>
              Unlock $65 in value and enjoy free shipping on orders $54+ when
              you become a Game Station member!
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Receive a $5 Welcome Bonus, $5 Monthly Rewards, 5% Extra Discount
              on All Pre-Owned and Collectibles, and More!
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Enroll now for <strong>$25/Year</strong>
            </Typography>
            <Box mt={1}>
              <Button variant="outlined" color="primary" size="small">
                Join Game Station
              </Button>
            </Box>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
};

export default PromoCard;
