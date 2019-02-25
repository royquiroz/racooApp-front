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
      openModal: false,
      loading: true
    };
  }

  componentWillMount() {
    setTimeout(() => {
      this.setState({ loading: false });
    }, 2000);
  }

  goToCompany = company => {
    this.props.history.push(`/company/${company._id}`);
  };

  handleClick = () => {
    this.setState({ openModal: true });
  };

  handleClose = e => {
    this.setState({ openModal: false });
  };

  handleChange = e => {
    this.setState({ companySearch: e.target.value });
  };

  handleSearchCompany = e => {
    const { companySearch } = this.state;

    this.setState({ loading: true });
    getCompanies(companySearch).then(res => {
      setTimeout(() => {
        this.setState({ companies: res.companies, loading: false });
      }, 500);
    });
  };

  render() {
    const { companies, companySearch, openModal, loading } = this.state;

    return (
      <div className="container">
        {loading ? (
          <CircularProgress />
        ) : (
          <div>
            <Grid container spacing={16}>
              <Grid item sm={4} />
              <Grid item sm={3}>
                <h2>Compañias</h2>
                <Paper elevation={1} style={{ margin: "0 50px 30px 35px" }}>
                  <InputBase
                    placeholder="Buscar"
                    margin="none"
                    onChange={this.handleChange}
                    value={companySearch}
                  />
                  <IconButton
                    aria-label="Buscar"
                    style={{ padding: "5px" }}
                    onClick={this.handleSearchCompany}
                  >
                    <Search />
                  </IconButton>
                </Paper>
              </Grid>
            </Grid>
            <Grid container spacing={24}>
              {companies.map((company, i) => (
                <Template
                  key={i}
                  company={company}
                  goToCompany={this.goToCompany}
                />
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
