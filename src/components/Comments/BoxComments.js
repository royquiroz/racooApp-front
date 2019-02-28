import React from "react";
import { Grid, Paper, Avatar, Button, InputBase } from "@material-ui/core";

const BoxComments = ({ comment, handleChange, handleSubmit }) => (
  <Grid container spacing={8} className="separator-box-comments">
    <Grid item sm={1}>
      <Avatar
        alt="profile_pic"
        src="https://res.cloudinary.com/royquiroz/image/upload/v1547066938/male-face01_n03jts.png"
        className="avatar comments-avatar"
      />
    </Grid>
    <Grid item sm={11}>
      <Paper elevation={1} className="paper-comments">
        <form onSubmit={handleSubmit} className="box-comments">
          <InputBase
            label="Comentario"
            name="comment"
            placeholder="Escribe tu comentario..."
            value={comment.comment}
            rowsMax="3"
            fullWidth
            multiline
            onChange={handleChange}
          />
          <Button type="submit" variant="text" color="primary">
            Comentar
          </Button>
        </form>
      </Paper>
    </Grid>
  </Grid>
);

export default BoxComments;
