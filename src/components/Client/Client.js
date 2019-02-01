import React, { Component } from "react";
import {
  Grid,
  Fab,
  Paper,
  InputBase,
  IconButton,
  CircularProgress
} from "@material-ui/core";
import { Add, Search } from "@material-ui/icons";
import { getClients } from "../../service";

import CardClient from "../Card/CardClient";
import NewClient from "../Modal/NewClient";

class Client extends Component {
  constructor() {
    super();
    this.state = {
      clients: [],
      clientSearch: "",
      filtered: [],
      openModal: false,
      loading: true
    };
  }

  componentWillMount() {
    getClients().then(res => {
      setTimeout(() => {
        this.setState({ clients: res.clients, loading: false });
      }, 3000);
    });
  }

  handleClick = () => {
    this.setState({ openModal: true });
  };

  handleClose = e => {
    this.setState({ openModal: false });
  };

  handleSearchClient = e => {
    const { clients } = this.state;
    console.log(e.target.value);

    let filtered = clients.filter(client =>
      `${client.name} ${client.last_name}`
        .toLowerCase()
        .includes(e.target.value)
    );

    console.log(filtered);
    this.setState({ filtered: filtered, clientSearch: e.target.value });
  };

  render() {
    const { clients, clientSearch, filtered, openModal, loading } = this.state;
    console.log(clients);

    return (
      <div className="container">
        {loading ? (
          <CircularProgress />
        ) : (
          <div>
            <Grid container spacing={16}>
              <Grid item sm={4} />
              <Grid item sm={3}>
                <Paper elevation={1}>
                  <InputBase
                    placeholder="Buscar"
                    margin="none"
                    onChange={this.handleSearchClient}
                  />
                  <IconButton aria-label="Buscar" disabled>
                    <Search />
                  </IconButton>
                </Paper>
              </Grid>
            </Grid>
            <Grid container spacing={24}>
              {clientSearch === ""
                ? clients.map((client, i) => (
                    <CardClient key={i} client={client} />
                  ))
                : filtered.map((client, i) => (
                    <CardClient key={i} client={client} />
                  ))}
              <Fab
                className="fab"
                size="large"
                color="primary"
                onClick={this.handleClick}
              >
                <Add />
              </Fab>
            </Grid>
            <NewClient
              openModal={openModal}
              handleClose={this.handleClose}
              {...this.props}
            />
          </div>
        )}
      </div>
    );
  }
}

export default Client;
