import React, { Component } from "react";
import {
  CircularProgress,
  Grid,
  TextField,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  Button,
  IconButton,
  Snackbar
} from "@material-ui/core";
import { Add } from "@material-ui/icons";
import Selectv2 from "react-select";

import { NewClient } from "../Modal/NewClient";
import { postCall, getClients } from "../../service";

class CallNew extends Component {
  constructor() {
    super();
    this.state = {
      call: {
        client: "",
        company: "",
        system: "MINOTARIA",
        kind: "CALL"
      },
      clients: [],
      loading: true,
      message: "",
      openMessage: false
    };
  }

  componentWillMount() {
    getClients("").then(res => {
      res.clients.forEach(client => {
        client.value = client._id;
        client.company.number
          ? (client.label = `${client.name} (Notaria ${client.company.number})`)
          : (client.label = `${client.name} (${client.company.name})`);
      });

      setTimeout(() => {
        this.setState({ clients: res.clients, loading: false });
      }, 500);
    });
  }

  handleSelect = e => {
    const { call } = this.state;

    call.client = e._id;
    call.company = e.company._id;

    this.setState({ call: call });
  };

  handleChange = e => {
    const { call } = this.state;

    let field = e.target.name;
    call[field] = e.target.value;
    console.log(call);

    this.setState({ call: call });
  };

  handleSubmit = e => {
    e.preventDefault();
    let { call } = this.state;
    call.user = JSON.parse(localStorage.getItem("user"))._id;

    postCall(call).then(res => {
      this.setState({ message: res.msg, openMessage: true });
      setTimeout(() => {
        this.props.history.push(`/call/${res.call}`);
      }, 2000);
    });
  };

  render() {
    const { call, clients, loading, message, openMessage } = this.state;

    return (
      <div className="container">
        {loading ? (
          <CircularProgress />
        ) : (
          <div>
            <h1>Nueva Llamada</h1>
            <form onSubmit={this.handleSubmit}>
              <Grid container spacing={8}>
                <Grid item sm={6}>
                  <TextField
                    label="Problema"
                    name="problem"
                    multiline
                    rows="5"
                    defaultValue={call.problem}
                    margin="normal"
                    variant="outlined"
                    fullWidth
                    onChange={this.handleChange}
                  />
                </Grid>
                <Grid item sm={1} />
                <Grid item sm={4} style={{ marginTop: "15px" }}>
                  <Selectv2
                    className="text-left"
                    defaultValue={call.client}
                    placeholder="Cliente"
                    isSearchable
                    name="client"
                    options={clients}
                    onChange={this.handleSelect}
                  />
                  <IconButton aria-label="Nuevo Cliente">
                    <Add />
                  </IconButton>
                </Grid>
              </Grid>

              <Grid container spacing={8}>
                <Grid item sm={2}>
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel htmlFor="outlined-system-simple">
                      Sistema
                    </InputLabel>
                    <Select
                      align="left"
                      name="system"
                      value={call.system}
                      onChange={this.handleChange}
                      input={
                        <OutlinedInput
                          labelWidth={60}
                          name="system"
                          id="outlined-system-simple"
                        />
                      }
                    >
                      <MenuItem value="MINOTARIA">Minotaria</MenuItem>
                      <MenuItem value="CALCULOFACIL">Caculofacil</MenuItem>
                      <MenuItem value="LISTASPB">ListasPB</MenuItem>
                      <MenuItem value="CFDI">CFDI</MenuItem>
                      <MenuItem value="UIF">UIF</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item sm={1} />

                <Grid item sm={2}>
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel htmlFor="outlined-kind-simple">
                      Tipo de Soporte
                    </InputLabel>
                    <Select
                      align="left"
                      name="kind"
                      value={call.kind}
                      onChange={this.handleChange}
                      input={
                        <OutlinedInput
                          labelWidth={120}
                          name="kind"
                          id="outlined-kind-simple"
                        />
                      }
                    >
                      <MenuItem value="CALL">Llamada</MenuItem>
                      <MenuItem value="SOS">S.O.S.</MenuItem>
                      <MenuItem value="REVERSE">Inverso</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              <Grid container spacing={8}>
                <Grid item sm={6}>
                  <TextField
                    label="Solución"
                    name="solution"
                    multiline
                    rows="5"
                    defaultValue={call.solution}
                    margin="normal"
                    variant="outlined"
                    fullWidth
                    onChange={this.handleChange}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={8}>
                <Grid item sm={3}>
                  <FormLabel component="legend" align="left">
                    Resultado:
                  </FormLabel>
                  <RadioGroup
                    aria-label="ending"
                    name="ending"
                    defaultValue={call.ending}
                    onChange={this.handleChange}
                    row={true}
                  >
                    <FormControlLabel
                      value="PRODUCTIVE"
                      control={<Radio />}
                      label="Productiva"
                    />
                    <FormControlLabel
                      value="UNPRODUCTIVE"
                      control={<Radio />}
                      label="Improductiva"
                    />
                  </RadioGroup>
                </Grid>
                <Grid item sm={3}>
                  <FormLabel component="legend" align="left">
                    Estatus:
                  </FormLabel>
                  <RadioGroup
                    aria-label="status"
                    name="status"
                    defaultValue={call.status}
                    onChange={this.handleChange}
                    row={true}
                  >
                    <FormControlLabel
                      value="PENDING"
                      control={<Radio />}
                      label="Pendiente"
                    />
                    <FormControlLabel
                      value="FINALIZED"
                      control={<Radio />}
                      label="Finalizada"
                    />
                  </RadioGroup>
                </Grid>
              </Grid>
              <Grid container spacing={24}>
                <Grid item sm={12}>
                  <Button type="submit" variant="contained" color="primary">
                    Guardar
                  </Button>
                </Grid>
              </Grid>
            </form>
            <Snackbar open={openMessage} message={message} />
          </div>
        )}
      </div>
    );
  }
}

export default CallNew;
