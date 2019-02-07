import React from "react";
import { Link } from "react-router-dom";
import {
  Grid,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  IconButton
} from "@material-ui/core";
import { Person, Phone } from "@material-ui/icons";

const User = ({ user }) => (
  <Grid spacing={32} container>
    <Grid item sm={4} xs={false} />
    <Grid item sm={4} xs={12}>
      <ListItem component={Link} to={`/client/${user._id}`} button>
        <ListItemIcon>
          <Person />
        </ListItemIcon>
        <ListItemText
          primary={`${user.name} ${
            user.last_name === undefined ? "" : user.last_name
          }`}
        />
        <ListItemSecondaryAction>
          <IconButton aria-label="Comments">
            <Phone />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    </Grid>
    <Grid item sm={4} xs={false} />
  </Grid>
);

export default User;
