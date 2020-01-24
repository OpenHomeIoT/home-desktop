import React from "react";
import { Switch, Route } from "@reach/router";

import AutomationsView from "./views/AutomationsView";
import DevicesView from "./views/DevicesView";
import HomeView from "./views/HomeView";
import RoutinesView from "./views/RoutinesView";
import SettingsView from "./views/SettingsView";

export default (
  <Switch default>
    <Route path="/" component={HomeView} />
    <Route path="/automations" component={AutomationsView} />
    <Route path="/devices" component={DevicesView} />
    <Route path="/routines" component={RoutinesView} />
    <Route path="/settings" component={SettingsView} />
  </Switch>
)
