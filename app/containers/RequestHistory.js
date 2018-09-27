import React, { Component } from 'react'
import * as requestStorageService from '../services/request-storage.service'

export default class RequestHistory extends Component {

  constructor(props) {
    super(props);

    this.state = {
      items: []
    }
  }

  render() {
    const historyItems = this.props.historyItems.map((item, index) => {
      return (
        <div className="row" onClick={() => { this.props.onItemClick(item) }}>
          <div className="col col-md-3">{index}</div>
          <div className="col col-md-9">{JSON.stringify(item, null, 2)}</div>
        </div>
      )
    })

    return (
      <div>
        {historyItems}
      </div>
    )
  }
}
