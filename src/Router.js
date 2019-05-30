import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Auth from "./components/Auth/Auth";
import Restore from "./components/Auth/Restore";
import Company from "./components/Company/Company";
import CompanyDetail from "./components/Company/CompanyDetail";
import Client from "./components/Client/Client";
import ClientDetail from "./components/Client/ClientDetail";
import Call from "./components/Call/Call";
import CallDetail from "./components/Call/CallDetail";
import CallNew from "./components/Call/CallNew";
import Sos from "./components/Sos/Sos";

const Router = () => (
  <Switch>
    <Route
      exact
      path="/"
      render={props =>
        localStorage.getItem("token") ? (
          <Redirect to="/clients" />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
    <Route
      exact
      path="/clients"
      render={props =>
        localStorage.getItem("token") ? (
          <Client {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
    <Route
      exact
      path="/client/:id"
      render={props =>
        localStorage.getItem("token") ? (
          <ClientDetail {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
    <Route
      exact
      path="/companies"
      render={props =>
        localStorage.getItem("token") ? (
          <Company {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
    <Route
      exact
      path="/company/:id"
      render={props =>
        localStorage.getItem("token") ? (
          <CompanyDetail {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
    <Route
      exact
      path="/calls"
      render={props =>
        localStorage.getItem("token") ? (
          <Call {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
    <Route
      exact
      path="/call"
      render={props =>
        localStorage.getItem("token") ? (
          <CallNew {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
    <Route
      exact
      path="/call/:id"
      render={props =>
        localStorage.getItem("token") ? (
          <CallDetail {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
    <Route
      exact
      path="/login"
      render={props =>
        !localStorage.getItem("token") ? (
          <Auth {...props} auth="login" />
        ) : (
          <Redirect to="/clients" />
        )
      }
    />
    <Route
      exact
      path="/signup"
      render={props =>
        !localStorage.getItem("token") ? (
          <Auth {...props} auth="signup" />
        ) : (
          <Redirect to="/clients" />
        )
      }
    />
    <Route
      exact
      path="/restore"
      render={props =>
        !localStorage.getItem("token") ? (
          <Restore {...props} />
        ) : (
          <Redirect to="/clients" />
        )
      }
    />
    <Route
      exact
      path="/sos"
      render={props =>
        localStorage.getItem("token") ? (
          <Sos {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  </Switch>
);

export default Router;
