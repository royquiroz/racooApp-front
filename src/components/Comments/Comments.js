import React, { Component } from "react";
import BoxComments from "./BoxComments";
import ListComments from "./ListComments";

import { postComment } from "../../service";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      comment: {
        user: "",
        comment: "",
        call: ""
      },
      comments: ""
    };
  }

  componentWillMount() {
    let { comments } = this.state;

    this.props.comments === undefined
      ? (comments = [])
      : (comments = this.props.comments.reverse());
    this.setState({ comments: comments });
  }

  handleChange = e => {
    let { comment } = this.state;

    comment.comment = e.target.value;

    this.setState({ comment: comment });
  };

  handleSubmit = e => {
    e.preventDefault();

    let { comment } = this.state;
    comment.user = JSON.parse(localStorage.getItem("user"))._id;
    comment.call = this.props.callId;

    if (comment.comment.length > 0) {
      postComment(comment).then(res => {
        window.location.reload();
      });
    }
    this.cleanComments();
  };

  cleanComments = () => {
    let { comment } = this.state;

    comment = {
      user: "",
      comment: "",
      call: ""
    };

    this.setState({ comment: comment });
  };

  render() {
    return (
      <div className="comments">
        <BoxComments
          comment={this.state.comment}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
        {this.state.comments
          ? this.state.comments.map((comment, i) => (
              <ListComments key={i} comment={comment} />
            ))
          : null}
      </div>
    );
  }
}

export default Home;
