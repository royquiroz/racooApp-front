import React, { Component } from "react";
import { Grid, Paper, TextField, Button, Snackbar } from "@material-ui/core";
import { register, login } from "../../service";

class Auth extends Component {
  constructor() {
    super();
    this.state = {
      user: {
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
      },
      open: false,
      message: ""
    };
  }

  handleChange = e => {
    const { user } = this.state;
    let field = e.target.name;
    user[field] = e.target.value;

    this.setState({ user });
  };

  handleClose = e => {
    this.setState({ message: "", open: false });
  };

  handleRegister = e => {
    e.preventDefault();
    register(this.state.user).then(res => {
      if (!res.error) {
        this.setState({ message: res.msg, open: true });
        this.props.history.push("/login");
      } else {
        this.setState({ message: res.msg, open: true });
      }
    });
  };

  handleLogin = e => {
    e.preventDefault();
    login(this.state.user).then(res => {
      if (!res.error) {
        this.setState({ message: res.msg, open: true });
        setTimeout(() => {
          this.props.history.push("/");
        }, 2000);
      } else {
        this.setState({ message: res.msg, open: true });
      }
    });
  };

  render() {
    const { open, message } = this.state;

    return (
      <div className="container">
        <Grid container spacing={24}>
          <Grid item xs>
            &nbsp;
          </Grid>
          <Grid item xs={4}>
            <Paper className="auth" elevation={6}>
              <form
                onSubmit={
                  this.props.auth === "login"
                    ? this.handleLogin
                    : this.handleRegister
                }
              >
                {this.props.auth === "signup" ? (
                  <TextField
                    label="Nombre"
                    margin="normal"
                    name="name"
                    fullWidth
                    onChange={this.handleChange}
                  />
                ) : null}
                <TextField
                  label="Email"
                  margin="normal"
                  name="email"
                  fullWidth
                  onChange={this.handleChange}
                />
                <TextField
                  label="Password"
                  margin="normal"
                  name="password"
                  type="password"
                  fullWidth
                  onChange={this.handleChange}
                />
                {this.props.auth === "signup" ? (
                  <TextField
                    label="Confirmar Password"
                    margin="normal"
                    name="confirmPassword"
                    type="password"
                    fullWidth
                    onChange={this.handleChange}
                  />
                ) : null}
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  className="button"
                >
                  {this.props.auth === "login"
                    ? "Iniciar Sesión"
                    : "Registrarse"}
                </Button>
              </form>
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

export default Auth;
