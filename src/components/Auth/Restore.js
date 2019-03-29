import React, { Component } from "react";
import { Grid, Paper, TextField, Button, Snackbar } from "@material-ui/core";
import { searchEmail, changePassword } from "../../service";
import Logo from "../../logo.png";

class Restore extends Component {
  constructor() {
    super();
    this.state = {
      data: {
        email: "",
        password: ""
      },
      open: false,
      message: ""
    };
  }

  handleChange = e => {
    const { data } = this.state;
    let field = e.target.name;
    data[field] = e.target.value;

    this.setState({ data });
  };

  handleClose = e => {
    this.setState({ message: "", open: false });
  };

  searchUser = () => {
    delete this.state.data.password;

    searchEmail(this.state.data).then(res => {
      if (!res.error) {
        this.setState({ user: res.user });
      } else {
        this.setState({ message: res.msg, open: true });
      }
    });
  };

  changePass = () => {
    changePassword(this.state.data).then(res => {
      if (!res.error) {
        this.setState({ user: res.user, message: res.msg, open: true });
        setTimeout(() => {
          this.props.history.push("/login");
        }, 1000);
      } else {
        this.setState({ message: res.msg, open: true });
      }
    });
  };

  render() {
    const { open, message, user } = this.state;
    return (
      <div className="container">
        <Grid container spacing={24}>
          <Grid item xs>
            &nbsp;
          </Grid>
          <Grid item xs={4}>
            <Paper className="auth" elevation={6}>
              <img src={Logo} alt="logo" style={{ width: "350px" }} />
              <TextField
                label="Email"
                margin="normal"
                name="email"
                variant="filled"
                fullWidth
                onChange={this.handleChange}
                disabled={user ? true : false}
              />
              {user ? (
                <TextField
                  label="Nuevo Password"
                  margin="normal"
                  name="password"
                  type="password"
                  variant="filled"
                  fullWidth
                  onChange={this.handleChange}
                />
              ) : null}
              {!user ? (
                <Button
                  variant="contained"
                  color="secondary"
                  type="submit"
                  className="button"
                  onClick={this.searchUser}
                >
                  Buscar usuario
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="secondary"
                  type="submit"
                  className="button"
                  onClick={this.changePass}
                >
                  Cambiar contraseña
                </Button>
              )}
            </Paper>
          </Grid>
          <Grid item xs>
            &nbsp;
          </Grid>
        </Grid>
        <Snackbar onClose={this.handleClose} open={open} message={message} />
      </div>
    );
  }
}

export default Restore;
