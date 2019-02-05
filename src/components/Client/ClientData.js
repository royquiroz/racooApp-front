import React, { Component } from "react";
import {
  Grid,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Input,
  Chip,
  Button,
  Snackbar
} from "@material-ui/core";

import { getCompanies, patchClient } from "../../service";
import Positions from "../../helpers/positions";

class ClientData extends Component {
  constructor() {
    super();
    this.state = {
      companies: [],
      client: {},
      message: "",
      openMessage: false
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
    const { client } = this.state;

    patchClient(this.props.client._id, client).then(res => {
      this.setState({ message: res.msg, openMessage: true });
    });
  };

  render() {
    const { client } = this.props;
    const { companies, message, openMessage } = this.state;

    return (
      <Grid spacing={32} container>
        <Grid item sm={4} xs={false} />
        <Grid item sm={4} xs={12}>
          <form onSubmit={this.handleSubmit}>
            <TextField
              label="Nombre"
              name="name"
              margin="normal"
              defaultValue={client.name}
              fullWidth
              onChange={this.handleChange}
            />
            <TextField
              label="Apellido"
              name="last_name"
              margin="normal"
              defaultValue={client.last_name}
              fullWidth
              onChange={this.handleChange}
            />
            <TextField
              select
              label="Compañia"
              name="company"
              margin="normal"
              value={client.company._id}
              style={{ textAlign: "left" }}
              fullWidth
              onChange={this.handleChange}
            >
              {companies.map((option, i) => (
                <MenuItem key={i} value={option._id}>
                  {option.kind === "NOTARY"
                    ? `Notaria ${option.number}`
                    : `${option.name}`}
                </MenuItem>
              ))}
            </TextField>

            <FormControl
              variant="outlined"
              fullWidth
              onChange={this.handleChange}
            >
              <InputLabel htmlFor="select-multiple-chip">Puestos</InputLabel>
              <Select
                multiple
                name="positions"
                onChange={this.handleChange}
                value={client.positions}
                input={<Input id="select-multiple-chip" />}
                renderValue={selected => (
                  <div className="chipsPositions">
                    {selected.map(value => (
                      <Chip
                        key={value}
                        label={value}
                        color="primary"
                        style={{ margin: "0 2.5px" }}
                      />
                    ))}
                  </div>
                )}
              >
                {Positions.Positions.map(name => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="Telefono"
              name="telephone"
              margin="normal"
              type="number"
              defaultValue={client.telephone}
              fullWidth
              onChange={this.handleChange}
            />
            <TextField
              label="Extension"
              name="extension"
              margin="normal"
              type="number"
              defaultValue={client.extension}
              fullWidth
              onChange={this.handleChange}
            />
            <TextField
              label="Descripcion"
              name="description"
              margin="normal"
              defaultValue={client.description}
              multiline
              rowsMax="4"
              fullWidth
              onChange={this.handleChange}
            />
            <Button variant="contained" color="primary" type="submit">
              Guardar
            </Button>
          </form>
        </Grid>
        <Grid item sm={4} xs={false} />
        <Snackbar open={openMessage} message={message} />
      </Grid>
    );
  }
}

export default ClientData;
