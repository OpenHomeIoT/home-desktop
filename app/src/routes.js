import React from "react";
import { Switch, Route } from "react-router-dom";

import AutomationsView from "./views/AutomationsView";
import HomeView from "./views/HomeView";
import RoutinesView from "./views/RoutinesView";
import SettingsView from "./views/SettingsView";

export default (
  <Switch>
    <Route exact path="/">
      <HomeView />
    </Route>
    <Route path="/automate">
      <AutomationsView />
    </Route>
    <Route path="/devices">
      {/* TODO: implement */}
      Devices
    </Route>
    <Route path="/routines">
      <RoutinesView />
    </Route>
    <Route path="/settings">
      <SettingsView />
    </Route>
  </Switch>
)
