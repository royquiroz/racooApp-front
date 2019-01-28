import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { MuiPickersUtilsProvider } from "material-ui-pickers";
import { BrowserRouter } from "react-router-dom";
import MomentUtils from "@date-io/moment";
import "moment/locale/es";

const WithRouter = () => (
  <BrowserRouter>
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <App />
    </MuiPickersUtilsProvider>
  </BrowserRouter>
);

ReactDOM.render(<WithRouter />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
