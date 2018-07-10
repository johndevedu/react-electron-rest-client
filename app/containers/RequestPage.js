import React, { Component } from "react";
import styles from "./RequestPage.css";
import { Link } from "react-router-dom";
import axios from "axios";

export default class RequestPage extends Component {
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
    return (
      <div>
        <div className={styles.backButton} data-tid="backButton">
          <Link to="/">
            <i className="fa fa-arrow-left fa-3x" />
          </Link>
        </div>
        <h1>Request Page</h1>
        <form>
          <div className="form-control">
            <select
              name="methodType"
              onChange={this.onChange}
              value={this.state.methodType}
            >
              <label>METHOD TYPE</label>
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="DELETE">DELETE</option>
              <option value="PATCH">PATCH</option>
            </select>
          </div>
          <div className="form-control">
            <label>url</label>
            <input name="url" onChange={this.onChange} value={this.state.url} />
          </div>
          <button type="submit" onClick={this.onSend}>
            SEND
          </button>
        </form>
        <h2>Response</h2>
        <pre>{JSON.stringify(this.state.data, null, 2)}</pre>
      </div>
    );
  }
}
