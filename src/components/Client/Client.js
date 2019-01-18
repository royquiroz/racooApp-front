import React, { Component } from "react";
import { Grid, Fab } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { getClients } from "../../service";

import CardClient from "../Card/CardClient";

class Client extends Component {
  constructor() {
    super();
    this.state = {
      clients: []
    };
  }

  componentWillMount() {
    getClients().then(res => {
      this.setState({ clients: res.clients });
    });
  }

  render() {
    const { clients } = this.state;
    console.log(clients);

    return (
      <div className="container">
        <Grid container spacing={24}>
          {clients.map((client, i) => (
            <CardClient key={i} client={client} />
          ))}
        </Grid>
        <Fab
          className="fab"
          size="large"
          color="primary"
          onClick={this.handleClick}
        >
          <Add />
        </Fab>
      </div>
    );
  }
}

export default Client;
