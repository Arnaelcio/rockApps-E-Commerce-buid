import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import Header from "./components/Header";
import Section from "./components/Section";
import store from "./store";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
          <div className="app">
            <Router>
              <Header />
              <Section />
            </Router>
          </div>
      </Provider>
    );
  }
}

export default App;
