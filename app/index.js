import React from "react";
import { render, ReactDOM } from "react-dom";
import { AppContainer } from "react-hot-loader";
import Root from "./containers/Root";
import "./app.global.css";

// const store = configureStore();

ReactDOM.hydrate(
  <AppContainer>
    <Root />
  </AppContainer>,
  document.getElementById("root")
);

if (module.hot) {
  module.hot.accept("./containers/Root", () => {
    const NextRoot = require("./containers/Root"); // eslint-disable-line global-require
    ReactDOM.hydrate(
      <AppContainer>
        <NextRoot />
      </AppContainer>,
      document.getElementById("root")
    );
  });
}
