import React, { Component } from "react";

class Home extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentWillMount() {
    this.props.history.push("/clients");
  }

  render() {
    return <div>Home</div>;
  }
}

export default Home;
