import React, { Component } from "react";
import {
  Grid,
  Paper,
  InputBase,
  IconButton,
  CircularProgress
} from "@material-ui/core";
import { Search } from "@material-ui/icons";
import { getClients } from "../../service";

import CardClient from "../Card/CardClient";

class Client extends Component {
  constructor() {
    super();
    this.state = {
      clients: [],
      clientSearch: "",
      filtered: [],
      loading: true
    };
  }

  componentWillMount() {
    setTimeout(() => {
      this.setState({ loading: false });
    }, 2000);
  }

  goToClient = client => {
    this.props.history.push(`/client/${client._id}`);
  };

  handleChange = e => {
    this.setState({ clientSearch: e.target.value });
  };

  handleSearchClient = e => {
    const { clientSearch } = this.state;

    this.setState({ loading: true });
    getClients(clientSearch).then(res => {
      setTimeout(() => {
        this.setState({ clients: res.clients, loading: false });
      }, 500);
    });
  };

  render() {
    const { clients, clientSearch, loading } = this.state;

    return (
      <div className="container">
        {loading ? (
          <CircularProgress />
        ) : (
          <div>
            <Grid container spacing={16}>
              <Grid item sm={4} />
              <Grid item sm={3}>
                <h2>Clientes</h2>
                <Paper elevation={1} style={{ margin: "0 50px 30px 35px" }}>
                  <InputBase
                    placeholder="Buscar"
                    margin="none"
                    value={clientSearch}
                    onChange={this.handleChange}
                  />
                  <IconButton
                    aria-label="Buscar"
                    style={{ padding: "5px" }}
                    onClick={this.handleSearchClient}
                  >
                    <Search />
                  </IconButton>
                </Paper>
              </Grid>
            </Grid>
            <Grid container spacing={24}>
              {clients.map((client, i) => (
                <CardClient
                  key={i}
                  client={client}
                  goToClient={this.goToClient}
                />
              ))}
            </Grid>
          </div>
        )}
      </div>
    );
  }
}

export default Client;
