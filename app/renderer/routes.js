import React from "react";
import { Switch, Route } from "react-router-dom";

import HomeView from "./views/HomeView";

export default (
  <Switch>
    <Route path="/" component={HomeView} />
  </Switch>
)