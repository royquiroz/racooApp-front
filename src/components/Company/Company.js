import React, { Component } from "react";
import {
  Grid,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  FormControlLabel,
  Switch,
  TextField,
  MenuItem,
  Button,
  Snackbar
} from "@material-ui/core";
import { Add } from "@material-ui/icons";

import Template from "../Card/CardCompany";
import { getCompanies, postCompany } from "../../service";
import { States } from "../../helpers/states";

class Company extends Component {
  constructor() {
    super();
    this.state = {
      companies: [],
      company: {
        kind: "NOTARY",
        state: ""
      },
      openModal: false,
      openMessage: false,
      message: ""
    };
  }

  componentWillMount() {
    getCompanies().then(res => {
      this.setState({ companies: res.companies });
    });
  }

  handleClick = () => {
    this.resetForm();
    this.setState({ openModal: true });
  };

  handleClose = e => {
    this.setState({ openModal: false });
  };

  handleChangeKind = e => {
    const { company } = this.state;

    e.target.checked ? (company.kind = "COMPANY") : (company.kind = "NOTARY");
    this.setState({ company: company });
  };

  handleChange = e => {
    const { company } = this.state;

    let field = e.target.name;
    company[field] = e.target.value;

    console.log(company);
    this.setState({ company: company });
  };

  handleSubmit = e => {
    e.preventDefault();

    postCompany(this.state.company).then(res => {
      console.log(res);
      this.setState({ message: res.msg, openMessage: true });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    });
  };

  resetForm = () => {
    let { company } = this.state;

    company.name = "";
    company.kind = "NOTARY";
    company.number = "";
    company.state = "";
    company.lawyer = "";
    this.setState({ company: company });
  };

  render() {
    const { companies, openModal, company, openMessage, message } = this.state;
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
        <Dialog onClose={this.handleClose} open={openModal} scroll="body">
          <DialogTitle onClose={this.handleClose}>Nueva Compañia</DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSubmit}>
              <FormControlLabel
                control={
                  <Switch name="kind" onChange={this.handleChangeKind} />
                }
                label="Compañia"
              />
              {company.kind === "COMPANY" ? (
                <TextField
                  label="Nombre de la Compañia"
                  name="name"
                  margin="normal"
                  onChange={this.handleChange}
                  fullWidth
                />
              ) : null}
              {company.kind === "NOTARY" ? (
                <TextField
                  label="No. Notaria"
                  name="number"
                  type="number"
                  margin="normal"
                  onChange={this.handleChange}
                  fullWidth
                />
              ) : null}
              {company.kind === "NOTARY" ? (
                <TextField
                  label="Nombre del Notario"
                  name="lawyer"
                  margin="normal"
                  onChange={this.handleChange}
                  fullWidth
                />
              ) : null}
              <TextField
                select
                label="Estado"
                name="state"
                margin="normal"
                value={company.state}
                onChange={this.handleChange}
                fullWidth
              >
                {States.map(option => (
                  <MenuItem key={option.number} value={option.number}>
                    {option.value}
                  </MenuItem>
                ))}
              </TextField>
              <Button
                className="buttonForm"
                type="submit"
                onClick={this.handleClose}
                color="primary"
              >
                Guardar
              </Button>
            </form>
          </DialogContent>
        </Dialog>
        <Snackbar
          onClose={this.handleClose}
          open={openMessage}
          message={message}
        />
      </div>
    );
  }
}

export default Company;
