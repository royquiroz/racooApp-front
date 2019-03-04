import React, { Component } from "react";
import { Fab, Dialog, DialogContent, TextField } from "@material-ui/core";
import { InsertLink } from "@material-ui/icons";

class CallLink extends Component {
  constructor() {
    super();
    this.state = {
      open: false
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div>
        <Fab color="secondary" onClick={this.handleClickOpen}>
          <InsertLink />
        </Fab>

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth={true}
          aria-labelledby="form-dialog-title"
        >
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="link"
              name="link"
              label="Link Asana"
              type="text"
              value={this.props.link}
              onChange={this.props.handleChange}
              fullWidth
            />
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

export default CallLink;
