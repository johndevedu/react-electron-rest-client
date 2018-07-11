import React, { Component } from "react";
import { withStyles, Typography, TextField } from "@material-ui/core";

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 500
  }
});

class RequestBody extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Typography variant="title" gutterBottom>
          Body
        </Typography>
        <TextField
          id="request-body"
          label="Raw Input"
          multiline
          rowsMax="10"
          name="requestBody"
          onChange={this.props.onChange}
          className={classes.textField}
          margin="normal"
        />
      </div>
    );
  }
}

export default withStyles(styles)(RequestBody);
