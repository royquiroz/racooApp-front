import React, { Component } from "react";
import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  MenuItem
} from "@material-ui/core";

class Report extends Component {
  constructor() {
    super();
    this.state = {
      calls: {
        status: "",
        kind: "",
        system: ""
      }
    };
  }

  handleChange = e => {
    const { calls } = this.state;

    let field = e.target.name;
    calls[field] = e.target.value;

    this.setState({ calls: calls });
  };

  changeProps = e => {
    this.handleChange(e);
    this.props.handleFilter(
      this.state.calls.status,
      this.state.calls.kind,
      this.state.calls.system
    );
  };

  render() {
    return (
      <Grid container spacing={24}>
        <Grid item sm={2}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel htmlFor="outlined-status-simple">Estatus</InputLabel>
            <Select
              align="left"
              name="status"
              value={this.state.calls.status}
              onChange={this.changeProps}
              input={
                <OutlinedInput
                  labelWidth={60}
                  name="status"
                  id="outlined-status-simple"
                />
              }
            >
              <MenuItem value="">
                <em>Ninguno</em>
              </MenuItem>
              <MenuItem value="FINALIZED">Finalizada</MenuItem>
              <MenuItem value="PENDING DEVELOPMENT">
                Pendiente Desarrollo
              </MenuItem>
              <MenuItem value="PENDING SUPPORT">Pendiente Soporte</MenuItem>
              <MenuItem value="PENDING VISITS">Pendiente Visitas</MenuItem>
              <MenuItem value="SALES">Ventas</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item sm={2}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel htmlFor="outlined-kind-simple">
              Tipo de Soporte
            </InputLabel>
            <Select
              align="left"
              name="kind"
              value={this.state.calls.kind}
              onChange={this.changeProps}
              input={
                <OutlinedInput
                  labelWidth={120}
                  name="kind"
                  id="outlined-kind-simple"
                />
              }
            >
              <MenuItem value="">
                <em>Ninguno</em>
              </MenuItem>
              <MenuItem value="CALL">Llamada</MenuItem>
              <MenuItem value="SOS">S.O.S.</MenuItem>
              <MenuItem value="REVERSE">Inverso</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item sm={2}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel htmlFor="outlined-system-simple">Sistema</InputLabel>
            <Select
              align="left"
              name="system"
              value={this.state.calls.system}
              onChange={this.changeProps}
              input={
                <OutlinedInput
                  labelWidth={60}
                  name="system"
                  id="outlined-system-simple"
                />
              }
            >
              <MenuItem value="">
                <em>Ninguno</em>
              </MenuItem>
              <MenuItem value="MINOTARIA">Minotaria</MenuItem>
              <MenuItem value="CALCULOFACIL">Caculofacil</MenuItem>
              <MenuItem value="LISTASPB">ListasPB</MenuItem>
              <MenuItem value="CFDI">CFDI</MenuItem>
              <MenuItem value="UIF">UIF</MenuItem>
              <MenuItem value="RACOO NOTARIOS">Racoo Notarios</MenuItem>
              <MenuItem value="MINOTARIA/IMPLEMENTACION">
                Minotaria(Implementación)
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    );
  }
}

export default Report;
