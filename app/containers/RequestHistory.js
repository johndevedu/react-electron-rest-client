import React, { Component } from 'react'
import * as requestStorageService from '../services/request-storage.service'
import { Button, Grid, Typography } from '@material-ui/core'
import moment from 'moment'
export default class RequestHistory extends Component {

  constructor(props) {
    super(props);

    this.state = {
      items: []
    }
  }

  render() {
    let filteredHistoryItems = this.props.historyItems;
    if (this.props.searchText.length > 0) {
      filteredHistoryItems = this.props.historyItems.filter(item => {
        return item.value.url.includes(this.props.searchText);
      })
    }
    const historyItemElements = filteredHistoryItems.map((item, index) => {
      return (
        <Grid xs={12}
          container
          style={{ cursor: "pointer" }}
          onClick={() => { this.props.onItemClick(item.value) }}>

          <Grid item xs={3}>
            <Typography variant="caption">
              {moment(item.key).format('M/D, LT')}
            </Typography>

            <Typography variant="caption">
              {moment(item.key).fromNow()}
            </Typography>
          </Grid>


          <Grid Item xs={9}>
            <Typography noWrap>
              <Button color="primary" size="small" style={{ backgroundColor: 'transparent' }}>{item.value.config.method}</Button>
              {item.value.url}
            </Typography>

            <Typography>
              <pre>{JSON.stringify(item.value.config.data, null, 2)}</pre>
            </Typography>
          </Grid>

        </Grid>
      )
    })

    return (
      <React.Fragment>
        {historyItemElements}
      </React.Fragment>
    )
  }
}
