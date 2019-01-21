import React, { Component } from "react";
import { Grid, Fab } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { getClients } from "../../service";

import CardClient from "../Card/CardClient";
import NewClient from "../Modal/NewClient";

class Client extends Component {
  constructor() {
    super();
    this.state = {
      clients: [],
      openModal: false
    };
  }

  componentWillMount() {
    getClients().then(res => {
      this.setState({ clients: res.clients });
    });
  }

  handleClick = () => {
    this.setState({ openModal: true });
  };

  handleClose = e => {
    this.setState({ openModal: false });
  };

  render() {
    const { clients, openModal } = this.state;
    console.log(clients);

    return (
      <div className="container">
        <Grid container spacing={24}>
          {clients.map((client, i) => (
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
    );
  }
}

export default Client;
