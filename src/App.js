import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.scss";

// Components
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Home from "./components/common/Home";
import ForgottenPass from "./components/auth/ForgottenPass";
import ChangePass from "./components/auth/ChangePass";
import MovieDetails from "./components/movies/MovieDetails";
import Header from "./components/common/Header";
import ChangePassState from "./context/Auth/ChangePassState";
import ForgottenPassState from "./context/Auth/ForgottenPassState";
import profile from "./components/profile/profile";
import wishlist from "./components/profile/wishlist"
import bannedlist from "./components/profile/bannedlist"
import Footer from "./components/common/Footer";

// Context
import MoviesState from "./context/moviesList/MoviesState";
import MovieState from "./context/movie/MovieState";
import LoginState from "./context/Auth/LoginState";
import RegisterState from "./context/Auth/RegisterState";

function App() {
  return (
    <ForgottenPassState>
      <LoginState>
        <RegisterState>
          <MoviesState>
            <MovieState>
              <ChangePassState>
                <div className="container">
                  <Router>
                    <Header />
                    <Switch>
                      <Route path="/" exact component={Home} />
                      <Route path="/login" exact component={Login} />
                      <Route path="/register" exact component={Register} />
                      <Route path="/movies/:id" component={MovieDetails} />
                      <Route path="/forgot" exact component={ForgottenPass} />
                      <Route path="/profile" exact component={profile} />
                      <Route path="/profile/wishlist" exact component={wishlist} />
                      <Route path="/profile/bannedlist" exact component={bannedlist} />
                      <Route path="/profile/change" exact component={ChangePass} />
                    </Switch>
                  </Router>
                </div>
                <Footer />
              </ChangePassState>
            </MovieState>
          </MoviesState>
        </RegisterState>
      </LoginState>
    </ForgottenPassState>
  );
}

export default App;
