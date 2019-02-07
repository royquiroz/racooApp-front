import React, { Component } from "react";
import {
  CircularProgress,
  Grid,
  TextField,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  Button,
  Snackbar
} from "@material-ui/core";

import { getCallId, patchCallId } from "../../service";

class CallDetail extends Component {
  constructor() {
    super();
    this.state = {
      call: [],
      loading: true,
      message: "",
      openMessage: false
    };
  }

  componentWillMount() {
    const { match } = this.props;
    getCallId(match.params.id).then(res => {
      console.log(res.call);
      setTimeout(() => {
        this.setState({ call: res.call, loading: false });
      }, 3000);
    });
  }

  handleChange = e => {
    const { call } = this.state;

    let field = e.target.name;
    call[field] = e.target.value;
    console.log(call);

    this.setState({ call: call });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { call } = this.state;

    patchCallId(call._id, call).then(res => {
      this.setState({ message: res.msg, openMessage: true });
    });
  };

  render() {
    const { call, loading, message, openMessage } = this.state;
    return (
      <div className="container">
        {loading ? (
          <CircularProgress />
        ) : (
          <div>
            <h1>Detalle de llamada</h1>
            <form onSubmit={this.handleSubmit}>
              <Grid container spacing={24}>
                <Grid item sm={3}>
                  <FormLabel component="legend" align="left">
                    Tipo de Soporte:{" "}
                  </FormLabel>
                  <RadioGroup
                    aria-label="kind"
                    name="kind"
                    defaultValue={call.kind}
                    onChange={this.handleChange}
                    row={true}
                  >
                    <FormControlLabel
                      value="CALL"
                      control={<Radio />}
                      label="Llamada"
                    />
                    <FormControlLabel
                      value="SOS"
                      control={<Radio />}
                      label="SOS"
                    />
                    <FormControlLabel
                      value="REVERSE"
                      control={<Radio />}
                      label="Inverso"
                    />
                  </RadioGroup>
                </Grid>
                <Grid item sm={8}>
                  <FormLabel component="legend" align="left">
                    Sistema:
                  </FormLabel>
                  <RadioGroup
                    aria-label="system"
                    name="system"
                    defaultValue={call.system}
                    onChange={this.handleChange}
                    row={true}
                  >
                    <FormControlLabel
                      value="MINOTARIA"
                      control={<Radio />}
                      label="MiNotaria"
                    />
                    <FormControlLabel
                      value="CALCULOFACIL"
                      control={<Radio />}
                      label="CalculoFacil"
                    />
                    <FormControlLabel
                      value="LISTASPB"
                      control={<Radio />}
                      label="ListasPB"
                    />
                    <FormControlLabel
                      value="CFDI"
                      control={<Radio />}
                      label="CFDI"
                    />
                    <FormControlLabel
                      value="UIF"
                      control={<Radio />}
                      label="UIF"
                    />
                    <FormControlLabel
                      value="RACOO NOTARIOS"
                      control={<Radio />}
                      label="Racoo Notarios"
                    />
                  </RadioGroup>
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
                {/*<Grid item sm={3}>
                  <FormLabel component="legend" align="left">
                    Clasificaciòn:
                  </FormLabel>
                  <RadioGroup
                    aria-label="classification"
                    name="classification"
                    defaultValue={call.classification}
                    onChange={this.handleChange}
                    row={true}
                  >
                    <FormControlLabel
                      value="0"
                      control={<Radio />}
                      label="Facil"
                    />
                    <FormControlLabel
                      value="1"
                      control={<Radio />}
                      label="Media"
                    />
                    <FormControlLabel
                      value="2"
                      control={<Radio />}
                      label="Dificil"
                    />
                  </RadioGroup>
        </Grid>*/}
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
            </form>
            <Snackbar open={openMessage} message={message} />
          </div>
        )}
      </div>
    );
  }
}

export default CallDetail;
