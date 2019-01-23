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

class NewClient extends Component {
  constructor() {
    super();
    this.state = {
      client: {
        company: "",
        name: "",
        last_name: ""
      },
      openMessage: false,
      message: "",
      companies: []
    };
  }

  componentWillMount() {
    getCompanies().then(res => {
      this.setState({ companies: res.companies });
    });
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
      company: "",
      name: "",
      last_name: ""
    };
    this.setState({ client: client });
  };

  render() {
    const { client, openMessage, message, companies } = this.state;
    const { openModal, handleClose } = this.props;

    return (
      <div>
        <Dialog onClose={handleClose} open={openModal} scroll="body">
          <DialogTitle onClose={handleClose}>Nueva Cliente</DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSubmit}>
              <TextField
                select
                label="Compañia"
                name="company"
                margin="normal"
                value={client.company}
                onChange={this.handleChange}
                fullWidth
              >
                {companies.map((option, i) => (
                  <MenuItem key={i} value={option._id}>
                    {option.kind === "NOTARY"
                      ? `Notaria ${option.number}`
                      : `${option.name}`}
                  </MenuItem>
                ))}
              </TextField>
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

export default NewClient;
