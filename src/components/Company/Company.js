import React, { Component } from "react";
import { Grid, Fab } from "@material-ui/core";
import { Add } from "@material-ui/icons";

import Template from "../Card/CardCompany";
import { getCompanies } from "../../service";
import NewCompany from "../Modal/NewCompany";

class Company extends Component {
  constructor() {
    super();
    this.state = {
      companies: [],
      openModal: false
    };
  }

  componentWillMount() {
    getCompanies().then(res => {
      this.setState({ companies: res.companies });
    });
  }

  handleClick = () => {
    this.setState({ openModal: true });
  };

  handleClose = e => {
    this.setState({ openModal: false });
  };

  render() {
    const { companies, openModal } = this.state;

    return (
      <div className="container">
        <Grid container spacing={24}>
          {companies.map((company, i) => (
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
        <NewCompany openModal={openModal} handleClose={this.handleClose} />
      </div>
    );
  }
}

export default Company;
