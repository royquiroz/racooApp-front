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
  Snackbar
} from "@material-ui/core";
import Selectv2 from "react-select";
import moment from "moment";

import { getCallId, patchCallId, getClients } from "../../service";

class CallDetail extends Component {
  constructor() {
    super();
    this.state = {
      call: {},
      clients: [],
      loading: true,
      message: "",
      openMessage: false
    };
  }

  componentWillMount() {
    const { match } = this.props;
    getCallId(match.params.id).then(res => {
      this.setState({ call: res.call });
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

    this.setState({ call: call });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { call } = this.state;
    call.user = JSON.parse(localStorage.getItem("user"))._id;

    let record = {
      user: JSON.parse(localStorage.getItem("user")).name,
      update: moment().format()
    };
    call.record.push(record);

    patchCallId(call._id, call).then(res => {
      this.setState({ message: res.msg, openMessage: true });
      setTimeout(() => {
        this.props.history.push(`/calls`);
      }, 500);
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
            <div>
              <h1 style={{ margin: "0" }}>{call.client.name}</h1>
              <h4 style={{ marginTop: "0" }}>{call.client.company.key}</h4>
              <p>{moment(call.created_at).format("LLLL")}</p>
            </div>
            <form onSubmit={this.handleSubmit}>
              <Grid container spacing={24}>
                <Grid item sm={4}>
                  <Selectv2
                    className="text-left"
                    defaultValue={call.client._id}
                    placeholder="Cliente"
                    isSearchable
                    name="client"
                    options={clients}
                    onChange={this.handleSelect}
                  />
                </Grid>
              </Grid>
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
                <ul className="list-records">
                  {call.record.map((user, i) => (
                    <li key={i}>
                      {user.user} - {moment(user.update).format("llll")}
                    </li>
                  ))}
                </ul>
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

export default CallDetail;
