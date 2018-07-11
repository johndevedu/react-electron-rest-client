import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { withStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { Button, Typography, Grid } from "../../node_modules/@material-ui/core";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing.unit
  },
  formControlWide: {
    minWidth: "400px"
  }
});

class RequestPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      methodType: "GET",
      url: "http://localhost:8080/api/hackers",
      data: []
    };

    this.onChange = this.onChange.bind(this);
    this.onSend = this.onSend.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onSend(e) {
    e.preventDefault();
    const config = {
      method: this.state.methodType
    };

    axios(this.state.url, config).then(response => {
      this.setState({
        data: response.data
      });
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        {/* <div className={classes.container}> */}
        <Typography variant="title" gutterBottom>
          Request
        </Typography>
        <form onSubmit={this.onSend}>
          <Grid container spacing={24} style={{ padding: 24 }}>
            {/* <Grid item sm={4}> */}
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="method-type">METHOD TYPE</InputLabel>
              <Select
                value={this.state.methodType}
                onChange={this.onChange}
                inputProps={{
                  name: "methodType",
                  id: "method-type"
                }}
              >
                <MenuItem value="GET">GET</MenuItem>
                <MenuItem value="POST">POST</MenuItem>
                <MenuItem value="PUT">PUT</MenuItem>
                <MenuItem value="DELETE">DELETE</MenuItem>
                <MenuItem value="PATCH">PATCH</MenuItem>
              </Select>
            </FormControl>
            {/* </Grid> */}

            {/* <Grid item sm={6}> */}
            <FormControl
              className={[classes.formControl, classes.formControlWide]}
            >
              <InputLabel htmlFor="url">URL</InputLabel>
              <Input
                id="url"
                name="url"
                value={this.state.url}
                onChange={this.onChange}
              />
            </FormControl>
            {/* </Grid> */}
            {/* <Grid item sm={2}> */}
            <Button onClick={this.onSend}>SEND</Button>
            {/* </Grid> */}
          </Grid>
        </form>
        {/* </div> */}
        <Typography variant="title" gutterBottom>
          Response
        </Typography>
        <pre>{JSON.stringify(this.state.data, null, 2)}</pre>
      </div>
    );
  }
}

export default withStyles(styles)(RequestPage);
