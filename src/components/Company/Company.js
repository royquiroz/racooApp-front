import React, { Component } from "react";
import {
  Grid,
  Fab,
  Paper,
  InputBase,
  IconButton,
  CircularProgress
} from "@material-ui/core";
import { Add, Search } from "@material-ui/icons";

import Template from "../Card/CardCompany";
import { getCompanies } from "../../service";
import NewCompany from "../Modal/NewCompany";

class Company extends Component {
  constructor() {
    super();
    this.state = {
      companies: [],
      companySearch: "",
      filtered: [],
      openModal: false,
      loading: true
    };
  }

  componentWillMount() {
    getCompanies().then(res => {
      setTimeout(() => {
        this.setState({ companies: res.companies, loading: false });
      }, 3000);
    });
  }

  handleClick = () => {
    this.setState({ openModal: true });
  };

  handleClose = e => {
    this.setState({ openModal: false });
  };

  handleSearchCompany = e => {
    const { companies } = this.state;
    console.log(e.target.value);

    let filtered = companies.filter(company =>
      company.lawyer === undefined
        ? company.name.toLowerCase().includes(e.target.value)
        : company.lawyer.toLowerCase().includes(e.target.value)
    );

    console.log(filtered);
    this.setState({ filtered: filtered, companySearch: e.target.value });
  };

  render() {
    const {
      companies,
      companySearch,
      filtered,
      openModal,
      loading
    } = this.state;
    console.log(companies);

    return (
      <div className="container">
        {loading ? (
          <CircularProgress />
        ) : (
          <div>
            <Grid container spacing={16}>
              <Grid item sm={4} />
              <Grid item sm={3}>
                <Paper elevation={1}>
                  <InputBase
                    placeholder="Buscar"
                    margin="none"
                    onChange={this.handleSearchCompany}
                  />
                  <IconButton aria-label="Buscar" disabled>
                    <Search />
                  </IconButton>
                </Paper>
              </Grid>
            </Grid>
            <Grid container spacing={24}>
              {companySearch === ""
                ? companies.map((company, i) => (
                    <Template key={i} company={company} />
                  ))
                : filtered.map((company, i) => (
                    <Template key={i} company={company} />
                  ))}
              <Fab
                className="fab"
                size="large"
                color="primary"
                onClick={this.handleClick}
              >
                <Add />
              </Fab>
            </Grid>
            <NewCompany
              openModal={openModal}
              handleClose={this.handleClose}
              {...this.props}
            />
          </div>
        )}
      </div>
    );
  }
}

export default Company;
