import React, { Component } from "react";
import { Grid, Paper, Fab, CircularProgress } from "@material-ui/core";
import { Add } from "@material-ui/icons";

import TableCalls from "../Tables/TableCalls";
import NewCall from "../Modal/NewCall";
import { getCalls } from "../../service";

class Call extends Component {
  constructor() {
    super();
    this.state = {
      calls: [],
      openModal: false,
      loading: true
    };
  }

  componentWillMount() {
    getCalls().then(res => {
      console.log(res);
      setTimeout(() => {
        this.setState({ calls: res.calls, loading: false });
      }, 3000);
    });
  }

  handleClick = () => {
    this.setState({ openModal: true });
  };

  handleClose = e => {
    this.setState({ openModal: false });
  };

  render() {
    const { calls, openModal, loading } = this.state;

    return (
      <div className="container">
        {loading ? (
          <CircularProgress />
        ) : (
          <Grid container spacing={24}>
            <Paper style={{ width: "100%" }}>
              <TableCalls calls={calls} {...this.props} />
            </Paper>
            <Fab
              className="fab"
              size="large"
              color="primary"
              onClick={this.handleClick}
            >
              <Add />
            </Fab>
          </Grid>
        )}
        <NewCall
          openModal={openModal}
          handleClose={this.handleClose}
          {...this.props}
        />
      </div>
    );
  }
}

export default Call;
