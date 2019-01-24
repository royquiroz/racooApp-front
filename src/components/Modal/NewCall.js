import React, { Component } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  MenuItem,
  Snackbar
} from "@material-ui/core";
//import Select from "react-select";
import { getCompanies, postClient } from "../../service";

class NewCall extends Component {
  constructor() {
    super();
    this.state = {
      call: {
        company: "",
        client: "",
        name: "",
        last_name: ""
      },
      openMessage: false,
      message: "",
      companies: [],
      listClients: []
    };
  }

  componentWillMount() {
    getCompanies().then(res => {
      console.log(res);
      this.setState({ companies: res.companies });
    });
  }

  handleChange = e => {
    const { call } = this.state;

    let field = e.target.name;
    call[field] = e.target.value;

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

  /*handleSubmit = e => {
    e.preventDefault();

    postClient(this.state.client).then(res => {
      this.setState({ message: res.msg, openMessage: true });
      setTimeout(() => {
        this.props.history.push(`/client/${res.client}`);
      }, 2000);
    });
  };*/

  resetForm = () => {
    let { call } = this.state;

    call = {
      company: "",
      client: "",
      name: "",
      last_name: ""
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
              {call.company !== "" && listClients.length > 0 ? (
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
              <TextField
                label="Nombre"
                name="name"
                margin="normal"
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                label="Apellido"
                name="last_name"
                margin="normal"
                onChange={this.handleChange}
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
