import React, { Component } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Snackbar
} from "@material-ui/core";
//import Select from "react-select";
import { postClient } from "../../service";

class NewClient extends Component {
  constructor() {
    super();
    this.state = {
      client: {
        name: "",
        last_name: ""
      },
      openMessage: false,
      message: ""
    };
  }

  componentWillMount() {
    let { client } = this.state;
    client.company = this.props.company._id;
    this.setState({ client });
  }

  handleChange = e => {
    const { client } = this.state;

    let field = e.target.name;
    client[field] = e.target.value;
    console.log(client);

    this.setState({ client: client });
  };

  handleSubmit = e => {
    e.preventDefault();

    postClient(this.state.client).then(res => {
      this.setState({ message: res.msg, openMessage: true });
      setTimeout(() => {
        this.props.history.push(`/client/${res.client}`);
      }, 2000);
    });
  };

  resetForm = () => {
    let { client } = this.state;

    client = {
      company: this.props.company._id,
      name: "",
      last_name: ""
    };
    this.setState({ client: client });
  };

  render() {
    const { client, openMessage, message } = this.state;
    const { openModal, handleClose, company } = this.props;

    return (
      <div>
        <Dialog onClose={handleClose} open={openModal} scroll="body">
          <DialogTitle onClose={handleClose}>Nuevo Cliente</DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSubmit}>
              <TextField
                label="Compañia"
                value={
                  company.kind === "NOTARY"
                    ? `Notaria ${company.number}`
                    : `${company.name}`
                }
                margin="normal"
                fullWidth
                disabled
              />
              <TextField
                label="Nombre"
                name="name"
                margin="normal"
                value={
                  client.last_name === undefined || client.last_name
                    ? `${client.name}`
                    : `${client.name} ${client.last_name}`
                }
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                label="Apellido"
                name="last_name"
                margin="normal"
                value={client.last_name}
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

export default NewClient;
