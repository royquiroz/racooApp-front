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
  Button
} from "@material-ui/core";

import { getCompanies } from "../../service";
import Positions from "../../helpers/positions";

class ClientData extends Component {
  constructor() {
    super();
    this.state = {
      companies: []
    };
  }

  componentWillMount() {
    getCompanies().then(res => {
      this.setState({ companies: res.companies });
    });
  }

  render() {
    const { client } = this.props;
    const { companies } = this.state;

    return (
      <Grid spacing={32} container>
        <Grid item sm={4} xs={false} />
        <Grid item sm={4} xs={12}>
          <form>
            <TextField
              label="Nombre"
              name="name"
              margin="normal"
              variant="outlined"
              value={client.name}
              fullWidth
              disabled
            />
            <TextField
              label="Apellido"
              name="last_name"
              margin="normal"
              variant="outlined"
              value={client.last_name}
              fullWidth
              disabled
            />
            <TextField
              select
              label="Compañia"
              name="company"
              margin="normal"
              variant="outlined"
              value={client.company._id}
              style={{ textAlign: "left" }}
              fullWidth
              disabled
            >
              {companies.map((option, i) => (
                <MenuItem key={i} value={option._id}>
                  {option.kind === "NOTARY"
                    ? `Notaria ${option.number}`
                    : `${option.name}`}
                </MenuItem>
              ))}
            </TextField>

            <FormControl variant="outlined" fullWidth disabled>
              <InputLabel htmlFor="select-multiple-chip">Puestos</InputLabel>
              <Select
                multiple
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
              label="Extension"
              name="extension"
              margin="normal"
              type="number"
              variant="outlined"
              value={client.extension}
              fullWidth
              disabled
            />
            <TextField
              label="Descripcion"
              name="description"
              margin="normal"
              variant="outlined"
              value={client.description}
              multiline
              rowsMax="4"
              fullWidth
              disabled
            />
            <Button variant="contained" color="primary" type="submit" disabled>
              Guardar
            </Button>
          </form>
        </Grid>
        <Grid item sm={4} xs={false} />
      </Grid>
    );
  }
}

export default ClientData;
