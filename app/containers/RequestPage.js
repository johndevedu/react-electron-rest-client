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
import { Button, Typography, Grid, Paper } from "../../node_modules/@material-ui/core";
import RequestBody from "./RequestBody";

import * as requestService from '../services/request.service'
import * as requestStorageService from '../services/request-storage.service'
import RequestHistory from "./RequestHistory";

const styles = theme => ({
  // container: {
  //   display: "flex",
  //   flexWrap: "wrap"
  // },
  formControl: {
    margin: theme.spacing.unit
  },
  formControlWide: {
    minWidth: "400px"
  },
  containerAlignTop: {
    display: "flex",
    flexFlow: "column",
    alignItems: "flex-start",
    width: "100%"
  }
});

const httpMethods = ["GET", "POST", "PUT", "DELETE", "PATCH"];
const httpMethodsWithBody = ["POST", "PUT", "PATCH"];

class RequestPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      methodType: "GET",
      url: "http://localhost:8080/api/cars",
      requestBody: "",
      data: [],
      historyItems: []
    };

    this.onChange = this.onChange.bind(this);
    this.onSend = this.onSend.bind(this);
    this.getHistory = this.getHistory.bind(this);
    this.onHistoryItemClicked = this.onHistoryItemClicked.bind(this);
  }

  componentDidMount() {
    this.getHistory();
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onHistoryItemClicked(item) {
    debugger;
    this.setState({
      url: item.url,
      requestBody: JSON.stringify(item.config.data, null, 2),
      methodType: item.config.method
    })
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

    requestService.request(this.state.url, config)
      .then(data => {
        this.setState({
          data: data
        })

        this.getHistory();
      })
      .catch(console.error)
  }

  getHistory() {
    requestStorageService.getAll()
      .then(items => {
        this.setState({ historyItems: items })
      })
      .catch(console.error)
  }

  render() {
    const { classes } = this.props;

    return (
      <div>

        <Grid container spacing={24} >
          <Grid container item xs={12} md={8}>
            <div className={classes.containerAlignTop}>
              <Grid container direction={"column"} justify={"flex-s"}>
                <Grid item xs={12}>
                  <Typography variant="title" gutterBottom>
                    Request
              </Typography>
                </Grid>

                <Grid item xs={12}>
                  <form onSubmit={this.onSend}>
                    <Grid container xs={12} sm={12} spacing={24}>
                      <Grid item xs={2}>
                        <FormControl fullWidth className={classes.formControl}>
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
                      </Grid>
                      <Grid item xs={8}>
                        <FormControl fullWidth
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
                      </Grid>
                      <Grid item xs={2}><Button type="submit" onClick={this.onSend}>SEND</Button></Grid>
                    </Grid>



                  </form>

                </Grid>

                <Grid item xs={12}>
                  {
                    httpMethodsWithBody.includes(this.state.methodType) && (
                      <RequestBody body={this.state.requestBody} onChange={this.onChange} />
                    )
                  }

                  < Typography variant="title" gutterBottom >
                    Response
            </Typography >
                  <pre>{JSON.stringify(this.state.data, null, 2)}</pre>
                </Grid>


              </Grid>

            </div>
          </Grid>
          <Grid container item xs={12} md={4}>
            <RequestHistory historyItems={this.state.historyItems} onItemClick={this.onHistoryItemClicked} />
          </Grid>




        </Grid>

      </div >
    );
  }
}

export default withStyles(styles)(RequestPage);
