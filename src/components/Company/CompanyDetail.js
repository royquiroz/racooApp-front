import React, { Component } from "react";
import {
  AppBar,
  Tabs,
  Tab,
  Fab,
  Typography,
  CircularProgress,
  List
} from "@material-ui/core";
import {
  Add,
  AssignmentTwoTone,
  PhoneTwoTone,
  PeopleTwoTone
} from "@material-ui/icons";
import User from "./ListUsers";
import CompanyData from "./CompanyData";
import CompanyCalls from "./CompanyCalls";
import { getCompanyId } from "../../service";
import NewClient from "../Modal/NewClient";

class CompanyDetail extends Component {
  constructor() {
    super();
    this.state = {
      company: [],
      value: 1,
      loading: true,
      openModal: false
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
    const { company, value, loading, openModal } = this.state;
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
            <AppBar position="static" color="default" className="marginTabs">
              <Tabs
                value={value}
                onChange={this.handleChange}
                indicatorColor="secondary"
                textColor="inherit"
                centered
              >
                <Tab icon={<AssignmentTwoTone />} label="Datos" />
                <Tab icon={<PeopleTwoTone />} label="Usuarios" />
                <Tab icon={<PhoneTwoTone />} label="Llamadas" />
              </Tabs>
            </AppBar>

            {value === 0 && (
              <div>
                <CompanyData company={company} />
              </div>
            )}
            {value === 1 && (
              <List component="nav">
                {company.clients.map((user, i) => (
                  <User key={i} user={user} />
                ))}
              </List>
            )}
            {value === 2 && (
              <div>
                <CompanyCalls company={company} {...this.props} />
              </div>
            )}

            <Fab
              className="fab"
              size="large"
              color="primary"
              onClick={this.handleClick}
            >
              <Add />
            </Fab>
            <NewClient
              openModal={openModal}
              handleClose={this.handleClose}
              company={company}
              {...this.props}
            />
          </div>
        )}
      </div>
    );
  }
}

export default CompanyDetail;
