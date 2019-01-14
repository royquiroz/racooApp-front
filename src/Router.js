import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Auth from "./components/Auth/Auth";
import Home from "./components/Home";

const Router = () => (
  <Switch>
    <Route
      exact
      path="/"
      render={props =>
        localStorage.getItem("token") ? (
          <Home {...props} />
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
          <Redirect to="/" />
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
          <Redirect to="/" />
        )
      }
    />
  </Switch>
);

export default Router;
