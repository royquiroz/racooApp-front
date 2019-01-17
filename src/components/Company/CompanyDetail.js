import React, { Component } from "react";
import {
  AppBar,
  Tabs,
  Tab,
  Typography,
  CircularProgress,
  List
} from "@material-ui/core";
import {
  AssignmentTwoTone,
  PhoneTwoTone,
  PeopleTwoTone
} from "@material-ui/icons";
import User from "./ListUsers";
import { getCompanyId } from "../../service";

class CompanyDetail extends Component {
  constructor() {
    super();
    this.state = {
      company: [],
      value: 0,
      loading: true
    };
  }

  componentWillMount() {
    let id = this.props.match.params.id;
    getCompanyId(id).then(res => {
      setTimeout(() => {
        this.setState({ company: res.company, loading: false });
      }, 3000);
    });
  }

  handleChange = (e, value) => {
    this.setState({ value: value });
  };

  render() {
    const { company, value, loading } = this.state;
    console.log(company);
    return (
      <div className="container">
        {loading ? (
          <CircularProgress />
        ) : (
          <div>
            <Typography variant="h3">
              {company.kind === "NOTARY"
                ? `Lic. ${company.lawyer}`
                : company.name}
            </Typography>
            {company.kind === "NOTARY" ? (
              <Typography variant="h5">
                {" "}
                Notaria No. {company.number}
              </Typography>
            ) : null}
            <AppBar position="static" color="default" className="tabs">
              <Tabs
                value={value}
                onChange={this.handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
                centered
              >
                <Tab icon={<AssignmentTwoTone />} label="Datos" />
                <Tab icon={<PeopleTwoTone />} label="Usuarios" />
                <Tab icon={<PhoneTwoTone />} label="Llamadas" />
              </Tabs>
            </AppBar>
            {value === 0 && <div>Item One</div>}
            {value === 1 && (
              <List component="nav">
                {company.clients.map((user, i) => (
                  <User key={i} user={user} />
                ))}
              </List>
            )}
            {value === 2 && <div>Item Three</div>}
          </div>
        )}
      </div>
    );
  }
}

export default CompanyDetail;
