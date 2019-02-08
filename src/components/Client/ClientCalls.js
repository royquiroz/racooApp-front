import React, { Component } from "react";
import { Grid, Paper, Typography } from "@material-ui/core";

import TableCalls from "../Tables/TableCalls";

class ClientCalls extends Component {
  constructor() {
    super();
    this.state = {
      calls: [],
      fromCalls: false,
      openModal: false
    };
  }

  componentWillMount() {
    const { client } = this.props;
    let calls = client.calls.sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
    this.setState({ calls: calls });
  }

  render() {
    const { calls, fromCalls } = this.state;

    return (
      <div>
        <Grid container spacing={24}>
          {calls.length <= 0 ? (
            <Typography align="center" variant="h4" style={{ width: "100%" }}>
              Sin llamadas
            </Typography>
          ) : (
            <Paper style={{ width: "100%" }}>
              <TableCalls calls={calls} fromCalls={fromCalls} {...this.props} />
            </Paper>
          )}
        </Grid>
      </div>
    );
  }
}

export default ClientCalls;
