import React, { Component } from "react";
import {
  Grid,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  FormControlLabel,
  Switch,
  Button
} from "@material-ui/core";
import { Add } from "@material-ui/icons";

import Template from "../Card/CardCompany";
import { getCompanies } from "../../service";

class Company extends Component {
  constructor() {
    super();
    this.state = {
      companies: [],
      company: {},
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

  handleChange = e => {
    console.log(e.target.name);
    console.log(e.target.checked);
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
        <Dialog onClose={this.handleClose} open={openModal}>
          <DialogTitle onClose={this.handleClose}>Nueva Compañia</DialogTitle>
          <DialogContent>
            <FormControlLabel
              control={<Switch name="kind" onChange={this.handleChange} />}
              label="Compañia"
            />
            <Button type="submit" onClick={this.handleClose} color="primary">
              Save changes
            </Button>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

export default Company;
