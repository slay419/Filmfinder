import React, { useState, useEffect } from "react";
import "./App.scss";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Home from "./components/common/Home";
import ForgottenPass from "./components/auth/ForgottenPass";
import ChangePass from "./components/auth/ChangePass";
import MovieDetails from "./components/movies/MovieDetails";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MoviesState from "./context/moviesList/MoviesState";
import MovieState from "./context/movie/MovieState";
import LoginState from "./context/Login/LoginState";
import RegisterState from "./context/Register/RegisterState";
import Header from "./components/common/Header";

function App() {
  return (
    <LoginState>
      <RegisterState>
        <MoviesState>
          <MovieState>
            <div className="container">
              <Router>
                <Header />
                <Switch>
                  <Route path="/" exact component={Home} />
                  <Route path="/login" exact component={Login} />
                  <Route path="/register" exact component={Register} />
                  <Route path="/movies/:id" component={MovieDetails} />
                  <Route path="/forgot" exact component={ForgottenPass} />
                  <Route path="/change" exact component={ChangePass} />
                </Switch>
              </Router>
            </div>
          </MovieState>
        </MoviesState>
      </RegisterState>
    </LoginState>
  );
}

export default App;
