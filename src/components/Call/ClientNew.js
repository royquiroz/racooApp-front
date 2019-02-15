import React, { Component } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Snackbar
} from "@material-ui/core";
import Select from "react-select";
import { getAllCompanies, postClient } from "../../service";

class NewClient extends Component {
  constructor() {
    super();
    this.state = {
      client: {
        name: "",
        extension: "",
        positions: "",
        description: "",
        company: ""
      },
      companies: [],
      openMessage: false,
      message: ""
    };
  }

  componentWillMount() {
    getAllCompanies().then(res => {
      res.companies.forEach(company => {
        company.value = company._id;
        company.label = company.key;
      });

      setTimeout(() => {
        this.setState({ companies: res.companies, loading: false });
      }, 500);
    });
  }

  handleClose = e => {
    this.setState({ openMessage: false });
  };

  handleSelect = e => {
    const { client } = this.state;

    client.company = e._id;

    this.setState({ client: client });
  };

  handleChange = e => {
    const { client } = this.state;

    let field = e.target.name;
    client[field] = e.target.value;

    this.setState({ client: client });
  };

  handleSubmit = e => {
    e.preventDefault();

    postClient(this.state.client).then(res => {
      this.setState({ message: res.msg, openMessage: true });
      setTimeout(() => {
        this.props.history.push(`/call`);
      }, 1000);
    });
  };

  resetForm = () => {
    let { client } = this.state;

    client = {
      name: "",
      extension: "",
      positions: "",
      description: "",
      company: ""
    };
    this.setState({ client: client });
  };

  render() {
    const { client, companies, openMessage, message } = this.state;
    const { openModal, handleClose } = this.props;

    return (
      <div>
        <Dialog onClose={handleClose} open={openModal} scroll="body">
          <DialogTitle onClose={handleClose}>Nuevo Cliente</DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSubmit}>
              <Select
                className="text-left"
                defaultValue={client.company}
                placeholder="Compañia"
                isSearchable
                name="company"
                options={companies}
                onChange={this.handleSelect}
              />
              <TextField
                label="Nombre"
                name="name"
                margin="normal"
                value={client.name}
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                label="Puestos"
                name="positions"
                margin="normal"
                value={client.positions}
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                label="Extensión"
                name="extension"
                margin="normal"
                type="number"
                value={client.extension}
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                label="Descripción"
                name="description"
                margin="normal"
                defaultValue={client.description}
                multiline
                rowsMax="4"
                fullWidth
                onChange={this.handleChange}
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
        <Snackbar
          onClose={this.handleClose}
          autoHideDuration={2000}
          open={openMessage}
          message={message}
        />
      </div>
    );
  }
}

export default NewClient;
