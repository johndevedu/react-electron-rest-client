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
import { Button, CircularProgress, Typography, Grid, Paper } from "../../node_modules/@material-ui/core";
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
      data: "",
      historyItems: [],
      searchText: "",
      isInProgress: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSend = this.onSend.bind(this);
    this.getHistoryAll = this.getHistoryAll.bind(this);
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

    this.setState({
      url: item.url,
      requestBody: JSON.stringify(item.config.data, null, 2),
      methodType: item.config.method
    })
  }

  onSend(e) {
    e.preventDefault();

    this.setState({
      isInProgress: true
    })

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
          data: data,
          isInProgress: false
        })

        this.getHistory();
      })
      .catch(err => {
        this.setState({
          isInProgress: false,
          data: err.message
        })
        console.error(err);
      })


  }

  getHistoryAll() {
    requestStorageService.getAllExt({ limit: 1000 }).then(items => {
      this.setState({ historyItems: items })
    })
      .catch(console.error)
  }

  getHistory() {

    requestStorageService.getAllExt().then(items => {
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
                    <Grid container xs={12} sm={12} alignItems="center" spacing={24}>
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
                      <Grid item xs={2}><Button variant="outlined" type="submit" onClick={this.onSend}>SEND</Button></Grid>
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
                  {this.state.isInProgress && <CircularProgress />}

                  <pre>{this.state.data && JSON.stringify(this.state.data, null, 2)}</pre>
                </Grid>


              </Grid>

            </div>
          </Grid>
          <Grid container item xs={12} md={4}>
            <Grid container item xs={12} alignItems="flex-end"
              style={{
                paddingBottom: "20px",
                paddingTop: "10px"
              }}>
              <Grid item xs={4}>
                <Button type="submit" variant="outlined" onClick={this.getHistoryAll}>Load All History</Button>
              </Grid>
              <Grid item xs={8}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="searchText">Search</InputLabel>
                  <Input
                    name="searchText"
                    value={this.state.searchText}
                    onChange={this.onChange}
                  />
                </FormControl>
              </Grid>
            </Grid>
            <RequestHistory searchText={this.state.searchText} historyItems={this.state.historyItems} onItemClick={this.onHistoryItemClicked} />
          </Grid>




        </Grid>

      </div >
    );
  }
}

export default withStyles(styles)(RequestPage);
