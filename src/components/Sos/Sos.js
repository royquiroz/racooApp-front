import React, { Component } from "react";
import { Grid } from "@material-ui/core";

import { getSos } from "../../service";
import Card from "./Card";

class Sos extends Component {
  constructor() {
    super();
    this.state = {
      sos: [],
      loading: true
    };
  }

  componentWillMount() {
    getSos().then(res => {
      setTimeout(() => {
        this.setState({ sos: res.sos, loading: false });
      }, 3000);
    });
  }

  render() {
    return (
      <div className="container">
        <Grid container spacing={24}>
          {this.state.sos.map((sos, i) => (
            <Card key={i} sos={sos} />
          ))}
        </Grid>
      </div>
    );
  }
}

export default Sos;
