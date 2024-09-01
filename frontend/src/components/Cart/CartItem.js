import React from "react";
import { ListItem, ListItemText, IconButton, Typography } from "@mui/material";
import { Delete } from "@mui/icons-material";

const CartItem = ({ item, onItemUpdated, onItemDeleted }) => {
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
      <IconButton onClick={() => onItemUpdated(item.quantity + 1)}>
        +
      </IconButton>
      <IconButton onClick={() => onItemUpdated(item.quantity - 1)}>
        -
      </IconButton>
      <IconButton onClick={onItemDeleted}>
        <Delete />
      </IconButton>
    </ListItem>
  );
};

export default CartItem;
