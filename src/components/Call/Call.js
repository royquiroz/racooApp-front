import React, { Component } from "react";
import { Grid, Paper, Fab, CircularProgress } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import moment from "moment";

import TableCalls from "../Tables/TableCalls";
import NewCall from "../Modal/NewCall";
import { getCalls } from "../../service";

class Call extends Component {
  constructor() {
    super();
    this.state = {
      calls: [],
      openModal: false,
      loading: true,
      filtered: []
    };
  }

  componentWillMount() {
    getCalls().then(res => {
      let now = moment().format("l");

      this.rangeDates(now, now, res.calls);

      setTimeout(() => {
        this.setState({
          calls: res.calls,
          loading: false
        });
      }, 3000);
    });
  }

  handleClick = () => {
    this.setState({ openModal: true });
  };

  handleClose = e => {
    this.setState({ openModal: false });
  };

  rangeDates = (dateInit, dateFin, calls) => {
    let filtered = calls.filter(
      call =>
        moment(call.created_at).format("l") >= dateInit &&
        moment(call.created_at).format("l") <= dateFin
    );
    this.setState({ filtered: filtered });
  };

  render() {
    const { filtered, openModal, loading } = this.state;

    return (
      <div className="container">
        {loading ? (
          <CircularProgress />
        ) : (
          <Grid container spacing={24}>
            <Paper style={{ width: "100%" }}>
              <TableCalls calls={filtered} {...this.props} />
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
