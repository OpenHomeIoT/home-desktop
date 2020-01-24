import React, { Component } from "react";
import { createMemorySource, createHistory, Link, LocationProvider, Router } from "@reach/router";

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

import HomeView from "./views/HomeView";
import AutomationsView from "./views/AutomationsView";
import RoutinesView from "./views/RoutinesView";
import SettingsView from "./views/SettingsView";
import IconButton from "./components/IconButton";

// TODO: implement redux

const memorySource = createMemorySource("/");
const history = createHistory(memorySource);

class Hub extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isNavDrawerOpen: false,
      pageTitle: "Home",
    };
  }

  render() {
    const { isNavDrawerOpen, pageTitle } = this.state;
    // const { } = this.props;
    return (
      <App primaryColor="#6c5ce7">
        <LocationProvider history={history}>
          <div>
            <Appbar>
              <AppbarToggleButton onClick={ () => this._toggleNavDrawer() }>
                <IconButton color="#fff">menu</IconButton>
              </AppbarToggleButton>
              <AppTitleContainer>
                <AppTitle style={{ color: "#fff" }}>{ pageTitle }</AppTitle>
              </AppTitleContainer>
            </Appbar>
            <NavDrawer open={isNavDrawerOpen}>
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
                    to="/automations"
                    style={{textDecoration: "none"}}
                    onClick={ () => this._setPageTitle("Automations") }
                  >
                    <NavItem>
                      <NavItemIcon>home</NavItemIcon>
                      <NavItemText>Automations</NavItemText>
                    </NavItem>
                  </Link>
                  <Link
                    to="/routines"
                    style={{textDecoration: "none"}}
                    onClick={ () => this._setPageTitle("Routines") }
                  >
                    <NavItem>
                      <NavItemIcon>home</NavItemIcon>
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
              <Router>
                <HomeView path="/" />
                <AutomationsView path="/automations" />
                <RoutinesView path="/routines" />
                <SettingsView path="/settings" />
              </Router>
            </AppContent>
          </div>
        </LocationProvider>
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

  /**
   * Toggle the navigation drawer.
   */
  _toggleNavDrawer() {
    const { isNavDrawerOpen } = this.state;
    this.setState({ isNavDrawerOpen: !isNavDrawerOpen });
  }
}

export default Hub;
