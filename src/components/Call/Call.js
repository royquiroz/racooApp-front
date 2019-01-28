import React, { Component } from "react";
import { Grid, Paper, Fab, CircularProgress } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { InlineDatePicker } from "material-ui-pickers";
import moment from "moment";

import TableCalls from "../Tables/TableCalls";
import NewCall from "../Modal/NewCall";
import { getCalls } from "../../service";

class Call extends Component {
  constructor() {
    super();
    this.state = {
      calls: [],
      filtered: [],
      dates: {
        init: "",
        fin: ""
      },
      openModal: false,
      loading: true,
      fromCalls: true
    };
  }

  componentWillMount() {
    getCalls().then(res => {
      let calls = res.calls.reverse();
      let now = moment().format("l");

      this.rangeDates(now, now, calls);

      setTimeout(() => {
        this.setState({
          calls: calls,
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

  handleChangeDate = e => {
    console.log(e.target.value);
  };

  render() {
    const { filtered, openModal, loading, fromCalls } = this.state;

    return (
      <div className="container">
        {loading ? (
          <CircularProgress />
        ) : (
          <Grid container spacing={24}>
            {/*<Grid item sm={3} />
            <Grid item sm={6}>
              <InlineDatePicker
                keyboard
                variant="outlined"
                label="Fecha Inicial"
                value={moment()}
                format="DD/MM/YYYY"
                style={{ margin: "0 1%" }}
                onChange={this.handleChangeDate}
              />
              <InlineDatePicker
                keyboard
                variant="outlined"
                label="Fecha Final"
                value={moment()}
                format="DD/MM/YYYY"
                style={{ margin: "0 1%" }}
                onChange={this.handleChangeDate}
              />
            </Grid>
        <Grid item sm={3} />*/}
            <Paper style={{ width: "100%" }}>
              <TableCalls
                calls={filtered}
                fromCalls={fromCalls}
                {...this.props}
              />
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
