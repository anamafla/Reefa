import React from "react";
import { Switch, Route } from "react-router-dom";
import Raffle from "./Raffle";
// import RaffleState from "./RaffleState";
import Home from "./Home";
import About from "./About";
import ReactGA from "react-ga";
import NavBar from "./NavBar";

function App() {
  if (process.env.REACT_APP_GA_TRACKING_ID) {
    ReactGA.initialize(process.env.REACT_APP_GA_TRACKING_ID);
  }

  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/raffle" component={Raffle} />
        {/* <Route path="/raffle" component={RaffleState} /> */}
        <Route path="/about" component={About} />
      </Switch>
    </div>
  );
}

export default App;
