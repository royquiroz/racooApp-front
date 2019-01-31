import React, { Component } from "react";
import {
  AppBar,
  Tabs,
  Tab,
  Typography,
  CircularProgress
} from "@material-ui/core";
import { AssignmentTwoTone, PhoneTwoTone } from "@material-ui/icons";
import { getClientId } from "../../service";
import ClientData from "./ClientData";
import ClientCalls from "./ClientCalls";

class ClientDetail extends Component {
  constructor() {
    super();
    this.state = {
      client: [],
      value: 1,
      loading: true
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

  handleChange = (e, value) => {
    this.setState({ value: value });
  };

  render() {
    const { client, value, loading } = this.state;
    console.log(client);

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
          </div>
        )}
      </div>
    );
  }
}

export default ClientDetail;
