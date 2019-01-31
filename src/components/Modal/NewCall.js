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
  MenuItem,
  Snackbar
} from "@material-ui/core";
//import Select from "react-select";
import { getCompanies, postCall } from "../../service";

class NewCall extends Component {
  constructor() {
    super();
    this.state = {
      call: {
        company: "",
        client: "",
        kind: "",
        system: "",
        problem: ""
      },
      openMessage: false,
      message: "",
      companies: [],
      listClients: []
    };
  }

  componentWillMount() {
    let { call } = this.state;
    if (this.props.client) {
      call.company = this.props.client.company._id;
      call.client = this.props.client._id;
    }
    console.log(call);

    getCompanies().then(res => {
      this.setState({ companies: res.companies, call: call });
    });
  }

  handleChange = e => {
    const { call } = this.state;

    let field = e.target.name;
    call[field] = e.target.value;

    call.user = JSON.parse(localStorage.getItem("user"))._id;

    this.handleChangeList();

    this.setState({ call: call });
  };

  handleChangeList = () => {
    const { call, companies } = this.state;

    let list;
    if (call.company !== "") {
      list = companies.filter(company => company._id === call.company);
    }

    this.setState({ listClients: list[0].clients });
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
      company: "",
      client: "",
      kind: "",
      system: "",
      problem: ""
    };
    this.setState({ call: call });
  };

  render() {
    const { call, openMessage, message, companies, listClients } = this.state;
    const { openModal, handleClose } = this.props;

    return (
      <div>
        <Dialog onClose={handleClose} open={openModal} scroll="body">
          <DialogTitle onClose={handleClose}>Nueva Llamada</DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSubmit}>
              <TextField
                select
                label="Compañia"
                name="company"
                margin="normal"
                value={call.company}
                onChange={this.handleChange}
                fullWidth
              >
                {companies.map((company, i) => (
                  <MenuItem key={i} value={company._id}>
                    {company.kind === "NOTARY"
                      ? `Notaria ${company.number}`
                      : `${company.name}`}
                  </MenuItem>
                ))}
              </TextField>
              {(call.company !== "" && listClients.length > 0) ||
              call.client !== "" ? (
                <TextField
                  select
                  label="Cliente"
                  name="client"
                  margin="normal"
                  value={call.client}
                  onChange={this.handleChange}
                  fullWidth
                >
                  {listClients.map((client, i) => (
                    <MenuItem key={i} value={client._id}>
                      {client.name} {client.last_name}
                    </MenuItem>
                  ))}
                </TextField>
              ) : null}

              {call.client !== "" && listClients.length > 0 ? (
                <div>
                  <FormLabel component="legend" className="labelsRadios">
                    Tipo de Soporte
                  </FormLabel>
                  <RadioGroup
                    aria-label="kind"
                    name="kind"
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

                  <FormLabel component="legend" className="labelsRadios">
                    Sistema
                  </FormLabel>
                  <RadioGroup
                    aria-label="system"
                    name="system"
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

                  <TextField
                    multiline
                    rows="4"
                    label="Problema"
                    name="problem"
                    margin="normal"
                    onChange={this.handleChange}
                    fullWidth
                  />
                </div>
              ) : null}

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
