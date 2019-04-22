import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import OAuth2 from '../containers/auth';
import Login from '../containers/login';
import Map from '../containers/map';

export default function Router() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={Login} />
      <Route path="/OAuth2" component={OAuth2} />
      <Route path="/map" component={Map} />
    </BrowserRouter>
  );
}
