import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Menu } from "@material-ui/icons/";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Avatar
} from "@material-ui/core";
import ListMenu from "./Menu";
import Logo from "../../logo.png";

class NavBar extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
      open: false
    };
  }

  componentWillMount() {
    let user = JSON.parse(localStorage.getItem("user"));
    this.setState({ user: user });
  }

  toggleDrawer = () => {
    let { open } = this.state;
    open = !open;
    this.setState({ open: open });
  };

  render() {
    const { user, open } = this.state;
    return (
      <div className="root">
        <AppBar position="fixed" color="default">
          <Toolbar>
            {localStorage.getItem("token") ? (
              <div className="grow" align="left">
                <IconButton
                  color="inherit"
                  aria-label="Menu"
                  onClick={this.toggleDrawer}
                >
                  <Menu />
                </IconButton>

                <Button
                  variant="contained"
                  color="primary"
                  style={{ margin: "0 40%" }}
                  component={NavLink}
                  to="/call"
                >
                  Nueva Llamada
                </Button>
              </div>
            ) : (
              <Typography color="inherit" className="grow" align="left">
                <img src={Logo} alt="logo" className="logoAuth" />
              </Typography>
            )}

            {!localStorage.getItem("token") ? (
              <div>
                <Button component={NavLink} color="inherit" to="/login">
                  Iniciar Sesión
                </Button>
                <Button component={NavLink} color="inherit" to="/signup">
                  Registrarse
                </Button>
              </div>
            ) : (
              <Avatar
                alt="profile_pic"
                src={user.img_profile}
                className="avatar nav-avatar"
              />
            )}
          </Toolbar>
        </AppBar>
        <ListMenu open={open} toggleDrawer={this.toggleDrawer} />
      </div>
    );
  }
}

export default NavBar;
