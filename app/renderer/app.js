import { ipcRenderer } from "electron";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { createMemoryHistory } from "history";
import { Router } from "react-router"
import routes from "./routes";

import IconButton from "./components/IconButton/IconButton";

const rootElement = document.querySelector(document.currentScript.getAttribute("data-container"));

// TODO: use redux
const routerHistory = createMemoryHistory();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageTitle: "Home"
    };
  }

  render() {
    const { pageTitle } = this.state;
    const { } = this.props;
    const style = {
      app: {
        height: "100vh",
        width: "100vw",
        position: "relative"
      },
      appbar: {
        height: 60,
        width: "100vw",
        backgroundColor: "#6c5ce7",
        color: "#ffffff",
        boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
        zIndex: 2
      },
      menuContainer: {
        height: 60,
        display: "flex",
        alignItems: "center",
        margin: "0 0 0 1rem",
      },
      titleContainer: {
        margin: "0 0 0 1.5rem"
      },
      title: {
        fontSize: "1.65rem",
        fontWeight: 300
      },
      navDrawer: {
        height: "calc(100vh - 60px)",
        width: 240,
        transform: "translate(-100%, 0)",
        float: "left",
        zIndex: 1,
      },
      content: {
        height: "calc(100vh - 60px)",
        width: "100vw",
        position: "absolute",
        top: 60,
        left: 0,
        zIndex: 0
      }
    };
    return (
      <div style={style.app}>
        <div style={style.appbar}>
          <div style={style.menuContainer}>
            <div style={style.menuButtonContainer}>
              <IconButton>menu</IconButton>
            </div>
            <div style={style.titleContainer}>
              <h2 style={style.title}>{ pageTitle }</h2>
            </div>
          </div>
        </div>
        <div style={style.navDrawer}>

        </div>
        <div style={style.content}>
          <Router history={routerHistory}>
            {routes}
          </Router>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  rootElement
);

// TODO: put this logic in the common module.
ipcRenderer.send("renderer.process_loaded", { sender: 'renderer', recipient: 'main' });

