import React from "react";
import { Route, Switch } from 'react-router-dom';
import './App.css';

import LandingPage from "./Components/LandingPage/LandingPage";
import Home from "./Components/Home/Home";

function App() {
  return (
    <div className="App">
      <Switch>
      <Route exact path="/" render={() => <LandingPage />}></Route>
      <Route exact path="/home" render={() => <Home /> }></Route>
      </Switch>
    </div>
  );
}

export default App;
