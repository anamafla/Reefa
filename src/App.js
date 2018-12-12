import React from "react";
import { Switch, Route } from "react-router-dom";
import Raffle from "./Raffle";
import Home from "./Home";
import About from "./About";
import ReactGA from "react-ga";
import NavBar from "./NavBar";

export default function App() {
  ReactGA.initialize("UA - 130806472 - 1");
  ReactGA.pageview("/raffle");

  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/raffle" component={Raffle} />
        <Route path="/about" component={About} />
      </Switch>
    </div>
  );
}
