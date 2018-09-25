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
import { Button, Typography, Grid, ListItem, ListItemIcon, ListItemText, List, Divider, Drawer } from "../../node_modules/@material-ui/core";
import { MoveToInbox as InboxIcon, Send as SendIcon, Star as StarIcon, Drafts as DraftsIcon } from "@material-ui/icons"
import RequestBody from "./RequestBody";

import * as requestService from '../services/request.service'
import * as requestStorageService from '../services/request-storage.service'
import RequestHistory from "./RequestHistory";

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
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

const httpMethods = ["GET", "POST", "PUT", "DELETE", "PATCH"];
const httpMethodsWithBody = ["POST", "PUT", "PATCH"];

const mailFolderListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <InboxIcon />
      </ListItemIcon>
      <ListItemText primary="Inbox" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <StarIcon />
      </ListItemIcon>
      <ListItemText primary="Starred" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <SendIcon />
      </ListItemIcon>
      <ListItemText primary="Send mail" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <DraftsIcon />
      </ListItemIcon>
      <ListItemText primary="Drafts" />
    </ListItem>
  </div>
);

class RequestPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      methodType: "GET",
      url: "http://localhost:8080/api/hackers",
      requestBody: "",
      data: [],
      historyItems: []
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

    requestService.request(this.state.url, config)
      .then(data => {
        this.setState({
          data: data
        })

        requestStorageService.getAll()
          .then(items => {
            debugger;
            this.setState({ historyItems: items })
          })
          .catch(console.error)
      })
      .catch(console.error)
  }

  toggleDrawer = (side, open) => () => {
    debugger;
    this.setState({
      [side]: open,
    });
  };


  render() {
    const { classes } = this.props;

    const sideList = (
      <div className={classes.list}>
        <List>{mailFolderListItems}</List>
        <Divider />
      </div>
    );

    return (
      <div>
        <Typography variant="title" gutterBottom>
          Request
        </Typography>
        <Button onClick={this.toggleDrawer('left', true)}>Open Left</Button>
        <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer('left', false)}
            onKeyDown={this.toggleDrawer('left', false)}
          >
            {sideList}
          </div>
        </Drawer>

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

        {
          httpMethodsWithBody.includes(this.state.methodType) && (
            <RequestBody onChange={this.onChange} />
          )
        }
        <RequestHistory historyItems={this.state.historyItems} />

        < Typography variant="title" gutterBottom >
          Response
        </Typography >
        <pre>{JSON.stringify(this.state.data, null, 2)}</pre>
      </div >
    );
  }
}

export default withStyles(styles)(RequestPage);
