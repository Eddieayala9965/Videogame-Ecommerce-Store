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
    <ListItem
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px",
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        marginBottom: "16px",
        boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        {item.image_url && (
          <CardMedia
            component="img"
            image={item.image_url}
            alt={item.title}
            sx={{
              width: 100,
              height: 100,
              objectFit: "cover",
              borderRadius: "8px",
              marginRight: "16px",
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
            </>
          }
        />
      </Box>
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
