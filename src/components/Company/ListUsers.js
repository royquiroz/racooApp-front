import React from "react";
import { Link } from "react-router-dom";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  IconButton
} from "@material-ui/core";
import { Person, Phone } from "@material-ui/icons";

const User = ({ user }) => (
  <ListItem component={Link} to={`/user/${user._id}`} button>
    <ListItemIcon>
      <Person />
    </ListItemIcon>
    <ListItemText primary={`${user.name} ${user.last_name}`} />
    <ListItemSecondaryAction>
      <IconButton aria-label="Comments">
        <Phone />
      </IconButton>
    </ListItemSecondaryAction>
  </ListItem>
);

export default User;
