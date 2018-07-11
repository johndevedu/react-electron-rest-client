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
import RequestBody from "./RequestBody";

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

const httpMethods = ["GET", "POST", "PUT", "DELETE", "PATCH"];
const httpMethodsWithBody = ["POST", "PUT", "PATCH"];

class RequestPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      methodType: "GET",
      url: "http://localhost:8080/api/hackers",
      requestBody: "",
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
    const selectedMethod = this.state.methodType;
    const config = {
      method: selectedMethod
    };

    if (
      httpMethodsWithBody.includes(selectedMethod) &&
      this.state.requestBody
    ) {
      const parsedBody = JSON.parse(this.state.requestBody);
      config.data = parsedBody;
    }

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
        <Typography variant="title" gutterBottom>
          Request
        </Typography>

        <form onSubmit={this.onSend}>
          <Grid container spacing={24} style={{ padding: 24 }}>
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
                {httpMethods.map(method => (
                  <MenuItem key={method} value={method}>
                    {method}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
            <Button onClick={this.onSend}>SEND</Button>
          </Grid>
        </form>

        {httpMethodsWithBody.includes(this.state.methodType) && (
          <RequestBody onChange={this.onChange} />
        )}

        <Typography variant="title" gutterBottom>
          Response
        </Typography>
        <pre>{JSON.stringify(this.state.data, null, 2)}</pre>
      </div>
    );
  }
}

export default withStyles(styles)(RequestPage);
