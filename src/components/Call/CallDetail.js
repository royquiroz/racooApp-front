import React, { Component } from "react";
import {
  CircularProgress,
  Grid,
  TextField,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel
} from "@material-ui/core";

import { getCallId } from "../../service";

class CallDetail extends Component {
  constructor() {
    super();
    this.state = {
      call: [],
      loading: true
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

  render() {
    const { call, loading } = this.state;
    return (
      <div className="container">
        {loading ? (
          <CircularProgress />
        ) : (
          <div>
            <h1>Detalle de llamada</h1>
            <Grid container spacing={24}>
              <Grid item sm={12}>
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
              <Grid item sm={12}>
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
                  multiline
                  rows="5"
                  defaultValue={call.problem}
                  margin="normal"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item sm={6}>
                <TextField
                  label="Solución"
                  multiline
                  rows="5"
                  defaultValue={call.solution}
                  margin="normal"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
            </Grid>
          </div>
        )}
      </div>
    );
  }
}

export default CallDetail;
