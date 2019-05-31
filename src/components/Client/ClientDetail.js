import React, { Component } from "react";
import {
  AppBar,
  Tabs,
  Tab,
  //Fab,
  Typography,
  CircularProgress
} from "@material-ui/core";
import { /*Add,*/ AssignmentTwoTone, PhoneTwoTone } from "@material-ui/icons";
import { getClientId } from "../../service";
import ClientData from "./ClientData";
import ClientCalls from "./ClientCalls";
//import NewCall from "../Modal/NewCall";

class ClientDetail extends Component {
  constructor() {
    super();
    this.state = {
      client: [],
      value: 1,
      loading: true,
      openModal: false
    };
  }

  componentWillMount() {
    let id = this.props.match.params.id;
    getClientId(id).then(res => {
      setTimeout(() => {
        this.setState({ client: res.client, loading: false });
      }, 3000);
    });
  }

  handleClick = () => {
    this.setState({ openModal: true });
  };

  handleClose = e => {
    this.setState({ openModal: false });
  };

  handleChange = (e, value) => {
    this.setState({ value: value });
  };

  render() {
    const { client, value, loading /*, openModal*/ } = this.state;

    return (
      <div className="container">
        {loading ? (
          <CircularProgress />
        ) : (
          <div>
            <Typography variant="h3">
              {client.name} {client.last_name}
            </Typography>
            <AppBar position="static" color="default" className="marginTabs">
              <Tabs
                value={value}
                onChange={this.handleChange}
                indicatorColor="secondary"
                textColor="inherit"
                centered
              >
                <Tab icon={<AssignmentTwoTone />} label="Datos" />
                <Tab icon={<PhoneTwoTone />} label="Llamadas" />
              </Tabs>
            </AppBar>

            {value === 0 && (
              <div>
                <ClientData client={client} />
              </div>
            )}
            {value === 1 && (
              <div>
                <ClientCalls client={client} {...this.props} />
              </div>
            )}
            {/*<Fab
              className="fab"
              size="large"
              color="primary"
              onClick={this.handleClick}
            >
              <Add />
            </Fab>
            <NewCall
              client={client}
              openModal={openModal}
              handleClose={this.handleClose}
              {...this.props}
            />*/}
          </div>
        )}
      </div>
    );
  }
}

export default ClientDetail;
