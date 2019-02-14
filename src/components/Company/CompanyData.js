import React, { Component } from "react";
import {
  Grid,
  FormControlLabel,
  Switch,
  TextField,
  MenuItem,
  Button,
  Snackbar
} from "@material-ui/core";
import { States } from "../../helpers/states";
import { patchCompany } from "../../service";

class CompanyData extends Component {
  constructor() {
    super();
    this.state = {
      company: {},
      kind: "NOTARY",
      message: "",
      openMessage: false
    };
  }

  handleChangeKind = e => {
    const { company } = this.props;

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
    const { company } = this.state;

    patchCompany(this.props.company._id, company).then(res => {
      this.setState({ message: res.msg, openMessage: true });
    });
  };

  render() {
    const { company } = this.props;
    const { message, openMessage } = this.state;

    return (
      <Grid spacing={32} container>
        <Grid item sm={4} xs={false} />
        <Grid item sm={4} xs={12}>
          <form onSubmit={this.handleSubmit}>
            <FormControlLabel
              control={
                <Switch
                  name="kind"
                  checked={company.kind === "COMPANY" ? true : false}
                  onChange={this.handleChangeKind}
                />
              }
              label="Compañia"
            />
            {company.kind === "COMPANY" ? (
              <TextField
                label="Nombre de la Compañia"
                name="name"
                margin="normal"
                defaultValue={company.name}
                fullWidth
                onChange={this.handleChange}
              />
            ) : null}
            {company.kind === "NOTARY" ? (
              <TextField
                label="Nombre del Notario"
                name="lawyer"
                margin="normal"
                defaultValue={company.lawyer}
                fullWidth
                onChange={this.handleChange}
              />
            ) : null}
            {company.kind === "NOTARY" ? (
              <TextField
                label="Numero de Notaria"
                name="number"
                type="number"
                margin="normal"
                defaultValue={company.number}
                fullWidth
                onChange={this.handleChange}
              />
            ) : null}
            <TextField
              label="Clave"
              name="key"
              margin="normal"
              defaultValue={company.key}
              fullWidth
              onChange={this.handleChange}
            />
            <TextField
              label="Telefono"
              name="telephone"
              margin="normal"
              type="number"
              defaultValue={company.telephone}
              fullWidth
              onChange={this.handleChange}
            />
            <TextField
              select
              label="Estado"
              name="state"
              margin="normal"
              value={company.state}
              style={{ textAlign: "left" }}
              fullWidth
              onChange={this.handleChange}
            >
              {States.map(option => (
                <MenuItem key={option.number} value={option.number}>
                  {option.value}
                </MenuItem>
              ))}
            </TextField>
            <Button variant="contained" color="primary" type="submit">
              Guardar
            </Button>
          </form>
        </Grid>
        <Grid item sm={4} xs={false} />
        <Snackbar open={openMessage} message={message} />
      </Grid>
    );
  }
}

export default CompanyData;
