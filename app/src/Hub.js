import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";

import {
  App,
  AppContent,
  Appbar,
  AppbarToggleButton,
  AppbarToolbar,
  AppTitle,
  AppTitleContainer,
  NavContent,
  NavDrawer,
  NavHeader,
  NavItem,
  NavItemIcon,
  NavItemText,
} from "@react-uix/web";

import routes from "./routes";

const theme = {
  colorPrimary: "#00b894",
  colorSecondary: "",
  text: {
    colorOnLight: "#111",
    colorOnDark: "#fff"
  }
};

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
      <App theme={theme}>
        <Router>
          <div>
            <Appbar>
              <AppbarToggleButton>menu</AppbarToggleButton>
              <AppTitleContainer>
                <AppTitle style={{ color: "#fff" }}>{ pageTitle }</AppTitle>
              </AppTitleContainer>
              <AppbarToolbar>

              </AppbarToolbar>
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
                  >
                    <NavItem>
                      <NavItemIcon>nights_stay</NavItemIcon>
                      <NavItemText>Routines</NavItemText>
                    </NavItem>
                  </Link>
                  <Link
                    to="/services"
                    style={{textDecoration: "none"}}
                  >
                    <NavItem>
                      <NavItemIcon>explore</NavItemIcon>
                      <NavItemText>Services</NavItemText>
                    </NavItem>
                  </Link>
                  <Link
                    to="/settings"
                    style={{textDecoration: "none"}}
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
