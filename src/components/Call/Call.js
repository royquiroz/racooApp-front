import React, { Component } from "react";
import {
  Grid,
  Paper,
  Fab,
  CircularProgress,
  IconButton
} from "@material-ui/core";
import { Add, Search } from "@material-ui/icons";
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
      let calls = res.calls.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
      let now = moment().format();

      let dates = {
        init: now,
        fin: now
      };

      this.rangeDates(now, now, calls);
      console.log(calls);

      setTimeout(() => {
        this.setState({
          calls: calls,
          dates: dates,
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

  rangeDates = (dateIni, dateFin, calls) => {
    let filtered = calls.filter(
      call =>
        moment(call.created_at).format("L") >= moment(dateIni).format("L") &&
        moment(call.created_at).format("L") <= moment(dateFin).format("L")
    );
    this.setState({ filtered: filtered });
  };

  handleChangeDate = (date, name) => {
    const { dates } = this.state;

    let field = name;
    dates[field] = date._d;

    this.setState({ dates });
  };

  handleSearch = e => {
    const { dates, calls } = this.state;

    this.rangeDates(dates.init, dates.fin, calls);
  };

  render() {
    const { filtered, openModal, loading, fromCalls, dates } = this.state;

    return (
      <div className="container">
        {loading ? (
          <CircularProgress />
        ) : (
          <Grid container spacing={24}>
            <Grid item sm={3} />
            <Grid item sm={6}>
              <InlineDatePicker
                keyboard
                variant="outlined"
                label="Fecha Inicial"
                value={dates.init}
                format="DD/MM/YYYY"
                style={{ margin: "0 1%" }}
                onChange={e => this.handleChangeDate(e, "init")}
              />
              <InlineDatePicker
                keyboard
                variant="outlined"
                label="Fecha Final"
                value={dates.fin}
                format="DD/MM/YYYY"
                style={{ margin: "0 1%" }}
                onChange={e => this.handleChangeDate(e, "fin")}
              />
              <IconButton
                name="search"
                aria-label="Search"
                onClick={this.handleSearch}
              >
                <Search />
              </IconButton>
            </Grid>
            <Grid item sm={3} />
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
