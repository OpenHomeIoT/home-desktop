import React from "react";
import { Switch, Route, useParams } from "react-router-dom";

import AutomationsView from "./views/AutomationsView";
import HomeView from "./views/HomeView";
import RoutinesView from "./views/RoutinesView";
import SettingsView from "./views/SettingsView";
import ServicesView from "./views/service/ServicesView";
import ServiceView from "./views/service/ServiceView";

const ServiceViewWrapper = () => {
  const { id } = useParams();
  return <ServiceView id={id} />;
}

export default (
  <Switch>
    <Route exact path="/">
      <HomeView />
    </Route>
    <Route path="/automate">
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
