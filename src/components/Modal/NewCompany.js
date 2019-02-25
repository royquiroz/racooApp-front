import React, { Component } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  FormControlLabel,
  Switch,
  TextField,
  Button,
  MenuItem,
  Snackbar
} from "@material-ui/core";
import { States } from "../../helpers/states";
import { postCompany } from "../../service";

class NewCompany extends Component {
  constructor() {
    super();
    this.state = {
      company: {
        kind: "NOTARY",
        state: ""
      },
      openMessage: false,
      message: ""
    };
  }

  handleChangeKind = e => {
    const { company } = this.state;

    e.target.checked ? (company.kind = "COMPANY") : (company.kind = "NOTARY");
    this.setState({ company: company });
  };

  handleChange = e => {
    const { company } = this.state;

    let field = e.target.name;
    company[field] = e.target.value;
    this.setState({ company: company });
  };

  handleSubmit = e => {
    e.preventDefault();

    postCompany(this.state.company).then(res => {
      this.setState({ message: res.msg, openMessage: true });
      setTimeout(() => {
        this.props.history.push(`/company/${res.company}`);
      }, 2000);
    });
  };

  resetForm = () => {
    let { company } = this.state;

    company = {
      kind: "NOTARY",
      state: ""
    };
    this.setState({ company: company });
  };

  render() {
    const { company, openMessage, message } = this.state;
    const { openModal, handleClose } = this.props;
    return (
      <div>
        <Dialog onClose={handleClose} open={openModal} scroll="body">
          <DialogTitle onClose={handleClose}>Nueva Compañia</DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSubmit}>
              <FormControlLabel
                control={
                  <Switch name="kind" onChange={this.handleChangeKind} />
                }
                label="Compañia"
              />
              <TextField
                label="Clave"
                name="key"
                margin="normal"
                helperText="La Clave es obligatoria"
                onChange={this.handleChange}
                required
                fullWidth
              />
              {company.kind === "COMPANY" ? (
                <TextField
                  label="Nombre de la Compañia"
                  name="name"
                  margin="normal"
                  onChange={this.handleChange}
                  fullWidth
                />
              ) : null}
              {company.kind === "NOTARY" ? (
                <TextField
                  label="No. Notaria"
                  name="number"
                  type="number"
                  margin="normal"
                  onChange={this.handleChange}
                  fullWidth
                />
              ) : null}
              {company.kind === "NOTARY" ? (
                <TextField
                  label="Nombre del Notario"
                  name="lawyer"
                  margin="normal"
                  onChange={this.handleChange}
                  fullWidth
                />
              ) : null}
              <TextField
                select
                label="Estado"
                name="state"
                margin="normal"
                value={company.state}
                onChange={this.handleChange}
                fullWidth
              >
                {States.map(option => (
                  <MenuItem key={option.number} value={option.number}>
                    {option.value}
                  </MenuItem>
                ))}
              </TextField>
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

export default NewCompany;
