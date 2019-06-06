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
  OutlinedInput,
  MenuItem,
  Button,
  Snackbar,
  Typography
} from "@material-ui/core";
import { Refresh } from "@material-ui/icons";
import Selectv2 from "react-select";
import moment from "moment";

import NewCompany from "../Modal/NewCompany";
import NewClient from "../Call/ClientNew";
import {
  getSosId,
  getClients,
  postCall,
  patchClient,
  patchSosId
} from "../../service";

class SosDetail extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      sos: {},
      client: "",
      clients: [],
      loading: true,
      message: "",
      openMessage: false,
      showRecord: false,
      openModalCompany: false,
      openModalClient: false,
      indexHistory: ""
    };
  }

  componentWillMount() {
    const { match } = this.props;
    getSosId(match.params.id).then(res => {
      res.sos.status = "";
      res.sos.record = [];

      if (res.sos.call) this.props.history.push(`/call/${res.sos.call}`);
      this.setState({ sos: res.sos, loading: false });
    });

    getClients("").then(res => {
      res.clients.forEach(client => {
        client.value = client._id;
        client.company.number
          ? (client.label = `${client.name} (Notaria ${client.company.number})`)
          : (client.label = `${client.name} (${client.company.name})`);
      });

      setTimeout(() => {
        this.setState({ clients: res.clients, loading: false });
        this.addUser();
      }, 500);
    });
  }

  reloadClients = () => {
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
  };

  addUser = () => {
    const { clients, sos } = this.state;

    let message, label;
    let client = clients.find(client => client.id_minotaria === sos.id_user);
    client !== undefined ? (sos.client = client._id) : (sos.client = client);
    client !== undefined ? (label = client.label) : (label = "");

    client === undefined
      ? (message = "El usuario no existe, hay que buscarlo manualmente")
      : (message = "Existe usuario y se vinculo exitosamente");
    this.setState({
      sos: sos,
      client: label,
      message: message,
      openMessage: true
    });
  };

  openModalCompany = () => {
    this.setState({ openModalCompany: true });
  };

  openModalClient = () => {
    this.setState({ openModalClient: true });
  };

  handleSelect = e => {
    const { sos } = this.state;

    let message = "Se vinculo exitosamente el usuario";
    sos.client = e._id;
    let label = e.label;

    this.setState({
      sos: sos,
      client: label,
      message: message,
      openMessage: true
    });
  };

  handleChange = e => {
    const { sos } = this.state;

    let field = e.target.name;
    sos[field] = e.target.value;

    this.setState({ sos: sos });
  };

  handleClose = e => {
    this.setState({
      openMessage: false,
      openModalCompany: false,
      openModalClient: false
    });
  };

  createHistory = () => {
    let { sos } = this.state;

    let history = {
      problema: sos.problem,
      solucion: sos.solution,
      sistema: sos.system,
      soporte: sos.kind,
      estatus: sos.status,
      resultado: sos.ending
    };

    if (history.soporte === "CALL") {
      history.soporte = "Llamada";
    } else if (history.soporte === "SOS") {
      history.soporte = "S.O.S.";
    } else {
      history.soporte = "Inverso";
    }

    if (history.estatus === "FINALIZED") {
      history.estatus = "Finalizado";
    } else if (history.estatus === "PENDING DEVELOPMENT") {
      history.estatus = "Pendiente Desarrollo";
    } else if (history.estatus === "PENDING SUPPORT") {
      history.estatus = "Pendiente Soporte";
    } else if (history.estatus === "PENDING VISITS") {
      history.estatus = "Pendiente Visitas";
    } else {
      history.estatus = "Ventas";
    }

    history.resultado === "PRODUCTIVE"
      ? (history.resultado = "Productiva")
      : (history.resultado = "Improductiva");

    return history;
  };

  async handleSubmit(e) {
    e.preventDefault();
    let { sos } = this.state;

    const response = await getSosId(sos._id);

    if (response.sos.call !== undefined) {
      let message =
        "No se puede crear la llamada porque ya se creo anteriormente";
      this.setState({ message: message, openMessage: true });
      setTimeout(() => {
        this.props.history.push(`/call/${response.sos.call}`);
        }, 3000);
    } else {
      let history = this.createHistory();

      let record = {
        user: JSON.parse(localStorage.getItem("user")).name,
        update: moment().format(),
        history: history
      };
      sos.record.push(record);
      sos.user = JSON.parse(localStorage.getItem("user"))._id;

      await patchClient(sos.client, { id_minotaria: sos.id_user });

      let id_sos = sos._id;
      delete sos.company;
      delete sos.isFinished;
      delete sos.id_user;
      delete sos.__v;
      delete sos.created_at;
      delete sos.updated_at;
      delete sos._id;

      postCall(sos).then(res => {
        patchSosId(id_sos, {
          call: res.call,
          isFinished: true
        }).then(sos => {
          console.log(sos);
        });
        this.setState({ message: res.msg, openMessage: true });
        setTimeout(() => {
          this.props.history.push(`/call/${res.call}`);
        }, 2000);
      });
    }
  }

  render() {
    const {
      sos,
      client,
      clients,
      loading,
      message,
      openMessage,
      openModalCompany,
      openModalClient
    } = this.state;

    return (
      <div className="container">
        {loading ? (
          <CircularProgress />
        ) : (
          <div>
            <div>
              <Typography variant="subtitle2">
                {client ? `Asignado a ${client}` : ""}
              </Typography>
              <h1 style={{ margin: "0" }}>{sos.user}</h1>
              <h4 style={{ marginTop: "0" }}>{sos.company}</h4>
              <p>{moment(sos.created_at).format("LLLL")}</p>
            </div>
            <form onSubmit={this.handleSubmit}>
              {sos.client === undefined ? (
                <Grid container spacing={24}>
                  <Grid item sm={3} />
                  <Grid item sm={4}>
                    <Selectv2
                      className="text-left"
                      placeholder="Cliente"
                      isSearchable
                      name="client"
                      options={clients}
                      onChange={this.handleSelect}
                    />
                  </Grid>
                  <Grid item sm={1}>
                    <Button variant="contained" onClick={this.openModalCompany}>
                      Compañia
                    </Button>
                    <NewCompany
                      openModal={openModalCompany}
                      handleClose={this.handleClose}
                      sos={sos._id}
                    />
                  </Grid>
                  <Grid item sm={1}>
                    <Button variant="contained" onClick={this.openModalClient}>
                      Cliente
                    </Button>
                    <NewClient
                      openModal={openModalClient}
                      handleClose={this.handleClose}
                      sos={sos._id}
                    />
                  </Grid>
                  <Grid item sm={1}>
                    <Button variant="contained" onClick={this.reloadClients}>
                      <Refresh />
                    </Button>
                  </Grid>
                  <Grid item sm={2} />
                </Grid>
              ) : null}
              <Grid container spacing={24}>
                <Grid item sm={6}>
                  <TextField
                    label="Problema"
                    name="problem"
                    multiline
                    rows="5"
                    defaultValue={sos.problem}
                    margin="normal"
                    variant="outlined"
                    fullWidth
                    onChange={this.handleChange}
                  />
                </Grid>
                <Grid item sm={6}>
                  <TextField
                    label="Solución"
                    name="solution"
                    multiline
                    rows="5"
                    defaultValue={sos.solution}
                    margin="normal"
                    variant="outlined"
                    fullWidth
                    onChange={this.handleChange}
                  />
                </Grid>
              </Grid>

              <Grid container spacing={24}>
                <Grid item sm={2}>
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel htmlFor="outlined-system-simple">
                      Sistema
                    </InputLabel>
                    <Select
                      align="left"
                      name="system"
                      value={sos.system}
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
                      <MenuItem value="RACOO NOTARIOS">Racoo Notarios</MenuItem>
                      <MenuItem value="MINOTARIA/IMPLEMENTACION">
                        Minotaria(Implementación)
                      </MenuItem>
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
                      value={sos.kind}
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
                <Grid item sm={1} />
                <Grid item sm={2}>
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel htmlFor="outlined-status-simple">
                      Estatus
                    </InputLabel>
                    <Select
                      align="left"
                      name="status"
                      value={sos.status}
                      onChange={this.handleChange}
                      input={
                        <OutlinedInput
                          labelWidth={60}
                          name="status"
                          id="outlined-status-simple"
                        />
                      }
                    >
                      <MenuItem value="FINALIZED">Finalizada</MenuItem>
                      <MenuItem value="PENDING DEVELOPMENT">
                        Pendiente Desarrollo
                      </MenuItem>
                      <MenuItem value="PENDING SUPPORT">
                        Pendiente Soporte
                      </MenuItem>
                      <MenuItem value="PENDING VISITS">
                        Pendiente Visitas
                      </MenuItem>
                      <MenuItem value="SALES">Ventas</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item sm={3}>
                  <FormLabel component="legend" align="left">
                    Resultado:
                  </FormLabel>
                  <RadioGroup
                    aria-label="ending"
                    name="ending"
                    defaultValue={sos.ending}
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
              </Grid>

              <Grid container spacing={24}>
                <Grid item sm={12}>
                  <Button type="submit" variant="contained" color="primary">
                    Guardar
                  </Button>
                </Grid>
              </Grid>
            </form>
            <Snackbar
              open={openMessage}
              autoCapitalize={1000}
              onClose={this.handleClose}
              message={message}
            />
          </div>
        )}
      </div>
    );
  }
}

export default SosDetail;
