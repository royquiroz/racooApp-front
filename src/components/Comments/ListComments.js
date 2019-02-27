import React from "react";
import { Grid, Avatar, Typography, Divider } from "@material-ui/core";
import moment from "moment";

const ListComments = ({ comment }) => (
  <Grid container spacing={8} className="separator-comments">
    <Grid item sm={1}>
      <Avatar
        alt="profile_pic"
        src={comment.user.img_profile}
        className="avatar comments-avatar"
      />
    </Grid>
    <Grid item sm={11}>
      <Typography variant="subheading" align="left" gutterBottom>
        <span className="title-comments">{comment.user.name}</span>{" "}
        <span className="date-comments">
          {moment(comment.created_at)
            .startOf()
            .fromNow()}
        </span>
      </Typography>
      <Typography
        variant="body2"
        align="left"
        className="p-comments"
        gutterBottom
      >
        {comment.comment}
      </Typography>
      <Divider />
    </Grid>
  </Grid>
);

export default ListComments;