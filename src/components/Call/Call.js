import React, { Component } from "react";
import {
  Grid,
  Paper,
  CircularProgress,
  IconButton,
  FormControlLabel,
  Switch
} from "@material-ui/core";
import { Search } from "@material-ui/icons";
import { InlineDatePicker } from "material-ui-pickers";
import moment from "moment";

import Report from "../Report/Report";
import TableCalls from "../Tables/TableCalls";
import { getCalls } from "../../service";

class Call extends Component {
  constructor() {
    super();
    this.state = {
      calls: [],
      dates: {
        init: "",
        fin: ""
      },
      openModal: false,
      loading: true,
      fromCalls: true,
      viewDetails: false,
      Callsfiltered: [],
      isFilter: false
    };
  }

  componentWillMount() {
    let initDate = moment(new Date()).format("YYYY-MM-DD");
    let finDate = moment(new Date()).format("YYYY-MM-DD");

    getCalls(
      initDate,
      moment(finDate)
        .add(1, "days")
        .format("YYYY-MM-DD")
    ).then(res => {
      let calls = res.calls.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );

      let dates = {
        init: initDate,
        fin: finDate
      };

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

  handleChangeDate = (date, name) => {
    const { dates } = this.state;

    let field = name;
    dates[field] = date._d;

    this.setState({ dates });
  };

  handleSearch = e => {
    const { dates } = this.state;
    let initDate = moment(dates.init).format("YYYY-MM-DD");
    let finDate = moment(dates.fin).format("YYYY-MM-DD");

    getCalls(
      initDate,
      moment(finDate)
        .add(1, "days")
        .format("YYYY-MM-DD")
    ).then(res => {
      let calls = res.calls.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
      this.setState({ calls: calls, isFilter: false });
    });
  };

  handleViewDetails = e => {
    const { viewDetails } = this.state;

    this.setState({ viewDetails: !viewDetails });
  };

  handleFilter = (status, kind, system) => {
    if (status === "" && kind === "" && system === "") {
      this.setState({ isFilter: false });
    } else {
      this.setState({
        isFilter: true,
        Callsfiltered: this.state.calls.filter(call =>
          this.filterCalls(call, status, kind, system)
        )
      });
    }
  };

  filterCalls = (call, status, kind, system) => {
    if (status !== "" && kind === "" && system === "") {
      return call.status === status;
    }

    if (status === "" && kind !== "" && system === "") {
      return call.kind === kind;
    }

    if (status === "" && kind === "" && system !== "") {
      return call.system === system;
    }

    if (status !== "" && kind !== "" && system === "") {
      return call.status === status && call.kind === kind;
    }

    if (status === "" && kind !== "" && system !== "") {
      return call.kind === kind && call.system === system;
    }

    if (status !== "" && kind === "" && system !== "") {
      return call.status === status && call.system === system;
    }

    if (status !== "" && kind !== "" && system !== "") {
      return (
        call.status === status && call.kind === kind && call.system === system
      );
    }
  };

  render() {
    const {
      calls,
      loading,
      fromCalls,
      dates,
      viewDetails,
      Callsfiltered,
      isFilter
    } = this.state;
    //console.log(calls);

    return (
      <div className="container calls-table">
        {loading ? (
          <CircularProgress />
        ) : (
          <div>
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
              <Grid item sm={1} />
              <Grid item sm={2}>
                <FormControlLabel
                  control={<Switch onChange={this.handleViewDetails} />}
                  label="Ver Detalles"
                />
              </Grid>
            </Grid>

            <Report handleFilter={this.handleFilter} />

            <Grid container spacing={24}>
              <Grid item sm={12}>
                {calls.length > 0 ? (
                  <Paper className="width100">
                    <TableCalls
                      calls={isFilter ? Callsfiltered : calls}
                      fromCalls={fromCalls}
                      viewDetails={viewDetails}
                      {...this.props}
                    />
                  </Paper>
                ) : (
                  <h1 className="width100">Sin Resultados</h1>
                )}
              </Grid>
            </Grid>
          </div>
        )}
      </div>
    );
  }
}

export default Call;
