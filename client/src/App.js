import React from "react";
import { Route, Switch } from 'react-router-dom';
import './App.css';

import LandingPage from "./Components/LandingPage/LandingPage";
import Home from "./Components/Home/Home";
import Form from "./Components/Form/Form";
import VideogameDetail from "./Components/VideogameDetail/VideogameDetail";
import Nav from "./Components/Nav/Nav";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getGenres, getVideogames } from "../src/Actions/index"

function App() {

const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getVideogames())
  },[])

//   useEffect(() => {
//     dispatch(getGenres());
// }, [])

  return (
    <div className="App">

      <Route path={['/home', '/videogame/', '/videogame/:gameId',]}><Nav /></Route>
      <Switch>
      <Route exact path="/" render={() => <LandingPage />}></Route>
      <Route exact path="/home" render={() => <Home /> }></Route>
      <Route exact path="/videogame" render={() => <Form />}></Route>
      <Route exact path="/videogame/:gameId" render={() => <VideogameDetail />}></Route>
      </Switch>
    </div>
  );
}

export default App;
