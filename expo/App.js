import React, { Component } from "react";
import { RootNavigator } from "./src/routes";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import promiseMiddleware from "redux-promise";

import reducer from "./src/store/reducers";

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

const enhancer = composeEnhancers(
  applyMiddleware(promiseMiddleware)
  // other store enhancers if any
);
const store = createStore(reducer, enhancer);

class appRedux extends Component {
  render() {
    const Nav = RootNavigator();

    return (
      <Provider store={store}>
        <Nav />
      </Provider>
    );
  }
}

export default appRedux;
