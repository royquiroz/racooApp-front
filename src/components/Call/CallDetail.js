import React, { Component } from "react";
import { Link } from "react-router-dom";
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
  IconButton,
  Snackbar
} from "@material-ui/core";
import { Info } from "@material-ui/icons";
import moment from "moment";

import Comments from "../Comments/Comments";
import CallLink from "./Link/Link";
import { getCallId, patchCallId } from "../../service";

class CallDetail extends Component {
  constructor() {
    super();
    this.state = {
      call: {
        link: ""
      },
      loading: true,
      message: "",
      openMessage: false,
      showRecord: false,
      indexHistory: ""
    };
  }

  componentWillMount() {
    const { match } = this.props;
    getCallId(match.params.id).then(res => {
      this.setState({ call: res.call, loading: false });
    });
  }

  history = i => {
    let { indexHistory } = this.state;
    indexHistory === i ? (indexHistory = "") : (indexHistory = i);
    this.setState({ indexHistory: indexHistory });
  };

  handleChange = e => {
    const { call } = this.state;

    let field = e.target.name;
    call[field] = e.target.value;

    this.setState({ call: call });
  };

  handleClose = e => {
    this.setState({ openMessage: false });
  };

  createHistory = () => {
    let { call } = this.state;

    let history = {
      problema: call.problem,
      solucion: call.solution,
      sistema: call.system,
      soporte: call.kind,
      estatus: call.status,
      resultado: call.ending
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

  toggleRecord = () => {
    let { showRecord } = this.state;
    this.setState({ showRecord: !showRecord });
  };

  handleSubmit = e => {
    e.preventDefault();
    let { call } = this.state;

    let history = this.createHistory();

    let record = {
      user: JSON.parse(localStorage.getItem("user")).name,
      update: moment().format(),
      history: history
    };

    if (JSON.stringify(call.record[0].history) !== JSON.stringify(history)) {
      call.record.unshift(record);
    }

    //call.user = JSON.parse(localStorage.getItem("user"))._id;

    patchCallId(call._id, call).then(res => {
      this.setState({ message: res.msg, openMessage: true });
    });
  };

  render() {
    const {
      call,
      loading,
      message,
      openMessage,
      showRecord,
      indexHistory
    } = this.state;

    return (
      <div className="container">
        {loading ? (
          <CircularProgress />
        ) : (
          <div>
            <div>
              <h1 style={{ margin: "0" }}>
                <Link
                  target="_blank"
                  to={`/client/${call.client._id}`}
                  className="link link-words"
                >
                  {call.client.name}
                </Link>{" "}
                <span className="telephone-client">
                  Tel. {call.client.telephone} Ext. {call.client.extension}
                </span>
              </h1>
              <h4 style={{ marginTop: "0" }}>
                <Link
                  target="_blank"
                  to={`/company/${call.client.company._id}`}
                  className="link link-words"
                >
                  {call.client.company.key}
                </Link>{" "}
                <span className="telephone-company">
                  Tel. {call.client.company.telephone}
                </span>
              </h4>
              <p>{moment(call.created_at).format("LLLL")}</p>
            </div>
            <form onSubmit={this.handleSubmit}>
              <Grid container spacing={24}>
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

              <Grid container spacing={24}>
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
                <Grid item sm={1} />
                <Grid item sm={2}>
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel htmlFor="outlined-status-simple">
                      Estatus
                    </InputLabel>
                    <Select
                      align="left"
                      name="status"
                      value={call.status}
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
              </Grid>

              <Grid container spacing={24}>
                <Grid item sm={12}>
                  <Button type="submit" variant="contained" color="primary">
                    Guardar
                  </Button>
                </Grid>
              </Grid>

              <Grid container spacing={24}>
                <Grid item sm={1}>
                  <IconButton onClick={this.toggleRecord}>
                    <Info />
                  </IconButton>
                </Grid>
                <Grid item sm={10} />
                <Grid item sm={1}>
                  <CallLink link={call.link} handleChange={this.handleChange} />
                </Grid>
              </Grid>

              <Grid container spacing={24}>
                <Grid item sm={12}>
                  {showRecord ? (
                    <ul className="list-records">
                      {call.record.map((user, i) => (
                        <li key={i} onClick={() => this.history(i)}>
                          <span className="pointer">
                            {user.user} - {moment(user.update).format("llll")}
                          </span>{" "}
                          {indexHistory === i ? (
                            <div className="pre">
                              {JSON.stringify(user.history, null, 2)}
                            </div>
                          ) : null}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </Grid>
              </Grid>
            </form>
            <Comments
              callId={call._id}
              comments={call.comments}
              {...this.props}
            />
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

export default CallDetail;
