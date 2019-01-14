import React, { Component } from "react";
import "./App.css";
import NavBar from "./components/Navbar/Navbar";
import Router from "./Router";

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <Router />
      </div>
    );
  }
}

export default App;
