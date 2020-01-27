import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";

import App from "./components/App";
import AppContent from "./components/AppContent";
import Appbar from "./components/appbar/Appbar";
import AppbarToggleButton from "./components/appbar/AppbarToggleButton";
import AppTitle from "./components/appbar/AppTitle";
import AppTitleContainer from "./components/appbar/AppTitleContainer";
import NavContent from "./components/navdrawer/NavContent";
import NavDrawer from "./components/navdrawer/NavDrawer";
import NavHeader from "./components/navdrawer/NavHeader";
import NavItem from "./components/navdrawer/NavItem";
import NavItemIcon from "./components/navdrawer/NavItemIcon";
import NavItemText from "./components/navdrawer/NavItemText";
import IconButton from "./components/IconButton";
import routes from "./routes";

// TODO: implement redux

class Hub extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageTitle: "Home",
    };
  }

  render() {
    const { pageTitle } = this.state;
    // const { } = this.props;
    return (
      <App primaryColor="#0984e3">
        <Router>
          <div>
            <Appbar>
              <AppbarToggleButton onClick={ () => this._toggleNavDrawer() }>
                <IconButton color="#fff">menu</IconButton>
              </AppbarToggleButton>
              <AppTitleContainer>
                <AppTitle style={{ color: "#fff" }}>{ pageTitle }</AppTitle>
              </AppTitleContainer>
            </Appbar>
            <NavDrawer>
              <NavHeader>

              </NavHeader>
              <NavContent>
              <Link
                    to="/"
                    style={{textDecoration: "none"}}
                    onClick={ () => this._setPageTitle("Home") }
                  >
                    <NavItem>
                      <NavItemIcon>home</NavItemIcon>
                      <NavItemText>Home</NavItemText>
                    </NavItem>
                  </Link>
                  <Link
                    to="/automate"
                    style={{textDecoration: "none"}}
                    onClick={ () => this._setPageTitle("Automate") }
                  >
                    <NavItem>
                      <NavItemIcon>autorenew</NavItemIcon>
                      <NavItemText>Automate</NavItemText>
                    </NavItem>
                  </Link>
                  <Link
                    to="/routines"
                    style={{textDecoration: "none"}}
                    onClick={ () => this._setPageTitle("Routines") }
                  >
                    <NavItem>
                      <NavItemIcon>nights_stay</NavItemIcon>
                      <NavItemText>Routines</NavItemText>
                    </NavItem>
                  </Link>
                  <Link
                    to="/settings"
                    style={{textDecoration: "none"}}
                    onClick={ () => this._setPageTitle("Settings") }
                  >
                    <NavItem>
                      <NavItemIcon>settings</NavItemIcon>
                      <NavItemText>Settings</NavItemText>
                    </NavItem>
                  </Link>
              </NavContent>
            </NavDrawer>
            <AppContent>
              { routes }
            </AppContent>
          </div>
        </Router>
      </App>
    );
  }

  /**
   * Set the title
   * @param {string} title the title.
   */
  _setPageTitle(title) {
    this.setState({ pageTitle: title });
  }
}

export default Hub;
