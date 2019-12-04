import React, { Component } from "react";
import ReactDOM from "react-dom";
import { createMemoryHistory } from "history";
import { Link, Router } from "react-router-dom";

import configureIpcRoutes from "./ipc/configureIpcRoutes";
import routes from "./routes";

import IconButton from "./components/IconButton/IconButton";
import Icon from "./components/Icon/Icon";

const rootElement = document.querySelector(document.currentScript.getAttribute("data-container"));

// TODO: use redux
const routerHistory = createMemoryHistory();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isNavDrawerOpen: true,
      pageTitle: "Home"
    };
  }

  render() {
    const { isNavDrawerOpen, pageTitle } = this.state;
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
        position: "absolute",
        top: 60,
        height: "calc(100vh - 60px)",
        width: 240,
        transform: "translate(-100%, 0)",
        // transition: "transform linear 1s",
        zIndex: 1,
      },
      navHeader: {

      },
      navItems: {

      },
      navItem: {
        display: "flex",
        alignItems: "center",
        padding: "1rem",
        cursor: "pointer"
      },
      navItemIcon: {

      },
      navItemText: {
        textDecoration: "none",
        margin: "0 0 0 1rem"
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

    if (isNavDrawerOpen) {
      style.navDrawer.transform = "translate(0%, 0%)";
      style.content.width = "calc(100vw - 240px)";
      style.content.transform = "translate(240px, 0)"
    }
    return (
      <div style={style.app}>
        <Router history={routerHistory}>
          <div style={style.appbar}>
            <div style={style.menuContainer}>
              <div style={style.menuButtonContainer} onClick={() => this._toggleNavDrawer()}>
                <IconButton>menu</IconButton>
              </div>
              <div style={style.titleContainer}>
                <h2 style={style.title}>{ pageTitle }</h2>
              </div>
            </div>
          </div>
          <div style={style.navDrawer}>
            <div style={style.navHeader}></div>
            <div style={style.navItems}>
              <Link to="/">
                <div style={style.navItem}>
                  <Icon style={style.navItemIcon}>home</Icon>
                  <span style={style.navItemText}>Home</span>
                </div>
              </Link>
              <Link to="/devices">
                <div style={style.navItem}>
                  <Icon style={style.navItemIcon}>home</Icon>
                  <span style={style.navItemText}>Devices</span>
                </div>
              </Link>
              <Link to="/automations">
                <div style={style.navItem}>
                  <Icon style={style.navItemIcon}>home</Icon>
                  <span style={style.navItemText}>Automations</span>
                </div>
              </Link>
              <Link to="/routines">
                <div style={style.navItem}>
                  <Icon style={style.navItemIcon}>home</Icon>
                  <span style={style.navItemText}>Routines</span>
                </div>
              </Link>
              <Link to="/settings">
                <div style={style.navItem}>
                  <Icon style={style.navItemIcon}>settings</Icon>
                  <span style={style.navItemText}>Settings</span>
                </div>
              </Link>
            </div>
          </div>
          <div style={style.content}>
            {routes}
          </div>
        </Router>
      </div>
    );
  }

  /**
   * Toggle the navigation drawer.
   */
  _toggleNavDrawer() {
    this.setState({ navDrawerOpen: !this.state.navDrawerOpen });
  }
}

ReactDOM.render(
  <App />,
  rootElement
);

configureIpcRoutes();
