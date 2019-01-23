import React, { Component } from "react";
import { Grid, Fab } from "@material-ui/core";
import { Add } from "@material-ui/icons";

//import Template from "../Card/CardCompany";
import { getCalls } from "../../service";
//import NewCompany from "../Modal/NewCompany";

class Call extends Component {
  constructor() {
    super();
    this.state = {
      calls: [],
      openModal: false
    };
  }

  componentWillMount() {
    getCalls().then(res => {
      console.log(res);
      this.setState({ calls: res.calls });
    });
  }

  handleClick = () => {
    this.setState({ openModal: true });
  };

  handleClose = e => {
    this.setState({ openModal: false });
  };

  render() {
    const { calls, openModal } = this.state;

    return (
      <div className="container">
        <Grid container spacing={24}>
          {calls.map(call => (
            <h6>{call.kind}</h6>
          ))}
          <Fab
            className="fab"
            size="large"
            color="primary"
            onClick={this.handleClick}
          >
            <Add />
          </Fab>
        </Grid>
        {/*<NewCompany
          openModal={openModal}
          handleClose={this.handleClose}
          {...this.props}
        />*/}
      </div>
    );
  }
}

export default Call;
