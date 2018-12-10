import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Raffle from "./Raffle";
import Home from "./Home";
import About from "./About";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/raffle" component={Raffle} />
          <Route path="/about" component={About} />
        </Switch>
      </div>
    );
  }
}

export default App;
