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
import { filterCalls } from "../../helpers/filters";

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
      isFilter: false,
      viewFilters: false
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

  handleViewFilters = e => {
    const { viewFilters } = this.state;

    this.setState({ viewFilters: !viewFilters });
  };

  handleFilter = (status, kind, system, user) => {
    if (status === "" && kind === "" && system === "" && user === "") {
      this.setState({ isFilter: false });
    } else {
      this.setState({
        isFilter: true,
        Callsfiltered: this.state.calls.filter(call =>
          filterCalls(call, status, kind, system, user)
        )
      });
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
      isFilter,
      viewFilters
    } = this.state;

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
              <Grid item sm={1}>
                <FormControlLabel
                  control={<Switch onChange={this.handleViewFilters} />}
                  label="Filtros"
                />
              </Grid>
              <Grid item sm={1}>
                <FormControlLabel
                  control={<Switch onChange={this.handleViewDetails} />}
                  label="Detalles"
                />
              </Grid>
            </Grid>

            {viewFilters ? (
              <Report handleFilter={this.handleFilter} date={dates} />
            ) : null}

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
