import React, { Component } from "react";
import { Grid, Paper, Typography, Fab } from "@material-ui/core";
import { Add } from "@material-ui/icons";

import TableCalls from "../Tables/TableCalls";
import NewCall from "../Modal/NewCall";

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

  handleClick = () => {
    this.setState({ openModal: true });
  };

  handleClose = e => {
    this.setState({ openModal: false });
  };

  render() {
    const { calls, fromCalls, openModal } = this.state;

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
          <Fab
            className="fab"
            size="large"
            color="primary"
            onClick={this.handleClick}
          >
            <Add />
          </Fab>
        </Grid>
        <NewCall
          client={this.props.client}
          openModal={openModal}
          handleClose={this.handleClose}
          {...this.props}
        />
      </div>
    );
  }
}

export default ClientCalls;
