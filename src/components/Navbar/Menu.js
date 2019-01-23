import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListSubheader,
  Divider,
  Snackbar
} from "@material-ui/core";
import {
  BusinessCenterTwoTone,
  PersonTwoTone,
  PhoneInTalkTwoTone,
  FaceTwoTone,
  ExitToAppTwoTone
} from "@material-ui/icons";
import Logo from "../../logo.png";

class ListMenu extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
      message: ""
    };
  }

  signup = e => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.setState({ message: "Cerraste Sesión exitosamente", isOpen: true });
  };

  handleClose = e => {
    this.setState({ message: "", isOpen: false });
  };

  render() {
    const { open, toggleDrawer } = this.props;
    const { isOpen, message } = this.state;

    return (
      <div>
        <Drawer open={open} onClose={toggleDrawer}>
          <div
            tabIndex={0}
            role="button"
            className="drawerList"
            onClick={toggleDrawer}
            onKeyDown={toggleDrawer}
          >
            <List>
              <ListSubheader>
                <img src={Logo} alt="logo" className="logoMenu" />
              </ListSubheader>
              <ListItem component={NavLink} to="/companies">
                <ListItemIcon>
                  <BusinessCenterTwoTone />
                </ListItemIcon>
                <ListItemText primary="Compañias" />
              </ListItem>
              <ListItem component={NavLink} to="/clients">
                <ListItemIcon>
                  <PersonTwoTone />
                </ListItemIcon>
                <ListItemText primary="Usuarios" />
              </ListItem>
              <ListItem component={NavLink} to="/calls">
                <ListItemIcon>
                  <PhoneInTalkTwoTone />
                </ListItemIcon>
                <ListItemText primary="Llamadas" />
              </ListItem>
            </List>
            <Divider />
            <List>
              <ListItem button>
                <ListItemIcon>
                  <FaceTwoTone />
                </ListItemIcon>
                <ListItemText primary="Perfil" />
              </ListItem>
              <ListItem button onClick={this.signup}>
                <ListItemIcon>
                  <ExitToAppTwoTone />
                </ListItemIcon>
                <ListItemText primary="Cerrar Sesión" />
              </ListItem>
            </List>
          </div>
        </Drawer>
        <Snackbar onClose={this.handleClose} open={isOpen} message={message} />
      </div>
    );
  }
}

export default ListMenu;
