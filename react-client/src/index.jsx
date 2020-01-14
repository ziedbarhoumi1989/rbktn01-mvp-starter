import React from "react";
import ReactDOM from "react-dom";

import $ from "jquery";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import first from "./components/first.jsx";
import home from "./components/home.jsx";
import profile from "./components/userprofile.jsx"

function App() {
  return (
    <main>
      <Switch>
        <Route path="/" component={home} exact />
        <Route path="/signin" component={first} />
        <Route path="/user" component={profile} />
        <Route component={Error} />
      </Switch>
    </main>
  );
}



ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("app")
);
