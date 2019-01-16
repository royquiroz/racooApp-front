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
        <Dialog onClose={this.handleClose} open={openModal} scroll="body">
          <DialogTitle onClose={this.handleClose}>Nueva Compañia</DialogTitle>
          <DialogContent>
            <form>
              <FormControlLabel
                control={
                  <Switch name="kind" onChange={this.handleChangeKind} />
                }
                label="Compañia"
              />
              <TextField label="Nombre" name="name" margin="normal" fullWidth />
              <TextField label="Numero" name="number" margin="normal" />
              {/*<TextField
                label="Estado"
                name="state"
                margin="normal"
                className="modalForm"
              >
              {estados.map(option => (
                <option key={option} value={option}>
                  {option.label}
                </option>
              ))}
              </TextField>*/}
              <TextField
                label="Notario"
                name="lawyer"
                margin="normal"
                fullWidth
              />
              <Button type="submit" onClick={this.handleClose} color="primary">
                Save changes
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

export default Company;
