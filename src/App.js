import React, { useState, useEffect } from "react";
import "./App.css";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Home from "./components/common/Home";
import ForgottenPass from "./components/auth/ForgottenPass";
import ChangePass from "./components/auth/ChangePass"
import MovieDetails from "./components/movies/MovieDetails";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MoviesState from "./context/moviesList/MoviesState";
import MovieState from "./context/movie/MovieState";
import LoginState from "./context/Auth/LoginState";
import RegisterState from "./context/Auth/RegisterState";
import ChangePassState from "./context/Auth/ChangePassState";
import ForgottenPassState from "./context/Auth/ForgottenPassState";
import { NavigationBar } from './components/common/NavigationBar';
import profile from "./components/auth/profile";

function App() {
  return (
    <ForgottenPassState>
      <LoginState>
        <RegisterState>
          <ChangePassState>
            <MoviesState>
              <MovieState>
                <Router>
                  <NavigationBar />
                  <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/login" exact component={Login} />
                    <Route path="/register" exact component={Register} />
                    <Route path="/movies/:id" component={MovieDetails} />
                    <Route path="/forgot" exact component={ForgottenPass} />
                    <Route path="/change" exact component={ChangePass} />
                    <Route path="/profile" exact component={profile} />
                  </Switch>
                </Router>
              </MovieState>
            </MoviesState>
          </ChangePassState>
        </RegisterState>
      </LoginState>
    </ForgottenPassState>
  );
}

export default App;
