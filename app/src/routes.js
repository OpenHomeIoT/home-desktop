import React from "react";
import { Switch, Route, useParams } from "react-router-dom";

import AutomationsView from "./views/automation/AutomationsView";
import HomeView from "./views/HomeView";
import RoutinesView from "./views/RoutinesView";
import SettingsView from "./views/settings/SettingsView";
import ServicesView from "./views/service/ServicesView";
import ServiceView from "./views/service/ServiceView";
import CreateAutomationView from "./views/automation/CreateAutomationView";

const ServiceViewWrapper = () => {
  const { id } = useParams();
  return <ServiceView id={id} />;
}

export default (
  <Switch>
    <Route exact path="/">
      <HomeView />
    </Route>
    <Route path="/automate/create">
      <CreateAutomationView />
    </Route>
    <Route exact path="/automate">
      <AutomationsView />
    </Route>
    <Route path="/routines">
      <RoutinesView />
    </Route>
    <Route path="/services/:id">
      <ServiceViewWrapper />
    </Route>
    <Route exact path="/services">
      <ServicesView />
    </Route>
    <Route path="/settings">
      <SettingsView />
    </Route>
  </Switch>
)
