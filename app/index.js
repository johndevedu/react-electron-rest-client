import React from "react";
import { render } from "react-dom";
import ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import Root from "./containers/Root";
import "./app.global.css";

// const store = configureStore();

ReactDOM.hydrate(
  // render(
  <AppContainer>
    <Root />
  </AppContainer>,
  document.getElementById("root")
);

if (module.hot) {
  module.hot.accept("./containers/Root", () => {
    const NextRoot = require("./containers/Root"); // eslint-disable-line global-require
    ReactDOM.hydrate(
      // render(
      <AppContainer>
        <NextRoot />
      </AppContainer>,
      document.getElementById("root")
    );
  });
}
