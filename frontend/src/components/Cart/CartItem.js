import React from "react";
import {
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  Box,
  Button,
  CardMedia,
} from "@mui/material";
import { Delete } from "@mui/icons-material";

const CartItem = ({ item, onIncrement, onDecrement, onDelete }) => {
  return (
    <ListItem>
      <ListItemText
        primary={item.title}
        secondary={
          <>
            <Typography variant="body2">Price: ${item.price}</Typography>
            <Typography variant="body2">Quantity: {item.quantity}</Typography>
          </>
        }
      />
      {item.image_url && (
        <CardMedia
          component="img"
          image={item.image_url}
          alt={item.title}
          style={{ width: 100, height: 100, marginRight: 16 }}
        />
      )}
      <Box sx={{ display: "flex", alignItems: "center" }}>
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
