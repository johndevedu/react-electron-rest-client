// @flow
import React, { Component } from "react";
import { Link } from "react-router-dom";
import styles from "./Home.css";
import Button from "@material-ui/core/Button";

type Props = {};

export default class Home extends Component<Props> {
  props: Props;

  render() {
    return (
      <div>
        <div className={styles.container} data-tid="container">
          <h2>Home</h2>
          <Link to="/counter">to Counter</Link>
          <br />
          <Link to="/request">to Request</Link>
          <br />
          <Button variant="contained" color="primary">
            Hello World
          </Button>
        </div>
      </div>
    );
  }
}
