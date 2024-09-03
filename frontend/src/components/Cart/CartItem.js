import React, { useState } from "react";
import {
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  Box,
  Button,
  CardMedia,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { Delete } from "@mui/icons-material";

const CartItem = ({
  item,
  onIncrement,
  onDecrement,
  onDelete,
  onToggleWarranty,
}) => {
  const [warranty, setWarranty] = useState(false);

  const handleToggleWarranty = () => {
    setWarranty(!warranty);
    onToggleWarranty(item.id, !warranty);
  };

  return (
    <ListItem
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: {
          xs: "column",
          sm: "row",
        },
        padding: "16px",
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        marginBottom: "16px",
        boxShadow: 4,
        width: {
          xs: "95%",
          sm: "90%",
          md: "85%",
          lg: "80%",
          xl: "75%",
        },
        marginX: "auto",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: {
            xs: "column",
            sm: "row",
          },
          width: {
            xs: "100%",
            sm: "auto",
          },
          marginBottom: {
            xs: "16px",
            sm: 0,
          },
        }}
      >
        {item.image_url && (
          <CardMedia
            component="img"
            image={item.image_url}
            alt={item.title}
            sx={{
              width: {
                xs: "100%",
                sm: 100,
              },
              height: {
                xs: "auto",
                sm: 100,
              },
              objectFit: "cover",
              borderRadius: "8px",
              marginRight: {
                xs: 0,
                sm: "16px",
              },
              marginBottom: {
                xs: "16px",
                sm: 0,
              },
            }}
          />
        )}
        <ListItemText
          primary={item.title}
          secondary={
            <>
              <Typography variant="body2">
                Price: ${item.price.toFixed(2)}
              </Typography>
              <Typography variant="body2">Quantity: {item.quantity}</Typography>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={warranty}
                    onChange={handleToggleWarranty}
                  />
                }
                label="Add Warranty ($9.99)"
              />
            </>
          }
          sx={{
            textAlign: {
              xs: "center",
              sm: "left",
            },
          }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: {
            xs: "center",
            sm: "flex-end",
          },
          width: {
            xs: "100%",
            sm: "auto",
          },
          marginTop: {
            xs: "16px",
            sm: 0,
          },
        }}
      >
        <Button variant="outlined" onClick={() => onIncrement(item.id)}>
          +
        </Button>
        <Button
          variant="outlined"
          onClick={() => onDecrement(item.id)}
          disabled={item.quantity <= 1}
          sx={{ marginLeft: 1, marginRight: 1 }}
        >
          -
        </Button>
        <IconButton onClick={() => onDelete(item.id)}>
          <Delete />
        </IconButton>
      </Box>
    </ListItem>
  );
};

export default CartItem;
