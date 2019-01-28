import React, { Component } from "react";
import { Grid, Paper, Typography } from "@material-ui/core";

import TableCalls from "../Tables/TableCalls";

class CompanyCalls extends Component {
  constructor() {
    super();
    this.state = {
      calls: [],
      fromCalls: true
    };
  }

  componentWillMount() {
    const { company } = this.props;
    this.setState({ calls: company.calls });
  }

  render() {
    const { calls, fromCalls } = this.state;
    console.log(this.props);

    return (
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
    );
  }
}

export default CompanyCalls;
