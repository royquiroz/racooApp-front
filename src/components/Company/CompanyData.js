import React, { Component } from "react";
import {
  Grid,
  FormControlLabel,
  Switch,
  TextField,
  MenuItem,
  Button
} from "@material-ui/core";
import { States } from "../../helpers/states";

class CompanyData extends Component {
  constructor() {
    super();
    this.state = {
      kind: "NOTARY"
    };
  }

  handleChangeKind = e => {
    const { company } = this.props;

    e.target.checked ? (company.kind = "COMPANY") : (company.kind = "NOTARY");
    this.setState({ company: company });
  };

  render() {
    const { company } = this.props;
    return (
      <Grid spacing={32} container>
        <Grid item sm={4} xs={false} />
        <Grid item sm={4} xs={12}>
          <form>
            <FormControlLabel
              control={
                <Switch
                  name="kind"
                  checked={company.kind === "COMPANY" ? true : false}
                  onChange={this.handleChangeKind}
                  disabled
                />
              }
              label="Compañia"
            />
            {company.kind === "COMPANY" ? (
              <TextField
                label="Nombre de la Compañia"
                margin="normal"
                variant="outlined"
                value={company.name}
                fullWidth
                disabled
              />
            ) : null}
            {company.kind === "NOTARY" ? (
              <TextField
                label="Nombre del Notario"
                margin="normal"
                variant="outlined"
                value={company.lawyer}
                fullWidth
                disabled
              />
            ) : null}
            {company.kind === "NOTARY" ? (
              <TextField
                label="Numero de Notaria"
                type="number"
                margin="normal"
                variant="outlined"
                value={company.number}
                fullWidth
                disabled
              />
            ) : null}
            <TextField
              select
              label="Estado"
              name="state"
              margin="normal"
              variant="outlined"
              value={company.state}
              fullWidth
              disabled
            >
              {States.map(option => (
                <MenuItem key={option.number} value={option.number}>
                  {option.value}
                </MenuItem>
              ))}
            </TextField>
            <Button variant="contained" color="primary" type="submit" disabled>
              Guardar
            </Button>
          </form>
        </Grid>
        <Grid item sm={4} xs={false} />
      </Grid>
    );
  }
}

export default CompanyData;
