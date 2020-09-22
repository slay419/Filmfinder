import React, { useState, useEffect } from "react";
import "./App.css";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Home from "./components/common/Home";
import MovieDetails from "./components/movies/MovieDetails";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MoviesState from "./context/moviesList/MoviesState";
import MovieState from "./context/movie/MovieState";

function App() {
  return (
    <MoviesState>
      <MovieState>
        <Router>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />
            <Route path="/movies/:id" component={MovieDetails} />
          </Switch>
        </Router>
      </MovieState>
    </MoviesState>
  );
}

export default App;
