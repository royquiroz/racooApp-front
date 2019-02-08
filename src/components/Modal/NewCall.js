import React, { Component } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  Button,
  Snackbar
} from "@material-ui/core";
//import Select from "react-select";
import { postCall } from "../../service";

class NewCall extends Component {
  constructor() {
    super();
    this.state = {
      call: {
        company: "",
        client: "",
        kind: "",
        system: "",
        problem: "",
        user: ""
      },
      openMessage: false,
      message: "",
      companies: [],
      listClients: []
    };
  }

  componentWillMount() {
    let { call } = this.state;

    call.company = this.props.client.company._id;
    call.client = this.props.client._id;
    call.user = JSON.parse(localStorage.getItem("user"))._id;

    this.setState({ call: call });
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

    postCall(this.state.call).then(res => {
      this.setState({ message: res.msg, openMessage: true });
      setTimeout(() => {
        this.props.history.push(`/call/${res.call}`);
      }, 2000);
    });
  };

  resetForm = () => {
    let { call } = this.state;

    call = {
      company: this.props.client.company._id,
      client: this.props.client._id,
      kind: "",
      system: "",
      problem: "",
      user: JSON.parse(localStorage.getItem("user"))._id
    };
    this.setState({ call: call });
  };

  render() {
    const { call, openMessage, message } = this.state;
    const { openModal, handleClose, client } = this.props;
    console.log(call);

    return (
      <div>
        <Dialog onClose={handleClose} open={openModal} scroll="body">
          <DialogTitle onClose={handleClose}>Nueva Llamada</DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSubmit}>
              <TextField
                label="Compañia"
                value={
                  client.company.kind === "NOTARY"
                    ? `Notaria ${client.company.number}`
                    : `${client.company.name}`
                }
                margin="normal"
                fullWidth
                disabled
              />
              <TextField
                label="Cliente"
                value={`${client.name} ${client.last_name}`}
                margin="normal"
                fullWidth
                disabled
              />

              <FormLabel component="legend" className="labelsRadios">
                Tipo de Soporte
              </FormLabel>
              <RadioGroup
                aria-label="kind"
                name="kind"
                onChange={this.handleChange}
                value={call.kind}
                row={true}
              >
                <FormControlLabel
                  value="CALL"
                  control={<Radio />}
                  label="Llamada"
                />
                <FormControlLabel value="SOS" control={<Radio />} label="SOS" />
                <FormControlLabel
                  value="REVERSE"
                  control={<Radio />}
                  label="Inverso"
                />
              </RadioGroup>

              <FormLabel component="legend" className="labelsRadios">
                Sistema
              </FormLabel>
              <RadioGroup
                aria-label="system"
                name="system"
                onChange={this.handleChange}
                value={call.system}
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
                <FormControlLabel value="UIF" control={<Radio />} label="UIF" />
                <FormControlLabel
                  value="RACOO NOTARIOS"
                  control={<Radio />}
                  label="Racoo Notarios"
                />
              </RadioGroup>

              <TextField
                multiline
                rows="4"
                label="Problema"
                name="problem"
                margin="normal"
                onChange={this.handleChange}
                value={call.problem}
                fullWidth
              />
              <Button
                className="buttonForm"
                type="submit"
                onClick={handleClose}
                color="primary"
                variant="contained"
              >
                Guardar
              </Button>
              <Button
                className="buttonForm"
                color="secondary"
                onClick={this.resetForm}
              >
                Reset
              </Button>
            </form>
          </DialogContent>
        </Dialog>
        <Snackbar onClose={handleClose} open={openMessage} message={message} />
      </div>
    );
  }
}

export default NewCall;
