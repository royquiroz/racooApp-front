import React, { Component } from "react";
import {
  Fab,
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  TextField
} from "@material-ui/core";
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
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default CallLink;
